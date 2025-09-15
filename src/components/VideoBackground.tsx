"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(
    "VideoBackground rendered, isLoaded:",
    isLoaded,
    "isError:",
    isError
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log("Video can play");
      setIsLoaded(true);
      video.play().catch((error) => {
        console.log("Auto-play failed:", error);
        // Auto-play failed, but that's okay - video will still show
      });
    };

    const handleLoadedData = () => {
      console.log("Video loaded data");
      setIsLoaded(true);
    };

    const handleError = (e: Event) => {
      console.error("Video error:", e);
      setIsError(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("error", handleError);

    // Try to load the video
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <>
      {/* Enhanced loading state with gradient backdrop */}
      {!isLoaded && !isError && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-black/40" />
          {/* Shimmer loading animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
          <div className="absolute bottom-8 left-8 text-white/60 text-sm">
            טוען חוויה ויזואלית מרהיבה...
          </div>
        </div>
      )}

      {/* Error fallback with beautiful gradient */}
      {isError && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/60" />
          {/* Animated geometric shapes for visual interest */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
      )}

      {/* Enhanced video element - always visible */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/site_clip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Enhanced dark overlay with glassmorphism effect */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10 pointer-events-none backdrop-blur-[0.5px]" />
    </>
  );
}

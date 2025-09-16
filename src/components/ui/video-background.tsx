"use client";

interface VideoBackgroundProps {
  src: string;
  className?: string;
}

export function VideoBackground({ src, className }: VideoBackgroundProps) {
  return (
    <video
      autoPlay
      loop
      muted
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

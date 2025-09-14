export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/site_poster.jpg"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover z-[-1] motion-reduce:hidden"
      >
        <source src="/site_clip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Fallback poster for no-JS / reduced-motion users */}
      <noscript>
        <img src="/site_poster.jpg" alt="Background" className="fixed inset-0 w-full h-full object-cover z-[-2]" />
      </noscript>
      {/* Dark overlay to increase contrast and cinematic feel */}
      <div className="fixed inset-0 bg-black/50 z-0 pointer-events-none" />
    </>
  );
}

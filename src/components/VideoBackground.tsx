export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/site_clip.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark overlay to increase contrast and cinematic feel */}
      <div className="fixed inset-0 bg-black/50 z-0 pointer-events-none" />
    </>
  );
}

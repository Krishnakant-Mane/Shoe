import React, { useRef, useEffect } from "react";
import intro from "/INTROVIDDD.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const ctx = gsap.context(() => {
      const onLoadedMetadata = () => {
        const setTime = gsap.quickTo(video, "currentTime", {
          duration: 0.25,        // smoother than 0
          ease: "power2.out",    // softer easing
        });

        ScrollTrigger.create({
          trigger: video,
          start: "top top",
          end: "+=400%",         // slower scroll = smoother
          scrub: 0.3,            // ⭐ KEY: scrub smoothing
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,   // prevents jump on fast scroll
          onUpdate: (self) => {
            setTime(self.progress * video.duration);
          },
        });
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={intro}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="w-full h-screen object-cover will-change-transform"
      />
    </div>
  );
};

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCookieConsent } from "../../context/CookieConsentContext";

const HERO_VIDEO_SRC = "/hero.mp4";
const HERO_POSTER_SRC = "/hero-poster.jpg";

export default function ImmersiveVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { mediaAllowed, registerVideo } = useCookieConsent();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.controls = false;
    video.muted = true;
    if (!mediaAllowed) video.pause();
    return registerVideo(video);
  }, [registerVideo, mediaAllowed]);

  return (
    <section className="theme-media-overlay relative h-[100svh] w-full overflow-hidden bg-background">
      <Image
        src={HERO_POSTER_SRC}
        alt=""
        fill
        aria-hidden
        className="object-cover"
        sizes="100vw"
      />
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER_SRC}
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        tabIndex={-1}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute bottom-10 left-0 right-0 z-10 px-6 text-center md:px-12">
        <p className="text-[11px] uppercase tracking-[0.38em] text-white/70">
          In motion
        </p>
      </div>
    </section>
  );
}

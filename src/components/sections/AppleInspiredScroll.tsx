"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCookieConsent } from "../../context/CookieConsentContext";

const HERO_VIDEO_SRC = "/hero.mp4";
const HERO_POSTER_SRC = "/hero-poster.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AppleInspiredScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const eyebrow = eyebrowRef.current;
    const linesWrap = linesRef.current;
    if (!section || !media || !overlay || !eyebrow || !linesWrap) return;

    const lines = Array.from(linesWrap.querySelectorAll("[data-line]"));
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=90%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        media,
        { scale: 1.16, filter: "blur(7px)" },
        { scale: 1, filter: "blur(0px)", ease: "none" },
        0,
      )
        .fromTo(overlay, { opacity: 0.75 }, { opacity: 0.35, ease: "none" }, 0)
        .fromTo(
          eyebrow,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.08,
        )
        .fromTo(
          lines,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.32,
            ease: "power3.out",
          },
          0.16,
        )
        .to(
          lines,
          {
            opacity: 0,
            y: -36,
            stagger: 0.05,
            duration: 0.22,
            ease: "power2.in",
          },
          0.78,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="theme-media-overlay relative h-[108vh] w-full bg-background"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={mediaRef} className="absolute inset-0">
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
        </div>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/75"
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p
            ref={eyebrowRef}
            className="mb-6 text-[10px] uppercase tracking-[0.38em] text-white/65 sm:text-xs"
          >
            Precision in motion
          </p>
          <div ref={linesRef} className="space-y-1.5 sm:space-y-3">
            <h2
              data-line
              className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Crafted to glow.
            </h2>
            <h2
              data-line
              className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Built to last.
            </h2>
            <h2
              data-line
              className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
            >
              Worn every day.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_SOURCE: "ezgif" | "numbered" = "ezgif";
const FRAME_DIR = "frame";

const EZGIF_FIRST = 5;
const EZGIF_LAST = 59;
const NUMBERED_TOTAL = 300;

const TOTAL_FRAMES =
  FRAME_SOURCE === "ezgif"
    ? EZGIF_LAST - EZGIF_FIRST + 1
    : NUMBERED_TOTAL;

const PRELOAD_FIRST = 16;
const MAX_CANVAS_DPR = 4;
const MAX_CANVAS_PIXELS = 32_000_000;
const SCROLL_SCRUB_DISTANCE = "+=5200";
const SCRUB_SMOOTHING = 1.25;
const USE_HIGH_QUALITY_RESIZE = true;
const OUTPUT_FILTER = "contrast(1.07) saturate(1.06)";

function publicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const root = base.endsWith("/") ? base : `${base}/`;
  const clean = path.replace(/^\//, "");
  return `${root}${clean}`;
}

function frameSrc(frameIndex: number): string {
  if (FRAME_SOURCE === "ezgif") {
    const n = EZGIF_FIRST + frameIndex;
    return publicUrl(
      `${FRAME_DIR}/ezgif-frame-${String(n).padStart(3, "0")}.jpg`,
    );
  }
  return publicUrl(
    `frames/frame_${String(frameIndex + 1).padStart(4, "0")}.jpg`,
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

export default function FrameScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: TOTAL_FRAMES }, () => null),
  );

  const targetFrameRef = useRef(0);
  const rafRef = useRef(0);
  const drawSerialRef = useRef(0);

  const [preloadReady, setPreloadReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [displayFrame, setDisplayFrame] = useState(0);

  const getBestImage = useCallback((idx: number): HTMLImageElement | null => {
    const arr = framesRef.current;
    if (arr[idx]?.complete && arr[idx]!.naturalWidth > 0) return arr[idx];
    for (let i = idx; i >= 0; i--) {
      const im = arr[i];
      if (im?.complete && im.naturalWidth > 0) return im;
    }
    for (let i = idx + 1; i < TOTAL_FRAMES; i++) {
      const im = arr[i];
      if (im?.complete && im.naturalWidth > 0) return im;
    }
    return null;
  }, []);

  const drawFrame = useCallback(
    async (frameIndex: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const img = getBestImage(frameIndex);
      if (!img) return;

      const serial = ++drawSerialRef.current;

      const rect = container.getBoundingClientRect();
      const cw = Math.max(1, Math.round(rect.width));
      const ch = Math.max(1, Math.round(rect.height));

      let dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
      while (dpr > 1 && cw * ch * dpr * dpr > MAX_CANVAS_PIXELS) {
        dpr -= 0.25;
      }
      dpr = Math.max(1, dpr);

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // Cover: fill viewport (no letterboxing); may crop edges like CSS object-cover
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const x = Math.round((cw - dw) / 2);
      const y = Math.round((ch - dh) / 2);

      let bitmap: ImageBitmap | null = null;
      if (USE_HIGH_QUALITY_RESIZE && typeof createImageBitmap === "function") {
        try {
          const rw = Math.max(1, Math.round(dw * dpr));
          const rh = Math.max(1, Math.round(dh * dpr));
          bitmap = await createImageBitmap(img, {
            resizeWidth: rw,
            resizeHeight: rh,
            resizeQuality: "high",
          });
        } catch {
          bitmap = null;
        }
      }

      if (serial !== drawSerialRef.current) {
        bitmap?.close();
        return;
      }

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) {
        bitmap?.close();
        return;
      }

      if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
        canvas.width = cw * dpr;
        canvas.height = ch * dpr;
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${ch}px`;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, cw, ch);

      ctx.filter = OUTPUT_FILTER;
      if (bitmap) {
        // Bitmap already matches device-pixel size; avoid extra bilinear pass
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bitmap, x, y, dw, dh);
        bitmap.close();
      } else {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, x, y, dw, dh);
      }
      ctx.filter = "none";
    },
    [getBestImage],
  );

  const scheduleDraw = useCallback(
    (frameIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
      targetFrameRef.current = clamped;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        drawFrame(targetFrameRef.current);
      });
    },
    [drawFrame],
  );

  useEffect(() => {
    let cancelled = false;
    const arr = framesRef.current;

    (async () => {
      await Promise.allSettled(
        Array.from({ length: PRELOAD_FIRST }, (_, i) =>
          loadImage(frameSrc(i)).then((img) => {
            arr[i] = img;
          }),
        ),
      );
      if (cancelled) return;
      setPreloadReady(true);
      setLoadProgress(PRELOAD_FIRST / TOTAL_FRAMES);

      const pump = (start: number) => {
        if (cancelled || start >= TOTAL_FRAMES) return;
        const end = Math.min(start + 28, TOTAL_FRAMES);
        const slice = Array.from({ length: end - start }, (_, j) => start + j);
        Promise.all(
          slice.map((i) =>
            loadImage(frameSrc(i))
              .then((img) => {
                arr[i] = img;
              })
              .catch(() => {}),
          ),
        ).then(() => {
          if (cancelled) return;
          setLoadProgress(end / TOTAL_FRAMES);
          const runNext = () => pump(end);
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(runNext, { timeout: 2500 });
          } else {
            window.setTimeout(runNext, 48);
          }
        });
      };

      pump(PRELOAD_FIRST);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!preloadReady) return;
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setDisplayFrame(0);
      scheduleDraw(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: SCROLL_SCRUB_DISTANCE,
      pin: true,
      pinSpacing: true,
      scrub: SCRUB_SMOOTHING,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
        setDisplayFrame(idx);
        scheduleDraw(idx);
      },
    });

    setDisplayFrame(0);
    scheduleDraw(0);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      trigger.kill();
      ScrollTrigger.refresh();
    };
  }, [preloadReady, scheduleDraw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      scheduleDraw(targetFrameRef.current);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [scheduleDraw]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-screen max-w-[100vw] bg-[#0a0a0a] theme-media-overlay"
      aria-label="Scroll-controlled frame sequence"
    >
      <div
        ref={containerRef}
        className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 top-8 z-10 flex flex-col items-center gap-2 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/45">
            Scroll
          </p>
          <p className="max-w-md px-4 text-sm font-light text-white/65">
            Cinematic frame sequence — scroll slowly to scrub the animation on
            the canvas.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2">
          <div className="h-[2px] w-44 max-w-[55vw] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full w-full origin-left bg-white/50 transition-[transform] duration-150 ease-out"
              style={{
                transform: `scaleX(${(displayFrame + 1) / TOTAL_FRAMES})`,
              }}
            />
          </div>
          <p className="text-[10px] tabular-nums tracking-widest text-white/40">
            {preloadReady
              ? `${displayFrame + 1} / ${TOTAL_FRAMES}`
              : "Loading frames…"}
          </p>
          {!preloadReady ? (
            <p className="text-[10px] text-white/35">
              {Math.round(loadProgress * 100)}% buffered
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

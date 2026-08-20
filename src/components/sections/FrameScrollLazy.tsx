"use client";

import dynamic from "next/dynamic";

const FrameScroll = dynamic(() => import("./FrameScroll"), {
  ssr: false,
  loading: () => (
    <section
      className="relative isolate w-screen max-w-[100vw] bg-[#0a0a0a]"
      aria-hidden
    >
      <div className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden" />
    </section>
  ),
});

export default function FrameScrollLazy() {
  return <FrameScroll />;
}

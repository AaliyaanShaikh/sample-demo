"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
};

export default function LazySection({
  children,
  className,
  placeholderClassName = "min-h-[40vh]",
  rootMargin = "350px 0px",
}: LazySectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || visible) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={wrapperRef} className={className}>
      {visible ? children : <div aria-hidden className={placeholderClassName} />}
    </div>
  );
}

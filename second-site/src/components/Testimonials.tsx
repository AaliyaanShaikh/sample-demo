"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "The craftsmanship is simply unparalleled—and months in, my ring still looks freshly polished. The anti-tarnish finish really shows. A masterpiece.",
    author: "Verified customer",
    location: "Sample review",
  },
  {
    id: 2,
    quote:
      "I purchased the diamond line necklace as a gift to myself. It still shines like the day I opened the box—beautiful anti-tarnish quality. This collection understands what special really means.",
    author: "Verified customer",
    location: "Sample review",
  },
  {
    id: 3,
    quote:
      "Every piece I own from this collection feels like it has its own soul—and I wear them daily without worrying about tarnish. The detail and lasting finish are extraordinary.",
    author: "Verified customer",
    location: "Sample review",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-hidden bg-mist py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <Quote
            className="mx-auto mb-6 text-ink/35"
            size={40}
            strokeWidth={1}
          />
          <h2 className="text-3xl md:text-4xl">Voices of Elegance</h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-0 flex-[0_0_100%] px-4"
                >
                  <div className="mx-auto max-w-2xl text-center">
                    <p className="mb-8 font-serif text-lg italic leading-relaxed text-ink sm:text-xl md:text-2xl">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm uppercase tracking-widest text-ink">
                        {testimonial.author}
                      </span>
                      <span className="text-xs text-ink/55">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={scrollPrev}
              className="text-ink transition-opacity hover:opacity-60"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollTo(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    index === selectedIndex
                      ? "w-6 bg-ink"
                      : "bg-ink/20 hover:bg-ink/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              className="text-ink transition-opacity hover:opacity-60"
              aria-label="Next review"
            >
              <ChevronRight size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Quote
            className="mx-auto mb-6 text-white/40"
            size={40}
            strokeWidth={1}
          />
          <h2 className="font-serif text-3xl text-white md:text-4xl">
            Voices of Elegance
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xl md:text-2xl font-serif text-white leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm tracking-widest uppercase text-white">
                        {testimonial.author}
                      </span>
                      <span className="text-xs text-white/70">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              type="button"
              onClick={scrollPrev}
              className="text-white transition-opacity hover:opacity-70"
              aria-label="Previous review"
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === selectedIndex
                      ? "bg-white w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              className="text-white transition-opacity hover:opacity-70"
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

"use client";

import * as React from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from "@/context/quote-modal-context";
import { useTrackingModal } from "@/context/tracking-modal-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { QuoteForm } from "./quote-form";

const rise = (delay: number, distance = 12, duration = 400) =>
  ({
    "--motion-delay": `${delay}ms`,
    "--rise-distance": `${distance}px`,
    "--rise-duration": `${duration}ms`,
  }) as React.CSSProperties;

export function Hero() {
  const { openQuoteModal } = useQuoteModal();
  const { openTrackingModal } = useTrackingModal();
  const reducedMotion = useReducedMotion();

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const userPaused = React.useRef(false);
  const [videoPaused, setVideoPaused] = React.useState(false);

  // Pause the background video when it leaves the viewport.
  React.useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (!userPaused.current) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Respect reduced motion: stop the video entirely.
  React.useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause();
    }
  }, [reducedMotion]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    userPaused.current = !userPaused.current;
    setVideoPaused(userPaused.current);

    if (userPaused.current) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] pt-[100px] min-[390px]:pt-[110px] sm:pt-[120px] lg:pt-[120px] pb-10 min-[390px]:pb-12 lg:pb-[64px] flex items-center overflow-hidden bg-navy-900">
      {/* 1. Full-Bleed Container-Ship Photo/Video */}
      <div className="hero-media absolute inset-0 z-0 bg-navy-900">
        <Image
          src="/images/hero-ship.jpg"
          alt="Commercial container vessel navigating an international freight corridor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_top] md:object-[85%_center]"
        />

        {!reducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-ship.jpg"
            aria-hidden="true"
            tabIndex={-1}
            className="hero-video absolute inset-0 h-full w-full object-cover object-[center_top] md:object-[85%_center]"
          >
            <source src="/videos/hero-ship.mp4" type="video/mp4" />
          </video>
        )}

        {/* Desktop Overlay (md+): linear-gradient(90deg, ...) + bottom fade */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(0deg, rgba(11,31,58,0.5) 0%, transparent 35%), linear-gradient(90deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.75) 40%, rgba(11,31,58,0.2) 75%, rgba(11,31,58,0.1) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Mobile Overlay (< md): ship visible on top, dark navy panel over headline/buttons */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,31,58,0.30) 0%, rgba(11,31,58,0.50) 25%, rgba(11,31,58,0.92) 55%, rgba(11,31,58,0.96) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Video pause control */}
      {!reducedMotion && (
        <button
          type="button"
          onClick={toggleVideo}
          aria-pressed={videoPaused}
          aria-label={videoPaused ? "Play background video" : "Pause background video"}
          className="motion-rise absolute top-[84px] right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-navy-900/60 text-white transition-colors duration-150 hover:bg-navy-900 md:top-auto md:bottom-6 md:right-6"
          style={rise(900, 8, 300)}
        >
          {videoPaused ? (
            <Play className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )}

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-8 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* Left Column: Headlines & CTA Buttons - max-w-[560px] */}
          <div className="lg:col-span-7 flex flex-col gap-3 min-[390px]:gap-3.5 text-left w-full max-w-[560px] -mt-3 min-[390px]:-mt-4 lg:mt-0">
            {/* Section 5: Eyebrow Label */}
            <div
              className="motion-rise flex items-center"
              style={rise(100, 8, 300)}
            >
              <span className="font-sans font-bold text-[12px] min-[390px]:text-[13px] tracking-[0.14em] uppercase text-orange-500">
                REAL-TIME TRACKING
              </span>
            </div>

            {/* Section 6: Main Headline - Two masked lines */}
            <h1 className="font-display font-bold text-[28px] min-[360px]:text-[32px] min-[390px]:text-[36px] min-[430px]:text-[40px] lg:text-[clamp(36px,5vw,64px)] leading-[1.06] lg:leading-[1.05] tracking-[-0.025em] text-white">
              <span className="motion-mask block">
                <span className="block" style={rise(180, 0, 600)}>
                  Where Logistics
                </span>
              </span>
              <span className="motion-mask block">
                <span
                  className="block whitespace-nowrap text-orange-500"
                  style={rise(280, 0, 600)}
                >
                  Meets Precision.
                </span>
              </span>
            </h1>

            {/* Section 7: Description Paragraph */}
            <p
              className="motion-rise font-sans text-[14px] min-[390px]:text-[15px] lg:text-[18px] leading-[1.5] lg:leading-[1.65] text-slate-100 max-w-[340px] min-[390px]:max-w-[420px] lg:max-w-[540px]"
              style={rise(420, 12, 400)}
            >
              Fast, secure, end-to-end freight across cities, countries, and continents.
            </p>

            {/* Section 8 & 9: Primary & Secondary CTA Buttons */}
            <div
              className="motion-rise flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1.5 w-full sm:w-auto"
              style={rise(500, 12, 350)}
            >
              <Button
                variant="primary"
                onClick={openQuoteModal}
                className="w-full sm:w-auto h-[48px] rounded-btn text-[15px] font-semibold shadow-sm"
              >
                Get a Quote
              </Button>
              <Button
                variant="ghost-white"
                onClick={() => openTrackingModal()}
                showArrow={false}
                className="w-full sm:w-auto h-[48px] rounded-btn text-[15px] font-semibold border-2 border-white hover:bg-white/10"
              >
                Track Shipment
              </Button>
            </div>

            {/* Section 10: Social Proof with 3 overlapping customer avatars */}
            <div className="pt-3.5 min-[390px]:pt-4 flex items-center">
              <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                {["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg"].map(
                  (src, index) => (
                    <div
                      key={src}
                      className="motion-rise relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-soft bg-navy-900"
                      style={rise(650 + index * 50, 8, 250)}
                    >
                      <Image
                        src={src}
                        alt={`Customer testimonial avatar ${index + 1}`}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Mobile: Vertical divider + 2-line text */}
              <div
                className="motion-rise flex items-center lg:hidden"
                style={rise(700, 8, 300)}
              >
                <div className="h-6 w-[1px] bg-white/40 mx-3 shrink-0" aria-hidden="true" />
                <div className="flex flex-col text-left leading-tight text-white">
                  <span className="font-sans text-[14px] tracking-tight">
                    <strong className="font-bold text-white">15k</strong> businesses
                  </span>
                  <span className="font-sans text-[14px] text-slate-200">
                    shipped with us
                  </span>
                </div>
              </div>

              {/* Desktop single line */}
              <span
                className="motion-rise hidden lg:inline ml-3.5 font-sans text-[14px] font-medium text-slate-200"
                style={rise(700, 8, 300)}
              >
                {siteConfig.trustProof}
              </span>
            </div>
          </div>

          {/* Desktop Right Column: Quote Card (ONLY visible on desktop lg+) */}
          <div className="hidden lg:flex lg:col-span-5 w-full justify-end lg:translate-x-4 xl:translate-x-6">
            <div
              className="motion-rise w-full max-w-[460px] xl:max-w-[480px]"
              style={rise(350, 16, 500)}
            >
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const castilloRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subjectParallaxRef = useRef<HTMLDivElement>(null);
  const subjectIdleRef = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useGSAP(() => {
    // Parallax on Scroll (Smoothed with scrub: 1)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smoother follow
      },
    });

    tl.to(fondoRef.current, { 
      y: isMobile ? 80 : 150, 
      scale: 1.02,
      ease: "none" 
    }, 0)
      .to(castilloRef.current, { 
        y: isMobile ? -30 : -50, 
        scale: 1.05,
        ease: "none" 
      }, 0)
      .to(titleRef.current, { 
        y: isMobile ? -100 : -200, 
        scale: 0.95,
        opacity: 0, 
        ease: "none" 
      }, 0)
      .to(subjectParallaxRef.current, { 
        y: isMobile ? -40 : -80, 
        scale: isMobile ? 0.98 : 1.05,
        ease: "none" 
      }, 0);

    // Living Subject Animation (Idle loop)
    gsap.to(subjectIdleRef.current, {
      y: "+=10",
      rotation: 0.3,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Entrance Animations
    gsap.from(".hero-tag", {
      opacity: 0,
      y: -15,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".hero-xv", {
      opacity: 0,
      scale: 1.02,
      filter: "blur(8px)",
      duration: 1.5,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.from(".hero-name", {
      opacity: 0,
      scale: 0.98,
      filter: "blur(8px)",
      duration: 1.8,
      delay: 0.6,
      ease: "power2.out",
    });

    gsap.from(subjectParallaxRef.current, {
      opacity: 0,
      y: isMobile ? 30 : 40,
      scale: isMobile ? 0.85 : 1,
      duration: 1.8,
      delay: 0.8,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] sm:h-[120vh] w-full bg-black overflow-hidden"
    >
      {/* 1. LAYER: FONDO (Deep Background) */}
      <div ref={fondoRef} className="absolute inset-0 z-0 will-change-transform" style={{ height: "125%" }}>
        <Image src="/FONDO.png" alt="Fondo" fill priority className="object-cover object-bottom md:object-center" />
      </div>

      {/* 2. LAYER: CASTILLO (Midground) */}
      <div ref={castilloRef} className="absolute inset-0 z-10 will-change-transform" style={{ height: "125%" }}>
        <Image src="/CASTILLO.png" alt="Castillo" fill priority className="object-cover object-bottom md:object-center" />
      </div>

      {/* 3. LAYER: TITLE & TEXT */}
      <div
        ref={titleRef}
        className="absolute inset-x-0 top-0 z-20 flex flex-col items-center justify-start text-center px-6 pt-16 sm:pt-24 md:pt-32 will-change-transform"
      >
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        <div className="relative z-10 mt-6 sm:mt-10 flex flex-col items-center">
          <span className="hero-tag text-[10px] sm:text-sm text-[#FFD700] tracking-[0.8em] sm:tracking-[1.2em] uppercase font-light mb-2 sm:mb-4 ml-[0.8em] sm:ml-[1.2em]">
            Celebramos los
          </span>
          
          <h2
            className="hero-xv text-[2.8rem] sm:text-[6rem] md:text-[7.5rem] leading-none italic font-medium text-gold drop-shadow-2xl mb-1 sm:mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Mis XV Años
          </h2>

          <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent my-3 sm:my-6" />

          <h1
            className="hero-name text-[3.8rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] leading-[0.85] font-black italic text-gold drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)] tracking-tighter"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Danna Abigail
          </h1>
        </div>
        
        <div className="relative z-10 mt-6 sm:mt-16 text-[#FDEBD0]/80 italic text-lg sm:text-2xl">
          <p style={{ fontFamily: "var(--font-cormorant)" }} className="tracking-[0.2em]">
            Bienvenidos a Mi Noche Mágica
          </p>
          <p className="mt-3 sm:mt-6 text-gold text-base sm:text-2xl tracking-[0.6em] sm:tracking-[1em] font-serif uppercase ml-[0.6em] sm:ml-[1em]" style={{ fontFamily: "var(--font-cinzel)" }}>
            20 de Junio, 2025
          </p>
        </div>
      </div>

      {/* 4. LAYER: SUBJECT */}
      <div
        ref={subjectParallaxRef}
        className="absolute inset-0 z-30 pointer-events-none will-change-transform pt-20 sm:pt-0"
      >
        <div ref={subjectIdleRef} className="absolute inset-0 will-change-transform" style={{ height: isMobile ? "110%" : "125%" }}>
          <Image src="/QUINCEAÑERA.png" alt="Danna" fill priority className="object-cover object-bottom md:object-center" />
        </div>
      </div>

      <div className="absolute inset-0 z-40 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <span className="text-[9px] sm:text-[10px] text-muted-foreground tracking-[0.3em] sm:tracking-[0.5em] uppercase opacity-50">
          Desliza
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>

      <style jsx>{`
        .text-gold {
          background: linear-gradient(180deg, #FDEBD0 0%, #FFD700 50%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}

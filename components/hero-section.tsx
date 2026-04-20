"use client";

import { useEffect, useRef } from "react";
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

  useGSAP(() => {
    // Media Query for responsive parallax values
    const isMobile = window.innerWidth < 768;

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
      y: isMobile ? 100 : 200, 
      scale: 1.05,
      ease: "none" 
    }, 0)
      .to(castilloRef.current, { 
        y: isMobile ? -50 : -80, 
        scale: 1.1,
        ease: "none" 
      }, 0)
      .to(titleRef.current, { 
        y: isMobile ? -150 : -300, 
        scale: 0.9,
        opacity: 0, 
        ease: "none" 
      }, 0)
      .to(subjectParallaxRef.current, { 
        y: isMobile ? -80 : -120, 
        scale: 1.1,
        ease: "none" 
      }, 0);

    // Living Subject Animation (Idle loop) - decoupled from parallax
    gsap.to(subjectIdleRef.current, {
      y: "+=15",
      rotation: 0.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(subjectIdleRef.current, {
      scale: 1.02,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Entrance Animations
    gsap.from(".hero-top-text", {
      opacity: 0,
      y: -30,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".hero-name", {
      opacity: 0,
      scale: 0.9,
      duration: 2,
      delay: 0.8,
      ease: "power2.out",
    });

    gsap.from(subjectParallaxRef.current, {
      opacity: 0,
      y: isMobile ? 30 : 50,
      duration: 2,
      delay: 1,
      ease: "power4.out",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] sm:h-[120vh] w-full bg-black overflow-hidden"
    >
      {/* 1. LAYER: FONDO (Deep Background) */}
      <div
        ref={fondoRef}
        className="absolute inset-0 z-0 bg-cover bg-bottom md:bg-center will-change-transform"
        style={{ backgroundImage: "url('/FONDO.png')", height: "135%" }}
      />

      {/* 2. LAYER: CASTILLO (Midground) */}
      <div
        ref={castilloRef}
        className="absolute inset-0 z-10 bg-cover bg-bottom md:bg-center will-change-transform"
        style={{ backgroundImage: "url('/CASTILLO.png')", height: "135%" }}
      />

      {/* 3. LAYER: TITLE & TEXT (Safe Zone: Top) */}
      <div
        ref={titleRef}
        className="absolute inset-x-0 top-0 z-20 flex flex-col items-center justify-start text-center px-6 pt-16 sm:pt-24 md:pt-32 will-change-transform"
      >
        {/* Top Scrim Gradient for text isolation */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        <div className="relative z-10 hero-top-text w-full">

        </div>

        <div className="relative z-10 mt-6 sm:mt-10">
          <h1
            className="hero-name text-[3.2rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] text-[#FDEBD0] leading-[0.9] drop-shadow-[0_5px_30px_rgba(0,0,0,0.8)] text-balance italic font-black"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Danna Abigail
          </h1>
          <p
            className="text-lg sm:text-3xl md:text-4xl text-[#FDEBD0]/90 mt-4 sm:mt-8 tracking-[0.4em] sm:tracking-[0.8em] drop-shadow-[0_2px_20px_rgba(0,0,0,1)] font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Mis XV Años
          </p>
        </div>
        
        <div className="relative z-10 mt-6 sm:mt-16 text-[#FDEBD0]/80 italic text-lg sm:text-2xl">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="tracking-[0.2em]">
            Bienvenidos a Mi Noche Mágica
          </p>
          <p className="mt-2 sm:mt-4 text-[#FFD700]/70 text-[10px] sm:text-xs tracking-[0.5em] font-serif uppercase">
            20 de Junio, 2025
          </p>
        </div>
      </div>

      {/* 4. LAYER: SUBJECT (Nested for decoupling) */}
      <div
        ref={subjectParallaxRef}
        className="absolute inset-0 z-30 pointer-events-none will-change-transform pt-20 sm:pt-0"
      >
        <div
          ref={subjectIdleRef}
          className="absolute inset-0 bg-cover bg-bottom md:bg-center will-change-transform"
          style={{ backgroundImage: "url('/QUINCEAÑERA.png')", height: "135%" }}
        />
      </div>

      {/* 5. OVERLAYS & HUD */}
      <div className="absolute inset-0 z-40 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        <span className="text-[9px] sm:text-[10px] text-muted-foreground tracking-[0.3em] sm:tracking-[0.5em] uppercase opacity-50">
          Desliza
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}

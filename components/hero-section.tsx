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
        y: isMobile ? -60 : -120, 
        scale: isMobile ? 0.95 : 1.1,
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
    gsap.from(".hero-tag", {
      opacity: 0,
      y: -20,
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".hero-xv", {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      duration: 1.8,
      delay: 0.7,
      ease: "power2.out",
    });

    gsap.from(".hero-name", {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 2,
      delay: 0.9,
      ease: "power2.out",
    });

    gsap.from(subjectParallaxRef.current, {
      opacity: 0,
      y: isMobile ? 40 : 50,
      scale: isMobile ? 0.75 : 1,
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

        <div className="relative z-10 mt-6 sm:mt-10 flex flex-col items-center">
          <span className="hero-tag text-[10px] sm:text-sm text-[#FFD700] tracking-[0.8em] sm:tracking-[1.2em] uppercase font-light mb-2 sm:mb-4 ml-[0.8em] sm:ml-[1.2em]">
            Celebramos los
          </span>
          
          <h2
            className="hero-xv text-[2.8rem] sm:text-[6rem] md:text-[7.5rem] leading-none italic font-medium text-gold drop-shadow-2xl mb-1 sm:mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Mis XV Años
          </h2>

          <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent my-3 sm:my-6" />

          <h1
            className="hero-name text-[3.8rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] leading-[0.85] font-black italic text-gold drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)] tracking-tighter"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Danna Abigail
          </h1>
        </div>
        
        <div className="relative z-10 mt-6 sm:mt-16 text-[#FDEBD0]/80 italic text-lg sm:text-2xl">
          <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="tracking-[0.2em]">
            Bienvenidos a Mi Noche Mágica
          </p>
          <p className="mt-3 sm:mt-6 text-gold text-base sm:text-2xl tracking-[0.6em] sm:tracking-[1em] font-serif uppercase ml-[0.6em] sm:ml-[1em]">
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
          style={{ 
            backgroundImage: "url('/QUINCEAÑERA.png')", 
            height: isMobile ? "115%" : "135%" 
          }}
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

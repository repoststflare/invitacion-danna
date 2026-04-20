"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const castleRef = useRef<HTMLDivElement>(null);
  const subjectParallaxRef = useRef<HTMLDivElement>(null);
  const subjectIdleRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const barTopRef = useRef<HTMLDivElement>(null);
  const barBottomRef = useRef<HTMLDivElement>(null);
  
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  
  const hasFinished = useRef(false);

  useGSAP(({ contextSafe }) => {
    if (!containerRef.current || hasFinished.current) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (hasFinished.current) return;
        hasFinished.current = true;
        
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => onComplete()
        });
      }
    });

    // 1. STABLE INITIAL STATE (No Opacity jumps)
    // We start with elements transparent/hidden, but container is already visible
    gsap.set([fondoRef.current, castleRef.current, subjectParallaxRef.current, introTextRef.current], { 
      opacity: 0 
    });
    gsap.set(fondoRef.current, { scale: 1.3 });
    gsap.set(castleRef.current, { scale: 1.4, filter: "blur(20px)" });
    gsap.set(subjectParallaxRef.current, { scale: 1.5, filter: "blur(15px)" });
    gsap.set(".theater-label, .theater-title", { opacity: 0 });
    gsap.set(flareRef.current, { opacity: 0, scaleX: 0 });
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { xPercent: 0 });

    // --- IDLE ANIMATIONS ---
    gsap.to(subjectIdleRef.current, {
      y: "-=15",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // --- SEQUENCE ---

    // A. Hook Text
    tl.to(introTextRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, 0.2);

    tl.to(introTextRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power2.in"
    }, 1.5);

    // B. Aperture
    tl.to(leftCurtainRef.current, { xPercent: -100, duration: 1, ease: "power4.inOut" }, 1.8);
    tl.to(rightCurtainRef.current, { xPercent: 100, duration: 1, ease: "power4.inOut" }, 1.8);

    tl.to(fondoRef.current, { opacity: 1, scale: 1, duration: 1.5 }, 1.9);
    tl.to(castleRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5 }, 2.0);
    tl.to(subjectParallaxRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 }, 2.2);

    // C. Title
    tl.to(flareRef.current, { opacity: 0.8, scaleX: 1, duration: 0.8 }, 2.5);
    tl.to(".theater-label", { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 2.8);
    tl.to(".theater-title", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 }, 3.0);

    // D. Closing Bars
    tl.to([barTopRef.current, barBottomRef.current], { height: "0%", duration: 0.8 }, 4.2);

    // Play everything
    tl.play();

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-start justify-center overflow-hidden"
    >
      {/* 0. PROLOGUE */}
      <div 
        ref={introTextRef}
        className="absolute z-[90] inset-0 flex items-center justify-center px-10 text-center pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.9)_0%,rgba(0,0,0,1)_100%)] opacity-100" />
        
        <div className="relative space-y-8">
          <h2 
            className="text-2xl sm:text-5xl md:text-6xl text-[#FDEBD0] tracking-[0.1em] italic font-light drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Toda gran historia merece un comienzo inolvidable...
          </h2>
          <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto" />
        </div>
      </div>

      {/* 1. CURTAINS */}
      <div 
        ref={leftCurtainRef}
        className="absolute inset-0 z-[80] pointer-events-none will-change-transform"
      >
        <div className="absolute inset-0 bg-[#FFD700]/5 mix-blend-color" />
        <Image src="/telon-izquierdo.png" alt="Telón" fill priority className="object-cover" />
      </div>
      <div 
        ref={rightCurtainRef}
        className="absolute inset-0 z-[80] pointer-events-none will-change-transform"
      >
        <div className="absolute inset-0 bg-[#FFD700]/5 mix-blend-color" />
        <Image src="/telon-derecho.png" alt="Telón" fill priority className="object-cover" />
      </div>

      {/* 2. LAYERS */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={fondoRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/FONDO.png')", backgroundPosition: "center 80%" }}
        />
        <div
          ref={castleRef}
          className="absolute inset-0 bg-cover bg-center z-10 will-change-transform"
          style={{ backgroundImage: "url('/CASTILLO.png')", backgroundPosition: "center 80%" }}
        />
        <div
          ref={subjectParallaxRef}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div
            ref={subjectIdleRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: "url('/QUINCEAÑERA.png')", backgroundPosition: "center 80%" }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.9)_100%)] z-30" />
      </div>

      {/* 3. FLARE */}
      <div 
        ref={flareRef}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent z-[55] blur-[1px] opacity-0"
        style={{ top: "40%" }}
      />

      {/* 4. TITLE (Safe Zone: Top) */}
      <div className="relative z-[60] text-center px-6 pt-16 sm:pt-24 md:pt-32 w-full">
        {/* Top Scrim Gradient for text isolation */}
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

        <div className="relative z-10">

          <h1
            className="theater-title text-5xl sm:text-[9rem] md:text-[11rem] text-[#FDEBD0] font-black leading-none select-none italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Danna Abigail
          </h1>
          <div className="theater-label mt-10 text-[#FDEBD0]/80 text-[10px] sm:text-xs tracking-[1em] uppercase font-serif">
            Bienvenidos a Mi Noche Mágica
          </div>
        </div>
      </div>

      <div ref={barTopRef} className="absolute top-0 left-0 w-full bg-black z-[70]" />
      <div ref={barBottomRef} className="absolute bottom-0 left-0 w-full bg-black z-[70]" />

      <style jsx>{`
        .theater-title {
          background: linear-gradient(180deg, #FDEBD0 30%, #FFD700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(0,0,0,0.8));
        }
      `}</style>
    </div>
  );
}

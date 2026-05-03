"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

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
  const particleContainerRef = useRef<HTMLDivElement>(null);
  
  const hasFinished = useRef(false);

  useGSAP(({ contextSafe }) => {
    if (!containerRef.current || hasFinished.current) return;

    // --- PARTICLE CREATION ---
    const createParticles = () => {
      const pCount = 30;
      for (let i = 0; i < pCount; i++) {
        const p = document.createElement("div");
        p.className = "absolute rounded-full bg-white/40 blur-[1px]";
        const size = Math.random() * 3 + 1;
        gsap.set(p, {
          width: size,
          height: size,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5,
        });
        particleContainerRef.current?.appendChild(p);
        
        // Individual particle movement
        gsap.to(p, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: Math.random() * 10 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };
    createParticles();

    const tl = gsap.timeline({
      onComplete: () => {
        if (hasFinished.current) return;
        hasFinished.current = true;
        
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => onComplete()
        });
      }
    });

    // 1. INITIAL STATE
    gsap.set([fondoRef.current, castleRef.current, subjectParallaxRef.current, introTextRef.current], { 
      opacity: 0 
    });
    gsap.set(fondoRef.current, { scale: 1.4 });
    gsap.set(castleRef.current, { scale: 1.5, filter: "blur(30px)" });
    gsap.set(subjectParallaxRef.current, { scale: 1.6, filter: "blur(20px)" });
    gsap.set(".theater-label", { opacity: 0, y: 20 });
    gsap.set(".theater-title", { opacity: 0, scale: 0.9, filter: "blur(10px)" });
    gsap.set(".theater-xv-container", { opacity: 0, y: -50, scale: 1.1, filter: "blur(20px)" });
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { xPercent: 0, scale: 1 });

    // --- IDLE ANIMATIONS ---
    gsap.to(subjectIdleRef.current, {
      y: "-=20",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Subtle parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / window.innerWidth;
      const moveY = (clientY - window.innerHeight / 2) / window.innerHeight;

      gsap.to(fondoRef.current, { x: moveX * 20, y: moveY * 20, duration: 1 });
      gsap.to(castleRef.current, { x: moveX * 40, y: moveY * 40, duration: 1 });
      gsap.to(subjectParallaxRef.current, { x: moveX * 60, y: moveY * 60, duration: 1 });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- SEQUENCE ---

    // A. Hook Text - More dramatic
    tl.to(introTextRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1.05,
      duration: 2,
      ease: "power2.out"
    }, 0.5);

    tl.to(introTextRef.current, {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.1,
      duration: 1,
      ease: "power2.in"
    }, 2.5);

    // B. Aperture
    tl.to(leftCurtainRef.current, { 
      xPercent: -105, 
      rotateY: -20,
      duration: 2.5, 
      ease: "expo.inOut" 
    }, 3.5);
    tl.to(rightCurtainRef.current, { 
      xPercent: 105, 
      rotateY: 20,
      duration: 2.5, 
      ease: "expo.inOut" 
    }, 3.5);

    // Reveal layers with depth of field feeling
    tl.to(fondoRef.current, { opacity: 1, scale: 1.1, duration: 2.5, ease: "power2.out" }, 3.8);
    tl.to(castleRef.current, { opacity: 1, scale: 1.2, filter: "blur(0px)", duration: 2.5, ease: "power2.out" }, 4.0);
    tl.to(subjectParallaxRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2.0, ease: "back.out(1.2)" }, 4.3);

    // C. Title Reveal
    tl.to(".theater-xv-container", {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 2,
      ease: "power3.out"
    }, 4.6);

    tl.to(".theater-title", { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)", 
      duration: 2, 
      ease: "power3.out" 
    }, 4.8);
    
    tl.to(".theater-label", { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "power2.out" 
    }, 5.5);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-start justify-center overflow-hidden perspective-1000"
    >
      {/* 0. PARTICLES */}
      <div ref={particleContainerRef} className="absolute inset-0 z-[40] pointer-events-none" />

      {/* 1. PROLOGUE */}
      <div 
        ref={introTextRef}
        className="absolute z-[100] inset-0 flex items-center justify-center px-10 text-center pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="relative space-y-8 max-w-4xl">
          <h2 
            className="text-3xl sm:text-5xl md:text-7xl text-[#FDEBD0] tracking-widest italic font-light drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Toda gran historia merece un comienzo inolvidable...
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" 
          />
        </div>
      </div>

      {/* 2. CURTAINS */}
      <div 
        ref={leftCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-left will-change-transform"
      >
        <Image src="/telon-izquierdo.png" alt="Telón" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>
      <div 
        ref={rightCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-right will-change-transform"
      >
        <Image src="/telon-derecho.png" alt="Telón" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* 3. LAYERS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={fondoRef}
          className="absolute inset-[-10%] bg-cover bg-bottom sm:bg-[center_80%] will-change-transform"
          style={{ backgroundImage: "url('/FONDO.png')" }}
        />
        <div
          ref={castleRef}
          className="absolute inset-[-5%] bg-cover bg-bottom sm:bg-[center_80%] z-10 will-change-transform"
          style={{ backgroundImage: "url('/CASTILLO.png')" }}
        />
        <div
          ref={subjectParallaxRef}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div
            ref={subjectIdleRef}
            className="absolute inset-0 bg-cover bg-bottom sm:bg-[center_80%] will-change-transform scale-110"
            style={{ backgroundImage: "url('/QUINCEAÑERA.png')" }}
          />
        </div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.9)_100%)] z-30" />
        
        {/* Atmospheric Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-35" />
      </div>

      {/* 4. TITLE */}
      <div className="absolute top-4 sm:top-24 md:top-32 z-[60] text-center px-4 w-full flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          {/* Professional Layout for Intro */}
          <div className="theater-xv-container flex flex-col items-center">
             <span className="text-[10px] sm:text-sm text-[#FFD700] tracking-[1em] uppercase font-light mb-2 sm:mb-4 ml-[1em]">
               Celebramos los
             </span>
             <h2 
               className="text-[3rem] sm:text-[6.5rem] md:text-[8rem] text-gold italic font-medium leading-none drop-shadow-2xl"
               style={{ fontFamily: "'Cormorant Garamond', serif" }}
             >
               Mis XV Años
             </h2>
             
             <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent my-4 sm:my-8" />

             <h1
               className="theater-title text-[3.8rem] sm:text-[8.5rem] md:text-[11rem] text-gold font-black italic leading-[0.85] tracking-tighter drop-shadow-2xl"
               style={{ fontFamily: "'Cormorant Garamond', serif" }}
             >
               Danna Abigail
             </h1>
          </div>
          
          <div className="theater-label mt-4 sm:mt-10 text-[#FDEBD0]/90 text-[9px] sm:text-sm tracking-[0.6em] sm:tracking-[1.5em] uppercase font-serif drop-shadow-lg ml-[0.6em] sm:ml-[1.5em]">
            Bienvenidos a Mi Noche Mágica
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-gold {
          background: linear-gradient(180deg, #FDEBD0 0%, #FFD700 50%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(212,175,55,0.3));
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}

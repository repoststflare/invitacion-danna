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
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  
  const hasFinished = useRef(false);

  // Preload Hero Images
  useEffect(() => {
    const imagesToPreload = ["/FONDO.png", "/CASTILLO.png", "/QUINCEAÑERA.png"];
    imagesToPreload.forEach((src) => {
      const img = new (window as any).Image();
      img.src = src;
    });
  }, []);

  useGSAP(({ contextSafe }) => {
    if (!containerRef.current || hasFinished.current) return;

    // --- PARTICLE CREATION (Optimized with simpler animation) ---
    const createParticles = () => {
      const pCount = 20; // Reduced count for performance
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < pCount; i++) {
        const p = document.createElement("div");
        p.className = "absolute rounded-full bg-white/30 blur-[1px] will-change-transform";
        const size = Math.random() * 2 + 1;
        gsap.set(p, {
          width: size,
          height: size,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.4,
        });
        fragment.appendChild(p);
        
        gsap.to(p, {
          x: `+=${Math.random() * 60 - 30}`,
          y: `+=${Math.random() * 60 - 30}`,
          duration: Math.random() * 15 + 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      particleContainerRef.current?.appendChild(fragment);
    };
    createParticles();

    const tl = gsap.timeline({
      onComplete: () => {
        if (hasFinished.current) return;
        hasFinished.current = true;
        
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => onComplete()
        });
      }
    });

    // 1. INITIAL STATE
    gsap.set([fondoRef.current, castleRef.current, subjectParallaxRef.current, introTextRef.current], { 
      opacity: 0 
    });
    gsap.set(fondoRef.current, { scale: 1.2 });
    gsap.set(castleRef.current, { scale: 1.3, filter: "blur(20px)" });
    gsap.set(subjectParallaxRef.current, { scale: 1.4, filter: "blur(15px)" });
    gsap.set(".theater-label", { opacity: 0, y: 15 });
    gsap.set(".theater-title", { opacity: 0, scale: 0.95, filter: "blur(8px)" });
    gsap.set(".theater-xv-container", { opacity: 0, y: -30, scale: 1.05, filter: "blur(15px)" });
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { xPercent: 0 });

    // --- IDLE ANIMATIONS ---
    gsap.to(subjectIdleRef.current, {
      y: "-=15",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Throttled mouse move
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 32) return; // ~30fps throttle
      lastMove = now;

      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / window.innerWidth;
      const moveY = (clientY - window.innerHeight / 2) / window.innerHeight;

      gsap.to(fondoRef.current, { x: moveX * 15, y: moveY * 15, duration: 1.5, ease: "power1.out" });
      gsap.to(castleRef.current, { x: moveX * 30, y: moveY * 30, duration: 1.5, ease: "power1.out" });
      gsap.to(subjectParallaxRef.current, { x: moveX * 50, y: moveY * 50, duration: 1.5, ease: "power1.out" });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- SEQUENCE ---
    tl.to(introTextRef.current, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1.02,
      duration: 1.5,
      ease: "power2.out"
    }, 0.5);

    tl.to(introTextRef.current, {
      opacity: 0,
      filter: "blur(15px)",
      scale: 1.05,
      duration: 0.8,
      ease: "power2.in"
    }, 2.2);

    tl.to(leftCurtainRef.current, { 
      xPercent: -102, 
      rotateY: -15,
      duration: 2, 
      ease: "expo.inOut" 
    }, 3.2);
    tl.to(rightCurtainRef.current, { 
      xPercent: 102, 
      rotateY: 15,
      duration: 2, 
      ease: "expo.inOut" 
    }, 3.2);

    tl.to(fondoRef.current, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }, 3.5);
    tl.to(castleRef.current, { opacity: 1, scale: 1.1, filter: "blur(0px)", duration: 2, ease: "power2.out" }, 3.7);
    tl.to(subjectParallaxRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "back.out(1.1)" }, 4.0);

    tl.to(".theater-xv-container", {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3.out"
    }, 4.3);

    tl.to(".theater-title", { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)", 
      duration: 1.5, 
      ease: "power3.out" 
    }, 4.5);
    
    tl.to(".theater-label", { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out" 
    }, 5.2);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-start justify-center overflow-hidden perspective-1000"
    >
      <div ref={particleContainerRef} className="absolute inset-0 z-[40] pointer-events-none" />

      <div 
        ref={introTextRef}
        className="absolute z-[100] inset-0 flex items-center justify-center px-10 text-center pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="relative space-y-8 max-w-4xl">
          <h2 
            className="text-3xl sm:text-5xl md:text-7xl text-[#FDEBD0] tracking-widest italic font-light drop-shadow-[0_0_50px_rgba(212,175,55,0.6)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
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

      <div 
        ref={leftCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-left will-change-transform"
      >
        <Image src="/telon-izquierdo.png" alt="Telón" fill priority fetchPriority="high" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>
      <div 
        ref={rightCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-right will-change-transform"
      >
        <Image src="/telon-derecho.png" alt="Telón" fill priority fetchPriority="high" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div ref={fondoRef} className="absolute inset-[-10%] will-change-transform">
          <Image src="/FONDO.png" alt="Fondo" fill priority className="object-cover object-bottom sm:object-[center_80%]" />
        </div>
        <div ref={castleRef} className="absolute inset-[-5%] z-10 will-change-transform">
          <Image src="/CASTILLO.png" alt="Castillo" fill priority className="object-cover object-bottom sm:object-[center_80%]" />
        </div>
        <div
          ref={subjectParallaxRef}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div
            ref={subjectIdleRef}
            className="absolute inset-0 will-change-transform scale-110"
          >
            <Image src="/QUINCEAÑERA.png" alt="Danna" fill priority className="object-cover object-bottom sm:object-[center_80%]" />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.9)_100%)] z-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-35" />
      </div>

      <div className="absolute top-4 sm:top-24 md:top-32 z-[60] text-center px-4 w-full flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="theater-xv-container flex flex-col items-center">
             <span className="text-[10px] sm:text-sm text-[#FFD700] tracking-[1em] uppercase font-light mb-2 sm:mb-4 ml-[1em]">
               Celebramos los
             </span>
             <h2 
               className="text-[3rem] sm:text-[6.5rem] md:text-[8rem] text-gold italic font-medium leading-none drop-shadow-2xl"
               style={{ fontFamily: "var(--font-cormorant)" }}
             >
               Mis XV Años
             </h2>
             
             <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent my-4 sm:my-8" />

             <h1
               className="theater-title text-[3.8rem] sm:text-[8.5rem] md:text-[11rem] text-gold font-black italic leading-[0.85] tracking-tighter drop-shadow-2xl"
               style={{ fontFamily: "var(--font-cormorant)" }}
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

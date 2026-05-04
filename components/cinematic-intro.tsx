"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fondoRef = useRef<HTMLDivElement>(null);
  const castleRef = useRef<HTMLDivElement>(null);
  const subjectParallaxRef = useRef<HTMLDivElement>(null);
  const subjectIdleRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const hasFinished = useRef(false);

  useGSAP(() => {
    if (!containerRef.current || hasFinished.current) return;

    const isMobile = window.innerWidth < 768;

    // --- PARTICLES (fewer on mobile) ---
    const createParticles = () => {
      const pCount = isMobile ? 12 : 25;
      for (let i = 0; i < pCount; i++) {
        const p = document.createElement("div");
        p.className = "absolute rounded-full bg-white/40";
        const size = Math.random() * 3 + 1;
        gsap.set(p, {
          width: size,
          height: size,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5,
          force3D: true,
        });
        particleContainerRef.current?.appendChild(p);
        gsap.to(p, {
          x: `+=${Math.random() * 80 - 40}`,
          y: `+=${Math.random() * 80 - 40}`,
          duration: Math.random() * 12 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          force3D: true,
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
          duration: 1.2,
          ease: "power2.inOut",
          force3D: true,
          onComplete: () => onComplete(),
        });
      },
    });

    // 1. INITIAL STATE - all hidden
    gsap.set(
      [fondoRef.current, castleRef.current, subjectParallaxRef.current, introTextRef.current],
      { opacity: 0, force3D: true }
    );
    gsap.set(fondoRef.current, { scale: 1.3, force3D: true });
    gsap.set(castleRef.current, { scale: 1.4, filter: "blur(4px)", force3D: true });
    gsap.set(subjectParallaxRef.current, { scale: 1.5, filter: "blur(3px)", force3D: true });
    gsap.set(".theater-label", { opacity: 0, y: 20 });
    gsap.set(".theater-title", { opacity: 0, scale: 0.92, filter: "blur(2px)" });
    gsap.set(".theater-xv-container", { opacity: 0, y: -40, scale: 1.08, filter: "blur(5px)" });
    gsap.set([leftCurtainRef.current, rightCurtainRef.current], { xPercent: 0, force3D: true });

    // --- IDLE: subject floating ---
    gsap.to(subjectIdleRef.current, {
      y: "-=18",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
    });

    // --- MOUSE PARALLAX (desktop only, throttled) ---
    if (!isMobile) {
      let mouseTick = false;
      const handleMouseMove = (e: MouseEvent) => {
        if (mouseTick) return;
        mouseTick = true;
        requestAnimationFrame(() => {
          const moveX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
          const moveY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
          gsap.to(fondoRef.current, { x: moveX * 18, y: moveY * 18, duration: 1.2, force3D: true });
          gsap.to(castleRef.current, { x: moveX * 36, y: moveY * 36, duration: 1.2, force3D: true });
          gsap.to(subjectParallaxRef.current, { x: moveX * 55, y: moveY * 55, duration: 1.2, force3D: true });
          mouseTick = false;
        });
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // --- SEQUENCE ---
    // A. Hook Text
    tl.to(introTextRef.current, {
      opacity: 1,
      scale: 1.04,
      duration: 1.8,
      ease: "power2.out",
    }, 0.5);
    tl.to(introTextRef.current, {
      opacity: 0,
      filter: "blur(15px)",
      scale: 1.08,
      duration: 0.9,
      ease: "power2.in",
    }, 2.4);

    // B. Curtains open
    tl.to(leftCurtainRef.current, {
      xPercent: -105,
      duration: 2.2,
      ease: "expo.inOut",
      force3D: true,
    }, 3.3);
    tl.to(rightCurtainRef.current, {
      xPercent: 105,
      duration: 2.2,
      ease: "expo.inOut",
      force3D: true,
    }, 3.3);

    // C. Reveal layers
    tl.to(fondoRef.current, { opacity: 1, scale: 1.08, duration: 2.2, ease: "power2.out", force3D: true }, 3.6);
    tl.to(castleRef.current, { opacity: 1, scale: 1.15, filter: "blur(0px)", duration: 2.2, ease: "power2.out", force3D: true }, 3.8);
    tl.to(subjectParallaxRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "back.out(1.1)", force3D: true }, 4.1);

    // D. Title reveal
    tl.to(".theater-xv-container", {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power3.out",
    }, 4.4);
    tl.to(".theater-title", {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power3.out",
    }, 4.6);
    tl.to(".theater-label", {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
    }, 5.3);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-black flex items-start justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
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

      {/* 2. CURTAINS - next/image for optimization */}
      <div
        ref={leftCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-left will-change-transform"
      >
        <Image
          src="/telon-izquierdo.png"
          alt="Telón izquierdo"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>
      <div
        ref={rightCurtainRef}
        className="absolute inset-0 z-[90] pointer-events-none origin-right will-change-transform"
      >
        <Image
          src="/telon-derecho.png"
          alt="Telón derecho"
          fill
          priority
          quality={100}
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
      </div>

      {/* 3. LAYERS - all using next/image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fondo */}
        <div
          ref={fondoRef}
          className="absolute inset-[-10%] will-change-transform"
        >
          <Image
            src="/FONDO.png"
            alt="Fondo"
            fill
            priority
            quality={100}
            className="object-cover object-bottom sm:object-[center_80%]"
            sizes="100vw"
          />
        </div>

        {/* Castillo */}
        <div
          ref={castleRef}
          className="absolute inset-[-5%] z-10 will-change-transform"
        >
          <Image
            src="/CASTILLO.png"
            alt="Castillo"
            fill
            priority
            quality={100}
            className="object-cover object-bottom sm:object-[center_80%]"
            sizes="100vw"
          />
        </div>

        {/* Subject */}
        <div
          ref={subjectParallaxRef}
          className="absolute inset-0 z-20 will-change-transform"
        >
          <div
            ref={subjectIdleRef}
            className="absolute inset-0 will-change-transform scale-110"
          >
            <Image
              src="/QUINCEAÑERA.png"
              alt="Quinceañera"
              fill
              priority
              quality={100}
              className="object-cover object-bottom sm:object-[center_80%]"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.35)_50%,rgba(0,0,0,0.88)_100%)] z-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-55 z-[35]" />
      </div>

      {/* 4. TITLE */}
      <div className="absolute top-4 sm:top-24 md:top-32 z-[60] text-center px-4 w-full flex flex-col items-center">
        <div className="relative flex flex-col items-center">
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
      `}</style>
    </div>
  );
}

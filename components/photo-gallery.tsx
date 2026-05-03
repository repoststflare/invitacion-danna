"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/gallery/portrait-1.jpg",
    alt: "Retrato gotico elegante",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "/gallery/detail-1.jpg",
    alt: "Detalles victorianos",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "/gallery/detail-2.jpg",
    alt: "Elementos decorativos",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "/gallery/portrait-2.jpg",
    alt: "Momento magico",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "/gallery/detail-3.jpg",
    alt: "Inspiracion Tim Burton",
    span: "col-span-2 row-span-1",
  },
];

function GothicFrameSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M0 15 Q0 0 15 0"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-primary/30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M85 0 Q100 0 100 15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-primary/30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d="M100 85 Q100 100 85 100"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-primary/30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d="M15 100 Q0 100 0 85"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="text-primary/30"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </svg>
  );
}

function GalleryImage({
  image,
  index,
}: {
  image: (typeof galleryImages)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.7, rotateY: -30 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.2, 0.65, 0.3, 0.9] }}
      whileHover={{ 
        scale: 1.03, 
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      className={`${image.span} relative overflow-hidden rounded-lg group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gothic frame */}
      <GothicFrameSVG />

      {/* Placeholder gradient with gothic pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-card">
        {/* Gothic pattern overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={isHovered ? { opacity: 0.4 } : { opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`gothic-${image.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path
                  d="M10 0 L20 10 L10 20 L0 10 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-[#D4AF37]/40"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gothic-${image.id})`} />
          </svg>
        </motion.div>

        {/* Animated smoke/mist effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-16 bg-gradient-to-t from-primary/20 to-transparent smoke"
              style={{ 
                bottom: `${i * 30}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </motion.div>

        {/* Centered decorative element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isHovered ? { 
              scale: 1.2, 
              rotate: 180,
              filter: "drop-shadow(0 0 20px rgba(80, 200, 120, 0.6))"
            } : { 
              scale: 1, 
              rotate: 0,
              filter: "drop-shadow(0 0 5px rgba(80, 200, 120, 0.2))"
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg
              className="w-20 h-20 text-primary/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <motion.path 
                d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.2 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Hover overlay with reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-center p-6"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p
            className="text-foreground text-center text-lg"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {image.alt}
          </p>
          <motion.div
            className="w-16 h-px bg-[#D4AF37] mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Spectral glow border effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          boxShadow: "inset 0 0 30px rgba(80, 200, 120, 0.3), 0 0 40px rgba(80, 200, 120, 0.2)"
        }}
      />

      {/* Corner sparkles on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute top-2 left-2 w-2 h-2 bg-primary rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.5] }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.5] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-2 h-2 bg-primary rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.5] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.5] }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </>
      )}
    </motion.div>
  );
}

function FloatingFeather({ delay, startX }: { delay: number; startX: string }) {
  return (
    <motion.svg
      className="absolute w-8 h-12 text-primary/20"
      style={{ left: startX, top: "-10%" }}
      viewBox="0 0 24 36"
      fill="currentColor"
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.4, 0.4, 0],
        y: ["0%", "400%"],
        rotate: [0, 20, -20, 10, 0],
        x: [0, 30, -20, 40, 0]
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M12 0 Q14 8 12 16 Q10 24 12 32 M12 8 Q8 12 12 16 M12 8 Q16 12 12 16 M12 16 Q8 20 12 24 M12 16 Q16 20 12 24" 
        stroke="currentColor" 
        fill="none" 
        strokeWidth="0.5"
      />
    </motion.svg>
  );
}

export function PhotoGallery() {
  const headerRef = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={sectionRef} className="relative py-32 px-4 overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      </motion.div>

      {/* Floating feathers */}
      <FloatingFeather delay={0} startX="10%" />
      <FloatingFeather delay={3} startX="80%" />
      <FloatingFeather delay={6} startX="50%" />
      <FloatingFeather delay={9} startX="30%" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.4), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Large ambient orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Decorative ornament */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div 
              className="w-20 h-px bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ transformOrigin: "right" }}
            />
            <motion.svg 
              className="w-8 h-8 text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </motion.svg>
            <motion.div 
              className="w-20 h-px bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl text-[#FDFCEB] mb-6 italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={isHeaderInView ? { opacity: 1, letterSpacing: "0.05em" } : { opacity: 0, letterSpacing: "0.2em" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Galería de Sueños
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Momentos capturados en el umbral entre la luz y la sombra
          </motion.p>
        </motion.div>

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </motion.div>

        {/* Note about photos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-block glass-card rounded-lg px-8 py-4 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <div className="shimmer absolute inset-0 opacity-30" />
            <p
              className="text-muted-foreground italic relative z-10"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Las fotografias del evento seran compartidas en esta galeria
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <svg className="w-64 h-8 text-primary/30" viewBox="0 0 240 30">
            <motion.path
              d="M20 15 Q60 5 120 15 Q180 25 220 15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
            <motion.path
              d="M20 15 Q60 25 120 15 Q180 5 220 15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            <motion.circle
              cx="120"
              cy="15"
              r="4"
              fill="currentColor"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

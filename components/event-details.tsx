"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const eventDetails = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 18v-8M10 10l2-2 2 2" />
      </svg>
    ),
    title: "Misa",
    detail: "Parroquia San Francisco de Asís",
    subtitle: "1:00 pm • Calle Miguel Hidalgo Mz 31, Coacalco",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+San+Francisco+de+Asís,+Coacalco",
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Recepción",
    detail: 'Salón "A mi manera"',
    subtitle: "4:00 pm • Calle Emiliano Zapata s/n, Coacalco",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=JVHW%2BJMM+San+Francisco+Coacalco,+Estado+de+México",
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 12V8H4v4M4 12v8h16v-8M4 12h16" />
        <path d="M12 12v8" />
      </svg>
    ),
    title: "Sugerencia de Regalo",
    detail: "Lluvia de sobres o Mesa de regalos",
    subtitle: "\"Si deseas obsequiarme algo, puedes hacerlo en efectivo o mediante mi mesa de regalos.\"",
  },
];

function GothicFrame() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Animated corner flourishes */}
      <motion.path
        d="M0 20 Q0 0 20 0"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="text-primary/40"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M80 0 Q100 0 100 20"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="text-primary/40"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <motion.path
        d="M100 80 Q100 100 80 100"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="text-primary/40"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d="M20 100 Q0 100 0 80"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        className="text-primary/40"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
      />
    </svg>
  );
}

function DetailCard({
  item,
  index,
}: {
  item: (typeof eventDetails)[0] & { mapUrl?: string };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="glass-card rounded-lg p-8 text-center group hover:border-primary/50 transition-all duration-500 relative overflow-hidden haunted-hover"
    >
      {/* Animated background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent shimmer"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Gothic frame */}
      <GothicFrame />

      {/* Decorative corner elements */}
      <motion.div 
        className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-primary/30 group-hover:border-primary transition-colors duration-500"
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-primary/30 group-hover:border-primary transition-colors duration-500"
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-primary/30 group-hover:border-primary transition-colors duration-500"
        whileHover={{ scale: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-primary/30 group-hover:border-primary transition-colors duration-500"
        whileHover={{ scale: 1.2 }}
      />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      </div>

      {/* Icon */}
      <motion.div
        className="text-[#D4AF37] mb-6 flex justify-center relative z-10"
        whileHover={{ 
          scale: 1.2, 
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.5 }
        }}
      >
        <motion.div
          animate={{ 
            filter: ["drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))", "drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))", "drop-shadow(0 0 5px rgba(212, 175, 55, 0.3))"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {item.icon}
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 relative z-10"
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {item.title}
      </motion.h3>

      {/* Main detail */}
      <motion.p
        className="text-2xl md:text-4xl text-[#FDFCEB] mb-2 relative z-10 glow-text italic font-light"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {item.detail}
      </motion.p>

      {/* Subtitle */}
      <motion.p
        className="text-muted-foreground italic relative z-10 whitespace-pre-line leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {item.subtitle}
      </motion.p>
      
      {item.mapUrl && (
        <motion.a
          href={item.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-20 mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-xs tracking-[0.2em] uppercase font-sans font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ver Ubicación
        </motion.a>
      )}
    </motion.div>
  );
}

function FloatingCandle({ position }: { position: "left" | "right" }) {
  const x = position === "left" ? "5%" : "90%";
  
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 hidden lg:block"
      style={{ [position]: "5%" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Candle */}
        <div className="relative">
          <div className="w-4 h-24 bg-gradient-to-t from-foreground/50 to-foreground/20 rounded-t mx-auto" />
          {/* Flame */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2"
            animate={{ 
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.9, 1, 0.85, 1, 0.9]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div 
              className="w-5 h-10 rounded-full"
              style={{ 
                background: "radial-gradient(ellipse at bottom, #FFD700 0%, #FF8C00 50%, transparent 100%)",
                filter: "blur(1px)"
              }}
            />
          </motion.div>
          {/* Glow */}
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EventDetails() {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        
        {/* Decorative lines */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.4), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.4), transparent)" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </motion.div>



      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Decorative element */}
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
              fill="currentColor"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
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
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={isHeaderInView ? { opacity: 1, letterSpacing: "0.05em" } : { opacity: 0, letterSpacing: "0.2em" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            La Velada
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground italic max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Te invitamos a ser parte de esta noche encantada donde los suenos cobran vida
          </motion.p>
        </motion.div>

        {/* Detail cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {eventDetails.map((item, index) => (
            <DetailCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Dress code note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.div 
            className="inline-block glass-card rounded-lg px-10 py-6 relative overflow-hidden group haunted-hover"
            whileHover={{ scale: 1.05 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-primary/40 group-hover:border-primary transition-colors" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/40 group-hover:border-primary transition-colors" />
            
            <p
              className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 relative z-10"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Codigo de Vestimenta
            </p>
            <p
              className="text-2xl text-[#D4AF37] glow-text relative z-10 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Gala Esmeralda
            </p>
            <p
              className="text-sm text-muted-foreground italic mt-2 relative z-10"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              El color Verde Esmeralda está reservado exclusivamente para la Quinceañera
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

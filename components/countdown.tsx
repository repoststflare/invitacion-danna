"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const targetDate = new Date("2026-06-20T19:00:00");

interface TimeUnit {
  value: number;
  label: string;
}

function TimeCard({ value, label, index }: TimeUnit & { index: number }) {
  const [prevValue, setPrevValue] = useState(value);
  const hasChanged = prevValue !== value;

  useEffect(() => {
    setPrevValue(value);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      className="relative perspective-1000"
    >
      <motion.div 
        className="glass-card rounded-xl p-6 sm:p-8 min-w-[90px] sm:min-w-[120px] text-center relative overflow-hidden group haunted-hover"
        whileHover={{ 
          scale: 1.1,
          rotateY: 10,
          transition: { duration: 0.3 }
        }}
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(80, 200, 120, 0.15) 0%, transparent 70%)"
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-30" />
        
        {/* Decorative corner elements with animation */}
        {[
          { pos: "top-2 left-2", border: "border-l border-t" },
          { pos: "top-2 right-2", border: "border-r border-t" },
          { pos: "bottom-2 left-2", border: "border-l border-b" },
          { pos: "bottom-2 right-2", border: "border-r border-b" },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className={`absolute ${corner.pos} w-3 h-3 ${corner.border} border-primary/40 group-hover:border-primary transition-colors`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Value with flip animation */}
        <div className="relative h-16 sm:h-20 flex items-center justify-center overflow-hidden">
          <motion.span
            key={value}
            initial={hasChanged ? { y: -40, opacity: 0, rotateX: 90 } : false}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-5xl sm:text-6xl md:text-7xl text-foreground relative z-10 glow-text"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
          >
            {value.toString().padStart(2, "0")}
          </motion.span>
        </div>

        {/* Label */}
        <motion.span
          className="text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2 block relative z-10"
          style={{ fontFamily: "'Cinzel', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.1 }}
        >
          {label}
        </motion.span>

        {/* Bottom glow */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

function GothicSeparator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 px-2 sm:px-4"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            "0 0 5px rgba(80, 200, 120, 0.3)",
            "0 0 15px rgba(80, 200, 120, 0.6)",
            "0 0 5px rgba(80, 200, 120, 0.3)"
          ]
        }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        className="w-3 h-3 rounded-full bg-primary"
      />
      <motion.div
        animate={{ height: [10, 20, 10] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-px bg-gradient-to-b from-primary to-transparent"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            "0 0 5px rgba(80, 200, 120, 0.3)",
            "0 0 15px rgba(80, 200, 120, 0.6)",
            "0 0 5px rgba(80, 200, 120, 0.3)"
          ]
        }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-3 h-3 rounded-full bg-primary"
      />
    </motion.div>
  );
}

function FloatingSpirit({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute hidden md:block"
      style={{ left: x, top: "30%" }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0.3, 0],
        y: [0, -50, -100],
        x: [0, 20, 0]
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg className="w-12 h-16 text-primary/20" viewBox="0 0 48 64" fill="currentColor">
        <ellipse cx="24" cy="20" rx="12" ry="15" />
        <path d="M12 35 Q24 60 36 35 Q30 50 24 45 Q18 50 12 35" />
      </svg>
    </motion.div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large animated orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        
        {/* Floating spirits */}
        <FloatingSpirit delay={0} x="10%" />
        <FloatingSpirit delay={2} x="85%" />
        <FloatingSpirit delay={4} x="25%" />
      </div>

      {/* Top decorative line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.3), transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Decorative ornament */}
          <motion.svg
            className="w-32 h-8 mx-auto mb-6 text-primary"
            viewBox="0 0 120 30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.path
              d="M10 15 Q35 5 60 15 Q85 25 110 15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.circle
              cx="60"
              cy="15"
              r="3"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 1, duration: 0.3 }}
            />
          </motion.svg>

          <motion.h2
            className="text-3xl md:text-5xl text-foreground mb-4"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.05em" } : { opacity: 0, letterSpacing: "0.3em" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            El Momento se Acerca
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Cada segundo nos acerca a una noche inolvidable
          </motion.p>
        </motion.div>

        {/* Countdown display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center flex-wrap gap-3 sm:gap-6"
        >
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex items-center">
              <TimeCard {...unit} index={index} />
              {index < timeUnits.length - 1 && (
                <div className="hidden sm:flex">
                  <GothicSeparator />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Decorative element below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center mt-16"
        >
          <svg
            className="w-80 h-12 text-primary/30"
            viewBox="0 0 300 40"
            fill="none"
          >
            <motion.path
              d="M20 20 Q75 5 150 20 Q225 35 280 20"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 1.2, duration: 1.5 }}
            />
            <motion.path
              d="M20 20 Q75 35 150 20 Q225 5 280 20"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ delay: 1.4, duration: 1.5 }}
            />
            {[75, 150, 225].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy="20"
                r={i === 1 ? 4 : 2}
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 2 + i * 0.2, duration: 0.3 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-center text-muted-foreground/70 mt-8 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          &ldquo;El tiempo no espera, pero los momentos magicos perduran para siempre&rdquo;
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.3), transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </section>
  );
}

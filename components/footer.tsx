"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedOrnament() {
  return (
    <motion.svg
      className="w-32 h-32 mx-auto text-primary/40"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="35"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.3 }}
      />
      <motion.path
        d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.6 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="currentColor"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.5 }}
      />
      {/* Small decorative circles */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.circle
          key={angle}
          cx={50 + 40 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 40 * Math.sin((angle * Math.PI) / 180)}
          r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2 + i * 0.1, duration: 0.3 }}
        />
      ))}
    </motion.svg>
  );
}

function SocialButton({
  icon,
  label,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.15,
        boxShadow: "0 0 30px rgba(80, 200, 120, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      className="glass-card rounded-full p-4 hover:bg-primary/10 transition-colors group relative overflow-hidden"
      aria-label={label}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <div className="relative z-10 text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
    </motion.button>
  );
}

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="relative py-20 px-4 overflow-hidden bg-card">
      {/* Top border decoration */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.4), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Decorative ornament */}
        <motion.div className="mb-10">
          <AnimatedOrnament />
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-12"
        >
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-foreground italic mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &ldquo;Cada sueño que tienes es una promesa de lo que puedes llegar
            a ser&rdquo;
          </motion.p>
          <motion.cite
            className="text-muted-foreground not-italic text-lg"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            - Para Danna Abigail, con todo nuestro amor
          </motion.cite>
        </motion.blockquote>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <p
            className="text-sm uppercase tracking-[0.4em] text-muted-foreground mb-3"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Con amor, sus padres
          </p>
          <motion.p
            className="text-2xl md:text-3xl text-primary glow-text"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
            whileHover={{ scale: 1.05 }}
          >
            Jonathan González Rodríguez
            <br />
            <span className="text-xl md:text-2xl text-primary/70">&amp;</span>
            <br />
            Maribel Vega Cristóbal
          </motion.p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent to-primary/50"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ transformOrigin: "right" }}
          />
          <motion.span
            className="text-2xl text-primary glow-text"
            style={{ fontFamily: "'Cinzel Decorative', serif" }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            XV
          </motion.span>
          <motion.div
            className="w-24 h-px bg-gradient-to-l from-transparent to-primary/50"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>

        {/* Social/Share links */}
        <div className="flex justify-center gap-6 mb-12">
          <SocialButton
            delay={0.8}
            label="Compartir en WhatsApp"
            icon={
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            }
          />
          <SocialButton
            delay={0.9}
            label="Agregar al calendario"
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
              </svg>
            }
          />
          <SocialButton
            delay={1}
            label="Ver ubicacion"
            icon={
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
        </div>

        {/* Bottom ornament */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <svg className="w-48 h-8 text-primary/20" viewBox="0 0 180 30">
            <motion.path
              d="M10 15 Q45 5 90 15 Q135 25 170 15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.3 }}
            />
            <motion.path
              d="M10 15 Q45 25 90 15 Q135 5 170 15"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.5 }}
            />
            <motion.circle
              cx="90"
              cy="15"
              r="3"
              fill="currentColor"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2, duration: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-sm text-muted-foreground/60"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          XV Años de Danna Abigail - 20 de Junio, 2025
        </motion.p>
      </div>
    </footer>
  );
}

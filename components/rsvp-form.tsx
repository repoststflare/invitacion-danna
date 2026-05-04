"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const WHATSAPP_NUMBER = "525573920910";
const MAX_TICKETS = 8;

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function SpiralHill({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <div className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none overflow-hidden opacity-20 mix-blend-screen">
      <motion.svg style={{ y }} viewBox="0 0 1000 400" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 400 L 0 350 Q 200 350 300 250 Q 400 150 600 250 Q 750 320 850 150 Q 900 50 950 150 Q 1000 250 1000 400 Z"
          fill="url(#hill-grad)"
        />
      </motion.svg>
    </div>
  );
}

function Bat({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-primary/30"
      initial={{ x: -100, y: Math.random() * 500, scale: 0 }}
      animate={{
        x: ["0vw", "110vw"],
        y: [Math.random() * 500, Math.random() * 500],
        scale: [0.5, 0.8, 0.5],
        rotate: [0, 20, -20, 0],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width="30" height="20" viewBox="0 0 30 20" fill="currentColor">
        <path d="M15 5C13 2 10 0 5 0C2 0 0 2 0 5C0 10 5 15 15 20C25 15 30 10 30 5C30 2 28 0 25 0C20 0 17 2 15 5Z" />
      </svg>
    </motion.div>
  );
}

function BatDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="#D4AF37" className="drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
        <path d="M20 5C18 2 15 0 10 0C5 0 0 5 0 10C0 15 5 18 10 18C15 18 18 15 20 12C22 15 25 18 30 18C35 18 40 15 40 10C40 5 35 0 30 0C25 0 22 2 20 5Z" />
        <circle cx="18" cy="8" r="1.5" fill="black" />
        <circle cx="22" cy="8" r="1.5" fill="black" />
      </svg>
      <div className="h-px w-full bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
    </div>
  );
}

function GhostParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none text-primary/20"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.3, 0],
        y: [-20, -100],
        x: [0, (Math.random() - 0.5) * 50],
        scale: [0.5, 1.2, 0.8],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7.58 2 4 5.58 4 10V22L6 20L8 22L10 20L12 22L14 20L16 22L18 20L20 22V10C20 5.58 16.42 2 12 2ZM9 11C8.45 11 8 10.55 8 10C8 9.45 8.45 9 9 9C9.55 9 10 9.45 10 10C10 10.55 9.55 11 9 11ZM15 11C14.45 11 14 10.55 14 10C14 9.45 14.45 9 15 9C15.55 9 16 9.45 16 10C16 10.55 15.55 11 15 11Z" />
      </svg>
    </motion.div>
  );
}

function TwistedBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gothic-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Twisted corners */}
      <path d="M 0 40 Q 0 0 40 0 M 0 60 Q 20 60 20 40 Q 20 20 0 20" stroke="url(#gothic-grad)" strokeWidth="2" fill="none" className="translate-x-2 translate-y-2" />
      <path d="M 100% 40 Q 100% 0 calc(100% - 40) 0 M 100% 60 Q calc(100% - 20) 60 calc(100% - 20) 40 Q calc(100% - 20) 20 100% 20" stroke="url(#gothic-grad)" strokeWidth="2" fill="none" className="-translate-x-2 translate-y-2" />
      <path d="M 0 calc(100% - 40) Q 0 100% 40 100% M 0 calc(100% - 60) Q 20 calc(100% - 60) 20 calc(100% - 40) Q 20 calc(100% - 20) 0 calc(100% - 20)" stroke="url(#gothic-grad)" strokeWidth="2" fill="none" className="translate-x-2 -translate-y-2" />
      <path d="M 100% calc(100% - 40) Q 100% 100% calc(100% - 40) 100% M 100% calc(100% - 60) Q calc(100% - 20) calc(100% - 60) calc(100% - 20) calc(100% - 40) Q calc(100% - 20) calc(100% - 20) 100% calc(100% - 20)" stroke="url(#gothic-grad)" strokeWidth="2" fill="none" className="-translate-x-2 -translate-y-2" />
    </svg>
  );
}

export function RSVPForm() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [ticketCount, setTicketCount] = useState(1);
  const [names, setNames] = useState<string[]>(["", "", "", "", "", "", "", ""]);
  const [sent, setSent] = useState(false);

  const handleNameChange = (index: number, value: string) => {
    setNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleTicketChange = (delta: number) => {
    setTicketCount((prev) => Math.max(1, Math.min(MAX_TICKETS, prev + delta)));
  };

  const handleSend = () => {
    const filledNames = names.slice(0, ticketCount);
    const allFilled = filledNames.every((n) => n.trim().length > 0);
    if (!allFilled) {
      alert("Por favor escribe el nombre de cada boleto antes de enviar.");
      return;
    }

    const listItems = filledNames
      .map((n, i) => `*Boleto ${i + 1}:* ${n.trim()}`)
      .join("\n");

    const msg = `*CONFIRMACIÓN DE ASISTENCIA*\n\n✨ *XV Años de Danna Abigail*\n📅 21 de Junio, 2025\n\n🎟 *Boletos reservados: ${ticketCount}*\n\n${listItems}\n\n¡Nos vemos en la celebración! 🥂\n\n🔗 *Link de la Invitación:* ${window.location.origin}`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
  };

  return (
    <section ref={containerRef} className="relative py-32 px-4 overflow-hidden bg-[#050505]">
      {/* ── THEMED BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(43,15,64,0.3)_0%,rgba(0,0,0,1)_100%)]" />
        
        {/* Pinstripe Texture (Jack's Suit) */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 40px)` }} />

        <SpiralHill scrollYProgress={scrollYProgress} />

        {/* Spectral Glows */}
        <motion.div
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        {/* Floating Entities */}
        {[...Array(6)].map((_, i) => (
          <GhostParticle key={i} delay={i * 2} />
        ))}
        {[...Array(4)].map((_, i) => (
          <Bat key={i} delay={i * 3} />
        ))}
      </div>

      <div ref={ref} className="max-w-3xl mx-auto relative z-10">
        {/* Header with Gothic Flourish */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, ease: "circOut" }}
        >
          <motion.div 
            className="inline-block mb-10 relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <div className="relative flex items-center justify-center p-6 border-2 border-primary/30 rounded-full bg-black/60 backdrop-blur-xl">
              <span className="text-[#D4AF37] scale-[2.5] drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
                <TicketIcon />
              </span>
            </div>
          </motion.div>
          
          <h2
            className="text-5xl md:text-8xl text-[#FDFCEB] italic mb-6 tracking-tight leading-none"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              textShadow: "0 0 20px rgba(253,252,235,0.2)"
            }}
          >
            Noche de Gala
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <p
              className="text-[#D4AF37] text-lg uppercase tracking-[0.5em] font-bold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Confirmación
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Gothic Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative bg-black border border-white/5 rounded-[30px] md:rounded-[40px] p-1 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Inner Glow Border */}
          <div className="absolute inset-0 rounded-[28px] md:rounded-[36px] border border-primary/20 pointer-events-none" />
          
          <div className="relative bg-[#080808] rounded-[26px] md:rounded-[32px] p-6 md:p-16 overflow-hidden">
            <TwistedBorder />
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30 L60 60 M30 30 L0 60 M30 30 L60 0 M30 30 L0 0' stroke='%23D4AF37' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
            
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="text-6xl">🎉</div>
                <h3 className="text-3xl text-[#FDFCEB] italic">¡Gracias por Confirmar!</h3>
              </motion.div>
            ) : (
              <div className="space-y-16 relative z-10">
                {/* ── TICKET SELECTION ── */}
                <div className="space-y-10">
                  <div className="text-center">
                    <span 
                      className="text-[#D4AF37]/60 text-xs uppercase tracking-[0.6em] mb-4 block"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Cantidad de Invitados
                    </span>
                    <BatDivider />
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {Array.from({ length: MAX_TICKETS }).map((_, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        onClick={() => setTicketCount(i + 1)}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-10 h-20 md:w-14 md:h-24 rounded-xl md:rounded-2xl transition-all duration-500 border flex flex-col items-center justify-between py-3 md:py-4 ${
                          i < ticketCount
                            ? "bg-gradient-to-b from-[#D4AF37] to-[#8A2BE2] border-[#FDEBD0] shadow-[0_0_20px_rgba(138,43,226,0.3)] z-10"
                            : "bg-black/60 border-white/5 text-white/10 grayscale"
                        }`}
                      >
                        <div className={i < ticketCount ? "text-white scale-75 md:scale-100" : "text-white/5 scale-75 md:scale-100"}>
                          <TicketIcon />
                        </div>
                        <span className={`text-base md:text-xl font-bold ${i < ticketCount ? "text-white" : "text-white/10"}`} style={{ fontFamily: "'Cinzel', serif" }}>
                          {i + 1}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-center"
                  >
                    <p className="text-[#D4AF37] italic text-2xl font-serif glow-text">
                      {ticketCount} {ticketCount === 1 ? 'Lugar Reservado' : 'Lugares Reservados'}
                    </p>
                  </motion.div>
                </div>

                {/* ── GUEST NAMES ── */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[#D4AF37]/40 text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "'Cinzel', serif" }}>
                      Lista de Honor
                    </span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <div className="grid gap-4">
                    {Array.from({ length: ticketCount }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                      >
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 text-lg font-bold italic pointer-events-none">
                          #{i + 1}
                        </div>
                        <input
                          type="text"
                          value={names[i]}
                          onChange={(e) => handleNameChange(i, e.target.value)}
                          placeholder="Nombre del invitado..."
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-[#FDEBD0] text-lg italic placeholder:text-white/5 focus:outline-none focus:border-primary/30 transition-all"
                          style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ── ACTION BUTTON ── */}
                <div className="pt-4">
                  <motion.button
                    type="button"
                    onClick={handleSend}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative h-20 rounded-full overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E]" />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative h-full flex items-center justify-center gap-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-lg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="text-xl md:text-2xl font-medium text-white italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        Enviar Confirmación
                      </span>
                    </div>
                  </motion.button>
                </div>

                <p className="text-center text-[#D4AF37]/30 text-xs tracking-[0.2em] italic uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  * No faltes a esta noche mágica *
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

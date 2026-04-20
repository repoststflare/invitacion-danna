"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

function MagicParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -30],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3,
      }}
    />
  );
}

export function RSVPForm() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHoveredYes, setIsHoveredYes] = useState(false);
  const [isHoveredNo, setIsHoveredNo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      </motion.div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 parchment opacity-20" />

        {/* Decorative lines */}
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
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(80, 200, 120, 0.4), transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div ref={ref} className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Decorative ornament */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-px bg-gradient-to-r from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
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
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </motion.svg>
            <motion.div
              className="w-20 h-px bg-gradient-to-l from-transparent to-primary"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl text-[#FDFCEB] mb-6 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={
              isInView
                ? { opacity: 1, letterSpacing: "0.05em" }
                : { opacity: 0, letterSpacing: "0.2em" }
            }
            transition={{ delay: 0.5, duration: 1 }}
          >
            Confirma tu Asistencia
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground italic max-w-xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Tu presencia hara esta noche verdaderamente magica
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: -10 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 80, rotateX: -10 }
          }
          transition={{ duration: 1, delay: 0.4 }}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-lg p-12 text-center parchment relative overflow-hidden"
            >
              {/* Magic particles */}
              {[...Array(20)].map((_, i) => (
                <MagicParticle key={i} delay={i * 0.2} />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="mb-8 relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <svg
                  className="w-24 h-24 mx-auto text-primary relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <motion.path
                    d="M22 11.08V12a10 10 0 11-5.93-9.14"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.polyline
                    points="22 4 12 14.01 9 11.01"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                </svg>
              </motion.div>

              <motion.h3
                className="text-3xl text-[#FDFCEB] mb-4 glow-text italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                ¡Gracias por Confirmar!
              </motion.h3>

              <motion.p
                className="text-xl text-muted-foreground italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Tu respuesta ha sido registrada. Nos vemos en la celebracion.
              </motion.p>

              {/* Decorative ornament */}
              <motion.div
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <svg
                  className="w-32 h-8 text-primary/40"
                  viewBox="0 0 120 30"
                >
                  <motion.path
                    d="M10 15 Q35 5 60 15 Q85 25 110 15"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card rounded-lg p-8 md:p-12 parchment relative overflow-hidden"
              whileHover={{
                boxShadow: "0 0 60px rgba(80, 200, 120, 0.15)",
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-20" />

              {/* Victorian corner decorations */}
              {[
                { pos: "top-4 left-4", border: "border-l-2 border-t-2" },
                { pos: "top-4 right-4", border: "border-r-2 border-t-2" },
                { pos: "bottom-4 left-4", border: "border-l-2 border-b-2" },
                { pos: "bottom-4 right-4", border: "border-r-2 border-b-2" },
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.pos} w-10 h-10 ${corner.border} border-primary/40`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                />
              ))}

              <div className="space-y-8 relative z-10">
                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Nombre Completo
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    whileFocus={{
                      boxShadow: "0 0 20px rgba(80, 200, 120, 0.3)",
                    }}
                    className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    placeholder="Tu nombre..."
                  />
                </motion.div>

                {/* Number of guests */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <label
                    htmlFor="guests"
                    className="block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Numero de Invitados
                  </label>
                  <motion.select
                    id="guests"
                    name="guests"
                    value={formState.guests}
                    onChange={handleChange}
                    whileFocus={{
                      boxShadow: "0 0 20px rgba(80, 200, 120, 0.3)",
                    }}
                    className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none cursor-pointer text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5+ personas</option>
                  </motion.select>
                </motion.div>

                {/* Attendance */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <label
                    className="block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Nos Acompanaras?
                  </label>
                  <div className="flex gap-4">
                    <label
                      className="flex-1 cursor-pointer"
                      onMouseEnter={() => setIsHoveredYes(true)}
                      onMouseLeave={() => setIsHoveredYes(false)}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={formState.attending === "yes"}
                        onChange={handleChange}
                        className="sr-only peer"
                        required
                      />
                      <motion.div
                        className="glass-card rounded-lg p-5 text-center border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/10 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isHoveredYes && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                          />
                        )}
                        <span
                          className="text-lg text-foreground relative z-10"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          Si, Asistire
                        </span>
                      </motion.div>
                    </label>
                    <label
                      className="flex-1 cursor-pointer"
                      onMouseEnter={() => setIsHoveredNo(true)}
                      onMouseLeave={() => setIsHoveredNo(false)}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={formState.attending === "no"}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <motion.div
                        className="glass-card rounded-lg p-5 text-center border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/10 transition-all relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isHoveredNo && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 0.8 }}
                          />
                        )}
                        <span
                          className="text-lg text-foreground relative z-10"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          No Podre
                        </span>
                      </motion.div>
                    </label>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -30 }
                  }
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Mensaje para Danna Abigail (opcional)
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    whileFocus={{
                      boxShadow: "0 0 20px rgba(80, 200, 120, 0.3)",
                    }}
                    className="w-full bg-background/50 border border-border rounded-lg px-5 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    placeholder="Tus palabras de felicitacion..."
                  />
                </motion.div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D4AF37] text-black rounded-lg py-5 uppercase tracking-[0.2em] font-bold hover:bg-[#EADCB0] transition-colors relative overflow-hidden group"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <span className="relative z-10 text-lg">
                    Enviar Confirmación
                  </span>
                </motion.button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Tienes alguna pregunta?
          </p>
          <motion.p
            className="text-[#D4AF37] mt-2 text-lg drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
            style={{ fontFamily: "'Cinzel', serif" }}
            whileHover={{ scale: 1.05 }}
          >
            contacto@xvdanna.com
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

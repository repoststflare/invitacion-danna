"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const familyData = [
  {
    role: "Mis Padres",
    members: ["Jonathan González Rodríguez", "Maribel Vega Cristóbal"],
  },
  {
    role: "Mis Padrinos",
    members: ["Fernando González Romero", "Patricia Rodríguez Hernández"],
  },
];

export function FamilySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden bg-black/50">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-5xl text-[#FDFCEB] mb-4 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Con la Bendición de
          </h2>
          <div className="w-24 h-px bg-[#D4AF37]/40 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {familyData.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
              className="glass-card rounded-lg p-8 relative group"
            >
              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-[#D4AF37]/40" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-[#D4AF37]/40" />

              <h3
                className="text-[#D4AF37] text-xl tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item.role}
              </h3>
              <div className="space-y-4">
                {item.members.map((member) => (
                  <p
                    key={member}
                    className="text-xl md:text-2xl text-foreground/90 italic"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {member}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

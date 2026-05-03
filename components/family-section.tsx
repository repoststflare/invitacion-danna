"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const familyData = [
  {
    role: "Mis Padres",
    members: ["Jhonattan González Rodríguez", "Maribel Vega Cristóbal"],
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
          className="mb-20 flex flex-col items-center"
        >
          <h2
            className="text-4xl md:text-6xl text-gold mb-6 italic font-medium"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Con la Bendición de
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {familyData.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 + index * 0.2 }}
              className="glass-card rounded-2xl p-10 relative group border-gold/10 hover:border-gold/30 transition-all duration-700 overflow-hidden"
            >
              {/* Elegant Victorian corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#D4AF37]/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#D4AF37]/30 rounded-br-2xl" />
              
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <h3
                className="text-gold text-xs tracking-[1.2em] uppercase mb-8 font-light relative z-10 ml-[1.2em]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {item.role}
              </h3>
              <div className="space-y-6 relative z-10">
                {item.members.map((member) => (
                  <p
                    key={member}
                    className="text-xl md:text-3xl text-[#FDEBD0]/90 italic font-medium tracking-tight"
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

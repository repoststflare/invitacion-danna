"use client";

import { useState } from "react";
import { CinematicIntro } from "@/components/cinematic-intro";
import { HeroSection } from "@/components/hero-section";
import { EventDetails } from "@/components/event-details";
import { Countdown } from "@/components/countdown";


import { FamilySection } from "@/components/family-section";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function QuinceaneraInvitation() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <CinematicIntro onComplete={() => setShowContent(true)} />}

      {showContent && (
        <motion.main
          className="min-h-screen bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroSection />
          <EventDetails />
          <Countdown />


          <Footer />
        </motion.main>
      )}
    </>
  );
}

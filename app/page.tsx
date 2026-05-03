"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CinematicIntro } from "@/components/cinematic-intro";
import { motion } from "framer-motion";

const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => mod.HeroSection), { 
  ssr: true,
});
const EventDetails = dynamic(() => import("@/components/event-details").then(mod => mod.EventDetails));
const Countdown = dynamic(() => import("@/components/countdown").then(mod => mod.Countdown));
const FamilySection = dynamic(() => import("@/components/family-section").then(mod => mod.FamilySection));
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer));

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
          <FamilySection />
          <EventDetails />
          <Countdown />


          <Footer />
        </motion.main>
      )}
    </>
  );
}

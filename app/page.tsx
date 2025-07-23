"use client";
import { BackgroundLinesDemo } from "@/components/BackgroundLines";
import GlowingEffectDemoSecondWrapper from "@/components/GlowingEffectDemoSecondWrapper";
import { HeroHighlightDemo } from "@/components/HeroHighlightDemo";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { BackgroundLines } from "@/components/ui/background-lines";

export default function Home() {
  return (
    <div className=" overflow-hidden bg-black ">
      {/* Accordion at the top */}
      {/* <AccordionList items={accordionData} /> */}

      {/* Glowing effect centered below */}
      {/* <HeroSection /> */}
      <Navbar />
      <Navbar />
      <div className="flex flex-col items-center gap-12">
        <BackgroundLinesDemo />
        <GlowingEffectDemoSecondWrapper />
        <HeroHighlightDemo/>
      </div>
      
    </div>
  );
}

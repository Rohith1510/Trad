"use client";
import React from "react";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[60vh] bg-gradient-to-br from-[#18181b] to-[#23272f] flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to <AuroraText>Aurora Text</AuroraText>
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Build beautiful interfaces with modern React and Next.js.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
            Get Started
          </button>
        </div>
        {/* Right: Animation */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Animated Circles */}
            <span className="absolute left-1/2 top-1/2 w-40 h-40 bg-blue-500 opacity-30 rounded-full animate-pulse -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute left-1/2 top-1/2 w-24 h-24 bg-purple-500 opacity-40 rounded-full animate-bounce -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute left-1/2 top-1/2 w-12 h-12 bg-pink-500 opacity-60 rounded-full animate-spin-slow -translate-x-1/2 -translate-y-1/2"></span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </section>
  );
}
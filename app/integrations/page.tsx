"use client";
import Navbar from "@/components/Navbar";

export default function Integrations() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <main className="flex flex-col items-center gap-12 px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center">Integrations</h1>
        <section className="w-full max-w-3xl grid gap-8">
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800 text-center">
            <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-neutral-300">This page will list and manage integrations with market data providers, broker APIs, and more.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 
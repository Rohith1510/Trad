"use client";
import Navbar from "@/components/Navbar";

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <main className="flex flex-col items-center gap-12 px-4 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center">Features</h1>
        <section className="max-w-3xl w-full grid gap-8">
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">AI-Powered Suggestions</h2>
            <p className="text-neutral-300">Get smart code completions and suggestions as you type, powered by advanced AI models.</p>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">Beautiful UI Components</h2>
            <p className="text-neutral-300">Access a library of modern, customizable UI components for rapid development.</p>
          </div>
          <div className="bg-neutral-900 rounded-2xl p-8 shadow-lg border border-neutral-800">
            <h2 className="text-2xl font-semibold mb-2">Dark Mode by Default</h2>
            <p className="text-neutral-300">Enjoy a sleek, eye-friendly dark theme throughout your development experience.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
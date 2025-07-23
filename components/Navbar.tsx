"use client";
import React from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/features" },
  { name: "Integrations", href: "/integrations" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-[#18181b]/10 backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex gap-6 items-center border border-neutral-800">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="relative px-4 py-1 text-lg font-medium text-gray-200 transition-colors duration-200
            before:absolute before:inset-0 before:rounded-full
            before:bg-gradient-to-r before:from-blue-400 before:via-purple-500 before:to-pink-500
            before:opacity-0 hover:before:opacity-100
            before:transition-opacity before:duration-200
            overflow-hidden 
          "
        >
          <span className="relative z-10">{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}
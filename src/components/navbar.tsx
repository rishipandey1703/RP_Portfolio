"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Terminal, Command } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Coding", href: "#coding" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlighting logic
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      
      if (current) {
        const activeItem = navItems.find((item) => item.href.substring(1) === current);
        if (activeItem) setActiveSection(activeItem.name);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 transition-all duration-300",
        isScrolled ? "mt-2" : "mt-6"
      )}
    >
      <nav
        className={cn(
          "flex items-center justify-between px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 w-[95%] max-w-5xl",
          isScrolled ? "shadow-lg shadow-black/20" : ""
        )}
      >
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-105">
            <span className="font-bold text-sm">RT</span>
          </div>
          <span className="font-medium tracking-tight hidden sm:block">Ram Krishna</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.name)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-neutral-400"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-400 cursor-pointer hover:bg-white/10 transition-colors" title="Command Palette">
            <Command className="w-3.5 h-3.5" />
            <span>Ctrl K</span>
          </div>
          <button className="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors" title="Terminal (Ctrl+`)">
            <Terminal className="w-4 h-4" />
          </button>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            Resume
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 p-4 rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl md:hidden flex flex-col gap-2 backdrop-blur-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveSection(item.name);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                activeSection === item.name ? "bg-white/10 text-white" : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="mt-2 px-4 py-3 text-center text-sm font-medium rounded-xl bg-white text-black"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}

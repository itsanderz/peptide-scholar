"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { NavConfig, NavGroup } from "@/lib/nav-config";

interface NavbarProps {
  config: NavConfig;
  accentColor: string;
  logo: React.ReactNode;
  /** Right-side slot — MarketSelector, etc. */
  children?: React.ReactNode;
}

function DropdownMenu({ group, accentColor }: { group: NavGroup; accentColor: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors text-sm font-medium py-1"
        aria-expanded={open}
      >
        {group.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-56 rounded-lg shadow-xl overflow-hidden z-50 border border-white/10"
          style={{ backgroundColor: "#1a2230" }}
        >
          <div className="h-0.5 w-full" style={{ backgroundColor: accentColor }} />
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-white/10 transition-colors group"
            >
              <span className="text-sm font-medium text-white/90 group-hover:text-white">
                {item.label}
              </span>
              {item.description && (
                <span className="block text-xs text-white/50 mt-0.5 leading-snug">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  config,
  accentColor,
  onClose,
}: {
  config: NavConfig;
  accentColor: string;
  onClose: () => void;
}) {
  return (
    <div className="md:hidden border-t border-white/10 pb-4">
      <nav className="pt-2 flex flex-col">
        {config.direct.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {item.label}
          </Link>
        ))}
        {config.groups.map((group) => (
          <div key={group.label}>
            <div
              className="px-4 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {group.label}
            </div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Navbar({ config, accentColor, logo, children }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Single header row */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-6">
          {config.direct.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
          {config.groups.map((group) => (
            <DropdownMenu key={group.label} group={group} accentColor={accentColor} />
          ))}
        </nav>

        {/* Right slot + hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">{children}</div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5 rounded focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-transform duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-white/80 transition-transform duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer — rendered outside the h-16 row */}
      {mobileOpen && (
        <MobileMenu
          config={config}
          accentColor={accentColor}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

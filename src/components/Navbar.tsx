"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavConfig, NavGroup } from "@/lib/nav-config";

interface NavbarProps {
  config: NavConfig;
  accentColor: string;
  logo: React.ReactNode;
  initialPathname: string;
  children?: React.ReactNode;
}

function isActivePath(pathname: string, href: string) {
  const normalizedPathname =
    pathname.replace(/^\/(en|es|ja|zh|de|fr|pt|pl|cs|uk|ru|ko|nl|sv)(?=\/|$)/, "") || "/";
  if (href === "/") return normalizedPathname === "/";
  return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
}

function DropdownMenu({ group, accentColor, pathname }: { group: NavGroup; accentColor: string; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const groupActive = group.items.some((item) => isActivePath(pathname, item.href));

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onKeyDown);
    };
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
        className={`nb-menu-trigger ${groupActive ? "active" : ""}`}
        aria-expanded={open}
      >
        {group.label}
        <svg
          className={`w-3 h-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="nb-dropdown">
          <div className="h-[3px] w-full" style={{ backgroundColor: accentColor }} />
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`nb-dropdown-link ${isActivePath(pathname, item.href) ? "active" : ""}`}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
            >
              <span className="nb-dropdown-label">
                {item.label}
              </span>
              {item.description && (
                <span className="nb-dropdown-desc">
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
  onClose,
  pathname,
}: {
  config: NavConfig;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <div className="nb-mobile-menu">
      <nav className="nb-mobile-nav">
        {config.direct.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`nb-mobile-link ${isActivePath(pathname, item.href) ? "active" : ""}`}
            aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        {config.groups.map((group) => (
          <div key={group.label}>
            <div className="nb-mobile-heading">
              {group.label}
            </div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`nb-mobile-link nested ${isActivePath(pathname, item.href) ? "active" : ""}`}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Navbar({ config, accentColor, logo, initialPathname, children }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activePathname = pathname || initialPathname;

  return (
    <>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-14 px-4 md:px-8">
        <div className="flex-shrink-0">{logo}</div>

        <nav className="hidden lg:flex items-center gap-0">
          {config.direct.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nb-menu-link ${isActivePath(activePathname, item.href) ? "active" : ""}`}
              aria-current={isActivePath(activePathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          {config.groups.map((group) => (
            <DropdownMenu key={group.label} group={group} accentColor={accentColor} pathname={activePathname} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">{children}</div>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1.5 focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-[2px] bg-[#edeae3]/80 transition-transform duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#edeae3]/80 transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-[#edeae3]/80 transition-transform duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <MobileMenu
          config={config}
          pathname={activePathname}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

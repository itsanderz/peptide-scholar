"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteTheme } from "./theme";

const ThemeContext = createContext<SiteTheme | null>(null);

export function useTheme(): SiteTheme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("useTheme must be used within ThemeProvider");
  return theme;
}

export function ThemeProvider({ theme, children }: { theme: SiteTheme; children: ReactNode }) {
  const cssVars = {
    "--color-primary": theme.colors.primary,
    "--color-primary-dark": theme.colors.primaryDark,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-bg": theme.colors.bg,
    "--color-bg-alt": theme.colors.bgAlt,
    "--color-surface": theme.colors.surface,
    "--color-text": theme.colors.text,
    "--color-text-muted": theme.colors.textMuted,
    "--color-border": theme.colors.border,
    "--color-success": theme.colors.success,
    "--color-warning": theme.colors.warning,
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
  } as React.CSSProperties;

  return (
    <ThemeContext.Provider value={theme}>
      <div style={cssVars} className="min-h-screen" data-layout={theme.layout}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

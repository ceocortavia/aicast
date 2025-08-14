"use client";

import { useEffect, useState } from "react";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getSystemTheme());

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = (saved as "light" | "dark") || getSystemTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Bytt tema"
      className="inline-flex items-center gap-2 text-sm rounded-md border border-foreground/20 px-3 py-1.5 hover:bg-foreground/5"
    >
      <span className="i-theme" aria-hidden>
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
      {theme === "dark" ? "Mørk" : "Lys"}
    </button>
  );
}




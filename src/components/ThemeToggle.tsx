"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The persisted theme is only available in the browser. Keep the server and
  // initial hydration renders identical without scheduling state in an effect.
  const mounted = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded border border-[var(--border)] bg-[var(--muted-background)] hover:bg-[var(--border)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
      )}
    </button>
  );
}

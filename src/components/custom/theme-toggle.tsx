"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["system", "light", "dark"] as const;
type Theme = (typeof themes)[number];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentIndex = theme ? themes.indexOf(theme as Theme) : 0;
  const nextTheme = themes[(currentIndex + 1) % themes.length] as Theme;

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md hover:bg-muted transition-colors"
        aria-label="Cambiar tema"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      className="p-2 rounded-md hover:bg-muted transition-colors"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Cambiar a tema ${nextTheme}`}
    >
      {theme === "system" ? (
        <Monitor className="h-5 w-5" />
      ) : theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

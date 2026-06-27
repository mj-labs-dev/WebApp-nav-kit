import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { LayoutA } from "./LayoutA";
import { LayoutB } from "./LayoutB";

type Theme = "auto" | "light" | "dark";
type LayoutType = "A" | "B";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }
}

export function LayoutRoot() {
  const [activeLayout, setActiveLayout] = useState<LayoutType>(() => {
    const saved = localStorage.getItem("app_layout") as LayoutType;
    return saved ?? "A"; // Default to Layout A (sidebar)
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (localStorage.getItem("app_theme") as Theme) ?? "auto";
    return saved;
  });

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "auto") {
        applyTheme("auto");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const handleLayoutSwitch = () => {
    setActiveLayout((prev) => {
      const next = prev === "A" ? "B" : "A";
      localStorage.setItem("app_layout", next);
      return next;
    });
  };

  const handleThemeChange = (newTheme: Theme) => {
    localStorage.setItem("app_theme", newTheme);
    setTheme(newTheme);
  };

  const layoutProps = {
    theme,
    onThemeChange: handleThemeChange,
    onLayoutSwitch: handleLayoutSwitch,
    children: <Outlet />,
  };

  return activeLayout === "A" ? (
    <LayoutA {...layoutProps} />
  ) : (
    <LayoutB {...layoutProps} />
  );
}

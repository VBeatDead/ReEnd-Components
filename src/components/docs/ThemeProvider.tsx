import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("ef-theme") as Theme) || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    localStorage.setItem("ef-theme", theme);
    const timeout = setTimeout(() => root.classList.remove("theme-transitioning"), 700);
    window.dispatchEvent(new CustomEvent("ef-theme-change", { detail: { theme } }));
    return () => clearTimeout(timeout);
  }, [theme]);

  useEffect(() => {
    const handleExternal = (e: Event) => {
      const newTheme = (e as CustomEvent<{ theme: Theme }>).detail.theme;
      setTheme((prev) => (prev !== newTheme ? newTheme : prev));
    };
    window.addEventListener("ef-theme-change", handleExternal);
    return () => window.removeEventListener("ef-theme-change", handleExternal);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

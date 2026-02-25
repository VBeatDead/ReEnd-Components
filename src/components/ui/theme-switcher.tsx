import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface ThemeSwitcherProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storageKey?: string;
}

const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
  ({ storageKey = "ef-theme", className, ...props }, ref) => {
    const [isLight, setIsLight] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light") {
        setIsLight(true);
        document.documentElement.classList.add("light");
      } else if (saved === "dark") {
        setIsLight(false);
        document.documentElement.classList.remove("light");
      } else {
        setIsLight(document.documentElement.classList.contains("light"));
      }
    }, [storageKey]);

    React.useEffect(() => () => clearTimeout(timerRef.current), []);

    React.useEffect(() => {
      const handleExternal = (e: Event) => {
        const newTheme = (e as CustomEvent<{ theme: string }>).detail.theme;
        setIsLight((prev) => {
          const next = newTheme === "light";
          return prev !== next ? next : prev;
        });
      };
      window.addEventListener("ef-theme-change", handleExternal);
      return () => window.removeEventListener("ef-theme-change", handleExternal);
    }, []);

    const toggle = () => {
      setIsAnimating(true);
      timerRef.current = setTimeout(() => setIsAnimating(false), 500);
      const next = !isLight;
      setIsLight(next);
      if (next) {
        document.documentElement.classList.add("light");
        localStorage.setItem(storageKey, "light");
      } else {
        document.documentElement.classList.remove("light");
        localStorage.setItem(storageKey, "dark");
      }
      window.dispatchEvent(
        new CustomEvent("ef-theme-change", { detail: { theme: next ? "light" : "dark" } }),
      );
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        className={cn(
          "relative p-2 text-muted-foreground hover:text-primary transition-colors overflow-hidden",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "block transition-all duration-500",
            isAnimating
              ? "rotate-[360deg] scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)" }}
        >
          {isLight ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </span>
      </button>
    );
  },
);
ThemeSwitcher.displayName = "ThemeSwitcher";

export { ThemeSwitcher };

import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { sidebarData } from "./sidebarData";
import { CommandPalette } from "./CommandPalette";
import { useTheme } from "./ThemeProvider";

interface DocsHeaderProps {
  onNavigate: (id: string) => void;
}

export const DocsHeader = ({ onNavigate }: DocsHeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[64px] z-50 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary clip-corner-sm flex items-center justify-center">
                <span className="font-display text-xs font-bold text-primary-foreground">EF</span>
              </div>
              <div>
                <h1 className="font-display text-sm font-bold tracking-[0.08em] uppercase text-foreground">
                  ENDFIELD
                </h1>
                <p className="font-ui text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                  DESIGN SYSTEM v2.0
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {["DOCS", "COMPONENTS", "TOKENS", "PATTERNS"].map((label) => (
              <button
                key={label}
                className="font-display text-xs font-semibold tracking-[0.08em] uppercase text-muted-foreground hover:text-primary px-4 py-2 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAnimating(true);
                toggleTheme();
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors overflow-hidden"
              aria-label="Toggle theme"
            >
              <span className={`block transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isAnimating ? "rotate-[360deg] scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </span>
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-1 border border-border text-muted-foreground text-xs hover:border-primary/30 hover:text-foreground transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="font-mono text-[10px] bg-surface-2 px-1.5 py-0.5 border border-border">⌘K</kbd>
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={onNavigate} />

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/95" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[280px] h-full bg-surface-0 border-r border-border overflow-y-auto pt-20 px-4">
            {sidebarData.map((section) => (
              <div key={section.title} className="mb-4">
                <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground px-2 py-2 block">
                  {section.title}
                </span>
                <ul className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                        className="w-full text-left text-sm py-1.5 px-3 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

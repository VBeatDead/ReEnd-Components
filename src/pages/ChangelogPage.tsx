const ChangelogPage = () => {
  return (
    <>
      <div id="changelog" className="mb-8 scroll-mt-20">
        <h1 className="font-display text-xs font-bold tracking-[0.15em] uppercase text-primary mb-1">
          ◆ CHANGELOG
        </h1>
        <div className="h-px bg-border mb-8" />
      </div>

      <div className="space-y-6">
        <div className="border border-border bg-surface-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm font-bold text-primary">
              v2.0.0
            </span>
            <span className="font-mono text-[10px] bg-ef-green/10 border border-ef-green/20 text-ef-green px-2 py-0.5">
              LATEST
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              February 2026
            </span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>
                Complete redesign with Sci-Fi Industrial Futurism theme
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>87+ component previews across 11 thematic sections</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>Shiki syntax highlighting with dual theme support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>Interactive playgrounds with live code generation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>Fuzzy search command palette (⌘K)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>
                Full accessibility support — ARIA roles, focus traps, keyboard
                navigation
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>Responsive preview toggle (Desktop / Mobile)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">◆</span>
              <span>Keyboard interaction documentation per component</span>
            </li>
          </ul>
        </div>

        <div className="border border-border bg-surface-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm font-bold text-muted-foreground">
              v1.0.0
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              January 2025
            </span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground mt-1">◇</span>
              <span>Initial release with basic component library</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground mt-1">◇</span>
              <span>Dark mode support with custom ThemeProvider</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground mt-1">◇</span>
              <span>Landing page with cinematic animations</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;

import { useState, useMemo } from "react";
import { sidebarData } from "./sidebarData";
import { Search, X } from "lucide-react";
import { HighlightText } from "./HighlightText";

interface DocsSidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export const DocsSidebar = ({ activeId, onNavigate }: DocsSidebarProps) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return sidebarData;
    const q = searchQuery.toLowerCase();
    return sidebarData
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  return (
    <aside
      className="fixed top-[64px] left-0 bottom-0 w-[280px] bg-surface-0 border-r border-border overflow-y-auto py-4 px-4 hidden lg:block z-10"
      aria-label="Documentation sidebar"
    >
      {/* Search filter */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter..."
          className="w-full bg-surface-1 border border-border text-sm text-foreground pl-9 pr-8 py-2 outline-none placeholder:text-muted-foreground focus:border-primary/30 transition-colors font-body"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <nav role="tree" aria-label="Documentation sections">
        {filteredData.map((section) => (
          <div key={section.title} className="mb-4">
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex items-center justify-between py-2 px-2 group"
              role="treeitem"
              aria-expanded={!collapsed[section.title]}
            >
              <span className="font-display text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                {section.title}
              </span>
              <span className="font-mono text-primary text-sm">
                {collapsed[section.title] ? "+" : "−"}
              </span>
            </button>
            {!collapsed[section.title] && (
              <ul role="group" className="mt-1 space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.id} role="treeitem">
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`w-full text-left text-sm py-1.5 px-3 transition-all border-l-2 ${
                        activeId === item.id
                          ? "text-primary border-primary font-semibold"
                          : "text-muted-foreground border-transparent hover:text-card-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      <HighlightText text={item.label} query={searchQuery} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {filteredData.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">
            No results
          </p>
        )}
      </nav>
    </aside>
  );
};

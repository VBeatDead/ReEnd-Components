import { useState, useCallback, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import langTsx from "shiki/langs/tsx.mjs";
import langCss from "shiki/langs/css.mjs";
import langBash from "shiki/langs/bash.mjs";
import langJson from "shiki/langs/json.mjs";
import themeDark from "shiki/themes/github-dark-default.mjs";
import themeLight from "shiki/themes/github-light-default.mjs";

const highlighter = createHighlighterCoreSync({
  themes: [themeDark, themeLight],
  langs: [langTsx, langCss, langBash, langJson],
  engine: createJavaScriptRegexEngine(),
});

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock = ({
  code,
  language = "tsx",
  title,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const loadedLangs = highlighter.getLoadedLanguages();
  const lang = loadedLangs.includes(language) ? language : "tsx";

  const highlightedHtml = highlighter.codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
  });

  return (
    <div className="relative group border border-border bg-surface-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="font-ui text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-primary"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-ef-green" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <div
        className="shiki-wrapper p-4 overflow-x-auto text-sm leading-relaxed font-mono [&>pre]:!bg-transparent [&>pre]:!p-0 [&>pre]:!m-0 [&>.shiki]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
};

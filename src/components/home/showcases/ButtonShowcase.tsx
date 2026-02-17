import { useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";

export const ButtonShowcase = () => (
  <div className="space-y-6">
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        VARIANTS
      </p>
      <div className="flex flex-wrap gap-3 items-center">
        <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:brightness-110 hover:shadow-[0_0_20px_hsl(47_100%_56%/0.3)] transition-all active:brightness-90">
          PRIMARY
        </button>
        <button className="clip-corner border border-foreground/25 text-card-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:border-primary hover:text-primary transition-all bg-transparent">
          SECONDARY
        </button>
        <button className="text-muted-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-4 py-3 hover:text-primary transition-all bg-transparent">
          GHOST
        </button>
        <button className="clip-corner bg-ef-red text-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 hover:brightness-110 transition-all">
          DANGER
        </button>
      </div>
    </div>
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        SIZES
      </p>
      <div className="flex flex-wrap gap-3 items-end">
        {[
          { label: "XS", px: "4px 12px", font: "10px", h: "28px" },
          { label: "SM", px: "6px 16px", font: "11px", h: "32px" },
          { label: "MD", px: "10px 24px", font: "13px", h: "40px" },
          { label: "LG", px: "14px 32px", font: "15px", h: "48px" },
        ].map((s) => (
          <button
            key={s.label}
            className="clip-corner bg-primary text-primary-foreground font-display font-bold tracking-[0.1em] uppercase transition-all hover:brightness-110"
            style={{ padding: s.px, fontSize: s.font, minHeight: s.h }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
    <div>
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-3">
        STATES
      </p>
      <div className="flex flex-wrap gap-3 items-center">
        <button className="clip-corner bg-primary text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 ring-2 ring-primary ring-offset-2 ring-offset-background">
          FOCUS
        </button>
        <button className="clip-corner bg-primary/80 text-primary-foreground font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 border-2 border-primary-foreground clip-corner-sm animate-diamond-spin" />
          LOADING
        </button>
        <button
          className="clip-corner bg-ef-gray text-ef-gray-mid font-display text-xs font-bold tracking-[0.1em] uppercase px-6 py-3 cursor-not-allowed"
          disabled
        >
          DISABLED
        </button>
      </div>
    </div>
  </div>
);

export const CardShowcase = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    <div className="relative border border-border bg-surface-1 p-6 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden">
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />
      <div className="relative z-10">
        <div className="w-8 h-8 clip-corner-sm bg-primary/10 flex items-center justify-center mb-4">
          <Code2 className="w-4 h-4 text-primary" />
        </div>
        <h4 className="font-display text-xs font-bold tracking-[0.08em] uppercase text-foreground mb-2">
          COMPONENT CARD
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Corner brackets, hover lift, border glow transition on interaction.
        </p>
        <div className="flex items-center gap-2 mt-4 text-primary font-display text-[10px] font-bold tracking-[0.1em] uppercase group-hover:gap-3 transition-all">
          VIEW MORE <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
    <div className="clip-corner border border-border bg-surface-1 p-6 overflow-hidden group hover:border-primary/30 transition-all duration-500">
      <p className="font-display text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-1">
        TOTAL COMPONENTS
      </p>
      <p className="font-display text-4xl font-bold text-primary text-glow-yellow">
        70+
      </p>
      <div className="gradient-line-h my-4" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          11 Categories
        </span>
        <span className="inline-flex items-center gap-1 clip-corner-sm border border-ef-green/40 text-ef-green bg-ef-green/10 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.1em] uppercase">
          <span style={{ fontSize: "5px" }}>◆</span> ACTIVE
        </span>
      </div>
    </div>
  </div>
);

export const colorTokens = [
  { name: "Primary", var: "--primary", sample: "bg-primary" },
  { name: "Destructive", var: "--destructive", sample: "bg-destructive" },
  { name: "Cyan", var: "--ef-cyan", sample: "bg-ef-cyan" },
  { name: "Blue", var: "--ef-blue", sample: "bg-ef-blue" },
  { name: "Green", var: "--ef-green", sample: "bg-ef-green" },
  { name: "Orange", var: "--ef-orange", sample: "bg-ef-orange" },
  { name: "Purple", var: "--ef-purple", sample: "bg-ef-purple" },
  { name: "Red", var: "--ef-red", sample: "bg-ef-red" },
];

export const ColorTokenShowcase = () => (
  <div>
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
      {colorTokens.map((c) => (
        <div key={c.name} className="text-center group cursor-pointer">
          <div
            className={`w-full aspect-square ${c.sample} clip-corner-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_hsl(var(${c.var})/0.4)]`}
          />
          <p className="font-mono text-[9px] text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
            {c.name}
          </p>
        </div>
      ))}
    </div>
    <div className="gradient-line-h my-5" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Surface 0", cls: "bg-surface-0" },
        { label: "Surface 1", cls: "bg-surface-1" },
        { label: "Surface 2", cls: "bg-surface-2" },
        { label: "Surface 3", cls: "bg-surface-3" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 ${s.cls} border border-border clip-corner-sm shrink-0`}
          />
          <span className="font-mono text-[10px] text-muted-foreground">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

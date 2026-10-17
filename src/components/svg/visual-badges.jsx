import React from "react";

export function LivePulseBadge({ label = "Available for work", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-border bg-secondary/80 text-foreground backdrop-blur-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>{label}</span>
    </span>
  );
}

export function VerifiedBadge({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EditorialPillBadge({ icon: Icon, text, count, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-border bg-secondary text-secondary-foreground transition-colors hover:border-primary/50 ${className}`}
    >
      {Icon && <Icon size={12} className="text-primary flex-shrink-0" />}
      <span>{text}</span>
      {count !== undefined && (
        <span className="text-[9px] px-1.5 py-0.2 rounded bg-background/80 text-muted-foreground border border-border">
          {count}
        </span>
      )}
    </span>
  );
}

export function CodeMetricBadge({ number, label, className = "" }) {
  return (
    <div
      className={`flex flex-col p-3 rounded-lg border border-border bg-card/60 backdrop-blur-sm ${className}`}
    >
      <strong className="text-xl font-bold font-mono tracking-tight text-foreground">
        {number}
      </strong>
      <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mt-0.5">
        {label}
      </span>
    </div>
  );
}

export function KeyboardKeyBadge({ keyLabel, description, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border bg-card text-xs font-mono text-foreground shadow-sm ${className}`}
    >
      <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-semibold text-primary">
        {keyLabel}
      </kbd>
      {description && <span className="text-muted-foreground text-[11px]">{description}</span>}
    </span>
  );
}

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeProps = {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "neutral" | "dark" | "outline";
  className?: string;
};

const boxSizes = {
  sm: "h-9 w-9 rounded-xl",
  md: "h-11 w-11 rounded-2xl",
  lg: "h-14 w-14 rounded-2xl",
} as const;

const iconSizes = {
  sm: "h-[18px] w-[18px]",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

const variants = {
  gold: "border-primary/25 bg-gradient-to-br from-primary/18 via-primary/8 to-transparent text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  neutral:
    "border-[color:var(--border)] bg-[color:var(--surface)] text-foreground/75 shadow-[0_1px_0_rgba(255,255,255,0.04)]",
  dark: "border-white/12 bg-white/6 text-primary backdrop-blur-sm",
  outline: "border-[color:var(--border)] bg-background text-foreground/70",
} as const;

export function IconBadge({
  icon: Icon,
  size = "md",
  variant = "gold",
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border",
        boxSizes[size],
        variants[variant],
        className,
      )}
    >
      <Icon className={iconSizes[size]} strokeWidth={1.65} aria-hidden />
    </div>
  );
}

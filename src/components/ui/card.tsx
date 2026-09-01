import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_1px_2px_rgba(15,29,23,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(15,29,23,0.35)]",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}

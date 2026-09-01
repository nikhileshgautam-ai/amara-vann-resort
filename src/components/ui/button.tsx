import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-cream hover:bg-ink shadow-sm hover:shadow-md",
        brass:
          "bg-brass text-white hover:bg-[#8f6a3a] shadow-sm hover:shadow-md",
        whatsapp:
          "bg-[#25D366] text-[#04301a] font-semibold hover:bg-[#1eb757] shadow-sm hover:shadow-md",
        outline:
          "border border-forest/25 text-forest hover:border-forest/60 hover:bg-forest/5",
        light:
          "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
        ghost: "text-forest hover:bg-forest/5",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-6 text-base sm:px-8 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };

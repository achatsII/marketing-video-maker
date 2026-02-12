import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Remotion adaptation of src/components/ui/button.tsx
 *
 * Changes from original:
 * - Replaced <button> with <div> (no interaction in video)
 * - Removed @radix-ui/react-slot (asChild pattern)
 * - Removed hover/focus/disabled interactive states
 * - Removed forwardRef (unnecessary in video context)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RemotionButtonProps
  extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RemotionButton: React.FC<RemotionButtonProps> = ({
  children,
  className,
  variant,
  size,
  style,
}) => {
  return (
    <div
      className={cn(buttonVariants({ variant, size, className }))}
      style={style}
    >
      {children}
    </div>
  );
};

export { buttonVariants };

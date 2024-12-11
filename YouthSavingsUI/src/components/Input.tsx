import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rounded-lg border-2 w-2/3 border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 text-center text-neutral-800 placeholder:text-neutral-700 p-2",
          "bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

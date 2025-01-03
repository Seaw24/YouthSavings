import * as React from "react";
import { cn } from "../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "rounded-md p-2 w-full  text-black text-xs resize-none",
          "border-2 border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10",
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
Textarea.displayName = "Textarea";

export { Textarea };

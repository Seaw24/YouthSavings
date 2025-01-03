import * as React from "react";
import { cn } from "../lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "rounded-lg border-2 w-fit  border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 text-neutral-800 placeholder:text-neutral-700 py-2 px-5",
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
Select.displayName = "Select";

export { Select };

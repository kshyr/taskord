import * as React from "react";

import { cn } from "@/src/utils/styles.utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  InputProps & { icon: React.ReactNode }
>(({ className, icon, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <Input className={cn("pl-10", className)} ref={ref} {...props} />
    </div>
  );
});

export { Input, InputWithIcon };

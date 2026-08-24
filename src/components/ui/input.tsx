import * as React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconClassNames?: string;
}

function Input({
  className,
  type,
  icon,
  iconClassNames,
  iconPosition = "left",
  onKeyDown,
  onChange,
  onPaste,
  min,
  ...props
}: InputProps) {
  const isLeft = iconPosition === "left";
  const isNumber = type === "number";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumber && (e.key === "-" || e.key === "e" || e.key === "+")) {
      e.preventDefault();
    }
    onKeyDown?.(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isNumber) {
      const pasted = e.clipboardData.getData("text");
      if (/[-e+]/i.test(pasted)) {
        e.preventDefault();
      }
    }
    onPaste?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber && e.target.value !== "") {
      const num = Number(e.target.value);
      if (num < 0) {
        e.target.value = "0";
      }
    }
    onChange?.(e);
  };

  return (
    <div className="relative w-full">
      {icon && (
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-grey-500",
            iconClassNames,
            isLeft ? "left-3" : "right-3",
          )}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        min={isNumber ? (min ?? 0) : min}
        data-slot="input"
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={handleChange}
        className={cn(
          "file:text-foreground placeholder:text-grey-500 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-grey-300 w-full min-w-0 rounded-[10px] border bg-transparent px-3 py-3 text-sm text-grey-900 font-poppins transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:border-primary-200",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          icon && (isLeft ? "pl-11" : "pr-3"),
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Input };

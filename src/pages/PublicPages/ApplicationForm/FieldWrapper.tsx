import {type ReactNode } from "react";
import { type FieldError } from "react-hook-form";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  children: ReactNode;
}

export function FieldWrapper({ label, required, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2 items-start w-full">
      <div className="flex flex-col gap-1 items-start w-full">
        <div className="flex gap-1 items-start text-sm font-medium w-full">
          <span className="text-grey-900">{label}</span>
          {required && <span className="text-error-500">*</span>}
        </div>
        {children}
      </div>
      {error && <p className="text-[12px] text-error-500">{error.message}</p>}
    </div>
  );
}

export const inputClass = (hasError?: boolean) =>
  [
    "w-full rounded-[10px] border bg-white px-4 py-3 text-sm text-grey-900",
    "placeholder:text-grey-500 focus:outline-none focus:ring-2 focus:ring-primary/30",
    hasError ? "border-error-500" : "border-grey-300",
  ].join(" ");

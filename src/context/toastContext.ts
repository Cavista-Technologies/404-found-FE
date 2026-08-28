import { createContext, useContext } from "react";

export type Variant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  title?: string;
  variant: Variant;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, variant?: Variant, title?: string) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside a ToastProvider");
  return ctx;
}

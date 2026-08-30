import { useCallback, useState, type ReactNode } from "react";
import { ToastContext, type Toast, type Variant } from "@/context/toastContext";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import {
  CancelCircle,
  Checkmarkcircle03,
  InformationDiamond,
  InformationSquare,
} from "../icons";

type Props = { children: ReactNode };

export function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: Variant = "info", title?: string) => {
      const id = uuid();
      setToasts((t) => [...t, { id, message, variant, title }]);
      setTimeout(() => hideToast(id), 4000);
    },
    [hideToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <div className="fixed top-28 z-99999 space-y-2 right-3 left-3 sm:left-auto sm:right-12 sm:w-auto">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => hideToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

type ToastItemProps = {
  toast: Toast;
  onClose: () => void;
};

const DEFAULT_TITLES: Record<Variant, string> = {
  success: "Success",
  error: "Error",
  warning: "Warning",
  info: "Info",
};

const VARIANT_ICON_WRAPPER: Record<Variant, string> = {
  success: "bg-success-50",
  error: "bg-error-50",
  info: "bg-[#F0F1FE]",
  warning: "bg-warning-50",
};

const VARIANT_ICON: Record<Variant, ReactNode> = {
  success: <Checkmarkcircle03 className="size-5 text-success-600" />,
  error: <CancelCircle className="size-5 text-error-600" />,
  info: <InformationSquare className="size-5 text-info" />,
  warning: <InformationDiamond className="size-5 text-warning-600" />,
};

export function ToastItem({ toast, onClose }: ToastItemProps) {
  const { variant, title = DEFAULT_TITLES[variant], message } = toast;

  return (
    <div
      className={cn(
        "flex items-start justify-between",
        "w-full sm:w-101",
        "min-h-20",
        "p-4 rounded-lg",
        "gap-3 sm:gap-5",
        "bg-white shadow-[0px_6px_10px_0px_#B1B1B114]",
      )}
    >
      <div className="flex items-start gap-3 sm:gap-5 min-w-0">
        <div
          className={cn(
            "flex items-center justify-center",
            "w-9 h-9 rounded-full shrink-0",
            VARIANT_ICON_WRAPPER[variant],
          )}
        >
          {VARIANT_ICON[variant]}
        </div>
        <div className="flex flex-col gap-2 min-w-0">
          <h3 className="font-medium text-sm leading-5 font-poppins text-grey-900 align-middle">
            {title}
          </h3>
          <span className="font-poppins text-sm leading-5 text-grey-500 wrap-break-word">
            {message}
          </span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 text-lg leading-none shrink-0"
      >
        ×
      </button>
    </div>
  );
}

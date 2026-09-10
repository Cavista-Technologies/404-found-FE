import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: React.ReactNode;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "success";
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "Enter" && !isLoading) {
      onConfirm();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 inset-0 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-100 w-full mx-auto">
        {/* Icon */}
        <div className="flex justify-center">{icon}</div>

        {/* Title */}
        <div className="space-y-2 mt-5">
          <h2 className="text-lg font-medium text-center text-grey-900 font-poppins">
            {title}
          </h2>

          {/* Message */}
          <p className="text-center text-grey-500 text-sm font-poppins">
            {message}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full mt-8">
          <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={onClose}
                className="bg-grey-25 border border-grey-300 text-grey-700 font-poppins font-normal text-base leading-6 tracking-normal text-centerflex md:flex-1"
              >
                {cancelText}
              </Button>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className={cn("flex-1", type === "success" && "bg-success-500 hover:bg-success-600")}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

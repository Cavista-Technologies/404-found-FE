import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-poppins disabled:text-grey-400 transition-all disabled:cursor-not-allowed  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-400 focus:bg-primary-600 disabled:bg-grey-200",
        secondary:
          "bg-primary-50 border border-primary-100 text-primary-500 hover:bg-primary-100 hover:border-primary-100 focus:border-primary-200 focus:border disabled:bg-grey-100 disabled:border-grey-200 disabled:border",
          outline:
            "bg-transparent border-[1.5px] border-primary-600 text-primary-600 hover:bg-primary-25 focus:border-2 focus:bg-primary-25 disabled:border-2 disabled:border-grey-100",
        destructive:
          "bg-error-500 text-white hover:bg-error-400 focus:bg-error-600 disabled:bg-grey-200",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border border-grey-300 text-grey-500 disabled:bg-grey-200 disabled:border-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm px-4 py-2 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4 gap-2",
        sm: "px-4 py-2 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4",
        md: "px-6 py-2.5 has-[>svg]:px-4",
        lg: "py-3 px-6 has-[>svg]:px-4",
        icon: "size-5",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const disabled = loading || props.disabled;
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }), disabled && 'cursor-not-allowed')}
      disabled={disabled}
      {...props}
    >
      {children}
      {loading && <Spinner />}
    </Comp>
  )
}

export { Button, buttonVariants }
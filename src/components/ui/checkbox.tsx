import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  rounded?: boolean
}

function Checkbox({ className, rounded = false, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center  border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        rounded ? "rounded-full" : "rounded-lg",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }


// components/ui/checkbox.tsx
// import * as React from "react";
// import { Checkbox as CheckboxPrimitive } from "radix-ui"
// import { Check } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface CheckboxProps
//   extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
//   rounded?: boolean;
// }

// const Checkbox = React.forwardRef
//   React.ElementRef<typeof CheckboxPrimitive.Root>,
//   CheckboxProps
// >(({ className, rounded = false, ...props }, ref) => (
//   <CheckboxPrimitive.Root
//     ref={ref}
//     className={cn(
//       "peer h-4 w-4 shrink-0 border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
//       rounded ? "rounded-full" : "rounded-sm",
//       className,
//     )}
//     {...props}
//   >
//     <CheckboxPrimitive.Indicator
//       className={cn("flex items-center justify-center text-current")}
//     >
//       <Check className="h-3 w-3" />
//     </CheckboxPrimitive.Indicator>
//   </CheckboxPrimitive.Root>
// ));
// Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// export { Checkbox };

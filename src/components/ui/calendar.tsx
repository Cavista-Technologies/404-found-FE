"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("rounded", className)}
      classNames={{
        root: "p-3",
        months: "flex flex-col",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        dropdowns: "flex items-center gap-4 w-full",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "default" }),
          "h-7 w-7 bg-transparent rounded-md border border-primary-500 p-0 opacity-50 hover:opacity-100 absolute left-4 top-3 z-10"
        ),
        button_next: cn(
          buttonVariants({ variant: "default" }),
          "h-7 w-7 bg-transparent rounded-md border border-primary-500 p-0 opacity-50 hover:opacity-100 absolute right-4 top-3 z-10 "
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-grey-900 font-semibold rounded-md w-full text-center font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "w-full h-9 mx-[3px] flex items-center justify-center text-center text-sm p-0 relative rounded-md focus-within:relative focus-within:z-20",
        day_button: cn(
          "h-9 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-primary-500 rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        ),
        range_end: "range-end",
        selected:
          "bg-primary text-white hover:primary hover:text-white focus:bg-primary focus:text-white [&>button]:hover:bg-primary [$>button]:hover:text-white [&>button]:focus:bg-primary [$>button]:focus:text-white",
        today: "border border-primary-500",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-primary-500/50 aria-selected:text-grey-900 aria-selected:opacity-30",
        disabled: "text-primary-300 opacity-50",
        range_middle: "aria-selected:bg-primary-500 aria-selected:text-grey-900",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Dropdown: ({ options, onChange, value }) => (
          <Select
            onValueChange={(value) =>
              onChange?.({
                // @ts-expect-error
                target: { value },
              })
            }
            value={
              typeof value === "number"
                ? value.toString()
                : (value as unknown as string)
            }>
            <SelectTrigger onClick={(e) => e.stopPropagation()} className=" focus:ring ring-primary outline-none inline-flex justify-between items-center py-1 px-4 rounded-lg border border-grey-200 space-x-4 text-sm font-semibold w-full ">
              <SelectValue placeholder="Select field" />
              {/* <SelectIcon asChild>
<ChevronDown className=" size-5 -mt-1 shrink-0" />
</SelectIcon> */}
            </SelectTrigger>
            <SelectContent position="popper" className="z-99 hover:bg-white" onPointerDownOutside={(e)=> e.preventDefault()}>
              {options?.map((option) => (
                <SelectItem key={option.label} value={option.value.toString()} className={`${option.value == value && 'bg-primary text-white' }`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft {...props} />;
          }

          return <ChevronRight {...props} />;
        },
      }}
      hideNavigation
      captionLayout="dropdown"
      // autoFocus
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
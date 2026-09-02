import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Calendar01 } from "../icons";
import { format } from "date-fns";
import { useState, type Dispatch, type SetStateAction } from "react";

interface CalendarHeaderProps {
  currentDate?: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>> | ((date: Date) => void);
  allowFutureDates?: boolean;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  onBackdateSelected?: (date: Date) => void;
}

const DatePicker = ({
  currentDate,
  setCurrentDate,
  allowFutureDates = true,
  placeholder = "dd-mm-yyyy",
  disabled = false,
  minDate,
  onBackdateSelected,
}: CalendarHeaderProps) => {
  const [open, setOpen] = useState(false);
  const today = new Date();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button type="button" className="relative w-full text-left">
          <Input
            readOnly
            placeholder={placeholder}
            value={currentDate ? format(currentDate, "dd-MM-yyyy") : ""}
            className="pl-11 cursor-pointer bg-white disabled:bg-grey-100 disabled:cursor-not-allowed"
            disabled={disabled}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-500">
            <Calendar01 />
          </span>
        </button>
      </PopoverTrigger>
      {open && (
        <PopoverContent
          className="p-0 bg-white border border-grey-200 z-99 rounded-xl w-full"
          sideOffset={8}
        >
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => {
              if (!date) return;

              const today = new Date();
              const selectedDateOnly = date.setHours(0, 0, 0, 0);
              const todayOnly = today.setHours(0, 0, 0, 0);

              if (selectedDateOnly < todayOnly && onBackdateSelected) {
                onBackdateSelected(date);
              } else {
                setCurrentDate(date);
              }

              setOpen(false);
            }}
            disabled={[
              { before: minDate! },
              !allowFutureDates && { after: today },
            ].filter(Boolean)}
          />
        </PopoverContent>
      )}
    </Popover>
  );
};

export default DatePicker;

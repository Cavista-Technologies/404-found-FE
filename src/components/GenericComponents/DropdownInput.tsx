import { cn } from "@/lib/utils";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "../ui/select";

type ValuesType = {
  id: number | string;
  name: string;
};

interface DropdownProps {
  placeholder?: string;
  className?: string;
  value: string;
  disabled?: boolean;
  dropDownValues: ValuesType[];
  onValueChange: (value: string) => void;
  loading?: boolean;
}

export const DropdownInput = ({
  className,
  dropDownValues,
  placeholder,
  value,
  disabled,
  onValueChange,
  loading = false,
}: DropdownProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full", className)}>
        {loading ? (
          <span className="text-grey-400 animate-pulse">Loading...</span>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      {!loading && (
        <SelectContent
          position="popper"
          side="bottom"
          align="start"
          className="z-999 hover:bg-white py-2 rounded-2xl overflow-y-auto"

        >
          {dropDownValues.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id.toString()}
              className={cn("hover:bg-grey-100 rounded-lg px-3 py-2", disabled && "text-grey-500",
                "data-[state=checked]:bg-primary-500 data-[state=checked]:text-white")}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      )}

    </Select>
  );
};

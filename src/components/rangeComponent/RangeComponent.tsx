import { cn } from "@/lib/utils";

interface RangeComponentProps {
  title: string;
  value: number;
  total: number;
  colorByValue?: boolean; // when true, color is driven by percentage thresholds instead of title
}

export const RangeComponent = ({
  title,
  value,
  total,
  colorByValue = false,
}: RangeComponentProps) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  const getBgColorByTitle = (title: string) => {
    const formattedTitle = title.toLowerCase();
    if (formattedTitle === "applicants") return "bg-primary-500";
    if (formattedTitle === "qualified") return "bg-info";
    if (formattedTitle === "screened") return "bg-warning-500";
    if (formattedTitle === "interviewed") return "bg-grey-500";
    if (formattedTitle === "offers")
      return "bg-[linear-gradient(135.72deg,_#831A2B_11.39%,_#F30A2F_84.98%)]";
    if (formattedTitle === "hires") return "bg-success-500";
    return "bg-primary-500";
  };

  const getBgColorByValue = (pct: number) => {
    if (pct === 0) return "bg-grey-500";
    if (pct >= 80) return "bg-primary-500";
    return "bg-success-500";
  };

  const bgColor = colorByValue
    ? getBgColorByValue(safePercentage)
    : getBgColorByTitle(title);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p
          className={cn(
            colorByValue
              ? "text-grey-500 text-xs leading-3.5"
              : "text-grey-900 font-medium text-base leading-6",
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-grey-500",
            colorByValue
              ? "text-xs leading-3.5"
              : "text-base leading-6 font-medium",
          )}
        >
          {value}{colorByValue && "%"}
        </p>
      </div>
      <div className="flex-1 h-3 bg-grey-200 rounded-full overflow-hidden">
        <div
          className={cn("h-3 rounded-full", bgColor)}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
};

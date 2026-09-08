import { ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  isLoading?: boolean;
  bottomText?: string;
  addDays?: boolean;
  trend?: boolean;
  trendValue?: number;
}

export const DashboardCards: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  isLoading,
  bottomText,
  addDays = false,
  trend,
  trendValue = 0,
}) => {
  return (
    <div className="p-6 rounded-2xl flex flex-col gap-10 h-54 min-w-88 w-full shadow-[0px_6px_10px_0px_#B1B1B114] bg-white font-poppins">
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="font-medium text-lg leading-7 text-grey-500">{title}</h3>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          <div className="animate-pulse w-32 h-7 rounded-full bg-grey-100" />
        ) : (
          <p className="text-[40px] font-semibold font-poppins text-grey-800">
            {value}{" "}
            {addDays && (
              <span className="text-xl font-medium -ml-1">day(s)</span>
            )}
          </p>
        )}

        <div className="flex gap-1">
          {trend && (
            <p className="text-base text-grey-500 font-medium leading-6">
              {trendValue > 0 && (
                <span className="text-success">
                  {trendValue}d <ArrowUp />
                </span>
              )}
              {trendValue === 0 && (
                <span className="text-success">{trendValue}d </span>
              )}
              {trendValue < 0 && (
                <span className="text-primary">{trendValue}d </span>
              )}
            </p>
          )}
          <p className="text-base text-grey-500 font-medium leading-6">
            {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

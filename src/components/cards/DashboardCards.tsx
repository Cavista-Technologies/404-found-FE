import type { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  isLoading?: boolean;
  bottomText?: string;
}

export const DashboardCards: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  isLoading,
  bottomText,
}) => {
  return (
    <div className="p-6 rounded-[16px] flex flex-col">
      <div className="flex gap-3">
        {icon}
        <h3 className="font-medium text-lg leading-7">{title}</h3>
      </div>

      <div className="flex flex-col gap-24">
        {isLoading ? (
          <div className="animate-pulse w-32 h-7 rounded-full bg-grey-100" />
        ) : (
          <p className="text-[40px] font-semibold font-poppins text-grey-900">
            {value}
          </p>
        )}

        <p className="text-base font-medium leading-6">{bottomText}</p>
      </div>
    </div>
  );
};

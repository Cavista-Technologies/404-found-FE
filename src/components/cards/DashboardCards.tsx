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
    <div className="p-6 rounded-[16px] flex flex-col gap-10 h-54 w-88 shadow-[0px_6px_10px_0px_#B1B1B114] bg-white font-poppins">
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="font-medium text-lg leading-7 text-grey-500">{title}</h3>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          <div className="animate-pulse w-32 h-7 rounded-full bg-grey-100" />
        ) : (
          <p className="text-[40px] font-semibold font-poppins text-grey-800">
            {value}
          </p>
        )}

        <p className="text-base text-grey-500 font-medium leading-6">{bottomText}</p>
      </div>
    </div>
  );
};

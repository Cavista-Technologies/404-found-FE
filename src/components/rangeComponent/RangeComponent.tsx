import { cn } from "@/lib/utils";

interface RangeComponentProps {
  title: string;
  value: number;
  total: number
}

export const RangeComponent = ({
  title,
  value,
  total

}: RangeComponentProps) => {

    const percentage = total > 0 ? (value / total) * 100 : 0;
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

    const getBgColor=(title: string)=>{
        const formattedTitle = title.toLowerCase()
        if(formattedTitle === "applicants"){
            return "bg-primary-500"
        }else if(formattedTitle==="qualified"){
            return "bg-info"
        }else if(formattedTitle === "screened"){
            return "bg-warning-500"
        }else if(formattedTitle === "interviewed"){
            return "bg-grey-500"
        }else if(formattedTitle === "offers"){
            return "bg-[linear-gradient(135.72deg,_#831A2B_11.39%,_#F30A2F_84.98%)]"
        }else if(formattedTitle === "hires"){
            return "bg-success-500"
        }

        return "bg-primary-500";
    }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-grey-900 font-medium leading-6 text-base">{title}</p>
        <p className="text-grey-500 font-medium leading-6 text-base">{value}</p>
      </div>
      <div className="flex-1 h-3 bg-grey-200 rounded-full overflow-hidden">
        <div
          className={cn("h-3 rounded-full", getBgColor(title))}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
};

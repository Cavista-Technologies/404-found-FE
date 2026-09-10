// TimelineTab.tsx
import { useQuery } from "@tanstack/react-query";
// import { ArrowRight02 } from "@/components/icons";
import { ArrowRight } from "lucide-react";
import { fetchRoleTimeline } from "@/services/roleManagement.service";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/constants/Helpers";

interface TimelineTabProps {
  roleId: string;
}

// "to"-stage color; the "from"-stage is always neutral grey per the design
const STAGE_COLOR_MAP: Record<string, string> = {
  Screen: "text-info",
  Interview: "text-warning-500",
  Offer: "text-success-500",
  Hired: "text-success-500",
  Rejected: "text-error-500",
};

const getStageColor = (stage: string) => STAGE_COLOR_MAP[stage] ?? "text-grey-600";

const getEventDotColor = (type: string) => {
  switch (type) {
    case "RolePublished":
      return "bg-primary-500";
    case "StageChange":
      return "bg-info";
    default:
      return "bg-grey-400";
  }
};

const parseStageChange = (description: string) => {
  const match = description.match(/^Candidate moved (.+) to (.+)$/i);
  if (!match) return null;
  return { from: match[1], to: match[2] };
};

export const TimelineTab = ({ roleId }: TimelineTabProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchRoleTimeline", roleId],
    queryFn: () => fetchRoleTimeline(roleId),
    enabled: !!roleId,
  });

  const entries = data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <Skeleton className="size-4 rounded-full shrink-0" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return <p className="text-grey-600 text-sm leading-5">No timeline activity yet.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-grey-600 text-base leading-6">Audit Timeline</p>

      <div className="flex flex-col items-start w-full max-w-93.25">
        {entries.map((entry, index) => {
          const isLast = index === entries.length - 1;
          const stageChange =
            entry.type === "StageChange" ? parseStageChange(entry.description) : null;
          const subtitle = [entry.actor, entry.candidateName].filter(Boolean).join(" · ");

          return (
            <div key={index} className="flex gap-4 w-full">
              <div className="flex flex-col items-center shrink-0">
                <div className={cn("size-4 rounded-full", getEventDotColor(entry.type))} />
                {!isLast && <div className="w-px flex-1 bg-grey-200 min-h-10" />}
              </div>

              <div className="flex flex-col gap-1 items-start pb-10">
                {stageChange ? (
                  <div className="flex gap-6 items-center flex-wrap">
                    <p className="text-grey-600 text-base leading-6 font-medium whitespace-nowrap">
                      Candidate moved
                    </p>
                    <div className="flex gap-2 items-center">
                      <p className="text-grey-400 text-base leading-6 whitespace-nowrap">
                        {stageChange.from}
                      </p>
                      <ArrowRight className="size-5 text-grey-400" />
                      <p
                        className={cn(
                          "text-base leading-6 whitespace-nowrap",
                          getStageColor(stageChange.to),
                        )}
                      >
                        {stageChange.to}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-grey-600 text-base leading-6 font-medium">
                    {entry.description}
                  </p>
                )}

                <p className="text-grey-500 text-sm leading-5">{subtitle}</p>
                <p className="text-grey-500 text-[10px] leading-3.5 italic">
                  {formatDateTime(entry.date)[0]} {formatDateTime(entry.date)[1]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
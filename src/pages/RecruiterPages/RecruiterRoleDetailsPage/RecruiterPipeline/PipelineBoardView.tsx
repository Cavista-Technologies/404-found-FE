import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarInitials } from "@/constants/Helpers";
import { PIPELINE_BOARD_COLUMNS, STAGE_COLORS } from "@/constants";
import { StageMoveDropdown } from "@/components/GenericComponents/StageMoveDropdown"
import type { PipelineItem } from "@/types/RoleManagement";

interface PipelineBoardViewProps {
  items: PipelineItem[];
  onRequestStageChange: (candidate: PipelineItem, toStage: number) => void;
}

export function RecruiterPipelineBoardView({
  items,
  onRequestStageChange,
}: PipelineBoardViewProps) {
  return (
    <div className="flex w-full items-start gap-6">
      {PIPELINE_BOARD_COLUMNS.map((column) => {
        const columnItems = items.filter((item) => item.stage === column.value);

        return (
          <div
            key={column.value}
            className="flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border p-3"
            style={{
              backgroundColor: column.columnBg,
              borderColor: column.columnBorder,
            }}
          >
            <div className="flex w-full items-center justify-between">
              <p className={`text-base ${STAGE_COLORS[column.value]}`}>
                {column.label}
              </p>
              <span className="flex items-center justify-center rounded-full bg-grey-200 px-2 text-xs font-medium text-grey-700">
                {columnItems.length}
              </span>
            </div>

            <div className="flex w-full flex-col gap-4">
              {columnItems.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex w-full flex-col gap-3 rounded-2xl border p-3"
                  style={{ borderColor: column.columnBorder }}
                >
                  <div className="flex w-full items-center gap-2">
                    <Avatar className="bg-primary text-white font-poppins size-7">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-[10px]">
                        {getAvatarInitials(candidate.candidateName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="truncate text-xs font-medium text-grey-600">
                        {candidate.candidateName}
                      </p>
                      <p className="truncate text-xs text-grey-500">
                        {candidate.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-sm text-grey-600">Source:</span>
                    <span className="rounded bg-info-container px-2 py-0.75 text-xs font-medium text-info">
                      {candidate.sourceStr}
                    </span>
                  </div>

                  <StageMoveDropdown
                    candidate={candidate}
                    onRequestChange={(toStage) =>
                      onRequestStageChange(candidate, toStage)
                    }
                  />
                </div>
              ))}

              {columnItems.length === 0 && (
                <p className="w-full py-2 text-center text-xs text-grey-400">
                  No candidates
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

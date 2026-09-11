import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pagination } from "@/components/layouts/Pagination";
import { getAvatarInitials } from "@/constants/Helpers";
import { STAGE_COLORS } from "@/constants";
import { StageMoveDropdown } from "./StageMoveDropdown";
import type { PipelineItem } from "@/types/RoleManagement";

interface PipelineListViewProps {
  pageResult: PipelinePageResult;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRequestStageChange: (candidate: PipelineItem, toStage: number) => void;
}

export function PipelineListView({
  pageResult,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onRequestStageChange,
}: PipelineListViewProps) {
  const { items, totalCount, pageNumber } = pageResult;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex w-full flex-col">
      <table className="w-full border-collapse">
        <thead>
          <tr className="h-12.5 bg-grey-100">
            <th className="px-3 text-left text-sm font-normal text-grey-600">
              Candidate
            </th>
            <th className="px-3 text-left text-sm font-normal text-grey-600">
              Stage
            </th>
            <th className="px-3 text-left text-sm font-normal text-grey-600">
              Source
            </th>
            <th className="px-3 text-left text-sm font-normal text-grey-600">
              Days in stage
            </th>
            <th className="w-37.5 px-3 text-left text-sm font-normal text-grey-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((candidate) => (
            <tr key={candidate.id} className="h-15 border-b border-grey-200">
              <td className="px-3">
                <div className="flex items-center gap-2">
                  <Avatar className="bg-primary text-white font-poppins size-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs">
                      {getAvatarInitials(candidate.candidateName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-grey-600">
                      {candidate.candidateName}
                    </p>
                    <p className="text-xs text-grey-500">{candidate.email}</p>
                  </div>
                </div>
              </td>
              <td
                className={`px-3 text-sm ${STAGE_COLORS[candidate.stage] ?? "text-grey-600"}`}
              >
                {candidate.stageStr}
              </td>
              <td className="px-3">
                <span className="rounded-full bg-info-container px-2 py-0.75 text-xs font-medium text-info">
                  {candidate.sourceStr}
                </span>
              </td>
              <td className="px-3 text-sm text-grey-600">
                {candidate.daysInStage}
              </td>
              <td className="px-3">
                <StageMoveDropdown
                  candidate={candidate}
                  onRequestChange={(toStage) =>
                    onRequestStageChange(candidate, toStage)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}

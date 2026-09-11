import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPipeline, updateApplicantStage } from "@/services/roleManagement.service";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmModal from "@/components/GenericComponents/ConfirmModal";
import { ArrowRight02, CancelSquare } from "@/components/icons";
import { useToast } from "@/context/toastContext";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PipelineBoardView } from "./PipelineBoardView";
import { PipelineListView } from "./PipelineListView";
import { REJECTED_STAGE } from "@/constants";
import type { PendingStageChange, PipelineItem } from "@/types/RoleManagement";

interface PipelineTabProps {
  roleId: string;
  openingsCount: number;
}

type PipelineViewMode = "board" | "list";

const BOARD_PAGE_SIZE = 100;

export const PipelineTab = ({ roleId, openingsCount }: PipelineTabProps) => {
  const [viewMode, setViewMode] = useState<PipelineViewMode>("board");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pendingStageChange, setPendingStageChange] =
    useState<PendingStageChange | null>(null);

  const effectivePageNumber = viewMode === "list" ? pageNumber : 1;
  const effectivePageSize = viewMode === "list" ? pageSize : BOARD_PAGE_SIZE;

  const { data: items, isLoading, isError } = useQuery({
    queryKey: ["job-role-pipeline", roleId, effectivePageNumber, effectivePageSize],
    queryFn: () => fetchPipeline(roleId, effectivePageNumber, effectivePageSize),
    enabled: !!roleId,
  });

  const pipeline = items?.items ?? []

  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { userId } = useSelector((state: RootState) => state.auth);

  const isRejection = pendingStageChange?.toStage === REJECTED_STAGE;

  const updateMutation = useMutation({
    mutationFn: updateApplicantStage,
    onSuccess: (res) => {
      showToast(res.message ?? "Candidate moved successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["job-role-pipeline", roleId],
      });
    },
    onError: (error: Error) => {
      showToast(`${error.message}`, "error");
    },
    onSettled: () => {
      setPendingStageChange(null);
    },
  });

  const handleRequestStageChange = (candidate: PipelineItem, toStage: number) => {
    setPendingStageChange({
      applicationCandidateId: candidate.id,
      candidateName: candidate.candidateName,
      fromStage: candidate.stage,
      toStage,
    });
  };

  const handleConfirmStageChange = () => {
    if (!pendingStageChange || !userId) return;

    updateMutation.mutate({
      applicationCandidateId: pendingStageChange.applicationCandidateId,
      currentUserId: Number(userId),
      toStage: pendingStageChange.toStage,
      reason: null,
    });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 text-grey-600">
          <p className="text-base">Pipeline Board</p>
          <span className="text-sm">&bull;</span>
          <p className="text-sm">{openingsCount} openings</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setViewMode("board")}
            className={`h-9 rounded-lg border px-3 text-sm font-medium ${
              viewMode === "board"
                ? "border-primary-100 bg-primary-25 text-primary"
                : "border-grey-300 text-grey-700"
            }`}
          >
            Board
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`h-9 rounded-lg border px-3 text-sm font-medium ${
              viewMode === "list"
                ? "border-primary-100 bg-primary-25 text-primary"
                : "border-grey-300 text-grey-700"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {isLoading && <Skeleton className="h-150 w-full" />}

      {isError && (
        <p className="py-6 text-center text-sm text-[#B9243C]">
          Couldn&apos;t load the pipeline. Please try again.
        </p>
      )}

      {!isLoading && !isError && viewMode === "board" && (
        <PipelineBoardView
          items={pipeline}
          onRequestStageChange={handleRequestStageChange}
        />
      )}

      {!isLoading && !isError && viewMode === "list" && items && (
        <PipelineListView
          pageResult={items}
          pageSize={pageSize}
          onPageChange={setPageNumber}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPageNumber(1);
          }}
          onRequestStageChange={handleRequestStageChange}
        />
      )}

      <>
        <ConfirmModal
          isOpen={!!pendingStageChange && !isRejection}
          onConfirm={handleConfirmStageChange}
          onClose={() => setPendingStageChange(null)}
          icon={
            <div className="size-10 rounded-full bg-success-50 flex justify-center items-center">
              <ArrowRight02 className="size-6 text-success-500" />
            </div>
          }
          title="Move Candidate?"
          message={
            pendingStageChange
              ? `Are you sure you want to move ${pendingStageChange.candidateName} to the next stage?`
              : "Are you sure you want to move this candidate to the next stage?"
          }
          confirmText="Confirm"
          cancelText="Cancel"
          type="success"
          isLoading={updateMutation.isPending}
        />

        <ConfirmModal
          isOpen={!!pendingStageChange && isRejection}
          onConfirm={handleConfirmStageChange}
          onClose={() => setPendingStageChange(null)}
          icon={
            <div className="size-10 rounded-full bg-error-50 flex justify-center items-center">
              <CancelSquare className="size-6 text-error-500" />
            </div>
          }
          title="Reject Candidate?"
          message={
            pendingStageChange
              ? `Are you sure you want to reject ${pendingStageChange.candidateName}?`
              : "Are you sure you want to reject this candidate?"
          }
          confirmText="Confirm"
          cancelText="Cancel"
          type="danger"
          isLoading={updateMutation.isPending}
        />
      </>
    </div>
  );
};

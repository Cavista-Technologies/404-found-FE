import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp } from "lucide-react";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { Pagination } from "@/components/layouts/Pagination";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDateTime, getAvatarInitials } from "@/constants/Helpers";
import {
  fetchApplicants,
  updateApplicantStage,
} from "@/services/roleManagement.service";
import { STAGE_OPTIONS } from "@/constants";
import { ArrowRight02, CancelSquare, File02 } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmModal from "@/components/GenericComponents/ConfirmModal";
import { useToast } from "@/context/toastContext";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

interface ApplicantsTabProps {
  roleId: string;
}

interface PendingStageChange {
  applicationCandidateId: number;
  candidateName: string;
  fromStage: number;
  toStage: number;
}

const STAGE_COLORS: Record<number, string> = {
  1: "text-grey-600", // Applied
  2: "text-info", // Screen
  3: "text-[#DD900D]", // Interview
  4: "text-[#0D9488]", // Offer
  5: "text-[#16A34A]", // Hired
  6: "text-[#B9243C]", // Rejected
  7: "text-[#A8A3A4]", // Withdrawn
};

export const ApplicantsTab = ({
  roleId,
}: ApplicantsTabProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [pendingStageChange, setPendingStageChange] =
    useState<PendingStageChange | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["job-role-applicants", roleId, pageNumber, pageSize],
    queryFn: () => fetchApplicants(roleId, pageNumber, pageSize),
    enabled: !!roleId,
  });
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { userId } = useSelector((state: RootState) => state.auth);

  const REJECTED_STAGE = 6;
  const isRejection = pendingStageChange?.toStage === REJECTED_STAGE;

  const updateMutation = useMutation({
    mutationFn: updateApplicantStage,
    onSuccess: (res) => {
      showToast(res.message ?? "Candidate moved successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["job-role-applicants", roleId, pageNumber, pageSize],
      });
    },
    onError: (error) => {
      showToast(`${error.message}`, "error");
    },
    onSettled: () => {
      setPendingStageChange(null);
    },
  });

  const handleConfirmStageChange = () => {
    if (!pendingStageChange || !userId) return;

    updateMutation.mutate({
      applicationCandidateId: pendingStageChange.applicationCandidateId,
      currentUserId: Number(userId),
      toStage: pendingStageChange.toStage,
      reason: null,
    });
  };

  const applicants = data?.items ?? [];
  const totalCount = data?.itemCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white flex flex-row w-full">
      <div className="flex flex-col gap-4 w-full">
        {!isLoading && !isError && applicants.length > 0 && (
          <div className="flex items-center justify-between w-full">
            <p className="text-grey-600 text-base font-normal">
              All Applicants via form
            </p>
            <Button variant="ghost" size="sm">
              Preview Form
            </Button>
          </div>
        )}

        {isLoading && <Skeleton className="h-150 w-full" />}

        {isError && (
          <p className="text-sm text-[#B9243C] py-6 text-center">
            Couldn't load applicants. Please try again.
          </p>
        )}

        {!isLoading && !isError && applicants.length === 0 && (
          <div className="h-80 flex items-center justify-center">
            <p className="text-sm text-grey-500 text-center">
              No applicants yet.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 w-full">
          {applicants.map((applicant) => {
            const isExpanded = expandedId === applicant.id;
            const resume = applicant.files.find((f) =>
              f.fieldName.toLowerCase().includes("resume"),
            );

            return (
              <div
                key={applicant.id}
                className={`border border-grey-200 rounded-2xl w-full transition-colors ${
                  isExpanded ? "bg-grey-25" : "bg-white"
                }`}
              >
                <button
                  onClick={() => toggleExpand(applicant.id)}
                  className="flex items-center justify-between p-4 w-full"
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <Avatar className="bg-primary text-white font-poppins">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getAvatarInitials(applicant.candidateName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-start text-left gap-1">
                      <p className="text-grey-600 text-base font-medium">
                        {applicant.candidateName}
                      </p>
                      <div className="flex items-center gap-2.5 text-sm">
                        <span className="text-sm text-grey-500">
                          {applicant.email}
                        </span>
                        <span className="text-grey-600 text-sm">&bull;</span>
                        <span className="text-grey-500 text-sm">
                          {applicant.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <span
                      className={`text-sm font-normal ${
                        STAGE_COLORS[applicant.stage] ?? "text-grey-600"
                      }`}
                    >
                      {applicant.stageStr}
                    </span>

                    <div
                      className="w-28.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownInput
                        value={String(applicant.stage)}
                        placeholder="Move"
                        dropDownValues={STAGE_OPTIONS}
                        onValueChange={(value: string) => {
                          const toStage = Number(value);
                          if (toStage === applicant.stage) return;
                          setPendingStageChange({
                            applicationCandidateId: applicant.id,
                            candidateName: applicant.candidateName,
                            fromStage: applicant.stage,
                            toStage,
                          });
                        }}
                      />
                    </div>

                    <div className="bg-primary-50 rounded-lg flex items-center justify-center size-8 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="size-4 text-[#B9243C]" />
                      ) : (
                        <ChevronDown className="size-4 text-[#B9243C]" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="flex items-center justify-between px-4 pb-4 w-full">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs text-grey-600">Source</p>
                      <span className="bg-info-container text-info text-xs font-medium rounded-full px-2 py-0.5">
                        {applicant.sourceStr}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs text-grey-600">Resume</p>
                      {resume ? (
                        <a
                          href={resume.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex gap-1 items-center text-sm font-medium text-info hover:underline"
                        >
                          <File02 className="shrink-0 size-4" />
                          <span className="truncate max-w-75">{`${applicant.candidateName} Resume`}</span>
                        </a>
                      ) : (
                        <p className="text-base text-grey-400">N/A</p>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <p className="text-xs text-grey-600">Submitted</p>
                      <p className="text-sm font-medium text-grey-600">
                        {formatDateTime(applicant.appliedOn)[0]},{" "}
                        {formatDateTime(applicant.appliedOn)[1]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isLoading && applicants.length > 0 && (
          <div className="mt-50">
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setPageNumber}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPageNumber(1);
              }}
            />
          </div>
        )}
      </div>

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

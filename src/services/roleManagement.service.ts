import type { PaginatedResponse } from "@/types/ApiResponse";
import type {
  ApplicantsResponse,
  ApplicantStageUpdate,
  RoleDetails,
  RolesTableValues,
  TimelineEntry,
} from "@/types/RoleManagement";
import { httpClient, type ApiEnvelope } from "./httpClient";
import { builderQueryParams } from "@/constants/Helpers";

export const fetchAllRoles = async (
  page: number,
  pageLength: number,
  jobStatus?: number,
  departmentIds?: number,
  searchString?: string,
): Promise<PaginatedResponse<RolesTableValues>> => {
  const params = builderQueryParams({
    page,
    pageLength,
    jobStatus,
    departmentIds,
    searchString,
  });
  const response = await httpClient.get<PaginatedResponse<RolesTableValues>>(
    `/job-roles/open-roles?${params.toString()}`,
  );
  return response;
};

export const fetchRoleDetails = async (id: string): Promise<RoleDetails> => {
  const response = await httpClient.get<RoleDetails>(
    `/job-roles/open-roles/${id}`,
  );
  return response;
};

// export const fetchRolePipeline = async(id: string):Promise<>=>{
//   const response = await httpClient.get<>(`/job-roles/$${id}/pipeline`)
//   return response
// }

export const fetchRoleTimeline = async (
  roleId: string,
): Promise<TimelineEntry[]> => {
  const response = await httpClient.get<TimelineEntry[]>(
    `/job-roles/${roleId}/timeline`,
  );
  return response;
};

export const fetchApplicants = async (
  roleId: string,
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<ApplicantsResponse>> => {
  const params = builderQueryParams({
    pageNumber,
    pageSize,
  });
  const response = await httpClient.get<PaginatedResponse<ApplicantsResponse>>(
    `/job-roles/${roleId}/applicants?${params.toString()}`,
  );
  return response;
};

export const updateApplicantStage = async (
  credentials: ApplicantStageUpdate,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.put<string[]>(
    `/job-roles/candidates/stage`,
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};

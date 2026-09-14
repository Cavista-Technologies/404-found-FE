import type { PaginatedResponse } from "@/types/ApiResponse";
import type {
  ApplicantsResponse,
  ApplicantStageUpdate,
  PipelineItem,
  RoleDetails,
  RolesTableValues,
  TimelineEntry,
} from "@/types/RoleManagement";
import { httpClient, type ApiEnvelope } from "./httpClient";
import { builderQueryParams } from "@/constants/Helpers";
import axios from "axios";

export const fetchAllRoles = async (
  page: number,
  pageLength: number,
  jobStatus?: number,
  departmentId?: number,
  searchString?: string,
): Promise<PaginatedResponse<RolesTableValues>> => {
  const params = builderQueryParams({
    page,
    pageLength,
    jobStatus,
    departmentId,
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

export const fetchPipeline = async (
  roleId: string,
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<PipelineItem>> => {
  const params = builderQueryParams({
    pageNumber,
    pageSize,
  });
  const response = await httpClient.get<PaginatedResponse<PipelineItem>>(
    `/job-roles/${roleId}/pipeline?${params.toString()}`,
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

export const downloadApplicantsResponse = async (
  jobId: number,
  pageNumber: number = 1,
  pageSize: number = 20,
  exportFile: boolean = true,
): Promise<{ blob: Blob; filename: string }> => {
  const params = builderQueryParams({
    pageNumber,
    pageSize,
    export: exportFile
  });
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const response = await axios.get(
    `${baseURL}/job-roles/${jobId}/applicants?${params.toString()}`,
    {
      responseType: "blob",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        Authorization: `Bearer ${localStorage.getItem("ctr-atk") || ""}`,
      },
    },
  );

  // Extract filename from header
  const disposition = response.headers["content-disposition"];
  let filename = "ApplicantsResponse.xlsx";

  if (disposition) {
    const match = disposition.match(/filename\*?=['"]?UTF-8''?([^;\r\n"']+)/i);
    if (match && match[1]) {
      filename = decodeURIComponent(match[1]);
    } else {
      const fallback = disposition.match(/filename="?([^;\r\n"]+)"?/i);
      if (fallback && fallback[1]) filename = fallback[1];
    }
  }

  return { blob: response.data, filename };
};

export const fetchAllRolesByRecruiter = async (
  page: number,
  pageLength: number,
  departmentId?: number,
  searchString?: string,
): Promise<PaginatedResponse<RolesTableValues>> => {
  const params = builderQueryParams({
    page,
    pageLength,
    departmentId,
    searchString,
  });
  const response = await httpClient.get<PaginatedResponse<RolesTableValues>>(
    `/job-roles/recruiter-roles?${params.toString()}`,
  );
  return response;
};
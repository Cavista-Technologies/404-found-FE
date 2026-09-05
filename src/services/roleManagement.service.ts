import type { PaginatedResponse } from "@/types/ApiResponse";
import type { RoleDetails, RolesTableValues } from "@/types/RoleManagement";
import { httpClient } from "./httpClient";
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

export const fetchRoleDetails = async(id:string):Promise<RoleDetails> => {
  const response = await httpClient.get<RoleDetails>(`/job-roles/open-roles/${id}`)
  return response
}


// export const fetchRolePipeline = async(id: string):Promise<>=>{
//   const response = await httpClient.get<>(`/job-roles/$${id}/pipeline`)
//   return response
// }

// export const fetchRoleApplicants = async(id: string):Promise<>=>{
//   const response = await httpClient.get<>(`/job-roles/$${id}/applicants`)
//   return response
// }

// export const fetchRoleTimeline = async(id: string):Promise<>=>{
//   const response = await httpClient.get<>(`/job-roles/$${id}/timeline`)
//   return response
// }
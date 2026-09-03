// import type { PaginatedResponse } from "@/types/ApiResponse";
import type { RolesTableValues } from "@/types/RoleManagement";
import { httpClient } from "./httpClient";
import { builderQueryParams } from "@/constants/Helpers";

export const fetchAllRoles = async (
  page: number,
  pageLength: number,
  jobStatus?: number,
  departmentIds?: number,
  searchString?: string,
// ): Promise<PaginatedResponse<RolesTableValues>> => {
): Promise<RolesTableValues> => {
  const params = builderQueryParams({
    page,
    pageLength,
    jobStatus,
    departmentIds,
    searchString,
  });
//   const response = await httpClient.get<PaginatedResponse<RolesTableValues>>(
  const response = await httpClient.get<RolesTableValues>(
    `/job-roles/open-roles?${params.toString()}`,
  );
  return response;
};
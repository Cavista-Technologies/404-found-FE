import type { CreateNewRoleFormOutput, EditRoleFormOutput } from "@/types/RoleManagement";
import { httpClient, type ApiEnvelope } from "./httpClient";

export const createNewRole = async (
  credentials: CreateNewRoleFormOutput,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    "/job-roles/create",
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};

export const editRoleDetails = async (
  credentials: EditRoleFormOutput,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.put<string[]>(
    `/job-roles/update/${credentials.jobRoleId}`,
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};
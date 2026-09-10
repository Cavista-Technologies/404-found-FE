import type { CreateNewRoleFormOutput } from "@/types/RoleManagement";
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
  credentials: CreateNewRoleFormOutput,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    "/job-roles/create",
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};
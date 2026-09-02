import type { CreateNewRoleFormOutput } from "@/types/RoleManagement";
import { httpClient, type ApiEnvelope } from "./httpClient";

export const createNewRole = async (
  credentials: CreateNewRoleFormOutput,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    "/auth/user-invite",
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};
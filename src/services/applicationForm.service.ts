import { httpClient, type ApiEnvelope } from "./httpClient";
import type {
  CreateApplicationFormPayload,
  OpenRoleSummary,
} from "@/types/ApplicationForm";

export const createApplicationForm = async (
  credentials: CreateApplicationFormPayload,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    "/application-form/create",
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};

export const fetchOpenRoleById = async (
  id: string,
): Promise<OpenRoleSummary> => {
  const response = await httpClient.get<OpenRoleSummary>(
    `/job-roles/open-roles/${id}`,
  );
  return response;
};

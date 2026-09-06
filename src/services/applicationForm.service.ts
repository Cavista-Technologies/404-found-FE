import { httpClient, type ApiEnvelope } from "./httpClient";
import type {
    ApplicationFormDetail,
  CreateApplicationFormPayload,
  OpenRoleSummary,
} from "@/types/ApplicationForm";

export const createApplicationForm = async (
    id: number,
  credentials: CreateApplicationFormPayload,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    `/application-form/${id}/publish-application-form`,
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};

export const saveApplicationFormAsDraft = async (
    id: number,
  credentials: CreateApplicationFormPayload,
): Promise<ApiEnvelope<string[]>> => {
  const response = await httpClient.post<string[]>(
    `/application-form/${id}/save-application-form`,
    credentials,
    { returnFullEnvelope: true },
  );
  return response;
};

export const fetchApplicationFormDetailsById = async (
  id: string,
): Promise<ApplicationFormDetail> => {
  const response = await httpClient.get<ApplicationFormDetail>(
    `/application-form/${id}/application-form`,
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

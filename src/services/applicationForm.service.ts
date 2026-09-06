import { httpClient, type ApiEnvelope } from "./httpClient";
import type {
    ApplicationFormDetail,
  CandidateApplicationFormDetail,
  CreateApplicationFormPayload,
  OpenRoleSummary,
  SubmitApplicationRequest,
} from "@/types/ApplicationForm";
import {type BuiltSubmission } from "@/schemas/buildSubmissionPayload";

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

// export const getPublicApplicationForm= async(
//   slug: string
// ): Promise<ApplicationFormDetail> => {
//   const response = await httpClient.get<ApplicationFormDetail>(
//     `/application-form/public/${slug}`
//   );
//   return response;
// }

export const getPublicApplicationForm= async(
  slug: string
): Promise<CandidateApplicationFormDetail> => {
  const response = await httpClient.get<CandidateApplicationFormDetail>(
    `/application-form/public/${slug}`
  );
  return response;
}

export async function submitPublicApplication({ body, files }: BuiltSubmission): Promise<void> {
  if (files.length === 0) {
    await httpClient.post<void, SubmitApplicationRequest>(
      "/application-form/submit-application",
      body
    );
    return;
  }

  const formData = new FormData();
  formData.append("slug", body.slug);
  formData.append("source", String(body.source));
  formData.append("fullName", body.fullName);
  formData.append("email", body.email);
  formData.append("phone", body.phone);
  formData.append("answers", JSON.stringify(body.answers));

  files.forEach(({ formFieldId, file }) => {
    formData.append(`file_${formFieldId}`, file);
  });

  await httpClient.post("/application-form/submit-application", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}


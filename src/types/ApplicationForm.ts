import { type FieldTypeValue } from "@/constants/fieldTypes";

/** Client-side draft of a field — includes a local `id` for React keys/reordering. */
export interface ApplicationFormFieldDraft {
  id: string;
  label: string;
  placeholder: string;
  fieldType: FieldTypeValue;
  isRequired: boolean;
  isStandard: boolean;
  options: string[];
}

/** Shape expected by POST /application-form/create */
export interface ApplicationFormFieldPayload {
  label: string;
  placeholder: string;
  fieldType: FieldTypeValue;
  isRequired: boolean;
  sortOrder: number;
  isStandard: boolean;
  options: string[];
}

export interface CreateApplicationFormPayload {
  jobRoleId: number;
  title: string;
  introMessage: string;
  fields: ApplicationFormFieldPayload[];
}

export interface OpenRoleSummary {
  id: number;
  title: string;
  hasApplicationForm: boolean;
  applicationFormId: number;
  applicationFormSlug: string;
  applicationFormStatus: number;
  applicationFormStatusStr: string;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldDetail {
  id: number;
  label: string;
  placeholder: string;
  fieldType: number;
  fieldTypeStr: string;
  isRequired: boolean;
  sortOrder: number;
  isStandard: boolean;
  options: FormFieldOption[];
}

export interface ApplicationFormDetail {
  id: number;
  jobRoleId: number;
  jobRoleTitle: string;
  title: string;
  introMessage: string;
  status: number;
  statusStr: string;
  slug: string;
  totalFields: number;
  requiredFields: number;
  optionalFields: number;
  fields: FormFieldDetail[];
}

export interface AnswerPayload {
  formFieldId: number;
  value: string;
}

export interface SubmitApplicationRequest {
  slug: string;
  source: number;
  fullName: string;
  email: string;
  phone: string;
  answers: AnswerPayload[];
}

export interface CandidateApplicationFormDetail {
  jobRoleId: number;
  jobRoleTitle: string;
  description: string;
  department: string;
  location: string;
  employmentType: number;
  employmentTypeStr: string;
  numberOfOpenings: number;
  salaryRange: string;
  title: string;
  introMessage: string;
  slug: string;
  fields: CandidateFormFieldDetail[];
}

/** Client-side draft of a field — includes a local `id` for React keys/reordering. */
export interface ApplicationFormFieldDraft {
  id: string;
  label: string;
  placeholder: string;
  fieldType: FieldTypeValue;
  isRequired: boolean;
  isStandard: boolean;
  options: string[];
}

/** Shape expected by POST /application-form/create */
export interface ApplicationFormFieldPayload {
  label: string;
  placeholder: string;
  fieldType: FieldTypeValue;
  isRequired: boolean;
  sortOrder: number;
  isStandard: boolean;
  options: string[];
}

export interface CreateApplicationFormPayload {
  jobRoleId: number;
  title: string;
  introMessage: string;
  fields: ApplicationFormFieldPayload[];
}

export interface OpenRoleSummary {
  id: number;
  title: string;
  hasApplicationForm: boolean;
  applicationFormId: number;
  applicationFormSlug: string;
  applicationFormStatus: number;
  applicationFormStatusStr: string;
}

export interface FormFieldOption {
  label: string;
  value: string;
}

/** Actual shape returned by GET /application-form/public/{slug}. */
export interface CandidateFormFieldDetail {
  id: number;
  label: string;
  placeholder: string;
  fieldType: FieldTypeValue;
  isRequired: boolean;
  sortOrder: number;
  options: string[];
}

export interface AnswerPayload {
  formFieldId: number;
  value: string;
}

export interface SubmitApplicationRequest {
  slug: string;
  source: number;
  fullName: string;
  email: string;
  phone: string;
  answers: AnswerPayload[];
}

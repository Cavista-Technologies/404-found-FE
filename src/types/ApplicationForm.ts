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

export interface FormFieldDetail {
  id: number;
  label: string;
  placeholder: string;
  fieldType: number;
  fieldTypeStr: string;
  isRequired: boolean;
  sortOrder: number;
  isStandard: boolean;
  options: [];
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

import type { CandidateFormFieldDetail, AnswerPayload, SubmitApplicationRequest } from "@/types/ApplicationForm";
import { FIELD_TYPE } from "@/constants/fieldTypes";
import { fieldName } from "@/schemas/buildApplicationFormSchema";

const STANDARD_MATCHERS: Record<"fullName" | "email" | "phone", RegExp> = {
  fullName: /full ?name/i,
  email: /email/i,
  phone: /phone/i,
};

function standardKeyFor(field: CandidateFormFieldDetail): "fullName" | "email" | "phone" | null {
  for (const [key, pattern] of Object.entries(STANDARD_MATCHERS) as [
    "fullName" | "email" | "phone",
    RegExp
  ][]) {
    if (pattern.test(field.label)) return key;
  }
  return null;
}

interface BuildPayloadArgs {
  slug: string;
  source: number;
  fields: CandidateFormFieldDetail[];
  values: Record<string, unknown>;
}

export interface BuiltSubmission {
  body: SubmitApplicationRequest;
  files: { formFieldId: number; file: File }[];
}

export function buildSubmissionPayload({
  slug,
  source,
  fields,
  values,
}: BuildPayloadArgs): BuiltSubmission {
  let fullName = "";
  let email = "";
  let phone = "";
  const answers: AnswerPayload[] = [];
  const files: { formFieldId: number; file: File }[] = [];

  fields.forEach((field) => {
    const rawValue = values[fieldName(field)];
    const standardKey = standardKeyFor(field);

    if (field.fieldType === FIELD_TYPE.FILE_UPLOAD) {
      const file = (rawValue as FileList | undefined)?.[0];
      if (file) files.push({ formFieldId: field.id, file });
      return;
    }

    const stringValue = rawValue == null ? "" : String(rawValue);

    if (standardKey === "fullName") fullName = stringValue;
    else if (standardKey === "email") email = stringValue;
    else if (standardKey === "phone") phone = stringValue;

    answers.push({ formFieldId: field.id, value: stringValue });
  });

  return { body: { slug, source, fullName, email, phone, answers }, files };
}
import type{ CandidateFormFieldDetail, AnswerPayload, SubmitApplicationRequest } from "@/types/ApplicationForm";
import { FIELD_TYPE } from "@/constants/fieldTypes";
import { fieldName } from "../buildApplicationFormSchema";

// The response no longer flags standard fields explicitly (no `isStandard`),
// so these are matched by label text. Update the patterns if your labels
// ever differ from "Full Name" / "Email Address" / "Phone Number".
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
  source?: number;
  fields: CandidateFormFieldDetail[];
  values: Record<string, unknown>;
}

export interface BuiltSubmission {
  body: SubmitApplicationRequest;
  /** File-type fields, pulled out of `answers` since they can't be JSON strings. */
  files: { formFieldId: number; file: File }[];
}

export function buildSubmissionPayload({
  slug,
  source = 1, // TODO: confirm what "source" values mean (e.g. 1 = careers site)
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
    else answers.push({ formFieldId: field.id, value: stringValue });
  });

  return { body: { slug, source, fullName, email, phone, answers }, files };
}
import { z } from "zod";
import { type CandidateFormFieldDetail } from "@/types/ApplicationForm";
import { FIELD_TYPE } from "@/constants/fieldTypes";

// Field name convention used across the form: `field_{id}`, so we never
// have to worry about label collisions or label text changing shape keys.
export const fieldName = (field: CandidateFormFieldDetail) => `field_${field.id}` as const;

function buildFieldSchema(field: CandidateFormFieldDetail): z.ZodTypeAny {
  if (field.fieldType === FIELD_TYPE.FILE_UPLOAD) {
    return z
      .custom<FileList | undefined>()
      .refine(
        (files) => !field.isRequired || (files && files.length > 0),
        `${field.label} is required`
      )
      .refine((files) => {
        const file = files?.[0];
        return !file || file.size <= 10 * 1024 * 1024; // 10MB, per the design
      }, "File must be 10MB or smaller");
  }

  if (field.fieldType === FIELD_TYPE.NUMBER) {
    const schema = z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number({ error: `${field.label} must be a number` })
    );
    return field.isRequired ? schema : schema.optional();
  }

  let stringSchema: z.ZodString = z.string();

  if (field.fieldType === FIELD_TYPE.EMAIL) {
    stringSchema = z.string().email("Enter a valid email address");
  } else if (field.fieldType === FIELD_TYPE.URL) {
    stringSchema = z.string().url("Enter a valid URL");
  }

  if (field.isRequired) {
    return stringSchema.min(1, `${field.label} is required`);
  }

  return z.union([stringSchema, z.literal("")]).optional();
}

export function buildApplicationFormSchema(fields: CandidateFormFieldDetail[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  fields.forEach((field) => {
    shape[fieldName(field)] = buildFieldSchema(field);
  });
  return z.object(shape);
}

export type ApplicationFormValues = Record<string, unknown>;
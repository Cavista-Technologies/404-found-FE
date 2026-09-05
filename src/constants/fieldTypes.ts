export const FIELD_TYPE = {
  SHORT_TEXT: 1,
  LONG_TEXT: 2,
  NUMBER: 3,
  URL: 4,
  EMAIL: 5,
  PHONE: 6,
  DROPDOWN: 7,
  FILE_UPLOAD: 8,
} as const;

export type FieldTypeValue = (typeof FIELD_TYPE)[keyof typeof FIELD_TYPE];

interface FieldTypeMeta {
  label: string;
  description: string;
}

export const FIELD_TYPE_META: Record<FieldTypeValue, FieldTypeMeta> = {
  [FIELD_TYPE.SHORT_TEXT]: { label: "Short Text", description: "Short Text" },
  [FIELD_TYPE.LONG_TEXT]: { label: "Long Text", description: "Long Text" },
  [FIELD_TYPE.NUMBER]: { label: "Number", description: "Number" },
  [FIELD_TYPE.EMAIL]: { label: "Email", description: "Email" },
  [FIELD_TYPE.PHONE]: { label: "Phone", description: "Phone" },
  [FIELD_TYPE.URL]: { label: "URL", description: "URL" },
  [FIELD_TYPE.DROPDOWN]: { label: "Dropdown", description: "Dropdown" },
  [FIELD_TYPE.FILE_UPLOAD]: { label: "File Upload", description: "File Upload" },
};

/**
 * Field types offered in the "Add Field" panel.
 * Email / Phone / File Upload are seeded as standard fields and aren't
 * offered again here, matching the Figma frame.
 */
export const ADDABLE_FIELD_TYPES: FieldTypeValue[] = [
  FIELD_TYPE.SHORT_TEXT,
  FIELD_TYPE.NUMBER,
  FIELD_TYPE.URL,
  FIELD_TYPE.LONG_TEXT,
  FIELD_TYPE.DROPDOWN,
];

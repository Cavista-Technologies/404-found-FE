import { Controller, type Control, type FieldError, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { type CandidateFormFieldDetail } from "@/types/ApplicationForm";
import { FIELD_TYPE } from "@/constants/fieldTypes";
import { fieldName } from "@/schemas/buildApplicationFormSchema";
import { FieldWrapper, inputClass } from "./FieldWrapper";
import { FileDropInput } from "./FileDropInput";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";

interface DynamicFieldProps {
  field: CandidateFormFieldDetail;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  error?: FieldError;
}

export function DynamicField({ field, register, setValue, error, control }: DynamicFieldProps) {
  const name = fieldName(field);

  if (field.fieldType === FIELD_TYPE.LONG_TEXT) {
    return (
      <FieldWrapper label={field.label} required={field.isRequired} error={error}>
        <textarea
          {...register(name)}
          placeholder={field.placeholder}
          rows={4}
          className={inputClass(!!error)}
        />
      </FieldWrapper>
    );
  }

  if (field.fieldType === FIELD_TYPE.DROPDOWN) {
    return (
      <FieldWrapper label={field.label} required={field.isRequired} error={error}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <DropdownInput
              value={value}
              onValueChange={onChange}
              placeholder={field.placeholder || "Select an option..."}
              dropDownValues={
                field.options?.map((opt) => ({ id: opt, name: opt })) ?? []
              }
            />
          )}
        />
      </FieldWrapper>
    );
  }

  if (field.fieldType === FIELD_TYPE.FILE_UPLOAD) {
    return (
      <FieldWrapper label={field.label} required={field.isRequired} error={error}>
        <FileDropInput name={name} register={register} setValue={setValue} />
      </FieldWrapper>
    );
  }

  const htmlInputType =
    field.fieldType === FIELD_TYPE.EMAIL
      ? "email"
      : field.fieldType === FIELD_TYPE.NUMBER
      ? "number"
      : field.fieldType === FIELD_TYPE.URL
      ? "url"
      : field.fieldType === FIELD_TYPE.PHONE
      ? "tel"
      : "text";

  return (
    <FieldWrapper label={field.label} required={field.isRequired} error={error}>
      <input
        type={htmlInputType}
        {...register(name)}
        placeholder={field.placeholder}
        className={inputClass(!!error)}
      />
    </FieldWrapper>
  );
}

import { useMemo } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { CavistaLogo } from "@/assets/images/images";
import { z } from "zod";
import { usePublicApplicationForm } from "@/hooks/applicationForm/usePublicApplicationForm";
import { submitPublicApplication } from "@/services/applicationForm.service";
import {
  buildApplicationFormSchema,
  fieldName,
  type ApplicationFormValues,
} from "@/schemas/buildApplicationFormSchema";
import { buildSubmissionPayload } from "@/schemas/buildSubmissionPayload";
import { DynamicField } from "./DynamicField";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "./FieldWrapper";
import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { SourceOptions } from "@/constants";
import DOMPurify from "dompurify";

export function CandidateApplicationForm() {
  const { slug } = useParams<{ slug: string }>();
  const { data: form, isLoading, isError } = usePublicApplicationForm(slug);

  const schema = useMemo(
    () =>
      form
        ? buildApplicationFormSchema(form.fields).extend({
            source: z.string().min(1, "Please select how you heard about us"),
          })
        : undefined,
    [form],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ApplicationFormValues>({
    resolver: schema
      ? (zodResolver(schema) as unknown as Resolver<ApplicationFormValues>)
      : undefined,
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!form) return;

    const submission = buildSubmissionPayload({
      slug: form.slug,
      source: Number(values.source),
      fields: form.fields,
      values,
    });

    await submitPublicApplication(submission);
  };

  if (isLoading) {
    return <FormStateMessage message="Loading application form..." />;
  }

  if (isError || !form) {
    return (
      <FormStateMessage message="This application form couldn't be found or is no longer accepting applications." />
    );
  }

  if (isSubmitSuccessful) {
    return (
      <FormStateMessage message="Your application has been submitted. Thank you for your interest in joining the best and brightest team in Cavista Technologies" />
    );
  }

  const sortedFields = [...form.fields].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <div className="mx-auto my-10 flex w-full max-w-231.75 flex-col items-center gap-10 rounded-2xl bg-white px-8 py-10 border border-grey-300">
      <div className="flex w-full max-w-118.25 flex-col items-center gap-6">
        <img
          src={CavistaLogo}
          alt="Cavista"
          className="h-7.75 w-38 object-contain"
        />
        <h1 className="w-full text-center text-[24px] font-medium leading-8 tracking-[-0.48px] text-grey-700">
          {form.title}
        </h1>

        <div className="text-grey-600 text-sm flex gap-4">
          <p>{form.department}</p> &bull;
          <p>{form.location}</p> &bull;
          <p>{form.employmentTypeStr}</p>
        </div>
      </div>

      <div>
        {form.description && (
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(form.description),
            }}
          />
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-8.5">
        {form.introMessage && (
          <div className="flex w-full items-center justify-center rounded-lg bg-grey-50 px-6 py-4">
            <p className="text-[14px] text-grey-600">{form.introMessage}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start gap-6"
        >
          <div className="flex w-full flex-col items-center gap-10">
            <div className="flex w-full flex-col items-start gap-6">
              {sortedFields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  register={register}
                  setValue={setValue}
                  error={errors[fieldName(field)] as any}
                />
              ))}

              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <FieldWrapper
                    label="How did you hear about us?"
                    required
                    error={errors.source as any}
                  >
                    <DropdownInput
                      value={field.value}
                      placeholder="Select an option"
                      dropDownValues={SourceOptions}
                      onValueChange={(value) => field.onChange(value)}
                    />
                  </FieldWrapper>
                )}
              />
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={!isDirty || isSubmitting}
              className=" w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>

          <p className="w-full text-sm text-grey-600">
            Fields marked <span className="text-error-500">*</span> are
            required. Your information is handled in accordance with our privacy
            policy.
          </p>
        </form>
      </div>
    </div>
  );
}

function FormStateMessage({ message }: { message: string }) {
  return (
    <div className="mx-auto flex w-full max-w-134.25 h-screen flex-col items-center gap-4 rounded-2xl bg-white px-8 py-16 text-center">
      <p className="text-[14px] text-grey-600 font-medium">{message}</p>
    </div>
  );
}

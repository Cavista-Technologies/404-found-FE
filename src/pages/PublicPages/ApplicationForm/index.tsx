import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom"; 
import { CavistaLogo } from "@/assets/images/images";

import { usePublicApplicationForm } from "@/hooks/applicationForm/usePublicApplicationForm";
import { submitPublicApplication } from "@/services/applicationForm.service";
import {
  buildApplicationFormSchema,
  fieldName,
} from "@/schemas/buildApplicationFormSchema";
import { buildSubmissionPayload } from "@/schemas/buildSubmissionPayload";
import { DynamicField } from "./DynamicField";
import { Button } from "@/components/ui/button";

export function CandidateApplicationForm() {
  const { slug } = useParams<{ slug: string }>();
  const { data: form, isLoading, isError } = usePublicApplicationForm(slug);

  const schema = useMemo(
    () => (form ? buildApplicationFormSchema(form.fields) : undefined),
    [form],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const onSubmit = async (values: Record<string, any>) => {
    if (!form) return;

    const submission = buildSubmissionPayload({
      slug: slug as string,
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
      <FormStateMessage message="Your application has been submitted. Thank you!" />
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
            </div>

            <Button
              size="lg"
              type="submit"
              disabled={isSubmitting}
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
    <div className="mx-auto flex w-full max-w-134.25 flex-col items-center gap-4 rounded-2xl bg-white px-8 py-16 text-center">
      <p className="text-[14px] text-grey-600">{message}</p>
    </div>
  );
}

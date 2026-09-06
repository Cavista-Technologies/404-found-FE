import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft02 } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createApplicationForm,
  fetchApplicationFormDetailsById,
  fetchOpenRoleById,
  saveApplicationFormAsDraft,
} from "@/services/applicationForm.service";
import { FIELD_TYPE, type FieldTypeValue } from "@/constants/fieldTypes";
import {
  type ApplicationFormFieldDraft,
  type CreateApplicationFormPayload,
} from "@/types/ApplicationForm";
import { FormFieldItem } from "./FormFieldItem";
import { AddFieldPanel } from "./AddFieldPanel";
import { FormSummaryPanel } from "./FormSummaryPanel";
import { CandidateLinkPanel } from "./CandidateLinkPanel";
import { CreateApplicationFormSchema } from "@/schemas";
import { useToast } from "@/context/toastContext";

const createId = () => crypto.randomUUID();

const createDefaultStandardFields = (): ApplicationFormFieldDraft[] => [
  {
    id: createId(),
    label: "Full Name",
    placeholder: "Enter your full name",
    fieldType: FIELD_TYPE.SHORT_TEXT,
    isRequired: true,
    isStandard: true,
    options: [],
  },
  {
    id: createId(),
    label: "Email Address",
    placeholder: "Enter your email address",
    fieldType: FIELD_TYPE.EMAIL,
    isRequired: true,
    isStandard: true,
    options: [],
  },
  {
    id: createId(),
    label: "Phone Number",
    placeholder: "Enter your phone number",
    fieldType: FIELD_TYPE.PHONE,
    isRequired: true,
    isStandard: true,
    options: [],
  },
  {
    id: createId(),
    label: "Resume / CV",
    placeholder: "Upload your resume",
    fieldType: FIELD_TYPE.FILE_UPLOAD,
    isRequired: true,
    isStandard: true,
    options: [],
  },
];

export const ApplicationFormBuilderPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: role } = useQuery({
    queryKey: ["open-role", id],
    queryFn: () => fetchOpenRoleById(id as string),
    enabled: !!id,
  });

  const { data: form, isLoading: isLoadingForm } = useQuery({
    queryKey: ["application-form", id],
    queryFn: () => fetchApplicationFormDetailsById(id as string),
    enabled: !!id,
    retry: false,
  });

  const [title, setTitle] = useState("");
  const [introMessage, setIntroMessage] = useState("");
  const [fields, setFields] = useState<ApplicationFormFieldDraft[]>(
    createDefaultStandardFields(),
  );
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const isPublished = form?.statusStr === "Published";

  useEffect(() => {
    if (!form) return;

    setTitle(form.title);
    setIntroMessage(form.introMessage);
    setFields(
      [...form.fields]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((field) => ({
          id: createId(),
          label: field.label,
          placeholder: field.placeholder,
          fieldType: field.fieldType as FieldTypeValue,
          isRequired: field.isRequired,
          isStandard: field.isStandard,
          options: field.options ?? [],
        })),
    );
  }, [form]);

  const { mutate: submitForm, isPending: isPublishing } = useMutation({
    mutationFn: (payload: CreateApplicationFormPayload) =>
      createApplicationForm(Number(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-form", id] });
      showToast("Application form created successfully", "success");
      navigate(`/dashboard/admin/roles/${id}`);
    },
    onError: (res) => {
      showToast(res.message, "error");
    },
  });

  const { mutate: saveForm, isPending: isSaving } = useMutation({
    mutationFn: (payload: CreateApplicationFormPayload) =>
      saveApplicationFormAsDraft(Number(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-form", id] });
      showToast("Application form saved successfully", "success");
      navigate(`/dashboard/admin/roles/${id}`);
    },
    onError: (res) => {
      showToast(res.message, "error");
    },
  });

  const handleToggleEdit = (fieldId: string) => {
    if (isPublished) return;
    setEditingFieldId((current) => (current === fieldId ? null : fieldId));
  };

  const handleFieldChange = (
    fieldId: string,
    patch: Partial<ApplicationFormFieldDraft>,
  ) => {
    if (isPublished) return;
    setFields((current) =>
      current.map((field) =>
        field.id === fieldId ? { ...field, ...patch } : field,
      ),
    );
  };

  const handleRemoveField = (fieldId: string) => {
    if (isPublished) return;
    setFields((current) => current.filter((field) => field.id !== fieldId));
    setEditingFieldId((current) => (current === fieldId ? null : current));
  };

  const handleMove = (fieldId: string, direction: "up" | "down") => {
    if (isPublished) return;
    setFields((current) => {
      const index = current.findIndex((field) => field.id === fieldId);
      const swapWith = direction === "up" ? index - 1 : index + 1;
      if (swapWith < 0 || swapWith >= current.length) return current;
      const next = [...current];
      [next[index], next[swapWith]] = [next[swapWith], next[index]];
      return next;
    });
  };

  const handleAddField = (type: FieldTypeValue) => {
    if (isPublished) return;
    const newField: ApplicationFormFieldDraft = {
      id: createId(),
      label: "",
      placeholder: "",
      fieldType: type,
      isRequired: true,
      isStandard: false,
      options: type === FIELD_TYPE.DROPDOWN ? ["Option 1"] : [],
    };
    setFields((current) => [...current, newField]);
    setEditingFieldId(newField.id);
  };

  const totalFields = fields.length;
  const requiredCount = fields.filter((field) => field.isRequired).length;
  const optionalCount = totalFields - requiredCount;

  const buildPayload = (): CreateApplicationFormPayload => ({
    jobRoleId: Number(id),
    title,
    introMessage,
    fields: fields.map((field, index) => ({
      label: field.label,
      placeholder: field.placeholder,
      fieldType: field.fieldType,
      isRequired: field.isRequired,
      sortOrder: index,
      isStandard: field.isStandard,
      options: field.options,
    })),
  });

  const handlePublish = () => {
    setFormError(null);
    const payload = buildPayload();

    const result = CreateApplicationFormSchema.safeParse(payload);
    if (!result.success) {
      setFormError(
        result.error.issues[0]?.message ?? "Please check the form fields.",
      );
      return;
    }
    submitForm(payload);
  };

  const handleSaveDraft = () => {
    setFormError(null);
    const payload = buildPayload();

    const result = CreateApplicationFormSchema.safeParse(payload);
    if (!result.success) {
      setFormError(
        result.error.issues[0]?.message ?? "Please check the form fields.",
      );
      return;
    }
    saveForm(payload);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <Link
        to={`/dashboard/admin/roles/${id}`}
        className="text-info text-base flex gap-1.5 items-center"
      >
        <ArrowLeft02 />
        <span>Back to {role?.title ?? "Role"}</span>
      </Link>

      <Card>
        <CardContent className="flex flex-col gap-8 pt-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-2">
              <h2 className="text-grey-700 text-2xl font-medium">
                Application Form Builder
                {isPublished && (
                  <span className="text-grey-500 text-sm font-normal ml-2">
                    (Published — read only)
                  </span>
                )}
              </h2>
              <p className="text-grey-600 text-sm">{role?.title}</p>
            </div>
            {!isPublished && (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  disabled={isSaving}
                  onClick={handleSaveDraft}
                >
                  {isSaving ? "Saving..." : "Save as Draft"}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="md"
                  disabled={isPublishing}
                  onClick={handlePublish}
                >
                  {isPublishing ? "Publishing..." : "Publish Form"}
                </Button>
              </div>
            )}
          </div>

          {formError && <p className="text-error-500 text-sm">{formError}</p>}
          {isLoadingForm ? (
            <div className="flex items-center justify-center w-full min-h-100">
              <div className="size-8 border-4 border-grey-200 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex gap-8 items-start w-full">
              {/* Left column */}
              <Card className="flex-1 border border-primary">
                <CardContent className="flex flex-col gap-8 pt-8 border border-grey-200 rounded-2xl">
                  <div className="flex flex-col gap-3 w-full">
                    <p className="text-grey-600 text-base font-medium">
                      OTHER DETAILS
                    </p>
                    <div className="flex flex-col gap-6 w-full">
                      <div className="flex flex-col gap-1">
                        <label className="text-grey-900 text-sm font-medium">
                          Form Title
                        </label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g Application — Senior Backend Engineer"
                          disabled={isPublished}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-grey-900 text-sm font-medium">
                          Intro Message
                        </label>
                        <Textarea
                          value={introMessage}
                          onChange={(e) => setIntroMessage(e.target.value)}
                          placeholder="Enter intro message"
                          rows={5}
                          disabled={isPublished}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-grey-600 text-lg font-medium">
                        Form Fields
                      </p>
                      {!isPublished && (
                        <p className="text-grey-500 text-base">
                          Click a field to edit &bull; use the arrows to reorder
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                      {fields.map((field, index) => (
                        <FormFieldItem
                          key={field.id}
                          field={field}
                          isEditing={
                            !isPublished && editingFieldId === field.id
                          }
                          isFirst={index === 0}
                          isLast={index === fields.length - 1}
                          isReadOnly={isPublished}
                          onToggleEdit={handleToggleEdit}
                          onChange={handleFieldChange}
                          onRemove={handleRemoveField}
                          onMoveUp={(fieldId) => handleMove(fieldId, "up")}
                          onMoveDown={(fieldId) => handleMove(fieldId, "down")}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right column */}
              <Card className="w-md shrink-0">
                <CardContent className="flex flex-col gap-12 p-6 border border-grey-200 rounded-2xl">
                  {!isPublished && (
                    <AddFieldPanel onAddField={handleAddField} />
                  )}
                  <FormSummaryPanel
                    total={totalFields}
                    required={requiredCount}
                    optional={optionalCount}
                  />
                  <CandidateLinkPanel
                    link="talent.cavistatech.com/apply/..."
                    onPreview={() => {}}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

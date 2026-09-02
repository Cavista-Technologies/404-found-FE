import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type {
  CreateNewRoleFormInput,
  CreateNewRoleFormOutput,
} from "@/types/RoleManagement";
import { CreateNewRoleSchema } from "@/schemas";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { DropdownInput } from "../GenericComponents/DropdownInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/services/lookup.service";
import { EmploymentTypeOptions, PriorityLevelOptions } from "@/constants";
import { Textarea } from "../ui/textarea";
import DatePicker from "../date-picker/DatePicker";
import { useToast } from "@/context/toastContext";
import { createNewRole } from "@/services/roleCreation.service";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const CreateNewRoleForm = () => {
  const { showToast } = useToast();

  const { data: DepartmentList = [], isLoading: departmentLoading } = useQuery({
    queryKey: ["getDepartments"],
    queryFn: fetchDepartments,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm<CreateNewRoleFormInput, unknown, CreateNewRoleFormOutput>({
    resolver: zodResolver(CreateNewRoleSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      employmentType: "",
      priority: "",
      departmentId: "",
      recruiterName: "",
      recruiterEmail: "",
      hiringManagerName: "",
      hiringManagerEmail: "",
      numberOfOpenings: "",
      slaTargetDays: "",
      targetHireDate: undefined,
      salaryRange: "",
      reason: "",
      activate: false,
    },
  });

  const [
    title,
    departmentId,
    recruiterName,
    recruiterEmail,
    hiringManagerName,
    hiringManagerEmail,
    targetHireDate,
  ] = watch([
    "title",
    "departmentId",
    "recruiterName",
    "recruiterEmail",
    "hiringManagerName",
    "hiringManagerEmail",
    "targetHireDate",
  ]);

  const isTitleFilled = !!title?.trim();
  const isDepartmentFilled = !!departmentId;
  const isRecruiterAssigned =
    !!recruiterName?.trim() && !!recruiterEmail?.trim();
  const isHiringManagerAssigned =
    !!hiringManagerName?.trim() && !!hiringManagerEmail?.trim();
  const isTargetHireDateFilled = !!targetHireDate;

  const submitMutation = useMutation({
    mutationFn: createNewRole,
    onSuccess: (res) => {
      reset();
      showToast(res.message ?? "Role opened succesfully", "success");
    },
    onError: (error) => {
      showToast(`${error.message}`, "error");
    },
  });

  const onSubmit: SubmitHandler<CreateNewRoleFormOutput> = (values) => {
    submitMutation.mutate(values);
  };

  const handleActivate = handleSubmit((values) => {
    submitMutation.mutate({ ...values, activate: true });
  });

  const handleSaveDraft = handleSubmit((values) => {
    submitMutation.mutate({ ...values, activate: false });
  });

  return (
    <>
      <div className="flex gap-8">
        <div className="border border-grey-200 p-6 rounded-[16px] flex-1 space-y-10">
          <div className="space-y-2">
            <h3 className="text-grey-700 text-2xl font-medium">
              Create New Role
            </h3>
            <p className="text-sm text-grey-600 leading-5">
              Save as draft with minimal info, or complete all fields to
              activate immediately.
            </p>
          </div>

          <div>
            <div className="w-full">
              <form id="create-new-role-form" onSubmit={handleSubmit(onSubmit)}>
                <FieldSet>
                  <FieldGroup>
                    <div className="space-y-6">
                      {/* Role Identity details */}
                      <div className="space-y-3">
                        <h4 className="uppercase text-grey-600 font-medium text-base">
                          Role Identity
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                          <Controller
                            name="title"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Role Title
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="title"
                                    placeholder="e.g Senior Backend Engineer"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="departmentId"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Department
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <DropdownInput
                                    value={field.value}
                                    placeholder="Select account type"
                                    dropDownValues={DepartmentList}
                                    loading={departmentLoading}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="employmentType"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Employment Type
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <DropdownInput
                                    value={field.value}
                                    placeholder="Select an employment type"
                                    dropDownValues={EmploymentTypeOptions}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="location"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Location
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="location"
                                    placeholder="e.g remote, hybrid, Lagos"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Description
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Textarea
                                    {...field}
                                    id="description"
                                    placeholder="Brief description of role"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                      "h-30",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />
                        </div>
                      </div>

                      {/* Ownership details */}
                      <div className="space-y-3">
                        <h4 className="uppercase text-grey-600 font-medium text-base">
                          Ownership
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                          <Controller
                            name="recruiterName"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Recruiter Name
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="recruiterName"
                                    placeholder="Enter name"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="recruiterEmail"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Recruiter Email
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="recruiterEmail"
                                    placeholder="mail@axxess.com"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="hiringManagerName"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Hiring Manager Name
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="hiringManagerName"
                                    placeholder="Enter name"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="hiringManagerEmail"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Hiring Manager Email
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="hiringManagerEmail"
                                    placeholder="mail@axxess.com"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="numberOfOpenings"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Number of Openings
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="numberOfOpenings"
                                    placeholder="Enter number or openings"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="priority"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Priority
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <DropdownInput
                                    value={field.value}
                                    placeholder="Select priority level"
                                    dropDownValues={PriorityLevelOptions}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />
                        </div>
                      </div>

                      {/* Hiring date Details */}
                      <div className="space-y-3">
                        <h4 className="uppercase text-grey-600 font-medium text-base">
                          Date
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                          <Controller
                            name="targetHireDate"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Target Hire Date
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <DatePicker
                                    currentDate={field.value}
                                    setCurrentDate={field.onChange}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="slaTargetDays"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    SLA Target Days
                                    <span className="text-error">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="slaTargetDays"
                                    placeholder="Enter number of days"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />
                        </div>
                      </div>

                      {/* Other Details for Role */}

                      {/* Hiring date Details */}
                      <div className="space-y-3">
                        <h4 className="uppercase text-grey-600 font-medium text-base">
                          Other Details
                        </h4>
                        <div className="grid gap-x-4 gap-y-6">
                          <Controller
                            name="salaryRange"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Salary Range (Optional)
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="salaryRange"
                                    placeholder="e.g 1,000,000 - 2,000,000"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                      "w-1/2"
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />

                          <Controller
                            name="reason"
                            control={control}
                            render={({ field, fieldState }) => (
                              <Field>
                                <div className="space-y-1">
                                  <FieldLabel
                                    htmlFor={field.name}
                                    className="text-sm text-grey-900 font-medium"
                                  >
                                    Reason<span className="text-error">*</span>
                                  </FieldLabel>
                                  <Textarea
                                    {...field}
                                    id="reason"
                                    placeholder="Why is this role open?"
                                    className={cn(
                                      fieldState.error && "border-error-200",
                                      "h-30 w-1/2",
                                    )}
                                  />
                                  {fieldState.error && (
                                    <p className="text-xs text-primary-500">
                                      {fieldState.error.message}
                                    </p>
                                  )}
                                </div>
                              </Field>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </FieldGroup>
                </FieldSet>
              </form>
            </div>
          </div>
        </div>

        <div className="min-w-112.5 p-6 h-fit border border-grey-200 rounded-[16px]">
          <h4 className="text-grey-600 text-lg font-medium leading-7">
            Activation Readiness
          </h4>

          <div className="space-y-6 mt-6">
            <div className="flex items-center gap-2 text-grey-600 tet-base leading-6">
              <Checkbox rounded checked={isTitleFilled} /> Role Title
            </div>
            <div className="flex items-center gap-2 text-grey-600 tet-base leading-6">
              <Checkbox rounded checked={isDepartmentFilled} /> Department
            </div>
            <div className="flex items-center gap-2 text-grey-600 tet-base leading-6">
              <Checkbox rounded checked={isRecruiterAssigned} /> Recruiter
              assigned
            </div>
            <div className="flex items-center gap-2 text-grey-600 tet-base leading-6">
              <Checkbox rounded checked={isHiringManagerAssigned} /> Hiring
              Manager assigned
            </div>
            <div className="flex items-center gap-2 text-grey-600 tet-base leading-6">
              <Checkbox rounded checked={isTargetHireDateFilled} /> Target hire
              date
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-10">
            <Button
              size="lg"
              variant="default"
              disabled={!isDirty && isSubmitting}
              onClick={handleActivate}
            >
              Activate Role
            </Button>
            <Button
              size="lg"
              variant="ghost"
              disabled={!isDirty && isSubmitting}
              onClick={handleSaveDraft}
            >
              Save as Draft
            </Button>
            <Button
              size="lg"
              variant="link"
              className="border-none hover:bg-none hover:no-underline"
            >
              <Link to="/dashboard/admin/roles">Cancel</Link>
            </Button>
          </div>

          <p className="text-grey-600 text-base leading-6 font-poppins mt-8">Complete all required fields above to activate.<br />
          Save as Draft with just a title.</p>
        </div>
      </div>
    </>
  );
};

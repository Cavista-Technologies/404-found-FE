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
import { useQuery } from "@tanstack/react-query";
import { fetchDepartments } from "@/services/lookup.service";
import { EmploymentTypeOptions, PriorityLevelOptions } from "@/constants";
import { Textarea } from "../ui/textarea";
import DatePicker from "../date-picker/DatePicker";

export const CreateNewRoleForm = () => {
  const { data: DepartmentList = [], isLoading: departmentLoading } = useQuery({
    queryKey: ["getDepartments"],
    queryFn: fetchDepartments,
  });

  const {
    reset,
    control,
    handleSubmit,
    watch,
    // formState: { isDirty, isSubmitting },
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
  return (
    <div>
      <form action="">
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
                            Role Title<span className="text-error">*</span>
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
                            Department<span className="text-error">*</span>
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
                            Employment Type<span className="text-error">*</span>
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
                            Location<span className="text-error">*</span>
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
                            Description<span className="text-error">*</span>
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
                            Priority<span className="text-error">*</span>
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
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

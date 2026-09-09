import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Text01,
  Call,
  Upload03,
  Link05,
  TextSmallcaps,
  ArrowDown01,
  ArrowUp02,
  ArrowDown02,
  Mail02,
} from "@/components/icons";
import {
  FIELD_TYPE,
  FIELD_TYPE_META,
  type FieldTypeValue,
} from "@/constants/fieldTypes";
import { type ApplicationFormFieldDraft } from "@/types/ApplicationForm";

const FIELD_ICON: Record<
  FieldTypeValue,
  React.ComponentType<{ className?: string }>
> = {
  [FIELD_TYPE.SHORT_TEXT]: Text01,
  [FIELD_TYPE.LONG_TEXT]: TextSmallcaps,
  [FIELD_TYPE.NUMBER]: Text01,
  [FIELD_TYPE.EMAIL]: Mail02,
  [FIELD_TYPE.PHONE]: Call,
  [FIELD_TYPE.URL]: Link05,
  [FIELD_TYPE.DROPDOWN]: ArrowDown01,
  [FIELD_TYPE.FILE_UPLOAD]: Upload03,
};

interface FormFieldItemProps {
  field: ApplicationFormFieldDraft;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  isReadOnly?: boolean;
  error?: string;
  onToggleEdit: (id: string) => void;
  onChange: (id: string, patch: Partial<ApplicationFormFieldDraft>) => void;
  onRemove: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export const FormFieldItem = ({
  field,
  isEditing,
  isFirst,
  isLast,
  isReadOnly = false,
  error,
  onToggleEdit,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: FormFieldItemProps) => {
  const Icon = FIELD_ICON[field.fieldType];
  const meta = FIELD_TYPE_META[field.fieldType];
  const isDropdown = field.fieldType === FIELD_TYPE.DROPDOWN;

  return (
    <div
      className={cn(
        "border rounded-2xl w-full overflow-hidden",
        error ? "border-error-200" : "border-grey-200",
      )}
    >
      <button
        type="button"
        onClick={() => !isReadOnly && onToggleEdit(field.id)}
        disabled={isReadOnly}
        className={cn(
          "flex items-center justify-between p-4 w-full text-left",
          isReadOnly && "cursor-default",
        )}
      >
        <div className="flex flex-1 min-w-0 gap-3 items-center">
          <div className="bg-grey-100 rounded-lg shrink-0 size-8 flex items-center justify-center">
            <Icon className="size-5 text-grey-500" />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex gap-1 items-center text-base">
              <p className="text-grey-700 text-base leading-6 truncate">
                {field.label || "Untitled field"}
              </p>
              {field.isRequired && (
                <span className="text-error-500 shrink-0">*</span>
              )}
            </div>
            <p className="text-grey-500 text-xs">
              {meta.label}
              {field.isStandard ? " · Standard Field" : ""}
            </p>
            {error && !isEditing && (
              <p className="text-error-500 text-xs">{error}</p>
            )}
          </div>
        </div>

        {!isReadOnly && (
          <div
            className="flex gap-2 items-center shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              disabled={isFirst}
              onClick={() => onMoveUp(field.id)}
              className="bg-grey-50 border border-grey-200 rounded size-6 flex items-center justify-center disabled:opacity-40"
            >
              <ArrowUp02 className="size-4 text-grey-500" />
            </button>
            <button
              type="button"
              disabled={isLast}
              onClick={() => onMoveDown(field.id)}
              className="bg-grey-50 border border-grey-200 rounded size-6 flex items-center justify-center disabled:opacity-40"
            >
              <ArrowDown02 className="size-4 text-grey-500" />
            </button>
          </div>
        )}
      </button>

      {!isReadOnly && isEditing && (
        <div className="border-t border-grey-200 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-grey-900 text-sm font-medium">Label</label>
            <Input
              value={field.label}
              onChange={(e) => onChange(field.id, { label: e.target.value })}
              placeholder="Field label"
              className={cn(error && "border-error-200")}
            />
            {error && <p className="text-error-500 text-xs">{error}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-grey-900 text-sm font-medium">
              Placeholder
            </label>
            <Input
              value={field.placeholder}
              onChange={(e) =>
                onChange(field.id, { placeholder: e.target.value })
              }
              placeholder="Field placeholder"
            />
          </div>
          {isDropdown && (
            <div className="flex flex-col gap-1.5">
              <label className="text-grey-900 text-sm font-medium">
                Options
              </label>
              {field.options.map((option, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const next = [...field.options];
                      next[index] = e.target.value;
                      onChange(field.id, { options: next });
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onChange(field.id, {
                        options: field.options.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() =>
                  onChange(field.id, {
                    options: [
                      ...field.options,
                      `Option ${field.options.length + 1}`,
                    ],
                  })
                }
              >
                Add option
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-grey-700 text-sm">Required field</span>
            <Switch
              checked={field.isRequired}
              onCheckedChange={(checked) =>
                onChange(field.id, { isRequired: checked })
              }
            />
          </div>
          {!field.isStandard && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={cn("text-error-500 self-start")}
              onClick={() => onRemove(field.id)}
            >
              Remove field
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

import {
  Text01,
  LeftToRightListNumber,
  Link05,
  TextSmallcaps,
  ArrowDown01,
} from "@/components/icons";
import { ADDABLE_FIELD_TYPES, FIELD_TYPE, FIELD_TYPE_META, type FieldTypeValue } from "@/constants/fieldTypes";

const ADD_FIELD_ICON: Record<FieldTypeValue, React.ComponentType<{ className?: string }>> = {
  [FIELD_TYPE.SHORT_TEXT]: Text01,
  [FIELD_TYPE.NUMBER]: LeftToRightListNumber,
  [FIELD_TYPE.URL]: Link05,
  [FIELD_TYPE.LONG_TEXT]: TextSmallcaps,
  [FIELD_TYPE.DROPDOWN]: ArrowDown01,
  [FIELD_TYPE.EMAIL]: Text01,
  [FIELD_TYPE.PHONE]: Text01,
  [FIELD_TYPE.FILE_UPLOAD]: Text01,
};

interface AddFieldPanelProps {
  onAddField: (type: FieldTypeValue) => void;
}

export const AddFieldPanel = ({ onAddField }: AddFieldPanelProps) => {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <p className="text-grey-600 text-lg font-medium">Add Field</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 w-full">
        {ADDABLE_FIELD_TYPES.map((type) => {
          const Icon = ADD_FIELD_ICON[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => onAddField(type)}
              className="border border-grey-200 rounded-lg flex flex-1 gap-2 items-center px-4 py-2 min-w-[45%]"
            >
              <Icon className="size-5 text-grey-500" />
              <span className="text-grey-600 text-base">{FIELD_TYPE_META[type].label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

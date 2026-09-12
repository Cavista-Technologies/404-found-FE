import { DropdownInput } from "@/components/GenericComponents/DropdownInput";
import { STAGE_OPTIONS } from "@/constants";
import { TERMINAL_STAGES } from "@/constants";
import type { PipelineItem } from "@/types/RoleManagement";

interface StageMoveDropdownProps {
  candidate: PipelineItem;
  onRequestChange: (toStage: number) => void;
}

export function StageMoveDropdown({
  candidate,
  onRequestChange,
}: StageMoveDropdownProps) {
  if (TERMINAL_STAGES.has(candidate.stage)) {
    return <span className="text-sm text-grey-600">Terminal</span>;
  }

  return (
    <DropdownInput
      value={String(candidate.stage)}
      placeholder="Move"
      dropDownValues={STAGE_OPTIONS}
      onValueChange={(value: string) => {
        const toStage = Number(value);
        if (toStage === candidate.stage) return;
        onRequestChange(toStage);
      }}
    />
  );
}

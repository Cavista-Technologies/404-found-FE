import { Button } from "@/components/ui/button";

interface CandidateLinkPanelProps {
  link: string;
  onPreview: () => void;
}

export const CandidateLinkPanel = ({ link, onPreview }: CandidateLinkPanelProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-grey-600 text-lg font-medium">Candidate Link</p>
      <div className="flex flex-col gap-4 w-full">
        <p className="text-grey-600 italic text-base">{link}</p>
        <Button type="button" variant="secondary" className="w-full" onClick={onPreview} disabled>
          Preview as Candidate
        </Button>
      </div>
    </div>
  );
};

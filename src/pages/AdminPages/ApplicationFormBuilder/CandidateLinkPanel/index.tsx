import { Button } from "@/components/ui/button";

interface CandidateLinkPanelProps {
  link: string;
  onPreview: () => void;
}

// ⚠️ NOT WIRED: `link` and `onPreview` aren't backed by an endpoint in your
// spec — pass in the real candidate link once you have it, and hook up
// `onPreview` (e.g. window.open(link, "_blank")) once you decide the flow.
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

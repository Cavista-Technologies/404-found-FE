import { useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface FileDropInputProps {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

export function FileDropInput({ name, register, setValue }: FileDropInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { ref, onChange, ...rest } = register(name);

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        // No native `change` event for a drop, so set the value directly.
        setValue(name, files, { shouldValidate: true, shouldDirty: true });
        setFileName(files?.[0]?.name ?? null);
      }}
      className="flex w-full flex-col items-center gap-3 rounded-[24px] border border-dashed border-[#e9e8e8] bg-white px-6 py-4 text-center"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8e9ec]">
        <UploadIcon />
      </span>
      <span className="flex flex-col gap-1 text-[#7a7172]">
        <span className="text-[14px]">
          {fileName ?? "Click to upload PDF, DOC, DOCX"}
        </span>
        <span className="text-[12px]">Max 10MB</span>
      </span>
      <input
        {...rest}
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          // Let RHF's own onChange do the real value extraction/validation —
          // it reads event.target.files internally for file inputs. We only
          // piggyback on it to update the display name.
          onChange(e);
          setFileName(e.target.files?.[0]?.name ?? null);
        }}
      />
    </button>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke="#B9243C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

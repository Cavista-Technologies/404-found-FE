import { UploadIcon } from "@/components/icons";
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
  const { ref, ...rest } = register(name);

  const handleFiles = (files: FileList | null) => {
    setValue(name, files, { shouldValidate: true });
    setFileName(files?.[0]?.name ?? null);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      className="flex w-full flex-col items-center gap-3 rounded-3l border border-dashed border-grey-200 bg-white px-6 py-4 text-center"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50">
        <UploadIcon className="size-6 text-primary-600" />
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
        onChange={(e) => handleFiles(e.target.files)}
      />
    </button>
  );
}



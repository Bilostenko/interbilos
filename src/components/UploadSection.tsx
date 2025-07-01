import React from 'react';
import { useAppDispatch } from "../store/hooks";
import { setUploadedFile, analyzeFile } from "../store/requestProcessingSlice";

interface UploadSectionProps {
  onFileUpload?: (file: File) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onFileUpload }) => {

 const dispatch = useAppDispatch();
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileUpload?.(file);
        dispatch(setUploadedFile(file));
        dispatch(analyzeFile(file)); // Запускає парсинг + GPT
      }
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  return (
   <div className="p-4">
  <h3 className="text-[#101418] text-lg font-bold pb-2 pt-4">
    1. Завантаж запит
  </h3>
  <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#d4dbe2] px-6 py-1 cursor-pointer">
    <input
      type="file"
      accept=".pdf,.docx"
      onChange={handleFileSelect}
      className="hidden"
    />
    <div className="text-center">
      <p className="text-[#101418] text-xs">
       Підтримуються: PDF, DOCX (max 10MB)
      </p>
    </div>
    <span className="flex h-10 px-4 items-center justify-center rounded-xl bg-[#eaedf1] text-[#101418] text-sm font-bold">
     ЗАВАНТАЖИТИ
    </span>
  </label>
</div>

  );
};

export default UploadSection;

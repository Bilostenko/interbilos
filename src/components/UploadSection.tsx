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
    <div className="flex flex-col p-4">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        1. Upload Request
      </h3>
      <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#d4dbe2] px-6 py-14">
        <div className="flex max-w-[480px] flex-col items-center gap-2">
          <p className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
            Browse to upload your file
          </p>
          <p className="text-[#101418] text-sm font-normal leading-normal max-w-[480px] text-center">
            Supported formats: PDF, DOCX. Maximum file size: 10MB
          </p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <span className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaedf1] text-[#101418] text-sm font-bold leading-normal tracking-[0.015em]">
            Upload Request
          </span>
        </label>
      </div>
    </div>
  );
};

export default UploadSection;

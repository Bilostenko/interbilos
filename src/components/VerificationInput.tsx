import React, { useState } from 'react';

interface VerificationInputProps {
  onDataChange?: (data: string) => void;
  initialValue?: string;
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  onDataChange,
  initialValue = ''
}) => {
  const [verificationData, setVerificationData] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setVerificationData(value);
    onDataChange?.(value);
  };

  return (
    <div className="px-4 py-3">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
        3. Verification Data Input
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4">
        <label className="flex flex-col min-w-40 flex-1">
          <textarea
            value={verificationData}
            onChange={handleChange}
            placeholder="Enter verified data here"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] min-h-36 placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal"
          />
        </label>
      </div>
    </div>
  );
};

export default VerificationInput;
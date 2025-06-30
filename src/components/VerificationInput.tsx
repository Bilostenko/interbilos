import React, { useState } from 'react';

interface VerificationInputProps {
  onDataSubmit?: (data: string) => void;
  initialValue?: string;
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  onDataSubmit,
  initialValue = ''
}) => {
  const [verificationData, setVerificationData] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVerificationData(e.target.value);
  };

  const handleSubmit = () => {
    if (onDataSubmit) {
      onDataSubmit(verificationData);
    }
  };

  return (
  <div className="px-4 py-3">
    <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">
      3. Verification Data Input
    </h3>
    <div className="flex w-full flex-wrap items-end gap-4">
      <label className="flex flex-col w-full flex-1">
        <textarea
          value={verificationData}
          onChange={handleChange}
          placeholder="Enter verified data here"
          className="form-input w-full resize-y rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border border-[#d4dbe2] bg-gray-50 focus:border-[#d4dbe2] min-h-36 max-h-[400px] overflow-y-auto placeholder:text-[#5c728a] p-[15px] text-base font-normal leading-normal"
        />
      </label>
      <button
        onClick={handleSubmit}
        className="flex h-10 items-center justify-center rounded-xl bg-[#dce7f3] px-4 text-sm font-bold text-[#101418] hover:bg-[#c8daf0] transition-colors"
      >
        Send to AI
      </button>
    </div>
  </div>
);

};

export default VerificationInput;

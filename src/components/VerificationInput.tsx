import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setVerificationField } from '../store/requestProcessingSlice';

export const VerificationInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const verificationData = useAppSelector(
    (state) => state.requestProcessing.verificationData
  );

  const handleChange = (field: keyof typeof verificationData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setVerificationField({ field, value: e.target.value }));
  };

  return (
    <div className="px-4 py-3 space-y-4">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
        3. Введення даних для верифікації
      </h3>
      
      <input
        type="text"
        value={verificationData.name}
        onChange={handleChange('name')}
        placeholder="Full Name (e.g., JOHN DOE)"
        className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
      />

      <input
        type="text"
        value={verificationData.date_of_birth}
        onChange={handleChange('date_of_birth')}
        placeholder="Date of Birth (e.g., 01.01.1980)"
        className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
      />

      <input
        type="text"
        value={verificationData.residenceAddress}
        onChange={handleChange('residenceAddress')}
        placeholder="Residence Address"
        className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
      />

      <input
        type="text"
        value={verificationData.passport}
        onChange={handleChange('passport')}
        placeholder="Passport Info"
        className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
      />

      <textarea
        value={verificationData.criminalRecords}
        onChange={handleChange('criminalRecords')}
        placeholder="Criminal Records"
        className="form-input w-full resize-y rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px] min-h-28"
      />

      <textarea
        value={verificationData.additionalInfo}
        onChange={handleChange('additionalInfo')}
        placeholder="Additional Info"
        className="form-input w-full resize-y rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px] min-h-28"
      />
    </div>
  );
};

export default VerificationInput;

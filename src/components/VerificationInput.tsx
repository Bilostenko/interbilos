import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setVerificationField } from "../store/requestProcessingSlice";

export const VerificationInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const verificationData = useAppSelector(
    (state) => state.requestProcessing.verificationData
  );

  const handleChange =
    (field: keyof typeof verificationData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const value =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;

      dispatch(setVerificationField({ field, value }));
    };

  return (
    <div className="px-4 py-3 space-y-4">
      <h3 className="text-[#101418] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
        3. Введення даних для верифікації
      </h3>

      <div className="mb-5">
        <label
          htmlFor="full-name"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          NAME:
        </label>
        <input
          id="full-name"
          type="text"
          value={verificationData.name}
          onChange={handleChange("name")}
          placeholder="BILOSTENKO f/n Dmytro s/o Yevhen"
          className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="dob"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          DOB:
        </label>
        <input
          id="dob"
          type="text"
          value={verificationData.date_of_birth}
          onChange={handleChange("date_of_birth")}
          placeholder="30.05.1990"
          className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="residenceAddress"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          ADDRESS OF RESIDENCE:
        </label>
        <input
          id="residenceAddress"
          type="text"
          value={verificationData.residenceAddress}
          onChange={handleChange("residenceAddress")}
          placeholder="Kyiv city, Bohomoltsia str., 10, apt. 1"
          className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="passport"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          TRAVEL PASSPORT(s):
        </label>

        <input
          id="passport"
          type="text"
          value={verificationData.passport}
          onChange={handleChange("passport")}
          placeholder="FH777666 issued on 05.05.2023 valid till 05.05.2033"
          className="form-input w-full rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px]"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="criminalRecords"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          CRIMINAL RECORDS:
        </label>
        <textarea
          id="criminalRecords"
          value={verificationData.criminalRecords}
          onChange={handleChange("criminalRecords")}
          placeholder="OСК, АРМОР / unknown to our police records"
          className="form-input w-full resize-y rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px] min-h-28"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="additionalInfo"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          ADDITIONAL INFORMATION:
        </label>
        <textarea
          id="additionalInfo"
          value={verificationData.additionalInfo}
          onChange={handleChange("additionalInfo")}
          placeholder="Будь яка інша додаткова інформація"
          className="form-input w-full resize-y rounded-xl border border-[#d4dbe2] bg-gray-50 p-[12px] min-h-28"
        />
      </div>
      <div className="mb-5 flex gap-4 font-semibold text-gray-800">
        {/* ФОТО ЧЕК */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={verificationData.photo}
            onChange={handleChange("photo")}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-200"
          />
          <span className="text-base text-gray-800">PHOTO</span>
        </label>

        {/* КОРДОН ЧЕК */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={verificationData.border}
            onChange={handleChange("border")}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring focus:ring-blue-200"
          />
          <span className="text-base text-gray-800">BORDER RECORDS</span>
        </label>
      </div>
    </div>
  );
};

export default VerificationInput;

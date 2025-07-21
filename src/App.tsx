import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Header } from "./components/Header";
import { UploadSection } from "./components/UploadSection";
import { AIAnalysis } from "./components/AIAnalysis";
import { VerificationInput } from "./components/VerificationInput";
import { TemplateSelection } from "./components/TemplateSelection";
import { ResponseDisplay } from "./components/ResponseDisplay";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { Template } from "./store/requestProcessingSlice";
import { generateDocx } from "../src/utils/docxGenerator";

import {
  setUploadedFile,
  setSelectedTemplate,
  analyzeFile,
  generateResponse,
} from "./store/requestProcessingSlice";

const MainContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    uploadedFile,
    analysisData,
    verificationData,
    selectedTemplate,
    isAnalyzing,
    isGeneratingResponse,
    error,
  } = useAppSelector((state) => state.requestProcessing);

  const handleFileUpload = async (file: File) => {
    dispatch(setUploadedFile(file));
    dispatch(analyzeFile(file));
  };

  const handleTemplateSelect = (template: Template | null) => {
    dispatch(setSelectedTemplate(template));
  };

  // Auto-generate response when template is selected and verification data exists
  useEffect(() => {
    const hasDataToGenerate =
      selectedTemplate &&
      (Object.values(verificationData).some(
        (v) => typeof v === "string" && v.trim() !== ""
      ) ||
        verificationData.photo !== false ||
        verificationData.border !== false);

    if (hasDataToGenerate) {
      dispatch(
        generateResponse({
          template: selectedTemplate,
          verificationData: {
            ...verificationData,
            photo: Boolean(verificationData.photo),
            border: Boolean(verificationData.border),
          },
          fileName: uploadedFile?.name,
        })
      );
    }
  }, [selectedTemplate, verificationData, uploadedFile?.name, dispatch]);

  const handleDownloadResponse = async () => {
    if (!selectedTemplate) {
      alert("Please select a template before downloading.");
      return;
    }

    if (!analysisData) {
      alert("Analysis data is missing.");
      return;
    }

    const referenceText =
      (analysisData.date || "") === "Немає"
        ? analysisData.reference
        : `${analysisData.reference} dated ${analysisData.date}`;

    // Формуємо об'єкт даних для підстановки
    const attachment_count = (verificationData.photo ? 1 : 0) + (verificationData.border ? 2 : 0);

    const docxData = {
      sender: (analysisData.sender || "").toUpperCase(),
      reference_block: referenceText,
      name: verificationData.name || "",
      date_of_birth: verificationData.date_of_birth || "",
      residence_address: verificationData.residenceAddress || "",
      passport: verificationData.passport || "",
      criminal_records: verificationData.criminalRecords || "",
      additional_info: verificationData.additionalInfo || "",
      photo: verificationData.photo, 
      border: verificationData.border,
      attachment_count: attachment_count.toString(), 
    };

    await generateDocx({
      templateUrl: `/templates/${selectedTemplate.content}`,
      data: docxData,
      outputFileName: `Response_${new Date().toISOString().split("T")[0]}.docx`,
    });
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight">
                  Автоматична оборобка запитів
                </p>
                <p className="text-[#5c728a] text-sm font-normal leading-normal">
                  Завантажуйте запит, а решту ми зробимо самі.
                </p>
              </div>
            </div>

            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <UploadSection onFileUpload={handleFileUpload} />

            <AIAnalysis analysisData={analysisData} isLoading={isAnalyzing} />

            <VerificationInput />

            <TemplateSelection onTemplateSelect={handleTemplateSelect} />

            <ResponseDisplay
              onDownload={handleDownloadResponse}
              isGenerating={isGeneratingResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

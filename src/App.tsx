import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { AIAnalysis } from './components/AIAnalysis';
import { VerificationInput } from './components/VerificationInput';
import { TemplateSelection } from './components/TemplateSelection';
import { ResponseDisplay } from './components/ResponseDisplay';
import { useAppDispatch, useAppSelector } from './store/hooks';
import type { Template } from './store/requestProcessingSlice';
import {
  setUploadedFile,
  setVerificationData,
  setSelectedTemplate,
  analyzeFile,
  generateResponse,
} from './store/requestProcessingSlice';

const MainContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    uploadedFile,
    analysisData,
    verificationData,
    selectedTemplate,
    generatedResponse,
    isAnalyzing,
    isGeneratingResponse,
    error,
  } = useAppSelector((state) => state.requestProcessing);

  const handleFileUpload = async (file: File) => {
    dispatch(setUploadedFile(file));
    dispatch(analyzeFile(file));
  };

  const handleVerificationDataChange = (data: string) => {
    dispatch(setVerificationData(data));
  };

  const handleTemplateSelect = (template: Template | null) => {
    dispatch(setSelectedTemplate(template));
  };

  // Auto-generate response when template is selected and verification data exists
  useEffect(() => {
    if (selectedTemplate && verificationData.trim()) {
      dispatch(generateResponse({
        template: selectedTemplate,
        verificationData,
        fileName: uploadedFile?.name,
      }));
    }
  }, [selectedTemplate, verificationData, uploadedFile?.name, dispatch]);

  const handleDownloadResponse = () => {
    if (generatedResponse) {
      const blob = new Blob([generatedResponse], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `police_response_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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
                  International Request Processing
                </p>
                <p className="text-[#5c728a] text-sm font-normal leading-normal">
                  Upload, analyze, verify, and respond to international police requests efficiently.
                </p>
              </div>
            </div>

            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <UploadSection onFileUpload={handleFileUpload} />
            
            <AIAnalysis 
              analysisData={analysisData} 
              isLoading={isAnalyzing}
            />
            
            <VerificationInput 
              onDataChange={handleVerificationDataChange}
              initialValue={verificationData}
            />
            
            <TemplateSelection 
              onTemplateSelect={handleTemplateSelect}
            />
            
            <ResponseDisplay 
              response={generatedResponse}
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
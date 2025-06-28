import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parseFileToText } from "../utils/fileParser";

export interface Template {
  id: string;
  name: string;
  content: string;
}

interface RequestProcessingState {
  uploadedFile: File | null;
  analysisData: string;
  verificationData: string;
  selectedTemplate: Template | null;
  generatedResponse: string;
  isAnalyzing: boolean;
  isGeneratingResponse: boolean;
  error: string | null;
}

const initialState: RequestProcessingState = {
  uploadedFile: null,
  analysisData: "",
  verificationData: "",
  selectedTemplate: null,
  generatedResponse: "",
  isAnalyzing: false,
  isGeneratingResponse: false,
  error: null,
};

// 🟢 Парсинг файлу
export const analyzeFile = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>(
  "requestProcessing/analyzeFile",
  async (file, { rejectWithValue }) => {
    try {
      const text = await parseFileToText(file);
      return `Parsed text:\n\n${text.slice(0, 500)}...`;
    } catch (error) {
      console.error("Analyze error:", error);
      return rejectWithValue("Failed to analyze file");
    }
  }
);

// 🟢 Генерація відповіді
export const generateResponse = createAsyncThunk<
  string,
  { template: Template; verificationData: string; fileName?: string },
  { rejectValue: string }
>(
  "requestProcessing/generateResponse",
  async (params, { rejectWithValue }) => {
    try {
      const { template, verificationData, fileName } = params;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return `Response generated using ${template.name}:\n\n${template.content}\n\nVerification Data:\n${verificationData}\n\nDocument: ${fileName || "No file uploaded"}`;
    } catch (error) {
      console.error("Generate response error:", error);
      return rejectWithValue("Failed to generate response");
    }
  }
);

const requestProcessingSlice = createSlice({
  name: "requestProcessing",
  initialState,
  reducers: {
    setUploadedFile: (state, action: PayloadAction<File>) => {
      state.uploadedFile = action.payload;
      state.error = null;
    },
    setVerificationData: (state, action: PayloadAction<string>) => {
      state.verificationData = action.payload;
    },
    setSelectedTemplate: (state, action: PayloadAction<Template | null>) => {
      state.selectedTemplate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeFile.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(analyzeFile.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.analysisData = action.payload;
      })
      .addCase(analyzeFile.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.payload as string;
      })
      .addCase(generateResponse.pending, (state) => {
        state.isGeneratingResponse = true;
        state.error = null;
      })
      .addCase(generateResponse.fulfilled, (state, action) => {
        state.isGeneratingResponse = false;
        state.generatedResponse = action.payload;
      })
      .addCase(generateResponse.rejected, (state, action) => {
        state.isGeneratingResponse = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setUploadedFile,
  setVerificationData,
  setSelectedTemplate,
  clearError,
  resetState,
} = requestProcessingSlice.actions;

export default requestProcessingSlice.reducer;

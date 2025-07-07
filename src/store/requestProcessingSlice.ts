import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parseFileToText } from "../utils/fileParser";
import type { AnalysisResult } from "../components/AIAnalysis";

export interface Template {
  id: string;
  name: string;
  content: string;
}

interface RequestProcessingState {
  uploadedFile: File | null;
  analysisData: AnalysisResult | undefined;
  verificationData: {
    dateOfBirth: string;
    name: string;
    residenceAddress: string;
    passport: string;
    criminalRecords: string;
    additionalInfo: string;
  };
  selectedTemplate: Template | null;
  generatedResponse: string;
  isAnalyzing: boolean;
  isGeneratingResponse: boolean;
  error: string | null;
}


const initialState: RequestProcessingState = {
  uploadedFile: null,
  analysisData: undefined,
  verificationData: {
    dateOfBirth: '',
    name: '',
    residenceAddress: '',
    passport: '',
    criminalRecords: '',
    additionalInfo: '',
  },
  selectedTemplate: null,
  generatedResponse: '',
  isAnalyzing: false,
  isGeneratingResponse: false,
  error: null,
};




// 🟢 Парсинг файлу
export const analyzeFile = createAsyncThunk<
  AnalysisResult,
  File,
  { rejectValue: string }
>(
  "requestProcessing/analyzeFile",
  async (file, { rejectWithValue }) => {
    try {
      const text = await parseFileToText(file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.summary) {
        throw new Error("Не вдалося створити переказ");
      }
      return data.summary as AnalysisResult;
    } catch (error) {
      console.error("Analyze error:", error);
      return rejectWithValue("Не вдалося проаналізувати файл");
    }
  }
);


// 🟢 Генерація відповіді
export const generateResponse = createAsyncThunk<
  string,
  {
    template: Template;
    verificationData: {
      dateOfBirth: string;
      name: string;
      residenceAddress: string;
      passport: string;
      criminalRecords: string;
      additionalInfo: string;
    };
     fileName?: string;
  },
  { rejectValue: string }
>(
  "requestProcessing/generateResponse",
  async (params, { rejectWithValue }) => {
    try {
      const { template, verificationData } = params;

      // 👇 ТУТ робимо POST-запит
      const response = await fetch("/api/generateResponse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: template.content,
          verificationData: {
            name: verificationData.name,
            date_of_birth: verificationData.dateOfBirth,
            residence_address: verificationData.residenceAddress,
            passport: verificationData.passport,
            criminal_records: verificationData.criminalRecords,
            additional_info: verificationData.additionalInfo
          }
        })
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();

      // логувати для дебагу
      console.log("Generated response JSON:", data);

      // Повертаємо як string
      return JSON.stringify(data.response, null, 2);

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
    setVerificationField: (
      state,
      action: PayloadAction<{ field: keyof RequestProcessingState['verificationData']; value: string }>
    ) => {
      state.verificationData[action.payload.field] = action.payload.value;
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
  setVerificationField,
  setSelectedTemplate,
  clearError,
  resetState,
} = requestProcessingSlice.actions;


export default requestProcessingSlice.reducer;

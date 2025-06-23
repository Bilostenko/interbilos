import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
  analysisData: '',
  verificationData: '',
  selectedTemplate: null,
  generatedResponse: '',
  isAnalyzing: false,
  isGeneratingResponse: false,
  error: null,
};

// Async thunk for file analysis
export const analyzeFile = createAsyncThunk(
  'requestProcessing/analyzeFile',
  async (file: File, { rejectWithValue }) => {
    try {
      // Simulate API call for file analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return `Document analysis complete for "${file.name}":\n\n• Document type: ${file.type}\n• File size: ${(file.size / 1024).toFixed(2)} KB\n• Analysis status: Ready for verification`;
    } catch (error) {
      return rejectWithValue('Failed to analyze file');
    }
  }
);

// Async thunk for response generation
export const generateResponse = createAsyncThunk(
  'requestProcessing/generateResponse',
  async (params: { template: Template; verificationData: string; fileName?: string }, { rejectWithValue }) => {
    try {
      // Simulate API call for response generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { template, verificationData, fileName } = params;
      return `Response generated using ${template.name}:\n\n${template.content}\n\nVerification Data:\n${verificationData}\n\nDocument: ${fileName || 'No file uploaded'}`;
    } catch (error) {
      return rejectWithValue('Failed to generate response');
    }
  }
);

const requestProcessingSlice = createSlice({
  name: 'requestProcessing',
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
      // File analysis cases
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
      // Response generation cases
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
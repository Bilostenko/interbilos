import { configureStore } from '@reduxjs/toolkit';
import requestProcessingReducer from './requestProcessingSlice';

export const store = configureStore({
  reducer: {
    requestProcessing: requestProcessingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore file objects in actions
        ignoredActions: ['requestProcessing/setUploadedFile'],
        ignoredPaths: ['requestProcessing.uploadedFile'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
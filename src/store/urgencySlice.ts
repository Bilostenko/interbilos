import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  urgency: "routine" as "routine" | "urgent" | "flash",
};

const urgencySlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setUrgency(state, action: PayloadAction<"routine" | "urgent" | "flash">) {
      state.urgency = action.payload;
    },
  },
});

export const { setUrgency } = urgencySlice.actions;
export default urgencySlice.reducer;

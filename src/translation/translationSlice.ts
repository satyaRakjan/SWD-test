import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  value: string;
}

const initialState: LanguageState = {
  value: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    language: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { language } = languageSlice.actions;

export default languageSlice.reducer;

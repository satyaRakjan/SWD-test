import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface headerState {
  value: string;
}

const initialState: headerState = {
  value: "home",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    headerText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { headerText } = headerSlice.actions;

export default headerSlice.reducer;

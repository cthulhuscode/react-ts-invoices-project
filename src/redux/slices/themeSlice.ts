import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type ThemeModes = "light" | "dark";

// Define a type for the slice state
interface ThemeState {
  value: ThemeModes;
}

// Define the initial state using that type
const initialState: ThemeState = {
  value: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeModes>) => {
      state.value = action.payload;
    },
    toggleTheme: (state) => {
      state.value === "light"
        ? (state.value = "dark")
        : (state.value = "light");
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;

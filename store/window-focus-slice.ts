import { StateCreator } from "zustand";

export interface WindowFocusSlice {
  isFocused: boolean;
  setFocused: (isFocused: boolean) => void;
}

const createWindowFocusSlice: StateCreator<
  WindowFocusSlice,
  [],
  [],
  WindowFocusSlice
> = (set) => ({
  isFocused: false,
  setFocused: (isFocused) => set(() => ({ isFocused })),
});

export default createWindowFocusSlice;

import { create } from "zustand";
import createWindowFocusSlice, { WindowFocusSlice } from "./window-focus-slice";

const useStore = create<WindowFocusSlice>()((...a) => ({
  ...createWindowFocusSlice(...a),
}));

export default useStore;

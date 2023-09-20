import { create } from "zustand";
import createWindowFocusSlice, { WindowFocusSlice } from "./window-focus-slice";
import createRecommendUserCurrentIndexSlice, {
  RecommendUserCurrentIndexSlice,
} from "./recommend-user-current-index";

const useStore = create<WindowFocusSlice & RecommendUserCurrentIndexSlice>()(
  (...a) => ({
    ...createWindowFocusSlice(...a),
    ...createRecommendUserCurrentIndexSlice(...a),
  }),
);

export default useStore;

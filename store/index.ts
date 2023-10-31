import { create } from "zustand";
import createWindowFocusSlice, { WindowFocusSlice } from "./window-focus-slice";
import createRecommendUserCurrentIndexSlice, {
  RecommendUserCurrentIndexSlice,
} from "./recommend-user-current-index";
import createMapSlice, { MapSlice } from "./map-slice";

const useStore = create<
  WindowFocusSlice & RecommendUserCurrentIndexSlice & MapSlice
>()((...a) => ({
  ...createWindowFocusSlice(...a),
  ...createRecommendUserCurrentIndexSlice(...a),
  ...createMapSlice(...a),
}));

export default useStore;

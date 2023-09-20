import { StateCreator } from "zustand";

export interface RecommendUserCurrentIndexSlice {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const createRecommendUserCurrentIndexSlice: StateCreator<
  RecommendUserCurrentIndexSlice,
  [],
  [],
  RecommendUserCurrentIndexSlice
> = (set) => ({
  currentIndex: 0,
  setCurrentIndex: (currentIndex) => set(() => ({ currentIndex })),
});

export default createRecommendUserCurrentIndexSlice;

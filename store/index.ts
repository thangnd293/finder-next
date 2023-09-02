import { create } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
// import { produce } from 'immer'

interface BearState {
  count: number;
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  increaseCount: () => void;
}

export const useBearStore = createWithEqualityFn<BearState>(
  (set) => ({
    count: 0,
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
  }),
  Object.is,
);

export const useLushStore = create((set) => ({
  lush: { forest: { contains: { a: "bear" } } },
  clearForest: () => set((state: any) => (state.lush.forest.contains = null)),
}));

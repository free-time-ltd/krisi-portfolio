import { create } from "zustand";

interface StorePayload {
  lastUpdate: Date;
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

const getDefaultState = () => ({
  lastUpdate: Date.now(),
  count: 0,
});

const usePortfolioStore = create<StorePayload>((set) => ({
  ...getDefaultState(),
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));

export default usePortfolioStore;

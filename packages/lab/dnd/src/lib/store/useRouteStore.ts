import { create } from 'zustand';

interface RouteStoreState {
  currentRoute: string | null;
  updateRoute: (newRoute: string) => void;
}

export const useRouteStore = create<RouteStoreState>((set) => ({
  currentRoute: null,
  updateRoute: (newRoute) => set({ currentRoute: newRoute }),
}));

export default useRouteStore;

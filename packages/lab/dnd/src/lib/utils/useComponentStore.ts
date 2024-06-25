import { create } from 'zustand';

export type Coordinates = {
  x: number;
  y: number;
};

interface ComponentStore {
  components: { [elementId: string]: Coordinates };
  setComponents: (newComponents: { [elementId: string]: Coordinates }) => void;
  updateComponent: (elementId: string, updates: Partial<Coordinates>) => void;
}

const useComponentStore = create<ComponentStore>((set) => ({
  components: {},
  setComponents: (newComponents) => set({ components: newComponents }),
  updateComponent: (elementId, updates) =>
    set((state) => ({
      components: {
        ...state.components,
        [elementId]: { ...state.components[elementId], ...updates },
      },
    })),
}));

export default useComponentStore;
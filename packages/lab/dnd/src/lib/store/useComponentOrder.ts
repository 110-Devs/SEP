import { create } from 'zustand';

/**
 * Type definition for the component order.
 */
type ComponentOrder = {
  /**
   * The current order of the components.
   */
  order: [number, number];
  /**
   * Sets the order of the components.
   *
   * @param {[number, number]} order - The new order of the components.
   * @return {void}
   */
  setOrder: (order: [number, number]) => void;
};

/**
 * A Zustand store for managing the order of components.
 */
export const useComponentOrder = create<ComponentOrder>(
  /**
   * Initializes the Zustand store with the initial state.
   *
   * @param {SetState<ComponentOrder>} set - The set function from the Zustand store.
   * @returns {ComponentOrder} The initial state of the store.
   */
  (set) => ({
    /**
     * The current order of the components.
     *
     * @type {[number, number]}
     */
    order: [0, 1],
    /**
     * Sets the order of the components.
     *
     * @param {[number, number]} order - The new order of the components.
     * @returns {void}
     */
    setOrder: (order: [number, number]): void => set({ order }),
  })
);

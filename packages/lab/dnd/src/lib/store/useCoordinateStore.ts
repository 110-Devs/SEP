import { create } from 'zustand';
import { Coordinates } from '@dnd-kit/utilities';

/**
 * An object that stores coordinates, keyed by a unique identifier.
 */
type CoordinateStore = {
  /**
   * The coordinates, keyed by a unique identifier.
   *
   * @property {Object.<string, Coordinates>} coordinates - The stored coordinates.
   */
  coordinates: { [id: string]: Coordinates };
  /**
   * Adds coordinates to the store.
   *
   * @param {string} id - The unique identifier for the coordinates.
   * @param {Coordinates} coordinates - The coordinates to add.
   * @return {void}
   */
  addCoordinates: (id: string, coordinates: Coordinates) => void;
  /**
   * Removes all stored coordinates.
   *
   * @return {void}
   */
  resetCoordinates: () => void;
};

/**
 * Creates a store for managing coordinates.
 *
 * @returns {() => CoordinateStore} A function that returns the coordinate store.
 */
export const useCoordinateStore = create<CoordinateStore>(
  /**
   * Initializes the coordinate store.
   *
   * @param {SetState<CoordinateStore>} set - The setter function for the coordinate store.
   * @return {CoordinateStore} The initial state of the coordinate store.
   */
  (set) => ({
    /**
     * The coordinates, keyed by a unique identifier.
     */
    coordinates: {},
    /**
     * Adds coordinates to the store.
     *
     * @param {string} id - The unique identifier for the coordinates.
     * @param {Coordinates} coordinates - The coordinates to add.
     * @return {void}
     */
    addCoordinates: (id: string, coordinates: Coordinates) =>
      set(
        (state) => (
          {
            ...state,
            coordinates: {
              ...state.coordinates,
              [id]: coordinates,
            },
          }
        )
      ),

    /**
     * Resets the coordinates in the store to an empty object.
     *
     * @return {void}
     */
    resetCoordinates: () => {
      set({ coordinates: {} });
    },
  })
);

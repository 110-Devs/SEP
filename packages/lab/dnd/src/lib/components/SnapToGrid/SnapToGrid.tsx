import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  defaultCoordinates,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import type { Coordinates } from '@dnd-kit/utilities';
import { usePageData } from '@frontend/hooks/use-page-data';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useCoordinateStore, useRouteStore } from '../../store';
import { Draggable } from '../Draggable';
import { Grid } from '../Grid';
import { Wrapper } from '../Wrapper';

type Props = {
  activationConstraint?: PointerActivationConstraint;
  children: React.ReactNode;
};

/**
 * Renders a component that allows dragging and dropping of child elements within a grid.
 *
 * @param {Props} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be dragged and dropped.
 * @param {PointerActivationConstraint} [props.activationConstraint] - The activation constraint for the drag and drop interaction.
 * @return {React.ReactElement} The rendered component.
 */
export const SnapToGrid = ({ children, activationConstraint }: Props) => {
  const coordinates = useCoordinateStore((state) => state.coordinates);
  const addCoordinates = useCoordinateStore((state) => state.addCoordinates);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [isOn, setIsOn] = useState(() => {
    const savedState = localStorage.getItem('toggleState');
    return savedState === 'true';
  });

  const route = useRouteStore((state) => state.currentRoute);

  useEffect(() => {
    /**
     * Handles the storage change event by updating the state based on the retrieved toggle state.
     *
     * @return {void}
     */
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('toggleState');
      setIsOn(savedState === 'true');
    };

    /**
     * Adds an event listener for the 'storage' event and removes it when the component unmounts.
     *
     * @return {void}
     */
    window.addEventListener('storage', handleStorageChange);

    /**
     * Cleans up the event listener when the component unmounts.
     *
     * @return {void}
     */
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // if (!isOn) {
  //   return <>{children}</>;
  // }

  /**
   * Extracts the ID of a React element from its children.
   *
   * @param {React.ReactNode} child - The child element to extract the ID from.
   * @return {string|null} The ID of the element, or null if it cannot be found.
   */
  const extractElementId = (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      if (child.props && child.props.title) {
        return child.props.title;
      }

      if (child.key) {
        return child.key;
      }
    }

    return null;
  };

  useEffect(() => {
    /**
     * Fetches drag-and-drop modifications from the server and updates the coordinates of each child element.
     *
     * @return {Promise<void>} A promise that resolves when the modifications have been fetched and updated.
     */
    const fetchModifications = async () => {
      let response;
      const collection = '__drag-and-drop';
      const pageRoute = route;

      try {
        response = await axios.get(
          `http://localhost:3000/api/get-dnd-modifications?collection=${collection}&route=${pageRoute}`
        );
      } catch (error) {
        console.error(error);
      }

      const modifications = response?.data;

      React.Children.forEach(children, (child, index) => {
        const elementId = extractElementId(child);
        let coordinates: Coordinates;

        if (modifications !== undefined && modifications[elementId]) {
          const { x, y } = modifications[elementId].data;
          coordinates = { x, y };
        } else {
          coordinates = defaultCoordinates;
        }

        addCoordinates(elementId, coordinates);
      });
    };

    fetchModifications();
  }, [route, children]);

  const handleDragEnd = (id: string, delta: Coordinates) => {
    addCoordinates(id, {
      x: coordinates[id]?.x + delta.x,
      y: coordinates[id]?.y + delta.y,
    });

    axios.post('http://localhost:3000/api/save', {
      collection: '__drag-and-drop',
      route: route,
      modifications: {
        elementId: id,
        x: coordinates[id].x,
        y: coordinates[id].y,
      },
    });
  };

  const [gridSize, setGridSize] = useState(() => {
    const sliderValue = localStorage.getItem('sliderValue');
    return sliderValue ? parseInt(sliderValue, 10) : 40;
  });

  useEffect(() => {
    const handleSizeChange = () => {
      const savedSize = localStorage.getItem('sliderValue');
      setGridSize(savedSize ? parseInt(savedSize, 10) : 40);
    };

    window.addEventListener('storage', handleSizeChange);
    return () => {
      window.removeEventListener('storage', handleSizeChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Alt') {
        setIsAltPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Alt') {
        setIsAltPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

  const modifiers = [
    ...(!isAltPressed ? [snapToGrid] : []),
    restrictToHorizontalAxis,
    restrictToParentElement,
  ];

  useEffect(() => {
    if (!isDragging) {
      setShowGrid(false);
    }
  }, [isDragging]);

  const handleDS = () => {
    setIsDragging(true);
    setShowGrid(true);
  };

  const handleDE = () => {
    setIsDragging(false);
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      onDragEnd={({ delta, active }) => {
        handleDragEnd(String(active.id), delta);
      }}
      sensors={sensors}
      modifiers={modifiers}
    >
      <Wrapper>
        {showGrid && <Grid size={gridSize} onSizeChange={setGridSize} />}
        {React.Children.map(children, (child, index) => {
          const elementId = extractElementId(child);
          const coordinate = coordinates[elementId] || { x: 0, y: 0 };
          return (
            <Draggable
              key={index}
              id={elementId}
              onDragStart={handleDS}
              onDragEnd={handleDE}
              styles={{ alignItems: 'flex-start' }}
              top={coordinate.y}
              left={coordinate.x}
              isToggleOn={isOn}
            >
              {child}
            </Draggable>
          );
        })}
      </Wrapper>
    </DndContext>
  );
};

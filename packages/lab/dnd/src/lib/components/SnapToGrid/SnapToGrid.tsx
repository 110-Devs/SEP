import React, { useEffect, useMemo, useState } from 'react';
import { Grid } from '../Grid';
import {
  createSnapModifier,
  restrictToHorizontalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { DraggableContext } from '../DraggableContext';
import { Wrapper } from '../Wrapper';
import { Draggable } from '../Draggable';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  defaultCoordinates,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Coordinates } from '@dnd-kit/utilities';
import { Sortable } from '../Sortable';

type Props = {
  activationConstraint?: PointerActivationConstraint;
  children: React.ReactNode;
};

// export const SnapToGrid = ({ children, activationConstraint }: Props) => {
//   const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
//   const [gridSize, setGridSize] = React.useState(30);
//   const [isDragging, setIsDragging] = useState(false);
//   const [showGrid, setShowGrid] = useState(false);
//   const [isAltPressed, setIsAltPressed] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Alt') {
//         setIsAltPressed(true);
//       }
//     };

//     const handleKeyUp = (event: KeyboardEvent) => {
//       if (event.key === 'Alt') {
//         setIsAltPressed(false);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     // Cleanup event listeners on component unmount
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   useEffect(() => {
//     console.log(`coordinates: ${x}, ${y}`);
//   } , [x, y]);

//   const handleDragStart = () => {
//     setIsDragging(true);
//     setShowGrid(true);
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//   };

//   const buttonStyle = {
//     marginLeft: gridSize - 20 + 1,
//     marginTop: gridSize - 20 + 1,
//     width: gridSize * 8 - 1,
//     height: gridSize * 2 - 1,
//   };

//   const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

//   const modifiers = [
//     ...(!isAltPressed ? [snapToGrid] : []),
//     restrictToHorizontalAxis,
//     restrictToParentElement,
//   ];

//   useEffect(() => {
//     if (!isDragging) {
//       setShowGrid(false);
//     }
//   }, [isDragging]);

//   const mouseSensor = useSensor(MouseSensor, {
//     activationConstraint,
//   });
//   const touchSensor = useSensor(TouchSensor, {
//     activationConstraint,
//   });
//   const keyboardSensor = useSensor(KeyboardSensor);
//   const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

//   return (
//     <DndContext
//       sensors={sensors}
//       onDragEnd={({ delta }) => {
//         setCoordinates(({ x, y }) => {
//           return {
//             x: x + delta.x,
//             y: y + delta.y,
//           };
//         });
//       }}
//       modifiers={modifiers}
//     >
//       <Wrapper>
//         {showGrid && <Grid size={gridSize} onSizeChange={setGridSize} />}
//         {React.Children.map(children, (child, index) => (
//           <Draggable
//             key={index}
//             id={`draggable-${index}`}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//             styles={{ alignItems: 'flex-start' }}
//             top={y}
//             left={x}
//           >
//             {child}
//           </Draggable>
//         ))}
//       </Wrapper>
//     </DndContext>
//   );
// };

// Testing!

export const SnapToGrid = ({ children, activationConstraint }: Props) => {
  const [components, setComponents] = useState(
    React.Children.map(children, () => defaultCoordinates)
  );
  const [gridSize, setGridSize] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);

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

  const handleDragEnd = (index: number, delta: Coordinates) => {
    setComponents((components) =>
      components?.map((component, i) =>
        i === index
          ? { x: component.x + delta.x, y: component.y + delta.y }
          : component
      )
    );
  };

  const handleDS = () => {
    setIsDragging(true);
    setShowGrid(true);
  };

  const handleDE = () => {
    setIsDragging(false);
  };

  const buttonStyle = {
    marginLeft: gridSize - 20 + 1,
    marginTop: gridSize - 20 + 1,
    width: gridSize * 8 - 1,
    height: gridSize * 2 - 1,
  };

  return (
    <DndContext
      onDragEnd={({ delta, active }) => {
        const index = parseInt(String(active.id).split('-')[1], 10);
        handleDragEnd(index, delta);
      }}
      modifiers={modifiers}
    >
      <Wrapper>
        {showGrid && <Grid size={gridSize} onSizeChange={setGridSize} />}
        {React.Children.map(children, (child, index) => (
          <Draggable
            key={index}
            id={`draggable-${index}`}
            onDragStart={handleDS}
            onDragEnd={handleDE}
            styles={{ alignItems: 'flex-start' }}
            top={components ? components[index].y : 0}
            left={components ? components[index].x : 0}
            buttonStyle={buttonStyle}
            gridSize={gridSize}
          >
            {child}
          </Draggable>
        ))}
      </Wrapper>
    </DndContext>
  );
};

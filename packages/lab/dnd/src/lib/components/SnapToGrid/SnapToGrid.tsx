import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { PersistentManager } from '../../../../../version-control/src/lib/PersistentManager';
import axios from 'axios';
import {usePageData} from "@frontend/hooks/use-page-data";
import useComponentStore from '../../utils/useComponentStore';

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
  // const [gridSize, setGridSize] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [pageData,] = usePageData();
  const pageRoute = Object.keys(pageData)[0];

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

  // Initialisieren des State mit den extrahierten Werten aus den Kindern
  const [elementIds, setElementIds] = useState(() => {
    return React.Children.map(children, extractElementId);
  });

  useEffect(() => {
    setElementIds(React.Children.map(children, extractElementId));
  }, [children]);

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

  const handleDragEnd = (index: number, delta: Coordinates) => {
    setComponents((components) =>
      components?.map((component, i) =>
        i === index
          ? { x: component.x + delta.x, y: component.y + delta.y }
          : component
      )
    );

    axios.post('http://localhost:3000/api/save', {
      route: pageRoute,
      modifications: {
        elementId: elementIds?.[index],
        x: (components?.[index]?.x ?? 0) + delta.x,
        y: (components?.[index]?.y ?? 0) + delta.y,
      }
    })
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

  useEffect(() => {
    if (elementIds?.length === 0) return;

    const fetchModifications = async () => {
      let response;
      const collection = "__drag-and-drop";
      const route = pageRoute;

      try {
        response = await axios.get(`http://localhost:3000/api/get-modification?collection=${collection}&route=${route}`);
        console.log(`response: ${response.data}`);
      } catch (error) {
        console.error(error);
      }

      const modifications = response?.data;
      setComponents((prevComponents) =>
        prevComponents?.map((component, index) => {
          const elementId = elementIds?.[index];
          if (modifications[elementId]) {
            const { x, y } = modifications[elementId].data;
            return { ...component, x, y };
          }
          return component;
        })
      );
    };
  
    fetchModifications();
  }, [elementIds, pageRoute]);

  const [isOn, setIsOn] = useState(() => {
    const savedState = localStorage.getItem('toggleState');
    return savedState === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('toggleState');
      setIsOn(savedState === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isOn) {
    return <>{children}</>;
  }

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

// export const SnapToGrid = ({ children, activationConstraint }: Props) => {
//   const positions = PositionSubscriber.useState(); // Verwende den Zustand aus dem Subscriber
//   const [gridSize, setGridSize] = useState(40);
//   const [isDragging, setIsDragging] = useState(false);
//   const [showGrid, setShowGrid] = useState(false);
//   const [elementIds] = useState(() =>
//     React.Children.map(children, (_, index) => `element-${index}`)
//   );
//   const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

//   const modifiers = [
//     snapToGrid,
//     restrictToHorizontalAxis,
//     restrictToParentElement,
//   ];

//   useEffect(() => {
//     if (!isDragging) {
//       setShowGrid(false);
//     }
//   }, [isDragging]);

//   const handleDragEnd = async (index: number, delta: Coordinates) => {
//     const elementId = elementIds?.[index] ?? '';
//     const currentPos = positions[elementId] || defaultCoordinates;
//     const updatedPosition = {
//       x: currentPos.x + delta.x,
//       y: currentPos.y + delta.y,
//     };
    
//     PositionSubscriber.mutate({
//       [elementId]: updatedPosition,
//     });

//     // await PersistentManager.addModification('/path2', {
//     //   "elementId": "elementIasdd",
//     //   "x": 14,
//     //   "y": 0
//     // });

//     // PersistentManager.addModification('/path2', {
//     //   elementId: elementId,
//     //   x: updatedPosition.x,
//     //   y: updatedPosition.y
//     // });
//   };

//   const handleDS = () => {
//     setIsDragging(true);
//     setShowGrid(true);
//   };

//   const handleDE = () => {
//     setIsDragging(false);
//   };

//   const buttonStyle = {
//     marginLeft: gridSize - 20 + 1,
//     marginTop: gridSize - 20 + 1,
//     width: gridSize * 8 - 1,
//     height: gridSize * 2 - 1,
//   };

//   return (
//     <DndContext
//       onDragEnd={({ delta, active }) => {
//         const index = parseInt(String(active.id).split('-')[1], 10);
//         handleDragEnd(index, delta);
//       }}
//       modifiers={modifiers}
//     >
//       <Wrapper>
//         {showGrid && <Grid size={gridSize} onSizeChange={setGridSize} />}
//         {React.Children.map(children, (child, index) => {
//           const position = positions[`element-${index}`] || defaultCoordinates;
//           return (
//             <Draggable
//               key={index}
//               id={`draggable-${index}`}
//               onDragStart={handleDS}
//               onDragEnd={handleDE}
//               styles={{ alignItems: 'flex-start' }}
//               top={position.y}
//               left={position.x}
//               buttonStyle={buttonStyle}
//               gridSize={gridSize}
//             >
//               {child}
//             </Draggable>
//           );
//         })}
//       </Wrapper>
//     </DndContext>
//   );
// };
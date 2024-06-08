import {
  DndContext,
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  defaultCoordinates,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Coordinates } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Wrapper } from '../Wrapper';
import { Draggable } from '../Draggable';
import { Grid } from '../Grid';

interface Props {
  activationConstraint?: PointerActivationConstraint;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  children: React.ReactNode;
}

export function DraggableContext({
  activationConstraint,
  handle,
  modifiers,
  buttonStyle,
  children,
}: Props) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: 'draggable',
    });
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
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
      modifiers={modifiers}
    >
      {/* <Draggable
        ref={setNodeRef}
        dragging={isDragging}
        handle={handle}
        listeners={listeners}
        buttonStyle={buttonStyle}
        transform={transform}
        {...attributes}
      >
        {children}
      </Draggable> */}
    </DndContext>
  );
}

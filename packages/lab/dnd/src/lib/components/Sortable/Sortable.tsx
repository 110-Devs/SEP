import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import styles from './SortableItem.module.css';

const DraggableButton = styled(IconButton)({
  padding: 0,
  margin: 0,
  minWidth: 'auto !important',
  width: 'auto',
  height: 'auto',
});

type SortableItemProps = {
  id: UniqueIdentifier;
  content: React.ReactNode;
};

const SortableItem: React.FC<SortableItemProps> = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem}>
      <div className={styles.draggableButtonWrapper}>
        <DraggableButton
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
        >
          <DragIndicatorIcon />
        </DraggableButton>
      </div>
      {content}
    </div>
  );
};

type SortableProps = {
  children: React.ReactNode[];
  route: string;
};

export const Sortable: React.FC<SortableProps> = ({ children, route }) => {

  const [childrens, setChildrens] = useState(
    children.map((child) => ({
      id: uuidv4(),
      content: child,
    }))
  );

  const getChildPos = (id: UniqueIdentifier) =>
    childrens.findIndex((child) => child.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setChildrens((prevChildrens) => {
      const originalPos = getChildPos(active.id);
      const newPos = getChildPos(over.id);

      return arrayMove(prevChildrens, originalPos, newPos);
    });
  };

  useEffect(() => {
    console.log(childrens);
  }, [childrens]);

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

  if (route === '/dashboard' || !isOn) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  console.log(route);
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <SortableContext items={childrens} strategy={verticalListSortingStrategy}>
        <Wrapper>
          {childrens.map(({ id, content }) => (
            <SortableItem key={id} id={id} content={content} />
          ))}
        </Wrapper>
      </SortableContext>
    </DndContext>
  );
};

interface Props {
  children: React.ReactNode;
}

function Wrapper({ children }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  );
}

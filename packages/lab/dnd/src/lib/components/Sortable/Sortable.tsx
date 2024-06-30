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
import axios from 'axios';
import { useComponentOrder } from '../../store';
import { useRouteStore } from '@cody-engine/lab/dnd';

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

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem}>
      {isOn && (
        <div className={styles.draggableButtonWrapper}>
          <DraggableButton
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
          >
            <DragIndicatorIcon />
          </DraggableButton>
        </div>
      )}
      {content}
    </div>
  );
};

type SortableProps = {
  children: React.ReactNode[];
};

type Child = {
  id: string;
  content: React.ReactNode;
};

export const Sortable: React.FC<SortableProps> = ({ children }) => {
  const order = useComponentOrder((state) => state.order);
  const setOrder = useComponentOrder((state) => state.setOrder);
  const [childrens, setChildrens] = useState<Child[]>([]);
  const route = useRouteStore((state) => state.currentRoute);

  useEffect(() => {
    const fetchModifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/get-sorting-modifications?collection=__sorting&route=${route}`);
        const modifications = response?.data;

        if (modifications && modifications.data && modifications.data.components) {
          setOrder(modifications.data.components);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModifications();
  }, [route]);

  useEffect(() => {
    setChildrens(
      order.map((order) => ({
        id: uuidv4(),
        content: children[order],
      }))
    );
  }, [order]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (!over || active.id === over.id) return;
  
    const originalPos = childrens.findIndex(child => child.id === active.id);
    const newPos = childrens.findIndex(child => child.id === over.id);
    const newOrder = arrayMove(order, originalPos, newPos);
    setOrder(newOrder as [number, number]);

    axios.post('http://localhost:3000/api/save', {
      collection: '__sorting',
      route: route,
      modifications: {
        components: newOrder,
      }
    });
  };

  if (route === '/dashboard') {
    return <React.Fragment>{children}</React.Fragment>;
  }
  
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

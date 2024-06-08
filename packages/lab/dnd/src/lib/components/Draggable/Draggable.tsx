import React, { useEffect, useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styless from './Draggable.module.css';
import IconButton from '@mui/material/IconButton';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { styled } from '@mui/system';

const DraggableButton = styled(IconButton)({
  padding: 0,
  margin: 0,
  // Override the default minWidth with higher specificity
  minWidth: 'auto !important',
  width: 'auto',
  height: 'auto',
});

type Props = {
  children: React.ReactNode;
  buttonStyle?: React.CSSProperties;
  onDragStart: () => void;
  onDragEnd: () => void;
  styles: React.CSSProperties;
  id: string;
  left: number;
  top: number;
  gridSize: number;
};

export function Draggable({
  children,
  buttonStyle,
  onDragStart,
  onDragEnd,
  styles,
  id,
  left,
  top,
  gridSize,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
    isDragging,
  } = useDraggable({
    id: id,
  });

  useEffect(() => {
    if (isDragging) {
      onDragStart();
    } else {
      onDragEnd();
    }
  }, [isDragging]);

  const draggableButtonRef = useRef<HTMLDivElement>(null);
  const childrenWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (childrenWrapperRef.current) {
      const rect = childrenWrapperRef.current.getBoundingClientRect();
      const width = rect.width;
      console.log('Draggable button width:', width);
      console.log(`${width / gridSize}px`);
    }
  }, [childrenWrapperRef.current?.offsetWidth]);

  const getDraggableButtonWidth = () => {
    if (draggableButtonRef.current) {
      return draggableButtonRef.current.offsetWidth;
    }
    return 0;
  };

  const style = {
    display: 'flex',
    flexDirection: left < getDraggableButtonWidth() ? 'row-reverse' : 'row',
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={
        {
          '--translate-x': `${transform?.x ?? 0}px`,
          '--translate-y': `${transform?.y ?? 0}px`,
          top: top,
          left: left,
          position: 'relative',
          ...styles,
        } as React.CSSProperties
      }
      {...attributes}
      className={styless.container}
    >
      <div
        ref={draggableButtonRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform:
            'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scale(var(--scale, 1))',
          ...style,
        }}
      >
        <div className={`${styless.draggableButton}`}>
          <DraggableButton ref={setActivatorNodeRef} {...listeners}>
            <DragIndicatorIcon />
          </DraggableButton>
        </div>
        <div ref={childrenWrapperRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

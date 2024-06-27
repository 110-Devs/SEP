import { useDraggable } from '@dnd-kit/core';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import styless from './Draggable.module.css';

const DraggableButton = styled(IconButton)({
  padding: 0,
  margin: 0,
  minWidth: 'auto !important',
  width: 'auto',
  height: 'auto',
});

type Props = {
  children: React.ReactNode;
  onDragStart: () => void;
  onDragEnd: () => void;
  styles: React.CSSProperties;
  id: string;
  left: number;
  top: number;
};

/**
 * Component that allows its children to be dragged and dropped using D&D Kit.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children to be wrapped.
 * @param {Function} props.onDragStart - The function to be called when drag starts.
 * @param {Function} props.onDragEnd - The function to be called when drag ends.
 * @param {React.CSSProperties} props.styles - The styles to be applied to the component.
 * @param {string} props.id - The id of the draggable component.
 * @param {number} props.left - The left position of the component.
 * @param {number} props.top - The top position of the component.
 * @return {JSX.Element} The Draggable component.
 */
export function Draggable({
  children,
  onDragStart,
  onDragEnd,
  styles,
  id,
  left,
  top,
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

  /**
   * Get the width of the draggable button.
   *
   * @return {number} The width of the draggable button, or 0 if not available.
   */
  const getDraggableButtonWidth = () => {
    if (draggableButtonRef.current) {
      return draggableButtonRef.current.offsetWidth;
    }

    return 0;
  };

  const style = {
    display: 'flex',
    // If the left position is less than the draggable button width, set the flex direction to row-reverse.
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
        <div ref={childrenWrapperRef}>{children}</div>
      </div>
    </div>
  );
}

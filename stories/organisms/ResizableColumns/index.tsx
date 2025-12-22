import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * ResizableColumns - A component that wraps its children in resizable columns.
 * It distributes children automatically into columns, and allows resizing each column horizontally.
 * 
 * @param {ReactNode[]} children - The child elements to be wrapped into columns.
 * @param {number} [minColumnWidth=50] - Minimum width for each column.
 * @param {number} [maxColumnWidth=500] - Maximum width for each column.
 * @param {number[]} [initialWidths] - Initial widths for each column.
 * @param {Function} [onResizeEnd] - Callback to be called after resizing columns.
 * @param {string} [className] - Additional className for custom styling.
 * @param {CSSProperties} [style] - Custom styles for the container.
 */
const ResizableColumns: React.FC<{
  children: React.ReactNode[];
  minColumnWidth?: number;
  maxColumnWidth?: number;
  initialWidths?: number[];
  onResizeEnd?: (widths: number[]) => void;
  className?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  minColumnWidth = 50,
  maxColumnWidth = 500,
  initialWidths = [],
  onResizeEnd,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnWidths, setColumnWidths] = useState<number[]>(initialWidths.length ? initialWidths : new Array(children.length).fill(200));

  const onMouseDown = (index: number, event: React.MouseEvent) => {
    const startX = event.clientX;
    const startWidth = columnWidths[index];
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(minColumnWidth, Math.min(maxColumnWidth, startWidth + deltaX));
      const newColumnWidths = [...columnWidths];
      newColumnWidths[index] = newWidth;
      setColumnWidths(newColumnWidths);
    };
    
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (onResizeEnd) onResizeEnd(columnWidths);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = 'flex';
      containerRef.current.style.width = '100%';
    }
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ display: 'flex', width: '100%', ...style }}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          style={{
            flex: `0 0 ${columnWidths[index]}px`,
            padding: '0 5px',
            position: 'relative',
          }}
        >
          {child}
          {index < children.length - 1 && (
            <div
              onMouseDown={(e) => onMouseDown(index, e)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '10px',
                height: '100%',
                cursor: 'ew-resize',
                zIndex: 10,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ResizableColumns;

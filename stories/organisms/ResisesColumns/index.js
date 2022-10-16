import React, {
  useCallback,
  useRef,
  useState
} from 'react';
import './styles.css';

export const  ResisesColumns = ({ lastMinWidth = 440, ...props  }) => {
  const wrapper = useRef();
  const dragging = useRef(false);
  const columns = ['one', 'two'];
  const columnRef = [];
  const [dividerPos, setDividerPos] = useState({
    one: 80,
    two: 20,
  });
  const [divNames, setDivNames] = useState({
    left: 'one',
    right: 'two'
  });
  const [selectedRef, setSelectedRef] = useState(0);

  const handleColtroler = (left, right, refId) => {
    setDivNames({
      left: left,
      right: right
    });
    setSelectedRef(refId);
  };
  const onDragStart = useCallback(event => {
    dragging.current = true;
  }, [])

  const onDrag = event => {
    if (!dragging.current) return;
    const pos = event.touches ? event.touches[0].clientX : event.clientX;
    const move = () => {
      const boundingRect = wrapper.current.getBoundingClientRect();
      const columnRect = columnRef[selectedRef]?.getBoundingClientRect();
      const elemLeft = columnRect?.left;
      const elemWidth = boundingRect?.width;
      const min = elemLeft + 10;
      const max = elemWidth + elemLeft - 10;
      const newDividerPos = Math.max(min, Math.min(max, pos));
      const percent = ((newDividerPos - elemLeft) / elemWidth) * 100;
      const addingSize =
        dividerPos[divNames.left] - percent + dividerPos[divNames.right];
      setDividerPos({
        ...dividerPos,
        [divNames.left]: percent,
        [divNames.right]: addingSize
      });
    };
    requestAnimationFrame(move);
  };

  const onDragEnd = useCallback(event => {
    if (dragging.current) {
      dragging.current = false;
    }
  }, []);

  return (
    <React.Fragment>
      <div
        className='column-container'
        ref={wrapper}
        onMouseMove={onDrag}
        onTouchMove={onDrag}
        onMouseUp={onDragEnd}
        onTouchEnd={onDragEnd}
      >
        {columns.map((data, index) => {
          const position = columns.indexOf(data);
          const nextColumn = columns[position + 1];
          return (
            <div
              key={index}
              ref={ref => (columnRef[index] = ref)}
              className='column'
              style={{ width: `${dividerPos[data]}%`, minWidth:`${lastMinWidth}px` }}
            >
              {props.children[index]}
              {nextColumn !== undefined && (
                <div
                  className='column-controler'
                  style={{ right: '-2px', borderColor: 'red' }}
                  onMouseDownCapture={() =>
                    handleColtroler(data, nextColumn, index)
                  }
                  onMouseDown={onDragStart}
                  onTouchStart={onDragStart}
                />
              )}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

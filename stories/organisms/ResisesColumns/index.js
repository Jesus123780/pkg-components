import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconArrowLeft } from "../..";
import styles from "./styles.module.css"

export const ResisesColumnsMemo = ({
  lastMinWidth = '440px',
  padding = "15px",
  height = "",
  backgroundColor,
  initialDividerPosition = null,
  ...props
}) => {
  const wrapper = useRef();
  const initialDividerPos = { __0: 60, __1: 40 };
  const [columnsChildren, setColumnsChildren] = useState([]);
  const [dividerPos, setDividerPos] = useState(initialDividerPos);
  const getInitialDividerPos = (numSections) => {
    const initialPos = {};
    for (let i = 0; i < numSections; i++) {
      initialPos[`__${i}`] = 100 / numSections;
    }
    return initialPos;
  };

  useEffect(() => {
    if (props.children) {
      const newColumnsChildren =
        props?.children?.map((_element, index) => {
          return `__${index}`;
        }) ?? [];
      setColumnsChildren(newColumnsChildren || []);
      setDividerPos(initialDividerPosition ?? getInitialDividerPos(columnsChildren?.length ?? 2) ?? initialDividerPos);
    }
  }, [lastMinWidth]);

  const dragging = useRef(false);
  const columns = columnsChildren;
  const columnRef = [];

  // const Children
  const [selectedRef, setSelectedRef] = useState(0);
  const handleColtroler = (left, right, refId) => {
    setSelectedRef(refId);
  };

  const onDragStart = useCallback((event) => {
    dragging.current = true;
  }, []);

  const updateDividerPos = (newPos) => {
    const totalPercentage = Object.values(newPos).reduce((a, b) => a + b);
    const newDividerPosObj = {...dividerPos};
    if (totalPercentage && !Number.isNaN(totalPercentage)) {
      // Compute the factor to scale the percentages.
      const scaleFactor = 100 / totalPercentage;
      // Scale the percentages so that they add up to 100.
      Object.keys(newPos).forEach((key) => {
        newDividerPosObj[key] = newPos[key] * scaleFactor;
      });
    } else {
      Object.keys(dividerPos).forEach((key) => {
        newDividerPosObj[key] = dividerPos[key];
      });
    }
    setDividerPos(newDividerPosObj);
  };

  const onDrag = (event) => {
    if (!dragging.current) return;
    const pos = event.touches ? event.touches[0].clientX : event.clientX;
    const move = () => {
      const boundingRect = wrapper.current.getBoundingClientRect();
      const columnRect = columnRef[selectedRef]?.getBoundingClientRect();
      if (columnRect && !!columnRef[selectedRef]) {
        columnRef[selectedRef].classList.add("no-select");
      }
      const elemLeft = columnRect?.left;
      const screenWidth = window.innerWidth;
      const elemWidth = boundingRect?.width;
      if (!elemLeft || !elemWidth) return;
  
      // set minimum width to 440
      const minWidth = 440;
      const maxColumns = Math.ceil(screenWidth / minWidth);
  
      // set the percentage width of each column
      let columnPercentage = 100 / Object.keys(dividerPos).length;
      if (maxColumns < Object.keys(dividerPos).length) {
        columnPercentage = 100 / Object.keys(dividerPos).length;
      }
  
      // calculate the maximum and minimum positions for each divider
      let min = elemLeft + minWidth;
      let max = screenWidth - minWidth;
      if (maxColumns === Object.keys(dividerPos).length) {
        min = elemLeft;
        max = screenWidth;
      }
      const newDividerPos = Math.max(min, Math.min(max, pos));
      const percent = ((newDividerPos - elemLeft) / elemWidth) * 100;
      if (dividerPos) {
        const totalPercentage = Object.values(dividerPos)?.reduce(
          (a, b) => a + b
        );
        const addingSize = totalPercentage - percent;
        const newDividerPosObj = {};
        Object.keys(dividerPos).forEach((key, index) => {
          if (index === 0) {
            newDividerPosObj[key] = percent;
          } else if (index === Object.keys(dividerPos).length - 1) {
            newDividerPosObj[key] = addingSize;
          } else {
            newDividerPosObj[key] =
              (dividerPos[key] / totalPercentage) * addingSize;
          }
        });
        updateDividerPos(newDividerPosObj);
      }
    };
    requestAnimationFrame(move);
  };
  

  const onDragEnd = useCallback((event) => {
    if (dragging.current) {
      dragging.current = false;
    }
  }, []);

  return (
    <div>
      <div
        className={styles["column-container"]}
        ref={wrapper}
        style={{
          height: height,
          padding: padding,
          backgroundColor: backgroundColor || "#f4f5f7",
        }}
        onMouseLeave={onDragEnd}
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
              ref={(ref) => (columnRef[index] = ref)}
              className={styles["column"]}
              style={{
                width: `${dividerPos[data]}%`,
                minWidth: `${lastMinWidth}`,
                height: '100%'
              }}
            >
              {props.children[index]}
              {nextColumn !== undefined && (
                <div
                  className={styles["column-controler"]}
                  style={{ right: "-2px", borderColor: "red" }}
                  onMouseDownCapture={() =>
                    handleColtroler(data, nextColumn, index)
                  }
                  onMouseDown={onDragStart}
                  onTouchStart={onDragStart}
                >
                {false && <div >
                    <IconArrowLeft color='var(--color-primary-red)' size={20} />
                  </div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ResisesColumns =  React.memo(ResisesColumnsMemo)
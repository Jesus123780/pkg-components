import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IconClose } from "./../../../assets/icons/index";
import "./styles.css";

export const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime } = props;
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };
  const [divPosition, setDivPosition] = useState(0);

  const handleDrag = (event) => {
    setDivPosition(event.clientX);
  };
  const handleDragEnd = (event, id) => {
    if (window.innerWidth - event.clientX > window.innerWidth / 2) {
      deleteToast(id);
    }
  };
  return (
    <>
      <div className={`notification-container ${position}`}>
        {list.map((toast, i) => (
          <div
            style={{
              position: "relative",
              left: `${divPosition}px`,
              transition: "left 0.5s ease-in-out",
              className: `notification toast ${position}`,
              backgroundColor: toast.backgroundColor,
            }}
            onDrag={handleDrag}
            onDragEnd={(e) => {
              return handleDragEnd(e, toast.id);
            }}
            draggable
            key={i}
            className={`notification toast ${position}`}
            // style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>
              <IconClose size={20} />
            </button>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
};

Toast.defaultProps = {
  position: "top-right",
};

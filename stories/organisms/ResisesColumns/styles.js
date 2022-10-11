import { styled as PAPU } from "@stitches/react";
import styled from "styled-components";
console.log(styled)
export const ContainerWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: 'space-between';
  align-items: stretch;
`

export const PanelWrapper = styled.div`
  position: relative;
  flex: auto;
  width: clamp(100px, 100%, 100vw);

`

export const DragHandle = PAPU("div", {
  position: "relative",
    width: "min-content",
  "&:after": {
    content: "",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "-1px",
    width: "2px",
    background: "#2684FF44",
    cursor: "col-resize",
    transiton: "all 50ms",
    zIndex: 100000
  },

  "&:hover": {
    "&:after": {
      left: "-3px",
      width: "6px",
      background: "#2684FF"
    }
  },

  variants: {
    active: {
      true: {
        "&:after": {
          left: "-3px",
          width: "6px",
          background: "#2684FF !important"
        }
      }
    }
  }
});

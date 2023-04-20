import {
  APColor,
  BColor,
  BGColor,
  DarkSilver,
  PColor,
  PVColor,
} from "./../../../assets/colors/index"
import styled, { css } from "styled-components"

export const ContentImage = styled.div`
  display: flex;
  width: 100%;
  && > img {
    height: 300px;
    min-height: 300px;
    object-fit: cover;
    max-height: 300px;
    width: 100%;
  }
`;

export const InputFile = styled.input`
  display: none;
`;
export const ActionName = styled.span`
  position: absolute;
  height: 20px;
  width: 100px;
  right: 50px;
  color: ${BColor};
  opacity: 0;
  background-color: ${BGColor};
  font-family: PFont-Light;
  transition: 0.1s ease-in-out;
  z-index: -900;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  place-content: center;
`;
export const WrapperButton = styled.div`
  width: ${({ width }) => {
    return width || "100%";
  }};
  margin: ${({ margin }) => {
    return margin || "initial";
  }};
  display: flex;
  justify-content: center;
  place-items: center;
  .ProQuantity {
    padding: 10px;
  }
`;
export const InputCounter = styled.input`
  text-align: center;
  position: absolute;
  border-radius: 0.375em;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
  font-size: 20px;
  min-height: 48px;
  width: 60px;
  min-width: 40px;
  outline: none;
  left: 0;
  right: 0;
  margin: auto;
  top: 10px;
  border: none;
  &&:focus {
    box-shadow: 0 0 0 1px ${PVColor};
  }
`;
export const ItemProQuantity = styled.button`
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: space-between;
  .counts--container {
    border-radius: 5px;

    .count {
      font-size: 20px;
      width: 70px;
      height: 50px;
      color: ${BColor};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      &.move-up {
        animation: move-up 250ms ease-out;
        animation-fill-mode: forwards;
      }

      &.start-animate-up {
        animation: move-up-start 250ms ease-out;
        animation-fill-mode: forwards;
      }

      @keyframes move-up-start {
        0% {
          top: 0px;
        }
        100% {
          top: -50px;
          opacity: 0;
        }
      }

      @keyframes move-up {
        0% {
          top: 50px;
          opacity: 0;
        }
        100% {
          opacity: 1;
          top: 0;
        }
      }
      &.move-down {
        animation: move-down 250ms ease-out;
        animation-fill-mode: forwards;
      }

      &.start-animate-down {
        animation: move-down-start 250ms ease-out;
        animation-fill-mode: forwards;
      }

      @keyframes move-down-start {
        0% {
          top: 0px;
        }
        100% {
          top: 50px;
          opacity: 0;
        }
      }

      @keyframes move-down {
        0% {
          top: -50px;
          opacity: 1;
        }
        100% {
          opacity: 1;
          top: 0;
        }
      }
    }
  }
`;
export const OverlineFree = styled.button`
  width: 90%;
  height: 100px;
  position: absolute;
  top: ${({ free }) => {
    return free ? "-30px" : "0px";
  }};
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: 0.2s ease;
  & > span {
    color: ${PColor};
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
  }
`;

export const OverlineCategory = styled.button`
  width: 100%;
  opacity: 0;
  height: 50px;
  position: absolute;
  background-color: transparent;
  bottom: ${({ withCategories }) => {
    return withCategories ? "-30px" : "-10px";
  }};
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: 0.2s ease;
  & > span {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #3e3e3e;
    display: flex;
    font-size: 0.675rem;
    font-weight: 400;
    left: 0;
    line-height: 1.25rem;
    max-height: calc(2 * 1.25rem);
    overflow: hidden;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    top: 10px;
    width: 90%;
  }
`;
export const Button = styled.button`
  background-color: ${PColor};
  color: ${BGColor};
  padding: 4px;
  border-radius: 5px;
`;
export const WrapperCard = styled.div`
  position: relative;
  margin: ${({ margin }) => {
    return margin || "0";
  }};

  &&:hover ${OverlineFree} {
    top: -30px;
  }
  &&:hover ${OverlineCategory} {
    bottom: -50px;
    opacity: 1;
  }
  .content-dots {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
    right: 20px;
    opacity: 1;
    bottom: -15px;
  }
  .menu-icon {
    cursor: pointer;
    height: 20px;
    position: relative;
    width: 30px;
  }

  .menu-icon span {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${PColor};
    top: 50%;
    left: 0;
    transform: translateY(-50%) scaleX(0.6);
    transform-origin: left center;
    transition: transform 0.3s ease-in-out;
  }

  .menu-icon span:nth-of-type(2) {
    margin-top: 10px;
    transform-origin: center center;
    transform: translateY(-50%) scaleX(0.8);
  }
  .menu-icon span:nth-of-type(3) {
    margin-top: 10px;
    transform-origin: center center;
    transform: translateY(-50%) scaleX(0.8);
  }

  .menu-icon span:last-of-type {
    transform-origin: right center;
    transform: translateY(-50%) scaleX(0.7);
  }
`;
export const ButtonCard = styled.button`
  font-size: 12px;
  font-family: PFont-Light;
  cursor: pointer;
  word-break: break-word;
  box-shadow: 0px 0px 6px 0px #16101028;
  position: absolute;
  right: -50px;
  transition: 0.4s ease;
  width: 50px;
  height: 50px;
  z-index: 999;
  top: ${({ top }) => {
    return top ? top : "20px";
  }};
  right: ${({ right }) => {
    return right ? "0" : "-50px";
  }};
  transition-delay: ${({ delay }) => {
    return delay ? delay : "auto";
  }};
  max-height: 50px;
  max-width: 50px;
  border-radius: 50%;
  align-items: center;
  display: grid;
  justify-content: center;
  background-color: ${BGColor};

  &:hover ${ActionName} {
    opacity: 1;
    z-index: 900;
  }
  ${(props) => {
    if (props?.tooltip) {
      return css`
        &::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${PColor};
          transition: 0.4s ease;
          top: 12px;
          right: 13px;
        }
      `;
    }
    return (
      props.grid &&
      css`
        top: ${({ top }) => {
          return top ? top : "80px";
        }};
      `
    );
  }}
`;
export const Card = styled.div`
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgba(0,0,0,.05);
    display: grid;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: .2s;
    width: 100%;
    .tag {
      display: flex;
      justify-content: end;
      position: absolute;
      right: 0;
      top: 35px;
    }
    grid-template:
    "image" 157px
    "info-price"  1fr
    "info"  1fr;
    grid-gap: 10px;
    height: 400px;
    align-items: flex-end;
    align-items: baseline;
    top: 0;
    box-shadow: ${({ free }) => {
      return free && `0 1px 4px ${PColor}`;
    }};
    ${({ height }) => {
      return css`
        height: ${height};
      `;
    }}};

    &:hover  ${ButtonCard} {
        right: 15px;
    }

    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    .dish-card__info {
        font-family: SulSans,Helvetica,sans-serif;;
        cursor: pointer;;
        display: grid;;
        font-size: 16px;;
        grid-area: info;;
        grid-template-rows: 1fr;;
        height: min-content;;
        line-height: 1.15;;
        list-style: none;;
        margin: 0;;
        padding: 10px 20px;;
        text-rendering: optimizeLegibility;;
        /* padding: 0 20px; */
    }
    .dish-card__container-image {
        box-sizing: border-box;
        cursor: pointer;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        grid-area: image;
        height: 157px;
        line-height: 1.15;
        list-style: none;
        position: relative;
        text-rendering: optimizeLegibility;
        border-radius: 4px 4px 0 0;
        height: 100%;
        overflow: hidden;
        width: 100%;
    }
    .marmita-image--responsive {
        -webkit-tap-highlight-color: transparent;
        align-self: flex-start;
        border-radius: 4px 4px 0 0;
        border-style: none;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 16px;
        grid-area: image;
        height: 157px;
        line-height: 1.15;
        list-style: none;
        object-fit: cover;
        pointer-events: none;
        text-rendering: optimizeLegibility;
        width: 100%;
    }
    .dish-card__description {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        box-sizing: border-box;
        color: #3e3e3e;
        cursor: pointer;
        display: -webkit-box;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 1.165rem;
        font-weight: 400;
        line-height: 1.5rem;
        list-style: none;
        margin-bottom: 9px;
        margin-top: 0;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        text-rendering: optimizeLegibility;
        width: 80%;
    }
    .description {
      text-rendering: optimizeLegibility;
      font-family: SulSans,Helvetica,sans-serif;
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      font-weight: lighter;
      color: ${DarkSilver};
      word-break: break-word;
      font-size: .875rem;
      line-height: 1.25rem;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
    }
    .price {
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: ${APColor};
    }

    .discount {
      color: #3e3e3e;
      text-decoration-line: line-through;
    }

    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }

    .info-price {
        display: flex;
        padding: 0 20px;
    }
`

export const ContainerActions = styled.div`
  position: absolute;
  width: max-content;
  right: 25px;
  background-color: transparent;
  border-radius: 50%;
`;

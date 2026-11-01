import styled, { css } from 'styled-components'
import {
  BColor,
  BGColor,
  BGVColor,
  DarkSilver,
  PColor
} from '../../../assets/colors'

export const ContainerButtonAction = styled.div``
export const CardProductsContent = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  height: min-content;
  padding: 10px;
  border-radius: 4px;
  grid-template-columns: 5fr 140px;
  grid-column-gap: 20px;
  cursor: pointer;
  display: grid;
  padding: 16px;
  .Name {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PFont-Light;
  }
  .store_info {
    color: ${`${BGVColor}`};
  }
  .store_image {
    background-color: ${BGColor};
    box-shadow: 1px 1px 10px #00000012;
  }
`


export const DisRestaurant = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(63, 62, 62, 0.1);
  border-radius: 4px;
  width: 100%;
  margin: auto;
  padding: 10px;
  height: auto;
  padding: 11px 20px;
  .dish-observation-form__label {
    line-height: 1.15;
    font-weight: 500;
    font-size: 1rem;
    color: ${DarkSilver};
  }
  .dish-restaurant__header {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dish-restaurant__divisor {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    border-top: 2px dashed #f2f2f2;
    margin: 8px 0;
  }
`

export const GarnishChoicesHeader = styled.div`
  padding: 12px 20px 10px;
  display: flex;
  place-content: center;
  align-items: center;
  justify-content: space-between;
  background: #f2f2f2;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #ccc;
  z-index: 99;
  .garnish-choices__title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 500;
    color: #3f3e3e;
  }
  .garnish-choices__title-desc {
    font-weight: 100;
    font-size: 0.875rem;
    line-height: 17px;
    display: block;
    color: ${DarkSilver};
  }
  .marmita-minitag {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans, Helvetica, sans-serif;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    font-size: 0.5625rem;
    line-height: 1;
    background-color: ${DarkSilver};
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
  }
  .garnish-choices {
    justify-content: space-around;
    display: flex;
  }
`
export const CardsComponent = styled.div`
  background-color: ${BGColor};
  padding: 10px;
  margin: 15px 0;
  border-bottom: 1px solid #ccc;
  grid-template-columns: 5fr 10%;
  gap: 20px;
  cursor: move;
  display: grid;
  .title_card {
    word-break: break-word;
    font-family: PFont-Light;
    color: ${BColor};
    margin: 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 500;
  }
  .price {
    word-break: break-word;
    font-family: PFont-Light;
    color: ${PColor};
    margin: 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 600;
  }
`
export const ContainerShare = styled.div`
  position: absolute;
  height: 200px;
  display: none;
  width: 240px;
  box-shadow: 0 0 1.5rem rgb(18 38 63 / 9%);
  z-index: 99;
  background-color: ${BGColor};
  border-radius: 10px;
  padding: 6px;
  bottom: 17px;
  transition: all 0.5s ease;
  .icon-WhatsApp {
    background-color: #01e675;
    border-radius: 50%;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  .icon-face {
    background-color: #1196f5;
    border-radius: 50%;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    right: 10px;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${BGColor} transparent transparent transparent;
  }
  button {
    color: ${BColor};
    padding: 10px;
    transition: 0.5 ease;
    width: 100%;
    cursor: pointer;
    background-color: ${BGColor};
  }
  button:hover {
    background-color: #ededed69;
  }
`
export const ContentShare = styled.div`
  position: relative;
  cursor: pointer;
  color: red;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  margin: 0;

  display: flex;
  justify-content: flex-end;
  position: relative;
  &:hover > ${ContainerShare} {
    display: block;
  }
`
export const ActionButton = styled.div`
  display: grid;
  position: absolute;
  bottom: 30px;
  width: 50%;
  right: 0;
  place-content: center;
  grid-template-columns: 60% 40%;
`
export const BtnClose = styled.button`
  position: absolute;
  right: 19px;
  top: 20px;
  z-index: 9990;
  background-color: ${BGColor};
  @media (max-width: 960px) {
    display: none;
  }
`
export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${BGColor};
  padding: 10px 20px;
  z-index: 999;
  @media (min-width: 960px) {
    display: none;
  }
`
export const BtnCloseMobile = styled.button`
  background-color: ${BGColor};
`
export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  transition: 150ms ease-in-out;
  z-index: var(--z-index-99999);
  height: 100%;

  ${({ showModal }) => {
    return showModal
      ? css`
          top: 0;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `
  }}
  .container-modal__actions {
    display: flex;
    padding: 10px;
    align-items: center;
  }
`

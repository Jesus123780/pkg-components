import styled from 'styled-components'
import { BColor, BGColor, NorthTexasGreen, PColor } from '../../../assets/colors'

export const Div = styled.div`
  width: 30%;
`
export const ContainerListOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
  padding: 40px 0;
  margin: 102px 0;
  .wrapper-list {
    width: 30%;
    margin: 0 10px;
  }
`
export const WrapperList = styled.div`
  width: 100%;
  cursor: move;
`
export const GarnishChoicesHeader = styled.div`
  padding: 12px 20px 10px;
  display: flex;
  place-content: center;
  align-items: center;
  justify-content: space-between;
  place-items: center;
  background-color: var(--color-background-gray-light);
  position: sticky;
  top: 0px;
  flex-wrap: wrap;
  border-bottom: 1px solid #ccc;
  margin-bottom: 80px;
  top: -11px;
  .content {
    display: flex;
    user-select: none;
  }
  .garnish-choices__title {
    margin: 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 500;
    color: #3f3e3e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 2;
    width: 150px;
  }
  .garnish-choices__title-desc {
    font-weight: 100;
    font-size: 0.875rem;
    line-height: 17px;
    display: block;
    color: #717171;
  }
  .marmita-minitag {
    -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans, Helvetica, sans-serif;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
    font-size: 0.5625rem;
    line-height: 1;
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
  }
  .garnish-choices {
    justify-content: flex-end;
    display: flex;
    align-items: center;
  }
`
export const CardsComponent = styled.div`
  background-color: ${BGColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  .title_card {
    word-break: break-word;
    font-family: PFont-Light;
    color: ${BColor};
    margin: 10px 0 0 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 500;
  }
  .price-value {
    word-break: break-word;
    font-family: PFont-Light;
    color: ${PColor};
    margin: 10px 0 0 0;
    font-size: 1rem;
    line-height: 1.25em;
    font-weight: 600;
  }
  .price-free {
    margin: 10px 0 0 0;
    margin: 10px 0 0 0;
    color: ${NorthTexasGreen};
  }
  .price-neto {
    color: #717171;
    font-size: var(--font-size-base);
    left: 5px;
    margin: 10px 0 0 0;
    position: absolute;
    right: 0;
    top: -21px;
  }
`
export const ContentModal = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .header {
    position: static;
    width: auto;
    justify-content: flex-end;
    padding: 20px 6px 0;
    min-height: auto;
    height: auto;
    display: flex;
  }
  .content {
    line-height: 1.15;
    font-size: 16px;
    overflow-y: auto;
    height: 100%;
    padding: 16px 20px;
  }
`
export const BodyDnd = styled.div`
  .first-column {
    display: grid;
    grid-gap: 19px 5px;
    grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    height: 100%;
    overflow: hidden auto;
    width: 100%;
  }
  .contain-check-item {
    width: 100%;
    display: flex;
    place-content: space-between;
    padding: 0 10px;
    flex-wrap: wrap;
  }

  .tooltip {
    position: absolute;
    top: 50px;
    right: -150px;
    z-index: 99999;
    width: 390px;
    border-radius: 14px;
    background-color: var(--color-base-white);
    padding: 20px 30px 10px;
    box-shadow: 0 2px 43px rgba(0, 0, 0, 0.24);
    .btn-ok {
      background-color: transparent;
      justify-content: center;
      align-items: center;
      display: flex;
      width: 100%;
    }
  }
`
export const ContentLinesItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: min-content;
  border-bottom: 1px solid #ccc;
  ${(props) => {
    return Boolean(props.noBorder) && 'border-bottom: none'
  }}
`
export const ContentCheckbox = styled.div`
  transition: all 0.1s;
  color: inherit;
  cursor: pointer;
  outline: none;
  position: relative;
  margin-right: 2px;
`

export const Container = styled.div`
  padding: 20px;
  overflow: auto;
  @media only screen and (max-width: 768px) {
    display: none;
    padding: 0;
  }
`
export const Action = styled.div`
  align-items: center;
  background: #fff;
  border-top: 2px solid #f5f0eb;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 80px;
  width: 100%;
`

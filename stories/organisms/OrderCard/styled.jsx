import styled, { css, keyframes } from 'styled-components'
import { APColor, BGColor, SFVColor } from './../../../assets/colors/index'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 '#3ec285';
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`

export const CardOrder = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 20px auto 0 auto;
  display: grid;
  gap: 5px;
  grid-auto-flow: column;
  place-content: space-around;
  padding: 0 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(100, 100px);
  padding: 5px;
  gap: 10px;
  place-content: start;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  @media only screen and (min-width: 560px) {
    grid-template-columns: 25% repeat(auto-fill, 25%) 25%;
  }
  .status-list {
    display: flex;
    place-items: center;
  }
  .order-status_container {
    display: grid;
    grid-template-columns: 50% 1fr;
    padding: 5px;
    gap: 10px;
    place-content: start;
    margin-top: 10px;
    @media only screen and (min-width: 560px) {
      grid-template-columns: 50% 1fr;
    }
  }
  .card-title_store {
    color: #000000;
    font-size: 13px;
    font-family: PFont-Light;
    font-weight: 500;
  }
  .order-number,
  .order-status {
    color: #000000;
    font-size: 20px;
    font-family: PFont-Bold;
    font-weight: 800;
  }
  .order-status {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PFont-Light;
    color: #333;
    font-size: 20px;
    line-height: 1.2;
    padding-right: 10px;
    font-weight: 300;
  }
  .card {
    cursor: pointer;
    border: 1px solid #e4e8eb;
    border-radius: 15px;
    background-color: #e4e8eb29;
    margin: 0 10px;
    padding: 15px 20px;
  }
  .card-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
`
export const FeedItem = styled.div`
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  display: flex;
  place-content: center;
  align-items: center;
  margin-right: 20px;
  background: ${BGColor};
  border: 1.5px solid #717171;
  position: relative;

  &:nth-child(1) {
    &:after {
      display: none;
    }
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -21px;
    width: 100%;
    border: 1.5px solid #71717169;
    bottom: 0;
    margin: auto;
    height: 0;
  }
  ${(props) => {
    if (props.rejected)
      return css`
        border: 1px solid ${SFVColor};
        animation: ${pulse} 2s infinite;
        background-color: ${SFVColor};
      `
    return (
      props.pulse &&
      css`
        border: 1px solid ${APColor};
        animation: ${pulse} 2s infinite;
        background-color: ${APColor};
      `
    )
  }}
`

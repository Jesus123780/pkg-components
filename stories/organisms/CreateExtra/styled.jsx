import styled, { css } from 'styled-components'

export const ContentModal = styled.form`
  align-items: start;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    font-size: 16px;
    height: 100%;
    line-height: 1.15;
    overflow-y: auto;
    padding: 16px 20px;
  }
`
export const ContentLinesItems = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    height: min-content;
    border-bottom: 1px solid #ccc;
    ${props => { return props.noBorder && `border-bottom: none` }}

     &:before,
  &:after {
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    transform: scale(0);
    border-radius: 0;
    transition: transform 0.2s ease, border-radius 0.1s ease 0.1s;
  }

  &:before {
    border-bottom: 1px solid #ea1d2c;
    border-left: 1px solid #ea1d2c;
    transform-origin: 0 100%;
  }
  &:after {
    border-top: 1px solid #ea1d2c;
    border-right: 1px solid #ea1d2c;
    transform-origin: 100% 0;
  }

  ${({ loading }) => {
    return (
      loading &&
      css`
        &&:before,
        &&:after {
          transform: scale(1);
          border-radius: 4px;
          color: #ea1d2c;
        }
      `
    )
  }}
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
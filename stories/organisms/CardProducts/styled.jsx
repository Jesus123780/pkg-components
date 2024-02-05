import styled, { css } from 'styled-components'

export const CtnBox = styled.div`
  position: relative;
  overflow: hidden;
  img {
    width: 170px;
    height: 170px;
    object-fit: contain;
  }
  .free {
    color: #21b478 !important;
  }
  .discount {
    padding: 5px 10px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    display: inline-block;
    margin-left: 5px;
    font-size: 0.9em;
  }

  .discount.red {
    background-color: red;
  }

  .discount.green {
    background-color: green;
  }
`

export const TooltipCardProduct = styled.div`
  position: absolute;
  ${({ left }) => {
    return (
      left &&
      css`
        left: ${left};
      `
    )
  }}
  z-index: -99;
  transition: 0.3s ease-in-out;
  transform: translateY(30px);
  button {
    border-radius: 50px;
    height: 30px;
    width: 30px;
    padding: 5px;
    cursor: pointer;
  }
`

export const WrapperCard = styled.div`
  position: relative;
  z-index: 99;

  &&:hover > ${TooltipCardProduct} {
    transform: translateY(-30px);
  }

  &:before,
  &:after {
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    content: "";
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

export const CardProductsContent = styled.div`
  grid-template-columns: 1fr 146px;
  grid-gap: 15px;
  padding: 15px;
  min-width: 320px;
  border: 1px solid var(--color-neutral-gray);
  box-shadow: var(--box-shadow-lg);
  border-radius: 4px;
  position: relative;
  display: grid;
  min-height: 190px;
  width: 100%;
  height: 147px;
  background: var(--color-base-white);
  padding: 20px;
  text-decoration: none;
  transition: 0.2s;
  overflow: hidden;
  height: 100%;
  .footer {
    position: absolute;
    bottom: 15px;
  }
  .card__price,
  .card__des {
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: var(--color-text-gray-light);
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
  .card__des {
    text-decoration: line-through;
  }
  .card__description {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--color-text-gray-light);
    cursor: pointer;
    display: -webkit-box;
    font-family: SulSans, Helvetica, sans-serif;
    font-size: 0.975rem;
    font-weight: lighter;
    line-height: 1.25rem;
    list-style: none;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`

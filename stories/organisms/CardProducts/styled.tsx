import styled, { css } from 'styled-components'

export const CtnBox = styled.div`
  position: relative;
  overflow: hidden;
  place-content: center;
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
interface TooltipCardProductProps {
  left?: string
}
export const TooltipCardProduct = styled.div<TooltipCardProductProps>`
  position: absolute;
  ${({ left }) => {
    return (
      (left != null) &&
      css`
        left: ${left};
      `
    )
  }}
  z-index: var(--z-index-40);
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
interface WrapperCardProps {
  loading: boolean
}
export const WrapperCard = styled.div<WrapperCardProps>`
  position: relative;
  z-index: var(--z-index-999);

  &&:hover > ${TooltipCardProduct} {
    transform: translateY(-30px);
  }

  &:before,
  &:after {
    pointer-events: none;
    width: 100.5%;
    height: 100.5%;
    z-index: 1;
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    transform: scale(0);
    border-radius: 0;
    transition: transform 0.2s ease, border-radius 0.1s ease 0.1s;
  }

  &:before {
    border-bottom: .2px solid var(--color-background-primary);;
    border-left: .2px solid var(--color-background-primary);;
    transform-origin: 0 100%;
  }
  &:after {
    border-top: .2px solid var(--color-background-primary);;
    border-right: .2px solid var(--color-background-primary);;
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
          color: var(--color-background-primary);;
        }
      `
    )
  }}
`

export const CardProductsContent = styled.div`
  background: var(--color-base-white);
  border-radius: 4px;
  border: 1px solid var(--color-neutral-gray);
  box-shadow: var(--box-shadow-lg);
  cursor: pointer;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 146px;
  height: 147px;
  min-height: 270px;
  min-width: 320px;
  overflow: hidden;
  padding: 20px;
  position: relative;
  text-decoration: none;
  transition: 0.2s;
  width: 100%;
  z-index: var(--z-index-50);
  &:hover {
    border: 1px solid var(--color-neutral-gray-silver);
  }
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
    font-weight: 100;
    text-decoration-thickness: from-font;
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

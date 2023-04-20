import styled, { css } from 'styled-components'

export const CtnBox = styled.div`
  position: relative;
  overflow: hidden;
  img {
    width: 170px;
    height: 170px;
    object-fit: contain;
  }
`

export const TooltipCardProduct = styled.div`
  position: absolute;
  ${({ left }) => { return left && css`left: ${left};` }}
  z-index: -99;
  transition: .3s ease-in-out;
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
  &&:hover >  ${TooltipCardProduct} {
      transform: translateY(-30px);
  }
`

export const CardProductsContent = styled.div`
    grid-template-columns: 1fr 146px;
    grid-gap: 15px;
    padding: 15px;
    min-width: 320px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    position: relative;
    display: grid;
    min-height: 190px;
    width: 100%;
    height: 147px;
    background: #fff;
    padding: 20px;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    height: 100%;
    .footer  {
      position: absolute;
      bottom: 15px;
    }
    .card__price, .card__des  {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: #3e3e3e;
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
        color: #3e3e3e;
        cursor: pointer;
        display: -webkit-box;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: .975rem;
        font-weight: lighter;
        line-height: 1.25rem;
        list-style: none;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }
    `
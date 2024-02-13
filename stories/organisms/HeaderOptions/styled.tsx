import styled, { css } from 'styled-components'
import { BGColor } from '../../../assets/colors'

export const ButtonOption = styled.button`
    margin: 0 0 0 30px;
    position: relative;
    cursor: pointer;
    background-color:  transparent;
    ${props => {
    return props.space && css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0;
        & > span {
            font-family: PFont-Light;
            font-size: 14px;
            color: ${({ theme }) => { return `${theme.PColor}` }};
        }
    `}}
    @media only screen and (min-width: 960px){
    }
    .notification_count {
        background-color: var(--color-primary-red);
        width: var(--spacing-xl);
        color: var(--color-text-white);
        display: inline-block;
        height: var(--spacing-xl);
        border-radius: 20px;
        font-size: 13px;
        position: absolute;
        right: -5px;
        top: -10px;
        line-height: 20px;
        text-align: center;
    }
`

export const FloatingBox = styled.div`
    position: absolute;
    grid-gap: 0 10px;
    display: grid;
    transition: all 200ms ease-in-out;
    background-color: ${BGColor};
    padding: 10px;
    z-index: 99999;
  ${({ show }) => {
    return show
      ? css`
                  visibility: visible;
                  transform: translateY(0);
                  `
      : css`

                visibility: hidden;
                  transform: translateY(-50px);
              `}}
    @media only screen and (min-width: 960px){
    }
`

export const FloatingBoxTwo = styled(FloatingBox)`
    margin: 0 0 0 30px;
    max-width: 250px;
    min-width: 250px;
    width: 250px;
    top: 28px;
    overflow: hidden;
    box-shadow: -1px 2px 8px 2px #dcdcdc;
`
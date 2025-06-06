import link from 'next/link'
import styled, { css } from 'styled-components'
import {
    BColor,
    BGColor,
    PColor,
    PLVColor,
    SFVColor
} from '../../../assets/colors'

export const CtnAnchor = styled(link)`
    box-sizing: border-box;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    height: 42px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: PFont-Regular;
    background-color: transparent;
    align-self: auto;
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid #edf2f932;
`
interface LeftNavProps {
    show: boolean
}
export const LeftNav = styled.div<LeftNavProps>`
    display: grid;
    padding: 10px;
    grid-template-columns: 50% repeat(auto-fill, 50%);
    position: absolute;             
    background-color: ${BGColor};
    background-color: var(--color-base-white);
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: var(--z-index-99999);
    border-radius: 5px;
    width: 400px;
    place-content: center;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 80px;
    left: 50px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }   
    ${({ show }) => {
        return show
            ? css`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `
            : css`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `
    }}
`

export const Info = styled.div`
    background-color: var(--color-base-white); 
    display: flex;
    flex-direction: column;
    overflow: hidden; 
    position: relative;
 
    .sub_title_store {
        color: var(--color-text-gray-light);
        font-weight: 500;
        margin-left: 5px;
        font-size: .9rem;
        line-height: 0.875rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
`
export const ContentOption = styled.div`
    min-height: 150px;
`
export const SubMenuModules = styled.div`
    position: absolute;
    right: -170px;
    background: red;
    color: red;
    z-index: 99;
    top: 0;
    border: 12px solid;
`
export const Anchor = styled.a`
    padding: 0px;
    display: flex;
    font-family: PFont-Regular;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;    
    display: block;
    text-decoration: none;
    // overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2em;
    color: ${BColor};
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 13px;
    &:hover > ${SubMenuModules} {
        display: block;
    }
`

export const OptionButton = styled.a`
    position: absolute;
    bottom: 15px;
    left: 0;
`
export const ContentAction = styled.div`
    position: absolute;
    left: 180px;
    overflow: hidden;
    align-items: center;
    background-color: ${PColor};
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    z-index: -999;
    width: 40px;
    display: flex;
    place-content: center;
    visibility: hidden;
    transition:  0.3s ease;
    transform: translateX(-50px);
    `
export const DynamicNav = styled.button`
    background-color: transparent;
    padding: 0;
    /* background-color: RED; */

    &:hover > ${ContentAction} {
        visibility: visible;
        z-index: 99;  
        transform: translateX(0);
        /* opacity: 1; */
        /* visibility: hidden;
        transform: translateY(-50px); */
       
        /*        */
    }
    width: 100%;
    align-items: center;
    display: flex;
    position: relative;
`
export const ButtonActionLink = styled.button`
    background-color: transparent;
    width: 100%;
    text-align: start;
    & > svg {
        margin-right: 10px;
        margin-left: 5px;
    }
    margin-bottom: 5px;
    color: var(--color-text-gray-light);
    font-weight: 500;

`
export const AnchorRouter = styled.a`
    cursor: pointer;
    &.active {
        color: ${PColor};
        border-left: 2px solid ${PColor};
        font-weight: 600;
        background-color: var(--color-primary-pink-light);
    }
    padding: 10px 3px;
    width: 100%;
    word-break: break-word;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--color-text-gray-light);
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 0.875rem;
    border-left: 2px solid transparent;
    margin-bottom: 7px;
    position: relative;
    .count_pedidos {
        background-color: ${PColor};
        color: ${BGColor};
        border-radius: 50%;
        padding: 1px;
        height: 28px;
        font-size: var(--font-size-base);
        width: 28px;
        align-items: center;
        display: flex;
        place-content: center;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    `

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px -1rem 0rem 0px rgb(18 38 63 / 3%);
    overflow: hidden;
    height: 100vh;
    background-color: ${`${SFVColor}69`};
    justify-content: space-between;
`

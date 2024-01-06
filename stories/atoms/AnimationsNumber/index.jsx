import React from 'react'
import styled, { keyframes } from 'styled-components'

export const AnimationsNumber = ({
    text = '0.00'
}) => {
    const reactArray = text.split('')
    return (
        <Wrapper>
            {reactArray?.map((item, index) => (
                <span key={index}>{item}</span>
            ))}
        </Wrapper>
    )
}
const Animation = keyframes`
    0% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewx(10deg) rotateZ(360deg); filter: blur(10px); }
    25% {opacity: 1; transform: translateY(0) skewY(0deg) skewx(0deg) rotateZ(0deg); filter: blur(0px);}
    75% {opacity: 1; transform: translateY(0) skewY(0deg) skewx(0deg) rotateZ(0deg); filter: blur(0px);}
    100% {opacity: 0; transform: translateY(-100px) skewY(10deg) skewx(10deg) rotateZ(360deg); filter: blur(10px);}
    `
const Wrapper = styled.span`
    span {
        width: min-content;
    /* display: inline-block; */
    font-size: calc(32px + (80 - 32) * ((100vw - 320px) / (1600 - 320)));
    line-height: calc(32px + (80 - 32) * ((100vw - 320px) / (1600 - 320)));
    font-family: PFont-Regular;
    animation: ${ Animation } 6s ease;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    font-family: PFont-Regular;
    font-size: 60px;
    color: #000;
    font-weight: 400;
    width: 620px;
    }
    span:nth-child(1){
        animation-delay: 0.1s;
    }
  
    span:nth-child(2){
        animation-delay: 0.2s;
    }
  
    span:nth-child(3){
        animation-delay: 0.3s;
    }
  
    span:nth-child(4){
        animation-delay: 0.4s;
    }
    span:nth-child(5){
        animation-delay: 0.6s;
    }
    span:nth-child(6){
        animation-delay: 0.7s;
    }
    span:nth-child(7){
        animation-delay: 0.8s;
    }
    span:nth-child(8){
        animation-delay: 0.9s;
    }
    span:nth-child(9){
        animation-delay: 1s;
    }
    span:nth-child(10){
        animation-delay: 1.1s;
    }
    span:nth-child(11){
        animation-delay: 1.2s;
    }
  
`
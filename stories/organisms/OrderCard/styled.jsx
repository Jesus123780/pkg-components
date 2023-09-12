import styled, { css, keyframes } from 'styled-components';
import { PColor, APColor } from './../../../assets/colors/index';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${APColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`

export const CardOrder = styled.div`
display: flex;
   .card {
     border: 1px solid #CCC;
     border-radius: 5px;
     margin: 0 10px;
   }
`
export const FeedItem = styled.li`
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    color: #212529;
    font-family: PFont-Light;
    word-wrap: break-word;
    list-style: none;
    position: relative;
    padding-bottom: 20px;
    padding-left: 30px;
    border-left: 2px solid #e4e8eb;
    .text-info {
        font-size: 12px;
    }
    .date {
      display: block;
      position: relative;
      top: -5px;
      color: #8c96a3;
      text-transform: uppercase;
      font-size: 12px;
    }
    .activity-text{
      position: relative;
      top: -3px;
    }
    &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -13px;
    width: 20px;
    height: 20px;
    border-radius: 50%  ;
    background: #ffffff;
    border: 1px solid ${PColor};
    ${props => {
    return props.pulse && css`
    border: 1px solid ${APColor};
    animation: ${pulse} 2s infinite; 
    background-color: ${APColor} ;

    `
  }}

}
`
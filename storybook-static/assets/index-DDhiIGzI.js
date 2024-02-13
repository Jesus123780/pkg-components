import{j as i}from"./jsx-runtime-DI8_P1Ft.js";import{c as d,s}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as o}from"./index-BINBIgVg.js";const n=()=>i(e,{children:i("span",{className:"loader"})}),t=()=>i(e,{children:i(p,{children:i("svg",{className:"spinner",height:"65px",viewBox:"0 0 66 66",width:"65px",xmlns:"http://www.w3.org/2000/svg",children:i("circle",{className:"path",cx:"33",cy:"33",fill:"none",r:"30",strokeLinecap:"round",strokeWidth:"6"})})})}),a=()=>i(e,{children:i(p,{children:i("svg",{className:"spinner",height:"50px",viewBox:"0 0 66 66",width:"50px",xmlns:"http://www.w3.org/2000/svg",children:i("circle",{className:"path",cx:"33",cy:"33",fill:"none",r:"30",strokeLinecap:"round",strokeWidth:"6"})})})}),c=d`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`,e=s.div`
  align-items: center;
  background-color: #7777774e;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999999;
  .loader {
    animation: shadowPulse 1s linear infinite;
    background: #fff;
    border-radius: 50%;
    box-shadow: -24px 0 #fff, 24px 0 #fff;
    box-sizing: border-box;
    display: block;
    height: 10px;
    margin: 0 auto;
    position: relative;
    width: 10px;
    z-index: 99999999;
  }

  @keyframes shadowPulse {
    33% {
      background: #fff;
      box-shadow: -24px 0 ${o}, 24px 0 #fff;
    }
    66% {
      background: ${o};
      box-shadow: -24px 0 #fff, 24px 0 #fff;
    }
    100% {
      background: #fff;
      box-shadow: -24px 0 #fff, 24px 0 ${o};
    }
  }
`,p=s.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & > div {
    position: absolute;
    border: 4px solid ${o};
    opacity: 1;
    border-radius: 50%;
    animation: ${c} 0.1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;try{n.displayName="Loading",n.__docgenInfo={description:"",displayName:"Loading",props:{}}}catch{}try{t.displayName="SpinnerColor",t.__docgenInfo={description:"",displayName:"SpinnerColor",props:{}}}catch{}try{a.displayName="SpinnerColorJust",a.__docgenInfo={description:"",displayName:"SpinnerColorJust",props:{}}}catch{}export{n as L};

import{j as s}from"./jsx-runtime-DI8_P1Ft.js";import{P as a}from"./index-B3IC6ylx.js";import{c as n,s as e}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as l}from"./index-BINBIgVg.js";const p="_loader_u7spt_1",d="_spinner_u7spt_19",c="_spin_u7spt_19",o={loader:p,spinner:d,spin:c},t=({color:i})=>s("div",{className:o.loader,children:s("div",{className:o.spinner,style:{backgroundColor:i}})});t.propTypes={color:a.string};const m=n`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`,f=n`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`,r=n`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;e.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: 20px;
  & > div {
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({color:i})=>i||l};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: ${m} 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: ${r} 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: ${r} 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: ${f} 0.6s infinite;
  }
`;try{t.displayName="LoadingButton",t.__docgenInfo={description:"",displayName:"LoadingButton",props:{color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}}}}}catch{}export{t as L};

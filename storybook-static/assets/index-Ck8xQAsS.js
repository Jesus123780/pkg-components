import{j as a,F as s}from"./jsx-runtime-DI8_P1Ft.js";import{R as m}from"./index-DPzuYzxM.js";import{s as u}from"./styled-components.browser.esm-CLTG7J5x.js";const p=({height:e,width:t="100%",margin:n,className:i,borderRadius:o,numberObject:d=1})=>a(s,{children:Array.from(Array(d).keys()).map(l=>a(c,{className:i,borderRadius:o,height:`${e}px`,margin:n||"",width:t||"",children:a("div",{className:"card-loader"})},l+1))}),r=m.memo(p),c=u.div`
  .card-loader {
    background-color: #fff;
    position: relative;
    margin: ${({margin:e})=>e||"0"};
    border-radius: ${({borderRadius:e})=>e||"2px"};
    width: ${({width:e})=>e||"auto"};
    height: ${({height:e})=>e||"150px"};
    overflow: hidden;
    padding: 0;
    &:after {
      content: '';
      background-color: #636363;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      animation-duration: 0.8s;
      animation-iteration-count: infinite;
      animation-name: loader-animate;
      animation-timing-function: linear;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0) 81%);
    }
    &:before {
      content: '';
      display: block;
      background-color: #ededed;
      border-radius: 6px;
      box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
      height: ${({height:e})=>e||"150px"};
    }
  }

  @keyframes loader-animate {
    0% {
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      transform: translate3d(100%, 0, 0);
    }
  }
`;try{r.displayName="Skeleton",r.__docgenInfo={description:"",displayName:"Skeleton",props:{height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | number"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},margin:{defaultValue:null,description:"",name:"margin",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"string"}},numberObject:{defaultValue:{value:"1"},description:"",name:"numberObject",required:!1,type:{name:"number"}}}}}catch{}export{r as S};

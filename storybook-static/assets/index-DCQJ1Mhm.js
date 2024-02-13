import{j as a,F as P,a as j}from"./jsx-runtime-DI8_P1Ft.js";import{P as t}from"./index-B3IC6ylx.js";import{r as F}from"./index-DPzuYzxM.js";import{s as y,n as r}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as M,B as S}from"./index-BINBIgVg.js";import{a as N}from"./index-RGaBZlDs.js";import{g as T}from"./index-CIjh_EDQ.js";const z="_rippleButton_1midt_1",G="_ripple_1midt_1",I="_rippleEffect_1midt_1",m={rippleButton:z,ripple:G,rippleEffect:I},p=e=>{const{label:g="",onClick:u=()=>{},loading:c=!1,style:b={},family:h="PFont-Light",disabled:$=!1,standard:q=!1,active:V,type:_="button",widthButton:v="100%",bgColor:B,color:C,margin:w,padding:E,radius:x}=e||{},o=F.useRef(null),k=s=>{const l=o.current;if(!l)return;const n=document.createElement("span"),i=l.getBoundingClientRect(),d=Math.max(i.width,i.height),R=s.pageX-i.left-d/2-window.pageXOffset,L=s.pageY-i.top-d/2-window.pageYOffset;n.style.width=n.style.height=`${d}px`,n.style.left=`${R}px`,n.style.top=`${L}px`,n.classList.add(m.ripple);const f=l.querySelector(`.${m.ripple}`);f&&f.remove(),l.appendChild(n),n.addEventListener("animationend",function(){n.remove()}),u&&u(s)};return o?j(X,{active:V,bgColor:B,className:"ripple-button",color:C,disabled:$,family:h,margin:w,onClick:k,padding:E,radius:x,ref:o,standard:q,style:b,type:_,widthButton:v,...e,children:[a("span",{id:"ripple-button-label",children:g}),c&&a(O,{children:a(N,{color:T("--color-base-white"),size:20})}),a("span",{style:c?{opacity:0}:{},children:e.children})]}):a(P,{})};p.propTypes={active:t.any,bgColor:t.any,children:t.any,color:t.any,family:t.any,label:t.any,loading:t.bool,margin:t.any,onClick:t.func,padding:t.any,radius:t.any,standard:t.any,style:t.any,type:t.any,widthButton:t.any};const O=y.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: -5px;
  padding: 1em;
  bottom: 0;
  position: absolute;

  svg {
    animation: rotator 1.4s linear infinite;
    fill: #fff;
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,X=y.button`
  &:disabled {
    background-color: ${`${M}69`} !important;
  }

  padding: ${({padding:e})=>e||"1em"};
  background-color: ${({bgColor:e})=>e||"red"};
  color: ${({color:e})=>e||S};
  font-family: ${({family:e})=>e||"PFont-Light"};
  width: ${({widthButton:e})=>e||"100%"};
  ${({margin:e})=>e&&r`margin: ${e};`}
  ${({border:e})=>e&&r`border: ${e};`}
  ${({radius:e})=>e&&r`border-radius: ${e};`}
  ${({height:e})=>e&&r`height: ${e};`}
`;try{p.displayName="RippleButton",p.__docgenInfo={description:"",displayName:"RippleButton",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"any"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void)"}},loading:{defaultValue:null,description:"",name:"loading",required:!1,type:{name:"boolean"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},family:{defaultValue:null,description:"",name:"family",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},standard:{defaultValue:null,description:"",name:"standard",required:!1,type:{name:"boolean"}},active:{defaultValue:null,description:"",name:"active",required:!1,type:{name:"any"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},widthButton:{defaultValue:null,description:"",name:"widthButton",required:!1,type:{name:"string"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!1,type:{name:"string"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},margin:{defaultValue:null,description:"",name:"margin",required:!1,type:{name:"string"}},padding:{defaultValue:null,description:"",name:"padding",required:!1,type:{name:"string"}},radius:{defaultValue:null,description:"",name:"radius",required:!1,type:{name:"string"}}}}}catch{}export{p as R};

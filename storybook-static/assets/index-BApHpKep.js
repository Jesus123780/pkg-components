import"./index-IkbvFkD4.js";import{j as t,a as y,F as pe}from"./jsx-runtime-DI8_P1Ft.js";import{P as a}from"./index-B3IC6ylx.js";import{s as i,n as _,c as ua}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as V,a as je,B as A,d as E,e as M,b as ce,g as da,E as oa,c as z,h as sa}from"./index-BINBIgVg.js";import"./InputHooks-4WUCFFW9.js";import{r as u}from"./index-DPzuYzxM.js";import"./index-CU9ER8A5.js";import{z as Ye,a as pa,c as Ue,A as ca,B as ma,C as Ge,b as fa}from"./index-RGaBZlDs.js";import{O as ya}from"./index-DrTIMpa1.js";import"./index-CtOxyrGX.js";import"./index-CoQ8oC9_.js";import"./index-B8kz4GjI.js";import"./Carrusel3d-DBB5Zpdd.js";import"./index-CmpceiV9.js";import"./index-BbsIFNfG.js";import"./index-DgJ0QmxL.js";import"./index-CCiAL1h3.js";import"./index-BntQnSi7.js";import"./index-54L18hga.js";import"./index-BGQ0fQPX.js";import"./index-DpedGZ19.js";import"./index-scbfCFkw.js";import"./index-CEcSYNe0.js";import"./index-DVGXaJdU.js";import"./index-D-dsD9vT.js";import{g as Fe}from"./index-CIjh_EDQ.js";import"./index-Ck8xQAsS.js";import"./index-CHj4kU1t.js";import"./index-3NUpt0LR.js";import"./index-C-73uXbr.js";const x=16,We=x/2,B=3,O=B/2,Pe=(x-B)/2,ga=i.input`
  /* THUMB */
  width: 100%;
  background: transparent;
  margin: ${Pe}px 0;
  color: #0687df;
  cursor: pointer;
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: ${B}px;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${O}px;
    border: none;
  }
  ::-webkit-slider-thumb {
    box-shadow: none;
    border: none;
    height: ${x}px;
    width: ${x}px;
    border-radius: ${We}px;
    background: #0687df;
    -webkit-appearance: none;
    margin-top: -${Pe}px;
    z-index: 1;
    position: relative;
  }
  /* :focus::-webkit-slider-runnable-track {
    Not using right now
    background: red;
  } */
  ::-moz-range-track {
    width: 100%;
    height: ${B}px;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${O}px;
    border: none;
  }
  ::-moz-range-thumb {
    box-shadow: none;
    border: none;
    height: ${x}px;
    width: ${x}px;
    border-radius: ${We}px;
    background: #0687df;
    z-index: 1;
    position: relative;
  }
  ::-ms-track {
    width: 100%;
    height: ${B}px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: ${O}px;
    box-shadow: none;
  }
  ::-ms-fill-upper {
    background: #d4d4d4; /* hard coded since edge will not use css vars in these psuedo elems */
    border: none;
    border-radius: ${O}px;
    box-shadow: none;
  }
  ::-ms-thumb {
    /* Need to be a little bit smaller for edge */
    margin-top: 1px;
    box-shadow: none;
    border: none;
    height: ${x-2}px;
    width: ${x-2}px;
    border-radius: ${(x-2)/2}px;
    background: #0687df;
    z-index: 1;
    position: relative;
  }
  :focus::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.2);
  }
  :focus::-ms-fill-upper {
    background: #d4d4d4; /* hard coded since edge will not use css vars in these psuedo elems */
  }
`,ha=i.div`
  position: absolute;
  pointer-events: none;
  background-color: #0687df;
  top: 50%;
  border-radius: ${O}px;
  left: 0px;
  transform: translate3d(0, -50%, 0);
  height: ${B}px;
`,_a=i.div`
  line-height: 0; /* helps get browsers all in line */
  display: inline-block;
  position: relative;
`,ba=i.div`
  display: flex;
  align-items: center;
`,va=i.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 75px;
  font-size: var(--font-size-base);

  sub,
  sup {
    vertical-align: baseline;
  }
`,qa=i.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translate3d(0, -50%, 0);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 0;
`,Va=i.li`
  height: ${x/2}px;
  width: ${x/2}px;
  border-radius: ${x/4}px;
  background: ${e=>e.highlight?"#0687df":"#d4d4d4"};
  list-style: none;
`,G=({value:e,min:r,max:n,step:l,onChange:d,id:f,label:g,fraction:b,description:o,margins:v=[1,2],...c})=>{const w=v.map((p,T)=>{let C;return T<=e&&(C=!0),t(Va,{highlight:C},p.value)});return y(ba,{children:[g&&t("output",{children:t(va,{children:y("span",{children:[o||null," ",b]})})}),y(_a,{children:[t(ha,{style:{width:`${(e-r)/(n-r)*100}%`}}),t(ga,{"aria-valuemax":n,"aria-valuemin":r,"aria-valuenow":e,id:f,max:n,min:r,onChange:p=>{d(Number(p.target.value))},step:l,type:"range",value:e,...c}),t(qa,{children:g&&w})]})]})};G.defaultProps={style:{}};G.propTypes={description:a.any,fraction:a.any,id:a.any,label:a.any,margins:a.array,max:a.number.isRequired,min:a.number.isRequired,onChange:a.func,step:a.number.isRequired,style:a.object,value:a.number.isRequired};try{G.displayName="InputCustomRange",G.__docgenInfo={description:"",displayName:"InputCustomRange",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},min:{defaultValue:null,description:"",name:"min",required:!0,type:{name:"any"}},max:{defaultValue:null,description:"",name:"max",required:!0,type:{name:"any"}},step:{defaultValue:null,description:"",name:"step",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},fraction:{defaultValue:null,description:"",name:"fraction",required:!0,type:{name:"any"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"any"}},margins:{defaultValue:{value:"[1, 2]"},description:"",name:"margins",required:!1,type:{name:"number[]"}}}}}catch{}const me=({placeholder:e,borderRadius:r,value:n,onChange:l,onFocus:d,inputText:f,type:g,color:b,...o})=>t(xa,{...o,borderRadius:r,color:b,inputText:f,onChange:l?v=>l(v.target.value):void 0,onFocus:d,placeholder:e||"",type:g||"text",value:n||""});me.propTypes={borderRadius:a.any,color:a.any,inputText:a.any,onChange:a.func,onFocus:a.any,placeholder:a.string,type:a.string,value:a.string};const xa=i.input`
    width: 100%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
    outline: none;
    border: none;
    ${e=>e.margin&&_`margin: ${e.margin};`}
    ${e=>e.padding&&_`padding: ${e.padding};`}
    ${e=>e.borderRadius&&_`border-radius: ${e.borderRadius};`}
    ${e=>e.card&&_`
    padding: 25px;
    border: 2px solid ${V};
    `}
    ${e=>e.inputText&&_`
        font-weight: 500;
        margin: 0.625rem 0 0;
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({color:r})=>r};
        outline: none;
        /* padding: 5px; */
        border: 2px solid transparent;
    `}
    ${e=>e.inputText&&_`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({color:r})=>r};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}
    ${e=>e.checkbox&&_`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`;try{me.displayName="InputHookProducts",me.__docgenInfo={description:"",displayName:"InputHookProducts",props:{placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"any"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!0,type:{name:"any"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!0,type:{name:"any"}},inputText:{defaultValue:null,description:"",name:"inputText",required:!0,type:{name:"any"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"any"}}}}}catch{}const Ca=e=>{const r=u.useRef();return u.useEffect(()=>{r.current=e},[e]),r.current},X=e=>{const{focus:r,autoFocus:n,...l}=e,d=u.useRef(null),f=Ca(!!r);return u.useLayoutEffect(()=>{d.current&&(r&&n&&d.current.focus(),r&&n&&r!==f&&(d.current.focus(),d.current.select()))},[n,r,f]),t(K,{children:t(wa,{ref:d,...l})})};X.propTypes={autoFocus:a.any,focus:a.any};const K=i.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`,wa=i.input`
    width: 60px;
    height: 50px;
    height: 40px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    text-align: center;
`,Ia=u.memo(X);try{X.displayName="SingleOTPInputComponent",X.__docgenInfo={description:"",displayName:"SingleOTPInputComponent",props:{}}}catch{}try{K.displayName="Content",K.__docgenInfo={description:"",displayName:"Content",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const Z=e=>{const{length:r,isNumberInput:n,autoFocus:l,disabled:d,onChangeOTP:f,arrayCode:g,inputClassName:b,inputStyle:o,...v}=e,[c,w]=u.useState(0),[p,T]=u.useState(g||Array(r).fill("")),C=u.useCallback(m=>{const s=m.join("");f(s)},[f]),q=u.useCallback(m=>{let s=m;return n?!s||/\d/.test(s)?s:"":s},[n]),k=u.useCallback(m=>{const s=[...p];s[c]=m[0]||"",T(s),C(s)},[c,C,p]),N=u.useCallback(m=>{const s=Math.max(Math.min(r-1,m),0);w(s)},[r]),H=u.useCallback(()=>{N(c-1)},[c,N]),$=u.useCallback(()=>{N(c+1)},[c,N]),Q=u.useCallback(m=>()=>{N(m)},[N]),S=u.useCallback(m=>{const s=q(m.currentTarget.value);if(!s){m.preventDefault();return}k(s),$()},[k,$,q]),ee=u.useCallback(()=>{w(-1)},[]),ae=u.useCallback(m=>{switch(m.key){case"Backspace":case"Delete":{m.preventDefault(),p[c]?k(""):H();break}case"ArrowLeft":{m.preventDefault(),H();break}case"ArrowRight":{m.preventDefault(),$();break}case" ":{m.preventDefault();break}}},[c,k,$,H,p]),F=u.useCallback(m=>{m.preventDefault();const s=m.clipboardData.getData("text/plain").trim().slice(0,r-c).split("");if(s){const W=[...p];let P=0;for(let I=c;I<r;I++)s[P]&&(W[I]=q(s[P])||"",P++);T(W),C(W),w(Math.min(c+P,r-1))}},[c,q,C,r,p]);return t(K,{...v,children:Array(r).fill("").map((m,s)=>t(Ia,{autoFocus:l,className:b,disabled:d,focus:c===s,onBlur:ee,onChange:S,onFocus:Q(s),onKeyDown:ae,onPaste:F,style:o,value:p&&p[s]},`SingleInput-${s}`))})};Z.propTypes={arrayCode:a.func,autoFocus:a.any,disabled:a.any,inputClassName:a.any,inputStyle:a.any,isNumberInput:a.any,length:a.number,onChangeOTP:a.func};const Oe=u.memo(Z);try{Z.displayName="InputOTPHookMemo",Z.__docgenInfo={description:"",displayName:"InputOTPHookMemo",props:{}}}catch{}try{Oe.displayName="InputOTPHook",Oe.__docgenInfo={description:"",displayName:"InputOTPHook",props:{}}}catch{}const Na="_searchIcon_198tc_1",Ta="_formContainerOrders_198tc_11",ka="_quickFilters_198tc_19",$a="_searchContainer_198tc_41",Sa="_searchInput_198tc_67",ue={searchIcon:Na,formContainerOrders:Ta,quickFilters:ka,searchContainer:$a,searchInput:Sa},fe=({dataForm:e={search:""},placeholder:r="",handleChange:n=()=>{},...l})=>y("div",{className:ue.searchContainer,children:[t("input",{className:ue.searchInput,name:"search",onChange:n,placeholder:r,type:"text",value:e.search,...l}),t(Ye,{className:ue.searchIcon,color:V,size:20})]});fe.propTypes={dataForm:a.object,handleChange:a.func,placeholder:a.string};try{fe.displayName="InputQuery",fe.__docgenInfo={description:"",displayName:"InputQuery",props:{dataForm:{defaultValue:{value:`{\r
    search: ''\r
  }`},description:"",name:"dataForm",required:!1,type:{name:"{ search: string; }"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},handleChange:{defaultValue:{value:"() => { return }"},description:"",name:"handleChange",required:!1,type:{name:"(() => void)"}}}}}catch{}const ze=i.svg`
  width: 30px;
  height: 30px;
  position: absolute;
`,Le=i.div`
  border-radius: 50%;
  position: relative;
  background: hsl(0, 0%, 100%);
  &:before {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid hsla(218, 57%, 87%, 1);
    top: 30%;
    left: 50%;
  }
`,Ee=i.circle.attrs(e=>({strokeDasharray:`${e.dashValue}px 88px`}))`
  r: 14;
  cx: 15;
  cy: 15;
  stroke: hsla(254, 85%, 55%, 1);
  stroke-width: 2px;
  fill: none;
  transform: rotate(-95deg);
  transform-origin: 50% 50%;
`,ye=i.div`
  position: relative;
`,Y="36px",R=31,Xe="10px",ge="#edf5f9",Me=V,de="#ddd",oe="#ccc",Qe=`linear-gradient(to bottom, ${ge}, ${ge}) 100% 50% / 100% ${Xe} no-repeat transparent`,se=`linear-gradient(to bottom, ${Me}, ${Me}) 100% 50% / 100% ${Xe} no-repeat transparent`,Da=(e,r)=>{let n=18,l=`${n}px 0 0 ${r} ${e}`;for(;n<706;n++)l=`${l}, ${n}px 0 0 ${r} ${e}`;return l},he=i.input`
  overflow: hidden;
  display: block;
  appearance: none;
  max-width: 700px;
  width: 100%;
  margin: 0;
  height: ${Y};
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: ${Y};
    border-radius: 10px;
    background: ${se};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: ${R}px;
    width: ${R}px;
    background: ${de};
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${Da(ge,"-10px")};
    transition: background-color 150ms;
  }

  &::-moz-range-track,
  &::-moz-range-progress {
    width: 100%;

    height: ${Y};
    background: ${Qe};
  }

  &::-moz-range-progress {
    background: ${se};
  }

  &::-moz-range-thumb {
    appearance: none;
    margin: 0;
    height: ${R};
    width: ${R};
    background: ${de};
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
  }

  &::-ms-track {
    width: 100%;
    height: ${Y};
    border: 0;

    /* color needed to hide track marks */
    color: transparent;
    background: transparent;
  }

  &::-ms-fill-lower {
    background: ${se};
  }

  &::-ms-fill-upper {
    background: ${Qe};
  }

  &::-ms-thumb {
    appearance: none;
    height: ${R};

    width: ${R};
    background: ${de};
    border-radius: 100%;
    border: 0;

    transition: background-color 150ms;
    /* IE Edge thinks it can support -webkit prefixes */
    top: 0;
    margin: 0;
    box-shadow: none;
  }

  &:hover,
  &:focus {
    &::-webkit-slider-thumb {
      background-color: ${oe};
    }
    &::-moz-range-thumb {
      background-color: ${oe};
    }
    &::-ms-thumb {
      background-color: ${oe};
    }
  }
  &::-webkit-slider-thumb {
    border-radius: 50% !important;
    border: 2px solid hsl(0, 0%, 100%);
  }
  width: ${({width:e})=>e||"100%"};
`;try{ze.displayName="Svg",ze.__docgenInfo={description:"",displayName:"Svg",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Le.displayName="Progress",Le.__docgenInfo={description:"",displayName:"Progress",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Ee.displayName="Circle",Ee.__docgenInfo={description:"",displayName:"Circle",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{ye.displayName="ContainerRange",ye.__docgenInfo={description:"",displayName:"ContainerRange",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{he.displayName="Input",he.__docgenInfo={description:"",displayName:"Input",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const _e=({min:e=0,max:r=100,value:n=0,label:l,onChange:d,width:f})=>{const[g,b]=u.useState(n),v=600-15,c=(g-e)/(r-e),w=-3,p=q=>{b(q.target.value),d(q)},[T,C]=u.useState(0);return u.useEffect(()=>{C(n/r*88)},[r,n]),y(ye,{children:[!1,y("div",{className:"range__ballon",style:{left:v*c+w||0},children:[y("span",{className:"range__ballon__label",children:[l," "," "]}),t("span",{className:"range__ballon__value",children:`$  ${g}`})]}),t(he,{max:r,min:e,onChange:q=>d?p(q):b(q.target.value),type:"range",value:g,width:f})]})};_e.propTypes={label:a.string,max:a.number,min:a.number,onChange:a.func,value:a.number,width:a.any};try{_e.displayName="Range",_e.__docgenInfo={description:"",displayName:"Range",props:{min:{defaultValue:{value:"0"},description:"",name:"min",required:!1,type:{name:"number"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number"}},value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"number"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}const be=(e,r,n)=>e?Array.isArray(r)?r.map(l=>n&&e[n]?e[n][l]:e[l]).join(" "):e[r]:"",Ra=({value:e,setValueInput:r,options:n,optionName:l,accessor:d,setNewOption:f})=>{r(e);const g=e.toUpperCase(),b=n.filter(o=>{var v;return(v=be(o,l,d))==null?void 0:v.toUpperCase().includes(g)});f(b)},Ba=({v:e,id:r,name:n,refSelect:l,setSelect:d=()=>{},onChange:f=()=>{}})=>{d(!1),f({target:{name:n,value:e[r]}},!e[r],l)},Aa=(e,r,n)=>e==null?void 0:e.find(l=>l[r]===n),ve=i.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  align-items: center;
  min-width: ${({minWidth:e})=>e||"auto"};
  width: ${({width:e})=>e||"100%"};
  border-radius: ${({radius:e})=>e||"0px"};
  ${({padding:e})=>!!e&&_`
        padding: ${e};
      `}
  position: relative;
`,qe=i.button`
  position: relative;
  display: flex;
  align-items: center;
  text-align: left;
  height: 40px;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: rgb(57, 58, 61);
  background-color: rgb(212, 215, 220);
  &:hover {
    background-color: #fcebea;
    color: ${je};
  }
  &:hover > svg {
    fill: ${A};
  }
`,Ve=i.label`
  position: absolute;
  text-align: left;
  transition: 0.2s ease;
  font-size: ${({value:e})=>e?"1rem":"16px"};
  top: ${({value:e,topTitle:r})=>e?"-8px":r||"15px"};
  left: ${({value:e})=>e?"-8px":"10px"};
  color: ${({value:e,error:r})=>e?E:r?V:M};
  font-family: PFont-Light;
  pointer-events: none;
  white-space: nowrap;
  width: min-content;
  background-color: ${({value:e})=>e?A:"transparent"};
  padding-left: ${({value:e})=>e?"16px":"0px"};
  @media only screen and (max-width: 960px) {
    top: ${({value:e})=>e?"0px":"25px"};
  }
  ${e=>e.noLabel&&_`
        top: 13px;
        font-size: 15px;
        color: ${je};
        font-family: PFont-Regular;
        background-color: transparent;
      `}
  z-index: 9;
`,xe=i.div`
  position: absolute;
  top: 98%;
  z-index: 4;
  left: 0;
  transform-origin: 200% 50%;
  transition: 0.2s ease;
  z-index: 9999999 !important;
  box-shadow: hsl(0, 0%, 80%);
  transform-origin: top left;
  ${({active:e})=>e?_`
          display: block;
        `:_`
          display: none;
        `}
`,L=i.div`
  position: absolute;
  display: block;
  right: 5px;
  top: -20px;
  background-color: ${V};
  padding: 0 10px;
  border-radius: 2px;
  z-index: 10;
  font-size: 11px;
  color: ${A};
  &::after,
  &::before {
    top: 100%;
    left: 90%;
    border: solid transparent;
    content: '';
    position: absolute;
    pointer-events: none;
  }
  &::after {
    border-top-color: ${V};
    border-width: 4px;
  }
  &::before {
    border-top-color: ${V};
    border-width: 5px;
    margin-left: -1px;
  }
`,Ha=ua`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`,J=i.div`
  position: absolute;
  right: 8px;
  top: 30%;
  width: min-content;
  pointer-events: none;

  ${({loading:e})=>e&&_`
      & > svg {
        animation: ${Ha} 1s linear infinite;
      }
    `}
`,Ce=i.button`
  position: relative;
  display: block;
  background-color: ${({bgColor:e,disabled:r,error:n})=>r?"rgba(239, 239, 239, 0.3)":n?A:e||"var(--color-base-white)"};
  border: ${({border:e})=>e||`1px solid ${M}`};
  text-align: left;
  height: ${({height:e})=>e||"50px"};
  white-space: nowrap;
  border-radius: 2px;
  outline: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  color: ${({color:e})=>e||E};
  width: ${({width:e})=>e||"100%"};
  &:hover {
    color: ${V};
    cursor: ${({disabled:e})=>e?"no-drop":"pointer"};
    ${({hover:e})=>e&&_`
          color: ${ce};
        `}
  }
  &:hover > ${J} {
    color: ${V};
    cursor: ${({disabled:e})=>e?"no-drop":"pointer"};
    ${({hover:e})=>e&&_`
          color: ${ce};
        `}
  }
  &:hover ~ ${L} {
    display: block;
  }
  &:focus > svg {
    fill: ${da};
  }
`,we=i.button`
  position: relative;
  display: block;
  background-color: ${({bgColor:e,disabled:r,error:n})=>r?"rgba(239, 239, 239, 0.3)":n?oa:e||"#fff"};
  outline: 0;
  border-bottom: ${({border:e})=>e||`1px solid ${M}`};
  text-align: left;
  height: ${({height:e})=>e||"45px"};
  white-space: nowrap;
  border-radius: 2px;
  /* text-overflow: ellipsis;
    overflow: hidden; */
  font-family: PFont-Light;
  color: ${({color:e})=>e||E};
  width: ${({width:e})=>e||"100%"};
  &:hover {
    background-color: ${"#f4f4f4"};
    color: ${V};
    cursor: ${({disabled:e})=>e?"no-drop":"pointer"};
    ${({hover:e})=>e&&_`
          color: ${ce};
        `}
  }
  &:hover ~ ${L} {
    display: block;
  }
  &:focus {
    border: 1px solid ${V};
  }
`,Ie=i.div`
  bottom: ${({bottom:e})=>e||"0"};
  top: ${({top:e,search:r})=>e&&r?"0%":"0"};
  width: 100%;
  min-width: ${e=>e.fullName?"min-content":"auto"};
  background-color: ${A};
  border: 1px solid #cccccc50;
  overflow-y: auto;
  height: ${({heightBox:e,search:r})=>e&&r?"min-content":"auto"};
  z-index: 9999999888;
  max-height: 300px;
`,Ne=i.div`
  bottom: ${({search:e})=>e?"-20px":"0"};
`,Te=i.label`
  font-size: 14px;
  color: ${E};
  ${e=>e.noLabel&&_`
        display: none;
      `}
`,ke=i.span`
  font-size: 20px;
  color: ${z};
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`,$e=i.input`
  width: 100%;
  margin: 0;
  padding: 20px 8px;
  outline: none;
  border: 1px solid #ccc;
  font-size: var(--font-size-base);
`;try{ve.displayName="BoxSelect",ve.__docgenInfo={description:"",displayName:"BoxSelect",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{qe.displayName="ButtonAction",qe.__docgenInfo={description:"",displayName:"ButtonAction",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Ve.displayName="LabelInput",Ve.__docgenInfo={description:"",displayName:"LabelInput",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{xe.displayName="ContainerItems",xe.__docgenInfo={description:"",displayName:"ContainerItems",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{L.displayName="Tooltip",L.__docgenInfo={description:"",displayName:"Tooltip",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{J.displayName="IconSel",J.__docgenInfo={description:"",displayName:"IconSel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Ce.displayName="MainButton",Ce.__docgenInfo={description:"",displayName:"MainButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{we.displayName="CustomButtonS",we.__docgenInfo={description:"",displayName:"CustomButtonS",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Ie.displayName="BoxOptions",Ie.__docgenInfo={description:"",displayName:"BoxOptions",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Ne.displayName="ContentBox",Ne.__docgenInfo={description:"",displayName:"ContentBox",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Te.displayName="SpanText",Te.__docgenInfo={description:"",displayName:"SpanText",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{ke.displayName="TextNotResult",ke.__docgenInfo={description:"",displayName:"TextNotResult",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{$e.displayName="InputText",$e.__docgenInfo={description:"",displayName:"InputText",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const Se=({options:e=[],beforeLabel:r="",noLabel:n=!1,disabled:l=!1,id:d="",icon:f=!0,loading:g=!1,sideLabel:b="",name:o="",action:v=!1,optionName:c="",topTitle:w="15px",value:p="",border:T,width:C="100%",search:q=" ",title:k="",padding:N="",margin:H="",heightBody:$,minWidth:Q="",error:S=!1,required:ee=!1,overLine:ae=!1,accessor:F,fullName:m,onChange:s=()=>{},handleClickAction:W=()=>{}})=>{const[I,D]=u.useState(!1),[Ae,Ke]=u.useState(0),[re,Ze]=u.useState(),[Je,ea]=u.useState(0),[ne,te]=u.useState(!1),He=u.useRef(null),[aa,ra]=u.useState(!1),le=u.useRef(null);u.useEffect(()=>{const h=ia=>{le.current&&!le.current.contains(ia.target)&&D(!1)},j=()=>{D(!1)};return document.addEventListener("mousedown",h),window.addEventListener("blur",j),()=>{document.removeEventListener("mousedown",h),window.removeEventListener("blur",j)}},[]);const na=h=>{Ke(h.offsetTop+Je),ra(h)},ta=h=>{h.preventDefault(),D(!I),setTimeout(()=>te(e),500)},la=()=>D(!1),ie=Aa(e,d,p);return u.useEffect(()=>{te(e)},[e]),u.useEffect(()=>{q&&I&&He.current.focus()},[I,q]),y("div",{ref:le,style:{position:"relative"},children:[t(Ve,{error:S,noLabel:n,topTitle:w,value:p,children:k}),y(ve,{margin:H,minWidth:Q,padding:N,ref:h=>!!h&&na(h),width:C,children:[ae&&t(ya,{bgColor:`${sa}56`,onClick:()=>D(!1),show:I}),y(Ce,{border:T,color:ie?E:"#757575",disabled:l,error:S,height:$,minWidth:Q,onClick:ta,type:"button",value:p,children:[y(Te,{noLabel:n,children:[be(ie,c,F)," ",ie&&b]}),f&&t(J,{loading:g,style:{top:"13px",width:"20px",right:"15px"},children:g?t(pa,{color:V,size:"15px"}):t(Ue,{color:S?A:z,size:"15px"})})]}),S&&t(L,{children:"Este campo es requerido"}),y(xe,{active:I,top,children:[q&&t(pe,{children:t($e,{onChange:h=>{const j=h.target.value;Ra({value:j,options:e,optionName:c,accessor:F,setValueInput:Ze,setNewOption:te})},placeholder:"Buscar",ref:He,value:re||""})}),v&&y(qe,{onClick:()=>W(),type:"button",children:[t(ca,{color:V,size:"15px"}),"   "," Añadir nuevo ",t(pe,{children:!ne.length&&re})]}),t(Ne,{search:q,style:{zIndex:"9999999"},children:t(Ie,{autoHeight:!0,autoHeightMax:"200px",autoHeightMin:0,autoHideDuration:700,autoHideTimeout:1500,bottom:Ae>100,fullName:m,onBlur:la,ref:h=>ea(h==null?void 0:h.offsetHeight),search:q,style:{width:"100%",overflowY:"auto"},top:Ae<100,children:ne.length>0?ne.map(h=>y(we,{onClick:()=>Ba({v:h,id:d,name:o,refSelect:aa,setSelect:D,onChange:s}),option:!0,type:"button",children:[r," ",`${be(h,c,F)}`," ",b]},h[d])):re&&y(ke,{children:[t(ma,{size:"40px"}),"  No hay resultados."]})})})]}),t("input",{"data-required":ee,id:d,name:o,type:"hidden",value:p||""}),t(Ge,{color:V,size:20,style:{position:"absolute",right:5,bottom:10,opacity:0,pointerEvents:"none"}})]})]})};Se.propTypes={accessor:a.any,action:a.bool,beforeLabel:a.string,border:a.any,disabled:a.bool,error:a.bool,fullName:a.any,handleClickAction:a.func,heightBody:a.any,icon:a.bool,id:a.string,loading:a.bool,margin:a.string,minWidth:a.string,name:a.string,noLabel:a.bool,onChange:a.func,optionName:a.string,options:a.array,overLine:a.bool,padding:a.string,required:a.bool,search:a.string,sideLabel:a.string,title:a.string,topTitle:a.string,value:a.string,width:a.string};try{Se.displayName="NewSelect",Se.__docgenInfo={description:"",displayName:"NewSelect",props:{options:{defaultValue:{value:"[]"},description:"",name:"options",required:!1,type:{name:"never[]"}},beforeLabel:{defaultValue:{value:""},description:"",name:"beforeLabel",required:!1,type:{name:"string"}},noLabel:{defaultValue:{value:"false"},description:"",name:"noLabel",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},icon:{defaultValue:{value:"true"},description:"",name:"icon",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},sideLabel:{defaultValue:{value:""},description:"",name:"sideLabel",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},action:{defaultValue:{value:"false"},description:"",name:"action",required:!1,type:{name:"boolean"}},optionName:{defaultValue:{value:""},description:"",name:"optionName",required:!1,type:{name:"string"}},topTitle:{defaultValue:{value:"15px"},description:"",name:"topTitle",required:!1,type:{name:"string"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},search:{defaultValue:{value:""},description:"",name:"search",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},margin:{defaultValue:{value:""},description:"",name:"margin",required:!1,type:{name:"string"}},heightBody:{defaultValue:null,description:"",name:"heightBody",required:!0,type:{name:"any"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},overLine:{defaultValue:{value:"false"},description:"",name:"overLine",required:!1,type:{name:"boolean"}},accessor:{defaultValue:null,description:"",name:"accessor",required:!0,type:{name:"any"}},fullName:{defaultValue:null,description:"",name:"fullName",required:!0,type:{name:"any"}},onChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(() => void)"}},handleClickAction:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleClickAction",required:!1,type:{name:"(() => void)"}}}}}catch{}const De=({disabled:e=!1,setTags:r,tags:n,width:l,...d})=>{const f=u.useRef(),g=o=>{r([...n.filter((v,c)=>c!==o)])},b=o=>{o.which===13&&o.preventDefault(),o.stopPropagation(),o.target.value!==""&&(r([...n,o.target.value]),d.selectedTags([...n,o.target.value]),o.target.value="")};return t(Wa,{block:e,disabled:e,onClick:()=>f.current.focus(),width:l,children:t(za,{id:"tags",width:l,children:y(pe,{children:[n==null?void 0:n.map((o,v)=>y(Fa,{children:[t(La,{children:o}),y(Oa,{onClick:()=>!e&&g(v),children:[" ",t(Ge,{size:"11px"})," "]})]},v)),t(Pa,{disabled:e,onKeyDown:o=>o.key==="Enter"?b(o):null,placeholder:"Press enter to add tags",ref:f,type:"text"})]})})})};De.propTypes={disabled:a.any,setTags:a.func,selectedTags:a.func,tags:a.shape({filter:a.func,map:a.func}),width:a.any};const Fa=i.div`
  border: .5px solid ${`${z}69`};
  color: ${z};
  display: flex;
  place-content: center;
  margin: 0px 2px;
  padding: 0px 2px;
  border-radius: 20px;
  width: fit-content;
  justify-content: center;
  vertical-align: middle;
  align-items: center; 

`,Wa=i.div`
    display: block;
    flex-direction: ${({direction:e})=>e||"row"};
    position: relative;
    ${({width:e})=>e&&_`width: ${e};`}
    box-sizing: border-box;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    ${e=>e.block&&_`
        background-color: ${M};
        cursor: no-drop;
    `}
 
`,Pa=i.input`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0 2px;
    width: fit-content;
    max-width: inherit;
    display: inline-block;
    max-height: 20px;
    font-size: var(--font-size-base);
    &:disabled {
      cursor: no-drop;
      background-color: ${M};
    }
`,Oa=i.div`
    padding: 2px;
    cursor: pointer;
`,za=i.div`
    display: flex;
    padding: 5px;
    flex-wrap: wrap; 
    line-height: 20px;
    flex-direction: row;
    cursor: text;
    align-items: center;
    ${({maxHeight:e})=>e&&_`max-height: ${e};`}


`,La=i.span`
    color: ${z};
    font-size: 10px;
    font-weight: normal;
    margin: 1px;
    padding: 1px;
    border-radius: 0;
    min-width: max-content;
  
`;try{De.displayName="InputTags",De.__docgenInfo={description:"",displayName:"InputTags",props:{disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},setTags:{defaultValue:null,description:"",name:"setTags",required:!0,type:{name:"any"}},tags:{defaultValue:null,description:"",name:"tags",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{InputHookProducts.displayName="InputHookProducts",InputHookProducts.__docgenInfo={description:"",displayName:"InputHookProducts",props:{placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"any"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!0,type:{name:"any"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!0,type:{name:"any"}},inputText:{defaultValue:null,description:"",name:"inputText",required:!0,type:{name:"any"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"any"}}}}}catch{}try{InputCustomRange.displayName="InputCustomRange",InputCustomRange.__docgenInfo={description:"",displayName:"InputCustomRange",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},min:{defaultValue:null,description:"",name:"min",required:!0,type:{name:"any"}},max:{defaultValue:null,description:"",name:"max",required:!0,type:{name:"any"}},step:{defaultValue:null,description:"",name:"step",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},fraction:{defaultValue:null,description:"",name:"fraction",required:!0,type:{name:"any"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"any"}},margins:{defaultValue:{value:"[1, 2]"},description:"",name:"margins",required:!1,type:{name:"number[]"}}}}}catch{}try{InputHooks.displayName="InputHooks",InputHooks.__docgenInfo={description:"",displayName:"InputHooks",props:{autoComplete:{defaultValue:{value:"off"},description:"",name:"autoComplete",required:!1,type:{name:"string"}},border:{defaultValue:{value:""},description:"",name:"border",required:!1,type:{name:"string"}},Cc:{defaultValue:null,description:"",name:"Cc",required:!0,type:{name:"any"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!0,type:{name:"any"}},dataForm:{defaultValue:{value:"{}"},description:"",name:"dataForm",required:!1,type:{name:"{}"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}},email:{defaultValue:{value:"false"},description:"",name:"email",required:!1,type:{name:"boolean"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},labelTop:{defaultValue:{value:""},description:"",name:"labelTop",required:!1,type:{name:"string"}},fontSize:{defaultValue:{value:"14px"},description:"",name:"fontSize",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},labelColor:{defaultValue:null,description:"",name:"labelColor",required:!0,type:{name:"any"}},letters:{defaultValue:null,description:"",name:"letters",required:!0,type:{name:"any"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},maxWidth:{defaultValue:{value:""},description:"",name:"maxWidth",required:!1,type:{name:"string"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},nit:{defaultValue:{value:"false"},description:"",name:"nit",required:!1,type:{name:"boolean"}},numeric:{defaultValue:{value:"false"},description:"",name:"numeric",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:`(e) => {\r
    return e\r
  }`},description:"",name:"onChange",required:!1,type:{name:"((e: any) => any)"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},paddingInput:{defaultValue:{value:""},description:"",name:"paddingInput",required:!1,type:{name:"string"}},pass:{defaultValue:null,description:"",name:"pass",required:!0,type:{name:"any"}},passConfirm:{defaultValue:null,description:"",name:"passConfirm",required:!0,type:{name:"any"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},radius:{defaultValue:{value:""},description:"",name:"radius",required:!1,type:{name:"string"}},range:{defaultValue:null,description:"",name:"range",required:!0,type:{name:"any"}},reference:{defaultValue:null,description:"",name:"reference",required:!0,type:{name:"any"}},required:{defaultValue:null,description:"",name:"required",required:!0,type:{name:"any"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},messageError:{defaultValue:{value:""},description:"",name:"messageError",required:!1,type:{name:"string"}},type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"string"}},typeTextarea:{defaultValue:{value:"false"},description:"",name:"typeTextarea",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},onFocus:{defaultValue:{value:"() => { return }"},description:"",name:"onFocus",required:!1,type:{name:"(() => void)"}},onInvalid:{defaultValue:{value:"() => { return }"},description:"",name:"onInvalid",required:!1,type:{name:"(() => void)"}},setDataValue:{defaultValue:{value:"() => { return }"},description:"",name:"setDataValue",required:!1,type:{name:"(() => void)"}},onBlur:{defaultValue:{value:"() => { return }"},description:"",name:"onBlur",required:!1,type:{name:"(() => void)"}}}}}catch{}try{PhoneInput.displayName="PhoneInput",PhoneInput.__docgenInfo={description:"",displayName:"PhoneInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:"(value) => { return value }"},description:"",name:"onChange",required:!1,type:{name:"((value: any) => any)"}},defaultCountry:{defaultValue:{value:"CO"},description:"",name:"defaultCountry",required:!1,type:{name:"string"}}}}}catch{}try{InputQuery.displayName="InputQuery",InputQuery.__docgenInfo={description:"",displayName:"InputQuery",props:{dataForm:{defaultValue:{value:`{\r
    search: ''\r
  }`},description:"",name:"dataForm",required:!1,type:{name:"{ search: string; }"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},handleChange:{defaultValue:{value:"() => { return }"},description:"",name:"handleChange",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Range.displayName="Range",Range.__docgenInfo={description:"",displayName:"Range",props:{min:{defaultValue:{value:"0"},description:"",name:"min",required:!1,type:{name:"number"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number"}},value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"number"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{NewSelect.displayName="NewSelect",NewSelect.__docgenInfo={description:"",displayName:"NewSelect",props:{options:{defaultValue:{value:"[]"},description:"",name:"options",required:!1,type:{name:"never[]"}},beforeLabel:{defaultValue:{value:""},description:"",name:"beforeLabel",required:!1,type:{name:"string"}},noLabel:{defaultValue:{value:"false"},description:"",name:"noLabel",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},icon:{defaultValue:{value:"true"},description:"",name:"icon",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},sideLabel:{defaultValue:{value:""},description:"",name:"sideLabel",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},action:{defaultValue:{value:"false"},description:"",name:"action",required:!1,type:{name:"boolean"}},optionName:{defaultValue:{value:""},description:"",name:"optionName",required:!1,type:{name:"string"}},topTitle:{defaultValue:{value:"15px"},description:"",name:"topTitle",required:!1,type:{name:"string"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},search:{defaultValue:{value:""},description:"",name:"search",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},margin:{defaultValue:{value:""},description:"",name:"margin",required:!1,type:{name:"string"}},heightBody:{defaultValue:null,description:"",name:"heightBody",required:!0,type:{name:"any"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},overLine:{defaultValue:{value:"false"},description:"",name:"overLine",required:!1,type:{name:"boolean"}},accessor:{defaultValue:null,description:"",name:"accessor",required:!0,type:{name:"any"}},fullName:{defaultValue:null,description:"",name:"fullName",required:!0,type:{name:"any"}},onChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(() => void)"}},handleClickAction:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleClickAction",required:!1,type:{name:"(() => void)"}}}}}catch{}try{InputTags.displayName="InputTags",InputTags.__docgenInfo={description:"",displayName:"InputTags",props:{disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},setTags:{defaultValue:null,description:"",name:"setTags",required:!0,type:{name:"any"}},tags:{defaultValue:null,description:"",name:"tags",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{Carrusel3D.displayName="Carrusel3D",Carrusel3D.__docgenInfo={description:"",displayName:"Carrusel3D",props:{}}}catch{}const Ea="_container_1bdhc_1",Ma="_menuHeader_1bdhc_15",Qa="_menuItems_1bdhc_35",ja="_item_1bdhc_57",U={container:Ea,menuHeader:Ma,menuItems:Qa,item:ja},Re=({index:e=null,array:r=[]})=>{const[n,l]=u.useState(!1);return y("section",{className:U.container,children:[y("header",{className:U.menuHeader,onClick:()=>l(!n),children:[e," ",n?t(fa,{size:15}):t(Ue,{size:15})]}),n&&t("nav",{className:U.menuItems,children:r.map(d=>t("a",{className:U.item,href:"#",children:d},d))})]})};Re.propTypes={array:a.array,index:a.string};try{Re.displayName="DropdownMenuHeader",Re.__docgenInfo={description:"",displayName:"DropdownMenuHeader",props:{index:{defaultValue:{value:"null"},description:"",name:"index",required:!1,type:{name:"null"}},array:{defaultValue:{value:"[]"},description:"",name:"array",required:!1,type:{name:"never[]"}}}}}catch{}const Ya=i.div`
  align-items: center;
  background-color: ${({backgroundColor:e})=>e||Fe("--color-base-white")};
  border-radius: 4px;
  border: 1px solid ${({border:e=Fe("--color-neutral-gray-silver")})=>e};
  display: flex;
  padding: ${({padding:e="10px 8px"})=>e};
`,Ua=i.input`
  width: 100%;
  font-size: 16px;
  border: none;
  padding: ${({padding:e="10px 8px"})=>e};
  &:focus {
    outline: none;
  }
`,Ga=i.span`
  padding: 0px;
  color: #5f6368;
`,Be=({backgroundColor:e="",placeholder:r="Search...",width:n="100%",padding:l="0px 30px 0",border:d,margin:f="0",handleChange:g=()=>{},handleSubmit:b=()=>{}})=>{const[o,v]=u.useState("");return t("form",{onSubmit:p=>{p.preventDefault(),b&&b(p)},style:{padding:l,margin:f,width:n},children:y(Ya,{backgroundColor:e,border:d,padding:l,children:[y(Ga,{children:[t(Ye,{color:V,size:"25px"}),t("i",{className:"fas fa-search"})]}),t(Ua,{onChange:p=>{v(p.target.value),g&&g(p)},placeholder:r,type:"text",value:o})]})})};Be.propTypes={handleChange:a.func,handleSubmit:a.func,margin:a.string,backgroundColor:a.string,border:a.string,padding:a.string,placeholder:a.string,width:a.string};try{Be.displayName="SearchBar",Be.__docgenInfo={description:"",displayName:"SearchBar",props:{backgroundColor:{defaultValue:{value:""},description:"",name:"backgroundColor",required:!1,type:{name:"string"}},placeholder:{defaultValue:{value:"Search..."},description:"",name:"placeholder",required:!1,type:{name:"string"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},padding:{defaultValue:{value:"0px 30px 0"},description:"",name:"padding",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},handleChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleChange",required:!1,type:{name:"(() => void)"}},handleSubmit:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleSubmit",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{autoComplete:{defaultValue:{value:"off"},description:"",name:"autoComplete",required:!1,type:{name:"string"}},border:{defaultValue:{value:""},description:"",name:"border",required:!1,type:{name:"string"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},letters:{defaultValue:null,description:"",name:"letters",required:!1,type:{name:"string"}},labelTop:{defaultValue:{value:""},description:"",name:"labelTop",required:!1,type:{name:"string"}},fontSize:{defaultValue:{value:"18px"},description:"",name:"fontSize",required:!1,type:{name:"string"}},display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}},error:{defaultValue:{value:""},description:"",name:"error",required:!1,type:{name:"string"}},autoFocus:{defaultValue:{value:"false"},description:"",name:"autoFocus",required:!1,type:{name:"boolean"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | boolean"}},email:{defaultValue:{value:"false"},description:"",name:"email",required:!1,type:{name:"boolean"}},dataForm:{defaultValue:{value:"{}"},description:"",name:"dataForm",required:!1,type:{name:"any"}},labelColor:{defaultValue:null,description:"",name:"labelColor",required:!1,type:{name:"string"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},maxWidth:{defaultValue:{value:""},description:"",name:"maxWidth",required:!1,type:{name:"string"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},nit:{defaultValue:{value:"false"},description:"",name:"nit",required:!1,type:{name:"boolean"}},numeric:{defaultValue:{value:"false"},description:"",name:"numeric",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:`(e) => {\r
    return e;\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},paddingInput:{defaultValue:{value:""},description:"",name:"paddingInput",required:!1,type:{name:"string"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"boolean"}},passConfirm:{defaultValue:null,description:"",name:"passConfirm",required:!1,type:{name:"boolean"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},radius:{defaultValue:{value:""},description:"",name:"radius",required:!1,type:{name:"string"}},range:{defaultValue:null,description:"",name:"range",required:!1,type:{name:"ValidationRange"}},reference:{defaultValue:null,description:"",name:"reference",required:!1,type:{name:"RefObject<HTMLInputElement>"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"string"}},typeTextarea:{defaultValue:{value:"false"},description:"",name:"typeTextarea",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string | number | readonly string[]"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},labelButton:{defaultValue:{value:""},description:"",name:"labelButton",required:!1,type:{name:"string"}},onFocus:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"onFocus",required:!1,type:{name:"(() => void)"}},setDataValue:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"setDataValue",required:!1,type:{name:"(() => void)"}},onBlur:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"onBlur",required:!1,type:{name:"(() => void)"}},onInvalid:{defaultValue:null,description:"",name:"onInvalid",required:!1,type:{name:"(() => void)"}}}}}catch{}try{InputHookProducts.displayName="InputHookProducts",InputHookProducts.__docgenInfo={description:"",displayName:"InputHookProducts",props:{placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"any"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!0,type:{name:"any"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},onFocus:{defaultValue:null,description:"",name:"onFocus",required:!0,type:{name:"any"}},inputText:{defaultValue:null,description:"",name:"inputText",required:!0,type:{name:"any"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"any"}},color:{defaultValue:null,description:"",name:"color",required:!0,type:{name:"any"}}}}}catch{}try{InputCustomRange.displayName="InputCustomRange",InputCustomRange.__docgenInfo={description:"",displayName:"InputCustomRange",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},min:{defaultValue:null,description:"",name:"min",required:!0,type:{name:"any"}},max:{defaultValue:null,description:"",name:"max",required:!0,type:{name:"any"}},step:{defaultValue:null,description:"",name:"step",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},fraction:{defaultValue:null,description:"",name:"fraction",required:!0,type:{name:"any"}},description:{defaultValue:null,description:"",name:"description",required:!0,type:{name:"any"}},margins:{defaultValue:{value:"[1, 2]"},description:"",name:"margins",required:!1,type:{name:"number[]"}}}}}catch{}try{InputHooks.displayName="InputHooks",InputHooks.__docgenInfo={description:"",displayName:"InputHooks",props:{autoComplete:{defaultValue:{value:"off"},description:"",name:"autoComplete",required:!1,type:{name:"string"}},border:{defaultValue:{value:""},description:"",name:"border",required:!1,type:{name:"string"}},Cc:{defaultValue:null,description:"",name:"Cc",required:!0,type:{name:"any"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!0,type:{name:"any"}},dataForm:{defaultValue:{value:"{}"},description:"",name:"dataForm",required:!1,type:{name:"{}"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}},email:{defaultValue:{value:"false"},description:"",name:"email",required:!1,type:{name:"boolean"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},labelTop:{defaultValue:{value:""},description:"",name:"labelTop",required:!1,type:{name:"string"}},fontSize:{defaultValue:{value:"14px"},description:"",name:"fontSize",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},labelColor:{defaultValue:null,description:"",name:"labelColor",required:!0,type:{name:"any"}},letters:{defaultValue:null,description:"",name:"letters",required:!0,type:{name:"any"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},maxWidth:{defaultValue:{value:""},description:"",name:"maxWidth",required:!1,type:{name:"string"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},nit:{defaultValue:{value:"false"},description:"",name:"nit",required:!1,type:{name:"boolean"}},numeric:{defaultValue:{value:"false"},description:"",name:"numeric",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:`(e) => {\r
    return e\r
  }`},description:"",name:"onChange",required:!1,type:{name:"((e: any) => any)"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},paddingInput:{defaultValue:{value:""},description:"",name:"paddingInput",required:!1,type:{name:"string"}},pass:{defaultValue:null,description:"",name:"pass",required:!0,type:{name:"any"}},passConfirm:{defaultValue:null,description:"",name:"passConfirm",required:!0,type:{name:"any"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},radius:{defaultValue:{value:""},description:"",name:"radius",required:!1,type:{name:"string"}},range:{defaultValue:null,description:"",name:"range",required:!0,type:{name:"any"}},reference:{defaultValue:null,description:"",name:"reference",required:!0,type:{name:"any"}},required:{defaultValue:null,description:"",name:"required",required:!0,type:{name:"any"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},messageError:{defaultValue:{value:""},description:"",name:"messageError",required:!1,type:{name:"string"}},type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"string"}},typeTextarea:{defaultValue:{value:"false"},description:"",name:"typeTextarea",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},onFocus:{defaultValue:{value:"() => { return }"},description:"",name:"onFocus",required:!1,type:{name:"(() => void)"}},onInvalid:{defaultValue:{value:"() => { return }"},description:"",name:"onInvalid",required:!1,type:{name:"(() => void)"}},setDataValue:{defaultValue:{value:"() => { return }"},description:"",name:"setDataValue",required:!1,type:{name:"(() => void)"}},onBlur:{defaultValue:{value:"() => { return }"},description:"",name:"onBlur",required:!1,type:{name:"(() => void)"}}}}}catch{}try{PhoneInput.displayName="PhoneInput",PhoneInput.__docgenInfo={description:"",displayName:"PhoneInput",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"any"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:"(value) => { return value }"},description:"",name:"onChange",required:!1,type:{name:"((value: any) => any)"}},defaultCountry:{defaultValue:{value:"CO"},description:"",name:"defaultCountry",required:!1,type:{name:"string"}}}}}catch{}try{InputQuery.displayName="InputQuery",InputQuery.__docgenInfo={description:"",displayName:"InputQuery",props:{dataForm:{defaultValue:{value:`{\r
    search: ''\r
  }`},description:"",name:"dataForm",required:!1,type:{name:"{ search: string; }"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},handleChange:{defaultValue:{value:"() => { return }"},description:"",name:"handleChange",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Range.displayName="Range",Range.__docgenInfo={description:"",displayName:"Range",props:{min:{defaultValue:{value:"0"},description:"",name:"min",required:!1,type:{name:"number"}},max:{defaultValue:{value:"100"},description:"",name:"max",required:!1,type:{name:"number"}},value:{defaultValue:{value:"0"},description:"",name:"value",required:!1,type:{name:"number"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{NewSelect.displayName="NewSelect",NewSelect.__docgenInfo={description:"",displayName:"NewSelect",props:{options:{defaultValue:{value:"[]"},description:"",name:"options",required:!1,type:{name:"never[]"}},beforeLabel:{defaultValue:{value:""},description:"",name:"beforeLabel",required:!1,type:{name:"string"}},noLabel:{defaultValue:{value:"false"},description:"",name:"noLabel",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},id:{defaultValue:{value:""},description:"",name:"id",required:!1,type:{name:"string"}},icon:{defaultValue:{value:"true"},description:"",name:"icon",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},sideLabel:{defaultValue:{value:""},description:"",name:"sideLabel",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},action:{defaultValue:{value:"false"},description:"",name:"action",required:!1,type:{name:"boolean"}},optionName:{defaultValue:{value:""},description:"",name:"optionName",required:!1,type:{name:"string"}},topTitle:{defaultValue:{value:"15px"},description:"",name:"topTitle",required:!1,type:{name:"string"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},search:{defaultValue:{value:""},description:"",name:"search",required:!1,type:{name:"string"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},margin:{defaultValue:{value:""},description:"",name:"margin",required:!1,type:{name:"string"}},heightBody:{defaultValue:null,description:"",name:"heightBody",required:!0,type:{name:"any"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},overLine:{defaultValue:{value:"false"},description:"",name:"overLine",required:!1,type:{name:"boolean"}},accessor:{defaultValue:null,description:"",name:"accessor",required:!0,type:{name:"any"}},fullName:{defaultValue:null,description:"",name:"fullName",required:!0,type:{name:"any"}},onChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(() => void)"}},handleClickAction:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleClickAction",required:!1,type:{name:"(() => void)"}}}}}catch{}try{InputTags.displayName="InputTags",InputTags.__docgenInfo={description:"",displayName:"InputTags",props:{disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},setTags:{defaultValue:null,description:"",name:"setTags",required:!0,type:{name:"any"}},tags:{defaultValue:null,description:"",name:"tags",required:!0,type:{name:"any"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{Options.displayName="Options",Options.__docgenInfo={description:"",displayName:"Options",props:{active:{defaultValue:{value:"false"},description:"",name:"active",required:!1,type:{name:"boolean"}},handleClick:{defaultValue:null,description:"",name:"handleClick",required:!0,type:{name:"(index: number) => void"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},path:{defaultValue:null,description:"",name:"path",required:!0,type:{name:"string"}}}}}catch{}try{AlertBox.displayName="AlertBox",AlertBox.__docgenInfo={description:"",displayName:"AlertBox",props:{err:{defaultValue:null,description:"",name:"err",required:!0,type:{name:"any"}}}}}catch{}try{CardOrder.displayName="CardOrder",CardOrder.__docgenInfo={description:"",displayName:"CardOrder",props:{pCodeRef:{defaultValue:{value:""},description:"",name:"pCodeRef",required:!1,type:{name:"string"}},view:{defaultValue:{value:"true"},description:"",name:"view",required:!1,type:{name:"boolean"}},pDatCre:{defaultValue:{value:""},description:"",name:"pDatCre",required:!1,type:{name:"string"}},deliveryTimeMinutes:{defaultValue:{value:"null"},description:"",name:"deliveryTimeMinutes",required:!1,type:{name:"number | null"}},handleViewOrder:{defaultValue:{value:"(pCodeRef: string) => pCodeRef"},description:"",name:"handleViewOrder",required:!1,type:{name:"((pCodeRef: string) => string)"}}}}}catch{}try{Bubble.displayName="Bubble",Bubble.__docgenInfo={description:"",displayName:"Bubble",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Carrusel3D.displayName="Carrusel3D",Carrusel3D.__docgenInfo={description:"",displayName:"Carrusel3D",props:{}}}catch{}try{ContentQueryCard.displayName="ContentQueryCard",ContentQueryCard.__docgenInfo={description:"",displayName:"ContentQueryCard",props:{day:{defaultValue:{value:"hoy"},description:"",name:"day",required:!1,type:{name:"string"}},delivery:{defaultValue:{value:"0"},description:"",name:"delivery",required:!1,type:{name:"number"}},restaurant:{defaultValue:{value:"0"},description:"",name:"restaurant",required:!1,type:{name:"number"}},totalSales:{defaultValue:{value:"0"},description:"",name:"totalSales",required:!1,type:{name:"number"}},numberFormat:{defaultValue:{value:`(number) => {\r
    return number\r
  }`},description:"",name:"numberFormat",required:!1,type:{name:"((value: number) => string)"}}}}}catch{}try{DateRange.displayName="DateRange",DateRange.__docgenInfo={description:"",displayName:"DateRange",props:{startDate:{defaultValue:null,description:"",name:"startDate",required:!0,type:{name:"any"}},endDate:{defaultValue:null,description:"",name:"endDate",required:!0,type:{name:"any"}}}}}catch{}try{DaySelector.displayName="DaySelector",DaySelector.__docgenInfo={description:"",displayName:"DaySelector",props:{days:{defaultValue:{value:"[]"},description:"",name:"days",required:!1,type:{name:"never[]"}},selectedDays:{defaultValue:{value:"[]"},description:"",name:"selectedDays",required:!1,type:{name:"never[]"}},handleDaySelection:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleDaySelection",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Draggable.displayName="Draggable",Draggable.__docgenInfo={description:"",displayName:"Draggable",props:{moveY:{defaultValue:{value:"false"},description:"",name:"moveY",required:!1,type:{name:"boolean"}},moveX:{defaultValue:{value:"false"},description:"",name:"moveX",required:!1,type:{name:"boolean"}},minX:{defaultValue:null,description:"",name:"minX",required:!0,type:{name:"any"}},minY:{defaultValue:null,description:"",name:"minY",required:!0,type:{name:"any"}},maxX:{defaultValue:null,description:"",name:"maxX",required:!0,type:{name:"any"}},maxY:{defaultValue:null,description:"",name:"maxY",required:!0,type:{name:"any"}}}}}catch{}try{DropdownMenuHeader.displayName="DropdownMenuHeader",DropdownMenuHeader.__docgenInfo={description:"",displayName:"DropdownMenuHeader",props:{index:{defaultValue:{value:"null"},description:"",name:"index",required:!1,type:{name:"null"}},array:{defaultValue:{value:"[]"},description:"",name:"array",required:!1,type:{name:"never[]"}}}}}catch{}try{EmptyData.displayName="EmptyData",EmptyData.__docgenInfo={description:"",displayName:"EmptyData",props:{height:{defaultValue:{value:"590"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"489"},description:"",name:"width",required:!1,type:{name:"number"}}}}}catch{}try{HeaderSteps.displayName="HeaderSteps",HeaderSteps.__docgenInfo={description:"",displayName:"HeaderSteps",props:{active:{defaultValue:{value:"0"},description:"",name:"active",required:!1,type:{name:"number"}},steps:{defaultValue:{value:"[]"},description:"",name:"steps",required:!1,type:{name:"never[]"}},overActive:{defaultValue:{value:"null"},description:"",name:"overActive",required:!1,type:{name:"null"}},handleOverActive:{defaultValue:{value:`(index) => {\r
    return index\r
  }`},description:"",name:"handleOverActive",required:!1,type:{name:"((index: any) => any)"}},setActive:{defaultValue:{value:`(index) => {\r
    return index\r
  }`},description:"",name:"setActive",required:!1,type:{name:"((index: any) => any)"}}}}}catch{}try{AlertInfo.displayName="AlertInfo",AlertInfo.__docgenInfo={description:"",displayName:"AlertInfo",props:{type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"warning"'},{value:'"error"'},{value:'"info"'}]}},message:{defaultValue:null,description:"",name:"message",required:!0,type:{name:"string"}}}}}catch{}try{FlipCard.displayName="FlipCard",FlipCard.__docgenInfo={description:"",displayName:"FlipCard",props:{backChild:{defaultValue:{value:"null"},description:"",name:"backChild",required:!1,type:{name:"ReactNode"}},flipped:{defaultValue:{value:"false"},description:"",name:"flipped",required:!1,type:{name:"boolean"}},frontChild:{defaultValue:{value:"null"},description:"",name:"frontChild",required:!1,type:{name:"ReactNode"}},onClick:{defaultValue:{value:"() => {}"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},setFlipped:{defaultValue:{value:"(boolean) => { return boolean }"},description:"",name:"setFlipped",required:!1,type:{name:"((boolean: boolean) => void)"}}}}}catch{}try{LocationName.displayName="LocationName",LocationName.__docgenInfo={description:"",displayName:"LocationName",props:{Text:{defaultValue:{value:""},description:"",name:"Text",required:!1,type:{name:"string"}}}}}catch{}try{QuantityButton.displayName="QuantityButton",QuantityButton.__docgenInfo={description:"",displayName:"QuantityButton",props:{border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},margin:{defaultValue:null,description:"",name:"margin",required:!0,type:{name:"any"}},padding:{defaultValue:null,description:"",name:"padding",required:!0,type:{name:"any"}},label:{defaultValue:{value:""},description:"",name:"label",required:!1,type:{name:"string"}},quantity:{defaultValue:{value:"null"},description:"",name:"quantity",required:!1,type:{name:"null"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},showNegativeButton:{defaultValue:{value:"false"},description:"",name:"showNegativeButton",required:!1,type:{name:"boolean"}},showPositiveButton:{defaultValue:{value:"false"},description:"",name:"showPositiveButton",required:!1,type:{name:"boolean"}},validationOne:{defaultValue:null,description:"",name:"validationOne",required:!0,type:{name:"any"}},classNameQuantity:{defaultValue:{value:""},description:"",name:"classNameQuantity",required:!1,type:{name:"string"}},validationZero:{defaultValue:{value:"false"},description:"",name:"validationZero",required:!1,type:{name:"boolean"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}},handleDecrement:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleDecrement",required:!1,type:{name:"(() => void)"}},handleIncrement:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleIncrement",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Rate.displayName="Rate",Rate.__docgenInfo={description:"",displayName:"Rate",props:{count:{defaultValue:{value:"5"},description:"",name:"count",required:!1,type:{name:"number"}},rating:{defaultValue:{value:"0"},description:"",name:"rating",required:!1,type:{name:"number"}},color:{defaultValue:{value:`{\r
    filled: '#ffbc00',\r
    unfilled: '#DCDCDC'\r
  }`},description:"",name:"color",required:!1,type:{name:"{ filled: string; unfilled: string; }"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"string"}},noHover:{defaultValue:{value:"false"},description:"",name:"noHover",required:!1,type:{name:"boolean"}},onRating:{defaultValue:{value:"() => {}"},description:"",name:"onRating",required:!1,type:{name:"((rating: number) => void)"}}}}}catch{}try{SearchBar.displayName="SearchBar",SearchBar.__docgenInfo={description:"",displayName:"SearchBar",props:{backgroundColor:{defaultValue:{value:""},description:"",name:"backgroundColor",required:!1,type:{name:"string"}},placeholder:{defaultValue:{value:"Search..."},description:"",name:"placeholder",required:!1,type:{name:"string"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},padding:{defaultValue:{value:"0px 30px 0"},description:"",name:"padding",required:!1,type:{name:"string"}},border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},handleChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleChange",required:!1,type:{name:"(() => void)"}},handleSubmit:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleSubmit",required:!1,type:{name:"(() => void)"}}}}}catch{}try{Skeleton.displayName="Skeleton",Skeleton.__docgenInfo={description:"",displayName:"Skeleton",props:{height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | number"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},margin:{defaultValue:null,description:"",name:"margin",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"string"}},numberObject:{defaultValue:{value:"1"},description:"",name:"numberObject",required:!1,type:{name:"number"}}}}}catch{}try{StepsComponent.displayName="StepsComponent",StepsComponent.__docgenInfo={description:"",displayName:"StepsComponent",props:{current:{defaultValue:null,description:"",name:"current",required:!0,type:{name:"any"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"any"}},titles:{defaultValue:null,description:"",name:"titles",required:!0,type:{name:"any"}}}}}catch{}try{Tabs.displayName="Tabs",Tabs.__docgenInfo={description:"",displayName:"Tabs",props:{tabBreak:{defaultValue:null,description:"",name:"tabBreak",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}try{Toast.displayName="Toast",Toast.__docgenInfo={description:"",displayName:"Toast",props:{}}}catch{}export{Se as N};

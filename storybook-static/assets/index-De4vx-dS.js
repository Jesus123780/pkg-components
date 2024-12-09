import{j as o,a as l}from"./jsx-runtime-DI8_P1Ft.js";import{P as r}from"./index-B3IC6ylx.js";import{r as d}from"./index-DPzuYzxM.js";import{B as q,c as D,D as _e,P as k}from"./index-BINBIgVg.js";import{e as qe}from"./index-RGaBZlDs.js";import"./index-XORxt8qY.js";import{B as R}from"./index-DuIGVyw3.js";import{c as v,s as t,n as u}from"./styled-components.browser.esm-CLTG7J5x.js";import{R as Y}from"./index-DCQJ1Mhm.js";const _={small:"small",medium:"medium",large:"large"},h={cancel:"cancelar",confirm:"confirmar"},G=v`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`,ve=v`
    from {
      top: -10%;
      left: 50%;
      transform: translateY(-100%);
    }
  
    to {
      top: 15%;
      left: 50%;
      transform: translateY(-0%);
    }

`,Q=v`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

`,xe=v`
    from {
        opacity: 1;
        top: 15%;
        left: 50%;
        transform: translateY(-15%);
    }
    to {
      opacity: 0;
      top: 10%;
      left: 50%;
      transform: translateY(-100%);
    }
  

`,T=t.div`
    display: ${({show:e,state:n})=>{if(e&&n)return"block";if(e&&!n)return"block";if(!e&&!n)return"none"}};
    position: fixed;
    background: ${({bgColor:e})=>e||"rgba(0,0,0,.4)"};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: ${({zIndex:e})=>e||"100"};
    opacity: 1;
  ${({show:e,state:n})=>{if(e&&n)return u`animation: ${G} .1s linear;`;if(e&&!n)return u`animation: ${G} .s linear;`}}

`,$=t.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 888;
    display: flex;
    align-items: center;
    ${e=>e.backdropA&&u`
        animation: ${Q} .2s forwards;
    `}
    justify-content: center;
`,A=t.div`
    background: #fff;
    width: ${({size:e})=>e===_.small?"30%":e===_.medium?"60%":e===_.large?"100%":e};
    ${e=>e.backdropA&&u`
        animation: ${Q} .2s forwards;
    `}
    min-width: 340px;
    border-radius: ${({borderRadius:e})=>e};
    border: 1px solid rgba(0,0,0,.2);
    z-index: 999;
    height: ${({height:e})=>e||"auto"};
    min-height: ${({height:e})=>e||"auto"};
    min-height: ${({height:e})=>e||"auto"};
    ${({state:e})=>e?u`animation: ${ve} .2s forwards;`:u`animation: ${xe} .2s forwards;`}
`,N=t.div`
    display: flex;
    /* position: fixed;
    left: 0; */
    z-index: 9999;
    align-items: center;
    justify-content: space-between;
    padding: .2rem;
    border-bottom: 1px solid #e9ecef;
    background-color: ${q};
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
`,W=t.h4`
    margin: 0;
    color: ${D};
    font-size: 17px;
    width: auto;
    font-weight: 500;
    font-family: PFont-Light;
`,B=t.button`
    ${({fixed:e})=>e&&u`
        position: absolute;
        right: 6px;
        top: 6px;
    `}
    background-color: transparent;
    border: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    z-index: 999999;
    color: #898989;
    text-shadow: 0 1px 0 #fff;
    outline: none;
    cursor: pointer;
`,M=t.div`
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
    border-radius: ${({borderRadius:e})=>e||"none"};
    background-color: ${({backgroundColor:e})=>e||q};
    display: ${({display:e})=>e||"block"};
    height: ${({height:e})=>e||"auto"};

    min-height: ${({height:e})=>e||"auto"};
    min-height: ${({height:e})=>e||"auto"};
    padding: ${({padding:e})=>e||"0"};
.modal-wrapper {
    background-color: #FFFFFF;
    border-radius: 5px;
    bottom: 0;
    box-shadow: -1px -1px 15px -6px rgba(0,0,0,0.75);
    height: 140px;
    left: 0;
    margin: auto;
    min-width: 300px;
    padding: 20px;
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 91000;
    h2 {
        text-align: center;
        font-size: 15px;
        margin-bottom: 20px;
        font-family: PFont-Regular;
        font-weight: 300;
    }

}
.modal-confirm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-content: center;
    gap: 10px;

}
`,I=t.div`
    bottom: 0;
    left: 0;
    width: 100%;
    right: 0;
    margin: auto;
    justify-content: space-between;
    display: flex;
    border-top: 1px solid ${`${_e}33`};
    background-color: ${({backgroundColor:e})=>e||q};
`,U=t.button`
    flex-direction: row;
    padding: ${({padding:e})=>e||"5px"};
    cursor: pointer;
    border: ${({border:e})=>e?`1px solid  ${D}`:"none"};
    border-radius: 30px;
    font-size: var(--font-size-base);
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({height:e})=>e||"auto"};
    background-color: ${({bgColor:e})=>e||"transparent"};
    &:disabled {
        cursor: no-drop;
    }
`,K=t.button`
    flex-direction: row;
    padding: ${({padding:e})=>e||"5px"};
    cursor: pointer;
    border: ${({border:e})=>e?`${`1px solid ${D}`}`:"none"};
    border-radius: 30px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: ${({height:e})=>e||"auto"};
    background-color: ${({bgColor:e})=>e||"transparent"};
    &:disabled {
        cursor: no-drop;
    }
`;try{T.displayName="Container",T.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{$.displayName="Wrapper",$.__docgenInfo={description:"",displayName:"Wrapper",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{A.displayName="Modal",A.__docgenInfo={description:"",displayName:"Modal",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{N.displayName="ModalHeader",N.__docgenInfo={description:"",displayName:"ModalHeader",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{W.displayName="ModalTitle",W.__docgenInfo={description:"",displayName:"ModalTitle",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{B.displayName="BtnClose",B.__docgenInfo={description:"",displayName:"BtnClose",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{M.displayName="ModalBody",M.__docgenInfo={description:"",displayName:"ModalBody",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{I.displayName="ModalFooter",I.__docgenInfo={description:"",displayName:"ModalFooter",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{U.displayName="BtnConfirm",U.__docgenInfo={description:"",displayName:"BtnConfirm",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{K.displayName="BtnCancel",K.__docgenInfo={description:"",displayName:"BtnCancel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const z=({backgroundColor:e,title:n,size:X=_.medium,show:a,disabled:S,display:Z,zIndex:J,cancel:E,confirm:F,padding:ee,backdrop:c="",iconConfirm:re=null,useScroll:L=!1,keyboard:x=!0,footer:ae=!0,btnCancel:te=!0,openLateral:ne,btnConfirm:oe=!0,children:ie,hideOnConfirm:j=!0,timeOut:m=200,backdropAnimation:le=!1,height:de,bgColor:ue,question:V=!1,customHeight:se="",submit:P=!1,header:pe=!0,sizeIconClose:ce="30px",borderRadius:H=".3rem",onHide:f=()=>{},onCancel:p=()=>{},onConfirm:me=()=>{}})=>{const[y,b]=d.useState(a),[w,s]=d.useState(!1),[O,C]=d.useState(!1),g=d.useCallback(()=>{b(!1),p(),s(!1),setTimeout(f,m)},[p,f,m]),fe=()=>s(!w);d.useEffect(()=>{const i=he=>{he.code==="Escape"&&s(!0)};return V&&c==="static"&&y&&a?(window.addEventListener("keyup",i),()=>{x&&window.removeEventListener("keyup",i)}):c!=="static"&&x&&a?(window.addEventListener("keyup",i),()=>{window.removeEventListener("keyup",i)}):()=>{}},[x,g,a,c,V,w,y]),d.useEffect(()=>{b(a)},[a]);const ye=i=>{i.preventDefault(),c==="static"?C(!0):g(),setTimeout(()=>C(!1),100)};d.useEffect(()=>{a&&L?document.body.style.overflow="hidden":document.body.style.overflow="auto"},[a,L]);const be=()=>{b(!1),p(),s(!1),setTimeout(f,m),p()},ge=()=>{j&&b(!1),p(),s(!1),j&&setTimeout(f,m),me()};return o(T,{bgColor:ue,onMouseDown:ye,openLateral:ne,show:a,showLateral:a,state:y,zIndex:J,children:o($,{backdropA:O,onMouseDown:()=>{le&&C(!1)},children:l(A,{backdropA:O,borderRadius:H,height:de,onMouseDown:i=>i.stopPropagation(),show:a,showLateral:a,size:X,state:y,children:[pe&&l(N,{children:[o(W,{children:n}),o(B,{onClick:()=>V?fe():g(),children:o(qe,{color:k,size:ce})})]}),l(M,{backgroundColor:e,borderRadius:H,display:Z,height:se||"calc(100vh - 50px)",padding:ee,children:[w&&a&&l("div",{className:"modal-wrapper",children:[o("h2",{children:`¿Seguro que quieres cerrar ${n??""}?`}),l("div",{className:"modal-confirm",children:[o(Y,{border:!0,disabled:S,onClick:()=>s(!1),style:{fontSize:"14px",fontWeight:"400"},type:"button",children:E||h.cancel}),o(Y,{border:!0,color:q,onClick:()=>{g()},style:{fontSize:"14px",fontWeight:"400"},type:P?"submit":"button",children:F||h.confirm})]})]}),ie]}),ae&&l(I,{backgroundColor:e,children:[te&&o(R,{backgroundColor:k,border:!0,disabled:S,onClick:be,type:"button",widthButton:"200px",children:E||h.cancel}),oe&&l(R,{backgroundColor:k,border:!0,onClick:ge,type:P?"submit":"button",widthButton:"200px",children:[F||h.confirm,re]})]})]})})})};z.propTypes={backdrop:r.string,backdropAnimation:r.bool,backgroundColor:r.any,bgColor:r.any,borderRadius:r.string,btnCancel:r.bool,btnConfirm:r.bool,cancel:r.string,children:r.any,closeIcon:r.bool,confirm:r.any,customHeight:r.bool,disabled:r.any,display:r.any,footer:r.bool,header:r.bool,height:r.any,hideOnConfirm:r.bool,iconConfirm:r.any,keyboard:r.bool,onCancel:r.func,onConfirm:r.func,onHide:r.func,openLateral:r.any,padding:r.any,question:r.bool,show:r.any,size:r.any,sizeIconClose:r.string,submit:r.bool,timeOut:r.number,title:r.string,useScroll:r.bool,zIndex:r.any};try{z.displayName="AwesomeModal",z.__docgenInfo={description:"",displayName:"AwesomeModal",props:{backgroundColor:{defaultValue:null,description:"",name:"backgroundColor",required:!0,type:{name:"any"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"any"}},size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"string"}},show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"any"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!0,type:{name:"any"}},display:{defaultValue:null,description:"",name:"display",required:!0,type:{name:"any"}},zIndex:{defaultValue:null,description:"",name:"zIndex",required:!0,type:{name:"any"}},cancel:{defaultValue:null,description:"",name:"cancel",required:!0,type:{name:"any"}},confirm:{defaultValue:null,description:"",name:"confirm",required:!0,type:{name:"any"}},padding:{defaultValue:null,description:"",name:"padding",required:!0,type:{name:"any"}},backdrop:{defaultValue:{value:""},description:"",name:"backdrop",required:!1,type:{name:"string"}},iconConfirm:{defaultValue:{value:"null"},description:"",name:"iconConfirm",required:!1,type:{name:"null"}},useScroll:{defaultValue:{value:"false"},description:"",name:"useScroll",required:!1,type:{name:"boolean"}},keyboard:{defaultValue:{value:"true"},description:"",name:"keyboard",required:!1,type:{name:"boolean"}},footer:{defaultValue:{value:"true"},description:"",name:"footer",required:!1,type:{name:"boolean"}},btnCancel:{defaultValue:{value:"true"},description:"",name:"btnCancel",required:!1,type:{name:"boolean"}},openLateral:{defaultValue:null,description:"",name:"openLateral",required:!0,type:{name:"any"}},btnConfirm:{defaultValue:{value:"true"},description:"",name:"btnConfirm",required:!1,type:{name:"boolean"}},hideOnConfirm:{defaultValue:{value:"true"},description:"",name:"hideOnConfirm",required:!1,type:{name:"boolean"}},timeOut:{defaultValue:{value:"200"},description:"",name:"timeOut",required:!1,type:{name:"number"}},backdropAnimation:{defaultValue:{value:"false"},description:"",name:"backdropAnimation",required:!1,type:{name:"boolean"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!0,type:{name:"any"}},question:{defaultValue:{value:"false"},description:"",name:"question",required:!1,type:{name:"boolean"}},customHeight:{defaultValue:{value:""},description:"",name:"customHeight",required:!1,type:{name:"string"}},submit:{defaultValue:{value:"false"},description:"",name:"submit",required:!1,type:{name:"boolean"}},header:{defaultValue:{value:"true"},description:"",name:"header",required:!1,type:{name:"boolean"}},sizeIconClose:{defaultValue:{value:"30px"},description:"",name:"sizeIconClose",required:!1,type:{name:"string"}},borderRadius:{defaultValue:{value:".3rem"},description:"",name:"borderRadius",required:!1,type:{name:"string"}},onHide:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onHide",required:!1,type:{name:"(() => void)"}},onCancel:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onConfirm:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onConfirm",required:!1,type:{name:"(() => void)"}}}}}catch{}export{z as A};

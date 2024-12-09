import{j as o,a as b}from"./jsx-runtime-DI8_P1Ft.js";import{r as i}from"./index-DPzuYzxM.js";import{c as v,s as r,n as l}from"./styled-components.browser.esm-CLTG7J5x.js";import"./index-XORxt8qY.js";import{I as We}from"./index-Bp4VmTmA.js";import{B as H}from"./index-DuIGVyw3.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./tslib.es6-BF5GDGeg.js";import"./index-CoXI7PFH.js";import"./index-DEiPFiJ1.js";import"./index-CIqjyzZH.js";import"./index-Ck7iXuwZ.js";import"./index-OmEDsgBY.js";import"./index-Bww7KC1c.js";import"./index-BvrhFfaA.js";import"./link-B5326XFw.js";import"./_interop_require_default-DgqNHo5w.js";import"./utils-D5IJ2A55.js";import"./router-Dr3MF1HQ.js";import"./router-context-1OOWBe6R.js";import"./use-intersection-BigaMEX4.js";import"./index-B3IC6ylx.js";import"./index-CDs-0jJ9.js";import"./index-pGaNWW0o.js";import"./index-BINBIgVg.js";import"./index-CIjh_EDQ.js";import"./index-Daagk5ZO.js";import"./ButtonContent-BW4_E53A.js";import"./index-B7phoe5e.js";import"./index-BazRt-v6.js";import"./index-DDhiIGzI.js";import"./index-6iV1_9JG.js";import"./index-vbbai_p0.js";import"./index-UTFqNKN-.js";import"./index-DH2uhswi.js";import"./index-DrTIMpa1.js";import"./index-DCQJ1Mhm.js";import"./index-RGaBZlDs.js";import"./index-BT_gM0Ba.js";const _={small:"small",medium:"medium",large:"large"},O={cancel:"Cancelar",confirm:"Aceptar"},P=v`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`,Se=v`
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

`,le=v`
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

`,Ie=v`
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

`,$=r.div`
  display: ${({show:e,state:t})=>{if(e&&t)return"block";if(e&&!t)return"block";if(!e&&!t)return"none"}};
  position: fixed;
  background: ${({bgColor:e})=>"rgba(0,0,0,.4)"};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${({zIndex:e})=>e||"100"};
  opacity: 1;
  ${({show:e,state:t})=>{if(e&&t)return l`
        animation: ${P} 0.1s linear;
      `;if(e&&!t)return l`
        animation: ${P} .s linear;
      `}}
`,k=r.div`
  position: relative;
  background: transparent;
  width: 100%;
  height: 100%;
  z-index: 888;
  display: flex;
  align-items: center;
  ${e=>e.animationBackdrop&&l`
        animation: ${le} 0.2s forwards;
      `}
  justify-content: center;
`,B=r.div`
  background: #fff;
  width: ${({size:e})=>e===_.small?"30%":e===_.medium?"60%":e===_.large?"100%":e};
  ${e=>e.animationBackdrop&&l`
        animation: ${le} 0.2s forwards;
      `}
  min-width: 340px;
  border-radius: ${({borderRadius:e})=>e};
  z-index: 999;
  padding: ${({padding:e})=>e||"30px 20px"};
  box-shadow: 4px 3px 7px #d6d6d6;
  height: ${({height:e})=>e||"auto"};
  min-height: ${({height:e})=>e||"auto"};
  ${({state:e})=>e?l`
          animation: ${Se} 0.2s forwards;
        `:l`
          animation: ${Ie} 0.2s forwards;
        `}
`,z=r.div`
  display: flex;
  z-index: 9999;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: ${({headerColor:e})=>e||"var(--color-base-white)"};
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`,N=r.h4`
  margin: 0;
  color: "red";
  font-size: 17px;
  width: auto;
  font-weight: 500;
  color: var(--color-neutral-white);
  font-family: PFont-Regular;
  font-size: 25px;
  margin-left: 60px;
`,W=r.button`
  ${({fixed:e})=>e&&l`
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
`,S=r.div`
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
  border-radius: ${({borderRadius:e})=>e||"none"};
  display: ${({display:e})=>e||"block"};
  height: ${({height:e})=>e||"auto"};
  min-height: ${({height:e})=>e||"auto"};
  padding: ${({padding:e})=>e||"0"};
  .modal-wrapper {
    background-color: #ffffff;
    border-radius: 5px;
    bottom: 0;
    box-shadow: -1px -1px 15px -6px rgba(0, 0, 0, 0.75);
    height: 140px;
    left: 0;
    margin: auto;
    min-width: 300px;
    padding: 20px;
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    z-index: 1000;
    h2 {
      font-family: PFont-Regular;
      font-size: 15px;
      font-weight: 300;
      margin-bottom: 20px;
      text-align: center;
    }
  }
  .modal-confirm {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    place-content: center;
  }
`,I=r.div`
  border-top: 1px solid #eee;
  bottom: 0;
  display: flex;
  justify-content: ${({justifyButtons:e})=>e||"space-between"};
  left: 0;
  margin: auto;
  padding: 25px 5px;
  position: absolute;
  right: 0;
  width: 99%;
`,F=r.button`
  flex-direction: row;
  padding: ${({padding:e})=>e||"5px"};
  cursor: pointer;
  border: ${({border:e})=>e?"1px solid red":"none"};
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
`,R=r.button`
  flex-direction: row;
  padding: ${({padding:e})=>e||"5px"};
  cursor: pointer;
  border: ${({border:e})=>e?"1px solid 'red'":"none"};
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
`;try{$.displayName="Container",$.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{k.displayName="Wrapper",k.__docgenInfo={description:"",displayName:"Wrapper",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{B.displayName="Modal",B.__docgenInfo={description:"",displayName:"Modal",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{z.displayName="ModalHeader",z.__docgenInfo={description:"",displayName:"ModalHeader",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{N.displayName="ModalTitle",N.__docgenInfo={description:"",displayName:"ModalTitle",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{W.displayName="BtnClose",W.__docgenInfo={description:"",displayName:"BtnClose",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{S.displayName="ModalBody",S.__docgenInfo={description:"",displayName:"ModalBody",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{I.displayName="ModalFooter",I.__docgenInfo={description:"",displayName:"ModalFooter",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{F.displayName="BtnConfirm",F.__docgenInfo={description:"",displayName:"BtnConfirm",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{R.displayName="BtnCancel",R.__docgenInfo={description:"",displayName:"BtnCancel",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const w=({backgroundColor:e,title:t,size:de=_.medium,show:a,disabled:se,display:ue,zIndex:pe,cancel:me,confirm:ce,padding:fe,justifyButtons:ye,iconSize:ge,backdrop:f="",iconColor:he="",iconConfirm:be=null,useScroll:D=!1,keyboard:x=!0,footer:_e=!1,btnCancel:we=!0,btnConfirm:ve=!0,children:xe,hideOnConfirm:De=!0,timeOut:q=200,animationBackdropAnimation:qe=!1,height:Ve,bgColor:Me,question:V=!1,customHeight:Ce="",headerColor:Te="",submit:Ae=!1,header:$e=!0,borderRadius:E=".3rem",onHide:M=()=>{},onCancel:y=()=>{},onConfirm:Ee=()=>{}})=>{const[g,C]=i.useState(a),[j,h]=i.useState(!1),[L,T]=i.useState(!1),A=i.useCallback(()=>{C(!1),y(),h(!1),setTimeout(M,q)},[y,M,q]),ke=()=>h(!j),Be=()=>{C(!1),y(),h(!1),setTimeout(M,q),y()};i.useEffect(()=>{const n=Ne=>{Ne.code==="Escape"&&h(!0)};return V&&f==="static"&&g&&a?(window.addEventListener("keyup",n),()=>{x&&window.removeEventListener("keyup",n)}):f!=="static"&&x&&a?(window.addEventListener("keyup",n),()=>{window.removeEventListener("keyup",n)}):()=>{}},[x,A,a,f,V,j,g]);const ze=n=>{n.preventDefault(),f==="static"?T(!0):A(),setTimeout(()=>{T(!1)},100)};return i.useEffect(()=>{a&&D?document.body.style.overflow="hidden":document.body.style.overflow="auto"},[a,D]),i.useEffect(()=>{C(a)},[a]),o($,{bgColor:Me,onMouseDown:ze,show:a,state:g,zIndex:pe,children:o(k,{animationBackdrop:L,onMouseDown:()=>{qe&&T(!1)},children:b(B,{animationBackdrop:L,borderRadius:E,height:Ve,padding:fe,onMouseDown:n=>n.stopPropagation(),show:a,size:de,state:g,children:[$e&&b(z,{headerColor:Te,children:[o(N,{children:t}),o(W,{onClick:()=>V?ke():A(),children:o(We,{size:ge||56.92,icon:"IconClose",color:he})})]}),o(S,{backgroundColor:e,borderRadius:E,display:ue,height:Ce||"100%",children:xe}),_e&&b(I,{backgroundColor:e,justifyButtons:ye,children:[we&&o(H,{styles:{marginRight:"16px"},disabled:se,onClick:Be,type:"button",fontSize:"25px",width:"274px",children:me||O.cancel}),ve&&b(H,{primary:!0,padding:"22px 90px",type:Ae?"submit":"button",width:"274px",fontSize:"25px",children:[ce||O.confirm,be]})]})]})})})};try{w.displayName="AwesomeModal",w.__docgenInfo={description:"",displayName:"AwesomeModal",props:{animationBackdropAnimation:{defaultValue:{value:"false"},description:"",name:"animationBackdropAnimation",required:!1,type:{name:"boolean"}},backdrop:{defaultValue:{value:""},description:"",name:"backdrop",required:!1,type:{name:"string"}},backgroundColor:{defaultValue:null,description:"",name:"backgroundColor",required:!1,type:{name:"string"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!1,type:{name:"string"}},borderRadius:{defaultValue:{value:".3rem"},description:"",name:"borderRadius",required:!1,type:{name:"string"}},iconColor:{defaultValue:{value:""},description:"",name:"iconColor",required:!1,type:{name:"string"}},btnCancel:{defaultValue:{value:"true"},description:"",name:"btnCancel",required:!1,type:{name:"boolean"}},btnConfirm:{defaultValue:{value:"true"},description:"",name:"btnConfirm",required:!1,type:{name:"boolean"}},customHeight:{defaultValue:{value:""},description:"",name:"customHeight",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},display:{defaultValue:null,description:"",name:"display",required:!1,type:{name:"string"}},footer:{defaultValue:{value:"false"},description:"",name:"footer",required:!1,type:{name:"boolean"}},header:{defaultValue:{value:"true"},description:"",name:"header",required:!1,type:{name:"boolean"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string"}},hideOnConfirm:{defaultValue:{value:"true"},description:"",name:"hideOnConfirm",required:!1,type:{name:"boolean"}},iconConfirm:{defaultValue:{value:"null"},description:"",name:"iconConfirm",required:!1,type:{name:"any"}},keyboard:{defaultValue:{value:"true"},description:"",name:"keyboard",required:!1,type:{name:"boolean"}},padding:{defaultValue:null,description:"",name:"padding",required:!1,type:{name:"string"}},iconSize:{defaultValue:null,description:"",name:"iconSize",required:!1,type:{name:"number"}},question:{defaultValue:{value:"false"},description:"",name:"question",required:!1,type:{name:"boolean"}},show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"boolean"}},size:{defaultValue:{value:"medium"},description:"",name:"size",required:!1,type:{name:"string"}},headerColor:{defaultValue:{value:""},description:"",name:"headerColor",required:!1,type:{name:"string"}},submit:{defaultValue:{value:"false"},description:"",name:"submit",required:!1,type:{name:"boolean"}},timeOut:{defaultValue:{value:"200"},description:"",name:"timeOut",required:!1,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},useScroll:{defaultValue:{value:"false"},description:"",name:"useScroll",required:!1,type:{name:"boolean"}},zIndex:{defaultValue:null,description:"",name:"zIndex",required:!1,type:{name:"number"}},cancel:{defaultValue:null,description:"",name:"cancel",required:!1,type:{name:"boolean"}},confirm:{defaultValue:null,description:"",name:"confirm",required:!1,type:{name:"boolean"}},justifyButtons:{defaultValue:null,description:"",name:"justifyButtons",required:!1,type:{name:"enum",value:[{value:'"space-between"'},{value:'"center"'},{value:'"end"'},{value:'"start-end"'},{value:'"start-center"'},{value:'"start-space-between"'},{value:'"end-center"'},{value:'"end-space-between"'},{value:'"center-space-between"'}]}},onCancel:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onCancel",required:!1,type:{name:"(() => void)"}},onConfirm:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onConfirm",required:!1,type:{name:"(() => void)"}},onHide:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onHide",required:!1,type:{name:"(() => void)"}}}}}catch{}const Ma={title:"molecules/Modal",component:w},c=e=>o(w,{...e}),d=c.bind({});d.args={children:"Initial AwesomeModal",show:!0};const s=c.bind({});s.args={children:"Medium AwesomeModal",size:"medium",show:!0};const u=c.bind({});u.args={children:"Large AwesomeModal",size:"large",show:!0};const p=c.bind({});p.args={children:"Small AwesomeModal",size:"small",show:!0};const m=c.bind({});m.args={children:"",show:!0,padding:"0",title:"Acerca tu cédula de identidad a la pantalla para ser escaneada",iconSize:48,header:!0,height:"642px",customHeight:"calc(642px - 200px)",footer:!0,size:"961px",headerColor:"var(--color-primary-green2)",iconColor:"var(--color-icons-white)",justifyButtons:"end"};var Y,U,K;d.parameters={...d.parameters,docs:{...(Y=d.parameters)==null?void 0:Y.docs,source:{originalSource:"args => <AwesomeModal {...args} />",...(K=(U=d.parameters)==null?void 0:U.docs)==null?void 0:K.source}}};var Q,X,Z;s.parameters={...s.parameters,docs:{...(Q=s.parameters)==null?void 0:Q.docs,source:{originalSource:"args => <AwesomeModal {...args} />",...(Z=(X=s.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var G,J,ee;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:"args => <AwesomeModal {...args} />",...(ee=(J=u.parameters)==null?void 0:J.docs)==null?void 0:ee.source}}};var ae,re,te;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:"args => <AwesomeModal {...args} />",...(te=(re=p.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ne,oe,ie;m.parameters={...m.parameters,docs:{...(ne=m.parameters)==null?void 0:ne.docs,source:{originalSource:"args => <AwesomeModal {...args} />",...(ie=(oe=m.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};const Ca=["Primary","ModalMedium","ModalLarge","ModalSmall","ModalCamera"];export{m as ModalCamera,u as ModalLarge,s as ModalMedium,p as ModalSmall,d as Primary,Ca as __namedExportsOrder,Ma as default};

import{j as n}from"./jsx-runtime-DI8_P1Ft.js";import{c as d,s as l,n as o}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as p,E as m}from"./index-BINBIgVg.js";import"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./tslib.es6-BF5GDGeg.js";const c=d`
  0% {
    width: 0%;
    opacity: 100%;
  }
  50% {
    width: 40%;
  }
  70% {
    opacity: 90%;
  }
  100% {
    width: 100%;
    opacity: 9%;
    visibility: hidden;
  }
`,e=l.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${p};
  height: 5px;
  transition: .2s;

  ${r=>r.progress&&o`
    transition: .2s;
    animation-name: ${c};
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-delay: 1s;
    z-index: 9999;
  `}

  ${r=>(r.final||0)<=(r.progress||0)&&o`
    background-color: ${m};
  `}
`;e.displayName="ProgressBar";e.defaultProps={"data-testid":"progress-bar"};try{e.displayName="ProgressBar",e.__docgenInfo={description:"",displayName:"ProgressBar",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const b={title:"atoms/ProgressBar",component:e},u=r=>n(e,{...r}),a=u.bind({});var s,t,i;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`(args: any) => {
  return <ProgressBar {...args} />;
}`,...(i=(t=a.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};const w=["Default"];export{a as Default,w as __namedExportsOrder,b as default};

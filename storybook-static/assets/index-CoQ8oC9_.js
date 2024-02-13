import{j as r}from"./jsx-runtime-DI8_P1Ft.js";import{P as t}from"./index-B3IC6ylx.js";import{r as p}from"./index-DPzuYzxM.js";import{c as u,s as l}from"./styled-components.browser.esm-CLTG7J5x.js";import{B as f,P as y}from"./index-BINBIgVg.js";const _=u`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`,g=u`
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`,s=l.div`
  animation: ${({error:e,closed:a})=>e?a?g:_:"none"} 0.5s cubic-bezier(0.3, 0.7, 0.4, 1.5) forwards;
  height: ${({error:e})=>e?"89px":0};
  padding: ${({error:e})=>e?"15px":0};
  display: flex;
  justify-content: space-between;
  position: fixed;
  align-items: center;
  width: 100%;
  margin: auto;
  z-index: 999999999;
  transition: 400ms;
  box-shadow: 0px 0px 6px #00000052;
  color: ${f};
  background-color: ${({color:e})=>e==="error"?y:e==="warning"?"#ebbc26":e==="success"?"#50a773":"rgba(0, 0, 0, 0.9)"};
`,i=l.div``,c=l.span``;try{s.displayName="ContainerToast",s.__docgenInfo={description:"",displayName:"ContainerToast",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{i.displayName="ContentToast",i.__docgenInfo={description:"",displayName:"ContentToast",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{c.displayName="ContainerText",c.__docgenInfo={description:"",displayName:"ContainerText",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const n=({err:e,closed:a})=>r(s,{closed:a,color:e==null?void 0:e.color,error:!!(e!=null&&e.message),children:r(i,{children:r("div",{children:(e==null?void 0:e.message)||""})})});n.propTypes={err:t.shape({color:t.string,duration:t.number,message:t.string}),closed:t.bool.isRequired};try{n.displayName="AlertContent",n.__docgenInfo={description:"",displayName:"AlertContent",props:{err:{defaultValue:null,description:"",name:"err",required:!0,type:{name:"any"}},closed:{defaultValue:null,description:"",name:"closed",required:!0,type:{name:"any"}}}}}catch{}const d=({err:e})=>{const[a,o]=p.useState(!1);return p.useEffect(()=>{if(e){const m=setTimeout(()=>o(!0),(e.duration||7e3)/2);return()=>{clearTimeout(m),o(!1)}}},[e]),r("div",{onClick:()=>o(!0),children:r(n,{closed:a,err:e})})};d.propTypes={err:t.shape({color:t.string,duration:t.number,message:t.string})};try{d.displayName="AlertBox",d.__docgenInfo={description:"",displayName:"AlertBox",props:{err:{defaultValue:null,description:"",name:"err",required:!0,type:{name:"any"}}}}}catch{}export{d as A};

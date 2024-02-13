import{a as _,j as p}from"./jsx-runtime-DI8_P1Ft.js";import{P as e}from"./index-B3IC6ylx.js";import{r as n}from"./index-DPzuYzxM.js";import{c as N,s as d,n as S}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as T}from"./index-BINBIgVg.js";import{g as $}from"./index-CIjh_EDQ.js";const c=({checked:a,className:f="",disabled:m=!1,id:r,indeterminate:o=!1,label:h,name:b,onChange:y=(t,i)=>({event:t,id:i}),...g})=>{const t=n.useRef(null),[i,s]=n.useState(0),[k,x]=n.useState(0),C=1e3,l=n.useCallback(()=>{t&&t.current&&(t.current.indeterminate=o)},[t,o]);n.useEffect(()=>{l()},[o,l]);const v=q=>{o&&l();const u=Date.now();u-k<C?s(V=>V+1):s(1),i>=7&&s(0),x(u),y(q,r)},w={color:$("--color-text-inactive")};return _(P,{className:f||"",id:r,style:m?w:{},...g,children:[p(E,{checked:a,disabled:m,id:`checkbox-${r}`,name:b,onChange:v,ref:t,type:"checkbox"}),p(z,{checked:a,htmlFor:`checkbox-${r}`,children:h})]})};c.propTypes={checked:e.bool,className:e.string,disabled:e.bool,hideLabel:e.bool,id:e.any,indeterminate:e.bool,label:e.any,name:e.any,onChange:e.func};const j=N`
  0%: {
    width: 0;
    height: 0;
    border-color: #fff;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  33%: {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  100%: {
    width: 0.2em;
    height: 0.5em;
    border-color: #fff;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
`,P=d.span`
  align-items: center;
  cursor: pointer;
  display: grid;
`,z=d.label`
  align-items: center;
  color: #9e9e9e;
  display: flex;
  margin: 0.6em 0;
  position: relative;
  transition: color 250ms cubic-bezier(0.4,0,0.23,1);
  &&::before {
    align-items: center;
    background: transparent;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #9e9e9e inset;
    content: "";
    cursor: pointer;
    display: flex;
    height: 2em;
    justify-content: center;
    margin-right: 1em;
    min-width: 2em;
    transition: all 250ms cubic-bezier(0.4,0,0.23,1);
    width: 2em;
}
${a=>a.checked&&S`
  &&::before {
    content: "";
    cursor: pointer;
    box-shadow: 0 0 0 0.5em ${T} inset;
    animation: ${j} 200ms cubic-bezier(0.4, 0, 0.23, 1);
  }
  `}

`,E=d.input`
  width: 0;
  height: 0;
`;try{c.displayName="Checkbox",c.__docgenInfo={description:"",displayName:"Checkbox",props:{checked:{defaultValue:null,description:"",name:"checked",required:!0,type:{name:"any"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"any"}},indeterminate:{defaultValue:{value:"false"},description:"",name:"indeterminate",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"any"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"any"}},onChange:{defaultValue:{value:`(event, id) => {\r
    return {\r
      event,\r
      id\r
    }\r
  }`},description:"",name:"onChange",required:!1,type:{name:"((event: any, id: any) => { event: any; id: any; })"}}}}}catch{}export{c as C};

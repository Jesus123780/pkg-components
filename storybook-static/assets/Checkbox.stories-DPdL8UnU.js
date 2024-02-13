import{a as q,j as a}from"./jsx-runtime-DI8_P1Ft.js";import{r as z}from"./index-DPzuYzxM.js";import{c as b,s as i,n as g}from"./styled-components.browser.esm-CLTG7J5x.js";import{I as V}from"./index-BT_gM0Ba.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./tslib.es6-BF5GDGeg.js";const I=b`
  0%: {
    width: 0;
    height: 0;
    border-color: #fff;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  33%: {
    width: 0.1.5em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  },
  100%: {
    width: 0.1.5em;
    height: 0.5em;
    border-color: #fff;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
`,$=i.span`
  align-items: center;
  cursor: pointer;
  display: grid;
  position: relative;
`,N=b`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`,S=i.label`
  align-items: center;
  color: var(--color-base-black);
  display: flex;
  margin: 0.6em 0;
  position: relative;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
  &&::before {
    align-items: center;
    background: transparent;
    border-radius: 5px;
    box-shadow: 0 0 0 2px #53a600 inset;
    content: "";
    cursor: pointer;
    display: flex;
    height: 1.5em;
    justify-content: center;
    margin-right: 1em;
    min-width: 1.5em;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
    width: 1.5em;

    ${e=>e.checked&&g`
        content: "";
        color: #fff;
        cursor: pointer;
        box-shadow: 0 0 0 1em #53a600 inset;
        animation: ${I} 200ms cubic-bezier(0.4, 0, 0.23, 1);
      `}
  }
`,j=i.input`
  width: 0;
  height: 0;
`,t=({checked:e,className:c="",disabled:n=!1,id:o,indeterminate:D=!1,label:C,name:k,onChange:x=()=>{},...y})=>{const v=z.useRef(null),_=l=>{x(l,o)},w={color:"#CCC"},E=i.div`
    animation: ${({checked:l})=>l&&g`
        ${N} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      `};
    height: 1em;
    left: 8px;
    position: absolute;
    right: 0;
    stroke-width: 2;
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 1em;
    top: 10px;
    z-index: 99;
  `;return q($,{className:c||"",id:o,style:n?w:{},...y,children:[e&&a(E,{checked:e,children:a(V,{size:10,color:"#ffffff"})}),a(j,{checked:e,disabled:n,id:`checkbox-${o}`,name:k,onChange:_,ref:v,type:"checkbox"}),a(S,{checked:e,htmlFor:`checkbox-${o}`,children:C})]})};try{t.displayName="Checkbox",t.__docgenInfo={description:"",displayName:"Checkbox",props:{checked:{defaultValue:null,description:"",name:"checked",required:!0,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"any"}},indeterminate:{defaultValue:{value:"false"},description:"",name:"indeterminate",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"any"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"any"}},onChange:{defaultValue:{value:"() => {}"},description:"",name:"onChange",required:!1,type:{name:"(event: ChangeEvent<HTMLInputElement>, id?: any) => void"}}}}}catch{}const F={title:"atoms/Checkbox",component:t,argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},indeterminate:{control:"boolean"},label:{control:"text"},onChange:{action:"Checkbox Changed"}}},r=e=>a(t,{label:"Default Checkbox",checked:!1,onChange:(c,n)=>{},...e}),s=e=>a(t,{label:"Checked Checkbox",checked:!0,onChange:(c,n)=>{},...e});var d,m,h;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:'(args: any) => <Checkbox label="Default Checkbox" checked={false} onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}} {...args} />',...(h=(m=r.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var u,p,f;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:'(args: any) => <Checkbox label="Checked Checkbox" checked={true} onChange={(event: React.ChangeEvent<HTMLInputElement>, id?: any) => {}} {...args} />',...(f=(p=s.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const O=["Default","Checked"];export{s as Checked,r as Default,O as __namedExportsOrder,F as default};

import{j as u}from"./jsx-runtime-DI8_P1Ft.js";import{B as s}from"./index-DuIGVyw3.js";import"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./index-Ck7iXuwZ.js";const P={title:"atoms/Button",component:s},r=({primary:e=!0,type:o="primary",...a})=>u(s,{primary:e,type:o,...a,children:"Primary Button"}),t=({primary:e=!1,type:o="secondary",...a})=>u(s,{primary:e,type:o,...a,children:"Secondary Button"});var n,m,p;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`({
  primary = true,
  type = 'primary',
  ...rest
}) => <Button primary={primary} type={type} {...rest}>Primary Button</Button>`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,i,y;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`({
  primary = false,
  type = 'secondary',
  ...rest
}) => <Button primary={primary} type={type} {...rest}>Secondary Button</Button>`,...(y=(i=t.parameters)==null?void 0:i.docs)==null?void 0:y.source}}};const x=["Primary","Secondary"];export{r as Primary,t as Secondary,x as __namedExportsOrder,P as default};

import{j as t}from"./jsx-runtime-DI8_P1Ft.js";import{T as s}from"./index-Bww7KC1c.js";import"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./styled-components.browser.esm-CLTG7J5x.js";import"./tslib.es6-BF5GDGeg.js";import"./index-Ck7iXuwZ.js";const M={title:"atoms/Text",component:s},B=y=>t(s,{...y,children:"Basic"}),e=B.bind({});e.args={text:"Hello, Storybook!",color:"blue",fontSize:"20px",fontWeight:600};const a=()=>t(s,{size:"sm",children:"Hola"}),r=()=>t(s,{className:"custom-class",children:"Text with Custom Class"}),o=()=>t(s,{className:["class1","class2","class3"],children:"Text with Custom Class"}),c=()=>t(s,{color:"default",weight:"normal",children:"Text with Custom Class"});var l,m,i;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"(args: any) => <Text {...args}>Basic</Text>",...(i=(m=e.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var u,p,n;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:"() => <Text size='sm'>Hola</Text>",...(n=(p=a.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};var d,x,T;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:'() => <Text className="custom-class">Text with Custom Class</Text>',...(T=(x=r.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var C,h,g;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:"() => <Text className={['class1', 'class2', 'class3']}>Text with Custom Class</Text>",...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,S,w;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`() => <Text color="default" weight='normal'>Text with Custom Class</Text>`,...(w=(S=c.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const k=["Basic","Default","CustomClass","MultipleClasses","CustomStyle"];export{e as Basic,r as CustomClass,c as CustomStyle,a as Default,o as MultipleClasses,k as __namedExportsOrder,M as default};

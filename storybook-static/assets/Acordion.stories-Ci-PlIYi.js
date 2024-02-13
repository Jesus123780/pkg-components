import{j as o,F as p}from"./jsx-runtime-DI8_P1Ft.js";import{r as m}from"./index-DPzuYzxM.js";import{O as c}from"./index-CtOxyrGX.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./router-pQJNcUoK.js";import"./_interop_require_default-DgqNHo5w.js";import"./router-Dr3MF1HQ.js";import"./utils-D5IJ2A55.js";import"./router-context-1OOWBe6R.js";import"./index-RGaBZlDs.js";import"./index-B3IC6ylx.js";import"./link-B5326XFw.js";import"./use-intersection-BigaMEX4.js";import"./styled-components.browser.esm-CLTG7J5x.js";import"./tslib.es6-BF5GDGeg.js";const E={title:"molecules/Acordion",component:c},l=s=>{const[e,n]=m.useState(!1);return o(c,{...s,active:e,handleClick:()=>{n(!e)}})},t=l.bind({});t.args={children:o("div",{children:"Hola mundo"}),icon:o(p,{}),index:1,label:"Option Label",path:"/path"};var r,i,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`(args: any) => {
  const [active, setActive] = useState(false);
  const toggleAccordion = () => {
    setActive(!active);
  };
  return <Options {...args} active={active} handleClick={toggleAccordion} />;
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const F=["Default"];export{t as Default,F as __namedExportsOrder,E as default};

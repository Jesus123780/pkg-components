import{a as c,j as t}from"./jsx-runtime-DI8_P1Ft.js";import{r as v}from"./index-DPzuYzxM.js";import{C as m}from"./Carrusel3d-DBB5Zpdd.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./index-B3IC6ylx.js";const M={title:"molecules/Carrusel3D",component:m},a=()=>t("div",{style:{backgroundColor:"lightblue",width:"200px",height:"200px"},children:"Sample Card"}),e=()=>{const[l,n]=v.useState(0);return c(m,{active:l,maxView:3,moveLeft:()=>{n(r=>Math.max(r-1,0))},moveRight:()=>{n(r=>Math.min(r+1,2))},children:[t(a,{}),t(a,{}),t(a,{})]})};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [active, setActive] = useState(0);
  const handleMoveLeft = () => {
    setActive(prev => {
      return Math.max(prev - 1, 0);
    });
  };
  const handleMoveRight = () => {
    setActive(prev => {
      return Math.min(prev + 1, 2);
    }); // Assuming maxView is 3
  };
  return <Carrusel3D active={active} maxView={3} moveLeft={handleMoveLeft} moveRight={handleMoveRight}>\r
      <SampleCard />\r
      <SampleCard />\r
      <SampleCard />\r
    </Carrusel3D>;
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,M as default};

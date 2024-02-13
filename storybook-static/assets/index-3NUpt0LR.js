import{a as b,j as n}from"./jsx-runtime-DI8_P1Ft.js";import{r as f,R as s}from"./index-DPzuYzxM.js";import{P as x}from"./index-B3IC6ylx.js";import{s as a}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as l}from"./index-BINBIgVg.js";x.node.isRequired;const d=({children:e,tabBreak:i,width:c})=>{const[o,p]=f.useState(0),u=t=>{p(t)};return b(h,{children:[n(y,{breakPoint:i,columnWidth:c,role:"tablist",children:s.Children.map(e,(t,r)=>{if(s.isValidElement(t)){const{label:m}=t.props;return n(g,{"aria-selected":o===r?"true":"false",onClick:()=>u(r),role:"tab",selected:o===r,children:m})}return null})}),n(T,{children:s.Children.map(e,(t,r)=>o===r?t:null)})]})},h=a.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`,g=a.button`
  height: 50px;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: default;
  background: transparent;

  transition: border-color 0.2s ease-in;
  border: none;
  border-bottom: 4px solid ${e=>e.selected?l:"#eee"};
  &:hover,
  &:focus,
  &:active {
    border-bottom: 4px solid ${e=>e.selected?l:"#c0bebe"};
  }
`,y=a.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  display: grid;
  grid-template-columns: ${({columnWidth:e})=>e?e.map(i=>`${i} `):"1fr"};
  height: auto;
  align-items: center;
  margin: 0 auto;
  outline: none;
  @media (max-width: ${e=>e.breakPoint}) {
    flex-direction: column;
    & > div,
    & > div > button {
      width: 100%;
    }
  }
`,T=a.div`
  flex: 1;
  width: 100%;
  padding-top: 16px;
`;a.div`
  flex: 1;
  width: 100%;
`;try{d.displayName="Tabs",d.__docgenInfo={description:"",displayName:"Tabs",props:{tabBreak:{defaultValue:null,description:"",name:"tabBreak",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}}}}}catch{}export{d as T};

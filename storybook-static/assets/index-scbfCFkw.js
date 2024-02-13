import{j as i,a as n}from"./jsx-runtime-DI8_P1Ft.js";import{r as m}from"./router-pQJNcUoK.js";import{P as s}from"./index-B3IC6ylx.js";import{s as p}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as l}from"./index-BINBIgVg.js";const a=({Text:e="",children:r})=>{const t=m.useRouter(),o=t==null?void 0:t.pathname,c=o==null?void 0:o.indexOf("/");return i(d,{Text:e||(o==null?void 0:o.substring(c+1||(o==null?void 0:o.length))),children:r})},d=({children:e,Text:r})=>n(u,{children:[i(f,{children:" Buscado por"}),n("span",{style:{fontFamily:"PFont-Regular",fontSize:"1.5625rem",color:l},children:[" ",r]}),i("div",{children:e})]});d.propTypes={Text:s.string.isRequired,children:s.node.isRequired};const u=p.div`
  text-align: start;
  margin-bottom: 30px;
  width: 100%;
  margin: 40px 0;
  border-bottom: 0.0625em solid #e6e6e6;
  padding-bottom: 10px;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`,f=p.span`
  font-size: 1.5625rem;
  color: black;
  font-family: PFont-Regular;
`;try{a.displayName="LocationName",a.__docgenInfo={description:"",displayName:"LocationName",props:{Text:{defaultValue:{value:""},description:"",name:"Text",required:!1,type:{name:"string"}}}}}catch{}export{a as L};

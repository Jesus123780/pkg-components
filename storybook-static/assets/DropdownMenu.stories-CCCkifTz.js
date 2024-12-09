import{j as a,F as _,a as g}from"./jsx-runtime-DI8_P1Ft.js";import{P as n}from"./index-B3IC6ylx.js";import{s,n as h}from"./styled-components.browser.esm-CLTG7J5x.js";import{c as w}from"./index-RGaBZlDs.js";import"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./tslib.es6-BF5GDGeg.js";const t=({options:e=[],show:m,position:f})=>m?a(i,{position:f,children:e==null?void 0:e.map((o,y)=>g(d,{onClick:(o==null?void 0:o.action)||(()=>!0),children:[(o==null?void 0:o.icon)&&a(w,{icon:o.icon,size:10,style:{marginRight:"10px"}}),o==null?void 0:o.optionName]},"context_menu_option_"+y))}):a(_,{}),i=s.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 99;
    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
    border-radius: .25rem;
    padding: .5rem 0;
    min-width: 10rem;
    background-color: #fff;
    color: #343434;
    ${e=>e.position&&h`
        top: ${e.position.y}px;
        left: ${e.position.x}px;
    `}
    width: auto;
`,l=s.span`
    font-size: var(--font-size-base);
    font-weight: 500;
    text-align: left;
    padding: 6px;
`,d=s.a`
    display: block;
    width: 100%;
    padding: .35rem 1.5rem;
    clear: both;
    font-weight: 400;
    font-size: .8125rem;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &&:hover {
        color: #1e2125;
        text-decoration: none;
        background-color: #f8f9fa;
    }
`;t.propTypes={options:n.array,show:n.bool,position:n.object,onClickOutside:n.func};try{t.displayName="DropdownMenu",t.__docgenInfo={description:"",displayName:"DropdownMenu",props:{options:{defaultValue:{value:"[]"},description:"",name:"options",required:!1,type:{name:"never[]"}},show:{defaultValue:null,description:"",name:"show",required:!0,type:{name:"any"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"any"}}}}}catch{}try{i.displayName="Container",i.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{l.displayName="ContextTitle",l.__docgenInfo={description:"",displayName:"ContextTitle",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{d.displayName="DropdownItem",d.__docgenInfo={description:"",displayName:"DropdownItem",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const C={title:"molecules/DropdownMenu",component:t},b=[{optionName:"Option 1",icon:"icon1",action:()=>console.log("Option 1 clicked")},{optionName:"Option 2",icon:"icon2",action:()=>console.log("Option 2 clicked")}],T=e=>a(t,{...e}),r=T.bind({});r.args={options:b,show:!0,position:{x:100,y:100}};var p,c,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return <DropdownMenu {...args} />;
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const I=["Default"];export{r as Default,I as __namedExportsOrder,C as default};

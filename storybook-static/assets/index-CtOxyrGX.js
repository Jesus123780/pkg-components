import{a as c,j as a}from"./jsx-runtime-DI8_P1Ft.js";import{r as M}from"./router-pQJNcUoK.js";import{r as i}from"./index-DPzuYzxM.js";import{b as S,c as I}from"./index-RGaBZlDs.js";import{L}from"./link-B5326XFw.js";import{s as t,n as m}from"./styled-components.browser.esm-CLTG7J5x.js";const f=t.span`
  color: ${e=>e.active?"#090a0a":"#3e3e3e"};
    cursor: pointer;
    width: 100%;
    word-break: break-word;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--color-text-gray-light);
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 0.875rem;
`,v=t(L)`
  display: block;
  text-decoration: none;
  font-size: var(--font-size-base);
  padding: 5px 10px;
  padding-left: 10px;
  text-align: left;
  margin: 0 30px;
`,q=t.div`
  margin-left: ${e=>e.menu?"0":"-100%"};
  width: 280px;
  max-width: 280px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  transition: 0.3s;

  @media (min-width: 1024px) {
    position: static;
    width: 100%;
    margin-left: 0;
  }
`,V=t.aside`
  width: 100%;
  height: 100%;
  background: red;
  padding: 0.8em 0;
  overflow: auto;
`,h=t.button`
  width: 100%;
  height: ${({height:e})=>e||"auto"}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: none;
  outline: 0;
  position: relative;
  font-family: PFont-Regular;
  border-bottom: 1px solid #52525242;
  padding: 0;
  background: transparent;
  ${e=>e.active&&m`
        border-bottom: none;
      `};

  align-self: ${({alignSelf:e})=>e||"auto"};
  & > div:first-child {
    justify-content: space-between;
    pointer-events: none;
    padding: 10px;
    ${e=>e.active&&m``};
  }
  transition: 0.4s ease;
  overflow: hidden;
`,g=t.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 8px 0px;
  position: relative;
  width: 100%;
  z-index: 10;
`,_=t.div`
  width: 100%;
  display: block;
  overflow: auto;
  width: 100%;
  overflow: hidden;
  padding: 0;
  ${e=>e.active&&m`
        background-color: #cccccc;
        border-bottom: none;
      `};
`,T=t.div``,N=t.div`
  padding: 5px 0 50px;
  text-align: center;
  width: 100%;
  background: blue;
`,y=t.div`
  width: max-content;
  .BurgerMenu__container {
    align-items: center;
    display: flex;
    flex-direction: column;
    div {
      background-color: transparent;
      transition: all 0.3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(-180deg);
    }
  }
`;try{f.displayName="Span",f.__docgenInfo={description:"",displayName:"Span",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{v.displayName="LinkOption",v.__docgenInfo={description:"",displayName:"LinkOption",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{q.displayName="SideBarLeft",q.__docgenInfo={description:"",displayName:"SideBarLeft",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{V.displayName="BoxSideBar",V.__docgenInfo={description:"",displayName:"BoxSideBar",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{h.displayName="MenuLeft",h.__docgenInfo={description:"",displayName:"MenuLeft",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{g.displayName="Row",g.__docgenInfo={description:"",displayName:"Row",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{_.displayName="OptionMenu",_.__docgenInfo={description:"",displayName:"OptionMenu",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{T.displayName="Box",T.__docgenInfo={description:"",displayName:"Box",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{N.displayName="BoxTitleNavBar",N.__docgenInfo={description:"",displayName:"BoxTitleNavBar",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{y.displayName="ContainerBurger",y.__docgenInfo={description:"",displayName:"ContainerBurger",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const B=({active:e=!1,children:A,handleClick:d,icon:b,index:r,label:W,path:k})=>{const o=i.useRef(null),n=i.useRef(null),w=M.useRouter(),[l,x]=i.useState({height:0,heightMenu:0,status:"close"});return i.useEffect(()=>{if(!o.current||!n.current)return;const s=o.current.clientHeight-n.current.clientHeight,u=n.current.clientHeight;x(p=>({...p,height:s,heightMenu:u})),w&&w.pathname.includes(k)&&d(r)},[]),i.useEffect(()=>{const s=e?l.height+l.heightMenu:o.current.clientHeight-n.current.clientHeight,u=e?"open":"close";x(p=>({...p,height:s,status:u}))},[e]),c(h,{active:e,height:l.height,id:`menu-id__${r}`,index:r,onClick:()=>d(r),ref:o,children:[c(g,{active:e,children:[c("div",{style:{display:"flex"},children:[b&&a(b,{size:20,style:{marginRight:"10px"}}),a(f,{active:e,children:W})]}),a(y,{children:a("div",{className:"BurgerMenu__container",onClick:()=>d(r),role:"button",children:e?a(S,{color:"#252525",size:15}):a(I,{color:"#25252569",size:15})})})]}),a(_,{active:e,ref:n,children:A})]})};try{B.displayName="Options",B.__docgenInfo={description:"",displayName:"Options",props:{active:{defaultValue:{value:"false"},description:"",name:"active",required:!1,type:{name:"boolean"}},handleClick:{defaultValue:null,description:"",name:"handleClick",required:!0,type:{name:"(index: number) => void"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},path:{defaultValue:null,description:"",name:"path",required:!0,type:{name:"string"}}}}}catch{}export{B as O};

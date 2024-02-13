import{j as a,F as Q,a as d}from"./jsx-runtime-DI8_P1Ft.js";import{r as y}from"./index-DPzuYzxM.js";import{f as ue,s as me,t as b,g as fe,I as j,u as he,v as ye,w as ge,x as _e,y as be}from"./index-RGaBZlDs.js";import"./index-XORxt8qY.js";import{L as Z}from"./link-B5326XFw.js";import"./index-BApHpKep.js";import{P as c}from"./index-B3IC6ylx.js";import{s as r,n as v}from"./styled-components.browser.esm-CLTG7J5x.js";import{B as O,P as f,a as ee,f as xe,e as ve}from"./index-BINBIgVg.js";import{A as we}from"./index-BvrhFfaA.js";import{R as Ve}from"./index-TjzDTrAV.js";import{g as qe}from"./index-CIjh_EDQ.js";import{O as F}from"./index-DrTIMpa1.js";import{O as Ae}from"./index-CtOxyrGX.js";import{B as T}from"./index-DuIGVyw3.js";const C=r.div`
    overflow-y: auto;
    height: 80%;
    @media (max-width: 768px){
        height: auto;
    }
`,G=r(Z)`
    box-sizing: border-box;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    width: 100%;
    white-space: nowrap;
    height: 42px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: PFont-Regular;
    background-color: transparent;
    align-self: auto;
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid #edf2f932;
`,k=r.div`
    transition: 300ms ease;
    background-color: ${O};
    height: min-content;
    margin-bottom: 20px;
    @media (max-width: 768px){ 
        z-index: 999;
        height: 100%;
        width: 80%;
        position: absolute;
        ${({collapsed:e})=>e?v`
            transform: translate(0px, 0px);
            `:v`
            transform: translate(-800px, 0px);
              `}
    }
`,z=r.div`
    display: grid;
    padding: 10px;
    grid-template-columns: 50% repeat(auto-fill, 50%);
    position: absolute;
    background-color: ${O};
    transition: all 200ms ease 0s;
    background-color: var(--color-base-white);
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: var(--z-index-99999);
    border-radius: 5px;
    width: 400px;
    place-content: center;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 80px;
    left: 50px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }
    ${({show:e})=>e?v`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `:v`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `}
`,I=r.button`
    border-radius: 20px;
    position: relative;
    min-width: 100px;
    width: 100%;
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    border: 2px solid ${f};
    color: ${ee};
    height: 30px;
    font-size: 12px;
    cursor: pointer;
    margin: 10px auto;
    transition: 0.2s;
    background-color: transparent; 
    &:hover {
        box-shadow: rgb(232 137 137) 0px 0px 0px 2px;
    }
    &:active{
        transform: scale(0.9);
        box-shadow: rgb(210 5 5) 0px 0px 0px 2px;

    }
`,h=r.div`
    background-color: var(--color-base-white); 
    display: flex;
    flex-direction: column;
    max-height: 150px; 
    overflow: hidden; 
    position: relative;
    
    .program_state {
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        width: 90%;
        margin: 10px auto;
        display: flex;
        border: 1px solid ${xe};
    }
    .title_store {
        color: var(--color-text-gray-light);
        font-weight: 500;
        font-size: 1.5rem;
        text-align: center;
        line-height: 1.3rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
    .sub_title_store {
        color: var(--color-text-gray-light);
        font-weight: 500;
        margin-left: 5px;
        font-size: .9rem;
        line-height: 0.875rem;
        font-family: PFont-Light;
        word-break: break-word;
    }
`,H=r.div`
    min-height: 150px;
`,W=r.div`
    position: absolute;
    right: -170px;
    background: red;
    color: red;
    z-index: 99;
    top: 0;
    border: 12px solid;
`,Y=r.a`
    padding: 0px;
    display: flex;
    font-family: PFont-Regular;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;    
    display: block;
    text-decoration: none;
    // overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.2em;
    color: ${ee};
    margin: 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 13px;
    &:hover > ${W} {
        display: block;
    }
`,K=r.a`
    position: absolute;
    bottom: 15px;
    left: 0;
`,D=r.div`
    position: absolute;
    left: 180px;
    overflow: hidden;
    align-items: center;
    background-color: ${f};
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    z-index: -999;
    width: 40px;
    display: flex;
    place-content: center;
    visibility: hidden;
    transition:  0.3s ease;
    transform: translateX(-50px);
    `,X=r.button`
    background-color: transparent;
    padding: 0;
    /* background-color: RED; */

    &:hover > ${D} {
        visibility: visible;
        z-index: 99;  
        transform: translateX(0);
        /* opacity: 1; */
        /* visibility: hidden;
        transform: translateY(-50px); */
       
        /*        */
    }
    width: 100%;
    align-items: center;
    display: flex;
    position: relative;
`,U=r.button`
    background-color: transparent;
    width: 100%;
    text-align: start;
    & > svg {
        margin-right: 10px;
        margin-left: 5px;
    }
    margin-bottom: 5px;
    color: var(--color-text-gray-light);
    font-weight: 500;

`,S=r.a`
cursor: pointer;
    &.active {
        color: ${f};
        border-left: 2px solid ${f};
        & > svg {
            fill: ${f} !important;
        }
    }
    & > svg {
        margin-right: 10px;
        margin-left: 5px;
    }
    padding: 10px 3px;
    width: 100%;
    word-break: break-word;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--color-text-gray-light);
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 0.875rem;
    border-left: 2px solid transparent;
    margin-bottom: 7px;
    position: relative;
    .count_pedidos {
        background-color: ${f};
        color: ${O};
        border-radius: 50%;
        padding: 1px;
        height: 28px;
        font-size: 12px;
        width: 28px;
        align-items: center;
        display: flex;
        place-content: center;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }
    `,$=r.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px -1rem 0rem 0px rgb(18 38 63 / 3%);
    overflow: hidden;
    height: 100vh;
    background-color: ${`${ve}69`};
`;try{C.displayName="Router",C.__docgenInfo={description:"",displayName:"Router",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{G.displayName="CtnAnchor",G.__docgenInfo={description:"",displayName:"CtnAnchor",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{k.displayName="ContainerAside",k.__docgenInfo={description:"",displayName:"ContainerAside",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{z.displayName="LeftNav",z.__docgenInfo={description:"",displayName:"LeftNav",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{I.displayName="ButtonGlobalCreate",I.__docgenInfo={description:"",displayName:"ButtonGlobalCreate",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{h.displayName="Info",h.__docgenInfo={description:"",displayName:"Info",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{H.displayName="ContentOption",H.__docgenInfo={description:"",displayName:"ContentOption",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{W.displayName="SubMenuModules",W.__docgenInfo={description:"",displayName:"SubMenuModules",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{Y.displayName="Anchor",Y.__docgenInfo={description:"",displayName:"Anchor",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{K.displayName="OptionButton",K.__docgenInfo={description:"",displayName:"OptionButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{D.displayName="ContentAction",D.__docgenInfo={description:"",displayName:"ContentAction",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{X.displayName="DynamicNav",X.__docgenInfo={description:"",displayName:"DynamicNav",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{U.displayName="ButtonActionLink",U.__docgenInfo={description:"",displayName:"ButtonActionLink",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{S.displayName="AnchorRouter",S.__docgenInfo={description:"",displayName:"AnchorRouter",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{$.displayName="Card",$.__docgenInfo={description:"",displayName:"Card",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const Ne="_wrapper_custom_link_1huxb_1",Te="_active_1huxb_9",Ce="_button_1huxb_47",x={wrapper_custom_link:Ne,active:Te,"containerOption_count--notification":"_containerOption_count--notification_1huxb_17",button:Ce},_=({href:e,icon:t,size:s,count:p=0,label:i="",onClick:g=()=>{}})=>a(Q,{children:e?a(we,{activeClassName:"active",href:e,children:d(S,{children:[a(t,{size:s}),i,p?a("span",{className:x["containerOption_count--notification"],children:p}):null]})}):d("div",{className:x.wrapper_custom_link,children:[d("button",{className:x.button,onClick:g,children:[a(t,{size:s}),i]}),p?a("span",{className:x["containerOption_count--notification"],children:p}):null]})});_.propTypes={count:c.number,href:c.string,icon:c.object,label:c.string,onClick:c.func,size:c.number};try{_.displayName="CustomLinkAside",_.__docgenInfo={description:"",displayName:"CustomLinkAside",props:{href:{defaultValue:null,description:"",name:"href",required:!0,type:{name:"any"}},icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"any"}},size:{defaultValue:null,description:"",name:"size",required:!0,type:{name:"any"}},count:{defaultValue:{value:"0"},description:"",name:"count",required:!1,type:{name:"number"}},label:{defaultValue:{value:""},description:"",name:"label",required:!1,type:{name:"string"}},onClick:{defaultValue:{value:"() => { return }"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const w=({children:e,selector:t="portal"})=>{const[s,p]=y.useState(void 0);return y.useEffect(()=>{const i=window.document.getElementById(t);i&&p(i)},[s,t]),s?t===void 0?null:Ve.createPortal(e,s||"portal"):null};w.propTypes={children:c.any,selector:c.string};try{w.displayName="Portal",w.__docgenInfo={description:"Portal component for rendering children into a specified DOM element.",displayName:"Portal",props:{selector:{defaultValue:{value:"portal"},description:"",name:"selector",required:!1,type:{name:"string"}}}}}catch{}const ke=({isMobile:e=!1,location:t={pathname:"/"},countOrders:s=0,setCollapsed:p,salesOpen:i,collapsed:g=!1,dataStore:ae={storeName:"",idStore:"",uState:1},loading:te=!1,handleClick:P=o=>o,handleOpenDeliveryTime:re=()=>{},setSalesOpen:B=o=>o,setShowComponentModal:L=o=>o})=>{const[o,V]=y.useState(!1),[ne,oe]=y.useState(null),M=(t==null?void 0:t.pathname)==="/dashboard/[...name]",{storeName:u,idStore:q,uState:ie}=ae||{},le=()=>{L(3),P(3),V(!o)},de=[{href:"/dashboard",icon:me,size:"30px",label:"Home"},{href:"/pedidos",icon:b,size:"25px",label:"Pedidos",count:s??0},{href:q?`/dashboard/${u}/${q}`:"/dashboard",icon:fe,size:"30px",label:"Perfil"},{href:"/horarios",icon:j,size:"25px",label:"Horarios"},{icon:j,size:"35px",label:"Tiempo de entrega",onClick:re},{href:"/ventas",icon:b,size:"25px",label:"Ventas"},{href:"/informes",icon:he,size:"25px",label:"Informes"},{href:"/clientes",icon:ye,size:"25px",label:"Clientes"},{href:"/compras",icon:ge,size:"25px",label:"Compras"},{href:"/categorias",icon:_e,size:"25px",label:"Categorías"},{href:"/products",icon:be,size:"25px",label:"Productos",multiple:[{href:"/products",icon:b,size:"20px",label:"Productos",subLinks:[{href:"/products",icon:b,size:"20px",label:"Productos"}]}]}];y.useEffect(()=>{function n(l){l.ctrlKey&&l.key==="s"&&(l.preventDefault(),B(!i))}return document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}},[i]);const se=n=>{oe(l=>n===l?!1:n)};return d(Q,{children:[e&&a(F,{bgColor:"rgba(0, 0, 0, 0.162)",onClick:()=>p(!g),show:g,zIndex:"999"}),a(F,{bgColor:"rgba(0, 0, 0, 0.162)",onClick:()=>V(!o),show:o,zIndex:qe("--z-index-99999")}),a(k,{collapsed:e?g:!1,children:d($,{children:[d(h,{children:[a(I,{onClick:()=>V(!o),children:"Agregar Nuevo"}),a(w,{children:d(z,{show:o&&!i,children:[(t==null?void 0:t.pathname)!=="/products"&&a(h,{children:a(T,{onClick:()=>le(),children:"Productos"})}),(t==null?void 0:t.pathname)==="/products"&&a(h,{children:a(T,{onClick:()=>{L(4),P(4)},children:"Categorias"})}),a(h,{children:a(T,{onClick:()=>B(!i),children:"Ventas"})})]})}),te?null:!M&&a(Z,{href:`/dashboard/${u==null?void 0:u.replace(/\s/g,"-").toLowerCase()}/${q}`,children:a("a",{children:a("h1",{className:"title_store",children:u})})}),M&&a("h1",{className:"title_store",children:u}),ie==1&&d("div",{className:"program_state",children:[a(ue,{color:"var(--color-icons-primary)",size:"20px"}),a("h3",{className:"sub_title_store",children:"En pausa programada"})]})]}),a(C,{children:de.map(n=>{const l=n.multiple||[];return d("div",{children:[!l.length&&a(_,{count:n.count,href:n.href,icon:n.icon,label:n.label,size:n.size,...n}),Array.isArray(l)&&l.map((A,N)=>{var E;const{label:pe,href:R,icon:ce}=A||{};return a(Ae,{active:N===ne,handleClick:()=>se(N),icon:ce,index:N,label:pe,path:R,children:(E=A.subLinks)==null?void 0:E.map(m=>a(_,{href:m.href,icon:m.icon,label:m.label,size:m.size,...m},m.href))},R)})]},n.href)})})]})})]})},J=y.memo(ke);try{J.displayName="Aside",J.__docgenInfo={description:"",displayName:"Aside",props:{isMobile:{defaultValue:{value:"false"},description:"",name:"isMobile",required:!1,type:{name:"boolean"}},location:{defaultValue:{value:`{\r
    pathname: '/'\r
  }`},description:"",name:"location",required:!1,type:{name:"{ pathname: string; }"}},countOrders:{defaultValue:{value:"0"},description:"",name:"countOrders",required:!1,type:{name:"number"}},setCollapsed:{defaultValue:null,description:"",name:"setCollapsed",required:!0,type:{name:"any"}},salesOpen:{defaultValue:null,description:"",name:"salesOpen",required:!0,type:{name:"any"}},collapsed:{defaultValue:{value:"false"},description:"",name:"collapsed",required:!1,type:{name:"boolean"}},dataStore:{defaultValue:{value:`{\r
    storeName: '',\r
    idStore: '',\r
    uState: 1\r
  }`},description:"",name:"dataStore",required:!1,type:{name:"{ storeName: string; idStore: string; uState: number; }"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},handleClick:{defaultValue:{value:"(state) => { return state }"},description:"",name:"handleClick",required:!1,type:{name:"((state: any) => any)"}},handleOpenDeliveryTime:{defaultValue:{value:"() => { return }"},description:"",name:"handleOpenDeliveryTime",required:!1,type:{name:"(() => void)"}},setSalesOpen:{defaultValue:{value:"(state) => { return state }"},description:"",name:"setSalesOpen",required:!1,type:{name:"((state: any) => any)"}},setShowComponentModal:{defaultValue:{value:"(state) => { return state }"},description:"",name:"setShowComponentModal",required:!1,type:{name:"((state: any) => any)"}}}}}catch{}export{J as A};

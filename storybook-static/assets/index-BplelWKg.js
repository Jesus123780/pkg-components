import{j as t,a as n,F as y}from"./jsx-runtime-DI8_P1Ft.js";import{I}from"./image-DfgIb6x4.js";import{P as r}from"./index-B3IC6ylx.js";import{R as T}from"./index-DPzuYzxM.js";import{P as b}from"./index-BINBIgVg.js";import{s as c,n as P}from"./styled-components.browser.esm-CLTG7J5x.js";import{l as z,j as A}from"./index-RGaBZlDs.js";const s=c.div`
  position: relative;
  overflow: hidden;
  img {
    width: 170px;
    height: 170px;
    object-fit: contain;
  }
  .free {
    color: #21b478 !important;
  }
  .discount {
    padding: 5px 10px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    display: inline-block;
    margin-left: 5px;
    font-size: 0.9em;
  }

  .discount.red {
    background-color: red;
  }

  .discount.green {
    background-color: green;
  }
`,i=c.div`
  position: absolute;
  ${({left:a})=>a&&P`
        left: ${a};
      `}
  z-index: var(--z-index-40);
  transition: 0.3s ease-in-out;
  transform: translateY(30px);
  button {
    border-radius: 50px;
    height: 30px;
    width: 30px;
    padding: 5px;
    cursor: pointer;
  }
`,m=c.div`
  position: relative;
  z-index: var(--z-index-999);

  &&:hover > ${i} {
    transform: translateY(-30px);
  }

  &:before,
  &:after {
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0);
    border-radius: 0;
    transition: transform 0.2s ease, border-radius 0.1s ease 0.1s;
  }

  &:before {
    border-bottom: 1px solid var(--color-background-primary);
    border-left: 1px solid var(--color-background-primary);
    transform-origin: 0 100%;
  }
  &:after {
    border-top: 1px solid var(--color-background-primary);
    border-right: 1px solid var(--color-background-primary);
    transform-origin: 100% 0;
  }

  ${({loading:a})=>a&&P`
        &&:before,
        &&:after {
          transform: scale(1);
          border-radius: 4px;
          color: var(--color-background-primary);
        }
      `}
`,g=c.div`
  background: var(--color-base-white);
  border-radius: 4px;
  border: 1px solid var(--color-neutral-gray);
  box-shadow: var(--box-shadow-lg);
  cursor: pointer;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 146px;
  height: 147px;
  min-height: 190px;
  min-width: 320px;
  overflow: hidden;
  padding: 20px;
  position: relative;
  text-decoration: none;
  transition: 0.2s;
  width: 100%;
  z-index: var(--z-index-50);
  &:hover {
    border: 1px solid var(--color-neutral-gray-silver);
  }
  .footer {
    position: absolute;
    bottom: 15px;
  }
  .card__price,
  .card__des {
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: var(--color-text-gray-light);
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
  .card__des {
    text-decoration: line-through;
  }
  .card__description {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--color-text-gray-light);
    cursor: pointer;
    display: -webkit-box;
    font-family: SulSans, Helvetica, sans-serif;
    font-size: 0.975rem;
    font-weight: lighter;
    line-height: 1.25rem;
    list-style: none;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`;try{s.displayName="CtnBox",s.__docgenInfo={description:"",displayName:"CtnBox",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{i.displayName="TooltipCardProduct",i.__docgenInfo={description:"",displayName:"TooltipCardProduct",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{m.displayName="WrapperCard",m.__docgenInfo={description:"",displayName:"WrapperCard",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{g.displayName="CardProductsContent",g.__docgenInfo={description:"",displayName:"CardProductsContent",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const d=({isVisible:a,image:f,food:e={ProDescription:"",ProDescuento:0,ProImage:"",ProPrice:0,pName:"",pId:null},setRef:v,isEdit:x=!0,showDiscount:D=!0,loading:V=!1,onClick:w=()=>{},redirect:C=()=>{},handleDelete:q=h=>h})=>{const u=((o,l)=>{if(!o||!l)return 0;const p=parseFloat(typeof o=="string"?o.replace(/\./g,""):o),N=parseFloat(typeof l=="string"?l.replace(/\./g,""):l);if(p&&p>0){const k=N/p*100;return Math.round(k)}return 0})(e==null?void 0:e.ProPrice,e==null?void 0:e.ProDescuento);return t("div",{ref:v,children:n(m,{loading:V,children:[x&&n(y,{children:[t(i,{children:t("button",{onClick:C,children:t(z,{color:b,size:20})})}),t(i,{left:"50px",children:t("button",{onClick:()=>q(e),children:t(A,{color:b,size:20})})})]}),n(g,{onClick:w,children:[t(s,{children:a&&n(y,{children:[t("h3",{className:"card__description",children:(e==null?void 0:e.pName)||""}),t("h3",{className:"card__description",children:(e==null?void 0:e.ProDescription)||""}),n("div",{className:"footer",children:[t("span",{className:(e==null?void 0:e.ProPrice)>0?"card__price":"card__price free",children:(e==null?void 0:e.ProPrice)>0?`$ ${e==null?void 0:e.ProPrice}`:"Gratis"}),t("span",{className:"card__des",children:(e==null?void 0:e.ProDescuento)>0?`$ ${e==null?void 0:e.ProDescuento}`:null}),D&&(e==null?void 0:e.ProDescuento)>0&&n("span",{className:u>100?"discount red":"discount green",children:[u>100?"+100":u,"%"]})]})]})}),n(s,{children:[!f&&a&&t(I,{alt:(e==null?void 0:e.ProDescription)||"img",blurDataURL:"/images/DEFAULTBANNER.png",height:300,layout:"fill",objectFit:"cover",src:"/images/DEFAULTBANNER.png",width:300}),f]})]})]})})};d.propTypes={food:r.shape({ProDescription:r.string,ProDescuento:r.number,ProImage:r.any,ProPrice:r.number,pName:r.string}),handleDelete:r.func,image:r.string,isEdit:r.bool,isVisible:r.bool,loading:r.bool,onClick:r.func,redirect:r.func,setRef:r.any,showDiscount:r.bool};const _=T.memo(d);try{d.displayName="CardProductsComponent",d.__docgenInfo={description:"",displayName:"CardProductsComponent",props:{isVisible:{defaultValue:null,description:"",name:"isVisible",required:!0,type:{name:"any"}},image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"any"}},food:{defaultValue:{value:`{\r
    ProDescription: '',\r
    ProDescuento: 0,\r
    ProImage: '',\r
    ProPrice: 0,\r
    pName: '',\r
    pId: null\r
  }`},description:"",name:"food",required:!1,type:{name:"{ ProDescription: string; ProDescuento: number; ProImage: string; ProPrice: number; pName: string; pId: null; }"}},setRef:{defaultValue:null,description:"",name:"setRef",required:!0,type:{name:"any"}},isEdit:{defaultValue:{value:"true"},description:"",name:"isEdit",required:!1,type:{name:"boolean"}},showDiscount:{defaultValue:{value:"true"},description:"",name:"showDiscount",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},redirect:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"redirect",required:!1,type:{name:"(() => void)"}},handleDelete:{defaultValue:{value:`(food) => {\r
    return food\r
  }`},description:"",name:"handleDelete",required:!1,type:{name:"((food: any) => any)"}}}}}catch{}try{_.displayName="CardProducts",_.__docgenInfo={description:"",displayName:"CardProducts",props:{isVisible:{defaultValue:null,description:"",name:"isVisible",required:!0,type:{name:"any"}},image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"any"}},food:{defaultValue:{value:`{\r
    ProDescription: '',\r
    ProDescuento: 0,\r
    ProImage: '',\r
    ProPrice: 0,\r
    pName: '',\r
    pId: null\r
  }`},description:"",name:"food",required:!1,type:{name:"{ ProDescription: string; ProDescuento: number; ProImage: string; ProPrice: number; pName: string; pId: null; }"}},setRef:{defaultValue:null,description:"",name:"setRef",required:!0,type:{name:"any"}},isEdit:{defaultValue:{value:"true"},description:"",name:"isEdit",required:!1,type:{name:"boolean"}},showDiscount:{defaultValue:{value:"true"},description:"",name:"showDiscount",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},onClick:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},redirect:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"redirect",required:!1,type:{name:"(() => void)"}},handleDelete:{defaultValue:{value:`(food) => {\r
    return food\r
  }`},description:"",name:"handleDelete",required:!1,type:{name:"((food: any) => any)"}}}}}catch{}export{_ as C};

import{a as n,F as ke,j as t}from"./jsx-runtime-DI8_P1Ft.js";import{I as Pe}from"./image-DfgIb6x4.js";import{r as De}from"./router-pQJNcUoK.js";import{P as a}from"./index-B3IC6ylx.js";import{R as Ae,r as q}from"./index-DPzuYzxM.js";import{j as $e,k as Fe,l as We}from"./index-RGaBZlDs.js";import"./index-XORxt8qY.js";import{R as ze}from"./index-DCQJ1Mhm.js";import{a as Y,B as x,b as Be,P as o,D as Se,A as je}from"./index-BINBIgVg.js";import{n as f}from"./index-CIjh_EDQ.js";import{s as i,n as C}from"./styled-components.browser.esm-CLTG7J5x.js";import{T as Oe}from"./index-DH2uhswi.js";const M=i.div`
  display: flex;
  width: 100%;
  && > img {
    height: 300px;
    min-height: 300px;
    object-fit: cover;
    max-height: 300px;
    width: 100%;
  }
`,U=i.input`
  display: none;
`,s=i.span`
  position: absolute;
  height: 20px;
  width: 100px;
  right: 50px;
  color: ${Y};
  opacity: 0;
  background-color: ${x};
  font-family: PFont-Light;
  transition: 0.1s ease-in-out;
  z-index: -900;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  place-content: center;
`,N=i.div`
  width: ${({width:e})=>e||"100%"};
  margin: ${({margin:e})=>e||"initial"};
  display: flex;
  justify-content: center;
  place-items: center;
  .ProQuantity {
    padding: 10px;
  }
`,T=i.input`
  text-align: center;
  position: absolute;
  border-radius: 0.375em;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 25%);
  font-size: 20px;
  min-height: 48px;
  width: 60px;
  min-width: 40px;
  outline: none;
  left: 0;
  right: 0;
  margin: auto;
  top: 10px;
  border: none;
  &&:focus {
    box-shadow: 0 0 0 1px ${Be};
  }
`,I=i.button`
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: space-between;
  .counts--container {
    border-radius: 5px;

    .count {
      font-size: 20px;
      width: 70px;
      height: 50px;
      color: ${Y};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      &.move-up {
        animation: move-up 250ms ease-out;
        animation-fill-mode: forwards;
      }

      &.start-animate-up {
        animation: move-up-start 250ms ease-out;
        animation-fill-mode: forwards;
      }

      @keyframes move-up-start {
        0% {
          top: 0px;
        }
        100% {
          top: -50px;
          opacity: 0;
        }
      }

      @keyframes move-up {
        0% {
          top: 50px;
          opacity: 0;
        }
        100% {
          opacity: 1;
          top: 0;
        }
      }
      &.move-down {
        animation: move-down 250ms ease-out;
        animation-fill-mode: forwards;
      }

      &.start-animate-down {
        animation: move-down-start 250ms ease-out;
        animation-fill-mode: forwards;
      }

      @keyframes move-down-start {
        0% {
          top: 0px;
        }
        100% {
          top: 50px;
          opacity: 0;
        }
      }

      @keyframes move-down {
        0% {
          top: -50px;
          opacity: 1;
        }
        100% {
          opacity: 1;
          top: 0;
        }
      }
    }
  }
`,y=i.button`
  width: 90%;
  height: 100px;
  position: absolute;
  top: ${({free:e})=>e?"-30px":"0px"};
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: 0.2s ease;
  & > span {
    color: ${o};
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
  }
`,h=i.button`
  width: 100%;
  opacity: 0;
  height: 50px;
  position: absolute;
  background-color: transparent;
  bottom: ${({withCategories:e})=>e?"-30px":"-10px"};
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  margin: 0 auto;
  left: 0;
  right: 0;
  transition: 0.2s ease;
  & > span {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: var(--color-text-gray-light);
    display: flex;
    font-size: 0.675rem;
    font-weight: 400;
    left: 0;
    line-height: 1.25rem;
    max-height: calc(2 * 1.25rem);
    overflow: hidden;
    position: absolute;
    right: 0;
    text-overflow: ellipsis;
    top: 10px;
    width: 90%;
  }
`,g=i.button`
  background-color: ${o};
  color: ${x};
  padding: 4px;
  border-radius: 5px;
`,k=i.div`
  position: relative;
  margin: ${({margin:e})=>e||"0"};

  &&:hover ${y} {
    top: -30px;
  }
  &&:hover ${h} {
    bottom: -50px;
    opacity: 1;
  }
  .content-dots {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
    right: 20px;
    opacity: 1;
    bottom: -15px;
  }
  .menu-icon {
    cursor: pointer;
    height: 20px;
    position: relative;
    width: 30px;
  }

  .menu-icon span {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${o};
    top: 50%;
    left: 0;
    transform: translateY(-50%) scaleX(0.6);
    transform-origin: left center;
    transition: transform 0.3s ease-in-out;
  }

  .menu-icon span:nth-of-type(2) {
    margin-top: 10px;
    transform-origin: center center;
    transform: translateY(-50%) scaleX(0.8);
  }
  .menu-icon span:nth-of-type(3) {
    margin-top: 10px;
    transform-origin: center center;
    transform: translateY(-50%) scaleX(0.8);
  }

  .menu-icon span:last-of-type {
    transform-origin: right center;
    transform: translateY(-50%) scaleX(0.7);
  }
`,u=i.button`
  font-size: 12px;
  font-family: PFont-Light;
  cursor: pointer;
  word-break: break-word;
  box-shadow: 0px 0px 6px 0px #16101028;
  position: absolute;
  right: -50px;
  transition: 0.4s ease;
  width: 50px;
  height: 50px;
  z-index: 999;
  top: ${({top:e})=>e||"20px"};
  right: ${({right:e})=>e?"0":"-50px"};
  transition-delay: ${({delay:e})=>e||"auto"};
  max-height: 50px;
  max-width: 50px;
  border-radius: 50%;
  align-items: center;
  display: grid;
  justify-content: center;
  background-color: ${x};

  &:hover ${s} {
    opacity: 1;
    z-index: 900;
  }
  ${e=>e!=null&&e.tooltip?C`
        &::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: ${o};
          transition: 0.4s ease;
          top: 12px;
          right: 13px;
        }
      `:e.grid&&C`
        top: ${({top:p})=>p||"80px"};
      `}
`,P=i.div`
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgba(0,0,0,.05);
    display: grid;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: .2s;
    width: 100%;
    .tag {
      display: flex;
      justify-content: end;
      position: absolute;
      right: 0;
      top: 35px;
    }
    grid-template:
    "image" 157px
    "info-price"  1fr
    "info"  1fr;
    grid-gap: 10px;
    height: 400px;
    align-items: flex-end;
    align-items: baseline;
    top: 0;
    box-shadow: ${({free:e})=>e&&`0 1px 4px ${o}`};
    ${({height:e})=>C`
        height: ${e};
      `}};

    &:hover  ${u} {
        right: 15px;
    }

    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    .dish-card__info {
        font-family: SulSans,Helvetica,sans-serif;;
        cursor: pointer;;
        display: grid;;
        font-size: 16px;;
        grid-area: info;;
        grid-template-rows: 1fr;;
        height: min-content;;
        line-height: 1.15;;
        list-style: none;;
        margin: 0;;
        padding: 10px 20px;;
        text-rendering: optimizeLegibility;;
        /* padding: 0 20px; */
    }
    .dish-card__container-image {
        box-sizing: border-box;
        cursor: pointer;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        grid-area: image;
        height: 157px;
        line-height: 1.15;
        list-style: none;
        position: relative;
        text-rendering: optimizeLegibility;
        border-radius: 4px 4px 0 0;
        height: 100%;
        overflow: hidden;
        width: 100%;
    }
    .marmita-image--responsive {
        -webkit-tap-highlight-color: transparent;
        align-self: flex-start;
        border-radius: 4px 4px 0 0;
        border-style: none;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 16px;
        grid-area: image;
        height: 157px;
        line-height: 1.15;
        list-style: none;
        object-fit: cover;
        pointer-events: none;
        text-rendering: optimizeLegibility;
        width: 100%;
    }
    .dish-card__description {
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        box-sizing: border-box;
        color: var(--color-text-gray-light);
        cursor: pointer;
        display: -webkit-box;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 1.165rem;
        font-weight: 400;
        line-height: 1.5rem;
        list-style: none;
        margin-bottom: 9px;
        margin-top: 0;
        overflow: hidden;
        overflow: hidden;
        text-overflow: ellipsis;
        text-overflow: ellipsis;
        text-rendering: optimizeLegibility;
        width: 80%;
    }
    .description {
      text-rendering: optimizeLegibility;
      font-family: SulSans,Helvetica,sans-serif;
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      font-weight: lighter;
      color: ${Se};
      word-break: break-word;
      font-size: .875rem;
      line-height: 1.25rem;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
    }
    .price {
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: ${je};
    }

    .discount {
      color: var(--color-text-gray-light);
      text-decoration-line: line-through;
    }

    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }

    .info-price {
        display: flex;
        padding: 0 20px;
    }
`,D=i.div`
  position: absolute;
  width: max-content;
  right: 25px;
  background-color: transparent;
  border-radius: 50%;
`;try{M.displayName="ContentImage",M.__docgenInfo={description:"",displayName:"ContentImage",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{U.displayName="InputFile",U.__docgenInfo={description:"",displayName:"InputFile",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{s.displayName="ActionName",s.__docgenInfo={description:"",displayName:"ActionName",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{N.displayName="WrapperButton",N.__docgenInfo={description:"",displayName:"WrapperButton",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{T.displayName="InputCounter",T.__docgenInfo={description:"",displayName:"InputCounter",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{I.displayName="ItemProQuantity",I.__docgenInfo={description:"",displayName:"ItemProQuantity",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{y.displayName="OverlineFree",y.__docgenInfo={description:"",displayName:"OverlineFree",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{h.displayName="OverlineCategory",h.__docgenInfo={description:"",displayName:"OverlineCategory",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{g.displayName="Button",g.__docgenInfo={description:"",displayName:"Button",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{k.displayName="WrapperCard",k.__docgenInfo={description:"",displayName:"WrapperCard",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{u.displayName="ButtonCard",u.__docgenInfo={description:"",displayName:"ButtonCard",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{P.displayName="Card",P.__docgenInfo={description:"",displayName:"Card",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{D.displayName="ContainerActions",D.__docgenInfo={description:"",displayName:"ContainerActions",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const v=({del:e,edit:p,fileInputRef:K,free:b=!1,buttonComment:A=!1,asComment:$=!1,decrement:J=!0,increment:Z=!0,handleFree:ee,height:ae,index:m=0,pId:_,pName:F="",ProDescription:te="",ProDescuento:W=0,ProPrice:z=0,ProQuantity:B=0,render:S=null,sum:re,margin:ne,tag:l,ValueDelivery:w,widthButton:ie,activeComment:oe,dataExtra:j=[],dataOptional:O=[],dispatch:E=()=>{},handleComment:le=()=>{},handleDecrement:de=()=>{},handleDelete:se=()=>{},handleFreeProducts:R=()=>{},handleIncrement:ue=()=>{},onClick:pe=()=>{},onFileInputChange:me=()=>{},onTargetClick:ce=()=>{}})=>{const fe=De.useRouter(),[ye,d]=q.useState(""),[he,c]=q.useState(""),[L,V]=q.useState(!1),ge=()=>{setTimeout(()=>{c("move-up"),d("")},250)},ve=r=>{de(r),d(""),c(""),setTimeout(()=>{d("start-animate-down"),setTimeout(()=>{c("move-down"),d("")},150)},0)},xe=r=>{ue(r),d(""),c(""),setTimeout(()=>{d("start-animate-up"),ge()},0)},H="/images/DEFAULTBANNER.png",Q=j.length>0||O.length>0,be=new Intl.ListFormat("es",{style:"long",type:"conjunction"}),_e=new Intl.ListFormat("es",{style:"narrow",type:"unit"}),we=j.slice(0,4).map(r=>`$ ${f(r==null?void 0:r.extraPrice)}, ${r.extraName}`),Ve=be.format(we),qe=O.slice(0,4).map(r=>{var G;return(G=r==null?void 0:r.ExtProductFoodsSubOptionalAll)==null?void 0:G.map(Ie=>Ie.OptionalSubProName).join(", ")}),Ce=_e.format(qe),Ne=`${Ve}, ${Ce}`,Te=z>0?`$ ${f(z)}`:"Gratis";return n(ke,{children:[t("input",{accept:".jpg, .png .jpeg",id:"iFile",onChange:me,ref:K,style:{display:"none"},type:"file"}),n(k,{margin:ne,children:[ee&&t(y,{free:b,onClick:R,children:t("span",{children:"Gratis"})}),n(P,{free:b,height:ae,radius:"15px",children:[e&&n(u,{grid:!1,onClick:se,children:[t($e,{color:o,size:20}),t(s,{children:"Eliminar"})]}),A&&n(u,{delay:".1s",grid:!1,onClick:le,right:A&&oe,tooltip:$,top:"90px",children:[t(Fe,{color:$?o:"var(--color-neutral-gray-dark)",size:20}),t(s,{children:"Comentar"})]}),p&&n(u,{delay:".1s",grid:!1,onClick:()=>fe.push(`/update/products/editar/${_}`),top:"80px",children:[t(We,{color:o,size:20}),t(s,{children:"Editar"})]}),n("div",{className:"dish-card__info",children:[w>0&&n("span",{className:"description",children:["Domicilio $"," ",w>0?f(w):"Gratis"]}),n("div",{className:"flex-wrap",children:[t("span",{className:"price",children:b===1?"Gratis":Te}),W>0&&t("span",{className:"price discount",children:` $ ${f(W)}`})]})]}),re&&n(N,{children:[J&&t(g,{delay:".1s",grid:!1,onClick:ve,top:"80px",children:t("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z",fill:"#ffff",fillRule:"evenodd",children:" "})})}),n(I,{className:"ProQuantity",children:[t("div",{className:"counts--container",onClick:()=>V(m),children:t("div",{className:`count ${ye}${he}`,children:B})}),L===m&&t(T,{max:999,min:1,onBlur:()=>V(!1),onChange:r=>E({type:"ON_CHANGE",payload:{value:r.target.value,name:"name",index:m,id:_}}),onFocus:r=>E({type:"ON_CHANGE",payload:{value:r.target.value,name:"name",index:m,id:_}}),onKeyDown:r=>r.key==="Enter"?V(!1):null,show:L,type:"number",value:B})]}),Z&&t(g,{delay:".1s",grid:!1,onClick:xe,top:"80px",children:t("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z",fill:"#ffffff",fillRule:"evenodd"})})})]}),n("div",{className:"info-price",children:[n("span",{children:[t("h3",{className:"dish-card__description",children:F}),t("span",{className:"description",children:te})]}),t(D,{children:S&&t(ze,{bgColor:x,margin:"5px auto",onClick:()=>pe(),padding:"0",widthButton:ie,children:S})})]}),t("div",{className:"dish-card__container-image",onClick:()=>ce(),children:t(Pe,{alt:F||"",blurDataURL:H,className:"store_image",layout:"fill",objectFit:"cover",placeholder:"empty",src:H,unoptimized:!0})}),!!(l!=null&&l.tag)&&t("div",{className:"tag",children:t(Oe,{label:l==null?void 0:l.tag})})]}),Q&&t(h,{onClick:R,children:t("span",{children:Ne})}),Q&&t("div",{className:"content-dots",children:n("div",{className:"menu-icon",children:[t("span",{}),t("span",{}),t("span",{})]})})]})]})},X=Ae.memo(v);v.propTypes={ProDescription:a.any,ProDescuento:a.number,ProImage:a.string,ProPrice:a.any,ProQuantity:a.any,ValueDelivery:a.number,activeComment:a.any,asComment:a.bool,buttonComment:a.bool,dataExtra:a.array,dataOptional:a.array,decrement:a.bool,del:a.any,dispatch:a.func,edit:a.any,fileInputRef:a.any,free:a.number,handleComment:a.func,handleDecrement:a.func,handleDelete:a.func,handleFree:a.any,handleFreeProducts:a.func,handleIncrement:a.func,height:a.any,increment:a.bool,index:a.any,key:a.any,margin:a.any,onClick:a.func,onFileInputChange:a.any,onTargetClick:a.func,pId:a.any,pName:a.string,render:a.any,src:a.any,sum:a.any,tag:a.shape({tag:a.any}),widthButton:a.any};try{v.displayName="MemoCardProductSimple",v.__docgenInfo={description:"",displayName:"MemoCardProductSimple",props:{del:{defaultValue:null,description:"",name:"del",required:!0,type:{name:"any"}},edit:{defaultValue:null,description:"",name:"edit",required:!0,type:{name:"any"}},fileInputRef:{defaultValue:null,description:"",name:"fileInputRef",required:!0,type:{name:"any"}},free:{defaultValue:{value:"false"},description:"",name:"free",required:!1,type:{name:"boolean"}},buttonComment:{defaultValue:{value:"false"},description:"",name:"buttonComment",required:!1,type:{name:"boolean"}},asComment:{defaultValue:{value:"false"},description:"",name:"asComment",required:!1,type:{name:"boolean"}},decrement:{defaultValue:{value:"true"},description:"",name:"decrement",required:!1,type:{name:"boolean"}},increment:{defaultValue:{value:"true"},description:"",name:"increment",required:!1,type:{name:"boolean"}},handleFree:{defaultValue:null,description:"",name:"handleFree",required:!0,type:{name:"any"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},index:{defaultValue:{value:"0"},description:"",name:"index",required:!1,type:{name:"number"}},pId:{defaultValue:null,description:"",name:"pId",required:!0,type:{name:"any"}},pName:{defaultValue:{value:""},description:"",name:"pName",required:!1,type:{name:"string"}},ProDescription:{defaultValue:{value:""},description:"",name:"ProDescription",required:!1,type:{name:"string"}},ProDescuento:{defaultValue:{value:"0"},description:"",name:"ProDescuento",required:!1,type:{name:"number"}},ProPrice:{defaultValue:{value:"0"},description:"",name:"ProPrice",required:!1,type:{name:"number"}},ProQuantity:{defaultValue:{value:"0"},description:"",name:"ProQuantity",required:!1,type:{name:"number"}},render:{defaultValue:{value:"null"},description:"",name:"render",required:!1,type:{name:"null"}},sum:{defaultValue:null,description:"",name:"sum",required:!0,type:{name:"any"}},margin:{defaultValue:null,description:"",name:"margin",required:!0,type:{name:"any"}},tag:{defaultValue:null,description:"",name:"tag",required:!0,type:{name:"any"}},ValueDelivery:{defaultValue:null,description:"",name:"ValueDelivery",required:!0,type:{name:"any"}},widthButton:{defaultValue:null,description:"",name:"widthButton",required:!0,type:{name:"any"}},activeComment:{defaultValue:null,description:"",name:"activeComment",required:!0,type:{name:"any"}},dataExtra:{defaultValue:{value:"[]"},description:"",name:"dataExtra",required:!1,type:{name:"never[]"}},dataOptional:{defaultValue:{value:"[]"},description:"",name:"dataOptional",required:!1,type:{name:"never[]"}},dispatch:{defaultValue:{value:"() => { return }"},description:"",name:"dispatch",required:!1,type:{name:"(() => void)"}},handleComment:{defaultValue:{value:"() => { return }"},description:"",name:"handleComment",required:!1,type:{name:"(() => void)"}},handleDecrement:{defaultValue:{value:"() => { return }"},description:"",name:"handleDecrement",required:!1,type:{name:"(() => void)"}},handleDelete:{defaultValue:{value:"() => { return }"},description:"",name:"handleDelete",required:!1,type:{name:"(() => void)"}},handleFreeProducts:{defaultValue:{value:"() => { return }"},description:"",name:"handleFreeProducts",required:!1,type:{name:"(() => void)"}},handleIncrement:{defaultValue:{value:"() => { return }"},description:"",name:"handleIncrement",required:!1,type:{name:"(() => void)"}},onClick:{defaultValue:{value:"() => { return }"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onFileInputChange:{defaultValue:{value:"() => { return }"},description:"",name:"onFileInputChange",required:!1,type:{name:"(() => void)"}},onTargetClick:{defaultValue:{value:"() => { return }"},description:"",name:"onTargetClick",required:!1,type:{name:"(() => void)"}}}}}catch{}try{X.displayName="CardProductSimple",X.__docgenInfo={description:"",displayName:"CardProductSimple",props:{del:{defaultValue:null,description:"",name:"del",required:!0,type:{name:"any"}},edit:{defaultValue:null,description:"",name:"edit",required:!0,type:{name:"any"}},fileInputRef:{defaultValue:null,description:"",name:"fileInputRef",required:!0,type:{name:"any"}},free:{defaultValue:{value:"false"},description:"",name:"free",required:!1,type:{name:"boolean"}},buttonComment:{defaultValue:{value:"false"},description:"",name:"buttonComment",required:!1,type:{name:"boolean"}},asComment:{defaultValue:{value:"false"},description:"",name:"asComment",required:!1,type:{name:"boolean"}},decrement:{defaultValue:{value:"true"},description:"",name:"decrement",required:!1,type:{name:"boolean"}},increment:{defaultValue:{value:"true"},description:"",name:"increment",required:!1,type:{name:"boolean"}},handleFree:{defaultValue:null,description:"",name:"handleFree",required:!0,type:{name:"any"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},index:{defaultValue:{value:"0"},description:"",name:"index",required:!1,type:{name:"number"}},pId:{defaultValue:null,description:"",name:"pId",required:!0,type:{name:"any"}},pName:{defaultValue:{value:""},description:"",name:"pName",required:!1,type:{name:"string"}},ProDescription:{defaultValue:{value:""},description:"",name:"ProDescription",required:!1,type:{name:"string"}},ProDescuento:{defaultValue:{value:"0"},description:"",name:"ProDescuento",required:!1,type:{name:"number"}},ProPrice:{defaultValue:{value:"0"},description:"",name:"ProPrice",required:!1,type:{name:"number"}},ProQuantity:{defaultValue:{value:"0"},description:"",name:"ProQuantity",required:!1,type:{name:"number"}},render:{defaultValue:{value:"null"},description:"",name:"render",required:!1,type:{name:"null"}},sum:{defaultValue:null,description:"",name:"sum",required:!0,type:{name:"any"}},margin:{defaultValue:null,description:"",name:"margin",required:!0,type:{name:"any"}},tag:{defaultValue:null,description:"",name:"tag",required:!0,type:{name:"any"}},ValueDelivery:{defaultValue:null,description:"",name:"ValueDelivery",required:!0,type:{name:"any"}},widthButton:{defaultValue:null,description:"",name:"widthButton",required:!0,type:{name:"any"}},activeComment:{defaultValue:null,description:"",name:"activeComment",required:!0,type:{name:"any"}},dataExtra:{defaultValue:{value:"[]"},description:"",name:"dataExtra",required:!1,type:{name:"never[]"}},dataOptional:{defaultValue:{value:"[]"},description:"",name:"dataOptional",required:!1,type:{name:"never[]"}},dispatch:{defaultValue:{value:"() => { return }"},description:"",name:"dispatch",required:!1,type:{name:"(() => void)"}},handleComment:{defaultValue:{value:"() => { return }"},description:"",name:"handleComment",required:!1,type:{name:"(() => void)"}},handleDecrement:{defaultValue:{value:"() => { return }"},description:"",name:"handleDecrement",required:!1,type:{name:"(() => void)"}},handleDelete:{defaultValue:{value:"() => { return }"},description:"",name:"handleDelete",required:!1,type:{name:"(() => void)"}},handleFreeProducts:{defaultValue:{value:"() => { return }"},description:"",name:"handleFreeProducts",required:!1,type:{name:"(() => void)"}},handleIncrement:{defaultValue:{value:"() => { return }"},description:"",name:"handleIncrement",required:!1,type:{name:"(() => void)"}},onClick:{defaultValue:{value:"() => { return }"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onFileInputChange:{defaultValue:{value:"() => { return }"},description:"",name:"onFileInputChange",required:!1,type:{name:"(() => void)"}},onTargetClick:{defaultValue:{value:"() => { return }"},description:"",name:"onTargetClick",required:!1,type:{name:"(() => void)"}}}}}catch{}export{X as C};

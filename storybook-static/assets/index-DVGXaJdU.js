import{j as n,a as N}from"./jsx-runtime-DI8_P1Ft.js";import{P as a}from"./index-B3IC6ylx.js";import{s as l}from"./styled-components.browser.esm-CLTG7J5x.js";const d=l.div`
  display: inline-flex;
  border: ${({border:e})=>e||"1px solid #dcdcdc"};
  border-radius: 4px;
  margin-right: 10px;
  line-height: 1.15;
  font-family: PFont-Regular;
  font-size: 16px;
  box-sizing: border-box;
  display: inline-flex;
  border-radius: 4px;
  margin-right: 15px;
  width: ${({width:e})=>e||"100%"};
  margin: ${({margin:e})=>e||"auto"};
  @media only screen and (min-width: 960px) {
    .dish-action__counter {
      margin-right: 15px;
    }
  }
`,u=l.div`
  display: inline-flex;
  display: flex;
  align-items: center;
  position: relative;
  ${({padding:e})=>`padding: ${e??"10px"}`}
`,i=l.button`
  margin-left: 0;
  margin-right: 0;
  background-color: transparent;
  &&:disabled {
    opacity: 0.4;
    cursor: no-drop;
  }

  .btn-icon.btn-icon--transparent {
    background: transparent;
    color: #ea1d2c;
  }
`,s=l(i)``;try{d.displayName="ContainerQuantity",d.__docgenInfo={description:"",displayName:"ContainerQuantity",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{u.displayName="MarmitaCounter",u.__docgenInfo={description:"",displayName:"MarmitaCounter",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{i.displayName="ButtonIncrement",i.__docgenInfo={description:"",displayName:"ButtonIncrement",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{s.displayName="ButtonDecrement",s.__docgenInfo={description:"",displayName:"ButtonDecrement",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const B="_zoomOutUp_1qfp0_1",t={"dish-action__counter":"_dish-action__counter_1qfp0_3","marmita-counter":"_marmita-counter_1qfp0_25","marmita-counter__value_label":"_marmita-counter__value_label_1qfp0_39",zoomOutUp:B,"btn-icon":"_btn-icon_1qfp0_93","btn-icon--transparent":"_btn-icon--transparent_1qfp0_113","marmita-counter__value":"_marmita-counter__value_1qfp0_39"},c=({border:e,margin:p,padding:f,label:_="",quantity:r=null,disabled:m=!1,showNegativeButton:y=!1,showPositiveButton:h=!1,validationOne:g,classNameQuantity:b="",validationZero:v=!1,width:q,handleDecrement:w=()=>{},handleIncrement:V=()=>{},...x})=>{const o=v&&r>=0;return n("div",{...x,children:n(d,{border:e,margin:p,width:q,children:N(u,{"data-test-id":"marmita-counter",padding:f,children:[r!=0&&n(s,{className:t["btn-icon btn-icon--primary btn-icon--size-m btn-icon--transparent marmita-counter__btn-decrement"],disabled:y||o||m,onClick:()=>g?()=>{}:w(),type:"button",children:n("span",{className:t["icon-marmita icon-marmita--minus-sign"],children:n("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",children:n("path",{d:"M17.993 11c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1h11.986z",fill:o?"transparent":"#EA1D2C",fillRule:"evenodd",children:" "})})})}),n("span",{className:t["marmita-counter__value_label"],children:_}),r!=0&&n("div",{className:`${t["marmita-counter__value"]} ${b}`,children:o?null:r}),n(i,{disabled:h||m,onClick:()=>V(),type:"button",children:n("span",{className:t["icon-marmita icon-marmita--plus-sign"],children:n("svg",{height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg",children:n("path",{d:"M13 11h4.993c.556 0 1.007.444 1.007 1 0 .552-.45 1-1.007 1H13v4.993C13 18.55 12.556 19 12 19c-.552 0-1-.45-1-1.007V13H6.007A1.001 1.001 0 0 1 5 12c0-.552.45-1 1.007-1H11V6.007C11 5.45 11.444 5 12 5c.552 0 1 .45 1 1.007V11z",fill:"#EA1D2C",fillRule:"evenodd"})})})})]})})})};c.propTypes={border:a.any,classNameQuantity:a.string,disabled:a.bool,handleDecrement:a.func,handleIncrement:a.func,label:a.string,margin:a.any,padding:a.any,quantity:a.number,showNegativeButton:a.bool,showPositiveButton:a.bool,validationOne:a.any,validationZero:a.bool,width:a.any};try{c.displayName="QuantityButton",c.__docgenInfo={description:"",displayName:"QuantityButton",props:{border:{defaultValue:null,description:"",name:"border",required:!0,type:{name:"any"}},margin:{defaultValue:null,description:"",name:"margin",required:!0,type:{name:"any"}},padding:{defaultValue:null,description:"",name:"padding",required:!0,type:{name:"any"}},label:{defaultValue:{value:""},description:"",name:"label",required:!1,type:{name:"string"}},quantity:{defaultValue:{value:"null"},description:"",name:"quantity",required:!1,type:{name:"null"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},showNegativeButton:{defaultValue:{value:"false"},description:"",name:"showNegativeButton",required:!1,type:{name:"boolean"}},showPositiveButton:{defaultValue:{value:"false"},description:"",name:"showPositiveButton",required:!1,type:{name:"boolean"}},validationOne:{defaultValue:null,description:"",name:"validationOne",required:!0,type:{name:"any"}},classNameQuantity:{defaultValue:{value:""},description:"",name:"classNameQuantity",required:!1,type:{name:"string"}},validationZero:{defaultValue:{value:"false"},description:"",name:"validationZero",required:!1,type:{name:"boolean"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"any"}},handleDecrement:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleDecrement",required:!1,type:{name:"(() => void)"}},handleIncrement:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleIncrement",required:!1,type:{name:"(() => void)"}}}}}catch{}export{c as Q};

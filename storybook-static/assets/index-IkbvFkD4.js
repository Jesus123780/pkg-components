import{a as K,j as u}from"./jsx-runtime-DI8_P1Ft.js";import{s as p,n as i}from"./styled-components.browser.esm-CLTG7J5x.js";import{o as Q,r as U,i as X,a as Y}from"./index-Ck7iXuwZ.js";import{r as o}from"./index-DPzuYzxM.js";import{B as Z}from"./index-DuIGVyw3.js";const d=p.div`
  display: block;
  background-color: transparent;
  border-radius: 2px;
  z-index: 10;
  font-size: 10px;
  color: blue;
`,s=p.span`
  position: absolute;
  transition: 0.2s ease;
  text-align: left;
  font-size: ${({value:e})=>e?"1rem":"16px"};
  top: ${({value:e,labelTop:t})=>e?"7px":t||"35px"};
  left: ${({value:e})=>e?"10px":"25px"};
  color: ${({value:e,error:t})=>e?"#ccc":t?"red":"#ccc"};
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  background-color: var(--color-base-white);
  ${({type:e})=>e==="date"&&i`
        top: -8px;
        left: 5px;
      `}
`,ee=p.input`
  outline: none;
  font-family: PFont-Light;
  font-weight: 500;
  border: 1px solid #D0D5DD;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px inset;
    ${({border:e="#524e4e"})=>e};
  font-size: ${({size:e="18px"})=>e||"18px"};
  width: ${({width:e="100%"})=>e};
  border-radius: ${({radius:e="15px 5px 5px 15px"})=>e||"15px 5px 5px 15px"};

  color: ${({type:e,value:t})=>e==="date"&&!t?"#0f0e0e":"#707070"};
  padding: ${({type:e,paddingInput:t})=>e==="date"?"15px":t||"20px 10px"};

  &:focus {
    ~ ${s} {
      top: -6px;
      left: 0px;
      font-size: 18px;
      color: #ccc;
      background-color: red;
      padding: 0px 5px;
    }
  }

  &:disabled {
    cursor: no-drop;
  }

  // Hover Styles
  &:hover ~ ${d} {
    display: block;
  }

  // Error Styles
  ${({error:e})=>e&&i`
        border: 0.5px solid red;
      `}

  // Margins
  ${({margin:e})=>!!e&&i`
        margin: ${e};
      `}

  // Minimum Width
  ${({minWidth:e})=>e&&i`
        min-width: ${e};
      `}
`;try{d.displayName="Tooltip",d.__docgenInfo={description:"",displayName:"Tooltip",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{s.displayName="LabelInput",s.__docgenInfo={description:"",displayName:"LabelInput",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const q=({autoComplete:e="off",border:t="",checked:f=!1,autoFocus:h=!1,dataForm:ae={},disabled:_=!1,display:$="",email:m=!1,error:l="",labelTop:w="",labelButton:I="",fontSize:T="18px",height:re,labelColor:C,letters:E,margin:F="0",maxWidth:te="",minWidth:ne="",name:L="",nit:le=!1,numeric:c=!1,onChange:W=x=>x,padding:ie="",paddingInput:z="",pass:D,passConfirm:se,placeholder:N="",radius:k="",range:n,reference:S,required:y,title:A="",type:g="text",typeTextarea:ue=!1,value:v="",width:B="100%",onFocus:M=()=>{},setDataValue:oe=()=>{},onBlur:j=()=>{},...P})=>{const H=m?"off":e||"off",[R,b]=o.useState(l),[de,O]=o.useState("El campo no debe estar vacío"),r=(a,V,J)=>{b(V),V&&O(J),W(a)};o.useEffect(()=>{b(l)},[l]);const G=a=>{if(y){if(a.target.value.length==0)return r(a,!0,"El campo no debe estar vacío");r(a,!1,"")}if(c){if(isNaN(parseFloat(a.target.value)))return r(a,!0,"El campo debe ser numérico");r(a,!1,"")}if(E){if(Q(a.target.value))return r(a,!0,"El campo debe contener solo letras");r(a,!1,"")}if(n){if(U(a.target.value,n.min,n.max))return r(a,!0,`El rango de caracteres es de ${n.min} a ${n.max}`);r(a,!1,"")}if(m){if(X(a.target.value))return r(a,!0,"El formato de email no es válido");r(a,!1,"")}if(D){if(Y(a.target.value))return r(a,!0,"La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.");r(a,!1,"")}if(a)return r(a,!1,"")};return K("div",{style:{width:B,display:"flex"},children:[u(ee,{...P,autoComplete:g==="password"?"current-password":H,autoFocus:h,border:t,checked:f,"data-required":y,disabled:_,display:$,error:R,focus:M,margin:F,name:L,numeric:c,onBlur:j,onChange:a=>G(a),paddingInput:z,placeholder:N,radius:k,ref:S,size:T,value:v}),u(s,{error:l,labelColor:C,labelTop:w,type:g,value:v,children:A}),u(Z,{styles:{margin:"0 0 0 3px"},primary:!0,width:"207px",borderRadius:"5px 50px 50px 5px",fontSize:"22px",children:I})]})};try{q.displayName="Input",q.__docgenInfo={description:"",displayName:"Input",props:{autoComplete:{defaultValue:{value:"off"},description:"",name:"autoComplete",required:!1,type:{name:"string"}},border:{defaultValue:{value:""},description:"",name:"border",required:!1,type:{name:"string"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},letters:{defaultValue:null,description:"",name:"letters",required:!1,type:{name:"string"}},labelTop:{defaultValue:{value:""},description:"",name:"labelTop",required:!1,type:{name:"string"}},fontSize:{defaultValue:{value:"18px"},description:"",name:"fontSize",required:!1,type:{name:"string"}},display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}},error:{defaultValue:{value:""},description:"",name:"error",required:!1,type:{name:"string"}},autoFocus:{defaultValue:{value:"false"},description:"",name:"autoFocus",required:!1,type:{name:"boolean"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string | boolean"}},email:{defaultValue:{value:"false"},description:"",name:"email",required:!1,type:{name:"boolean"}},dataForm:{defaultValue:{value:"{}"},description:"",name:"dataForm",required:!1,type:{name:"any"}},labelColor:{defaultValue:null,description:"",name:"labelColor",required:!1,type:{name:"string"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},maxWidth:{defaultValue:{value:""},description:"",name:"maxWidth",required:!1,type:{name:"string"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},nit:{defaultValue:{value:"false"},description:"",name:"nit",required:!1,type:{name:"boolean"}},numeric:{defaultValue:{value:"false"},description:"",name:"numeric",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:`(e) => {\r
    return e;\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},paddingInput:{defaultValue:{value:""},description:"",name:"paddingInput",required:!1,type:{name:"string"}},pass:{defaultValue:null,description:"",name:"pass",required:!1,type:{name:"boolean"}},passConfirm:{defaultValue:null,description:"",name:"passConfirm",required:!1,type:{name:"boolean"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},radius:{defaultValue:{value:""},description:"",name:"radius",required:!1,type:{name:"string"}},range:{defaultValue:null,description:"",name:"range",required:!1,type:{name:"ValidationRange"}},reference:{defaultValue:null,description:"",name:"reference",required:!1,type:{name:"RefObject<HTMLInputElement>"}},required:{defaultValue:null,description:"",name:"required",required:!1,type:{name:"boolean"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"string"}},typeTextarea:{defaultValue:{value:"false"},description:"",name:"typeTextarea",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string | number | readonly string[]"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},labelButton:{defaultValue:{value:""},description:"",name:"labelButton",required:!1,type:{name:"string"}},onFocus:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"onFocus",required:!1,type:{name:"(() => void)"}},setDataValue:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"setDataValue",required:!1,type:{name:"(() => void)"}},onBlur:{defaultValue:{value:`() => {\r
    return;\r
  }`},description:"",name:"onBlur",required:!1,type:{name:"(() => void)"}},onInvalid:{defaultValue:null,description:"",name:"onInvalid",required:!1,type:{name:"(() => void)"}}}}}catch{}export{q as I};

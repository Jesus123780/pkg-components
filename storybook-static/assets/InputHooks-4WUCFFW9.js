import{a as ie,j as s}from"./jsx-runtime-DI8_P1Ft.js";import{P as r}from"./index-B3IC6ylx.js";import{r as i}from"./index-DPzuYzxM.js";import{B as j,c as ze,d as ue,E as H,e as We}from"./index-BINBIgVg.js";import{p as Be,q as je}from"./index-RGaBZlDs.js";import{o as He,r as Me,i as Re,a as Ue,b as Ge,c as Ke,d as de}from"./index-CIjh_EDQ.js";import{s as p,n as l}from"./styled-components.browser.esm-CLTG7J5x.js";const Oe=(e,o=()=>{})=>{const m=e.split("@")[1];let u="";if(m!==void 0)if(m==="")u="please provide email address domain",o(u);else{const w=/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-+]?){0,62})\w)+)\.(\w{2,6})$/;m.match(w)||(u="please verify email address domain",o(u))}return u},L=p.div`
  position: relative;
  padding: ${({padding:e})=>e||"15px 5px"};
  width: ${({width:e})=>e||"100%"};
  ${({minWidth:e})=>e&&l`
        min-width: ${e};
      `}
  ${({maxWidth:e})=>e&&l`
        max-width: ${e};
      `}
`,D=p.ul`
  position: absolute;
  width: 98%;
  border: 1px solid #aaa;
  margin: 13px 0px;
  background-color: ${j};
  font-weight: 300;
  font-size: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 2;
  padding: ${({padding:e})=>e||"15px 5px"};
  width: ${({width:e})=>e||"100%"};
  ${({minWidth:e})=>e&&l`
        min-width: ${e};
      `}
  ${({maxWidth:e})=>e&&l`
        max-width: ${e};
      `}
`,F=p.ul`
  position: relative;
  padding: ${({padding:e})=>e||"15px 5px"};
  width: ${({width:e})=>e||"100%"};
  ${({minWidth:e})=>e&&l`
        min-width: ${e};
      `}
  ${({maxWidth:e})=>e&&l`
        max-width: ${e};
      `}
    &:hover {
    cursor: pointer;
    background-color: #aca5a537;
  }
`,P=p.button`
  position: absolute;
  left: 80%;
  top: 26px;
  background-color: transparent;
  margin: auto;
`,v=p.div`
  display: block;
  background-color: transparent;
  border-radius: 2px;
  z-index: 10;
  font-size: 10px;
  color: ${ze};
`,b=p.span`
  position: absolute;
  transition: 0.2s ease;
  text-align: left;
  font-size: ${({value:e})=>e?"1rem":"16px"};
  top: ${({value:e,labelTop:o})=>e?"7px":o||"35px"};
  left: ${({value:e})=>e?"10px":"25px"};
  color: ${({value:e,error:o})=>e?ue:o?H:ue};
  pointer-events: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: PFont-Light;
  background-color: var(--color-base-white);
  ${({type:e})=>e==="date"&&l`
        top: -8px;
        left: 5px;
      `}
`,z=p.textarea`
  color: ${e=>e.type==="date"&&!e.value?"#CCC":"#272323"};
  padding: ${e=>e.padding?e.padding:"15px 10px"};
  outline: 0;
  border: ${({border:e})=>e||"1px solid #ccc"};
  font-weight: 600;
  font-size: ${({size:e})=>e||"13px"};
  width: ${({width:e})=>e||"-webkit-fill-available"};
  border-radius: ${({radius:e})=>e||"2px"};
  ${({margin:e})=>!!e&&l`
        margin: ${e};
      `}
  ${({minWidth:e})=>e&&l`
        min-width: ${e};
      `}
    &:focus ~ ${b} {
    top: -6px;
    left: 0px;
    font-size: 14px;
    color: #ccc;
    background-color: ${j};
    padding: 0px 5px;
  }
  &:focus {
    border: 1px solid '#35a8df';
  }
  &:disabled {
    cursor: no-drop;
  }
  &:hover ~ ${v} {
    display: block;
  }
  ${({error:e})=>e&&l`
        border: 0.5px solid ${H};
      `}
  ${({height:e})=>!!e&&l`
        max-height: ${e};
      `}
    ${({height:e})=>!!e&&l`
        min-height: ${e};
      `}
`,W=p.input`
  outline: none;
  font-family: PFont-Light;
  font-weight: 500;
  border: none;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 0px 1px inset;
    ${({border:e="#524e4e"})=>e};
  font-size: ${({size:e="15px"})=>e};
  width: ${({width:e="100%"})=>e};
  border-radius: ${({radius:e="5px"})=>e};

  // Conditional Styles
  color: ${({type:e,value:o})=>e==="date"&&!o?"#0f0e0e":"#272323"};
  padding: ${({type:e,paddingInput:o})=>e==="date"?"15px":o||"20px 10px"};

  // Focus Styles
  &:focus {
    ~ ${b} {
      top: -6px;
      left: 0px;
      font-size: 14px;
      color: #ccc;
      background-color: ${j};
      padding: 0px 5px;
    }
  }

  // Disabled Styles
  &:disabled {
    cursor: no-drop;
  }

  // Hover Styles
  &:hover ~ ${v} {
    display: block;
  }

  // Error Styles
  ${({error:e})=>e&&l`
        border: 0.5px solid ${H};
      `}

  // Margins
  ${({margin:e})=>!!e&&l`
        margin: ${e};
      `}

  // Minimum Width
  ${({minWidth:e})=>e&&l`
        min-width: ${e};
      `}
`;try{L.displayName="BoxInput",L.__docgenInfo={description:"",displayName:"BoxInput",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{D.displayName="Listbox",D.__docgenInfo={description:"",displayName:"Listbox",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{F.displayName="List",F.__docgenInfo={description:"",displayName:"List",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{P.displayName="ShowPass",P.__docgenInfo={description:"",displayName:"ShowPass",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{v.displayName="Tooltip",v.__docgenInfo={description:"",displayName:"Tooltip",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{b.displayName="LabelInput",b.__docgenInfo={description:"",displayName:"LabelInput",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{z.displayName="TextAreaInput",z.__docgenInfo={description:"",displayName:"TextAreaInput",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{W.displayName="InputV",W.__docgenInfo={description:"Styled input component",displayName:"InputV",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const B=({autoComplete:e="off",border:o="",Cc:q,checked:m=!1,autoFocus:u,dataForm:w={},disabled:M=!1,display:pe="",email:$=!1,error:x=!1,labelTop:ce="",fontSize:R="14px",height:me,labelColor:fe,letters:ye,margin:ge="0",maxWidth:U="",minWidth:G="",name:I="",nit:he=!1,numeric:V=!1,onChange:ve=y=>y,padding:K="",paddingInput:O="",pass:J,passConfirm:c,placeholder:Q="",radius:X="",range:f,reference:Y,required:T,title:be="",messageError:xe="",type:_="text",typeTextarea:Ve=!1,value:S="",width:Z="100%",onFocus:_e=()=>{},onInvalid:qe=()=>{},setDataValue:we=()=>{},onBlur:ee=()=>{},...ae})=>{const[y,re]=i.useState(x),[k,$e]=i.useState(!1),[Ie,te]=i.useState(xe||"El campo no debe estar vacío"),[ne,C]=i.useState(!1),[Te,Se]=i.useState([]),t=(a,n,d)=>{re(n),n&&te(d),ve(a,n)};i.useEffect(()=>{re(x)},[x]);const g=["gmail.com","outlook.com","hotmail.com","live.com","yahoo.com","icloud.com"],ke=["gmail.com","gmail.co.uk","outlook.com","outlook.co.uk","yahoo.com","yahoo.ca","hotmail.com","live.com","icloud.com"],Ce=a=>{const n=a.split("@"),d=n[0],N=n[1];let A=[];return N!==void 0&&(N===""?A=g==null?void 0:g.map(h=>d+"@"+h):A=ke.filter(h=>h.startsWith(N)).map(h=>d+"@"+h)),A},Ee=a=>{if(C(!1),a){const n=Ce(a);n.length>1?(C(!0),Se(n)):Oe(a,te)}},Ne="",Ae="",Le="",De={selectedIndex:0};function Fe(a,n){switch(n.type){case"arrowUp":return{selectedIndex:a.selectedIndex!==0?a.selectedIndex-1:g.length-1};case"arrowDown":return{selectedIndex:a.selectedIndex!==g.length-1?a.selectedIndex+1:0};case"Backspace":return{selectedIndex:0};case"select":return{selectedIndex:n.payload};default:return null}}const[le,oe]=i.useReducer(Fe,De);i.useEffect(()=>{},[Ne,Le,Ae]);const E=i.useRef({focus:()=>{}}),Pe=()=>{C(!ne),setTimeout(()=>{E.current.focus()})},se=a=>{if(Ee(a.target.value),T){if(a.target.value.length==0)return t(a,!0,"El campo no debe estar vacío");t(a,!1,"")}if(V){if(isNaN(parseFloat(a.target.value)))return t(a,!0,"El campo debe ser numérico");t(a,!1,"")}if(ye){if(He(a.target.value))return t(a,!0,"El campo debe contener solo letras");t(a,!1,"")}if(f){if(Me(a.target.value,f.min,f.max))return t(a,!0,`El rango de caracteres es de ${f.min} a ${f.max}`);t(a,!1,"")}if($){if(Re(a.target.value))return t(a,!0,"El formato de email no es válido");t(a,!1,"")}if(J){if(Ue(a.target.value))return t(a,!0,"La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.");t(a,!1,"")}if(he){if(Ge(a.target.value))return t(a,!0,"El nit no es correcto");t(a,!1,"")}if(q){if(Ke(a.target.value))return t(a,!0,"El numero de documento no es correcto");t(a,!1,"")}if(_=="tel"){if(de(a.target.value))return t(a,!0,"El numero de teléfono no es correcto");t(a,!1,"")}if(c!=null&&c.validate){if(de(a.target.value,c==null?void 0:c.passValue))return t(a,!0,"Las contraseñas no coinciden.");t(a,!1,"")}if(a)return t(a,!1,"")};return ie(L,{...ae,maxWidth:U,minWidth:G,padding:K,width:Z,children:[J&&s(P,{onClick:()=>$e(!k),type:"button",children:k?s(Be,{size:"20px"}):s(je,{size:"20px"})}),Ve?s(z,{autoFocus:u,border:o,"data-required":T,disabled:M,error:y,height:me,maxWidth:U,minWidth:G,name:I,numeric:V,onBlur:ee,onChange:se,padding:K,paddingInput:O,placeholder:Q,radius:X,ref:Y,size:R,value:S||"",width:Z}):ie("div",{children:[s(W,{...ae,autoComplete:_==="password"?"current-password":$?"off":e||"off",autoFocus:u,border:o,checked:m,"data-required":T,disabled:M,display:pe,error:y,focus:_e,margin:ge,name:I,numeric:V,onBlur:ee||(()=>{}),onChange:a=>se(a),onFocus:()=>{},onInvalid:qe,paddingInput:O,placeholder:Q,radius:X,ref:$?E:Y,size:R,type:k?"text":V?"number":_,value:S}),!!ne&&s("div",{children:s(D,{role:"listbox",children:Te.map((a,n)=>s(F,{"aria-pressed":n===le.selectedIndex,onClick:()=>{oe({type:"select",payload:n}),Pe(),we({...w,[I]:a})},onKeyPress:d=>{d.key==="Enter"&&(d.preventDefault(),oe({type:"select",payload:n}),d.target.blur())},style:{cursor:"pointer",backgroundColor:n===le.selectedIndex?`${We}2e`:"transparent"},tabIndex:0,children:a},n))})})]}),s(b,{error:x,labelColor:fe,labelTop:ce,onClick:()=>E.current.focus(),type:_,value:S,children:be}),y&&s(v,{children:Ie})]})};B.propTypes={Cc:r.any,autoComplete:r.string,autoFocus:r.any,border:r.string,checked:r.bool,dataForm:r.object,disabled:r.bool,display:r.string,email:r.shape({split:r.func}),error:r.string,fontSize:r.string,height:r.any,labelColor:r.any,labelTop:r.any,letters:r.any,margin:r.string,maxWidth:r.string,minWidth:r.string,name:r.string,nit:r.bool,numeric:r.bool,onBlur:r.func,onChange:r.func,onFocus:r.func,messageError:r.string,onInvalid:r.func,padding:r.string,paddingInput:r.string,pass:r.any,passConfirm:r.shape({passValue:r.any,validate:r.any}),placeholder:r.string,radius:r.string,range:r.shape({max:r.any,min:r.any}),reference:r.any,required:r.any,setDataValue:r.func,title:r.string,type:r.string,typeTextarea:r.bool,value:r.string,width:r.string};try{B.displayName="InputHooks",B.__docgenInfo={description:"",displayName:"InputHooks",props:{autoComplete:{defaultValue:{value:"off"},description:"",name:"autoComplete",required:!1,type:{name:"string"}},border:{defaultValue:{value:""},description:"",name:"border",required:!1,type:{name:"string"}},Cc:{defaultValue:null,description:"",name:"Cc",required:!0,type:{name:"any"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},autoFocus:{defaultValue:null,description:"",name:"autoFocus",required:!0,type:{name:"any"}},dataForm:{defaultValue:{value:"{}"},description:"",name:"dataForm",required:!1,type:{name:"{}"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},display:{defaultValue:{value:""},description:"",name:"display",required:!1,type:{name:"string"}},email:{defaultValue:{value:"false"},description:"",name:"email",required:!1,type:{name:"boolean"}},error:{defaultValue:{value:"false"},description:"",name:"error",required:!1,type:{name:"boolean"}},labelTop:{defaultValue:{value:""},description:"",name:"labelTop",required:!1,type:{name:"string"}},fontSize:{defaultValue:{value:"14px"},description:"",name:"fontSize",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"any"}},labelColor:{defaultValue:null,description:"",name:"labelColor",required:!0,type:{name:"any"}},letters:{defaultValue:null,description:"",name:"letters",required:!0,type:{name:"any"}},margin:{defaultValue:{value:"0"},description:"",name:"margin",required:!1,type:{name:"string"}},maxWidth:{defaultValue:{value:""},description:"",name:"maxWidth",required:!1,type:{name:"string"}},minWidth:{defaultValue:{value:""},description:"",name:"minWidth",required:!1,type:{name:"string"}},name:{defaultValue:{value:""},description:"",name:"name",required:!1,type:{name:"string"}},nit:{defaultValue:{value:"false"},description:"",name:"nit",required:!1,type:{name:"boolean"}},numeric:{defaultValue:{value:"false"},description:"",name:"numeric",required:!1,type:{name:"boolean"}},onChange:{defaultValue:{value:`(e) => {\r
    return e\r
  }`},description:"",name:"onChange",required:!1,type:{name:"((e: any) => any)"}},padding:{defaultValue:{value:""},description:"",name:"padding",required:!1,type:{name:"string"}},paddingInput:{defaultValue:{value:""},description:"",name:"paddingInput",required:!1,type:{name:"string"}},pass:{defaultValue:null,description:"",name:"pass",required:!0,type:{name:"any"}},passConfirm:{defaultValue:null,description:"",name:"passConfirm",required:!0,type:{name:"any"}},placeholder:{defaultValue:{value:""},description:"",name:"placeholder",required:!1,type:{name:"string"}},radius:{defaultValue:{value:""},description:"",name:"radius",required:!1,type:{name:"string"}},range:{defaultValue:null,description:"",name:"range",required:!0,type:{name:"any"}},reference:{defaultValue:null,description:"",name:"reference",required:!0,type:{name:"any"}},required:{defaultValue:null,description:"",name:"required",required:!0,type:{name:"any"}},title:{defaultValue:{value:""},description:"",name:"title",required:!1,type:{name:"string"}},messageError:{defaultValue:{value:""},description:"",name:"messageError",required:!1,type:{name:"string"}},type:{defaultValue:{value:"text"},description:"",name:"type",required:!1,type:{name:"string"}},typeTextarea:{defaultValue:{value:"false"},description:"",name:"typeTextarea",required:!1,type:{name:"boolean"}},value:{defaultValue:{value:""},description:"",name:"value",required:!1,type:{name:"string"}},width:{defaultValue:{value:"100%"},description:"",name:"width",required:!1,type:{name:"string"}},onFocus:{defaultValue:{value:"() => { return }"},description:"",name:"onFocus",required:!1,type:{name:"(() => void)"}},onInvalid:{defaultValue:{value:"() => { return }"},description:"",name:"onInvalid",required:!1,type:{name:"(() => void)"}},setDataValue:{defaultValue:{value:"() => { return }"},description:"",name:"setDataValue",required:!1,type:{name:"(() => void)"}},onBlur:{defaultValue:{value:"() => { return }"},description:"",name:"onBlur",required:!1,type:{name:"(() => void)"}}}}}catch{}export{B as I};

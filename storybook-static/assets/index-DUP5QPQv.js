import{j as r,a as I,F as T}from"./jsx-runtime-DI8_P1Ft.js";import{P as m}from"./index-B3IC6ylx.js";import{r as g}from"./index-DPzuYzxM.js";import{s as p,n as v}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as F,B as V}from"./index-BINBIgVg.js";import{j as A}from"./index-RGaBZlDs.js";import{I as z}from"./image-DfgIb6x4.js";const k=({onClick:n=()=>{}})=>r(S,{children:I("div",{className:"container",children:[r("div",{className:"container--content__image",children:r(z,{alt:"",blurDataURL:"/images/DEFAULTBANNER.png",className:"image_item",height:200,src:"/images/DEFAULTBANNER.png",width:200})}),r("button",{className:"button",onClick:n,children:r("div",{className:"button_icon",children:"Escoge una imagen"})})]})}),S=p.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
    .container--content__image {
      width: 80px !important;
      height: 80px !important;
      img {
        object-fit: contain !important;
      }
    }
  }
  .button {
    border: 1px solid ${F};
    padding: 5px;
    width: 300px;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px;
  }
  .button_icon {
    font-family: PFont-Light;
    text-align: center;
  }
`;try{k.displayName="Placeholder",k.__docgenInfo={description:"",displayName:"Placeholder",props:{onClick:{defaultValue:{value:"() => { return }"},description:"",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const C=({actionCallBack:n=!1,imageOnly:B=!1,onlyOne:D=!1,reset:j,callBack:E=()=>{},onChange:N=()=>{}})=>{const[f,w]=g.useState([]),[O,R]=g.useState(!1),[a,_]=g.useState([]),L=g.useRef(null),$=e=>{var u,s,c,h,x,b,y,i;const{files:t}=e.target;if(B&&!/\.(jpg|png|gif|jpeg)$/i.test((u=t[0])==null?void 0:u.name))return console.log({message:"El archivo a adjuntar no es una imagen",duration:2e4,color:"red"});w([...f,...t]),N([...f,...t],...a);let o=[];for(const d of t)o=[...o,d];let l=[];for(let d=0;d<o.length;d++)l=[...l,{temPath:URL.createObjectURL(t[d]),name:(s=t[d])==null?void 0:s.name,ext:(i=(c=t[d])==null?void 0:c.name)==null?void 0:i.substring((x=(h=t[d])==null?void 0:h.name)==null?void 0:x.lastIndexOf("."),(y=(b=t[d])==null?void 0:b.name)==null?void 0:y.length)}];_([...a,...l]),n&&E()};g.useEffect(()=>{j&&(w([]),_([]))},[j]);const q=(e,t,o)=>{e.stopPropagation();const l=f.filter((s,c)=>s.name!==t.name&&c!==o),u=a.filter((s,c)=>s.temPath!==t.temPath&&c!==o);w(l),_(u)},U=e=>{var u,s,c,h,x,b,y;e.preventDefault();const t=e.dataTransfer.files;w([...f,...t]),N([...f,...t],...a);let o=[];for(const i of t)o=[...o,i];let l=[];for(let i=0;i<o.length;i++)l=[...l,{temPath:URL.createObjectURL(t[i]),name:(u=t[i])==null?void 0:u.name,ext:(y=(s=t[i])==null?void 0:s.name)==null?void 0:y.substring((h=(c=t[i])==null?void 0:c.name)==null?void 0:h.lastIndexOf("."),(b=(x=t[i])==null?void 0:x.name)==null?void 0:b.length)}];_([...a,...l])},P=e=>{e.preventDefault(),e.stopPropagation(),R(e.type==="dragenter"||e.type==="dragover")};return r(T,{children:I(Z,{onDragEnter:P,onDragLeave:P,onDragOver:P,onDrop:U,style:{background:O?"#cccccc12":"transparent",borderRadius:"20px"},children:[r(G,{id:"dropZone",multiple:!0,onChange:$,ref:L,type:"file"}),I(M,{onClick:e=>{e.stopPropagation(),document.getElementById("dropZone").click()},children:[!(a!=null&&a.length)&&r(k,{}),(a==null?void 0:a.length)>0&&r(W,{onlyOne:D,children:!!(a!=null&&a.length)&&(a==null?void 0:a.map((e,t)=>r(g.Fragment,{children:I(H,{onlyOne:D,title:e.name,children:[r(Q,{onClick:o=>q(o,e,t),children:r(A,{color:F,size:20})}),e.ext===".png"||e.ext===".svg"||e.ext===".jpg"||e.ext===".jpeg"?r(J,{src:e==null?void 0:e.temPath}):e.ext===".docx"||e.ext===".docm"||e.ext===".dotx"||e.ext===".dotm"?r("i",{children:"DocWord"}):e.ext===".xlsx"||e.ext===".xlsm"||e.ext===".xlsb"||e.ext===".xltx"||e.ext===".xls"?r("i",{children:"Execl"}):r("i",{children:"FILE COMUN"}),r(K,{children:e.name})]})},t)))})]})]})})},Z=p.div`
  display: block;
  ${({width:n})=>n&&v`
      width: ${n};
    `}
  flex-direction: ${({direction:n})=>n||"row"};
  position: relative;
`,G=p.input`
  display: none;
`,M=p.div`
  min-height: 150px;
  max-height: 300px;
  overflow: hidden auto;
  cursor: pointer;
  background-color: ${({theme:n})=>n.TColor};
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: grid;
`,W=p.div`
  position: relative;
  display: flex;
  vertical-align: top;
  flex-flow: wrap;
  ${({onlyOne:n})=>n?v`
          height: 129px;
        `:v``}
`,H=p.div`
  border-radius: 4px;
  ${({onlyOne:n})=>n?v`
          width: 100%;
          height: 100%;
        `:v`
          width: 25%;
          height: 25%;
          min-width: 80px;
          min-height: 80px;
        `}
  position: relative;
  z-index: 10;
  margin: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,J=p.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,K=p.span`
  position: absolute;
  bottom: 0;
  color: #fff;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2px;
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,Q=p.button`
  align-items: center;
  justify-content: center;
  background-color: ${V};
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: 30px;
  outline: none;
  padding: 2px 0;
  position: absolute;
  right: -2px;
  top: 0px;
  width: 30px;
`;C.propTypes={actionCallBack:m.bool,callBack:m.func,imageOnly:m.bool,onChange:m.func.isRequired,onlyOne:m.bool,reset:m.bool};try{C.displayName="InputImage",C.__docgenInfo={description:"",displayName:"InputImage",props:{actionCallBack:{defaultValue:{value:"false"},description:"",name:"actionCallBack",required:!1,type:{name:"boolean"}},imageOnly:{defaultValue:{value:"false"},description:"",name:"imageOnly",required:!1,type:{name:"boolean"}},onlyOne:{defaultValue:{value:"false"},description:"",name:"onlyOne",required:!1,type:{name:"boolean"}},reset:{defaultValue:null,description:"",name:"reset",required:!0,type:{name:"any"}},callBack:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"callBack",required:!1,type:{name:"(() => void)"}},onChange:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"onChange",required:!1,type:{name:"(() => void)"}}}}}catch{}export{C as I};

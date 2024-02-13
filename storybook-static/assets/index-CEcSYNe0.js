import{a as o,j as n}from"./jsx-runtime-DI8_P1Ft.js";import{r as e}from"./index-DPzuYzxM.js";import{s as y}from"./styled-components.browser.esm-CLTG7J5x.js";const S=()=>{const d=()=>{const[p,h]=e.useState(0),[m,P]=e.useState(0),[v,x]=e.useState(0),l=({screenX:f,screenY:k})=>{h(f),P(k)},a=()=>x(new Date);return e.useEffect(()=>(document.addEventListener("mousemove",l),document.addEventListener("click",a),()=>{document.removeEventListener("mousemove",l),document.removeEventListener("click",a)}),[]),{xPos:p,yPos:m,clickTs:v}},[t,u]=e.useState({xPos:0,yPos:0}),{xPos:c,yPos:r,clickTs:s}=d(),i=e.useRef(0);return e.useEffect(()=>{i.current<s&&(u({xPos:c,yPos:r}),i.current=s)},[c,r,s]),o("div",{style:{position:"relative"},children:[n("h2",{children:s?o("div",{children:[o("p",{children:["x-pos: ",t.xPos]}),o("p",{children:["y-pos: ",t.yPos]})]}):n("p",{children:"Click anywhere to start"})}),n("div",{children:!!s&&n(E,{style:{left:`${t.xPos}%`,top:`${t.yPos}%`},children:"Hola"})})]})},E=y.div`
  position: absolute;
  background-color: red;
  width: 300px;
  height: 300px;
`;export{S as F};

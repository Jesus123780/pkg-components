import{a as i,F as v,j as a}from"./jsx-runtime-DI8_P1Ft.js";import{P as n}from"./index-B3IC6ylx.js";import{R as l}from"./index-DPzuYzxM.js";const y="_carousel_197r7_3",d={carousel:y,"card-container":"_card-container_197r7_27"},t=c=>{const{children:o,active:e,moveRight:m,moveLeft:p,maxView:h}=c,s=h??3,u=l.Children.count(o);return i(v,{children:[a("div",{className:d.carousel,children:l.Children.map(o,(_,r)=>a("div",{className:d["card-container"],style:{"--active":r===e?1:0,"--offset":(e-r)/3,"--direction":Math.sign(e-r),"--abs-offset":Math.abs(e-r)/3,pointerEvents:e===r?"auto":"none",opacity:Math.abs(e-r)>=s?"0":"1",display:Math.abs(e-r)>s?"none":"block"},children:_}))}),i("div",{children:[a("div",{children:a("button",{disabled:e===0,onClick:p,children:"Click"})}),a("div",{children:a("button",{disabled:e===u-1,onClick:m,children:"Click"})})]})]})};t.propTypes={active:n.number,children:n.any,maxView:n.number,moveLeft:n.any,moveRight:n.any};try{t.displayName="Carrusel3D",t.__docgenInfo={description:"",displayName:"Carrusel3D",props:{}}}catch{}export{t as C};
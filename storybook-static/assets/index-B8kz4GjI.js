import{a as i,j as e}from"./jsx-runtime-DI8_P1Ft.js";import{P as s}from"./index-B3IC6ylx.js";import{c as k,s as N}from"./styled-components.browser.esm-CLTG7J5x.js";import{o as R,m as C}from"./index-RGaBZlDs.js";import{g as d}from"./index-CIjh_EDQ.js";import"./index-XORxt8qY.js";import{T as m}from"./index-Bww7KC1c.js";import{B as M}from"./index-DuIGVyw3.js";import{R as T}from"./index-OmEDsgBY.js";import{I as w}from"./index-Bp4VmTmA.js";const B="_card_13wco_1",V="_card_header_13wco_17",D="_card_header_content_13wco_33",I="_card_header_title_13wco_47",E="_card_content_13wco_59",O="_card_text_content_13wco_67",q="_card_text_code_13wco_83",P="_card_content_action_13wco_95",z="_content__delivery_time_13wco_109",r={card:B,card_header:V,card_header_content:D,card_header_title:I,card_content:E,card_text_content:O,card_text_code:q,card_content_action:P,content__delivery_time:z},v={0:d("--color-feedback-success-light"),1:d("--color-feedback-warning-light"),2:d("--color-campaigns-yellow"),3:d("--color-feedback-warning-dark"),4:d("--color-feedback-success-light"),5:d("--color-primary-red")},j=(t,b)=>{const x=new Date(t),l=new Date(x.getTime()+b*6e4),n=l-new Date,g=l.getHours(),o=l.getMinutes(),_=g%12||12,u=g>=12?"PM":"AM";if(n<=0){const c=Math.floor(Math.abs(n)/36e5),p=Math.floor(Math.abs(n)%36e5/6e4);return c===0?{minutes:`${p} min`,delay:!0,remainingTimeText:`${p} min de retraso`}:p===0?{hour:`${c} ${c>1?"horas":"hora"}`,delay:!0,remainingTimeText:`${c} ${c>1?"horas de retraso":"hora de retraso"}`}:{hour:c,minutes:`${p} min`,delay:!0,remainingTimeText:`${c} horas y ${p} min de retraso`}}const a=Math.floor(n/36e5),h=Math.floor(n%36e5/6e4);return a===0?{minutes:`${h} min`,remainingTimeText:`${h} min restantes`,entregaText:`Entregar a las ${_}:${o<10?"0":""}${o} ${u}`}:h===0?{hour:`${a} hour`,remainingTimeText:`${a} hour restantes`,entregaText:`Entregar a las ${_}:${o<10?"0":""}${o} ${u}`}:{hour:a,minutes:`${h} min`,remainingTimeText:`${a} hour y ${h} min restantes`,entregaText:`Entregar a las ${_}:${o<10?"0":""}${o} ${u}`}},A=({pCodeRef:t="",view:b=!0,pDatCre:x="",deliveryTimeMinutes:l=null,handleViewOrder:$=n=>n})=>{const n="Nuevo Pedido",{minutes:g,hour:o,remainingTimeText:_,entregaText:u,delay:a}=l?j(x,l):{minutes:"",hour:"",remainingTimeText:"",entregaText:"",delay:!1};return i("div",{className:r.card,style:b?{borderLeft:"5px solid var(--color-feedback-warning-light)"}:{},children:[e("div",{className:r.card_header,children:i("div",{className:r.card_header_content,children:[i(m,{className:r.card_header_title,children:[e("div",{style:{width:"20px",marginRight:"20px"},children:e(R,{color:d("--color-icons-black"),size:25})}),n]}),e(C,{color:v[1],size:20})]})}),i("div",{className:r.card_content,children:[i("div",{className:r.card_content_action,children:[i(m,{className:r.card_text_code,children:["# ",t]}),e(M,{onClick:()=>$(t),primary:!0,children:"Ver"})]}),e(f,{color:v[1],children:e("span",{className:"bubble-outer-dot",children:e("span",{className:"bubble-inner-dot"})})}),e(m,{className:r.card_text_content,children:"Confirmar pedido"}),i("div",{className:r.content__delivery_time,children:[!!a&&e(m,{className:r.card_text_content,children:`Retrasado: ${_}`}),!a&&i(T,{alignItems:"center",children:[e("div",{style:{width:"20px",marginRight:"20px"},children:e(w,{size:25,icon:"time"})}),!a&&e(m,{className:r.card_text_content,children:`Tiempo de entrega: ${o?`${o}h`:""} ${g||""}`})]}),!a&&i(T,{alignItems:"center",children:[e("div",{style:{width:"20px",marginRight:"20px"},children:e(w,{size:25,icon:"time"})}),!a&&e(m,{className:r.card_text_content,children:u})]})]})]})]})};A.propTypes={pCodeRef:s.string,pDatCre:s.string,deliveryTimeMinutes:s.oneOfType([s.number,s.oneOf([null])]),view:s.bool,handleViewOrder:s.func};const y=k`
  0% {
    transform: scale(1);
    opacity: .75;
  }
  25% {
    transform: scale(1);
    opacity: .75;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`,f=N.div`
  display: block;
  position: relative;
  margin: 0;

  &:hover:after {
    background-color: ${({color:t})=>t||""};
  }

  &:after {
    content: "";
    background-color: ${({color:t})=>t||""};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 1px;
    left: 1px;
  }

  .bubble-outer-dot {
    margin: 1px;
    display: block;
    text-align: center;
    opacity: 1;
    background-color: ${({color:t})=>t||""};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${y} 1.5s linear infinite;
  }

  .bubble-inner-dot {
    display: block;
    text-align: center;
    opacity: 1;
    background-color: ${({color:t})=>t||""};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${y} 1.5s linear infinite;
  }

  .bubble-inner-dot:after {
    content: "";
    display: block;
    text-align: center;
    opacity: 1;
    background-color: ${({color:t})=>t||""};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: ${y} 1.5s linear infinite;
  }
`;f.displayName="Bubble";try{f.displayName="Bubble",f.__docgenInfo={description:"",displayName:"Bubble",props:{pCodeRef:{defaultValue:{value:""},description:"",name:"pCodeRef",required:!1,type:{name:"string"}},view:{defaultValue:{value:"true"},description:"",name:"view",required:!1,type:{name:"boolean"}},pDatCre:{defaultValue:{value:""},description:"",name:"pDatCre",required:!1,type:{name:"string"}},deliveryTimeMinutes:{defaultValue:{value:"null"},description:"",name:"deliveryTimeMinutes",required:!1,type:{name:"number | null"}},handleViewOrder:{defaultValue:{value:"(pCodeRef: string) => pCodeRef"},description:"",name:"handleViewOrder",required:!1,type:{name:"((pCodeRef: string) => string)"}}}}}catch{}export{A as C};

import{n as a}from"./styled-components.browser.esm-CLTG7J5x.js";a`
    scrollbar-color: rgba(0, 0, 0, .5) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    &::-webkit-scrollbar {
    -webkit-appearance: none;
}

&::-webkit-scrollbar:vertical {
    width:10px;
}

&::-webkit-scrollbar-button:increment,&::-webkit-scrollbar-button {
    display: none;
} 

&::-webkit-scrollbar:horizontal {
    height: 10px;
}

&::-webkit-scrollbar-thumb {
    background-color: #797979;
    border: 2px solid #f1f2f3;
}
    &::-webkit-scrollbar-track {
    border-radius: 10px;  
}

`;const l=r=>`var(${r})`,i=r=>/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r),o=r=>{if(r==null)return r;const e=`${r}`.replace(/\./g,""),t=parseFloat(e);return isNaN(t)?r:new Intl.NumberFormat("es-CO",{minimumFractionDigits:0,style:"decimal",maximumFractionDigits:0}).format(t)},u=r=>/^\(\d{3}\) \d{3}-\d{4}$/.test(r),c=r=>/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(r)!==!0,b=r=>/^[0-9]{6,10}/g.test(r)!==!0,d=r=>{let e,t=0;if(e=/^[0-9]+-[0-9kK]{1}$/i.exec(r)){e[2]=e[2].toLowerCase()=="k"?10:parseInt(e[2]);for(let n=0;n<e[1].length;n++)t+=((n-e[1].length)*-1+1)*e[1][n];return(11-t%11)%11==e[2]}return!1},f=r=>/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(r)===!1&&r!==""&&r!==void 0&&r!==null,g=(r,e,t)=>r!==void 0&&r!==""&&r!==null?r.length<e||r.length>t:!1,m=r=>/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(r)===!1&&r!==""&&r!==void 0&&r!==null;export{c as a,d as b,b as c,u as d,l as g,m as i,o as n,f as o,g as r,i as v};

import{j as f,a as h}from"./jsx-runtime-DI8_P1Ft.js";import{s as y,n as a}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as c}from"./index-B3IC6ylx.js";import{r as d}from"./index-DPzuYzxM.js";const u=({text:e,position:t})=>{const[o,r]=d.useState(t),i=d.useRef(null);return d.useEffect(()=>{const n=()=>{const l=i.current.clientHeight,p=window.innerHeight,s=10;t==="top"&&l+s>i.current.getBoundingClientRect().top&&r("bottom"),t==="bottom"&&l+s>p-i.current.getBoundingClientRect().bottom&&r("top")};return n(),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[t]),f("div",{className:`tooltip tooltip-${o}`,ref:i,children:e})};u.propTypes={position:c.string,text:c.any};try{u.displayName="PositionTooltip",u.__docgenInfo={description:"",displayName:"PositionTooltip",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"any"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"any"}}}}}catch{}const g=y.div`
  position: relative;
  display: inline-block;
`,v=y.span`
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  border-radius: ${({borderRadius:e})=>e||"4px"};
  padding: 5px;
  position: absolute;
  z-index: 99;
  opacity: ${({hover:e})=>e?0:1};
  transition: opacity 0.3s, visibility 0.3s;
  font-size: var(--font-size-base);
  line-height: 1.4;
  border-radius: ${({borderRadius:e})=>e||"4px"};
  border: 1px solid var(--color-primary-red);
  background-color: var(--color-primary-red);
  color: #fff;
  padding: 5px 10px;
  white-space: nowrap;

  ${({position:e,left:t,bottom:o,rotate:r})=>{if(e==="top")return a`
        bottom: ${o||"90%"};
        left: ${t||"80%"};
        transform: rotate(${r||"35deg"});
      `;if(e==="bottom")return a`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
      `;if(e==="left")return a`
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
      `;if(e==="right")return a`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
      `}};

  ${({arrowOffset:e,showArrow:t,position:o})=>t&&a`
      &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px;
        border-color: transparent;
        ${e&&`margin-${e}: -6px;`}
        ${e==="top"||e==="bottom"?"border-bottom-color: var(--color-primary-red);":"border-right-color: var(--color-primary-red);"}
        ${o==="top"&&"top: 100%;"}
        ${o==="bottom"&&"bottom: 100%;"}
        ${o==="left"&&"right: 100%;"}
        ${o==="right"&&"left: 100%;"}
        transform: translate${e==="top"||e==="bottom"?"X":"Y"}(-50%);
      }
    `}

  ${({hover:e})=>e&&a`
      ${g}:hover & {
        opacity: 1;
      }
    `}
`,m=({text:e,position:t,bottom:o,left:r,showArrow:i=!0,hover:n=!1,arrowOffset:l,rotate:p,borderRadius:s,children:b})=>h(g,{children:[b,f(v,{arrowOffset:l,borderRadius:s,bottom:o,hover:n,left:r,position:t,rotate:p,showArrow:i,children:e})]});try{m.displayName="Tooltip",m.__docgenInfo={description:"",displayName:"Tooltip",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'}]}},bottom:{defaultValue:null,description:"",name:"bottom",required:!1,type:{name:"string"}},left:{defaultValue:null,description:"",name:"left",required:!1,type:{name:"string"}},showArrow:{defaultValue:{value:"true"},description:"",name:"showArrow",required:!1,type:{name:"boolean"}},hover:{defaultValue:{value:"false"},description:"",name:"hover",required:!1,type:{name:"boolean"}},arrowOffset:{defaultValue:null,description:"",name:"arrowOffset",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'},{value:'"bottom"'},{value:'"top"'}]}},rotate:{defaultValue:null,description:"",name:"rotate",required:!1,type:{name:"string"}},borderRadius:{defaultValue:null,description:"",name:"borderRadius",required:!1,type:{name:"string"}}}}}catch{}try{PositionTooltip.displayName="PositionTooltip",PositionTooltip.__docgenInfo={description:"",displayName:"PositionTooltip",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"any"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"any"}}}}}catch{}export{m as T};

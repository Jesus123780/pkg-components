import{r as l,R as Q}from"./index-DPzuYzxM.js";function U(e){if(!e||typeof window>"u")return;const t=document.createElement("style");return t.setAttribute("type","text/css"),t.innerHTML=e,document.head.appendChild(t),e}function V(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}let o=V(Q),u=function(){return u=Object.assign||function(t){for(let i,n=1,r=arguments.length;n<r;n++){i=arguments[n];for(let a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a])}return t},u.apply(this,arguments)};U(`.marquee-container {
  display: flex !important;
  flex-direction: row !important;
  position: relative;
  width: 100%;
}
.marquee-container:hover div {
  animation-play-state: let(--pause-on-hover);
}
.marquee-container:active div {
  animation-play-state: let(--pause-on-click);
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.overlay::before, .overlay::after {
  background: linear-gradient(to right, let(--gradient-color));
  content: "";
  height: 100%;
  position: absolute;
  width: let(--gradient-width);
  z-index: 2;
}
.overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.overlay::before {
  left: 0;
  top: 0;
}

.marquee {
  flex: 0 0 auto;
  min-width: 100%;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll let(--duration) linear let(--delay) let(--iteration-count);
  animation-play-state: let(--play);
  animation-delay: let(--delay);
  animation-direction: let(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}`);const X=function(e){let t,i,n,r,a=e.style,D=a===void 0?{}:a,v=e.className,G=v===void 0?"":v,h=e.play,d=h===void 0?!0:h,_=e.pauseOnHover,w=_===void 0?!1:_,q=e.pauseOnClick,b=q===void 0?!1:q,C=e.direction,E=C===void 0?"left":C,x=e.speed,R=x===void 0?20:x,M=e.delay,N=M===void 0?0:M,k=e.loop,s=k===void 0?0:k,O=e.gradient,P=O===void 0?!0:O,W=e.gradientColor,c=W===void 0?[255,255,255]:W,j=e.gradientWidth,f=j===void 0?200:j,T=e.onFinish,Z=e.onCycleComplete,z=e.children,L=l.useState(0),S=L[0],$=L[1],A=l.useState(0),F=A[0],J=A[1],H=l.useState(!1),p=H[0],K=H[1],m=l.useRef(null),y=l.useRef(null);l.useEffect(function(){if(!p)return;let g=function(){y.current&&m.current&&($(m.current.getBoundingClientRect().width),J(y.current.getBoundingClientRect().width))};return g(),window.addEventListener("resize",g),function(){window.removeEventListener("resize",g)}},[p]),l.useEffect(function(){K(!0)},[]);let I="rgba("+c[0]+", "+c[1]+", "+c[2],B=F<S?S/R:F/R;return o.default.createElement(l.Fragment,null,p?o.default.createElement("div",{ref:m,style:u(u({},D),(t={},t["--pause-on-hover"]=!d||w?"paused":"running",t["--pause-on-click"]=!d||w&&!b||b?"paused":"running",t)),className:G+" marquee-container"},P&&o.default.createElement("div",{style:(i={},i["--gradient-color"]=I+", 1), "+I+", 0)",i["--gradient-width"]=typeof f=="number"?f+"px":f,i),className:"overlay"}),o.default.createElement("div",{ref:y,style:(n={},n["--play"]=d?"running":"paused",n["--direction"]=E==="left"?"normal":"reverse",n["--duration"]=B+"s",n["--delay"]=N+"s",n["--iteration-count"]=s?""+s:"infinite",n),className:"marquee",onAnimationIteration:Z,onAnimationEnd:T},z),o.default.createElement("div",{style:(r={},r["--play"]=d?"running":"paused",r["--direction"]=E==="left"?"normal":"reverse",r["--duration"]=B+"s",r["--delay"]=N+"s",r["--iteration-count"]=s?""+s:"infinite",r),className:"marquee","aria-hidden":"true"},z)):null)};try{X.displayName="Marquee",X.__docgenInfo={description:"",displayName:"Marquee",props:{}}}catch{}export{X as M};

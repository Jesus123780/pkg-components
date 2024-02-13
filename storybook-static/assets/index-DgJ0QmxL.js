import{j as s,F as c}from"./jsx-runtime-DI8_P1Ft.js";import{P as e}from"./index-B3IC6ylx.js";import{c as p,s as m,n as o}from"./styled-components.browser.esm-CLTG7J5x.js";import{B as l,P as u}from"./index-BINBIgVg.js";const y=p`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
}
`,t=m.div`
  border: 2px solid #cccccc;
  border-radius: 50%;
  height: 50px;
  cursor: pointer;
  background-color: ${l};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${r=>r.pulse?o`
          animation: ${y} 2s infinite;
          background-color: ${`${u}`};
          color: ${l};
        `:o``}
`;try{t.displayName="CircleDay",t.__docgenInfo={description:"",displayName:"CircleDay",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const n=({days:r=[],selectedDays:d=[],handleDaySelection:i=()=>{}})=>s(c,{children:r.map(a=>s(t,{onClick:()=>i(a.day),pulse:d.includes(a.day),children:a.name},a.day))});n.propTypes={days:e.arrayOf(e.shape({day:e.number,name:e.string})),handleDaySelection:e.func,selectedDays:e.arrayOf(e.number)};try{n.displayName="DaySelector",n.__docgenInfo={description:"",displayName:"DaySelector",props:{days:{defaultValue:{value:"[]"},description:"",name:"days",required:!1,type:{name:"never[]"}},selectedDays:{defaultValue:{value:"[]"},description:"",name:"selectedDays",required:!1,type:{name:"never[]"}},handleDaySelection:{defaultValue:{value:`() => {\r
    return\r
  }`},description:"",name:"handleDaySelection",required:!1,type:{name:"(() => void)"}}}}}catch{}export{n as D};

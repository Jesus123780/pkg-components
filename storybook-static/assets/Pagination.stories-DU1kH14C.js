import{j as i,a as h}from"./jsx-runtime-DI8_P1Ft.js";import{r as b}from"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";const v="_paginationContainer_1ym8q_3",y="_button_1ym8q_13",V="_active_1ym8q_39",d={paginationContainer:v,button:y,active:V},o=({currentPage:a=0,items:t=[],handleOnClick:r,isVisableButtonLeft:u,isVisableButtonRight:c,isVisableButtons:s,handlePrevPage:e,handleNextPage:P})=>a<0||!Array.isArray(t)||t.some(n=>typeof n=="number"&&n<0)?i("p",{children:"Invalid numbers provided"}):h("div",{className:d.paginationContainer,children:[s&&u&&i("button",{onClick:e,children:"Prev"}),t.map((n,f)=>i("button",{className:n===a?d.active:"",onClick:()=>{typeof n=="number"&&r(n)},children:n},f)),s&&c&&i("button",{onClick:P,children:"Next"})]});try{o.displayName="Pagination",o.__docgenInfo={description:"Pagination component",displayName:"Pagination",props:{currentPage:{defaultValue:{value:"0"},description:"",name:"currentPage",required:!1,type:{name:"number"}},isVisableButtonLeft:{defaultValue:null,description:"",name:"isVisableButtonLeft",required:!0,type:{name:"boolean"}},isVisableButtonRight:{defaultValue:null,description:"",name:"isVisableButtonRight",required:!0,type:{name:"boolean"}},isVisableButtons:{defaultValue:null,description:"",name:"isVisableButtons",required:!0,type:{name:"boolean"}},items:{defaultValue:{value:"[]"},description:"",name:"items",required:!1,type:{name:"(string | number)[]"}},handleNextPage:{defaultValue:null,description:"",name:"handleNextPage",required:!1,type:{name:"(() => void)"}},handleOnClick:{defaultValue:null,description:"",name:"handleOnClick",required:!0,type:{name:"(number: number) => void"}},handlePrevPage:{defaultValue:null,description:"",name:"handlePrevPage",required:!1,type:{name:"(() => void)"}}}}}catch{}const q={title:"molecules/Pagination",component:o,argTypes:{currentPage:{control:"number",defaultValue:1},items:[1,2,3,4,5,6,7,8,9],isVisableButtonLeft:{control:"boolean",defaultValue:!1},isVisableButtonRight:{control:"boolean",defaultValue:!1},isVisableButtons:{control:"boolean",defaultValue:!0}},args:{currentPage:1,items:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,100,200,300,400,500,600,700,800,900,1e3],isVisableButtonLeft:!1,isVisableButtonRight:!1,isVisableButtons:!0}},_=a=>{const[t,r]=b.useState(1);return i(o,{...a,currentPage:t,handleNextPage:()=>{r(e=>e+1)},handleOnClick:e=>{r(e)},handlePrevPage:()=>{r(e=>Math.max(e-1,1))},items:a.items})},l=_.bind({});var p,g,m;l.parameters={...l.parameters,docs:{...(p=l.parameters)==null?void 0:p.docs,source:{originalSource:`(args: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleOnClick = (page: any) => {
    setCurrentPage(page);
  };
  const handlePrevPage = () => {
    setCurrentPage(prev => {
      return Math.max(prev - 1, 1);
    });
  };
  const handleNextPage = () => {
    setCurrentPage(prev => {
      return prev + 1;
    });
  };
  return <Pagination {...args} currentPage={currentPage} handleNextPage={handleNextPage} handleOnClick={handleOnClick} handlePrevPage={handlePrevPage} items={args.items} />;
}`,...(m=(g=l.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const B=["Default"];export{l as Default,B as __namedExportsOrder,q as default};

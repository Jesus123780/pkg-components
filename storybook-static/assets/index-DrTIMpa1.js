import{s as t,n as a}from"./styled-components.browser.esm-CLTG7J5x.js";const r=t.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: ${({zIndex:e})=>e||"99"};
    background-color: ${({bgColor:e})=>e||"transparent"};
    ${({show:e})=>e?a`display: block`:a`display: none;`};
    cursor: ${({onClick:e})=>e?"pointer":"auto"};
    @media only screen and (min-width: 960px){
    }
`;try{r.displayName="Overline",r.__docgenInfo={description:"",displayName:"Overline",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}export{r as O};

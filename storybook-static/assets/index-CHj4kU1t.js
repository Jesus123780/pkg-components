import{j as n,a as I}from"./jsx-runtime-DI8_P1Ft.js";import{P as e}from"./index-B3IC6ylx.js";import{s as t}from"./styled-components.browser.esm-CLTG7J5x.js";import{P as x,B as W}from"./index-BINBIgVg.js";const T="#ef4036",A="#fdedee",V="#D9D9D9",u=t.div`
  display: flex;
  font-size: 0;
  margin: auto;
`,p=t.div`
  position: relative;
  flex: 1;

  &:last-child {
    flex: none;
  }
`,i=25,q=150,d=t.div`
  margin-left: ${(q-i)/2}px;
  background: ${T};

  width: ${i}px;
  height: ${i}px;
  border-radius: ${i}px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,c=t(d)`
  background-color: transparent;
  border: 2px solid ${V};
`,m=t(d)`
  background-color: ${x};
`,f=t(d)`
  background-color: ${A};
`,y=t.span`
  color: ${W};
  line-height: 1;
  font-size: 11px;
  font-weight: 100;

  ${c} & {
    color: #ccc;
  }
`,_=t.div`
  text-align: center;
  margin-top: 12px;
  width: ${q}px;
`,h=t.div`
  font-size: 14px;
  color: ${T};
  text-align: center;
  font-weight: 400;
`,g=t.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: ${i/2}px;
  padding: 0px ${i/2}px;
  margin-left: ${q/2}px;

  &:after {
    content: '';
    display: inline-block;
    background: ${a=>a.finished?T:V};
    height: 2px;
    border-radius: 2px;
    width: 100%;
  }

  ${p}:last-child & {
    display: none;
  }
`;try{u.displayName="Steps",u.__docgenInfo={description:"",displayName:"Steps",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{p.displayName="Step",p.__docgenInfo={description:"",displayName:"Step",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{d.displayName="DefaultIcon",d.__docgenInfo={description:"",displayName:"DefaultIcon",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{c.displayName="WaitIcon",c.__docgenInfo={description:"",displayName:"WaitIcon",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{m.displayName="ProcessIcon",m.__docgenInfo={description:"",displayName:"ProcessIcon",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{f.displayName="ErrorIcon",f.__docgenInfo={description:"",displayName:"ErrorIcon",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{y.displayName="StepNumber",y.__docgenInfo={description:"",displayName:"StepNumber",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{_.displayName="Content",_.__docgenInfo={description:"",displayName:"Content",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{h.displayName="Title",h.__docgenInfo={description:"",displayName:"Title",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}try{g.displayName="Tail",g.__docgenInfo={description:"",displayName:"Tail",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}}}catch{}const b=({current:a,status:o,titles:r})=>{const N=r.map((v,l)=>{let s;return l<a?s="finish":l===a?s=o==="finish"?"finish":o:s=o==="finish"?"finish":"wait",n(w,{status:s,stepNumber:l+1,title:v},l)});return n(u,{children:N})},$=a=>a>9?`${a}`:`0${a}`,S=({status:a,children:o})=>{let r;switch(a){case"progress":r=m;break;case"wait":r=c;break;case"error":r=f;break;default:r=d}return n(r,{children:o})},w=({stepNumber:a,title:o,status:r})=>I(p,{children:[n(g,{finished:r==="finish"}),n(S,{status:r,children:n(y,{children:$(a)})}),n(_,{children:n(h,{children:o})})]});w.propTypes={title:e.string,stepNumber:e.number,status:e.oneOf(["wait","progress","finish","error"])};b.propTypes={title:e.node,size:e.string,padding:e.string,show:e.bool||e.number,backdrop:e.bool,keyboard:e.bool,footer:e.bool,btnCancel:e.bool,btnConfirm:e.bool,children:e.object,hiddeOnConfirm:e.bool,timeOut:e.number,height:e.string,header:e.bool,submit:e.bool,onHidde:e.func,onCancel:e.func,onConfirm:e.func,hideOnConfirm:e.func,closeIcon:e.bool,borderRadius:e.string,onHide:e.func};try{b.displayName="StepsComponent",b.__docgenInfo={description:"",displayName:"StepsComponent",props:{current:{defaultValue:null,description:"",name:"current",required:!0,type:{name:"any"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"any"}},titles:{defaultValue:null,description:"",name:"titles",required:!0,type:{name:"any"}}}}}catch{}export{b as S};

import{j as l}from"./jsx-runtime-DI8_P1Ft.js";import{w as u,u as d}from"./index-B5iJEZpT.js";import{H as n}from"./index-CzPyEeJp.js";import"./index-DPzuYzxM.js";import"./_commonjsHelpers-C4iS2aBk.js";import"./___vite-browser-external_commonjs-proxy-BqV5D26a.js";import"./index-DrFu-skq.js";import"./index-B3IC6ylx.js";import"./index-CFOzvcEp.js";import"./index-RGaBZlDs.js";import"./index-XORxt8qY.js";import"./index-DuIGVyw3.js";import"./index-Ck7iXuwZ.js";import"./index-CoXI7PFH.js";import"./styled-components.browser.esm-CLTG7J5x.js";import"./tslib.es6-BF5GDGeg.js";import"./index-Bp4VmTmA.js";import"./index-BT_gM0Ba.js";import"./index-DEiPFiJ1.js";import"./index-CIqjyzZH.js";import"./index-OmEDsgBY.js";import"./index-Bww7KC1c.js";import"./index-BvrhFfaA.js";import"./link-B5326XFw.js";import"./_interop_require_default-DgqNHo5w.js";import"./utils-D5IJ2A55.js";import"./router-Dr3MF1HQ.js";import"./router-context-1OOWBe6R.js";import"./use-intersection-BigaMEX4.js";import"./index-CDs-0jJ9.js";import"./index-pGaNWW0o.js";import"./index-BINBIgVg.js";import"./index-CIjh_EDQ.js";import"./index-Daagk5ZO.js";import"./ButtonContent-BW4_E53A.js";import"./index-B7phoe5e.js";import"./index-BazRt-v6.js";import"./index-DDhiIGzI.js";import"./index-6iV1_9JG.js";import"./index-vbbai_p0.js";import"./index-UTFqNKN-.js";import"./index-DH2uhswi.js";import"./index-DrTIMpa1.js";import"./index-DCQJ1Mhm.js";import"./index-BApHpKep.js";import"./index-IkbvFkD4.js";import"./InputHooks-4WUCFFW9.js";import"./index-CU9ER8A5.js";import"./index-CtOxyrGX.js";import"./router-pQJNcUoK.js";import"./index-CoQ8oC9_.js";import"./index-B8kz4GjI.js";import"./Carrusel3d-DBB5Zpdd.js";import"./index-CmpceiV9.js";import"./index-BbsIFNfG.js";import"./index-DgJ0QmxL.js";import"./index-CCiAL1h3.js";import"./index-BntQnSi7.js";import"./index-54L18hga.js";import"./index-BGQ0fQPX.js";import"./index-DpedGZ19.js";import"./index-scbfCFkw.js";import"./index-CEcSYNe0.js";import"./index-DVGXaJdU.js";import"./index-D-dsD9vT.js";import"./index-Ck8xQAsS.js";import"./index-CHj4kU1t.js";import"./index-3NUpt0LR.js";import"./index-C-73uXbr.js";import"./index-TjzDTrAV.js";import"./index-De4vx-dS.js";import"./image-DfgIb6x4.js";import"./index-B4ZYcO8N.js";import"./index-CTYXsiC0.js";import"./index-BplelWKg.js";import"./index-DzG_YAXo.js";import"./index-BUvopmGt.js";import"./_baseIteratee-goBjEgV6.js";import"./index-9lKuAtxr.js";import"./index-549Hh2j0.js";import"./index-DTFHY3DF.js";import"./index-DkuGyRe_.js";import"./index-C0xy3xo5.js";import"./index-BtcZv_9m.js";import"./index-DUP5QPQv.js";import"./index-CH9Z1VmK.js";import"./index-DyGOJsL2.js";import"./index-BTtkqCix.js";import"./index-DNyeo4t-.js";import"./index-CqEQFk9x.js";import"./index-CiHWw6n4.js";const $r={title:"organisms/Header",component:n,argTypes:{isMobile:{control:"boolean"},salesOpen:{control:"boolean"}}},g=o=>l(n,{...o}),r=g.bind({});r.args={isMobile:!1,salesOpen:!1};const t={play:async({canvasElement:o})=>{const c=u(o).getByText(/Crear una venta/i);await d.click(c)}};t.args=r.args;var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  return <Header {...args} />;
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var e,a,s;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Obtén una referencia al botón que abre el modal de ventas
    const salesButton = canvas.getByText(/Crear una venta/i);
    // Simula un clic en el botón
    await userEvent.click(salesButton);
    // Si hay otros elementos o acciones que desees probar, puedes continuar aquí...
  }
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const rt=["Default","TestHeader"];export{r as Default,t as TestHeader,rt as __namedExportsOrder,$r as default};

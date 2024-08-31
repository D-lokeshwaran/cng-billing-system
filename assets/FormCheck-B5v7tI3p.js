import{r as a,Z as m,v as i,j as t,m as F,_ as V}from"./index-BBZVF_XH.js";function A(s,e){return a.Children.toArray(s).some(o=>a.isValidElement(o)&&o.type===e)}const j=a.forwardRef(({id:s,bsPrefix:e,className:o,type:n="checkbox",isValid:r=!1,isInvalid:c=!1,as:h="input",...u},p)=>{const{controlId:l}=a.useContext(m);return e=i(e,"form-check-input"),t.jsx(h,{...u,ref:p,type:n,id:s||l,className:F(o,e,r&&"is-valid",c&&"is-invalid")})});j.displayName="FormCheckInput";const d=a.forwardRef(({bsPrefix:s,className:e,htmlFor:o,...n},r)=>{const{controlId:c}=a.useContext(m);return s=i(s,"form-check-label"),t.jsx("label",{...n,ref:r,htmlFor:o||c,className:F(e,s)})});d.displayName="FormCheckLabel";const y=a.forwardRef(({id:s,bsPrefix:e,bsSwitchPrefix:o,inline:n=!1,reverse:r=!1,disabled:c=!1,isValid:h=!1,isInvalid:u=!1,feedbackTooltip:p=!1,feedback:l,feedbackType:I,className:N,style:w,title:L="",type:f="checkbox",label:C,children:k,as:R="input",...E},$)=>{e=i(e,"form-check"),o=i(o,"form-switch");const{controlId:x}=a.useContext(m),g=a.useMemo(()=>({controlId:s||x}),[x,s]),v=!k&&C!=null&&C!==!1||A(k,d),O=t.jsx(j,{...E,type:f==="switch"?"checkbox":f,ref:$,isValid:h,isInvalid:u,disabled:c,as:R});return t.jsx(m.Provider,{value:g,children:t.jsx("div",{style:w,className:F(N,v&&e,n&&`${e}-inline`,r&&`${e}-reverse`,f==="switch"&&o),children:k||t.jsxs(t.Fragment,{children:[O,v&&t.jsx(d,{title:L,children:C}),l&&t.jsx(V,{type:I,tooltip:p,children:l})]})})})});y.displayName="FormCheck";const M=Object.assign(y,{Input:j,Label:d});export{M as F};

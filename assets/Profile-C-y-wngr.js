import{r as b,T as O,J as L,j as e,K as S,N as R,O as W,$ as Z,P as M,v as F,m as B,Q as C,y as X,U as $,R as E,C as h,F as K,o as Y,M as w,q as D,c as ee,V as f}from"./index-BBZVF_XH.js";import{o as te}from"./sale-tag02-icon-DfzIS-Lm.js";import{C as d,F as ne}from"./FormSelect-CRrV35Dd.js";import{T as se}from"./Table-C0k4yvah.js";import{f as H}from"./date-DOahnHON.js";import{c as ae,u as re,T as oe}from"./TanStackTable-BluuVpOs.js";import{D as ie}from"./index-hmsTSLU8.js";import{P as le}from"./Pagination-49DtyXDZ.js";import{S as ce}from"./Settings-CltA3GV_.js";import"./FormCheck-B5v7tI3p.js";import"./HookForm-Lmu3z8lE.js";import"./index.esm-16HUKa1g.js";import"./Input-DNZQAGF7.js";const de=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],me=["activeKey","getControlledId","getControllerId"],xe=["as"];function k(t,n){if(t==null)return{};var s={},a=Object.keys(t),o,r;for(r=0;r<a.length;r++)o=a[r],!(n.indexOf(o)>=0)&&(s[o]=t[o]);return s}function V(t){let{active:n,eventKey:s,mountOnEnter:a,transition:o,unmountOnExit:r,role:m="tabpanel",onEnter:l,onEntering:x,onEntered:g,onExit:v,onExiting:u,onExited:c}=t,j=k(t,de);const p=b.useContext(O);if(!p)return[Object.assign({},j,{role:m}),{eventKey:s,isActive:n,mountOnEnter:a,transition:o,unmountOnExit:r,onEnter:l,onEntering:x,onEntered:g,onExit:v,onExiting:u,onExited:c}];const{activeKey:i,getControlledId:y,getControllerId:N}=p,P=k(p,me),I=L(s);return[Object.assign({},j,{role:m,id:y(s),"aria-labelledby":N(s)}),{eventKey:s,isActive:n==null&&I!=null?L(i)===I:n,transition:o||P.transition,mountOnEnter:a??P.mountOnEnter,unmountOnExit:r??P.unmountOnExit,onEnter:l,onEntering:x,onEntered:g,onExit:v,onExiting:u,onExited:c}]}const U=b.forwardRef((t,n)=>{let{as:s="div"}=t,a=k(t,xe);const[o,{isActive:r,onEnter:m,onEntering:l,onEntered:x,onExit:g,onExiting:v,onExited:u,mountOnEnter:c,unmountOnExit:j,transition:p=R}]=V(a);return e.jsx(O.Provider,{value:null,children:e.jsx(S.Provider,{value:null,children:e.jsx(p,{in:r,onEnter:m,onEntering:l,onEntered:x,onExit:g,onExiting:v,onExited:u,mountOnEnter:c,unmountOnExit:j,children:e.jsx(s,Object.assign({},o,{ref:n,hidden:!r,"aria-hidden":!r}))})})})});U.displayName="TabPanel";const q=t=>{const{id:n,generateChildId:s,onSelect:a,activeKey:o,defaultActiveKey:r,transition:m,mountOnEnter:l,unmountOnExit:x,children:g}=t,[v,u]=W(o,r,a),c=Z(n),j=b.useMemo(()=>s||((i,y)=>c?`${c}-${y}-${i}`:null),[c,s]),p=b.useMemo(()=>({onSelect:u,activeKey:v,transition:m,mountOnEnter:l||!1,unmountOnExit:x||!1,getControlledId:i=>j(i,"tabpane"),getControllerId:i=>j(i,"tab")}),[u,v,m,l,x,j]);return e.jsx(O.Provider,{value:p,children:e.jsx(S.Provider,{value:u||null,children:g})})};q.Panel=U;function G(t){return typeof t=="boolean"?t?M:R:t}const _=({transition:t,...n})=>e.jsx(q,{...n,transition:G(t)});_.displayName="TabContainer";const z=b.forwardRef(({className:t,bsPrefix:n,as:s="div",...a},o)=>(n=F(n,"tab-content"),e.jsx(s,{ref:o,className:B(t,n),...a})));z.displayName="TabContent";const J=b.forwardRef(({bsPrefix:t,transition:n,...s},a)=>{const[{className:o,as:r="div",...m},{isActive:l,onEnter:x,onEntering:g,onEntered:v,onExit:u,onExiting:c,onExited:j,mountOnEnter:p,unmountOnExit:i,transition:y=M}]=V({...s,transition:G(n)}),N=F(t,"tab-pane");return e.jsx(O.Provider,{value:null,children:e.jsx(S.Provider,{value:null,children:e.jsx(y,{in:l,onEnter:x,onEntering:g,onEntered:v,onExit:u,onExiting:c,onExited:j,mountOnEnter:p,unmountOnExit:i,children:e.jsx(r,{...m,ref:a,className:B(o,N,l&&"active")})})})})});J.displayName="TabPane";const he={eventKey:C.oneOfType([C.string,C.number]),title:C.node.isRequired,disabled:C.bool,tabClassName:C.string,tabAttrs:C.object},Q=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};Q.propTypes=he;const T=Object.assign(Q,{Container:_,Content:z,Pane:J});/**
 * @license hugeicons-react v0.1.3
 *
 * See the LICENSE file in the root directory of this source tree.
 */const ue=X("InvoiceIcon",[["path",{d:"M20.016 2C18.9026 2 18 4.68629 18 8H20.016C20.9876 8 21.4734 8 21.7741 7.66455C22.0749 7.32909 22.0225 6.88733 21.9178 6.00381C21.6414 3.67143 20.8943 2 20.016 2Z",stroke:"currentColor",key:"k0"}],["path",{d:"M18 8.05426V18.6458C18 20.1575 18 20.9133 17.538 21.2108C16.7831 21.6971 15.6161 20.6774 15.0291 20.3073C14.5441 20.0014 14.3017 19.8485 14.0325 19.8397C13.7417 19.8301 13.4949 19.9768 12.9709 20.3073L11.06 21.5124C10.5445 21.8374 10.2868 22 10 22C9.71321 22 9.45546 21.8374 8.94 21.5124L7.02913 20.3073C6.54415 20.0014 6.30166 19.8485 6.03253 19.8397C5.74172 19.8301 5.49493 19.9768 4.97087 20.3073C4.38395 20.6774 3.21687 21.6971 2.46195 21.2108C2 20.9133 2 20.1575 2 18.6458V8.05426C2 5.20025 2 3.77325 2.87868 2.88663C3.75736 2 5.17157 2 8 2H20",stroke:"currentColor",key:"k1"}],["path",{d:"M10 8C8.89543 8 8 8.67157 8 9.5C8 10.3284 8.89543 11 10 11C11.1046 11 12 11.6716 12 12.5C12 13.3284 11.1046 14 10 14M10 8C10.8708 8 11.6116 8.4174 11.8862 9M10 8V7M10 14C9.12919 14 8.38836 13.5826 8.1138 13M10 14V15",stroke:"currentColor",key:"k2"}]]),je=[{message:"Marked as paid bill #421 for customer Lilly haris...",createdAt:"Sep 21, 11:00 AM",category:"Bill"},{message:"Created bill #421 for customer Lilly haris amount $300",createdAt:"Sep 20, 11:00 AM",category:"Bill"},{message:"Created tariff a 1/08/24 to 10/08/24",createdAt:"Sep 16, 11:00 AM",category:"Tariff"},{message:"Updated fullname of customer Emile",createdAt:"Sep 06, 11:00 AM",category:"Customer"}],pe=()=>{var n,s,a,o;const{userDetails:t}=$();return e.jsxs(E,{children:[e.jsx(h,{children:e.jsxs(d,{children:[e.jsx(d.Header,{children:e.jsx("h3",{className:"mb-0",children:"Details"})}),e.jsxs(d.Body,{children:[e.jsxs(E,{className:"mt-3",children:[e.jsx(h,{children:"Full Name:"}),e.jsx(h,{children:(n=t==null?void 0:t.profile)==null?void 0:n.fullName})]}),e.jsxs(E,{className:"mt-3",children:[e.jsx(h,{children:"Email address:"}),e.jsx(h,{children:t==null?void 0:t.emailAddress})]}),e.jsxs(E,{className:"mt-3",children:[e.jsx(h,{children:"Phone Number:"}),e.jsx(h,{children:(s=t==null?void 0:t.profile)==null?void 0:s.phoneNumber})]}),e.jsxs(E,{className:"mt-3",children:[e.jsx(h,{children:"Status:"}),e.jsx(h,{children:(a=t==null?void 0:t.profile)==null?void 0:a.status})]}),e.jsxs(E,{className:"mt-3 mb-4",children:[e.jsx(h,{children:"About me:"}),e.jsx(h,{children:(o=t==null?void 0:t.profile)==null?void 0:o.aboutMe})]})]})]})}),e.jsx(h,{children:e.jsxs(d,{children:[e.jsxs(d.Header,{as:K,justify:"between",children:[e.jsx("h3",{className:"mb-0",children:"Recent Activities"}),e.jsx("div",{children:"All Logs"})]}),e.jsx(d.Body,{children:e.jsx(se,{children:e.jsx("tbody",{children:je.map(r=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-dark",children:r.category=="Bill"?e.jsx(te,{}):r.category==="Tariff"?e.jsx(ue,{}):e.jsx(Y,{})}),e.jsxs("td",{className:"ps-3 text-dark",children:[e.jsx("h6",{className:"mb-0 text-truncate",children:r.message}),e.jsx("small",{className:"text-secondary",children:r.createdAt})]})]},r.message))})})})]})})]})},A=ae(),ve={name:"activityLogs",params:{url:"/cng/activityLogs"},columns:[A.accessor("createdAt",{header:"Created At",cell:({row:t})=>H(t.original.createdAt)}),A.accessor("entityName",{header:"Category"}),A.accessor("action",{header:"Action"}),A.accessor("changes",{header:"Changes",cell:({row:t})=>{var n;return(n=t.original)==null?void 0:n.changes}})]},ge=(t,n,s)=>{const a=new Date(t.getValue("createdAt"));let o=!1,r=!1;if(a){const[m,l]=s.dateRange;r=(!m||a>=new Date(m))&&(!l||a<=new Date(l))}return o=be(t,"entityName",s.entityName),r&&o},be=(t,n,s)=>{const a=t.getValue(n);return s==="All"?!0:s==a},ye=()=>{var p;const[t,n]=b.useState(),[s,a]=b.useState([null,null]),[o,r]=b.useState("All"),[m,l]=s,{table:x,setData:g,refreshData:v}=re({...ve,globalFilterFn:ge}),u=i=>({onDoubleClick:()=>{n(i.original)}}),c=({label:i,value:y,...N})=>e.jsxs(E,{className:"mb-3",children:[e.jsx(h,{xs:3,children:i}),e.jsx(h,{...N,children:y})]}),j=(p=t==null?void 0:t.changes)==null?void 0:p.split(", ").map(i=>e.jsx("div",{children:i}));return e.jsxs(e.Fragment,{children:[e.jsxs(w,{show:t,onHide:()=>n(null),size:"lg",children:[e.jsx(w.Header,{closeButton:!0,children:e.jsx("h3",{children:"Activity Log"})}),e.jsxs(w.Body,{children:[e.jsx(c,{label:"Category",value:t==null?void 0:t.entityName}),e.jsx(c,{label:"Action",value:t==null?void 0:t.action}),e.jsx(c,{label:"Created At",value:H(t==null?void 0:t.createdAt)}),e.jsx(c,{label:"Changes",value:j||"--",className:"border rounded",style:{height:"8rem"}})]})]}),e.jsxs(d,{children:[e.jsx(d.Header,{children:e.jsxs(K,{justify:"between",children:[e.jsx("h3",{children:"Activity Logs"}),e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx(ie,{placeholderText:"Search created between...",className:"form-control",name:"createdBetween",isClearable:!0,selectsRange:!0,startDate:m,endDate:l,onChange:i=>{a(i),x.setGlobalFilter({dateRange:i,entityName:o})}}),e.jsx("div",{className:"ms-3",children:e.jsxs(ne,{field:{state:"category",type:"select"},required:!1,onChange:i=>{r(i.target.value),x.setGlobalFilter({dateRange:s,entityName:i.target.value})},children:[e.jsx("option",{children:"All"}),e.jsx("option",{children:"Bill"}),e.jsx("option",{children:"Customer"}),e.jsx("option",{children:"Tariff"})]})})]})]})}),e.jsx(d.Body,{className:"p-0",children:e.jsx(oe,{table:x,rowProps:u})}),e.jsx(d.Footer,{children:e.jsx(le,{table:x})})]})]})},Ce="/cng-billing-system/assets/profile-cover-borRo3-_.svg",Re=({pageId:t})=>{var a;D();const{userDetails:n}=$(),s=ee();return e.jsxs(T.Container,{id:"right-down-tabs",defaultActiveKey:"overview",activeKey:t,onSelect:o=>s.push(`/profile/${o}`),children:[e.jsxs(d,{className:"position-relative",children:[e.jsx(d.Img,{variant:"top",src:Ce,height:140,className:"object-fit-cover"}),e.jsxs(d.Body,{className:"p-0 pb-3",children:[e.jsxs(K,{id:"avatar-profile",className:"ms-4 position-absolute",style:{top:"30%"},children:[e.jsx("img",{src:n==null?void 0:n.avatar,height:100,width:100,className:"border rounded-4"}),e.jsxs("div",{className:"m-4 mt-0 ms-3 text-dark",children:[e.jsx(d.Title,{className:"mb-0",children:(a=n==null?void 0:n.profile)==null?void 0:a.fullName}),e.jsx(d.Subtitle,{as:"small",className:"mb-2 text-secondary",children:n==null?void 0:n.role})]})]}),e.jsxs(f,{variant:"tabs",className:"justify-content-end mt-3 me-2",children:[e.jsx(f.Item,{children:e.jsx(f.Link,{eventKey:"overview",children:"Overview"})}),e.jsx(f.Item,{children:e.jsx(f.Link,{eventKey:"settings",children:"Settings"})}),e.jsx(f.Item,{children:e.jsx(f.Link,{eventKey:"activity-log",children:"Activity log"})})]})]})]}),e.jsxs(T.Content,{className:"mt-4 mb-3",children:[e.jsx(T.Pane,{eventKey:"overview",children:e.jsx(pe,{})}),e.jsx(T.Pane,{eventKey:"settings",children:e.jsx(ce,{})}),e.jsx(T.Pane,{eventKey:"activity-log",children:e.jsx(ye,{})})]})]})};export{Re as default};
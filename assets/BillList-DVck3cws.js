import{j as e,f as w,F as b,c as R,u as T,r as x,t as f,e as j,B as I,R as E,C as y}from"./index-BBZVF_XH.js";import{B as n,A as v}from"./labels--gJQxQlO.js";import{l as N}from"./lodash-CnXZZf-c.js";import{c as A,u as F,T as P}from"./TanStackTable-BluuVpOs.js";import{D as U,C as H}from"./DefaultRowActions-Dii3MQXi.js";import{F as M}from"./FeatureHeader-DpyJK2EI.js";import{E as O}from"./ExportData-DzTDqHwa.js";import{P as _}from"./Pagination-49DtyXDZ.js";import{o as $}from"./delete02-icon-CGhQGn9A.js";import{B as V}from"./Badge-CYU0V_-5.js";import{C as u}from"./FormSelect-CRrV35Dd.js";import"./FormCheck-B5v7tI3p.js";import"./Table-C0k4yvah.js";import"./upload02-icon-CvQZ4Da_.js";const i=A(),G={name:"bills",columns:[i.accessor("unitsConsumed",{header:n.UNITS}),i.accessor("billingDate",{header:n.BILLING_DATE}),i.accessor("paymentDueDate",{header:n.DUE_DATE}),i.accessor("paymentStatus",{header:n.STATUS,cell:({row:l})=>N.startCase(l.original.paymentStatus)}),i.accessor("billAmount",{header:n.AMOUNT})],columnVisibility:{addressLine2:!1},alterOptions:{globelFilter:!1}},K=({table:l})=>{const d=s=>l.getCoreRowModel().rows.filter(p=>{var r;return((r=p.original.paymentStatus)==null?void 0:r.toUpperCase())===s.toUpperCase()}),o=["Pending","Completed","Overdue","NotBilled"].map(s=>({status:N.startCase(s),count:d(s).length}));o.unshift({status:"All",count:l.getCoreRowModel().rows.length});const c=s=>{if(s.toUpperCase()==="ALL"){l.resetColumnFilters();return}l.setColumnFilters([{id:"paymentStatus",value:s}])},m=s=>{switch(s){case"All":return"dark";case"Pending":return"warning";case"Completed":return"success";case"Overdue":return"danger"}};return e.jsx(w,{horizontal:!0,className:"flex-wrap list-group-tabs",defaultActiveKey:"All",children:o.map(s=>e.jsxs(w.Item,{onClick:()=>c(s.status),className:"cursor-pointer",eventKey:s.status,as:b,children:[e.jsx("span",{className:"me-2 fw-medium",children:s.status}),e.jsx(V,{className:"badge-"+(m(s.status)||"secondary"),bg:"none",children:s.count})]},s.status))})},oe=()=>{const l=R(),{isCustomer:d}=T(),o=A(),{name:c,columns:m,_mock:s,columnVisibility:p}=G,{table:r,setData:D}=F({columns:x.useMemo(()=>[o.display({id:"customer",header:"Customer",cell:({row:a})=>{const t=a.original.customer;return e.jsxs("div",{children:[e.jsx("p",{className:"mb-0",children:t==null?void 0:t.fullName}),e.jsx("p",{className:"mb-0",children:t==null?void 0:t.accountNumber})]})},enableHiding:!1}),...m,o.display({id:"actions",cell:({row:a,...t})=>e.jsx(U,{props:t,row:a,onDelete:B,onEdit:()=>l.push(`/bills/${a.original.id}`)})})],[]),name:c,columnVisibility:p,_mock:s});x.useEffect(()=>{h()},[]);const C=r.getSelectedRowModel().rows.map(a=>a.original.id),g=C.length,h=x.useCallback(async()=>{const t=(await f(j.get("/cng/bills-with-customer"))).data;D(t),r.reset()},[]),B=async a=>{await f(j.delete(`/cng/bills/${a.id}`)),h()},S=async()=>{await f(j({url:"/cng/bulk-delete-bills",method:"delete",data:{ids:C}})),h()},L=()=>{l.push("/bills/new")},k=a=>({onDoubleClick:()=>{const t=a.original.id;l.push(`/bills/${t}`)}});return e.jsxs("div",{children:[e.jsx(M,{title:"Bills",className:"justify-content-between",breadcrumbs:[{title:"Bill",path:"/bills"},{title:"List",disabled:!0}],children:!d&&e.jsxs(I,{variant:"success",onClick:L,children:["+ ",v.BILL]})}),e.jsx("section",{className:"mt-3",children:e.jsxs(u,{children:[e.jsx(u.Header,{className:"py-3",children:g>0?e.jsxs(b,{justify:"between",children:[e.jsx("div",{children:`${g} Rows selected`}),e.jsx($,{onClick:S})]}):e.jsxs(E,{className:"justify-content-between",children:[e.jsx(y,{xs:!0,lg:"auto",sm:1,children:e.jsx(K,{table:r})}),e.jsxs(y,{xs:!0,sm:"auto",as:b,justify:"end",children:[e.jsx(H,{table:r}),e.jsx(O,{filename:c,table:r})]})]})}),e.jsx(u.Body,{className:"p-0",children:e.jsx(P,{table:r,rowProps:k})}),e.jsx(u.Footer,{children:e.jsx(_,{table:r})})]})})]})};export{oe as default};

import{u as d,c as l,j as s,H as c,B as m,L as u,t as p,s as w,g as x}from"./index-BBZVF_XH.js";import{A as h}from"./AuthLayout-CtvWwgp0.js";import{H as j}from"./HookForm-Lmu3z8lE.js";import{I as t}from"./Input-DNZQAGF7.js";import"./FormSelect-CRrV35Dd.js";import"./index.esm-16HUKa1g.js";import"./FormCheck-B5v7tI3p.js";const y=()=>{const{user:{emailAddress:e,role:o}}=d(),r=l(),a=async i=>{await p(w.post("/update-password",{newPassword:i.newPassword,emailAddress:e})).catch(n=>console.log(n)),r.push(x(o))};return s.jsxs(s.Fragment,{children:[s.jsx(c,{children:s.jsx("title",{children:"CNG Enter Password "})}),s.jsxs(h,{children:[s.jsxs(j,{onSubmit:a,className:"d-grid",children:[s.jsx("h3",{className:"mb-0",children:"Enter your Password"}),s.jsx(t,{field:{state:"newPassword",title:"New Password"}}),s.jsx(t,{field:{state:"confirmPassword",title:"Confirm Password"}}),s.jsx(m,{size:"sm",type:"submit",children:"Update and Login"})]}),s.jsx(u,{to:"/login",className:"d-block text-center mt-3 text-decoration-underline cursor-pointer",children:"<- Back to login"})]})]})};export{y as default};
import{y as u,j as t}from"./index-8ZxL3BOu.js";import{u as i,e as k,F as d}from"./index.esm-CbKD2Vy3.js";/**
 * @license hugeicons-react v0.1.3
 *
 * See the LICENSE file in the root directory of this source tree.
 */const x=u("AlertCircleIcon",[["circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",key:"k0"}],["path",{d:"M11.992 15H12.001",stroke:"currentColor",key:"k1"}],["path",{d:"M12 12L12 8",stroke:"currentColor",key:"k2"}]]),y=({children:s,onSubmit:l,defaultValues:n=null,...c})=>{const o=i({mode:"all",values:{...n}}),a=(r,e)=>{e==null||e.stopPropagation(),Object.keys(o.formState.errors).length===0&&(console.log(`Form data: ${r}`),l(r,e))},m=r=>{r.preventDefault(),o.reset()};return t.jsx(k,{...o,children:t.jsx(d,{onSubmit:o.handleSubmit(a),onReset:m,...c,children:s})})};export{y as H,x as e};

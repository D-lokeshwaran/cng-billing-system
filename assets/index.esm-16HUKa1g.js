import{r as J,v as Fe,j as X,m as fe,Z as ze,C as Qr,k as Zr,Q as Ue,w as A}from"./index-BBZVF_XH.js";import{F as pe}from"./FormCheck-B5v7tI3p.js";import{F as zr}from"./FormSelect-CRrV35Dd.js";const Fr=J.forwardRef(({className:e,bsPrefix:t,as:r="div",...a},n)=>(t=Fe(t,"form-floating"),X.jsx(r,{ref:n,className:fe(e,t),...a})));Fr.displayName="FormFloating";const Je=J.forwardRef(({controlId:e,as:t="div",...r},a)=>{const n=J.useMemo(()=>({controlId:e}),[e]);return X.jsx(ze.Provider,{value:n,children:X.jsx(t,{...r,ref:a})})});Je.displayName="FormGroup";const br=J.forwardRef(({as:e="label",bsPrefix:t,column:r=!1,visuallyHidden:a=!1,className:n,htmlFor:u,...d},g)=>{const{controlId:b}=J.useContext(ze);t=Fe(t,"form-label");let E="col-form-label";typeof r=="string"&&(E=`${E} ${E}-${r}`);const F=fe(n,t,a&&"visually-hidden",r&&E);return u=u||b,r?X.jsx(Qr,{ref:g,as:"label",className:F,htmlFor:u,...d}):X.jsx(e,{ref:g,className:F,htmlFor:u,...d})});br.displayName="FormLabel";const Ar=J.forwardRef(({bsPrefix:e,className:t,id:r,...a},n)=>{const{controlId:u}=J.useContext(ze);return e=Fe(e,"form-range"),X.jsx("input",{...a,type:"range",ref:n,className:fe(t,e),id:r||u})});Ar.displayName="FormRange";const Vr=J.forwardRef(({bsPrefix:e,className:t,as:r="small",muted:a,...n},u)=>(e=Fe(e,"form-text"),X.jsx(r,{...n,ref:u,className:fe(t,e,a&&"text-muted")})));Vr.displayName="FormText";const xr=J.forwardRef((e,t)=>X.jsx(pe,{...e,ref:t,type:"switch"}));xr.displayName="Switch";const Jr=Object.assign(xr,{Input:pe.Input,Label:pe.Label}),pr=J.forwardRef(({bsPrefix:e,className:t,children:r,controlId:a,label:n,...u},d)=>(e=Fe(e,"form-floating"),X.jsxs(Je,{ref:d,className:fe(t,e),controlId:a,...u,children:[r,X.jsx("label",{htmlFor:a,children:n})]})));pr.displayName="FloatingLabel";const Xr={_ref:Ue.any,validated:Ue.bool,as:Ue.elementType},Xe=J.forwardRef(({className:e,validated:t,as:r="form",...a},n)=>X.jsx(r,{...a,ref:n,className:fe(e,t&&"was-validated")}));Xe.displayName="Form";Xe.propTypes=Xr;const At=Object.assign(Xe,{Group:Je,Control:Zr,Floating:Fr,Check:pe,Switch:Jr,Label:br,Text:Vr,Range:Ar,Select:zr,FloatingLabel:pr});var be=e=>e.type==="checkbox",oe=e=>e instanceof Date,B=e=>e==null;const wr=e=>typeof e=="object";var U=e=>!B(e)&&!Array.isArray(e)&&wr(e)&&!oe(e),Sr=e=>U(e)&&e.target?be(e.target)?e.target.checked:e.target.value:e,Yr=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,kr=(e,t)=>e.has(Yr(t)),et=e=>{const t=e.constructor&&e.constructor.prototype;return U(t)&&t.hasOwnProperty("isPrototypeOf")},Ye=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function O(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(Ye&&(e instanceof Blob||e instanceof FileList))&&(r||U(e)))if(t=r?[]:{},!r&&!et(e))t=e;else for(const a in e)e.hasOwnProperty(a)&&(t[a]=O(e[a]));else return e;return t}var de=e=>Array.isArray(e)?e.filter(Boolean):[],C=e=>e===void 0,c=(e,t,r)=>{if(!t||!U(e))return r;const a=de(t.split(/[,[\].]+?/)).reduce((n,u)=>B(n)?n:n[u],e);return C(a)||a===e?C(e[t])?r:e[t]:a},re=e=>typeof e=="boolean",er=e=>/^\w*$/.test(e),Dr=e=>de(e.replace(/["|']|\]/g,"").split(/\.|\[/)),D=(e,t,r)=>{let a=-1;const n=er(t)?[t]:Dr(t),u=n.length,d=u-1;for(;++a<u;){const g=n[a];let b=r;if(a!==d){const E=e[g];b=U(E)||Array.isArray(E)?E:isNaN(+n[a+1])?{}:[]}if(g==="__proto__")return;e[g]=b,e=e[g]}return e};const we={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},K={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},se={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Er=A.createContext(null),Ce=()=>A.useContext(Er),Vt=e=>{const{children:t,...r}=e;return A.createElement(Er.Provider,{value:r},t)};var Cr=(e,t,r,a=!0)=>{const n={defaultValues:t._defaultValues};for(const u in e)Object.defineProperty(n,u,{get:()=>{const d=u;return t._proxyFormState[d]!==K.all&&(t._proxyFormState[d]=!a||K.all),r&&(r[d]=!0),e[d]}});return n},P=e=>U(e)&&!Object.keys(e).length,Rr=(e,t,r,a)=>{r(e);const{name:n,...u}=e;return P(u)||Object.keys(u).length>=Object.keys(t).length||Object.keys(u).find(d=>t[d]===(!a||K.all))},$=e=>Array.isArray(e)?e:[e],Tr=(e,t,r)=>!e||!t||e===t||$(e).some(a=>a&&(r?a===t:a.startsWith(t)||t.startsWith(a)));function Re(e){const t=A.useRef(e);t.current=e,A.useEffect(()=>{const r=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}function rt(e){const t=Ce(),{control:r=t.control,disabled:a,name:n,exact:u}=e||{},[d,g]=A.useState(r._formState),b=A.useRef(!0),E=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),F=A.useRef(n);return F.current=n,Re({disabled:a,next:m=>b.current&&Tr(F.current,m.name,u)&&Rr(m,E.current,r._updateFormState)&&g({...r._formState,...m}),subject:r._subjects.state}),A.useEffect(()=>(b.current=!0,E.current.isValid&&r._updateValid(!0),()=>{b.current=!1}),[r]),Cr(d,r,E.current,!1)}var te=e=>typeof e=="string",Lr=(e,t,r,a,n)=>te(e)?(a&&t.watch.add(e),c(r,e,n)):Array.isArray(e)?e.map(u=>(a&&t.watch.add(u),c(r,u))):(a&&(t.watchAll=!0),r);function tt(e){const t=Ce(),{control:r=t.control,name:a,defaultValue:n,disabled:u,exact:d}=e||{},g=A.useRef(a);g.current=a,Re({disabled:u,subject:r._subjects.values,next:F=>{Tr(g.current,F.name,d)&&E(O(Lr(g.current,r._names,F.values||r._formValues,!1,n)))}});const[b,E]=A.useState(r._getWatch(a,n));return A.useEffect(()=>r._removeUnmounted()),b}function st(e){const t=Ce(),{name:r,disabled:a,control:n=t.control,shouldUnregister:u}=e,d=kr(n._names.array,r),g=tt({control:n,name:r,defaultValue:c(n._formValues,r,c(n._defaultValues,r,e.defaultValue)),exact:!0}),b=rt({control:n,name:r}),E=A.useRef(n.register(r,{...e.rules,value:g,...re(e.disabled)?{disabled:e.disabled}:{}}));return A.useEffect(()=>{const F=n._options.shouldUnregister||u,m=(k,q)=>{const M=c(n._fields,k);M&&(M._f.mount=q)};if(m(r,!0),F){const k=O(c(n._options.defaultValues,r));D(n._defaultValues,r,k),C(c(n._formValues,r))&&D(n._formValues,r,k)}return()=>{(d?F&&!n._state.action:F)?n.unregister(r):m(r,!1)}},[r,n,d,u]),A.useEffect(()=>{c(n._fields,r)&&n._updateDisabledField({disabled:a,fields:n._fields,name:r,value:c(n._fields,r)._f.value})},[a,r,n]),{field:{name:r,value:g,...re(a)||b.disabled?{disabled:b.disabled||a}:{},onChange:A.useCallback(F=>E.current.onChange({target:{value:Sr(F),name:r},type:we.CHANGE}),[r]),onBlur:A.useCallback(()=>E.current.onBlur({target:{value:c(n._formValues,r),name:r},type:we.BLUR}),[r,n]),ref:F=>{const m=c(n._fields,r);m&&F&&(m._f.ref={focus:()=>F.focus(),select:()=>F.select(),setCustomValidity:k=>F.setCustomValidity(k),reportValidity:()=>F.reportValidity()})}},formState:b,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!c(b.errors,r)},isDirty:{enumerable:!0,get:()=>!!c(b.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!c(b.touchedFields,r)},isValidating:{enumerable:!0,get:()=>!!c(b.validatingFields,r)},error:{enumerable:!0,get:()=>c(b.errors,r)}})}}const xt=e=>e.render(st(e));var at=(e,t,r,a,n)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[a]:n||!0}}:{},ae=()=>{const e=typeof performance>"u"?Date.now():performance.now()*1e3;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{const r=(Math.random()*16+e)%16|0;return(t=="x"?r:r&3|8).toString(16)})},Me=(e,t,r={})=>r.shouldFocus||C(r.shouldFocus)?r.focusName||`${e}.${C(r.focusIndex)?t:r.focusIndex}.`:"",me=e=>({isOnSubmit:!e||e===K.onSubmit,isOnBlur:e===K.onBlur,isOnChange:e===K.onChange,isOnAll:e===K.all,isOnTouch:e===K.onTouched}),Qe=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length))));const ce=(e,t,r,a)=>{for(const n of r||Object.keys(e)){const u=c(e,n);if(u){const{_f:d,...g}=u;if(d){if(d.refs&&d.refs[0]&&t(d.refs[0],n)&&!a)break;if(d.ref&&t(d.ref,d.name)&&!a)break;ce(g,t)}else U(g)&&ce(g,t)}}};var Nr=(e,t,r)=>{const a=de(c(e,r));return D(a,"root",t[r]),D(e,r,a),e},rr=e=>e.type==="file",ie=e=>typeof e=="function",Se=e=>{if(!Ye)return!1;const t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},xe=e=>te(e),tr=e=>e.type==="radio",ke=e=>e instanceof RegExp;const yr={value:!1,isValid:!1},gr={value:!0,isValid:!0};var Or=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!C(e[0].attributes.value)?C(e[0].value)||e[0].value===""?gr:{value:e[0].value,isValid:!0}:gr:yr}return yr};const _r={isValid:!1,value:null};var Ur=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,_r):_r;function hr(e,t,r="validate"){if(xe(e)||Array.isArray(e)&&e.every(xe)||re(e)&&!e)return{type:r,message:xe(e)?e:"",ref:t}}var le=e=>U(e)&&!ke(e)?e:{value:e,message:""},Ze=async(e,t,r,a,n)=>{const{ref:u,refs:d,required:g,maxLength:b,minLength:E,min:F,max:m,pattern:k,validate:q,name:M,valueAsNumber:ye,mount:Y,disabled:ee}=e._f,p=c(t,M);if(!Y||ee)return{};const Q=d?d[0]:u,Z=x=>{a&&Q.reportValidity&&(Q.setCustomValidity(re(x)?"":x||""),Q.reportValidity())},_={},v=tr(u),V=be(u),R=v||V,H=(ye||rr(u))&&C(u.value)&&C(p)||Se(u)&&u.value===""||p===""||Array.isArray(p)&&!p.length,I=at.bind(null,M,r,_),Ae=(x,w,N,j=se.maxLength,z=se.minLength)=>{const G=x?w:N;_[M]={type:x?j:z,message:G,ref:u,...I(x?j:z,G)}};if(n?!Array.isArray(p)||!p.length:g&&(!R&&(H||B(p))||re(p)&&!p||V&&!Or(d).isValid||v&&!Ur(d).isValid)){const{value:x,message:w}=xe(g)?{value:!!g,message:g}:le(g);if(x&&(_[M]={type:se.required,message:w,ref:Q,...I(se.required,w)},!r))return Z(w),_}if(!H&&(!B(F)||!B(m))){let x,w;const N=le(m),j=le(F);if(!B(p)&&!isNaN(p)){const z=u.valueAsNumber||p&&+p;B(N.value)||(x=z>N.value),B(j.value)||(w=z<j.value)}else{const z=u.valueAsDate||new Date(p),G=he=>new Date(new Date().toDateString()+" "+he),ge=u.type=="time",_e=u.type=="week";te(N.value)&&p&&(x=ge?G(p)>G(N.value):_e?p>N.value:z>new Date(N.value)),te(j.value)&&p&&(w=ge?G(p)<G(j.value):_e?p<j.value:z<new Date(j.value))}if((x||w)&&(Ae(!!x,N.message,j.message,se.max,se.min),!r))return Z(_[M].message),_}if((b||E)&&!H&&(te(p)||n&&Array.isArray(p))){const x=le(b),w=le(E),N=!B(x.value)&&p.length>+x.value,j=!B(w.value)&&p.length<+w.value;if((N||j)&&(Ae(N,x.message,w.message),!r))return Z(_[M].message),_}if(k&&!H&&te(p)){const{value:x,message:w}=le(k);if(ke(x)&&!p.match(x)&&(_[M]={type:se.pattern,message:w,ref:u,...I(se.pattern,w)},!r))return Z(w),_}if(q){if(ie(q)){const x=await q(p,t),w=hr(x,Q);if(w&&(_[M]={...w,...I(se.validate,w.message)},!r))return Z(w.message),_}else if(U(q)){let x={};for(const w in q){if(!P(x)&&!r)break;const N=hr(await q[w](p,t),Q,w);N&&(x={...N,...I(w,N.message)},Z(N.message),r&&(_[M]=x))}if(!P(x)&&(_[M]={ref:Q,...x},!r))return _}}return Z(!0),_},je=(e,t)=>[...e,...$(t)],Ie=e=>Array.isArray(e)?e.map(()=>{}):void 0;function Be(e,t,r){return[...e.slice(0,t),...$(r),...e.slice(t)]}var Pe=(e,t,r)=>Array.isArray(e)?(C(e[r])&&(e[r]=void 0),e.splice(r,0,e.splice(t,1)[0]),e):[],We=(e,t)=>[...$(t),...$(e)];function it(e,t){let r=0;const a=[...e];for(const n of t)a.splice(n-r,1),r++;return de(a).length?a:[]}var $e=(e,t)=>C(t)?[]:it(e,$(t).sort((r,a)=>r-a)),qe=(e,t,r)=>{[e[t],e[r]]=[e[r],e[t]]};function nt(e,t){const r=t.slice(0,-1).length;let a=0;for(;a<r;)e=C(e)?a++:e[t[a++]];return e}function ut(e){for(const t in e)if(e.hasOwnProperty(t)&&!C(e[t]))return!1;return!0}function L(e,t){const r=Array.isArray(t)?t:er(t)?[t]:Dr(t),a=r.length===1?e:nt(e,r),n=r.length-1,u=r[n];return a&&delete a[u],n!==0&&(U(a)&&P(a)||Array.isArray(a)&&ut(a))&&L(e,r.slice(0,-1)),e}var vr=(e,t,r)=>(e[t]=r,e);function pt(e){const t=Ce(),{control:r=t.control,name:a,keyName:n="id",shouldUnregister:u}=e,[d,g]=A.useState(r._getFieldArray(a)),b=A.useRef(r._getFieldArray(a).map(ae)),E=A.useRef(d),F=A.useRef(a),m=A.useRef(!1);F.current=a,E.current=d,r._names.array.add(a),e.rules&&r.register(a,e.rules),Re({next:({values:_,name:v})=>{if(v===F.current||!v){const V=c(_,F.current);Array.isArray(V)&&(g(V),b.current=V.map(ae))}},subject:r._subjects.array});const k=A.useCallback(_=>{m.current=!0,r._updateFieldArray(a,_)},[r,a]),q=(_,v)=>{const V=$(O(_)),R=je(r._getFieldArray(a),V);r._names.focus=Me(a,R.length-1,v),b.current=je(b.current,V.map(ae)),k(R),g(R),r._updateFieldArray(a,R,je,{argA:Ie(_)})},M=(_,v)=>{const V=$(O(_)),R=We(r._getFieldArray(a),V);r._names.focus=Me(a,0,v),b.current=We(b.current,V.map(ae)),k(R),g(R),r._updateFieldArray(a,R,We,{argA:Ie(_)})},ye=_=>{const v=$e(r._getFieldArray(a),_);b.current=$e(b.current,_),k(v),g(v),r._updateFieldArray(a,v,$e,{argA:_})},Y=(_,v,V)=>{const R=$(O(v)),H=Be(r._getFieldArray(a),_,R);r._names.focus=Me(a,_,V),b.current=Be(b.current,_,R.map(ae)),k(H),g(H),r._updateFieldArray(a,H,Be,{argA:_,argB:Ie(v)})},ee=(_,v)=>{const V=r._getFieldArray(a);qe(V,_,v),qe(b.current,_,v),k(V),g(V),r._updateFieldArray(a,V,qe,{argA:_,argB:v},!1)},p=(_,v)=>{const V=r._getFieldArray(a);Pe(V,_,v),Pe(b.current,_,v),k(V),g(V),r._updateFieldArray(a,V,Pe,{argA:_,argB:v},!1)},Q=(_,v)=>{const V=O(v),R=vr(r._getFieldArray(a),_,V);b.current=[...R].map((H,I)=>!H||I===_?ae():b.current[I]),k(R),g([...R]),r._updateFieldArray(a,R,vr,{argA:_,argB:V},!0,!1)},Z=_=>{const v=$(O(_));b.current=v.map(ae),k([...v]),g([...v]),r._updateFieldArray(a,[...v],V=>V,{},!0,!1)};return A.useEffect(()=>{if(r._state.action=!1,Qe(a,r._names)&&r._subjects.state.next({...r._formState}),m.current&&(!me(r._options.mode).isOnSubmit||r._formState.isSubmitted))if(r._options.resolver)r._executeSchema([a]).then(_=>{const v=c(_.errors,a),V=c(r._formState.errors,a);(V?!v&&V.type||v&&(V.type!==v.type||V.message!==v.message):v&&v.type)&&(v?D(r._formState.errors,a,v):L(r._formState.errors,a),r._subjects.state.next({errors:r._formState.errors}))});else{const _=c(r._fields,a);_&&_._f&&!(me(r._options.reValidateMode).isOnSubmit&&me(r._options.mode).isOnSubmit)&&Ze(_,r._formValues,r._options.criteriaMode===K.all,r._options.shouldUseNativeValidation,!0).then(v=>!P(v)&&r._subjects.state.next({errors:Nr(r._formState.errors,v,a)}))}r._subjects.values.next({name:a,values:{...r._formValues}}),r._names.focus&&ce(r._fields,(_,v)=>{if(r._names.focus&&v.startsWith(r._names.focus)&&_.focus)return _.focus(),1}),r._names.focus="",r._updateValid(),m.current=!1},[d,a,r]),A.useEffect(()=>(!c(r._formValues,a)&&r._updateFieldArray(a),()=>{(r._options.shouldUnregister||u)&&r.unregister(a)}),[a,r,n,u]),{swap:A.useCallback(ee,[k,a,r]),move:A.useCallback(p,[k,a,r]),prepend:A.useCallback(M,[k,a,r]),append:A.useCallback(q,[k,a,r]),remove:A.useCallback(ye,[k,a,r]),insert:A.useCallback(Y,[k,a,r]),update:A.useCallback(Q,[k,a,r]),replace:A.useCallback(Z,[k,a,r]),fields:A.useMemo(()=>d.map((_,v)=>({..._,[n]:b.current[v]||ae()})),[d,n])}}var He=()=>{let e=[];return{get observers(){return e},next:n=>{for(const u of e)u.next&&u.next(n)},subscribe:n=>(e.push(n),{unsubscribe:()=>{e=e.filter(u=>u!==n)}}),unsubscribe:()=>{e=[]}}},De=e=>B(e)||!wr(e);function ne(e,t){if(De(e)||De(t))return e===t;if(oe(e)&&oe(t))return e.getTime()===t.getTime();const r=Object.keys(e),a=Object.keys(t);if(r.length!==a.length)return!1;for(const n of r){const u=e[n];if(!a.includes(n))return!1;if(n!=="ref"){const d=t[n];if(oe(u)&&oe(d)||U(u)&&U(d)||Array.isArray(u)&&Array.isArray(d)?!ne(u,d):u!==d)return!1}}return!0}var Mr=e=>e.type==="select-multiple",lt=e=>tr(e)||be(e),Ge=e=>Se(e)&&e.isConnected,jr=e=>{for(const t in e)if(ie(e[t]))return!0;return!1};function Ee(e,t={}){const r=Array.isArray(e);if(U(e)||r)for(const a in e)Array.isArray(e[a])||U(e[a])&&!jr(e[a])?(t[a]=Array.isArray(e[a])?[]:{},Ee(e[a],t[a])):B(e[a])||(t[a]=!0);return t}function Ir(e,t,r){const a=Array.isArray(e);if(U(e)||a)for(const n in e)Array.isArray(e[n])||U(e[n])&&!jr(e[n])?C(t)||De(r[n])?r[n]=Array.isArray(e[n])?Ee(e[n],[]):{...Ee(e[n])}:Ir(e[n],B(t)?{}:t[n],r[n]):r[n]=!ne(e[n],t[n]);return r}var Ve=(e,t)=>Ir(e,t,Ee(t)),Br=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:a})=>C(e)?e:t?e===""?NaN:e&&+e:r&&te(e)?new Date(e):a?a(e):e;function Ke(e){const t=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):t.disabled))return rr(t)?t.files:tr(t)?Ur(e.refs).value:Mr(t)?[...t.selectedOptions].map(({value:r})=>r):be(t)?Or(e.refs).value:Br(C(t.value)?e.ref.value:t.value,e)}var ot=(e,t,r,a)=>{const n={};for(const u of e){const d=c(t,u);d&&D(n,u,d._f)}return{criteriaMode:r,names:[...e],fields:n,shouldUseNativeValidation:a}},ve=e=>C(e)?e:ke(e)?e.source:U(e)?ke(e.value)?e.value.source:e.value:e,ct=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function mr(e,t,r){const a=c(e,r);if(a||er(r))return{error:a,name:r};const n=r.split(".");for(;n.length;){const u=n.join("."),d=c(t,u),g=c(e,u);if(d&&!Array.isArray(d)&&r!==u)return{name:r};if(g&&g.type)return{name:u,error:g};n.pop()}return{name:r}}var ft=(e,t,r,a,n)=>n.isOnAll?!1:!r&&n.isOnTouch?!(t||e):(r?a.isOnBlur:n.isOnBlur)?!e:(r?a.isOnChange:n.isOnChange)?e:!0,dt=(e,t)=>!de(c(e,t)).length&&L(e,t);const yt={mode:K.onSubmit,reValidateMode:K.onChange,shouldFocusError:!0};function gt(e={}){let t={...yt,...e},r={submitCount:0,isDirty:!1,isLoading:ie(t.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:t.errors||{},disabled:t.disabled||!1},a={},n=U(t.defaultValues)||U(t.values)?O(t.defaultValues||t.values)||{}:{},u=t.shouldUnregister?{}:O(n),d={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},b,E=0;const F={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},m={values:He(),array:He(),state:He()},k=me(t.mode),q=me(t.reValidateMode),M=t.criteriaMode===K.all,ye=s=>i=>{clearTimeout(E),E=setTimeout(s,i)},Y=async s=>{if(F.isValid||s){const i=t.resolver?P((await R()).errors):await I(a,!0);i!==r.isValid&&m.state.next({isValid:i})}},ee=(s,i)=>{(F.isValidating||F.validatingFields)&&((s||Array.from(g.mount)).forEach(l=>{l&&(i?D(r.validatingFields,l,i):L(r.validatingFields,l))}),m.state.next({validatingFields:r.validatingFields,isValidating:!P(r.validatingFields)}))},p=(s,i=[],l,y,f=!0,o=!0)=>{if(y&&l){if(d.action=!0,o&&Array.isArray(c(a,s))){const h=l(c(a,s),y.argA,y.argB);f&&D(a,s,h)}if(o&&Array.isArray(c(r.errors,s))){const h=l(c(r.errors,s),y.argA,y.argB);f&&D(r.errors,s,h),dt(r.errors,s)}if(F.touchedFields&&o&&Array.isArray(c(r.touchedFields,s))){const h=l(c(r.touchedFields,s),y.argA,y.argB);f&&D(r.touchedFields,s,h)}F.dirtyFields&&(r.dirtyFields=Ve(n,u)),m.state.next({name:s,isDirty:x(s,i),dirtyFields:r.dirtyFields,errors:r.errors,isValid:r.isValid})}else D(u,s,i)},Q=(s,i)=>{D(r.errors,s,i),m.state.next({errors:r.errors})},Z=s=>{r.errors=s,m.state.next({errors:r.errors,isValid:!1})},_=(s,i,l,y)=>{const f=c(a,s);if(f){const o=c(u,s,C(l)?c(n,s):l);C(o)||y&&y.defaultChecked||i?D(u,s,i?o:Ke(f._f)):j(s,o),d.mount&&Y()}},v=(s,i,l,y,f)=>{let o=!1,h=!1;const S={name:s},T=!!(c(a,s)&&c(a,s)._f.disabled);if(!l||y){F.isDirty&&(h=r.isDirty,r.isDirty=S.isDirty=x(),o=h!==S.isDirty);const W=T||ne(c(n,s),i);h=!!(!T&&c(r.dirtyFields,s)),W||T?L(r.dirtyFields,s):D(r.dirtyFields,s,!0),S.dirtyFields=r.dirtyFields,o=o||F.dirtyFields&&h!==!W}if(l){const W=c(r.touchedFields,s);W||(D(r.touchedFields,s,l),S.touchedFields=r.touchedFields,o=o||F.touchedFields&&W!==l)}return o&&f&&m.state.next(S),o?S:{}},V=(s,i,l,y)=>{const f=c(r.errors,s),o=F.isValid&&re(i)&&r.isValid!==i;if(e.delayError&&l?(b=ye(()=>Q(s,l)),b(e.delayError)):(clearTimeout(E),b=null,l?D(r.errors,s,l):L(r.errors,s)),(l?!ne(f,l):f)||!P(y)||o){const h={...y,...o&&re(i)?{isValid:i}:{},errors:r.errors,name:s};r={...r,...h},m.state.next(h)}},R=async s=>{ee(s,!0);const i=await t.resolver(u,t.context,ot(s||g.mount,a,t.criteriaMode,t.shouldUseNativeValidation));return ee(s),i},H=async s=>{const{errors:i}=await R(s);if(s)for(const l of s){const y=c(i,l);y?D(r.errors,l,y):L(r.errors,l)}else r.errors=i;return i},I=async(s,i,l={valid:!0})=>{for(const y in s){const f=s[y];if(f){const{_f:o,...h}=f;if(o){const S=g.array.has(o.name);ee([y],!0);const T=await Ze(f,u,M,t.shouldUseNativeValidation&&!i,S);if(ee([y]),T[o.name]&&(l.valid=!1,i))break;!i&&(c(T,o.name)?S?Nr(r.errors,T,o.name):D(r.errors,o.name,T[o.name]):L(r.errors,o.name))}h&&await I(h,i,l)}}return l.valid},Ae=()=>{for(const s of g.unMount){const i=c(a,s);i&&(i._f.refs?i._f.refs.every(l=>!Ge(l)):!Ge(i._f.ref))&&Te(s)}g.unMount=new Set},x=(s,i)=>(s&&i&&D(u,s,i),!ne(sr(),n)),w=(s,i,l)=>Lr(s,g,{...d.mount?u:C(i)?n:te(s)?{[s]:i}:i},l,i),N=s=>de(c(d.mount?u:n,s,e.shouldUnregister?c(n,s,[]):[])),j=(s,i,l={})=>{const y=c(a,s);let f=i;if(y){const o=y._f;o&&(!o.disabled&&D(u,s,Br(i,o)),f=Se(o.ref)&&B(i)?"":i,Mr(o.ref)?[...o.ref.options].forEach(h=>h.selected=f.includes(h.value)):o.refs?be(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(f)?!!f.find(S=>S===h.value):f===h.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(h=>h.checked=h.value===f):rr(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||m.values.next({name:s,values:{...u}})))}(l.shouldDirty||l.shouldTouch)&&v(s,f,l.shouldTouch,l.shouldDirty,!0),l.shouldValidate&&he(s)},z=(s,i,l)=>{for(const y in i){const f=i[y],o=`${s}.${y}`,h=c(a,o);(g.array.has(s)||!De(f)||h&&!h._f)&&!oe(f)?z(o,f,l):j(o,f,l)}},G=(s,i,l={})=>{const y=c(a,s),f=g.array.has(s),o=O(i);D(u,s,o),f?(m.array.next({name:s,values:{...u}}),(F.isDirty||F.dirtyFields)&&l.shouldDirty&&m.state.next({name:s,dirtyFields:Ve(n,u),isDirty:x(s,o)})):y&&!y._f&&!B(o)?z(s,o,l):j(s,o,l),Qe(s,g)&&m.state.next({...r}),m.values.next({name:d.mount?s:void 0,values:{...u}})},ge=async s=>{d.mount=!0;const i=s.target;let l=i.name,y=!0;const f=c(a,l),o=()=>i.type?Ke(f._f):Sr(s),h=S=>{y=Number.isNaN(S)||S===c(u,l,S)};if(f){let S,T;const W=o(),ue=s.type===we.BLUR||s.type===we.FOCUS_OUT,Hr=!ct(f._f)&&!t.resolver&&!c(r.errors,l)&&!f._f.deps||ft(ue,c(r.touchedFields,l),r.isSubmitted,q,k),Ne=Qe(l,g,ue);D(u,l,W),ue?(f._f.onBlur&&f._f.onBlur(s),b&&b(0)):f._f.onChange&&f._f.onChange(s);const Oe=v(l,W,ue,!1),Gr=!P(Oe)||Ne;if(!ue&&m.values.next({name:l,type:s.type,values:{...u}}),Hr)return F.isValid&&Y(),Gr&&m.state.next({name:l,...Ne?{}:Oe});if(!ue&&Ne&&m.state.next({...r}),t.resolver){const{errors:fr}=await R([l]);if(h(W),y){const Kr=mr(r.errors,a,l),dr=mr(fr,a,Kr.name||l);S=dr.error,l=dr.name,T=P(fr)}}else ee([l],!0),S=(await Ze(f,u,M,t.shouldUseNativeValidation))[l],ee([l]),h(W),y&&(S?T=!1:F.isValid&&(T=await I(a,!0)));y&&(f._f.deps&&he(f._f.deps),V(l,T,S,Oe))}},_e=(s,i)=>{if(c(r.errors,i)&&s.focus)return s.focus(),1},he=async(s,i={})=>{let l,y;const f=$(s);if(t.resolver){const o=await H(C(s)?s:f);l=P(o),y=s?!f.some(h=>c(o,h)):l}else s?(y=(await Promise.all(f.map(async o=>{const h=c(a,o);return await I(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!y&&!r.isValid)&&Y()):y=l=await I(a);return m.state.next({...!te(s)||F.isValid&&l!==r.isValid?{}:{name:s},...t.resolver||!s?{isValid:l}:{},errors:r.errors}),i.shouldFocus&&!y&&ce(a,_e,s?f:g.mount),y},sr=s=>{const i={...d.mount?u:n};return C(s)?i:te(s)?c(i,s):s.map(l=>c(i,l))},ar=(s,i)=>({invalid:!!c((i||r).errors,s),isDirty:!!c((i||r).dirtyFields,s),isTouched:!!c((i||r).touchedFields,s),isValidating:!!c((i||r).validatingFields,s),error:c((i||r).errors,s)}),Pr=s=>{s&&$(s).forEach(i=>L(r.errors,i)),m.state.next({errors:s?r.errors:{}})},ir=(s,i,l)=>{const y=(c(a,s,{_f:{}})._f||{}).ref,f=c(r.errors,s)||{},{ref:o,message:h,type:S,...T}=f;D(r.errors,s,{...T,...i,ref:y}),m.state.next({name:s,errors:r.errors,isValid:!1}),l&&l.shouldFocus&&y&&y.focus&&y.focus()},Wr=(s,i)=>ie(s)?m.values.subscribe({next:l=>s(w(void 0,i),l)}):w(s,i,!0),Te=(s,i={})=>{for(const l of s?$(s):g.mount)g.mount.delete(l),g.array.delete(l),i.keepValue||(L(a,l),L(u,l)),!i.keepError&&L(r.errors,l),!i.keepDirty&&L(r.dirtyFields,l),!i.keepTouched&&L(r.touchedFields,l),!i.keepIsValidating&&L(r.validatingFields,l),!t.shouldUnregister&&!i.keepDefaultValue&&L(n,l);m.values.next({values:{...u}}),m.state.next({...r,...i.keepDirty?{isDirty:x()}:{}}),!i.keepIsValid&&Y()},nr=({disabled:s,name:i,field:l,fields:y,value:f})=>{if(re(s)&&d.mount||s){const o=s?void 0:C(f)?Ke(l?l._f:c(y,i)._f):f;D(u,i,o),v(i,o,!1,!1,!0)}},Le=(s,i={})=>{let l=c(a,s);const y=re(i.disabled);return D(a,s,{...l||{},_f:{...l&&l._f?l._f:{ref:{name:s}},name:s,mount:!0,...i}}),g.mount.add(s),l?nr({field:l,disabled:i.disabled,name:s,value:i.value}):_(s,!0,i.value),{...y?{disabled:i.disabled}:{},...t.progressive?{required:!!i.required,min:ve(i.min),max:ve(i.max),minLength:ve(i.minLength),maxLength:ve(i.maxLength),pattern:ve(i.pattern)}:{},name:s,onChange:ge,onBlur:ge,ref:f=>{if(f){Le(s,i),l=c(a,s);const o=C(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,h=lt(o),S=l._f.refs||[];if(h?S.find(T=>T===o):o===l._f.ref)return;D(a,s,{_f:{...l._f,...h?{refs:[...S.filter(Ge),o,...Array.isArray(c(n,s))?[{}]:[]],ref:{type:o.type,name:s}}:{ref:o}}}),_(s,!1,void 0,o)}else l=c(a,s,{}),l._f&&(l._f.mount=!1),(t.shouldUnregister||i.shouldUnregister)&&!(kr(g.array,s)&&d.action)&&g.unMount.add(s)}}},ur=()=>t.shouldFocusError&&ce(a,_e,g.mount),$r=s=>{re(s)&&(m.state.next({disabled:s}),ce(a,(i,l)=>{const y=c(a,l);y&&(i.disabled=y._f.disabled||s,Array.isArray(y._f.refs)&&y._f.refs.forEach(f=>{f.disabled=y._f.disabled||s}))},0,!1))},lr=(s,i)=>async l=>{let y;l&&(l.preventDefault&&l.preventDefault(),l.persist&&l.persist());let f=O(u);if(m.state.next({isSubmitting:!0}),t.resolver){const{errors:o,values:h}=await R();r.errors=o,f=h}else await I(a);if(L(r.errors,"root"),P(r.errors)){m.state.next({errors:{}});try{await s(f,l)}catch(o){y=o}}else i&&await i({...r.errors},l),ur(),setTimeout(ur);if(m.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:P(r.errors)&&!y,submitCount:r.submitCount+1,errors:r.errors}),y)throw y},qr=(s,i={})=>{c(a,s)&&(C(i.defaultValue)?G(s,O(c(n,s))):(G(s,i.defaultValue),D(n,s,O(i.defaultValue))),i.keepTouched||L(r.touchedFields,s),i.keepDirty||(L(r.dirtyFields,s),r.isDirty=i.defaultValue?x(s,O(c(n,s))):x()),i.keepError||(L(r.errors,s),F.isValid&&Y()),m.state.next({...r}))},or=(s,i={})=>{const l=s?O(s):n,y=O(l),f=P(s),o=f?n:y;if(i.keepDefaultValues||(n=l),!i.keepValues){if(i.keepDirtyValues)for(const h of g.mount)c(r.dirtyFields,h)?D(o,h,c(u,h)):G(h,c(o,h));else{if(Ye&&C(s))for(const h of g.mount){const S=c(a,h);if(S&&S._f){const T=Array.isArray(S._f.refs)?S._f.refs[0]:S._f.ref;if(Se(T)){const W=T.closest("form");if(W){W.reset();break}}}}a={}}u=e.shouldUnregister?i.keepDefaultValues?O(n):{}:O(o),m.array.next({values:{...o}}),m.values.next({values:{...o}})}g={mount:i.keepDirtyValues?g.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},d.mount=!F.isValid||!!i.keepIsValid||!!i.keepDirtyValues,d.watch=!!e.shouldUnregister,m.state.next({submitCount:i.keepSubmitCount?r.submitCount:0,isDirty:f?!1:i.keepDirty?r.isDirty:!!(i.keepDefaultValues&&!ne(s,n)),isSubmitted:i.keepIsSubmitted?r.isSubmitted:!1,dirtyFields:f?[]:i.keepDirtyValues?i.keepDefaultValues&&u?Ve(n,u):r.dirtyFields:i.keepDefaultValues&&s?Ve(n,s):{},touchedFields:i.keepTouched?r.touchedFields:{},errors:i.keepErrors?r.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?r.isSubmitSuccessful:!1,isSubmitting:!1})},cr=(s,i)=>or(ie(s)?s(u):s,i);return{control:{register:Le,unregister:Te,getFieldState:ar,handleSubmit:lr,setError:ir,_executeSchema:R,_getWatch:w,_getDirty:x,_updateValid:Y,_removeUnmounted:Ae,_updateFieldArray:p,_updateDisabledField:nr,_getFieldArray:N,_reset:or,_resetDefaultValues:()=>ie(t.defaultValues)&&t.defaultValues().then(s=>{cr(s,t.resetOptions),m.state.next({isLoading:!1})}),_updateFormState:s=>{r={...r,...s}},_disableForm:$r,_subjects:m,_proxyFormState:F,_setErrors:Z,get _fields(){return a},get _formValues(){return u},get _state(){return d},set _state(s){d=s},get _defaultValues(){return n},get _names(){return g},set _names(s){g=s},get _formState(){return r},set _formState(s){r=s},get _options(){return t},set _options(s){t={...t,...s}}},trigger:he,register:Le,handleSubmit:lr,watch:Wr,setValue:G,getValues:sr,reset:cr,resetField:qr,clearErrors:Pr,unregister:Te,setError:ir,setFocus:(s,i={})=>{const l=c(a,s),y=l&&l._f;if(y){const f=y.refs?y.refs[0]:y.ref;f.focus&&(f.focus(),i.shouldSelect&&f.select())}},getFieldState:ar}}function wt(e={}){const t=A.useRef(),r=A.useRef(),[a,n]=A.useState({isDirty:!1,isValidating:!1,isLoading:ie(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:ie(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...gt(e),formState:a});const u=t.current.control;return u._options=e,Re({subject:u._subjects.state,next:d=>{Rr(d,u._proxyFormState,u._updateFormState,!0)&&n({...u._formState})}}),A.useEffect(()=>u._disableForm(e.disabled),[u,e.disabled]),A.useEffect(()=>{if(u._proxyFormState.isDirty){const d=u._getDirty();d!==a.isDirty&&u._subjects.state.next({isDirty:d})}},[u,a.isDirty]),A.useEffect(()=>{e.values&&!ne(e.values,r.current)?(u._reset(e.values,u._options.resetOptions),r.current=e.values,n(d=>({...d}))):u._resetDefaultValues()},[e.values,u]),A.useEffect(()=>{e.errors&&u._setErrors(e.errors)},[e.errors,u]),A.useEffect(()=>{u._state.mount||(u._updateValid(),u._state.mount=!0),u._state.watch&&(u._state.watch=!1,u._subjects.state.next({...u._formState})),u._removeUnmounted()}),A.useEffect(()=>{e.shouldUnregister&&u._subjects.values.next({values:u._getWatch()})},[e.shouldUnregister,u]),t.current.formState=Cr(a,u),t.current}export{xt as C,At as F,Ce as a,pt as b,Je as c,br as d,Vt as e,wt as u};

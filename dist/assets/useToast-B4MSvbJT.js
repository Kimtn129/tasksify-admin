import{_ as f,c as C,o as p,f as u,a as r,d as g,e as I,G as N,n as m,a1 as E,y,A as x,C as S,u as T,al as n,am as h,Q as k}from"./index-Cbi0U6DV.js";import{c as d,a as v,_ as A}from"./Button-CUE8qzFr.js";import{T as _}from"./CustomToast.vue_vue_type_style_index_0_scoped_d3a5404c_lang-BLp73gA1.js";/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=d("CircleCheckIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=d("InfoIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-vue-next v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=d("TriangleAlertIcon",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),a={SUCCESS:"SUCCESS",DANGER:"DANGER",INFO:"INFO",NONE:"NONE"},F={APPROVED:"Approved",REJECTED:"Rejected",PENDING:"Pending"},D={class:"toast relative w-[360px] rounded"},P={class:"flex items-center gap-2"},G={__name:"CustomToast",props:{message:{type:String,required:!0},type:{type:String,default:"NONE"},hidePreIcon:{type:Boolean,default:!1}},emits:["closeToast"],setup(s,{emit:c}){const i=c,e={[a.SUCCESS]:{preIcon:b,preIconClass:"text-success",class:"border-success bg-foreground text-primary"},[a.DANGER]:{preIcon:R,preIconClass:"text-destructive",class:"border-destructive bg-foreground text-destructive"},[a.INFO]:{preIcon:O,preIconClass:"text-info",class:"border-info bg-info-foreground text-info"},[a.NONE]:{preIcon:null,class:"border-grey-400 bg-grey-100"}};return(o,t)=>(p(),C("div",D,[u("div",{class:m(["border-l-[4px] p-[15px] pl-[10px] pr-[30px] rounded",e[s.type].class])},[u("div",P,[s.hidePreIcon?I("",!0):(p(),g(E(e[s.type].preIcon),{key:0,class:m(["flex-0",e[s.type].preIconClass])},null,8,["class"])),N(o.$slots,"default",{},()=>[r(_,null,{default:y(()=>[x(S(s.message),1)]),_:1})],!0)])],2),r(A,{variant:"ghost",class:"p-0 icon-close",onClick:t[0]||(t[0]=B=>i("closeToast"))},{default:y(()=>[r(T(v),{size:"16"})]),_:1})]))}},U=f(G,[["__scopeId","data-v-d3a5404c"]]),l=(s,c)=>h(k(U,s,c)),M=()=>({success:(e,{config:o,slot:t}={})=>{n.custom(l({message:e,type:a.SUCCESS},t),o)},danger:(e,{config:o,slot:t}={})=>{n.custom(l({message:e,type:a.DANGER},t),o)},info:(e,{config:o,slot:t}={})=>{n.custom(l({message:e,type:a.INFO},t),o)}});export{F as R,M as u};

import{W as S,X as _,ax as $,$ as j,ak as E,a0 as x,d as B,a2 as D,O as y,r as u,H as T,I as f,aG as I}from"./main-16bd6d68.js";import{_ as N}from"./Tooltip-67e66eb1.js";const H=S({name:"Ellipsis",common:_,peers:{Tooltip:$}}),M=H,P=j("ellipsis",{overflow:"hidden"},[E("line-clamp",`
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `),x("line-clamp",`
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `),x("cursor-pointer",`
 cursor: pointer;
 `)]);function k(i){return`${i}-ellipsis--line-clamp`}function w(i,s){return`${i}-ellipsis--cursor-${s}`}const A=Object.assign(Object.assign({},y.props),{expandTrigger:String,lineClamp:[Number,String],tooltip:{type:[Boolean,Object],default:!0}}),X=B({name:"Ellipsis",inheritAttrs:!1,props:A,setup(i,{slots:s,attrs:o}){const{mergedClsPrefixRef:t}=D(i),r=y("Ellipsis","-ellipsis",P,M,i,t),p=u(null),m=u(null),g=u(null),c=u(!1),v=T(()=>{const{lineClamp:e}=i,{value:n}=c;return e!==void 0?{textOverflow:"","-webkit-line-clamp":n?"":e}:{textOverflow:n?"":"ellipsis","-webkit-line-clamp":""}});function h(){let e=!1;const{value:n}=c;if(n)return!0;const{value:l}=p;if(l){const{lineClamp:a}=i;if(O(l),a!==void 0)e=l.scrollHeight<=l.offsetHeight;else{const{value:b}=m;b&&(e=b.getBoundingClientRect().width<=l.getBoundingClientRect().width)}L(l,e)}return e}const C=T(()=>i.expandTrigger==="click"?()=>{var e;const{value:n}=c;n&&((e=g.value)===null||e===void 0||e.setShow(!1)),c.value=!n}:void 0),R=()=>f("span",Object.assign({},I(o,{class:[`${t.value}-ellipsis`,i.lineClamp!==void 0?k(t.value):void 0,i.expandTrigger==="click"?w(t.value,"pointer"):void 0],style:v.value}),{ref:"triggerRef",onClick:C.value,onMouseenter:i.expandTrigger==="click"?h:void 0}),i.lineClamp?s:f("span",{ref:"triggerInnerRef"},s));function O(e){if(!e)return;const n=v.value,l=k(t.value);i.lineClamp!==void 0?d(e,l,"add"):d(e,l,"remove");for(const a in n)e.style[a]!==n[a]&&(e.style[a]=n[a])}function L(e,n){const l=w(t.value,"pointer");i.expandTrigger==="click"&&!n?d(e,l,"add"):d(e,l,"remove")}function d(e,n,l){l==="add"?e.classList.contains(n)||e.classList.add(n):e.classList.contains(n)&&e.classList.remove(n)}return{mergedTheme:r,triggerRef:p,triggerInnerRef:m,tooltipRef:g,handleClick:C,renderTrigger:R,getTooltipDisabled:h}},render(){var i;const{tooltip:s,renderTrigger:o,$slots:t}=this;if(s){const{mergedTheme:r}=this;return f(N,Object.assign({ref:"tooltipRef",placement:"top"},s,{getDisabled:this.getTooltipDisabled,theme:r.peers.Tooltip,themeOverrides:r.peerOverrides.Tooltip}),{trigger:o,default:(i=t.tooltip)!==null&&i!==void 0?i:t.default})}else return o()}});export{X as N};

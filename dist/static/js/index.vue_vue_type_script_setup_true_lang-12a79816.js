import{d as k,l as j,u as B,a as L,s as _,r as c,w as d,A as N,B as U,C as W,D,E as F,F as G,G as J,H as P,f as u,o as $,j as q,g as Q,I,J as X,N as Y}from"./main-295320e6.js";import{u as Z}from"./tags-a8feb9be.js";import{_ as ee}from"./Menu-a7793e9f.js";const ae=k({__name:"index",props:{collapsedIconSize:{default:24},collapsedWidth:{default:48},iconSize:{default:20},indent:{default:32},rootIndent:{default:32}},setup(K){const s=K,r=Z(),{t:x}=j({useScope:"global"}),z=B(),w=L(),{locale:H,collapsed:p}=_(w),{theme:g,menuTheme:a}=_(z),m=c({}),f=c(0);d(p,(e,t)=>{if(p.value){const n=s.collapsedIconSize<a.value.minHeight?a.value.minHeight:s.collapsedIconSize+a.value.compensate;m.value={itemHeight:n+"px"},f.value=s.collapsedIconSize}else m.value={itemHeight:a.value.minHeight+"px"},f.value=a.value.minHeight},{immediate:!0,deep:!0});const R=N.map(e=>{var n;return((n=e==null?void 0:e.meta)==null?void 0:n.layout)===!1?e:U([e])[0]}),O=W(R),T=D(O),h=c([]);function C(e){return I(Y,null,{default:()=>I(X(e.menuRenderIcon))})}d(H,(e,t)=>{h.value=F(T,x)},{immediate:!0,deep:!0});const y=c(g!==null);d(g,(e,t)=>{y.value=e!==null},{immediate:!0,deep:!0});const o=G();r.isEmpty&&r.addTag(o.matched[o.matched.length-1]);const v=o.matched,S=c(o.name),M=(v&&v.length?v.map(e=>e.name):[]).filter(e=>e),i=J({openKeys:M}),V=P(()=>u(S));d(()=>o.fullPath,()=>{var n;const e=o.matched;i.openKeys=e.map(l=>l.name);const t=((n=o.meta)==null?void 0:n.activeMenu)||"";S.value=t||o.name,r.addTag(e[e.length-1])});function b(e,t){/http(s)?:/.test(e)&&window.open(e)}function A(e){if(!e)return;const t=e.find(l=>i.openKeys.indexOf(l)===-1),n=E(t);i.openKeys=n?t?[t]:[]:e}function E(e){if(!e)return!1;const t=[];for(const{children:n,key:l}of u(h))n&&n.length&&t.push(l);return t.includes(e)}return(e,t)=>{const n=ee;return $(),q("div",null,[Q(n,{"theme-overrides":m.value,accordion:"",options:h.value,inverted:y.value,mode:"vertical",collapsed:u(p),"collapsed-width":s.collapsedWidth,"collapsed-icon-size":f.value,"icon-size":s.iconSize,indent:s.indent,"root-indent":s.rootIndent,"expanded-keys":i.openKeys,value:u(V),"render-icon":C,"onUpdate:value":b,"onUpdate:expandedKeys":A},null,8,["theme-overrides","options","inverted","collapsed","collapsed-width","collapsed-icon-size","icon-size","indent","root-indent","expanded-keys","value"])])}}});export{ae as _};

import{d as E,x as j,y as _,r as c,w as u,a7 as L,a8 as N,j as B,u as d,o as U,c as W,f as P,m as I,N as $,a9 as q}from"../.pnpm/.pnpm.b2939809.js";import{u as D,a as F,r as G,s as J,f as Q,p as X,k as Y,b as Z}from"../../assets/index.04b0ada7.js";import{u as ee}from"../tags/tags.5a972ba0.js";const ae=E({__name:"index",props:{collapsedIconSize:{default:24},collapsedWidth:{default:48},iconSize:{default:20},indent:{default:32},rootIndent:{default:32}},setup(x){const s=x,r=ee(),{t:K}=j({useScope:"global"}),z=D(),w=F(),{locale:R,collapsed:p}=_(w),{theme:g,menuTheme:a}=_(z),m=c({}),f=c(0);u(p,(e,t)=>{if(p.value){const n=s.collapsedIconSize<a.value.minHeight?a.value.minHeight:s.collapsedIconSize+a.value.compensate;m.value={itemHeight:n+"px"},f.value=s.collapsedIconSize}else m.value={itemHeight:a.value.minHeight+"px"},f.value=a.value.minHeight},{immediate:!0,deep:!0});const H=G.map(e=>{var n;return((n=e==null?void 0:e.meta)==null?void 0:n.layout)===!1?e:J([e])[0]}),O=Q(H),T=X(O),h=c([]);function b(e){return I($,null,{default:()=>I(Z(e.menuRenderIcon))})}u(R,(e,t)=>{h.value=Y(T,K)},{immediate:!0,deep:!0});const y=c(g!==null);u(g,(e,t)=>{y.value=e!==null},{immediate:!0,deep:!0});const o=L();r.isEmpty&&r.addTag(o.matched[o.matched.length-1]);const v=o.matched,S=c(o.name),M=(v&&v.length?v.map(e=>e.name):[]).filter(e=>e),i=N({openKeys:M}),V=B(()=>d(S));u(()=>o.fullPath,()=>{var n;const e=o.matched;i.openKeys=e.map(l=>l.name);const t=((n=o.meta)==null?void 0:n.activeMenu)||"";S.value=t||o.name,r.addTag(e[e.length-1])});function k(e,t){/http(s)?:/.test(e)&&window.open(e)}function C(e){if(!e)return;const t=e.find(l=>i.openKeys.indexOf(l)===-1),n=A(t);i.openKeys=n?t?[t]:[]:e}function A(e){if(!e)return!1;const t=[];for(const{children:n,key:l}of d(h))n&&n.length&&t.push(l);return t.includes(e)}return(e,t)=>{const n=q;return U(),W("div",null,[P(n,{"theme-overrides":m.value,accordion:"",options:h.value,inverted:y.value,mode:"vertical",collapsed:d(p),"collapsed-width":s.collapsedWidth,"collapsed-icon-size":f.value,"icon-size":s.iconSize,indent:s.indent,"root-indent":s.rootIndent,"expanded-keys":i.openKeys,value:d(V),"render-icon":b,"onUpdate:value":k,"onUpdate:expandedKeys":C},null,8,["theme-overrides","options","inverted","collapsed","collapsed-width","collapsed-icon-size","icon-size","indent","root-indent","expanded-keys","value"])])}}});export{ae as _};

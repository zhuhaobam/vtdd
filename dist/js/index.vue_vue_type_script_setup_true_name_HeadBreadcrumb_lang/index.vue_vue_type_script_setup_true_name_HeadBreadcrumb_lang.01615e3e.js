import{d as v,aa as D,a7 as M,x as N,r as S,w as f,o as r,b as l,e as p,c as h,ad as j,F,al as L,a as $,ac as b,g as m,ag as k,t as y,ak as A,am as E}from"../.pnpm/.pnpm.b2939809.js";import{e as w}from"../../assets/index.04b0ada7.js";function g(t,o){return t.filter(n=>n.name!==void 0).map(n=>{var s,c;const a={...n,key:n.name,props:n.props?{default:!0}:n.props};return(s=n.meta)!=null&&s.icon&&(a.icon=w(n.meta.icon)),(c=n.children)!=null&&c.length&&(a.children=B(n.children,o)),a})}function B(t,o){return t.filter(n=>n.name!==void 0).map(n=>{var s,c,i;const a={...n,key:n.name,label:o((s=n.meta)==null?void 0:s.breadcrumb)};return(c=n.meta)!=null&&c.icon&&(a.icon=w(n.meta.icon)),(i=n.children)!=null&&i.length&&(a.children=B(n.children,o)),a.props=n.props?{default:!0}:n.props,a})}const H={flex:"","items-center":"","justify-center":""},P={key:1,flex:"","items-center":"","justify-center":""},T=v({name:"HeadBreadcrumb"}),G=v({...T,setup(t){const o=D(),n=M(),{t:a,locale:s}=N(),c=S([]);f(s,(d,R)=>{c.value=g(n.matched,a)},{immediate:!0,deep:!0}),f(()=>n.fullPath,()=>{c.value=g(n.matched,a)});const i=d=>{o.push({name:d})};return(d,R)=>{const x=A,V=E,C=L;return r(),l(C,null,{default:p(()=>[(r(!0),h(F,null,j(c.value,e=>(r(),l(V,{key:e.name},{default:p(()=>{var _;return[e.children.length?(r(),l(x,{key:0,options:e.children,onSelect:i},{default:p(()=>{var u;return[$("div",H,[e!=null&&e.icon?(r(),l(b(e==null?void 0:e.icon),{key:0})):m("",!0),k(" "+y(d.$t((u=e.meta)==null?void 0:u.breadcrumb)),1)])]}),_:2},1032,["options"])):(r(),h("div",P,[e!=null&&e.icon?(r(),l(b(e==null?void 0:e.icon),{key:0})):m("",!0),k(" "+y(d.$t((_=e.meta)==null?void 0:_.breadcrumb)),1)]))]}),_:2},1024))),128))]),_:1})}}});export{G as _};

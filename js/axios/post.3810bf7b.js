import{a as h}from"../app/app.0354ae28.js";import{d as l,r as c,a8 as y,A as g,an as x,o as r,c as v,f as e,e as t,a as T,b,u as M,ao as N,g as k,F as B,ag as u,ap as C,aq as P,ar as R}from"../.pnpm/.pnpm.b2939809.js";import{b as p}from"../route-block/route-block.2cc84cc1.js";import{_ as V}from"../../assets/index.04b0ada7.js";const q=u("POST"),w={style:{overflow:"auto"}},E=u("JSON\u7ED3\u679C"),F=l({name:"axios-post"}),i=l({...F,setup(O){const n=c(),s=y(n);g(()=>{h().then(o=>{n.value=o}).catch(o=>{console.log("request->onTest<MyResponse<MyTest>>->error",o)})});const d=c(`onTest<MyResponse<MyTest>>()
    .then(res => {
      // ... ...
    })
    .catch((error: any) => {
      console.log('request->onTest<MyResponse<MyTest>>->error', error)
    })`);return(o,S)=>{const a=C,_=x,f=P,m=R;return r(),v(B,null,[e(_,{prefix:"bar","align-text":"",type:"info"},{default:t(()=>[e(a,{type:"info"},{default:t(()=>[q]),_:1})]),_:1}),T("div",w,[e(m,{vertical:"",size:16},{default:t(()=>[e(f,{code:d.value,language:"javascript","show-line-numbers":""},null,8,["code"])]),_:1})]),e(_,{prefix:"bar","align-text":"",type:"info"},{default:t(()=>[e(a,{type:"info"},{default:t(()=>[E]),_:1})]),_:1}),s?(r(),b(M(N),{key:0,value:s,expanded:!0,"expand-depth":5,theme:"light"},null,8,["value"])):k("",!0)],64)}}});typeof p=="function"&&p(i);const H=V(i,[["__scopeId","data-v-737b8f9f"]]);export{H as default};

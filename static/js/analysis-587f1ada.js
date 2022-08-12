import{_ as f}from"./Input-2e5ac349.js";import{d as p,bI as F,bJ as E,r as i,o as g,j as h,g as e,b as u,e as t,T as n}from"./main-cd20fe6b.js";import{N as y,_ as x}from"./text-caef53c3.js";import{_ as D}from"./Code-a24abc7f.js";import{_ as B}from"./Space-70892829.js";import{b as l}from"./route-block-7ae06361.js";import"./use-merged-state-3065e8b8.js";import"./use-compitable-a8a1ddad.js";const C=n("\u6D4B\u8BD5keep-alive\u7F13\u5B58\u529F\u80FD"),b=n("\u6CE8\u610F\uFF1A"),A=t("div",null,"\u4EE5\u4E0B\u4E09\u4E2Avite-plugin\u7684\u4F7F\u7528\u53EF\u53BB\u5B98\u65B9\u67E5\u770B\u4E3A\u51C6",-1),w=n("\u4E00\u3001vite-plugin-pages"),R=t("div",null,"\u751F\u6210\u6241\u5E73\u8DEF\u7531\u5217\u8868\uFF0C\u751F\u6210\u7684name\u4E3A\u3010\u7EC4\u4EF6\u540D\u3011\u6216\u8005\u3010\u6587\u4EF6\u5939\u540D\u5B57-\u7EC4\u4EF6\u540D\u3011\u6216\u8005\u3010\u6587\u4EF6\u5939\u540D\u5B57-\u6587\u4EF6\u5939\u540D\u5B57-\u7EC4\u4EF6\u540D\u3011",-1),k=t("div",null,"\u8DEF\u7531\u6587\u4EF6\u91CC\u9762\u6253\u5370\u6216\u5219debugger\u4E00\u4E0B\u67E5\u770B\u751F\u6210\u4FE1\u606F",-1),j=n("\u4E8C\u3001vite-plugin-vue-layouts"),K=t("div",null,"\u6309\u914D\u7F6E\u4F7F\u7528setupLayouts\u8FDB\u884C\u5E03\u5C40",-1),L={style:{overflow:"auto"}},N=n("router/index.ts"),z={style:{overflow:"auto"}},P=n("utils/router.ts/primaryKeepAliveAdjustment"),H={style:{overflow:"auto"}},V=n("\u4E09\u3001vite-plugin-vue-setup-extend"),M=t("div",null,' \u7ED3\u5408\u8DEF\u7531\u5904\u7406name="dashboard-analysis",\u4EE5\u4FBFprimaryKeepAliveAdjustment\u65B9\u6CD5\u5904\u7406laout\u540E\u7684\u8DEF\u7531\u6570\u636E\uFF0C\u7528\u6765\u652F\u6301keep-alive\u7F13\u5B58\u529F\u80FD ',-1),T={style:{overflow:"auto"}},W=p({name:"dashboard-analysis"}),I=p({...W,setup(J){F(()=>{console.log("\u6FC0\u6D3B\u3010analysis\u3011===keep-alive===onActivated"+new Date)}),E(()=>{console.log("\u505C\u6B62\u3010analysis\u3011===keep-alive===onDeactivated"+new Date)});const c=i(`import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { primaryKeepAliveAdjustment } from '@/utils/router'

const routesLayouts = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})
// keep-alive\u7F13\u5B58\u652F\u6301 {Keep alive cache support}
// \u5C06\u6587\u4EF6\u5939\u7684\u8DEF\u7531\u5C55\u5F00\uFF0C\u4E3A\u4E86\u652F\u6301keep-alive {Expand the route of the folder to support keep alive}
const primaryRoutes = primaryKeepAliveAdjustment(routesLayouts)

const router = createRouter({
  history: createWebHistory("/vtdd/"),
  routes: primaryRoutes
})

export default router`),d=i(`/**
 * \u5C06\u6587\u4EF6\u5939\u7684\u8DEF\u7531\u5C55\u5F00\uFF0C\u4E3A\u4E86\u652F\u6301keep-alive '{Expand the route of the folder to support keep alive}''
 * @param routes
 * @returns
 */
export function primaryKeepAliveAdjustment(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map(vx => {
    const v = cloneDeep(vx)
    const hasChildren = (v.children?.length ?? 0) > 0
    const info = hasChildren ? v.children![0] : v
    const singlePage = !((info.children?.length ?? 0) > 0)
    if (!hasChildren || singlePage) {
      return v
    }
    const result: RouteRecordRaw = {
      ...info,
      path: v.path
    }
    result.component = v.component
    return result
  })
}`),_=i(`<route lang="yaml">
meta:
  breadcrumb: analysis
  icon: lang
  keepAlive: true
  sort: 1
</route>`),v=i('<script setup lang="ts" name="dashboard-analysis">');return($,q)=>{const o=x,a=y,m=f,r=D,s=B;return g(),h("div",null,[e(a,{prefix:"bar","align-text":"",type:"info"},{default:u(()=>[e(o,{type:"info"},{default:u(()=>[C]),_:1})]),_:1}),e(m,{type:"text",placeholder:"\u6D4B\u8BD5keep-alive\u7F13\u5B58\u529F\u80FD"}),e(a,{prefix:"bar","align-text":"",type:"warning"},{default:u(()=>[e(o,{type:"warning"},{default:u(()=>[b]),_:1})]),_:1}),A,e(a,{prefix:"bar","align-text":"",type:"error"},{default:u(()=>[e(o,{type:"error"},{default:u(()=>[w]),_:1})]),_:1}),R,k,e(a,{prefix:"bar","align-text":"",type:"error"},{default:u(()=>[e(o,{type:"error"},{default:u(()=>[j]),_:1})]),_:1}),K,t("div",L,[e(s,{vertical:"",size:16},{default:u(()=>[e(r,{code:_.value,language:"javascript","show-line-numbers":""},null,8,["code"])]),_:1})]),e(a,{prefix:"bar","align-text":"",type:"success"},{default:u(()=>[e(o,null,{default:u(()=>[N]),_:1})]),_:1}),t("div",z,[e(s,{vertical:"",size:16},{default:u(()=>[e(r,{code:c.value,language:"javascript","show-line-numbers":""},null,8,["code"])]),_:1})]),e(a,{prefix:"bar","align-text":"",type:"success"},{default:u(()=>[e(o,null,{default:u(()=>[P]),_:1})]),_:1}),t("div",H,[e(s,{vertical:"",size:16},{default:u(()=>[e(r,{code:d.value,language:"javascript","show-line-numbers":""},null,8,["code"])]),_:1})]),e(a,{prefix:"bar","align-text":"",type:"error"},{default:u(()=>[e(o,{type:"error"},{default:u(()=>[V]),_:1})]),_:1}),M,t("div",T,[e(s,{vertical:"",size:16},{default:u(()=>[e(r,{code:v.value,language:"javascript","show-line-numbers":""},null,8,["code"])]),_:1})])])}}});typeof l=="function"&&l(I);export{I as default};

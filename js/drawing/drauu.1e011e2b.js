import{d as f,A as x,aG as B,r as c,w as L,n as M,ay as z,az as V,o as y,c as m,f as o,e as l,a5 as S,aH as U,a as T,ag as i,aD as N,aI as R,ar as H}from"../.pnpm/.pnpm.b2939809.js";import{b as _}from"../route-block/route-block.2cc84cc1.js";const j=i("\u21A9\uFE0F"),G=i("\u21AA\uFE0F"),I=i("\u{1F5D1}"),O=i("\u270D\uFE0F"),q=i("\u26AA\uFE0F"),J=i(" \u270F\uFE0F "),K=i("\u2044"),P=i("\u2197 "),Q=i("\u20DE"),W=i("\u20DD"),X=["title"],Y=i("\u2014"),Z=i("\u2505 "),ee=i("\u22EF"),te=i("\u{1F4E5}"),oe={id:"svg","w-full":"","flex-auto":"","z-10":"",h350:"",border:"",style:{"touch-action":"none"}},ne=f({name:"drawing-drauu"}),ae=f({...ne,setup(se){let n;x(()=>{n=B({el:"#svg",brush:{color:"#000",size:3,dasharray:void 0}})});const a=c("stylus");function u(d){n.mode=d;const t=n.options.brush;t.arrowEnd=!1,a.value=d}function h(){n.mode="line";const e=n.options.brush;e.arrowEnd=!0,a.value="arrow"}const w=c("dark"),b=d=>{const t=n.options.brush;t.color=d,w.value="undefined"},p=c(3);L(p,(d,e)=>{M(()=>{const v=n.options.brush;v.size=d})},{immediate:!0,deep:!0});function F(){n.undo()}function g(){n.redo()}function C(){n.clear()}const r=c("solid");function k(){const e=n.options.brush;e.dasharray=void 0,r.value="solid"}function D(){const e=n.options.brush;e.dasharray="4",r.value="dasharray"}function E(){const e=n.options.brush;e.dasharray="1 7",r.value="dotted"}function A(){n.el.setAttribute("xmlns","http://www.w3.org/2000/svg");const d=n.el.outerHTML||"",e=new Blob([d],{type:"image/svg+xml"}),t=window.document.createElement("a");t.href=window.URL.createObjectURL(e),t.download="drauu.svg",document.body.appendChild(t),t.click(),document.body.removeChild(t)}return z(()=>{console.log("\u6FC0\u6D3B\u3010analysis\u3011===keep-alive===onActivated"+new Date)}),V(()=>{console.log("\u505C\u6B62\u3010analysis\u3011===keep-alive===onDeactivated"+new Date)}),(d,e)=>{const t=N,v=R,$=H;return y(),m("div",null,[o($,{"mb-2":""},{default:l(()=>[o(t,{id:"undo",title:"\u64A4\u9500",onClick:e[0]||(e[0]=s=>F())},{default:l(()=>[j]),_:1}),o(t,{id:"redo",title:"\u8FD8\u539F",onClick:e[1]||(e[1]=s=>g())},{default:l(()=>[G]),_:1}),o(t,{id:"clear",title:"\u6E05\u9664",style:{"font-size":"25px"},onClick:e[2]||(e[2]=s=>C())},{default:l(()=>[I]),_:1}),o(t,{id:"m-stylus",title:"Stylus",type:a.value==="stylus"?"primary":void 0,dashed:"",onClick:e[3]||(e[3]=s=>u("stylus"))},{default:l(()=>[O]),_:1},8,["type"]),o(t,{id:"m-eraser",title:"Eraser",type:a.value==="eraseLine"?"primary":void 0,dashed:"",onClick:e[4]||(e[4]=s=>u("eraseLine"))},{default:l(()=>[q]),_:1},8,["type"]),o(t,{id:"m-draw",title:"\u7B14",type:a.value==="draw"?"primary":void 0,dashed:"",onClick:e[5]||(e[5]=s=>u("draw"))},{default:l(()=>[J]),_:1},8,["type"]),o(t,{id:"m-line",title:"\u76F4\u7EBF",type:a.value==="line"?"primary":void 0,"pl-6":"","pr-6":"",dashed:"",onClick:e[6]||(e[6]=s=>u("line"))},{default:l(()=>[K]),_:1},8,["type"]),o(t,{id:"m-arrow",title:"\u7BAD\u5934",type:a.value==="arrow"?"primary":void 0,dashed:"",onClick:e[7]||(e[7]=s=>h())},{default:l(()=>[P]),_:1},8,["type"]),o(t,{id:"m-rect",title:"\u957F\u65B9\u5F62",type:a.value==="rectangle"?"primary":void 0,"pl-6":"","pr-6":"",dashed:"",onClick:e[8]||(e[8]=s=>u("rectangle"))},{default:l(()=>[Q]),_:1},8,["type"]),o(t,{id:"m-ellipse",title:"\u692D\u5706",type:a.value==="ellipse"?"primary":void 0,"pl-4":"","pr-8":"",dashed:"",onClick:e[9]||(e[9]=s=>u("ellipse"))},{default:l(()=>[W]),_:1},8,["type"]),o(v,{"pt-4":"","pb-4":"","pl-12":"","pr-12":"",modes:["hex"],swatches:["#FFFFFF","#18A058","#2080F0","#F0A020","rgba(208, 48, 80, 1)"],actions:["confirm"],onConfirm:b},null,8,["swatches"]),S(T("input",{"onUpdate:modelValue":e[10]||(e[10]=s=>p.value=s),flex:"","items-center":"",h7:"",type:"range",min:"1",max:"10",step:"0.5",name:"Size",title:"\u7B14\u753B\u7C97\u7EC6 "+p.value+" "},null,8,X),[[U,p.value]]),o(t,{title:"Solid",type:r.value==="solid"&&a.value!=="stylus"&&a.value!=="eraseLine"?"primary":void 0,dashed:"",onClick:e[11]||(e[11]=s=>k())},{default:l(()=>[Y]),_:1},8,["type"]),o(t,{title:"Dashed",type:r.value==="dashed"&&a.value!=="stylus"&&a.value!=="eraseLine"?"primary":void 0,dashed:"",onClick:e[12]||(e[12]=s=>D())},{default:l(()=>[Z]),_:1},8,["type"]),o(t,{title:"Dotted",type:r.value==="dotted"&&a.value!=="stylus"&&a.value!=="eraseLine"?"primary":void 0,dashed:"",onClick:e[13]||(e[13]=s=>E())},{default:l(()=>[ee]),_:1},8,["type"]),o(t,{title:"Download",onClick:e[14]||(e[14]=s=>A())},{default:l(()=>[te]),_:1})]),_:1}),(y(),m("svg",oe))])}}});typeof _=="function"&&_(ae);export{ae as default};

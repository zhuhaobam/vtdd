import{W as oe,X as re,a7 as t,$ as y,a0 as _,ak as ee,bS as ae,bT as ne,d as N,a2 as te,O as D,bU as le,bF as ie,H as Q,aN as G,a5 as de,I as A,r as U,au as se,an as ce,bV as ue,bI as be,bJ as ge,o as w,j as me,g as p,b as m,e as i,t as z,c as P,f as he,q as fe,h as pe,x as j,T as F,bW as ve,bX as _e,bY as ke}from"./main-16bd6d68.js";import{o as xe}from"./on-fonts-ready-fd463663.js";import{N as we,_ as ye}from"./text-0d6394b5.js";import{_ as $e}from"./Input-94cb2a5a.js";import{_ as Ce}from"./Switch-26946915.js";import{b as Z}from"./route-block-7ae06361.js";import"./use-compitable-7e0dd8cc.js";import"./use-merged-state-a12c45f3.js";const Se=oe({name:"Watermark",common:re,self(e){const{fontFamily:o}=e;return{fontFamily:o}}}),Re=Se,Be=t([y("table",`
 font-size: var(--n-font-size);
 font-variant-numeric: tabular-nums;
 line-height: var(--n-line-height);
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 text-align: left;
 border-collapse: separate;
 border-spacing: 0;
 overflow: hidden;
 background-color: var(--n-td-color);
 border-color: var(--n-merged-border-color);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 --n-merged-border-color: var(--n-border-color);
 `,[t("th",`
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 text-align: inherit;
 padding: var(--n-th-padding);
 vertical-align: inherit;
 text-transform: none;
 border: 0px solid var(--n-merged-border-color);
 font-weight: var(--n-th-font-weight);
 color: var(--n-th-text-color);
 background-color: var(--n-th-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 `,[t("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),t("td",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 padding: var(--n-td-padding);
 color: var(--n-td-text-color);
 background-color: var(--n-td-color);
 border: 0px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 `,[t("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),_("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `,[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]),_("single-line",[t("th",`
 border-right: 0px solid var(--n-merged-border-color);
 `),t("td",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),_("single-column",[t("tr",[t("&:not(:last-child)",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]),_("striped",[t("tr:nth-of-type(even)",[t("td","background-color: var(--n-td-color-striped)")])]),ee("bottom-bordered",[t("tr",[t("&:last-child",[t("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]),ae(y("table",`
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `,[t("th",`
 background-color: var(--n-th-color-modal);
 `),t("td",`
 background-color: var(--n-td-color-modal);
 `)])),ne(y("table",`
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `,[t("th",`
 background-color: var(--n-th-color-popover);
 `),t("td",`
 background-color: var(--n-td-color-popover);
 `)]))]),ze=Object.assign(Object.assign({},D.props),{bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:{type:String,default:"medium"}}),Pe=N({name:"Table",props:ze,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:d,mergedRtlRef:k}=te(e),h=D("Table","-table",Be,le,e,o),s=ie("Table",k,o),a=Q(()=>{const{size:r}=e,{self:{borderColor:l,tdColor:u,tdColorModal:b,tdColorPopover:n,thColor:v,thColorModal:f,thColorPopover:x,thTextColor:$,tdTextColor:C,borderRadius:O,thFontWeight:T,lineHeight:W,borderColorModal:I,borderColorPopover:H,tdColorStriped:V,tdColorStripedModal:E,tdColorStripedPopover:S,[G("fontSize",r)]:R,[G("tdPadding",r)]:L,[G("thPadding",r)]:M},common:{cubicBezierEaseInOut:B}}=h.value;return{"--n-bezier":B,"--n-td-color":u,"--n-td-color-modal":b,"--n-td-color-popover":n,"--n-td-text-color":C,"--n-border-color":l,"--n-border-color-modal":I,"--n-border-color-popover":H,"--n-border-radius":O,"--n-font-size":R,"--n-th-color":v,"--n-th-color-modal":f,"--n-th-color-popover":x,"--n-th-font-weight":T,"--n-th-text-color":$,"--n-line-height":W,"--n-td-padding":L,"--n-th-padding":M,"--n-td-color-striped":V,"--n-td-color-striped-modal":E,"--n-td-color-striped-popover":S}}),c=d?de("table",Q(()=>e.size[0]),a,e):void 0;return{rtlEnabled:s,mergedClsPrefix:o,cssVars:d?void 0:a,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),A("table",{class:[`${o}-table`,this.themeClass,{[`${o}-table--rtl`]:this.rtlEnabled,[`${o}-table--bottom-bordered`]:this.bottomBordered,[`${o}-table--bordered`]:this.bordered,[`${o}-table--single-line`]:this.singleLine,[`${o}-table--single-column`]:this.singleColumn,[`${o}-table--striped`]:this.striped}],style:this.cssVars},this.$slots)}}),Ne=t([y("watermark-container",`
 position: relative;
 `,[ee("selectable",`
 user-select: none;
 -webkit-user-select: none;
 `),_("global-rotate",`
 overflow: hidden;
 `),_("fullscreen",`
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 pointer-events: none;
 position: fixed;
 `)]),y("watermark",`
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 pointer-events: none;
 background-repeat: repeat;
 `,[_("fullscreen",`
 position: fixed;
 `),_("global-rotate",`
 position: absolute;
 height: max(284vh, 284vw);
 width: max(284vh, 284vw);
 `)])]);function De(e){if(!e)return 1;const o=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/o}const Fe=Object.assign(Object.assign({},D.props),{debug:Boolean,cross:Boolean,fullscreen:Boolean,width:{type:Number,default:32},height:{type:Number,default:32},zIndex:{type:Number,default:10},xGap:{type:Number,default:0},yGap:{type:Number,default:0},yOffset:{type:Number,default:0},xOffset:{type:Number,default:0},rotate:{type:Number,default:0},image:String,imageOpacity:{type:Number,default:1},imageHeight:Number,imageWidth:Number,content:String,selectable:{type:Boolean,default:!0},fontSize:{type:Number,default:14},fontFamily:String,fontStyle:{type:String,default:"normal"},fontVariant:{type:String,default:""},fontWeight:{type:Number,default:400},fontColor:{type:String,default:"rgba(128, 128, 128, .3)"},fontStretch:{type:String,default:""},lineHeight:{type:Number,default:14},globalRotate:{type:Number,default:0}}),Oe=N({name:"Watermark",props:Fe,setup(e,{slots:o}){const{mergedClsPrefixRef:d}=te(e),k=D("Watermark","-watermark",Ne,Re,e,d),h=U(""),s=se?document.createElement("canvas"):null,a=s?s.getContext("2d"):null,c=U(!1);return xe(()=>c.value=!0),ce(()=>{if(!s)return;c.value;const r=De(a),{xGap:l,yGap:u,width:b,height:n,yOffset:v,xOffset:f,rotate:x,image:$,content:C,fontColor:O,fontStyle:T,fontVariant:W,fontStretch:I,fontWeight:H,fontFamily:V,fontSize:E,lineHeight:S,debug:R}=e,L=(l+b)*r,M=(u+n)*r,B=f*r,X=v*r;if(s.width=L,s.height=M,a){a.translate(0,0);const Y=b*r,q=n*r;if(R&&(a.strokeStyle="grey",a.strokeRect(0,0,Y,q)),a.rotate(x*(Math.PI/180)),$){const g=new Image;g.crossOrigin="anonymous",g.referrerPolicy="no-referrer",g.src=$,g.onload=()=>{a.globalAlpha=e.imageOpacity;const{imageWidth:J,imageHeight:K}=e;a.drawImage(g,B,X,(e.imageWidth||(K?g.width*K/g.height:g.width))*r,(e.imageHeight||(J?g.height*J/g.width:g.height))*r),h.value=s.toDataURL()}}else C&&(R&&(a.strokeStyle="green",a.strokeRect(0,0,Y,q)),a.font=`${T} ${W} ${H} ${I} ${E*r}px/${S*r}px ${V||k.value.self.fontFamily}`,a.fillStyle=O,a.fillText(C,B,X+S*r),h.value=s.toDataURL())}else ue("watermark","Canvas is not supported in the browser.")}),()=>{var r;const{globalRotate:l,fullscreen:u,zIndex:b}=e,n=d.value,v=l!==0&&u,f="max(142vh, 142vw)",x=A("div",{class:[`${n}-watermark`,l!==0&&`${n}-watermark--global-rotate`,u&&`${n}-watermark--fullscreen`],style:{transform:l?`translateX(-50%) translateY(-50%) rotate(${l}deg)`:void 0,zIndex:v?void 0:b,backgroundSize:`${e.xGap+e.width}px`,backgroundPosition:l===0?e.cross?`${e.width/2}px ${e.height/2}px, 0 0`:"":e.cross?`calc(${f} + ${e.width/2}px) calc(${f} + ${e.height/2}px), ${f} ${f}`:f,backgroundImage:e.cross?`url(${h.value}), url(${h.value})`:`url(${h.value})`}});return e.fullscreen&&!l?x:A("div",{class:[`${n}-watermark-container`,l!==0&&`${n}-watermark-container--global-rotate`,u&&`${n}-watermark-container--fullscreen`,e.selectable&&`${n}-watermark-container--selectable`],style:{zIndex:v?b:void 0}},(r=o.default)===null||r===void 0?void 0:r.call(o),x)}}}),Te=F(" \u6D4B\u8BD5keep-alive\u7F13\u5B58\u529F\u80FD "),We=i("tr",null,[i("td",null,"..."),i("td",null,"...")],-1),Ie=F("\u6709good\u6743\u9650"),He=F("???"),Ve=F("\u65E0xxx\u6743\u9650"),Ee=N({name:"dashboard-workbench"}),Le=N({...Ee,setup(e){const o=U(!1);return be(()=>{console.log("\u6FC0\u6D3B\u3010workbench\u3011===keep-alive===onActivated"+new Date)}),ge(()=>{console.log("\u505C\u6B62\u3010workbench\u3011===keep-alive===onDeactivated"+new Date)}),(d,k)=>{const h=ye,s=we,a=$e,c=Pe,r=Oe,l=Ce,u=ve,b=_e,n=ke("permission");return w(),me("div",null,[p(s,{prefix:"bar","align-text":"",type:"info"},{default:m(()=>[p(h,{type:"info"},{default:m(()=>[Te]),_:1})]),_:1}),p(a,{type:"text",placeholder:"\u6D4B\u8BD5keep-alive\u7F13\u5B58\u529F\u80FD"}),i("div",null,[p(r,{content:d.$t("page.dashboard.workbench-watermark"),cross:"",selectable:"","font-size":16,"line-height":16,width:192,height:128,"x-offset":12,"y-offset":28,rotate:-15},{default:m(()=>[i("div",null,[p(c,{bordered:!1,"single-line":!1},{default:m(()=>[i("thead",null,[i("tr",null,[i("th",null,z(d.$t("page.dashboard.workbench-fupan")),1),i("th",null,z(d.$t("page.dashboard.workbench-fupan")),1)])]),i("tbody",null,[i("tr",null,[i("td",null,z(d.$t("page.dashboard.workbench-fupan")),1),i("td",null,z(d.$t("page.dashboard.workbench-fupan")),1)]),We])]),_:1})])]),_:1},8,["content"])]),o.value?(w(),P(r,{key:0,image:he(fe)("cafe.png"),cross:"",fullscreen:"","font-size":16,"line-height":16,width:384,height:384,"x-offset":12,"y-offset":0,"image-width":64,"image-opacity":.24},null,8,["image","image-opacity"])):pe("",!0),p(l,{value:o.value,"onUpdate:value":k[0]||(k[0]=v=>o.value=v)},null,8,["value"]),p(b,{title:"\u6709good\u6743\u9650"},{default:m(()=>[j((w(),P(u,null,{default:m(()=>[Ie]),_:1})),[[n,{action:"good",effect:"disabled"}]])]),_:1}),p(b,{title:"\u6CA1\u6709\u6743\u9650\u79FB\u9664"},{default:m(()=>[j((w(),P(u,null,{default:m(()=>[He]),_:1})),[[n,{action:"xxx"}]])]),_:1}),p(b,{title:"\u65E0xxx\u6743\u9650"},{default:m(()=>[j((w(),P(u,null,{default:m(()=>[Ve]),_:1})),[[n,{action:"xxx",effect:"disabled"}]])]),_:1})])}}});typeof Z=="function"&&Z(Le);export{Le as default};

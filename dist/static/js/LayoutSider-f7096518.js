import{p as E,l as q}from"./Menu-34544e7b.js";import{W as Z,X as G,Y as J,Z as H,$ as a,a0 as p,a1 as Q,d as I,O as z,r as _,a2 as F,a3 as W,a4 as A,H as S,a5 as Y,I as u,P as D,a6 as d,a7 as R,a8 as ee,a9 as oe,aa as L,ab as N,ac as O}from"./main-cd20fe6b.js";import{C as te}from"./Dropdown-5e26b885.js";import{u as re}from"./use-merged-state-3065e8b8.js";const le=e=>{const{baseColor:o,textColor2:r,bodyColor:c,cardColor:h,dividerColor:l,actionColor:C,scrollbarColor:f,scrollbarColorHover:n,invertedColor:v}=e;return{textColor:r,textColorInverted:"#FFF",color:c,colorEmbedded:C,headerColor:h,headerColorInverted:v,footerColor:C,footerColorInverted:v,headerBorderColor:l,headerBorderColorInverted:v,footerBorderColor:l,footerBorderColorInverted:v,siderBorderColor:l,siderBorderColorInverted:v,siderColor:h,siderColorInverted:v,siderToggleButtonBorder:`1px solid ${l}`,siderToggleButtonColor:o,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:H(c,f),siderToggleBarColorHover:H(c,n),__invertScrollbar:"true"}},ne=Z({name:"Layout",common:G,peers:{Scrollbar:J},self:le}),M=ne,se=a("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[a("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),p("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ae={embedded:Boolean,position:E,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},U=Q("n-layout");function ie(e){return I({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},z.props),ae),setup(o){const r=_(null),c=_(null),{mergedClsPrefixRef:h,inlineThemeDisabled:l}=F(o),C=z("Layout","-layout",se,M,o,h);function f(b,g){if(o.nativeScrollbar){const{value:m}=r;m&&(g===void 0?m.scrollTo(b):m.scrollTo(b,g))}else{const{value:m}=c;m&&m.scrollTo(b,g)}}W(U,o);let n=0,v=0;const j=b=>{var g;const m=b.target;n=m.scrollLeft,v=m.scrollTop,(g=o.onScroll)===null||g===void 0||g.call(o,b)};A(()=>{if(o.nativeScrollbar){const b=r.value;b&&(b.scrollTop=v,b.scrollLeft=n)}});const $={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},w={scrollTo:f},P=S(()=>{const{common:{cubicBezierEaseInOut:b},self:g}=C.value;return{"--n-bezier":b,"--n-color":o.embedded?g.colorEmbedded:g.color,"--n-text-color":g.textColor}}),x=l?Y("layout",void 0,P,o):void 0;return Object.assign({mergedClsPrefix:h,scrollableElRef:r,scrollbarInstRef:c,hasSiderStyle:$,mergedTheme:C,handleNativeElScroll:j,cssVars:l?void 0:P,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender},w)},render(){var o;const{mergedClsPrefix:r,hasSider:c}=this;(o=this.onRender)===null||o===void 0||o.call(this);const h=c?this.hasSiderStyle:void 0,l=[this.themeClass,e&&`${r}-layout-content`,`${r}-layout`,`${r}-layout--${this.position}-positioned`];return u("div",{class:l,style:this.cssVars},this.nativeScrollbar?u("div",{ref:"scrollableElRef",class:`${r}-layout-scroll-container`,style:[this.contentStyle,h],onScroll:this.handleNativeElScroll},this.$slots):u(D,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentStyle:[this.contentStyle,h]}),this.$slots))}})}const ye=ie(!1),de=a("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[p("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),p("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ce={position:E,inverted:Boolean,bordered:{type:Boolean,default:!1}},Ce=I({name:"LayoutHeader",props:Object.assign(Object.assign({},z.props),ce),setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:r}=F(e),c=z("Layout","-layout-header",de,M,e,o),h=S(()=>{const{common:{cubicBezierEaseInOut:C},self:f}=c.value,n={"--n-bezier":C};return e.inverted?(n["--n-color"]=f.headerColorInverted,n["--n-text-color"]=f.textColorInverted,n["--n-border-color"]=f.headerBorderColorInverted):(n["--n-color"]=f.headerColor,n["--n-text-color"]=f.textColor,n["--n-border-color"]=f.headerBorderColor),n}),l=r?Y("layout-header",S(()=>e.inverted?"a":"b"),h,e):void 0;return{mergedClsPrefix:o,cssVars:r?void 0:h,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),u("div",{class:[`${o}-layout-header`,this.themeClass,this.position&&`${o}-layout-header--${this.position}-positioned`,this.bordered&&`${o}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),ue=a("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[p("bordered",[d("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),d("left-placement",[p("bordered",[d("border",`
 right: 0;
 `)])]),p("right-placement",`
 justify-content: flex-start;
 `,[p("bordered",[d("border",`
 left: 0;
 `)]),p("collapsed",[a("layout-toggle-button",[a("base-icon",`
 transform: rotate(180deg);
 `)]),a("layout-toggle-bar",[R("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),a("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[a("base-icon",`
 transform: rotate(0);
 `)]),a("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[R("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),p("collapsed",[a("layout-toggle-bar",[R("&:hover",[d("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),a("layout-toggle-button",[a("base-icon",`
 transform: rotate(0);
 `)])]),a("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[a("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),a("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[d("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),d("bottom",`
 position: absolute;
 top: 34px;
 `),R("&:hover",[d("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),d("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),R("&:hover",[d("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),d("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),a("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),p("show-content",[a("layout-sider-scroll-container",{opacity:1})]),p("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),be=I({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return u("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},u(ee,{clsPrefix:e},{default:()=>u(te,null)}))}}),ge=I({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return u("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},u("div",{class:`${e}-layout-toggle-bar__top`}),u("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),he={position:E,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerStyle:[String,Object],collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},xe=I({name:"LayoutSider",props:Object.assign(Object.assign({},z.props),he),setup(e){const o=oe(U),r=_(null),c=_(null),h=S(()=>L(n.value?e.collapsedWidth:e.width)),l=S(()=>e.collapseMode!=="transform"?{}:{minWidth:L(e.width)}),C=S(()=>o?o.siderPlacement:"left"),f=_(e.defaultCollapsed),n=re(N(e,"collapsed"),f);function v(i,t){if(e.nativeScrollbar){const{value:s}=r;s&&(t===void 0?s.scrollTo(i):s.scrollTo(i,t))}else{const{value:s}=c;s&&s.scrollTo(i,t)}}function j(){const{"onUpdate:collapsed":i,onUpdateCollapsed:t,onExpand:s,onCollapse:k}=e,{value:B}=n;t&&O(t,!B),i&&O(i,!B),f.value=!B,B?s&&O(s):k&&O(k)}let $=0,w=0;const P=i=>{var t;const s=i.target;$=s.scrollLeft,w=s.scrollTop,(t=e.onScroll)===null||t===void 0||t.call(e,i)};A(()=>{if(e.nativeScrollbar){const i=r.value;i&&(i.scrollTop=w,i.scrollLeft=$)}}),W(q,{collapsedRef:n,collapseModeRef:N(e,"collapseMode")});const{mergedClsPrefixRef:x,inlineThemeDisabled:b}=F(e),g=z("Layout","-layout-sider",ue,M,e,x);function m(i){var t,s;i.propertyName==="max-width"&&(n.value?(t=e.onAfterLeave)===null||t===void 0||t.call(e):(s=e.onAfterEnter)===null||s===void 0||s.call(e))}const X={scrollTo:v},V=S(()=>{const{common:{cubicBezierEaseInOut:i},self:t}=g.value,{siderToggleButtonColor:s,siderToggleButtonBorder:k,siderToggleBarColor:B,siderToggleBarColorHover:K}=t,y={"--n-bezier":i,"--n-toggle-button-color":s,"--n-toggle-button-border":k,"--n-toggle-bar-color":B,"--n-toggle-bar-color-hover":K};return e.inverted?(y["--n-color"]=t.siderColorInverted,y["--n-text-color"]=t.textColorInverted,y["--n-border-color"]=t.siderBorderColorInverted,y["--n-toggle-button-icon-color"]=t.siderToggleButtonIconColorInverted,y.__invertScrollbar=t.__invertScrollbar):(y["--n-color"]=t.siderColor,y["--n-text-color"]=t.textColor,y["--n-border-color"]=t.siderBorderColor,y["--n-toggle-button-icon-color"]=t.siderToggleButtonIconColor),y}),T=b?Y("layout-sider",S(()=>e.inverted?"a":"b"),V,e):void 0;return Object.assign({scrollableElRef:r,scrollbarInstRef:c,mergedClsPrefix:x,mergedTheme:g,styleMaxWidth:h,mergedCollapsed:n,scrollContainerStyle:l,siderPlacement:C,handleNativeElScroll:P,handleTransitionend:m,handleTriggerClick:j,inlineThemeDisabled:b,cssVars:V,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender},X)},render(){var e;const{mergedClsPrefix:o,mergedCollapsed:r,showTrigger:c}=this;return(e=this.onRender)===null||e===void 0||e.call(this),u("aside",{class:[`${o}-layout-sider`,this.themeClass,`${o}-layout-sider--${this.position}-positioned`,`${o}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${o}-layout-sider--bordered`,r&&`${o}-layout-sider--collapsed`,(!r||this.showCollapsedContent)&&`${o}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:L(this.width)}]},this.nativeScrollbar?u("div",{class:`${o}-layout-sider-scroll-container`,onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):u(D,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),c?c==="bar"?u(ge,{clsPrefix:o,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):u(be,{clsPrefix:o,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?u("div",{class:`${o}-layout-sider__border`}):null)}});export{xe as _,Ce as a,ye as b};

import{d as E,I as h,a1 as V,a9 as M,H as b,a3 as L,af as F,R as he,a8 as pe,r as q,ag as ie,ah as fe,ai as G,aj as U,a7 as f,$ as m,a0 as C,a6 as a,ak as j,al as ge,a2 as xe,O as le,am as be,an as ee,ab as oe,ac as N,a5 as Ce}from"./main-cd20fe6b.js";import{_ as ze,c as ye}from"./Dropdown-5e26b885.js";import{_ as Ie}from"./Tooltip-fb07d771.js";import{u as te}from"./use-merged-state-3065e8b8.js";import{u as we}from"./use-compitable-a8a1ddad.js";const Se=E({name:"ChevronDownFilled",render(){return h("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Ae=V("n-layout-sider"),Ve={type:String,default:"static"},_=V("n-menu"),W=V("n-submenu"),Z=V("n-menu-item-group"),B=8;function J(e){const r=M(_),{props:n,mergedCollapsedRef:l}=r,i=M(W,null),d=M(Z,null),s=b(()=>n.mode==="horizontal"),c=b(()=>s.value?n.dropdownPlacement:"tmNodes"in e?"right-start":"right"),p=b(()=>{var v;return Math.max((v=n.collapsedIconSize)!==null&&v!==void 0?v:n.iconSize,n.iconSize)}),y=b(()=>{var v;return!s.value&&e.root&&l.value&&(v=n.collapsedIconSize)!==null&&v!==void 0?v:n.iconSize}),R=b(()=>{if(s.value)return;const{collapsedWidth:v,indent:w,rootIndent:A}=n,{root:S,isGroup:H}=e,P=A===void 0?w:A;if(S)return l.value?v/2-p.value/2:P;if(d)return w/2+d.paddingLeftRef.value;if(i)return(H?w/2:w)+i.paddingLeftRef.value}),z=b(()=>{const{collapsedWidth:v,indent:w,rootIndent:A}=n,{value:S}=p,{root:H}=e;return s.value||!H||!l.value?B:(A===void 0?w:A)+S+B-(v+S)/2});return{dropdownPlacement:c,activeIconSize:y,maxIconSize:p,paddingLeft:R,iconMarginRight:z,NMenu:r,NSubmenu:i}}const Q={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ae=Object.assign(Object.assign({},Q),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),Re=E({name:"MenuOptionGroup",props:ae,setup(e){L(W,null);const r=J(e);L(Z,{paddingLeftRef:r.paddingLeft});const{mergedClsPrefixRef:n,props:l}=M(_);return function(){const{value:i}=n,d=r.paddingLeft.value,{nodeProps:s}=l,c=s==null?void 0:s(e.tmNode.rawNode);return h("div",{class:`${i}-menu-item-group`,role:"group"},h("div",Object.assign({},c,{class:[`${i}-menu-item-group-title`,c==null?void 0:c.class],style:[(c==null?void 0:c.style)||"",d!==void 0?`padding-left: ${d}px;`:""]}),F(e.title),e.extra?h(he,null," ",F(e.extra)):null),h("div",null,e.tmNodes.map(p=>X(p,l))))}}}),ce=E({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0}},setup(e){const{props:r}=M(_);return{menuProps:r,style:b(()=>{const{paddingLeft:n}=e;return{paddingLeft:n&&`${n}px`}}),iconStyle:b(()=>{const{maxIconSize:n,activeIconSize:l,iconMarginRight:i}=e;return{width:`${n}px`,height:`${n}px`,fontSize:`${l}px`,marginRight:`${i}px`}})}},render(){const{clsPrefix:e,tmNode:r,menuProps:{renderIcon:n,renderLabel:l,renderExtra:i,expandIcon:d}}=this,s=n?n(r.rawNode):F(this.icon);return h("div",{onClick:c=>{var p;(p=this.onClick)===null||p===void 0||p.call(this,c)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},s&&h("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[s]),h("div",{class:`${e}-menu-item-content-header`,role:"none"},l?l(r.rawNode):F(this.title),this.extra||i?h("span",{class:`${e}-menu-item-content-header__extra`}," ",i?i(r.rawNode):F(this.extra)):null),this.showArrow?h(pe,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>d?d(r.rawNode):h(Se,null)}):null)}}),de=Object.assign(Object.assign({},Q),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:{type:Boolean,default:!1},icon:Function,onClick:Function}),He=E({name:"Submenu",props:de,setup(e){const r=J(e),{NMenu:n,NSubmenu:l}=r,{props:i,mergedCollapsedRef:d,mergedThemeRef:s}=n,c=b(()=>{const{disabled:v}=e;return l!=null&&l.mergedDisabledRef.value||i.disabled?!0:v}),p=q(!1);L(W,{paddingLeftRef:r.paddingLeft,mergedDisabledRef:c}),L(Z,null);function y(){const{onClick:v}=e;v&&v()}function R(){c.value||(d.value||n.toggleExpand(e.internalKey),y())}function z(v){p.value=v}return{menuProps:i,mergedTheme:s,doSelect:n.doSelect,inverted:n.invertedRef,isHorizontal:n.isHorizontalRef,mergedClsPrefix:n.mergedClsPrefixRef,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,iconMarginRight:r.iconMarginRight,dropdownPlacement:r.dropdownPlacement,dropdownShow:p,paddingLeft:r.paddingLeft,mergedDisabled:c,mergedValue:n.mergedValueRef,childActive:ie(()=>n.activePathRef.value.includes(e.internalKey)),collapsed:b(()=>i.mode==="horizontal"?!1:d.value?!0:!n.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:b(()=>!c.value&&(i.mode==="horizontal"||d.value)),handlePopoverShowChange:z,handleClick:R}},render(){var e;const{mergedClsPrefix:r,menuProps:{renderIcon:n,renderLabel:l}}=this,i=()=>{const{isHorizontal:s,paddingLeft:c,collapsed:p,mergedDisabled:y,maxIconSize:R,activeIconSize:z,title:v,childActive:w,icon:A,handleClick:S,menuProps:{nodeProps:H},dropdownShow:P,iconMarginRight:D,tmNode:k,mergedClsPrefix:$}=this,K=H==null?void 0:H(k.rawNode);return h("div",Object.assign({},K,{class:[`${$}-menu-item`,K==null?void 0:K.class],role:"menuitem"}),h(ce,{tmNode:k,paddingLeft:c,collapsed:p,disabled:y,iconMarginRight:D,maxIconSize:R,activeIconSize:z,title:v,showArrow:!s,childActive:w,clsPrefix:$,icon:A,hover:P,onClick:S}))},d=()=>h(fe,null,{default:()=>{const{tmNodes:s,collapsed:c}=this;return c?null:h("div",{class:`${r}-submenu-children`,role:"menu"},s.map(p=>X(p,this.menuProps)))}});return this.root?h(ze,Object.assign({size:"large"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,trigger:"hover",disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:n,renderLabel:l}),{default:()=>h("div",{class:`${r}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},i(),this.isHorizontal?null:d())}):h("div",{class:`${r}-submenu`,role:"menuitem","aria-expanded":!this.collapsed},i(),d())}}),se=Object.assign(Object.assign({},Q),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),Pe=E({name:"MenuOption",props:se,setup(e){const r=J(e),{NSubmenu:n,NMenu:l}=r,{props:i,mergedClsPrefixRef:d,mergedCollapsedRef:s}=l,c=n?n.mergedDisabledRef:{value:!1},p=b(()=>c.value||e.disabled);function y(z){const{onClick:v}=e;v&&v(z)}function R(z){p.value||(l.doSelect(e.internalKey,e.tmNode.rawNode),y(z))}return{mergedClsPrefix:d,dropdownPlacement:r.dropdownPlacement,paddingLeft:r.paddingLeft,iconMarginRight:r.iconMarginRight,maxIconSize:r.maxIconSize,activeIconSize:r.activeIconSize,mergedTheme:l.mergedThemeRef,menuProps:i,dropdownEnabled:ie(()=>e.root&&s.value&&i.mode!=="horizontal"&&!p.value),selected:b(()=>l.mergedValueRef.value===e.internalKey),mergedDisabled:p,handleClick:R}},render(){const{mergedClsPrefix:e,mergedTheme:r,tmNode:n,menuProps:{renderLabel:l,nodeProps:i}}=this,d=i==null?void 0:i(n.rawNode);return h("div",Object.assign({},d,{role:"menuitem",class:[`${e}-menu-item`,d==null?void 0:d.class]}),h(Ie,{theme:r.peers.Tooltip,themeOverrides:r.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>l?l(n.rawNode):F(this.title),trigger:()=>h(ce,{tmNode:n,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Ne=E({name:"MenuDivider",setup(){const e=M(_),{mergedClsPrefixRef:r,isHorizontalRef:n}=e;return()=>n.value?null:h("div",{class:`${r.value}-menu-divider`})}}),Te=G(ae),Me=G(se),Ee=G(de);function Ke(e){return e.type==="divider"||e.type==="render"}function Oe(e){return e.type==="divider"}function X(e,r){const{rawNode:n}=e;if(Ke(n))return Oe(n)?h(Ne,Object.assign({key:e.key},n.props)):void 0;const{labelField:l}=r,{key:i,level:d,isGroup:s}=e,c=Object.assign(Object.assign({},n),{title:n.title||n[l],extra:n.titleExtra||n.extra,key:i,internalKey:i,level:d,root:d===0,isGroup:s});return e.children?e.isGroup?h(Re,U(c,Te,{tmNode:e,tmNodes:e.children,key:i})):h(He,U(c,Ee,{key:i,rawNodes:n[r.childrenField],tmNodes:e.children,tmNode:e})):h(Pe,U(c,Me,{key:i,tmNode:e}))}const ne=[f("&::before","background-color: var(--n-item-color-hover);"),a("arrow",`
 color: var(--n-arrow-color-hover);
 `),a("icon",`
 color: var(--n-item-icon-color-hover);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[f("a",`
 color: var(--n-item-text-color-hover);
 `),a("extra",`
 color: var(--n-item-text-color-hover);
 `)])],re=[a("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[f("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),a("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],Fe=f([m("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[C("horizontal",`
 display: inline-flex;
 padding-bottom: 0;
 `,[m("submenu","margin: 0;"),m("menu-item","margin: 0;"),m("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[f("&::before","display: none;"),C("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),m("menu-item-content",[C("selected",[a("icon","color: var(--n-item-icon-color-active-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[f("a","color: var(--n-item-text-color-active-horizontal);"),a("extra","color: var(--n-item-text-color-active-horizontal);")])]),C("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[f("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),a("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),a("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),j("disabled",[j("selected, child-active",[f("&:focus-within",re)]),C("selected",[T(null,[a("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[f("a","color: var(--n-item-text-color-active-hover-horizontal);"),a("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),C("child-active",[T(null,[a("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[f("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),a("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),T("border-bottom: 2px solid var(--n-border-color-horizontal);",re)]),m("menu-item-content-header",[f("a","color: var(--n-item-text-color-horizontal);")])])]),C("collapsed",[m("menu-item-content",[C("selected",[f("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),m("menu-item-content-header","opacity: 0;"),a("arrow","opacity: 0;"),a("icon","color: var(--n-item-icon-color-collapsed);")])]),m("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),m("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[f("> *","z-index: 1;"),f("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),C("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),C("collapsed",[a("arrow","transform: rotate(0);")]),C("selected",[f("&::before","background-color: var(--n-item-color-active);"),a("arrow","color: var(--n-arrow-color-active);"),a("icon","color: var(--n-item-icon-color-active);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[f("a","color: var(--n-item-text-color-active);"),a("extra","color: var(--n-item-text-color-active);")])]),C("child-active",[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[f("a",`
 color: var(--n-item-text-color-child-active);
 `),a("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),a("arrow",`
 color: var(--n-arrow-color-child-active);
 `),a("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),j("disabled",[j("selected, child-active",[f("&:focus-within",ne)]),C("selected",[T(null,[a("arrow","color: var(--n-arrow-color-active-hover);"),a("icon","color: var(--n-item-icon-color-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[f("a","color: var(--n-item-text-color-active-hover);"),a("extra","color: var(--n-item-text-color-active-hover);")])])]),C("child-active",[T(null,[a("arrow","color: var(--n-arrow-color-child-active-hover);"),a("icon","color: var(--n-item-icon-color-child-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[f("a","color: var(--n-item-text-color-child-active-hover);"),a("extra","color: var(--n-item-text-color-child-active-hover);")])])]),C("selected",[T(null,[f("&::before","background-color: var(--n-item-color-active-hover);")])]),T(null,ne)]),a("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),a("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),m("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 color: var(--n-item-text-color);
 `,[f("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[f("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),a("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),m("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[m("menu-item-content",`
 height: var(--n-item-height);
 `),m("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[ge({duration:".2s"})])]),m("menu-item-group",[m("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),m("menu-tooltip",[f("a",`
 color: inherit;
 text-decoration: none;
 `)]),m("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function T(e,r){return[C("hover",e,r),f("&:hover",e,r)]}const ke=Object.assign(Object.assign({},le.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array,dropdownPlacement:{type:String,default:"bottom"}}),De=E({name:"Menu",props:ke,setup(e){const{mergedClsPrefixRef:r,inlineThemeDisabled:n}=xe(e),l=le("Menu","-menu",Fe,be,e,r),i=M(Ae,null),d=b(()=>{var u;const{collapsed:g}=e;if(g!==void 0)return g;if(i){const{collapseModeRef:o,collapsedRef:x}=i;if(o.value==="width")return(u=x.value)!==null&&u!==void 0?u:!1}return!1}),s=b(()=>{const{keyField:u,childrenField:g}=e;return ye(e.items||e.options,{getChildren(o){return o[g]},getKey(o){var x;return(x=o[u])!==null&&x!==void 0?x:o.name}})}),c=b(()=>new Set(s.value.treeNodes.map(u=>u.key))),{watchProps:p}=e,y=q(null);p!=null&&p.includes("defaultValue")?ee(()=>{y.value=e.defaultValue}):y.value=e.defaultValue;const R=oe(e,"value"),z=te(R,y),v=q([]),w=()=>{v.value=e.defaultExpandAll?s.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||s.value.getPath(z.value,{includeSelf:!1}).keyPath};p!=null&&p.includes("defaultExpandedKeys")?ee(w):w();const A=we(e,["expandedNames","expandedKeys"]),S=te(A,v),H=b(()=>s.value.treeNodes),P=b(()=>s.value.getPath(z.value).keyPath);L(_,{props:e,mergedCollapsedRef:d,mergedThemeRef:l,mergedValueRef:z,mergedExpandedKeysRef:S,activePathRef:P,mergedClsPrefixRef:r,isHorizontalRef:b(()=>e.mode==="horizontal"),invertedRef:oe(e,"inverted"),doSelect:D,toggleExpand:$});function D(u,g){const{"onUpdate:value":o,onUpdateValue:x,onSelect:I}=e;x&&N(x,u,g),o&&N(o,u,g),I&&N(I,u,g),y.value=u}function k(u){const{"onUpdate:expandedKeys":g,onUpdateExpandedKeys:o,onExpandedNamesChange:x,onOpenNamesChange:I}=e;g&&N(g,u),o&&N(o,u),x&&N(x,u),I&&N(I,u),v.value=u}function $(u){const g=Array.from(S.value),o=g.findIndex(x=>x===u);if(~o)g.splice(o,1);else{if(e.accordion&&c.value.has(u)){const x=g.findIndex(I=>c.value.has(I));x>-1&&g.splice(x,1)}g.push(u)}k(g)}const K=u=>{const g=s.value.getPath(u!=null?u:z.value,{includeSelf:!1}).keyPath;if(!g.length)return;const o=Array.from(S.value),x=new Set([...o,...g]);e.accordion&&c.value.forEach(I=>{x.has(I)&&!g.includes(I)&&x.delete(I)}),k(Array.from(x))},Y=b(()=>{const{inverted:u}=e,{common:{cubicBezierEaseInOut:g},self:o}=l.value,{borderRadius:x,borderColorHorizontal:I,fontSize:ve,itemHeight:ue,dividerColor:me}=o,t={"--n-divider-color":me,"--n-bezier":g,"--n-font-size":ve,"--n-border-color-horizontal":I,"--n-border-radius":x,"--n-item-height":ue};return u?(t["--n-group-text-color"]=o.groupTextColorInverted,t["--n-color"]=o.colorInverted,t["--n-item-text-color"]=o.itemTextColorInverted,t["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,t["--n-item-text-color-active"]=o.itemTextColorActiveInverted,t["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,t["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,t["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,t["--n-item-icon-color"]=o.itemIconColorInverted,t["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,t["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,t["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,t["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,t["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,t["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,t["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,t["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,t["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,t["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,t["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,t["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,t["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,t["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,t["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,t["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,t["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,t["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,t["--n-arrow-color"]=o.arrowColorInverted,t["--n-arrow-color-hover"]=o.arrowColorHoverInverted,t["--n-arrow-color-active"]=o.arrowColorActiveInverted,t["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,t["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,t["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,t["--n-item-color-hover"]=o.itemColorHoverInverted,t["--n-item-color-active"]=o.itemColorActiveInverted,t["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,t["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(t["--n-group-text-color"]=o.groupTextColor,t["--n-color"]=o.color,t["--n-item-text-color"]=o.itemTextColor,t["--n-item-text-color-hover"]=o.itemTextColorHover,t["--n-item-text-color-active"]=o.itemTextColorActive,t["--n-item-text-color-child-active"]=o.itemTextColorChildActive,t["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,t["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,t["--n-item-icon-color"]=o.itemIconColor,t["--n-item-icon-color-hover"]=o.itemIconColorHover,t["--n-item-icon-color-active"]=o.itemIconColorActive,t["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,t["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,t["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,t["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,t["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,t["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,t["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,t["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,t["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,t["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,t["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,t["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,t["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,t["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,t["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,t["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,t["--n-arrow-color"]=o.arrowColor,t["--n-arrow-color-hover"]=o.arrowColorHover,t["--n-arrow-color-active"]=o.arrowColorActive,t["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,t["--n-arrow-color-child-active"]=o.arrowColorChildActive,t["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,t["--n-item-color-hover"]=o.itemColorHover,t["--n-item-color-active"]=o.itemColorActive,t["--n-item-color-active-hover"]=o.itemColorActiveHover,t["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),t}),O=n?Ce("menu",b(()=>e.inverted?"a":"b"),Y,e):void 0;return{mergedClsPrefix:r,controlledExpandedKeys:A,uncontrolledExpanededKeys:v,mergedExpandedKeys:S,uncontrolledValue:y,mergedValue:z,activePath:P,tmNodes:H,mergedTheme:l,mergedCollapsed:d,cssVars:n?void 0:Y,themeClass:O==null?void 0:O.themeClass,onRender:O==null?void 0:O.onRender,showOption:K}},render(){const{mergedClsPrefix:e,mode:r,themeClass:n,onRender:l}=this;return l==null||l(),h("div",{role:r==="horizontal"?"menubar":"menu",class:[`${e}-menu`,n,`${e}-menu--${r}`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars},this.tmNodes.map(i=>X(i,this.$props)))}});export{De as _,Ae as l,Ve as p};

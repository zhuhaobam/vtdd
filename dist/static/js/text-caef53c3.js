import{$ as z,a7 as f,a0 as d,d as T,a2 as w,O as g,bC as B,H as u,aN as a,a5 as R,I as c}from"./main-cd20fe6b.js";import{u as P}from"./use-compitable-a8a1ddad.js";const _=z("h",`
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 margin: var(--n-margin);
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[f("&:first-child",{marginTop:0}),d("prefix-bar",{position:"relative",paddingLeft:"var(--n-prefix-width)"},[d("align-text",{paddingLeft:0},[f("&::before",{left:"calc(-1 * var(--n-prefix-width))"})]),f("&::before",`
 content: "";
 width: var(--n-bar-width);
 border-radius: calc(var(--n-bar-width) / 2);
 transition: background-color .3s var(--n-bezier);
 left: 0;
 top: 0;
 bottom: 0;
 position: absolute;
 `),f("&::before",{backgroundColor:"var(--n-bar-color)"})])]),V=Object.assign(Object.assign({},g.props),{type:{type:String,default:"default"},prefix:String,alignText:Boolean}),l=e=>T({name:`H${e}`,props:V,setup(o){const{mergedClsPrefixRef:i,inlineThemeDisabled:n}=w(o),r=g("Typography","-h",_,B,o,i),t=u(()=>{const{type:h}=o,{common:{cubicBezierEaseInOut:m},self:{headerFontWeight:b,headerTextColor:x,[a("headerPrefixWidth",e)]:p,[a("headerFontSize",e)]:v,[a("headerMargin",e)]:C,[a("headerBarWidth",e)]:y,[a("headerBarColor",h)]:$}}=r.value;return{"--n-bezier":m,"--n-font-size":v,"--n-margin":C,"--n-bar-color":$,"--n-bar-width":y,"--n-font-weight":b,"--n-text-color":x,"--n-prefix-width":p}}),s=n?R(`h${e}`,u(()=>o.type[0]),t,o):void 0;return{mergedClsPrefix:i,cssVars:n?void 0:t,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var o;const{prefix:i,alignText:n,mergedClsPrefix:r,cssVars:t,$slots:s}=this;return(o=this.onRender)===null||o===void 0||o.call(this),c(`h${e}`,{class:[`${r}-h`,`${r}-h${e}`,this.themeClass,{[`${r}-h--prefix-bar`]:i,[`${r}-h--align-text`]:n}],style:t},s)}}),j=l("1");l("2");l("3");l("4");l("5");l("6");const O=z("text",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
`,[d("strong",`
 font-weight: var(--n-font-weight-strong);
 `),d("italic",{fontStyle:"italic"}),d("underline",{textDecoration:"underline"}),d("code",`
 line-height: 1.4;
 display: inline-block;
 font-family: var(--n-font-famliy-mono);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 box-sizing: border-box;
 padding: .05em .35em 0 .35em;
 border-radius: var(--n-code-border-radius);
 font-size: .9em;
 color: var(--n-code-text-color);
 background-color: var(--n-code-color);
 border: var(--n-code-border);
 `)]),H=Object.assign(Object.assign({},g.props),{code:Boolean,type:{type:String,default:"default"},delete:Boolean,strong:Boolean,italic:Boolean,underline:Boolean,depth:[String,Number],tag:String,as:{type:String,validator:()=>!0,default:void 0}}),D=T({name:"Text",props:H,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:i}=w(e),n=g("Typography","-text",O,B,e,o),r=u(()=>{const{depth:s,type:h}=e,m=h==="default"?s===void 0?"textColor":`textColor${s}Depth`:a("textColor",h),{common:{fontWeightStrong:b,fontFamilyMono:x,cubicBezierEaseInOut:p},self:{codeTextColor:v,codeBorderRadius:C,codeColor:y,codeBorder:$,[m]:S}}=n.value;return{"--n-bezier":p,"--n-text-color":S,"--n-font-weight-strong":b,"--n-font-famliy-mono":x,"--n-code-border-radius":C,"--n-code-text-color":v,"--n-code-color":y,"--n-code-border":$}}),t=i?R("text",u(()=>`${e.type[0]}${e.depth||""}`),r,e):void 0;return{mergedClsPrefix:o,compitableTag:P(e,["as","tag"]),cssVars:i?void 0:r,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e,o,i;const{mergedClsPrefix:n}=this;(e=this.onRender)===null||e===void 0||e.call(this);const r=[`${n}-text`,this.themeClass,{[`${n}-text--code`]:this.code,[`${n}-text--delete`]:this.delete,[`${n}-text--strong`]:this.strong,[`${n}-text--italic`]:this.italic,[`${n}-text--underline`]:this.underline}],t=(i=(o=this.$slots).default)===null||i===void 0?void 0:i.call(o);return this.code?c("code",{class:r,style:this.cssVars},this.delete?c("del",null,t):t):this.delete?c("del",{class:r,style:this.cssVars},t):c(this.compitableTag||"span",{class:r,style:this.cssVars},t)}});export{j as N,D as _};

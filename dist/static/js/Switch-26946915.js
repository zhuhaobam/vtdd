import{X as le,aO as se,aP as de,$ as j,a6 as t,aQ as K,a7 as T,a0 as l,ak as U,d as ce,a2 as ue,O as H,aR as he,r as W,ab as be,H as V,aN as g,aS as D,aT as s,a5 as fe,aU as N,I as o,aV as v,aW as ge,aX as ve,ac as O}from"./main-16bd6d68.js";import{u as we}from"./use-merged-state-a12c45f3.js";const me=e=>{const{primaryColor:d,opacityDisabled:h,borderRadius:i,textColor3:r}=e,w="rgba(0, 0, 0, .14)";return Object.assign(Object.assign({},se),{iconColor:r,textColor:"white",loadingColor:d,opacityDisabled:h,railColor:w,railColorActive:d,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${de(d,{alpha:.2})}`})},pe={name:"Switch",common:le,self:me},ye=pe,xe=j("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[t("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),t("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),t("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),j("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[K({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),t("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),t("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),t("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),T("&:focus",[t("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),l("round",[t("rail","border-radius: calc(var(--n-rail-height) / 2);",[t("button","border-radius: calc(var(--n-button-height) / 2);")])]),U("disabled",[U("icon",[l("rubber-band",[l("pressed",[t("rail",[t("button","max-width: var(--n-button-width-pressed);")])]),t("rail",[T("&:active",[t("button","max-width: var(--n-button-width-pressed);")])]),l("active",[l("pressed",[t("rail",[t("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),t("rail",[T("&:active",[t("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),l("active",[t("rail",[t("button","left: calc(100% - (var(--n-rail-height) + var(--n-button-width)) / 2)")])]),t("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[t("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[K()]),t("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-width);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),l("active",[t("rail","background-color: var(--n-rail-color-active);")]),l("loading",[t("rail",`
 cursor: wait;
 `)]),l("disabled",[t("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),ke=Object.assign(Object.assign({},H.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]}),Ce=ce({name:"Switch",props:ke,setup(e){const{mergedClsPrefixRef:d,inlineThemeDisabled:h}=ue(e),i=H("Switch","-switch",xe,ye,e,d),r=he(e),{mergedSizeRef:w,mergedDisabledRef:b}=r,y=W(e.defaultValue),B=be(e,"value"),f=we(B,y),x=V(()=>f.value===e.checkedValue),m=W(!1),n=W(!1),c=V(()=>{const{railStyle:a}=e;if(!!a)return a({focused:n.value,checked:x.value})});function u(a){const{"onUpdate:value":C,onChange:S,onUpdateValue:_}=e,{nTriggerFormInput:$,nTriggerFormChange:z}=r;C&&O(C,a),_&&O(_,a),S&&O(S,a),y.value=a,$(),z()}function L(){const{nTriggerFormFocus:a}=r;a()}function M(){const{nTriggerFormBlur:a}=r;a()}function A(){e.loading||b.value||(f.value!==e.checkedValue?u(e.checkedValue):u(e.uncheckedValue))}function I(){n.value=!0,L()}function X(){n.value=!1,M(),m.value=!1}function E(a){e.loading||b.value||a.key===" "&&(f.value!==e.checkedValue?u(e.checkedValue):u(e.uncheckedValue),m.value=!1)}function Y(a){e.loading||b.value||a.key===" "&&(a.preventDefault(),m.value=!0)}const P=V(()=>{const{value:a}=w,{self:{opacityDisabled:C,railColor:S,railColorActive:_,buttonBoxShadow:$,buttonColor:z,boxShadowFocus:Q,loadingColor:q,textColor:G,iconColor:J,[g("buttonHeight",a)]:k,[g("buttonWidth",a)]:Z,[g("buttonWidthPressed",a)]:ee,[g("railHeight",a)]:R,[g("railWidth",a)]:F,[g("railBorderRadius",a)]:te,[g("buttonBorderRadius",a)]:ae},common:{cubicBezierEaseInOut:ne}}=i.value,oe=D((s(R)-s(k))/2),ie=D(Math.max(s(R),s(k))),re=s(R)>s(k)?F:D(s(F)+s(k)-s(R));return{"--n-bezier":ne,"--n-button-border-radius":ae,"--n-button-box-shadow":$,"--n-button-color":z,"--n-button-width":Z,"--n-button-width-pressed":ee,"--n-button-height":k,"--n-height":ie,"--n-offset":oe,"--n-opacity-disabled":C,"--n-rail-border-radius":te,"--n-rail-color":S,"--n-rail-color-active":_,"--n-rail-height":R,"--n-rail-width":F,"--n-width":re,"--n-box-shadow-focus":Q,"--n-loading-color":q,"--n-text-color":G,"--n-icon-color":J}}),p=h?fe("switch",V(()=>w.value[0]),P,e):void 0;return{handleClick:A,handleBlur:X,handleFocus:I,handleKeyup:E,handleKeydown:Y,mergedRailStyle:c,pressed:m,mergedClsPrefix:d,mergedValue:f,checked:x,mergedDisabled:b,cssVars:h?void 0:P,themeClass:p==null?void 0:p.themeClass,onRender:p==null?void 0:p.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:d,checked:h,mergedRailStyle:i,onRender:r,$slots:w}=this;r==null||r();const{checked:b,unchecked:y,icon:B,"checked-icon":f,"unchecked-icon":x}=w,m=!(N(B)&&N(f)&&N(x));return o("div",{role:"switch","aria-checked":h,class:[`${e}-switch`,this.themeClass,m&&`${e}-switch--icon`,h&&`${e}-switch--active`,d&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},o("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:i},v(b,n=>v(y,c=>n||c?o("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},o("div",{class:`${e}-switch__rail-placeholder`},o("div",{class:`${e}-switch__button-placeholder`}),n),o("div",{class:`${e}-switch__rail-placeholder`},o("div",{class:`${e}-switch__button-placeholder`}),c)):null)),o("div",{class:`${e}-switch__button`},v(B,n=>v(f,c=>v(x,u=>o(ge,null,{default:()=>this.loading?o(ve,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(c||n)?o("div",{class:`${e}-switch__button-icon`,key:c?"checked-icon":"icon"},c||n):!this.checked&&(u||n)?o("div",{class:`${e}-switch__button-icon`,key:u?"unchecked-icon":"icon"},u||n):null})))),v(b,n=>n&&o("div",{key:"checked",class:`${e}-switch__checked`},n)),v(y,n=>n&&o("div",{key:"unchecked",class:`${e}-switch__unchecked`},n)))))}});export{Ce as _};

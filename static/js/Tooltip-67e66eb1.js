import{N as p,p as i}from"./Popover-2b6e1886.js";import{d as n,O as t,ax as a,r as l,H as h,I as m}from"./main-16bd6d68.js";const c=Object.assign(Object.assign({},i),t.props),O=n({name:"Tooltip",props:c,__popover__:!0,setup(e){const o=t("Tooltip","-tooltip",void 0,a,e),s=l(null);return Object.assign(Object.assign({},{syncPosition(){s.value.syncPosition()},setShow(r){s.value.setShow(r)}}),{popoverRef:s,mergedTheme:o,popoverThemeOverrides:h(()=>o.value.self)})},render(){const{mergedTheme:e,internalExtraClass:o}=this;return m(p,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:o.concat("tooltip"),ref:"popoverRef"}),this.$slots)}});export{O as _};
import{bE as B,au as C,d as G,a2 as R,O as v,bF as E,H as j,aN as I,bG as T,aT as b,bH as _,I as x}from"./main-295320e6.js";function H(e,a="default",i=[]){const s=e.$slots[a];return s===void 0?i:s()}const L=()=>B,M={name:"Space",self:L},O=M;let h;const P=()=>{if(!C)return!0;if(h===void 0){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e);const a=e.scrollHeight===1;return document.body.removeChild(e),h=a}return h},A=Object.assign(Object.assign({},v.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),W=G({name:"Space",props:A,setup(e){const{mergedClsPrefixRef:a,mergedRtlRef:i}=R(e),n=v("Space","-space",void 0,O,e,a),s=E("Space",i,a);return{useGap:P(),rtlEnabled:s,mergedClsPrefix:a,margin:j(()=>{const{size:t}=e;if(Array.isArray(t))return{horizontal:t[0],vertical:t[1]};if(typeof t=="number")return{horizontal:t,vertical:t};const{self:{[I("gap",t)]:g}}=n.value,{row:c,col:u}=T(g);return{horizontal:b(u),vertical:b(c)}})}},render(){const{vertical:e,align:a,inline:i,justify:n,itemStyle:s,margin:t,wrap:g,mergedClsPrefix:c,rtlEnabled:u,useGap:l,wrapItem:w,internalUseGap:S}=this,d=_(H(this));if(!d.length)return null;const y=`${t.horizontal}px`,m=`${t.horizontal/2}px`,$=`${t.vertical}px`,o=`${t.vertical/2}px`,p=d.length-1,f=n.startsWith("space-");return x("div",{role:"none",class:[`${c}-space`,u&&`${c}-space--rtl`],style:{display:i?"inline-flex":"flex",flexDirection:e?"column":"row",justifyContent:["start","end"].includes(n)?"flex-"+n:n,flexWrap:!g||e?"nowrap":"wrap",marginTop:l||e?"":`-${o}`,marginBottom:l||e?"":`-${o}`,alignItems:a,gap:l?`${t.vertical}px ${t.horizontal}px`:""}},!w&&(l||S)?d:d.map((z,r)=>x("div",{role:"none",style:[s,{maxWidth:"100%"},l?"":e?{marginBottom:r!==p?$:""}:u?{marginLeft:f?n==="space-between"&&r===p?"":m:r!==p?y:"",marginRight:f?n==="space-between"&&r===0?"":m:"",paddingTop:o,paddingBottom:o}:{marginRight:f?n==="space-between"&&r===p?"":m:r!==p?y:"",marginLeft:f?n==="space-between"&&r===0?"":m:"",paddingTop:o,paddingBottom:o}]},z)))}});export{W as _};

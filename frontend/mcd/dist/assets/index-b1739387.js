import{d as e,o as t,c as s,w as a,x as l,k as o,t as i,e as r,q as n,F as c,h as u,y as d,r as h,z as p,g as m,u as g,A as v,j as f,_ as b,a as k,B as y,C as S,D as C,E as w,G as x,H as F,I as _,f as H,J as $,L as A,p as E,i as z,O as L,T,K as O,v as j}from"./index-13fa909d.js";import{_ as M}from"./index-3aba5a6e.js";import{_ as R,a as I}from"./logo-055c79af.js";import{s as B}from"./index-c82f2093.js";const D=e({name:"MenuItem"}),N=e({...D,props:{data:{default:()=>({id:"",name:""})}},emits:["click"],setup(e,{emit:d}){const h=e=>{d("click",e)};return(d,p)=>{const m=M,g=u("MenuItem",!0),v=u("a-sub-menu"),f=u("icon-unordered-list"),b=u("a-menu-item");return e.data.children&&e.data.children.length&&!e.data.hidden?(t(),s(v,{key:e.data.path},{icon:a((()=>[e.data.icon?(t(),s(m,{key:0,size:24,name:e.data.icon},null,8,["name"])):l("",!0)])),title:a((()=>[o(i(e.data.name),1)])),default:a((()=>[(t(!0),r(c,null,n(e.data.children,(e=>(t(),s(g,{key:e.id,data:e,onClick:h},null,8,["data"])))),128))])),_:1})):(t(),s(b,{key:e.data.path,onClick:p[0]||(p[0]=t=>h(e.data))},{icon:a((()=>[e.data.icon?(t(),s(m,{key:0,size:24,name:e.data.icon},null,8,["name"])):(t(),s(f,{key:1,size:20}))])),default:a((()=>[o(" "+i(e.data.name),1)])),_:1}))}}}),P=e({name:"Asider"}),W=b(e({...P,setup(e){const l=v(),o=f(),i=d(),b=h("Workplace"),k=(e=>{const t=[];return function e(s){s.forEach((s=>{var a;s.path&&t.push(s.path),(null==(a=s.children)?void 0:a.length)&&e(s.children)}))}(e),t})(i.menuTree);p((()=>l.path),(()=>{k.includes(l.path)&&(b.value=l.path)}),{immediate:!0});const y=e=>{e.path&&("/file"===e.path?o.push({path:e.path,query:{fileType:0}}):o.push({path:e.path}),k.includes(e.path)&&(b.value=e.path))};return(e,l)=>{const o=u("a-menu"),d=u("a-layout-sider");return t(),s(d,{collapsible:"",breakpoint:"xl",width:232,class:"asider"},{default:a((()=>[m(o,{"selected-keys":[b.value],"default-open-keys":["Workplace"],"auto-open-selected":!0,style:{width:"100%",height:"100%"}},{default:a((()=>[(t(!0),r(c,null,n(g(i).menuTree,(e=>(t(),s(N,{key:e.name,data:e,onClick:y},null,8,["data"])))),128))])),_:1},8,["selected-keys"])])),_:1})}}}),[["__scopeId","data-v-31bde0ef"]]);
/*!
  * vue-color-kit v1.0.4
  * (c) 2021 
  * @license MIT
  */
function K(e){let t={r:0,g:0,b:0,a:1};/#/.test(e)?t=function(e){e=e.slice(1);const t=e=>parseInt(e,16)||0;return{r:t(e.slice(0,2)),g:t(e.slice(2,4)),b:t(e.slice(4,6))}}(e):/rgb/.test(e)?t=U(e):"string"==typeof e?t=U(`rgba(${e})`):"[object Object]"===Object.prototype.toString.call(e)&&(t=e);const{r:s,g:a,b:l,a:o}=t,{h:i,s:r,v:n}=function({r:e,g:t,b:s}){e/=255,t/=255,s/=255;const a=Math.max(e,t,s),l=Math.min(e,t,s),o=a-l;let i=0;a===l?i=0:a===e?i=t>=s?60*(t-s)/o:60*(t-s)/o+360:a===t?i=60*(s-e)/o+120:a===s&&(i=60*(e-t)/o+240);i=Math.floor(i);let r=parseFloat((0===a?0:1-l/a).toFixed(2)),n=parseFloat(a.toFixed(2));return{h:i,s:r,v:n}}(t);return{r:s,g:a,b:l,a:void 0===o?1:o,h:i,s:r,v:n}}function Y(e){const t=document.createElement("canvas"),s=t.getContext("2d"),a=2*e;return t.width=a,t.height=a,s.fillStyle="#ffffff",s.fillRect(0,0,a,a),s.fillStyle="#ccd5db",s.fillRect(0,0,e,e),s.fillRect(e,e,e,e),t}function G(e,t,s,a,l,o){const i="l"===e,r=t.createLinearGradient(0,0,i?s:0,i?0:a);r.addColorStop(.01,l),r.addColorStop(.99,o),t.fillStyle=r,t.fillRect(0,0,s,a)}function U(e){return"string"==typeof e?(e=(/rgba?\((.*?)\)/.exec(e)||["","0,0,0,1"])[1].split(","),{r:Number(e[0])||0,g:Number(e[1])||0,b:Number(e[2])||0,a:Number(e[3]?e[3]:1)}):e}var V=e({props:{color:{type:String,default:"#000000"},hsv:{type:Object,default:null},size:{type:Number,default:152}},emits:["selectSaturation"],data:()=>({slideSaturationStyle:{}}),mounted(){this.renderColor(),this.renderSlide()},methods:{renderColor(){const e=this.$refs.canvasSaturation,t=this.size,s=e.getContext("2d");e.width=t,e.height=t,s.fillStyle=this.color,s.fillRect(0,0,t,t),G("l",s,t,t,"#FFFFFF","rgba(255,255,255,0)"),G("p",s,t,t,"rgba(0,0,0,0)","#000000")},renderSlide(){this.slideSaturationStyle={left:this.hsv.s*this.size-5+"px",top:(1-this.hsv.v)*this.size-5+"px"}},selectSaturation(e){const{top:t,left:s}=this.$el.getBoundingClientRect(),a=e.target.getContext("2d"),l=e=>{let l=e.clientX-s,o=e.clientY-t;l<0&&(l=0),o<0&&(o=0),l>this.size&&(l=this.size),o>this.size&&(o=this.size),this.slideSaturationStyle={left:l-5+"px",top:o-5+"px"};const i=a.getImageData(Math.min(l,this.size-1),Math.min(o,this.size-1),1,1),[r,n,c]=i.data;this.$emit("selectSaturation",{r:r,g:n,b:c})};l(e);const o=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",o)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",o)}}});const X={ref:"canvasSaturation"};V.render=function(e,a,l,o,i,r){return t(),s("div",{class:"saturation",onMousedown:a[1]||(a[1]=C(((...t)=>e.selectSaturation&&e.selectSaturation(...t)),["prevent","stop"]))},[m("canvas",X,null,512),m("div",{style:e.slideSaturationStyle,class:"slide"},null,4)],32)},V.__file="src/color/Saturation.vue";var J=e({props:{hsv:{type:Object,default:null},width:{type:Number,default:15},height:{type:Number,default:152}},emits:["selectHue"],data:()=>({slideHueStyle:{}}),mounted(){this.renderColor(),this.renderSlide()},methods:{renderColor(){const e=this.$refs.canvasHue,t=this.width,s=this.height,a=e.getContext("2d");e.width=t,e.height=s;const l=a.createLinearGradient(0,0,0,s);l.addColorStop(0,"#FF0000"),l.addColorStop(.17,"#FF00FF"),l.addColorStop(.34,"#0000FF"),l.addColorStop(.51,"#00FFFF"),l.addColorStop(.68,"#00FF00"),l.addColorStop(.17*5,"#FFFF00"),l.addColorStop(1,"#FF0000"),a.fillStyle=l,a.fillRect(0,0,t,s)},renderSlide(){this.slideHueStyle={top:(1-this.hsv.h/360)*this.height-2+"px"}},selectHue(e){const{top:t}=this.$el.getBoundingClientRect(),s=e.target.getContext("2d"),a=e=>{let a=e.clientY-t;a<0&&(a=0),a>this.height&&(a=this.height),this.slideHueStyle={top:a-2+"px"};const l=s.getImageData(0,Math.min(a,this.height-1),1,1),[o,i,r]=l.data;this.$emit("selectHue",{r:o,g:i,b:r})};a(e);const l=()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",l)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",l)}}});const q={ref:"canvasHue"};J.render=function(e,a,l,o,i,r){return t(),s("div",{class:"hue",onMousedown:a[1]||(a[1]=C(((...t)=>e.selectHue&&e.selectHue(...t)),["prevent","stop"]))},[m("canvas",q,null,512),m("div",{style:e.slideHueStyle,class:"slide"},null,4)],32)},J.__file="src/color/Hue.vue";var Z=e({props:{color:{type:String,default:"#000000"},rgba:{type:Object,default:null},width:{type:Number,default:15},height:{type:Number,default:152}},emits:["selectAlpha"],data:()=>({slideAlphaStyle:{},alphaSize:5}),watch:{color(){this.renderColor()},"rgba.a"(){this.renderSlide()}},mounted(){this.renderColor(),this.renderSlide()},methods:{renderColor(){const e=this.$refs.canvasAlpha,t=this.width,s=this.height,a=Y(this.alphaSize),l=e.getContext("2d");e.width=t,e.height=s,l.fillStyle=l.createPattern(a,"repeat"),l.fillRect(0,0,t,s),G("p",l,t,s,"rgba(255,255,255,0)",this.color)},renderSlide(){this.slideAlphaStyle={top:this.rgba.a*this.height-2+"px"}},selectAlpha(e){const{top:t}=this.$el.getBoundingClientRect(),s=e=>{let s=e.clientY-t;s<0&&(s=0),s>this.height&&(s=this.height);let a=parseFloat((s/this.height).toFixed(2));this.$emit("selectAlpha",a)};s(e);const a=()=>{document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",a)}}});const Q={ref:"canvasAlpha"};Z.render=function(e,a,l,o,i,r){return t(),s("div",{class:"color-alpha",onMousedown:a[1]||(a[1]=C(((...t)=>e.selectAlpha&&e.selectAlpha(...t)),["prevent","stop"]))},[m("canvas",Q,null,512),m("div",{style:e.slideAlphaStyle,class:"slide"},null,4)],32)},Z.__file="src/color/Alpha.vue";var ee=e({props:{color:{type:String,default:"#000000"},width:{type:Number,default:100},height:{type:Number,default:30}},data:()=>({alphaSize:5}),watch:{color(){this.renderColor()}},mounted(){this.renderColor()},methods:{renderColor(){const e=this.$el,t=this.width,s=this.height,a=Y(this.alphaSize),l=e.getContext("2d");e.width=t,e.height=s,l.fillStyle=l.createPattern(a,"repeat"),l.fillRect(0,0,t,s),l.fillStyle=this.color,l.fillRect(0,0,t,s)}}});ee.render=function(e,a,l,o,i,r){return t(),s("canvas")},ee.__file="src/color/Preview.vue";var te=e({props:{suckerCanvas:{type:Object,default:null},suckerArea:{type:Array,default:()=>[]}},data:()=>({isOpenSucker:!1,suckerPreview:null,isSucking:!1}),watch:{suckerCanvas(e){this.isSucking=!1,this.suckColor(e)}},methods:{openSucker(){this.isOpenSucker?this.keydownHandler({keyCode:27}):(this.isOpenSucker=!0,this.isSucking=!0,this.$emit("openSucker",!0),document.addEventListener("keydown",this.keydownHandler))},keydownHandler(e){27===e.keyCode&&(this.isOpenSucker=!1,this.isSucking=!1,this.$emit("openSucker",!1),document.removeEventListener("keydown",this.keydownHandler),document.removeEventListener("mousemove",this.mousemoveHandler),document.removeEventListener("mouseup",this.mousemoveHandler),this.suckerPreview&&(document.body.removeChild(this.suckerPreview),this.suckerPreview=null))},mousemoveHandler(e){const{clientX:t,clientY:s}=e,{top:a,left:l,width:o,height:i}=this.suckerCanvas.getBoundingClientRect(),r=t-l,n=s-a,c=this.suckerCanvas.getContext("2d").getImageData(Math.min(r,o-1),Math.min(n,i-1),1,1);let[u,d,h,p]=c.data;p=parseFloat((p/255).toFixed(2));const m=this.suckerPreview.style;Object.assign(m,{position:"absolute",left:t+20+"px",top:s-36+"px",width:"24px",height:"24px",borderRadius:"50%",border:"2px solid #fff",boxShadow:"0 0 8px 0 rgba(0, 0, 0, 0.16)",background:`rgba(${u}, ${d}, ${h}, ${p})`,zIndex:95}),this.suckerArea.length&&t>=this.suckerArea[0]&&s>=this.suckerArea[1]&&t<=this.suckerArea[2]&&s<=this.suckerArea[3]?m.display="":m.display="none"},suckColor(e){e&&"CANVAS"!==e.tagName||(this.suckerPreview=document.createElement("div"),this.suckerPreview&&document.body.appendChild(this.suckerPreview),document.addEventListener("mousemove",this.mousemoveHandler),document.addEventListener("mouseup",this.mousemoveHandler),e.addEventListener("click",(t=>{const{clientX:s,clientY:a}=t,{top:l,left:o,width:i,height:r}=e.getBoundingClientRect(),n=s-o,c=a-l,u=e.getContext("2d").getImageData(Math.min(n,i-1),Math.min(c,r-1),1,1);let[d,h,p,m]=u.data;m=parseFloat((m/255).toFixed(2)),this.$emit("selectSucker",{r:d,g:h,b:p,a:m})})))}}});const se=m("path",{d:"M13.1,8.2l5.6,5.6c0.4,0.4,0.5,1.1,0.1,1.5s-1.1,0.5-1.5,0.1c0,0-0.1,0-0.1-0.1l-1.4-1.4l-7.7,7.7C7.9,21.9,7.6,22,7.3,22H3.1C2.5,22,2,21.5,2,20.9l0,0v-4.2c0-0.3,0.1-0.6,0.3-0.8l5.8-5.8C8.5,9.7,9.2,9.6,9.7,10s0.5,1.1,0.1,1.5c0,0,0,0.1-0.1,0.1l-5.5,5.5v2.7h2.7l7.4-7.4L8.7,6.8c-0.5-0.4-0.5-1-0.1-1.5s1.1-0.5,1.5-0.1c0,0,0.1,0,0.1,0.1l1.4,1.4l3.5-3.5c1.6-1.6,4.1-1.6,5.8-0.1c1.6,1.6,1.6,4.1,0.1,5.8L20.9,9l-3.6,3.6c-0.4,0.4-1.1,0.5-1.5,0.1"},null,-1),ae={key:1,class:"sucker",viewBox:"-16 -16 68 68",xmlns:"http://www.w3.org/2000/svg",stroke:"#9099a4"},le=m("g",{fill:"none","fill-rule":"evenodd"},[m("g",{transform:"translate(1 1)","stroke-width":"4"},[m("circle",{"stroke-opacity":".5",cx:"18",cy:"18",r:"18"}),m("path",{d:"M36 18c0-9.94-8.06-18-18-18"},[m("animateTransform",{attributeName:"transform",type:"rotate",from:"0 18 18",to:"360 18 18",dur:"1s",repeatCount:"indefinite"})])])],-1);te.render=function(e,a,o,i,r,n){return t(),s("div",null,[e.isSucking?l("v-if",!0):(t(),s("svg",{key:0,class:[{active:e.isOpenSucker},"sucker"],xmlns:"http://www.w3.org/2000/svg",viewBox:"-12 -12 48 48",onClick:a[1]||(a[1]=(...t)=>e.openSucker&&e.openSucker(...t))},[se],2)),e.isSucking?(t(),s("svg",ae,[le])):l("v-if",!0)])},te.__file="src/color/Sucker.vue";var oe=e({props:{name:{type:String,default:""},color:{type:String,default:""}},emits:["inputColor"],setup:(e,{emit:t})=>({modelColor:S({get:()=>e.color||"",set(e){t("inputColor",e)}})})});const ie={class:"color-type"},re={class:"name"};oe.render=function(e,a,l,o,r,n){return t(),s("div",ie,[m("span",re,i(e.name),1),w(m("input",{"onUpdate:modelValue":a[1]||(a[1]=t=>e.modelColor=t),class:"value"},null,512),[[x,e.modelColor]])])},oe.__file="src/color/Box.vue";var ne=e({name:"ColorPicker",props:{color:{type:String,default:"#000000"},colorsDefault:{type:Array,default:()=>[]},colorsHistoryKey:{type:String,default:""}},emits:["selectColor"],setup(e,{emit:t}){const s=h(),a=h([]),l=h();function o(t){if(!t)return;const s=a.value||[],l=s.indexOf(t);l>=0&&s.splice(l,1),s.length>=8&&(s.length=7),s.unshift(t),a.value=s||[],localStorage&&e.colorsHistoryKey&&localStorage.setItem(e.colorsHistoryKey,JSON.stringify(s))}return e.colorsHistoryKey&&localStorage&&(a.value=JSON.parse(localStorage.getItem(e.colorsHistoryKey))||[]),l.value=Y(4).toDataURL(),y((()=>{o(s.value)})),{setColorsHistory:o,colorsHistory:a,color:s,imgAlphaBase64:l,selectColor:function(e){t("selectColor",e)}}}});const ce={class:"colors"},ue={key:0,class:"colors history"};ne.render=function(e,a,o,i,r,u){return t(),s("div",null,[m("ul",ce,[(t(!0),s(c,null,n(e.colorsDefault,(a=>(t(),s("li",{key:a,class:"item",onClick:t=>e.selectColor(a)},[m("div",{style:{background:`url(${e.imgAlphaBase64})`},class:"alpha"},null,4),m("div",{style:{background:a},class:"color"},null,4)],8,["onClick"])))),128))]),e.colorsHistory.length?(t(),s("ul",ue,[(t(!0),s(c,null,n(e.colorsHistory,(a=>(t(),s("li",{key:a,class:"item",onClick:t=>e.selectColor(a)},[m("div",{style:{background:`url(${e.imgAlphaBase64})`},class:"alpha"},null,4),m("div",{style:{background:a},class:"color"},null,4)],8,["onClick"])))),128))])):l("v-if",!0)])},ne.__file="src/color/Colors.vue";var de=e({components:{Saturation:V,Hue:J,Alpha:Z,Preview:ee,Sucker:te,Box:oe,Colors:ne},emits:["changeColor","openSucker"],props:{color:{type:String,default:"#000000"},theme:{type:String,default:"dark"},suckerHide:{type:Boolean,default:!0},suckerCanvas:{type:null,default:null},suckerArea:{type:Array,default:()=>[]},colorsDefault:{type:Array,default:()=>["#000000","#FFFFFF","#FF1900","#F47365","#FFB243","#FFE623","#6EFF2A","#1BC7B1","#00BEFF","#2E81FF","#5D61FF","#FF89CF","#FC3CAD","#BF3DCE","#8E00A7","rgba(0,0,0,0)"]},colorsHistoryKey:{type:String,default:"vue-colorpicker-history"}},data:()=>({hueWidth:15,hueHeight:152,previewHeight:30,modelRgba:"",modelHex:"",r:0,g:0,b:0,a:1,h:0,s:0,v:0}),computed:{isLightTheme(){return"light"===this.theme},totalWidth(){return this.hueHeight+2*(this.hueWidth+8)},previewWidth(){return this.totalWidth-(this.suckerHide?0:this.previewHeight)},rgba(){return{r:this.r,g:this.g,b:this.b,a:this.a}},hsv(){return{h:this.h,s:this.s,v:this.v}},rgbString(){return`rgb(${this.r}, ${this.g}, ${this.b})`},rgbaStringShort(){return`${this.r}, ${this.g}, ${this.b}, ${this.a}`},rgbaString(){return`rgba(${this.rgbaStringShort})`},hexString(){return function({r:e,g:t,b:s},a){const l=e=>("0"+Number(e).toString(16)).slice(-2),o=`#${l(e)}${l(t)}${l(s)}`;return a?o.toUpperCase():o}(this.rgba,!0)}},created(){Object.assign(this,K(this.color)),this.setText(),this.$watch("rgba",(()=>{this.$emit("changeColor",{rgba:this.rgba,hsv:this.hsv,hex:this.modelHex})}))},methods:{selectSaturation(e){const{r:t,g:s,b:a,h:l,s:o,v:i}=K(e);Object.assign(this,{r:t,g:s,b:a,h:l,s:o,v:i}),this.setText()},selectHue(e){const{r:t,g:s,b:a,h:l,s:o,v:i}=K(e);Object.assign(this,{r:t,g:s,b:a,h:l,s:o,v:i}),this.setText(),this.$nextTick((()=>{this.$refs.saturation.renderColor(),this.$refs.saturation.renderSlide()}))},selectAlpha(e){this.a=e,this.setText()},inputHex(e){const{r:t,g:s,b:a,a:l,h:o,s:i,v:r}=K(e);Object.assign(this,{r:t,g:s,b:a,a:l,h:o,s:i,v:r}),this.modelHex=e,this.modelRgba=this.rgbaStringShort,this.$nextTick((()=>{this.$refs.saturation.renderColor(),this.$refs.saturation.renderSlide(),this.$refs.hue.renderSlide()}))},inputRgba(e){const{r:t,g:s,b:a,a:l,h:o,s:i,v:r}=K(e);Object.assign(this,{r:t,g:s,b:a,a:l,h:o,s:i,v:r}),this.modelHex=this.hexString,this.modelRgba=e,this.$nextTick((()=>{this.$refs.saturation.renderColor(),this.$refs.saturation.renderSlide(),this.$refs.hue.renderSlide()}))},setText(){this.modelHex=this.hexString,this.modelRgba=this.rgbaStringShort},openSucker(e){this.$emit("openSucker",e)},selectSucker(e){const{r:t,g:s,b:a,a:l,h:o,s:i,v:r}=K(e);Object.assign(this,{r:t,g:s,b:a,a:l,h:o,s:i,v:r}),this.setText(),this.$nextTick((()=>{this.$refs.saturation.renderColor(),this.$refs.saturation.renderSlide(),this.$refs.hue.renderSlide()}))},selectColor(e){const{r:t,g:s,b:a,a:l,h:o,s:i,v:r}=K(e);Object.assign(this,{r:t,g:s,b:a,a:l,h:o,s:i,v:r}),this.setText(),this.$nextTick((()=>{this.$refs.saturation.renderColor(),this.$refs.saturation.renderSlide(),this.$refs.hue.renderSlide()}))}}});const he={class:"color-set"};de.render=function(e,a,o,i,r,n){const c=u("Saturation"),d=u("Hue"),h=u("Alpha"),p=u("Preview"),g=u("Sucker"),v=u("Box"),f=u("Colors");return t(),s("div",{class:["hu-color-picker",{light:e.isLightTheme}],style:{width:e.totalWidth+"px"}},[m("div",he,[m(c,{ref:"saturation",color:e.rgbString,hsv:e.hsv,size:e.hueHeight,onSelectSaturation:e.selectSaturation},null,8,["color","hsv","size","onSelectSaturation"]),m(d,{ref:"hue",hsv:e.hsv,width:e.hueWidth,height:e.hueHeight,onSelectHue:e.selectHue},null,8,["hsv","width","height","onSelectHue"]),m(h,{ref:"alpha",color:e.rgbString,rgba:e.rgba,width:e.hueWidth,height:e.hueHeight,onSelectAlpha:e.selectAlpha},null,8,["color","rgba","width","height","onSelectAlpha"])]),m("div",{style:{height:e.previewHeight+"px"},class:"color-show"},[m(p,{color:e.rgbaString,width:e.previewWidth,height:e.previewHeight},null,8,["color","width","height"]),e.suckerHide?l("v-if",!0):(t(),s(g,{key:0,"sucker-canvas":e.suckerCanvas,"sucker-area":e.suckerArea,onOpenSucker:e.openSucker,onSelectSucker:e.selectSucker},null,8,["sucker-canvas","sucker-area","onOpenSucker","onSelectSucker"]))],4),m(v,{name:"HEX",color:e.modelHex,onInputColor:e.inputHex},null,8,["color","onInputColor"]),m(v,{name:"RGBA",color:e.modelRgba,onInputColor:e.inputRgba},null,8,["color","onInputColor"]),m(f,{color:e.rgbaString,"colors-default":e.colorsDefault,"colors-history-key":e.colorsHistoryKey,onSelectColor:e.selectColor},null,8,["color","colors-default","colors-history-key","onSelectColor"]),l(" custom options "),F(e.$slots,"default")],6)},de.__file="src/color/ColorPicker.vue",de.install=e=>{e.component(de.name,de)};const pe=[{label:"卡片",value:"card"},{label:"间隔卡片",value:"card-gutter"},{label:"圆角",value:"rounded"}],me=[{label:"默认",value:"zoom-fade"},{label:"滑动",value:"fade-slide"},{label:"渐变",value:"fade"},{label:"底部滑出",value:"fade-bottom"},{label:"缩放消退",value:"fade-scale"}],ge=e({name:"SettingDrawer"}),ve=e({...ge,setup(e,{expose:l}){const d=_(),p=h(!1);d.themeColor&&d.setThemeColor(d.themeColor);l({open:()=>{p.value=!0}});const v=["#165DFF","#409EFF","#2d8cf0","#007AFF","#5ac8fa","#5856D6","#536dfe","#9c27b0","#AF52DE","#0096c7","#00C1D4","#34C759","#43a047","#7cb342","#c0ca33","#78DEC7","#e53935","#d81b60","#f4511e","#fb8c00","#ffb300","#fdd835","#6d4c41","#546e7a"],f=e=>{/^#[0-9A-Za-z]{6}/.test(e.hex)&&d.setThemeColor(e.hex)};return(e,l)=>{const h=u("a-divider"),b=u("a-row"),k=u("a-typography-text"),y=u("a-switch"),S=u("a-option"),C=u("a-select"),w=u("a-space"),x=u("a-drawer");return t(),s(x,{visible:p.value,"onUpdate:visible":l[2]||(l[2]=e=>p.value=e),title:"项目配置",width:"300px","unmount-on-close":"",footer:!1},{default:a((()=>[m(w,{size:15,direction:"vertical",fill:""},{default:a((()=>[m(h,{orientation:"center"},{default:a((()=>[o("系统主题")])),_:1}),m(b,{justify:"center"},{default:a((()=>[m(g(de),{theme:"dark",color:g(d).themeColor,"sucker-hide":!0,"colors-default":v,onChangeColor:f},null,8,["color"])])),_:1}),m(h,{orientation:"center"},{default:a((()=>[o("界面显示")])),_:1}),m(b,{justify:"space-between",align:"center"},{default:a((()=>[m(k,null,{default:a((()=>[o("页签显示")])),_:1}),m(y,{size:"medium","model-value":g(d).tab,onChange:l[0]||(l[0]=e=>g(d).setTabVisible(Boolean(e)))},null,8,["model-value"])])),_:1}),m(b,{justify:"space-between",align:"center"},{default:a((()=>[m(k,null,{default:a((()=>[o("页签风格")])),_:1}),m(C,{placeholder:"请选择","model-value":g(d).tabMode,disabled:!g(d).tab,style:{width:"120px"},"trigger-props":{autoFitPopupMinWidth:!0}},{default:a((()=>[(t(!0),r(c,null,n(g(pe),(e=>(t(),s(S,{key:e.value,value:e.value,onClick:t=>g(d).setTabMode(e.value)},{default:a((()=>[o(i(e.label),1)])),_:2},1032,["value","onClick"])))),128))])),_:1},8,["model-value","disabled"])])),_:1}),m(b,{justify:"space-between",align:"center"},{default:a((()=>[m(k,null,{default:a((()=>[o("动画显示")])),_:1}),m(y,{size:"medium","model-value":g(d).animate,onChange:l[1]||(l[1]=e=>g(d).setAnimateVisible(Boolean(e)))},null,8,["model-value"])])),_:1}),m(b,{justify:"space-between",align:"center"},{default:a((()=>[m(k,null,{default:a((()=>[o("动画切换类型")])),_:1}),m(C,{placeholder:"请选择","model-value":g(d).animateMode,disabled:!g(d).animate,style:{width:"120px"}},{default:a((()=>[(t(!0),r(c,null,n(g(me),(e=>(t(),s(S,{key:e.value,value:e.value,onClick:t=>g(d).setAnimateMode(e.value)},{default:a((()=>[o(i(e.label),1)])),_:2},1032,["value","onClick"])))),128))])),_:1},8,["model-value","disabled"])])),_:1})])),_:1})])),_:1},8,["visible"])}}}),fe=(e({name:"Message"}),e=>(E("data-v-b1a12b68"),e=e(),z(),e)),be=[fe((()=>H("img",{src:I},null,-1))),fe((()=>H("span",{class:"system-name"},"恶意评论检测系统",-1)))],ke=["src"],ye={class:"username"},Se={class:"doption-icon",style:{background:"rgba(var(--warning-6))"}},Ce=e({name:"Header"}),we=b(e({...Ce,setup(e){const l=f(),r=$(),{isFullScreen:n,onToggleFullScreen:c}=function(){const e=h(!1),t=()=>{e.value=B.isFullscreen};return k((()=>{B.on("change",t)})),y((()=>{B.off("change",t)})),{isFullScreen:e,onToggleFullScreen:()=>{B.toggle()}}}(),d=h(),p=()=>{l.push("/")},v=()=>{A.warning({title:"提示",content:"确认退出登录？",hideCancel:!1,closable:!0,onOk:()=>{r.logout(),l.replace("/login")}})};return(e,l)=>{const h=u("icon-fullscreen"),f=u("icon-fullscreen-exit"),b=u("a-button"),k=u("a-tooltip"),y=R,S=u("a-avatar"),C=u("icon-down"),w=u("a-row"),x=u("a-divider"),F=u("icon-export"),_=u("a-doption"),$=u("a-dropdown"),A=u("a-space"),E=u("a-layout-header");return t(),s(E,null,{default:a((()=>[H("section",{class:"system-logo",onClick:p},be),m(A,{class:"system-head",size:"medium"},{default:a((()=>[m(k,{content:"全屏切换",position:"bottom"},{default:a((()=>[m(b,{size:"mini",class:"gi_hover_btn",onClick:g(c)},{icon:a((()=>[g(n)?(t(),s(f,{key:1,size:18})):(t(),s(h,{key:0,size:18}))])),_:1},8,["onClick"])])),_:1}),m(k,{content:"主题切换",position:"bottom"},{default:a((()=>[m(y)])),_:1}),m($,{trigger:"hover"},{content:a((()=>[m(x,{style:{margin:"0"}}),m(_,{onClick:v},{icon:a((()=>[H("span",Se,[m(F)])])),default:a((()=>[o("退出登录")])),_:1})])),default:a((()=>[m(w,{align:"center",class:"user"},{default:a((()=>[m(S,{size:32},{default:a((()=>[H("img",{src:g(r).userInfo.avatar},null,8,ke)])),_:1}),H("span",ye,i(g(r).userName),1),m(C)])),_:1})])),_:1})])),_:1}),m(ve,{ref_key:"SettingDrawerRef",ref:d},null,512)])),_:1})}}}),[["__scopeId","data-v-b1a12b68"]]),xe=e({name:"Main"}),Fe=b(e({...xe,setup(e){const l=L(),o=_();return(e,i)=>{const r=u("router-view"),n=u("a-layout");return t(),s(n,{class:"main"},{default:a((()=>[m(r,null,{default:a((({Component:e,route:i})=>[m(T,{name:g(o).transitionName,mode:"out-in",appear:""},{default:a((()=>[(t(),s(O,{include:g(l).cacheList},[(t(),s(j(e),{key:i.path}))],1032,["include"]))])),_:2},1032,["name"])])),_:1})])),_:1})}}}),[["__scopeId","data-v-93e07c35"]]),_e={},He={class:"gi-more-icon-wrap"},$e=[(e=>(E("data-v-bfb62a25"),e=e(),z(),e))((()=>H("span",{class:"gi-more-icon"},[H("i",{class:"block block-top"}),H("i",{class:"block block-bottom"})],-1)))];const Ae=b(_e,[["render",function(e,s){return t(),r("span",He,$e)}],["__scopeId","data-v-bfb62a25"]]),Ee={key:0,class:"nav-tab"},ze=e({name:"NavTab"}),Le=b(e({...ze,setup(e){const i=v(),d=f(),h=L(),b=_();k((()=>{y()})),p((()=>i.path),(()=>{y()}));const y=()=>{h.addTagItem({name:i.meta.title||"未命名",path:i.path,componentName:i.name}),i.meta.keepAlive&&h.addCacheItem(String(i.name))},S=e=>{d.push({path:String(e)})};return(e,d)=>{const p=u("a-tab-pane"),v=Ae,f=u("icon-close"),k=u("a-doption"),y=u("icon-eraser"),C=u("icon-minus"),w=u("a-dropdown"),x=u("a-tabs");return g(b).tab?(t(),r("div",Ee,[m(x,{editable:"","hide-content":"",size:"medium",type:g(b).tabMode,"active-key":g(i).path,onTabClick:S,onDelete:g(h).closeCurrent},{extra:a((()=>[m(w,{trigger:"hover"},{content:a((()=>[m(k,{onClick:d[0]||(d[0]=e=>g(h).closeCurrent(g(i).path))},{icon:a((()=>[m(f)])),default:a((()=>[o("关闭当前")])),_:1}),m(k,{onClick:d[1]||(d[1]=e=>g(h).closeOther(g(i).path))},{icon:a((()=>[m(y)])),default:a((()=>[o("关闭其他")])),_:1}),m(k,{onClick:g(h).closeAll},{icon:a((()=>[m(C)])),default:a((()=>[o("关闭全部")])),_:1},8,["onClick"])])),default:a((()=>[m(v,{class:"mr"})])),_:1})])),default:a((()=>[(t(!0),r(c,null,n(g(h).tagList,(e=>(t(),s(p,{key:e.path,title:e.name,closable:"/home"!==e.path},null,8,["title","closable"])))),128))])),_:1},8,["type","active-key","onDelete"])])):l("",!0)}}}),[["__scopeId","data-v-f44c8245"]]),Te=b(e({__name:"index",setup:e=>(e,l)=>{const o=u("a-layout");return t(),s(o,{class:"layout"},{default:a((()=>[m(W),m(o,null,{default:a((()=>[m(we),m(Le),m(Fe)])),_:1})])),_:1})}}),[["__scopeId","data-v-00d42dc3"]]);export{Te as default};

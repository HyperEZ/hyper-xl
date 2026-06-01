const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/babel-Dfw06kx3.js","assets/index-BR6QgNKZ.js","assets/index-CIluoLAE.css"])))=>i.map(i=>d[i]);
var st=Object.defineProperty;var ot=(o,f,n)=>f in o?st(o,f,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[f]=n;var Ne=(o,f,n)=>ot(o,typeof f!="symbol"?f+"":f,n);import{u as it,j as e,r as _,B as lt,a as ct,b as dt,c as ut,d as gt,C as mt,e as pt,f as ht,g as ft,h as vt,D as xt,i as bt,k as yt,l as wt,m as St,n as Ft,o as Et,p as Ct,q as jt,s as Rt,t as At,v as _t,E as kt,w as Tt,F as It,x as Bt,y as Dt,z as Lt,I as Mt,A as Ot,G as $t,H as Pt,K as Nt,M as Kt,N as qt,P as zt,J as Ut,L as Ht,O as Vt,Q as Yt,R as Wt,S as Gt,T as Xt,U as Zt,V as Jt,W as Qt,X as ea,Y as ta,Z as aa,_ as ra,$ as na,a0 as sa,a1 as oa,a2 as ia,a3 as la,a4 as ca,a5 as da,a6 as ua,a7 as ga,a8 as ma,a9 as pa,aa as ha,ab as fa,ac as va,ad as xa,ae as ba,af as ya,ag as wa,ah as Sa,ai as Fa,aj as Ea,ak as Ca,al as ja,am as Ra,an as Aa,ao as _a,ap as ka,aq as Ta,ar as Ia,as as Ba,at as Da,au as La,av as Ma,aw as Oa,ax as $a,ay as Pa,az as Na,aA as Ka,aB as qa,aC as za,aD as Ua,aE as Ha,aF as Va,aG as Ya,aH as Wa,aI as Ga,aJ as Xa,aK as Za,aL as Ja,aM as Qa,aN as er,aO as tr,aP as ar,aQ as rr,aR as nr,aS as sr,aT as or,aU as ir,aV as lr,aW as cr,aX as dr,aY as ur,aZ as gr,a_ as mr,a$ as pr,b0 as hr,b1 as fr,b2 as vr,b3 as xr,b4 as br,b5 as yr,b6 as wr,b7 as Sr,b8 as Fr,b9 as Er,ba as Cr,bb as jr,bc as Rr,bd as Ar,be as _r,bf as kr,bg as Tr,bh as Ir,bi as Br,bj as Dr,bk as Lr,bl as Mr,bm as Or,bn as $r,bo as Pr,bp as Nr,bq as Kr,br as qr,bs as zr,bt as Ur,bu as Hr,bv as Vr,bw as Yr,bx as Wr,by as Gr,bz as Xr,bA as Zr,bB as Jr,bC as Qr,bD as en,bE as tn,bF as an,bG as rn,bH as nn,bI as sn,bJ as on,bK as ln,bL as cn,bM as dn,bN as un,bO as gn,bP as mn,bQ as pn,bR as hn,bS as fn,bT as vn,bU as xn,bV as We,bW as Ke,bX as bn,bY as yn}from"./index-BR6QgNKZ.js";const wn={merge:"병합",unmerge:"병합 해제",mergeCenter:"병합하고 가운데"};function Sn({selection:o,merges:f,onMergesChange:n,cellFormats:p,onCellFormatsChange:v,onMergeClearCovered:m,className:C,disabled:l,labels:g}){const y={...wn,...g},w=C?`xl-react-merge-toolbar ${C}`:"xl-react-merge-toolbar",{mergeEnabled:b,unmergeEnabled:R,handleMerge:I,handleMergeCenter:M,handleUnmerge:A}=it({selection:o,merges:f,onMergesChange:n,cellFormats:p,onCellFormatsChange:v,onMergeClearCovered:m,disabled:l});return e.jsxs("div",{className:w,"aria-disabled":!b&&!R,children:[e.jsx("button",{type:"button",className:"xl-react-merge-toolbar__button","aria-label":"Merge cells",title:"Merge cells",disabled:!b,onClick:I,children:y.merge}),e.jsx("button",{type:"button",className:"xl-react-merge-toolbar__button","aria-label":"Merge and center",title:"Merge and center",disabled:!b,onClick:M,children:y.mergeCenter}),e.jsx("button",{type:"button",className:"xl-react-merge-toolbar__button","aria-label":"Unmerge cells",title:"Unmerge cells",disabled:!R,onClick:A,children:y.unmerge})]})}function Fn(o,f,n={}){const p=[];for(const v of o.sheets){if(v.hidden&&!n.includeHidden)continue;const m=f(v);m&&p.push({...n.defaults??{},sheetName:v.name,snapshot:m})}return p}function En(o,f,n){if(!o)return n;const p=o[f];return typeof p=="number"&&Number.isFinite(p)&&p>=0?p:n}function qe(o,f,n){let p=0;for(let v=0;v<f;v++)p+=En(o,v,n);return p}function Cn({pagination:o,rowHeights:f,colWidths:n,defaultRowHeight:p,defaultColWidth:v,offsetTop:m=0,offsetLeft:C=0,className:l}){const g=_.useMemo(()=>o.rowPageBreaks.map(b=>qe(f,b,p)),[o.rowPageBreaks,f,p]),y=_.useMemo(()=>o.colPageBreaks.map(b=>qe(n,b,v)),[o.colPageBreaks,n,v]),w=["xl-react-print-pagebreaks",l].filter(Boolean).join(" ");return e.jsxs("div",{className:w,"data-testid":"xl-react-print-pagebreaks","aria-hidden":"true",children:[g.map((b,R)=>e.jsx("div",{className:"xl-react-print-pagebreak","data-axis":"row","data-testid":"xl-react-print-pagebreak-row",style:{top:`${m+b}px`}},`row-${R}`)),y.map((b,R)=>e.jsx("div",{className:"xl-react-print-pagebreak","data-axis":"col","data-testid":"xl-react-print-pagebreak-col",style:{left:`${C+b}px`}},`col-${R}`))]})}const jn=Object.freeze(Object.defineProperty({__proto__:null,BLANK_FILTER_KEY:lt,BUILTIN_CELL_STYLES:ct,BUILTIN_CELL_STYLE_LIST:dt,BUILTIN_CELL_STYLE_REGISTRY:ut,BoundedUndoStack:gt,CellFormatToolbar:mt,CellMergeToolbar:Sn,CellStyleToolbar:pt,ConditionalDataBar:ht,ConditionalFormatToolbar:ft,ConditionalIcon:vt,DEFAULT_CELL_STYLE_LABELS:xt,DEFAULT_CONDITIONAL_FORMAT_LABELS:bt,DEFAULT_FIND_REPLACE_LABELS:yt,DEFAULT_FIND_REPLACE_OPTIONS:wt,DEFAULT_HIGHLIGHT_FORMAT:St,DEFAULT_IMPORT_DIALOG_LABELS:Ft,DEFAULT_MARGINS_MM:Et,DEFAULT_MAX_IMPORT_SIZE_BYTES:Ct,DEFAULT_PIVOT_LAYOUT:jt,DEFAULT_PRINT_OPTIONS:Rt,DEFAULT_PRINT_PREVIEW_LABELS:At,DEFAULT_SHEET_TAB_BAR_LABELS:_t,EMPTY_PIVOT_CONFIG:kt,ExportButton:Tt,FORMULA_ERROR_CODES:It,FindReplaceDialog:Bt,FormulaBar:Dt,FormulaSheet:Lt,ICON_SETS:Mt,ImportDialog:Ot,ImportFileTooLargeError:$t,InvalidRegexError:Pt,KOREAN_SHEET_TAB_BAR_LABELS:Nt,MM_TO_PX:Kt,NUMBER_FORMAT_PRESETS:qt,PAPER_SIZES_MM:zt,PIVOT_AGGREGATION_LABELS:Ut,PIVOT_DATE_UNIT_LABELS:Ht,PIVOT_REPORT_LAYOUT_LABELS:Vt,PIVOT_SORT_MODE_LABELS:Yt,PIVOT_SUBTOTAL_POSITION_LABELS:Wt,PIVOT_VALUE_DISPLAY_LABELS:Gt,PRINT_PLACEHOLDERS:Xt,PageBreakOverlay:Cn,PivotBuilder:Zt,PivotChart:Jt,PivotDetailsModal:Qt,PivotRefreshScope:ea,PivotSlicer:ta,PivotSlicerScope:aa,PivotTimeline:ra,PrintPreview:na,SheetTabBar:sa,SplitPaneView:oa,ValidationDropdown:ia,WIRING_PIVOT_PRESETS:la,WIRING_PIVOT_PRESET_BY_ID:ca,WIRING_PRESET_FIELDS:da,XlReact:ua,a1ToCoord:ga,adjustFormatDecimals:ma,appendRule:pa,applyCellBorderEdges:ha,applyCellBorderPatch:fa,applyCellFormatPatch:va,applyCellStyle:xa,applyNamedCellStyle:ba,asyncRowSource:ya,buildAverageRule:wa,buildCellValueRule:Sa,buildColorScaleRule:Fa,buildDataBarRule:Ea,buildDuplicateRule:Ca,buildIconSetRule:ja,buildMergeIndex:Ra,buildPivot:Aa,buildRowTree:_a,buildTableStyleFormats:ka,buildTopBottomRule:Ta,buildWiringShipmentDataset:Ia,cellAnnotationKey:Ba,cellFormatKey:Da,cellRendererKey:La,cellValueToString:Ma,clearAllRules:Oa,clearRulesForColumns:$a,collapseAtLevels:Pa,collectRowDescendantIds:Na,combinedRowSource:Ka,compileMatcher:qa,computeAggregates:za,computeRowOutline:Ua,coordToA1:Ha,coveredCellRanges:Va,createCellStyleRegistry:Ya,createWorkbook:Wa,decreaseDecimals:Ga,defaultColumnLabel:Xa,defaultExportFilename:Za,defaultRowLabel:Ja,defineCellStyle:Qa,dynamicRowSource:er,evaluateAst:tr,evaluateConditionalFormats:ar,exportMultiSheetXlsx:rr,exportToCsv:nr,exportToXlsx:sr,extractRefs:or,filterOptions:ir,findMatches:lr,findMergeAt:cr,formatCellValue:dr,getCellStyle:ur,importFromCsv:gr,importFromXlsx:mr,increaseDecimals:pr,isFormulaError:hr,isHeaderFooterEmpty:fr,isPivotGroupedValue:vr,isRowSource:xr,isValueInList:br,listCellStyles:yr,makeConditionalCellRenderer:wr,mergeAnchorOf:Sr,mergeSelection:Fr,normalizeList:Er,normalizeMerges:Cr,normalizeOption:jr,openSheetInNewWindow:Rr,paginate:Ar,parseA1:_r,parseFormula:kr,pivotAggregate:Tr,pivotDrillDownAt:Ir,pivotDrillDownKey:Br,pivotDrillDownRows:Dr,pivotResultToChartSeries:Lr,pivotResultToGrid:Mr,processInChunks:Or,removeCellStyle:$r,replaceInValue:Pr,resolveCellAnnotation:Nr,resolveCellFormat:Kr,resolveCellRenderer:qr,resolveCellStyle:zr,resolveColumnList:Ur,resolveConditionalDecoration:Hr,resolveHeaderFooter:Vr,resolvePivotDrillDown:Yr,resolvePlaceholders:Wr,resolvePrintOptions:Gr,selectionColumnIds:Xr,shiftFormulaRefs:Zr,startPrint:Jr,staticRowSource:Qr,toggleRowCollapse:en,tokenize:tn,triggerBlobDownload:an,unmergeSelection:rn,useAsyncRowSource:nn,useDynamicRowSource:sn,useFullscreen:on,usePivotAutoRefresh:ln,usePivotRefreshAll:cn,usePivotSlicerRowPredicate:dn,usePivotSlicerScope:un,usePrintController:gn,useRowSource:mn,useWorkbook:pn,useWorkbookBroadcast:hn,valueToFilterKey:fn,workbookReducer:vn,workbookToMultiSheetEntries:Fn},Symbol.toStringTag,{value:"Module"}));var K={},ze;function Rn(){if(ze)return K;ze=1;var o=K&&K.__assign||function(){return o=Object.assign||function(s){for(var t,d=1,h=arguments.length;d<h;d++){t=arguments[d];for(var u in t)Object.prototype.hasOwnProperty.call(t,u)&&(s[u]=t[u])}return s},o.apply(this,arguments)},f=K&&K.__createBinding||(Object.create?(function(s,t,d,h){h===void 0&&(h=d);var u=Object.getOwnPropertyDescriptor(t,d);(!u||("get"in u?!t.__esModule:u.writable||u.configurable))&&(u={enumerable:!0,get:function(){return t[d]}}),Object.defineProperty(s,h,u)}):(function(s,t,d,h){h===void 0&&(h=d),s[h]=t[d]})),n=K&&K.__setModuleDefault||(Object.create?(function(s,t){Object.defineProperty(s,"default",{enumerable:!0,value:t})}):function(s,t){s.default=t}),p=K&&K.__importStar||function(s){if(s&&s.__esModule)return s;var t={};if(s!=null)for(var d in s)d!=="default"&&Object.prototype.hasOwnProperty.call(s,d)&&f(t,s,d);return n(t,s),t},v=K&&K.__rest||function(s,t){var d={};for(var h in s)Object.prototype.hasOwnProperty.call(s,h)&&t.indexOf(h)<0&&(d[h]=s[h]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,h=Object.getOwnPropertySymbols(s);u<h.length;u++)t.indexOf(h[u])<0&&Object.prototype.propertyIsEnumerable.call(s,h[u])&&(d[h[u]]=s[h[u]]);return d};Object.defineProperty(K,"__esModule",{value:!0});var m=p(xn()),C=89,l=90,g=77,y=57,w=219,b=222,R=192,I=100,M=3e3,A=typeof window<"u"&&"navigator"in window&&/Win/i.test(navigator.platform),x=typeof window<"u"&&"navigator"in window&&/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),E="npm__react-simple-code-editor__textarea",a=`
/**
 * Reset the text fill color so that placeholder is visible
 */
.`.concat(E,`:empty {
  -webkit-text-fill-color: inherit !important;
}

/**
 * Hack to apply on some CSS on IE10 and IE11
 */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /**
    * IE doesn't support '-webkit-text-fill-color'
    * So we use 'color: transparent' to make the text transparent on IE
    * Unlike other browsers, it doesn't affect caret color in IE
    */
  .`).concat(E,` {
    color: transparent !important;
  }

  .`).concat(E,`::selection {
    background-color: #accef7 !important;
    color: transparent !important;
  }
}
`),r=m.forwardRef(function(t,d){var h=t.autoFocus,u=t.disabled,k=t.form,D=t.highlight,V=t.ignoreTabKey,pe=V===void 0?!1:V,se=t.insertSpaces,Se=se===void 0?!0:se,Fe=t.maxLength,he=t.minLength,L=t.name,H=t.onBlur,X=t.onClick,ee=t.onFocus,N=t.onKeyDown,Ee=t.onKeyUp,q=t.onValueChange,Z=t.padding,O=Z===void 0?0:Z,te=t.placeholder,oe=t.preClassName,fe=t.readOnly,ie=t.required,ae=t.style,ve=t.tabSize,le=ve===void 0?2:ve,Te=t.textareaClassName,Xe=t.textareaId,Ie=t.value,Ze=v(t,["autoFocus","disabled","form","highlight","ignoreTabKey","insertSpaces","maxLength","minLength","name","onBlur","onClick","onFocus","onKeyDown","onKeyUp","onValueChange","padding","placeholder","preClassName","readOnly","required","style","tabSize","textareaClassName","textareaId","value"]),T=m.useRef({stack:[],offset:-1}),xe=m.useRef(null),Be=m.useState(!0),Je=Be[0],Qe=Be[1],De={paddingTop:typeof O=="object"?O.top:O,paddingRight:typeof O=="object"?O.right:O,paddingBottom:typeof O=="object"?O.bottom:O,paddingLeft:typeof O=="object"?O.left:O},Ce=D(Ie),Q=function(c,j){return c.substring(0,j).split(`
`)},be=m.useCallback(function(c,j){var S,F,B;j===void 0&&(j=!1);var $=T.current,W=$.stack,ce=$.offset;if(W.length&&ce>-1){T.current.stack=W.slice(0,ce+1);var de=T.current.stack.length;if(de>I){var ne=de-I;T.current.stack=W.slice(ne,de),T.current.offset=Math.max(T.current.offset-ne,0)}}var Y=Date.now();if(j){var J=T.current.stack[T.current.offset];if(J&&Y-J.timestamp<M){var ue=/[^a-z0-9]([a-z0-9]+)$/i,z=(S=Q(J.value,J.selectionStart).pop())===null||S===void 0?void 0:S.match(ue),ge=(F=Q(c.value,c.selectionStart).pop())===null||F===void 0?void 0:F.match(ue);if(z!=null&&z[1]&&(!((B=ge==null?void 0:ge[1])===null||B===void 0)&&B.startsWith(z[1]))){T.current.stack[T.current.offset]=o(o({},c),{timestamp:Y});return}}}T.current.stack.push(o(o({},c),{timestamp:Y})),T.current.offset++},[]),Le=m.useCallback(function(){var c=xe.current;if(c){var j=c.value,S=c.selectionStart,F=c.selectionEnd;be({value:j,selectionStart:S,selectionEnd:F})}},[be]),je=function(c){var j=xe.current;j&&(j.value=c.value,j.selectionStart=c.selectionStart,j.selectionEnd=c.selectionEnd,q==null||q(c.value))},re=function(c){var j=xe.current,S=T.current.stack[T.current.offset];S&&j&&(T.current.stack[T.current.offset]=o(o({},S),{selectionStart:j.selectionStart,selectionEnd:j.selectionEnd})),be(c),je(c)},et=function(){var c=T.current,j=c.stack,S=c.offset,F=j[S-1];F&&(je(F),T.current.offset=Math.max(S-1,0))},tt=function(){var c=T.current,j=c.stack,S=c.offset,F=j[S+1];F&&(je(F),T.current.offset=Math.min(S+1,j.length-1))},at=function(c){if(!(N&&(N(c),c.defaultPrevented))){c.key==="Escape"&&c.currentTarget.blur();var j=c.currentTarget,S=j.value,F=j.selectionStart,B=j.selectionEnd,$=(Se?" ":"	").repeat(le);if(c.key==="Tab"&&!pe&&Je)if(c.preventDefault(),c.shiftKey){var W=Q(S,F),ce=W.length-1,de=Q(S,B).length-1,ne=S.split(`
`).map(function(me,Oe){return Oe>=ce&&Oe<=de&&me.startsWith($)?me.substring($.length):me}).join(`
`);if(S!==ne){var Y=W[ce];re({value:ne,selectionStart:Y!=null&&Y.startsWith($)?F-$.length:F,selectionEnd:B-(S.length-ne.length)})}}else if(F!==B){var W=Q(S,F),J=W.length-1,ue=Q(S,B).length-1,Y=W[J];re({value:S.split(`
`).map(function($e,Pe){return Pe>=J&&Pe<=ue?$+$e:$e}).join(`
`),selectionStart:Y&&/\S/.test(Y)?F+$.length:F,selectionEnd:B+$.length*(ue-J+1)})}else{var z=F+$.length;re({value:S.substring(0,F)+$+S.substring(B),selectionStart:z,selectionEnd:z})}else if(c.key==="Backspace"){var ge=F!==B,nt=S.substring(0,F);if(nt.endsWith($)&&!ge){c.preventDefault();var z=F-$.length;re({value:S.substring(0,F-$.length)+S.substring(B),selectionStart:z,selectionEnd:z})}}else if(c.key==="Enter"){if(F===B){var Re=Q(S,F).pop(),ye=Re==null?void 0:Re.match(/^\s+/);if(ye!=null&&ye[0]){c.preventDefault();var Me=`
`+ye[0],z=F+Me.length;re({value:S.substring(0,F)+Me+S.substring(B),selectionStart:z,selectionEnd:z})}}}else if(c.keyCode===y||c.keyCode===w||c.keyCode===b||c.keyCode===R){var G=void 0;c.keyCode===y&&c.shiftKey?G=["(",")"]:c.keyCode===w?c.shiftKey?G=["{","}"]:G=["[","]"]:c.keyCode===b?c.shiftKey?G=['"','"']:G=["'","'"]:c.keyCode===R&&!c.shiftKey&&(G=["`","`"]),F!==B&&G&&(c.preventDefault(),re({value:S.substring(0,F)+G[0]+S.substring(F,B)+G[1]+S.substring(B),selectionStart:F,selectionEnd:B+2}))}else(x?c.metaKey&&c.keyCode===l:c.ctrlKey&&c.keyCode===l)&&!c.shiftKey&&!c.altKey?(c.preventDefault(),et()):(x?c.metaKey&&c.keyCode===l&&c.shiftKey:A?c.ctrlKey&&c.keyCode===C:c.ctrlKey&&c.keyCode===l&&c.shiftKey)&&!c.altKey?(c.preventDefault(),tt()):c.keyCode===g&&c.ctrlKey&&(!x||c.shiftKey)&&(c.preventDefault(),Qe(function(me){return!me}))}},rt=function(c){var j=c.currentTarget,S=j.value,F=j.selectionStart,B=j.selectionEnd;be({value:S,selectionStart:F,selectionEnd:B},!0),q(S)};return m.useEffect(function(){Le()},[Le]),m.useImperativeHandle(d,function(){return{get session(){return{history:T.current}},set session(c){T.current=c.history}}},[]),m.createElement("div",o({},Ze,{style:o(o({},i.container),ae)}),m.createElement("pre",o({className:oe,"aria-hidden":"true",style:o(o(o({},i.editor),i.highlight),De)},typeof Ce=="string"?{dangerouslySetInnerHTML:{__html:Ce+"<br />"}}:{children:Ce})),m.createElement("textarea",{ref:function(c){return xe.current=c},style:o(o(o({},i.editor),i.textarea),De),className:E+(Te?" ".concat(Te):""),id:Xe,value:Ie,onChange:rt,onKeyDown:at,onClick:X,onKeyUp:Ee,onFocus:ee,onBlur:H,disabled:u,form:k,maxLength:Fe,minLength:he,name:L,placeholder:te,readOnly:fe,required:ie,autoFocus:h,autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"data-gramm":!1}),m.createElement("style",{dangerouslySetInnerHTML:{__html:a}}))}),i={container:{position:"relative",textAlign:"left",boxSizing:"border-box",padding:0,overflow:"hidden"},textarea:{position:"absolute",top:0,left:0,height:"100%",width:"100%",resize:"none",color:"inherit",overflow:"hidden",MozOsxFontSmoothing:"grayscale",WebkitFontSmoothing:"antialiased",WebkitTextFillColor:"transparent"},highlight:{position:"relative",pointerEvents:"none"},editor:{margin:0,border:0,background:"none",boxSizing:"inherit",display:"inherit",fontFamily:"inherit",fontSize:"inherit",fontStyle:"inherit",fontVariantLigatures:"inherit",fontWeight:"inherit",letterSpacing:"inherit",lineHeight:"inherit",tabSize:"inherit",textIndent:"inherit",textRendering:"inherit",textTransform:"inherit",whiteSpace:"pre-wrap",wordBreak:"keep-all",overflowWrap:"break-word"}};return K.default=r,K}var An=Rn();const _n=We(An);var Ae={exports:{}},Ue;function kn(){return Ue||(Ue=1,(function(o){var f=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var n=(function(p){var v=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,m=0,C={},l={manual:p.Prism&&p.Prism.manual,disableWorkerMessageHandler:p.Prism&&p.Prism.disableWorkerMessageHandler,util:{encode:function a(r){return r instanceof g?new g(r.type,a(r.content),r.alias):Array.isArray(r)?r.map(a):r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++m}),a.__id},clone:function a(r,i){i=i||{};var s,t;switch(l.util.type(r)){case"Object":if(t=l.util.objId(r),i[t])return i[t];s={},i[t]=s;for(var d in r)r.hasOwnProperty(d)&&(s[d]=a(r[d],i));return s;case"Array":return t=l.util.objId(r),i[t]?i[t]:(s=[],i[t]=s,r.forEach(function(h,u){s[u]=a(h,i)}),s);default:return r}},getLanguage:function(a){for(;a;){var r=v.exec(a.className);if(r)return r[1].toLowerCase();a=a.parentElement}return"none"},setLanguage:function(a,r){a.className=a.className.replace(RegExp(v,"gi"),""),a.classList.add("language-"+r)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(s){var a=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(s.stack)||[])[1];if(a){var r=document.getElementsByTagName("script");for(var i in r)if(r[i].src==a)return r[i]}return null}},isActive:function(a,r,i){for(var s="no-"+r;a;){var t=a.classList;if(t.contains(r))return!0;if(t.contains(s))return!1;a=a.parentElement}return!!i}},languages:{plain:C,plaintext:C,text:C,txt:C,extend:function(a,r){var i=l.util.clone(l.languages[a]);for(var s in r)i[s]=r[s];return i},insertBefore:function(a,r,i,s){s=s||l.languages;var t=s[a],d={};for(var h in t)if(t.hasOwnProperty(h)){if(h==r)for(var u in i)i.hasOwnProperty(u)&&(d[u]=i[u]);i.hasOwnProperty(h)||(d[h]=t[h])}var k=s[a];return s[a]=d,l.languages.DFS(l.languages,function(D,V){V===k&&D!=a&&(this[D]=d)}),d},DFS:function a(r,i,s,t){t=t||{};var d=l.util.objId;for(var h in r)if(r.hasOwnProperty(h)){i.call(r,h,r[h],s||h);var u=r[h],k=l.util.type(u);k==="Object"&&!t[d(u)]?(t[d(u)]=!0,a(u,i,null,t)):k==="Array"&&!t[d(u)]&&(t[d(u)]=!0,a(u,i,h,t))}}},plugins:{},highlightAll:function(a,r){l.highlightAllUnder(document,a,r)},highlightAllUnder:function(a,r,i){var s={callback:i,container:a,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",s),s.elements=Array.prototype.slice.apply(s.container.querySelectorAll(s.selector)),l.hooks.run("before-all-elements-highlight",s);for(var t=0,d;d=s.elements[t++];)l.highlightElement(d,r===!0,s.callback)},highlightElement:function(a,r,i){var s=l.util.getLanguage(a),t=l.languages[s];l.util.setLanguage(a,s);var d=a.parentElement;d&&d.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(d,s);var h=a.textContent,u={element:a,language:s,grammar:t,code:h};function k(V){u.highlightedCode=V,l.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,l.hooks.run("after-highlight",u),l.hooks.run("complete",u),i&&i.call(u.element)}if(l.hooks.run("before-sanity-check",u),d=u.element.parentElement,d&&d.nodeName.toLowerCase()==="pre"&&!d.hasAttribute("tabindex")&&d.setAttribute("tabindex","0"),!u.code){l.hooks.run("complete",u),i&&i.call(u.element);return}if(l.hooks.run("before-highlight",u),!u.grammar){k(l.util.encode(u.code));return}if(r&&p.Worker){var D=new Worker(l.filename);D.onmessage=function(V){k(V.data)},D.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else k(l.highlight(u.code,u.grammar,u.language))},highlight:function(a,r,i){var s={code:a,grammar:r,language:i};if(l.hooks.run("before-tokenize",s),!s.grammar)throw new Error('The language "'+s.language+'" has no grammar.');return s.tokens=l.tokenize(s.code,s.grammar),l.hooks.run("after-tokenize",s),g.stringify(l.util.encode(s.tokens),s.language)},tokenize:function(a,r){var i=r.rest;if(i){for(var s in i)r[s]=i[s];delete r.rest}var t=new b;return R(t,t.head,a),w(a,t,r,t.head,0),M(t)},hooks:{all:{},add:function(a,r){var i=l.hooks.all;i[a]=i[a]||[],i[a].push(r)},run:function(a,r){var i=l.hooks.all[a];if(!(!i||!i.length))for(var s=0,t;t=i[s++];)t(r)}},Token:g};p.Prism=l;function g(a,r,i,s){this.type=a,this.content=r,this.alias=i,this.length=(s||"").length|0}g.stringify=function a(r,i){if(typeof r=="string")return r;if(Array.isArray(r)){var s="";return r.forEach(function(k){s+=a(k,i)}),s}var t={type:r.type,content:a(r.content,i),tag:"span",classes:["token",r.type],attributes:{},language:i},d=r.alias;d&&(Array.isArray(d)?Array.prototype.push.apply(t.classes,d):t.classes.push(d)),l.hooks.run("wrap",t);var h="";for(var u in t.attributes)h+=" "+u+'="'+(t.attributes[u]||"").replace(/"/g,"&quot;")+'"';return"<"+t.tag+' class="'+t.classes.join(" ")+'"'+h+">"+t.content+"</"+t.tag+">"};function y(a,r,i,s){a.lastIndex=r;var t=a.exec(i);if(t&&s&&t[1]){var d=t[1].length;t.index+=d,t[0]=t[0].slice(d)}return t}function w(a,r,i,s,t,d){for(var h in i)if(!(!i.hasOwnProperty(h)||!i[h])){var u=i[h];u=Array.isArray(u)?u:[u];for(var k=0;k<u.length;++k){if(d&&d.cause==h+","+k)return;var D=u[k],V=D.inside,pe=!!D.lookbehind,se=!!D.greedy,Se=D.alias;if(se&&!D.pattern.global){var Fe=D.pattern.toString().match(/[imsuy]*$/)[0];D.pattern=RegExp(D.pattern.source,Fe+"g")}for(var he=D.pattern||D,L=s.next,H=t;L!==r.tail&&!(d&&H>=d.reach);H+=L.value.length,L=L.next){var X=L.value;if(r.length>a.length)return;if(!(X instanceof g)){var ee=1,N;if(se){if(N=y(he,H,a,pe),!N||N.index>=a.length)break;var O=N.index,Ee=N.index+N[0].length,q=H;for(q+=L.value.length;O>=q;)L=L.next,q+=L.value.length;if(q-=L.value.length,H=q,L.value instanceof g)continue;for(var Z=L;Z!==r.tail&&(q<Ee||typeof Z.value=="string");Z=Z.next)ee++,q+=Z.value.length;ee--,X=a.slice(H,q),N.index-=H}else if(N=y(he,0,X,pe),!N)continue;var O=N.index,te=N[0],oe=X.slice(0,O),fe=X.slice(O+te.length),ie=H+X.length;d&&ie>d.reach&&(d.reach=ie);var ae=L.prev;oe&&(ae=R(r,ae,oe),H+=oe.length),I(r,ae,ee);var ve=new g(h,V?l.tokenize(te,V):te,Se,te);if(L=R(r,ae,ve),fe&&R(r,L,fe),ee>1){var le={cause:h+","+k,reach:ie};w(a,r,i,L.prev,H,le),d&&le.reach>d.reach&&(d.reach=le.reach)}}}}}}function b(){var a={value:null,prev:null,next:null},r={value:null,prev:a,next:null};a.next=r,this.head=a,this.tail=r,this.length=0}function R(a,r,i){var s=r.next,t={value:i,prev:r,next:s};return r.next=t,s.prev=t,a.length++,t}function I(a,r,i){for(var s=r.next,t=0;t<i&&s!==a.tail;t++)s=s.next;r.next=s,s.prev=r,a.length-=t}function M(a){for(var r=[],i=a.head.next;i!==a.tail;)r.push(i.value),i=i.next;return r}if(!p.document)return p.addEventListener&&(l.disableWorkerMessageHandler||p.addEventListener("message",function(a){var r=JSON.parse(a.data),i=r.language,s=r.code,t=r.immediateClose;p.postMessage(l.highlight(s,l.languages[i],i)),t&&p.close()},!1)),l;var A=l.util.currentScript();A&&(l.filename=A.src,A.hasAttribute("data-manual")&&(l.manual=!0));function x(){l.manual||l.highlightAll()}if(!l.manual){var E=document.readyState;E==="loading"||E==="interactive"&&A&&A.defer?document.addEventListener("DOMContentLoaded",x):window.requestAnimationFrame?window.requestAnimationFrame(x):window.setTimeout(x,16)}return l})(f);o.exports&&(o.exports=n),typeof Ke<"u"&&(Ke.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside["attr-value"].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside["internal-subset"].inside=n.languages.markup,n.hooks.add("wrap",function(p){p.type==="entity"&&(p.attributes.title=p.content.replace(/&amp;/,"&"))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(v,m){var C={};C["language-"+m]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[m]},C.cdata=/^<!\[CDATA\[|\]\]>$/i;var l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:C}};l["language-"+m]={pattern:/[\s\S]+/,inside:n.languages[m]};var g={};g[v]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return v}),"i"),lookbehind:!0,greedy:!0,inside:l},n.languages.insertBefore("markup","cdata",g)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(p,v){n.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+p+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[v,"language-"+v],inside:n.languages[v]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend("markup",{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,(function(p){var v=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;p.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+v.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+v.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+v.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+v.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:v,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},p.languages.css.atrule.inside.rest=p.languages.css;var m=p.languages.markup;m&&(m.tag.addInlined("style","css"),m.tag.addAttribute("style","css"))})(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend("clike",{"class-name":[n.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),n.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),n.languages.markup&&(n.languages.markup.tag.addInlined("script","javascript"),n.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),n.languages.js=n.languages.javascript,(function(){if(typeof n>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var p="Loading…",v=function(A,x){return"✖ Error "+A+" while fetching file: "+x},m="✖ Error: File does not exist or is empty",C={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},l="data-src-status",g="loading",y="loaded",w="failed",b="pre[data-src]:not(["+l+'="'+y+'"]):not(['+l+'="'+g+'"])';function R(A,x,E){var a=new XMLHttpRequest;a.open("GET",A,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?x(a.responseText):a.status>=400?E(v(a.status,a.statusText)):E(m))},a.send(null)}function I(A){var x=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A||"");if(x){var E=Number(x[1]),a=x[2],r=x[3];return a?r?[E,Number(r)]:[E,void 0]:[E,E]}}n.hooks.add("before-highlightall",function(A){A.selector+=", "+b}),n.hooks.add("before-sanity-check",function(A){var x=A.element;if(x.matches(b)){A.code="",x.setAttribute(l,g);var E=x.appendChild(document.createElement("CODE"));E.textContent=p;var a=x.getAttribute("data-src"),r=A.language;if(r==="none"){var i=(/\.(\w+)$/.exec(a)||[,"none"])[1];r=C[i]||i}n.util.setLanguage(E,r),n.util.setLanguage(x,r);var s=n.plugins.autoloader;s&&s.loadLanguages(r),R(a,function(t){x.setAttribute(l,y);var d=I(x.getAttribute("data-range"));if(d){var h=t.split(/\r\n?|\n/g),u=d[0],k=d[1]==null?h.length:d[1];u<0&&(u+=h.length),u=Math.max(0,Math.min(u-1,h.length)),k<0&&(k+=h.length),k=Math.max(0,Math.min(k,h.length)),t=h.slice(u,k).join(`
`),x.hasAttribute("data-start")||x.setAttribute("data-start",String(u+1))}E.textContent=t,n.highlightElement(E)},function(t){x.setAttribute(l,w),E.textContent=t})}}),n.plugins.fileHighlight={highlight:function(x){for(var E=(x||document).querySelectorAll(b),a=0,r;r=E[a++];)n.highlightElement(r)}};var M=!1;n.fileHighlight=function(){M||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),M=!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(Ae)),Ae.exports}var Tn=kn();const _e=We(Tn);(function(o){var f=o.util.clone(o.languages.javascript),n=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,p=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,v=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function m(g,y){return g=g.replace(/<S>/g,function(){return n}).replace(/<BRACES>/g,function(){return p}).replace(/<SPREAD>/g,function(){return v}),RegExp(g,y)}v=m(v).source,o.languages.jsx=o.languages.extend("markup",f),o.languages.jsx.tag.pattern=m(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),o.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,o.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,o.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,o.languages.jsx.tag.inside.comment=f.comment,o.languages.insertBefore("inside","attr-name",{spread:{pattern:m(/<SPREAD>/.source),inside:o.languages.jsx}},o.languages.jsx.tag),o.languages.insertBefore("inside","special-attr",{script:{pattern:m(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:o.languages.jsx}}},o.languages.jsx.tag);var C=function(g){return g?typeof g=="string"?g:typeof g.content=="string"?g.content:g.content.map(C).join(""):""},l=function(g){for(var y=[],w=0;w<g.length;w++){var b=g[w],R=!1;if(typeof b!="string"&&(b.type==="tag"&&b.content[0]&&b.content[0].type==="tag"?b.content[0].content[0].content==="</"?y.length>0&&y[y.length-1].tagName===C(b.content[0].content[1])&&y.pop():b.content[b.content.length-1].content==="/>"||y.push({tagName:C(b.content[0].content[1]),openedBraces:0}):y.length>0&&b.type==="punctuation"&&b.content==="{"?y[y.length-1].openedBraces++:y.length>0&&y[y.length-1].openedBraces>0&&b.type==="punctuation"&&b.content==="}"?y[y.length-1].openedBraces--:R=!0),(R||typeof b=="string")&&y.length>0&&y[y.length-1].openedBraces===0){var I=C(b);w<g.length-1&&(typeof g[w+1]=="string"||g[w+1].type==="plain-text")&&(I+=C(g[w+1]),g.splice(w+1,1)),w>0&&(typeof g[w-1]=="string"||g[w-1].type==="plain-text")&&(I=C(g[w-1])+I,g.splice(w-1,1),w--),g[w]=new o.Token("plain-text",I,null,I)}b.content&&typeof b.content!="string"&&l(b.content)}};o.hooks.add("after-tokenize",function(g){g.language!=="jsx"&&g.language!=="tsx"||l(g.tokens)})})(Prism);(function(o){var f=o.util.clone(o.languages.typescript);o.languages.tsx=o.languages.extend("jsx",f),delete o.languages.tsx.parameter,delete o.languages.tsx["literal-property"];var n=o.languages.tsx.tag;n.pattern=RegExp(/(^|[^\w$]|(?=<\/))/.source+"(?:"+n.pattern.source+")",n.pattern.flags),n.lookbehind=!0})(Prism);var He={},Ve;function In(){return Ve||(Ve=1,(function(o){o.languages.typescript=o.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),o.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete o.languages.typescript.parameter,delete o.languages.typescript["literal-property"];var f=o.languages.extend("typescript",{});delete f["class-name"],o.languages.typescript["class-name"].inside=f,o.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:f}}}}),o.languages.ts=o.languages.typescript})(Prism)),He}In();let we=null;function Bn(){return we||(we=bn(()=>import("./babel-Dfw06kx3.js").then(o=>o.b),__vite__mapDeps([0,1,2])).catch(o=>{throw we=null,o})),we}function Ge(){return{React:yn,Fragment:_.Fragment,useState:_.useState,useEffect:_.useEffect,useMemo:_.useMemo,useCallback:_.useCallback,useRef:_.useRef,useReducer:_.useReducer,...jn}}const Ye=Object.keys(Ge());function Dn(o,f){const n=o.transform(f,{presets:[["typescript",{isTSX:!0,allExtensions:!0}],["react",{runtime:"classic"}]],filename:"live-example.tsx"});if(!n.code)throw new Error("Babel returned empty code");return{code:n.code}}function Ln(o){const f=Ge(),n=`${o}
;return typeof Example !== "undefined" ? Example : null;`,v=new Function(...Ye,n)(...Ye.map(m=>f[m]));if(typeof v!="function")throw new Error("`Example` 컴포넌트가 정의되지 않았거나 함수가 아닙니다.");return v}class Mn extends _.Component{constructor(){super(...arguments);Ne(this,"state",{hasError:!1})}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(n){this.props.onError(n.message)}componentDidUpdate(n){n.resetKey!==this.props.resetKey&&this.setState({hasError:!1})}render(){return this.state.hasError?null:this.props.children}}const On="// `Example` 컴포넌트를 정의하면 우측에 즉시 렌더됩니다.";function $n({initialCode:o,previewHeight:f=320,debounceMs:n=250}){const[p,v]=_.useState(o),[m,C]=_.useState(o),[l,g]=_.useState({kind:"pending"}),[y,w]=_.useState(0),b=_.useRef(0);_.useEffect(()=>{const x=window.setTimeout(()=>C(p),n);return()=>window.clearTimeout(x)},[p,n]),_.useEffect(()=>{let x=!1;return g({kind:"pending"}),Bn().then(E=>{if(!x)try{const{code:a}=Dn(E,m),r=Ln(a);b.current+=1,x||g({kind:"ok",Component:r})}catch(a){x||g({kind:"error",message:a instanceof Error?a.message:String(a)})}}).catch(E=>{x||g({kind:"error",message:E instanceof Error?`Babel 로드 실패: ${E.message}`:"Babel 로드 실패"})}),()=>{x=!0}},[m]);const R=_.useCallback(()=>{v(o),w(x=>x+1)},[o]),I=_.useCallback(x=>{g(E=>E.kind==="ok"?{kind:"error",message:x}:E)},[]),M=_.useCallback(x=>{const E=_e.languages.tsx??_e.languages.javascript;return E?_e.highlight(x,E,"tsx"):x},[]),A=l.kind==="error";return e.jsxs("div",{className:"live-example","data-testid":"live-example",children:[e.jsxs("div",{className:"live-example__toolbar",children:[e.jsx("span",{className:"live-example__title",children:"라이브 예제"}),e.jsx("span",{className:"live-example__lang",children:"tsx"}),e.jsx("button",{type:"button",className:"live-example__reset",onClick:R,children:"리셋"})]}),e.jsxs("div",{className:"live-example__panes",children:[e.jsx("div",{className:"live-example__editor",style:{maxHeight:f+60},children:e.jsx(_n,{value:p,onValueChange:v,highlight:M,padding:12,tabSize:2,insertSpaces:!0,textareaClassName:"live-example__textarea",preClassName:"live-example__pre",style:{fontFamily:"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",fontSize:12.5,lineHeight:1.55,minHeight:f}})},`editor-${y}`),e.jsxs("div",{className:"live-example__preview",style:{minHeight:f,maxHeight:f+80},children:[l.kind==="pending"&&e.jsx("p",{className:"live-example__pending",children:"컴파일 중…"}),l.kind==="ok"&&e.jsx(Mn,{onError:I,resetKey:b.current,children:e.jsx(l.Component,{})}),A&&e.jsx("pre",{className:"live-example__error",role:"alert",children:l.message})]})]}),e.jsxs("p",{className:"live-example__hint",children:[On," 사용자 코드는 자동으로 격리 실행되며, 컴파일 또는 런타임 에러는 우측 영역에 표시됩니다."]})]})}const U=_.memo($n),Pn=`function Example() {
  const columns = [
    { id: 'name', accessor: (r) => r.data.name },
    { id: 'qty',  accessor: (r) => r.data.qty, dataType: 'number' },
    { id: 'price', accessor: (r) => r.data.price, dataType: 'number' },
  ];

  const rows = [
    { id: 1, data: { name: '컨테이너 A', qty: 12, price: 1500 } },
    { id: 2, data: { name: '컨테이너 B', qty: 8,  price: 2300 } },
    { id: 3, data: { name: '컨테이너 C', qty: 24, price: 980  } },
  ];

  return (
    <div style={{ width: '100%', height: 240 }}>
      <XlReact columns={columns} rows={rows} />
    </div>
  );
}
`,Nn=`function Example() {
  const [rows, setRows] = useState([
    { id: 1, data: { name: '컨테이너 A', qty: 12, price: 1500 } },
    { id: 2, data: { name: '컨테이너 B', qty: 8,  price: 2300 } },
    { id: 3, data: { name: '컨테이너 C', qty: 24, price: 980  } },
  ]);
  const [last, setLast] = useState(null);

  const columns = [
    { id: 'name', accessor: (r) => r.data.name },
    { id: 'qty',  accessor: (r) => r.data.qty, dataType: 'number' },
    { id: 'price', accessor: (r) => r.data.price, dataType: 'number' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 220 }}>
        <XlReact
          columns={columns}
          rows={rows}
          onCellChange={(change) => {
            setRows((prev) => prev.map((r, i) =>
              i === change.coord.row
                ? { ...r, data: { ...r.data, [change.columnId]: change.nextValue } }
                : r
            ));
            setLast(change);
          }}
        />
      </div>
      <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, margin: '8px 0 0' }}>
        last change: {last
          ? \`(\${last.coord.row + 1}, \${last.coord.col + 1}) [\${last.columnId}] \${String(last.prevValue)} → \${String(last.nextValue)}\`
          : '~'}
      </p>
    </div>
  );
}
`,Kn=`function Example() {
  const columns = Array.from({ length: 5 }, (_, c) => ({
    id: \`c\${c}\`,
    accessor: (r) => r.data[\`c\${c}\`],
    dataType: 'number',
  }));

  const rows = Array.from({ length: 6 }, (_, r) => ({
    id: r,
    data: Object.fromEntries(
      Array.from({ length: 5 }, (_, c) => [\`c\${c}\`, (r + 1) * (c + 1)])
    ),
  }));

  return (
    <div style={{ width: '100%', height: 280 }}>
      <XlReact
        columns={columns}
        rows={rows}
        showSelectionStats
        selectionStatsLocale="ko-KR"
      />
    </div>
  );
}
`,qn=`function Example() {
  const columns = [
    { id: 'name',  accessor: (r) => r.data.name },
    { id: 'qty',   accessor: (r) => r.data.qty,   dataType: 'number' },
    { id: 'price', accessor: (r) => r.data.price, dataType: 'number' },
  ];

  const rows = [
    { id: 1, data: { name: '컨테이너 A', qty: 12, price: 1500 } },
    { id: 2, data: { name: '컨테이너 B', qty: 8,  price: 2300 } },
    { id: 3, data: { name: '컨테이너 C', qty: 24, price: 980  } },
  ];

  const annotations = {
    '0:0': '이름 컬럼: 필수값입니다.',
    '0:1': 'MOQ 12개 이상',
    '1:2': '특가 적용',
    '2:1': '재고 부족',
  };

  return (
    <div style={{ width: '100%', height: 220 }}>
      <XlReact columns={columns} rows={rows} cellAnnotations={annotations} />
    </div>
  );
}
`,zn=`function Example() {
  const columns = [
    { id: 'item',   width: 180, accessor: (r) => r.data.item },
    { id: 'qty',    width: 90,  accessor: (r) => r.data.qty },
    { id: 'price',  width: 120, accessor: (r) => r.data.price },
    { id: 'status', width: 110, accessor: (r) => r.data.status },
    { id: 'note',   width: 220, accessor: (r) => r.data.note },
  ];

  const rows = [
    { id: 0, data: { item: '품목', qty: '수량', price: '단가(₩)', status: '상태', note: '비고' } },
    { id: 1, data: { item: '컨테이너 A', qty: 12, price: 1500, status: '활성', note: '표준 20ft 컨테이너' } },
    { id: 2, data: { item: '컨테이너 B', qty: 8,  price: 2300, status: '단종', note: '대체 품목 안내' } },
    { id: 3, data: { item: '  └ 부품 세트', qty: 4, price: 320, status: '활성', note: '상위 품목에 포함' } },
    { id: 4, data: { item: '합계',       qty: 24, price: 4120, status: '', note: '' } },
  ];

  const initialFormats = useMemo(() => {
    const map = {};
    for (let c = 0; c < columns.length; c++) {
      map[cellFormatKey(0, c)] = {
        font: { bold: true, color: '#ffffff' },
        align: { horizontal: 'center', vertical: 'middle' },
        fill: { backgroundColor: '#1f2937' },
      };
      map[cellFormatKey(4, c)] = {
        font: { bold: true },
        fill: { backgroundColor: '#fef9c3' },
        border: { top: { style: 'thick', color: '#ca8a04' } },
      };
    }
    map[cellFormatKey(1, 1)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(1, 2)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(2, 1)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(2, 2)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(3, 1)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(3, 2)] = { align: { horizontal: 'right' }, font: { family: 'Consolas, monospace' } };
    map[cellFormatKey(4, 1)] = { ...map[cellFormatKey(4, 1)], align: { horizontal: 'right' } };
    map[cellFormatKey(4, 2)] = { ...map[cellFormatKey(4, 2)], align: { horizontal: 'right' } };
    map[cellFormatKey(1, 3)] = {
      align: { horizontal: 'center' },
      fill: { backgroundColor: '#dcfce7' },
      font: { color: '#166534' },
    };
    map[cellFormatKey(2, 3)] = {
      align: { horizontal: 'center' },
      fill: { backgroundColor: '#fee2e2' },
      font: { color: '#991b1b', strikethrough: true },
    };
    map[cellFormatKey(3, 3)] = {
      align: { horizontal: 'center' },
      fill: { backgroundColor: '#dcfce7' },
      font: { color: '#166534' },
    };
    map[cellFormatKey(3, 0)] = { align: { indent: 1 }, font: { italic: true, color: '#475569' } };
    map[cellFormatKey(1, 4)] = { align: { wrap: true, vertical: 'top' } };
    return map;
  }, []);
  const [selection, setSelection] = useState(null);
  const [cellFormats, setCellFormats] = useState(initialFormats);

  return (
    <div style={{ width: '100%' }}>
      <CellFormatToolbar
        selection={selection}
        cellFormats={cellFormats}
        onCellFormatsChange={setCellFormats}
      />
      <div style={{ height: 220, marginTop: 8 }}>
        <XlReact
          columns={columns}
          rows={rows}
          cellFormats={cellFormats}
          onSelectionChange={setSelection}
        />
      </div>
    </div>
  );
}
`,Un=`function Example() {
  // numberFormat은 셀 값을 표시 문자열로 변환합니다 (cellRenderer가 없을 때).
  // increaseDecimals / decreaseDecimals 헬퍼와 NUMBER_FORMAT_PRESETS도 함께 제공됩니다.
  const [priceFormat, setPriceFormat] = useState(NUMBER_FORMAT_PRESETS.CURRENCY_KRW);

  const columns = [
    { id: 'item',  width: 150, accessor: (r) => r.data.item },
    { id: 'price', width: 150, accessor: (r) => r.data.price },
    { id: 'ratio', width: 110, accessor: (r) => r.data.ratio },
    { id: 'date',  width: 170, accessor: (r) => r.data.date },
  ];

  const rows = [
    { id: 0, data: { item: '품목', price: '단가', ratio: '비중', date: '입고일' } },
    { id: 1, data: { item: '컨테이너 A', price: 1500000, ratio: 0.3625, date: '2026-05-22' } },
    { id: 2, data: { item: '컨테이너 B', price: 2300000, ratio: 0.1875, date: '2026-04-03' } },
    { id: 3, data: { item: '환급분',     price: -98000,  ratio: 0.0150, date: '2026-03-15' } },
  ];

  const cellFormats = useMemo(() => {
    const map = {};
    for (let c = 0; c < columns.length; c++) {
      map[cellFormatKey(0, c)] = {
        font: { bold: true, color: '#ffffff' },
        align: { horizontal: 'center', vertical: 'middle' },
        fill: { backgroundColor: '#1f2937' },
      };
    }
    for (let r = 1; r <= 3; r++) {
      map[cellFormatKey(r, 1)] = { numberFormat: priceFormat, align: { horizontal: 'right' } };
      map[cellFormatKey(r, 2)] = { numberFormat: '0.0%', align: { horizontal: 'right' } };
      map[cellFormatKey(r, 3)] = { numberFormat: 'YYYY년 MM월 DD일', align: { horizontal: 'center' } };
    }
    return map;
  }, [priceFormat]);

  const btn = { padding: '4px 10px', cursor: 'pointer' };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ fontSize: 12 }}>
          단가 형식: <code style={{ fontFamily: 'ui-monospace, monospace' }}>{priceFormat}</code>
        </span>
        <button type="button" style={btn} onClick={() => setPriceFormat((f) => decreaseDecimals(f))}>소수 −</button>
        <button type="button" style={btn} onClick={() => setPriceFormat((f) => increaseDecimals(f))}>소수 +</button>
        <button type="button" style={btn} onClick={() => setPriceFormat(NUMBER_FORMAT_PRESETS.CURRENCY_KRW)}>₩ 통화</button>
        <button type="button" style={btn} onClick={() => setPriceFormat(NUMBER_FORMAT_PRESETS.THOUSANDS)}>천단위</button>
        <button type="button" style={btn} onClick={() => setPriceFormat('#,##0;[Red](#,##0)')}>음수 빨강</button>
      </div>
      <div style={{ height: 170 }}>
        <XlReact columns={columns} rows={rows} cellFormats={cellFormats} />
      </div>
      <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, margin: '8px 0 0' }}>
        formatCellValue(1234567.89, priceFormat) → "{formatCellValue(1234567.89, priceFormat)}"
      </p>
    </div>
  );
}
`,Hn=`function Example() {
  const columns = [
    { id: 'name', width: 160, accessor: (r) => r.data.name },
    { id: 'q1',   width: 90,  accessor: (r) => r.data.q1 },
    { id: 'q2',   width: 90,  accessor: (r) => r.data.q2 },
    { id: 'q3',   width: 90,  accessor: (r) => r.data.q3 },
  ];

  const [rows, setRows] = useState([
    { id: 0, data: { name: '2026 분기 매출', q1: '', q2: '', q3: '' } },
    { id: 1, data: { name: '컨테이너 A', q1: 1500, q2: 1800, q3: 1650 } },
    { id: 2, data: { name: '컨테이너 B', q1: 2300, q2: 2100, q3: 2450 } },
    { id: 3, data: { name: '컨테이너 C', q1: 980,  q2: 1020, q3: 1100 } },
  ]);

  const [selection, setSelection] = useState(null);
  // merges는 컨슈머 소유 배열입니다. 첫 행을 제목 배너로 병합해 둡니다.
  const [merges, setMerges] = useState([
    { start: { row: 0, col: 0 }, end: { row: 0, col: 3 } },
  ]);
  const [cellFormats, setCellFormats] = useState({
    '0:0': { font: { bold: true }, align: { horizontal: 'center' } },
  });

  // 엑셀처럼 병합하면 좌상단 값만 남기고 가려지는 셀은 비웁니다. 라이브러리는
  // 기본적으로 데이터를 보존하므로, onMergeClearCovered로 직접 옵트인합니다.
  const clearCovered = (ranges) =>
    setRows((prev) => {
      const next = prev.slice();
      for (const range of ranges) {
        for (let row = range.start.row; row <= range.end.row; row++) {
          for (let col = range.start.col; col <= range.end.col; col++) {
            const id = columns[col]?.id;
            if (!next[row] || !id) continue;
            next[row] = { ...next[row], data: { ...next[row].data, [id]: null } };
          }
        }
      }
      return next;
    });

  return (
    <div style={{ width: '100%' }}>
      {/* 병합 컨트롤은 CellFormatToolbar에 merges / onMergesChange를 넘기면
          서식 툴바와 한 줄로 통합됩니다 (별도 CellMergeToolbar도 사용 가능). */}
      <CellFormatToolbar
        selection={selection}
        cellFormats={cellFormats}
        onCellFormatsChange={setCellFormats}
        merges={merges}
        onMergesChange={setMerges}
        onMergeClearCovered={clearCovered}
      />
      <div style={{ height: 220, marginTop: 8 }}>
        <XlReact
          columns={columns}
          rows={rows}
          merges={merges}
          cellFormats={cellFormats}
          onSelectionChange={setSelection}
        />
      </div>
    </div>
  );
}
`,Vn=`function Example() {
  const [rows, setRows] = useState([
    { id: 1, data: { id: 1, name: '컨테이너 A', qty: 12, status: '활성' } },
    { id: 2, data: { id: 2, name: '컨테이너 B', qty: 8,  status: '잠금' } },
    { id: 3, data: { id: 3, name: '컨테이너 C', qty: 24, status: '활성' } },
  ]);
  const [event, setEvent] = useState(null);

  const columns = [
    { id: 'id',     width: 60,  readOnly: true, accessor: (r) => r.data.id },
    { id: 'name',   width: 180,                  accessor: (r) => r.data.name },
    { id: 'qty',    width: 80,  dataType: 'number', accessor: (r) => r.data.qty },
    { id: 'status', width: 80,                   accessor: (r) => r.data.status },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 200 }}>
        <XlReact
          columns={columns}
          rows={rows}
          cellProtection={(rowIndex, colIndex) => {
            const row = rows[rowIndex];
            if (!row) return false;
            if (row.data.status !== '잠금') return false;
            // 상태 컬럼은 잠금 해제용으로 항상 편집 가능
            return columns[colIndex]?.id !== 'status';
          }}
          onCellChange={(change) => {
            setRows((prev) => prev.map((r, i) =>
              i === change.coord.row
                ? { ...r, data: { ...r.data, [change.columnId]: change.nextValue } }
                : r
            ));
          }}
          onProtectedAction={setEvent}
        />
      </div>
      <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, margin: '8px 0 0', color: event ? '#9a3412' : '#65748b' }}>
        {event ? \`보호 셀로 차단됨: \${event.action} (\${event.coords.length}개)\` : '보호된 액션이 차단되면 여기에 표시됩니다.'}
      </p>
    </div>
  );
}
`,Yn=`function Example() {
  const [zoom, setZoom] = useState(1);

  const columns = [
    { id: 'name', accessor: (r) => r.data.name },
    { id: 'qty',  accessor: (r) => r.data.qty, dataType: 'number' },
  ];
  const rows = [
    { id: 1, data: { name: '컨테이너 A', qty: 12 } },
    { id: 2, data: { name: '컨테이너 B', qty: 8 } },
    { id: 3, data: { name: '컨테이너 C', qty: 24 } },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center', fontSize: 12 }}>
        <button onClick={() => setZoom(0.75)}>75%</button>
        <button onClick={() => setZoom(1)}>100%</button>
        <button onClick={() => setZoom(1.5)}>150%</button>
        <button onClick={() => setZoom(2)}>200%</button>
        <span style={{ marginLeft: 'auto', fontFamily: 'ui-monospace, monospace' }}>
          현재: {Math.round(zoom * 100)}%
        </span>
      </div>
      <div style={{ height: 240 }}>
        <XlReact columns={columns} rows={rows} zoom={zoom} onZoomChange={setZoom} />
      </div>
    </div>
  );
}
`,Wn=`function Example() {
  const baseRows = useMemo(() => {
    const products = ['컨테이너 A', '컨테이너 B', '컨테이너 C', '특수 (대형)'];
    const regions = ['서울', '부산', '인천', '대전'];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      data: {
        product: products[i % products.length],
        region: regions[i % regions.length],
        qty: 5 + (i % 25),
      },
    }));
  }, []);

  const columns = [
    { id: 'product', width: 200, accessor: (r) => r.data.product },
    { id: 'region',  width: 120, accessor: (r) => r.data.region },
    { id: 'qty',     width: 90,  accessor: (r) => r.data.qty, dataType: 'number' },
  ];

  const [sortState, setSortState] = useState([]);
  const [filterState, setFilterState] = useState({});

  const view = useMemo(() => {
    const colById = new Map(columns.map((c) => [c.id, c]));
    let v = baseRows;
    for (const [id, f] of Object.entries(filterState)) {
      const col = colById.get(id);
      if (!col) continue;
      v = v.filter((r) => f.selectedValues.has(valueToFilterKey(col.accessor(r))));
    }
    if (sortState.length > 0) {
      v = v.slice().sort((a, b) => {
        for (const k of sortState) {
          const col = colById.get(k.columnId);
          if (!col) continue;
          const av = col.accessor(a);
          const bv = col.accessor(b);
          if (av === bv) continue;
          const cmp = typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av).localeCompare(String(bv));
          return k.direction === 'asc' ? cmp : -cmp;
        }
        return 0;
      });
    }
    return v;
  }, [baseRows, sortState, filterState]);

  return (
    <div style={{ width: '100%', height: 280 }}>
      <XlReact
        columns={columns}
        rows={view}
        sortState={sortState}
        onSortStateChange={setSortState}
        filterState={filterState}
        onFilterStateChange={setFilterState}
        filterPanelRows={baseRows}
      />
    </div>
  );
}
`,Gn=`function Example() {
  const rows = useMemo(() => ([
    { id: 1, data: { item: '컨테이너 A', stock: 120, rate: 92, trend: 12 } },
    { id: 2, data: { item: '컨테이너 B', stock: 45,  rate: 58, trend: -4 } },
    { id: 3, data: { item: '컨테이너 C', stock: 200, rate: 76, trend: 3  } },
    { id: 4, data: { item: '컨테이너 D', stock: 80,  rate: 40, trend: -9 } },
    { id: 5, data: { item: '컨테이너 E', stock: 160, rate: 88, trend: 7  } },
  ]), []);

  // 데코레이션 렌더러가 row.id / column.id로 셀을 찾으므로, 평가기와 그리드는
  // 같은 컬럼 배열(같은 id·순서)을 공유해야 합니다.
  const baseColumns = useMemo(() => ([
    { id: 'item',  width: 150, accessor: (r) => r.data.item },
    { id: 'stock', width: 150, accessor: (r) => r.data.stock, dataType: 'number' },
    { id: 'rate',  width: 110, accessor: (r) => r.data.rate,  dataType: 'number' },
    { id: 'trend', width: 110, accessor: (r) => r.data.trend, dataType: 'number' },
  ]), []);

  // 규칙은 컨슈머가 소유하는 상태입니다. 툴바가 선택 영역을 대상으로 규칙을
  // 추가/삭제하면 setRules로 갱신되고, 평가기가 다시 돌아 화면이 칠해집니다.
  const [rules, setRules] = useState([
    { type: 'colorScale', columns: ['rate'] },
    { type: 'dataBar', columns: ['stock'], color: '#3b82f6' },
    { type: 'iconSet', columns: ['trend'], iconSet: 'triangles' },
  ]);
  // 툴바는 현재 선택 영역의 컬럼을 규칙 대상으로 씁니다.
  const [selection, setSelection] = useState(null);

  // 순수 평가기: 규칙 + 행 + 컬럼 → { formats, decorations }.
  const result = useMemo(
    () => evaluateConditionalFormats(rules, rows, baseColumns),
    [rules, rows, baseColumns],
  );

  // 컨슈머의 숫자 형식: 재고(stock, 컬럼 1)에 천단위 + 단위 접미사를 적용.
  // 평가기 형식과 서로 다른 셀을 건드리므로 맵 스프레드로 안전하게 합쳐집니다.
  const cellFormats = useMemo(() => ({
    ...result.formats,
    ...Object.fromEntries(
      rows.map((_, r) => [cellFormatKey(r, 1), { numberFormat: '#,##0"개"' }])
    ),
  }), [result, rows]);

  // 데이터 막대 / 아이콘은 CellFormat으로 표현할 수 없으므로 cellRenderer로 렌더.
  // cellFormats를 함께 넘기면 막대 옆 값도 셀의 numberFormat을 따릅니다.
  const renderDecoration = useMemo(
    () => makeConditionalCellRenderer(result, rows, baseColumns, { cellFormats }),
    [result, rows, baseColumns, cellFormats],
  );

  // 모든 컬럼에 렌더러를 적용합니다(장식 없는 셀은 값 표시로 통과하므로 안전).
  // 덕분에 툴바로 어느 컬럼에 데이터 막대·아이콘 규칙을 추가하든 바로 그려집니다.
  const columns = useMemo(
    () => baseColumns.map((c) => ({ ...c, cellRenderer: renderDecoration })),
    [baseColumns, renderDecoration],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: 280 }}>
      {/* 컬럼을 선택한 뒤 "조건부 서식 ▾"에서 규칙을 추가해 보세요. */}
      <ConditionalFormatToolbar
        selection={selection}
        columns={baseColumns}
        rules={rules}
        onRulesChange={setRules}
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        <XlReact
          columns={columns}
          rows={rows}
          cellFormats={cellFormats}
          onSelectionChange={setSelection}
        />
      </div>
    </div>
  );
}
`,Xn=`function Example() {
  const [rows, setRows] = useState([
    { id: 1, data: { task: '양하 작업', progress: 65,  status: 'doing' } },
    { id: 2, data: { task: '조기 출항', progress: 100, status: 'done' } },
    { id: 3, data: { task: '기상 대기', progress: 15,  status: 'delay' } },
    { id: 4, data: { task: '작업 개시', progress: 40,  status: 'doing' } },
  ]);

  // 컬럼 단위 렌더러: 셀 안에 막대그래프를 그립니다.
  // 100%=초록, 30% 미만=빨강, 그 외 파랑 (값에 따라 색이 바뀝니다).
  const ProgressBar = ({ value }) => {
    const pct = Math.max(0, Math.min(100, Number(value) || 0));
    const color = pct >= 100 ? '#16a34a' : pct < 30 ? '#dc2626' : '#0d6efd';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
        <div style={{ flex: 1, height: 8, background: '#eef0f2', overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: color }} />
        </div>
        <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12, minWidth: 36, textAlign: 'right', color: '#9ca3af' }}>
          {pct + '%'}
        </span>
      </div>
    );
  };

  // 컬럼 단위 렌더러: 상태 라벨(뱃지).
  const StatusBadge = ({ value }) => {
    const map = {
      done:  ['완료', '#0f7b3b', '#e7f6ec'],
      doing: ['진행중', '#0d4fbd', '#e8f0fe'],
      delay: ['지연', '#b91c1c', '#fdeaea'],
      todo:  ['대기', '#5b6470', '#f1f2f4'],
    };
    const [label, fg, bg] = map[value] || [String(value), '#5b6470', '#f1f2f4'];
    return <span style={{ color: fg, background: bg, padding: '2px 8px', fontSize: 12 }}>{label}</span>;
  };

  // 편집 모드 렌더러(Editor Renderer): 표시(막대)와 분리된 숫자 입력 에디터.
  // 0~100 값을 직접 입력합니다. Enter 또는 다른 셀 클릭(blur)으로 저장, Esc로 취소.
  // 타이핑으로 진입(overwrite)하면 그 키로 입력칸을 채웁니다.
  const ProgressEditor = ({ value, mode, initialDraft, onCommit, onCancel }) => {
    const seed = mode === 'overwrite' && initialDraft ? initialDraft : String(Number(value) || 0);
    const [draft, setDraft] = useState(seed);
    const commit = (nav) => onCommit(Math.max(0, Math.min(100, Math.round(Number(draft) || 0))), nav);
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          width: '100%', height: '100%', padding: '0 8px',
          boxSizing: 'border-box', background: '#fff', border: '2px solid #0d6efd',
        }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) commit(); }}
      >
        <input
          type="number" min={0} max={100} value={draft} autoFocus
          onFocus={mode === 'edit' ? (e) => e.target.select() : undefined}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') commit('enter'); if (e.key === 'Escape') onCancel(); }}
          style={{ width: 64 }}
        />
        <span style={{ fontSize: 12, color: '#9ca3af' }}>%</span>
      </div>
    );
  };

  const columns = [
    { id: 'task',     width: 150, accessor: (r) => r.data.task },
    { id: 'progress', width: 230, dataType: 'number', accessor: (r) => r.data.progress, cellRenderer: ProgressBar, cellEditor: ProgressEditor },
    { id: 'status',   width: 90,  accessor: (r) => r.data.status, cellRenderer: StatusBadge },
  ];

  // 셀 단위 override: 첫 행 progress 셀만 컬럼 렌더러 대신 강조 표시.
  // (편집은 컬럼의 cellEditor를 그대로 사용: 표시/편집이 독립적임을 보여줍니다.)
  const cellRenderers = {
    '0:1': ({ value }) => (
      <span style={{ color: '#0d4fbd', fontWeight: 700, display: 'flex', alignItems: 'center', width: '100%' }}>
        {'★ 우선 (' + String(value) + '%)'}
      </span>
    ),
  };

  return (
    <div style={{ width: '100%', height: 230 }}>
      {/* progress 셀을 더블클릭하면 슬라이더 에디터가 열립니다. */}
      <XlReact
        columns={columns}
        rows={rows}
        cellRenderers={cellRenderers}
        onCellChange={(change) => {
          setRows((prev) => prev.map((r, i) =>
            i === change.coord.row
              ? { ...r, data: { ...r.data, [change.columnId]: change.nextValue } }
              : r
          ));
        }}
      />
    </div>
  );
}
`,Zn=`function Example() {
  // FormulaSheet: raw 입력 + 의존 그래프를 보관하는 컨슈머 소유 헬퍼.
  // 셀에 =A1+B1 형태로 입력하면 즉시 평가되고, 의존 셀이 바뀌면 자동으로 재계산.
  // $A$1 처럼 $를 붙이면 절대 참조가 되어 자동 채우기 시 위치가 고정됩니다.
  const sheetRef = useRef(null);
  if (!sheetRef.current) {
    const s = new FormulaSheet();
    // 헤더 행
    s.setRaw({ row: 0, col: 0 }, '이름');
    s.setRaw({ row: 0, col: 1 }, '수량');
    s.setRaw({ row: 0, col: 2 }, '단가');
    s.setRaw({ row: 0, col: 3 }, '합계(부가세 포함)');
    // 부가세율: $B$2 로 고정 참조
    s.setRaw({ row: 1, col: 0 }, '부가세율');
    s.setRaw({ row: 1, col: 1 }, 0.1);
    // 데이터 행: 드래그로 채워보면 $B$2 는 고정, B/C 참조만 행에 맞춰 이동
    s.setRaw({ row: 2, col: 0 }, '컨테이너 A');
    s.setRaw({ row: 2, col: 1 }, 12);
    s.setRaw({ row: 2, col: 2 }, 1500);
    s.setRaw({ row: 2, col: 3 }, '=B3*C3*(1+$B$2)');
    s.setRaw({ row: 3, col: 0 }, '컨테이너 B');
    s.setRaw({ row: 3, col: 1 }, 8);
    s.setRaw({ row: 3, col: 2 }, 2300);
    s.setRaw({ row: 3, col: 3 }, '=B4*C4*(1+$B$2)');
    s.setRaw({ row: 4, col: 0 }, '소계');
    s.setRaw({ row: 4, col: 3 }, '=D3+D4');
    sheetRef.current = s;
  }

  const buildRows = () => Array.from({ length: 5 }, (_, r) => {
    const data = {};
    for (let c = 0; c < 4; c++) {
      data['c' + c] = sheetRef.current.getRaw({ row: r, col: c });
    }
    return { id: r, data };
  });

  const [rows, setRows] = useState(buildRows);

  const columns = useMemo(() => {
    const renderCell = ({ rowIndex, columnIndex }) => {
      const display = sheetRef.current.getDisplay({ row: rowIndex, col: columnIndex });
      return display == null ? '' : String(display);
    };
    return Array.from({ length: 4 }, (_, c) => ({
      id: 'c' + c,
      width: 140,
      accessor: (r) => r.data['c' + c],
      cellRenderer: renderCell,
    }));
  }, []);

  return (
    <div style={{ width: '100%', height: 240 }}>
      <XlReact
        columns={columns}
        rows={rows}
        onCellChange={(change) => {
          const raw = change.nextValue;
          const normalized = raw == null
            ? null
            : typeof raw === 'number' ? raw : String(raw);
          sheetRef.current.setRaw(change.coord, normalized);
          setRows(buildRows());
        }}
      />
    </div>
  );
}
`,ke=[{id:"introduction",title:"소개"},{id:"quick-start",title:"빠른 시작"},{id:"editing",title:"편집 & 검증"},{id:"aggregation",title:"선택 영역 집계"},{id:"sortFilter",title:"정렬 & 필터"},{id:"formatting",title:"셀 서식"},{id:"numberFormat",title:"숫자 형식"},{id:"conditionalFormat",title:"조건부 서식"},{id:"customRenderer",title:"커스텀 셀 렌더러"},{id:"merge",title:"셀 병합"},{id:"annotation",title:"셀 주석"},{id:"protection",title:"셀 보호"},{id:"formula",title:"수식 엔진"},{id:"zoom",title:"시트 배율"},{id:"how-it-works",title:"라이브 에디터 동작 방식"}];function es(){var v;const[o,f]=_.useState(((v=ke[0])==null?void 0:v.id)??""),n=_.useRef(null),p=_.useRef(null);return _.useEffect(()=>{const m=n.current;if(!m)return;const C=ke.map(g=>[g.id,document.getElementById(`ref-${g.id}`)]).filter(g=>g[1]!==null),l=()=>{const y=m.getBoundingClientRect();let w=null;for(const[R,I]of C){const M=I.getBoundingClientRect().top-y.top;M<=80&&(!w||M>w.y)&&(w={id:R,y:M})}if(m.scrollTop+m.clientHeight>=m.scrollHeight-2){const R=p.current;if(R){const M=document.getElementById(`ref-${R}`);if(M){const A=M.getBoundingClientRect();if(A.bottom>y.top&&A.top<y.bottom){f(R);return}}p.current=null}const I=C[C.length-1];if(I){f(I[0]);return}}else p.current&&w&&w.id!==p.current&&(p.current=null);w&&f(w.id)};return l(),m.addEventListener("scroll",l,{passive:!0}),()=>m.removeEventListener("scroll",l)},[]),e.jsxs("div",{className:"ref-shell",children:[e.jsxs("nav",{className:"ref-sidebar","aria-label":"레퍼런스 내비게이션",children:[e.jsx("a",{className:"ref-sidebar__home",href:"#/demo",children:"→ 라이브 데모 보기"}),e.jsx("h2",{className:"ref-sidebar__title",children:"hyper-xl"}),e.jsx("p",{className:"ref-sidebar__version",children:"레퍼런스 · 라이브 에디터"}),e.jsx("ul",{children:ke.map(m=>e.jsx("li",{children:e.jsx("a",{href:`#/reference/${m.id}`,className:o===m.id?"is-active":void 0,onClick:C=>{var l;C.preventDefault(),p.current=m.id,(l=document.getElementById(`ref-${m.id}`))==null||l.scrollIntoView({behavior:"smooth",block:"start"}),f(m.id),window.history.replaceState(null,"",`#/reference/${m.id}`)},children:m.title})},m.id))})]}),e.jsxs("main",{className:"ref-main",ref:n,children:[e.jsxs("header",{className:"ref-header",children:[e.jsx("h1",{children:"hyper-xl 라이브 레퍼런스"}),e.jsxs("p",{children:["각 섹션의 코드는 좌측 에디터에서 즉시 편집할 수 있고, 우측 영역에 실제 hyper-xl로 렌더링됩니다. 모든 예제는 ",e.jsx("code",{children:"Example"}),"이라는 이름의 함수 컴포넌트를 정의하며, 이 이름은 그대로 두어야 합니다."]})]}),e.jsxs(P,{id:"introduction",title:"소개",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"hyper-xl"}),"는 React에서 엑셀과 동일한 그리드 UX를 제공합니다. 셀 선택, 편집, 클립보드, 채우기, 정렬·필터, 시트 배율, 주석, 보호까지 모든 코어 기능이 하나의 컨트롤드 컴포넌트로 노출됩니다."]}),e.jsxs("p",{children:["아래 예제들은 이 페이지의 ",e.jsx("strong",{children:"실제 라이브러리 인스턴스"}),"에 마운트되어 있고, 여러분이 코드를 수정하면 그 자리에서 다시 컴파일·렌더됩니다."]})]}),e.jsxs(P,{id:"quick-start",title:"빠른 시작",children:[e.jsxs("p",{children:[e.jsx("code",{children:"columns"}),"와 ",e.jsx("code",{children:"rows"}),"만 넘기면 가장 단순한 그리드가 동작합니다."," ",e.jsx("code",{children:"Column.accessor"}),"가 각 셀의 값을 반환하고, ",e.jsx("code",{children:"Row.data"}),"는 컨슈머 소유의 불투명 데이터입니다. 아래 코드를 자유롭게 수정해 보세요. 배열에 항목을 추가하거나 행을 늘려도 즉시 반영됩니다. 컴파일 에러나 런타임 에러는 우측 영역에 메시지로 표시됩니다."]}),e.jsx(U,{initialCode:Pn,previewHeight:280})]}),e.jsxs(P,{id:"editing",title:"편집 & 검증",children:[e.jsxs("p",{children:[e.jsx("code",{children:"onCellChange"}),"를 와이어하면 그리드가 편집 모드로 진입합니다. F2 또는 더블클릭으로 편집 시작, Enter로 확정, Esc로 취소. 모든 변경은"," ",e.jsx("code",{children:"{ coord, columnId, prevValue, nextValue }"})," 페이로드로 전달됩니다."]}),e.jsx(U,{initialCode:Nn,previewHeight:280})]}),e.jsxs(P,{id:"aggregation",title:"선택 영역 집계",children:[e.jsxs("p",{children:["2개 이상의 셀을 드래그로 선택하면 좌하단 상태 표시줄에 실시간 SUM / AVG / COUNT가 노출됩니다. 숫자가 아닌 셀은 SUM/AVG에서 제외, 빈 셀은 평균 분모에서 제외: Excel"," ",e.jsx("code",{children:"COUNTA"}),"와 동일한 규칙입니다."]}),e.jsx(U,{initialCode:Kn,previewHeight:320})]}),e.jsxs(P,{id:"sortFilter",title:"정렬 & 필터",children:[e.jsxs("p",{children:["컨트롤드 정렬·필터. 헤더의 ↕ 버튼으로 단일 컬럼 정렬, Shift+클릭으로 다중 정렬 키 추가, ⏷ 버튼으로 값 필터 드롭다운. 그리드는 행을 직접 재정렬하지 않고 ",e.jsx("code",{children:"SortState"}),"·",e.jsx("code",{children:"FilterState"}),"를 콜백으로 노출: 컨슈머가 정렬·필터된 결과 배열을 다시 전달합니다."]}),e.jsx(U,{initialCode:Wn,previewHeight:320})]}),e.jsxs(P,{id:"formatting",title:"셀 서식",children:[e.jsxs("p",{children:[e.jsx("code",{children:"cellFormats"}),"는 셀별 글꼴, 정렬, 채우기, 테두리를 그리는 컨슈머 소유 모델입니다. 라이브러리는 선택 영역을 받아 ",e.jsx("code",{children:"CellFormatsMap"}),"을 갱신하는"," ",e.jsx("code",{children:"CellFormatToolbar"}),"도 함께 제공합니다. 툴바에는"," ",e.jsx("a",{href:"#/reference/numberFormat",children:"숫자 형식"})," 드롭다운과 소수 자릿수 증감 버튼도 포함되어, 단가 같은 숫자 셀을 선택하고 통화·백분율 형식을 바로 적용할 수 있습니다."]}),e.jsxs("p",{children:["맵은 ",e.jsx("code",{children:"'row:col'"})," 키 또는 ",e.jsx("code",{children:"cellFormatKey(row, col)"}),"로 만들고, toolbar 편집에는 sparse ",e.jsx("code",{children:"CellFormatsMap"}),"을 넘깁니다. 함수 resolver 형태는 보이는 셀마다 호출되므로 O(1)을 유지해야 하며, toolbar처럼 직접 갱신할 수는 없습니다."]}),e.jsx(U,{initialCode:zn,previewHeight:280})]}),e.jsxs(P,{id:"numberFormat",title:"숫자 형식",children:[e.jsxs("p",{children:[e.jsx("code",{children:"cellFormat.numberFormat"}),"에 Excel 형식 코드를 지정하면 셀 값이 표시 문자열로 변환됩니다 (",e.jsx("code",{children:"cellRenderer"}),"가 없을 때만 적용되며, 편집 시에는 항상 원본 값을 보여줍니다). 변환은 순수 함수 ",e.jsx("code",{children:"formatCellValue(value, format)"}),"가 담당하므로 UI 없이도 단독으로 쓸 수 있습니다."]}),e.jsxs("p",{children:["통화·백분율·날짜·천단위·과학적 표기와 4-섹션 사용자 지정 코드(",e.jsx("code",{children:"양수;음수;0;텍스트"}),")를 지원합니다. 자주 쓰는 형식은"," ",e.jsx("code",{children:"NUMBER_FORMAT_PRESETS"})," 상수로, 소수 자릿수 증감은"," ",e.jsx("code",{children:"increaseDecimals"}),"·",e.jsx("code",{children:"decreaseDecimals"})," 헬퍼로 제공됩니다. 그룹 구분자(",e.jsx("code",{children:","}),")와 소수점(",e.jsx("code",{children:"."}),")은 로캘과 무관하게 고정되며, 로캘은 월·요일 이름에만 영향을 줍니다."]}),e.jsx(U,{initialCode:Un,previewHeight:300})]}),e.jsxs(P,{id:"conditionalFormat",title:"조건부 서식",children:[e.jsxs("p",{children:[e.jsx("code",{children:"evaluateConditionalFormats(rules, rows, columns)"}),"는 규칙 목록을 받아 셀별"," ",e.jsx("code",{children:"CellFormat"})," 맵(",e.jsx("code",{children:"formats"}),")과 셀 장식 맵(",e.jsx("code",{children:"decorations"}),")을 돌려주는 순수 함수입니다. 그리드 상태에 의존하지 않고 각 컬럼의"," ",e.jsx("code",{children:"accessor"}),"가 돌려주는 원본 값으로 비교하므로 단위 테스트가 쉽습니다."," ",e.jsx("code",{children:"formats"}),"는 ",e.jsx("code",{children:"cellFormats"})," prop에 그대로 연결합니다."]}),e.jsxs("p",{children:["값 비교(이상/이하/사이), 상위·하위 N, 평균 초과·미만, 중복·고유, 텍스트(포함/시작/끝), 날짜(오늘/이번 주/지난 달/지난 7일), 색조(Color Scale)는 모두 ",e.jsx("code",{children:"CellFormat"}),"으로 환원됩니다. ",e.jsx("code",{children:"CellFormat"}),"으로 표현할 수 없는 데이터 막대와 아이콘 세트는"," ",e.jsx("code",{children:"decorations"}),"로 분리되어, ",e.jsx("code",{children:"makeConditionalCellRenderer"}),"가 만든"," ",e.jsx("code",{children:"cellRenderer"}),"로 셀에 그려집니다. 데이터 막대·아이콘 옆 값은 같은 셀의"," ",e.jsx("code",{children:"numberFormat"}),"을 그대로 따릅니다(",e.jsx("code",{children:"cellFormats"}),"를 넘긴 경우). 규칙은 배열 순서대로 우선순위가 적용되며(앞이 높음), ",e.jsx("code",{children:"stopIfTrue"}),"로 해당 셀의 하위 규칙 적용을 멈출 수 있습니다."]}),e.jsxs("p",{children:["엑셀식 ",e.jsx("code",{children:"ConditionalFormatToolbar"}),"는 규칙 배열을 직접 다루는 컨트롤드 컴포넌트입니다. 현재 ",e.jsx("code",{children:"selection"}),"·",e.jsx("code",{children:"columns"}),"·",e.jsx("code",{children:"rules"}),"와"," ",e.jsx("code",{children:"onRulesChange"}),"를 넘기면, 드롭다운에서 선택 영역의 컬럼을 대상으로 셀 강조(보다 큼·작음·사이), 상위/하위·평균·중복·고유, 데이터 막대·색조·아이콘 세트 규칙을 추가하거나 규칙을 지울 수 있습니다. 아래 예제에서 컬럼을 선택하고 직접 적용해 보세요."]}),e.jsx(U,{initialCode:Gn,previewHeight:340})]}),e.jsxs(P,{id:"customRenderer",title:"커스텀 셀 렌더러",children:[e.jsxs("p",{children:["셀 내부에 막대그래프·뱃지·스파크라인 등 임의의 React 요소를 직접 그릴 수 있습니다. 렌더러는 ",e.jsx("strong",{children:"두 레벨"}),"로 지정합니다. 컬럼 단위"," ",e.jsx("code",{children:"Column.cellRenderer"}),"는 컬럼의 모든 셀에 적용되고, 셀 단위"," ",e.jsx("code",{children:"XlReact.cellRenderers"}),"는 특정 셀만 덮어씁니다(셀 단위가 우선)."," ",e.jsx("code",{children:"cellRenderers"}),"는 ",e.jsx("code",{children:"{ 'row:col': renderer }"})," 맵 또는"," ",e.jsx("code",{children:"(rowIndex, columnIndex) => renderer | undefined"})," 함수 형태입니다."]}),e.jsxs("p",{children:["모든 렌더러는 ",e.jsx("code",{children:"{ value, row, column, rowIndex, columnIndex, isEditing }"})," ","props를 받습니다. ",e.jsx("strong",{children:"표시 모드와 편집 모드는 분리"}),"됩니다."," ",e.jsx("code",{children:"Column.cellEditor"}),"(Editor Renderer)를 지정하면 편집 진입 시 기본 입력창 대신 그 컴포넌트가 셀 위에 떠서 렌더됩니다. 에디터는 현재 값과 ",e.jsx("code",{children:"onCommit(next)"}),"·",e.jsx("code",{children:"onCancel()"}),"을 받아 직접 키보드·포커스를 관리하며, ",e.jsx("code",{children:"onCommit"}),"으로 넘긴 값은 일반 ",e.jsx("code",{children:"onCellChange"})," 파이프라인으로 그대로 흘러갑니다(문자열 변환 없음). 렌더러는 가상 스크롤과 호환되며 셀 단위로 메모이즈되므로, 안정적인 함수 참조(모듈 스코프 또는 ",e.jsx("code",{children:"useMemo"}),")를 넘기면 불필요한 리렌더를 피할 수 있습니다."]}),e.jsxs("p",{children:["아래 예제: ",e.jsx("code",{children:"progress"})," 컬럼은 막대그래프로 표시되고, 첫 행만 셀 단위 렌더러로 강조됩니다. ",e.jsx("code",{children:"status"})," 컬럼은 뱃지로 표시됩니다. progress 셀을 더블클릭하면 슬라이더 에디터(Editor Renderer)가 열립니다."]}),e.jsx(U,{initialCode:Xn,previewHeight:300})]}),e.jsxs(P,{id:"merge",title:"셀 병합",children:[e.jsxs("p",{children:[e.jsx("code",{children:"merges"}),"는 컨슈머 소유의 직사각형 범위 배열입니다. 각 범위는 좌상단"," ",e.jsx("em",{children:"앵커"})," 셀 하나로 합쳐져 영역 전체를 차지하며, 가려진 셀은 렌더되지 않습니다. 라이브러리는 선택 영역을 받아 병합/해제/병합하고 가운데를 적용하는"," ",e.jsx("code",{children:"CellMergeToolbar"}),"도 함께 제공합니다 (순수 헬퍼 ",e.jsx("code",{children:"mergeSelection"}),"·",e.jsx("code",{children:"unmergeSelection"}),"로 직접 만들 수도 있습니다)."]}),e.jsxs("p",{children:["병합 셀 내 아무 곳이나 클릭하면 영역 전체가 선택되고 활성 셀은 앵커가 됩니다. 방향키 내비게이션은 병합 영역을 건너뛰며, 앵커가 화면 밖으로 스크롤돼도 영역이 보이는 한 렌더됩니다. ",e.jsx("code",{children:"merges"})," 배열은 렌더 간 참조를 안정적으로 유지하세요."]}),e.jsx(U,{initialCode:Hn,previewHeight:280})]}),e.jsxs(P,{id:"annotation",title:"셀 주석",children:[e.jsxs("p",{children:["개발자가 주입하는 read-only 셀별 툴팁. ",e.jsx("code",{children:"{ 'row:col': '메시지' }"})," 형태의 맵, 또는 ",e.jsx("code",{children:"(row, col) => string"})," 함수로 정의합니다. 주석이 있는 셀은 우상단에 작은 삼각형 인디케이터가 표시됩니다."]}),e.jsx(U,{initialCode:qn,previewHeight:260})]}),e.jsxs(P,{id:"protection",title:"셀 보호",children:[e.jsxs("p",{children:[e.jsx("code",{children:"cellProtection"})," 술어 또는 ",e.jsx("code",{children:"Column.readOnly"}),"로 셀을 잠그면 편집·삭제·붙여넣기·채우기·잘라내기 등 모든 사용자 mutation이 차단됩니다. 차단된 액션은"," ",e.jsx("code",{children:"onProtectedAction"})," 콜백으로 보고됩니다."]}),e.jsx(U,{initialCode:Vn,previewHeight:260})]}),e.jsxs(P,{id:"formula",title:"수식 엔진",children:[e.jsxs("p",{children:["셀에 ",e.jsx("code",{children:"=A1+B1"}),", ",e.jsx("code",{children:"=A1*B1/2"})," 같은 사칙연산 + 셀 참조 수식을 입력하면 즉시 평가됩니다. 의존하는 셀이 바뀌면 자동으로 재계산되고, 0으로 나누면"," ",e.jsx("code",{children:"#DIV/0!"}),", 자기 자신을 참조하면 ",e.jsx("code",{children:"#CIRCULAR!"}),", 정의되지 않은 이름은"," ",e.jsx("code",{children:"#NAME?"}),"가 표시됩니다."]}),e.jsxs("p",{children:[e.jsx("code",{children:"$"}),"를 앞에 붙이면 절대 참조(",e.jsx("code",{children:"=$A$1"}),", ",e.jsx("code",{children:"=$A1"}),","," ",e.jsx("code",{children:"=A$1"}),")가 되어 자동 채우기 시 위치가 고정되고, 그 외의 참조는 끌어내린 칸 수만큼 자동으로 이동합니다. Excel과 동일한 동작입니다. 라이브러리는"," ",e.jsx("code",{children:"shiftFormulaRefs(formula, deltaRow, deltaCol)"}),"를 export하므로 임의의 변환도 가능합니다."]}),e.jsxs("p",{children:["그리드는 ",e.jsx("strong",{children:"표시 전용"}),"입니다. 컨슈머는 ",e.jsx("code",{children:"FormulaSheet"}),"(라이브러리 export)를 ref로 보관하고, ",e.jsx("code",{children:"onCellChange"}),"로 raw 입력을 시트에 흘려보내면 시트가 의존 그래프를 따라 계산값을 갱신합니다. 표시는 컬럼 단위"," ",e.jsx("code",{children:"cellRenderer"}),"가 ",e.jsx("code",{children:"sheet.getDisplay()"}),"를 호출해 그리고, 편집 시에는 row 데이터에 보관된 raw 텍스트(예: ",e.jsx("code",{children:"=B2*C2"}),")가 에디터에 그대로 노출됩니다."]}),e.jsx(U,{initialCode:Zn,previewHeight:300})]}),e.jsxs(P,{id:"zoom",title:"시트 배율",children:[e.jsxs("p",{children:["10% ~ 400% 시트 배율. 우하단 위젯, Ctrl+휠, 또는 외부 컨트롤(아래 버튼들)로 변경할 수 있습니다. ",e.jsx("code",{children:"zoom"}),"은 행 높이·컬럼 너비·폰트 크기 모두를 선형으로 스케일하므로 가상화 좌표는 픽셀 정렬을 유지합니다."]}),e.jsx(U,{initialCode:Yn,previewHeight:300})]}),e.jsxs(P,{id:"how-it-works",title:"라이브 에디터 동작 방식",children:[e.jsx("h3",{children:"스코프"}),e.jsxs("p",{children:["에디터 안에서는 ESM ",e.jsx("code",{children:"import"})," 문 없이 다음 식별자를 바로 사용할 수 있습니다:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"React"}),": ",e.jsx("code",{children:"useState"}),", ",e.jsx("code",{children:"useEffect"}),","," ",e.jsx("code",{children:"useMemo"}),", ",e.jsx("code",{children:"useCallback"}),", ",e.jsx("code",{children:"useRef"}),","," ",e.jsx("code",{children:"useReducer"}),", ",e.jsx("code",{children:"Fragment"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"hyper-xl"})," 전체 export: ",e.jsx("code",{children:"XlReact"}),","," ",e.jsx("code",{children:"computeAggregates"}),", ",e.jsx("code",{children:"valueToFilterKey"}),","," ",e.jsx("code",{children:"BoundedUndoStack"}),", ",e.jsx("code",{children:"processInChunks"})," 등"]})]}),e.jsx("h3",{children:"제약"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["사용자 코드는 반드시 ",e.jsx("code",{children:"Example"}),"이라는 식별자로 함수 컴포넌트를 정의해야 합니다. (러너가 그 이름을 추출해서 렌더합니다.)"]}),e.jsxs("li",{children:["브라우저에서 Babel standalone으로 TSX → JS 변환을 수행합니다. 변환된 코드는"," ",e.jsx("code",{children:"new Function"}),"으로 격리 실행됩니다."]}),e.jsx("li",{children:"에러는 React error boundary로 캡처되어 우측 영역에 텍스트로 표시됩니다."})]})]}),e.jsx("footer",{className:"ref-footer",children:"hyper-xl 라이브 레퍼런스 · 실제 라이브러리 인스턴스로 구동되는 인터랙티브 문서."})]})]})}function P({id:o,title:f,children:n}){return e.jsxs("section",{className:"ref-section",id:`ref-${o}`,children:[e.jsx("h2",{children:f}),n]})}export{ke as SECTIONS,es as default};

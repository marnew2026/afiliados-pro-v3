(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(o){if(o.ep)return;o.ep=!0;const l=t(o);fetch(o.href,l)}})();function nI(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Pf={exports:{}},ja={},kf={exports:{}},Ae={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Mg;function rI(){if(Mg)return Ae;Mg=1;var n=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),y=Symbol.for("react.memo"),E=Symbol.for("react.lazy"),w=Symbol.iterator;function A(k){return k===null||typeof k!="object"?null:(k=w&&k[w]||k["@@iterator"],typeof k=="function"?k:null)}var b={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},H=Object.assign,$={};function z(k,K,ce){this.props=k,this.context=K,this.refs=$,this.updater=ce||b}z.prototype.isReactComponent={},z.prototype.setState=function(k,K){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,K,"setState")},z.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function Y(){}Y.prototype=z.prototype;function te(k,K,ce){this.props=k,this.context=K,this.refs=$,this.updater=ce||b}var se=te.prototype=new Y;se.constructor=te,H(se,z.prototype),se.isPureReactComponent=!0;var ve=Array.isArray,ye=Object.prototype.hasOwnProperty,Ie={current:null},N={key:!0,ref:!0,__self:!0,__source:!0};function S(k,K,ce){var Re,Se={},Ue=null,Ne=null;if(K!=null)for(Re in K.ref!==void 0&&(Ne=K.ref),K.key!==void 0&&(Ue=""+K.key),K)ye.call(K,Re)&&!N.hasOwnProperty(Re)&&(Se[Re]=K[Re]);var be=arguments.length-2;if(be===1)Se.children=ce;else if(1<be){for(var xe=Array(be),It=0;It<be;It++)xe[It]=arguments[It+2];Se.children=xe}if(k&&k.defaultProps)for(Re in be=k.defaultProps,be)Se[Re]===void 0&&(Se[Re]=be[Re]);return{$$typeof:n,type:k,key:Ue,ref:Ne,props:Se,_owner:Ie.current}}function C(k,K){return{$$typeof:n,type:k.type,key:K,ref:k.ref,props:k.props,_owner:k._owner}}function V(k){return typeof k=="object"&&k!==null&&k.$$typeof===n}function D(k){var K={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(ce){return K[ce]})}var O=/\/+/g;function R(k,K){return typeof k=="object"&&k!==null&&k.key!=null?D(""+k.key):K.toString(36)}function ze(k,K,ce,Re,Se){var Ue=typeof k;(Ue==="undefined"||Ue==="boolean")&&(k=null);var Ne=!1;if(k===null)Ne=!0;else switch(Ue){case"string":case"number":Ne=!0;break;case"object":switch(k.$$typeof){case n:case e:Ne=!0}}if(Ne)return Ne=k,Se=Se(Ne),k=Re===""?"."+R(Ne,0):Re,ve(Se)?(ce="",k!=null&&(ce=k.replace(O,"$&/")+"/"),ze(Se,K,ce,"",function(It){return It})):Se!=null&&(V(Se)&&(Se=C(Se,ce+(!Se.key||Ne&&Ne.key===Se.key?"":(""+Se.key).replace(O,"$&/")+"/")+k)),K.push(Se)),1;if(Ne=0,Re=Re===""?".":Re+":",ve(k))for(var be=0;be<k.length;be++){Ue=k[be];var xe=Re+R(Ue,be);Ne+=ze(Ue,K,ce,xe,Se)}else if(xe=A(k),typeof xe=="function")for(k=xe.call(k),be=0;!(Ue=k.next()).done;)Ue=Ue.value,xe=Re+R(Ue,be++),Ne+=ze(Ue,K,ce,xe,Se);else if(Ue==="object")throw K=String(k),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.");return Ne}function $e(k,K,ce){if(k==null)return k;var Re=[],Se=0;return ze(k,Re,"","",function(Ue){return K.call(ce,Ue,Se++)}),Re}function Vt(k){if(k._status===-1){var K=k._result;K=K(),K.then(function(ce){(k._status===0||k._status===-1)&&(k._status=1,k._result=ce)},function(ce){(k._status===0||k._status===-1)&&(k._status=2,k._result=ce)}),k._status===-1&&(k._status=0,k._result=K)}if(k._status===1)return k._result.default;throw k._result}var Je={current:null},ee={transition:null},fe={ReactCurrentDispatcher:Je,ReactCurrentBatchConfig:ee,ReactCurrentOwner:Ie};return Ae.Children={map:$e,forEach:function(k,K,ce){$e(k,function(){K.apply(this,arguments)},ce)},count:function(k){var K=0;return $e(k,function(){K++}),K},toArray:function(k){return $e(k,function(K){return K})||[]},only:function(k){if(!V(k))throw Error("React.Children.only expected to receive a single React element child.");return k}},Ae.Component=z,Ae.Fragment=t,Ae.Profiler=o,Ae.PureComponent=te,Ae.StrictMode=i,Ae.Suspense=g,Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fe,Ae.cloneElement=function(k,K,ce){if(k==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+k+".");var Re=H({},k.props),Se=k.key,Ue=k.ref,Ne=k._owner;if(K!=null){if(K.ref!==void 0&&(Ue=K.ref,Ne=Ie.current),K.key!==void 0&&(Se=""+K.key),k.type&&k.type.defaultProps)var be=k.type.defaultProps;for(xe in K)ye.call(K,xe)&&!N.hasOwnProperty(xe)&&(Re[xe]=K[xe]===void 0&&be!==void 0?be[xe]:K[xe])}var xe=arguments.length-2;if(xe===1)Re.children=ce;else if(1<xe){be=Array(xe);for(var It=0;It<xe;It++)be[It]=arguments[It+2];Re.children=be}return{$$typeof:n,type:k.type,key:Se,ref:Ue,props:Re,_owner:Ne}},Ae.createContext=function(k){return k={$$typeof:h,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},k.Provider={$$typeof:l,_context:k},k.Consumer=k},Ae.createElement=S,Ae.createFactory=function(k){var K=S.bind(null,k);return K.type=k,K},Ae.createRef=function(){return{current:null}},Ae.forwardRef=function(k){return{$$typeof:d,render:k}},Ae.isValidElement=V,Ae.lazy=function(k){return{$$typeof:E,_payload:{_status:-1,_result:k},_init:Vt}},Ae.memo=function(k,K){return{$$typeof:y,type:k,compare:K===void 0?null:K}},Ae.startTransition=function(k){var K=ee.transition;ee.transition={};try{k()}finally{ee.transition=K}},Ae.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},Ae.useCallback=function(k,K){return Je.current.useCallback(k,K)},Ae.useContext=function(k){return Je.current.useContext(k)},Ae.useDebugValue=function(){},Ae.useDeferredValue=function(k){return Je.current.useDeferredValue(k)},Ae.useEffect=function(k,K){return Je.current.useEffect(k,K)},Ae.useId=function(){return Je.current.useId()},Ae.useImperativeHandle=function(k,K,ce){return Je.current.useImperativeHandle(k,K,ce)},Ae.useInsertionEffect=function(k,K){return Je.current.useInsertionEffect(k,K)},Ae.useLayoutEffect=function(k,K){return Je.current.useLayoutEffect(k,K)},Ae.useMemo=function(k,K){return Je.current.useMemo(k,K)},Ae.useReducer=function(k,K,ce){return Je.current.useReducer(k,K,ce)},Ae.useRef=function(k){return Je.current.useRef(k)},Ae.useState=function(k){return Je.current.useState(k)},Ae.useSyncExternalStore=function(k,K,ce){return Je.current.useSyncExternalStore(k,K,ce)},Ae.useTransition=function(){return Je.current.useTransition()},Ae.version="18.2.0",Ae}var bg;function Rd(){return bg||(bg=1,kf.exports=rI()),kf.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fg;function iI(){if(Fg)return ja;Fg=1;var n=Rd(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function h(d,g,y){var E,w={},A=null,b=null;y!==void 0&&(A=""+y),g.key!==void 0&&(A=""+g.key),g.ref!==void 0&&(b=g.ref);for(E in g)i.call(g,E)&&!l.hasOwnProperty(E)&&(w[E]=g[E]);if(d&&d.defaultProps)for(E in g=d.defaultProps,g)w[E]===void 0&&(w[E]=g[E]);return{$$typeof:e,type:d,key:A,ref:b,props:w,_owner:o.current}}return ja.Fragment=t,ja.jsx=h,ja.jsxs=h,ja}var Ug;function sI(){return Ug||(Ug=1,Pf.exports=iI()),Pf.exports}var Me=sI(),B=Rd(),bu={},Nf={exports:{}},Jt={},Df={exports:{}},xf={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jg;function oI(){return jg||(jg=1,(function(n){function e(ee,fe){var k=ee.length;ee.push(fe);e:for(;0<k;){var K=k-1>>>1,ce=ee[K];if(0<o(ce,fe))ee[K]=fe,ee[k]=ce,k=K;else break e}}function t(ee){return ee.length===0?null:ee[0]}function i(ee){if(ee.length===0)return null;var fe=ee[0],k=ee.pop();if(k!==fe){ee[0]=k;e:for(var K=0,ce=ee.length,Re=ce>>>1;K<Re;){var Se=2*(K+1)-1,Ue=ee[Se],Ne=Se+1,be=ee[Ne];if(0>o(Ue,k))Ne<ce&&0>o(be,Ue)?(ee[K]=be,ee[Ne]=k,K=Ne):(ee[K]=Ue,ee[Se]=k,K=Se);else if(Ne<ce&&0>o(be,k))ee[K]=be,ee[Ne]=k,K=Ne;else break e}}return fe}function o(ee,fe){var k=ee.sortIndex-fe.sortIndex;return k!==0?k:ee.id-fe.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;n.unstable_now=function(){return l.now()}}else{var h=Date,d=h.now();n.unstable_now=function(){return h.now()-d}}var g=[],y=[],E=1,w=null,A=3,b=!1,H=!1,$=!1,z=typeof setTimeout=="function"?setTimeout:null,Y=typeof clearTimeout=="function"?clearTimeout:null,te=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function se(ee){for(var fe=t(y);fe!==null;){if(fe.callback===null)i(y);else if(fe.startTime<=ee)i(y),fe.sortIndex=fe.expirationTime,e(g,fe);else break;fe=t(y)}}function ve(ee){if($=!1,se(ee),!H)if(t(g)!==null)H=!0,Vt(ye);else{var fe=t(y);fe!==null&&Je(ve,fe.startTime-ee)}}function ye(ee,fe){H=!1,$&&($=!1,Y(S),S=-1),b=!0;var k=A;try{for(se(fe),w=t(g);w!==null&&(!(w.expirationTime>fe)||ee&&!D());){var K=w.callback;if(typeof K=="function"){w.callback=null,A=w.priorityLevel;var ce=K(w.expirationTime<=fe);fe=n.unstable_now(),typeof ce=="function"?w.callback=ce:w===t(g)&&i(g),se(fe)}else i(g);w=t(g)}if(w!==null)var Re=!0;else{var Se=t(y);Se!==null&&Je(ve,Se.startTime-fe),Re=!1}return Re}finally{w=null,A=k,b=!1}}var Ie=!1,N=null,S=-1,C=5,V=-1;function D(){return!(n.unstable_now()-V<C)}function O(){if(N!==null){var ee=n.unstable_now();V=ee;var fe=!0;try{fe=N(!0,ee)}finally{fe?R():(Ie=!1,N=null)}}else Ie=!1}var R;if(typeof te=="function")R=function(){te(O)};else if(typeof MessageChannel<"u"){var ze=new MessageChannel,$e=ze.port2;ze.port1.onmessage=O,R=function(){$e.postMessage(null)}}else R=function(){z(O,0)};function Vt(ee){N=ee,Ie||(Ie=!0,R())}function Je(ee,fe){S=z(function(){ee(n.unstable_now())},fe)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(ee){ee.callback=null},n.unstable_continueExecution=function(){H||b||(H=!0,Vt(ye))},n.unstable_forceFrameRate=function(ee){0>ee||125<ee?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<ee?Math.floor(1e3/ee):5},n.unstable_getCurrentPriorityLevel=function(){return A},n.unstable_getFirstCallbackNode=function(){return t(g)},n.unstable_next=function(ee){switch(A){case 1:case 2:case 3:var fe=3;break;default:fe=A}var k=A;A=fe;try{return ee()}finally{A=k}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(ee,fe){switch(ee){case 1:case 2:case 3:case 4:case 5:break;default:ee=3}var k=A;A=ee;try{return fe()}finally{A=k}},n.unstable_scheduleCallback=function(ee,fe,k){var K=n.unstable_now();switch(typeof k=="object"&&k!==null?(k=k.delay,k=typeof k=="number"&&0<k?K+k:K):k=K,ee){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=k+ce,ee={id:E++,callback:fe,priorityLevel:ee,startTime:k,expirationTime:ce,sortIndex:-1},k>K?(ee.sortIndex=k,e(y,ee),t(g)===null&&ee===t(y)&&($?(Y(S),S=-1):$=!0,Je(ve,k-K))):(ee.sortIndex=ce,e(g,ee),H||b||(H=!0,Vt(ye))),ee},n.unstable_shouldYield=D,n.unstable_wrapCallback=function(ee){var fe=A;return function(){var k=A;A=fe;try{return ee.apply(this,arguments)}finally{A=k}}}})(xf)),xf}var zg;function aI(){return zg||(zg=1,Df.exports=oI()),Df.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bg;function lI(){if(Bg)return Jt;Bg=1;var n=Rd(),e=aI();function t(r){for(var s="https://reactjs.org/docs/error-decoder.html?invariant="+r,a=1;a<arguments.length;a++)s+="&args[]="+encodeURIComponent(arguments[a]);return"Minified React error #"+r+"; visit "+s+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,o={};function l(r,s){h(r,s),h(r+"Capture",s)}function h(r,s){for(o[r]=s,r=0;r<s.length;r++)i.add(s[r])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,y=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,E={},w={};function A(r){return g.call(w,r)?!0:g.call(E,r)?!1:y.test(r)?w[r]=!0:(E[r]=!0,!1)}function b(r,s,a,c){if(a!==null&&a.type===0)return!1;switch(typeof s){case"function":case"symbol":return!0;case"boolean":return c?!1:a!==null?!a.acceptsBooleans:(r=r.toLowerCase().slice(0,5),r!=="data-"&&r!=="aria-");default:return!1}}function H(r,s,a,c){if(s===null||typeof s>"u"||b(r,s,a,c))return!0;if(c)return!1;if(a!==null)switch(a.type){case 3:return!s;case 4:return s===!1;case 5:return isNaN(s);case 6:return isNaN(s)||1>s}return!1}function $(r,s,a,c,f,p,v){this.acceptsBooleans=s===2||s===3||s===4,this.attributeName=c,this.attributeNamespace=f,this.mustUseProperty=a,this.propertyName=r,this.type=s,this.sanitizeURL=p,this.removeEmptyString=v}var z={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r){z[r]=new $(r,0,!1,r,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(r){var s=r[0];z[s]=new $(s,1,!1,r[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(r){z[r]=new $(r,2,!1,r.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(r){z[r]=new $(r,2,!1,r,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r){z[r]=new $(r,3,!1,r.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(r){z[r]=new $(r,3,!0,r,null,!1,!1)}),["capture","download"].forEach(function(r){z[r]=new $(r,4,!1,r,null,!1,!1)}),["cols","rows","size","span"].forEach(function(r){z[r]=new $(r,6,!1,r,null,!1,!1)}),["rowSpan","start"].forEach(function(r){z[r]=new $(r,5,!1,r.toLowerCase(),null,!1,!1)});var Y=/[\-:]([a-z])/g;function te(r){return r[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r){var s=r.replace(Y,te);z[s]=new $(s,1,!1,r,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r){var s=r.replace(Y,te);z[s]=new $(s,1,!1,r,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(r){var s=r.replace(Y,te);z[s]=new $(s,1,!1,r,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(r){z[r]=new $(r,1,!1,r.toLowerCase(),null,!1,!1)}),z.xlinkHref=new $("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(r){z[r]=new $(r,1,!1,r.toLowerCase(),null,!0,!0)});function se(r,s,a,c){var f=z.hasOwnProperty(s)?z[s]:null;(f!==null?f.type!==0:c||!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(H(s,a,f,c)&&(a=null),c||f===null?A(s)&&(a===null?r.removeAttribute(s):r.setAttribute(s,""+a)):f.mustUseProperty?r[f.propertyName]=a===null?f.type===3?!1:"":a:(s=f.attributeName,c=f.attributeNamespace,a===null?r.removeAttribute(s):(f=f.type,a=f===3||f===4&&a===!0?"":""+a,c?r.setAttributeNS(c,s,a):r.setAttribute(s,a))))}var ve=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ye=Symbol.for("react.element"),Ie=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),V=Symbol.for("react.provider"),D=Symbol.for("react.context"),O=Symbol.for("react.forward_ref"),R=Symbol.for("react.suspense"),ze=Symbol.for("react.suspense_list"),$e=Symbol.for("react.memo"),Vt=Symbol.for("react.lazy"),Je=Symbol.for("react.offscreen"),ee=Symbol.iterator;function fe(r){return r===null||typeof r!="object"?null:(r=ee&&r[ee]||r["@@iterator"],typeof r=="function"?r:null)}var k=Object.assign,K;function ce(r){if(K===void 0)try{throw Error()}catch(a){var s=a.stack.trim().match(/\n( *(at )?)/);K=s&&s[1]||""}return`
`+K+r}var Re=!1;function Se(r,s){if(!r||Re)return"";Re=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(s)if(s=function(){throw Error()},Object.defineProperty(s.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(s,[])}catch(U){var c=U}Reflect.construct(r,[],s)}else{try{s.call()}catch(U){c=U}r.call(s.prototype)}else{try{throw Error()}catch(U){c=U}r()}}catch(U){if(U&&c&&typeof U.stack=="string"){for(var f=U.stack.split(`
`),p=c.stack.split(`
`),v=f.length-1,I=p.length-1;1<=v&&0<=I&&f[v]!==p[I];)I--;for(;1<=v&&0<=I;v--,I--)if(f[v]!==p[I]){if(v!==1||I!==1)do if(v--,I--,0>I||f[v]!==p[I]){var P=`
`+f[v].replace(" at new "," at ");return r.displayName&&P.includes("<anonymous>")&&(P=P.replace("<anonymous>",r.displayName)),P}while(1<=v&&0<=I);break}}}finally{Re=!1,Error.prepareStackTrace=a}return(r=r?r.displayName||r.name:"")?ce(r):""}function Ue(r){switch(r.tag){case 5:return ce(r.type);case 16:return ce("Lazy");case 13:return ce("Suspense");case 19:return ce("SuspenseList");case 0:case 2:case 15:return r=Se(r.type,!1),r;case 11:return r=Se(r.type.render,!1),r;case 1:return r=Se(r.type,!0),r;default:return""}}function Ne(r){if(r==null)return null;if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r;switch(r){case N:return"Fragment";case Ie:return"Portal";case C:return"Profiler";case S:return"StrictMode";case R:return"Suspense";case ze:return"SuspenseList"}if(typeof r=="object")switch(r.$$typeof){case D:return(r.displayName||"Context")+".Consumer";case V:return(r._context.displayName||"Context")+".Provider";case O:var s=r.render;return r=r.displayName,r||(r=s.displayName||s.name||"",r=r!==""?"ForwardRef("+r+")":"ForwardRef"),r;case $e:return s=r.displayName||null,s!==null?s:Ne(r.type)||"Memo";case Vt:s=r._payload,r=r._init;try{return Ne(r(s))}catch{}}return null}function be(r){var s=r.type;switch(r.tag){case 24:return"Cache";case 9:return(s.displayName||"Context")+".Consumer";case 10:return(s._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return r=s.render,r=r.displayName||r.name||"",s.displayName||(r!==""?"ForwardRef("+r+")":"ForwardRef");case 7:return"Fragment";case 5:return s;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ne(s);case 8:return s===S?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof s=="function")return s.displayName||s.name||null;if(typeof s=="string")return s}return null}function xe(r){switch(typeof r){case"boolean":case"number":case"string":case"undefined":return r;case"object":return r;default:return""}}function It(r){var s=r.type;return(r=r.nodeName)&&r.toLowerCase()==="input"&&(s==="checkbox"||s==="radio")}function rh(r){var s=It(r)?"checked":"value",a=Object.getOwnPropertyDescriptor(r.constructor.prototype,s),c=""+r[s];if(!r.hasOwnProperty(s)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var f=a.get,p=a.set;return Object.defineProperty(r,s,{configurable:!0,get:function(){return f.call(this)},set:function(v){c=""+v,p.call(this,v)}}),Object.defineProperty(r,s,{enumerable:a.enumerable}),{getValue:function(){return c},setValue:function(v){c=""+v},stopTracking:function(){r._valueTracker=null,delete r[s]}}}}function Cs(r){r._valueTracker||(r._valueTracker=rh(r))}function Wo(r){if(!r)return!1;var s=r._valueTracker;if(!s)return!0;var a=s.getValue(),c="";return r&&(c=It(r)?r.checked?"true":"false":r.value),r=c,r!==a?(s.setValue(r),!0):!1}function Br(r){if(r=r||(typeof document<"u"?document:void 0),typeof r>"u")return null;try{return r.activeElement||r.body}catch{return r.body}}function Ps(r,s){var a=s.checked;return k({},s,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:a??r._wrapperState.initialChecked})}function Tl(r,s){var a=s.defaultValue==null?"":s.defaultValue,c=s.checked!=null?s.checked:s.defaultChecked;a=xe(s.value!=null?s.value:a),r._wrapperState={initialChecked:c,initialValue:a,controlled:s.type==="checkbox"||s.type==="radio"?s.checked!=null:s.value!=null}}function ks(r,s){s=s.checked,s!=null&&se(r,"checked",s,!1)}function Fi(r,s){ks(r,s);var a=xe(s.value),c=s.type;if(a!=null)c==="number"?(a===0&&r.value===""||r.value!=a)&&(r.value=""+a):r.value!==""+a&&(r.value=""+a);else if(c==="submit"||c==="reset"){r.removeAttribute("value");return}s.hasOwnProperty("value")?ut(r,s.type,a):s.hasOwnProperty("defaultValue")&&ut(r,s.type,xe(s.defaultValue)),s.checked==null&&s.defaultChecked!=null&&(r.defaultChecked=!!s.defaultChecked)}function Ko(r,s,a){if(s.hasOwnProperty("value")||s.hasOwnProperty("defaultValue")){var c=s.type;if(!(c!=="submit"&&c!=="reset"||s.value!==void 0&&s.value!==null))return;s=""+r._wrapperState.initialValue,a||s===r.value||(r.value=s),r.defaultValue=s}a=r.name,a!==""&&(r.name=""),r.defaultChecked=!!r._wrapperState.initialChecked,a!==""&&(r.name=a)}function ut(r,s,a){(s!=="number"||Br(r.ownerDocument)!==r)&&(a==null?r.defaultValue=""+r._wrapperState.initialValue:r.defaultValue!==""+a&&(r.defaultValue=""+a))}var st=Array.isArray;function Tn(r,s,a,c){if(r=r.options,s){s={};for(var f=0;f<a.length;f++)s["$"+a[f]]=!0;for(a=0;a<r.length;a++)f=s.hasOwnProperty("$"+r[a].value),r[a].selected!==f&&(r[a].selected=f),f&&c&&(r[a].defaultSelected=!0)}else{for(a=""+xe(a),s=null,f=0;f<r.length;f++){if(r[f].value===a){r[f].selected=!0,c&&(r[f].defaultSelected=!0);return}s!==null||r[f].disabled||(s=r[f])}s!==null&&(s.selected=!0)}}function Go(r,s){if(s.dangerouslySetInnerHTML!=null)throw Error(t(91));return k({},s,{value:void 0,defaultValue:void 0,children:""+r._wrapperState.initialValue})}function Qo(r,s){var a=s.value;if(a==null){if(a=s.children,s=s.defaultValue,a!=null){if(s!=null)throw Error(t(92));if(st(a)){if(1<a.length)throw Error(t(93));a=a[0]}s=a}s==null&&(s=""),a=s}r._wrapperState={initialValue:xe(a)}}function Il(r,s){var a=xe(s.value),c=xe(s.defaultValue);a!=null&&(a=""+a,a!==r.value&&(r.value=a),s.defaultValue==null&&r.defaultValue!==a&&(r.defaultValue=a)),c!=null&&(r.defaultValue=""+c)}function $r(r){var s=r.textContent;s===r._wrapperState.initialValue&&s!==""&&s!==null&&(r.value=s)}function Yo(r){switch(r){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ns(r,s){return r==null||r==="http://www.w3.org/1999/xhtml"?Yo(s):r==="http://www.w3.org/2000/svg"&&s==="foreignObject"?"http://www.w3.org/1999/xhtml":r}var Hr,Sl=(function(r){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(s,a,c,f){MSApp.execUnsafeLocalFunction(function(){return r(s,a,c,f)})}:r})(function(r,s){if(r.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in r)r.innerHTML=s;else{for(Hr=Hr||document.createElement("div"),Hr.innerHTML="<svg>"+s.valueOf().toString()+"</svg>",s=Hr.firstChild;r.firstChild;)r.removeChild(r.firstChild);for(;s.firstChild;)r.appendChild(s.firstChild)}});function Ui(r,s){if(s){var a=r.firstChild;if(a&&a===r.lastChild&&a.nodeType===3){a.nodeValue=s;return}}r.textContent=s}var qr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Rl=["Webkit","ms","Moz","O"];Object.keys(qr).forEach(function(r){Rl.forEach(function(s){s=s+r.charAt(0).toUpperCase()+r.substring(1),qr[s]=qr[r]})});function Wr(r,s,a){return s==null||typeof s=="boolean"||s===""?"":a||typeof s!="number"||s===0||qr.hasOwnProperty(r)&&qr[r]?(""+s).trim():s+"px"}function Ds(r,s){r=r.style;for(var a in s)if(s.hasOwnProperty(a)){var c=a.indexOf("--")===0,f=Wr(a,s[a],c);a==="float"&&(a="cssFloat"),c?r.setProperty(a,f):r[a]=f}}var Jo=k({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function In(r,s){if(s){if(Jo[r]&&(s.children!=null||s.dangerouslySetInnerHTML!=null))throw Error(t(137,r));if(s.dangerouslySetInnerHTML!=null){if(s.children!=null)throw Error(t(60));if(typeof s.dangerouslySetInnerHTML!="object"||!("__html"in s.dangerouslySetInnerHTML))throw Error(t(61))}if(s.style!=null&&typeof s.style!="object")throw Error(t(62))}}function xs(r,s){if(r.indexOf("-")===-1)return typeof s.is=="string";switch(r){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Kr=null;function Vs(r){return r=r.target||r.srcElement||window,r.correspondingUseElement&&(r=r.correspondingUseElement),r.nodeType===3?r.parentNode:r}var gr=null,yr=null,rt=null;function Xo(r){if(r=Ra(r)){if(typeof gr!="function")throw Error(t(280));var s=r.stateNode;s&&(s=Xl(s),gr(r.stateNode,r.type,s))}}function Gr(r){yr?rt?rt.push(r):rt=[r]:yr=r}function Qr(){if(yr){var r=yr,s=rt;if(rt=yr=null,Xo(r),s)for(r=0;r<s.length;r++)Xo(s[r])}}function Al(r,s){return r(s)}function Cl(){}var Bn=!1;function Pl(r,s,a){if(Bn)return r(s,a);Bn=!0;try{return Al(r,s,a)}finally{Bn=!1,(yr!==null||rt!==null)&&(Cl(),Qr())}}function ji(r,s){var a=r.stateNode;if(a===null)return null;var c=Xl(a);if(c===null)return null;a=c[s];e:switch(s){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(r=r.type,c=!(r==="button"||r==="input"||r==="select"||r==="textarea")),r=!c;break e;default:r=!1}if(r)return null;if(a&&typeof a!="function")throw Error(t(231,s,typeof a));return a}var Yr=!1;if(d)try{var Jr={};Object.defineProperty(Jr,"passive",{get:function(){Yr=!0}}),window.addEventListener("test",Jr,Jr),window.removeEventListener("test",Jr,Jr)}catch{Yr=!1}function kl(r,s,a,c,f,p,v,I,P){var U=Array.prototype.slice.call(arguments,3);try{s.apply(a,U)}catch(Q){this.onError(Q)}}var _r=!1,$n=null,Os=!1,hn=null,Nl={onError:function(r){_r=!0,$n=r}};function Dl(r,s,a,c,f,p,v,I,P){_r=!1,$n=null,kl.apply(Nl,arguments)}function Zo(r,s,a,c,f,p,v,I,P){if(Dl.apply(this,arguments),_r){if(_r){var U=$n;_r=!1,$n=null}else throw Error(t(198));Os||(Os=!0,hn=U)}}function Sn(r){var s=r,a=r;if(r.alternate)for(;s.return;)s=s.return;else{r=s;do s=r,(s.flags&4098)!==0&&(a=s.return),r=s.return;while(r)}return s.tag===3?a:null}function ea(r){if(r.tag===13){var s=r.memoizedState;if(s===null&&(r=r.alternate,r!==null&&(s=r.memoizedState)),s!==null)return s.dehydrated}return null}function xl(r){if(Sn(r)!==r)throw Error(t(188))}function Vl(r){var s=r.alternate;if(!s){if(s=Sn(r),s===null)throw Error(t(188));return s!==r?null:r}for(var a=r,c=s;;){var f=a.return;if(f===null)break;var p=f.alternate;if(p===null){if(c=f.return,c!==null){a=c;continue}break}if(f.child===p.child){for(p=f.child;p;){if(p===a)return xl(f),r;if(p===c)return xl(f),s;p=p.sibling}throw Error(t(188))}if(a.return!==c.return)a=f,c=p;else{for(var v=!1,I=f.child;I;){if(I===a){v=!0,a=f,c=p;break}if(I===c){v=!0,c=f,a=p;break}I=I.sibling}if(!v){for(I=p.child;I;){if(I===a){v=!0,a=p,c=f;break}if(I===c){v=!0,c=p,a=f;break}I=I.sibling}if(!v)throw Error(t(189))}}if(a.alternate!==c)throw Error(t(190))}if(a.tag!==3)throw Error(t(188));return a.stateNode.current===a?r:s}function Ol(r){return r=Vl(r),r!==null?zi(r):null}function zi(r){if(r.tag===5||r.tag===6)return r;for(r=r.child;r!==null;){var s=zi(r);if(s!==null)return s;r=r.sibling}return null}var ta=e.unstable_scheduleCallback,Ls=e.unstable_cancelCallback,Bi=e.unstable_shouldYield,vr=e.unstable_requestPaint,Ke=e.unstable_now,ih=e.unstable_getCurrentPriorityLevel,Ms=e.unstable_ImmediatePriority,na=e.unstable_UserBlockingPriority,$i=e.unstable_NormalPriority,ra=e.unstable_LowPriority,bs=e.unstable_IdlePriority,Hi=null,Zt=null;function Ll(r){if(Zt&&typeof Zt.onCommitFiberRoot=="function")try{Zt.onCommitFiberRoot(Hi,r,void 0,(r.current.flags&128)===128)}catch{}}var en=Math.clz32?Math.clz32:qi,Hn=Math.log,fn=Math.LN2;function qi(r){return r>>>=0,r===0?32:31-(Hn(r)/fn|0)|0}var qn=64,Xr=4194304;function Fe(r){switch(r&-r){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return r&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return r}}function Er(r,s){var a=r.pendingLanes;if(a===0)return 0;var c=0,f=r.suspendedLanes,p=r.pingedLanes,v=a&268435455;if(v!==0){var I=v&~f;I!==0?c=Fe(I):(p&=v,p!==0&&(c=Fe(p)))}else v=a&~f,v!==0?c=Fe(v):p!==0&&(c=Fe(p));if(c===0)return 0;if(s!==0&&s!==c&&(s&f)===0&&(f=c&-c,p=s&-s,f>=p||f===16&&(p&4194240)!==0))return s;if((c&4)!==0&&(c|=a&16),s=r.entangledLanes,s!==0)for(r=r.entanglements,s&=c;0<s;)a=31-en(s),f=1<<a,c|=r[a],s&=~f;return c}function Wi(r,s){switch(r){case 1:case 2:case 4:return s+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return s+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ki(r,s){for(var a=r.suspendedLanes,c=r.pingedLanes,f=r.expirationTimes,p=r.pendingLanes;0<p;){var v=31-en(p),I=1<<v,P=f[v];P===-1?((I&a)===0||(I&c)!==0)&&(f[v]=Wi(I,s)):P<=s&&(r.expiredLanes|=I),p&=~I}}function ia(r){return r=r.pendingLanes&-1073741825,r!==0?r:r&1073741824?1073741824:0}function sa(){var r=qn;return qn<<=1,(qn&4194240)===0&&(qn=64),r}function oa(r){for(var s=[],a=0;31>a;a++)s.push(r);return s}function Gi(r,s,a){r.pendingLanes|=s,s!==536870912&&(r.suspendedLanes=0,r.pingedLanes=0),r=r.eventTimes,s=31-en(s),r[s]=a}function sh(r,s){var a=r.pendingLanes&~s;r.pendingLanes=s,r.suspendedLanes=0,r.pingedLanes=0,r.expiredLanes&=s,r.mutableReadLanes&=s,r.entangledLanes&=s,s=r.entanglements;var c=r.eventTimes;for(r=r.expirationTimes;0<a;){var f=31-en(a),p=1<<f;s[f]=0,c[f]=-1,r[f]=-1,a&=~p}}function aa(r,s){var a=r.entangledLanes|=s;for(r=r.entanglements;a;){var c=31-en(a),f=1<<c;f&s|r[c]&s&&(r[c]|=s),a&=~f}}var De=0;function Wn(r){return r&=-r,1<r?4<r?(r&268435455)!==0?16:536870912:4:1}var la,Fs,ua,ca,ha,Kn=!1,Us=[],Gn=null,Qn=null,St=null,Qi=new Map,wr=new Map,tn=[],Ml="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zr(r,s){switch(r){case"focusin":case"focusout":Gn=null;break;case"dragenter":case"dragleave":Qn=null;break;case"mouseover":case"mouseout":St=null;break;case"pointerover":case"pointerout":Qi.delete(s.pointerId);break;case"gotpointercapture":case"lostpointercapture":wr.delete(s.pointerId)}}function Rn(r,s,a,c,f,p){return r===null||r.nativeEvent!==p?(r={blockedOn:s,domEventName:a,eventSystemFlags:c,nativeEvent:p,targetContainers:[f]},s!==null&&(s=Ra(s),s!==null&&Fs(s)),r):(r.eventSystemFlags|=c,s=r.targetContainers,f!==null&&s.indexOf(f)===-1&&s.push(f),r)}function bl(r,s,a,c,f){switch(s){case"focusin":return Gn=Rn(Gn,r,s,a,c,f),!0;case"dragenter":return Qn=Rn(Qn,r,s,a,c,f),!0;case"mouseover":return St=Rn(St,r,s,a,c,f),!0;case"pointerover":var p=f.pointerId;return Qi.set(p,Rn(Qi.get(p)||null,r,s,a,c,f)),!0;case"gotpointercapture":return p=f.pointerId,wr.set(p,Rn(wr.get(p)||null,r,s,a,c,f)),!0}return!1}function js(r){var s=Zi(r.target);if(s!==null){var a=Sn(s);if(a!==null){if(s=a.tag,s===13){if(s=ea(a),s!==null){r.blockedOn=s,ha(r.priority,function(){ua(a)});return}}else if(s===3&&a.stateNode.current.memoizedState.isDehydrated){r.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}r.blockedOn=null}function He(r){if(r.blockedOn!==null)return!1;for(var s=r.targetContainers;0<s.length;){var a=zs(r.domEventName,r.eventSystemFlags,s[0],r.nativeEvent);if(a===null){a=r.nativeEvent;var c=new a.constructor(a.type,a);Kr=c,a.target.dispatchEvent(c),Kr=null}else return s=Ra(a),s!==null&&Fs(s),r.blockedOn=a,!1;s.shift()}return!0}function Fl(r,s,a){He(r)&&a.delete(s)}function oh(){Kn=!1,Gn!==null&&He(Gn)&&(Gn=null),Qn!==null&&He(Qn)&&(Qn=null),St!==null&&He(St)&&(St=null),Qi.forEach(Fl),wr.forEach(Fl)}function ei(r,s){r.blockedOn===s&&(r.blockedOn=null,Kn||(Kn=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,oh)))}function ti(r){function s(f){return ei(f,r)}if(0<Us.length){ei(Us[0],r);for(var a=1;a<Us.length;a++){var c=Us[a];c.blockedOn===r&&(c.blockedOn=null)}}for(Gn!==null&&ei(Gn,r),Qn!==null&&ei(Qn,r),St!==null&&ei(St,r),Qi.forEach(s),wr.forEach(s),a=0;a<tn.length;a++)c=tn[a],c.blockedOn===r&&(c.blockedOn=null);for(;0<tn.length&&(a=tn[0],a.blockedOn===null);)js(a),a.blockedOn===null&&tn.shift()}var Tr=ve.ReactCurrentBatchConfig,Ir=!0;function Yn(r,s,a,c){var f=De,p=Tr.transition;Tr.transition=null;try{De=1,fa(r,s,a,c)}finally{De=f,Tr.transition=p}}function Ul(r,s,a,c){var f=De,p=Tr.transition;Tr.transition=null;try{De=4,fa(r,s,a,c)}finally{De=f,Tr.transition=p}}function fa(r,s,a,c){if(Ir){var f=zs(r,s,a,c);if(f===null)yh(r,s,c,Jn,a),Zr(r,c);else if(bl(f,r,s,a,c))c.stopPropagation();else if(Zr(r,c),s&4&&-1<Ml.indexOf(r)){for(;f!==null;){var p=Ra(f);if(p!==null&&la(p),p=zs(r,s,a,c),p===null&&yh(r,s,c,Jn,a),p===f)break;f=p}f!==null&&c.stopPropagation()}else yh(r,s,c,null,a)}}var Jn=null;function zs(r,s,a,c){if(Jn=null,r=Vs(c),r=Zi(r),r!==null)if(s=Sn(r),s===null)r=null;else if(a=s.tag,a===13){if(r=ea(s),r!==null)return r;r=null}else if(a===3){if(s.stateNode.current.memoizedState.isDehydrated)return s.tag===3?s.stateNode.containerInfo:null;r=null}else s!==r&&(r=null);return Jn=r,null}function Bs(r){switch(r){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ih()){case Ms:return 1;case na:return 4;case $i:case ra:return 16;case bs:return 536870912;default:return 16}default:return 16}}var nn=null,$s=null,Sr=null;function jl(){if(Sr)return Sr;var r,s=$s,a=s.length,c,f="value"in nn?nn.value:nn.textContent,p=f.length;for(r=0;r<a&&s[r]===f[r];r++);var v=a-r;for(c=1;c<=v&&s[a-c]===f[p-c];c++);return Sr=f.slice(r,1<c?1-c:void 0)}function Yi(r){var s=r.keyCode;return"charCode"in r?(r=r.charCode,r===0&&s===13&&(r=13)):r=s,r===10&&(r=13),32<=r||r===13?r:0}function Xn(){return!0}function da(){return!1}function Ot(r){function s(a,c,f,p,v){this._reactName=a,this._targetInst=f,this.type=c,this.nativeEvent=p,this.target=v,this.currentTarget=null;for(var I in r)r.hasOwnProperty(I)&&(a=r[I],this[I]=a?a(p):p[I]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?Xn:da,this.isPropagationStopped=da,this}return k(s.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Xn)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Xn)},persist:function(){},isPersistent:Xn}),s}var Zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(r){return r.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ji=Ot(Zn),ni=k({},Zn,{view:0,detail:0}),Hs=Ot(ni),qs,Ws,rn,Xi=k({},ni,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:we,button:0,buttons:0,relatedTarget:function(r){return r.relatedTarget===void 0?r.fromElement===r.srcElement?r.toElement:r.fromElement:r.relatedTarget},movementX:function(r){return"movementX"in r?r.movementX:(r!==rn&&(rn&&r.type==="mousemove"?(qs=r.screenX-rn.screenX,Ws=r.screenY-rn.screenY):Ws=qs=0,rn=r),qs)},movementY:function(r){return"movementY"in r?r.movementY:Ws}}),pa=Ot(Xi),zl=k({},Xi,{dataTransfer:0}),Bl=Ot(zl),Ks=k({},ni,{relatedTarget:0}),Rt=Ot(Ks),$l=k({},Zn,{animationName:0,elapsedTime:0,pseudoElement:0}),Hl=Ot($l),ri=k({},Zn,{clipboardData:function(r){return"clipboardData"in r?r.clipboardData:window.clipboardData}}),u=Ot(ri),m=k({},Zn,{data:0}),_=Ot(m),T={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},M={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},j={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Z(r){var s=this.nativeEvent;return s.getModifierState?s.getModifierState(r):(r=j[r])?!!s[r]:!1}function we(){return Z}var ot=k({},ni,{key:function(r){if(r.key){var s=T[r.key]||r.key;if(s!=="Unidentified")return s}return r.type==="keypress"?(r=Yi(r),r===13?"Enter":String.fromCharCode(r)):r.type==="keydown"||r.type==="keyup"?M[r.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:we,charCode:function(r){return r.type==="keypress"?Yi(r):0},keyCode:function(r){return r.type==="keydown"||r.type==="keyup"?r.keyCode:0},which:function(r){return r.type==="keypress"?Yi(r):r.type==="keydown"||r.type==="keyup"?r.keyCode:0}}),Be=Ot(ot),ct=k({},Xi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),sn=Ot(ct),Rr=k({},ni,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:we}),er=Ot(Rr),tr=k({},Zn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Gs=Ot(tr),ma=k({},Xi,{deltaX:function(r){return"deltaX"in r?r.deltaX:"wheelDeltaX"in r?-r.wheelDeltaX:0},deltaY:function(r){return"deltaY"in r?r.deltaY:"wheelDeltaY"in r?-r.wheelDeltaY:"wheelDelta"in r?-r.wheelDelta:0},deltaZ:0,deltaMode:0}),Yw=Ot(ma),Jw=[9,13,27,32],ah=d&&"CompositionEvent"in window,ga=null;d&&"documentMode"in document&&(ga=document.documentMode);var Xw=d&&"TextEvent"in window&&!ga,Cp=d&&(!ah||ga&&8<ga&&11>=ga),Pp=" ",kp=!1;function Np(r,s){switch(r){case"keyup":return Jw.indexOf(s.keyCode)!==-1;case"keydown":return s.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Dp(r){return r=r.detail,typeof r=="object"&&"data"in r?r.data:null}var Qs=!1;function Zw(r,s){switch(r){case"compositionend":return Dp(s);case"keypress":return s.which!==32?null:(kp=!0,Pp);case"textInput":return r=s.data,r===Pp&&kp?null:r;default:return null}}function eT(r,s){if(Qs)return r==="compositionend"||!ah&&Np(r,s)?(r=jl(),Sr=$s=nn=null,Qs=!1,r):null;switch(r){case"paste":return null;case"keypress":if(!(s.ctrlKey||s.altKey||s.metaKey)||s.ctrlKey&&s.altKey){if(s.char&&1<s.char.length)return s.char;if(s.which)return String.fromCharCode(s.which)}return null;case"compositionend":return Cp&&s.locale!=="ko"?null:s.data;default:return null}}var tT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xp(r){var s=r&&r.nodeName&&r.nodeName.toLowerCase();return s==="input"?!!tT[r.type]:s==="textarea"}function Vp(r,s,a,c){Gr(c),s=Ql(s,"onChange"),0<s.length&&(a=new Ji("onChange","change",null,a,c),r.push({event:a,listeners:s}))}var ya=null,_a=null;function nT(r){Jp(r,0)}function ql(r){var s=eo(r);if(Wo(s))return r}function rT(r,s){if(r==="change")return s}var Op=!1;if(d){var lh;if(d){var uh="oninput"in document;if(!uh){var Lp=document.createElement("div");Lp.setAttribute("oninput","return;"),uh=typeof Lp.oninput=="function"}lh=uh}else lh=!1;Op=lh&&(!document.documentMode||9<document.documentMode)}function Mp(){ya&&(ya.detachEvent("onpropertychange",bp),_a=ya=null)}function bp(r){if(r.propertyName==="value"&&ql(_a)){var s=[];Vp(s,_a,r,Vs(r)),Pl(nT,s)}}function iT(r,s,a){r==="focusin"?(Mp(),ya=s,_a=a,ya.attachEvent("onpropertychange",bp)):r==="focusout"&&Mp()}function sT(r){if(r==="selectionchange"||r==="keyup"||r==="keydown")return ql(_a)}function oT(r,s){if(r==="click")return ql(s)}function aT(r,s){if(r==="input"||r==="change")return ql(s)}function lT(r,s){return r===s&&(r!==0||1/r===1/s)||r!==r&&s!==s}var An=typeof Object.is=="function"?Object.is:lT;function va(r,s){if(An(r,s))return!0;if(typeof r!="object"||r===null||typeof s!="object"||s===null)return!1;var a=Object.keys(r),c=Object.keys(s);if(a.length!==c.length)return!1;for(c=0;c<a.length;c++){var f=a[c];if(!g.call(s,f)||!An(r[f],s[f]))return!1}return!0}function Fp(r){for(;r&&r.firstChild;)r=r.firstChild;return r}function Up(r,s){var a=Fp(r);r=0;for(var c;a;){if(a.nodeType===3){if(c=r+a.textContent.length,r<=s&&c>=s)return{node:a,offset:s-r};r=c}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Fp(a)}}function jp(r,s){return r&&s?r===s?!0:r&&r.nodeType===3?!1:s&&s.nodeType===3?jp(r,s.parentNode):"contains"in r?r.contains(s):r.compareDocumentPosition?!!(r.compareDocumentPosition(s)&16):!1:!1}function zp(){for(var r=window,s=Br();s instanceof r.HTMLIFrameElement;){try{var a=typeof s.contentWindow.location.href=="string"}catch{a=!1}if(a)r=s.contentWindow;else break;s=Br(r.document)}return s}function ch(r){var s=r&&r.nodeName&&r.nodeName.toLowerCase();return s&&(s==="input"&&(r.type==="text"||r.type==="search"||r.type==="tel"||r.type==="url"||r.type==="password")||s==="textarea"||r.contentEditable==="true")}function uT(r){var s=zp(),a=r.focusedElem,c=r.selectionRange;if(s!==a&&a&&a.ownerDocument&&jp(a.ownerDocument.documentElement,a)){if(c!==null&&ch(a)){if(s=c.start,r=c.end,r===void 0&&(r=s),"selectionStart"in a)a.selectionStart=s,a.selectionEnd=Math.min(r,a.value.length);else if(r=(s=a.ownerDocument||document)&&s.defaultView||window,r.getSelection){r=r.getSelection();var f=a.textContent.length,p=Math.min(c.start,f);c=c.end===void 0?p:Math.min(c.end,f),!r.extend&&p>c&&(f=c,c=p,p=f),f=Up(a,p);var v=Up(a,c);f&&v&&(r.rangeCount!==1||r.anchorNode!==f.node||r.anchorOffset!==f.offset||r.focusNode!==v.node||r.focusOffset!==v.offset)&&(s=s.createRange(),s.setStart(f.node,f.offset),r.removeAllRanges(),p>c?(r.addRange(s),r.extend(v.node,v.offset)):(s.setEnd(v.node,v.offset),r.addRange(s)))}}for(s=[],r=a;r=r.parentNode;)r.nodeType===1&&s.push({element:r,left:r.scrollLeft,top:r.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<s.length;a++)r=s[a],r.element.scrollLeft=r.left,r.element.scrollTop=r.top}}var cT=d&&"documentMode"in document&&11>=document.documentMode,Ys=null,hh=null,Ea=null,fh=!1;function Bp(r,s,a){var c=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;fh||Ys==null||Ys!==Br(c)||(c=Ys,"selectionStart"in c&&ch(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),Ea&&va(Ea,c)||(Ea=c,c=Ql(hh,"onSelect"),0<c.length&&(s=new Ji("onSelect","select",null,s,a),r.push({event:s,listeners:c}),s.target=Ys)))}function Wl(r,s){var a={};return a[r.toLowerCase()]=s.toLowerCase(),a["Webkit"+r]="webkit"+s,a["Moz"+r]="moz"+s,a}var Js={animationend:Wl("Animation","AnimationEnd"),animationiteration:Wl("Animation","AnimationIteration"),animationstart:Wl("Animation","AnimationStart"),transitionend:Wl("Transition","TransitionEnd")},dh={},$p={};d&&($p=document.createElement("div").style,"AnimationEvent"in window||(delete Js.animationend.animation,delete Js.animationiteration.animation,delete Js.animationstart.animation),"TransitionEvent"in window||delete Js.transitionend.transition);function Kl(r){if(dh[r])return dh[r];if(!Js[r])return r;var s=Js[r],a;for(a in s)if(s.hasOwnProperty(a)&&a in $p)return dh[r]=s[a];return r}var Hp=Kl("animationend"),qp=Kl("animationiteration"),Wp=Kl("animationstart"),Kp=Kl("transitionend"),Gp=new Map,Qp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ii(r,s){Gp.set(r,s),l(s,[r])}for(var ph=0;ph<Qp.length;ph++){var mh=Qp[ph],hT=mh.toLowerCase(),fT=mh[0].toUpperCase()+mh.slice(1);ii(hT,"on"+fT)}ii(Hp,"onAnimationEnd"),ii(qp,"onAnimationIteration"),ii(Wp,"onAnimationStart"),ii("dblclick","onDoubleClick"),ii("focusin","onFocus"),ii("focusout","onBlur"),ii(Kp,"onTransitionEnd"),h("onMouseEnter",["mouseout","mouseover"]),h("onMouseLeave",["mouseout","mouseover"]),h("onPointerEnter",["pointerout","pointerover"]),h("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dT=new Set("cancel close invalid load scroll toggle".split(" ").concat(wa));function Yp(r,s,a){var c=r.type||"unknown-event";r.currentTarget=a,Zo(c,s,void 0,r),r.currentTarget=null}function Jp(r,s){s=(s&4)!==0;for(var a=0;a<r.length;a++){var c=r[a],f=c.event;c=c.listeners;e:{var p=void 0;if(s)for(var v=c.length-1;0<=v;v--){var I=c[v],P=I.instance,U=I.currentTarget;if(I=I.listener,P!==p&&f.isPropagationStopped())break e;Yp(f,I,U),p=P}else for(v=0;v<c.length;v++){if(I=c[v],P=I.instance,U=I.currentTarget,I=I.listener,P!==p&&f.isPropagationStopped())break e;Yp(f,I,U),p=P}}}if(Os)throw r=hn,Os=!1,hn=null,r}function Ge(r,s){var a=s[Ih];a===void 0&&(a=s[Ih]=new Set);var c=r+"__bubble";a.has(c)||(Xp(s,r,2,!1),a.add(c))}function gh(r,s,a){var c=0;s&&(c|=4),Xp(a,r,c,s)}var Gl="_reactListening"+Math.random().toString(36).slice(2);function Ta(r){if(!r[Gl]){r[Gl]=!0,i.forEach(function(a){a!=="selectionchange"&&(dT.has(a)||gh(a,!1,r),gh(a,!0,r))});var s=r.nodeType===9?r:r.ownerDocument;s===null||s[Gl]||(s[Gl]=!0,gh("selectionchange",!1,s))}}function Xp(r,s,a,c){switch(Bs(s)){case 1:var f=Yn;break;case 4:f=Ul;break;default:f=fa}a=f.bind(null,s,a,r),f=void 0,!Yr||s!=="touchstart"&&s!=="touchmove"&&s!=="wheel"||(f=!0),c?f!==void 0?r.addEventListener(s,a,{capture:!0,passive:f}):r.addEventListener(s,a,!0):f!==void 0?r.addEventListener(s,a,{passive:f}):r.addEventListener(s,a,!1)}function yh(r,s,a,c,f){var p=c;if((s&1)===0&&(s&2)===0&&c!==null)e:for(;;){if(c===null)return;var v=c.tag;if(v===3||v===4){var I=c.stateNode.containerInfo;if(I===f||I.nodeType===8&&I.parentNode===f)break;if(v===4)for(v=c.return;v!==null;){var P=v.tag;if((P===3||P===4)&&(P=v.stateNode.containerInfo,P===f||P.nodeType===8&&P.parentNode===f))return;v=v.return}for(;I!==null;){if(v=Zi(I),v===null)return;if(P=v.tag,P===5||P===6){c=p=v;continue e}I=I.parentNode}}c=c.return}Pl(function(){var U=p,Q=Vs(a),J=[];e:{var G=Gp.get(r);if(G!==void 0){var ne=Ji,ae=r;switch(r){case"keypress":if(Yi(a)===0)break e;case"keydown":case"keyup":ne=Be;break;case"focusin":ae="focus",ne=Rt;break;case"focusout":ae="blur",ne=Rt;break;case"beforeblur":case"afterblur":ne=Rt;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ne=pa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ne=Bl;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ne=er;break;case Hp:case qp:case Wp:ne=Hl;break;case Kp:ne=Gs;break;case"scroll":ne=Hs;break;case"wheel":ne=Yw;break;case"copy":case"cut":case"paste":ne=u;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ne=sn}var le=(s&4)!==0,at=!le&&r==="scroll",L=le?G!==null?G+"Capture":null:G;le=[];for(var x=U,F;x!==null;){F=x;var X=F.stateNode;if(F.tag===5&&X!==null&&(F=X,L!==null&&(X=ji(x,L),X!=null&&le.push(Ia(x,X,F)))),at)break;x=x.return}0<le.length&&(G=new ne(G,ae,null,a,Q),J.push({event:G,listeners:le}))}}if((s&7)===0){e:{if(G=r==="mouseover"||r==="pointerover",ne=r==="mouseout"||r==="pointerout",G&&a!==Kr&&(ae=a.relatedTarget||a.fromElement)&&(Zi(ae)||ae[Ar]))break e;if((ne||G)&&(G=Q.window===Q?Q:(G=Q.ownerDocument)?G.defaultView||G.parentWindow:window,ne?(ae=a.relatedTarget||a.toElement,ne=U,ae=ae?Zi(ae):null,ae!==null&&(at=Sn(ae),ae!==at||ae.tag!==5&&ae.tag!==6)&&(ae=null)):(ne=null,ae=U),ne!==ae)){if(le=pa,X="onMouseLeave",L="onMouseEnter",x="mouse",(r==="pointerout"||r==="pointerover")&&(le=sn,X="onPointerLeave",L="onPointerEnter",x="pointer"),at=ne==null?G:eo(ne),F=ae==null?G:eo(ae),G=new le(X,x+"leave",ne,a,Q),G.target=at,G.relatedTarget=F,X=null,Zi(Q)===U&&(le=new le(L,x+"enter",ae,a,Q),le.target=F,le.relatedTarget=at,X=le),at=X,ne&&ae)t:{for(le=ne,L=ae,x=0,F=le;F;F=Xs(F))x++;for(F=0,X=L;X;X=Xs(X))F++;for(;0<x-F;)le=Xs(le),x--;for(;0<F-x;)L=Xs(L),F--;for(;x--;){if(le===L||L!==null&&le===L.alternate)break t;le=Xs(le),L=Xs(L)}le=null}else le=null;ne!==null&&Zp(J,G,ne,le,!1),ae!==null&&at!==null&&Zp(J,at,ae,le,!0)}}e:{if(G=U?eo(U):window,ne=G.nodeName&&G.nodeName.toLowerCase(),ne==="select"||ne==="input"&&G.type==="file")var ue=rT;else if(xp(G))if(Op)ue=aT;else{ue=sT;var de=iT}else(ne=G.nodeName)&&ne.toLowerCase()==="input"&&(G.type==="checkbox"||G.type==="radio")&&(ue=oT);if(ue&&(ue=ue(r,U))){Vp(J,ue,a,Q);break e}de&&de(r,G,U),r==="focusout"&&(de=G._wrapperState)&&de.controlled&&G.type==="number"&&ut(G,"number",G.value)}switch(de=U?eo(U):window,r){case"focusin":(xp(de)||de.contentEditable==="true")&&(Ys=de,hh=U,Ea=null);break;case"focusout":Ea=hh=Ys=null;break;case"mousedown":fh=!0;break;case"contextmenu":case"mouseup":case"dragend":fh=!1,Bp(J,a,Q);break;case"selectionchange":if(cT)break;case"keydown":case"keyup":Bp(J,a,Q)}var pe;if(ah)e:{switch(r){case"compositionstart":var _e="onCompositionStart";break e;case"compositionend":_e="onCompositionEnd";break e;case"compositionupdate":_e="onCompositionUpdate";break e}_e=void 0}else Qs?Np(r,a)&&(_e="onCompositionEnd"):r==="keydown"&&a.keyCode===229&&(_e="onCompositionStart");_e&&(Cp&&a.locale!=="ko"&&(Qs||_e!=="onCompositionStart"?_e==="onCompositionEnd"&&Qs&&(pe=jl()):(nn=Q,$s="value"in nn?nn.value:nn.textContent,Qs=!0)),de=Ql(U,_e),0<de.length&&(_e=new _(_e,r,null,a,Q),J.push({event:_e,listeners:de}),pe?_e.data=pe:(pe=Dp(a),pe!==null&&(_e.data=pe)))),(pe=Xw?Zw(r,a):eT(r,a))&&(U=Ql(U,"onBeforeInput"),0<U.length&&(Q=new _("onBeforeInput","beforeinput",null,a,Q),J.push({event:Q,listeners:U}),Q.data=pe))}Jp(J,s)})}function Ia(r,s,a){return{instance:r,listener:s,currentTarget:a}}function Ql(r,s){for(var a=s+"Capture",c=[];r!==null;){var f=r,p=f.stateNode;f.tag===5&&p!==null&&(f=p,p=ji(r,a),p!=null&&c.unshift(Ia(r,p,f)),p=ji(r,s),p!=null&&c.push(Ia(r,p,f))),r=r.return}return c}function Xs(r){if(r===null)return null;do r=r.return;while(r&&r.tag!==5);return r||null}function Zp(r,s,a,c,f){for(var p=s._reactName,v=[];a!==null&&a!==c;){var I=a,P=I.alternate,U=I.stateNode;if(P!==null&&P===c)break;I.tag===5&&U!==null&&(I=U,f?(P=ji(a,p),P!=null&&v.unshift(Ia(a,P,I))):f||(P=ji(a,p),P!=null&&v.push(Ia(a,P,I)))),a=a.return}v.length!==0&&r.push({event:s,listeners:v})}var pT=/\r\n?/g,mT=/\u0000|\uFFFD/g;function em(r){return(typeof r=="string"?r:""+r).replace(pT,`
`).replace(mT,"")}function Yl(r,s,a){if(s=em(s),em(r)!==s&&a)throw Error(t(425))}function Jl(){}var _h=null,vh=null;function Eh(r,s){return r==="textarea"||r==="noscript"||typeof s.children=="string"||typeof s.children=="number"||typeof s.dangerouslySetInnerHTML=="object"&&s.dangerouslySetInnerHTML!==null&&s.dangerouslySetInnerHTML.__html!=null}var wh=typeof setTimeout=="function"?setTimeout:void 0,gT=typeof clearTimeout=="function"?clearTimeout:void 0,tm=typeof Promise=="function"?Promise:void 0,yT=typeof queueMicrotask=="function"?queueMicrotask:typeof tm<"u"?function(r){return tm.resolve(null).then(r).catch(_T)}:wh;function _T(r){setTimeout(function(){throw r})}function Th(r,s){var a=s,c=0;do{var f=a.nextSibling;if(r.removeChild(a),f&&f.nodeType===8)if(a=f.data,a==="/$"){if(c===0){r.removeChild(f),ti(s);return}c--}else a!=="$"&&a!=="$?"&&a!=="$!"||c++;a=f}while(a);ti(s)}function si(r){for(;r!=null;r=r.nextSibling){var s=r.nodeType;if(s===1||s===3)break;if(s===8){if(s=r.data,s==="$"||s==="$!"||s==="$?")break;if(s==="/$")return null}}return r}function nm(r){r=r.previousSibling;for(var s=0;r;){if(r.nodeType===8){var a=r.data;if(a==="$"||a==="$!"||a==="$?"){if(s===0)return r;s--}else a==="/$"&&s++}r=r.previousSibling}return null}var Zs=Math.random().toString(36).slice(2),nr="__reactFiber$"+Zs,Sa="__reactProps$"+Zs,Ar="__reactContainer$"+Zs,Ih="__reactEvents$"+Zs,vT="__reactListeners$"+Zs,ET="__reactHandles$"+Zs;function Zi(r){var s=r[nr];if(s)return s;for(var a=r.parentNode;a;){if(s=a[Ar]||a[nr]){if(a=s.alternate,s.child!==null||a!==null&&a.child!==null)for(r=nm(r);r!==null;){if(a=r[nr])return a;r=nm(r)}return s}r=a,a=r.parentNode}return null}function Ra(r){return r=r[nr]||r[Ar],!r||r.tag!==5&&r.tag!==6&&r.tag!==13&&r.tag!==3?null:r}function eo(r){if(r.tag===5||r.tag===6)return r.stateNode;throw Error(t(33))}function Xl(r){return r[Sa]||null}var Sh=[],to=-1;function oi(r){return{current:r}}function Qe(r){0>to||(r.current=Sh[to],Sh[to]=null,to--)}function qe(r,s){to++,Sh[to]=r.current,r.current=s}var ai={},Lt=oi(ai),Wt=oi(!1),es=ai;function no(r,s){var a=r.type.contextTypes;if(!a)return ai;var c=r.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===s)return c.__reactInternalMemoizedMaskedChildContext;var f={},p;for(p in a)f[p]=s[p];return c&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=s,r.__reactInternalMemoizedMaskedChildContext=f),f}function Kt(r){return r=r.childContextTypes,r!=null}function Zl(){Qe(Wt),Qe(Lt)}function rm(r,s,a){if(Lt.current!==ai)throw Error(t(168));qe(Lt,s),qe(Wt,a)}function im(r,s,a){var c=r.stateNode;if(s=s.childContextTypes,typeof c.getChildContext!="function")return a;c=c.getChildContext();for(var f in c)if(!(f in s))throw Error(t(108,be(r)||"Unknown",f));return k({},a,c)}function eu(r){return r=(r=r.stateNode)&&r.__reactInternalMemoizedMergedChildContext||ai,es=Lt.current,qe(Lt,r),qe(Wt,Wt.current),!0}function sm(r,s,a){var c=r.stateNode;if(!c)throw Error(t(169));a?(r=im(r,s,es),c.__reactInternalMemoizedMergedChildContext=r,Qe(Wt),Qe(Lt),qe(Lt,r)):Qe(Wt),qe(Wt,a)}var Cr=null,tu=!1,Rh=!1;function om(r){Cr===null?Cr=[r]:Cr.push(r)}function wT(r){tu=!0,om(r)}function li(){if(!Rh&&Cr!==null){Rh=!0;var r=0,s=De;try{var a=Cr;for(De=1;r<a.length;r++){var c=a[r];do c=c(!0);while(c!==null)}Cr=null,tu=!1}catch(f){throw Cr!==null&&(Cr=Cr.slice(r+1)),ta(Ms,li),f}finally{De=s,Rh=!1}}return null}var ro=[],io=0,nu=null,ru=0,dn=[],pn=0,ts=null,Pr=1,kr="";function ns(r,s){ro[io++]=ru,ro[io++]=nu,nu=r,ru=s}function am(r,s,a){dn[pn++]=Pr,dn[pn++]=kr,dn[pn++]=ts,ts=r;var c=Pr;r=kr;var f=32-en(c)-1;c&=~(1<<f),a+=1;var p=32-en(s)+f;if(30<p){var v=f-f%5;p=(c&(1<<v)-1).toString(32),c>>=v,f-=v,Pr=1<<32-en(s)+f|a<<f|c,kr=p+r}else Pr=1<<p|a<<f|c,kr=r}function Ah(r){r.return!==null&&(ns(r,1),am(r,1,0))}function Ch(r){for(;r===nu;)nu=ro[--io],ro[io]=null,ru=ro[--io],ro[io]=null;for(;r===ts;)ts=dn[--pn],dn[pn]=null,kr=dn[--pn],dn[pn]=null,Pr=dn[--pn],dn[pn]=null}var on=null,an=null,Xe=!1,Cn=null;function lm(r,s){var a=_n(5,null,null,0);a.elementType="DELETED",a.stateNode=s,a.return=r,s=r.deletions,s===null?(r.deletions=[a],r.flags|=16):s.push(a)}function um(r,s){switch(r.tag){case 5:var a=r.type;return s=s.nodeType!==1||a.toLowerCase()!==s.nodeName.toLowerCase()?null:s,s!==null?(r.stateNode=s,on=r,an=si(s.firstChild),!0):!1;case 6:return s=r.pendingProps===""||s.nodeType!==3?null:s,s!==null?(r.stateNode=s,on=r,an=null,!0):!1;case 13:return s=s.nodeType!==8?null:s,s!==null?(a=ts!==null?{id:Pr,overflow:kr}:null,r.memoizedState={dehydrated:s,treeContext:a,retryLane:1073741824},a=_n(18,null,null,0),a.stateNode=s,a.return=r,r.child=a,on=r,an=null,!0):!1;default:return!1}}function Ph(r){return(r.mode&1)!==0&&(r.flags&128)===0}function kh(r){if(Xe){var s=an;if(s){var a=s;if(!um(r,s)){if(Ph(r))throw Error(t(418));s=si(a.nextSibling);var c=on;s&&um(r,s)?lm(c,a):(r.flags=r.flags&-4097|2,Xe=!1,on=r)}}else{if(Ph(r))throw Error(t(418));r.flags=r.flags&-4097|2,Xe=!1,on=r}}}function cm(r){for(r=r.return;r!==null&&r.tag!==5&&r.tag!==3&&r.tag!==13;)r=r.return;on=r}function iu(r){if(r!==on)return!1;if(!Xe)return cm(r),Xe=!0,!1;var s;if((s=r.tag!==3)&&!(s=r.tag!==5)&&(s=r.type,s=s!=="head"&&s!=="body"&&!Eh(r.type,r.memoizedProps)),s&&(s=an)){if(Ph(r))throw hm(),Error(t(418));for(;s;)lm(r,s),s=si(s.nextSibling)}if(cm(r),r.tag===13){if(r=r.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(t(317));e:{for(r=r.nextSibling,s=0;r;){if(r.nodeType===8){var a=r.data;if(a==="/$"){if(s===0){an=si(r.nextSibling);break e}s--}else a!=="$"&&a!=="$!"&&a!=="$?"||s++}r=r.nextSibling}an=null}}else an=on?si(r.stateNode.nextSibling):null;return!0}function hm(){for(var r=an;r;)r=si(r.nextSibling)}function so(){an=on=null,Xe=!1}function Nh(r){Cn===null?Cn=[r]:Cn.push(r)}var TT=ve.ReactCurrentBatchConfig;function Pn(r,s){if(r&&r.defaultProps){s=k({},s),r=r.defaultProps;for(var a in r)s[a]===void 0&&(s[a]=r[a]);return s}return s}var su=oi(null),ou=null,oo=null,Dh=null;function xh(){Dh=oo=ou=null}function Vh(r){var s=su.current;Qe(su),r._currentValue=s}function Oh(r,s,a){for(;r!==null;){var c=r.alternate;if((r.childLanes&s)!==s?(r.childLanes|=s,c!==null&&(c.childLanes|=s)):c!==null&&(c.childLanes&s)!==s&&(c.childLanes|=s),r===a)break;r=r.return}}function ao(r,s){ou=r,Dh=oo=null,r=r.dependencies,r!==null&&r.firstContext!==null&&((r.lanes&s)!==0&&(Gt=!0),r.firstContext=null)}function mn(r){var s=r._currentValue;if(Dh!==r)if(r={context:r,memoizedValue:s,next:null},oo===null){if(ou===null)throw Error(t(308));oo=r,ou.dependencies={lanes:0,firstContext:r}}else oo=oo.next=r;return s}var rs=null;function Lh(r){rs===null?rs=[r]:rs.push(r)}function fm(r,s,a,c){var f=s.interleaved;return f===null?(a.next=a,Lh(s)):(a.next=f.next,f.next=a),s.interleaved=a,Nr(r,c)}function Nr(r,s){r.lanes|=s;var a=r.alternate;for(a!==null&&(a.lanes|=s),a=r,r=r.return;r!==null;)r.childLanes|=s,a=r.alternate,a!==null&&(a.childLanes|=s),a=r,r=r.return;return a.tag===3?a.stateNode:null}var ui=!1;function Mh(r){r.updateQueue={baseState:r.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function dm(r,s){r=r.updateQueue,s.updateQueue===r&&(s.updateQueue={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects})}function Dr(r,s){return{eventTime:r,lane:s,tag:0,payload:null,callback:null,next:null}}function ci(r,s,a){var c=r.updateQueue;if(c===null)return null;if(c=c.shared,(Oe&2)!==0){var f=c.pending;return f===null?s.next=s:(s.next=f.next,f.next=s),c.pending=s,Nr(r,a)}return f=c.interleaved,f===null?(s.next=s,Lh(c)):(s.next=f.next,f.next=s),c.interleaved=s,Nr(r,a)}function au(r,s,a){if(s=s.updateQueue,s!==null&&(s=s.shared,(a&4194240)!==0)){var c=s.lanes;c&=r.pendingLanes,a|=c,s.lanes=a,aa(r,a)}}function pm(r,s){var a=r.updateQueue,c=r.alternate;if(c!==null&&(c=c.updateQueue,a===c)){var f=null,p=null;if(a=a.firstBaseUpdate,a!==null){do{var v={eventTime:a.eventTime,lane:a.lane,tag:a.tag,payload:a.payload,callback:a.callback,next:null};p===null?f=p=v:p=p.next=v,a=a.next}while(a!==null);p===null?f=p=s:p=p.next=s}else f=p=s;a={baseState:c.baseState,firstBaseUpdate:f,lastBaseUpdate:p,shared:c.shared,effects:c.effects},r.updateQueue=a;return}r=a.lastBaseUpdate,r===null?a.firstBaseUpdate=s:r.next=s,a.lastBaseUpdate=s}function lu(r,s,a,c){var f=r.updateQueue;ui=!1;var p=f.firstBaseUpdate,v=f.lastBaseUpdate,I=f.shared.pending;if(I!==null){f.shared.pending=null;var P=I,U=P.next;P.next=null,v===null?p=U:v.next=U,v=P;var Q=r.alternate;Q!==null&&(Q=Q.updateQueue,I=Q.lastBaseUpdate,I!==v&&(I===null?Q.firstBaseUpdate=U:I.next=U,Q.lastBaseUpdate=P))}if(p!==null){var J=f.baseState;v=0,Q=U=P=null,I=p;do{var G=I.lane,ne=I.eventTime;if((c&G)===G){Q!==null&&(Q=Q.next={eventTime:ne,lane:0,tag:I.tag,payload:I.payload,callback:I.callback,next:null});e:{var ae=r,le=I;switch(G=s,ne=a,le.tag){case 1:if(ae=le.payload,typeof ae=="function"){J=ae.call(ne,J,G);break e}J=ae;break e;case 3:ae.flags=ae.flags&-65537|128;case 0:if(ae=le.payload,G=typeof ae=="function"?ae.call(ne,J,G):ae,G==null)break e;J=k({},J,G);break e;case 2:ui=!0}}I.callback!==null&&I.lane!==0&&(r.flags|=64,G=f.effects,G===null?f.effects=[I]:G.push(I))}else ne={eventTime:ne,lane:G,tag:I.tag,payload:I.payload,callback:I.callback,next:null},Q===null?(U=Q=ne,P=J):Q=Q.next=ne,v|=G;if(I=I.next,I===null){if(I=f.shared.pending,I===null)break;G=I,I=G.next,G.next=null,f.lastBaseUpdate=G,f.shared.pending=null}}while(!0);if(Q===null&&(P=J),f.baseState=P,f.firstBaseUpdate=U,f.lastBaseUpdate=Q,s=f.shared.interleaved,s!==null){f=s;do v|=f.lane,f=f.next;while(f!==s)}else p===null&&(f.shared.lanes=0);os|=v,r.lanes=v,r.memoizedState=J}}function mm(r,s,a){if(r=s.effects,s.effects=null,r!==null)for(s=0;s<r.length;s++){var c=r[s],f=c.callback;if(f!==null){if(c.callback=null,c=a,typeof f!="function")throw Error(t(191,f));f.call(c)}}}var gm=new n.Component().refs;function bh(r,s,a,c){s=r.memoizedState,a=a(c,s),a=a==null?s:k({},s,a),r.memoizedState=a,r.lanes===0&&(r.updateQueue.baseState=a)}var uu={isMounted:function(r){return(r=r._reactInternals)?Sn(r)===r:!1},enqueueSetState:function(r,s,a){r=r._reactInternals;var c=Ht(),f=pi(r),p=Dr(c,f);p.payload=s,a!=null&&(p.callback=a),s=ci(r,p,f),s!==null&&(Dn(s,r,f,c),au(s,r,f))},enqueueReplaceState:function(r,s,a){r=r._reactInternals;var c=Ht(),f=pi(r),p=Dr(c,f);p.tag=1,p.payload=s,a!=null&&(p.callback=a),s=ci(r,p,f),s!==null&&(Dn(s,r,f,c),au(s,r,f))},enqueueForceUpdate:function(r,s){r=r._reactInternals;var a=Ht(),c=pi(r),f=Dr(a,c);f.tag=2,s!=null&&(f.callback=s),s=ci(r,f,c),s!==null&&(Dn(s,r,c,a),au(s,r,c))}};function ym(r,s,a,c,f,p,v){return r=r.stateNode,typeof r.shouldComponentUpdate=="function"?r.shouldComponentUpdate(c,p,v):s.prototype&&s.prototype.isPureReactComponent?!va(a,c)||!va(f,p):!0}function _m(r,s,a){var c=!1,f=ai,p=s.contextType;return typeof p=="object"&&p!==null?p=mn(p):(f=Kt(s)?es:Lt.current,c=s.contextTypes,p=(c=c!=null)?no(r,f):ai),s=new s(a,p),r.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=uu,r.stateNode=s,s._reactInternals=r,c&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=f,r.__reactInternalMemoizedMaskedChildContext=p),s}function vm(r,s,a,c){r=s.state,typeof s.componentWillReceiveProps=="function"&&s.componentWillReceiveProps(a,c),typeof s.UNSAFE_componentWillReceiveProps=="function"&&s.UNSAFE_componentWillReceiveProps(a,c),s.state!==r&&uu.enqueueReplaceState(s,s.state,null)}function Fh(r,s,a,c){var f=r.stateNode;f.props=a,f.state=r.memoizedState,f.refs=gm,Mh(r);var p=s.contextType;typeof p=="object"&&p!==null?f.context=mn(p):(p=Kt(s)?es:Lt.current,f.context=no(r,p)),f.state=r.memoizedState,p=s.getDerivedStateFromProps,typeof p=="function"&&(bh(r,s,p,a),f.state=r.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(s=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),s!==f.state&&uu.enqueueReplaceState(f,f.state,null),lu(r,a,f,c),f.state=r.memoizedState),typeof f.componentDidMount=="function"&&(r.flags|=4194308)}function Aa(r,s,a){if(r=a.ref,r!==null&&typeof r!="function"&&typeof r!="object"){if(a._owner){if(a=a._owner,a){if(a.tag!==1)throw Error(t(309));var c=a.stateNode}if(!c)throw Error(t(147,r));var f=c,p=""+r;return s!==null&&s.ref!==null&&typeof s.ref=="function"&&s.ref._stringRef===p?s.ref:(s=function(v){var I=f.refs;I===gm&&(I=f.refs={}),v===null?delete I[p]:I[p]=v},s._stringRef=p,s)}if(typeof r!="string")throw Error(t(284));if(!a._owner)throw Error(t(290,r))}return r}function cu(r,s){throw r=Object.prototype.toString.call(s),Error(t(31,r==="[object Object]"?"object with keys {"+Object.keys(s).join(", ")+"}":r))}function Em(r){var s=r._init;return s(r._payload)}function wm(r){function s(L,x){if(r){var F=L.deletions;F===null?(L.deletions=[x],L.flags|=16):F.push(x)}}function a(L,x){if(!r)return null;for(;x!==null;)s(L,x),x=x.sibling;return null}function c(L,x){for(L=new Map;x!==null;)x.key!==null?L.set(x.key,x):L.set(x.index,x),x=x.sibling;return L}function f(L,x){return L=gi(L,x),L.index=0,L.sibling=null,L}function p(L,x,F){return L.index=F,r?(F=L.alternate,F!==null?(F=F.index,F<x?(L.flags|=2,x):F):(L.flags|=2,x)):(L.flags|=1048576,x)}function v(L){return r&&L.alternate===null&&(L.flags|=2),L}function I(L,x,F,X){return x===null||x.tag!==6?(x=Tf(F,L.mode,X),x.return=L,x):(x=f(x,F),x.return=L,x)}function P(L,x,F,X){var ue=F.type;return ue===N?Q(L,x,F.props.children,X,F.key):x!==null&&(x.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===Vt&&Em(ue)===x.type)?(X=f(x,F.props),X.ref=Aa(L,x,F),X.return=L,X):(X=ku(F.type,F.key,F.props,null,L.mode,X),X.ref=Aa(L,x,F),X.return=L,X)}function U(L,x,F,X){return x===null||x.tag!==4||x.stateNode.containerInfo!==F.containerInfo||x.stateNode.implementation!==F.implementation?(x=If(F,L.mode,X),x.return=L,x):(x=f(x,F.children||[]),x.return=L,x)}function Q(L,x,F,X,ue){return x===null||x.tag!==7?(x=cs(F,L.mode,X,ue),x.return=L,x):(x=f(x,F),x.return=L,x)}function J(L,x,F){if(typeof x=="string"&&x!==""||typeof x=="number")return x=Tf(""+x,L.mode,F),x.return=L,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ye:return F=ku(x.type,x.key,x.props,null,L.mode,F),F.ref=Aa(L,null,x),F.return=L,F;case Ie:return x=If(x,L.mode,F),x.return=L,x;case Vt:var X=x._init;return J(L,X(x._payload),F)}if(st(x)||fe(x))return x=cs(x,L.mode,F,null),x.return=L,x;cu(L,x)}return null}function G(L,x,F,X){var ue=x!==null?x.key:null;if(typeof F=="string"&&F!==""||typeof F=="number")return ue!==null?null:I(L,x,""+F,X);if(typeof F=="object"&&F!==null){switch(F.$$typeof){case ye:return F.key===ue?P(L,x,F,X):null;case Ie:return F.key===ue?U(L,x,F,X):null;case Vt:return ue=F._init,G(L,x,ue(F._payload),X)}if(st(F)||fe(F))return ue!==null?null:Q(L,x,F,X,null);cu(L,F)}return null}function ne(L,x,F,X,ue){if(typeof X=="string"&&X!==""||typeof X=="number")return L=L.get(F)||null,I(x,L,""+X,ue);if(typeof X=="object"&&X!==null){switch(X.$$typeof){case ye:return L=L.get(X.key===null?F:X.key)||null,P(x,L,X,ue);case Ie:return L=L.get(X.key===null?F:X.key)||null,U(x,L,X,ue);case Vt:var de=X._init;return ne(L,x,F,de(X._payload),ue)}if(st(X)||fe(X))return L=L.get(F)||null,Q(x,L,X,ue,null);cu(x,X)}return null}function ae(L,x,F,X){for(var ue=null,de=null,pe=x,_e=x=0,Et=null;pe!==null&&_e<F.length;_e++){pe.index>_e?(Et=pe,pe=null):Et=pe.sibling;var Le=G(L,pe,F[_e],X);if(Le===null){pe===null&&(pe=Et);break}r&&pe&&Le.alternate===null&&s(L,pe),x=p(Le,x,_e),de===null?ue=Le:de.sibling=Le,de=Le,pe=Et}if(_e===F.length)return a(L,pe),Xe&&ns(L,_e),ue;if(pe===null){for(;_e<F.length;_e++)pe=J(L,F[_e],X),pe!==null&&(x=p(pe,x,_e),de===null?ue=pe:de.sibling=pe,de=pe);return Xe&&ns(L,_e),ue}for(pe=c(L,pe);_e<F.length;_e++)Et=ne(pe,L,_e,F[_e],X),Et!==null&&(r&&Et.alternate!==null&&pe.delete(Et.key===null?_e:Et.key),x=p(Et,x,_e),de===null?ue=Et:de.sibling=Et,de=Et);return r&&pe.forEach(function(yi){return s(L,yi)}),Xe&&ns(L,_e),ue}function le(L,x,F,X){var ue=fe(F);if(typeof ue!="function")throw Error(t(150));if(F=ue.call(F),F==null)throw Error(t(151));for(var de=ue=null,pe=x,_e=x=0,Et=null,Le=F.next();pe!==null&&!Le.done;_e++,Le=F.next()){pe.index>_e?(Et=pe,pe=null):Et=pe.sibling;var yi=G(L,pe,Le.value,X);if(yi===null){pe===null&&(pe=Et);break}r&&pe&&yi.alternate===null&&s(L,pe),x=p(yi,x,_e),de===null?ue=yi:de.sibling=yi,de=yi,pe=Et}if(Le.done)return a(L,pe),Xe&&ns(L,_e),ue;if(pe===null){for(;!Le.done;_e++,Le=F.next())Le=J(L,Le.value,X),Le!==null&&(x=p(Le,x,_e),de===null?ue=Le:de.sibling=Le,de=Le);return Xe&&ns(L,_e),ue}for(pe=c(L,pe);!Le.done;_e++,Le=F.next())Le=ne(pe,L,_e,Le.value,X),Le!==null&&(r&&Le.alternate!==null&&pe.delete(Le.key===null?_e:Le.key),x=p(Le,x,_e),de===null?ue=Le:de.sibling=Le,de=Le);return r&&pe.forEach(function(tI){return s(L,tI)}),Xe&&ns(L,_e),ue}function at(L,x,F,X){if(typeof F=="object"&&F!==null&&F.type===N&&F.key===null&&(F=F.props.children),typeof F=="object"&&F!==null){switch(F.$$typeof){case ye:e:{for(var ue=F.key,de=x;de!==null;){if(de.key===ue){if(ue=F.type,ue===N){if(de.tag===7){a(L,de.sibling),x=f(de,F.props.children),x.return=L,L=x;break e}}else if(de.elementType===ue||typeof ue=="object"&&ue!==null&&ue.$$typeof===Vt&&Em(ue)===de.type){a(L,de.sibling),x=f(de,F.props),x.ref=Aa(L,de,F),x.return=L,L=x;break e}a(L,de);break}else s(L,de);de=de.sibling}F.type===N?(x=cs(F.props.children,L.mode,X,F.key),x.return=L,L=x):(X=ku(F.type,F.key,F.props,null,L.mode,X),X.ref=Aa(L,x,F),X.return=L,L=X)}return v(L);case Ie:e:{for(de=F.key;x!==null;){if(x.key===de)if(x.tag===4&&x.stateNode.containerInfo===F.containerInfo&&x.stateNode.implementation===F.implementation){a(L,x.sibling),x=f(x,F.children||[]),x.return=L,L=x;break e}else{a(L,x);break}else s(L,x);x=x.sibling}x=If(F,L.mode,X),x.return=L,L=x}return v(L);case Vt:return de=F._init,at(L,x,de(F._payload),X)}if(st(F))return ae(L,x,F,X);if(fe(F))return le(L,x,F,X);cu(L,F)}return typeof F=="string"&&F!==""||typeof F=="number"?(F=""+F,x!==null&&x.tag===6?(a(L,x.sibling),x=f(x,F),x.return=L,L=x):(a(L,x),x=Tf(F,L.mode,X),x.return=L,L=x),v(L)):a(L,x)}return at}var lo=wm(!0),Tm=wm(!1),Ca={},rr=oi(Ca),Pa=oi(Ca),ka=oi(Ca);function is(r){if(r===Ca)throw Error(t(174));return r}function Uh(r,s){switch(qe(ka,s),qe(Pa,r),qe(rr,Ca),r=s.nodeType,r){case 9:case 11:s=(s=s.documentElement)?s.namespaceURI:Ns(null,"");break;default:r=r===8?s.parentNode:s,s=r.namespaceURI||null,r=r.tagName,s=Ns(s,r)}Qe(rr),qe(rr,s)}function uo(){Qe(rr),Qe(Pa),Qe(ka)}function Im(r){is(ka.current);var s=is(rr.current),a=Ns(s,r.type);s!==a&&(qe(Pa,r),qe(rr,a))}function jh(r){Pa.current===r&&(Qe(rr),Qe(Pa))}var et=oi(0);function hu(r){for(var s=r;s!==null;){if(s.tag===13){var a=s.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return s}else if(s.tag===19&&s.memoizedProps.revealOrder!==void 0){if((s.flags&128)!==0)return s}else if(s.child!==null){s.child.return=s,s=s.child;continue}if(s===r)break;for(;s.sibling===null;){if(s.return===null||s.return===r)return null;s=s.return}s.sibling.return=s.return,s=s.sibling}return null}var zh=[];function Bh(){for(var r=0;r<zh.length;r++)zh[r]._workInProgressVersionPrimary=null;zh.length=0}var fu=ve.ReactCurrentDispatcher,$h=ve.ReactCurrentBatchConfig,ss=0,tt=null,mt=null,_t=null,du=!1,Na=!1,Da=0,IT=0;function Mt(){throw Error(t(321))}function Hh(r,s){if(s===null)return!1;for(var a=0;a<s.length&&a<r.length;a++)if(!An(r[a],s[a]))return!1;return!0}function qh(r,s,a,c,f,p){if(ss=p,tt=s,s.memoizedState=null,s.updateQueue=null,s.lanes=0,fu.current=r===null||r.memoizedState===null?CT:PT,r=a(c,f),Na){p=0;do{if(Na=!1,Da=0,25<=p)throw Error(t(301));p+=1,_t=mt=null,s.updateQueue=null,fu.current=kT,r=a(c,f)}while(Na)}if(fu.current=gu,s=mt!==null&&mt.next!==null,ss=0,_t=mt=tt=null,du=!1,s)throw Error(t(300));return r}function Wh(){var r=Da!==0;return Da=0,r}function ir(){var r={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _t===null?tt.memoizedState=_t=r:_t=_t.next=r,_t}function gn(){if(mt===null){var r=tt.alternate;r=r!==null?r.memoizedState:null}else r=mt.next;var s=_t===null?tt.memoizedState:_t.next;if(s!==null)_t=s,mt=r;else{if(r===null)throw Error(t(310));mt=r,r={memoizedState:mt.memoizedState,baseState:mt.baseState,baseQueue:mt.baseQueue,queue:mt.queue,next:null},_t===null?tt.memoizedState=_t=r:_t=_t.next=r}return _t}function xa(r,s){return typeof s=="function"?s(r):s}function Kh(r){var s=gn(),a=s.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=r;var c=mt,f=c.baseQueue,p=a.pending;if(p!==null){if(f!==null){var v=f.next;f.next=p.next,p.next=v}c.baseQueue=f=p,a.pending=null}if(f!==null){p=f.next,c=c.baseState;var I=v=null,P=null,U=p;do{var Q=U.lane;if((ss&Q)===Q)P!==null&&(P=P.next={lane:0,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null}),c=U.hasEagerState?U.eagerState:r(c,U.action);else{var J={lane:Q,action:U.action,hasEagerState:U.hasEagerState,eagerState:U.eagerState,next:null};P===null?(I=P=J,v=c):P=P.next=J,tt.lanes|=Q,os|=Q}U=U.next}while(U!==null&&U!==p);P===null?v=c:P.next=I,An(c,s.memoizedState)||(Gt=!0),s.memoizedState=c,s.baseState=v,s.baseQueue=P,a.lastRenderedState=c}if(r=a.interleaved,r!==null){f=r;do p=f.lane,tt.lanes|=p,os|=p,f=f.next;while(f!==r)}else f===null&&(a.lanes=0);return[s.memoizedState,a.dispatch]}function Gh(r){var s=gn(),a=s.queue;if(a===null)throw Error(t(311));a.lastRenderedReducer=r;var c=a.dispatch,f=a.pending,p=s.memoizedState;if(f!==null){a.pending=null;var v=f=f.next;do p=r(p,v.action),v=v.next;while(v!==f);An(p,s.memoizedState)||(Gt=!0),s.memoizedState=p,s.baseQueue===null&&(s.baseState=p),a.lastRenderedState=p}return[p,c]}function Sm(){}function Rm(r,s){var a=tt,c=gn(),f=s(),p=!An(c.memoizedState,f);if(p&&(c.memoizedState=f,Gt=!0),c=c.queue,Qh(Pm.bind(null,a,c,r),[r]),c.getSnapshot!==s||p||_t!==null&&_t.memoizedState.tag&1){if(a.flags|=2048,Va(9,Cm.bind(null,a,c,f,s),void 0,null),vt===null)throw Error(t(349));(ss&30)!==0||Am(a,s,f)}return f}function Am(r,s,a){r.flags|=16384,r={getSnapshot:s,value:a},s=tt.updateQueue,s===null?(s={lastEffect:null,stores:null},tt.updateQueue=s,s.stores=[r]):(a=s.stores,a===null?s.stores=[r]:a.push(r))}function Cm(r,s,a,c){s.value=a,s.getSnapshot=c,km(s)&&Nm(r)}function Pm(r,s,a){return a(function(){km(s)&&Nm(r)})}function km(r){var s=r.getSnapshot;r=r.value;try{var a=s();return!An(r,a)}catch{return!0}}function Nm(r){var s=Nr(r,1);s!==null&&Dn(s,r,1,-1)}function Dm(r){var s=ir();return typeof r=="function"&&(r=r()),s.memoizedState=s.baseState=r,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xa,lastRenderedState:r},s.queue=r,r=r.dispatch=AT.bind(null,tt,r),[s.memoizedState,r]}function Va(r,s,a,c){return r={tag:r,create:s,destroy:a,deps:c,next:null},s=tt.updateQueue,s===null?(s={lastEffect:null,stores:null},tt.updateQueue=s,s.lastEffect=r.next=r):(a=s.lastEffect,a===null?s.lastEffect=r.next=r:(c=a.next,a.next=r,r.next=c,s.lastEffect=r)),r}function xm(){return gn().memoizedState}function pu(r,s,a,c){var f=ir();tt.flags|=r,f.memoizedState=Va(1|s,a,void 0,c===void 0?null:c)}function mu(r,s,a,c){var f=gn();c=c===void 0?null:c;var p=void 0;if(mt!==null){var v=mt.memoizedState;if(p=v.destroy,c!==null&&Hh(c,v.deps)){f.memoizedState=Va(s,a,p,c);return}}tt.flags|=r,f.memoizedState=Va(1|s,a,p,c)}function Vm(r,s){return pu(8390656,8,r,s)}function Qh(r,s){return mu(2048,8,r,s)}function Om(r,s){return mu(4,2,r,s)}function Lm(r,s){return mu(4,4,r,s)}function Mm(r,s){if(typeof s=="function")return r=r(),s(r),function(){s(null)};if(s!=null)return r=r(),s.current=r,function(){s.current=null}}function bm(r,s,a){return a=a!=null?a.concat([r]):null,mu(4,4,Mm.bind(null,s,r),a)}function Yh(){}function Fm(r,s){var a=gn();s=s===void 0?null:s;var c=a.memoizedState;return c!==null&&s!==null&&Hh(s,c[1])?c[0]:(a.memoizedState=[r,s],r)}function Um(r,s){var a=gn();s=s===void 0?null:s;var c=a.memoizedState;return c!==null&&s!==null&&Hh(s,c[1])?c[0]:(r=r(),a.memoizedState=[r,s],r)}function jm(r,s,a){return(ss&21)===0?(r.baseState&&(r.baseState=!1,Gt=!0),r.memoizedState=a):(An(a,s)||(a=sa(),tt.lanes|=a,os|=a,r.baseState=!0),s)}function ST(r,s){var a=De;De=a!==0&&4>a?a:4,r(!0);var c=$h.transition;$h.transition={};try{r(!1),s()}finally{De=a,$h.transition=c}}function zm(){return gn().memoizedState}function RT(r,s,a){var c=pi(r);if(a={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null},Bm(r))$m(s,a);else if(a=fm(r,s,a,c),a!==null){var f=Ht();Dn(a,r,c,f),Hm(a,s,c)}}function AT(r,s,a){var c=pi(r),f={lane:c,action:a,hasEagerState:!1,eagerState:null,next:null};if(Bm(r))$m(s,f);else{var p=r.alternate;if(r.lanes===0&&(p===null||p.lanes===0)&&(p=s.lastRenderedReducer,p!==null))try{var v=s.lastRenderedState,I=p(v,a);if(f.hasEagerState=!0,f.eagerState=I,An(I,v)){var P=s.interleaved;P===null?(f.next=f,Lh(s)):(f.next=P.next,P.next=f),s.interleaved=f;return}}catch{}finally{}a=fm(r,s,f,c),a!==null&&(f=Ht(),Dn(a,r,c,f),Hm(a,s,c))}}function Bm(r){var s=r.alternate;return r===tt||s!==null&&s===tt}function $m(r,s){Na=du=!0;var a=r.pending;a===null?s.next=s:(s.next=a.next,a.next=s),r.pending=s}function Hm(r,s,a){if((a&4194240)!==0){var c=s.lanes;c&=r.pendingLanes,a|=c,s.lanes=a,aa(r,a)}}var gu={readContext:mn,useCallback:Mt,useContext:Mt,useEffect:Mt,useImperativeHandle:Mt,useInsertionEffect:Mt,useLayoutEffect:Mt,useMemo:Mt,useReducer:Mt,useRef:Mt,useState:Mt,useDebugValue:Mt,useDeferredValue:Mt,useTransition:Mt,useMutableSource:Mt,useSyncExternalStore:Mt,useId:Mt,unstable_isNewReconciler:!1},CT={readContext:mn,useCallback:function(r,s){return ir().memoizedState=[r,s===void 0?null:s],r},useContext:mn,useEffect:Vm,useImperativeHandle:function(r,s,a){return a=a!=null?a.concat([r]):null,pu(4194308,4,Mm.bind(null,s,r),a)},useLayoutEffect:function(r,s){return pu(4194308,4,r,s)},useInsertionEffect:function(r,s){return pu(4,2,r,s)},useMemo:function(r,s){var a=ir();return s=s===void 0?null:s,r=r(),a.memoizedState=[r,s],r},useReducer:function(r,s,a){var c=ir();return s=a!==void 0?a(s):s,c.memoizedState=c.baseState=s,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:r,lastRenderedState:s},c.queue=r,r=r.dispatch=RT.bind(null,tt,r),[c.memoizedState,r]},useRef:function(r){var s=ir();return r={current:r},s.memoizedState=r},useState:Dm,useDebugValue:Yh,useDeferredValue:function(r){return ir().memoizedState=r},useTransition:function(){var r=Dm(!1),s=r[0];return r=ST.bind(null,r[1]),ir().memoizedState=r,[s,r]},useMutableSource:function(){},useSyncExternalStore:function(r,s,a){var c=tt,f=ir();if(Xe){if(a===void 0)throw Error(t(407));a=a()}else{if(a=s(),vt===null)throw Error(t(349));(ss&30)!==0||Am(c,s,a)}f.memoizedState=a;var p={value:a,getSnapshot:s};return f.queue=p,Vm(Pm.bind(null,c,p,r),[r]),c.flags|=2048,Va(9,Cm.bind(null,c,p,a,s),void 0,null),a},useId:function(){var r=ir(),s=vt.identifierPrefix;if(Xe){var a=kr,c=Pr;a=(c&~(1<<32-en(c)-1)).toString(32)+a,s=":"+s+"R"+a,a=Da++,0<a&&(s+="H"+a.toString(32)),s+=":"}else a=IT++,s=":"+s+"r"+a.toString(32)+":";return r.memoizedState=s},unstable_isNewReconciler:!1},PT={readContext:mn,useCallback:Fm,useContext:mn,useEffect:Qh,useImperativeHandle:bm,useInsertionEffect:Om,useLayoutEffect:Lm,useMemo:Um,useReducer:Kh,useRef:xm,useState:function(){return Kh(xa)},useDebugValue:Yh,useDeferredValue:function(r){var s=gn();return jm(s,mt.memoizedState,r)},useTransition:function(){var r=Kh(xa)[0],s=gn().memoizedState;return[r,s]},useMutableSource:Sm,useSyncExternalStore:Rm,useId:zm,unstable_isNewReconciler:!1},kT={readContext:mn,useCallback:Fm,useContext:mn,useEffect:Qh,useImperativeHandle:bm,useInsertionEffect:Om,useLayoutEffect:Lm,useMemo:Um,useReducer:Gh,useRef:xm,useState:function(){return Gh(xa)},useDebugValue:Yh,useDeferredValue:function(r){var s=gn();return mt===null?s.memoizedState=r:jm(s,mt.memoizedState,r)},useTransition:function(){var r=Gh(xa)[0],s=gn().memoizedState;return[r,s]},useMutableSource:Sm,useSyncExternalStore:Rm,useId:zm,unstable_isNewReconciler:!1};function co(r,s){try{var a="",c=s;do a+=Ue(c),c=c.return;while(c);var f=a}catch(p){f=`
Error generating stack: `+p.message+`
`+p.stack}return{value:r,source:s,stack:f,digest:null}}function Jh(r,s,a){return{value:r,source:null,stack:a??null,digest:s??null}}function Xh(r,s){try{console.error(s.value)}catch(a){setTimeout(function(){throw a})}}var NT=typeof WeakMap=="function"?WeakMap:Map;function qm(r,s,a){a=Dr(-1,a),a.tag=3,a.payload={element:null};var c=s.value;return a.callback=function(){Iu||(Iu=!0,pf=c),Xh(r,s)},a}function Wm(r,s,a){a=Dr(-1,a),a.tag=3;var c=r.type.getDerivedStateFromError;if(typeof c=="function"){var f=s.value;a.payload=function(){return c(f)},a.callback=function(){Xh(r,s)}}var p=r.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(a.callback=function(){Xh(r,s),typeof c!="function"&&(fi===null?fi=new Set([this]):fi.add(this));var v=s.stack;this.componentDidCatch(s.value,{componentStack:v!==null?v:""})}),a}function Km(r,s,a){var c=r.pingCache;if(c===null){c=r.pingCache=new NT;var f=new Set;c.set(s,f)}else f=c.get(s),f===void 0&&(f=new Set,c.set(s,f));f.has(a)||(f.add(a),r=HT.bind(null,r,s,a),s.then(r,r))}function Gm(r){do{var s;if((s=r.tag===13)&&(s=r.memoizedState,s=s!==null?s.dehydrated!==null:!0),s)return r;r=r.return}while(r!==null);return null}function Qm(r,s,a,c,f){return(r.mode&1)===0?(r===s?r.flags|=65536:(r.flags|=128,a.flags|=131072,a.flags&=-52805,a.tag===1&&(a.alternate===null?a.tag=17:(s=Dr(-1,1),s.tag=2,ci(a,s,1))),a.lanes|=1),r):(r.flags|=65536,r.lanes=f,r)}var DT=ve.ReactCurrentOwner,Gt=!1;function $t(r,s,a,c){s.child=r===null?Tm(s,null,a,c):lo(s,r.child,a,c)}function Ym(r,s,a,c,f){a=a.render;var p=s.ref;return ao(s,f),c=qh(r,s,a,c,p,f),a=Wh(),r!==null&&!Gt?(s.updateQueue=r.updateQueue,s.flags&=-2053,r.lanes&=~f,xr(r,s,f)):(Xe&&a&&Ah(s),s.flags|=1,$t(r,s,c,f),s.child)}function Jm(r,s,a,c,f){if(r===null){var p=a.type;return typeof p=="function"&&!wf(p)&&p.defaultProps===void 0&&a.compare===null&&a.defaultProps===void 0?(s.tag=15,s.type=p,Xm(r,s,p,c,f)):(r=ku(a.type,null,c,s,s.mode,f),r.ref=s.ref,r.return=s,s.child=r)}if(p=r.child,(r.lanes&f)===0){var v=p.memoizedProps;if(a=a.compare,a=a!==null?a:va,a(v,c)&&r.ref===s.ref)return xr(r,s,f)}return s.flags|=1,r=gi(p,c),r.ref=s.ref,r.return=s,s.child=r}function Xm(r,s,a,c,f){if(r!==null){var p=r.memoizedProps;if(va(p,c)&&r.ref===s.ref)if(Gt=!1,s.pendingProps=c=p,(r.lanes&f)!==0)(r.flags&131072)!==0&&(Gt=!0);else return s.lanes=r.lanes,xr(r,s,f)}return Zh(r,s,a,c,f)}function Zm(r,s,a){var c=s.pendingProps,f=c.children,p=r!==null?r.memoizedState:null;if(c.mode==="hidden")if((s.mode&1)===0)s.memoizedState={baseLanes:0,cachePool:null,transitions:null},qe(fo,ln),ln|=a;else{if((a&1073741824)===0)return r=p!==null?p.baseLanes|a:a,s.lanes=s.childLanes=1073741824,s.memoizedState={baseLanes:r,cachePool:null,transitions:null},s.updateQueue=null,qe(fo,ln),ln|=r,null;s.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:a,qe(fo,ln),ln|=c}else p!==null?(c=p.baseLanes|a,s.memoizedState=null):c=a,qe(fo,ln),ln|=c;return $t(r,s,f,a),s.child}function eg(r,s){var a=s.ref;(r===null&&a!==null||r!==null&&r.ref!==a)&&(s.flags|=512,s.flags|=2097152)}function Zh(r,s,a,c,f){var p=Kt(a)?es:Lt.current;return p=no(s,p),ao(s,f),a=qh(r,s,a,c,p,f),c=Wh(),r!==null&&!Gt?(s.updateQueue=r.updateQueue,s.flags&=-2053,r.lanes&=~f,xr(r,s,f)):(Xe&&c&&Ah(s),s.flags|=1,$t(r,s,a,f),s.child)}function tg(r,s,a,c,f){if(Kt(a)){var p=!0;eu(s)}else p=!1;if(ao(s,f),s.stateNode===null)_u(r,s),_m(s,a,c),Fh(s,a,c,f),c=!0;else if(r===null){var v=s.stateNode,I=s.memoizedProps;v.props=I;var P=v.context,U=a.contextType;typeof U=="object"&&U!==null?U=mn(U):(U=Kt(a)?es:Lt.current,U=no(s,U));var Q=a.getDerivedStateFromProps,J=typeof Q=="function"||typeof v.getSnapshotBeforeUpdate=="function";J||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==c||P!==U)&&vm(s,v,c,U),ui=!1;var G=s.memoizedState;v.state=G,lu(s,c,v,f),P=s.memoizedState,I!==c||G!==P||Wt.current||ui?(typeof Q=="function"&&(bh(s,a,Q,c),P=s.memoizedState),(I=ui||ym(s,a,I,c,G,P,U))?(J||typeof v.UNSAFE_componentWillMount!="function"&&typeof v.componentWillMount!="function"||(typeof v.componentWillMount=="function"&&v.componentWillMount(),typeof v.UNSAFE_componentWillMount=="function"&&v.UNSAFE_componentWillMount()),typeof v.componentDidMount=="function"&&(s.flags|=4194308)):(typeof v.componentDidMount=="function"&&(s.flags|=4194308),s.memoizedProps=c,s.memoizedState=P),v.props=c,v.state=P,v.context=U,c=I):(typeof v.componentDidMount=="function"&&(s.flags|=4194308),c=!1)}else{v=s.stateNode,dm(r,s),I=s.memoizedProps,U=s.type===s.elementType?I:Pn(s.type,I),v.props=U,J=s.pendingProps,G=v.context,P=a.contextType,typeof P=="object"&&P!==null?P=mn(P):(P=Kt(a)?es:Lt.current,P=no(s,P));var ne=a.getDerivedStateFromProps;(Q=typeof ne=="function"||typeof v.getSnapshotBeforeUpdate=="function")||typeof v.UNSAFE_componentWillReceiveProps!="function"&&typeof v.componentWillReceiveProps!="function"||(I!==J||G!==P)&&vm(s,v,c,P),ui=!1,G=s.memoizedState,v.state=G,lu(s,c,v,f);var ae=s.memoizedState;I!==J||G!==ae||Wt.current||ui?(typeof ne=="function"&&(bh(s,a,ne,c),ae=s.memoizedState),(U=ui||ym(s,a,U,c,G,ae,P)||!1)?(Q||typeof v.UNSAFE_componentWillUpdate!="function"&&typeof v.componentWillUpdate!="function"||(typeof v.componentWillUpdate=="function"&&v.componentWillUpdate(c,ae,P),typeof v.UNSAFE_componentWillUpdate=="function"&&v.UNSAFE_componentWillUpdate(c,ae,P)),typeof v.componentDidUpdate=="function"&&(s.flags|=4),typeof v.getSnapshotBeforeUpdate=="function"&&(s.flags|=1024)):(typeof v.componentDidUpdate!="function"||I===r.memoizedProps&&G===r.memoizedState||(s.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===r.memoizedProps&&G===r.memoizedState||(s.flags|=1024),s.memoizedProps=c,s.memoizedState=ae),v.props=c,v.state=ae,v.context=P,c=U):(typeof v.componentDidUpdate!="function"||I===r.memoizedProps&&G===r.memoizedState||(s.flags|=4),typeof v.getSnapshotBeforeUpdate!="function"||I===r.memoizedProps&&G===r.memoizedState||(s.flags|=1024),c=!1)}return ef(r,s,a,c,p,f)}function ef(r,s,a,c,f,p){eg(r,s);var v=(s.flags&128)!==0;if(!c&&!v)return f&&sm(s,a,!1),xr(r,s,p);c=s.stateNode,DT.current=s;var I=v&&typeof a.getDerivedStateFromError!="function"?null:c.render();return s.flags|=1,r!==null&&v?(s.child=lo(s,r.child,null,p),s.child=lo(s,null,I,p)):$t(r,s,I,p),s.memoizedState=c.state,f&&sm(s,a,!0),s.child}function ng(r){var s=r.stateNode;s.pendingContext?rm(r,s.pendingContext,s.pendingContext!==s.context):s.context&&rm(r,s.context,!1),Uh(r,s.containerInfo)}function rg(r,s,a,c,f){return so(),Nh(f),s.flags|=256,$t(r,s,a,c),s.child}var tf={dehydrated:null,treeContext:null,retryLane:0};function nf(r){return{baseLanes:r,cachePool:null,transitions:null}}function ig(r,s,a){var c=s.pendingProps,f=et.current,p=!1,v=(s.flags&128)!==0,I;if((I=v)||(I=r!==null&&r.memoizedState===null?!1:(f&2)!==0),I?(p=!0,s.flags&=-129):(r===null||r.memoizedState!==null)&&(f|=1),qe(et,f&1),r===null)return kh(s),r=s.memoizedState,r!==null&&(r=r.dehydrated,r!==null)?((s.mode&1)===0?s.lanes=1:r.data==="$!"?s.lanes=8:s.lanes=1073741824,null):(v=c.children,r=c.fallback,p?(c=s.mode,p=s.child,v={mode:"hidden",children:v},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=v):p=Nu(v,c,0,null),r=cs(r,c,a,null),p.return=s,r.return=s,p.sibling=r,s.child=p,s.child.memoizedState=nf(a),s.memoizedState=tf,r):rf(s,v));if(f=r.memoizedState,f!==null&&(I=f.dehydrated,I!==null))return xT(r,s,v,c,I,f,a);if(p){p=c.fallback,v=s.mode,f=r.child,I=f.sibling;var P={mode:"hidden",children:c.children};return(v&1)===0&&s.child!==f?(c=s.child,c.childLanes=0,c.pendingProps=P,s.deletions=null):(c=gi(f,P),c.subtreeFlags=f.subtreeFlags&14680064),I!==null?p=gi(I,p):(p=cs(p,v,a,null),p.flags|=2),p.return=s,c.return=s,c.sibling=p,s.child=c,c=p,p=s.child,v=r.child.memoizedState,v=v===null?nf(a):{baseLanes:v.baseLanes|a,cachePool:null,transitions:v.transitions},p.memoizedState=v,p.childLanes=r.childLanes&~a,s.memoizedState=tf,c}return p=r.child,r=p.sibling,c=gi(p,{mode:"visible",children:c.children}),(s.mode&1)===0&&(c.lanes=a),c.return=s,c.sibling=null,r!==null&&(a=s.deletions,a===null?(s.deletions=[r],s.flags|=16):a.push(r)),s.child=c,s.memoizedState=null,c}function rf(r,s){return s=Nu({mode:"visible",children:s},r.mode,0,null),s.return=r,r.child=s}function yu(r,s,a,c){return c!==null&&Nh(c),lo(s,r.child,null,a),r=rf(s,s.pendingProps.children),r.flags|=2,s.memoizedState=null,r}function xT(r,s,a,c,f,p,v){if(a)return s.flags&256?(s.flags&=-257,c=Jh(Error(t(422))),yu(r,s,v,c)):s.memoizedState!==null?(s.child=r.child,s.flags|=128,null):(p=c.fallback,f=s.mode,c=Nu({mode:"visible",children:c.children},f,0,null),p=cs(p,f,v,null),p.flags|=2,c.return=s,p.return=s,c.sibling=p,s.child=c,(s.mode&1)!==0&&lo(s,r.child,null,v),s.child.memoizedState=nf(v),s.memoizedState=tf,p);if((s.mode&1)===0)return yu(r,s,v,null);if(f.data==="$!"){if(c=f.nextSibling&&f.nextSibling.dataset,c)var I=c.dgst;return c=I,p=Error(t(419)),c=Jh(p,c,void 0),yu(r,s,v,c)}if(I=(v&r.childLanes)!==0,Gt||I){if(c=vt,c!==null){switch(v&-v){case 4:f=2;break;case 16:f=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:f=32;break;case 536870912:f=268435456;break;default:f=0}f=(f&(c.suspendedLanes|v))!==0?0:f,f!==0&&f!==p.retryLane&&(p.retryLane=f,Nr(r,f),Dn(c,r,f,-1))}return Ef(),c=Jh(Error(t(421))),yu(r,s,v,c)}return f.data==="$?"?(s.flags|=128,s.child=r.child,s=qT.bind(null,r),f._reactRetry=s,null):(r=p.treeContext,an=si(f.nextSibling),on=s,Xe=!0,Cn=null,r!==null&&(dn[pn++]=Pr,dn[pn++]=kr,dn[pn++]=ts,Pr=r.id,kr=r.overflow,ts=s),s=rf(s,c.children),s.flags|=4096,s)}function sg(r,s,a){r.lanes|=s;var c=r.alternate;c!==null&&(c.lanes|=s),Oh(r.return,s,a)}function sf(r,s,a,c,f){var p=r.memoizedState;p===null?r.memoizedState={isBackwards:s,rendering:null,renderingStartTime:0,last:c,tail:a,tailMode:f}:(p.isBackwards=s,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=a,p.tailMode=f)}function og(r,s,a){var c=s.pendingProps,f=c.revealOrder,p=c.tail;if($t(r,s,c.children,a),c=et.current,(c&2)!==0)c=c&1|2,s.flags|=128;else{if(r!==null&&(r.flags&128)!==0)e:for(r=s.child;r!==null;){if(r.tag===13)r.memoizedState!==null&&sg(r,a,s);else if(r.tag===19)sg(r,a,s);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===s)break e;for(;r.sibling===null;){if(r.return===null||r.return===s)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}c&=1}if(qe(et,c),(s.mode&1)===0)s.memoizedState=null;else switch(f){case"forwards":for(a=s.child,f=null;a!==null;)r=a.alternate,r!==null&&hu(r)===null&&(f=a),a=a.sibling;a=f,a===null?(f=s.child,s.child=null):(f=a.sibling,a.sibling=null),sf(s,!1,f,a,p);break;case"backwards":for(a=null,f=s.child,s.child=null;f!==null;){if(r=f.alternate,r!==null&&hu(r)===null){s.child=f;break}r=f.sibling,f.sibling=a,a=f,f=r}sf(s,!0,a,null,p);break;case"together":sf(s,!1,null,null,void 0);break;default:s.memoizedState=null}return s.child}function _u(r,s){(s.mode&1)===0&&r!==null&&(r.alternate=null,s.alternate=null,s.flags|=2)}function xr(r,s,a){if(r!==null&&(s.dependencies=r.dependencies),os|=s.lanes,(a&s.childLanes)===0)return null;if(r!==null&&s.child!==r.child)throw Error(t(153));if(s.child!==null){for(r=s.child,a=gi(r,r.pendingProps),s.child=a,a.return=s;r.sibling!==null;)r=r.sibling,a=a.sibling=gi(r,r.pendingProps),a.return=s;a.sibling=null}return s.child}function VT(r,s,a){switch(s.tag){case 3:ng(s),so();break;case 5:Im(s);break;case 1:Kt(s.type)&&eu(s);break;case 4:Uh(s,s.stateNode.containerInfo);break;case 10:var c=s.type._context,f=s.memoizedProps.value;qe(su,c._currentValue),c._currentValue=f;break;case 13:if(c=s.memoizedState,c!==null)return c.dehydrated!==null?(qe(et,et.current&1),s.flags|=128,null):(a&s.child.childLanes)!==0?ig(r,s,a):(qe(et,et.current&1),r=xr(r,s,a),r!==null?r.sibling:null);qe(et,et.current&1);break;case 19:if(c=(a&s.childLanes)!==0,(r.flags&128)!==0){if(c)return og(r,s,a);s.flags|=128}if(f=s.memoizedState,f!==null&&(f.rendering=null,f.tail=null,f.lastEffect=null),qe(et,et.current),c)break;return null;case 22:case 23:return s.lanes=0,Zm(r,s,a)}return xr(r,s,a)}var ag,of,lg,ug;ag=function(r,s){for(var a=s.child;a!==null;){if(a.tag===5||a.tag===6)r.appendChild(a.stateNode);else if(a.tag!==4&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===s)break;for(;a.sibling===null;){if(a.return===null||a.return===s)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},of=function(){},lg=function(r,s,a,c){var f=r.memoizedProps;if(f!==c){r=s.stateNode,is(rr.current);var p=null;switch(a){case"input":f=Ps(r,f),c=Ps(r,c),p=[];break;case"select":f=k({},f,{value:void 0}),c=k({},c,{value:void 0}),p=[];break;case"textarea":f=Go(r,f),c=Go(r,c),p=[];break;default:typeof f.onClick!="function"&&typeof c.onClick=="function"&&(r.onclick=Jl)}In(a,c);var v;a=null;for(U in f)if(!c.hasOwnProperty(U)&&f.hasOwnProperty(U)&&f[U]!=null)if(U==="style"){var I=f[U];for(v in I)I.hasOwnProperty(v)&&(a||(a={}),a[v]="")}else U!=="dangerouslySetInnerHTML"&&U!=="children"&&U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&U!=="autoFocus"&&(o.hasOwnProperty(U)?p||(p=[]):(p=p||[]).push(U,null));for(U in c){var P=c[U];if(I=f!=null?f[U]:void 0,c.hasOwnProperty(U)&&P!==I&&(P!=null||I!=null))if(U==="style")if(I){for(v in I)!I.hasOwnProperty(v)||P&&P.hasOwnProperty(v)||(a||(a={}),a[v]="");for(v in P)P.hasOwnProperty(v)&&I[v]!==P[v]&&(a||(a={}),a[v]=P[v])}else a||(p||(p=[]),p.push(U,a)),a=P;else U==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,I=I?I.__html:void 0,P!=null&&I!==P&&(p=p||[]).push(U,P)):U==="children"?typeof P!="string"&&typeof P!="number"||(p=p||[]).push(U,""+P):U!=="suppressContentEditableWarning"&&U!=="suppressHydrationWarning"&&(o.hasOwnProperty(U)?(P!=null&&U==="onScroll"&&Ge("scroll",r),p||I===P||(p=[])):(p=p||[]).push(U,P))}a&&(p=p||[]).push("style",a);var U=p;(s.updateQueue=U)&&(s.flags|=4)}},ug=function(r,s,a,c){a!==c&&(s.flags|=4)};function Oa(r,s){if(!Xe)switch(r.tailMode){case"hidden":s=r.tail;for(var a=null;s!==null;)s.alternate!==null&&(a=s),s=s.sibling;a===null?r.tail=null:a.sibling=null;break;case"collapsed":a=r.tail;for(var c=null;a!==null;)a.alternate!==null&&(c=a),a=a.sibling;c===null?s||r.tail===null?r.tail=null:r.tail.sibling=null:c.sibling=null}}function bt(r){var s=r.alternate!==null&&r.alternate.child===r.child,a=0,c=0;if(s)for(var f=r.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags&14680064,c|=f.flags&14680064,f.return=r,f=f.sibling;else for(f=r.child;f!==null;)a|=f.lanes|f.childLanes,c|=f.subtreeFlags,c|=f.flags,f.return=r,f=f.sibling;return r.subtreeFlags|=c,r.childLanes=a,s}function OT(r,s,a){var c=s.pendingProps;switch(Ch(s),s.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return bt(s),null;case 1:return Kt(s.type)&&Zl(),bt(s),null;case 3:return c=s.stateNode,uo(),Qe(Wt),Qe(Lt),Bh(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(r===null||r.child===null)&&(iu(s)?s.flags|=4:r===null||r.memoizedState.isDehydrated&&(s.flags&256)===0||(s.flags|=1024,Cn!==null&&(yf(Cn),Cn=null))),of(r,s),bt(s),null;case 5:jh(s);var f=is(ka.current);if(a=s.type,r!==null&&s.stateNode!=null)lg(r,s,a,c,f),r.ref!==s.ref&&(s.flags|=512,s.flags|=2097152);else{if(!c){if(s.stateNode===null)throw Error(t(166));return bt(s),null}if(r=is(rr.current),iu(s)){c=s.stateNode,a=s.type;var p=s.memoizedProps;switch(c[nr]=s,c[Sa]=p,r=(s.mode&1)!==0,a){case"dialog":Ge("cancel",c),Ge("close",c);break;case"iframe":case"object":case"embed":Ge("load",c);break;case"video":case"audio":for(f=0;f<wa.length;f++)Ge(wa[f],c);break;case"source":Ge("error",c);break;case"img":case"image":case"link":Ge("error",c),Ge("load",c);break;case"details":Ge("toggle",c);break;case"input":Tl(c,p),Ge("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},Ge("invalid",c);break;case"textarea":Qo(c,p),Ge("invalid",c)}In(a,p),f=null;for(var v in p)if(p.hasOwnProperty(v)){var I=p[v];v==="children"?typeof I=="string"?c.textContent!==I&&(p.suppressHydrationWarning!==!0&&Yl(c.textContent,I,r),f=["children",I]):typeof I=="number"&&c.textContent!==""+I&&(p.suppressHydrationWarning!==!0&&Yl(c.textContent,I,r),f=["children",""+I]):o.hasOwnProperty(v)&&I!=null&&v==="onScroll"&&Ge("scroll",c)}switch(a){case"input":Cs(c),Ko(c,p,!0);break;case"textarea":Cs(c),$r(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=Jl)}c=f,s.updateQueue=c,c!==null&&(s.flags|=4)}else{v=f.nodeType===9?f:f.ownerDocument,r==="http://www.w3.org/1999/xhtml"&&(r=Yo(a)),r==="http://www.w3.org/1999/xhtml"?a==="script"?(r=v.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild)):typeof c.is=="string"?r=v.createElement(a,{is:c.is}):(r=v.createElement(a),a==="select"&&(v=r,c.multiple?v.multiple=!0:c.size&&(v.size=c.size))):r=v.createElementNS(r,a),r[nr]=s,r[Sa]=c,ag(r,s,!1,!1),s.stateNode=r;e:{switch(v=xs(a,c),a){case"dialog":Ge("cancel",r),Ge("close",r),f=c;break;case"iframe":case"object":case"embed":Ge("load",r),f=c;break;case"video":case"audio":for(f=0;f<wa.length;f++)Ge(wa[f],r);f=c;break;case"source":Ge("error",r),f=c;break;case"img":case"image":case"link":Ge("error",r),Ge("load",r),f=c;break;case"details":Ge("toggle",r),f=c;break;case"input":Tl(r,c),f=Ps(r,c),Ge("invalid",r);break;case"option":f=c;break;case"select":r._wrapperState={wasMultiple:!!c.multiple},f=k({},c,{value:void 0}),Ge("invalid",r);break;case"textarea":Qo(r,c),f=Go(r,c),Ge("invalid",r);break;default:f=c}In(a,f),I=f;for(p in I)if(I.hasOwnProperty(p)){var P=I[p];p==="style"?Ds(r,P):p==="dangerouslySetInnerHTML"?(P=P?P.__html:void 0,P!=null&&Sl(r,P)):p==="children"?typeof P=="string"?(a!=="textarea"||P!=="")&&Ui(r,P):typeof P=="number"&&Ui(r,""+P):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(o.hasOwnProperty(p)?P!=null&&p==="onScroll"&&Ge("scroll",r):P!=null&&se(r,p,P,v))}switch(a){case"input":Cs(r),Ko(r,c,!1);break;case"textarea":Cs(r),$r(r);break;case"option":c.value!=null&&r.setAttribute("value",""+xe(c.value));break;case"select":r.multiple=!!c.multiple,p=c.value,p!=null?Tn(r,!!c.multiple,p,!1):c.defaultValue!=null&&Tn(r,!!c.multiple,c.defaultValue,!0);break;default:typeof f.onClick=="function"&&(r.onclick=Jl)}switch(a){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(s.flags|=4)}s.ref!==null&&(s.flags|=512,s.flags|=2097152)}return bt(s),null;case 6:if(r&&s.stateNode!=null)ug(r,s,r.memoizedProps,c);else{if(typeof c!="string"&&s.stateNode===null)throw Error(t(166));if(a=is(ka.current),is(rr.current),iu(s)){if(c=s.stateNode,a=s.memoizedProps,c[nr]=s,(p=c.nodeValue!==a)&&(r=on,r!==null))switch(r.tag){case 3:Yl(c.nodeValue,a,(r.mode&1)!==0);break;case 5:r.memoizedProps.suppressHydrationWarning!==!0&&Yl(c.nodeValue,a,(r.mode&1)!==0)}p&&(s.flags|=4)}else c=(a.nodeType===9?a:a.ownerDocument).createTextNode(c),c[nr]=s,s.stateNode=c}return bt(s),null;case 13:if(Qe(et),c=s.memoizedState,r===null||r.memoizedState!==null&&r.memoizedState.dehydrated!==null){if(Xe&&an!==null&&(s.mode&1)!==0&&(s.flags&128)===0)hm(),so(),s.flags|=98560,p=!1;else if(p=iu(s),c!==null&&c.dehydrated!==null){if(r===null){if(!p)throw Error(t(318));if(p=s.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(t(317));p[nr]=s}else so(),(s.flags&128)===0&&(s.memoizedState=null),s.flags|=4;bt(s),p=!1}else Cn!==null&&(yf(Cn),Cn=null),p=!0;if(!p)return s.flags&65536?s:null}return(s.flags&128)!==0?(s.lanes=a,s):(c=c!==null,c!==(r!==null&&r.memoizedState!==null)&&c&&(s.child.flags|=8192,(s.mode&1)!==0&&(r===null||(et.current&1)!==0?gt===0&&(gt=3):Ef())),s.updateQueue!==null&&(s.flags|=4),bt(s),null);case 4:return uo(),of(r,s),r===null&&Ta(s.stateNode.containerInfo),bt(s),null;case 10:return Vh(s.type._context),bt(s),null;case 17:return Kt(s.type)&&Zl(),bt(s),null;case 19:if(Qe(et),p=s.memoizedState,p===null)return bt(s),null;if(c=(s.flags&128)!==0,v=p.rendering,v===null)if(c)Oa(p,!1);else{if(gt!==0||r!==null&&(r.flags&128)!==0)for(r=s.child;r!==null;){if(v=hu(r),v!==null){for(s.flags|=128,Oa(p,!1),c=v.updateQueue,c!==null&&(s.updateQueue=c,s.flags|=4),s.subtreeFlags=0,c=a,a=s.child;a!==null;)p=a,r=c,p.flags&=14680066,v=p.alternate,v===null?(p.childLanes=0,p.lanes=r,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=v.childLanes,p.lanes=v.lanes,p.child=v.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=v.memoizedProps,p.memoizedState=v.memoizedState,p.updateQueue=v.updateQueue,p.type=v.type,r=v.dependencies,p.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext}),a=a.sibling;return qe(et,et.current&1|2),s.child}r=r.sibling}p.tail!==null&&Ke()>po&&(s.flags|=128,c=!0,Oa(p,!1),s.lanes=4194304)}else{if(!c)if(r=hu(v),r!==null){if(s.flags|=128,c=!0,a=r.updateQueue,a!==null&&(s.updateQueue=a,s.flags|=4),Oa(p,!0),p.tail===null&&p.tailMode==="hidden"&&!v.alternate&&!Xe)return bt(s),null}else 2*Ke()-p.renderingStartTime>po&&a!==1073741824&&(s.flags|=128,c=!0,Oa(p,!1),s.lanes=4194304);p.isBackwards?(v.sibling=s.child,s.child=v):(a=p.last,a!==null?a.sibling=v:s.child=v,p.last=v)}return p.tail!==null?(s=p.tail,p.rendering=s,p.tail=s.sibling,p.renderingStartTime=Ke(),s.sibling=null,a=et.current,qe(et,c?a&1|2:a&1),s):(bt(s),null);case 22:case 23:return vf(),c=s.memoizedState!==null,r!==null&&r.memoizedState!==null!==c&&(s.flags|=8192),c&&(s.mode&1)!==0?(ln&1073741824)!==0&&(bt(s),s.subtreeFlags&6&&(s.flags|=8192)):bt(s),null;case 24:return null;case 25:return null}throw Error(t(156,s.tag))}function LT(r,s){switch(Ch(s),s.tag){case 1:return Kt(s.type)&&Zl(),r=s.flags,r&65536?(s.flags=r&-65537|128,s):null;case 3:return uo(),Qe(Wt),Qe(Lt),Bh(),r=s.flags,(r&65536)!==0&&(r&128)===0?(s.flags=r&-65537|128,s):null;case 5:return jh(s),null;case 13:if(Qe(et),r=s.memoizedState,r!==null&&r.dehydrated!==null){if(s.alternate===null)throw Error(t(340));so()}return r=s.flags,r&65536?(s.flags=r&-65537|128,s):null;case 19:return Qe(et),null;case 4:return uo(),null;case 10:return Vh(s.type._context),null;case 22:case 23:return vf(),null;case 24:return null;default:return null}}var vu=!1,Ft=!1,MT=typeof WeakSet=="function"?WeakSet:Set,oe=null;function ho(r,s){var a=r.ref;if(a!==null)if(typeof a=="function")try{a(null)}catch(c){it(r,s,c)}else a.current=null}function af(r,s,a){try{a()}catch(c){it(r,s,c)}}var cg=!1;function bT(r,s){if(_h=Ir,r=zp(),ch(r)){if("selectionStart"in r)var a={start:r.selectionStart,end:r.selectionEnd};else e:{a=(a=r.ownerDocument)&&a.defaultView||window;var c=a.getSelection&&a.getSelection();if(c&&c.rangeCount!==0){a=c.anchorNode;var f=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{a.nodeType,p.nodeType}catch{a=null;break e}var v=0,I=-1,P=-1,U=0,Q=0,J=r,G=null;t:for(;;){for(var ne;J!==a||f!==0&&J.nodeType!==3||(I=v+f),J!==p||c!==0&&J.nodeType!==3||(P=v+c),J.nodeType===3&&(v+=J.nodeValue.length),(ne=J.firstChild)!==null;)G=J,J=ne;for(;;){if(J===r)break t;if(G===a&&++U===f&&(I=v),G===p&&++Q===c&&(P=v),(ne=J.nextSibling)!==null)break;J=G,G=J.parentNode}J=ne}a=I===-1||P===-1?null:{start:I,end:P}}else a=null}a=a||{start:0,end:0}}else a=null;for(vh={focusedElem:r,selectionRange:a},Ir=!1,oe=s;oe!==null;)if(s=oe,r=s.child,(s.subtreeFlags&1028)!==0&&r!==null)r.return=s,oe=r;else for(;oe!==null;){s=oe;try{var ae=s.alternate;if((s.flags&1024)!==0)switch(s.tag){case 0:case 11:case 15:break;case 1:if(ae!==null){var le=ae.memoizedProps,at=ae.memoizedState,L=s.stateNode,x=L.getSnapshotBeforeUpdate(s.elementType===s.type?le:Pn(s.type,le),at);L.__reactInternalSnapshotBeforeUpdate=x}break;case 3:var F=s.stateNode.containerInfo;F.nodeType===1?F.textContent="":F.nodeType===9&&F.documentElement&&F.removeChild(F.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(X){it(s,s.return,X)}if(r=s.sibling,r!==null){r.return=s.return,oe=r;break}oe=s.return}return ae=cg,cg=!1,ae}function La(r,s,a){var c=s.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var f=c=c.next;do{if((f.tag&r)===r){var p=f.destroy;f.destroy=void 0,p!==void 0&&af(s,a,p)}f=f.next}while(f!==c)}}function Eu(r,s){if(s=s.updateQueue,s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&r)===r){var c=a.create;a.destroy=c()}a=a.next}while(a!==s)}}function lf(r){var s=r.ref;if(s!==null){var a=r.stateNode;switch(r.tag){case 5:r=a;break;default:r=a}typeof s=="function"?s(r):s.current=r}}function hg(r){var s=r.alternate;s!==null&&(r.alternate=null,hg(s)),r.child=null,r.deletions=null,r.sibling=null,r.tag===5&&(s=r.stateNode,s!==null&&(delete s[nr],delete s[Sa],delete s[Ih],delete s[vT],delete s[ET])),r.stateNode=null,r.return=null,r.dependencies=null,r.memoizedProps=null,r.memoizedState=null,r.pendingProps=null,r.stateNode=null,r.updateQueue=null}function fg(r){return r.tag===5||r.tag===3||r.tag===4}function dg(r){e:for(;;){for(;r.sibling===null;){if(r.return===null||fg(r.return))return null;r=r.return}for(r.sibling.return=r.return,r=r.sibling;r.tag!==5&&r.tag!==6&&r.tag!==18;){if(r.flags&2||r.child===null||r.tag===4)continue e;r.child.return=r,r=r.child}if(!(r.flags&2))return r.stateNode}}function uf(r,s,a){var c=r.tag;if(c===5||c===6)r=r.stateNode,s?a.nodeType===8?a.parentNode.insertBefore(r,s):a.insertBefore(r,s):(a.nodeType===8?(s=a.parentNode,s.insertBefore(r,a)):(s=a,s.appendChild(r)),a=a._reactRootContainer,a!=null||s.onclick!==null||(s.onclick=Jl));else if(c!==4&&(r=r.child,r!==null))for(uf(r,s,a),r=r.sibling;r!==null;)uf(r,s,a),r=r.sibling}function cf(r,s,a){var c=r.tag;if(c===5||c===6)r=r.stateNode,s?a.insertBefore(r,s):a.appendChild(r);else if(c!==4&&(r=r.child,r!==null))for(cf(r,s,a),r=r.sibling;r!==null;)cf(r,s,a),r=r.sibling}var At=null,kn=!1;function hi(r,s,a){for(a=a.child;a!==null;)pg(r,s,a),a=a.sibling}function pg(r,s,a){if(Zt&&typeof Zt.onCommitFiberUnmount=="function")try{Zt.onCommitFiberUnmount(Hi,a)}catch{}switch(a.tag){case 5:Ft||ho(a,s);case 6:var c=At,f=kn;At=null,hi(r,s,a),At=c,kn=f,At!==null&&(kn?(r=At,a=a.stateNode,r.nodeType===8?r.parentNode.removeChild(a):r.removeChild(a)):At.removeChild(a.stateNode));break;case 18:At!==null&&(kn?(r=At,a=a.stateNode,r.nodeType===8?Th(r.parentNode,a):r.nodeType===1&&Th(r,a),ti(r)):Th(At,a.stateNode));break;case 4:c=At,f=kn,At=a.stateNode.containerInfo,kn=!0,hi(r,s,a),At=c,kn=f;break;case 0:case 11:case 14:case 15:if(!Ft&&(c=a.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){f=c=c.next;do{var p=f,v=p.destroy;p=p.tag,v!==void 0&&((p&2)!==0||(p&4)!==0)&&af(a,s,v),f=f.next}while(f!==c)}hi(r,s,a);break;case 1:if(!Ft&&(ho(a,s),c=a.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=a.memoizedProps,c.state=a.memoizedState,c.componentWillUnmount()}catch(I){it(a,s,I)}hi(r,s,a);break;case 21:hi(r,s,a);break;case 22:a.mode&1?(Ft=(c=Ft)||a.memoizedState!==null,hi(r,s,a),Ft=c):hi(r,s,a);break;default:hi(r,s,a)}}function mg(r){var s=r.updateQueue;if(s!==null){r.updateQueue=null;var a=r.stateNode;a===null&&(a=r.stateNode=new MT),s.forEach(function(c){var f=WT.bind(null,r,c);a.has(c)||(a.add(c),c.then(f,f))})}}function Nn(r,s){var a=s.deletions;if(a!==null)for(var c=0;c<a.length;c++){var f=a[c];try{var p=r,v=s,I=v;e:for(;I!==null;){switch(I.tag){case 5:At=I.stateNode,kn=!1;break e;case 3:At=I.stateNode.containerInfo,kn=!0;break e;case 4:At=I.stateNode.containerInfo,kn=!0;break e}I=I.return}if(At===null)throw Error(t(160));pg(p,v,f),At=null,kn=!1;var P=f.alternate;P!==null&&(P.return=null),f.return=null}catch(U){it(f,s,U)}}if(s.subtreeFlags&12854)for(s=s.child;s!==null;)gg(s,r),s=s.sibling}function gg(r,s){var a=r.alternate,c=r.flags;switch(r.tag){case 0:case 11:case 14:case 15:if(Nn(s,r),sr(r),c&4){try{La(3,r,r.return),Eu(3,r)}catch(le){it(r,r.return,le)}try{La(5,r,r.return)}catch(le){it(r,r.return,le)}}break;case 1:Nn(s,r),sr(r),c&512&&a!==null&&ho(a,a.return);break;case 5:if(Nn(s,r),sr(r),c&512&&a!==null&&ho(a,a.return),r.flags&32){var f=r.stateNode;try{Ui(f,"")}catch(le){it(r,r.return,le)}}if(c&4&&(f=r.stateNode,f!=null)){var p=r.memoizedProps,v=a!==null?a.memoizedProps:p,I=r.type,P=r.updateQueue;if(r.updateQueue=null,P!==null)try{I==="input"&&p.type==="radio"&&p.name!=null&&ks(f,p),xs(I,v);var U=xs(I,p);for(v=0;v<P.length;v+=2){var Q=P[v],J=P[v+1];Q==="style"?Ds(f,J):Q==="dangerouslySetInnerHTML"?Sl(f,J):Q==="children"?Ui(f,J):se(f,Q,J,U)}switch(I){case"input":Fi(f,p);break;case"textarea":Il(f,p);break;case"select":var G=f._wrapperState.wasMultiple;f._wrapperState.wasMultiple=!!p.multiple;var ne=p.value;ne!=null?Tn(f,!!p.multiple,ne,!1):G!==!!p.multiple&&(p.defaultValue!=null?Tn(f,!!p.multiple,p.defaultValue,!0):Tn(f,!!p.multiple,p.multiple?[]:"",!1))}f[Sa]=p}catch(le){it(r,r.return,le)}}break;case 6:if(Nn(s,r),sr(r),c&4){if(r.stateNode===null)throw Error(t(162));f=r.stateNode,p=r.memoizedProps;try{f.nodeValue=p}catch(le){it(r,r.return,le)}}break;case 3:if(Nn(s,r),sr(r),c&4&&a!==null&&a.memoizedState.isDehydrated)try{ti(s.containerInfo)}catch(le){it(r,r.return,le)}break;case 4:Nn(s,r),sr(r);break;case 13:Nn(s,r),sr(r),f=r.child,f.flags&8192&&(p=f.memoizedState!==null,f.stateNode.isHidden=p,!p||f.alternate!==null&&f.alternate.memoizedState!==null||(df=Ke())),c&4&&mg(r);break;case 22:if(Q=a!==null&&a.memoizedState!==null,r.mode&1?(Ft=(U=Ft)||Q,Nn(s,r),Ft=U):Nn(s,r),sr(r),c&8192){if(U=r.memoizedState!==null,(r.stateNode.isHidden=U)&&!Q&&(r.mode&1)!==0)for(oe=r,Q=r.child;Q!==null;){for(J=oe=Q;oe!==null;){switch(G=oe,ne=G.child,G.tag){case 0:case 11:case 14:case 15:La(4,G,G.return);break;case 1:ho(G,G.return);var ae=G.stateNode;if(typeof ae.componentWillUnmount=="function"){c=G,a=G.return;try{s=c,ae.props=s.memoizedProps,ae.state=s.memoizedState,ae.componentWillUnmount()}catch(le){it(c,a,le)}}break;case 5:ho(G,G.return);break;case 22:if(G.memoizedState!==null){vg(J);continue}}ne!==null?(ne.return=G,oe=ne):vg(J)}Q=Q.sibling}e:for(Q=null,J=r;;){if(J.tag===5){if(Q===null){Q=J;try{f=J.stateNode,U?(p=f.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(I=J.stateNode,P=J.memoizedProps.style,v=P!=null&&P.hasOwnProperty("display")?P.display:null,I.style.display=Wr("display",v))}catch(le){it(r,r.return,le)}}}else if(J.tag===6){if(Q===null)try{J.stateNode.nodeValue=U?"":J.memoizedProps}catch(le){it(r,r.return,le)}}else if((J.tag!==22&&J.tag!==23||J.memoizedState===null||J===r)&&J.child!==null){J.child.return=J,J=J.child;continue}if(J===r)break e;for(;J.sibling===null;){if(J.return===null||J.return===r)break e;Q===J&&(Q=null),J=J.return}Q===J&&(Q=null),J.sibling.return=J.return,J=J.sibling}}break;case 19:Nn(s,r),sr(r),c&4&&mg(r);break;case 21:break;default:Nn(s,r),sr(r)}}function sr(r){var s=r.flags;if(s&2){try{e:{for(var a=r.return;a!==null;){if(fg(a)){var c=a;break e}a=a.return}throw Error(t(160))}switch(c.tag){case 5:var f=c.stateNode;c.flags&32&&(Ui(f,""),c.flags&=-33);var p=dg(r);cf(r,p,f);break;case 3:case 4:var v=c.stateNode.containerInfo,I=dg(r);uf(r,I,v);break;default:throw Error(t(161))}}catch(P){it(r,r.return,P)}r.flags&=-3}s&4096&&(r.flags&=-4097)}function FT(r,s,a){oe=r,yg(r)}function yg(r,s,a){for(var c=(r.mode&1)!==0;oe!==null;){var f=oe,p=f.child;if(f.tag===22&&c){var v=f.memoizedState!==null||vu;if(!v){var I=f.alternate,P=I!==null&&I.memoizedState!==null||Ft;I=vu;var U=Ft;if(vu=v,(Ft=P)&&!U)for(oe=f;oe!==null;)v=oe,P=v.child,v.tag===22&&v.memoizedState!==null?Eg(f):P!==null?(P.return=v,oe=P):Eg(f);for(;p!==null;)oe=p,yg(p),p=p.sibling;oe=f,vu=I,Ft=U}_g(r)}else(f.subtreeFlags&8772)!==0&&p!==null?(p.return=f,oe=p):_g(r)}}function _g(r){for(;oe!==null;){var s=oe;if((s.flags&8772)!==0){var a=s.alternate;try{if((s.flags&8772)!==0)switch(s.tag){case 0:case 11:case 15:Ft||Eu(5,s);break;case 1:var c=s.stateNode;if(s.flags&4&&!Ft)if(a===null)c.componentDidMount();else{var f=s.elementType===s.type?a.memoizedProps:Pn(s.type,a.memoizedProps);c.componentDidUpdate(f,a.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=s.updateQueue;p!==null&&mm(s,p,c);break;case 3:var v=s.updateQueue;if(v!==null){if(a=null,s.child!==null)switch(s.child.tag){case 5:a=s.child.stateNode;break;case 1:a=s.child.stateNode}mm(s,v,a)}break;case 5:var I=s.stateNode;if(a===null&&s.flags&4){a=I;var P=s.memoizedProps;switch(s.type){case"button":case"input":case"select":case"textarea":P.autoFocus&&a.focus();break;case"img":P.src&&(a.src=P.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(s.memoizedState===null){var U=s.alternate;if(U!==null){var Q=U.memoizedState;if(Q!==null){var J=Q.dehydrated;J!==null&&ti(J)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Ft||s.flags&512&&lf(s)}catch(G){it(s,s.return,G)}}if(s===r){oe=null;break}if(a=s.sibling,a!==null){a.return=s.return,oe=a;break}oe=s.return}}function vg(r){for(;oe!==null;){var s=oe;if(s===r){oe=null;break}var a=s.sibling;if(a!==null){a.return=s.return,oe=a;break}oe=s.return}}function Eg(r){for(;oe!==null;){var s=oe;try{switch(s.tag){case 0:case 11:case 15:var a=s.return;try{Eu(4,s)}catch(P){it(s,a,P)}break;case 1:var c=s.stateNode;if(typeof c.componentDidMount=="function"){var f=s.return;try{c.componentDidMount()}catch(P){it(s,f,P)}}var p=s.return;try{lf(s)}catch(P){it(s,p,P)}break;case 5:var v=s.return;try{lf(s)}catch(P){it(s,v,P)}}}catch(P){it(s,s.return,P)}if(s===r){oe=null;break}var I=s.sibling;if(I!==null){I.return=s.return,oe=I;break}oe=s.return}}var UT=Math.ceil,wu=ve.ReactCurrentDispatcher,hf=ve.ReactCurrentOwner,yn=ve.ReactCurrentBatchConfig,Oe=0,vt=null,ht=null,Ct=0,ln=0,fo=oi(0),gt=0,Ma=null,os=0,Tu=0,ff=0,ba=null,Qt=null,df=0,po=1/0,Vr=null,Iu=!1,pf=null,fi=null,Su=!1,di=null,Ru=0,Fa=0,mf=null,Au=-1,Cu=0;function Ht(){return(Oe&6)!==0?Ke():Au!==-1?Au:Au=Ke()}function pi(r){return(r.mode&1)===0?1:(Oe&2)!==0&&Ct!==0?Ct&-Ct:TT.transition!==null?(Cu===0&&(Cu=sa()),Cu):(r=De,r!==0||(r=window.event,r=r===void 0?16:Bs(r.type)),r)}function Dn(r,s,a,c){if(50<Fa)throw Fa=0,mf=null,Error(t(185));Gi(r,a,c),((Oe&2)===0||r!==vt)&&(r===vt&&((Oe&2)===0&&(Tu|=a),gt===4&&mi(r,Ct)),Yt(r,c),a===1&&Oe===0&&(s.mode&1)===0&&(po=Ke()+500,tu&&li()))}function Yt(r,s){var a=r.callbackNode;Ki(r,s);var c=Er(r,r===vt?Ct:0);if(c===0)a!==null&&Ls(a),r.callbackNode=null,r.callbackPriority=0;else if(s=c&-c,r.callbackPriority!==s){if(a!=null&&Ls(a),s===1)r.tag===0?wT(Tg.bind(null,r)):om(Tg.bind(null,r)),yT(function(){(Oe&6)===0&&li()}),a=null;else{switch(Wn(c)){case 1:a=Ms;break;case 4:a=na;break;case 16:a=$i;break;case 536870912:a=bs;break;default:a=$i}a=Ng(a,wg.bind(null,r))}r.callbackPriority=s,r.callbackNode=a}}function wg(r,s){if(Au=-1,Cu=0,(Oe&6)!==0)throw Error(t(327));var a=r.callbackNode;if(mo()&&r.callbackNode!==a)return null;var c=Er(r,r===vt?Ct:0);if(c===0)return null;if((c&30)!==0||(c&r.expiredLanes)!==0||s)s=Pu(r,c);else{s=c;var f=Oe;Oe|=2;var p=Sg();(vt!==r||Ct!==s)&&(Vr=null,po=Ke()+500,ls(r,s));do try{BT();break}catch(I){Ig(r,I)}while(!0);xh(),wu.current=p,Oe=f,ht!==null?s=0:(vt=null,Ct=0,s=gt)}if(s!==0){if(s===2&&(f=ia(r),f!==0&&(c=f,s=gf(r,f))),s===1)throw a=Ma,ls(r,0),mi(r,c),Yt(r,Ke()),a;if(s===6)mi(r,c);else{if(f=r.current.alternate,(c&30)===0&&!jT(f)&&(s=Pu(r,c),s===2&&(p=ia(r),p!==0&&(c=p,s=gf(r,p))),s===1))throw a=Ma,ls(r,0),mi(r,c),Yt(r,Ke()),a;switch(r.finishedWork=f,r.finishedLanes=c,s){case 0:case 1:throw Error(t(345));case 2:us(r,Qt,Vr);break;case 3:if(mi(r,c),(c&130023424)===c&&(s=df+500-Ke(),10<s)){if(Er(r,0)!==0)break;if(f=r.suspendedLanes,(f&c)!==c){Ht(),r.pingedLanes|=r.suspendedLanes&f;break}r.timeoutHandle=wh(us.bind(null,r,Qt,Vr),s);break}us(r,Qt,Vr);break;case 4:if(mi(r,c),(c&4194240)===c)break;for(s=r.eventTimes,f=-1;0<c;){var v=31-en(c);p=1<<v,v=s[v],v>f&&(f=v),c&=~p}if(c=f,c=Ke()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*UT(c/1960))-c,10<c){r.timeoutHandle=wh(us.bind(null,r,Qt,Vr),c);break}us(r,Qt,Vr);break;case 5:us(r,Qt,Vr);break;default:throw Error(t(329))}}}return Yt(r,Ke()),r.callbackNode===a?wg.bind(null,r):null}function gf(r,s){var a=ba;return r.current.memoizedState.isDehydrated&&(ls(r,s).flags|=256),r=Pu(r,s),r!==2&&(s=Qt,Qt=a,s!==null&&yf(s)),r}function yf(r){Qt===null?Qt=r:Qt.push.apply(Qt,r)}function jT(r){for(var s=r;;){if(s.flags&16384){var a=s.updateQueue;if(a!==null&&(a=a.stores,a!==null))for(var c=0;c<a.length;c++){var f=a[c],p=f.getSnapshot;f=f.value;try{if(!An(p(),f))return!1}catch{return!1}}}if(a=s.child,s.subtreeFlags&16384&&a!==null)a.return=s,s=a;else{if(s===r)break;for(;s.sibling===null;){if(s.return===null||s.return===r)return!0;s=s.return}s.sibling.return=s.return,s=s.sibling}}return!0}function mi(r,s){for(s&=~ff,s&=~Tu,r.suspendedLanes|=s,r.pingedLanes&=~s,r=r.expirationTimes;0<s;){var a=31-en(s),c=1<<a;r[a]=-1,s&=~c}}function Tg(r){if((Oe&6)!==0)throw Error(t(327));mo();var s=Er(r,0);if((s&1)===0)return Yt(r,Ke()),null;var a=Pu(r,s);if(r.tag!==0&&a===2){var c=ia(r);c!==0&&(s=c,a=gf(r,c))}if(a===1)throw a=Ma,ls(r,0),mi(r,s),Yt(r,Ke()),a;if(a===6)throw Error(t(345));return r.finishedWork=r.current.alternate,r.finishedLanes=s,us(r,Qt,Vr),Yt(r,Ke()),null}function _f(r,s){var a=Oe;Oe|=1;try{return r(s)}finally{Oe=a,Oe===0&&(po=Ke()+500,tu&&li())}}function as(r){di!==null&&di.tag===0&&(Oe&6)===0&&mo();var s=Oe;Oe|=1;var a=yn.transition,c=De;try{if(yn.transition=null,De=1,r)return r()}finally{De=c,yn.transition=a,Oe=s,(Oe&6)===0&&li()}}function vf(){ln=fo.current,Qe(fo)}function ls(r,s){r.finishedWork=null,r.finishedLanes=0;var a=r.timeoutHandle;if(a!==-1&&(r.timeoutHandle=-1,gT(a)),ht!==null)for(a=ht.return;a!==null;){var c=a;switch(Ch(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&Zl();break;case 3:uo(),Qe(Wt),Qe(Lt),Bh();break;case 5:jh(c);break;case 4:uo();break;case 13:Qe(et);break;case 19:Qe(et);break;case 10:Vh(c.type._context);break;case 22:case 23:vf()}a=a.return}if(vt=r,ht=r=gi(r.current,null),Ct=ln=s,gt=0,Ma=null,ff=Tu=os=0,Qt=ba=null,rs!==null){for(s=0;s<rs.length;s++)if(a=rs[s],c=a.interleaved,c!==null){a.interleaved=null;var f=c.next,p=a.pending;if(p!==null){var v=p.next;p.next=f,c.next=v}a.pending=c}rs=null}return r}function Ig(r,s){do{var a=ht;try{if(xh(),fu.current=gu,du){for(var c=tt.memoizedState;c!==null;){var f=c.queue;f!==null&&(f.pending=null),c=c.next}du=!1}if(ss=0,_t=mt=tt=null,Na=!1,Da=0,hf.current=null,a===null||a.return===null){gt=1,Ma=s,ht=null;break}e:{var p=r,v=a.return,I=a,P=s;if(s=Ct,I.flags|=32768,P!==null&&typeof P=="object"&&typeof P.then=="function"){var U=P,Q=I,J=Q.tag;if((Q.mode&1)===0&&(J===0||J===11||J===15)){var G=Q.alternate;G?(Q.updateQueue=G.updateQueue,Q.memoizedState=G.memoizedState,Q.lanes=G.lanes):(Q.updateQueue=null,Q.memoizedState=null)}var ne=Gm(v);if(ne!==null){ne.flags&=-257,Qm(ne,v,I,p,s),ne.mode&1&&Km(p,U,s),s=ne,P=U;var ae=s.updateQueue;if(ae===null){var le=new Set;le.add(P),s.updateQueue=le}else ae.add(P);break e}else{if((s&1)===0){Km(p,U,s),Ef();break e}P=Error(t(426))}}else if(Xe&&I.mode&1){var at=Gm(v);if(at!==null){(at.flags&65536)===0&&(at.flags|=256),Qm(at,v,I,p,s),Nh(co(P,I));break e}}p=P=co(P,I),gt!==4&&(gt=2),ba===null?ba=[p]:ba.push(p),p=v;do{switch(p.tag){case 3:p.flags|=65536,s&=-s,p.lanes|=s;var L=qm(p,P,s);pm(p,L);break e;case 1:I=P;var x=p.type,F=p.stateNode;if((p.flags&128)===0&&(typeof x.getDerivedStateFromError=="function"||F!==null&&typeof F.componentDidCatch=="function"&&(fi===null||!fi.has(F)))){p.flags|=65536,s&=-s,p.lanes|=s;var X=Wm(p,I,s);pm(p,X);break e}}p=p.return}while(p!==null)}Ag(a)}catch(ue){s=ue,ht===a&&a!==null&&(ht=a=a.return);continue}break}while(!0)}function Sg(){var r=wu.current;return wu.current=gu,r===null?gu:r}function Ef(){(gt===0||gt===3||gt===2)&&(gt=4),vt===null||(os&268435455)===0&&(Tu&268435455)===0||mi(vt,Ct)}function Pu(r,s){var a=Oe;Oe|=2;var c=Sg();(vt!==r||Ct!==s)&&(Vr=null,ls(r,s));do try{zT();break}catch(f){Ig(r,f)}while(!0);if(xh(),Oe=a,wu.current=c,ht!==null)throw Error(t(261));return vt=null,Ct=0,gt}function zT(){for(;ht!==null;)Rg(ht)}function BT(){for(;ht!==null&&!Bi();)Rg(ht)}function Rg(r){var s=kg(r.alternate,r,ln);r.memoizedProps=r.pendingProps,s===null?Ag(r):ht=s,hf.current=null}function Ag(r){var s=r;do{var a=s.alternate;if(r=s.return,(s.flags&32768)===0){if(a=OT(a,s,ln),a!==null){ht=a;return}}else{if(a=LT(a,s),a!==null){a.flags&=32767,ht=a;return}if(r!==null)r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{gt=6,ht=null;return}}if(s=s.sibling,s!==null){ht=s;return}ht=s=r}while(s!==null);gt===0&&(gt=5)}function us(r,s,a){var c=De,f=yn.transition;try{yn.transition=null,De=1,$T(r,s,a,c)}finally{yn.transition=f,De=c}return null}function $T(r,s,a,c){do mo();while(di!==null);if((Oe&6)!==0)throw Error(t(327));a=r.finishedWork;var f=r.finishedLanes;if(a===null)return null;if(r.finishedWork=null,r.finishedLanes=0,a===r.current)throw Error(t(177));r.callbackNode=null,r.callbackPriority=0;var p=a.lanes|a.childLanes;if(sh(r,p),r===vt&&(ht=vt=null,Ct=0),(a.subtreeFlags&2064)===0&&(a.flags&2064)===0||Su||(Su=!0,Ng($i,function(){return mo(),null})),p=(a.flags&15990)!==0,(a.subtreeFlags&15990)!==0||p){p=yn.transition,yn.transition=null;var v=De;De=1;var I=Oe;Oe|=4,hf.current=null,bT(r,a),gg(a,r),uT(vh),Ir=!!_h,vh=_h=null,r.current=a,FT(a),vr(),Oe=I,De=v,yn.transition=p}else r.current=a;if(Su&&(Su=!1,di=r,Ru=f),p=r.pendingLanes,p===0&&(fi=null),Ll(a.stateNode),Yt(r,Ke()),s!==null)for(c=r.onRecoverableError,a=0;a<s.length;a++)f=s[a],c(f.value,{componentStack:f.stack,digest:f.digest});if(Iu)throw Iu=!1,r=pf,pf=null,r;return(Ru&1)!==0&&r.tag!==0&&mo(),p=r.pendingLanes,(p&1)!==0?r===mf?Fa++:(Fa=0,mf=r):Fa=0,li(),null}function mo(){if(di!==null){var r=Wn(Ru),s=yn.transition,a=De;try{if(yn.transition=null,De=16>r?16:r,di===null)var c=!1;else{if(r=di,di=null,Ru=0,(Oe&6)!==0)throw Error(t(331));var f=Oe;for(Oe|=4,oe=r.current;oe!==null;){var p=oe,v=p.child;if((oe.flags&16)!==0){var I=p.deletions;if(I!==null){for(var P=0;P<I.length;P++){var U=I[P];for(oe=U;oe!==null;){var Q=oe;switch(Q.tag){case 0:case 11:case 15:La(8,Q,p)}var J=Q.child;if(J!==null)J.return=Q,oe=J;else for(;oe!==null;){Q=oe;var G=Q.sibling,ne=Q.return;if(hg(Q),Q===U){oe=null;break}if(G!==null){G.return=ne,oe=G;break}oe=ne}}}var ae=p.alternate;if(ae!==null){var le=ae.child;if(le!==null){ae.child=null;do{var at=le.sibling;le.sibling=null,le=at}while(le!==null)}}oe=p}}if((p.subtreeFlags&2064)!==0&&v!==null)v.return=p,oe=v;else e:for(;oe!==null;){if(p=oe,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:La(9,p,p.return)}var L=p.sibling;if(L!==null){L.return=p.return,oe=L;break e}oe=p.return}}var x=r.current;for(oe=x;oe!==null;){v=oe;var F=v.child;if((v.subtreeFlags&2064)!==0&&F!==null)F.return=v,oe=F;else e:for(v=x;oe!==null;){if(I=oe,(I.flags&2048)!==0)try{switch(I.tag){case 0:case 11:case 15:Eu(9,I)}}catch(ue){it(I,I.return,ue)}if(I===v){oe=null;break e}var X=I.sibling;if(X!==null){X.return=I.return,oe=X;break e}oe=I.return}}if(Oe=f,li(),Zt&&typeof Zt.onPostCommitFiberRoot=="function")try{Zt.onPostCommitFiberRoot(Hi,r)}catch{}c=!0}return c}finally{De=a,yn.transition=s}}return!1}function Cg(r,s,a){s=co(a,s),s=qm(r,s,1),r=ci(r,s,1),s=Ht(),r!==null&&(Gi(r,1,s),Yt(r,s))}function it(r,s,a){if(r.tag===3)Cg(r,r,a);else for(;s!==null;){if(s.tag===3){Cg(s,r,a);break}else if(s.tag===1){var c=s.stateNode;if(typeof s.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(fi===null||!fi.has(c))){r=co(a,r),r=Wm(s,r,1),s=ci(s,r,1),r=Ht(),s!==null&&(Gi(s,1,r),Yt(s,r));break}}s=s.return}}function HT(r,s,a){var c=r.pingCache;c!==null&&c.delete(s),s=Ht(),r.pingedLanes|=r.suspendedLanes&a,vt===r&&(Ct&a)===a&&(gt===4||gt===3&&(Ct&130023424)===Ct&&500>Ke()-df?ls(r,0):ff|=a),Yt(r,s)}function Pg(r,s){s===0&&((r.mode&1)===0?s=1:(s=Xr,Xr<<=1,(Xr&130023424)===0&&(Xr=4194304)));var a=Ht();r=Nr(r,s),r!==null&&(Gi(r,s,a),Yt(r,a))}function qT(r){var s=r.memoizedState,a=0;s!==null&&(a=s.retryLane),Pg(r,a)}function WT(r,s){var a=0;switch(r.tag){case 13:var c=r.stateNode,f=r.memoizedState;f!==null&&(a=f.retryLane);break;case 19:c=r.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(s),Pg(r,a)}var kg;kg=function(r,s,a){if(r!==null)if(r.memoizedProps!==s.pendingProps||Wt.current)Gt=!0;else{if((r.lanes&a)===0&&(s.flags&128)===0)return Gt=!1,VT(r,s,a);Gt=(r.flags&131072)!==0}else Gt=!1,Xe&&(s.flags&1048576)!==0&&am(s,ru,s.index);switch(s.lanes=0,s.tag){case 2:var c=s.type;_u(r,s),r=s.pendingProps;var f=no(s,Lt.current);ao(s,a),f=qh(null,s,c,r,f,a);var p=Wh();return s.flags|=1,typeof f=="object"&&f!==null&&typeof f.render=="function"&&f.$$typeof===void 0?(s.tag=1,s.memoizedState=null,s.updateQueue=null,Kt(c)?(p=!0,eu(s)):p=!1,s.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,Mh(s),f.updater=uu,s.stateNode=f,f._reactInternals=s,Fh(s,c,r,a),s=ef(null,s,c,!0,p,a)):(s.tag=0,Xe&&p&&Ah(s),$t(null,s,f,a),s=s.child),s;case 16:c=s.elementType;e:{switch(_u(r,s),r=s.pendingProps,f=c._init,c=f(c._payload),s.type=c,f=s.tag=GT(c),r=Pn(c,r),f){case 0:s=Zh(null,s,c,r,a);break e;case 1:s=tg(null,s,c,r,a);break e;case 11:s=Ym(null,s,c,r,a);break e;case 14:s=Jm(null,s,c,Pn(c.type,r),a);break e}throw Error(t(306,c,""))}return s;case 0:return c=s.type,f=s.pendingProps,f=s.elementType===c?f:Pn(c,f),Zh(r,s,c,f,a);case 1:return c=s.type,f=s.pendingProps,f=s.elementType===c?f:Pn(c,f),tg(r,s,c,f,a);case 3:e:{if(ng(s),r===null)throw Error(t(387));c=s.pendingProps,p=s.memoizedState,f=p.element,dm(r,s),lu(s,c,null,a);var v=s.memoizedState;if(c=v.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:v.cache,pendingSuspenseBoundaries:v.pendingSuspenseBoundaries,transitions:v.transitions},s.updateQueue.baseState=p,s.memoizedState=p,s.flags&256){f=co(Error(t(423)),s),s=rg(r,s,c,a,f);break e}else if(c!==f){f=co(Error(t(424)),s),s=rg(r,s,c,a,f);break e}else for(an=si(s.stateNode.containerInfo.firstChild),on=s,Xe=!0,Cn=null,a=Tm(s,null,c,a),s.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(so(),c===f){s=xr(r,s,a);break e}$t(r,s,c,a)}s=s.child}return s;case 5:return Im(s),r===null&&kh(s),c=s.type,f=s.pendingProps,p=r!==null?r.memoizedProps:null,v=f.children,Eh(c,f)?v=null:p!==null&&Eh(c,p)&&(s.flags|=32),eg(r,s),$t(r,s,v,a),s.child;case 6:return r===null&&kh(s),null;case 13:return ig(r,s,a);case 4:return Uh(s,s.stateNode.containerInfo),c=s.pendingProps,r===null?s.child=lo(s,null,c,a):$t(r,s,c,a),s.child;case 11:return c=s.type,f=s.pendingProps,f=s.elementType===c?f:Pn(c,f),Ym(r,s,c,f,a);case 7:return $t(r,s,s.pendingProps,a),s.child;case 8:return $t(r,s,s.pendingProps.children,a),s.child;case 12:return $t(r,s,s.pendingProps.children,a),s.child;case 10:e:{if(c=s.type._context,f=s.pendingProps,p=s.memoizedProps,v=f.value,qe(su,c._currentValue),c._currentValue=v,p!==null)if(An(p.value,v)){if(p.children===f.children&&!Wt.current){s=xr(r,s,a);break e}}else for(p=s.child,p!==null&&(p.return=s);p!==null;){var I=p.dependencies;if(I!==null){v=p.child;for(var P=I.firstContext;P!==null;){if(P.context===c){if(p.tag===1){P=Dr(-1,a&-a),P.tag=2;var U=p.updateQueue;if(U!==null){U=U.shared;var Q=U.pending;Q===null?P.next=P:(P.next=Q.next,Q.next=P),U.pending=P}}p.lanes|=a,P=p.alternate,P!==null&&(P.lanes|=a),Oh(p.return,a,s),I.lanes|=a;break}P=P.next}}else if(p.tag===10)v=p.type===s.type?null:p.child;else if(p.tag===18){if(v=p.return,v===null)throw Error(t(341));v.lanes|=a,I=v.alternate,I!==null&&(I.lanes|=a),Oh(v,a,s),v=p.sibling}else v=p.child;if(v!==null)v.return=p;else for(v=p;v!==null;){if(v===s){v=null;break}if(p=v.sibling,p!==null){p.return=v.return,v=p;break}v=v.return}p=v}$t(r,s,f.children,a),s=s.child}return s;case 9:return f=s.type,c=s.pendingProps.children,ao(s,a),f=mn(f),c=c(f),s.flags|=1,$t(r,s,c,a),s.child;case 14:return c=s.type,f=Pn(c,s.pendingProps),f=Pn(c.type,f),Jm(r,s,c,f,a);case 15:return Xm(r,s,s.type,s.pendingProps,a);case 17:return c=s.type,f=s.pendingProps,f=s.elementType===c?f:Pn(c,f),_u(r,s),s.tag=1,Kt(c)?(r=!0,eu(s)):r=!1,ao(s,a),_m(s,c,f),Fh(s,c,f,a),ef(null,s,c,!0,r,a);case 19:return og(r,s,a);case 22:return Zm(r,s,a)}throw Error(t(156,s.tag))};function Ng(r,s){return ta(r,s)}function KT(r,s,a,c){this.tag=r,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=s,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _n(r,s,a,c){return new KT(r,s,a,c)}function wf(r){return r=r.prototype,!(!r||!r.isReactComponent)}function GT(r){if(typeof r=="function")return wf(r)?1:0;if(r!=null){if(r=r.$$typeof,r===O)return 11;if(r===$e)return 14}return 2}function gi(r,s){var a=r.alternate;return a===null?(a=_n(r.tag,s,r.key,r.mode),a.elementType=r.elementType,a.type=r.type,a.stateNode=r.stateNode,a.alternate=r,r.alternate=a):(a.pendingProps=s,a.type=r.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=r.flags&14680064,a.childLanes=r.childLanes,a.lanes=r.lanes,a.child=r.child,a.memoizedProps=r.memoizedProps,a.memoizedState=r.memoizedState,a.updateQueue=r.updateQueue,s=r.dependencies,a.dependencies=s===null?null:{lanes:s.lanes,firstContext:s.firstContext},a.sibling=r.sibling,a.index=r.index,a.ref=r.ref,a}function ku(r,s,a,c,f,p){var v=2;if(c=r,typeof r=="function")wf(r)&&(v=1);else if(typeof r=="string")v=5;else e:switch(r){case N:return cs(a.children,f,p,s);case S:v=8,f|=8;break;case C:return r=_n(12,a,s,f|2),r.elementType=C,r.lanes=p,r;case R:return r=_n(13,a,s,f),r.elementType=R,r.lanes=p,r;case ze:return r=_n(19,a,s,f),r.elementType=ze,r.lanes=p,r;case Je:return Nu(a,f,p,s);default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case V:v=10;break e;case D:v=9;break e;case O:v=11;break e;case $e:v=14;break e;case Vt:v=16,c=null;break e}throw Error(t(130,r==null?r:typeof r,""))}return s=_n(v,a,s,f),s.elementType=r,s.type=c,s.lanes=p,s}function cs(r,s,a,c){return r=_n(7,r,c,s),r.lanes=a,r}function Nu(r,s,a,c){return r=_n(22,r,c,s),r.elementType=Je,r.lanes=a,r.stateNode={isHidden:!1},r}function Tf(r,s,a){return r=_n(6,r,null,s),r.lanes=a,r}function If(r,s,a){return s=_n(4,r.children!==null?r.children:[],r.key,s),s.lanes=a,s.stateNode={containerInfo:r.containerInfo,pendingChildren:null,implementation:r.implementation},s}function QT(r,s,a,c,f){this.tag=s,this.containerInfo=r,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=oa(0),this.expirationTimes=oa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=oa(0),this.identifierPrefix=c,this.onRecoverableError=f,this.mutableSourceEagerHydrationData=null}function Sf(r,s,a,c,f,p,v,I,P){return r=new QT(r,s,a,I,P),s===1?(s=1,p===!0&&(s|=8)):s=0,p=_n(3,null,null,s),r.current=p,p.stateNode=r,p.memoizedState={element:c,isDehydrated:a,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mh(p),r}function YT(r,s,a){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ie,key:c==null?null:""+c,children:r,containerInfo:s,implementation:a}}function Dg(r){if(!r)return ai;r=r._reactInternals;e:{if(Sn(r)!==r||r.tag!==1)throw Error(t(170));var s=r;do{switch(s.tag){case 3:s=s.stateNode.context;break e;case 1:if(Kt(s.type)){s=s.stateNode.__reactInternalMemoizedMergedChildContext;break e}}s=s.return}while(s!==null);throw Error(t(171))}if(r.tag===1){var a=r.type;if(Kt(a))return im(r,a,s)}return s}function xg(r,s,a,c,f,p,v,I,P){return r=Sf(a,c,!0,r,f,p,v,I,P),r.context=Dg(null),a=r.current,c=Ht(),f=pi(a),p=Dr(c,f),p.callback=s??null,ci(a,p,f),r.current.lanes=f,Gi(r,f,c),Yt(r,c),r}function Du(r,s,a,c){var f=s.current,p=Ht(),v=pi(f);return a=Dg(a),s.context===null?s.context=a:s.pendingContext=a,s=Dr(p,v),s.payload={element:r},c=c===void 0?null:c,c!==null&&(s.callback=c),r=ci(f,s,v),r!==null&&(Dn(r,f,v,p),au(r,f,v)),v}function xu(r){if(r=r.current,!r.child)return null;switch(r.child.tag){case 5:return r.child.stateNode;default:return r.child.stateNode}}function Vg(r,s){if(r=r.memoizedState,r!==null&&r.dehydrated!==null){var a=r.retryLane;r.retryLane=a!==0&&a<s?a:s}}function Rf(r,s){Vg(r,s),(r=r.alternate)&&Vg(r,s)}function JT(){return null}var Og=typeof reportError=="function"?reportError:function(r){console.error(r)};function Af(r){this._internalRoot=r}Vu.prototype.render=Af.prototype.render=function(r){var s=this._internalRoot;if(s===null)throw Error(t(409));Du(r,s,null,null)},Vu.prototype.unmount=Af.prototype.unmount=function(){var r=this._internalRoot;if(r!==null){this._internalRoot=null;var s=r.containerInfo;as(function(){Du(null,r,null,null)}),s[Ar]=null}};function Vu(r){this._internalRoot=r}Vu.prototype.unstable_scheduleHydration=function(r){if(r){var s=ca();r={blockedOn:null,target:r,priority:s};for(var a=0;a<tn.length&&s!==0&&s<tn[a].priority;a++);tn.splice(a,0,r),a===0&&js(r)}};function Cf(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11)}function Ou(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11&&(r.nodeType!==8||r.nodeValue!==" react-mount-point-unstable "))}function Lg(){}function XT(r,s,a,c,f){if(f){if(typeof c=="function"){var p=c;c=function(){var U=xu(v);p.call(U)}}var v=xg(s,c,r,0,null,!1,!1,"",Lg);return r._reactRootContainer=v,r[Ar]=v.current,Ta(r.nodeType===8?r.parentNode:r),as(),v}for(;f=r.lastChild;)r.removeChild(f);if(typeof c=="function"){var I=c;c=function(){var U=xu(P);I.call(U)}}var P=Sf(r,0,!1,null,null,!1,!1,"",Lg);return r._reactRootContainer=P,r[Ar]=P.current,Ta(r.nodeType===8?r.parentNode:r),as(function(){Du(s,P,a,c)}),P}function Lu(r,s,a,c,f){var p=a._reactRootContainer;if(p){var v=p;if(typeof f=="function"){var I=f;f=function(){var P=xu(v);I.call(P)}}Du(s,v,r,f)}else v=XT(a,s,r,f,c);return xu(v)}la=function(r){switch(r.tag){case 3:var s=r.stateNode;if(s.current.memoizedState.isDehydrated){var a=Fe(s.pendingLanes);a!==0&&(aa(s,a|1),Yt(s,Ke()),(Oe&6)===0&&(po=Ke()+500,li()))}break;case 13:as(function(){var c=Nr(r,1);if(c!==null){var f=Ht();Dn(c,r,1,f)}}),Rf(r,1)}},Fs=function(r){if(r.tag===13){var s=Nr(r,134217728);if(s!==null){var a=Ht();Dn(s,r,134217728,a)}Rf(r,134217728)}},ua=function(r){if(r.tag===13){var s=pi(r),a=Nr(r,s);if(a!==null){var c=Ht();Dn(a,r,s,c)}Rf(r,s)}},ca=function(){return De},ha=function(r,s){var a=De;try{return De=r,s()}finally{De=a}},gr=function(r,s,a){switch(s){case"input":if(Fi(r,a),s=a.name,a.type==="radio"&&s!=null){for(a=r;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll("input[name="+JSON.stringify(""+s)+'][type="radio"]'),s=0;s<a.length;s++){var c=a[s];if(c!==r&&c.form===r.form){var f=Xl(c);if(!f)throw Error(t(90));Wo(c),Fi(c,f)}}}break;case"textarea":Il(r,a);break;case"select":s=a.value,s!=null&&Tn(r,!!a.multiple,s,!1)}},Al=_f,Cl=as;var ZT={usingClientEntryPoint:!1,Events:[Ra,eo,Xl,Gr,Qr,_f]},Ua={findFiberByHostInstance:Zi,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},eI={bundleType:Ua.bundleType,version:Ua.version,rendererPackageName:Ua.rendererPackageName,rendererConfig:Ua.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ve.ReactCurrentDispatcher,findHostInstanceByFiber:function(r){return r=Ol(r),r===null?null:r.stateNode},findFiberByHostInstance:Ua.findFiberByHostInstance||JT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mu.isDisabled&&Mu.supportsFiber)try{Hi=Mu.inject(eI),Zt=Mu}catch{}}return Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ZT,Jt.createPortal=function(r,s){var a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Cf(s))throw Error(t(200));return YT(r,s,null,a)},Jt.createRoot=function(r,s){if(!Cf(r))throw Error(t(299));var a=!1,c="",f=Og;return s!=null&&(s.unstable_strictMode===!0&&(a=!0),s.identifierPrefix!==void 0&&(c=s.identifierPrefix),s.onRecoverableError!==void 0&&(f=s.onRecoverableError)),s=Sf(r,1,!1,null,null,a,!1,c,f),r[Ar]=s.current,Ta(r.nodeType===8?r.parentNode:r),new Af(s)},Jt.findDOMNode=function(r){if(r==null)return null;if(r.nodeType===1)return r;var s=r._reactInternals;if(s===void 0)throw typeof r.render=="function"?Error(t(188)):(r=Object.keys(r).join(","),Error(t(268,r)));return r=Ol(s),r=r===null?null:r.stateNode,r},Jt.flushSync=function(r){return as(r)},Jt.hydrate=function(r,s,a){if(!Ou(s))throw Error(t(200));return Lu(null,r,s,!0,a)},Jt.hydrateRoot=function(r,s,a){if(!Cf(r))throw Error(t(405));var c=a!=null&&a.hydratedSources||null,f=!1,p="",v=Og;if(a!=null&&(a.unstable_strictMode===!0&&(f=!0),a.identifierPrefix!==void 0&&(p=a.identifierPrefix),a.onRecoverableError!==void 0&&(v=a.onRecoverableError)),s=xg(s,null,r,1,a??null,f,!1,p,v),r[Ar]=s.current,Ta(r),c)for(r=0;r<c.length;r++)a=c[r],f=a._getVersion,f=f(a._source),s.mutableSourceEagerHydrationData==null?s.mutableSourceEagerHydrationData=[a,f]:s.mutableSourceEagerHydrationData.push(a,f);return new Vu(s)},Jt.render=function(r,s,a){if(!Ou(s))throw Error(t(200));return Lu(null,r,s,!1,a)},Jt.unmountComponentAtNode=function(r){if(!Ou(r))throw Error(t(40));return r._reactRootContainer?(as(function(){Lu(null,null,r,!1,function(){r._reactRootContainer=null,r[Ar]=null})}),!0):!1},Jt.unstable_batchedUpdates=_f,Jt.unstable_renderSubtreeIntoContainer=function(r,s,a,c){if(!Ou(a))throw Error(t(200));if(r==null||r._reactInternals===void 0)throw Error(t(38));return Lu(r,s,a,!1,c)},Jt.version="18.2.0-next-9e3b772b8-20220608",Jt}var $g;function uI(){if($g)return Nf.exports;$g=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}return n(),Nf.exports=lI(),Nf.exports}var Hg;function cI(){if(Hg)return bu;Hg=1;var n=uI();return bu.createRoot=n.createRoot,bu.hydrateRoot=n.hydrateRoot,bu}var hI=cI();const fI=nI(hI);/**
 * react-router v7.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var qg="popstate";function Wg(n){return typeof n=="object"&&n!=null&&"pathname"in n&&"search"in n&&"hash"in n&&"state"in n&&"key"in n}function dI(n={}){function e(i,o){var y;let l=(y=o.state)==null?void 0:y.masked,{pathname:h,search:d,hash:g}=l||i.location;return Jf("",{pathname:h,search:d,hash:g},o.state&&o.state.usr||null,o.state&&o.state.key||"default",l?{pathname:i.location.pathname,search:i.location.search,hash:i.location.hash}:void 0)}function t(i,o){return typeof o=="string"?o:Za(o)}return mI(e,t,null,n)}function Ze(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function bn(n,e){if(!n){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function pI(){return Math.random().toString(36).substring(2,10)}function Kg(n,e){return{usr:n.state,key:n.key,idx:e,masked:n.unstable_mask?{pathname:n.pathname,search:n.search,hash:n.hash}:void 0}}function Jf(n,e,t=null,i,o){return{pathname:typeof n=="string"?n:n.pathname,search:"",hash:"",...typeof e=="string"?Lo(e):e,state:t,key:e&&e.key||i||pI(),unstable_mask:o}}function Za({pathname:n="/",search:e="",hash:t=""}){return e&&e!=="?"&&(n+=e.charAt(0)==="?"?e:"?"+e),t&&t!=="#"&&(n+=t.charAt(0)==="#"?t:"#"+t),n}function Lo(n){let e={};if(n){let t=n.indexOf("#");t>=0&&(e.hash=n.substring(t),n=n.substring(0,t));let i=n.indexOf("?");i>=0&&(e.search=n.substring(i),n=n.substring(0,i)),n&&(e.pathname=n)}return e}function mI(n,e,t,i={}){let{window:o=document.defaultView,v5Compat:l=!1}=i,h=o.history,d="POP",g=null,y=E();y==null&&(y=0,h.replaceState({...h.state,idx:y},""));function E(){return(h.state||{idx:null}).idx}function w(){d="POP";let z=E(),Y=z==null?null:z-y;y=z,g&&g({action:d,location:$.location,delta:Y})}function A(z,Y){d="PUSH";let te=Wg(z)?z:Jf($.location,z,Y);y=E()+1;let se=Kg(te,y),ve=$.createHref(te.unstable_mask||te);try{h.pushState(se,"",ve)}catch(ye){if(ye instanceof DOMException&&ye.name==="DataCloneError")throw ye;o.location.assign(ve)}l&&g&&g({action:d,location:$.location,delta:1})}function b(z,Y){d="REPLACE";let te=Wg(z)?z:Jf($.location,z,Y);y=E();let se=Kg(te,y),ve=$.createHref(te.unstable_mask||te);h.replaceState(se,"",ve),l&&g&&g({action:d,location:$.location,delta:0})}function H(z){return gI(z)}let $={get action(){return d},get location(){return n(o,h)},listen(z){if(g)throw new Error("A history only accepts one active listener");return o.addEventListener(qg,w),g=z,()=>{o.removeEventListener(qg,w),g=null}},createHref(z){return e(o,z)},createURL:H,encodeLocation(z){let Y=H(z);return{pathname:Y.pathname,search:Y.search,hash:Y.hash}},push:A,replace:b,go(z){return h.go(z)}};return $}function gI(n,e=!1){let t="http://localhost";typeof window<"u"&&(t=window.location.origin!=="null"?window.location.origin:window.location.href),Ze(t,"No window.location.(origin|href) available to create URL");let i=typeof n=="string"?n:Za(n);return i=i.replace(/ $/,"%20"),!e&&i.startsWith("//")&&(i=t+i),new URL(i,t)}function F_(n,e,t="/"){return yI(n,e,t,!1)}function yI(n,e,t,i){let o=typeof e=="string"?Lo(e):e,l=br(o.pathname||"/",t);if(l==null)return null;let h=U_(n);_I(h);let d=null;for(let g=0;d==null&&g<h.length;++g){let y=kI(l);d=CI(h[g],y,i)}return d}function U_(n,e=[],t=[],i="",o=!1){let l=(h,d,g=o,y)=>{let E={relativePath:y===void 0?h.path||"":y,caseSensitive:h.caseSensitive===!0,childrenIndex:d,route:h};if(E.relativePath.startsWith("/")){if(!E.relativePath.startsWith(i)&&g)return;Ze(E.relativePath.startsWith(i),`Absolute route path "${E.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),E.relativePath=E.relativePath.slice(i.length)}let w=Ln([i,E.relativePath]),A=t.concat(E);h.children&&h.children.length>0&&(Ze(h.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${w}".`),U_(h.children,e,A,w,g)),!(h.path==null&&!h.index)&&e.push({path:w,score:RI(w,h.index),routesMeta:A})};return n.forEach((h,d)=>{var g;if(h.path===""||!((g=h.path)!=null&&g.includes("?")))l(h,d);else for(let y of j_(h.path))l(h,d,!0,y)}),e}function j_(n){let e=n.split("/");if(e.length===0)return[];let[t,...i]=e,o=t.endsWith("?"),l=t.replace(/\?$/,"");if(i.length===0)return o?[l,""]:[l];let h=j_(i.join("/")),d=[];return d.push(...h.map(g=>g===""?l:[l,g].join("/"))),o&&d.push(...h),d.map(g=>n.startsWith("/")&&g===""?"/":g)}function _I(n){n.sort((e,t)=>e.score!==t.score?t.score-e.score:AI(e.routesMeta.map(i=>i.childrenIndex),t.routesMeta.map(i=>i.childrenIndex)))}var vI=/^:[\w-]+$/,EI=3,wI=2,TI=1,II=10,SI=-2,Gg=n=>n==="*";function RI(n,e){let t=n.split("/"),i=t.length;return t.some(Gg)&&(i+=SI),e&&(i+=wI),t.filter(o=>!Gg(o)).reduce((o,l)=>o+(vI.test(l)?EI:l===""?TI:II),i)}function AI(n,e){return n.length===e.length&&n.slice(0,-1).every((i,o)=>i===e[o])?n[n.length-1]-e[e.length-1]:0}function CI(n,e,t=!1){let{routesMeta:i}=n,o={},l="/",h=[];for(let d=0;d<i.length;++d){let g=i[d],y=d===i.length-1,E=l==="/"?e:e.slice(l.length)||"/",w=oc({path:g.relativePath,caseSensitive:g.caseSensitive,end:y},E),A=g.route;if(!w&&y&&t&&!i[i.length-1].route.index&&(w=oc({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},E)),!w)return null;Object.assign(o,w.params),h.push({params:o,pathname:Ln([l,w.pathname]),pathnameBase:VI(Ln([l,w.pathnameBase])),route:A}),w.pathnameBase!=="/"&&(l=Ln([l,w.pathnameBase]))}return h}function oc(n,e){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[t,i]=PI(n.path,n.caseSensitive,n.end),o=e.match(t);if(!o)return null;let l=o[0],h=l.replace(/(.)\/+$/,"$1"),d=o.slice(1);return{params:i.reduce((y,{paramName:E,isOptional:w},A)=>{if(E==="*"){let H=d[A]||"";h=l.slice(0,l.length-H.length).replace(/(.)\/+$/,"$1")}const b=d[A];return w&&!b?y[E]=void 0:y[E]=(b||"").replace(/%2F/g,"/"),y},{}),pathname:l,pathnameBase:h,pattern:n}}function PI(n,e=!1,t=!0){bn(n==="*"||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`);let i=[],o="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(h,d,g,y,E)=>{if(i.push({paramName:d,isOptional:g!=null}),g){let w=E.charAt(y+h.length);return w&&w!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return n.endsWith("*")?(i.push({paramName:"*"}),o+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?o+="\\/*$":n!==""&&n!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,e?void 0:"i"),i]}function kI(n){try{return n.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return bn(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),n}}function br(n,e){if(e==="/")return n;if(!n.toLowerCase().startsWith(e.toLowerCase()))return null;let t=e.endsWith("/")?e.length-1:e.length,i=n.charAt(t);return i&&i!=="/"?null:n.slice(t)||"/"}var NI=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function DI(n,e="/"){let{pathname:t,search:i="",hash:o=""}=typeof n=="string"?Lo(n):n,l;return t?(t=z_(t),t.startsWith("/")?l=Qg(t.substring(1),"/"):l=Qg(t,e)):l=e,{pathname:l,search:OI(i),hash:LI(o)}}function Qg(n,e){let t=ac(e).split("/");return n.split("/").forEach(o=>{o===".."?t.length>1&&t.pop():o!=="."&&t.push(o)}),t.length>1?t.join("/"):"/"}function Vf(n,e,t,i){return`Cannot include a '${n}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${t}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function xI(n){return n.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ad(n){let e=xI(n);return e.map((t,i)=>i===e.length-1?t.pathname:t.pathnameBase)}function Dc(n,e,t,i=!1){let o;typeof n=="string"?o=Lo(n):(o={...n},Ze(!o.pathname||!o.pathname.includes("?"),Vf("?","pathname","search",o)),Ze(!o.pathname||!o.pathname.includes("#"),Vf("#","pathname","hash",o)),Ze(!o.search||!o.search.includes("#"),Vf("#","search","hash",o)));let l=n===""||o.pathname==="",h=l?"/":o.pathname,d;if(h==null)d=t;else{let w=e.length-1;if(!i&&h.startsWith("..")){let A=h.split("/");for(;A[0]==="..";)A.shift(),w-=1;o.pathname=A.join("/")}d=w>=0?e[w]:"/"}let g=DI(o,d),y=h&&h!=="/"&&h.endsWith("/"),E=(l||h===".")&&t.endsWith("/");return!g.pathname.endsWith("/")&&(y||E)&&(g.pathname+="/"),g}var z_=n=>n.replace(/\/\/+/g,"/"),Ln=n=>z_(n.join("/")),ac=n=>n.replace(/\/+$/,""),VI=n=>ac(n).replace(/^\/*/,"/"),OI=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,LI=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n,MI=class{constructor(n,e,t,i=!1){this.status=n,this.statusText=e||"",this.internal=i,t instanceof Error?(this.data=t.toString(),this.error=t):this.data=t}};function bI(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}function FI(n){let e=n.map(t=>t.route.path).filter(Boolean);return Ln(e)||"/"}var B_=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function $_(n,e){let t=n;if(typeof t!="string"||!NI.test(t))return{absoluteURL:void 0,isExternal:!1,to:t};let i=t,o=!1;if(B_)try{let l=new URL(window.location.href),h=t.startsWith("//")?new URL(l.protocol+t):new URL(t),d=br(h.pathname,e);h.origin===l.origin&&d!=null?t=d+h.search+h.hash:o=!0}catch{bn(!1,`<Link to="${t}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:i,isExternal:o,to:t}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var H_=["POST","PUT","PATCH","DELETE"];new Set(H_);var UI=["GET",...H_];new Set(UI);var Mo=B.createContext(null);Mo.displayName="DataRouter";var xc=B.createContext(null);xc.displayName="DataRouterState";var q_=B.createContext(!1);function jI(){return B.useContext(q_)}var W_=B.createContext({isTransitioning:!1});W_.displayName="ViewTransition";var zI=B.createContext(new Map);zI.displayName="Fetchers";var BI=B.createContext(null);BI.displayName="Await";var cn=B.createContext(null);cn.displayName="Navigation";var ul=B.createContext(null);ul.displayName="Location";var pr=B.createContext({outlet:null,matches:[],isDataRoute:!1});pr.displayName="Route";var Cd=B.createContext(null);Cd.displayName="RouteError";var K_="REACT_ROUTER_ERROR",$I="REDIRECT",HI="ROUTE_ERROR_RESPONSE";function qI(n){if(n.startsWith(`${K_}:${$I}:{`))try{let e=JSON.parse(n.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function WI(n){if(n.startsWith(`${K_}:${HI}:{`))try{let e=JSON.parse(n.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new MI(e.status,e.statusText,e.data)}catch{}}function KI(n,{relative:e}={}){Ze(bo(),"useHref() may be used only in the context of a <Router> component.");let{basename:t,navigator:i}=B.useContext(cn),{hash:o,pathname:l,search:h}=cl(n,{relative:e}),d=l;return t!=="/"&&(d=l==="/"?t:Ln([t,l])),i.createHref({pathname:d,search:h,hash:o})}function bo(){return B.useContext(ul)!=null}function mr(){return Ze(bo(),"useLocation() may be used only in the context of a <Router> component."),B.useContext(ul).location}var G_="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Q_(n){B.useContext(cn).static||B.useLayoutEffect(n)}function Pd(){let{isDataRoute:n}=B.useContext(pr);return n?o0():GI()}function GI(){Ze(bo(),"useNavigate() may be used only in the context of a <Router> component.");let n=B.useContext(Mo),{basename:e,navigator:t}=B.useContext(cn),{matches:i}=B.useContext(pr),{pathname:o}=mr(),l=JSON.stringify(Ad(i)),h=B.useRef(!1);return Q_(()=>{h.current=!0}),B.useCallback((g,y={})=>{if(bn(h.current,G_),!h.current)return;if(typeof g=="number"){t.go(g);return}let E=Dc(g,JSON.parse(l),o,y.relative==="path");n==null&&e!=="/"&&(E.pathname=E.pathname==="/"?e:Ln([e,E.pathname])),(y.replace?t.replace:t.push)(E,y.state,y)},[e,t,l,o,n])}B.createContext(null);function cl(n,{relative:e}={}){let{matches:t}=B.useContext(pr),{pathname:i}=mr(),o=JSON.stringify(Ad(t));return B.useMemo(()=>Dc(n,JSON.parse(o),i,e==="path"),[n,o,i,e])}function QI(n,e){return Y_(n,e)}function Y_(n,e,t){var z;Ze(bo(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=B.useContext(cn),{matches:o}=B.useContext(pr),l=o[o.length-1],h=l?l.params:{},d=l?l.pathname:"/",g=l?l.pathnameBase:"/",y=l&&l.route;{let Y=y&&y.path||"";X_(d,!y||Y.endsWith("*")||Y.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${d}" (under <Route path="${Y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${Y}"> to <Route path="${Y==="/"?"*":`${Y}/*`}">.`)}let E=mr(),w;if(e){let Y=typeof e=="string"?Lo(e):e;Ze(g==="/"||((z=Y.pathname)==null?void 0:z.startsWith(g)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${Y.pathname}" was given in the \`location\` prop.`),w=Y}else w=E;let A=w.pathname||"/",b=A;if(g!=="/"){let Y=g.replace(/^\//,"").split("/");b="/"+A.replace(/^\//,"").split("/").slice(Y.length).join("/")}let H=F_(n,{pathname:b});bn(y||H!=null,`No routes matched location "${w.pathname}${w.search}${w.hash}" `),bn(H==null||H[H.length-1].route.element!==void 0||H[H.length-1].route.Component!==void 0||H[H.length-1].route.lazy!==void 0,`Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let $=e0(H&&H.map(Y=>Object.assign({},Y,{params:Object.assign({},h,Y.params),pathname:Ln([g,i.encodeLocation?i.encodeLocation(Y.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:Y.pathname]),pathnameBase:Y.pathnameBase==="/"?g:Ln([g,i.encodeLocation?i.encodeLocation(Y.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:Y.pathnameBase])})),o,t);return e&&$?B.createElement(ul.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",unstable_mask:void 0,...w},navigationType:"POP"}},$):$}function YI(){let n=s0(),e=bI(n)?`${n.status} ${n.statusText}`:n instanceof Error?n.message:JSON.stringify(n),t=n instanceof Error?n.stack:null,i="rgba(200,200,200, 0.5)",o={padding:"0.5rem",backgroundColor:i},l={padding:"2px 4px",backgroundColor:i},h=null;return console.error("Error handled by React Router default ErrorBoundary:",n),h=B.createElement(B.Fragment,null,B.createElement("p",null,"💿 Hey developer 👋"),B.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",B.createElement("code",{style:l},"ErrorBoundary")," or"," ",B.createElement("code",{style:l},"errorElement")," prop on your route.")),B.createElement(B.Fragment,null,B.createElement("h2",null,"Unexpected Application Error!"),B.createElement("h3",{style:{fontStyle:"italic"}},e),t?B.createElement("pre",{style:o},t):null,h)}var JI=B.createElement(YI,null),J_=class extends B.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,e){return e.location!==n.location||e.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:e.error,location:e.location,revalidation:n.revalidation||e.revalidation}}componentDidCatch(n,e){this.props.onError?this.props.onError(n,e):console.error("React Router caught the following error during render",n)}render(){let n=this.state.error;if(this.context&&typeof n=="object"&&n&&"digest"in n&&typeof n.digest=="string"){const t=WI(n.digest);t&&(n=t)}let e=n!==void 0?B.createElement(pr.Provider,{value:this.props.routeContext},B.createElement(Cd.Provider,{value:n,children:this.props.component})):this.props.children;return this.context?B.createElement(XI,{error:n},e):e}};J_.contextType=q_;var Of=new WeakMap;function XI({children:n,error:e}){let{basename:t}=B.useContext(cn);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let i=qI(e.digest);if(i){let o=Of.get(e);if(o)throw o;let l=$_(i.location,t);if(B_&&!Of.get(e))if(l.isExternal||i.reloadDocument)window.location.href=l.absoluteURL||l.to;else{const h=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(l.to,{replace:i.replace}));throw Of.set(e,h),h}return B.createElement("meta",{httpEquiv:"refresh",content:`0;url=${l.absoluteURL||l.to}`})}}return n}function ZI({routeContext:n,match:e,children:t}){let i=B.useContext(Mo);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),B.createElement(pr.Provider,{value:n},t)}function e0(n,e=[],t){let i=t==null?void 0:t.state;if(n==null){if(!i)return null;if(i.errors)n=i.matches;else if(e.length===0&&!i.initialized&&i.matches.length>0)n=i.matches;else return null}let o=n,l=i==null?void 0:i.errors;if(l!=null){let E=o.findIndex(w=>w.route.id&&(l==null?void 0:l[w.route.id])!==void 0);Ze(E>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(l).join(",")}`),o=o.slice(0,Math.min(o.length,E+1))}let h=!1,d=-1;if(t&&i){h=i.renderFallback;for(let E=0;E<o.length;E++){let w=o[E];if((w.route.HydrateFallback||w.route.hydrateFallbackElement)&&(d=E),w.route.id){let{loaderData:A,errors:b}=i,H=w.route.loader&&!A.hasOwnProperty(w.route.id)&&(!b||b[w.route.id]===void 0);if(w.route.lazy||H){t.isStatic&&(h=!0),d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}}let g=t==null?void 0:t.onError,y=i&&g?(E,w)=>{var A,b;g(E,{location:i.location,params:((b=(A=i.matches)==null?void 0:A[0])==null?void 0:b.params)??{},unstable_pattern:FI(i.matches),errorInfo:w})}:void 0;return o.reduceRight((E,w,A)=>{let b,H=!1,$=null,z=null;i&&(b=l&&w.route.id?l[w.route.id]:void 0,$=w.route.errorElement||JI,h&&(d<0&&A===0?(X_("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),H=!0,z=null):d===A&&(H=!0,z=w.route.hydrateFallbackElement||null)));let Y=e.concat(o.slice(0,A+1)),te=()=>{let se;return b?se=$:H?se=z:w.route.Component?se=B.createElement(w.route.Component,null):w.route.element?se=w.route.element:se=E,B.createElement(ZI,{match:w,routeContext:{outlet:E,matches:Y,isDataRoute:i!=null},children:se})};return i&&(w.route.ErrorBoundary||w.route.errorElement||A===0)?B.createElement(J_,{location:i.location,revalidation:i.revalidation,component:$,error:b,children:te(),routeContext:{outlet:null,matches:Y,isDataRoute:!0},onError:y}):te()},null)}function kd(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function t0(n){let e=B.useContext(Mo);return Ze(e,kd(n)),e}function n0(n){let e=B.useContext(xc);return Ze(e,kd(n)),e}function r0(n){let e=B.useContext(pr);return Ze(e,kd(n)),e}function Nd(n){let e=r0(n),t=e.matches[e.matches.length-1];return Ze(t.route.id,`${n} can only be used on routes that contain a unique "id"`),t.route.id}function i0(){return Nd("useRouteId")}function s0(){var i;let n=B.useContext(Cd),e=n0("useRouteError"),t=Nd("useRouteError");return n!==void 0?n:(i=e.errors)==null?void 0:i[t]}function o0(){let{router:n}=t0("useNavigate"),e=Nd("useNavigate"),t=B.useRef(!1);return Q_(()=>{t.current=!0}),B.useCallback(async(o,l={})=>{bn(t.current,G_),t.current&&(typeof o=="number"?await n.navigate(o):await n.navigate(o,{fromRouteId:e,...l}))},[n,e])}var Yg={};function X_(n,e,t){!e&&!Yg[n]&&(Yg[n]=!0,bn(!1,t))}B.memo(a0);function a0({routes:n,future:e,state:t,isStatic:i,onError:o}){return Y_(n,void 0,{state:t,isStatic:i,onError:o})}function l0({to:n,replace:e,state:t,relative:i}){Ze(bo(),"<Navigate> may be used only in the context of a <Router> component.");let{static:o}=B.useContext(cn);bn(!o,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:l}=B.useContext(pr),{pathname:h}=mr(),d=Pd(),g=Dc(n,Ad(l),h,i==="path"),y=JSON.stringify(g);return B.useEffect(()=>{d(JSON.parse(y),{replace:e,state:t,relative:i})},[d,y,i,e,t]),null}function Wu(n){Ze(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function u0({basename:n="/",children:e=null,location:t,navigationType:i="POP",navigator:o,static:l=!1,unstable_useTransitions:h}){Ze(!bo(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let d=n.replace(/^\/*/,"/"),g=B.useMemo(()=>({basename:d,navigator:o,static:l,unstable_useTransitions:h,future:{}}),[d,o,l,h]);typeof t=="string"&&(t=Lo(t));let{pathname:y="/",search:E="",hash:w="",state:A=null,key:b="default",unstable_mask:H}=t,$=B.useMemo(()=>{let z=br(y,d);return z==null?null:{location:{pathname:z,search:E,hash:w,state:A,key:b,unstable_mask:H},navigationType:i}},[d,y,E,w,A,b,i,H]);return bn($!=null,`<Router basename="${d}"> is not able to match the URL "${y}${E}${w}" because it does not start with the basename, so the <Router> won't render anything.`),$==null?null:B.createElement(cn.Provider,{value:g},B.createElement(ul.Provider,{children:e,value:$}))}function c0({children:n,location:e}){return QI(Xf(n),e)}function Xf(n,e=[]){let t=[];return B.Children.forEach(n,(i,o)=>{if(!B.isValidElement(i))return;let l=[...e,o];if(i.type===B.Fragment){t.push.apply(t,Xf(i.props.children,l));return}Ze(i.type===Wu,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ze(!i.props.index||!i.props.children,"An index route cannot have child routes.");let h={id:i.props.id||l.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,middleware:i.props.middleware,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(h.children=Xf(i.props.children,l)),t.push(h)}),t}var Ku="get",Gu="application/x-www-form-urlencoded";function Vc(n){return typeof HTMLElement<"u"&&n instanceof HTMLElement}function h0(n){return Vc(n)&&n.tagName.toLowerCase()==="button"}function f0(n){return Vc(n)&&n.tagName.toLowerCase()==="form"}function d0(n){return Vc(n)&&n.tagName.toLowerCase()==="input"}function p0(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function m0(n,e){return n.button===0&&(!e||e==="_self")&&!p0(n)}var Fu=null;function g0(){if(Fu===null)try{new FormData(document.createElement("form"),0),Fu=!1}catch{Fu=!0}return Fu}var y0=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Lf(n){return n!=null&&!y0.has(n)?(bn(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Gu}"`),null):n}function _0(n,e){let t,i,o,l,h;if(f0(n)){let d=n.getAttribute("action");i=d?br(d,e):null,t=n.getAttribute("method")||Ku,o=Lf(n.getAttribute("enctype"))||Gu,l=new FormData(n)}else if(h0(n)||d0(n)&&(n.type==="submit"||n.type==="image")){let d=n.form;if(d==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let g=n.getAttribute("formaction")||d.getAttribute("action");if(i=g?br(g,e):null,t=n.getAttribute("formmethod")||d.getAttribute("method")||Ku,o=Lf(n.getAttribute("formenctype"))||Lf(d.getAttribute("enctype"))||Gu,l=new FormData(d,n),!g0()){let{name:y,type:E,value:w}=n;if(E==="image"){let A=y?`${y}.`:"";l.append(`${A}x`,"0"),l.append(`${A}y`,"0")}else y&&l.append(y,w)}}else{if(Vc(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');t=Ku,i=null,o=Gu,h=n}return l&&o==="text/plain"&&(h=l,l=void 0),{action:i,method:t.toLowerCase(),encType:o,formData:l,body:h}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Dd(n,e){if(n===!1||n===null||typeof n>"u")throw new Error(e)}function Z_(n,e,t,i){let o=typeof n=="string"?new URL(n,typeof window>"u"?"server://singlefetch/":window.location.origin):n;return t?o.pathname.endsWith("/")?o.pathname=`${o.pathname}_.${i}`:o.pathname=`${o.pathname}.${i}`:o.pathname==="/"?o.pathname=`_root.${i}`:e&&br(o.pathname,e)==="/"?o.pathname=`${ac(e)}/_root.${i}`:o.pathname=`${ac(o.pathname)}.${i}`,o}async function v0(n,e){if(n.id in e)return e[n.id];try{let t=await import(n.module);return e[n.id]=t,t}catch(t){return console.error(`Error loading route module \`${n.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function E0(n){return n==null?!1:n.href==null?n.rel==="preload"&&typeof n.imageSrcSet=="string"&&typeof n.imageSizes=="string":typeof n.rel=="string"&&typeof n.href=="string"}async function w0(n,e,t){let i=await Promise.all(n.map(async o=>{let l=e.routes[o.route.id];if(l){let h=await v0(l,t);return h.links?h.links():[]}return[]}));return R0(i.flat(1).filter(E0).filter(o=>o.rel==="stylesheet"||o.rel==="preload").map(o=>o.rel==="stylesheet"?{...o,rel:"prefetch",as:"style"}:{...o,rel:"prefetch"}))}function Jg(n,e,t,i,o,l){let h=(g,y)=>t[y]?g.route.id!==t[y].route.id:!0,d=(g,y)=>{var E;return t[y].pathname!==g.pathname||((E=t[y].route.path)==null?void 0:E.endsWith("*"))&&t[y].params["*"]!==g.params["*"]};return l==="assets"?e.filter((g,y)=>h(g,y)||d(g,y)):l==="data"?e.filter((g,y)=>{var w;let E=i.routes[g.route.id];if(!E||!E.hasLoader)return!1;if(h(g,y)||d(g,y))return!0;if(g.route.shouldRevalidate){let A=g.route.shouldRevalidate({currentUrl:new URL(o.pathname+o.search+o.hash,window.origin),currentParams:((w=t[0])==null?void 0:w.params)||{},nextUrl:new URL(n,window.origin),nextParams:g.params,defaultShouldRevalidate:!0});if(typeof A=="boolean")return A}return!0}):[]}function T0(n,e,{includeHydrateFallback:t}={}){return I0(n.map(i=>{let o=e.routes[i.route.id];if(!o)return[];let l=[o.module];return o.clientActionModule&&(l=l.concat(o.clientActionModule)),o.clientLoaderModule&&(l=l.concat(o.clientLoaderModule)),t&&o.hydrateFallbackModule&&(l=l.concat(o.hydrateFallbackModule)),o.imports&&(l=l.concat(o.imports)),l}).flat(1))}function I0(n){return[...new Set(n)]}function S0(n){let e={},t=Object.keys(n).sort();for(let i of t)e[i]=n[i];return e}function R0(n,e){let t=new Set;return new Set(e),n.reduce((i,o)=>{let l=JSON.stringify(S0(o));return t.has(l)||(t.add(l),i.push({key:l,link:o})),i},[])}function xd(){let n=B.useContext(Mo);return Dd(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function A0(){let n=B.useContext(xc);return Dd(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}var Vd=B.createContext(void 0);Vd.displayName="FrameworkContext";function Od(){let n=B.useContext(Vd);return Dd(n,"You must render this element inside a <HydratedRouter> element"),n}function C0(n,e){let t=B.useContext(Vd),[i,o]=B.useState(!1),[l,h]=B.useState(!1),{onFocus:d,onBlur:g,onMouseEnter:y,onMouseLeave:E,onTouchStart:w}=e,A=B.useRef(null);B.useEffect(()=>{if(n==="render"&&h(!0),n==="viewport"){let $=Y=>{Y.forEach(te=>{h(te.isIntersecting)})},z=new IntersectionObserver($,{threshold:.5});return A.current&&z.observe(A.current),()=>{z.disconnect()}}},[n]),B.useEffect(()=>{if(i){let $=setTimeout(()=>{h(!0)},100);return()=>{clearTimeout($)}}},[i]);let b=()=>{o(!0)},H=()=>{o(!1),h(!1)};return t?n!=="intent"?[l,A,{}]:[l,A,{onFocus:za(d,b),onBlur:za(g,H),onMouseEnter:za(y,b),onMouseLeave:za(E,H),onTouchStart:za(w,b)}]:[!1,A,{}]}function za(n,e){return t=>{n&&n(t),t.defaultPrevented||e(t)}}function P0({page:n,...e}){let t=jI(),{router:i}=xd(),o=B.useMemo(()=>F_(i.routes,n,i.basename),[i.routes,n,i.basename]);return o?t?B.createElement(N0,{page:n,matches:o,...e}):B.createElement(D0,{page:n,matches:o,...e}):null}function k0(n){let{manifest:e,routeModules:t}=Od(),[i,o]=B.useState([]);return B.useEffect(()=>{let l=!1;return w0(n,e,t).then(h=>{l||o(h)}),()=>{l=!0}},[n,e,t]),i}function N0({page:n,matches:e,...t}){let i=mr(),{future:o}=Od(),{basename:l}=xd(),h=B.useMemo(()=>{if(n===i.pathname+i.search+i.hash)return[];let d=Z_(n,l,o.unstable_trailingSlashAwareDataRequests,"rsc"),g=!1,y=[];for(let E of e)typeof E.route.shouldRevalidate=="function"?g=!0:y.push(E.route.id);return g&&y.length>0&&d.searchParams.set("_routes",y.join(",")),[d.pathname+d.search]},[l,o.unstable_trailingSlashAwareDataRequests,n,i,e]);return B.createElement(B.Fragment,null,h.map(d=>B.createElement("link",{key:d,rel:"prefetch",as:"fetch",href:d,...t})))}function D0({page:n,matches:e,...t}){let i=mr(),{future:o,manifest:l,routeModules:h}=Od(),{basename:d}=xd(),{loaderData:g,matches:y}=A0(),E=B.useMemo(()=>Jg(n,e,y,l,i,"data"),[n,e,y,l,i]),w=B.useMemo(()=>Jg(n,e,y,l,i,"assets"),[n,e,y,l,i]),A=B.useMemo(()=>{if(n===i.pathname+i.search+i.hash)return[];let $=new Set,z=!1;if(e.forEach(te=>{var ve;let se=l.routes[te.route.id];!se||!se.hasLoader||(!E.some(ye=>ye.route.id===te.route.id)&&te.route.id in g&&((ve=h[te.route.id])!=null&&ve.shouldRevalidate)||se.hasClientLoader?z=!0:$.add(te.route.id))}),$.size===0)return[];let Y=Z_(n,d,o.unstable_trailingSlashAwareDataRequests,"data");return z&&$.size>0&&Y.searchParams.set("_routes",e.filter(te=>$.has(te.route.id)).map(te=>te.route.id).join(",")),[Y.pathname+Y.search]},[d,o.unstable_trailingSlashAwareDataRequests,g,i,l,E,e,n,h]),b=B.useMemo(()=>T0(w,l),[w,l]),H=k0(w);return B.createElement(B.Fragment,null,A.map($=>B.createElement("link",{key:$,rel:"prefetch",as:"fetch",href:$,...t})),b.map($=>B.createElement("link",{key:$,rel:"modulepreload",href:$,...t})),H.map(({key:$,link:z})=>B.createElement("link",{key:$,nonce:t.nonce,...z,crossOrigin:z.crossOrigin??t.crossOrigin})))}function x0(...n){return e=>{n.forEach(t=>{typeof t=="function"?t(e):t!=null&&(t.current=e)})}}var V0=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{V0&&(window.__reactRouterVersion="7.14.2")}catch{}function O0({basename:n,children:e,unstable_useTransitions:t,window:i}){let o=B.useRef();o.current==null&&(o.current=dI({window:i,v5Compat:!0}));let l=o.current,[h,d]=B.useState({action:l.action,location:l.location}),g=B.useCallback(y=>{t===!1?d(y):B.startTransition(()=>d(y))},[t]);return B.useLayoutEffect(()=>l.listen(g),[l,g]),B.createElement(u0,{basename:n,children:e,location:h.location,navigationType:h.action,navigator:l,unstable_useTransitions:t})}var ev=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tv=B.forwardRef(function({onClick:e,discover:t="render",prefetch:i="none",relative:o,reloadDocument:l,replace:h,unstable_mask:d,state:g,target:y,to:E,preventScrollReset:w,viewTransition:A,unstable_defaultShouldRevalidate:b,...H},$){let{basename:z,navigator:Y,unstable_useTransitions:te}=B.useContext(cn),se=typeof E=="string"&&ev.test(E),ve=$_(E,z);E=ve.to;let ye=KI(E,{relative:o}),Ie=mr(),N=null;if(d){let $e=Dc(d,[],Ie.unstable_mask?Ie.unstable_mask.pathname:"/",!0);z!=="/"&&($e.pathname=$e.pathname==="/"?z:Ln([z,$e.pathname])),N=Y.createHref($e)}let[S,C,V]=C0(i,H),D=F0(E,{replace:h,unstable_mask:d,state:g,target:y,preventScrollReset:w,relative:o,viewTransition:A,unstable_defaultShouldRevalidate:b,unstable_useTransitions:te});function O($e){e&&e($e),$e.defaultPrevented||D($e)}let R=!(ve.isExternal||l),ze=B.createElement("a",{...H,...V,href:(R?N:void 0)||ve.absoluteURL||ye,onClick:R?O:e,ref:x0($,C),target:y,"data-discover":!se&&t==="render"?"true":void 0});return S&&!se?B.createElement(B.Fragment,null,ze,B.createElement(P0,{page:ye})):ze});tv.displayName="Link";var L0=B.forwardRef(function({"aria-current":e="page",caseSensitive:t=!1,className:i="",end:o=!1,style:l,to:h,viewTransition:d,children:g,...y},E){let w=cl(h,{relative:y.relative}),A=mr(),b=B.useContext(xc),{navigator:H,basename:$}=B.useContext(cn),z=b!=null&&$0(w)&&d===!0,Y=H.encodeLocation?H.encodeLocation(w).pathname:w.pathname,te=A.pathname,se=b&&b.navigation&&b.navigation.location?b.navigation.location.pathname:null;t||(te=te.toLowerCase(),se=se?se.toLowerCase():null,Y=Y.toLowerCase()),se&&$&&(se=br(se,$)||se);const ve=Y!=="/"&&Y.endsWith("/")?Y.length-1:Y.length;let ye=te===Y||!o&&te.startsWith(Y)&&te.charAt(ve)==="/",Ie=se!=null&&(se===Y||!o&&se.startsWith(Y)&&se.charAt(Y.length)==="/"),N={isActive:ye,isPending:Ie,isTransitioning:z},S=ye?e:void 0,C;typeof i=="function"?C=i(N):C=[i,ye?"active":null,Ie?"pending":null,z?"transitioning":null].filter(Boolean).join(" ");let V=typeof l=="function"?l(N):l;return B.createElement(tv,{...y,"aria-current":S,className:C,ref:E,style:V,to:h,viewTransition:d},typeof g=="function"?g(N):g)});L0.displayName="NavLink";var M0=B.forwardRef(({discover:n="render",fetcherKey:e,navigate:t,reloadDocument:i,replace:o,state:l,method:h=Ku,action:d,onSubmit:g,relative:y,preventScrollReset:E,viewTransition:w,unstable_defaultShouldRevalidate:A,...b},H)=>{let{unstable_useTransitions:$}=B.useContext(cn),z=z0(),Y=B0(d,{relative:y}),te=h.toLowerCase()==="get"?"get":"post",se=typeof d=="string"&&ev.test(d),ve=ye=>{if(g&&g(ye),ye.defaultPrevented)return;ye.preventDefault();let Ie=ye.nativeEvent.submitter,N=(Ie==null?void 0:Ie.getAttribute("formmethod"))||h,S=()=>z(Ie||ye.currentTarget,{fetcherKey:e,method:N,navigate:t,replace:o,state:l,relative:y,preventScrollReset:E,viewTransition:w,unstable_defaultShouldRevalidate:A});$&&t!==!1?B.startTransition(()=>S()):S()};return B.createElement("form",{ref:H,method:te,action:Y,onSubmit:i?g:ve,...b,"data-discover":!se&&n==="render"?"true":void 0})});M0.displayName="Form";function b0(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function nv(n){let e=B.useContext(Mo);return Ze(e,b0(n)),e}function F0(n,{target:e,replace:t,unstable_mask:i,state:o,preventScrollReset:l,relative:h,viewTransition:d,unstable_defaultShouldRevalidate:g,unstable_useTransitions:y}={}){let E=Pd(),w=mr(),A=cl(n,{relative:h});return B.useCallback(b=>{if(m0(b,e)){b.preventDefault();let H=t!==void 0?t:Za(w)===Za(A),$=()=>E(n,{replace:H,unstable_mask:i,state:o,preventScrollReset:l,relative:h,viewTransition:d,unstable_defaultShouldRevalidate:g});y?B.startTransition(()=>$()):$()}},[w,E,A,t,i,o,e,n,l,h,d,g,y])}var U0=0,j0=()=>`__${String(++U0)}__`;function z0(){let{router:n}=nv("useSubmit"),{basename:e}=B.useContext(cn),t=i0(),i=n.fetch,o=n.navigate;return B.useCallback(async(l,h={})=>{let{action:d,method:g,encType:y,formData:E,body:w}=_0(l,e);if(h.navigate===!1){let A=h.fetcherKey||j0();await i(A,t,h.action||d,{unstable_defaultShouldRevalidate:h.unstable_defaultShouldRevalidate,preventScrollReset:h.preventScrollReset,formData:E,body:w,formMethod:h.method||g,formEncType:h.encType||y,flushSync:h.flushSync})}else await o(h.action||d,{unstable_defaultShouldRevalidate:h.unstable_defaultShouldRevalidate,preventScrollReset:h.preventScrollReset,formData:E,body:w,formMethod:h.method||g,formEncType:h.encType||y,replace:h.replace,state:h.state,fromRouteId:t,flushSync:h.flushSync,viewTransition:h.viewTransition})},[i,o,e,t])}function B0(n,{relative:e}={}){let{basename:t}=B.useContext(cn),i=B.useContext(pr);Ze(i,"useFormAction must be used inside a RouteContext");let[o]=i.matches.slice(-1),l={...cl(n||".",{relative:e})},h=mr();if(n==null){l.search=h.search;let d=new URLSearchParams(l.search),g=d.getAll("index");if(g.some(E=>E==="")){d.delete("index"),g.filter(w=>w).forEach(w=>d.append("index",w));let E=d.toString();l.search=E?`?${E}`:""}}return(!n||n===".")&&o.route.index&&(l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index"),t!=="/"&&(l.pathname=l.pathname==="/"?t:Ln([t,l.pathname])),Za(l)}function $0(n,{relative:e}={}){let t=B.useContext(W_);Ze(t!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=nv("useViewTransitionState"),o=cl(n,{relative:e});if(!t.isTransitioning)return!1;let l=br(t.currentLocation.pathname,i)||t.currentLocation.pathname,h=br(t.nextLocation.pathname,i)||t.nextLocation.pathname;return oc(o.pathname,h)!=null||oc(o.pathname,l)!=null}const H0=()=>{};var Xg={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rv=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let o=n.charCodeAt(i);o<128?e[t++]=o:o<2048?(e[t++]=o>>6|192,e[t++]=o&63|128):(o&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(o=65536+((o&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=o>>18|240,e[t++]=o>>12&63|128,e[t++]=o>>6&63|128,e[t++]=o&63|128):(e[t++]=o>>12|224,e[t++]=o>>6&63|128,e[t++]=o&63|128)}return e},q0=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const o=n[t++];if(o<128)e[i++]=String.fromCharCode(o);else if(o>191&&o<224){const l=n[t++];e[i++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=n[t++],h=n[t++],d=n[t++],g=((o&7)<<18|(l&63)<<12|(h&63)<<6|d&63)-65536;e[i++]=String.fromCharCode(55296+(g>>10)),e[i++]=String.fromCharCode(56320+(g&1023))}else{const l=n[t++],h=n[t++];e[i++]=String.fromCharCode((o&15)<<12|(l&63)<<6|h&63)}}return e.join("")},iv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let o=0;o<n.length;o+=3){const l=n[o],h=o+1<n.length,d=h?n[o+1]:0,g=o+2<n.length,y=g?n[o+2]:0,E=l>>2,w=(l&3)<<4|d>>4;let A=(d&15)<<2|y>>6,b=y&63;g||(b=64,h||(A=64)),i.push(t[E],t[w],t[A],t[b])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(rv(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):q0(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let o=0;o<n.length;){const l=t[n.charAt(o++)],d=o<n.length?t[n.charAt(o)]:0;++o;const y=o<n.length?t[n.charAt(o)]:64;++o;const w=o<n.length?t[n.charAt(o)]:64;if(++o,l==null||d==null||y==null||w==null)throw new W0;const A=l<<2|d>>4;if(i.push(A),y!==64){const b=d<<4&240|y>>2;if(i.push(b),w!==64){const H=y<<6&192|w;i.push(H)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class W0 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const K0=function(n){const e=rv(n);return iv.encodeByteArray(e,!0)},lc=function(n){return K0(n).replace(/\./g,"")},sv=function(n){try{return iv.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G0(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0=()=>G0().__FIREBASE_DEFAULTS__,Y0=()=>{if(typeof process>"u"||typeof Xg>"u")return;const n=Xg.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},J0=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&sv(n[1]);return e&&JSON.parse(e)},Oc=()=>{try{return H0()||Q0()||Y0()||J0()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ov=n=>{var e,t;return(t=(e=Oc())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},X0=n=>{const e=ov(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},av=()=>{var n;return(n=Oc())==null?void 0:n.config},lv=n=>{var e;return(e=Oc())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eS(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",o=n.iat||0,l=n.sub||n.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h={iss:`https://securetoken.google.com/${i}`,aud:i,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}},...n};return[lc(JSON.stringify(t)),lc(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function tS(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Bt())}function nS(){var e;const n=(e=Oc())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function rS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uv(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function iS(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sS(){const n=Bt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function oS(){return!nS()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function cv(){try{return typeof indexedDB=="object"}catch{return!1}}function hv(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(i);o.onsuccess=()=>{o.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},o.onupgradeneeded=()=>{t=!1},o.onerror=()=>{var l;e(((l=o.error)==null?void 0:l.message)||"")}}catch(t){e(t)}})}function aS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lS="FirebaseError";class zn extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=lS,Object.setPrototypeOf(this,zn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Es.prototype.create)}}class Es{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},o=`${this.service}/${e}`,l=this.errors[e],h=l?uS(l,i):"Error",d=`${this.serviceName}: ${h} (${o}).`;return new zn(o,d,i)}}function uS(n,e){return n.replace(cS,(t,i)=>{const o=e[i];return o!=null?String(o):`<${i}?>`})}const cS=/\{\$([^}]+)}/g;function hS(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ni(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const o of t){if(!i.includes(o))return!1;const l=n[o],h=e[o];if(Zg(l)&&Zg(h)){if(!Ni(l,h))return!1}else if(l!==h)return!1}for(const o of i)if(!t.includes(o))return!1;return!0}function Zg(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(o=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function $a(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[o,l]=i.split("=");e[decodeURIComponent(o)]=decodeURIComponent(l)}}),e}function Ha(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function fS(n,e){const t=new dS(n,e);return t.subscribe.bind(t)}class dS{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let o;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");pS(e,["next","error","complete"])?o=e:o={next:e,error:t,complete:i},o.next===void 0&&(o.next=Mf),o.error===void 0&&(o.error=Mf),o.complete===void 0&&(o.complete=Mf);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pS(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Mf(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mS=1e3,gS=2,yS=14400*1e3,_S=.5;function ey(n,e=mS,t=gS){const i=e*Math.pow(t,n),o=Math.round(_S*i*(Math.random()-.5)*2);return Math.min(yS,i+o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function fv(n){return(await fetch(n,{credentials:"include"})).ok}class Fn{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Z0;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:t});o&&i.resolve(o)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wS(e))try{this.getOrInitializeService({instanceIdentifier:hs})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(t);try{const l=this.getOrInitializeService({instanceIdentifier:o});i.resolve(l)}catch{}}}}clearInstance(e=hs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=hs){return this.instances.has(e)}getOptions(e=hs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[l,h]of this.instancesDeferred.entries()){const d=this.normalizeInstanceIdentifier(l);i===d&&h.resolve(o)}return o}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),o=this.onInitCallbacks.get(i)??new Set;o.add(e),this.onInitCallbacks.set(i,o);const l=this.instances.get(i);return l&&e(l,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const o of i)try{o(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ES(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=hs){return this.component?this.component.multipleInstances?e:hs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ES(n){return n===hs?void 0:n}function wS(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vS(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ce;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Ce||(Ce={}));const IS={debug:Ce.DEBUG,verbose:Ce.VERBOSE,info:Ce.INFO,warn:Ce.WARN,error:Ce.ERROR,silent:Ce.SILENT},SS=Ce.INFO,RS={[Ce.DEBUG]:"log",[Ce.VERBOSE]:"log",[Ce.INFO]:"info",[Ce.WARN]:"warn",[Ce.ERROR]:"error"},AS=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),o=RS[e];if(o)console[o](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Lc{constructor(e){this.name=e,this._logLevel=SS,this._logHandler=AS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Ce))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?IS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Ce.DEBUG,...e),this._logHandler(this,Ce.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Ce.VERBOSE,...e),this._logHandler(this,Ce.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Ce.INFO,...e),this._logHandler(this,Ce.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Ce.WARN,...e),this._logHandler(this,Ce.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Ce.ERROR,...e),this._logHandler(this,Ce.ERROR,...e)}}const CS=(n,e)=>e.some(t=>n instanceof t);let ty,ny;function PS(){return ty||(ty=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function kS(){return ny||(ny=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const dv=new WeakMap,Zf=new WeakMap,pv=new WeakMap,bf=new WeakMap,Ld=new WeakMap;function NS(n){const e=new Promise((t,i)=>{const o=()=>{n.removeEventListener("success",l),n.removeEventListener("error",h)},l=()=>{t(Si(n.result)),o()},h=()=>{i(n.error),o()};n.addEventListener("success",l),n.addEventListener("error",h)});return e.then(t=>{t instanceof IDBCursor&&dv.set(t,n)}).catch(()=>{}),Ld.set(e,n),e}function DS(n){if(Zf.has(n))return;const e=new Promise((t,i)=>{const o=()=>{n.removeEventListener("complete",l),n.removeEventListener("error",h),n.removeEventListener("abort",h)},l=()=>{t(),o()},h=()=>{i(n.error||new DOMException("AbortError","AbortError")),o()};n.addEventListener("complete",l),n.addEventListener("error",h),n.addEventListener("abort",h)});Zf.set(n,e)}let ed={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zf.get(n);if(e==="objectStoreNames")return n.objectStoreNames||pv.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Si(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function xS(n){ed=n(ed)}function VS(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Ff(this),e,...t);return pv.set(i,e.sort?e.sort():[e]),Si(i)}:kS().includes(n)?function(...e){return n.apply(Ff(this),e),Si(dv.get(this))}:function(...e){return Si(n.apply(Ff(this),e))}}function OS(n){return typeof n=="function"?VS(n):(n instanceof IDBTransaction&&DS(n),CS(n,PS())?new Proxy(n,ed):n)}function Si(n){if(n instanceof IDBRequest)return NS(n);if(bf.has(n))return bf.get(n);const e=OS(n);return e!==n&&(bf.set(n,e),Ld.set(e,n)),e}const Ff=n=>Ld.get(n);function mv(n,e,{blocked:t,upgrade:i,blocking:o,terminated:l}={}){const h=indexedDB.open(n,e),d=Si(h);return i&&h.addEventListener("upgradeneeded",g=>{i(Si(h.result),g.oldVersion,g.newVersion,Si(h.transaction),g)}),t&&h.addEventListener("blocked",g=>t(g.oldVersion,g.newVersion,g)),d.then(g=>{l&&g.addEventListener("close",()=>l()),o&&g.addEventListener("versionchange",y=>o(y.oldVersion,y.newVersion,y))}).catch(()=>{}),d}const LS=["get","getKey","getAll","getAllKeys","count"],MS=["put","add","delete","clear"],Uf=new Map;function ry(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Uf.get(e))return Uf.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,o=MS.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(o||LS.includes(t)))return;const l=async function(h,...d){const g=this.transaction(h,o?"readwrite":"readonly");let y=g.store;return i&&(y=y.index(d.shift())),(await Promise.all([y[t](...d),o&&g.done]))[0]};return Uf.set(e,l),l}xS(n=>({...n,get:(e,t,i)=>ry(e,t)||n.get(e,t,i),has:(e,t)=>!!ry(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(FS(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function FS(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const td="@firebase/app",iy="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr=new Lc("@firebase/app"),US="@firebase/app-compat",jS="@firebase/analytics-compat",zS="@firebase/analytics",BS="@firebase/app-check-compat",$S="@firebase/app-check",HS="@firebase/auth",qS="@firebase/auth-compat",WS="@firebase/database",KS="@firebase/data-connect",GS="@firebase/database-compat",QS="@firebase/functions",YS="@firebase/functions-compat",JS="@firebase/installations",XS="@firebase/installations-compat",ZS="@firebase/messaging",eR="@firebase/messaging-compat",tR="@firebase/performance",nR="@firebase/performance-compat",rR="@firebase/remote-config",iR="@firebase/remote-config-compat",sR="@firebase/storage",oR="@firebase/storage-compat",aR="@firebase/firestore",lR="@firebase/ai",uR="@firebase/firestore-compat",cR="firebase",hR="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd="[DEFAULT]",fR={[td]:"fire-core",[US]:"fire-core-compat",[zS]:"fire-analytics",[jS]:"fire-analytics-compat",[$S]:"fire-app-check",[BS]:"fire-app-check-compat",[HS]:"fire-auth",[qS]:"fire-auth-compat",[WS]:"fire-rtdb",[KS]:"fire-data-connect",[GS]:"fire-rtdb-compat",[QS]:"fire-fn",[YS]:"fire-fn-compat",[JS]:"fire-iid",[XS]:"fire-iid-compat",[ZS]:"fire-fcm",[eR]:"fire-fcm-compat",[tR]:"fire-perf",[nR]:"fire-perf-compat",[rR]:"fire-rc",[iR]:"fire-rc-compat",[sR]:"fire-gcs",[oR]:"fire-gcs-compat",[aR]:"fire-fst",[uR]:"fire-fst-compat",[lR]:"fire-vertex","fire-js":"fire-js",[cR]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=new Map,dR=new Map,rd=new Map;function sy(n,e){try{n.container.addComponent(e)}catch(t){Fr.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function fr(n){const e=n.name;if(rd.has(e))return Fr.debug(`There were multiple attempts to register component ${e}.`),!1;rd.set(e,n);for(const t of uc.values())sy(t,n);for(const t of dR.values())sy(t,n);return!0}function ws(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xn(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pR={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ri=new Es("app","Firebase",pR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mR{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ri.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo=hR;function gv(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:nd,automaticDataCollectionEnabled:!0,...e},o=i.name;if(typeof o!="string"||!o)throw Ri.create("bad-app-name",{appName:String(o)});if(t||(t=av()),!t)throw Ri.create("no-options");const l=uc.get(o);if(l){if(Ni(t,l.options)&&Ni(i,l.config))return l;throw Ri.create("duplicate-app",{appName:o})}const h=new TS(o);for(const g of rd.values())h.addComponent(g);const d=new mR(t,i,h);return uc.set(o,d),d}function Md(n=nd){const e=uc.get(n);if(!e&&n===nd&&av())return gv();if(!e)throw Ri.create("no-app",{appName:n});return e}function wn(n,e,t){let i=fR[n]??n;t&&(i+=`-${t}`);const o=i.match(/\s|\//),l=e.match(/\s|\//);if(o||l){const h=[`Unable to register library "${i}" with version "${e}":`];o&&h.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Fr.warn(h.join(" "));return}fr(new Fn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gR="firebase-heartbeat-database",yR=1,el="firebase-heartbeat-store";let jf=null;function yv(){return jf||(jf=mv(gR,yR,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(el)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ri.create("idb-open",{originalErrorMessage:n.message})})),jf}async function _R(n){try{const t=(await yv()).transaction(el),i=await t.objectStore(el).get(_v(n));return await t.done,i}catch(e){if(e instanceof zn)Fr.warn(e.message);else{const t=Ri.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Fr.warn(t.message)}}}async function oy(n,e){try{const i=(await yv()).transaction(el,"readwrite");await i.objectStore(el).put(e,_v(n)),await i.done}catch(t){if(t instanceof zn)Fr.warn(t.message);else{const i=Ri.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Fr.warn(i.message)}}}function _v(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=1024,ER=30;class wR{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new IR(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=ay();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(h=>h.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>ER){const h=SR(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Fr.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ay(),{heartbeatsToSend:i,unsentEntries:o}=TR(this._heartbeatsCache.heartbeats),l=lc(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(t){return Fr.warn(t),""}}}function ay(){return new Date().toISOString().substring(0,10)}function TR(n,e=vR){const t=[];let i=n.slice();for(const o of n){const l=t.find(h=>h.agent===o.agent);if(l){if(l.dates.push(o.date),ly(t)>e){l.dates.pop();break}}else if(t.push({agent:o.agent,dates:[o.date]}),ly(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class IR{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return cv()?hv().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _R(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return oy(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return oy(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ly(n){return lc(JSON.stringify({version:2,heartbeats:n})).length}function SR(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RR(n){fr(new Fn("platform-logger",e=>new bS(e),"PRIVATE")),fr(new Fn("heartbeat",e=>new wR(e),"PRIVATE")),wn(td,iy,n),wn(td,iy,"esm2020"),wn("fire-js","")}RR("");function vv(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const AR=vv,Ev=new Es("auth","Firebase",vv());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=new Lc("@firebase/auth");function CR(n,...e){cc.logLevel<=Ce.WARN&&cc.warn(`Auth (${Fo}): ${n}`,...e)}function Qu(n,...e){cc.logLevel<=Ce.ERROR&&cc.error(`Auth (${Fo}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(n,...e){throw bd(n,...e)}function ar(n,...e){return bd(n,...e)}function wv(n,e,t){const i={...AR(),[e]:t};return new Es("auth","Firebase",i).create(e,{appName:n.name})}function Ai(n){return wv(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function bd(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Ev.create(n,...e)}function me(n,e,...t){if(!n)throw bd(e,...t)}function Or(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Qu(e),new Error(e)}function Ur(n,e){n||Or(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function PR(){return uy()==="http:"||uy()==="https:"}function uy(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(PR()||uv()||"connection"in navigator)?navigator.onLine:!0}function NR(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ur(t>e,"Short delay should be less than long delay!"),this.isMobile=tS()||iS()}get(){return kR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(n,e){Ur(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Or("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Or("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Or("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],VR=new dl(3e4,6e4);function Ts(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function bi(n,e,t,i,o={}){return Iv(n,o,async()=>{let l={},h={};i&&(e==="GET"?h=i:l={body:JSON.stringify(i)});const d=hl({key:n.config.apiKey,...h}).slice(1),g=await n._getAdditionalHeaders();g["Content-Type"]="application/json",n.languageCode&&(g["X-Firebase-Locale"]=n.languageCode);const y={method:e,headers:g,...l};return rS()||(y.referrerPolicy="no-referrer"),n.emulatorConfig&&fl(n.emulatorConfig.host)&&(y.credentials="include"),Tv.fetch()(await Sv(n,n.config.apiHost,t,d),y)})}async function Iv(n,e,t){n._canInitEmulator=!1;const i={...DR,...e};try{const o=new LR(n),l=await Promise.race([t(),o.promise]);o.clearNetworkTimeout();const h=await l.json();if("needConfirmation"in h)throw Uu(n,"account-exists-with-different-credential",h);if(l.ok&&!("errorMessage"in h))return h;{const d=l.ok?h.errorMessage:h.error.message,[g,y]=d.split(" : ");if(g==="FEDERATED_USER_ID_ALREADY_LINKED")throw Uu(n,"credential-already-in-use",h);if(g==="EMAIL_EXISTS")throw Uu(n,"email-already-in-use",h);if(g==="USER_DISABLED")throw Uu(n,"user-disabled",h);const E=i[g]||g.toLowerCase().replace(/[_\s]+/g,"-");if(y)throw wv(n,E,y);Un(n,E)}}catch(o){if(o instanceof zn)throw o;Un(n,"network-request-failed",{message:String(o)})}}async function Mc(n,e,t,i,o={}){const l=await bi(n,e,t,i,o);return"mfaPendingCredential"in l&&Un(n,"multi-factor-auth-required",{_serverResponse:l}),l}async function Sv(n,e,t,i){const o=`${e}${t}?${i}`,l=n,h=l.config.emulator?Fd(n.config,o):`${n.config.apiScheme}://${o}`;return xR.includes(t)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(h).toString():h}function OR(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class LR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ar(this.auth,"network-request-failed")),VR.get())})}}function Uu(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const o=ar(n,e,i);return o.customData._tokenResponse=t,o}function cy(n){return n!==void 0&&n.enterprise!==void 0}class MR{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return OR(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function bR(n,e){return bi(n,"GET","/v2/recaptchaConfig",Ts(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FR(n,e){return bi(n,"POST","/v1/accounts:delete",e)}async function hc(n,e){return bi(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function UR(n,e=!1){const t=Dt(n),i=await t.getIdToken(e),o=Ud(i);me(o&&o.exp&&o.auth_time&&o.iat,t.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,h=l==null?void 0:l.sign_in_provider;return{claims:o,token:i,authTime:Ga(zf(o.auth_time)),issuedAtTime:Ga(zf(o.iat)),expirationTime:Ga(zf(o.exp)),signInProvider:h||null,signInSecondFactor:(l==null?void 0:l.sign_in_second_factor)||null}}function zf(n){return Number(n)*1e3}function Ud(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Qu("JWT malformed, contained fewer than 3 sections"),null;try{const o=sv(t);return o?JSON.parse(o):(Qu("Failed to decode base64 JWT payload"),null)}catch(o){return Qu("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function hy(n){const e=Ud(n);return me(e,"internal-error"),me(typeof e.exp<"u","internal-error"),me(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tl(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof zn&&jR(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function jR({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ga(this.lastLoginAt),this.creationTime=Ga(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fc(n){var w;const e=n.auth,t=await n.getIdToken(),i=await tl(n,hc(e,{idToken:t}));me(i==null?void 0:i.users.length,e,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const l=(w=o.providerUserInfo)!=null&&w.length?Rv(o.providerUserInfo):[],h=$R(n.providerData,l),d=n.isAnonymous,g=!(n.email&&o.passwordHash)&&!(h!=null&&h.length),y=d?g:!1,E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:h,metadata:new sd(o.createdAt,o.lastLoginAt),isAnonymous:y};Object.assign(n,E)}async function BR(n){const e=Dt(n);await fc(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $R(n,e){return[...n.filter(i=>!e.some(o=>o.providerId===i.providerId)),...e]}function Rv(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HR(n,e){const t=await Iv(n,{},async()=>{const i=hl({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=n.config,h=await Sv(n,o,"/v1/token",`key=${l}`),d=await n._getAdditionalHeaders();d["Content-Type"]="application/x-www-form-urlencoded";const g={method:"POST",headers:d,body:i};return n.emulatorConfig&&fl(n.emulatorConfig.host)&&(g.credentials="include"),Tv.fetch()(h,g)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function qR(n,e){return bi(n,"POST","/v2/accounts:revokeToken",Ts(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){me(e.idToken,"internal-error"),me(typeof e.idToken<"u","internal-error"),me(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){me(e.length!==0,"internal-error");const t=hy(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(me(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:o,expiresIn:l}=await HR(e,t);this.updateTokensAndExpiration(i,o,Number(l))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:o,expirationTime:l}=t,h=new wo;return i&&(me(typeof i=="string","internal-error",{appName:e}),h.refreshToken=i),o&&(me(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),l&&(me(typeof l=="number","internal-error",{appName:e}),h.expirationTime=l),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wo,this.toJSON())}_performRefresh(){return Or("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _i(n,e){me(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Vn{constructor({uid:e,auth:t,stsTokenManager:i,...o}){this.providerId="firebase",this.proactiveRefresh=new zR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new sd(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await tl(this,this.stsTokenManager.getToken(this.auth,e));return me(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return UR(this,e)}reload(){return BR(this)}_assign(e){this!==e&&(me(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Vn({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){me(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await fc(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xn(this.auth.app))return Promise.reject(Ai(this.auth));const e=await this.getIdToken();return await tl(this,FR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,o=t.email??void 0,l=t.phoneNumber??void 0,h=t.photoURL??void 0,d=t.tenantId??void 0,g=t._redirectEventId??void 0,y=t.createdAt??void 0,E=t.lastLoginAt??void 0,{uid:w,emailVerified:A,isAnonymous:b,providerData:H,stsTokenManager:$}=t;me(w&&$,e,"internal-error");const z=wo.fromJSON(this.name,$);me(typeof w=="string",e,"internal-error"),_i(i,e.name),_i(o,e.name),me(typeof A=="boolean",e,"internal-error"),me(typeof b=="boolean",e,"internal-error"),_i(l,e.name),_i(h,e.name),_i(d,e.name),_i(g,e.name),_i(y,e.name),_i(E,e.name);const Y=new Vn({uid:w,auth:e,email:o,emailVerified:A,displayName:i,isAnonymous:b,photoURL:h,phoneNumber:l,tenantId:d,stsTokenManager:z,createdAt:y,lastLoginAt:E});return H&&Array.isArray(H)&&(Y.providerData=H.map(te=>({...te}))),g&&(Y._redirectEventId=g),Y}static async _fromIdTokenResponse(e,t,i=!1){const o=new wo;o.updateFromServerResponse(t);const l=new Vn({uid:t.localId,auth:e,stsTokenManager:o,isAnonymous:i});return await fc(l),l}static async _fromGetAccountInfoResponse(e,t,i){const o=t.users[0];me(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?Rv(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(l!=null&&l.length),d=new wo;d.updateFromIdToken(i);const g=new Vn({uid:o.localId,auth:e,stsTokenManager:d,isAnonymous:h}),y={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new sd(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(l!=null&&l.length)};return Object.assign(g,y),g}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy=new Map;function Lr(n){Ur(n instanceof Function,"Expected a class definition");let e=fy.get(n);return e?(Ur(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,fy.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Av.type="NONE";const dy=Av;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(n,e,t){return`firebase:${n}:${e}:${t}`}class To{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:o,name:l}=this.auth;this.fullUserKey=Yu(this.userKey,o.apiKey,l),this.fullPersistenceKey=Yu("persistence",o.apiKey,l),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await hc(this.auth,{idToken:e}).catch(()=>{});return t?Vn._fromGetAccountInfoResponse(this.auth,t,e):null}return Vn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new To(Lr(dy),e,i);const o=(await Promise.all(t.map(async y=>{if(await y._isAvailable())return y}))).filter(y=>y);let l=o[0]||Lr(dy);const h=Yu(i,e.config.apiKey,e.name);let d=null;for(const y of t)try{const E=await y._get(h);if(E){let w;if(typeof E=="string"){const A=await hc(e,{idToken:E}).catch(()=>{});if(!A)break;w=await Vn._fromGetAccountInfoResponse(e,A,E)}else w=Vn._fromJSON(e,E);y!==l&&(d=w),l=y;break}}catch{}const g=o.filter(y=>y._shouldAllowMigration);return!l._shouldAllowMigration||!g.length?new To(l,e,i):(l=g[0],d&&await l._set(h,d.toJSON()),await Promise.all(t.map(async y=>{if(y!==l)try{await y._remove(h)}catch{}})),new To(l,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Nv(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Cv(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(xv(e))return"Blackberry";if(Vv(e))return"Webos";if(Pv(e))return"Safari";if((e.includes("chrome/")||kv(e))&&!e.includes("edge/"))return"Chrome";if(Dv(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Cv(n=Bt()){return/firefox\//i.test(n)}function Pv(n=Bt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function kv(n=Bt()){return/crios\//i.test(n)}function Nv(n=Bt()){return/iemobile/i.test(n)}function Dv(n=Bt()){return/android/i.test(n)}function xv(n=Bt()){return/blackberry/i.test(n)}function Vv(n=Bt()){return/webos/i.test(n)}function jd(n=Bt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function WR(n=Bt()){var e;return jd(n)&&!!((e=window.navigator)!=null&&e.standalone)}function KR(){return sS()&&document.documentMode===10}function Ov(n=Bt()){return jd(n)||Dv(n)||Vv(n)||xv(n)||/windows phone/i.test(n)||Nv(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lv(n,e=[]){let t;switch(n){case"Browser":t=py(Bt());break;case"Worker":t=`${py(Bt())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Fo}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=l=>new Promise((h,d)=>{try{const g=e(l);h(g)}catch(g){d(g)}});i.onAbort=t,this.queue.push(i);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const o of t)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QR(n,e={}){return bi(n,"GET","/v2/passwordPolicy",Ts(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YR=6;class JR{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??YR,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),o&&(t.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let o=0;o<e.length;o++)i=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XR{constructor(e,t,i,o){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new my(this),this.idTokenSubscription=new my(this),this.beforeStateQueue=new GR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ev,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lr(t)),this._initializationPromise=this.queue(async()=>{var i,o,l;if(!this._deleted&&(this.persistenceManager=await To.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((o=this._popupRedirectResolver)!=null&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((l=this.currentUser)==null?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await hc(this,{idToken:e}),i=await Vn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var l;if(xn(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(d=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(d,d))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(l=this.redirectUser)==null?void 0:l._redirectEventId,d=i==null?void 0:i._redirectEventId,g=await this.tryRedirectSignIn(e);(!h||h===d)&&(g!=null&&g.user)&&(i=g.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(h){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return me(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fc(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=NR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xn(this.app))return Promise.reject(Ai(this));const t=e?Dt(e):null;return t&&me(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&me(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xn(this.app)?Promise.reject(Ai(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xn(this.app)?Promise.reject(Ai(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await QR(this),t=new JR(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Es("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await qR(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Lr(e)||this._popupRedirectResolver;me(t,this,"argument-error"),this.redirectPersistenceManager=await To.create(this,[Lr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,o){if(this._deleted)return()=>{};const l=typeof t=="function"?t:t.next.bind(t);let h=!1;const d=this._isInitialized?Promise.resolve():this._initializationPromise;if(me(d,this,"internal-error"),d.then(()=>{h||l(this.currentUser)}),typeof t=="function"){const g=e.addObserver(t,i,o);return()=>{h=!0,g()}}else{const g=e.addObserver(t);return()=>{h=!0,g()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return me(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lv(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var o;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((o=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:o.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(xn(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&CR(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Uo(n){return Dt(n)}class my{constructor(e){this.auth=e,this.observer=null,this.addObserver=fS(t=>this.observer=t)}get next(){return me(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ZR(n){bc=n}function Mv(n){return bc.loadJS(n)}function eA(){return bc.recaptchaEnterpriseScript}function tA(){return bc.gapiScript}function nA(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class rA{constructor(){this.enterprise=new iA}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class iA{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const sA="recaptcha-enterprise",bv="NO_RECAPTCHA";class oA{constructor(e){this.type=sA,this.auth=Uo(e)}async verify(e="verify",t=!1){async function i(l){if(!t){if(l.tenantId==null&&l._agentRecaptchaConfig!=null)return l._agentRecaptchaConfig.siteKey;if(l.tenantId!=null&&l._tenantRecaptchaConfigs[l.tenantId]!==void 0)return l._tenantRecaptchaConfigs[l.tenantId].siteKey}return new Promise(async(h,d)=>{bR(l,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(g=>{if(g.recaptchaKey===void 0)d(new Error("recaptcha Enterprise site key undefined"));else{const y=new MR(g);return l.tenantId==null?l._agentRecaptchaConfig=y:l._tenantRecaptchaConfigs[l.tenantId]=y,h(y.siteKey)}}).catch(g=>{d(g)})})}function o(l,h,d){const g=window.grecaptcha;cy(g)?g.enterprise.ready(()=>{g.enterprise.execute(l,{action:e}).then(y=>{h(y)}).catch(()=>{h(bv)})}):d(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new rA().execute("siteKey",{action:"verify"}):new Promise((l,h)=>{i(this.auth).then(d=>{if(!t&&cy(window.grecaptcha))o(d,l,h);else{if(typeof window>"u"){h(new Error("RecaptchaVerifier is only supported in browser"));return}let g=eA();g.length!==0&&(g+=d),Mv(g).then(()=>{o(d,l,h)}).catch(y=>{h(y)})}}).catch(d=>{h(d)})})}}async function gy(n,e,t,i=!1,o=!1){const l=new oA(n);let h;if(o)h=bv;else try{h=await l.verify(t)}catch{h=await l.verify(t,!0)}const d={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in d){const g=d.phoneEnrollmentInfo.phoneNumber,y=d.phoneEnrollmentInfo.recaptchaToken;Object.assign(d,{phoneEnrollmentInfo:{phoneNumber:g,recaptchaToken:y,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in d){const g=d.phoneSignInInfo.recaptchaToken;Object.assign(d,{phoneSignInInfo:{recaptchaToken:g,captchaResponse:h,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return d}return i?Object.assign(d,{captchaResp:h}):Object.assign(d,{captchaResponse:h}),Object.assign(d,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(d,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),d}async function yy(n,e,t,i,o){var l;if((l=n._getRecaptchaConfig())!=null&&l.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await gy(n,e,t,t==="getOobCode");return i(n,h)}else return i(n,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const d=await gy(n,e,t,t==="getOobCode");return i(n,d)}else return Promise.reject(h)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aA(n,e){const t=ws(n,"auth");if(t.isInitialized()){const o=t.getImmediate(),l=t.getOptions();if(Ni(l,e??{}))return o;Un(o,"already-initialized")}return t.initialize({options:e})}function lA(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Lr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function uA(n,e,t){const i=Uo(n);me(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const o=!1,l=Fv(e),{host:h,port:d}=cA(e),g=d===null?"":`:${d}`,y={url:`${l}//${h}${g}/`},E=Object.freeze({host:h,port:d,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!i._canInitEmulator){me(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),me(Ni(y,i.config.emulator)&&Ni(E,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=y,i.emulatorConfig=E,i.settings.appVerificationDisabledForTesting=!0,fl(h)?fv(`${l}//${h}${g}`):hA()}function Fv(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function cA(n){const e=Fv(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(i);if(o){const l=o[1];return{host:l,port:_y(i.substr(l.length+1))}}else{const[l,h]=i.split(":");return{host:l,port:_y(h)}}}function _y(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function hA(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Or("not implemented")}_getIdTokenResponse(e){return Or("not implemented")}_linkToIdToken(e,t){return Or("not implemented")}_getReauthenticationResolver(e){return Or("not implemented")}}async function fA(n,e){return bi(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dA(n,e){return Mc(n,"POST","/v1/accounts:signInWithPassword",Ts(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pA(n,e){return Mc(n,"POST","/v1/accounts:signInWithEmailLink",Ts(n,e))}async function mA(n,e){return Mc(n,"POST","/v1/accounts:signInWithEmailLink",Ts(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl extends zd{constructor(e,t,i,o=null){super("password",i),this._email=e,this._password=t,this._tenantId=o}static _fromEmailAndPassword(e,t){return new nl(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new nl(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yy(e,t,"signInWithPassword",dA);case"emailLink":return pA(e,{email:this._email,oobCode:this._password});default:Un(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return yy(e,i,"signUpPassword",fA);case"emailLink":return mA(e,{idToken:t,email:this._email,oobCode:this._password});default:Un(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Io(n,e){return Mc(n,"POST","/v1/accounts:signInWithIdp",Ts(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gA="http://localhost";class ps extends zd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ps(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Un("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:o,...l}=t;if(!i||!o)return null;const h=new ps(i,o);return h.idToken=l.idToken||void 0,h.accessToken=l.accessToken||void 0,h.secret=l.secret,h.nonce=l.nonce,h.pendingToken=l.pendingToken||null,h}_getIdTokenResponse(e){const t=this.buildRequest();return Io(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Io(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Io(e,t)}buildRequest(){const e={requestUri:gA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=hl(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yA(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _A(n){const e=$a(Ha(n)).link,t=e?$a(Ha(e)).deep_link_id:null,i=$a(Ha(n)).deep_link_id;return(i?$a(Ha(i)).link:null)||i||t||e||n}class Bd{constructor(e){const t=$a(Ha(e)),i=t.apiKey??null,o=t.oobCode??null,l=yA(t.mode??null);me(i&&o&&l,"argument-error"),this.apiKey=i,this.operation=l,this.code=o,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=_A(e);try{return new Bd(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(){this.providerId=jo.PROVIDER_ID}static credential(e,t){return nl._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Bd.parseLink(t);return me(i,"argument-error"),nl._fromEmailAndCode(e,i.code,i.tenantId)}}jo.PROVIDER_ID="password";jo.EMAIL_PASSWORD_SIGN_IN_METHOD="password";jo.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uv{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl extends Uv{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends pl{constructor(){super("facebook.com")}static credential(e){return ps._fromParams({providerId:vi.PROVIDER_ID,signInMethod:vi.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vi.credentialFromTaggedObject(e)}static credentialFromError(e){return vi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vi.credential(e.oauthAccessToken)}catch{return null}}}vi.FACEBOOK_SIGN_IN_METHOD="facebook.com";vi.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei extends pl{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ps._fromParams({providerId:Ei.PROVIDER_ID,signInMethod:Ei.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ei.credentialFromTaggedObject(e)}static credentialFromError(e){return Ei.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ei.credential(t,i)}catch{return null}}}Ei.GOOGLE_SIGN_IN_METHOD="google.com";Ei.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi extends pl{constructor(){super("github.com")}static credential(e){return ps._fromParams({providerId:wi.PROVIDER_ID,signInMethod:wi.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return wi.credentialFromTaggedObject(e)}static credentialFromError(e){return wi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return wi.credential(e.oauthAccessToken)}catch{return null}}}wi.GITHUB_SIGN_IN_METHOD="github.com";wi.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends pl{constructor(){super("twitter.com")}static credential(e,t){return ps._fromParams({providerId:Ti.PROVIDER_ID,signInMethod:Ti.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ti.credentialFromTaggedObject(e)}static credentialFromError(e){return Ti.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Ti.credential(t,i)}catch{return null}}}Ti.TWITTER_SIGN_IN_METHOD="twitter.com";Ti.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,o=!1){const l=await Vn._fromIdTokenResponse(e,i,o),h=vy(i);return new ko({user:l,providerId:h,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const o=vy(i);return new ko({user:e,providerId:o,_tokenResponse:i,operationType:t})}}function vy(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc extends zn{constructor(e,t,i,o){super(t.code,t.message),this.operationType=i,this.user=o,Object.setPrototypeOf(this,dc.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,o){return new dc(e,t,i,o)}}function jv(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?dc._fromErrorAndOperation(n,l,e,i):l})}async function vA(n,e,t=!1){const i=await tl(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ko._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EA(n,e,t=!1){const{auth:i}=n;if(xn(i.app))return Promise.reject(Ai(i));const o="reauthenticate";try{const l=await tl(n,jv(i,o,e,n),t);me(l.idToken,i,"internal-error");const h=Ud(l.idToken);me(h,i,"internal-error");const{sub:d}=h;return me(n.uid===d,i,"user-mismatch"),ko._forOperation(n,o,l)}catch(l){throw(l==null?void 0:l.code)==="auth/user-not-found"&&Un(i,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zv(n,e,t=!1){if(xn(n.app))return Promise.reject(Ai(n));const i="signIn",o=await jv(n,i,e),l=await ko._fromIdTokenResponse(n,i,o);return t||await n._updateCurrentUser(l.user),l}async function wA(n,e){return zv(Uo(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TA(n){const e=Uo(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function IA(n,e,t){return xn(n.app)?Promise.reject(Ai(n)):wA(Dt(n),jo.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&TA(n),i})}function SA(n,e,t,i){return Dt(n).onIdTokenChanged(e,t,i)}function RA(n,e,t){return Dt(n).beforeAuthStateChanged(e,t)}function AA(n,e,t,i){return Dt(n).onAuthStateChanged(e,t,i)}const pc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(pc,"1"),this.storage.removeItem(pc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CA=1e3,PA=10;class $v extends Bv{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ov(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),o=this.localCache[t];i!==o&&e(t,o,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((h,d,g)=>{this.notifyListeners(h,g)});return}const i=e.key;t?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(i);!t&&this.localCache[i]===h||this.notifyListeners(i,h)},l=this.storage.getItem(i);KR()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,PA):o()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},CA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}$v.type="LOCAL";const kA=$v;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv extends Bv{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hv.type="SESSION";const qv=Hv;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NA(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(o=>o.isListeningto(e));if(t)return t;const i=new Fc(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:o,data:l}=t.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:o});const d=Array.from(h).map(async y=>y(t.origin,l)),g=await NA(d);t.ports[0].postMessage({status:"done",eventId:i,eventType:o,response:g})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $d(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,h;return new Promise((d,g)=>{const y=$d("",20);o.port1.start();const E=setTimeout(()=>{g(new Error("unsupported_event"))},i);h={messageChannel:o,onMessage(w){const A=w;if(A.data.eventId===y)switch(A.data.status){case"ack":clearTimeout(E),l=setTimeout(()=>{g(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),d(A.data.response);break;default:clearTimeout(E),clearTimeout(l),g(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:y,data:t},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(){return window}function xA(n){lr().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wv(){return typeof lr().WorkerGlobalScope<"u"&&typeof lr().importScripts=="function"}async function VA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function OA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function LA(){return Wv()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kv="firebaseLocalStorageDb",MA=1,mc="firebaseLocalStorage",Gv="fbase_key";class ml{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Uc(n,e){return n.transaction([mc],e?"readwrite":"readonly").objectStore(mc)}function bA(){const n=indexedDB.deleteDatabase(Kv);return new ml(n).toPromise()}function od(){const n=indexedDB.open(Kv,MA);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(mc,{keyPath:Gv})}catch(o){t(o)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(mc)?e(i):(i.close(),await bA(),e(await od()))})})}async function Ey(n,e,t){const i=Uc(n,!0).put({[Gv]:e,value:t});return new ml(i).toPromise()}async function FA(n,e){const t=Uc(n,!1).get(e),i=await new ml(t).toPromise();return i===void 0?null:i.value}function wy(n,e){const t=Uc(n,!0).delete(e);return new ml(t).toPromise()}const UA=800,jA=3;class Qv{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await od(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>jA)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Wv()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fc._getInstance(LA()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await VA(),!this.activeServiceWorker)return;this.sender=new DA(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||OA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await od();return await Ey(e,pc,"1"),await wy(e,pc),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ey(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>FA(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wy(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=Uc(o,!1).getAll();return new ml(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)i.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),t.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!i.has(o)&&(this.notifyListeners(o,null),t.push(o));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const o of Array.from(i))o(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),UA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Qv.type="LOCAL";const zA=Qv;new dl(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BA(n,e){return e?Lr(e):(me(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd extends zd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Io(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Io(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Io(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function $A(n){return zv(n.auth,new Hd(n),n.bypassAuthState)}function HA(n){const{auth:e,user:t}=n;return me(t,e,"internal-error"),EA(t,new Hd(n),n.bypassAuthState)}async function qA(n){const{auth:e,user:t}=n;return me(t,e,"internal-error"),vA(t,new Hd(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yv{constructor(e,t,i,o,l=!1){this.auth=e,this.resolver=i,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:o,tenantId:l,error:h,type:d}=e;if(h){this.reject(h);return}const g={auth:this.auth,requestUri:t,sessionId:i,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(d)(g))}catch(y){this.reject(y)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return $A;case"linkViaPopup":case"linkViaRedirect":return qA;case"reauthViaPopup":case"reauthViaRedirect":return HA;default:Un(this.auth,"internal-error")}}resolve(e){Ur(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ur(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA=new dl(2e3,1e4);class Eo extends Yv{constructor(e,t,i,o,l){super(e,t,o,l),this.provider=i,this.authWindow=null,this.pollId=null,Eo.currentPopupAction&&Eo.currentPopupAction.cancel(),Eo.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return me(e,this.auth,"internal-error"),e}async onExecution(){Ur(this.filter.length===1,"Popup operations only handle one event");const e=$d();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ar(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ar(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Eo.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ar(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,WA.get())};e()}}Eo.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA="pendingRedirect",Ju=new Map;class GA extends Yv{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Ju.get(this.auth._key());if(!e){try{const i=await QA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Ju.set(this.auth._key(),e)}return this.bypassAuthState||Ju.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function QA(n,e){const t=XA(e),i=JA(n);if(!await i._isAvailable())return!1;const o=await i._get(t)==="true";return await i._remove(t),o}function YA(n,e){Ju.set(n._key(),e)}function JA(n){return Lr(n._redirectPersistence)}function XA(n){return Yu(KA,n.config.apiKey,n.name)}async function ZA(n,e,t=!1){if(xn(n.app))return Promise.reject(Ai(n));const i=Uo(n),o=BA(i,e),h=await new GA(i,o,t).execute();return h&&!t&&(delete h.user._redirectEventId,await i._persistUserIfCurrent(h.user),await i._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eC=600*1e3;class tC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nC(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Jv(e)){const o=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(ar(this.auth,o))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=eC&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ty(e))}saveEventToCache(e){this.cachedEventUids.add(Ty(e)),this.lastProcessedEventTime=Date.now()}}function Ty(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Jv({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nC(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Jv(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rC(n,e={}){return bi(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sC=/^https?/;async function oC(n){if(n.config.emulator)return;const{authorizedDomains:e}=await rC(n);for(const t of e)try{if(aC(t))return}catch{}Un(n,"unauthorized-domain")}function aC(n){const e=id(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const h=new URL(n);return h.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&h.hostname===i}if(!sC.test(t))return!1;if(iC.test(n))return i===n;const o=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lC=new dl(3e4,6e4);function Iy(){const n=lr().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function uC(n){return new Promise((e,t)=>{var o,l,h;function i(){Iy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Iy(),t(ar(n,"network-request-failed"))},timeout:lC.get()})}if((l=(o=lr().gapi)==null?void 0:o.iframes)!=null&&l.Iframe)e(gapi.iframes.getContext());else if((h=lr().gapi)!=null&&h.load)i();else{const d=nA("iframefcb");return lr()[d]=()=>{gapi.load?i():t(ar(n,"network-request-failed"))},Mv(`${tA()}?onload=${d}`).catch(g=>t(g))}}).catch(e=>{throw Xu=null,e})}let Xu=null;function cC(n){return Xu=Xu||uC(n),Xu}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hC=new dl(5e3,15e3),fC="__/auth/iframe",dC="emulator/auth/iframe",pC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gC(n){const e=n.config;me(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Fd(e,dC):`https://${n.config.authDomain}/${fC}`,i={apiKey:e.apiKey,appName:n.name,v:Fo},o=mC.get(n.config.apiHost);o&&(i.eid=o);const l=n._getFrameworks();return l.length&&(i.fw=l.join(",")),`${t}?${hl(i).slice(1)}`}async function yC(n){const e=await cC(n),t=lr().gapi;return me(t,n,"internal-error"),e.open({where:document.body,url:gC(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pC,dontclear:!0},i=>new Promise(async(o,l)=>{await i.restyle({setHideOnLeave:!1});const h=ar(n,"network-request-failed"),d=lr().setTimeout(()=>{l(h)},hC.get());function g(){lr().clearTimeout(d),o(i)}i.ping(g).then(g,()=>{l(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _C={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vC=500,EC=600,wC="_blank",TC="http://localhost";class Sy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function IC(n,e,t,i=vC,o=EC){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-i)/2,0).toString();let d="";const g={..._C,width:i.toString(),height:o.toString(),top:l,left:h},y=Bt().toLowerCase();t&&(d=kv(y)?wC:t),Cv(y)&&(e=e||TC,g.scrollbars="yes");const E=Object.entries(g).reduce((A,[b,H])=>`${A}${b}=${H},`,"");if(WR(y)&&d!=="_self")return SC(e||"",d),new Sy(null);const w=window.open(e||"",d,E);me(w,n,"popup-blocked");try{w.focus()}catch{}return new Sy(w)}function SC(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RC="__/auth/handler",AC="emulator/auth/handler",CC=encodeURIComponent("fac");async function Ry(n,e,t,i,o,l){me(n.config.authDomain,n,"auth-domain-config-required"),me(n.config.apiKey,n,"invalid-api-key");const h={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Fo,eventId:o};if(e instanceof Uv){e.setDefaultLanguage(n.languageCode),h.providerId=e.providerId||"",hS(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[E,w]of Object.entries({}))h[E]=w}if(e instanceof pl){const E=e.getScopes().filter(w=>w!=="");E.length>0&&(h.scopes=E.join(","))}n.tenantId&&(h.tid=n.tenantId);const d=h;for(const E of Object.keys(d))d[E]===void 0&&delete d[E];const g=await n._getAppCheckToken(),y=g?`#${CC}=${encodeURIComponent(g)}`:"";return`${PC(n)}?${hl(d).slice(1)}${y}`}function PC({config:n}){return n.emulator?Fd(n,AC):`https://${n.authDomain}/${RC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf="webStorageSupport";class kC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qv,this._completeRedirectFn=ZA,this._overrideRedirectResult=YA}async _openPopup(e,t,i,o){var h;Ur((h=this.eventManagers[e._key()])==null?void 0:h.manager,"_initialize() not called before _openPopup()");const l=await Ry(e,t,i,id(),o);return IC(e,l,$d())}async _openRedirect(e,t,i,o){await this._originValidation(e);const l=await Ry(e,t,i,id(),o);return xA(l),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:o,promise:l}=this.eventManagers[t];return o?Promise.resolve(o):(Ur(l,"If manager is not set, promise should be"),l)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await yC(e),i=new tC(e);return t.register("authEvent",o=>(me(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:i.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Bf,{type:Bf},o=>{var h;const l=(h=o==null?void 0:o[0])==null?void 0:h[Bf];l!==void 0&&t(!!l),Un(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=oC(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ov()||Pv()||jd()}}const NC=kC;var Ay="@firebase/auth",Cy="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){me(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xC(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function VC(n){fr(new Fn("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:h,authDomain:d}=i.options;me(h&&!h.includes(":"),"invalid-api-key",{appName:i.name});const g={apiKey:h,authDomain:d,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lv(n)},y=new XR(i,o,l,g);return lA(y,t),y},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),fr(new Fn("auth-internal",e=>{const t=Uo(e.getProvider("auth").getImmediate());return(i=>new DC(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),wn(Ay,Cy,xC(n)),wn(Ay,Cy,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OC=300,LC=lv("authIdTokenMaxAge")||OC;let Py=null;const MC=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>LC)return;const o=t==null?void 0:t.token;Py!==o&&(Py=o,await fetch(n,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function bC(n=Md()){const e=ws(n,"auth");if(e.isInitialized())return e.getImmediate();const t=aA(n,{popupRedirectResolver:NC,persistence:[zA,kA,qv]}),i=lv("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(i,location.origin);if(location.origin===l.origin){const h=MC(l.toString());RA(t,h,()=>h(t.currentUser)),SA(t,d=>h(d))}}const o=ov("auth");return o&&uA(t,`http://${o}`),t}function FC(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}ZR({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=o=>{const l=ar("internal-error");l.customData=o,t(l)},i.type="text/javascript",i.charset="UTF-8",FC().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});VC("Browser");var UC="firebase",jC="12.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */wn(UC,jC,"app");var ky=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ci,Xv;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(N,S){function C(){}C.prototype=S.prototype,N.F=S.prototype,N.prototype=new C,N.prototype.constructor=N,N.D=function(V,D,O){for(var R=Array(arguments.length-2),ze=2;ze<arguments.length;ze++)R[ze-2]=arguments[ze];return S.prototype[D].apply(V,R)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(N,S,C){C||(C=0);const V=Array(16);if(typeof S=="string")for(var D=0;D<16;++D)V[D]=S.charCodeAt(C++)|S.charCodeAt(C++)<<8|S.charCodeAt(C++)<<16|S.charCodeAt(C++)<<24;else for(D=0;D<16;++D)V[D]=S[C++]|S[C++]<<8|S[C++]<<16|S[C++]<<24;S=N.g[0],C=N.g[1],D=N.g[2];let O=N.g[3],R;R=S+(O^C&(D^O))+V[0]+3614090360&4294967295,S=C+(R<<7&4294967295|R>>>25),R=O+(D^S&(C^D))+V[1]+3905402710&4294967295,O=S+(R<<12&4294967295|R>>>20),R=D+(C^O&(S^C))+V[2]+606105819&4294967295,D=O+(R<<17&4294967295|R>>>15),R=C+(S^D&(O^S))+V[3]+3250441966&4294967295,C=D+(R<<22&4294967295|R>>>10),R=S+(O^C&(D^O))+V[4]+4118548399&4294967295,S=C+(R<<7&4294967295|R>>>25),R=O+(D^S&(C^D))+V[5]+1200080426&4294967295,O=S+(R<<12&4294967295|R>>>20),R=D+(C^O&(S^C))+V[6]+2821735955&4294967295,D=O+(R<<17&4294967295|R>>>15),R=C+(S^D&(O^S))+V[7]+4249261313&4294967295,C=D+(R<<22&4294967295|R>>>10),R=S+(O^C&(D^O))+V[8]+1770035416&4294967295,S=C+(R<<7&4294967295|R>>>25),R=O+(D^S&(C^D))+V[9]+2336552879&4294967295,O=S+(R<<12&4294967295|R>>>20),R=D+(C^O&(S^C))+V[10]+4294925233&4294967295,D=O+(R<<17&4294967295|R>>>15),R=C+(S^D&(O^S))+V[11]+2304563134&4294967295,C=D+(R<<22&4294967295|R>>>10),R=S+(O^C&(D^O))+V[12]+1804603682&4294967295,S=C+(R<<7&4294967295|R>>>25),R=O+(D^S&(C^D))+V[13]+4254626195&4294967295,O=S+(R<<12&4294967295|R>>>20),R=D+(C^O&(S^C))+V[14]+2792965006&4294967295,D=O+(R<<17&4294967295|R>>>15),R=C+(S^D&(O^S))+V[15]+1236535329&4294967295,C=D+(R<<22&4294967295|R>>>10),R=S+(D^O&(C^D))+V[1]+4129170786&4294967295,S=C+(R<<5&4294967295|R>>>27),R=O+(C^D&(S^C))+V[6]+3225465664&4294967295,O=S+(R<<9&4294967295|R>>>23),R=D+(S^C&(O^S))+V[11]+643717713&4294967295,D=O+(R<<14&4294967295|R>>>18),R=C+(O^S&(D^O))+V[0]+3921069994&4294967295,C=D+(R<<20&4294967295|R>>>12),R=S+(D^O&(C^D))+V[5]+3593408605&4294967295,S=C+(R<<5&4294967295|R>>>27),R=O+(C^D&(S^C))+V[10]+38016083&4294967295,O=S+(R<<9&4294967295|R>>>23),R=D+(S^C&(O^S))+V[15]+3634488961&4294967295,D=O+(R<<14&4294967295|R>>>18),R=C+(O^S&(D^O))+V[4]+3889429448&4294967295,C=D+(R<<20&4294967295|R>>>12),R=S+(D^O&(C^D))+V[9]+568446438&4294967295,S=C+(R<<5&4294967295|R>>>27),R=O+(C^D&(S^C))+V[14]+3275163606&4294967295,O=S+(R<<9&4294967295|R>>>23),R=D+(S^C&(O^S))+V[3]+4107603335&4294967295,D=O+(R<<14&4294967295|R>>>18),R=C+(O^S&(D^O))+V[8]+1163531501&4294967295,C=D+(R<<20&4294967295|R>>>12),R=S+(D^O&(C^D))+V[13]+2850285829&4294967295,S=C+(R<<5&4294967295|R>>>27),R=O+(C^D&(S^C))+V[2]+4243563512&4294967295,O=S+(R<<9&4294967295|R>>>23),R=D+(S^C&(O^S))+V[7]+1735328473&4294967295,D=O+(R<<14&4294967295|R>>>18),R=C+(O^S&(D^O))+V[12]+2368359562&4294967295,C=D+(R<<20&4294967295|R>>>12),R=S+(C^D^O)+V[5]+4294588738&4294967295,S=C+(R<<4&4294967295|R>>>28),R=O+(S^C^D)+V[8]+2272392833&4294967295,O=S+(R<<11&4294967295|R>>>21),R=D+(O^S^C)+V[11]+1839030562&4294967295,D=O+(R<<16&4294967295|R>>>16),R=C+(D^O^S)+V[14]+4259657740&4294967295,C=D+(R<<23&4294967295|R>>>9),R=S+(C^D^O)+V[1]+2763975236&4294967295,S=C+(R<<4&4294967295|R>>>28),R=O+(S^C^D)+V[4]+1272893353&4294967295,O=S+(R<<11&4294967295|R>>>21),R=D+(O^S^C)+V[7]+4139469664&4294967295,D=O+(R<<16&4294967295|R>>>16),R=C+(D^O^S)+V[10]+3200236656&4294967295,C=D+(R<<23&4294967295|R>>>9),R=S+(C^D^O)+V[13]+681279174&4294967295,S=C+(R<<4&4294967295|R>>>28),R=O+(S^C^D)+V[0]+3936430074&4294967295,O=S+(R<<11&4294967295|R>>>21),R=D+(O^S^C)+V[3]+3572445317&4294967295,D=O+(R<<16&4294967295|R>>>16),R=C+(D^O^S)+V[6]+76029189&4294967295,C=D+(R<<23&4294967295|R>>>9),R=S+(C^D^O)+V[9]+3654602809&4294967295,S=C+(R<<4&4294967295|R>>>28),R=O+(S^C^D)+V[12]+3873151461&4294967295,O=S+(R<<11&4294967295|R>>>21),R=D+(O^S^C)+V[15]+530742520&4294967295,D=O+(R<<16&4294967295|R>>>16),R=C+(D^O^S)+V[2]+3299628645&4294967295,C=D+(R<<23&4294967295|R>>>9),R=S+(D^(C|~O))+V[0]+4096336452&4294967295,S=C+(R<<6&4294967295|R>>>26),R=O+(C^(S|~D))+V[7]+1126891415&4294967295,O=S+(R<<10&4294967295|R>>>22),R=D+(S^(O|~C))+V[14]+2878612391&4294967295,D=O+(R<<15&4294967295|R>>>17),R=C+(O^(D|~S))+V[5]+4237533241&4294967295,C=D+(R<<21&4294967295|R>>>11),R=S+(D^(C|~O))+V[12]+1700485571&4294967295,S=C+(R<<6&4294967295|R>>>26),R=O+(C^(S|~D))+V[3]+2399980690&4294967295,O=S+(R<<10&4294967295|R>>>22),R=D+(S^(O|~C))+V[10]+4293915773&4294967295,D=O+(R<<15&4294967295|R>>>17),R=C+(O^(D|~S))+V[1]+2240044497&4294967295,C=D+(R<<21&4294967295|R>>>11),R=S+(D^(C|~O))+V[8]+1873313359&4294967295,S=C+(R<<6&4294967295|R>>>26),R=O+(C^(S|~D))+V[15]+4264355552&4294967295,O=S+(R<<10&4294967295|R>>>22),R=D+(S^(O|~C))+V[6]+2734768916&4294967295,D=O+(R<<15&4294967295|R>>>17),R=C+(O^(D|~S))+V[13]+1309151649&4294967295,C=D+(R<<21&4294967295|R>>>11),R=S+(D^(C|~O))+V[4]+4149444226&4294967295,S=C+(R<<6&4294967295|R>>>26),R=O+(C^(S|~D))+V[11]+3174756917&4294967295,O=S+(R<<10&4294967295|R>>>22),R=D+(S^(O|~C))+V[2]+718787259&4294967295,D=O+(R<<15&4294967295|R>>>17),R=C+(O^(D|~S))+V[9]+3951481745&4294967295,N.g[0]=N.g[0]+S&4294967295,N.g[1]=N.g[1]+(D+(R<<21&4294967295|R>>>11))&4294967295,N.g[2]=N.g[2]+D&4294967295,N.g[3]=N.g[3]+O&4294967295}i.prototype.v=function(N,S){S===void 0&&(S=N.length);const C=S-this.blockSize,V=this.C;let D=this.h,O=0;for(;O<S;){if(D==0)for(;O<=C;)o(this,N,O),O+=this.blockSize;if(typeof N=="string"){for(;O<S;)if(V[D++]=N.charCodeAt(O++),D==this.blockSize){o(this,V),D=0;break}}else for(;O<S;)if(V[D++]=N[O++],D==this.blockSize){o(this,V),D=0;break}}this.h=D,this.o+=S},i.prototype.A=function(){var N=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);N[0]=128;for(var S=1;S<N.length-8;++S)N[S]=0;S=this.o*8;for(var C=N.length-8;C<N.length;++C)N[C]=S&255,S/=256;for(this.v(N),N=Array(16),S=0,C=0;C<4;++C)for(let V=0;V<32;V+=8)N[S++]=this.g[C]>>>V&255;return N};function l(N,S){var C=d;return Object.prototype.hasOwnProperty.call(C,N)?C[N]:C[N]=S(N)}function h(N,S){this.h=S;const C=[];let V=!0;for(let D=N.length-1;D>=0;D--){const O=N[D]|0;V&&O==S||(C[D]=O,V=!1)}this.g=C}var d={};function g(N){return-128<=N&&N<128?l(N,function(S){return new h([S|0],S<0?-1:0)}):new h([N|0],N<0?-1:0)}function y(N){if(isNaN(N)||!isFinite(N))return w;if(N<0)return z(y(-N));const S=[];let C=1;for(let V=0;N>=C;V++)S[V]=N/C|0,C*=4294967296;return new h(S,0)}function E(N,S){if(N.length==0)throw Error("number format error: empty string");if(S=S||10,S<2||36<S)throw Error("radix out of range: "+S);if(N.charAt(0)=="-")return z(E(N.substring(1),S));if(N.indexOf("-")>=0)throw Error('number format error: interior "-" character');const C=y(Math.pow(S,8));let V=w;for(let O=0;O<N.length;O+=8){var D=Math.min(8,N.length-O);const R=parseInt(N.substring(O,O+D),S);D<8?(D=y(Math.pow(S,D)),V=V.j(D).add(y(R))):(V=V.j(C),V=V.add(y(R)))}return V}var w=g(0),A=g(1),b=g(16777216);n=h.prototype,n.m=function(){if($(this))return-z(this).m();let N=0,S=1;for(let C=0;C<this.g.length;C++){const V=this.i(C);N+=(V>=0?V:4294967296+V)*S,S*=4294967296}return N},n.toString=function(N){if(N=N||10,N<2||36<N)throw Error("radix out of range: "+N);if(H(this))return"0";if($(this))return"-"+z(this).toString(N);const S=y(Math.pow(N,6));var C=this;let V="";for(;;){const D=ve(C,S).g;C=Y(C,D.j(S));let O=((C.g.length>0?C.g[0]:C.h)>>>0).toString(N);if(C=D,H(C))return O+V;for(;O.length<6;)O="0"+O;V=O+V}},n.i=function(N){return N<0?0:N<this.g.length?this.g[N]:this.h};function H(N){if(N.h!=0)return!1;for(let S=0;S<N.g.length;S++)if(N.g[S]!=0)return!1;return!0}function $(N){return N.h==-1}n.l=function(N){return N=Y(this,N),$(N)?-1:H(N)?0:1};function z(N){const S=N.g.length,C=[];for(let V=0;V<S;V++)C[V]=~N.g[V];return new h(C,~N.h).add(A)}n.abs=function(){return $(this)?z(this):this},n.add=function(N){const S=Math.max(this.g.length,N.g.length),C=[];let V=0;for(let D=0;D<=S;D++){let O=V+(this.i(D)&65535)+(N.i(D)&65535),R=(O>>>16)+(this.i(D)>>>16)+(N.i(D)>>>16);V=R>>>16,O&=65535,R&=65535,C[D]=R<<16|O}return new h(C,C[C.length-1]&-2147483648?-1:0)};function Y(N,S){return N.add(z(S))}n.j=function(N){if(H(this)||H(N))return w;if($(this))return $(N)?z(this).j(z(N)):z(z(this).j(N));if($(N))return z(this.j(z(N)));if(this.l(b)<0&&N.l(b)<0)return y(this.m()*N.m());const S=this.g.length+N.g.length,C=[];for(var V=0;V<2*S;V++)C[V]=0;for(V=0;V<this.g.length;V++)for(let D=0;D<N.g.length;D++){const O=this.i(V)>>>16,R=this.i(V)&65535,ze=N.i(D)>>>16,$e=N.i(D)&65535;C[2*V+2*D]+=R*$e,te(C,2*V+2*D),C[2*V+2*D+1]+=O*$e,te(C,2*V+2*D+1),C[2*V+2*D+1]+=R*ze,te(C,2*V+2*D+1),C[2*V+2*D+2]+=O*ze,te(C,2*V+2*D+2)}for(N=0;N<S;N++)C[N]=C[2*N+1]<<16|C[2*N];for(N=S;N<2*S;N++)C[N]=0;return new h(C,0)};function te(N,S){for(;(N[S]&65535)!=N[S];)N[S+1]+=N[S]>>>16,N[S]&=65535,S++}function se(N,S){this.g=N,this.h=S}function ve(N,S){if(H(S))throw Error("division by zero");if(H(N))return new se(w,w);if($(N))return S=ve(z(N),S),new se(z(S.g),z(S.h));if($(S))return S=ve(N,z(S)),new se(z(S.g),S.h);if(N.g.length>30){if($(N)||$(S))throw Error("slowDivide_ only works with positive integers.");for(var C=A,V=S;V.l(N)<=0;)C=ye(C),V=ye(V);var D=Ie(C,1),O=Ie(V,1);for(V=Ie(V,2),C=Ie(C,2);!H(V);){var R=O.add(V);R.l(N)<=0&&(D=D.add(C),O=R),V=Ie(V,1),C=Ie(C,1)}return S=Y(N,D.j(S)),new se(D,S)}for(D=w;N.l(S)>=0;){for(C=Math.max(1,Math.floor(N.m()/S.m())),V=Math.ceil(Math.log(C)/Math.LN2),V=V<=48?1:Math.pow(2,V-48),O=y(C),R=O.j(S);$(R)||R.l(N)>0;)C-=V,O=y(C),R=O.j(S);H(O)&&(O=A),D=D.add(O),N=Y(N,R)}return new se(D,N)}n.B=function(N){return ve(this,N).h},n.and=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let V=0;V<S;V++)C[V]=this.i(V)&N.i(V);return new h(C,this.h&N.h)},n.or=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let V=0;V<S;V++)C[V]=this.i(V)|N.i(V);return new h(C,this.h|N.h)},n.xor=function(N){const S=Math.max(this.g.length,N.g.length),C=[];for(let V=0;V<S;V++)C[V]=this.i(V)^N.i(V);return new h(C,this.h^N.h)};function ye(N){const S=N.g.length+1,C=[];for(let V=0;V<S;V++)C[V]=N.i(V)<<1|N.i(V-1)>>>31;return new h(C,N.h)}function Ie(N,S){const C=S>>5;S%=32;const V=N.g.length-C,D=[];for(let O=0;O<V;O++)D[O]=S>0?N.i(O+C)>>>S|N.i(O+C+1)<<32-S:N.i(O+C);return new h(D,N.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,Xv=i,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.B,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=y,h.fromString=E,Ci=h}).apply(typeof ky<"u"?ky:typeof self<"u"?self:typeof window<"u"?window:{});var ju=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zv,qa,eE,Zu,ad,tE,nE,rE;(function(){var n,e=Object.defineProperty;function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof ju=="object"&&ju];for(var m=0;m<u.length;++m){var _=u[m];if(_&&_.Math==Math)return _}throw Error("Cannot find global object")}var i=t(this);function o(u,m){if(m)e:{var _=i;u=u.split(".");for(var T=0;T<u.length-1;T++){var M=u[T];if(!(M in _))break e;_=_[M]}u=u[u.length-1],T=_[u],m=m(T),m!=T&&m!=null&&e(_,u,{configurable:!0,writable:!0,value:m})}}o("Symbol.dispose",function(u){return u||Symbol("Symbol.dispose")}),o("Array.prototype.values",function(u){return u||function(){return this[Symbol.iterator]()}}),o("Object.entries",function(u){return u||function(m){var _=[],T;for(T in m)Object.prototype.hasOwnProperty.call(m,T)&&_.push([T,m[T]]);return _}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function d(u){var m=typeof u;return m=="object"&&u!=null||m=="function"}function g(u,m,_){return u.call.apply(u.bind,arguments)}function y(u,m,_){return y=g,y.apply(null,arguments)}function E(u,m){var _=Array.prototype.slice.call(arguments,1);return function(){var T=_.slice();return T.push.apply(T,arguments),u.apply(this,T)}}function w(u,m){function _(){}_.prototype=m.prototype,u.Z=m.prototype,u.prototype=new _,u.prototype.constructor=u,u.Ob=function(T,M,j){for(var Z=Array(arguments.length-2),we=2;we<arguments.length;we++)Z[we-2]=arguments[we];return m.prototype[M].apply(T,Z)}}var A=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?u=>u&&AsyncContext.Snapshot.wrap(u):u=>u;function b(u){const m=u.length;if(m>0){const _=Array(m);for(let T=0;T<m;T++)_[T]=u[T];return _}return[]}function H(u,m){for(let T=1;T<arguments.length;T++){const M=arguments[T];var _=typeof M;if(_=_!="object"?_:M?Array.isArray(M)?"array":_:"null",_=="array"||_=="object"&&typeof M.length=="number"){_=u.length||0;const j=M.length||0;u.length=_+j;for(let Z=0;Z<j;Z++)u[_+Z]=M[Z]}else u.push(M)}}class ${constructor(m,_){this.i=m,this.j=_,this.h=0,this.g=null}get(){let m;return this.h>0?(this.h--,m=this.g,this.g=m.next,m.next=null):m=this.i(),m}}function z(u){h.setTimeout(()=>{throw u},0)}function Y(){var u=N;let m=null;return u.g&&(m=u.g,u.g=u.g.next,u.g||(u.h=null),m.next=null),m}class te{constructor(){this.h=this.g=null}add(m,_){const T=se.get();T.set(m,_),this.h?this.h.next=T:this.g=T,this.h=T}}var se=new $(()=>new ve,u=>u.reset());class ve{constructor(){this.next=this.g=this.h=null}set(m,_){this.h=m,this.g=_,this.next=null}reset(){this.next=this.g=this.h=null}}let ye,Ie=!1,N=new te,S=()=>{const u=Promise.resolve(void 0);ye=()=>{u.then(C)}};function C(){for(var u;u=Y();){try{u.h.call(u.g)}catch(_){z(_)}var m=se;m.j(u),m.h<100&&(m.h++,u.next=m.g,m.g=u)}Ie=!1}function V(){this.u=this.u,this.C=this.C}V.prototype.u=!1,V.prototype.dispose=function(){this.u||(this.u=!0,this.N())},V.prototype[Symbol.dispose]=function(){this.dispose()},V.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function D(u,m){this.type=u,this.g=this.target=m,this.defaultPrevented=!1}D.prototype.h=function(){this.defaultPrevented=!0};var O=(function(){if(!h.addEventListener||!Object.defineProperty)return!1;var u=!1,m=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const _=()=>{};h.addEventListener("test",_,m),h.removeEventListener("test",_,m)}catch{}return u})();function R(u){return/^[\s\xa0]*$/.test(u)}function ze(u,m){D.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u&&this.init(u,m)}w(ze,D),ze.prototype.init=function(u,m){const _=this.type=u.type,T=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;this.target=u.target||u.srcElement,this.g=m,m=u.relatedTarget,m||(_=="mouseover"?m=u.fromElement:_=="mouseout"&&(m=u.toElement)),this.relatedTarget=m,T?(this.clientX=T.clientX!==void 0?T.clientX:T.pageX,this.clientY=T.clientY!==void 0?T.clientY:T.pageY,this.screenX=T.screenX||0,this.screenY=T.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=u.pointerType,this.state=u.state,this.i=u,u.defaultPrevented&&ze.Z.h.call(this)},ze.prototype.h=function(){ze.Z.h.call(this);const u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var $e="closure_listenable_"+(Math.random()*1e6|0),Vt=0;function Je(u,m,_,T,M){this.listener=u,this.proxy=null,this.src=m,this.type=_,this.capture=!!T,this.ha=M,this.key=++Vt,this.da=this.fa=!1}function ee(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function fe(u,m,_){for(const T in u)m.call(_,u[T],T,u)}function k(u,m){for(const _ in u)m.call(void 0,u[_],_,u)}function K(u){const m={};for(const _ in u)m[_]=u[_];return m}const ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Re(u,m){let _,T;for(let M=1;M<arguments.length;M++){T=arguments[M];for(_ in T)u[_]=T[_];for(let j=0;j<ce.length;j++)_=ce[j],Object.prototype.hasOwnProperty.call(T,_)&&(u[_]=T[_])}}function Se(u){this.src=u,this.g={},this.h=0}Se.prototype.add=function(u,m,_,T,M){const j=u.toString();u=this.g[j],u||(u=this.g[j]=[],this.h++);const Z=Ne(u,m,T,M);return Z>-1?(m=u[Z],_||(m.fa=!1)):(m=new Je(m,this.src,j,!!T,M),m.fa=_,u.push(m)),m};function Ue(u,m){const _=m.type;if(_ in u.g){var T=u.g[_],M=Array.prototype.indexOf.call(T,m,void 0),j;(j=M>=0)&&Array.prototype.splice.call(T,M,1),j&&(ee(m),u.g[_].length==0&&(delete u.g[_],u.h--))}}function Ne(u,m,_,T){for(let M=0;M<u.length;++M){const j=u[M];if(!j.da&&j.listener==m&&j.capture==!!_&&j.ha==T)return M}return-1}var be="closure_lm_"+(Math.random()*1e6|0),xe={};function It(u,m,_,T,M){if(Array.isArray(m)){for(let j=0;j<m.length;j++)It(u,m[j],_,T,M);return null}return _=Ko(_),u&&u[$e]?u.J(m,_,d(T)?!!T.capture:!1,M):rh(u,m,_,!1,T,M)}function rh(u,m,_,T,M,j){if(!m)throw Error("Invalid event type");const Z=d(M)?!!M.capture:!!M;let we=ks(u);if(we||(u[be]=we=new Se(u)),_=we.add(m,_,T,Z,j),_.proxy)return _;if(T=Cs(),_.proxy=T,T.src=u,T.listener=_,u.addEventListener)O||(M=Z),M===void 0&&(M=!1),u.addEventListener(m.toString(),T,M);else if(u.attachEvent)u.attachEvent(Ps(m.toString()),T);else if(u.addListener&&u.removeListener)u.addListener(T);else throw Error("addEventListener and attachEvent are unavailable.");return _}function Cs(){function u(_){return m.call(u.src,u.listener,_)}const m=Tl;return u}function Wo(u,m,_,T,M){if(Array.isArray(m))for(var j=0;j<m.length;j++)Wo(u,m[j],_,T,M);else T=d(T)?!!T.capture:!!T,_=Ko(_),u&&u[$e]?(u=u.i,j=String(m).toString(),j in u.g&&(m=u.g[j],_=Ne(m,_,T,M),_>-1&&(ee(m[_]),Array.prototype.splice.call(m,_,1),m.length==0&&(delete u.g[j],u.h--)))):u&&(u=ks(u))&&(m=u.g[m.toString()],u=-1,m&&(u=Ne(m,_,T,M)),(_=u>-1?m[u]:null)&&Br(_))}function Br(u){if(typeof u!="number"&&u&&!u.da){var m=u.src;if(m&&m[$e])Ue(m.i,u);else{var _=u.type,T=u.proxy;m.removeEventListener?m.removeEventListener(_,T,u.capture):m.detachEvent?m.detachEvent(Ps(_),T):m.addListener&&m.removeListener&&m.removeListener(T),(_=ks(m))?(Ue(_,u),_.h==0&&(_.src=null,m[be]=null)):ee(u)}}}function Ps(u){return u in xe?xe[u]:xe[u]="on"+u}function Tl(u,m){if(u.da)u=!0;else{m=new ze(m,this);const _=u.listener,T=u.ha||u.src;u.fa&&Br(u),u=_.call(T,m)}return u}function ks(u){return u=u[be],u instanceof Se?u:null}var Fi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ko(u){return typeof u=="function"?u:(u[Fi]||(u[Fi]=function(m){return u.handleEvent(m)}),u[Fi])}function ut(){V.call(this),this.i=new Se(this),this.M=this,this.G=null}w(ut,V),ut.prototype[$e]=!0,ut.prototype.removeEventListener=function(u,m,_,T){Wo(this,u,m,_,T)};function st(u,m){var _,T=u.G;if(T)for(_=[];T;T=T.G)_.push(T);if(u=u.M,T=m.type||m,typeof m=="string")m=new D(m,u);else if(m instanceof D)m.target=m.target||u;else{var M=m;m=new D(T,u),Re(m,M)}M=!0;let j,Z;if(_)for(Z=_.length-1;Z>=0;Z--)j=m.g=_[Z],M=Tn(j,T,!0,m)&&M;if(j=m.g=u,M=Tn(j,T,!0,m)&&M,M=Tn(j,T,!1,m)&&M,_)for(Z=0;Z<_.length;Z++)j=m.g=_[Z],M=Tn(j,T,!1,m)&&M}ut.prototype.N=function(){if(ut.Z.N.call(this),this.i){var u=this.i;for(const m in u.g){const _=u.g[m];for(let T=0;T<_.length;T++)ee(_[T]);delete u.g[m],u.h--}}this.G=null},ut.prototype.J=function(u,m,_,T){return this.i.add(String(u),m,!1,_,T)},ut.prototype.K=function(u,m,_,T){return this.i.add(String(u),m,!0,_,T)};function Tn(u,m,_,T){if(m=u.i.g[String(m)],!m)return!0;m=m.concat();let M=!0;for(let j=0;j<m.length;++j){const Z=m[j];if(Z&&!Z.da&&Z.capture==_){const we=Z.listener,ot=Z.ha||Z.src;Z.fa&&Ue(u.i,Z),M=we.call(ot,T)!==!1&&M}}return M&&!T.defaultPrevented}function Go(u,m){if(typeof u!="function")if(u&&typeof u.handleEvent=="function")u=y(u.handleEvent,u);else throw Error("Invalid listener argument");return Number(m)>2147483647?-1:h.setTimeout(u,m||0)}function Qo(u){u.g=Go(()=>{u.g=null,u.i&&(u.i=!1,Qo(u))},u.l);const m=u.h;u.h=null,u.m.apply(null,m)}class Il extends V{constructor(m,_){super(),this.m=m,this.l=_,this.h=null,this.i=!1,this.g=null}j(m){this.h=arguments,this.g?this.i=!0:Qo(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function $r(u){V.call(this),this.h=u,this.g={}}w($r,V);var Yo=[];function Ns(u){fe(u.g,function(m,_){this.g.hasOwnProperty(_)&&Br(m)},u),u.g={}}$r.prototype.N=function(){$r.Z.N.call(this),Ns(this)},$r.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Hr=h.JSON.stringify,Sl=h.JSON.parse,Ui=class{stringify(u){return h.JSON.stringify(u,void 0)}parse(u){return h.JSON.parse(u,void 0)}};function qr(){}function Rl(){}var Wr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ds(){D.call(this,"d")}w(Ds,D);function Jo(){D.call(this,"c")}w(Jo,D);var In={},xs=null;function Kr(){return xs=xs||new ut}In.Ia="serverreachability";function Vs(u){D.call(this,In.Ia,u)}w(Vs,D);function gr(u){const m=Kr();st(m,new Vs(m))}In.STAT_EVENT="statevent";function yr(u,m){D.call(this,In.STAT_EVENT,u),this.stat=m}w(yr,D);function rt(u){const m=Kr();st(m,new yr(m,u))}In.Ja="timingevent";function Xo(u,m){D.call(this,In.Ja,u),this.size=m}w(Xo,D);function Gr(u,m){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){u()},m)}function Qr(){this.g=!0}Qr.prototype.ua=function(){this.g=!1};function Al(u,m,_,T,M,j){u.info(function(){if(u.g)if(j){var Z="",we=j.split("&");for(let Be=0;Be<we.length;Be++){var ot=we[Be].split("=");if(ot.length>1){const ct=ot[0];ot=ot[1];const sn=ct.split("_");Z=sn.length>=2&&sn[1]=="type"?Z+(ct+"="+ot+"&"):Z+(ct+"=redacted&")}}}else Z=null;else Z=j;return"XMLHTTP REQ ("+T+") [attempt "+M+"]: "+m+`
`+_+`
`+Z})}function Cl(u,m,_,T,M,j,Z){u.info(function(){return"XMLHTTP RESP ("+T+") [ attempt "+M+"]: "+m+`
`+_+`
`+j+" "+Z})}function Bn(u,m,_,T){u.info(function(){return"XMLHTTP TEXT ("+m+"): "+ji(u,_)+(T?" "+T:"")})}function Pl(u,m){u.info(function(){return"TIMEOUT: "+m})}Qr.prototype.info=function(){};function ji(u,m){if(!u.g)return m;if(!m)return null;try{const j=JSON.parse(m);if(j){for(u=0;u<j.length;u++)if(Array.isArray(j[u])){var _=j[u];if(!(_.length<2)){var T=_[1];if(Array.isArray(T)&&!(T.length<1)){var M=T[0];if(M!="noop"&&M!="stop"&&M!="close")for(let Z=1;Z<T.length;Z++)T[Z]=""}}}}return Hr(j)}catch{return m}}var Yr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Jr={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},kl;function _r(){}w(_r,qr),_r.prototype.g=function(){return new XMLHttpRequest},kl=new _r;function $n(u){return encodeURIComponent(String(u))}function Os(u){var m=1;u=u.split(":");const _=[];for(;m>0&&u.length;)_.push(u.shift()),m--;return u.length&&_.push(u.join(":")),_}function hn(u,m,_,T){this.j=u,this.i=m,this.l=_,this.S=T||1,this.V=new $r(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Nl}function Nl(){this.i=null,this.g="",this.h=!1}var Dl={},Zo={};function Sn(u,m,_){u.M=1,u.A=Er(fn(m)),u.u=_,u.R=!0,ea(u,null)}function ea(u,m){u.F=Date.now(),zi(u),u.B=fn(u.A);var _=u.B,T=u.S;Array.isArray(T)||(T=[String(T)]),ca(_.i,"t",T),u.C=0,_=u.j.L,u.h=new Nl,u.g=zl(u.j,_?m:null,!u.u),u.P>0&&(u.O=new Il(y(u.Y,u,u.g),u.P)),m=u.V,_=u.g,T=u.ba;var M="readystatechange";Array.isArray(M)||(M&&(Yo[0]=M.toString()),M=Yo);for(let j=0;j<M.length;j++){const Z=It(_,M[j],T||m.handleEvent,!1,m.h||m);if(!Z)break;m.g[Z.key]=Z}m=u.J?K(u.J):{},u.u?(u.v||(u.v="POST"),m["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.B,u.v,u.u,m)):(u.v="GET",u.g.ea(u.B,u.v,null,m)),gr(),Al(u.i,u.v,u.B,u.l,u.S,u.u)}hn.prototype.ba=function(u){u=u.target;const m=this.O;m&&Yn(u)==3?m.j():this.Y(u)},hn.prototype.Y=function(u){try{if(u==this.g)e:{const we=Yn(this.g),ot=this.g.ya(),Be=this.g.ca();if(!(we<3)&&(we!=3||this.g&&(this.h.h||this.g.la()||Ul(this.g)))){this.K||we!=4||ot==7||(ot==8||Be<=0?gr(3):gr(2)),Ls(this);var m=this.g.ca();this.X=m;var _=xl(this);if(this.o=m==200,Cl(this.i,this.v,this.B,this.l,this.S,we,m),this.o){if(this.U&&!this.L){t:{if(this.g){var T,M=this.g;if((T=M.g?M.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!R(T)){var j=T;break t}}j=null}if(u=j)Bn(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ke(this,u);else{this.o=!1,this.m=3,rt(12),vr(this),Bi(this);break e}}if(this.R){u=!0;let ct;for(;!this.K&&this.C<_.length;)if(ct=Ol(this,_),ct==Zo){we==4&&(this.m=4,rt(14),u=!1),Bn(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==Dl){this.m=4,rt(15),Bn(this.i,this.l,_,"[Invalid Chunk]"),u=!1;break}else Bn(this.i,this.l,ct,null),Ke(this,ct);if(Vl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),we!=4||_.length!=0||this.h.h||(this.m=1,rt(16),u=!1),this.o=this.o&&u,!u)Bn(this.i,this.l,_,"[Invalid Chunked Response]"),vr(this),Bi(this);else if(_.length>0&&!this.W){this.W=!0;var Z=this.j;Z.g==this&&Z.aa&&!Z.P&&(Z.j.info("Great, no buffering proxy detected. Bytes received: "+_.length),Ji(Z),Z.P=!0,rt(11))}}else Bn(this.i,this.l,_,null),Ke(this,_);we==4&&vr(this),this.o&&!this.K&&(we==4?qs(this.j,this):(this.o=!1,zi(this)))}else fa(this.g),m==400&&_.indexOf("Unknown SID")>0?(this.m=3,rt(12)):(this.m=0,rt(13)),vr(this),Bi(this)}}}catch{}finally{}};function xl(u){if(!Vl(u))return u.g.la();const m=Ul(u.g);if(m==="")return"";let _="";const T=m.length,M=Yn(u.g)==4;if(!u.h.i){if(typeof TextDecoder>"u")return vr(u),Bi(u),"";u.h.i=new h.TextDecoder}for(let j=0;j<T;j++)u.h.h=!0,_+=u.h.i.decode(m[j],{stream:!(M&&j==T-1)});return m.length=0,u.h.g+=_,u.C=0,u.h.g}function Vl(u){return u.g?u.v=="GET"&&u.M!=2&&u.j.Aa:!1}function Ol(u,m){var _=u.C,T=m.indexOf(`
`,_);return T==-1?Zo:(_=Number(m.substring(_,T)),isNaN(_)?Dl:(T+=1,T+_>m.length?Zo:(m=m.slice(T,T+_),u.C=T+_,m)))}hn.prototype.cancel=function(){this.K=!0,vr(this)};function zi(u){u.T=Date.now()+u.H,ta(u,u.H)}function ta(u,m){if(u.D!=null)throw Error("WatchDog timer not null");u.D=Gr(y(u.aa,u),m)}function Ls(u){u.D&&(h.clearTimeout(u.D),u.D=null)}hn.prototype.aa=function(){this.D=null;const u=Date.now();u-this.T>=0?(Pl(this.i,this.B),this.M!=2&&(gr(),rt(17)),vr(this),this.m=2,Bi(this)):ta(this,this.T-u)};function Bi(u){u.j.I==0||u.K||qs(u.j,u)}function vr(u){Ls(u);var m=u.O;m&&typeof m.dispose=="function"&&m.dispose(),u.O=null,Ns(u.V),u.g&&(m=u.g,u.g=null,m.abort(),m.dispose())}function Ke(u,m){try{var _=u.j;if(_.I!=0&&(_.g==u||ra(_.h,u))){if(!u.L&&ra(_.h,u)&&_.I==3){try{var T=_.Ba.g.parse(m)}catch{T=null}if(Array.isArray(T)&&T.length==3){var M=T;if(M[0]==0){e:if(!_.v){if(_.g)if(_.g.F+3e3<u.F)Hs(_),nn(_);else break e;Zn(_),rt(18)}}else _.xa=M[1],0<_.xa-_.K&&M[2]<37500&&_.F&&_.A==0&&!_.C&&(_.C=Gr(y(_.Va,_),6e3));$i(_.h)<=1&&_.ta&&(_.ta=void 0)}else rn(_,11)}else if((u.L||_.g==u)&&Hs(_),!R(m))for(M=_.Ba.g.parse(m),m=0;m<M.length;m++){let Be=M[m];const ct=Be[0];if(!(ct<=_.K))if(_.K=ct,Be=Be[1],_.I==2)if(Be[0]=="c"){_.M=Be[1],_.ba=Be[2];const sn=Be[3];sn!=null&&(_.ka=sn,_.j.info("VER="+_.ka));const Rr=Be[4];Rr!=null&&(_.za=Rr,_.j.info("SVER="+_.za));const er=Be[5];er!=null&&typeof er=="number"&&er>0&&(T=1.5*er,_.O=T,_.j.info("backChannelRequestTimeoutMs_="+T)),T=_;const tr=u.g;if(tr){const Gs=tr.g?tr.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Gs){var j=T.h;j.g||Gs.indexOf("spdy")==-1&&Gs.indexOf("quic")==-1&&Gs.indexOf("h2")==-1||(j.j=j.l,j.g=new Set,j.h&&(bs(j,j.h),j.h=null))}if(T.G){const ma=tr.g?tr.g.getResponseHeader("X-HTTP-Session-Id"):null;ma&&(T.wa=ma,Fe(T.J,T.G,ma))}}_.I=3,_.l&&_.l.ra(),_.aa&&(_.T=Date.now()-u.F,_.j.info("Handshake RTT: "+_.T+"ms")),T=_;var Z=u;if(T.na=pa(T,T.L?T.ba:null,T.W),Z.L){Hi(T.h,Z);var we=Z,ot=T.O;ot&&(we.H=ot),we.D&&(Ls(we),zi(we)),T.g=Z}else Ot(T);_.i.length>0&&Sr(_)}else Be[0]!="stop"&&Be[0]!="close"||rn(_,7);else _.I==3&&(Be[0]=="stop"||Be[0]=="close"?Be[0]=="stop"?rn(_,7):Bs(_):Be[0]!="noop"&&_.l&&_.l.qa(Be),_.A=0)}}gr(4)}catch{}}var ih=class{constructor(u,m){this.g=u,this.map=m}};function Ms(u){this.l=u||10,h.PerformanceNavigationTiming?(u=h.performance.getEntriesByType("navigation"),u=u.length>0&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function na(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function $i(u){return u.h?1:u.g?u.g.size:0}function ra(u,m){return u.h?u.h==m:u.g?u.g.has(m):!1}function bs(u,m){u.g?u.g.add(m):u.h=m}function Hi(u,m){u.h&&u.h==m?u.h=null:u.g&&u.g.has(m)&&u.g.delete(m)}Ms.prototype.cancel=function(){if(this.i=Zt(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function Zt(u){if(u.h!=null)return u.i.concat(u.h.G);if(u.g!=null&&u.g.size!==0){let m=u.i;for(const _ of u.g.values())m=m.concat(_.G);return m}return b(u.i)}var Ll=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function en(u,m){if(u){u=u.split("&");for(let _=0;_<u.length;_++){const T=u[_].indexOf("=");let M,j=null;T>=0?(M=u[_].substring(0,T),j=u[_].substring(T+1)):M=u[_],m(M,j?decodeURIComponent(j.replace(/\+/g," ")):"")}}}function Hn(u){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let m;u instanceof Hn?(this.l=u.l,qi(this,u.j),this.o=u.o,this.g=u.g,qn(this,u.u),this.h=u.h,Xr(this,ha(u.i)),this.m=u.m):u&&(m=String(u).match(Ll))?(this.l=!1,qi(this,m[1]||"",!0),this.o=Wi(m[2]||""),this.g=Wi(m[3]||"",!0),qn(this,m[4]),this.h=Wi(m[5]||"",!0),Xr(this,m[6]||"",!0),this.m=Wi(m[7]||"")):(this.l=!1,this.i=new De(null,this.l))}Hn.prototype.toString=function(){const u=[];var m=this.j;m&&u.push(Ki(m,sa,!0),":");var _=this.g;return(_||m=="file")&&(u.push("//"),(m=this.o)&&u.push(Ki(m,sa,!0),"@"),u.push($n(_).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),_=this.u,_!=null&&u.push(":",String(_))),(_=this.h)&&(this.g&&_.charAt(0)!="/"&&u.push("/"),u.push(Ki(_,_.charAt(0)=="/"?Gi:oa,!0))),(_=this.i.toString())&&u.push("?",_),(_=this.m)&&u.push("#",Ki(_,aa)),u.join("")},Hn.prototype.resolve=function(u){const m=fn(this);let _=!!u.j;_?qi(m,u.j):_=!!u.o,_?m.o=u.o:_=!!u.g,_?m.g=u.g:_=u.u!=null;var T=u.h;if(_)qn(m,u.u);else if(_=!!u.h){if(T.charAt(0)!="/")if(this.g&&!this.h)T="/"+T;else{var M=m.h.lastIndexOf("/");M!=-1&&(T=m.h.slice(0,M+1)+T)}if(M=T,M==".."||M==".")T="";else if(M.indexOf("./")!=-1||M.indexOf("/.")!=-1){T=M.lastIndexOf("/",0)==0,M=M.split("/");const j=[];for(let Z=0;Z<M.length;){const we=M[Z++];we=="."?T&&Z==M.length&&j.push(""):we==".."?((j.length>1||j.length==1&&j[0]!="")&&j.pop(),T&&Z==M.length&&j.push("")):(j.push(we),T=!0)}T=j.join("/")}else T=M}return _?m.h=T:_=u.i.toString()!=="",_?Xr(m,ha(u.i)):_=!!u.m,_&&(m.m=u.m),m};function fn(u){return new Hn(u)}function qi(u,m,_){u.j=_?Wi(m,!0):m,u.j&&(u.j=u.j.replace(/:$/,""))}function qn(u,m){if(m){if(m=Number(m),isNaN(m)||m<0)throw Error("Bad port number "+m);u.u=m}else u.u=null}function Xr(u,m,_){m instanceof De?(u.i=m,Us(u.i,u.l)):(_||(m=Ki(m,sh)),u.i=new De(m,u.l))}function Fe(u,m,_){u.i.set(m,_)}function Er(u){return Fe(u,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),u}function Wi(u,m){return u?m?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Ki(u,m,_){return typeof u=="string"?(u=encodeURI(u).replace(m,ia),_&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function ia(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var sa=/[#\/\?@]/g,oa=/[#\?:]/g,Gi=/[#\?]/g,sh=/[#\?@]/g,aa=/#/g;function De(u,m){this.h=this.g=null,this.i=u||null,this.j=!!m}function Wn(u){u.g||(u.g=new Map,u.h=0,u.i&&en(u.i,function(m,_){u.add(decodeURIComponent(m.replace(/\+/g," ")),_)}))}n=De.prototype,n.add=function(u,m){Wn(this),this.i=null,u=Kn(this,u);let _=this.g.get(u);return _||this.g.set(u,_=[]),_.push(m),this.h+=1,this};function la(u,m){Wn(u),m=Kn(u,m),u.g.has(m)&&(u.i=null,u.h-=u.g.get(m).length,u.g.delete(m))}function Fs(u,m){return Wn(u),m=Kn(u,m),u.g.has(m)}n.forEach=function(u,m){Wn(this),this.g.forEach(function(_,T){_.forEach(function(M){u.call(m,M,T,this)},this)},this)};function ua(u,m){Wn(u);let _=[];if(typeof m=="string")Fs(u,m)&&(_=_.concat(u.g.get(Kn(u,m))));else for(u=Array.from(u.g.values()),m=0;m<u.length;m++)_=_.concat(u[m]);return _}n.set=function(u,m){return Wn(this),this.i=null,u=Kn(this,u),Fs(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[m]),this.h+=1,this},n.get=function(u,m){return u?(u=ua(this,u),u.length>0?String(u[0]):m):m};function ca(u,m,_){la(u,m),_.length>0&&(u.i=null,u.g.set(Kn(u,m),b(_)),u.h+=_.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],m=Array.from(this.g.keys());for(let T=0;T<m.length;T++){var _=m[T];const M=$n(_);_=ua(this,_);for(let j=0;j<_.length;j++){let Z=M;_[j]!==""&&(Z+="="+$n(_[j])),u.push(Z)}}return this.i=u.join("&")};function ha(u){const m=new De;return m.i=u.i,u.g&&(m.g=new Map(u.g),m.h=u.h),m}function Kn(u,m){return m=String(m),u.j&&(m=m.toLowerCase()),m}function Us(u,m){m&&!u.j&&(Wn(u),u.i=null,u.g.forEach(function(_,T){const M=T.toLowerCase();T!=M&&(la(this,T),ca(this,M,_))},u)),u.j=m}function Gn(u,m){const _=new Qr;if(h.Image){const T=new Image;T.onload=E(St,_,"TestLoadImage: loaded",!0,m,T),T.onerror=E(St,_,"TestLoadImage: error",!1,m,T),T.onabort=E(St,_,"TestLoadImage: abort",!1,m,T),T.ontimeout=E(St,_,"TestLoadImage: timeout",!1,m,T),h.setTimeout(function(){T.ontimeout&&T.ontimeout()},1e4),T.src=u}else m(!1)}function Qn(u,m){const _=new Qr,T=new AbortController,M=setTimeout(()=>{T.abort(),St(_,"TestPingServer: timeout",!1,m)},1e4);fetch(u,{signal:T.signal}).then(j=>{clearTimeout(M),j.ok?St(_,"TestPingServer: ok",!0,m):St(_,"TestPingServer: server error",!1,m)}).catch(()=>{clearTimeout(M),St(_,"TestPingServer: error",!1,m)})}function St(u,m,_,T,M){try{M&&(M.onload=null,M.onerror=null,M.onabort=null,M.ontimeout=null),T(_)}catch{}}function Qi(){this.g=new Ui}function wr(u){this.i=u.Sb||null,this.h=u.ab||!1}w(wr,qr),wr.prototype.g=function(){return new tn(this.i,this.h)};function tn(u,m){ut.call(this),this.H=u,this.o=m,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}w(tn,ut),n=tn.prototype,n.open=function(u,m){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=u,this.D=m,this.readyState=1,Rn(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const m={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};u&&(m.body=u),(this.H||h).fetch(new Request(this.D,m)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Zr(this)),this.readyState=0},n.Pa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Rn(this)),this.g&&(this.readyState=3,Rn(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ml(this)}else u.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ml(u){u.j.read().then(u.Ma.bind(u)).catch(u.ga.bind(u))}n.Ma=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var m=u.value?u.value:new Uint8Array(0);(m=this.B.decode(m,{stream:!u.done}))&&(this.response=this.responseText+=m)}u.done?Zr(this):Rn(this),this.readyState==3&&Ml(this)}},n.Oa=function(u){this.g&&(this.response=this.responseText=u,Zr(this))},n.Na=function(u){this.g&&(this.response=u,Zr(this))},n.ga=function(){this.g&&Zr(this)};function Zr(u){u.readyState=4,u.l=null,u.j=null,u.B=null,Rn(u)}n.setRequestHeader=function(u,m){this.A.append(u,m)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],m=this.h.entries();for(var _=m.next();!_.done;)_=_.value,u.push(_[0]+": "+_[1]),_=m.next();return u.join(`\r
`)};function Rn(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(tn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function bl(u){let m="";return fe(u,function(_,T){m+=T,m+=":",m+=_,m+=`\r
`}),m}function js(u,m,_){e:{for(T in _){var T=!1;break e}T=!0}T||(_=bl(_),typeof u=="string"?_!=null&&$n(_):Fe(u,m,_))}function He(u){ut.call(this),this.headers=new Map,this.L=u||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}w(He,ut);var Fl=/^https?$/i,oh=["POST","PUT"];n=He.prototype,n.Fa=function(u){this.H=u},n.ea=function(u,m,_,T){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);m=m?m.toUpperCase():"GET",this.D=u,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():kl.g(),this.g.onreadystatechange=A(y(this.Ca,this));try{this.B=!0,this.g.open(m,String(u),!0),this.B=!1}catch(j){ei(this,j);return}if(u=_||"",_=new Map(this.headers),T)if(Object.getPrototypeOf(T)===Object.prototype)for(var M in T)_.set(M,T[M]);else if(typeof T.keys=="function"&&typeof T.get=="function")for(const j of T.keys())_.set(j,T.get(j));else throw Error("Unknown input type for opt_headers: "+String(T));T=Array.from(_.keys()).find(j=>j.toLowerCase()=="content-type"),M=h.FormData&&u instanceof h.FormData,!(Array.prototype.indexOf.call(oh,m,void 0)>=0)||T||M||_.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[j,Z]of _)this.g.setRequestHeader(j,Z);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(u),this.v=!1}catch(j){ei(this,j)}};function ei(u,m){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=m,u.o=5,ti(u),Ir(u)}function ti(u){u.A||(u.A=!0,st(u,"complete"),st(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=u||7,st(this,"complete"),st(this,"abort"),Ir(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ir(this,!0)),He.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Tr(this):this.Xa())},n.Xa=function(){Tr(this)};function Tr(u){if(u.h&&typeof l<"u"){if(u.v&&Yn(u)==4)setTimeout(u.Ca.bind(u),0);else if(st(u,"readystatechange"),Yn(u)==4){u.h=!1;try{const j=u.ca();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var m=!0;break e;default:m=!1}var _;if(!(_=m)){var T;if(T=j===0){let Z=String(u.D).match(Ll)[1]||null;!Z&&h.self&&h.self.location&&(Z=h.self.location.protocol.slice(0,-1)),T=!Fl.test(Z?Z.toLowerCase():"")}_=T}if(_)st(u,"complete"),st(u,"success");else{u.o=6;try{var M=Yn(u)>2?u.g.statusText:""}catch{M=""}u.l=M+" ["+u.ca()+"]",ti(u)}}finally{Ir(u)}}}}function Ir(u,m){if(u.g){u.m&&(clearTimeout(u.m),u.m=null);const _=u.g;u.g=null,m||st(u,"ready");try{_.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Yn(u){return u.g?u.g.readyState:0}n.ca=function(){try{return Yn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(u){if(this.g){var m=this.g.responseText;return u&&m.indexOf(u)==0&&(m=m.substring(u.length)),Sl(m)}};function Ul(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.F){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function fa(u){const m={};u=(u.g&&Yn(u)>=2&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let T=0;T<u.length;T++){if(R(u[T]))continue;var _=Os(u[T]);const M=_[0];if(_=_[1],typeof _!="string")continue;_=_.trim();const j=m[M]||[];m[M]=j,j.push(_)}k(m,function(T){return T.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Jn(u,m,_){return _&&_.internalChannelParams&&_.internalChannelParams[u]||m}function zs(u){this.za=0,this.i=[],this.j=new Qr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Jn("failFast",!1,u),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Jn("baseRetryDelayMs",5e3,u),this.Za=Jn("retryDelaySeedMs",1e4,u),this.Ta=Jn("forwardChannelMaxRetries",2,u),this.va=Jn("forwardChannelRequestTimeoutMs",2e4,u),this.ma=u&&u.xmlHttpFactory||void 0,this.Ua=u&&u.Rb||void 0,this.Aa=u&&u.useFetchStreams||!1,this.O=void 0,this.L=u&&u.supportsCrossDomainXhr||!1,this.M="",this.h=new Ms(u&&u.concurrentRequestLimit),this.Ba=new Qi,this.S=u&&u.fastHandshake||!1,this.R=u&&u.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=u&&u.Pb||!1,u&&u.ua&&this.j.ua(),u&&u.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&u&&u.detectBufferingProxy||!1,this.ia=void 0,u&&u.longPollingTimeout&&u.longPollingTimeout>0&&(this.ia=u.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=zs.prototype,n.ka=8,n.I=1,n.connect=function(u,m,_,T){rt(0),this.W=u,this.H=m||{},_&&T!==void 0&&(this.H.OSID=_,this.H.OAID=T),this.F=this.X,this.J=pa(this,null,this.W),Sr(this)};function Bs(u){if($s(u),u.I==3){var m=u.V++,_=fn(u.J);if(Fe(_,"SID",u.M),Fe(_,"RID",m),Fe(_,"TYPE","terminate"),Xn(u,_),m=new hn(u,u.j,m),m.M=2,m.A=Er(fn(_)),_=!1,h.navigator&&h.navigator.sendBeacon)try{_=h.navigator.sendBeacon(m.A.toString(),"")}catch{}!_&&h.Image&&(new Image().src=m.A,_=!0),_||(m.g=zl(m.j,null),m.g.ea(m.A)),m.F=Date.now(),zi(m)}Xi(u)}function nn(u){u.g&&(Ji(u),u.g.cancel(),u.g=null)}function $s(u){nn(u),u.v&&(h.clearTimeout(u.v),u.v=null),Hs(u),u.h.cancel(),u.m&&(typeof u.m=="number"&&h.clearTimeout(u.m),u.m=null)}function Sr(u){if(!na(u.h)&&!u.m){u.m=!0;var m=u.Ea;ye||S(),Ie||(ye(),Ie=!0),N.add(m,u),u.D=0}}function jl(u,m){return $i(u.h)>=u.h.j-(u.m?1:0)?!1:u.m?(u.i=m.G.concat(u.i),!0):u.I==1||u.I==2||u.D>=(u.Sa?0:u.Ta)?!1:(u.m=Gr(y(u.Ea,u,m),Ws(u,u.D)),u.D++,!0)}n.Ea=function(u){if(this.m)if(this.m=null,this.I==1){if(!u){this.V=Math.floor(Math.random()*1e5),u=this.V++;const M=new hn(this,this.j,u);let j=this.o;if(this.U&&(j?(j=K(j),Re(j,this.U)):j=this.U),this.u!==null||this.R||(M.J=j,j=null),this.S)e:{for(var m=0,_=0;_<this.i.length;_++){t:{var T=this.i[_];if("__data__"in T.map&&(T=T.map.__data__,typeof T=="string")){T=T.length;break t}T=void 0}if(T===void 0)break;if(m+=T,m>4096){m=_;break e}if(m===4096||_===this.i.length-1){m=_+1;break e}}m=1e3}else m=1e3;m=da(this,M,m),_=fn(this.J),Fe(_,"RID",u),Fe(_,"CVER",22),this.G&&Fe(_,"X-HTTP-Session-Id",this.G),Xn(this,_),j&&(this.R?m="headers="+$n(bl(j))+"&"+m:this.u&&js(_,this.u,j)),bs(this.h,M),this.Ra&&Fe(_,"TYPE","init"),this.S?(Fe(_,"$req",m),Fe(_,"SID","null"),M.U=!0,Sn(M,_,null)):Sn(M,_,m),this.I=2}}else this.I==3&&(u?Yi(this,u):this.i.length==0||na(this.h)||Yi(this))};function Yi(u,m){var _;m?_=m.l:_=u.V++;const T=fn(u.J);Fe(T,"SID",u.M),Fe(T,"RID",_),Fe(T,"AID",u.K),Xn(u,T),u.u&&u.o&&js(T,u.u,u.o),_=new hn(u,u.j,_,u.D+1),u.u===null&&(_.J=u.o),m&&(u.i=m.G.concat(u.i)),m=da(u,_,1e3),_.H=Math.round(u.va*.5)+Math.round(u.va*.5*Math.random()),bs(u.h,_),Sn(_,T,m)}function Xn(u,m){u.H&&fe(u.H,function(_,T){Fe(m,T,_)}),u.l&&fe({},function(_,T){Fe(m,T,_)})}function da(u,m,_){_=Math.min(u.i.length,_);const T=u.l?y(u.l.Ka,u.l,u):null;e:{var M=u.i;let we=-1;for(;;){const ot=["count="+_];we==-1?_>0?(we=M[0].g,ot.push("ofs="+we)):we=0:ot.push("ofs="+we);let Be=!0;for(let ct=0;ct<_;ct++){var j=M[ct].g;const sn=M[ct].map;if(j-=we,j<0)we=Math.max(0,M[ct].g-100),Be=!1;else try{j="req"+j+"_"||"";try{var Z=sn instanceof Map?sn:Object.entries(sn);for(const[Rr,er]of Z){let tr=er;d(er)&&(tr=Hr(er)),ot.push(j+Rr+"="+encodeURIComponent(tr))}}catch(Rr){throw ot.push(j+"type="+encodeURIComponent("_badmap")),Rr}}catch{T&&T(sn)}}if(Be){Z=ot.join("&");break e}}Z=void 0}return u=u.i.splice(0,_),m.G=u,Z}function Ot(u){if(!u.g&&!u.v){u.Y=1;var m=u.Da;ye||S(),Ie||(ye(),Ie=!0),N.add(m,u),u.A=0}}function Zn(u){return u.g||u.v||u.A>=3?!1:(u.Y++,u.v=Gr(y(u.Da,u),Ws(u,u.A)),u.A++,!0)}n.Da=function(){if(this.v=null,ni(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var u=4*this.T;this.j.info("BP detection timer enabled: "+u),this.B=Gr(y(this.Wa,this),u)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,rt(10),nn(this),ni(this))};function Ji(u){u.B!=null&&(h.clearTimeout(u.B),u.B=null)}function ni(u){u.g=new hn(u,u.j,"rpc",u.Y),u.u===null&&(u.g.J=u.o),u.g.P=0;var m=fn(u.na);Fe(m,"RID","rpc"),Fe(m,"SID",u.M),Fe(m,"AID",u.K),Fe(m,"CI",u.F?"0":"1"),!u.F&&u.ia&&Fe(m,"TO",u.ia),Fe(m,"TYPE","xmlhttp"),Xn(u,m),u.u&&u.o&&js(m,u.u,u.o),u.O&&(u.g.H=u.O);var _=u.g;u=u.ba,_.M=1,_.A=Er(fn(m)),_.u=null,_.R=!0,ea(_,u)}n.Va=function(){this.C!=null&&(this.C=null,nn(this),Zn(this),rt(19))};function Hs(u){u.C!=null&&(h.clearTimeout(u.C),u.C=null)}function qs(u,m){var _=null;if(u.g==m){Hs(u),Ji(u),u.g=null;var T=2}else if(ra(u.h,m))_=m.G,Hi(u.h,m),T=1;else return;if(u.I!=0){if(m.o)if(T==1){_=m.u?m.u.length:0,m=Date.now()-m.F;var M=u.D;T=Kr(),st(T,new Xo(T,_)),Sr(u)}else Ot(u);else if(M=m.m,M==3||M==0&&m.X>0||!(T==1&&jl(u,m)||T==2&&Zn(u)))switch(_&&_.length>0&&(m=u.h,m.i=m.i.concat(_)),M){case 1:rn(u,5);break;case 4:rn(u,10);break;case 3:rn(u,6);break;default:rn(u,2)}}}function Ws(u,m){let _=u.Qa+Math.floor(Math.random()*u.Za);return u.isActive()||(_*=2),_*m}function rn(u,m){if(u.j.info("Error code "+m),m==2){var _=y(u.bb,u),T=u.Ua;const M=!T;T=new Hn(T||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||qi(T,"https"),Er(T),M?Gn(T.toString(),_):Qn(T.toString(),_)}else rt(2);u.I=0,u.l&&u.l.pa(m),Xi(u),$s(u)}n.bb=function(u){u?(this.j.info("Successfully pinged google.com"),rt(2)):(this.j.info("Failed to ping google.com"),rt(1))};function Xi(u){if(u.I=0,u.ja=[],u.l){const m=Zt(u.h);(m.length!=0||u.i.length!=0)&&(H(u.ja,m),H(u.ja,u.i),u.h.i.length=0,b(u.i),u.i.length=0),u.l.oa()}}function pa(u,m,_){var T=_ instanceof Hn?fn(_):new Hn(_);if(T.g!="")m&&(T.g=m+"."+T.g),qn(T,T.u);else{var M=h.location;T=M.protocol,m=m?m+"."+M.hostname:M.hostname,M=+M.port;const j=new Hn(null);T&&qi(j,T),m&&(j.g=m),M&&qn(j,M),_&&(j.h=_),T=j}return _=u.G,m=u.wa,_&&m&&Fe(T,_,m),Fe(T,"VER",u.ka),Xn(u,T),T}function zl(u,m,_){if(m&&!u.L)throw Error("Can't create secondary domain capable XhrIo object.");return m=u.Aa&&!u.ma?new He(new wr({ab:_})):new He(u.ma),m.Fa(u.L),m}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bl(){}n=Bl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ks(){}Ks.prototype.g=function(u,m){return new Rt(u,m)};function Rt(u,m){ut.call(this),this.g=new zs(m),this.l=u,this.h=m&&m.messageUrlParams||null,u=m&&m.messageHeaders||null,m&&m.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=m&&m.initMessageHeaders||null,m&&m.messageContentType&&(u?u["X-WebChannel-Content-Type"]=m.messageContentType:u={"X-WebChannel-Content-Type":m.messageContentType}),m&&m.sa&&(u?u["X-WebChannel-Client-Profile"]=m.sa:u={"X-WebChannel-Client-Profile":m.sa}),this.g.U=u,(u=m&&m.Qb)&&!R(u)&&(this.g.u=u),this.A=m&&m.supportsCrossDomainXhr||!1,this.v=m&&m.sendRawJson||!1,(m=m&&m.httpSessionIdParam)&&!R(m)&&(this.g.G=m,u=this.h,u!==null&&m in u&&(u=this.h,m in u&&delete u[m])),this.j=new ri(this)}w(Rt,ut),Rt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Rt.prototype.close=function(){Bs(this.g)},Rt.prototype.o=function(u){var m=this.g;if(typeof u=="string"){var _={};_.__data__=u,u=_}else this.v&&(_={},_.__data__=Hr(u),u=_);m.i.push(new ih(m.Ya++,u)),m.I==3&&Sr(m)},Rt.prototype.N=function(){this.g.l=null,delete this.j,Bs(this.g),delete this.g,Rt.Z.N.call(this)};function $l(u){Ds.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var m=u.__sm__;if(m){e:{for(const _ in m){u=_;break e}u=void 0}(this.i=u)&&(u=this.i,m=m!==null&&u in m?m[u]:void 0),this.data=m}else this.data=u}w($l,Ds);function Hl(){Jo.call(this),this.status=1}w(Hl,Jo);function ri(u){this.g=u}w(ri,Bl),ri.prototype.ra=function(){st(this.g,"a")},ri.prototype.qa=function(u){st(this.g,new $l(u))},ri.prototype.pa=function(u){st(this.g,new Hl)},ri.prototype.oa=function(){st(this.g,"b")},Ks.prototype.createWebChannel=Ks.prototype.g,Rt.prototype.send=Rt.prototype.o,Rt.prototype.open=Rt.prototype.m,Rt.prototype.close=Rt.prototype.close,rE=function(){return new Ks},nE=function(){return Kr()},tE=In,ad={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Yr.NO_ERROR=0,Yr.TIMEOUT=8,Yr.HTTP_ERROR=6,Zu=Yr,Jr.COMPLETE="complete",eE=Jr,Rl.EventType=Wr,Wr.OPEN="a",Wr.CLOSE="b",Wr.ERROR="c",Wr.MESSAGE="d",ut.prototype.listen=ut.prototype.J,qa=Rl,He.prototype.listenOnce=He.prototype.K,He.prototype.getLastError=He.prototype.Ha,He.prototype.getLastErrorCode=He.prototype.ya,He.prototype.getStatus=He.prototype.ca,He.prototype.getResponseJson=He.prototype.La,He.prototype.getResponseText=He.prototype.la,He.prototype.send=He.prototype.ea,He.prototype.setWithCredentials=He.prototype.Fa,Zv=He}).apply(typeof ju<"u"?ju:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}jt.UNAUTHENTICATED=new jt(null),jt.GOOGLE_CREDENTIALS=new jt("google-credentials-uid"),jt.FIRST_PARTY=new jt("first-party-uid"),jt.MOCK_USER=new jt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zo="12.12.0";function zC(n){zo=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new Lc("@firebase/firestore");function go(){return ms.logLevel}function re(n,...e){if(ms.logLevel<=Ce.DEBUG){const t=e.map(qd);ms.debug(`Firestore (${zo}): ${n}`,...t)}}function jr(n,...e){if(ms.logLevel<=Ce.ERROR){const t=e.map(qd);ms.error(`Firestore (${zo}): ${n}`,...t)}}function gs(n,...e){if(ms.logLevel<=Ce.WARN){const t=e.map(qd);ms.warn(`Firestore (${zo}): ${n}`,...t)}}function qd(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,iE(n,i,t)}function iE(n,e,t){let i=`FIRESTORE (${zo}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw jr(i),new Error(i)}function je(n,e,t,i){let o="Unexpected state";typeof t=="string"?o=t:i=t,n||iE(e,o,i)}function Te(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ie extends zn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class BC{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(jt.UNAUTHENTICATED)))}shutdown(){}}class $C{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class HC{constructor(e){this.t=e,this.currentUser=jt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){je(this.o===void 0,42304);let i=this.i;const o=g=>this.i!==i?(i=this.i,t(g)):Promise.resolve();let l=new Pi;this.o=()=>{this.i++,this.currentUser=this.u(),l.resolve(),l=new Pi,e.enqueueRetryable((()=>o(this.currentUser)))};const h=()=>{const g=l;e.enqueueRetryable((async()=>{await g.promise,await o(this.currentUser)}))},d=g=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=g,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit((g=>d(g))),setTimeout((()=>{if(!this.auth){const g=this.t.getImmediate({optional:!0});g?d(g):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),l.resolve(),l=new Pi)}}),0),h()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(je(typeof i.accessToken=="string",31837,{l:i}),new sE(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return je(e===null||typeof e=="string",2055,{h:e}),new jt(e)}}class qC{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=jt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class WC{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new qC(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(jt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ny{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class KC{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,xn(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){je(this.o===void 0,3512);const i=l=>{l.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${l.error.message}`);const h=l.token!==this.m;return this.m=l.token,re("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?t(l.token):Promise.resolve()};this.o=l=>{e.enqueueRetryable((()=>i(l)))};const o=l=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=l,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((l=>o(l))),setTimeout((()=>{if(!this.appCheck){const l=this.V.getImmediate({optional:!0});l?o(l):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Ny(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(je(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ny(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const o=GC(40);for(let l=0;l<o.length;++l)i.length<20&&o[l]<t&&(i+=e.charAt(o[l]%62))}return i}}function Pe(n,e){return n<e?-1:n>e?1:0}function ld(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const o=n.charAt(i),l=e.charAt(i);if(o!==l)return $f(o)===$f(l)?Pe(o,l):$f(o)?1:-1}return Pe(n.length,e.length)}const QC=55296,YC=57343;function $f(n){const e=n.charCodeAt(0);return e>=QC&&e<=YC}function No(n,e,t){return n.length===e.length&&n.every(((i,o)=>t(i,e[o])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy="__name__";class or{constructor(e,t,i){t===void 0?t=0:t>e.length&&ge(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&ge(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return or.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof or?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let o=0;o<i;o++){const l=or.compareSegments(e.get(o),t.get(o));if(l!==0)return l}return Pe(e.length,t.length)}static compareSegments(e,t){const i=or.isNumericId(e),o=or.isNumericId(t);return i&&!o?-1:!i&&o?1:i&&o?or.extractNumericId(e).compare(or.extractNumericId(t)):ld(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ci.fromString(e.substring(4,e.length-2))}}class We extends or{construct(e,t,i){return new We(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new ie(q.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((o=>o.length>0)))}return new We(t)}static emptyPath(){return new We([])}}const JC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Nt extends or{construct(e,t,i){return new Nt(e,t,i)}static isValidIdentifier(e){return JC.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Nt.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Dy}static keyField(){return new Nt([Dy])}static fromServerFormat(e){const t=[];let i="",o=0;const l=()=>{if(i.length===0)throw new ie(q.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let h=!1;for(;o<e.length;){const d=e[o];if(d==="\\"){if(o+1===e.length)throw new ie(q.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const g=e[o+1];if(g!=="\\"&&g!=="."&&g!=="`")throw new ie(q.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=g,o+=2}else d==="`"?(h=!h,o++):d!=="."||h?(i+=d,o++):(l(),o++)}if(l(),h)throw new ie(q.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Nt(t)}static emptyPath(){return new Nt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.path=e}static fromPath(e){return new he(We.fromString(e))}static fromName(e){return new he(We.fromString(e).popFirst(5))}static empty(){return new he(We.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&We.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return We.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new he(new We(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oE(n,e,t){if(!t)throw new ie(q.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function XC(n,e,t,i){if(e===!0&&i===!0)throw new ie(q.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function xy(n){if(!he.isDocumentKey(n))throw new ie(q.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Vy(n){if(he.isDocumentKey(n))throw new ie(q.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function aE(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function jc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(i){return i.constructor?i.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ge(12329,{type:typeof n})}function gc(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new ie(q.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=jc(n);throw new ie(q.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n,e){const t={typeString:n};return e&&(t.value=e),t}function gl(n,e){if(!aE(n))throw new ie(q.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const o=e[i].typeString,l="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const h=n[i];if(o&&typeof h!==o){t=`JSON field '${i}' must be a ${o}.`;break}if(l!==void 0&&h!==l.value){t=`Expected '${i}' field to equal '${l.value}'`;break}}if(t)throw new ie(q.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy=-62135596800,Ly=1e6;class Ye{static now(){return Ye.fromMillis(Date.now())}static fromDate(e){return Ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Ly);return new Ye(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new ie(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new ie(q.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Oy)throw new ie(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ie(q.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ly}_compareTo(e){return this.seconds===e.seconds?Pe(this.nanoseconds,e.nanoseconds):Pe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ye._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(gl(e,Ye._jsonSchema))return new Ye(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Oy;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ye._jsonSchemaVersion="firestore/timestamp/1.0",Ye._jsonSchema={type:pt("string",Ye._jsonSchemaVersion),seconds:pt("number"),nanoseconds:pt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{static fromTimestamp(e){return new Ee(e)}static min(){return new Ee(new Ye(0,0))}static max(){return new Ee(new Ye(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl=-1;function ZC(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,o=Ee.fromTimestamp(i===1e9?new Ye(t+1,0):new Ye(t,i));return new Di(o,he.empty(),e)}function eP(n){return new Di(n.readTime,n.key,rl)}class Di{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Di(Ee.min(),he.empty(),rl)}static max(){return new Di(Ee.max(),he.empty(),rl)}}function tP(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=he.comparator(n.documentKey,e.documentKey),t!==0?t:Pe(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nP="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rP{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bo(n){if(n.code!==q.FAILED_PRECONDITION||n.message!==nP)throw n;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ge(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new W(((i,o)=>{this.nextCallback=l=>{this.wrapSuccess(e,l).next(i,o)},this.catchCallback=l=>{this.wrapFailure(t,l).next(i,o)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof W?t:W.resolve(t)}catch(t){return W.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):W.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):W.reject(t)}static resolve(e){return new W(((t,i)=>{t(e)}))}static reject(e){return new W(((t,i)=>{i(e)}))}static waitFor(e){return new W(((t,i)=>{let o=0,l=0,h=!1;e.forEach((d=>{++o,d.next((()=>{++l,h&&l===o&&t()}),(g=>i(g)))})),h=!0,l===o&&t()}))}static or(e){let t=W.resolve(!1);for(const i of e)t=t.next((o=>o?W.resolve(o):i()));return t}static forEach(e,t){const i=[];return e.forEach(((o,l)=>{i.push(t.call(this,o,l))})),this.waitFor(i)}static mapArray(e,t){return new W(((i,o)=>{const l=e.length,h=new Array(l);let d=0;for(let g=0;g<l;g++){const y=g;t(e[y]).next((E=>{h[y]=E,++d,d===l&&i(h)}),(E=>o(E)))}}))}static doWhile(e,t){return new W(((i,o)=>{const l=()=>{e()===!0?t().next((()=>{l()}),o):i()};l()}))}}function iP(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $o(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>t.writeSequenceNumber(i))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}zc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=-1;function Bc(n){return n==null}function yc(n){return n===0&&1/n==-1/0}function sP(n){return typeof n=="number"&&Number.isInteger(n)&&!yc(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lE="";function oP(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=My(e)),e=aP(n.get(t),e);return My(e)}function aP(n,e){let t=e;const i=n.length;for(let o=0;o<i;o++){const l=n.charAt(o);switch(l){case"\0":t+="";break;case lE:t+="";break;default:t+=l}}return t}function My(n){return n+lE+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function by(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Is(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function uE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t){this.comparator=e,this.root=t||kt.EMPTY}insert(e,t){return new nt(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,kt.BLACK,null,null))}remove(e){return new nt(this.comparator,this.root.remove(e,this.comparator).copy(null,null,kt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const o=this.comparator(e,i.key);if(o===0)return t+i.left.size;o<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,i)=>(e(t,i),!1)))}toString(){const e=[];return this.inorderTraversal(((t,i)=>(e.push(`${t}:${i}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new zu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new zu(this.root,e,this.comparator,!1)}getReverseIterator(){return new zu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new zu(this.root,e,this.comparator,!0)}}class zu{constructor(e,t,i,o){this.isReverse=o,this.nodeStack=[];let l=1;for(;!e.isEmpty();)if(l=t?i(e.key,t):1,t&&o&&(l*=-1),l<0)e=this.isReverse?e.left:e.right;else{if(l===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class kt{constructor(e,t,i,o,l){this.key=e,this.value=t,this.color=i??kt.RED,this.left=o??kt.EMPTY,this.right=l??kt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,o,l){return new kt(e??this.key,t??this.value,i??this.color,o??this.left,l??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let o=this;const l=i(e,o.key);return o=l<0?o.copy(null,null,null,o.left.insert(e,t,i),null):l===0?o.copy(null,t,null,null,null):o.copy(null,null,null,null,o.right.insert(e,t,i)),o.fixUp()}removeMin(){if(this.left.isEmpty())return kt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,o=this;if(t(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,t),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),t(e,o.key)===0){if(o.right.isEmpty())return kt.EMPTY;i=o.right.min(),o=o.copy(i.key,i.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,t))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,kt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,kt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ge(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ge(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ge(27949);return e+(this.isRed()?0:1)}}kt.EMPTY=null,kt.RED=!0,kt.BLACK=!1;kt.EMPTY=new class{constructor(){this.size=0}get key(){throw ge(57766)}get value(){throw ge(16141)}get color(){throw ge(16727)}get left(){throw ge(29726)}get right(){throw ge(36894)}copy(e,t,i,o,l){return this}insert(e,t,i){return new kt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e){this.comparator=e,this.data=new nt(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,i)=>(e(t),!1)))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const o=i.getNext();if(this.comparator(o.key,e[1])>=0)return;t(o.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Fy(this.data.getIterator())}getIteratorFrom(e){return new Fy(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((i=>{t=t.add(i)})),t}isEqual(e){if(!(e instanceof yt)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=i.getNext().key;if(this.comparator(o,l)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new yt(this.comparator);return t.data=e,t}}class Fy{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.fields=e,e.sort(Nt.comparator)}static empty(){return new On([])}unionWith(e){let t=new yt(Nt.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new On(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return No(this.fields,e.fields,((t,i)=>t.isEqual(i)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(o){try{return atob(o)}catch(l){throw typeof DOMException<"u"&&l instanceof DOMException?new cE("Invalid base64 string: "+l):l}})(e);return new xt(t)}static fromUint8Array(e){const t=(function(o){let l="";for(let h=0;h<o.length;++h)l+=String.fromCharCode(o[h]);return l})(e);return new xt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let o=0;o<t.length;o++)i[o]=t.charCodeAt(o);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Pe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}xt.EMPTY_BYTE_STRING=new xt("");const lP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xi(n){if(je(!!n,39018),typeof n=="string"){let e=0;const t=lP.exec(n);if(je(!!t,46558,{timestamp:n}),t[1]){let o=t[1];o=(o+"000000000").substr(0,9),e=Number(o)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:lt(n.seconds),nanos:lt(n.nanos)}}function lt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vi(n){return typeof n=="string"?xt.fromBase64String(n):xt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE="server_timestamp",fE="__type__",dE="__previous_value__",pE="__local_write_time__";function Gd(n){var t,i;return((i=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[fE])==null?void 0:i.stringValue)===hE}function $c(n){const e=n.mapValue.fields[dE];return Gd(e)?$c(e):e}function il(n){const e=xi(n.mapValue.fields[pE].timestampValue);return new Ye(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uP{constructor(e,t,i,o,l,h,d,g,y,E,w){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=o,this.ssl=l,this.forceLongPolling=h,this.autoDetectLongPolling=d,this.longPollingOptions=g,this.useFetchStreams=y,this.isUsingEmulator=E,this.apiKey=w}}const _c="(default)";class sl{constructor(e,t){this.projectId=e,this.database=t||_c}static empty(){return new sl("","")}get isDefaultDatabase(){return this.database===_c}isEqual(e){return e instanceof sl&&e.projectId===this.projectId&&e.database===this.database}}function cP(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new ie(q.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new sl(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE="__type__",hP="__max__",Bu={mapValue:{}},gE="__vector__",vc="value";function Oi(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Gd(n)?4:dP(n)?9007199254740991:fP(n)?10:11:ge(28295,{value:n})}function dr(n,e){if(n===e)return!0;const t=Oi(n);if(t!==Oi(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return il(n).isEqual(il(e));case 3:return(function(o,l){if(typeof o.timestampValue=="string"&&typeof l.timestampValue=="string"&&o.timestampValue.length===l.timestampValue.length)return o.timestampValue===l.timestampValue;const h=xi(o.timestampValue),d=xi(l.timestampValue);return h.seconds===d.seconds&&h.nanos===d.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(o,l){return Vi(o.bytesValue).isEqual(Vi(l.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(o,l){return lt(o.geoPointValue.latitude)===lt(l.geoPointValue.latitude)&&lt(o.geoPointValue.longitude)===lt(l.geoPointValue.longitude)})(n,e);case 2:return(function(o,l){if("integerValue"in o&&"integerValue"in l)return lt(o.integerValue)===lt(l.integerValue);if("doubleValue"in o&&"doubleValue"in l){const h=lt(o.doubleValue),d=lt(l.doubleValue);return h===d?yc(h)===yc(d):isNaN(h)&&isNaN(d)}return!1})(n,e);case 9:return No(n.arrayValue.values||[],e.arrayValue.values||[],dr);case 10:case 11:return(function(o,l){const h=o.mapValue.fields||{},d=l.mapValue.fields||{};if(by(h)!==by(d))return!1;for(const g in h)if(h.hasOwnProperty(g)&&(d[g]===void 0||!dr(h[g],d[g])))return!1;return!0})(n,e);default:return ge(52216,{left:n})}}function ol(n,e){return(n.values||[]).find((t=>dr(t,e)))!==void 0}function Do(n,e){if(n===e)return 0;const t=Oi(n),i=Oi(e);if(t!==i)return Pe(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return Pe(n.booleanValue,e.booleanValue);case 2:return(function(l,h){const d=lt(l.integerValue||l.doubleValue),g=lt(h.integerValue||h.doubleValue);return d<g?-1:d>g?1:d===g?0:isNaN(d)?isNaN(g)?0:-1:1})(n,e);case 3:return Uy(n.timestampValue,e.timestampValue);case 4:return Uy(il(n),il(e));case 5:return ld(n.stringValue,e.stringValue);case 6:return(function(l,h){const d=Vi(l),g=Vi(h);return d.compareTo(g)})(n.bytesValue,e.bytesValue);case 7:return(function(l,h){const d=l.split("/"),g=h.split("/");for(let y=0;y<d.length&&y<g.length;y++){const E=Pe(d[y],g[y]);if(E!==0)return E}return Pe(d.length,g.length)})(n.referenceValue,e.referenceValue);case 8:return(function(l,h){const d=Pe(lt(l.latitude),lt(h.latitude));return d!==0?d:Pe(lt(l.longitude),lt(h.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return jy(n.arrayValue,e.arrayValue);case 10:return(function(l,h){var A,b,H,$;const d=l.fields||{},g=h.fields||{},y=(A=d[vc])==null?void 0:A.arrayValue,E=(b=g[vc])==null?void 0:b.arrayValue,w=Pe(((H=y==null?void 0:y.values)==null?void 0:H.length)||0,(($=E==null?void 0:E.values)==null?void 0:$.length)||0);return w!==0?w:jy(y,E)})(n.mapValue,e.mapValue);case 11:return(function(l,h){if(l===Bu.mapValue&&h===Bu.mapValue)return 0;if(l===Bu.mapValue)return 1;if(h===Bu.mapValue)return-1;const d=l.fields||{},g=Object.keys(d),y=h.fields||{},E=Object.keys(y);g.sort(),E.sort();for(let w=0;w<g.length&&w<E.length;++w){const A=ld(g[w],E[w]);if(A!==0)return A;const b=Do(d[g[w]],y[E[w]]);if(b!==0)return b}return Pe(g.length,E.length)})(n.mapValue,e.mapValue);default:throw ge(23264,{he:t})}}function Uy(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Pe(n,e);const t=xi(n),i=xi(e),o=Pe(t.seconds,i.seconds);return o!==0?o:Pe(t.nanos,i.nanos)}function jy(n,e){const t=n.values||[],i=e.values||[];for(let o=0;o<t.length&&o<i.length;++o){const l=Do(t[o],i[o]);if(l)return l}return Pe(t.length,i.length)}function xo(n){return ud(n)}function ud(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const i=xi(t);return`time(${i.seconds},${i.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Vi(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return he.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let i="[",o=!0;for(const l of t.values||[])o?o=!1:i+=",",i+=ud(l);return i+"]"})(n.arrayValue):"mapValue"in n?(function(t){const i=Object.keys(t.fields||{}).sort();let o="{",l=!0;for(const h of i)l?l=!1:o+=",",o+=`${h}:${ud(t.fields[h])}`;return o+"}"})(n.mapValue):ge(61005,{value:n})}function ec(n){switch(Oi(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=$c(n);return e?16+ec(e):16;case 5:return 2*n.stringValue.length;case 6:return Vi(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(i){return(i.values||[]).reduce(((o,l)=>o+ec(l)),0)})(n.arrayValue);case 10:case 11:return(function(i){let o=0;return Is(i.fields,((l,h)=>{o+=l.length+ec(h)})),o})(n.mapValue);default:throw ge(13486,{value:n})}}function zy(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cd(n){return!!n&&"integerValue"in n}function Qd(n){return!!n&&"arrayValue"in n}function By(n){return!!n&&"nullValue"in n}function $y(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function tc(n){return!!n&&"mapValue"in n}function fP(n){var t,i;return((i=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[mE])==null?void 0:i.stringValue)===gE}function Qa(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Is(n.mapValue.fields,((t,i)=>e.mapValue.fields[t]=Qa(i))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Qa(n.arrayValue.values[t]);return e}return{...n}}function dP(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===hP}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e){this.value=e}static empty(){return new vn({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!tc(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Qa(t)}setAll(e){let t=Nt.emptyPath(),i={},o=[];e.forEach(((h,d)=>{if(!t.isImmediateParentOf(d)){const g=this.getFieldsMap(t);this.applyChanges(g,i,o),i={},o=[],t=d.popLast()}h?i[d.lastSegment()]=Qa(h):o.push(d.lastSegment())}));const l=this.getFieldsMap(t);this.applyChanges(l,i,o)}delete(e){const t=this.field(e.popLast());tc(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return dr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let o=t.mapValue.fields[e.get(i)];tc(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=o),t=o}return t.mapValue.fields}applyChanges(e,t,i){Is(t,((o,l)=>e[o]=l));for(const o of i)delete e[o]}clone(){return new vn(Qa(this.value))}}function yE(n){const e=[];return Is(n.fields,((t,i)=>{const o=new Nt([t]);if(tc(i)){const l=yE(i.mapValue).fields;if(l.length===0)e.push(o);else for(const h of l)e.push(o.child(h))}else e.push(o)})),new On(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t,i,o,l,h,d){this.key=e,this.documentType=t,this.version=i,this.readTime=o,this.createTime=l,this.data=h,this.documentState=d}static newInvalidDocument(e){return new zt(e,0,Ee.min(),Ee.min(),Ee.min(),vn.empty(),0)}static newFoundDocument(e,t,i,o){return new zt(e,1,t,Ee.min(),i,o,0)}static newNoDocument(e,t){return new zt(e,2,t,Ee.min(),Ee.min(),vn.empty(),0)}static newUnknownDocument(e,t){return new zt(e,3,t,Ee.min(),Ee.min(),vn.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Ee.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=vn.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=vn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Ee.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof zt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new zt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,t){this.position=e,this.inclusive=t}}function Hy(n,e,t){let i=0;for(let o=0;o<n.position.length;o++){const l=e[o],h=n.position[o];if(l.field.isKeyField()?i=he.comparator(he.fromName(h.referenceValue),t.key):i=Do(h,t.data.field(l.field)),l.dir==="desc"&&(i*=-1),i!==0)break}return i}function qy(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!dr(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e,t="asc"){this.field=e,this.dir=t}}function pP(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{}class dt extends _E{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new gP(e,t,i):t==="array-contains"?new vP(e,i):t==="in"?new EP(e,i):t==="not-in"?new wP(e,i):t==="array-contains-any"?new TP(e,i):new dt(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new yP(e,i):new _P(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Do(t,this.value)):t!==null&&Oi(this.value)===Oi(t)&&this.matchesComparison(Do(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ge(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class jn extends _E{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new jn(e,t)}matches(e){return vE(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vE(n){return n.op==="and"}function EE(n){return mP(n)&&vE(n)}function mP(n){for(const e of n.filters)if(e instanceof jn)return!1;return!0}function hd(n){if(n instanceof dt)return n.field.canonicalString()+n.op.toString()+xo(n.value);if(EE(n))return n.filters.map((e=>hd(e))).join(",");{const e=n.filters.map((t=>hd(t))).join(",");return`${n.op}(${e})`}}function wE(n,e){return n instanceof dt?(function(i,o){return o instanceof dt&&i.op===o.op&&i.field.isEqual(o.field)&&dr(i.value,o.value)})(n,e):n instanceof jn?(function(i,o){return o instanceof jn&&i.op===o.op&&i.filters.length===o.filters.length?i.filters.reduce(((l,h,d)=>l&&wE(h,o.filters[d])),!0):!1})(n,e):void ge(19439)}function TE(n){return n instanceof dt?(function(t){return`${t.field.canonicalString()} ${t.op} ${xo(t.value)}`})(n):n instanceof jn?(function(t){return t.op.toString()+" {"+t.getFilters().map(TE).join(" ,")+"}"})(n):"Filter"}class gP extends dt{constructor(e,t,i){super(e,t,i),this.key=he.fromName(i.referenceValue)}matches(e){const t=he.comparator(e.key,this.key);return this.matchesComparison(t)}}class yP extends dt{constructor(e,t){super(e,"in",t),this.keys=IE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class _P extends dt{constructor(e,t){super(e,"not-in",t),this.keys=IE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function IE(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((i=>he.fromName(i.referenceValue)))}class vP extends dt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Qd(t)&&ol(t.arrayValue,this.value)}}class EP extends dt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ol(this.value.arrayValue,t)}}class wP extends dt{constructor(e,t){super(e,"not-in",t)}matches(e){if(ol(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ol(this.value.arrayValue,t)}}class TP extends dt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Qd(t)||!t.arrayValue.values)&&t.arrayValue.values.some((i=>ol(this.value.arrayValue,i)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IP{constructor(e,t=null,i=[],o=[],l=null,h=null,d=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=o,this.limit=l,this.startAt=h,this.endAt=d,this.Te=null}}function Wy(n,e=null,t=[],i=[],o=null,l=null,h=null){return new IP(n,e,t,i,o,l,h)}function Yd(n){const e=Te(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((i=>hd(i))).join(","),t+="|ob:",t+=e.orderBy.map((i=>(function(l){return l.field.canonicalString()+l.dir})(i))).join(","),Bc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((i=>xo(i))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((i=>xo(i))).join(",")),e.Te=t}return e.Te}function Jd(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!pP(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!wE(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!qy(n.startAt,e.startAt)&&qy(n.endAt,e.endAt)}function fd(n){return he.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,t=null,i=[],o=[],l=null,h="F",d=null,g=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=o,this.limit=l,this.limitType=h,this.startAt=d,this.endAt=g,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function SP(n,e,t,i,o,l,h,d){return new yl(n,e,t,i,o,l,h,d)}function SE(n){return new yl(n)}function Ky(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function RP(n){return he.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function RE(n){return n.collectionGroup!==null}function Ya(n){const e=Te(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const l of e.explicitOrderBy)e.Ee.push(l),t.add(l.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(h){let d=new yt(Nt.comparator);return h.filters.forEach((g=>{g.getFlattenedFilters().forEach((y=>{y.isInequality()&&(d=d.add(y.field))}))})),d})(e).forEach((l=>{t.has(l.canonicalString())||l.isKeyField()||e.Ee.push(new wc(l,i))})),t.has(Nt.keyField().canonicalString())||e.Ee.push(new wc(Nt.keyField(),i))}return e.Ee}function ur(n){const e=Te(n);return e.Ie||(e.Ie=AP(e,Ya(n))),e.Ie}function AP(n,e){if(n.limitType==="F")return Wy(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((o=>{const l=o.dir==="desc"?"asc":"desc";return new wc(o.field,l)}));const t=n.endAt?new Ec(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Ec(n.startAt.position,n.startAt.inclusive):null;return Wy(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function dd(n,e){const t=n.filters.concat([e]);return new yl(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function pd(n,e,t){return new yl(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Hc(n,e){return Jd(ur(n),ur(e))&&n.limitType===e.limitType}function AE(n){return`${Yd(ur(n))}|lt:${n.limitType}`}function yo(n){return`Query(target=${(function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map((o=>TE(o))).join(", ")}]`),Bc(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map((o=>(function(h){return`${h.field.canonicalString()} (${h.dir})`})(o))).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map((o=>xo(o))).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map((o=>xo(o))).join(",")),`Target(${i})`})(ur(n))}; limitType=${n.limitType})`}function qc(n,e){return e.isFoundDocument()&&(function(i,o){const l=o.key.path;return i.collectionGroup!==null?o.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(l):he.isDocumentKey(i.path)?i.path.isEqual(l):i.path.isImmediateParentOf(l)})(n,e)&&(function(i,o){for(const l of Ya(i))if(!l.field.isKeyField()&&o.data.field(l.field)===null)return!1;return!0})(n,e)&&(function(i,o){for(const l of i.filters)if(!l.matches(o))return!1;return!0})(n,e)&&(function(i,o){return!(i.startAt&&!(function(h,d,g){const y=Hy(h,d,g);return h.inclusive?y<=0:y<0})(i.startAt,Ya(i),o)||i.endAt&&!(function(h,d,g){const y=Hy(h,d,g);return h.inclusive?y>=0:y>0})(i.endAt,Ya(i),o))})(n,e)}function CP(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function CE(n){return(e,t)=>{let i=!1;for(const o of Ya(n)){const l=PP(o,e,t);if(l!==0)return l;i=i||o.field.isKeyField()}return 0}}function PP(n,e,t){const i=n.field.isKeyField()?he.comparator(e.key,t.key):(function(l,h,d){const g=h.data.field(l),y=d.data.field(l);return g!==null&&y!==null?Do(g,y):ge(42886)})(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return ge(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[o,l]of i)if(this.equalsFn(o,e))return l}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),o=this.inner[i];if(o===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let l=0;l<o.length;l++)if(this.equalsFn(o[l][0],e))return void(o[l]=[e,t]);o.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return i.length===1?delete this.inner[t]:i.splice(o,1),this.innerSize--,!0;return!1}forEach(e){Is(this.inner,((t,i)=>{for(const[o,l]of i)e(o,l)}))}isEmpty(){return uE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kP=new nt(he.comparator);function zr(){return kP}const PE=new nt(he.comparator);function Wa(...n){let e=PE;for(const t of n)e=e.insert(t.key,t);return e}function kE(n){let e=PE;return n.forEach(((t,i)=>e=e.insert(t,i.overlayedDocument))),e}function fs(){return Ja()}function NE(){return Ja()}function Ja(){return new Ss((n=>n.toString()),((n,e)=>n.isEqual(e)))}const NP=new nt(he.comparator),DP=new yt(he.comparator);function ke(...n){let e=DP;for(const t of n)e=e.add(t);return e}const xP=new yt(Pe);function VP(){return xP}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:yc(e)?"-0":e}}function DE(n){return{integerValue:""+n}}function OP(n,e){return sP(e)?DE(e):Xd(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(){this._=void 0}}function LP(n,e,t){return n instanceof Tc?(function(o,l){const h={fields:{[fE]:{stringValue:hE},[pE]:{timestampValue:{seconds:o.seconds,nanos:o.nanoseconds}}}};return l&&Gd(l)&&(l=$c(l)),l&&(h.fields[dE]=l),{mapValue:h}})(t,e):n instanceof al?VE(n,e):n instanceof ll?OE(n,e):(function(o,l){const h=xE(o,l),d=Gy(h)+Gy(o.Ae);return cd(h)&&cd(o.Ae)?DE(d):Xd(o.serializer,d)})(n,e)}function MP(n,e,t){return n instanceof al?VE(n,e):n instanceof ll?OE(n,e):t}function xE(n,e){return n instanceof Ic?(function(i){return cd(i)||(function(l){return!!l&&"doubleValue"in l})(i)})(e)?e:{integerValue:0}:null}class Tc extends Wc{}class al extends Wc{constructor(e){super(),this.elements=e}}function VE(n,e){const t=LE(e);for(const i of n.elements)t.some((o=>dr(o,i)))||t.push(i);return{arrayValue:{values:t}}}class ll extends Wc{constructor(e){super(),this.elements=e}}function OE(n,e){let t=LE(e);for(const i of n.elements)t=t.filter((o=>!dr(o,i)));return{arrayValue:{values:t}}}class Ic extends Wc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Gy(n){return lt(n.integerValue||n.doubleValue)}function LE(n){return Qd(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function bP(n,e){return n.field.isEqual(e.field)&&(function(i,o){return i instanceof al&&o instanceof al||i instanceof ll&&o instanceof ll?No(i.elements,o.elements,dr):i instanceof Ic&&o instanceof Ic?dr(i.Ae,o.Ae):i instanceof Tc&&o instanceof Tc})(n.transform,e.transform)}class FP{constructor(e,t){this.version=e,this.transformResults=t}}class Mr{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Mr}static exists(e){return new Mr(void 0,e)}static updateTime(e){return new Mr(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function nc(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Kc{}function ME(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new FE(n.key,Mr.none()):new _l(n.key,n.data,Mr.none());{const t=n.data,i=vn.empty();let o=new yt(Nt.comparator);for(let l of e.fields)if(!o.has(l)){let h=t.field(l);h===null&&l.length>1&&(l=l.popLast(),h=t.field(l)),h===null?i.delete(l):i.set(l,h),o=o.add(l)}return new Rs(n.key,i,new On(o.toArray()),Mr.none())}}function UP(n,e,t){n instanceof _l?(function(o,l,h){const d=o.value.clone(),g=Yy(o.fieldTransforms,l,h.transformResults);d.setAll(g),l.convertToFoundDocument(h.version,d).setHasCommittedMutations()})(n,e,t):n instanceof Rs?(function(o,l,h){if(!nc(o.precondition,l))return void l.convertToUnknownDocument(h.version);const d=Yy(o.fieldTransforms,l,h.transformResults),g=l.data;g.setAll(bE(o)),g.setAll(d),l.convertToFoundDocument(h.version,g).setHasCommittedMutations()})(n,e,t):(function(o,l,h){l.convertToNoDocument(h.version).setHasCommittedMutations()})(0,e,t)}function Xa(n,e,t,i){return n instanceof _l?(function(l,h,d,g){if(!nc(l.precondition,h))return d;const y=l.value.clone(),E=Jy(l.fieldTransforms,g,h);return y.setAll(E),h.convertToFoundDocument(h.version,y).setHasLocalMutations(),null})(n,e,t,i):n instanceof Rs?(function(l,h,d,g){if(!nc(l.precondition,h))return d;const y=Jy(l.fieldTransforms,g,h),E=h.data;return E.setAll(bE(l)),E.setAll(y),h.convertToFoundDocument(h.version,E).setHasLocalMutations(),d===null?null:d.unionWith(l.fieldMask.fields).unionWith(l.fieldTransforms.map((w=>w.field)))})(n,e,t,i):(function(l,h,d){return nc(l.precondition,h)?(h.convertToNoDocument(h.version).setHasLocalMutations(),null):d})(n,e,t)}function jP(n,e){let t=null;for(const i of n.fieldTransforms){const o=e.data.field(i.field),l=xE(i.transform,o||null);l!=null&&(t===null&&(t=vn.empty()),t.set(i.field,l))}return t||null}function Qy(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(i,o){return i===void 0&&o===void 0||!(!i||!o)&&No(i,o,((l,h)=>bP(l,h)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class _l extends Kc{constructor(e,t,i,o=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=o,this.type=0}getFieldMask(){return null}}class Rs extends Kc{constructor(e,t,i,o,l=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=o,this.fieldTransforms=l,this.type=1}getFieldMask(){return this.fieldMask}}function bE(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}})),e}function Yy(n,e,t){const i=new Map;je(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let o=0;o<t.length;o++){const l=n[o],h=l.transform,d=e.data.field(l.field);i.set(l.field,MP(h,d,t[o]))}return i}function Jy(n,e,t){const i=new Map;for(const o of n){const l=o.transform,h=t.data.field(o.field);i.set(o.field,LP(l,h,e))}return i}class FE extends Kc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class zP extends Kc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BP{constructor(e,t,i,o){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=o}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let o=0;o<this.mutations.length;o++){const l=this.mutations[o];l.key.isEqual(e.key)&&UP(l,e,i[o])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Xa(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Xa(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=NE();return this.mutations.forEach((o=>{const l=e.get(o.key),h=l.overlayedDocument;let d=this.applyToLocalView(h,l.mutatedFields);d=t.has(o.key)?null:d;const g=ME(h,d);g!==null&&i.set(o.key,g),h.isValidDocument()||h.convertToNoDocument(Ee.min())})),i}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ke())}isEqual(e){return this.batchId===e.batchId&&No(this.mutations,e.mutations,((t,i)=>Qy(t,i)))&&No(this.baseMutations,e.baseMutations,((t,i)=>Qy(t,i)))}}class Zd{constructor(e,t,i,o){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=o}static from(e,t,i){je(e.mutations.length===i.length,58842,{me:e.mutations.length,fe:i.length});let o=(function(){return NP})();const l=e.mutations;for(let h=0;h<l.length;h++)o=o.insert(l[h].key,i[h].version);return new Zd(e,t,i,o)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $P{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HP{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ft,Ve;function qP(n){switch(n){case q.OK:return ge(64938);case q.CANCELLED:case q.UNKNOWN:case q.DEADLINE_EXCEEDED:case q.RESOURCE_EXHAUSTED:case q.INTERNAL:case q.UNAVAILABLE:case q.UNAUTHENTICATED:return!1;case q.INVALID_ARGUMENT:case q.NOT_FOUND:case q.ALREADY_EXISTS:case q.PERMISSION_DENIED:case q.FAILED_PRECONDITION:case q.ABORTED:case q.OUT_OF_RANGE:case q.UNIMPLEMENTED:case q.DATA_LOSS:return!0;default:return ge(15467,{code:n})}}function UE(n){if(n===void 0)return jr("GRPC error has no .code"),q.UNKNOWN;switch(n){case ft.OK:return q.OK;case ft.CANCELLED:return q.CANCELLED;case ft.UNKNOWN:return q.UNKNOWN;case ft.DEADLINE_EXCEEDED:return q.DEADLINE_EXCEEDED;case ft.RESOURCE_EXHAUSTED:return q.RESOURCE_EXHAUSTED;case ft.INTERNAL:return q.INTERNAL;case ft.UNAVAILABLE:return q.UNAVAILABLE;case ft.UNAUTHENTICATED:return q.UNAUTHENTICATED;case ft.INVALID_ARGUMENT:return q.INVALID_ARGUMENT;case ft.NOT_FOUND:return q.NOT_FOUND;case ft.ALREADY_EXISTS:return q.ALREADY_EXISTS;case ft.PERMISSION_DENIED:return q.PERMISSION_DENIED;case ft.FAILED_PRECONDITION:return q.FAILED_PRECONDITION;case ft.ABORTED:return q.ABORTED;case ft.OUT_OF_RANGE:return q.OUT_OF_RANGE;case ft.UNIMPLEMENTED:return q.UNIMPLEMENTED;case ft.DATA_LOSS:return q.DATA_LOSS;default:return ge(39323,{code:n})}}(Ve=ft||(ft={}))[Ve.OK=0]="OK",Ve[Ve.CANCELLED=1]="CANCELLED",Ve[Ve.UNKNOWN=2]="UNKNOWN",Ve[Ve.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ve[Ve.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ve[Ve.NOT_FOUND=5]="NOT_FOUND",Ve[Ve.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ve[Ve.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ve[Ve.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ve[Ve.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ve[Ve.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ve[Ve.ABORTED=10]="ABORTED",Ve[Ve.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ve[Ve.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ve[Ve.INTERNAL=13]="INTERNAL",Ve[Ve.UNAVAILABLE=14]="UNAVAILABLE",Ve[Ve.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WP(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KP=new Ci([4294967295,4294967295],0);function Xy(n){const e=WP().encode(n),t=new Xv;return t.update(e),new Uint8Array(t.digest())}function Zy(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),o=e.getUint32(8,!0),l=e.getUint32(12,!0);return[new Ci([t,i],0),new Ci([o,l],0)]}class ep{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new Ka(`Invalid padding: ${t}`);if(i<0)throw new Ka(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Ka(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new Ka(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ci.fromNumber(this.ge)}ye(e,t,i){let o=e.add(t.multiply(Ci.fromNumber(i)));return o.compare(KP)===1&&(o=new Ci([o.getBits(0),o.getBits(1)],0)),o.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Xy(e),[i,o]=Zy(t);for(let l=0;l<this.hashCount;l++){const h=this.ye(i,o,l);if(!this.we(h))return!1}return!0}static create(e,t,i){const o=e%8==0?0:8-e%8,l=new Uint8Array(Math.ceil(e/8)),h=new ep(l,o,t);return i.forEach((d=>h.insert(d))),h}insert(e){if(this.ge===0)return;const t=Xy(e),[i,o]=Zy(t);for(let l=0;l<this.hashCount;l++){const h=this.ye(i,o,l);this.Se(h)}}Se(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class Ka extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{constructor(e,t,i,o,l){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=o,this.resolvedLimboDocuments=l}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const o=new Map;return o.set(e,vl.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new Gc(Ee.min(),o,new nt(Pe),zr(),ke())}}class vl{constructor(e,t,i,o,l){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=o,this.removedDocuments=l}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new vl(i,t,ke(),ke(),ke())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e,t,i,o){this.be=e,this.removedTargetIds=t,this.key=i,this.De=o}}class jE{constructor(e,t){this.targetId=e,this.Ce=t}}class zE{constructor(e,t,i=xt.EMPTY_BYTE_STRING,o=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=o}}class e_{constructor(){this.ve=0,this.Fe=t_(),this.Me=xt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=ke(),t=ke(),i=ke();return this.Fe.forEach(((o,l)=>{switch(l){case 0:e=e.add(o);break;case 2:t=t.add(o);break;case 1:i=i.add(o);break;default:ge(38017,{changeType:l})}})),new vl(this.Me,this.xe,e,t,i)}qe(){this.Oe=!1,this.Fe=t_()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,je(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class GP{constructor(e){this.Ge=e,this.ze=new Map,this.je=zr(),this.Je=$u(),this.He=$u(),this.Ze=new nt(Pe)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const i=this.nt(t);switch(e.state){case 0:this.rt(t)&&i.Le(e.resumeToken);break;case 1:i.We(),i.Ne||i.qe(),i.Le(e.resumeToken);break;case 2:i.We(),i.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(i.Qe(),i.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),i.Le(e.resumeToken));break;default:ge(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((i,o)=>{this.rt(o)&&t(o)}))}st(e){const t=e.targetId,i=e.Ce.count,o=this.ot(t);if(o){const l=o.target;if(fd(l))if(i===0){const h=new he(l.path);this.et(t,h,zt.newNoDocument(h,Ee.min()))}else je(i===1,20013,{expectedCount:i});else{const h=this._t(t);if(h!==i){const d=this.ut(e),g=d?this.ct(d,e,h):1;if(g!==0){this.it(t);const y=g===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,y)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:o=0},hashCount:l=0}=t;let h,d;try{h=Vi(i).toUint8Array()}catch(g){if(g instanceof cE)return gs("Decoding the base64 bloom filter in existence filter failed ("+g.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw g}try{d=new ep(h,o,l)}catch(g){return gs(g instanceof Ka?"BloomFilter error: ":"Applying bloom filter failed: ",g),null}return d.ge===0?null:d}ct(e,t,i){return t.Ce.count===i-this.Pt(e,t.targetId)?0:2}Pt(e,t){const i=this.Ge.getRemoteKeysForTarget(t);let o=0;return i.forEach((l=>{const h=this.Ge.ht(),d=`projects/${h.projectId}/databases/${h.database}/documents/${l.path.canonicalString()}`;e.mightContain(d)||(this.et(t,l,null),o++)})),o}Tt(e){const t=new Map;this.ze.forEach(((l,h)=>{const d=this.ot(h);if(d){if(l.current&&fd(d.target)){const g=new he(d.target.path);this.Et(g).has(h)||this.It(h,g)||this.et(h,g,zt.newNoDocument(g,e))}l.Be&&(t.set(h,l.ke()),l.qe())}}));let i=ke();this.He.forEach(((l,h)=>{let d=!0;h.forEachWhile((g=>{const y=this.ot(g);return!y||y.purpose==="TargetPurposeLimboResolution"||(d=!1,!1)})),d&&(i=i.add(l))})),this.je.forEach(((l,h)=>h.setReadTime(e)));const o=new Gc(e,t,this.Ze,this.je,i);return this.je=zr(),this.Je=$u(),this.He=$u(),this.Ze=new nt(Pe),o}Ye(e,t){if(!this.rt(e))return;const i=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,i),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,i){if(!this.rt(e))return;const o=this.nt(e);this.It(e,t)?o.Ke(t,1):o.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),i&&(this.je=this.je.insert(t,i))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new e_,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new yt(Pe),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new yt(Pe),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||re("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new e_),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function $u(){return new nt(he.comparator)}function t_(){return new nt(he.comparator)}const QP={asc:"ASCENDING",desc:"DESCENDING"},YP={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},JP={and:"AND",or:"OR"};class XP{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function md(n,e){return n.useProto3Json||Bc(e)?e:{value:e}}function Sc(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function BE(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ZP(n,e){return Sc(n,e.toTimestamp())}function cr(n){return je(!!n,49232),Ee.fromTimestamp((function(t){const i=xi(t);return new Ye(i.seconds,i.nanos)})(n))}function tp(n,e){return gd(n,e).canonicalString()}function gd(n,e){const t=(function(o){return new We(["projects",o.projectId,"databases",o.database])})(n).child("documents");return e===void 0?t:t.child(e)}function $E(n){const e=We.fromString(n);return je(GE(e),10190,{key:e.toString()}),e}function yd(n,e){return tp(n.databaseId,e.path)}function Hf(n,e){const t=$E(e);if(t.get(1)!==n.databaseId.projectId)throw new ie(q.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new ie(q.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new he(qE(t))}function HE(n,e){return tp(n.databaseId,e)}function ek(n){const e=$E(n);return e.length===4?We.emptyPath():qE(e)}function _d(n){return new We(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function qE(n){return je(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function n_(n,e,t){return{name:yd(n,e),fields:t.value.mapValue.fields}}function tk(n,e){let t;if("targetChange"in e){e.targetChange;const i=(function(y){return y==="NO_CHANGE"?0:y==="ADD"?1:y==="REMOVE"?2:y==="CURRENT"?3:y==="RESET"?4:ge(39313,{state:y})})(e.targetChange.targetChangeType||"NO_CHANGE"),o=e.targetChange.targetIds||[],l=(function(y,E){return y.useProto3Json?(je(E===void 0||typeof E=="string",58123),xt.fromBase64String(E||"")):(je(E===void 0||E instanceof Buffer||E instanceof Uint8Array,16193),xt.fromUint8Array(E||new Uint8Array))})(n,e.targetChange.resumeToken),h=e.targetChange.cause,d=h&&(function(y){const E=y.code===void 0?q.UNKNOWN:UE(y.code);return new ie(E,y.message||"")})(h);t=new zE(i,o,l,d||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const o=Hf(n,i.document.name),l=cr(i.document.updateTime),h=i.document.createTime?cr(i.document.createTime):Ee.min(),d=new vn({mapValue:{fields:i.document.fields}}),g=zt.newFoundDocument(o,l,h,d),y=i.targetIds||[],E=i.removedTargetIds||[];t=new rc(y,E,g.key,g)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const o=Hf(n,i.document),l=i.readTime?cr(i.readTime):Ee.min(),h=zt.newNoDocument(o,l),d=i.removedTargetIds||[];t=new rc([],d,h.key,h)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const o=Hf(n,i.document),l=i.removedTargetIds||[];t=new rc([],l,o,null)}else{if(!("filter"in e))return ge(11601,{Vt:e});{e.filter;const i=e.filter;i.targetId;const{count:o=0,unchangedNames:l}=i,h=new HP(o,l),d=i.targetId;t=new jE(d,h)}}return t}function nk(n,e){let t;if(e instanceof _l)t={update:n_(n,e.key,e.value)};else if(e instanceof FE)t={delete:yd(n,e.key)};else if(e instanceof Rs)t={update:n_(n,e.key,e.data),updateMask:hk(e.fieldMask)};else{if(!(e instanceof zP))return ge(16599,{dt:e.type});t={verify:yd(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((i=>(function(l,h){const d=h.transform;if(d instanceof Tc)return{fieldPath:h.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(d instanceof al)return{fieldPath:h.field.canonicalString(),appendMissingElements:{values:d.elements}};if(d instanceof ll)return{fieldPath:h.field.canonicalString(),removeAllFromArray:{values:d.elements}};if(d instanceof Ic)return{fieldPath:h.field.canonicalString(),increment:d.Ae};throw ge(20930,{transform:h.transform})})(0,i)))),e.precondition.isNone||(t.currentDocument=(function(o,l){return l.updateTime!==void 0?{updateTime:ZP(o,l.updateTime)}:l.exists!==void 0?{exists:l.exists}:ge(27497)})(n,e.precondition)),t}function rk(n,e){return n&&n.length>0?(je(e!==void 0,14353),n.map((t=>(function(o,l){let h=o.updateTime?cr(o.updateTime):cr(l);return h.isEqual(Ee.min())&&(h=cr(l)),new FP(h,o.transformResults||[])})(t,e)))):[]}function ik(n,e){return{documents:[HE(n,e.path)]}}function sk(n,e){const t={structuredQuery:{}},i=e.path;let o;e.collectionGroup!==null?(o=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=HE(n,o);const l=(function(y){if(y.length!==0)return KE(jn.create(y,"and"))})(e.filters);l&&(t.structuredQuery.where=l);const h=(function(y){if(y.length!==0)return y.map((E=>(function(A){return{field:_o(A.field),direction:lk(A.dir)}})(E)))})(e.orderBy);h&&(t.structuredQuery.orderBy=h);const d=md(n,e.limit);return d!==null&&(t.structuredQuery.limit=d),e.startAt&&(t.structuredQuery.startAt=(function(y){return{before:y.inclusive,values:y.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(y){return{before:!y.inclusive,values:y.position}})(e.endAt)),{ft:t,parent:o}}function ok(n){let e=ek(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let o=null;if(i>0){je(i===1,65062);const E=t.from[0];E.allDescendants?o=E.collectionId:e=e.child(E.collectionId)}let l=[];t.where&&(l=(function(w){const A=WE(w);return A instanceof jn&&EE(A)?A.getFilters():[A]})(t.where));let h=[];t.orderBy&&(h=(function(w){return w.map((A=>(function(H){return new wc(vo(H.field),(function(z){switch(z){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(H.direction))})(A)))})(t.orderBy));let d=null;t.limit&&(d=(function(w){let A;return A=typeof w=="object"?w.value:w,Bc(A)?null:A})(t.limit));let g=null;t.startAt&&(g=(function(w){const A=!!w.before,b=w.values||[];return new Ec(b,A)})(t.startAt));let y=null;return t.endAt&&(y=(function(w){const A=!w.before,b=w.values||[];return new Ec(b,A)})(t.endAt)),SP(e,o,h,l,d,"F",g,y)}function ak(n,e){const t=(function(o){switch(o){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ge(28987,{purpose:o})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function WE(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=vo(t.unaryFilter.field);return dt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const o=vo(t.unaryFilter.field);return dt.create(o,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const l=vo(t.unaryFilter.field);return dt.create(l,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const h=vo(t.unaryFilter.field);return dt.create(h,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ge(61313);default:return ge(60726)}})(n):n.fieldFilter!==void 0?(function(t){return dt.create(vo(t.fieldFilter.field),(function(o){switch(o){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ge(58110);default:return ge(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return jn.create(t.compositeFilter.filters.map((i=>WE(i))),(function(o){switch(o){case"AND":return"and";case"OR":return"or";default:return ge(1026)}})(t.compositeFilter.op))})(n):ge(30097,{filter:n})}function lk(n){return QP[n]}function uk(n){return YP[n]}function ck(n){return JP[n]}function _o(n){return{fieldPath:n.canonicalString()}}function vo(n){return Nt.fromServerFormat(n.fieldPath)}function KE(n){return n instanceof dt?(function(t){if(t.op==="=="){if($y(t.value))return{unaryFilter:{field:_o(t.field),op:"IS_NAN"}};if(By(t.value))return{unaryFilter:{field:_o(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if($y(t.value))return{unaryFilter:{field:_o(t.field),op:"IS_NOT_NAN"}};if(By(t.value))return{unaryFilter:{field:_o(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_o(t.field),op:uk(t.op),value:t.value}}})(n):n instanceof jn?(function(t){const i=t.getFilters().map((o=>KE(o)));return i.length===1?i[0]:{compositeFilter:{op:ck(t.op),filters:i}}})(n):ge(54877,{filter:n})}function hk(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function GE(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function QE(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t,i,o,l=Ee.min(),h=Ee.min(),d=xt.EMPTY_BYTE_STRING,g=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=o,this.snapshotVersion=l,this.lastLimboFreeSnapshotVersion=h,this.resumeToken=d,this.expectedCount=g}withSequenceNumber(e){return new Ii(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ii(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ii(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ii(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fk{constructor(e){this.yt=e}}function dk(n){const e=ok({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?pd(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pk{constructor(){this.bn=new mk}addToCollectionParentIndex(e,t){return this.bn.add(t),W.resolve()}getCollectionParents(e,t){return W.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return W.resolve()}deleteFieldIndex(e,t){return W.resolve()}deleteAllFieldIndexes(e){return W.resolve()}createTargetIndexes(e,t){return W.resolve()}getDocumentsMatchingTarget(e,t){return W.resolve(null)}getIndexType(e,t){return W.resolve(0)}getFieldIndexes(e,t){return W.resolve([])}getNextCollectionGroupToUpdate(e){return W.resolve(null)}getMinOffset(e,t){return W.resolve(Di.min())}getMinOffsetFromCollectionGroup(e,t){return W.resolve(Di.min())}updateCollectionGroup(e,t,i){return W.resolve()}updateIndexEntries(e,t){return W.resolve()}}class mk{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t]||new yt(We.comparator),l=!o.has(i);return this.index[t]=o.add(i),l}has(e){const t=e.lastSegment(),i=e.popLast(),o=this.index[t];return o&&o.has(i)}getEntries(e){return(this.index[e]||new yt(We.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},YE=41943040;class Xt{static withCacheSize(e){return new Xt(e,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xt.DEFAULT_COLLECTION_PERCENTILE=10,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xt.DEFAULT=new Xt(YE,Xt.DEFAULT_COLLECTION_PERCENTILE,Xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xt.DISABLED=new Xt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Vo(0)}static ar(){return new Vo(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_="LruGarbageCollector",gk=1048576;function s_([n,e],[t,i]){const o=Pe(n,t);return o===0?Pe(e,i):o}class yk{constructor(e){this.Pr=e,this.buffer=new yt(s_),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();s_(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class _k{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){re(i_,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$o(t)?re(i_,"Ignoring IndexedDB error during garbage collection: ",t):await Bo(t)}await this.Ar(3e5)}))}}class vk{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((i=>Math.floor(t/100*i)))}nthSequenceNumber(e,t){if(t===0)return W.resolve(zc.ce);const i=new yk(t);return this.Vr.forEachTarget(e,(o=>i.Ir(o.sequenceNumber))).next((()=>this.Vr.mr(e,(o=>i.Ir(o))))).next((()=>i.maxValue))}removeTargets(e,t,i){return this.Vr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(re("LruGarbageCollector","Garbage collection skipped; disabled"),W.resolve(r_)):this.getCacheSize(e).next((i=>i<this.params.cacheSizeCollectionThreshold?(re("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),r_):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let i,o,l,h,d,g,y;const E=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((w=>(w>this.params.maximumSequenceNumbersToCollect?(re("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${w}`),o=this.params.maximumSequenceNumbersToCollect):o=w,h=Date.now(),this.nthSequenceNumber(e,o)))).next((w=>(i=w,d=Date.now(),this.removeTargets(e,i,t)))).next((w=>(l=w,g=Date.now(),this.removeOrphanedDocuments(e,i)))).next((w=>(y=Date.now(),go()<=Ce.DEBUG&&re("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${h-E}ms
	Determined least recently used ${o} in `+(d-h)+`ms
	Removed ${l} targets in `+(g-d)+`ms
	Removed ${w} documents in `+(y-g)+`ms
Total Duration: ${y-E}ms`),W.resolve({didRun:!0,sequenceNumbersCollected:o,targetsRemoved:l,documentsRemoved:w}))))}}function Ek(n,e){return new vk(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wk{constructor(){this.changes=new Ss((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,zt.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?W.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tk{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(e,t,i,o){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=o}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next((o=>(i=o,this.remoteDocumentCache.getEntry(e,t)))).next((o=>(i!==null&&Xa(i.mutation,o,On.empty(),Ye.now()),o)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.getLocalViewOfDocuments(e,i,ke()).next((()=>i))))}getLocalViewOfDocuments(e,t,i=ke()){const o=fs();return this.populateOverlays(e,o,t).next((()=>this.computeViews(e,t,o,i).next((l=>{let h=Wa();return l.forEach(((d,g)=>{h=h.insert(d,g.overlayedDocument)})),h}))))}getOverlayedDocuments(e,t){const i=fs();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,ke())))}populateOverlays(e,t,i){const o=[];return i.forEach((l=>{t.has(l)||o.push(l)})),this.documentOverlayCache.getOverlays(e,o).next((l=>{l.forEach(((h,d)=>{t.set(h,d)}))}))}computeViews(e,t,i,o){let l=zr();const h=Ja(),d=(function(){return Ja()})();return t.forEach(((g,y)=>{const E=i.get(y.key);o.has(y.key)&&(E===void 0||E.mutation instanceof Rs)?l=l.insert(y.key,y):E!==void 0?(h.set(y.key,E.mutation.getFieldMask()),Xa(E.mutation,y,E.mutation.getFieldMask(),Ye.now())):h.set(y.key,On.empty())})),this.recalculateAndSaveOverlays(e,l).next((g=>(g.forEach(((y,E)=>h.set(y,E))),t.forEach(((y,E)=>d.set(y,new Tk(E,h.get(y)??null)))),d)))}recalculateAndSaveOverlays(e,t){const i=Ja();let o=new nt(((h,d)=>h-d)),l=ke();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((h=>{for(const d of h)d.keys().forEach((g=>{const y=t.get(g);if(y===null)return;let E=i.get(g)||On.empty();E=d.applyToLocalView(y,E),i.set(g,E);const w=(o.get(d.batchId)||ke()).add(g);o=o.insert(d.batchId,w)}))})).next((()=>{const h=[],d=o.getReverseIterator();for(;d.hasNext();){const g=d.getNext(),y=g.key,E=g.value,w=NE();E.forEach((A=>{if(!l.has(A)){const b=ME(t.get(A),i.get(A));b!==null&&w.set(A,b),l=l.add(A)}})),h.push(this.documentOverlayCache.saveOverlays(e,y,w))}return W.waitFor(h)})).next((()=>i))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((i=>this.recalculateAndSaveOverlays(e,i)))}getDocumentsMatchingQuery(e,t,i,o){return RP(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):RE(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,o):this.getDocumentsMatchingCollectionQuery(e,t,i,o)}getNextDocuments(e,t,i,o){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,o).next((l=>{const h=o-l.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,o-l.size):W.resolve(fs());let d=rl,g=l;return h.next((y=>W.forEach(y,((E,w)=>(d<w.largestBatchId&&(d=w.largestBatchId),l.get(E)?W.resolve():this.remoteDocumentCache.getEntry(e,E).next((A=>{g=g.insert(E,A)}))))).next((()=>this.populateOverlays(e,y,l))).next((()=>this.computeViews(e,g,y,ke()))).next((E=>({batchId:d,changes:kE(E)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new he(t)).next((i=>{let o=Wa();return i.isFoundDocument()&&(o=o.insert(i.key,i)),o}))}getDocumentsMatchingCollectionGroupQuery(e,t,i,o){const l=t.collectionGroup;let h=Wa();return this.indexManager.getCollectionParents(e,l).next((d=>W.forEach(d,(g=>{const y=(function(w,A){return new yl(A,null,w.explicitOrderBy.slice(),w.filters.slice(),w.limit,w.limitType,w.startAt,w.endAt)})(t,g.child(l));return this.getDocumentsMatchingCollectionQuery(e,y,i,o).next((E=>{E.forEach(((w,A)=>{h=h.insert(w,A)}))}))})).next((()=>h))))}getDocumentsMatchingCollectionQuery(e,t,i,o){let l;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next((h=>(l=h,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,l,o)))).next((h=>{l.forEach(((g,y)=>{const E=y.getKey();h.get(E)===null&&(h=h.insert(E,zt.newInvalidDocument(E)))}));let d=Wa();return h.forEach(((g,y)=>{const E=l.get(g);E!==void 0&&Xa(E.mutation,y,On.empty(),Ye.now()),qc(t,y)&&(d=d.insert(g,y))})),d}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return W.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(o){return{id:o.id,version:o.version,createTime:cr(o.createTime)}})(t)),W.resolve()}getNamedQuery(e,t){return W.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(o){return{name:o.name,query:dk(o.bundledQuery),readTime:cr(o.readTime)}})(t)),W.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rk{constructor(){this.overlays=new nt(he.comparator),this.Lr=new Map}getOverlay(e,t){return W.resolve(this.overlays.get(t))}getOverlays(e,t){const i=fs();return W.forEach(t,(o=>this.getOverlay(e,o).next((l=>{l!==null&&i.set(o,l)})))).next((()=>i))}saveOverlays(e,t,i){return i.forEach(((o,l)=>{this.St(e,t,l)})),W.resolve()}removeOverlaysForBatchId(e,t,i){const o=this.Lr.get(i);return o!==void 0&&(o.forEach((l=>this.overlays=this.overlays.remove(l))),this.Lr.delete(i)),W.resolve()}getOverlaysForCollection(e,t,i){const o=fs(),l=t.length+1,h=new he(t.child("")),d=this.overlays.getIteratorFrom(h);for(;d.hasNext();){const g=d.getNext().value,y=g.getKey();if(!t.isPrefixOf(y.path))break;y.path.length===l&&g.largestBatchId>i&&o.set(g.getKey(),g)}return W.resolve(o)}getOverlaysForCollectionGroup(e,t,i,o){let l=new nt(((y,E)=>y-E));const h=this.overlays.getIterator();for(;h.hasNext();){const y=h.getNext().value;if(y.getKey().getCollectionGroup()===t&&y.largestBatchId>i){let E=l.get(y.largestBatchId);E===null&&(E=fs(),l=l.insert(y.largestBatchId,E)),E.set(y.getKey(),y)}}const d=fs(),g=l.getIterator();for(;g.hasNext()&&(g.getNext().value.forEach(((y,E)=>d.set(y,E))),!(d.size()>=o)););return W.resolve(d)}St(e,t,i){const o=this.overlays.get(i.key);if(o!==null){const h=this.Lr.get(o.largestBatchId).delete(i.key);this.Lr.set(o.largestBatchId,h)}this.overlays=this.overlays.insert(i.key,new $P(t,i));let l=this.Lr.get(t);l===void 0&&(l=ke(),this.Lr.set(t,l)),this.Lr.set(t,l.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ak{constructor(){this.sessionToken=xt.EMPTY_BYTE_STRING}getSessionToken(e){return W.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,W.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(){this.kr=new yt(wt.qr),this.Kr=new yt(wt.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const i=new wt(e,t);this.kr=this.kr.add(i),this.Kr=this.Kr.add(i)}$r(e,t){e.forEach((i=>this.addReference(i,t)))}removeReference(e,t){this.Wr(new wt(e,t))}Qr(e,t){e.forEach((i=>this.removeReference(i,t)))}Gr(e){const t=new he(new We([])),i=new wt(t,e),o=new wt(t,e+1),l=[];return this.Kr.forEachInRange([i,o],(h=>{this.Wr(h),l.push(h.key)})),l}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new he(new We([])),i=new wt(t,e),o=new wt(t,e+1);let l=ke();return this.Kr.forEachInRange([i,o],(h=>{l=l.add(h.key)})),l}containsKey(e){const t=new wt(e,0),i=this.kr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class wt{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return he.comparator(e.key,t.key)||Pe(e.Jr,t.Jr)}static Ur(e,t){return Pe(e.Jr,t.Jr)||he.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ck{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new yt(wt.qr)}checkEmpty(e){return W.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,o){const l=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const h=new BP(l,t,i,o);this.mutationQueue.push(h);for(const d of o)this.Hr=this.Hr.add(new wt(d.key,l)),this.indexManager.addToCollectionParentIndex(e,d.key.path.popLast());return W.resolve(h)}lookupMutationBatch(e,t){return W.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,o=this.Xr(i),l=o<0?0:o;return W.resolve(this.mutationQueue.length>l?this.mutationQueue[l]:null)}getHighestUnacknowledgedBatchId(){return W.resolve(this.mutationQueue.length===0?Kd:this.Yn-1)}getAllMutationBatches(e){return W.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new wt(t,0),o=new wt(t,Number.POSITIVE_INFINITY),l=[];return this.Hr.forEachInRange([i,o],(h=>{const d=this.Zr(h.Jr);l.push(d)})),W.resolve(l)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new yt(Pe);return t.forEach((o=>{const l=new wt(o,0),h=new wt(o,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([l,h],(d=>{i=i.add(d.Jr)}))})),W.resolve(this.Yr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,o=i.length+1;let l=i;he.isDocumentKey(l)||(l=l.child(""));const h=new wt(new he(l),0);let d=new yt(Pe);return this.Hr.forEachWhile((g=>{const y=g.key.path;return!!i.isPrefixOf(y)&&(y.length===o&&(d=d.add(g.Jr)),!0)}),h),W.resolve(this.Yr(d))}Yr(e){const t=[];return e.forEach((i=>{const o=this.Zr(i);o!==null&&t.push(o)})),t}removeMutationBatch(e,t){je(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Hr;return W.forEach(t.mutations,(o=>{const l=new wt(o.key,t.batchId);return i=i.delete(l),this.referenceDelegate.markPotentiallyOrphaned(e,o.key)})).next((()=>{this.Hr=i}))}nr(e){}containsKey(e,t){const i=new wt(t,0),o=this.Hr.firstAfterOrEqual(i);return W.resolve(t.isEqual(o&&o.key))}performConsistencyCheck(e){return this.mutationQueue.length,W.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pk{constructor(e){this.ti=e,this.docs=(function(){return new nt(he.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,o=this.docs.get(i),l=o?o.size:0,h=this.ti(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:h}),this.size+=h-l,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return W.resolve(i?i.document.mutableCopy():zt.newInvalidDocument(t))}getEntries(e,t){let i=zr();return t.forEach((o=>{const l=this.docs.get(o);i=i.insert(o,l?l.document.mutableCopy():zt.newInvalidDocument(o))})),W.resolve(i)}getDocumentsMatchingQuery(e,t,i,o){let l=zr();const h=t.path,d=new he(h.child("__id-9223372036854775808__")),g=this.docs.getIteratorFrom(d);for(;g.hasNext();){const{key:y,value:{document:E}}=g.getNext();if(!h.isPrefixOf(y.path))break;y.path.length>h.length+1||tP(eP(E),i)<=0||(o.has(E.key)||qc(t,E))&&(l=l.insert(E.key,E.mutableCopy()))}return W.resolve(l)}getAllFromCollectionGroup(e,t,i,o){ge(9500)}ni(e,t){return W.forEach(this.docs,(i=>t(i)))}newChangeBuffer(e){return new kk(this)}getSize(e){return W.resolve(this.size)}}class kk extends wk{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((i,o)=>{o.isValidDocument()?t.push(this.Mr.addEntry(e,o)):this.Mr.removeEntry(i)})),W.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{constructor(e){this.persistence=e,this.ri=new Ss((t=>Yd(t)),Jd),this.lastRemoteSnapshotVersion=Ee.min(),this.highestTargetId=0,this.ii=0,this.si=new np,this.targetCount=0,this.oi=Vo._r()}forEachTarget(e,t){return this.ri.forEach(((i,o)=>t(o))),W.resolve()}getLastRemoteSnapshotVersion(e){return W.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return W.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),W.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.ii&&(this.ii=t),W.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Vo(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,W.resolve()}updateTargetData(e,t){return this.lr(t),W.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,W.resolve()}removeTargets(e,t,i){let o=0;const l=[];return this.ri.forEach(((h,d)=>{d.sequenceNumber<=t&&i.get(d.targetId)===null&&(this.ri.delete(h),l.push(this.removeMatchingKeysForTargetId(e,d.targetId)),o++)})),W.waitFor(l).next((()=>o))}getTargetCount(e){return W.resolve(this.targetCount)}getTargetData(e,t){const i=this.ri.get(t)||null;return W.resolve(i)}addMatchingKeys(e,t,i){return this.si.$r(t,i),W.resolve()}removeMatchingKeys(e,t,i){this.si.Qr(t,i);const o=this.persistence.referenceDelegate,l=[];return o&&t.forEach((h=>{l.push(o.markPotentiallyOrphaned(e,h))})),W.waitFor(l)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),W.resolve()}getMatchingKeysForTargetId(e,t){const i=this.si.jr(t);return W.resolve(i)}containsKey(e,t){return W.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,t){this._i={},this.overlays={},this.ai=new zc(0),this.ui=!1,this.ui=!0,this.ci=new Ak,this.referenceDelegate=e(this),this.li=new Nk(this),this.indexManager=new pk,this.remoteDocumentCache=(function(o){return new Pk(o)})((i=>this.referenceDelegate.hi(i))),this.serializer=new fk(t),this.Pi=new Sk(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Rk,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this._i[e.toKey()];return i||(i=new Ck(t,this.referenceDelegate),this._i[e.toKey()]=i),i}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,i){re("MemoryPersistence","Starting transaction:",e);const o=new Dk(this.ai.next());return this.referenceDelegate.Ti(),i(o).next((l=>this.referenceDelegate.Ei(o).next((()=>l)))).toPromise().then((l=>(o.raiseOnCommittedEvent(),l)))}Ii(e,t){return W.or(Object.values(this._i).map((i=>()=>i.containsKey(e,t))))}}class Dk extends rP{constructor(e){super(),this.currentSequenceNumber=e}}class rp{constructor(e){this.persistence=e,this.Ri=new np,this.Ai=null}static Vi(e){return new rp(e)}get di(){if(this.Ai)return this.Ai;throw ge(60996)}addReference(e,t,i){return this.Ri.addReference(i,t),this.di.delete(i.toString()),W.resolve()}removeReference(e,t,i){return this.Ri.removeReference(i,t),this.di.add(i.toString()),W.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),W.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((o=>this.di.add(o.toString())));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next((o=>{o.forEach((l=>this.di.add(l.toString())))})).next((()=>i.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return W.forEach(this.di,(i=>{const o=he.fromPath(i);return this.mi(e,o).next((l=>{l||t.removeEntry(o,Ee.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((i=>{i?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return W.or([()=>W.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Rc{constructor(e,t){this.persistence=e,this.fi=new Ss((i=>oP(i.path)),((i,o)=>i.isEqual(o))),this.garbageCollector=Ek(this,t)}static Vi(e,t){return new Rc(e,t)}Ti(){}Ei(e){return W.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((i=>t.next((o=>i+o))))}pr(e){let t=0;return this.mr(e,(i=>{t++})).next((()=>t))}mr(e,t){return W.forEach(this.fi,((i,o)=>this.wr(e,i,o).next((l=>l?W.resolve():t(o)))))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const o=this.persistence.getRemoteDocumentCache(),l=o.newChangeBuffer();return o.ni(e,(h=>this.wr(e,h,t).next((d=>{d||(i++,l.removeEntry(h,Ee.min()))})))).next((()=>l.apply(e))).next((()=>i))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}removeReference(e,t,i){return this.fi.set(i,e.currentSequenceNumber),W.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),W.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ec(e.data.value)),t}wr(e,t,i){return W.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const o=this.fi.get(t);return W.resolve(o!==void 0&&o>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(e,t,i,o){this.targetId=e,this.fromCache=t,this.Ts=i,this.Es=o}static Is(e,t){let i=ke(),o=ke();for(const l of t.docChanges)switch(l.type){case 0:i=i.add(l.doc.key);break;case 1:o=o.add(l.doc.key)}return new ip(e,t.fromCache,i,o)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xk{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vk{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return oS()?8:iP(Bt())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,i,o){const l={result:null};return this.gs(e,t).next((h=>{l.result=h})).next((()=>{if(!l.result)return this.ps(e,t,o,i).next((h=>{l.result=h}))})).next((()=>{if(l.result)return;const h=new xk;return this.ys(e,t,h).next((d=>{if(l.result=d,this.As)return this.ws(e,t,h,d.size)}))})).next((()=>l.result))}ws(e,t,i,o){return i.documentReadCount<this.Vs?(go()<=Ce.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",yo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),W.resolve()):(go()<=Ce.DEBUG&&re("QueryEngine","Query:",yo(t),"scans",i.documentReadCount,"local documents and returns",o,"documents as results."),i.documentReadCount>this.ds*o?(go()<=Ce.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",yo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ur(t))):W.resolve())}gs(e,t){if(Ky(t))return W.resolve(null);let i=ur(t);return this.indexManager.getIndexType(e,i).next((o=>o===0?null:(t.limit!==null&&o===1&&(t=pd(t,null,"F"),i=ur(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next((l=>{const h=ke(...l);return this.fs.getDocuments(e,h).next((d=>this.indexManager.getMinOffset(e,i).next((g=>{const y=this.Ss(t,d);return this.bs(t,y,h,g.readTime)?this.gs(e,pd(t,null,"F")):this.Ds(e,y,t,g)}))))})))))}ps(e,t,i,o){return Ky(t)||o.isEqual(Ee.min())?W.resolve(null):this.fs.getDocuments(e,i).next((l=>{const h=this.Ss(t,l);return this.bs(t,h,i,o)?W.resolve(null):(go()<=Ce.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",o.toString(),yo(t)),this.Ds(e,h,t,ZC(o,rl)).next((d=>d)))}))}Ss(e,t){let i=new yt(CE(e));return t.forEach(((o,l)=>{qc(e,l)&&(i=i.add(l))})),i}bs(e,t,i,o){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const l=e.limitType==="F"?t.last():t.first();return!!l&&(l.hasPendingWrites||l.version.compareTo(o)>0)}ys(e,t,i){return go()<=Ce.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",yo(t)),this.fs.getDocumentsMatchingQuery(e,t,Di.min(),i)}Ds(e,t,i,o){return this.fs.getDocumentsMatchingQuery(e,i,o).next((l=>(t.forEach((h=>{l=l.insert(h.key,h)})),l)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sp="LocalStore",Ok=3e8;class Lk{constructor(e,t,i,o){this.persistence=e,this.Cs=t,this.serializer=o,this.vs=new nt(Pe),this.Fs=new Ss((l=>Yd(l)),Jd),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(i)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ik(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function Mk(n,e,t,i){return new Lk(n,e,t,i)}async function XE(n,e){const t=Te(n);return await t.persistence.runTransaction("Handle user change","readonly",(i=>{let o;return t.mutationQueue.getAllMutationBatches(i).next((l=>(o=l,t.Os(e),t.mutationQueue.getAllMutationBatches(i)))).next((l=>{const h=[],d=[];let g=ke();for(const y of o){h.push(y.batchId);for(const E of y.mutations)g=g.add(E.key)}for(const y of l){d.push(y.batchId);for(const E of y.mutations)g=g.add(E.key)}return t.localDocuments.getDocuments(i,g).next((y=>({Ns:y,removedBatchIds:h,addedBatchIds:d})))}))}))}function bk(n,e){const t=Te(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(i=>{const o=e.batch.keys(),l=t.xs.newChangeBuffer({trackRemovals:!0});return(function(d,g,y,E){const w=y.batch,A=w.keys();let b=W.resolve();return A.forEach((H=>{b=b.next((()=>E.getEntry(g,H))).next(($=>{const z=y.docVersions.get(H);je(z!==null,48541),$.version.compareTo(z)<0&&(w.applyToRemoteDocument($,y),$.isValidDocument()&&($.setReadTime(y.commitVersion),E.addEntry($)))}))})),b.next((()=>d.mutationQueue.removeMutationBatch(g,w)))})(t,i,e,l).next((()=>l.apply(i))).next((()=>t.mutationQueue.performConsistencyCheck(i))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(i,o,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,(function(d){let g=ke();for(let y=0;y<d.mutationResults.length;++y)d.mutationResults[y].transformResults.length>0&&(g=g.add(d.batch.mutations[y].key));return g})(e)))).next((()=>t.localDocuments.getDocuments(i,o)))}))}function ZE(n){const e=Te(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function Fk(n,e){const t=Te(n),i=e.snapshotVersion;let o=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(l=>{const h=t.xs.newChangeBuffer({trackRemovals:!0});o=t.vs;const d=[];e.targetChanges.forEach(((E,w)=>{const A=o.get(w);if(!A)return;d.push(t.li.removeMatchingKeys(l,E.removedDocuments,w).next((()=>t.li.addMatchingKeys(l,E.addedDocuments,w))));let b=A.withSequenceNumber(l.currentSequenceNumber);e.targetMismatches.get(w)!==null?b=b.withResumeToken(xt.EMPTY_BYTE_STRING,Ee.min()).withLastLimboFreeSnapshotVersion(Ee.min()):E.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(E.resumeToken,i)),o=o.insert(w,b),(function($,z,Y){return $.resumeToken.approximateByteSize()===0||z.snapshotVersion.toMicroseconds()-$.snapshotVersion.toMicroseconds()>=Ok?!0:Y.addedDocuments.size+Y.modifiedDocuments.size+Y.removedDocuments.size>0})(A,b,E)&&d.push(t.li.updateTargetData(l,b))}));let g=zr(),y=ke();if(e.documentUpdates.forEach((E=>{e.resolvedLimboDocuments.has(E)&&d.push(t.persistence.referenceDelegate.updateLimboDocument(l,E))})),d.push(Uk(l,h,e.documentUpdates).next((E=>{g=E.Bs,y=E.Ls}))),!i.isEqual(Ee.min())){const E=t.li.getLastRemoteSnapshotVersion(l).next((w=>t.li.setTargetsMetadata(l,l.currentSequenceNumber,i)));d.push(E)}return W.waitFor(d).next((()=>h.apply(l))).next((()=>t.localDocuments.getLocalViewOfDocuments(l,g,y))).next((()=>g))})).then((l=>(t.vs=o,l)))}function Uk(n,e,t){let i=ke(),o=ke();return t.forEach((l=>i=i.add(l))),e.getEntries(n,i).next((l=>{let h=zr();return t.forEach(((d,g)=>{const y=l.get(d);g.isFoundDocument()!==y.isFoundDocument()&&(o=o.add(d)),g.isNoDocument()&&g.version.isEqual(Ee.min())?(e.removeEntry(d,g.readTime),h=h.insert(d,g)):!y.isValidDocument()||g.version.compareTo(y.version)>0||g.version.compareTo(y.version)===0&&y.hasPendingWrites?(e.addEntry(g),h=h.insert(d,g)):re(sp,"Ignoring outdated watch update for ",d,". Current version:",y.version," Watch version:",g.version)})),{Bs:h,Ls:o}}))}function jk(n,e){const t=Te(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(i=>(e===void 0&&(e=Kd),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e))))}function zk(n,e){const t=Te(n);return t.persistence.runTransaction("Allocate target","readwrite",(i=>{let o;return t.li.getTargetData(i,e).next((l=>l?(o=l,W.resolve(o)):t.li.allocateTargetId(i).next((h=>(o=new Ii(e,h,"TargetPurposeListen",i.currentSequenceNumber),t.li.addTargetData(i,o).next((()=>o)))))))})).then((i=>{const o=t.vs.get(i.targetId);return(o===null||i.snapshotVersion.compareTo(o.snapshotVersion)>0)&&(t.vs=t.vs.insert(i.targetId,i),t.Fs.set(e,i.targetId)),i}))}async function vd(n,e,t){const i=Te(n),o=i.vs.get(e),l=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",l,(h=>i.persistence.referenceDelegate.removeTarget(h,o)))}catch(h){if(!$o(h))throw h;re(sp,`Failed to update sequence numbers for target ${e}: ${h}`)}i.vs=i.vs.remove(e),i.Fs.delete(o.target)}function o_(n,e,t){const i=Te(n);let o=Ee.min(),l=ke();return i.persistence.runTransaction("Execute query","readwrite",(h=>(function(g,y,E){const w=Te(g),A=w.Fs.get(E);return A!==void 0?W.resolve(w.vs.get(A)):w.li.getTargetData(y,E)})(i,h,ur(e)).next((d=>{if(d)return o=d.lastLimboFreeSnapshotVersion,i.li.getMatchingKeysForTargetId(h,d.targetId).next((g=>{l=g}))})).next((()=>i.Cs.getDocumentsMatchingQuery(h,e,t?o:Ee.min(),t?l:ke()))).next((d=>(Bk(i,CP(e),d),{documents:d,ks:l})))))}function Bk(n,e,t){let i=n.Ms.get(e)||Ee.min();t.forEach(((o,l)=>{l.readTime.compareTo(i)>0&&(i=l.readTime)})),n.Ms.set(e,i)}class a_{constructor(){this.activeTargetIds=VP()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $k{constructor(){this.vo=new a_,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,i){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new a_,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hk{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_="ConnectivityMonitor";class u_{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){re(l_,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){re(l_,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hu=null;function Ed(){return Hu===null?Hu=(function(){return 268435456+Math.round(2147483648*Math.random())})():Hu++,"0x"+Hu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf="RestConnection",qk={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Wk{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${i}/databases/${o}`,this.$o=this.databaseId.database===_c?`project_id=${i}`:`project_id=${i}&database_id=${o}`}Wo(e,t,i,o,l){const h=Ed(),d=this.Qo(e,t.toUriEncodedString());re(qf,`Sending RPC '${e}' ${h}:`,d,i);const g={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(g,o,l);const{host:y}=new URL(d),E=fl(y);return this.zo(e,d,g,i,E).then((w=>(re(qf,`Received RPC '${e}' ${h}: `,w),w)),(w=>{throw gs(qf,`RPC '${e}' ${h} failed with error: `,w,"url: ",d,"request:",i),w}))}jo(e,t,i,o,l,h){return this.Wo(e,t,i,o,l)}Go(e,t,i){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+zo})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((o,l)=>e[l]=o)),i&&i.headers.forEach(((o,l)=>e[l]=o))}Qo(e,t){const i=qk[e];let o=`${this.Ko}/v1/${t}:${i}`;return this.databaseInfo.apiKey&&(o=`${o}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),o}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kk{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="WebChannelConnection",Ba=(n,e,t)=>{n.listen(e,(i=>{try{t(i)}catch(o){setTimeout((()=>{throw o}),0)}}))};class So extends Wk{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!So.c_){const e=nE();Ba(e,tE.STAT_EVENT,(t=>{t.stat===ad.PROXY?re(Ut,"STAT_EVENT: detected buffering proxy"):t.stat===ad.NOPROXY&&re(Ut,"STAT_EVENT: detected no buffering proxy")})),So.c_=!0}}zo(e,t,i,o,l){const h=Ed();return new Promise(((d,g)=>{const y=new Zv;y.setWithCredentials(!0),y.listenOnce(eE.COMPLETE,(()=>{try{switch(y.getLastErrorCode()){case Zu.NO_ERROR:const w=y.getResponseJson();re(Ut,`XHR for RPC '${e}' ${h} received:`,JSON.stringify(w)),d(w);break;case Zu.TIMEOUT:re(Ut,`RPC '${e}' ${h} timed out`),g(new ie(q.DEADLINE_EXCEEDED,"Request time out"));break;case Zu.HTTP_ERROR:const A=y.getStatus();if(re(Ut,`RPC '${e}' ${h} failed with status:`,A,"response text:",y.getResponseText()),A>0){let b=y.getResponseJson();Array.isArray(b)&&(b=b[0]);const H=b==null?void 0:b.error;if(H&&H.status&&H.message){const $=(function(Y){const te=Y.toLowerCase().replace(/_/g,"-");return Object.values(q).indexOf(te)>=0?te:q.UNKNOWN})(H.status);g(new ie($,H.message))}else g(new ie(q.UNKNOWN,"Server responded with status "+y.getStatus()))}else g(new ie(q.UNAVAILABLE,"Connection failed."));break;default:ge(9055,{l_:e,streamId:h,h_:y.getLastErrorCode(),P_:y.getLastError()})}}finally{re(Ut,`RPC '${e}' ${h} completed.`)}}));const E=JSON.stringify(o);re(Ut,`RPC '${e}' ${h} sending request:`,o),y.send(t,"POST",E,i,15)}))}T_(e,t,i){const o=Ed(),l=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],h=this.createWebChannelTransport(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},g=this.longPollingOptions.timeoutSeconds;g!==void 0&&(d.longPollingTimeout=Math.round(1e3*g)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Go(d.initMessageHeaders,t,i),d.encodeInitMessageHeaders=!0;const y=l.join("");re(Ut,`Creating RPC '${e}' stream ${o}: ${y}`,d);const E=h.createWebChannel(y,d);this.E_(E);let w=!1,A=!1;const b=new Kk({Jo:H=>{A?re(Ut,`Not sending because RPC '${e}' stream ${o} is closed:`,H):(w||(re(Ut,`Opening RPC '${e}' stream ${o} transport.`),E.open(),w=!0),re(Ut,`RPC '${e}' stream ${o} sending:`,H),E.send(H))},Ho:()=>E.close()});return Ba(E,qa.EventType.OPEN,(()=>{A||(re(Ut,`RPC '${e}' stream ${o} transport opened.`),b.i_())})),Ba(E,qa.EventType.CLOSE,(()=>{A||(A=!0,re(Ut,`RPC '${e}' stream ${o} transport closed`),b.o_(),this.I_(E))})),Ba(E,qa.EventType.ERROR,(H=>{A||(A=!0,gs(Ut,`RPC '${e}' stream ${o} transport errored. Name:`,H.name,"Message:",H.message),b.o_(new ie(q.UNAVAILABLE,"The operation could not be completed")))})),Ba(E,qa.EventType.MESSAGE,(H=>{var $;if(!A){const z=H.data[0];je(!!z,16349);const Y=z,te=(Y==null?void 0:Y.error)||(($=Y[0])==null?void 0:$.error);if(te){re(Ut,`RPC '${e}' stream ${o} received error:`,te);const se=te.status;let ve=(function(N){const S=ft[N];if(S!==void 0)return UE(S)})(se),ye=te.message;se==="NOT_FOUND"&&ye.includes("database")&&ye.includes("does not exist")&&ye.includes(this.databaseId.database)&&gs(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ve===void 0&&(ve=q.INTERNAL,ye="Unknown error status: "+se+" with message "+te.message),A=!0,b.o_(new ie(ve,ye)),E.close()}else re(Ut,`RPC '${e}' stream ${o} received:`,z),b.__(z)}})),So.u_(),setTimeout((()=>{b.s_()}),0),b}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,i){super.Go(e,t,i),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return rE()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gk(n){return new So(n)}function Wf(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(n){return new XP(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */So.c_=!1;class ew{constructor(e,t,i=1e3,o=1.5,l=6e4){this.Ci=e,this.timerId=t,this.R_=i,this.A_=o,this.V_=l,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),i=Math.max(0,Date.now()-this.f_),o=Math.max(0,t-i);o>0&&re("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,o,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c_="PersistentStream";class tw{constructor(e,t,i,o,l,h,d,g){this.Ci=e,this.S_=i,this.b_=o,this.connection=l,this.authCredentialsProvider=h,this.appCheckCredentialsProvider=d,this.listener=g,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ew(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===q.RESOURCE_EXHAUSTED?(jr(t.toString()),jr("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===q.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([i,o])=>{this.D_===t&&this.G_(i,o)}),(i=>{e((()=>{const o=new ie(q.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(o)}))}))}G_(e,t){const i=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{i((()=>this.listener.Zo()))})),this.stream.Yo((()=>{i((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((o=>{i((()=>this.z_(o)))})),this.stream.onMessage((o=>{i((()=>++this.F_==1?this.J_(o):this.onNext(o)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return re(c_,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(re(c_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Qk extends tw{constructor(e,t,i,o,l,h){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,o,h),this.serializer=l}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=tk(this.serializer,e),i=(function(l){if(!("targetChange"in l))return Ee.min();const h=l.targetChange;return h.targetIds&&h.targetIds.length?Ee.min():h.readTime?cr(h.readTime):Ee.min()})(e);return this.listener.H_(t,i)}Z_(e){const t={};t.database=_d(this.serializer),t.addTarget=(function(l,h){let d;const g=h.target;if(d=fd(g)?{documents:ik(l,g)}:{query:sk(l,g).ft},d.targetId=h.targetId,h.resumeToken.approximateByteSize()>0){d.resumeToken=BE(l,h.resumeToken);const y=md(l,h.expectedCount);y!==null&&(d.expectedCount=y)}else if(h.snapshotVersion.compareTo(Ee.min())>0){d.readTime=Sc(l,h.snapshotVersion.toTimestamp());const y=md(l,h.expectedCount);y!==null&&(d.expectedCount=y)}return d})(this.serializer,e);const i=ak(this.serializer,e);i&&(t.labels=i),this.q_(t)}X_(e){const t={};t.database=_d(this.serializer),t.removeTarget=e,this.q_(t)}}class Yk extends tw{constructor(e,t,i,o,l,h){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,o,h),this.serializer=l}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return je(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,je(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){je(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=rk(e.writeResults,e.commitTime),i=cr(e.commitTime);return this.listener.na(i,t)}ra(){const e={};e.database=_d(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((i=>nk(this.serializer,i)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jk{}class Xk extends Jk{constructor(e,t,i,o){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=o,this.ia=!1}sa(){if(this.ia)throw new ie(q.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,i,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([l,h])=>this.connection.Wo(e,gd(t,i),o,l,h))).catch((l=>{throw l.name==="FirebaseError"?(l.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new ie(q.UNKNOWN,l.toString())}))}jo(e,t,i,o,l){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([h,d])=>this.connection.jo(e,gd(t,i),o,h,d,l))).catch((h=>{throw h.name==="FirebaseError"?(h.code===q.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),h):new ie(q.UNKNOWN,h.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function Zk(n,e,t,i){return new Xk(n,e,t,i)}class e1{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(jr(t),this.aa=!1):re("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys="RemoteStore";class t1{constructor(e,t,i,o,l){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=l,this.Aa.Mo((h=>{i.enqueueAndForget((async()=>{As(this)&&(re(ys,"Restarting streams for network reachability change."),await(async function(g){const y=Te(g);y.Ia.add(4),await El(y),y.Va.set("Unknown"),y.Ia.delete(4),await Yc(y)})(this))}))})),this.Va=new e1(i,o)}}async function Yc(n){if(As(n))for(const e of n.Ra)await e(!0)}async function El(n){for(const e of n.Ra)await e(!1)}function nw(n,e){const t=Te(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),up(t)?lp(t):Ho(t).O_()&&ap(t,e))}function op(n,e){const t=Te(n),i=Ho(t);t.Ea.delete(e),i.O_()&&rw(t,e),t.Ea.size===0&&(i.O_()?i.L_():As(t)&&t.Va.set("Unknown"))}function ap(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Ee.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ho(n).Z_(e)}function rw(n,e){n.da.$e(e),Ho(n).X_(e)}function lp(n){n.da=new GP({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ho(n).start(),n.Va.ua()}function up(n){return As(n)&&!Ho(n).x_()&&n.Ea.size>0}function As(n){return Te(n).Ia.size===0}function iw(n){n.da=void 0}async function n1(n){n.Va.set("Online")}async function r1(n){n.Ea.forEach(((e,t)=>{ap(n,e)}))}async function i1(n,e){iw(n),up(n)?(n.Va.ha(e),lp(n)):n.Va.set("Unknown")}async function s1(n,e,t){if(n.Va.set("Online"),e instanceof zE&&e.state===2&&e.cause)try{await(async function(o,l){const h=l.cause;for(const d of l.targetIds)o.Ea.has(d)&&(await o.remoteSyncer.rejectListen(d,h),o.Ea.delete(d),o.da.removeTarget(d))})(n,e)}catch(i){re(ys,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Ac(n,i)}else if(e instanceof rc?n.da.Xe(e):e instanceof jE?n.da.st(e):n.da.tt(e),!t.isEqual(Ee.min()))try{const i=await ZE(n.localStore);t.compareTo(i)>=0&&await(function(l,h){const d=l.da.Tt(h);return d.targetChanges.forEach(((g,y)=>{if(g.resumeToken.approximateByteSize()>0){const E=l.Ea.get(y);E&&l.Ea.set(y,E.withResumeToken(g.resumeToken,h))}})),d.targetMismatches.forEach(((g,y)=>{const E=l.Ea.get(g);if(!E)return;l.Ea.set(g,E.withResumeToken(xt.EMPTY_BYTE_STRING,E.snapshotVersion)),rw(l,g);const w=new Ii(E.target,g,y,E.sequenceNumber);ap(l,w)})),l.remoteSyncer.applyRemoteEvent(d)})(n,t)}catch(i){re(ys,"Failed to raise snapshot:",i),await Ac(n,i)}}async function Ac(n,e,t){if(!$o(e))throw e;n.Ia.add(1),await El(n),n.Va.set("Offline"),t||(t=()=>ZE(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{re(ys,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Yc(n)}))}function sw(n,e){return e().catch((t=>Ac(n,t,e)))}async function Jc(n){const e=Te(n),t=Li(e);let i=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Kd;for(;o1(e);)try{const o=await jk(e.localStore,i);if(o===null){e.Ta.length===0&&t.L_();break}i=o.batchId,a1(e,o)}catch(o){await Ac(e,o)}ow(e)&&aw(e)}function o1(n){return As(n)&&n.Ta.length<10}function a1(n,e){n.Ta.push(e);const t=Li(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function ow(n){return As(n)&&!Li(n).x_()&&n.Ta.length>0}function aw(n){Li(n).start()}async function l1(n){Li(n).ra()}async function u1(n){const e=Li(n);for(const t of n.Ta)e.ea(t.mutations)}async function c1(n,e,t){const i=n.Ta.shift(),o=Zd.from(i,e,t);await sw(n,(()=>n.remoteSyncer.applySuccessfulWrite(o))),await Jc(n)}async function h1(n,e){e&&Li(n).Y_&&await(async function(i,o){if((function(h){return qP(h)&&h!==q.ABORTED})(o.code)){const l=i.Ta.shift();Li(i).B_(),await sw(i,(()=>i.remoteSyncer.rejectFailedWrite(l.batchId,o))),await Jc(i)}})(n,e),ow(n)&&aw(n)}async function h_(n,e){const t=Te(n);t.asyncQueue.verifyOperationInProgress(),re(ys,"RemoteStore received new credentials");const i=As(t);t.Ia.add(3),await El(t),i&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Yc(t)}async function f1(n,e){const t=Te(n);e?(t.Ia.delete(2),await Yc(t)):e||(t.Ia.add(2),await El(t),t.Va.set("Unknown"))}function Ho(n){return n.ma||(n.ma=(function(t,i,o){const l=Te(t);return l.sa(),new Qk(i,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)})(n.datastore,n.asyncQueue,{Zo:n1.bind(null,n),Yo:r1.bind(null,n),t_:i1.bind(null,n),H_:s1.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),up(n)?lp(n):n.Va.set("Unknown")):(await n.ma.stop(),iw(n))}))),n.ma}function Li(n){return n.fa||(n.fa=(function(t,i,o){const l=Te(t);return l.sa(),new Yk(i,l.connection,l.authCredentials,l.appCheckCredentials,l.serializer,o)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:l1.bind(null,n),t_:h1.bind(null,n),ta:u1.bind(null,n),na:c1.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await Jc(n)):(await n.fa.stop(),n.Ta.length>0&&(re(ys,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e,t,i,o,l){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=o,this.removalCallback=l,this.deferred=new Pi,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((h=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,o,l){const h=Date.now()+i,d=new cp(e,t,h,o,l);return d.start(i),d}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ie(q.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function hp(n,e){if(jr("AsyncQueue",`${e}: ${n}`),$o(n))return new ie(q.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{static emptySet(e){return new Ro(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||he.comparator(t.key,i.key):(t,i)=>he.comparator(t.key,i.key),this.keyedMap=Wa(),this.sortedSet=new nt(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,i)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ro)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const o=t.getNext().key,l=i.getNext().key;if(!o.isEqual(l))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new Ro;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(){this.ga=new nt(he.comparator)}track(e){const t=e.doc.key,i=this.ga.get(t);i?e.type!==0&&i.type===3?this.ga=this.ga.insert(t,e):e.type===3&&i.type!==1?this.ga=this.ga.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.ga=this.ga.remove(t):e.type===1&&i.type===2?this.ga=this.ga.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):ge(63341,{Vt:e,pa:i}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,i)=>{e.push(i)})),e}}class Oo{constructor(e,t,i,o,l,h,d,g,y){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=o,this.mutatedKeys=l,this.fromCache=h,this.syncStateChanged=d,this.excludesMetadataChanges=g,this.hasCachedResults=y}static fromInitialDocuments(e,t,i,o,l){const h=[];return t.forEach((d=>{h.push({type:0,doc:d})})),new Oo(e,t,Ro.emptySet(t),h,i,o,!0,!1,l)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let o=0;o<t.length;o++)if(t[o].type!==i[o].type||!t[o].doc.isEqual(i[o].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d1{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class p1{constructor(){this.queries=d_(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,i){const o=Te(t),l=o.queries;o.queries=d_(),l.forEach(((h,d)=>{for(const g of d.Sa)g.onError(i)}))})(this,new ie(q.ABORTED,"Firestore shutting down"))}}function d_(){return new Ss((n=>AE(n)),Hc)}async function m1(n,e){const t=Te(n);let i=3;const o=e.query;let l=t.queries.get(o);l?!l.ba()&&e.Da()&&(i=2):(l=new d1,i=e.Da()?0:1);try{switch(i){case 0:l.wa=await t.onListen(o,!0);break;case 1:l.wa=await t.onListen(o,!1);break;case 2:await t.onFirstRemoteStoreListen(o)}}catch(h){const d=hp(h,`Initialization of query '${yo(e.query)}' failed`);return void e.onError(d)}t.queries.set(o,l),l.Sa.push(e),e.va(t.onlineState),l.wa&&e.Fa(l.wa)&&fp(t)}async function g1(n,e){const t=Te(n),i=e.query;let o=3;const l=t.queries.get(i);if(l){const h=l.Sa.indexOf(e);h>=0&&(l.Sa.splice(h,1),l.Sa.length===0?o=e.Da()?0:1:!l.ba()&&e.Da()&&(o=2))}switch(o){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function y1(n,e){const t=Te(n);let i=!1;for(const o of e){const l=o.query,h=t.queries.get(l);if(h){for(const d of h.Sa)d.Fa(o)&&(i=!0);h.wa=o}}i&&fp(t)}function _1(n,e,t){const i=Te(n),o=i.queries.get(e);if(o)for(const l of o.Sa)l.onError(t);i.queries.delete(e)}function fp(n){n.Ca.forEach((e=>{e.next()}))}var wd,p_;(p_=wd||(wd={})).Ma="default",p_.Cache="cache";class v1{constructor(e,t,i){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(e){if(!this.options.includeMetadataChanges){const i=[];for(const o of e.docChanges)o.type!==3&&i.push(o);e=new Oo(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const i=t!=="Offline";return(!this.options.qa||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Oo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==wd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e){this.key=e}}class uw{constructor(e){this.key=e}}class E1{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=ke(),this.mutatedKeys=ke(),this.eu=CE(e),this.tu=new Ro(this.eu)}get nu(){return this.Za}ru(e,t){const i=t?t.iu:new f_,o=t?t.tu:this.tu;let l=t?t.mutatedKeys:this.mutatedKeys,h=o,d=!1;const g=this.query.limitType==="F"&&o.size===this.query.limit?o.last():null,y=this.query.limitType==="L"&&o.size===this.query.limit?o.first():null;if(e.inorderTraversal(((E,w)=>{const A=o.get(E),b=qc(this.query,w)?w:null,H=!!A&&this.mutatedKeys.has(A.key),$=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let z=!1;A&&b?A.data.isEqual(b.data)?H!==$&&(i.track({type:3,doc:b}),z=!0):this.su(A,b)||(i.track({type:2,doc:b}),z=!0,(g&&this.eu(b,g)>0||y&&this.eu(b,y)<0)&&(d=!0)):!A&&b?(i.track({type:0,doc:b}),z=!0):A&&!b&&(i.track({type:1,doc:A}),z=!0,(g||y)&&(d=!0)),z&&(b?(h=h.add(b),l=$?l.add(E):l.delete(E)):(h=h.delete(E),l=l.delete(E)))})),this.query.limit!==null)for(;h.size>this.query.limit;){const E=this.query.limitType==="F"?h.last():h.first();h=h.delete(E.key),l=l.delete(E.key),i.track({type:1,doc:E})}return{tu:h,iu:i,bs:d,mutatedKeys:l}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,o){const l=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const h=e.iu.ya();h.sort(((E,w)=>(function(b,H){const $=z=>{switch(z){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ge(20277,{Vt:z})}};return $(b)-$(H)})(E.type,w.type)||this.eu(E.doc,w.doc))),this.ou(i),o=o??!1;const d=t&&!o?this._u():[],g=this.Ya.size===0&&this.current&&!o?1:0,y=g!==this.Xa;return this.Xa=g,h.length!==0||y?{snapshot:new Oo(this.query,e.tu,l,h,e.mutatedKeys,g===0,y,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:d}:{au:d}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new f_,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=ke(),this.tu.forEach((i=>{this.uu(i.key)&&(this.Ya=this.Ya.add(i.key))}));const t=[];return e.forEach((i=>{this.Ya.has(i)||t.push(new uw(i))})),this.Ya.forEach((i=>{e.has(i)||t.push(new lw(i))})),t}cu(e){this.Za=e.ks,this.Ya=ke();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Oo.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const dp="SyncEngine";class w1{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class T1{constructor(e){this.key=e,this.hu=!1}}class I1{constructor(e,t,i,o,l,h){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=o,this.currentUser=l,this.maxConcurrentLimboResolutions=h,this.Pu={},this.Tu=new Ss((d=>AE(d)),Hc),this.Eu=new Map,this.Iu=new Set,this.Ru=new nt(he.comparator),this.Au=new Map,this.Vu=new np,this.du={},this.mu=new Map,this.fu=Vo.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function S1(n,e,t=!0){const i=mw(n);let o;const l=i.Tu.get(e);return l?(i.sharedClientState.addLocalQueryTarget(l.targetId),o=l.view.lu()):o=await cw(i,e,t,!0),o}async function R1(n,e){const t=mw(n);await cw(t,e,!0,!1)}async function cw(n,e,t,i){const o=await zk(n.localStore,ur(e)),l=o.targetId,h=n.sharedClientState.addLocalQueryTarget(l,t);let d;return i&&(d=await A1(n,e,l,h==="current",o.resumeToken)),n.isPrimaryClient&&t&&nw(n.remoteStore,o),d}async function A1(n,e,t,i,o){n.pu=(w,A,b)=>(async function($,z,Y,te){let se=z.view.ru(Y);se.bs&&(se=await o_($.localStore,z.query,!1).then((({documents:N})=>z.view.ru(N,se))));const ve=te&&te.targetChanges.get(z.targetId),ye=te&&te.targetMismatches.get(z.targetId)!=null,Ie=z.view.applyChanges(se,$.isPrimaryClient,ve,ye);return g_($,z.targetId,Ie.au),Ie.snapshot})(n,w,A,b);const l=await o_(n.localStore,e,!0),h=new E1(e,l.ks),d=h.ru(l.documents),g=vl.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",o),y=h.applyChanges(d,n.isPrimaryClient,g);g_(n,t,y.au);const E=new w1(e,t,h);return n.Tu.set(e,E),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),y.snapshot}async function C1(n,e,t){const i=Te(n),o=i.Tu.get(e),l=i.Eu.get(o.targetId);if(l.length>1)return i.Eu.set(o.targetId,l.filter((h=>!Hc(h,e)))),void i.Tu.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(o.targetId),i.sharedClientState.isActiveQueryTarget(o.targetId)||await vd(i.localStore,o.targetId,!1).then((()=>{i.sharedClientState.clearQueryState(o.targetId),t&&op(i.remoteStore,o.targetId),Td(i,o.targetId)})).catch(Bo)):(Td(i,o.targetId),await vd(i.localStore,o.targetId,!0))}async function P1(n,e){const t=Te(n),i=t.Tu.get(e),o=t.Eu.get(i.targetId);t.isPrimaryClient&&o.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),op(t.remoteStore,i.targetId))}async function k1(n,e,t){const i=M1(n);try{const o=await(function(h,d){const g=Te(h),y=Ye.now(),E=d.reduce(((b,H)=>b.add(H.key)),ke());let w,A;return g.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let H=zr(),$=ke();return g.xs.getEntries(b,E).next((z=>{H=z,H.forEach(((Y,te)=>{te.isValidDocument()||($=$.add(Y))}))})).next((()=>g.localDocuments.getOverlayedDocuments(b,H))).next((z=>{w=z;const Y=[];for(const te of d){const se=jP(te,w.get(te.key).overlayedDocument);se!=null&&Y.push(new Rs(te.key,se,yE(se.value.mapValue),Mr.exists(!0)))}return g.mutationQueue.addMutationBatch(b,y,Y,d)})).next((z=>{A=z;const Y=z.applyToLocalDocumentSet(w,$);return g.documentOverlayCache.saveOverlays(b,z.batchId,Y)}))})).then((()=>({batchId:A.batchId,changes:kE(w)})))})(i.localStore,e);i.sharedClientState.addPendingMutation(o.batchId),(function(h,d,g){let y=h.du[h.currentUser.toKey()];y||(y=new nt(Pe)),y=y.insert(d,g),h.du[h.currentUser.toKey()]=y})(i,o.batchId,t),await wl(i,o.changes),await Jc(i.remoteStore)}catch(o){const l=hp(o,"Failed to persist write");t.reject(l)}}async function hw(n,e){const t=Te(n);try{const i=await Fk(t.localStore,e);e.targetChanges.forEach(((o,l)=>{const h=t.Au.get(l);h&&(je(o.addedDocuments.size+o.modifiedDocuments.size+o.removedDocuments.size<=1,22616),o.addedDocuments.size>0?h.hu=!0:o.modifiedDocuments.size>0?je(h.hu,14607):o.removedDocuments.size>0&&(je(h.hu,42227),h.hu=!1))})),await wl(t,i,e)}catch(i){await Bo(i)}}function m_(n,e,t){const i=Te(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const o=[];i.Tu.forEach(((l,h)=>{const d=h.view.va(e);d.snapshot&&o.push(d.snapshot)})),(function(h,d){const g=Te(h);g.onlineState=d;let y=!1;g.queries.forEach(((E,w)=>{for(const A of w.Sa)A.va(d)&&(y=!0)})),y&&fp(g)})(i.eventManager,e),o.length&&i.Pu.H_(o),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function N1(n,e,t){const i=Te(n);i.sharedClientState.updateQueryState(e,"rejected",t);const o=i.Au.get(e),l=o&&o.key;if(l){let h=new nt(he.comparator);h=h.insert(l,zt.newNoDocument(l,Ee.min()));const d=ke().add(l),g=new Gc(Ee.min(),new Map,new nt(Pe),h,d);await hw(i,g),i.Ru=i.Ru.remove(l),i.Au.delete(e),pp(i)}else await vd(i.localStore,e,!1).then((()=>Td(i,e,t))).catch(Bo)}async function D1(n,e){const t=Te(n),i=e.batch.batchId;try{const o=await bk(t.localStore,e);dw(t,i,null),fw(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await wl(t,o)}catch(o){await Bo(o)}}async function x1(n,e,t){const i=Te(n);try{const o=await(function(h,d){const g=Te(h);return g.persistence.runTransaction("Reject batch","readwrite-primary",(y=>{let E;return g.mutationQueue.lookupMutationBatch(y,d).next((w=>(je(w!==null,37113),E=w.keys(),g.mutationQueue.removeMutationBatch(y,w)))).next((()=>g.mutationQueue.performConsistencyCheck(y))).next((()=>g.documentOverlayCache.removeOverlaysForBatchId(y,E,d))).next((()=>g.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(y,E))).next((()=>g.localDocuments.getDocuments(y,E)))}))})(i.localStore,e);dw(i,e,t),fw(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await wl(i,o)}catch(o){await Bo(o)}}function fw(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function dw(n,e,t){const i=Te(n);let o=i.du[i.currentUser.toKey()];if(o){const l=o.get(e);l&&(t?l.reject(t):l.resolve(),o=o.remove(e)),i.du[i.currentUser.toKey()]=o}}function Td(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Eu.get(e))n.Tu.delete(i),t&&n.Pu.yu(i,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((i=>{n.Vu.containsKey(i)||pw(n,i)}))}function pw(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(op(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),pp(n))}function g_(n,e,t){for(const i of t)i instanceof lw?(n.Vu.addReference(i.key,e),V1(n,i)):i instanceof uw?(re(dp,"Document no longer in limbo: "+i.key),n.Vu.removeReference(i.key,e),n.Vu.containsKey(i.key)||pw(n,i.key)):ge(19791,{wu:i})}function V1(n,e){const t=e.key,i=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(i)||(re(dp,"New document in limbo: "+t),n.Iu.add(i),pp(n))}function pp(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new he(We.fromString(e)),i=n.fu.next();n.Au.set(i,new T1(t)),n.Ru=n.Ru.insert(t,i),nw(n.remoteStore,new Ii(ur(SE(t.path)),i,"TargetPurposeLimboResolution",zc.ce))}}async function wl(n,e,t){const i=Te(n),o=[],l=[],h=[];i.Tu.isEmpty()||(i.Tu.forEach(((d,g)=>{h.push(i.pu(g,e,t).then((y=>{var E;if((y||t)&&i.isPrimaryClient){const w=y?!y.fromCache:(E=t==null?void 0:t.targetChanges.get(g.targetId))==null?void 0:E.current;i.sharedClientState.updateQueryState(g.targetId,w?"current":"not-current")}if(y){o.push(y);const w=ip.Is(g.targetId,y);l.push(w)}})))})),await Promise.all(h),i.Pu.H_(o),await(async function(g,y){const E=Te(g);try{await E.persistence.runTransaction("notifyLocalViewChanges","readwrite",(w=>W.forEach(y,(A=>W.forEach(A.Ts,(b=>E.persistence.referenceDelegate.addReference(w,A.targetId,b))).next((()=>W.forEach(A.Es,(b=>E.persistence.referenceDelegate.removeReference(w,A.targetId,b)))))))))}catch(w){if(!$o(w))throw w;re(sp,"Failed to update sequence numbers: "+w)}for(const w of y){const A=w.targetId;if(!w.fromCache){const b=E.vs.get(A),H=b.snapshotVersion,$=b.withLastLimboFreeSnapshotVersion(H);E.vs=E.vs.insert(A,$)}}})(i.localStore,l))}async function O1(n,e){const t=Te(n);if(!t.currentUser.isEqual(e)){re(dp,"User change. New user:",e.toKey());const i=await XE(t.localStore,e);t.currentUser=e,(function(l,h){l.mu.forEach((d=>{d.forEach((g=>{g.reject(new ie(q.CANCELLED,h))}))})),l.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await wl(t,i.Ns)}}function L1(n,e){const t=Te(n),i=t.Au.get(e);if(i&&i.hu)return ke().add(i.key);{let o=ke();const l=t.Eu.get(e);if(!l)return o;for(const h of l){const d=t.Tu.get(h);o=o.unionWith(d.view.nu)}return o}}function mw(n){const e=Te(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=hw.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=L1.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=N1.bind(null,e),e.Pu.H_=y1.bind(null,e.eventManager),e.Pu.yu=_1.bind(null,e.eventManager),e}function M1(n){const e=Te(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=D1.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=x1.bind(null,e),e}class Cc{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Qc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Mk(this.persistence,new Vk,e.initialUser,this.serializer)}Cu(e){return new JE(rp.Vi,this.serializer)}Du(e){return new $k}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cc.provider={build:()=>new Cc};class b1 extends Cc{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){je(this.persistence.referenceDelegate instanceof Rc,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new _k(i,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Xt.withCacheSize(this.cacheSizeBytes):Xt.DEFAULT;return new JE((i=>Rc.Vi(i,t)),this.serializer)}}class Id{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>m_(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=O1.bind(null,this.syncEngine),await f1(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new p1})()}createDatastore(e){const t=Qc(e.databaseInfo.databaseId),i=Gk(e.databaseInfo);return Zk(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return(function(i,o,l,h,d){return new t1(i,o,l,h,d)})(this.localStore,this.datastore,e.asyncQueue,(t=>m_(this.syncEngine,t,0)),(function(){return u_.v()?new u_:new Hk})())}createSyncEngine(e,t){return(function(o,l,h,d,g,y,E){const w=new I1(o,l,h,d,g,y);return E&&(w.gu=!0),w})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(o){const l=Te(o);re(ys,"RemoteStore shutting down."),l.Ia.add(5),await El(l),l.Aa.shutdown(),l.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Id.provider={build:()=>new Id};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F1{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):jr("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi="FirestoreClient";class U1{constructor(e,t,i,o,l){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this._databaseInfo=o,this.user=jt.UNAUTHENTICATED,this.clientId=Wd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=l,this.authCredentials.start(i,(async h=>{re(Mi,"Received user=",h.uid),await this.authCredentialListener(h),this.user=h})),this.appCheckCredentials.start(i,(h=>(re(Mi,"Received new app check token=",h),this.appCheckCredentialListener(h,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Pi;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=hp(t,"Failed to shutdown persistence");e.reject(i)}})),e.promise}}async function Kf(n,e){n.asyncQueue.verifyOperationInProgress(),re(Mi,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener((async o=>{i.isEqual(o)||(await XE(e.localStore,o),i=o)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function y_(n,e){n.asyncQueue.verifyOperationInProgress();const t=await j1(n);re(Mi,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((i=>h_(e.remoteStore,i))),n.setAppCheckTokenChangeListener(((i,o)=>h_(e.remoteStore,o))),n._onlineComponents=e}async function j1(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){re(Mi,"Using user provided OfflineComponentProvider");try{await Kf(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(o){return o.name==="FirebaseError"?o.code===q.FAILED_PRECONDITION||o.code===q.UNIMPLEMENTED:!(typeof DOMException<"u"&&o instanceof DOMException)||o.code===22||o.code===20||o.code===11})(t))throw t;gs("Error using user provided cache. Falling back to memory cache: "+t),await Kf(n,new Cc)}}else re(Mi,"Using default OfflineComponentProvider"),await Kf(n,new b1(void 0));return n._offlineComponents}async function gw(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(re(Mi,"Using user provided OnlineComponentProvider"),await y_(n,n._uninitializedComponentsProvider._online)):(re(Mi,"Using default OnlineComponentProvider"),await y_(n,new Id))),n._onlineComponents}function z1(n){return gw(n).then((e=>e.syncEngine))}async function B1(n){const e=await gw(n),t=e.eventManager;return t.onListen=S1.bind(null,e.syncEngine),t.onUnlisten=C1.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=R1.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=P1.bind(null,e.syncEngine),t}function $1(n,e,t={}){const i=new Pi;return n.asyncQueue.enqueueAndForget((async()=>(function(l,h,d,g,y){const E=new F1({next:A=>{E.Nu(),h.enqueueAndForget((()=>g1(l,w))),A.fromCache&&g.source==="server"?y.reject(new ie(q.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):y.resolve(A)},error:A=>y.reject(A)}),w=new v1(d,E,{includeMetadataChanges:!0,qa:!0});return m1(l,w)})(await B1(n),n.asyncQueue,e,t,i))),i.promise}function H1(n,e){const t=new Pi;return n.asyncQueue.enqueueAndForget((async()=>k1(await z1(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yw(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q1="ComponentProvider",__=new Map;function W1(n,e,t,i,o){return new uP(n,e,t,o.host,o.ssl,o.experimentalForceLongPolling,o.experimentalAutoDetectLongPolling,yw(o.experimentalLongPollingOptions),o.useFetchStreams,o.isUsingEmulator,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w="firestore.googleapis.com",v_=!0;class E_{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new ie(q.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=_w,this.ssl=v_}else this.host=e.host,this.ssl=e.ssl??v_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=YE;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<gk)throw new ie(q.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}XC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yw(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new ie(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new ie(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new ie(q.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,o){return i.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Xc{constructor(e,t,i,o){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new E_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ie(q.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ie(q.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new E_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new BC;switch(i.type){case"firstParty":return new WC(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new ie(q.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=__.get(t);i&&(re(q1,"Removing Datastore"),__.delete(t),i.terminate())})(this),Promise.resolve()}}function K1(n,e,t,i={}){var y;n=gc(n,Xc);const o=fl(e),l=n._getSettings(),h={...l,emulatorOptions:n._getEmulatorOptions()},d=`${e}:${t}`;o&&fv(`https://${d}`),l.host!==_w&&l.host!==d&&gs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const g={...l,host:d,ssl:o,emulatorOptions:i};if(!Ni(g,h)&&(n._setSettings(g),i.mockUserToken)){let E,w;if(typeof i.mockUserToken=="string")E=i.mockUserToken,w=jt.MOCK_USER;else{E=eS(i.mockUserToken,(y=n._app)==null?void 0:y.options.projectId);const A=i.mockUserToken.sub||i.mockUserToken.user_id;if(!A)throw new ie(q.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");w=new jt(A)}n._authCredentials=new $C(new sE(E,w))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new qo(this.firestore,e,this._query)}}class Tt{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ki(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Tt(this.firestore,e,this._key)}toJSON(){return{type:Tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(gl(t,Tt._jsonSchema))return new Tt(e,i||null,new he(We.fromString(t.referencePath)))}}Tt._jsonSchemaVersion="firestore/documentReference/1.0",Tt._jsonSchema={type:pt("string",Tt._jsonSchemaVersion),referencePath:pt("string")};class ki extends qo{constructor(e,t,i){super(e,t,SE(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Tt(this.firestore,null,new he(e))}withConverter(e){return new ki(this.firestore,e,this._path)}}function w_(n,e,...t){if(n=Dt(n),oE("collection","path",e),n instanceof Xc){const i=We.fromString(e,...t);return Vy(i),new ki(n,null,i)}{if(!(n instanceof Tt||n instanceof ki))throw new ie(q.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(We.fromString(e,...t));return Vy(i),new ki(n.firestore,null,i)}}function G1(n,e,...t){if(n=Dt(n),arguments.length===1&&(e=Wd.newId()),oE("doc","path",e),n instanceof Xc){const i=We.fromString(e,...t);return xy(i),new Tt(n,null,new he(i))}{if(!(n instanceof Tt||n instanceof ki))throw new ie(q.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(We.fromString(e,...t));return xy(i),new Tt(n.firestore,n instanceof ki?n.converter:null,new he(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_="AsyncQueue";class I_{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ew(this,"async_queue_retry"),this._c=()=>{const i=Wf();i&&re(T_,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=e;const t=Wf();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Wf();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Pi;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!$o(e))throw e;re(T_,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((i=>{throw this.nc=i,this.rc=!1,jr("INTERNAL UNHANDLED ERROR: ",S_(i)),i})).then((i=>(this.rc=!1,i))))));return this.ac=t,t}enqueueAfterDelay(e,t,i){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const o=cp.createAndSchedule(this,e,t,i,(l=>this.hc(l)));return this.tc.push(o),o}uc(){this.nc&&ge(47125,{Pc:S_(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function S_(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class mp extends Xc{constructor(e,t,i,o){super(e,t,i,o),this.type="firestore",this._queue=new I_,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new I_(e),this._firestoreClient=void 0,await e}}}function Q1(n,e){const t=typeof n=="object"?n:Md(),i=typeof n=="string"?n:_c,o=ws(t,"firestore").getImmediate({identifier:i});if(!o._initialized){const l=X0("firestore");l&&K1(o,...l)}return o}function vw(n){if(n._terminated)throw new ie(q.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Y1(n),n._firestoreClient}function Y1(n){var i,o,l,h;const e=n._freezeSettings(),t=W1(n._databaseId,((i=n._app)==null?void 0:i.options.appId)||"",n._persistenceKey,(o=n._app)==null?void 0:o.options.apiKey,e);n._componentsProvider||(l=e.localCache)!=null&&l._offlineComponentProvider&&((h=e.localCache)!=null&&h._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new U1(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(g){const y=g==null?void 0:g._online.build();return{_offline:g==null?void 0:g._offline.build(y),_online:y}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e){this._byteString=e}static fromBase64String(e){try{return new En(xt.fromBase64String(e))}catch(t){throw new ie(q.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new En(xt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:En._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(gl(e,En._jsonSchema))return En.fromBase64String(e.bytes)}}En._jsonSchemaVersion="firestore/bytes/1.0",En._jsonSchema={type:pt("string",En._jsonSchemaVersion),bytes:pt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ew{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new ie(q.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Nt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new ie(q.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new ie(q.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Pe(this._lat,e._lat)||Pe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:hr._jsonSchemaVersion}}static fromJSON(e){if(gl(e,hr._jsonSchema))return new hr(e.latitude,e.longitude)}}hr._jsonSchemaVersion="firestore/geoPoint/1.0",hr._jsonSchema={type:pt("string",hr._jsonSchemaVersion),latitude:pt("number"),longitude:pt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,o){if(i.length!==o.length)return!1;for(let l=0;l<i.length;++l)if(i[l]!==o[l])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Mn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(gl(e,Mn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Mn(e.vectorValues);throw new ie(q.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Mn._jsonSchemaVersion="firestore/vectorValue/1.0",Mn._jsonSchema={type:pt("string",Mn._jsonSchemaVersion),vectorValues:pt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J1=/^__.*__$/;class X1{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new Rs(e,this.data,this.fieldMask,t,this.fieldTransforms):new _l(e,this.data,t,this.fieldTransforms)}}function Tw(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ge(40011,{dataSource:n})}}class gp{constructor(e,t,i,o,l,h){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=o,l===void 0&&this.Ac(),this.fieldTransforms=l||[],this.fieldMask=h||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new gp({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),i=this.i({path:t,arrayElement:!1});return i.mc(e),i}fc(e){var o;const t=(o=this.path)==null?void 0:o.child(e),i=this.i({path:t,arrayElement:!1});return i.Ac(),i}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Pc(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Tw(this.dataSource)&&J1.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class Z1{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||Qc(e)}I(e,t,i,o=!1){return new gp({dataSource:e,methodName:t,targetDoc:i,path:Nt.emptyPath(),arrayElement:!1,hasConverter:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Iw(n){const e=n._freezeSettings(),t=Qc(n._databaseId);return new Z1(n._databaseId,!!e.ignoreUndefinedProperties,t)}function eN(n,e,t,i,o,l={}){const h=n.I(l.merge||l.mergeFields?2:0,e,t,o);Aw("Data must be an object, but it was:",h,i);const d=Sw(i,h);let g,y;if(l.merge)g=new On(h.fieldMask),y=h.fieldTransforms;else if(l.mergeFields){const E=[];for(const w of l.mergeFields){const A=Zc(e,w,t);if(!h.contains(A))throw new ie(q.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);iN(E,A)||E.push(A)}g=new On(E),y=h.fieldTransforms.filter((w=>g.covers(w.field)))}else g=null,y=h.fieldTransforms;return new X1(new vn(d),g,y)}function tN(n,e,t,i=!1){return yp(t,n.I(i?4:3,e))}function yp(n,e){if(Rw(n=Dt(n)))return Aw("Unsupported field value:",e,n),Sw(n,e);if(n instanceof ww)return(function(i,o){if(!Tw(o.dataSource))throw o.yc(`${i._methodName}() can only be used with update() and set()`);if(!o.path)throw o.yc(`${i._methodName}() is not currently supported inside arrays`);const l=i._toFieldTransform(o);l&&o.fieldTransforms.push(l)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(i,o){const l=[];let h=0;for(const d of i){let g=yp(d,o.gc(h));g==null&&(g={nullValue:"NULL_VALUE"}),l.push(g),h++}return{arrayValue:{values:l}}})(n,e)}return(function(i,o){if((i=Dt(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return OP(o.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const l=Ye.fromDate(i);return{timestampValue:Sc(o.serializer,l)}}if(i instanceof Ye){const l=new Ye(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:Sc(o.serializer,l)}}if(i instanceof hr)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof En)return{bytesValue:BE(o.serializer,i._byteString)};if(i instanceof Tt){const l=o.databaseId,h=i.firestore._databaseId;if(!h.isEqual(l))throw o.yc(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${l.projectId}/${l.database}`);return{referenceValue:tp(i.firestore._databaseId||o.databaseId,i._key.path)}}if(i instanceof Mn)return(function(h,d){const g=h instanceof Mn?h.toArray():h;return{mapValue:{fields:{[mE]:{stringValue:gE},[vc]:{arrayValue:{values:g.map((E=>{if(typeof E!="number")throw d.yc("VectorValues must only contain numeric values.");return Xd(d.serializer,E)}))}}}}}})(i,o);if(QE(i))return i._toProto(o.serializer);throw o.yc(`Unsupported field value: ${jc(i)}`)})(n,e)}function Sw(n,e){const t={};return uE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Is(n,((i,o)=>{const l=yp(o,e.dc(i));l!=null&&(t[i]=l)})),{mapValue:{fields:t}}}function Rw(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ye||n instanceof hr||n instanceof En||n instanceof Tt||n instanceof ww||n instanceof Mn||QE(n))}function Aw(n,e,t){if(!Rw(t)||!aE(t)){const i=jc(t);throw i==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+i)}}function Zc(n,e,t){if((e=Dt(e))instanceof Ew)return e._internalPath;if(typeof e=="string")return rN(n,e);throw Pc("Field path arguments must be of type string or ",n,!1,void 0,t)}const nN=new RegExp("[~\\*/\\[\\]]");function rN(n,e,t){if(e.search(nN)>=0)throw Pc(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ew(...e.split("."))._internalPath}catch{throw Pc(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Pc(n,e,t,i,o){const l=i&&!i.isEmpty(),h=o!==void 0;let d=`Function ${e}() called with invalid data`;t&&(d+=" (via `toFirestore()`)"),d+=". ";let g="";return(l||h)&&(g+=" (found",l&&(g+=` in field ${i}`),h&&(g+=` in document ${o}`),g+=")"),new ie(q.INVALID_ARGUMENT,d+n+g)}function iN(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sN{convertValue(e,t="none"){switch(Oi(e)){case 0:return null;case 1:return e.booleanValue;case 2:return lt(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Vi(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ge(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Is(e,((o,l)=>{i[o]=this.convertValue(l,t)})),i}convertVectorValue(e){var i,o,l;const t=(l=(o=(i=e.fields)==null?void 0:i[vc].arrayValue)==null?void 0:o.values)==null?void 0:l.map((h=>lt(h.doubleValue)));return new Mn(t)}convertGeoPoint(e){return new hr(lt(e.latitude),lt(e.longitude))}convertArray(e,t){return(e.values||[]).map((i=>this.convertValue(i,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const i=$c(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(il(e));default:return null}}convertTimestamp(e){const t=xi(e);return new Ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=We.fromString(e);je(GE(i),9688,{name:e});const o=new sl(i.get(1),i.get(3)),l=new he(i.popFirst(5));return o.isEqual(t)||jr(`Document ${l} contains a document reference within a different database (${o.projectId}/${o.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),l}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oN extends sN{constructor(e){super(),this.firestore=e}convertBytes(e){return new En(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Tt(this.firestore,null,t)}}const R_="@firebase/firestore",A_="4.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{constructor(e,t,i,o,l){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=o,this._converter=l}get id(){return this._key.path.lastSegment()}get ref(){return new Tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new aN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Zc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class aN extends Cw{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lN(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new ie(q.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class _p{}class uN extends _p{}function cN(n,e,...t){let i=[];e instanceof _p&&i.push(e),i=i.concat(t),(function(l){const h=l.filter((g=>g instanceof vp)).length,d=l.filter((g=>g instanceof eh)).length;if(h>1||h>0&&d>0)throw new ie(q.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(i);for(const o of i)n=o._apply(n);return n}class eh extends uN{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new eh(e,t,i)}_apply(e){const t=this._parse(e);return Pw(e._query,t),new qo(e.firestore,e.converter,dd(e._query,t))}_parse(e){const t=Iw(e.firestore);return(function(l,h,d,g,y,E,w){let A;if(y.isKeyField()){if(E==="array-contains"||E==="array-contains-any")throw new ie(q.INVALID_ARGUMENT,`Invalid Query. You can't perform '${E}' queries on documentId().`);if(E==="in"||E==="not-in"){P_(w,E);const H=[];for(const $ of w)H.push(C_(g,l,$));A={arrayValue:{values:H}}}else A=C_(g,l,w)}else E!=="in"&&E!=="not-in"&&E!=="array-contains-any"||P_(w,E),A=tN(d,h,w,E==="in"||E==="not-in");return dt.create(y,E,A)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function hN(n,e,t){const i=e,o=Zc("where",n);return eh._create(o,i,t)}class vp extends _p{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new vp(e,t)}_parse(e){const t=this._queryConstraints.map((i=>i._parse(e))).filter((i=>i.getFilters().length>0));return t.length===1?t[0]:jn.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(o,l){let h=o;const d=l.getFlattenedFilters();for(const g of d)Pw(h,g),h=dd(h,g)})(e._query,t),new qo(e.firestore,e.converter,dd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function C_(n,e,t){if(typeof(t=Dt(t))=="string"){if(t==="")throw new ie(q.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!RE(e)&&t.indexOf("/")!==-1)throw new ie(q.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(We.fromString(t));if(!he.isDocumentKey(i))throw new ie(q.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return zy(n,new he(i))}if(t instanceof Tt)return zy(n,t._key);throw new ie(q.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${jc(t)}.`)}function P_(n,e){if(!Array.isArray(n)||n.length===0)throw new ie(q.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Pw(n,e){const t=(function(o,l){for(const h of o)for(const d of h.getFlattenedFilters())if(l.indexOf(d.op)>=0)return d.op;return null})(n.filters,(function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new ie(q.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new ie(q.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function fN(n,e,t){let i;return i=n?n.toFirestore(e):e,i}class qu{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ao extends Cw{constructor(e,t,i,o,l,h){super(e,t,i,o,h),this._firestore=e,this._firestoreImpl=e,this.metadata=l}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ic(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(Zc("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new ie(q.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Ao._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Ao._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ao._jsonSchema={type:pt("string",Ao._jsonSchemaVersion),bundleSource:pt("string","DocumentSnapshot"),bundleName:pt("string"),bundle:pt("string")};class ic extends Ao{data(e={}){return super.data(e)}}class Co{constructor(e,t,i,o){this._firestore=e,this._userDataWriter=t,this._snapshot=o,this.metadata=new qu(o.hasPendingWrites,o.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new ic(this._firestore,this._userDataWriter,i.key,i,new qu(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new ie(q.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(o,l){if(o._snapshot.oldDocs.isEmpty()){let h=0;return o._snapshot.docChanges.map((d=>{const g=new ic(o._firestore,o._userDataWriter,d.doc.key,d.doc,new qu(o._snapshot.mutatedKeys.has(d.doc.key),o._snapshot.fromCache),o.query.converter);return d.doc,{type:"added",doc:g,oldIndex:-1,newIndex:h++}}))}{let h=o._snapshot.oldDocs;return o._snapshot.docChanges.filter((d=>l||d.type!==3)).map((d=>{const g=new ic(o._firestore,o._userDataWriter,d.doc.key,d.doc,new qu(o._snapshot.mutatedKeys.has(d.doc.key),o._snapshot.fromCache),o.query.converter);let y=-1,E=-1;return d.type!==0&&(y=h.indexOf(d.doc.key),h=h.delete(d.doc.key)),d.type!==1&&(h=h.add(d.doc),E=h.indexOf(d.doc.key)),{type:dN(d.type),doc:g,oldIndex:y,newIndex:E}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new ie(q.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Co._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wd.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],o=[];return this.docs.forEach((l=>{l._document!==null&&(t.push(l._document),i.push(this._userDataWriter.convertObjectMap(l._document.data.value.mapValue.fields,"previous")),o.push(l.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function dN(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ge(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Co._jsonSchemaVersion="firestore/querySnapshot/1.0",Co._jsonSchema={type:pt("string",Co._jsonSchemaVersion),bundleSource:pt("string","QuerySnapshot"),bundleName:pt("string"),bundle:pt("string")};function pN(n){n=gc(n,qo);const e=gc(n.firestore,mp),t=vw(e),i=new oN(e);return lN(n._query),$1(t,n._query).then((o=>new Co(e,i,n,o)))}function mN(n,e){const t=gc(n.firestore,mp),i=G1(n),o=fN(n.converter,e),l=Iw(n.firestore);return gN(t,[eN(l,"addDoc",i._key,o,n.converter!==null,{}).toMutation(i._key,Mr.exists(!1))]).then((()=>i))}function gN(n,e){const t=vw(n);return H1(t,e)}(function(e,t=!0){zC(Fo),fr(new Fn("firestore",((i,{instanceIdentifier:o,options:l})=>{const h=i.getProvider("app").getImmediate(),d=new mp(new HC(i.getProvider("auth-internal")),new KC(h,i.getProvider("app-check-internal")),cP(h,o),h);return l={useFetchStreams:t,...l},d._setSettings(l),d}),"PUBLIC").setMultipleInstances(!0)),wn(R_,A_,e),wn(R_,A_,"esm2020")})();const kw="@firebase/installations",Ep="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw=1e4,Dw=`w:${Ep}`,xw="FIS_v2",yN="https://firebaseinstallations.googleapis.com/v1",_N=3600*1e3,vN="installations",EN="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wN={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_s=new Es(vN,EN,wN);function Vw(n){return n instanceof zn&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow({projectId:n}){return`${yN}/projects/${n}/installations`}function Lw(n){return{token:n.token,requestStatus:2,expiresIn:IN(n.expiresIn),creationTime:Date.now()}}async function Mw(n,e){const i=(await e.json()).error;return _s.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function bw({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function TN(n,{refreshToken:e}){const t=bw(n);return t.append("Authorization",SN(e)),t}async function Fw(n){const e=await n();return e.status>=500&&e.status<600?n():e}function IN(n){return Number(n.replace("s","000"))}function SN(n){return`${xw} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RN({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const i=Ow(n),o=bw(n),l=e.getImmediate({optional:!0});if(l){const y=await l.getHeartbeatsHeader();y&&o.append("x-firebase-client",y)}const h={fid:t,authVersion:xw,appId:n.appId,sdkVersion:Dw},d={method:"POST",headers:o,body:JSON.stringify(h)},g=await Fw(()=>fetch(i,d));if(g.ok){const y=await g.json();return{fid:y.fid||t,registrationStatus:2,refreshToken:y.refreshToken,authToken:Lw(y.authToken)}}else throw await Mw("Create Installation",g)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uw(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AN(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CN=/^[cdef][\w-]{21}$/,Sd="";function PN(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=kN(n);return CN.test(t)?t:Sd}catch{return Sd}}function kN(n){return AN(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function th(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw=new Map;function zw(n,e){const t=th(n);Bw(t,e),NN(t,e)}function Bw(n,e){const t=jw.get(n);if(t)for(const i of t)i(e)}function NN(n,e){const t=DN();t&&t.postMessage({key:n,fid:e}),xN()}let ds=null;function DN(){return!ds&&"BroadcastChannel"in self&&(ds=new BroadcastChannel("[Firebase] FID Change"),ds.onmessage=n=>{Bw(n.data.key,n.data.fid)}),ds}function xN(){jw.size===0&&ds&&(ds.close(),ds=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VN="firebase-installations-database",ON=1,vs="firebase-installations-store";let Gf=null;function wp(){return Gf||(Gf=mv(VN,ON,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(vs)}}})),Gf}async function kc(n,e){const t=th(n),o=(await wp()).transaction(vs,"readwrite"),l=o.objectStore(vs),h=await l.get(t);return await l.put(e,t),await o.done,(!h||h.fid!==e.fid)&&zw(n,e.fid),e}async function $w(n){const e=th(n),i=(await wp()).transaction(vs,"readwrite");await i.objectStore(vs).delete(e),await i.done}async function nh(n,e){const t=th(n),o=(await wp()).transaction(vs,"readwrite"),l=o.objectStore(vs),h=await l.get(t),d=e(h);return d===void 0?await l.delete(t):await l.put(d,t),await o.done,d&&(!h||h.fid!==d.fid)&&zw(n,d.fid),d}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tp(n){let e;const t=await nh(n.appConfig,i=>{const o=LN(i),l=MN(n,o);return e=l.registrationPromise,l.installationEntry});return t.fid===Sd?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function LN(n){const e=n||{fid:PN(),registrationStatus:0};return Hw(e)}function MN(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(_s.create("app-offline"));return{installationEntry:e,registrationPromise:o}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=bN(n,t);return{installationEntry:t,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:FN(n)}:{installationEntry:e}}async function bN(n,e){try{const t=await RN(n,e);return kc(n.appConfig,t)}catch(t){throw Vw(t)&&t.customData.serverCode===409?await $w(n.appConfig):await kc(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function FN(n){let e=await k_(n.appConfig);for(;e.registrationStatus===1;)await Uw(100),e=await k_(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:i}=await Tp(n);return i||t}return e}function k_(n){return nh(n,e=>{if(!e)throw _s.create("installation-not-found");return Hw(e)})}function Hw(n){return UN(n)?{fid:n.fid,registrationStatus:0}:n}function UN(n){return n.registrationStatus===1&&n.registrationTime+Nw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jN({appConfig:n,heartbeatServiceProvider:e},t){const i=zN(n,t),o=TN(n,t),l=e.getImmediate({optional:!0});if(l){const y=await l.getHeartbeatsHeader();y&&o.append("x-firebase-client",y)}const h={installation:{sdkVersion:Dw,appId:n.appId}},d={method:"POST",headers:o,body:JSON.stringify(h)},g=await Fw(()=>fetch(i,d));if(g.ok){const y=await g.json();return Lw(y)}else throw await Mw("Generate Auth Token",g)}function zN(n,{fid:e}){return`${Ow(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ip(n,e=!1){let t;const i=await nh(n.appConfig,l=>{if(!qw(l))throw _s.create("not-registered");const h=l.authToken;if(!e&&HN(h))return l;if(h.requestStatus===1)return t=BN(n,e),l;{if(!navigator.onLine)throw _s.create("app-offline");const d=WN(l);return t=$N(n,d),d}});return t?await t:i.authToken}async function BN(n,e){let t=await N_(n.appConfig);for(;t.authToken.requestStatus===1;)await Uw(100),t=await N_(n.appConfig);const i=t.authToken;return i.requestStatus===0?Ip(n,e):i}function N_(n){return nh(n,e=>{if(!qw(e))throw _s.create("not-registered");const t=e.authToken;return KN(t)?{...e,authToken:{requestStatus:0}}:e})}async function $N(n,e){try{const t=await jN(n,e),i={...e,authToken:t};return await kc(n.appConfig,i),t}catch(t){if(Vw(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await $w(n.appConfig);else{const i={...e,authToken:{requestStatus:0}};await kc(n.appConfig,i)}throw t}}function qw(n){return n!==void 0&&n.registrationStatus===2}function HN(n){return n.requestStatus===2&&!qN(n)}function qN(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+_N}function WN(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function KN(n){return n.requestStatus===1&&n.requestTime+Nw<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GN(n){const e=n,{installationEntry:t,registrationPromise:i}=await Tp(e);return i?i.catch(console.error):Ip(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QN(n,e=!1){const t=n;return await YN(t),(await Ip(t,e)).token}async function YN(n){const{registrationPromise:e}=await Tp(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JN(n){if(!n||!n.options)throw Qf("App Configuration");if(!n.name)throw Qf("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Qf(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Qf(n){return _s.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ww="installations",XN="installations-internal",ZN=n=>{const e=n.getProvider("app").getImmediate(),t=JN(e),i=ws(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},eD=n=>{const e=n.getProvider("app").getImmediate(),t=ws(e,Ww).getImmediate();return{getId:()=>GN(t),getToken:o=>QN(t,o)}};function tD(){fr(new Fn(Ww,ZN,"PUBLIC")),fr(new Fn(XN,eD,"PRIVATE"))}tD();wn(kw,Ep);wn(kw,Ep,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="analytics",nD="firebase_id",rD="origin",iD=60*1e3,sD="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Sp="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new Lc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oD={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},un=new Es("analytics","Analytics",oD);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aD(n){if(!n.startsWith(Sp)){const e=un.create("invalid-gtag-resource",{gtagURL:n});return qt.warn(e.message),""}return n}function Kw(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function lD(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function uD(n,e){const t=lD("firebase-js-sdk-policy",{createScriptURL:aD}),i=document.createElement("script"),o=`${Sp}?l=${n}&id=${e}`;i.src=t?t==null?void 0:t.createScriptURL(o):o,i.async=!0,document.head.appendChild(i)}function cD(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function hD(n,e,t,i,o,l){const h=i[o];try{if(h)await e[h];else{const g=(await Kw(t)).find(y=>y.measurementId===o);g&&await e[g.appId]}}catch(d){qt.error(d)}n("config",o,l)}async function fD(n,e,t,i,o){try{let l=[];if(o&&o.send_to){let h=o.send_to;Array.isArray(h)||(h=[h]);const d=await Kw(t);for(const g of h){const y=d.find(w=>w.measurementId===g),E=y&&e[y.appId];if(E)l.push(E);else{l=[];break}}}l.length===0&&(l=Object.values(e)),await Promise.all(l),n("event",i,o||{})}catch(l){qt.error(l)}}function dD(n,e,t,i){async function o(l,...h){try{if(l==="event"){const[d,g]=h;await fD(n,e,t,d,g)}else if(l==="config"){const[d,g]=h;await hD(n,e,t,i,d,g)}else if(l==="consent"){const[d,g]=h;n("consent",d,g)}else if(l==="get"){const[d,g,y]=h;n("get",d,g,y)}else if(l==="set"){const[d]=h;n("set",d)}else n(l,...h)}catch(d){qt.error(d)}}return o}function pD(n,e,t,i,o){let l=function(...h){window[i].push(arguments)};return window[o]&&typeof window[o]=="function"&&(l=window[o]),window[o]=dD(l,n,e,t),{gtagCore:l,wrappedGtag:window[o]}}function mD(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Sp)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gD=30,yD=1e3;class _D{constructor(e={},t=yD){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Gw=new _D;function vD(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function ED(n){var h;const{appId:e,apiKey:t}=n,i={method:"GET",headers:vD(t)},o=sD.replace("{app-id}",e),l=await fetch(o,i);if(l.status!==200&&l.status!==304){let d="";try{const g=await l.json();(h=g.error)!=null&&h.message&&(d=g.error.message)}catch{}throw un.create("config-fetch-failed",{httpStatus:l.status,responseMessage:d})}return l.json()}async function wD(n,e=Gw,t){const{appId:i,apiKey:o,measurementId:l}=n.options;if(!i)throw un.create("no-app-id");if(!o){if(l)return{measurementId:l,appId:i};throw un.create("no-api-key")}const h=e.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},d=new SD;return setTimeout(async()=>{d.abort()},iD),Qw({appId:i,apiKey:o,measurementId:l},h,d,e)}async function Qw(n,{throttleEndTimeMillis:e,backoffCount:t},i,o=Gw){var d;const{appId:l,measurementId:h}=n;try{await TD(i,e)}catch(g){if(h)return qt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${g==null?void 0:g.message}]`),{appId:l,measurementId:h};throw g}try{const g=await ED(n);return o.deleteThrottleMetadata(l),g}catch(g){const y=g;if(!ID(y)){if(o.deleteThrottleMetadata(l),h)return qt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${y==null?void 0:y.message}]`),{appId:l,measurementId:h};throw g}const E=Number((d=y==null?void 0:y.customData)==null?void 0:d.httpStatus)===503?ey(t,o.intervalMillis,gD):ey(t,o.intervalMillis),w={throttleEndTimeMillis:Date.now()+E,backoffCount:t+1};return o.setThrottleMetadata(l,w),qt.debug(`Calling attemptFetch again in ${E} millis`),Qw(n,w,i,o)}}function TD(n,e){return new Promise((t,i)=>{const o=Math.max(e-Date.now(),0),l=setTimeout(t,o);n.addEventListener(()=>{clearTimeout(l),i(un.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function ID(n){if(!(n instanceof zn)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class SD{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function RD(n,e,t,i,o){if(o&&o.global){n("event",t,i);return}else{const l=await e,h={...i,send_to:l};n("event",t,h)}}async function AD(n,e,t,i){if(i&&i.global){const o={};for(const l of Object.keys(t))o[`user_properties.${l}`]=t[l];return n("set",o),Promise.resolve()}else{const o=await e;n("config",o,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CD(){if(cv())try{await hv()}catch(n){return qt.warn(un.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return qt.warn(un.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function PD(n,e,t,i,o,l,h){const d=wD(n);d.then(A=>{t[A.measurementId]=A.appId,n.options.measurementId&&A.measurementId!==n.options.measurementId&&qt.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${A.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(A=>qt.error(A)),e.push(d);const g=CD().then(A=>{if(A)return i.getId()}),[y,E]=await Promise.all([d,g]);mD(l)||uD(l,y.measurementId),o("js",new Date);const w=(h==null?void 0:h.config)??{};return w[rD]="firebase",w.update=!0,E!=null&&(w[nD]=E),o("config",y.measurementId,w),y.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kD{constructor(e){this.app=e}_delete(){return delete Po[this.app.options.appId],Promise.resolve()}}let Po={},D_=[];const x_={};let Yf="dataLayer",ND="gtag",V_,Rp,O_=!1;function DD(){const n=[];if(uv()&&n.push("This is a browser extension environment."),aS()||n.push("Cookies are not available."),n.length>0){const e=n.map((i,o)=>`(${o+1}) ${i}`).join(" "),t=un.create("invalid-analytics-context",{errorInfo:e});qt.warn(t.message)}}function xD(n,e,t){DD();const i=n.options.appId;if(!i)throw un.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)qt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw un.create("no-api-key");if(Po[i]!=null)throw un.create("already-exists",{id:i});if(!O_){cD(Yf);const{wrappedGtag:l,gtagCore:h}=pD(Po,D_,x_,Yf,ND);Rp=l,V_=h,O_=!0}return Po[i]=PD(n,D_,x_,e,V_,Yf,t),new kD(n)}function VD(n=Md()){n=Dt(n);const e=ws(n,Nc);return e.isInitialized()?e.getImmediate():OD(n)}function OD(n,e={}){const t=ws(n,Nc);if(t.isInitialized()){const o=t.getImmediate();if(Ni(e,t.getOptions()))return o;throw un.create("already-initialized")}return t.initialize({options:e})}function LD(n,e,t){n=Dt(n),AD(Rp,Po[n.app.options.appId],e,t).catch(i=>qt.error(i))}function MD(n,e,t,i){n=Dt(n),RD(Rp,Po[n.app.options.appId],e,t,i).catch(o=>qt.error(o))}const L_="@firebase/analytics",M_="0.10.21";function bD(){fr(new Fn(Nc,(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),o=e.getProvider("installations-internal").getImmediate();return xD(i,o,t)},"PUBLIC")),fr(new Fn("analytics-internal",n,"PRIVATE")),wn(L_,M_),wn(L_,M_,"esm2020");function n(e){try{const t=e.getProvider(Nc).getImmediate();return{logEvent:(i,o,l)=>MD(t,i,o,l),setUserProperties:(i,o)=>LD(t,i,o)}}catch(t){throw un.create("interop-component-reg-failed",{reason:t})}}}bD();const FD={apiKey:"AIzaSyDpN43wG6Y_EbyPRNL8h_DqnBvEq6Flc0s",authDomain:"afiliados-pro-v3.firebaseapp.com",databaseURL:"https://afiliados-pro-v3-default-rtdb.firebaseio.com",projectId:"afiliados-pro-v3",storageBucket:"afiliados-pro-v3.appspot.com",messagingSenderId:"219554193987",appId:"1:219554193987:web:7f3ec088d2dc6fc035aaf6",measurementId:"G-Q0N2LSB5QN"},Ap=gv(FD),sc=bC(Ap),b_=Q1(Ap);VD(Ap);function UD(){const[n,e]=B.useState(""),[t,i]=B.useState(""),o=async()=>{try{await IA(sc,n,t),window.location.href="/dashboard"}catch(l){alert("Erro: "+l.message)}};return Me.jsxs("div",{children:[Me.jsx("input",{placeholder:"email",onChange:l=>e(l.target.value)}),Me.jsx("input",{type:"password",placeholder:"senha",onChange:l=>i(l.target.value)}),Me.jsx("button",{onClick:o,children:"Entrar"})]})}const Pt=[];for(let n=0;n<256;++n)Pt.push((n+256).toString(16).slice(1));function jD(n,e=0){return(Pt[n[e+0]]+Pt[n[e+1]]+Pt[n[e+2]]+Pt[n[e+3]]+"-"+Pt[n[e+4]]+Pt[n[e+5]]+"-"+Pt[n[e+6]]+Pt[n[e+7]]+"-"+Pt[n[e+8]]+Pt[n[e+9]]+"-"+Pt[n[e+10]]+Pt[n[e+11]]+Pt[n[e+12]]+Pt[n[e+13]]+Pt[n[e+14]]+Pt[n[e+15]]).toLowerCase()}const zD=new Uint8Array(16);function BD(){return crypto.getRandomValues(zD)}function $D(n,e,t){return crypto.randomUUID?crypto.randomUUID():HD(n)}function HD(n,e,t){var o;n=n||{};const i=n.random??((o=n.rng)==null?void 0:o.call(n))??BD();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,jD(i)}function qD(){const[n,e]=B.useState(null),[t,i]=B.useState([]),[o,l]=B.useState(""),[h,d]=B.useState(""),g=Pd();B.useEffect(()=>{const A=AA(sc,async b=>{if(!b){g("/login");return}e({...b,plan:"free"}),y(b.uid)});return()=>A()},[]);const y=async A=>{const b=cN(w_(b_,"campaigns"),hN("uid","==",A)),H=await pN(b);i(H.docs.map($=>({id:$.id,...$.data()})))},E=async A=>{if(A.preventDefault(),!o||!h)return;const b=$D();await mN(w_(b_,"campaigns"),{uid:sc.currentUser.uid,name:o,url:h,code:b,clicks:0}),l(""),d(""),y(sc.currentUser.uid)},w=async()=>{try{const b=await(await fetch("http://localhost:3001/create-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n.email})})).json();alert("PIX gerado! Copie o código no console."),console.log("🔵 PIX CODE:"),console.log(b.qr_code),console.log("🟢 QR CODE BASE64:"),console.log(b.qr_code_base64)}catch(A){alert("Erro ao gerar PIX: "+A.message)}};return Me.jsxs("div",{style:{padding:20},children:[Me.jsx("h1",{children:"🚀 SaaS Afiliados Pro V3"}),Me.jsxs("p",{children:["Usuário: ",n==null?void 0:n.email]}),Me.jsxs("p",{children:["Plano atual: ",Me.jsx("b",{children:"FREE"})]}),Me.jsx("button",{style:{background:"green",color:"white",padding:10,marginBottom:10},onClick:w,children:"💳 Upgrade PRO (PIX)"}),Me.jsx("hr",{}),Me.jsx("h2",{children:"Criar campanha"}),Me.jsxs("form",{onSubmit:E,children:[Me.jsx("input",{placeholder:"Nome da campanha",value:o,onChange:A=>l(A.target.value),style:{display:"block",margin:5,padding:8}}),Me.jsx("input",{placeholder:"Link de afiliado",value:h,onChange:A=>d(A.target.value),style:{display:"block",margin:5,padding:8,width:"80%"}}),Me.jsx("button",{type:"submit",children:"Criar campanha"})]}),Me.jsx("hr",{}),Me.jsx("h2",{children:"Minhas campanhas"}),t.length===0&&Me.jsx("p",{children:"Nenhuma campanha ainda"}),t.map(A=>Me.jsxs("div",{style:{border:"1px solid #ccc",margin:10,padding:10},children:[Me.jsx("h3",{children:A.name}),Me.jsx("a",{href:`/r/${A.code}`,target:"_blank",children:"Abrir link de afiliado"}),Me.jsxs("p",{children:["Cliques: ",A.clicks]})]},A.id))]})}function WD(){return Me.jsxs(c0,{children:[Me.jsx(Wu,{path:"/",element:Me.jsx(l0,{to:"/dashboard"})}),Me.jsx(Wu,{path:"/login",element:Me.jsx(UD,{})}),Me.jsx(Wu,{path:"/dashboard",element:Me.jsx(qD,{})})]})}fI.createRoot(document.getElementById("root")).render(Me.jsx(O0,{children:Me.jsx(WD,{})}));

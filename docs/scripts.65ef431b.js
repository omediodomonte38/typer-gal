parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZXQR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setHighscore=exports.getHighscore=void 0;var e=function(){return parseInt(localStorage.getItem("highscore"))||0};exports.getHighscore=e;var t=function(e){localStorage.setItem("highscore",e)};exports.setHighscore=t;
},{}],"IOwx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.show=exports.hide=void 0;var e=function(e){e.style.display="none"};exports.hide=e;var o=function(e){e.style.display="block"};exports.show=o;
},{}],"FBIl":[function(require,module,exports) {
module.exports=["javascript","stewardess","zephyr","sphinx","australia","integration","startup","difficult","editor","suburban","assuming","obstinance","duck","ethnicity","wombat","monopoly","literally","ironic","irregardless","colonel","nonplussed","disinterested","enormity","lieutenant","seven","keyboard","juice","lazy","touch"];
},{}],"g2Hq":[function(require,module,exports) {
"use strict";var e=require("./highscore.js"),t=require("./utils.js"),n=o(require("~/assets/words.yml"));function o(e){return e&&e.__esModule?e:{default:e}}var r,s=document.getElementById("start_text"),a=document.getElementById("current_word"),i=document.getElementById("text_field"),c=document.getElementById("time"),u=document.getElementById("final_score_wrapper"),d=document.getElementById("final_score"),l=document.getElementById("score"),m=document.getElementById("highscore"),h="",g=!1,f=0,v=5,y=0;document.body.onload=function(){(0,t.hide)(a),c.innerText="".concat(v,"s"),i.focus(),i.oninput=I,(0,t.hide)(u),m.innerText=(0,e.getHighscore)()};var I=function(){var e=i.value.toLowerCase();g||"start"!==e||x(),g&&e===h&&T(1)},x=function(){g=!0,y=0,T(v),(0,t.show)(a),(0,t.hide)(s),(0,t.hide)(u),r=setInterval(function(){f--,c.innerText="".concat(f,"s"),f<=0&&B()},1e3)},T=function(e){i.value="",p(e),y++,l.innerText=y,h=n.default[Math.floor(Math.random()*n.default.length)],a.innerText=h},p=function(e){f+=e},B=function(){clearInterval(r),g=!1,(0,t.show)(s),s.innerHTML='\n    <span class="game-over">Game over. </span> Type "<b>start</b> to play</span>\n  ',d.innerText=y,(0,t.show)(u);var n=(0,e.getHighscore)();y>n&&(console.log("high score has been beaten!"),m.innerText=y,(0,e.setHighscore)(y)),(0,t.hide)(a),i.value=""};
},{"./highscore.js":"ZXQR","./utils.js":"IOwx","~/assets/words.yml":"FBIl"}]},{},["g2Hq"], null)
//# sourceMappingURL=/typer/scripts.65ef431b.js.map
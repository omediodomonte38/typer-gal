parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var e,t=document.getElementById("current_word"),n=document.getElementById("text_field"),o=document.getElementById("time"),r=document.getElementById("score"),a=["one","two","three","four","computer","stewardess","four-twenty","javascript","large-headed donkey"],u="",c=!1,d=0,i=0;document.body.onload=function(){t.innerText='Type "start" to play',n.focus(),n.oninput=l};var l=function(e){var t=n.value.toLowerCase();c||"start"!==t||f(),c&&t===u&&m(1)},f=function(){c=!0,i=0,m(5),e=setInterval(function(){d--,o.innerText=d,d<=0&&y()},1e3)},m=function(e){n.value="",s(e),i++,r.innerText=i,u=a[Math.floor(Math.random()*a.length)],t.innerText=u},s=function(e){d+=e},y=function(){clearInterval(e),c=!1,t.innerText='Type "start" to play again',n.value=""};
},{}]},{},["Focm"], null)
//# sourceMappingURL=typer/src.8aa78285.js.map
!function(e){function t(s){if(n[s])return n[s].exports;var r=n[s]={exports:{},id:s,loaded:!1};return e[s].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";e.exports={defaults:{async:!0,data:{},error:function(){},headers:[],success:function(){}},_handleResponse:function(e,t,n){if(4===e.readyState)if(this.end(e),200===e.status){var s=e.response;try{s=JSON.parse(s)}catch(r){return console.error("Invalid JSON string in mxRequest response",r),!1}t(s)}else n(JSON.parse(e.response))},_handleTimeout:function(e,t){console.warn("The request for "+t+" timed out at "+e.timeout+" seconds.")},_setHeaders:function(e,t){return t.every(function(t){e.setRequestHeader(t.name,t.value)}),e},_getOptions:function(e){var t=this.defaults;for(var n in e)e.hasOwnProperty(n)&&("headers"===n?t[n]=t[n].concat(e[n]):t[n]=e[n]);return t},_makeRequest:function(e,t,n){var s=this._getOptions(t),r=new XMLHttpRequest;r.onreadystatechange=this._handleResponse.bind(this,r,s.success,s.error),r.ontimeout=this._handleTimeout.bind(this,r,e),r.setRequestHeader("Content-Type","application/json"),r=this._setHeaders(r,s.headers),r.open(n,e,s.async),r.send(JSON.stringify(s.data))},end:function(){},get:function(e,t){this._makeRequest(e,t,"GET")},post:function(e,t){this._makeRequest(e,t,"POST")},put:function(e,t){this._makeRequest(e,t,"PUT")},del:function(e,t){this._makeRequest(e,t,"DELETE")}}}]);
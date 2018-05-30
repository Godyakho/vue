/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Dep {
    constructor(){
        this.subs = []
    }
    addsub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Dep);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__godvue__ = __webpack_require__(2);


var vm = new __WEBPACK_IMPORTED_MODULE_0__godvue__["a" /* default */]({
    el:'#app',
    data: {
        message:'实现vue双向绑定'
    }
})

console.log(vm)
console.log(vm.$options.data.message )
console.log(vm.message)
window.godvue = vm

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__godvue__["a" /* default */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__compiler__ = __webpack_require__(4);



class godVue {
    constructor(options){
        this.$options = options
        this.$el = this.$options.el
        this._data = this.$options.data
        Object.keys(this._data).forEach(key=>{
            this._proxy(key)
        })
        new __WEBPACK_IMPORTED_MODULE_0__observer__["a" /* default */](this._data)
        new __WEBPACK_IMPORTED_MODULE_1__compiler__["a" /* default */](this.$el, this)
    }    
    // 代理映射 vm.$options.data.message => vm.message
    _proxy(key){
        var self = this
        Object.defineProperty(this,key,{
            get(){
                return self._data[key]
            },
            set(val){
                self._data[key] = val
            }
        })
    }
}

/* harmony default export */ __webpack_exports__["a"] = (godVue);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(0);


// var dep =new Dep()
// // 数据监听
// function observe(data){
//     if(!data||typeof data!== 'object') return
//     Object.keys(data).forEach(key => {
//         var val = data[key]
//         observe(data[key])  // 将对象子对象的值同时监听
//         Object.defineProperty(data,key,{
//             get: function() {
//                 if(Dep.target) dep.addsub(Dep.target)
//                 return val
//             },
//             set: function(newValue) {
//                 if(val === newValue) return
//                 val = newValue
//                 console.log('我订阅了这个属性'+key+'现在为'+data[key])
//                 dep.notify()
//             }
//         })
//     });
// }
class observer{
    constructor(data){
      this.data = data
      this._observe(this.data)
    }
    _observe(data){
        var self = this
        if(!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            self._bind(data,key,data[key])
        })
    }
    _bind(data,key,val){
        this._observe(val)
        var dep =new __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */]()
        Object.defineProperty(data,key,{
            get() {
                if(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target) dep.addsub(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target)
                return val
            },
            set(newval) {
                if(val === newval) return
                val = newval
                console.log('订阅了'+key+'现在值为'+newval)
                dep.notify()
            }
        })
    }
}
__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = null;
/* harmony default export */ __webpack_exports__["a"] = (observer);





/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(5);

const reg = /\{\{(.*)\}\}/
class complier{
    constructor(el,vm){
        this.el = document.querySelector(el)
        this.vm = vm
        this.flag = this._creamteFragment()
        this.el.appendChild(this.flag)
    }
    _creamteFragment(){
        var flag = document.createDocumentFragment()
        var child
        while((child = this.el.firstChild)){
            this._complier(child)
            flag.appendChild(child)
        }
        return flag
    }
    _complier(node) {
        var self = this
        if(node.nodeType === 1) {
            var key = node.attributes['v-model'].nodeValue
            node.addEventListener('input',function(e){
                self.vm[key] = e.target.value
            })
            node.value = this.vm[key]
        }
        if(node.nodeType === 3) {
           if(reg.test(node.nodeValue)){
               var name = RegExp.$1
               name = name.trim()
               new __WEBPACK_IMPORTED_MODULE_0__watcher__["a" /* default */](node,name,this.vm)
           }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (complier);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(0);

class watcher {
    constructor(node,name,vm){
        this.node = node
        this.name = name
        this.vm = vm
        __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = this
        this.update()
        __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target = null;
    }
    update() {
        this.node.nodeValue = this.vm[this.name]
    }
}

/* harmony default export */ __webpack_exports__["a"] = (watcher);

/***/ })
/******/ ]);
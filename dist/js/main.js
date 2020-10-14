/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./.wfLayout/webpCheck.js":
/*!********************************!*\
  !*** ./.wfLayout/webpCheck.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function testWebP(callback) {
  // eslint-disable-next-line no-undef
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    // eslint-disable-next-line standard/no-callback-literal
    callback(webP.height === 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCd' + 'ASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

/***/ }),

/***/ "./src/blocks/header/header.js":
/*!*************************************!*\
  !*** ./src/blocks/header/header.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var navbar = document.querySelector('.header__navbar');
var navbarCloser = document.querySelector('.header__nav-closer');
var navbarOpener = document.querySelector('.header__nav-opener');
var links = document.querySelectorAll('.header__link');
navbarCloser.addEventListener('click', function () {
  navbar.classList.add('header__navbar--close');
});
navbarOpener.addEventListener('click', function () {
  navbar.classList.remove('header__navbar--close');
});
links.forEach(function (link) {
  link.addEventListener('click', function () {
    navbar.classList.add('header__navbar--close');
  });
});

/***/ }),

/***/ "./src/blocks/hero/hero.js":
/*!*********************************!*\
  !*** ./src/blocks/hero/hero.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glidejs/glide/dist/glide.modular.esm */ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js");
/* harmony import */ var _js_webpCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/js/webpCheck */ "./src/js/webpCheck.js");


var hero = document.querySelector('.hero');
var glide = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["default"]('.hero__slider', {
  perView: 1
});
glide.on('move', function () {
  Object(_js_webpCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(function (webpSupports) {
    var index = glide.index;
    var image = webpSupports ? "url(\"images/hero-bg-".concat(index, ".webp\")") : "url(\"images/hero-bg-".concat(index, ".png\")");
    hero.style.backgroundImage = image;
  });
});
glide.mount({
  Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["Controls"],
  Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["Swipe"]
});

/***/ }),

/***/ "./src/blocks/intro/intro.js":
/*!***********************************!*\
  !*** ./src/blocks/intro/intro.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glidejs/glide/dist/glide.modular.esm */ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js");

var glide = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["default"]('.intro__slider');
glide.mount();
/* harmony default export */ __webpack_exports__["default"] = (glide);

/***/ }),

/***/ "./src/blocks/portfolio/portfolio.js":
/*!*******************************************!*\
  !*** ./src/blocks/portfolio/portfolio.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tabs = document.querySelectorAll('.portfolio__tab');
var items = document.querySelectorAll('.portfolio__card');
tabs.forEach(function (tab) {
  tab.addEventListener('click', function (event) {
    var tag = tab.dataset.tag;
    tabs.forEach(function (tab) {
      return tab.classList.remove('portfolio__tab--active');
    });
    tab.classList.add('portfolio__tab--active');
    items.forEach(function (item) {
      if (item.dataset.tag !== tag && tag !== 'all') {
        item.classList.add('portfolio__card--hidden');
      } else {
        item.classList.remove('portfolio__card--hidden');
      }
    });
  });
});

/***/ }),

/***/ "./src/blocks/services/service.js":
/*!****************************************!*\
  !*** ./src/blocks/services/service.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _intro_intro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../intro/intro */ "./src/blocks/intro/intro.js");

var services = document.querySelectorAll('.service__item');
services.forEach(function (service) {
  service.addEventListener('click', function (event) {
    _intro_intro__WEBPACK_IMPORTED_MODULE_0__["default"].go("=".concat(event.currentTarget.dataset.index));
  });
});

/***/ }),

/***/ "./src/blocks/stat/stat.js":
/*!*********************************!*\
  !*** ./src/blocks/stat/stat.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animejs */ "./node_modules/animejs/lib/anime.es.js");

var stats = document.querySelectorAll('.stat');
stats.forEach(function (stat) {
  function scrollChaek() {
    if (screen.height > stat.getBoundingClientRect().top) {
      var number = parseInt(stat.querySelector('.stat__number').textContent);
      var up = {
        number1: 0
      };
      Object(animejs__WEBPACK_IMPORTED_MODULE_0__["default"])({
        targets: up,
        number1: number,
        round: 1,
        duration: 5000,
        easing: 'easeInOutExpo',
        update: function update() {
          stat.querySelector('.stat__number').textContent = up.number1;
        }
      });
      window.removeEventListener('scroll', scrollChaek);
    }
  }

  window.addEventListener('scroll', scrollChaek);
});

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wfLayout_webpCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../.wfLayout/webpCheck */ "./.wfLayout/webpCheck.js");
/* harmony import */ var _wfLayout_webpCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wfLayout_webpCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_hero_hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks/hero/hero */ "./src/blocks/hero/hero.js");
/* harmony import */ var _blocks_header_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/header/header */ "./src/blocks/header/header.js");
/* harmony import */ var _blocks_header_header__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blocks_header_header__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blocks_portfolio_portfolio__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blocks/portfolio/portfolio */ "./src/blocks/portfolio/portfolio.js");
/* harmony import */ var _blocks_portfolio_portfolio__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_blocks_portfolio_portfolio__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _blocks_services_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blocks/services/service */ "./src/blocks/services/service.js");
/* harmony import */ var _blocks_intro_intro__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../blocks/intro/intro */ "./src/blocks/intro/intro.js");
/* harmony import */ var _blocks_stat_stat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../blocks/stat/stat */ "./src/blocks/stat/stat.js");








/***/ }),

/***/ "./src/js/webpCheck.js":
/*!*****************************!*\
  !*** ./src/js/webpCheck.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function testWebP(callback) {
  // eslint-disable-next-line no-undef
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    // eslint-disable-next-line standard/no-callback-literal
    callback(webP.height === 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCd' + 'ASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (!!support === true) {
    document.querySelector('body').classList.add('webp');
    return true;
  } else {
    document.querySelector('body').classList.add('no-webp');
    return false;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (testWebP);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
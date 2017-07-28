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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(1);


let query = Object(__WEBPACK_IMPORTED_MODULE_0__helper__["a" /* getSearchParams */])(location.search);

Reveal.initialize({
  history: true,
  controls: 'controls' in query ? query.controls : true,
  transition: query.transition || 'slide',
  dependencies: [{
    src: './node_modules/reveal.js/plugin/markdown/marked.js',
    condition: function () {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: './node_modules/reveal.js/plugin/markdown/markdown.js',
    condition: function () {
      return !!document.querySelector('[data-markdown]');
    }
  }, {
    src: './node_modules/reveal.js/plugin/highlight/highlight.js',
    async: true,
    callback: function () {
      hljs.initHighlightingOnLoad();
    }
  }]
});

if (query.print) {
  Object(__WEBPACK_IMPORTED_MODULE_0__helper__["b" /* load */])('./node_modules/reveal.js/css/print/pdf.css');
}

if (query.platform) {
  document.body.classList.add(query.platform);
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getSearchParams;
/* harmony export (immutable) */ __webpack_exports__["b"] = load;
/**
 * Created by meathill on 2017/7/18.
 */

function getSearchParams(search) {
  let query = {};
  if (search) {
    search = search.substr(1);
    search = search.split('&');
    for (let i = 0, len = search.length; i < len; i++) {
      let kv = search[i].split('=');
      if (!isNaN(kv[1])) {
        kv[1] = Number(kv[1]);
      }
      if (/^true|false$/i.test(kv[1])) {
        kv[1] = Boolean(kv[1]);
      }
      query[kv[0]] = kv[1];
    }
  }
  return query;
}

function loadCSS(url) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild(link);
  return new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
  });
}

function load(url) {
  if (/\.css$/.test(url)) {
    return loadCSS(url);
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map
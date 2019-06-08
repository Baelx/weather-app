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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/main.js":
/*!**********************************!*\
  !*** ./public/assets/js/main.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var weatherForm = document.querySelector('form');\nvar geoButton = document.querySelector('.geo-button');\nvar search = document.querySelector('input');\nvar forecastElm = document.querySelector('.forecast');\nvar locationDisplay = document.querySelector('.location');\nvar searchButton = document.querySelector('.search-button');\nvar errorField = document.querySelector('.help');\nvar fieldDanger = document.querySelector('.field-danger');\n\nif (\"geolocation\" in navigator) {\n  console.log(\"Geolocation available \");\n  document.querySelector('.geo').classList.toggle('hide');\n} else {\n  console.log(\"Geolocation not available\");\n}\n\nweatherForm.addEventListener('submit', function (e) {\n  e.preventDefault();\n  searchButton.classList.toggle('is-loading');\n  fieldDanger.classList.remove('is-danger');\n  errorField.textContent = \"\";\n  fetch(\"http://localhost:3001/weather?address=\".concat(search.value)).then(function (res) {\n    res.json().then(function (data) {\n      if (data.error) {\n        searchButton.classList.toggle('is-loading');\n        fieldDanger.classList.toggle('is-danger');\n        errorField.textContent = data.error;\n      } else {\n        searchButton.classList.toggle('is-loading');\n        forecastElm.textContent = data.forecast;\n        locationDisplay.textContent = data.location;\n        console.log(data);\n      }\n    });\n  });\n});\ngeoButton.addEventListener('click', function (e) {\n  geoButton.classList.toggle('is-loading');\n  navigator.geolocation.getCurrentPosition(function (position) {\n    console.log(position.coords.latitude, position.coords.longitude);\n    fetch(\"http://localhost:3001/weather?lat=\".concat(position.coords.latitude, \"&long=\").concat(position.coords.longitude)).then(function (res) {\n      res.json().then(function (data) {\n        if (data.error) {\n          geoButton.classList.toggle('is-loading');\n          fieldDanger.classList.toggle('is-danger');\n          errorField.textContent = data.error;\n        } else {\n          geoButton.classList.toggle('is-loading');\n          forecastElm.textContent = data.forecast;\n          locationDisplay.textContent = data.location;\n          console.log(data);\n        }\n      });\n    });\n  });\n});\n\n//# sourceURL=webpack:///./public/assets/js/main.js?");

/***/ })

/******/ });
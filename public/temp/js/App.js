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

eval("// Forms and buttons\nvar weatherForm = document.querySelector('form'),\n    geoButton = document.querySelector('.geo-button'),\n    search = document.querySelector('input');\nsearchButton = document.querySelector('.search-button'); // Where weather details go\n\nvar humArea = document.querySelector('.humidity'),\n    uvArea = document.querySelector('.uv-index'),\n    windArea = document.querySelector('.wind'),\n    preArea = document.querySelector('.precip'),\n    tempArea = document.querySelector('.temp'),\n    forecastElm = document.querySelector('.forecast'),\n    locationDisplay = document.querySelector('.location'),\n    requestTime = document.querySelector('.last-request--time'),\n    waTitle = document.querySelector('.wa-title'),\n    waDesc = document.querySelector('.wa-desc'),\n    waURI = document.querySelector('.wa-uri'); // Create an instance to stop fetch req\n\nvar controller = new AbortController();\nvar signal = controller.signal;\nvar cards = document.querySelectorAll('.card');\ncards.forEach(function (card) {\n  card.addEventListener('click', function (e) {\n    card.classList.toggle('is-flipped');\n  });\n});\ndocument.addEventListener('keyup', function (e) {\n  if (e.key === \"Escape\") {\n    // write your logic here.\n    console.log('Now aborting'); // Abort.\n\n    controller.abort();\n  }\n});\n\nfunction abortFetching() {\n  console.log('Now aborting'); // Abort.\n\n  controller.abort();\n} // Fields to indicate and display errors\n\n\nvar errorField = document.querySelector('.help'),\n    fieldDanger = document.querySelector('.field-danger'); // Is the geolocation API available in this browser?\n\n\"geolocation\" in navigator ? document.querySelector('.geo').classList.toggle('hide') : console.log(\"Geolocation not available\");\nweatherForm.addEventListener('submit', function (e) {\n  e.preventDefault();\n  searchButton.classList.add('is-loading');\n  fieldDanger.classList.remove('is-danger');\n  errorField.textContent = \"\";\n  fetch(\"http://localhost:3001/weather?address=\".concat(search.value), {\n    signal: signal\n  }).then(function (res) {\n    res.json().then(function (data) {\n      if (data.error) {\n        searchButton.classList.remove('is-loading');\n        fieldDanger.classList.toggle('is-danger');\n        errorField.textContent = data.error;\n      } else {\n        searchButton.classList.remove('is-loading');\n        forecastElm.textContent = data.forecast.summary;\n        humArea.textContent = \"\".concat(data.forecast.humidity * 100).concat(String.fromCharCode(37));\n        uvArea.textContent = data.forecast.uv;\n        windArea.textContent = \"\".concat(data.forecast.wind, \"km/h\");\n        preArea.textContent = data.forecast.precip;\n        tempArea.textContent = \"\".concat(data.forecast['temp'].toFixed(0)).concat(String.fromCharCode(176));\n        requestTime.textContent = data.forecast.time;\n        locationDisplay.textContent = data.location;\n        console.log(data);\n      }\n    });\n  });\n});\ngeoButton.addEventListener('click', function (e) {\n  geoButton.classList.toggle('is-loading');\n  navigator.geolocation.getCurrentPosition(function (position) {\n    fetch(\"http://localhost:3001/weather?lat=\".concat(position.coords.latitude, \"&long=\").concat(position.coords.longitude), {\n      signal: signal\n    }).then(function (res) {\n      res.json().then(function (data) {\n        if (data.error) {\n          geoButton.classList.toggle('is-loading');\n          fieldDanger.classList.toggle('is-danger');\n          errorField.textContent = data.error;\n        } else {\n          var date = new Date(data.forecast.time);\n          geoButton.classList.toggle('is-loading');\n          forecastElm.textContent = data.forecast.summary;\n          humArea.textContent = data.forecast.humidity;\n          uvArea.textContent = data.forecast.uv;\n          windArea.textContent = data.forecast.wind;\n          preArea.textContent = data.forecast.precip;\n          tempArea.textContent = \"\".concat(data.forecast['temp'].toFixed(0)).concat(String.fromCharCode(176));\n          requestTime.textContent = date;\n          locationDisplay.textContent = data.location;\n          console.log(data);\n        }\n      });\n    });\n  });\n});\n\n//# sourceURL=webpack:///./public/assets/js/main.js?");

/***/ })

/******/ });
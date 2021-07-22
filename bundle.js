/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/style.scss */ "./src/styles/style.scss");

var canvas = document.getElementById('canvas');
var clearBtn = document.getElementById('clear');
var undoBtn = document.getElementById('undo');
var colorPick = document.getElementById('color-pick');
var widthPick = document.getElementById('range');
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.75;
var context = canvas.getContext('2d');
context.fillStyle = '#ffffff';
context.fillRect(0, 0, canvas.width, canvas.height);
var penColor = '#000000';
var penWidth = '3';
var isDrawing = false;
var drawStorage = [];
var i = -1;
canvas.addEventListener('mousedown', drawStart, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', drawStop, false);
canvas.addEventListener('mouseout', drawStop, false);
clearBtn.addEventListener('click', clear, false);
undoBtn.addEventListener('click', undo, false);
colorPick.addEventListener('input', changeColor, false);
widthPick.addEventListener('input', changeWidth, false);

function drawStart(e) {
  e.preventDefault();
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
  e.preventDefault();

  if (isDrawing) {
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = penColor;
    context.lineWidth = penWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.stroke();
  }
}

function drawStop(e) {
  e.preventDefault();

  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }

  if (e.type !== 'mouseout') {
    drawStorage.push(context.getImageData(0, 0, canvas.width, canvas.height));
    i += 1;
  }
}

function clear() {
  context.fillStyle = '#ffffff';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawStorage = [];
  i = -1;
}

function undo() {
  if (i <= 0) {
    clear();
  } else {
    i -= 1;
    drawStorage.pop();
    context.putImageData(drawStorage[i], 0, 0);
  }
}

function changeColor(e) {
  penColor = e.target.value;
}

function changeWidth(e) {
  penWidth = e.target.value;
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
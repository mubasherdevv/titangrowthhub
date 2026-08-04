/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/html-dom-parser";
exports.ids = ["vendor-chunks/html-dom-parser"];
exports.modules = {

/***/ "(rsc)/./node_modules/html-dom-parser/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("Object.defineProperties(exports, {\n\t__esModule: { value: true },\n\t[Symbol.toStringTag]: { value: \"Module\" }\n});\nconst require_html_to_dom = __webpack_require__(/*! ./server/html-to-dom.js */ \"(rsc)/./node_modules/html-dom-parser/lib/server/html-to-dom.js\");\nexports[\"default\"] = require_html_to_dom.default;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaHRtbC1kb20tcGFyc2VyL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLGVBQWUsYUFBYTtBQUM1Qix5QkFBeUI7QUFDekIsQ0FBQztBQUNELDRCQUE0QixtQkFBTyxDQUFDLCtGQUF5QjtBQUM3RCxrQkFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc3Rhc2VvLWRhc2hib2FyZC8uL25vZGVfbW9kdWxlcy9odG1sLWRvbS1wYXJzZXIvbGliL2luZGV4LmpzPzJhMDkiXSwic291cmNlc0NvbnRlbnQiOlsiT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZXhwb3J0cywge1xuXHRfX2VzTW9kdWxlOiB7IHZhbHVlOiB0cnVlIH0sXG5cdFtTeW1ib2wudG9TdHJpbmdUYWddOiB7IHZhbHVlOiBcIk1vZHVsZVwiIH1cbn0pO1xuY29uc3QgcmVxdWlyZV9odG1sX3RvX2RvbSA9IHJlcXVpcmUoXCIuL3NlcnZlci9odG1sLXRvLWRvbS5qc1wiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJlcXVpcmVfaHRtbF90b19kb20uZGVmYXVsdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/html-dom-parser/lib/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/html-dom-parser/lib/server/html-to-dom.js":
/*!****************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/server/html-to-dom.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const require_utilities = __webpack_require__(/*! ./utilities.js */ \"(rsc)/./node_modules/html-dom-parser/lib/server/utilities.js\");\nlet domhandler = __webpack_require__(/*! domhandler */ \"(rsc)/./node_modules/domhandler/dist/index.js\");\nlet htmlparser2 = __webpack_require__(/*! htmlparser2 */ \"(rsc)/./node_modules/htmlparser2/dist/index.js\");\n//#region src/server/html-to-dom.ts\n/**\n* Parses HTML string to DOM nodes in Node.js.\n*\n* This is the same method as `require('htmlparser2').parseDOM`\n*\n* @see https://github.com/fb55/htmlparser2/blob/v9.0.0/src/index.ts#L44-L46\n* @see https://github.com/fb55/domhandler/tree/v5.0.3#readme\n*\n* @param html - HTML markup.\n* @param options - Parser options.\n* @returns - DOM nodes.\n*/\nfunction HTMLDOMParser(html, options) {\n\tif (typeof html !== \"string\") throw new TypeError(\"First argument must be a string.\");\n\tif (!html) return [];\n\tconst handler = new domhandler.DomHandler(void 0, options);\n\tnew htmlparser2.Parser(handler, options).end(html);\n\treturn require_utilities.unsetRootParent(handler.dom);\n}\n//#endregion\nexports[\"default\"] = HTMLDOMParser;\n\n//# sourceMappingURL=html-to-dom.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaHRtbC1kb20tcGFyc2VyL2xpYi9zZXJ2ZXIvaHRtbC10by1kb20uanMiLCJtYXBwaW5ncyI6IkFBQUEsMEJBQTBCLG1CQUFPLENBQUMsb0ZBQWdCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLGlFQUFZO0FBQ3JDLGtCQUFrQixtQkFBTyxDQUFDLG1FQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOztBQUVmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlzdGFzZW8tZGFzaGJvYXJkLy4vbm9kZV9tb2R1bGVzL2h0bWwtZG9tLXBhcnNlci9saWIvc2VydmVyL2h0bWwtdG8tZG9tLmpzP2MzNTMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVxdWlyZV91dGlsaXRpZXMgPSByZXF1aXJlKFwiLi91dGlsaXRpZXMuanNcIik7XG5sZXQgZG9taGFuZGxlciA9IHJlcXVpcmUoXCJkb21oYW5kbGVyXCIpO1xubGV0IGh0bWxwYXJzZXIyID0gcmVxdWlyZShcImh0bWxwYXJzZXIyXCIpO1xuLy8jcmVnaW9uIHNyYy9zZXJ2ZXIvaHRtbC10by1kb20udHNcbi8qKlxuKiBQYXJzZXMgSFRNTCBzdHJpbmcgdG8gRE9NIG5vZGVzIGluIE5vZGUuanMuXG4qXG4qIFRoaXMgaXMgdGhlIHNhbWUgbWV0aG9kIGFzIGByZXF1aXJlKCdodG1scGFyc2VyMicpLnBhcnNlRE9NYFxuKlxuKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYjU1L2h0bWxwYXJzZXIyL2Jsb2IvdjkuMC4wL3NyYy9pbmRleC50cyNMNDQtTDQ2XG4qIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZiNTUvZG9taGFuZGxlci90cmVlL3Y1LjAuMyNyZWFkbWVcbipcbiogQHBhcmFtIGh0bWwgLSBIVE1MIG1hcmt1cC5cbiogQHBhcmFtIG9wdGlvbnMgLSBQYXJzZXIgb3B0aW9ucy5cbiogQHJldHVybnMgLSBET00gbm9kZXMuXG4qL1xuZnVuY3Rpb24gSFRNTERPTVBhcnNlcihodG1sLCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgaHRtbCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcuXCIpO1xuXHRpZiAoIWh0bWwpIHJldHVybiBbXTtcblx0Y29uc3QgaGFuZGxlciA9IG5ldyBkb21oYW5kbGVyLkRvbUhhbmRsZXIodm9pZCAwLCBvcHRpb25zKTtcblx0bmV3IGh0bWxwYXJzZXIyLlBhcnNlcihoYW5kbGVyLCBvcHRpb25zKS5lbmQoaHRtbCk7XG5cdHJldHVybiByZXF1aXJlX3V0aWxpdGllcy51bnNldFJvb3RQYXJlbnQoaGFuZGxlci5kb20pO1xufVxuLy8jZW5kcmVnaW9uXG5leHBvcnRzLmRlZmF1bHQgPSBIVE1MRE9NUGFyc2VyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1odG1sLXRvLWRvbS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/html-dom-parser/lib/server/html-to-dom.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/html-dom-parser/lib/server/utilities.js":
/*!**************************************************************!*\
  !*** ./node_modules/html-dom-parser/lib/server/utilities.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("//#region src/server/utilities.ts\n/**\n* Sets root parent to null.\n*\n* @param nodes - Nodes.\n* @returns - Nodes.\n*/\nfunction unsetRootParent(nodes) {\n\tlet index = 0;\n\tconst nodesLength = nodes.length;\n\tfor (; index < nodesLength; index++) {\n\t\tconst node = nodes[index];\n\t\tnode.parent = null;\n\t}\n\treturn nodes;\n}\n//#endregion\nexports.unsetRootParent = unsetRootParent;\n\n//# sourceMappingURL=utilities.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaHRtbC1kb20tcGFyc2VyL2xpYi9zZXJ2ZXIvdXRpbGl0aWVzLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxQkFBcUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCOztBQUV2QiIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc3Rhc2VvLWRhc2hib2FyZC8uL25vZGVfbW9kdWxlcy9odG1sLWRvbS1wYXJzZXIvbGliL3NlcnZlci91dGlsaXRpZXMuanM/ZDkzYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyNyZWdpb24gc3JjL3NlcnZlci91dGlsaXRpZXMudHNcbi8qKlxuKiBTZXRzIHJvb3QgcGFyZW50IHRvIG51bGwuXG4qXG4qIEBwYXJhbSBub2RlcyAtIE5vZGVzLlxuKiBAcmV0dXJucyAtIE5vZGVzLlxuKi9cbmZ1bmN0aW9uIHVuc2V0Um9vdFBhcmVudChub2Rlcykge1xuXHRsZXQgaW5kZXggPSAwO1xuXHRjb25zdCBub2Rlc0xlbmd0aCA9IG5vZGVzLmxlbmd0aDtcblx0Zm9yICg7IGluZGV4IDwgbm9kZXNMZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBub2RlID0gbm9kZXNbaW5kZXhdO1xuXHRcdG5vZGUucGFyZW50ID0gbnVsbDtcblx0fVxuXHRyZXR1cm4gbm9kZXM7XG59XG4vLyNlbmRyZWdpb25cbmV4cG9ydHMudW5zZXRSb290UGFyZW50ID0gdW5zZXRSb290UGFyZW50O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsaXRpZXMuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/html-dom-parser/lib/server/utilities.js\n");

/***/ })

};
;
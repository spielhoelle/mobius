/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks/mediacategories/edit.js":
/*!****************************************!*\
  !*** ./blocks/mediacategories/edit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);






const {
  useEffect
} = wp.element;
function Edit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    getBlockRootClientId,
    getBlockIndex,
    getBlocks
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)('core/block-editor');
  let setInitialCategories = false;
  const {
    moveBlockToPosition
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/block-editor');
  function demoMoveBlock() {
    const blocks = getBlocks();
    if (blocks.length < 2) {
      alert('Stop playing now; there\'s only this block in the editor!');
      return;
    }
    const blockIndex = blocks.findIndex(b => b.name === "create-block/tmy-mediacategories");
    if (blockIndex !== 0) {
      let targetBlock = blocks.splice(blockIndex, 1)[0];
      if (clientId === targetBlock.clientId) {
        targetBlock = blocks.shift();
      }
      const sourceClientId = clientId;
      const targetClientId = targetBlock.clientId;
      const fromRootClientId = getBlockRootClientId(sourceClientId);
      const toRootClientId = getBlockRootClientId(targetClientId);
      const targetIndex = getBlockIndex(targetClientId);
      moveBlockToPosition(sourceClientId, fromRootClientId, toRootClientId, targetIndex);
    }
  }
  const onChangeContent = (videoposition, attachmentId) => {
    const categories = [...attributes.categories];
    const p = cats.find(p => p.id == attachmentId);
    if (p) {
      categories[videoposition] = {
        id: attachmentId,
        source_url: p?.source_url,
        title: p.title.raw
      };
    } else {
      categories[videoposition] = {
        "id": attachmentId,
        "source_url": "empty",
        "title": "empty"
      };
    }
    setAttributes({
      categories
    });
    demoMoveBlock();
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: 'categories'
  });
  let availableCats;
  let availableTags;
  let cats = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'category'), []);
  let existingTags = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core').getEntityRecords('taxonomy', 'post_tag'), []);
  if (cats) {
    availableCats = cats.map((p, i) => ({
      id: p.id,
      source_url: p.link,
      title: p.name
    }));
  }
  if (existingTags) {
    availableTags = existingTags.map((p, i) => ({
      id: p.id,
      source_url: p.link,
      title: p.name
    }));
  }
  // useEffect(() => {
  //   if (cats && !setInitialCategories) {
  //     options = cats
  //       .map((p, i) => ({ id: p.id, source_url: p.link, title: p.name }))
  //     setInitialCategories = true
  //     // attributes.categories = options
  //     // setAttributes({ categories: options })
  //   }
  // }, [cats])
  // let videos = []
  let posts = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select('core').getEntityRecords('postType', 'attachment'), []);
  // let dispPosts = []
  if (posts) {
    // const tags = posts.reduce((acc, post) => {
    //   post.tags.map(t => acc.add(t))
    //   return acc
    // }, new Set())
    // const cats = posts.reduce((acc, post) => {
    //   post.categories.map(t => acc.add(t))
    //   return acc
    // }, new Set())
    // posts.map(p => {
    //   attributes.categories.map(cat => {
    //     if (p.categories.includes(cat.id)) {
    //       dispPosts.push(p)
    //     }
    //   })
    // })
    // videos = dispPosts
    // console.log('videos', videos)
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, !attributes.categories || attributes.categories.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Select the videos for the loop"), attributes.categories ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Categories") : null, attributes.categories ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category_selector"
  }, attributes.categories.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: seq.source_url,
    "data-catid": seq.id
  }, seq.title))) : "No categories found.", attributes.tags ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Tags") : null, attributes.tags ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category_selector"
  }, attributes.tags.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: seq.source_url,
    "data-catid": seq.id
  }, seq.title))) : "No tags found.", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Videos: ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "hide_in_editor"
  }, "(shift-click on video to toggle fullscreen)")), attributes.sequence && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "videos"
  }, attributes.sequence.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    key: i + seq.id,
    width: "320",
    height: "240",
    class: `overlay w-100`,
    autoPlay: i === 0,
    muted: true,
    preload: true,
    "data-seqcatid": seq.categories
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: seq.source_url,
    type: "video/mp4"
  }), "Your browser does not support the video tag."))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Categories to display', 'gutenberg'),
    initialOpen: true
  }, availableCats ? availableCats.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
    label: seq.title,
    checked: attributes.categories.map((p, i) => p.title).includes(seq.title),
    onChange: () => {
      var dispPosts = [];
      var newCats = [...attributes.categories.filter(p => p.title !== "empty")];
      var existingTags = [...attributes.tags.filter(p => p.title !== "empty")];
      if (newCats.map(p => p.id).includes(seq.id)) {
        newCats = newCats.slice(newCats.findIndex(c => c.id === seq.id), 1);
      } else {
        newCats.push(seq);
      }
      posts.map(p => {
        newCats.map(cat => {
          if (p.categories.includes(cat.id) && !dispPosts.map(d => d.id).includes(p.id)) {
            dispPosts.push(p);
          }
        });
        existingTags.map(tag => {
          if (p.tags.includes(tag.id) && !dispPosts.map(d => d.id).includes(p.id)) {
            dispPosts.push(p);
          }
        });
      });
      setAttributes({
        ...attributes,
        categories: newCats,
        sequence: dispPosts
      });
    }
  })) : "No categories found."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tags to display', 'gutenberg'),
    initialOpen: true
  }, availableTags ? availableTags.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
    label: seq.title,
    checked: attributes.tags.map((p, i) => p.title).includes(seq.title),
    onChange: () => {
      var dispPosts = [];
      var newTags = [...attributes.tags.filter(p => p.title !== "empty")];
      var existingCats = [...attributes.categories.filter(p => p.title !== "empty")];
      if (newTags.map(p => p.id).includes(seq.id)) {
        newTags = newTags.slice(newTags.findIndex(c => c.id === seq.id), 1);
      } else {
        newTags.push(seq);
      }
      posts.map(p => {
        newTags.map(tag => {
          if (p.tags.includes(tag.id) && !dispPosts.map(d => d.id).includes(p.id)) {
            dispPosts.push(p);
          }
        });
        existingCats.map(cat => {
          if (p.categories.includes(cat.id) && !dispPosts.map(d => d.id).includes(p.id)) {
            dispPosts.push(p);
          }
        });
      });
      setAttributes({
        ...attributes,
        tags: newTags,
        sequence: dispPosts
      });
    }
  })) : "No categories found.")));
}

/***/ }),

/***/ "./blocks/mediacategories/index.js":
/*!*****************************************!*\
  !*** ./blocks/mediacategories/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor.scss */ "./blocks/mediacategories/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./blocks/mediacategories/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./blocks/mediacategories/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./blocks/mediacategories/save.js");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('create-block/tmy-mediacategories', {
  apiVersion: 2,
  title: 'Media categories & tags',
  icon: 'admin-media',
  category: 'widgets',
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./blocks/mediacategories/save.js":
/*!****************************************!*\
  !*** ./blocks/mediacategories/save.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save(props) {
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: 'categories'
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, props.attributes.categories ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Categories") : null, props.attributes.categories ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category_selector"
  }, props.attributes.categories.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: seq.source_url,
    "data-catid": seq.id
  }, seq.title))) : "No categories found.", props.attributes.tags ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Tags") : null, props.attributes.tags ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "category_selector"
  }, props.attributes.tags.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: seq.source_url,
    "data-catid": seq.id
  }, seq.title))) : "No tags found.", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Videos: (shift-click on video to toggle fullscreen)"), props.attributes.sequence && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "videos"
  }, props.attributes.sequence.map((seq, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    width: "320",
    height: "240",
    class: `overlay w-100 ${i !== 0 ? "hidden" : ""}`,
    autoPlay: i === 0,
    muted: true,
    preload: true,
    "data-seqcatid": JSON.stringify(seq.categories)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: seq.source_url,
    type: "video/mp4"
  }), "Your browser does not support the video tag."))));
}

/***/ }),

/***/ "./blocks/mediacategories/editor.scss":
/*!********************************************!*\
  !*** ./blocks/mediacategories/editor.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./blocks/mediacategories/style.scss":
/*!*******************************************!*\
  !*** ./blocks/mediacategories/style.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"mediacategories": 0,
/******/ 			"./style-mediacategories": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunktmy"] = globalThis["webpackChunktmy"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-mediacategories"], () => (__webpack_require__("./blocks/mediacategories/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=mediacategories.js.map
import { n as __toESM, t as __commonJSMin } from "./chunk-BVTlhY3a.js";
import { t as require_react } from "./react.js";
import { n as require_object_assign, t as require_prop_types } from "./prop-types.js";
//#region node_modules/react-side-effect/lib/index.js
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _interopDefault(ex) {
		return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
	}
	var React = require_react();
	var React__default = _interopDefault(React);
	function _defineProperty(obj, key, value) {
		if (key in obj) Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true
		});
		else obj[key] = value;
		return obj;
	}
	function _inheritsLoose(subClass, superClass) {
		subClass.prototype = Object.create(superClass.prototype);
		subClass.prototype.constructor = subClass;
		subClass.__proto__ = superClass;
	}
	var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
	function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
		if (typeof reducePropsToState !== "function") throw new Error("Expected reducePropsToState to be a function.");
		if (typeof handleStateChangeOnClient !== "function") throw new Error("Expected handleStateChangeOnClient to be a function.");
		if (typeof mapStateOnServer !== "undefined" && typeof mapStateOnServer !== "function") throw new Error("Expected mapStateOnServer to either be undefined or a function.");
		function getDisplayName(WrappedComponent) {
			return WrappedComponent.displayName || WrappedComponent.name || "Component";
		}
		return function wrap(WrappedComponent) {
			if (typeof WrappedComponent !== "function") throw new Error("Expected WrappedComponent to be a React component.");
			var mountedInstances = [];
			var state;
			function emitChange() {
				state = reducePropsToState(mountedInstances.map(function(instance) {
					return instance.props;
				}));
				if (SideEffect.canUseDOM) handleStateChangeOnClient(state);
				else if (mapStateOnServer) state = mapStateOnServer(state);
			}
			var SideEffect = /* @__PURE__ */ function(_PureComponent) {
				_inheritsLoose(SideEffect, _PureComponent);
				function SideEffect() {
					return _PureComponent.apply(this, arguments) || this;
				}
				SideEffect.peek = function peek() {
					return state;
				};
				SideEffect.rewind = function rewind() {
					if (SideEffect.canUseDOM) throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
					var recordedState = state;
					state = void 0;
					mountedInstances = [];
					return recordedState;
				};
				var _proto = SideEffect.prototype;
				_proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
					mountedInstances.push(this);
					emitChange();
				};
				_proto.componentDidUpdate = function componentDidUpdate() {
					emitChange();
				};
				_proto.componentWillUnmount = function componentWillUnmount() {
					var index = mountedInstances.indexOf(this);
					mountedInstances.splice(index, 1);
					emitChange();
				};
				_proto.render = function render() {
					return React__default.createElement(WrappedComponent, this.props);
				};
				return SideEffect;
			}(React.PureComponent);
			_defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
			_defineProperty(SideEffect, "canUseDOM", canUseDOM);
			return SideEffect;
		};
	}
	module.exports = withSideEffect;
}));
//#endregion
//#region node_modules/react-helmet/node_modules/react-fast-compare/index.js
var require_react_fast_compare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasElementType = typeof Element !== "undefined";
	var hasMap = typeof Map === "function";
	var hasSet = typeof Set === "function";
	var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
	function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			var it;
			if (hasMap && a instanceof Map && b instanceof Map) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;
				return true;
			}
			if (hasSet && a instanceof Set && b instanceof Set) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				return true;
			}
			if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			if (hasElementType && a instanceof Element) return false;
			for (i = length; i-- !== 0;) {
				if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) continue;
				if (!equal(a[keys[i]], b[keys[i]])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	}
	module.exports = function isEqual(a, b) {
		try {
			return equal(a, b);
		} catch (error) {
			if ((error.message || "").match(/stack|recursion/i)) {
				console.warn("react-fast-compare cannot handle circular refs");
				return false;
			}
			throw error;
		}
	};
}));
//#endregion
//#region node_modules/react-helmet/es/Helmet.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_react_fast_compare = /* @__PURE__ */ __toESM(require_react_fast_compare());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_object_assign = /* @__PURE__ */ __toESM(require_object_assign());
var ATTRIBUTE_NAMES = {
	BODY: "bodyAttributes",
	HTML: "htmlAttributes",
	TITLE: "titleAttributes"
};
var TAG_NAMES = {
	BASE: "base",
	BODY: "body",
	HEAD: "head",
	HTML: "html",
	LINK: "link",
	META: "meta",
	NOSCRIPT: "noscript",
	SCRIPT: "script",
	STYLE: "style",
	TITLE: "title"
};
var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function(name) {
	return TAG_NAMES[name];
});
var TAG_PROPERTIES = {
	CHARSET: "charset",
	CSS_TEXT: "cssText",
	HREF: "href",
	HTTPEQUIV: "http-equiv",
	INNER_HTML: "innerHTML",
	ITEM_PROP: "itemprop",
	NAME: "name",
	PROPERTY: "property",
	REL: "rel",
	SRC: "src",
	TARGET: "target"
};
var REACT_TAG_MAP = {
	accesskey: "accessKey",
	charset: "charSet",
	class: "className",
	contenteditable: "contentEditable",
	contextmenu: "contextMenu",
	"http-equiv": "httpEquiv",
	itemprop: "itemProp",
	tabindex: "tabIndex"
};
var HELMET_PROPS = {
	DEFAULT_TITLE: "defaultTitle",
	DEFER: "defer",
	ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
	ON_CHANGE_CLIENT_STATE: "onChangeClientState",
	TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function(obj, key) {
	obj[REACT_TAG_MAP[key]] = key;
	return obj;
}, {});
var SELF_CLOSING_TAGS = [
	TAG_NAMES.NOSCRIPT,
	TAG_NAMES.SCRIPT,
	TAG_NAMES.STYLE
];
var HELMET_ATTRIBUTE = "data-react-helmet";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
	return typeof obj;
} : function(obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var classCallCheck = function(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
};
var createClass = function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();
var _extends = Object.assign || function(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
	}
	return target;
};
var inherits = function(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: {
		value: subClass,
		enumerable: false,
		writable: true,
		configurable: true
	} });
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};
var objectWithoutProperties = function(obj, keys) {
	var target = {};
	for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;
		if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
		target[i] = obj[i];
	}
	return target;
};
var possibleConstructorReturn = function(self, call) {
	if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
};
var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
	if ((arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true) === false) return String(str);
	return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
	var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
	var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
	if (innermostTemplate && innermostTitle) return innermostTemplate.replace(/%s/g, function() {
		return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
	});
	var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
	return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = function getOnChangeClientState(propsList) {
	return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function() {};
};
var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
	return propsList.filter(function(props) {
		return typeof props[tagType] !== "undefined";
	}).map(function(props) {
		return props[tagType];
	}).reduce(function(tagAttrs, current) {
		return _extends({}, tagAttrs, current);
	}, {});
};
var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
	return propsList.filter(function(props) {
		return typeof props[TAG_NAMES.BASE] !== "undefined";
	}).map(function(props) {
		return props[TAG_NAMES.BASE];
	}).reverse().reduce(function(innermostBaseTag, tag) {
		if (!innermostBaseTag.length) {
			var keys = Object.keys(tag);
			for (var i = 0; i < keys.length; i++) {
				var lowerCaseAttributeKey = keys[i].toLowerCase();
				if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) return innermostBaseTag.concat(tag);
			}
		}
		return innermostBaseTag;
	}, []);
};
var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
	var approvedSeenTags = {};
	return propsList.filter(function(props) {
		if (Array.isArray(props[tagName])) return true;
		if (typeof props[tagName] !== "undefined") warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
		return false;
	}).map(function(props) {
		return props[tagName];
	}).reverse().reduce(function(approvedTags, instanceTags) {
		var instanceSeenTags = {};
		instanceTags.filter(function(tag) {
			var primaryAttributeKey = void 0;
			var keys = Object.keys(tag);
			for (var i = 0; i < keys.length; i++) {
				var attributeKey = keys[i];
				var lowerCaseAttributeKey = attributeKey.toLowerCase();
				if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) primaryAttributeKey = lowerCaseAttributeKey;
				if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) primaryAttributeKey = attributeKey;
			}
			if (!primaryAttributeKey || !tag[primaryAttributeKey]) return false;
			var value = tag[primaryAttributeKey].toLowerCase();
			if (!approvedSeenTags[primaryAttributeKey]) approvedSeenTags[primaryAttributeKey] = {};
			if (!instanceSeenTags[primaryAttributeKey]) instanceSeenTags[primaryAttributeKey] = {};
			if (!approvedSeenTags[primaryAttributeKey][value]) {
				instanceSeenTags[primaryAttributeKey][value] = true;
				return true;
			}
			return false;
		}).reverse().forEach(function(tag) {
			return approvedTags.push(tag);
		});
		var keys = Object.keys(instanceSeenTags);
		for (var i = 0; i < keys.length; i++) {
			var attributeKey = keys[i];
			approvedSeenTags[attributeKey] = (0, import_object_assign.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
		}
		return approvedTags;
	}, []).reverse();
};
var getInnermostProperty = function getInnermostProperty(propsList, property) {
	for (var i = propsList.length - 1; i >= 0; i--) {
		var props = propsList[i];
		if (props.hasOwnProperty(property)) return props[property];
	}
	return null;
};
var reducePropsToState = function reducePropsToState(propsList) {
	return {
		baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
		bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
		defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
		encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
		htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
		linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
		metaTags: getTagsFromPropsList(TAG_NAMES.META, [
			TAG_PROPERTIES.NAME,
			TAG_PROPERTIES.CHARSET,
			TAG_PROPERTIES.HTTPEQUIV,
			TAG_PROPERTIES.PROPERTY,
			TAG_PROPERTIES.ITEM_PROP
		], propsList),
		noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
		onChangeClientState: getOnChangeClientState(propsList),
		scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
		styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
		title: getTitleFromPropsList(propsList),
		titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
	};
};
var rafPolyfill = function() {
	var clock = Date.now();
	return function(callback) {
		var currentTime = Date.now();
		if (currentTime - clock > 16) {
			clock = currentTime;
			callback(currentTime);
		} else setTimeout(function() {
			rafPolyfill(callback);
		}, 0);
	};
}();
var cafPolyfill = function cafPolyfill(id) {
	return clearTimeout(id);
};
var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
var warn = function warn(msg) {
	return console && typeof console.warn === "function" && console.warn(msg);
};
var _helmetCallback = null;
var handleClientStateChange = function handleClientStateChange(newState) {
	if (_helmetCallback) cancelAnimationFrame(_helmetCallback);
	if (newState.defer) _helmetCallback = requestAnimationFrame(function() {
		commitTagChanges(newState, function() {
			_helmetCallback = null;
		});
	});
	else {
		commitTagChanges(newState);
		_helmetCallback = null;
	}
};
var commitTagChanges = function commitTagChanges(newState, cb) {
	var baseTag = newState.baseTag, bodyAttributes = newState.bodyAttributes, htmlAttributes = newState.htmlAttributes, linkTags = newState.linkTags, metaTags = newState.metaTags, noscriptTags = newState.noscriptTags, onChangeClientState = newState.onChangeClientState, scriptTags = newState.scriptTags, styleTags = newState.styleTags, title = newState.title, titleAttributes = newState.titleAttributes;
	updateAttributes(TAG_NAMES.BODY, bodyAttributes);
	updateAttributes(TAG_NAMES.HTML, htmlAttributes);
	updateTitle(title, titleAttributes);
	var tagUpdates = {
		baseTag: updateTags(TAG_NAMES.BASE, baseTag),
		linkTags: updateTags(TAG_NAMES.LINK, linkTags),
		metaTags: updateTags(TAG_NAMES.META, metaTags),
		noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
		scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
		styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
	};
	var addedTags = {};
	var removedTags = {};
	Object.keys(tagUpdates).forEach(function(tagType) {
		var _tagUpdates$tagType = tagUpdates[tagType], newTags = _tagUpdates$tagType.newTags, oldTags = _tagUpdates$tagType.oldTags;
		if (newTags.length) addedTags[tagType] = newTags;
		if (oldTags.length) removedTags[tagType] = tagUpdates[tagType].oldTags;
	});
	cb && cb();
	onChangeClientState(newState, addedTags, removedTags);
};
var flattenArray = function flattenArray(possibleArray) {
	return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};
var updateTitle = function updateTitle(title, attributes) {
	if (typeof title !== "undefined" && document.title !== title) document.title = flattenArray(title);
	updateAttributes(TAG_NAMES.TITLE, attributes);
};
var updateAttributes = function updateAttributes(tagName, attributes) {
	var elementTag = document.getElementsByTagName(tagName)[0];
	if (!elementTag) return;
	var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
	var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
	var attributesToRemove = [].concat(helmetAttributes);
	var attributeKeys = Object.keys(attributes);
	for (var i = 0; i < attributeKeys.length; i++) {
		var attribute = attributeKeys[i];
		var value = attributes[attribute] || "";
		if (elementTag.getAttribute(attribute) !== value) elementTag.setAttribute(attribute, value);
		if (helmetAttributes.indexOf(attribute) === -1) helmetAttributes.push(attribute);
		var indexToSave = attributesToRemove.indexOf(attribute);
		if (indexToSave !== -1) attributesToRemove.splice(indexToSave, 1);
	}
	for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) elementTag.removeAttribute(attributesToRemove[_i]);
	if (helmetAttributes.length === attributesToRemove.length) elementTag.removeAttribute(HELMET_ATTRIBUTE);
	else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
};
var updateTags = function updateTags(type, tags) {
	var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
	var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
	var oldTags = Array.prototype.slice.call(tagNodes);
	var newTags = [];
	var indexToDelete = void 0;
	if (tags && tags.length) tags.forEach(function(tag) {
		var newElement = document.createElement(type);
		for (var attribute in tag) if (tag.hasOwnProperty(attribute)) if (attribute === TAG_PROPERTIES.INNER_HTML) newElement.innerHTML = tag.innerHTML;
		else if (attribute === TAG_PROPERTIES.CSS_TEXT) if (newElement.styleSheet) newElement.styleSheet.cssText = tag.cssText;
		else newElement.appendChild(document.createTextNode(tag.cssText));
		else {
			var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
			newElement.setAttribute(attribute, value);
		}
		newElement.setAttribute(HELMET_ATTRIBUTE, "true");
		if (oldTags.some(function(existingTag, index) {
			indexToDelete = index;
			return newElement.isEqualNode(existingTag);
		})) oldTags.splice(indexToDelete, 1);
		else newTags.push(newElement);
	});
	oldTags.forEach(function(tag) {
		return tag.parentNode.removeChild(tag);
	});
	newTags.forEach(function(tag) {
		return headElement.appendChild(tag);
	});
	return {
		oldTags,
		newTags
	};
};
var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
	return Object.keys(attributes).reduce(function(str, key) {
		var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
		return str ? str + " " + attr : attr;
	}, "");
};
var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
	var attributeString = generateElementAttributesAsString(attributes);
	var flattenedTitle = flattenArray(title);
	return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};
var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
	return tags.reduce(function(str, tag) {
		var attributeHtml = Object.keys(tag).filter(function(attribute) {
			return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
		}).reduce(function(string, attribute) {
			var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
			return string ? string + " " + attr : attr;
		}, "");
		var tagContent = tag.innerHTML || tag.cssText || "";
		var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
		return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
	}, "");
};
var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
	var initProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	return Object.keys(attributes).reduce(function(obj, key) {
		obj[REACT_TAG_MAP[key] || key] = attributes[key];
		return obj;
	}, initProps);
};
var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
	var initAttributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	return Object.keys(props).reduce(function(obj, key) {
		obj[HTML_TAG_MAP[key] || key] = props[key];
		return obj;
	}, initAttributes);
};
var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
	var _initProps;
	var props = convertElementAttributestoReactProps(attributes, (_initProps = { key: title }, _initProps[HELMET_ATTRIBUTE] = true, _initProps));
	return [import_react.createElement(TAG_NAMES.TITLE, props, title)];
};
var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
	return tags.map(function(tag, i) {
		var _mappedTag;
		var mappedTag = (_mappedTag = { key: i }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
		Object.keys(tag).forEach(function(attribute) {
			var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;
			if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) mappedTag.dangerouslySetInnerHTML = { __html: tag.innerHTML || tag.cssText };
			else mappedTag[mappedAttribute] = tag[attribute];
		});
		return import_react.createElement(type, mappedTag);
	});
};
var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
	switch (type) {
		case TAG_NAMES.TITLE: return {
			toComponent: function toComponent() {
				return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
			},
			toString: function toString() {
				return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
			}
		};
		case ATTRIBUTE_NAMES.BODY:
		case ATTRIBUTE_NAMES.HTML: return {
			toComponent: function toComponent() {
				return convertElementAttributestoReactProps(tags);
			},
			toString: function toString() {
				return generateElementAttributesAsString(tags);
			}
		};
		default: return {
			toComponent: function toComponent() {
				return generateTagsAsReactComponent(type, tags);
			},
			toString: function toString() {
				return generateTagsAsString(type, tags, encode);
			}
		};
	}
};
var mapStateOnServer = function mapStateOnServer(_ref) {
	var baseTag = _ref.baseTag, bodyAttributes = _ref.bodyAttributes, encode = _ref.encode, htmlAttributes = _ref.htmlAttributes, linkTags = _ref.linkTags, metaTags = _ref.metaTags, noscriptTags = _ref.noscriptTags, scriptTags = _ref.scriptTags, styleTags = _ref.styleTags, _ref$title = _ref.title, title = _ref$title === void 0 ? "" : _ref$title, titleAttributes = _ref.titleAttributes;
	return {
		base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
		bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
		htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
		link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
		meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
		noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
		script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
		style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
		title: getMethodsForTag(TAG_NAMES.TITLE, {
			title,
			titleAttributes
		}, encode)
	};
};
var HelmetExport = function Helmet(Component) {
	var _class, _temp;
	return _temp = _class = function(_React$Component) {
		inherits(HelmetWrapper, _React$Component);
		function HelmetWrapper() {
			classCallCheck(this, HelmetWrapper);
			return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
		}
		HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
			return !(0, import_react_fast_compare.default)(this.props, nextProps);
		};
		HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
			if (!nestedChildren) return null;
			switch (child.type) {
				case TAG_NAMES.SCRIPT:
				case TAG_NAMES.NOSCRIPT: return { innerHTML: nestedChildren };
				case TAG_NAMES.STYLE: return { cssText: nestedChildren };
			}
			throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
		};
		HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
			var _babelHelpers$extends;
			var child = _ref.child, arrayTypeChildren = _ref.arrayTypeChildren, newChildProps = _ref.newChildProps, nestedChildren = _ref.nestedChildren;
			return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
		};
		HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
			var _babelHelpers$extends2, _babelHelpers$extends3;
			var child = _ref2.child, newProps = _ref2.newProps, newChildProps = _ref2.newChildProps, nestedChildren = _ref2.nestedChildren;
			switch (child.type) {
				case TAG_NAMES.TITLE: return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));
				case TAG_NAMES.BODY: return _extends({}, newProps, { bodyAttributes: _extends({}, newChildProps) });
				case TAG_NAMES.HTML: return _extends({}, newProps, { htmlAttributes: _extends({}, newChildProps) });
			}
			return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
		};
		HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
			var newFlattenedProps = _extends({}, newProps);
			Object.keys(arrayTypeChildren).forEach(function(arrayChildName) {
				var _babelHelpers$extends4;
				newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
			});
			return newFlattenedProps;
		};
		HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
			if (!VALID_TAG_NAMES.some(function(name) {
				return child.type === name;
			})) {
				if (typeof child.type === "function") return warn("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.");
				return warn("Only elements types " + VALID_TAG_NAMES.join(", ") + " are allowed. Helmet does not support rendering <" + child.type + "> elements. Refer to our API for more information.");
			}
			if (nestedChildren && typeof nestedChildren !== "string" && (!Array.isArray(nestedChildren) || nestedChildren.some(function(nestedChild) {
				return typeof nestedChild !== "string";
			}))) throw new Error("Helmet expects a string as a child of <" + child.type + ">. Did you forget to wrap your children in braces? ( <" + child.type + ">{``}</" + child.type + "> ) Refer to our API for more information.");
			return true;
		};
		HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
			var _this2 = this;
			var arrayTypeChildren = {};
			import_react.Children.forEach(children, function(child) {
				if (!child || !child.props) return;
				var _child$props = child.props, nestedChildren = _child$props.children;
				var newChildProps = convertReactPropstoHtmlAttributes(objectWithoutProperties(_child$props, ["children"]));
				_this2.warnOnInvalidChildren(child, nestedChildren);
				switch (child.type) {
					case TAG_NAMES.LINK:
					case TAG_NAMES.META:
					case TAG_NAMES.NOSCRIPT:
					case TAG_NAMES.SCRIPT:
					case TAG_NAMES.STYLE:
						arrayTypeChildren = _this2.flattenArrayTypeChildren({
							child,
							arrayTypeChildren,
							newChildProps,
							nestedChildren
						});
						break;
					default:
						newProps = _this2.mapObjectTypeChildren({
							child,
							newProps,
							newChildProps,
							nestedChildren
						});
						break;
				}
			});
			newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
			return newProps;
		};
		HelmetWrapper.prototype.render = function render() {
			var _props = this.props, children = _props.children;
			var newProps = _extends({}, objectWithoutProperties(_props, ["children"]));
			if (children) newProps = this.mapChildrenToProps(children, newProps);
			return import_react.createElement(Component, newProps);
		};
		createClass(HelmetWrapper, null, [{
			key: "canUseDOM",
			set: function set$$1(canUseDOM) {
				Component.canUseDOM = canUseDOM;
			}
		}]);
		return HelmetWrapper;
	}(import_react.Component), _class.propTypes = {
		base: import_prop_types.default.object,
		bodyAttributes: import_prop_types.default.object,
		children: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.node), import_prop_types.default.node]),
		defaultTitle: import_prop_types.default.string,
		defer: import_prop_types.default.bool,
		encodeSpecialCharacters: import_prop_types.default.bool,
		htmlAttributes: import_prop_types.default.object,
		link: import_prop_types.default.arrayOf(import_prop_types.default.object),
		meta: import_prop_types.default.arrayOf(import_prop_types.default.object),
		noscript: import_prop_types.default.arrayOf(import_prop_types.default.object),
		onChangeClientState: import_prop_types.default.func,
		script: import_prop_types.default.arrayOf(import_prop_types.default.object),
		style: import_prop_types.default.arrayOf(import_prop_types.default.object),
		title: import_prop_types.default.string,
		titleAttributes: import_prop_types.default.object,
		titleTemplate: import_prop_types.default.string
	}, _class.defaultProps = {
		defer: true,
		encodeSpecialCharacters: true
	}, _class.peek = Component.peek, _class.rewind = function() {
		var mappedState = Component.rewind();
		if (!mappedState) mappedState = mapStateOnServer({
			baseTag: [],
			bodyAttributes: {},
			encodeSpecialCharacters: true,
			htmlAttributes: {},
			linkTags: [],
			metaTags: [],
			noscriptTags: [],
			scriptTags: [],
			styleTags: [],
			title: "",
			titleAttributes: {}
		});
		return mappedState;
	}, _temp;
}((0, import_lib.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(function NullComponent() {
	return null;
}));
HelmetExport.renderStatic = HelmetExport.rewind;
//#endregion
export { HelmetExport as Helmet, HelmetExport as default };

//# sourceMappingURL=react-helmet.js.map
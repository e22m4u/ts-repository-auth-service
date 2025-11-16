"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __glob = (map) => (path) => {
  var fn = map[path];
  if (fn) return fn();
  throw new Error("Module not found in bundle: " + path);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@e22m4u/js-repository/src/utils/is-ctor.js
var init_is_ctor = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/is-ctor.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/utils/is-promise.js
function isPromise(value) {
  if (!value) return false;
  if (typeof value !== "object") return false;
  return typeof value.then === "function";
}
var init_is_promise = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/is-promise.js"() {
    __name(isPromise, "isPromise");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/capitalize.js
function capitalize(string) {
  if (!string || typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var init_capitalize = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/capitalize.js"() {
    __name(capitalize, "capitalize");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/clone-deep.js
function cloneDeep(value) {
  if (!value) return value;
  const types = [Number, String, Boolean];
  let result;
  types.forEach((type) => {
    if (value instanceof type) result = type(value);
  });
  if (result === void 0) {
    if (Array.isArray(value)) {
      result = [];
      value.forEach((child, index) => {
        result[index] = cloneDeep(child);
      });
    } else if (typeof value === "object") {
      if ("nodeType" in value && value.nodeType && "cloneNode" in value && typeof value.cloneNode === "function") {
        result = value.cloneNode(true);
      } else if (!("prototype" in value) || !value.prototype) {
        if (value instanceof Date) {
          result = new Date(value);
        } else if (value.constructor && value.constructor.name === "Object") {
          result = {};
          for (const key in value) {
            result[key] = cloneDeep(value[key]);
          }
        } else {
          result = value;
        }
      } else {
        result = value;
      }
    } else {
      result = value;
    }
  }
  return result;
}
var init_clone_deep = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/clone-deep.js"() {
    __name(cloneDeep, "cloneDeep");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/singularize.js
function singularize(noun) {
  if (!noun || typeof noun !== "string") return noun;
  const endings = {
    ves: "fe",
    ies: "y",
    i: "us",
    zes: "ze",
    ses: "s",
    es: "e",
    s: ""
  };
  return noun.replace(
    new RegExp(`(${Object.keys(endings).join("|")})$`),
    (r) => endings[r]
  );
}
var init_singularize = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/singularize.js"() {
    __name(singularize, "singularize");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/is-deep-equal.js
function isDeepEqual(firstValue, secondValue) {
  const cached = /* @__PURE__ */ new WeakMap();
  const compare = /* @__PURE__ */ __name((a, b) => {
    if (a === null || b === null) return a === b;
    if (typeof a !== "object" || typeof b !== "object") return a === b;
    const dataTypeA = Array.isArray(a) ? "array" : "object";
    const dataTypeB = Array.isArray(b) ? "array" : "object";
    if (dataTypeA !== dataTypeB) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    const symbolsA = Object.getOwnPropertySymbols(a);
    const symbolsB = Object.getOwnPropertySymbols(b);
    if (symbolsA.length !== symbolsB.length) return false;
    let setForA = cached.get(a);
    if (setForA == null) {
      setForA = /* @__PURE__ */ new Set();
      cached.set(a, setForA);
    } else if (setForA.has(b)) {
      return true;
    }
    setForA.add(b);
    let setForB = cached.get(b);
    if (setForB == null) {
      setForB = /* @__PURE__ */ new Set();
      cached.set(b, setForB);
    } else if (setForB.has(a)) {
      return true;
    }
    setForB.add(a);
    const propertyNamesA = [...keysA, ...symbolsA];
    for (const propertyNameA of propertyNamesA) {
      if (!Object.prototype.hasOwnProperty.call(b, propertyNameA)) return false;
      const propertyValueA = a[propertyNameA];
      const propertyValueB = b[propertyNameA];
      if (!compare(propertyValueA, propertyValueB)) return false;
    }
    return true;
  }, "compare");
  return compare(firstValue, secondValue);
}
var init_is_deep_equal = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/is-deep-equal.js"() {
    __name(isDeepEqual, "isDeepEqual");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/get-ctor-name.js
function getCtorName(value) {
  if (value === null) return "Null";
  if (value === void 0) return "Undefined";
  return value.constructor && value.constructor.name || void 0;
}
var init_get_ctor_name = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/get-ctor-name.js"() {
    __name(getCtorName, "getCtorName");
  }
});

// node_modules/@e22m4u/js-repository/src/errors/not-implemented-error.js
var import_js_format2, NotImplementedError;
var init_not_implemented_error = __esm({
  "node_modules/@e22m4u/js-repository/src/errors/not-implemented-error.js"() {
    import_js_format2 = require("@e22m4u/js-format");
    NotImplementedError = class extends import_js_format2.Errorf {
      static {
        __name(this, "NotImplementedError");
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/errors/invalid-argument-error.js
var import_js_format3, InvalidArgumentError;
var init_invalid_argument_error = __esm({
  "node_modules/@e22m4u/js-repository/src/errors/invalid-argument-error.js"() {
    import_js_format3 = require("@e22m4u/js-format");
    InvalidArgumentError = class extends import_js_format3.Errorf {
      static {
        __name(this, "InvalidArgumentError");
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/errors/invalid-operator-value-error.js
var import_js_format4, InvalidOperatorValueError;
var init_invalid_operator_value_error = __esm({
  "node_modules/@e22m4u/js-repository/src/errors/invalid-operator-value-error.js"() {
    import_js_format4 = require("@e22m4u/js-format");
    InvalidOperatorValueError = class extends Error {
      static {
        __name(this, "InvalidOperatorValueError");
      }
      /**
       * Constructor.
       *
       * @param {string} operator
       * @param {string} expected
       * @param {*} value
       */
      constructor(operator, expected, value) {
        super(
          (0, import_js_format4.format)(
            "Condition of {%s: ...} should have %s, but %v was given.",
            operator,
            expected,
            value
          )
        );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/errors/index.js
var init_errors = __esm({
  "node_modules/@e22m4u/js-repository/src/errors/index.js"() {
    init_not_implemented_error();
    init_invalid_argument_error();
    init_invalid_operator_value_error();
  }
});

// node_modules/@e22m4u/js-repository/src/utils/like-to-regexp.js
function likeToRegexp(pattern, isCaseInsensitive = false) {
  if (typeof pattern !== "string") {
    throw new InvalidArgumentError(
      "The first argument of `likeToRegexp` should be a String, but %v was given.",
      pattern
    );
  }
  const regexSpecials = "-[]{}()*+?.\\^$|";
  let regexString = "";
  let isEscaping = false;
  for (const char of pattern) {
    if (isEscaping) {
      regexString += regexSpecials.includes(char) ? `\\${char}` : char;
      isEscaping = false;
    } else if (char === "\\") {
      isEscaping = true;
    } else if (char === "%") {
      regexString += ".*";
    } else if (char === "_") {
      regexString += ".";
    } else if (regexSpecials.includes(char)) {
      regexString += `\\${char}`;
    } else {
      regexString += char;
    }
  }
  if (isEscaping) {
    regexString += "\\\\";
  }
  const flags = isCaseInsensitive ? "i" : "";
  return new RegExp(`^${regexString}$`, flags);
}
var init_like_to_regexp = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/like-to-regexp.js"() {
    init_errors();
    __name(likeToRegexp, "likeToRegexp");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/is-plain-object.js
function isPlainObject(value) {
  return Boolean(
    typeof value === "object" && value && !Array.isArray(value) && (!value.constructor || value.constructor && value.constructor.name === "Object")
  );
}
var init_is_plain_object = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/is-plain-object.js"() {
    __name(isPlainObject, "isPlainObject");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/string-to-regexp.js
function stringToRegexp(pattern, flags = void 0) {
  if (pattern instanceof RegExp) {
    return new RegExp(pattern, flags);
  }
  return new RegExp(pattern, flags);
}
var init_string_to_regexp = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/string-to-regexp.js"() {
    __name(stringToRegexp, "stringToRegexp");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/get-value-by-path.js
function getValueByPath(obj, path, orElse = void 0) {
  if (!obj || typeof obj !== "object") return orElse;
  if (!path || typeof path !== "string") return orElse;
  const keys = path.split(".");
  let value = obj;
  for (const key of keys) {
    if (typeof value === "object" && value !== null && key in value) {
      value = value[key];
    } else {
      value = orElse;
      break;
    }
  }
  return value;
}
var init_get_value_by_path = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/get-value-by-path.js"() {
    __name(getValueByPath, "getValueByPath");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/transform-promise.js
function transformPromise(valueOrPromise, transformer) {
  return isPromise(valueOrPromise) ? valueOrPromise.then(transformer) : transformer(valueOrPromise);
}
var init_transform_promise = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/transform-promise.js"() {
    init_is_promise();
    __name(transformPromise, "transformPromise");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/select-object-keys.js
function selectObjectKeys(obj, keys) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj))
    throw new InvalidArgumentError(
      "The first argument of selectObjectKeys should be an Object, but %v was given.",
      obj
    );
  if (!Array.isArray(keys))
    throw new InvalidArgumentError(
      "The second argument of selectObjectKeys should be an Array of String, but %v was given.",
      keys
    );
  keys.forEach((key) => {
    if (typeof key !== "string")
      throw new InvalidArgumentError(
        "The second argument of selectObjectKeys should be an Array of String, but %v was given.",
        key
      );
  });
  const result = {};
  const allKeys = Object.keys(obj);
  allKeys.forEach((key) => {
    if (keys.includes(key)) result[key] = obj[key];
  });
  return result;
}
var init_select_object_keys = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/select-object-keys.js"() {
    init_errors();
    __name(selectObjectKeys, "selectObjectKeys");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/exclude-object-keys.js
function excludeObjectKeys(obj, keys) {
  if (typeof obj !== "object" || !obj || Array.isArray(obj))
    throw new InvalidArgumentError(
      "Cannot exclude keys from a non-Object value, %v was given.",
      obj
    );
  const result = { ...obj };
  keys = Array.isArray(keys) ? keys : [keys];
  keys.forEach((key) => delete result[key]);
  return result;
}
var init_exclude_object_keys = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/exclude-object-keys.js"() {
    init_errors();
    __name(excludeObjectKeys, "excludeObjectKeys");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/model-name-to-model-key.js
function modelNameToModelKey(modelName) {
  if (!modelName || typeof modelName !== "string" || /\s/.test(modelName))
    throw new InvalidArgumentError(
      "The model name should be a non-empty String without spaces, but %v was given.",
      modelName
    );
  if (modelName.toLowerCase() !== "model")
    modelName = modelName.replace(/[-_]?Model$/, "").replace(/[-_](MODEL|model)$/, "");
  return modelName.toLowerCase().replace(/[-_]/g, "");
}
var init_model_name_to_model_key = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/model-name-to-model-key.js"() {
    init_errors();
    __name(modelNameToModelKey, "modelNameToModelKey");
  }
});

// node_modules/@e22m4u/js-repository/src/utils/get-decorator-target-type.js
var init_get_decorator_target_type = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/get-decorator-target-type.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/utils/index.js
var init_utils = __esm({
  "node_modules/@e22m4u/js-repository/src/utils/index.js"() {
    init_is_ctor();
    init_is_promise();
    init_capitalize();
    init_clone_deep();
    init_singularize();
    init_is_deep_equal();
    init_get_ctor_name();
    init_like_to_regexp();
    init_is_plain_object();
    init_string_to_regexp();
    init_get_value_by_path();
    init_transform_promise();
    init_select_object_keys();
    init_exclude_object_keys();
    init_model_name_to_model_key();
    init_get_decorator_target_type();
  }
});

// node_modules/@e22m4u/js-repository/src/filter/slice-clause-tool.js
var import_js_service4, SliceClauseTool;
var init_slice_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/slice-clause-tool.js"() {
    import_js_service4 = require("@e22m4u/js-service");
    init_errors();
    SliceClauseTool = class extends import_js_service4.Service {
      static {
        __name(this, "SliceClauseTool");
      }
      /**
       * Slice.
       *
       * @param {object[]} entities
       * @param {number|undefined} skip
       * @param {number|undefined} limit
       * @returns {object[]}
       */
      slice(entities, skip = void 0, limit = void 0) {
        if (!Array.isArray(entities))
          throw new InvalidArgumentError(
            "The first argument of SliceClauseTool.slice should be an Array, but %v was given.",
            entities
          );
        if (skip != null && typeof skip !== "number")
          throw new InvalidArgumentError(
            'The provided option "skip" should be a Number, but %v was given.',
            skip
          );
        if (limit != null && typeof limit !== "number")
          throw new InvalidArgumentError(
            'The provided option "limit" should be a Number, but %v was given.',
            limit
          );
        skip = skip || 0;
        limit = limit || entities.length;
        return entities.slice(skip, skip + limit);
      }
      /**
       * Validate skip clause.
       *
       * @param {number|undefined} skip
       */
      static validateSkipClause(skip) {
        if (skip == null) return;
        if (typeof skip !== "number")
          throw new InvalidArgumentError(
            'The provided option "skip" should be a Number, but %v was given.',
            skip
          );
      }
      /**
       * Validate limit clause.
       *
       * @param {number|undefined} limit
       */
      static validateLimitClause(limit) {
        if (limit == null) return;
        if (typeof limit !== "number")
          throw new InvalidArgumentError(
            'The provided option "limit" should be a Number, but %v was given.',
            limit
          );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/filter/order-clause-tool.js
function compareFn(a, b) {
  let undefinedA, undefinedB;
  for (let i = 0, l = this.length; i < l; i++) {
    const aVal = getValueByPath(a, this[i].key);
    const bVal = getValueByPath(b, this[i].key);
    undefinedB = bVal === void 0 && aVal !== void 0;
    undefinedA = aVal === void 0 && bVal !== void 0;
    if (undefinedB || aVal > bVal) {
      return this[i].reverse;
    } else if (undefinedA || aVal < bVal) {
      return -1 * this[i].reverse;
    }
  }
  return 0;
}
var import_js_service5, OrderClauseTool;
var init_order_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/order-clause-tool.js"() {
    import_js_service5 = require("@e22m4u/js-service");
    init_utils();
    init_errors();
    OrderClauseTool = class extends import_js_service5.Service {
      static {
        __name(this, "OrderClauseTool");
      }
      /**
       * Sort.
       *
       * @param {object[]} entities
       * @param {string|string[]|undefined} clause
       */
      sort(entities, clause) {
        if (clause == null) return;
        if (Array.isArray(clause) === false) clause = [clause];
        if (!clause.length) return;
        const mapping = [];
        clause.forEach((key, index) => {
          if (!key || typeof key !== "string")
            throw new InvalidArgumentError(
              'The provided option "order" should be a non-empty String or an Array of non-empty String, but %v was given.',
              key
            );
          let reverse = 1;
          const matches = key.match(/\s+(A|DE)SC$/i);
          if (matches) {
            key = key.replace(/\s+(A|DE)SC/i, "");
            if (matches[1].toLowerCase() === "de") reverse = -1;
          }
          mapping[index] = { key, reverse };
        });
        entities.sort(compareFn.bind(mapping));
      }
      /**
       * Validate order clause.
       *
       * @param {string|string[]|undefined} clause
       */
      static validateOrderClause(clause) {
        if (clause == null) return;
        if (Array.isArray(clause) === false) clause = [clause];
        if (!clause.length) return;
        clause.forEach((field) => {
          if (!field || typeof field !== "string")
            throw new InvalidArgumentError(
              'The provided option "order" should be a non-empty String or an Array of non-empty String, but %v was given.',
              field
            );
        });
      }
      /**
       * Normalize order clause.
       *
       * @param {string|string[]|undefined} clause
       * @returns {string[]|undefined}
       */
      static normalizeOrderClause(clause) {
        if (clause == null) return;
        if (Array.isArray(clause) === false) clause = [clause];
        if (!clause.length) return;
        clause.forEach((field) => {
          if (!field || typeof field !== "string")
            throw new InvalidArgumentError(
              'The provided option "order" should be a non-empty String or an Array of non-empty String, but %v was given.',
              field
            );
        });
        return clause;
      }
    };
    __name(compareFn, "compareFn");
  }
});

// node_modules/@e22m4u/js-repository/src/filter/operator-clause-tool.js
var import_js_service6, OperatorClauseTool;
var init_operator_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/operator-clause-tool.js"() {
    import_js_service6 = require("@e22m4u/js-service");
    init_utils();
    init_errors();
    OperatorClauseTool = class extends import_js_service6.Service {
      static {
        __name(this, "OperatorClauseTool");
      }
      /**
       * Compare.
       *
       * @param {*} val1 The 1st value
       * @param {*} val2 The 2nd value
       * @param {*} noTypeConversion
       * @returns {number} 0: =, positive: >, negative <
       */
      compare(val1, val2, noTypeConversion = false) {
        if (val1 === val2) {
          return 0;
        }
        if (val1 == null || val2 == null) {
          return val1 == val2 ? 0 : NaN;
        }
        const type1 = typeof val1;
        const type2 = typeof val2;
        if (type1 === "object" || type2 === "object") {
          return isDeepEqual(val1, val2) ? 0 : NaN;
        }
        if ((type1 === "number" || type1 === "string" || type1 === "boolean") && (type2 === "number" || type2 === "string" || type2 === "boolean")) {
          if (noTypeConversion && type1 !== type2) {
            return NaN;
          }
          const num1 = Number(val1);
          const num2 = Number(val2);
          if (!isNaN(num1) && !isNaN(num2)) {
            return num1 - num2;
          }
        }
        if (type1 === "string" && type2 === "string") {
          if (val1 > val2) return 1;
          if (val1 < val2) return -1;
          return 0;
        }
        return NaN;
      }
      /**
       * Test all operators.
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testAll(clause, value) {
        if (!clause || typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testAll should be an Object, but %v was given.",
            clause
          );
        const operatorMap = {
          eq: this.testEqNeq,
          neq: this.testEqNeq,
          gt: this.testGtLt,
          gte: this.testGtLt,
          lt: this.testGtLt,
          lte: this.testGtLt,
          inq: this.testInq,
          nin: this.testNin,
          between: this.testBetween,
          exists: this.testExists,
          like: this.testLike,
          nlike: this.testNlike,
          ilike: this.testIlike,
          nilike: this.testNilike,
          regexp: this.testRegexp
        };
        const clauseKeys = Object.keys(clause);
        const knownOperators = clauseKeys.filter((key) => operatorMap[key]);
        if (knownOperators.length === 0) {
          return void 0;
        }
        return knownOperators.every((op) => {
          const singleOpClause = { [op]: clause[op] };
          if (op === "regexp" && "flags" in clause) {
            singleOpClause.flags = clause.flags;
          }
          const testFn = operatorMap[op];
          const result = testFn.call(this, singleOpClause, value);
          return result;
        });
      }
      /**
       * Test eq/neq operator.
       *
       * @example
       * ```ts
       * {
       *   eq: 'foo',
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *   neq: 'foo',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testEqNeq(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testEqNeq should be an Object, but %v was given.",
            clause
          );
        if ("eq" in clause) return this.compare(clause.eq, value, true) === 0;
        if ("neq" in clause) return this.compare(clause.neq, value, true) !== 0;
      }
      /**
       * Test lt/gt/lte/gte operator.
       *
       * @example
       * ```ts
       * {
       *   lt: 10,
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *   lte: 10,
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *   gt: 10,
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *   gte: 10,
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testGtLt(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testGtLt should be an Object, but %v was given.",
            clause
          );
        if ("gt" in clause) return this.compare(value, clause.gt) > 0;
        if ("gte" in clause) return this.compare(value, clause.gte) >= 0;
        if ("lt" in clause) return this.compare(value, clause.lt) < 0;
        if ("lte" in clause) return this.compare(value, clause.lte) <= 0;
      }
      /**
       * Test inc operator.
       *
       * @example
       * ```ts
       * {
       *   inc: ['foo', 'bar'],
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testInq(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testInq should be an Object, but %v was given.",
            clause
          );
        if ("inq" in clause && clause.inq !== void 0) {
          if (!clause.inq || !Array.isArray(clause.inq)) {
            throw new InvalidOperatorValueError(
              "inq",
              "an Array of possible values",
              clause.inq
            );
          }
          for (let i = 0; i < clause.inq.length; i++) {
            if (this.compare(clause.inq[i], value, true) === 0) {
              return true;
            }
          }
          return false;
        }
      }
      /**
       * Test nin operator.
       *
       * @example
       * ```ts
       * {
       *   nin: ['foo', 'bar'],
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testNin(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testNin should be an Object, but %v was given.",
            clause
          );
        if ("nin" in clause && clause.nin !== void 0) {
          if (!clause.nin || !Array.isArray(clause.nin)) {
            throw new InvalidOperatorValueError(
              "nin",
              "an Array of possible values",
              clause.nin
            );
          }
          return clause.nin.every((element) => {
            return this.compare(element, value, true) !== 0;
          });
        }
      }
      /**
       * Test between operator.
       *
       * @example
       * ```ts
       * {
       *   between: [10, 20],
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testBetween(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testBetween should be an Object, but %v was given.",
            clause
          );
        if ("between" in clause && clause.between !== void 0) {
          if (!Array.isArray(clause.between) || clause.between.length !== 2) {
            throw new InvalidOperatorValueError(
              "between",
              "an Array of 2 elements",
              clause.between
            );
          }
          return this.testGtLt({ gte: clause.between[0] }, value) && this.testGtLt({ lte: clause.between[1] }, value);
        }
      }
      /**
       * Test exists operator.
       *
       * @example
       * ```ts
       * {
       *   exists: true,
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testExists(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testExists should be an Object, but %v was given.",
            clause
          );
        if ("exists" in clause && clause.exists !== void 0) {
          if (typeof clause.exists !== "boolean") {
            throw new InvalidOperatorValueError(
              "exists",
              "a Boolean",
              clause.exists
            );
          }
          return clause.exists ? value !== void 0 : value === void 0;
        }
      }
      /**
       * Test like operator.
       *
       * @example
       * ```ts
       * {
       *   like: 'foo',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testLike(clause, value) {
        if (!clause || typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testLike should be an Object, but %v was given.",
            clause
          );
        if ("like" in clause && clause.like !== void 0) {
          if (typeof clause.like !== "string")
            throw new InvalidOperatorValueError("like", "a String", clause.like);
          return likeToRegexp(clause.like).test(value);
        }
      }
      /**
       * Test nlike operator.
       *
       * @example
       * ```ts
       * {
       *   nlike: 'foo',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testNlike(clause, value) {
        if (!clause || typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testNlike should be an Object, but %v was given.",
            clause
          );
        if ("nlike" in clause && clause.nlike !== void 0) {
          if (typeof clause.nlike !== "string") {
            throw new InvalidOperatorValueError("nlike", "a String", clause.nlike);
          }
          return !likeToRegexp(clause.nlike).test(value);
        }
      }
      /**
       * Test ilike operator.
       *
       * @example
       * ```ts
       * {
       *   ilike: 'foo',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testIlike(clause, value) {
        if (!clause || typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testIlike should be an Object, but %v was given.",
            clause
          );
        if ("ilike" in clause && clause.ilike !== void 0) {
          if (typeof clause.ilike !== "string") {
            throw new InvalidOperatorValueError("ilike", "a String", clause.ilike);
          }
          return likeToRegexp(clause.ilike, true).test(value);
        }
      }
      /**
       * Test nilike operator.
       *
       * @example
       * ```ts
       * {
       *   nilike: 'foo',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testNilike(clause, value) {
        if (!clause || typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testNilike should be an Object, but %v was given.",
            clause
          );
        if ("nilike" in clause && clause.nilike !== void 0) {
          if (typeof clause.nilike !== "string") {
            throw new InvalidOperatorValueError(
              "nilike",
              "a String",
              clause.nilike
            );
          }
          return !likeToRegexp(clause.nilike, true).test(value);
        }
      }
      /**
       * Test regexp.
       *
       * @example
       * ```ts
       * {
       *   regexp: 'foo.*',
       * }
       * ```
       *
       * @example
       * ```ts
       * {
       *   regexp: 'foo.*',
       *   flags: 'i',
       * }
       * ```
       *
       * @param {object} clause
       * @param {*} value
       * @returns {boolean|undefined}
       */
      testRegexp(clause, value) {
        if (!clause || typeof clause !== "object")
          throw new InvalidArgumentError(
            "The first argument of OperatorUtils.testRegexp should be an Object, but %v was given.",
            clause
          );
        if ("regexp" in clause && clause.regexp !== void 0) {
          if (typeof clause.regexp !== "string" && !(clause.regexp instanceof RegExp)) {
            throw new InvalidOperatorValueError(
              "regexp",
              "a String",
              clause.regexp
            );
          }
          const flags = clause.flags || void 0;
          if (flags && typeof flags !== "string")
            throw new InvalidArgumentError(
              "RegExp flags should be a String, but %v was given.",
              clause.flags
            );
          if (!value || typeof value !== "string") return false;
          const regExp = stringToRegexp(clause.regexp, flags);
          return !!value.match(regExp);
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/filter/where-clause-tool.js
var import_js_service7, WhereClauseTool;
var init_where_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/where-clause-tool.js"() {
    import_js_service7 = require("@e22m4u/js-service");
    init_errors();
    init_operator_clause_tool();
    init_utils();
    WhereClauseTool = class extends import_js_service7.Service {
      static {
        __name(this, "WhereClauseTool");
      }
      /**
       * Filter by where clause.
       *
       * @example
       * ```
       * const entities = [
       *   {foo: 1, bar: 'a'},
       *   {foo: 2, bar: 'b'},
       *   {foo: 3, bar: 'b'},
       *   {foo: 4, bar: 'b'},
       * ];
       *
       * const result = filterByWhereClause(entities, {
       *   foo: {gt: 2},
       *   bar: 'b',
       * });
       *
       * console.log(result);
       * // [
       * //   {foo: 3, bar: 'b'},
       * //   {foo: 4, bar: 'b'},
       * // ];
       *
       * ```
       *
       * @param {object[]} entities
       * @param {WhereClause|undefined} where
       * @returns {object[]}
       */
      filter(entities, where = void 0) {
        if (!Array.isArray(entities))
          throw new InvalidArgumentError(
            "The first argument of WhereClauseTool.filter should be an Array of Object, but %v was given.",
            entities
          );
        if (where == null) return entities;
        return entities.filter(this._createFilter(where));
      }
      /**
       * Create where filter.
       *
       * @param {WhereClause} whereClause
       * @returns {Function}
       */
      _createFilter(whereClause) {
        if (typeof whereClause !== "object" || Array.isArray(whereClause))
          throw new InvalidArgumentError(
            'The provided option "where" should be an Object, but %v was given.',
            whereClause
          );
        const keys = Object.keys(whereClause);
        return (data) => {
          if (typeof data !== "object")
            throw new InvalidArgumentError(
              "The first argument of WhereClauseTool.filter should be an Array of Object, but %v was given.",
              data
            );
          return keys.every((key) => {
            if (key === "and" && key in whereClause) {
              const andClause = whereClause[key];
              if (Array.isArray(andClause))
                return andClause.every((clause) => this._createFilter(clause)(data));
            } else if (key === "or" && key in whereClause) {
              const orClause = whereClause[key];
              if (Array.isArray(orClause))
                return orClause.some((clause) => this._createFilter(clause)(data));
            }
            const value = getValueByPath(data, key);
            const matcher = whereClause[key];
            if (this._test(matcher, value)) return true;
          });
        };
      }
      /**
       * Value testing.
       *
       * @param {*} example
       * @param {*} value
       * @returns {boolean}
       */
      _test(example, value) {
        if (example === value) {
          return true;
        }
        if (example === null) {
          return value === null;
        }
        if (example === void 0) {
          return value === void 0;
        }
        if (example instanceof RegExp) {
          if (typeof value === "string") {
            return example.test(value);
          }
          if (Array.isArray(value)) {
            return value.some((el) => typeof el === "string" && example.test(el));
          }
          return false;
        }
        if (isPlainObject(example)) {
          const operatorsTest = this.getService(OperatorClauseTool).testAll(
            example,
            value
          );
          if (operatorsTest !== void 0) {
            if ("neq" in example && Array.isArray(value)) {
              return !value.some((el) => isDeepEqual(el, example.neq));
            }
            return operatorsTest;
          }
        }
        if (Array.isArray(value)) {
          const isElementMatched = value.some((el) => isDeepEqual(el, example));
          if (isElementMatched) return true;
        }
        return isDeepEqual(example, value);
      }
      /**
       * Validate where clause.
       *
       * @param {WhereClause|undefined} clause
       */
      static validateWhereClause(clause) {
        if (clause == null || typeof clause === "function") return;
        if (typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            'The provided option "where" should be an Object, but %v was given.',
            clause
          );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/relations/relation-type.js
var RelationType;
var init_relation_type = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/relations/relation-type.js"() {
    RelationType = {
      BELONGS_TO: "belongsTo",
      HAS_ONE: "hasOne",
      HAS_MANY: "hasMany",
      REFERENCES_MANY: "referencesMany"
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/relations/relation-definition.js
var init_relation_definition = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/relations/relation-definition.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/relations/relations-definition-validator.js
var import_js_service8, RelationsDefinitionValidator;
var init_relations_definition_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/relations/relations-definition-validator.js"() {
    import_js_service8 = require("@e22m4u/js-service");
    init_relation_type();
    init_relation_type();
    init_errors();
    RelationsDefinitionValidator = class extends import_js_service8.Service {
      static {
        __name(this, "RelationsDefinitionValidator");
      }
      /**
       * Validate.
       *
       * @param {string} modelName
       * @param {object} relDefs
       */
      validate(modelName, relDefs) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The first argument of RelationsDefinitionValidator.validate should be a non-empty String, but %v was given.",
            modelName
          );
        if (!relDefs || typeof relDefs !== "object" || Array.isArray(relDefs))
          throw new InvalidArgumentError(
            'The provided option "relations" of the model %v should be an Object, but %v was given.',
            modelName,
            relDefs
          );
        const relNames = Object.keys(relDefs);
        relNames.forEach((relName) => {
          const relDef = relDefs[relName];
          this._validateRelation(modelName, relName, relDef);
        });
      }
      /**
       * Validate relation.
       *
       * @param {string} modelName
       * @param {string} relName
       * @param {object} relDef
       */
      _validateRelation(modelName, relName, relDef) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The first argument of RelationsDefinitionValidator._validateRelation should be a non-empty String, but %v was given.",
            modelName
          );
        if (!relName || typeof relName !== "string")
          throw new InvalidArgumentError(
            "The relation name of the model %v should be a non-empty String, but %v was given.",
            modelName,
            relName
          );
        if (!relDef || typeof relDef !== "object" || Array.isArray(relDef))
          throw new InvalidArgumentError(
            "The relation %v of the model %v should be an Object, but %v was given.",
            relName,
            modelName,
            relDef
          );
        if (!relDef.type || !Object.values(RelationType).includes(relDef.type))
          throw new InvalidArgumentError(
            'The relation %v of the model %v requires the option "type" to have one of relation types: %l, but %v was given.',
            relName,
            modelName,
            Object.values(RelationType),
            relDef.type
          );
        this._validateBelongsTo(modelName, relName, relDef);
        this._validateHasOne(modelName, relName, relDef);
        this._validateHasMany(modelName, relName, relDef);
        this._validateReferencesMany(modelName, relName, relDef);
      }
      /**
       * Validate "belongsTo".
       *
       * @example The regular "belongsTo" relation.
       * ```
       * {
       *   type: RelationType.BELONGS_TO,
       *   model: 'model',
       *   foreignKey: 'modelId', // optional
       * }
       * ```
       *
       * @example The polymorphic "belongsTo" relation.
       * ```
       * {
       *   type: RelationType.BELONGS_TO,
       *   polymorphic: true,
       *   foreignKey: 'referenceId',      // optional
       *   discriminator: 'referenceType', // optional
       * }
       * ```
       *
       * @param {string} modelName
       * @param {string} relName
       * @param {object} relDef
       * @private
       */
      _validateBelongsTo(modelName, relName, relDef) {
        if (relDef.type !== RelationType.BELONGS_TO) return;
        if (relDef.polymorphic) {
          if (typeof relDef.polymorphic !== "boolean")
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "belongsTo", so it expects the option "polymorphic" to be a Boolean, but %v was given.',
              relName,
              modelName,
              relDef.polymorphic
            );
          if (relDef.foreignKey && typeof relDef.foreignKey !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v is a polymorphic "belongsTo" relation, so it expects the provided option "foreignKey" to be a String, but %v was given.',
              relName,
              modelName,
              relDef.foreignKey
            );
          if (relDef.discriminator && typeof relDef.discriminator !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v is a polymorphic "belongsTo" relation, so it expects the provided option "discriminator" to be a String, but %v was given.',
              relName,
              modelName,
              relDef.discriminator
            );
        } else {
          if (!relDef.model || typeof relDef.model !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "belongsTo", so it requires the option "model" to be a non-empty String, but %v was given.',
              relName,
              modelName,
              relDef.model
            );
          if (relDef.foreignKey && typeof relDef.foreignKey !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "belongsTo", so it expects the provided option "foreignKey" to be a String, but %v was given.',
              relName,
              modelName,
              relDef.foreignKey
            );
          if (relDef.discriminator)
            throw new InvalidArgumentError(
              'The relation %v of the model %v is a non-polymorphic "belongsTo" relation, so it should not have the option "discriminator" to be provided.',
              relName,
              modelName
            );
        }
      }
      /**
       * Validate "hasOne".
       *
       * @example The regular "hasOne" relation.
       * ```
       * {
       *   type: RelationType.HAS_ONE,
       *   model: 'model',
       *   foreignKey: 'modelId',
       * }
       * ```
       *
       * @example The polymorphic "hasOne" relation with a target relation name.
       * ```
       * {
       *   type: RelationType.HAS_ONE,
       *   model: 'model',
       *   polymorphic: 'reference',
       * }
       * ```
       *
       * @example The polymorphic "hasOne" relation with target relation keys.
       * ```
       * {
       *   type: RelationType.HAS_ONE,
       *   model: 'model',
       *   polymorphic: true,
       *   foreignKey: 'referenceId',
       *   discriminator: 'referenceType',
       * }
       * ```
       *
       * @param {string} modelName
       * @param {string} relName
       * @param {object} relDef
       * @private
       */
      _validateHasOne(modelName, relName, relDef) {
        if (relDef.type !== RelationType.HAS_ONE) return;
        if (!relDef.model || typeof relDef.model !== "string")
          throw new InvalidArgumentError(
            'The relation %v of the model %v has the type "hasOne", so it requires the option "model" to be a non-empty String, but %v was given.',
            relName,
            modelName,
            relDef.model
          );
        if (relDef.polymorphic) {
          if (typeof relDef.polymorphic === "string") {
            if (relDef.foreignKey)
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with a String value, so it should not have the option "foreignKey" to be provided.',
                relName,
                modelName
              );
            if (relDef.discriminator)
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with a String value, so it should not have the option "discriminator" to be provided.',
                relName,
                modelName
              );
          } else if (typeof relDef.polymorphic === "boolean") {
            if (!relDef.foreignKey || typeof relDef.foreignKey !== "string")
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with "true" value, so it requires the option "foreignKey" to be a non-empty String, but %v was given.',
                relName,
                modelName,
                relDef.foreignKey
              );
            if (!relDef.discriminator || typeof relDef.discriminator !== "string")
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with "true" value, so it requires the option "discriminator" to be a non-empty String, but %v was given.',
                relName,
                modelName,
                relDef.discriminator
              );
          } else {
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "hasOne", so it expects the provided option "polymorphic" to be a String or a Boolean, but %v was given.',
              relName,
              modelName,
              relDef.polymorphic
            );
          }
        } else {
          if (!relDef.foreignKey || typeof relDef.foreignKey !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "hasOne", so it requires the option "foreignKey" to be a non-empty String, but %v was given.',
              relName,
              modelName,
              relDef.foreignKey
            );
          if (relDef.discriminator)
            throw new InvalidArgumentError(
              'The relation %v of the model %v is a non-polymorphic "hasOne" relation, so it should not have the option "discriminator" to be provided.',
              relName,
              modelName
            );
        }
      }
      /**
       * Validate "hasMany".
       *
       * @example The regular "hasMany" relation.
       * ```
       * {
       *   type: RelationType.HAS_MANY,
       *   model: 'model',
       *   foreignKey: 'modelId',
       * }
       * ```
       *
       * @example The polymorphic "hasMany" relation with a target relation name.
       * ```
       * {
       *   type: RelationType.HAS_MANY,
       *   model: 'model',
       *   polymorphic: 'reference',
       * }
       * ```
       *
       * @example The polymorphic "hasMany" relation with target relation keys.
       * ```
       * {
       *   type: RelationType.HAS_MANY,
       *   model: 'model',
       *   polymorphic: true,
       *   foreignKey: 'referenceId',
       *   discriminator: 'referenceType',
       * }
       * ```
       *
       * @param {string} modelName
       * @param {string} relName
       * @param {object} relDef
       * @private
       */
      _validateHasMany(modelName, relName, relDef) {
        if (relDef.type !== RelationType.HAS_MANY) return;
        if (!relDef.model || typeof relDef.model !== "string")
          throw new InvalidArgumentError(
            'The relation %v of the model %v has the type "hasMany", so it requires the option "model" to be a non-empty String, but %v was given.',
            relName,
            modelName,
            relDef.model
          );
        if (relDef.polymorphic) {
          if (typeof relDef.polymorphic === "string") {
            if (relDef.foreignKey)
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with a String value, so it should not have the option "foreignKey" to be provided.',
                relName,
                modelName
              );
            if (relDef.discriminator)
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with a String value, so it should not have the option "discriminator" to be provided.',
                relName,
                modelName
              );
          } else if (typeof relDef.polymorphic === "boolean") {
            if (!relDef.foreignKey || typeof relDef.foreignKey !== "string")
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with "true" value, so it requires the option "foreignKey" to be a non-empty String, but %v was given.',
                relName,
                modelName,
                relDef.foreignKey
              );
            if (!relDef.discriminator || typeof relDef.discriminator !== "string")
              throw new InvalidArgumentError(
                'The relation %v of the model %v has the option "polymorphic" with "true" value, so it requires the option "discriminator" to be a non-empty String, but %v was given.',
                relName,
                modelName,
                relDef.discriminator
              );
          } else {
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "hasMany", so it expects the provided option "polymorphic" to be a String or a Boolean, but %v was given.',
              relName,
              modelName,
              relDef.polymorphic
            );
          }
        } else {
          if (!relDef.foreignKey || typeof relDef.foreignKey !== "string")
            throw new InvalidArgumentError(
              'The relation %v of the model %v has the type "hasMany", so it requires the option "foreignKey" to be a non-empty String, but %v was given.',
              relName,
              modelName,
              relDef.foreignKey
            );
          if (relDef.discriminator)
            throw new InvalidArgumentError(
              'The relation %v of the model %v is a non-polymorphic "hasMany" relation, so it should not have the option "discriminator" to be provided.',
              relName,
              modelName
            );
        }
      }
      /**
       * Validate "referencesMany".
       *
       * @example
       * ```
       * {
       *   type: RelationType.REFERENCES_MANY,
       *   model: 'model',
       *   foreignKey: 'modelIds', // optional
       * }
       * ```
       *
       * @param {string} modelName
       * @param {string} relName
       * @param {object} relDef
       * @private
       */
      _validateReferencesMany(modelName, relName, relDef) {
        if (relDef.type !== RelationType.REFERENCES_MANY) return;
        if (!relDef.model || typeof relDef.model !== "string")
          throw new InvalidArgumentError(
            'The relation %v of the model %v has the type "referencesMany", so it requires the option "model" to be a non-empty String, but %v was given.',
            relName,
            modelName,
            relDef.model
          );
        if (relDef.foreignKey && typeof relDef.foreignKey !== "string")
          throw new InvalidArgumentError(
            'The relation %v of the model %v has the type "referencesMany", so it expects the provided option "foreignKey" to be a String, but %v was given.',
            relName,
            modelName,
            relDef.foreignKey
          );
        if (relDef.discriminator)
          throw new InvalidArgumentError(
            'The relation %v of the model %v has the type "referencesMany", so it should not have the option "discriminator" to be provided.',
            relName,
            modelName
          );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/relations/index.js
var init_relations = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/relations/index.js"() {
    init_relation_type();
    init_relation_definition();
    init_relations_definition_validator();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/data-type.js
var DataType;
var init_data_type = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/data-type.js"() {
    DataType = {
      ANY: "any",
      STRING: "string",
      NUMBER: "number",
      BOOLEAN: "boolean",
      ARRAY: "array",
      OBJECT: "object"
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-definition.js
var init_property_definition = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-definition.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-uniqueness.js
var PropertyUniqueness;
var init_property_uniqueness = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-uniqueness.js"() {
    PropertyUniqueness = {
      STRICT: "strict",
      SPARSE: "sparse",
      NON_UNIQUE: "nonUnique"
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/property-validator.js
var init_property_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/property-validator.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/regexp-validator.js
function regexpValidator(value, options, context) {
  if (value == null || options === false) return true;
  if (typeof options !== "string" && !(options instanceof RegExp))
    throw new InvalidArgumentError(
      'The validator %v requires the "options" argument as a String or RegExp, but %v was given.',
      context.validatorName,
      options
    );
  if (typeof value === "string") {
    const regexp = stringToRegexp(options);
    return regexp.test(value);
  }
  throw new InvalidArgumentError(
    "The property validator %v requires a String value, but %v was given.",
    context.validatorName,
    value
  );
}
var init_regexp_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/regexp-validator.js"() {
    init_utils();
    init_errors();
    __name(regexpValidator, "regexpValidator");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/max-length-validator.js
function maxLengthValidator(value, options, context) {
  if (value == null || options === false) return true;
  if (typeof options !== "number")
    throw new InvalidArgumentError(
      'The validator %v requires the "options" argument as a Number, but %v was given.',
      context.validatorName,
      options
    );
  if (typeof value === "string" || Array.isArray(value))
    return value.length <= options;
  throw new InvalidArgumentError(
    "The property validator %v requires a String or an Array value, but %v was given.",
    context.validatorName,
    value
  );
}
var init_max_length_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/max-length-validator.js"() {
    init_errors();
    __name(maxLengthValidator, "maxLengthValidator");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/min-length-validator.js
function minLengthValidator(value, options, context) {
  if (value == null || options === false) return true;
  if (typeof options !== "number")
    throw new InvalidArgumentError(
      'The validator %v requires the "options" argument as a Number, but %v was given.',
      context.validatorName,
      options
    );
  if (typeof value === "string" || Array.isArray(value))
    return value.length >= options;
  throw new InvalidArgumentError(
    "The property validator %v requires a String or an Array value, but %v was given.",
    context.validatorName,
    value
  );
}
var init_min_length_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/min-length-validator.js"() {
    init_errors();
    __name(minLengthValidator, "minLengthValidator");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/index.js
var init_builtin = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/builtin/index.js"() {
    init_regexp_validator();
    init_max_length_validator();
    init_min_length_validator();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/property-validator-registry.js
var import_js_service9, PropertyValidatorRegistry;
var init_property_validator_registry = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/property-validator-registry.js"() {
    import_js_service9 = require("@e22m4u/js-service");
    init_builtin();
    init_builtin();
    init_builtin();
    init_errors();
    PropertyValidatorRegistry = class extends import_js_service9.Service {
      static {
        __name(this, "PropertyValidatorRegistry");
      }
      /**
       * Validators.
       *
       * @type {object}
       */
      _validators = {
        maxLength: maxLengthValidator,
        minLength: minLengthValidator,
        regexp: regexpValidator
      };
      /**
       * Add validator.
       *
       * @param {string} name
       * @param {Function} validator
       * @returns {PropertyValidatorRegistry}
       */
      addValidator(name, validator) {
        if (!name || typeof name !== "string")
          throw new InvalidArgumentError(
            "A name of the property validator must be a non-empty String, but %v was given.",
            name
          );
        if (name in this._validators)
          throw new InvalidArgumentError(
            "The property validator %v is already defined.",
            name
          );
        if (typeof validator !== "function")
          throw new InvalidArgumentError(
            "The property validator %v must be a Function, but %v was given.",
            name,
            validator
          );
        this._validators[name] = validator;
        return this;
      }
      /**
       * Has validator.
       *
       * @param {string} name
       * @returns {boolean}
       */
      hasValidator(name) {
        return Boolean(this._validators[name]);
      }
      /**
       * Get validator.
       *
       * @param {string} name
       * @returns {Function}
       */
      getValidator(name) {
        const validator = this._validators[name];
        if (!validator)
          throw new InvalidArgumentError(
            "The property validator %v is not defined.",
            name
          );
        return validator;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/index.js
var init_property_validator2 = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-validator/index.js"() {
    init_property_validator();
    init_property_validator_registry();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/property-transformer.js
var init_property_transformer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/property-transformer.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/trim-transformer.js
function trimTransformer(value, options, context) {
  if (value == null) return value;
  if (typeof value === "string") return value.trim();
  throw new InvalidArgumentError(
    "The property transformer %v requires a String value, but %v was given.",
    context.transformerName,
    value
  );
}
var init_trim_transformer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/trim-transformer.js"() {
    init_errors();
    __name(trimTransformer, "trimTransformer");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/to-lower-case-transformer.js
function toLowerCaseTransformer(value, options, context) {
  if (value == null) return value;
  if (typeof value === "string") return value.toLowerCase();
  throw new InvalidArgumentError(
    "The property transformer %v requires a String value, but %v was given.",
    context.transformerName,
    value
  );
}
var init_to_lower_case_transformer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/to-lower-case-transformer.js"() {
    init_errors();
    __name(toLowerCaseTransformer, "toLowerCaseTransformer");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/to-upper-case-transformer.js
function toUpperCaseTransformer(value, options, context) {
  if (value == null) return value;
  if (typeof value === "string") return value.toUpperCase();
  throw new InvalidArgumentError(
    "The property transformer %v requires a String value, but %v was given.",
    context.transformerName,
    value
  );
}
var init_to_upper_case_transformer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/to-upper-case-transformer.js"() {
    init_errors();
    __name(toUpperCaseTransformer, "toUpperCaseTransformer");
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/index.js
var init_builtin2 = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/builtin/index.js"() {
    init_trim_transformer();
    init_to_lower_case_transformer();
    init_to_upper_case_transformer();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/property-transformer-registry.js
var import_js_service10, PropertyTransformerRegistry;
var init_property_transformer_registry = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/property-transformer-registry.js"() {
    import_js_service10 = require("@e22m4u/js-service");
    init_builtin2();
    init_builtin2();
    init_builtin2();
    init_errors();
    PropertyTransformerRegistry = class extends import_js_service10.Service {
      static {
        __name(this, "PropertyTransformerRegistry");
      }
      /**
       * Transformers.
       *
       * @type {object}
       */
      _transformers = {
        trim: trimTransformer,
        toUpperCase: toUpperCaseTransformer,
        toLowerCase: toLowerCaseTransformer
      };
      /**
       * Add transformer.
       *
       * @param {string} name
       * @param {Function} transformer
       * @returns {PropertyTransformerRegistry}
       */
      addTransformer(name, transformer) {
        if (!name || typeof name !== "string")
          throw new InvalidArgumentError(
            "A name of the property transformer must be a non-empty String, but %v was given.",
            name
          );
        if (name in this._transformers)
          throw new InvalidArgumentError(
            "The property transformer %v is already defined.",
            name
          );
        if (typeof transformer !== "function")
          throw new InvalidArgumentError(
            "The property transformer %v must be a Function, but %v was given.",
            name,
            transformer
          );
        this._transformers[name] = transformer;
        return this;
      }
      /**
       * Has transformer.
       *
       * @param {string} name
       * @returns {boolean}
       */
      hasTransformer(name) {
        return Boolean(this._transformers[name]);
      }
      /**
       * Get transformer.
       *
       * @param {string} name
       * @returns {Function}
       */
      getTransformer(name) {
        const transformer = this._transformers[name];
        if (!transformer)
          throw new InvalidArgumentError(
            "The property transformer %v is not defined.",
            name
          );
        return transformer;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/index.js
var init_property_transformer2 = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-transformer/index.js"() {
    init_property_transformer();
    init_property_transformer_registry();
  }
});

// node_modules/@e22m4u/js-empty-values/src/data-type.js
var DataType2;
var init_data_type2 = __esm({
  "node_modules/@e22m4u/js-empty-values/src/data-type.js"() {
    DataType2 = {
      ANY: "any",
      STRING: "string",
      NUMBER: "number",
      BOOLEAN: "boolean",
      ARRAY: "array",
      OBJECT: "object"
    };
  }
});

// node_modules/@e22m4u/js-empty-values/src/utils/is-deep-equal.js
function isDeepEqual2(firstValue, secondValue) {
  const cached = /* @__PURE__ */ new WeakMap();
  const compare = /* @__PURE__ */ __name((a, b) => {
    if (a === null || b === null) return a === b;
    if (typeof a !== "object" || typeof b !== "object") return a === b;
    if (a.constructor !== b.constructor) return false;
    const dataTypeA = Array.isArray(a) ? "array" : "object";
    const dataTypeB = Array.isArray(b) ? "array" : "object";
    if (dataTypeA !== dataTypeB) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    const symbolsA = Object.getOwnPropertySymbols(a);
    const symbolsB = Object.getOwnPropertySymbols(b);
    if (symbolsA.length !== symbolsB.length) return false;
    let setForA = cached.get(a);
    if (setForA == null) {
      setForA = /* @__PURE__ */ new Set();
      cached.set(a, setForA);
    } else if (setForA.has(b)) {
      return true;
    }
    setForA.add(b);
    let setForB = cached.get(b);
    if (setForB == null) {
      setForB = /* @__PURE__ */ new Set();
      cached.set(b, setForB);
    } else if (setForB.has(a)) {
      return true;
    }
    setForB.add(a);
    const propertyNamesA = [...keysA, ...symbolsA];
    for (const propertyNameA of propertyNamesA) {
      if (!Object.prototype.hasOwnProperty.call(b, propertyNameA)) return false;
      const propertyValueA = a[propertyNameA];
      const propertyValueB = b[propertyNameA];
      if (!compare(propertyValueA, propertyValueB)) return false;
    }
    return true;
  }, "compare");
  return compare(firstValue, secondValue);
}
var init_is_deep_equal2 = __esm({
  "node_modules/@e22m4u/js-empty-values/src/utils/is-deep-equal.js"() {
    __name(isDeepEqual2, "isDeepEqual");
  }
});

// node_modules/@e22m4u/js-empty-values/src/utils/get-data-type-of.js
function getDataTypeOf(value) {
  if (typeof value === "string") {
    return DataType2.STRING;
  } else if (typeof value === "number") {
    return DataType2.NUMBER;
  } else if (typeof value === "boolean") {
    return DataType2.BOOLEAN;
  } else if (Array.isArray(value)) {
    return DataType2.ARRAY;
  } else if (typeof value === "object" && value !== null) {
    return DataType2.OBJECT;
  }
  return DataType2.ANY;
}
var init_get_data_type_of = __esm({
  "node_modules/@e22m4u/js-empty-values/src/utils/get-data-type-of.js"() {
    init_data_type2();
    __name(getDataTypeOf, "getDataTypeOf");
  }
});

// node_modules/@e22m4u/js-empty-values/src/utils/index.js
var init_utils2 = __esm({
  "node_modules/@e22m4u/js-empty-values/src/utils/index.js"() {
    init_is_deep_equal2();
    init_get_data_type_of();
  }
});

// node_modules/@e22m4u/js-empty-values/src/empty-values-service.js
var import_js_format5, import_js_service11, EmptyValuesService;
var init_empty_values_service = __esm({
  "node_modules/@e22m4u/js-empty-values/src/empty-values-service.js"() {
    init_data_type2();
    import_js_format5 = require("@e22m4u/js-format");
    import_js_service11 = require("@e22m4u/js-service");
    init_utils2();
    init_utils2();
    EmptyValuesService = class extends import_js_service11.Service {
      static {
        __name(this, "EmptyValuesService");
      }
      /**
       * Empty values map.
       *
       * @type {Map<string, *[]>}
       */
      _emptyValuesMap = /* @__PURE__ */ new Map([
        [DataType2.ANY, [void 0, null]],
        [DataType2.STRING, [void 0, null, ""]],
        [DataType2.NUMBER, [void 0, null, 0]],
        [DataType2.BOOLEAN, [void 0, null]],
        [DataType2.ARRAY, [void 0, null, []]],
        [DataType2.OBJECT, [void 0, null, {}]]
      ]);
      /**
       * Set empty values of data type.
       *
       * @param {string} dataType
       * @param {*[]} emptyValues
       * @returns {EmptyValuesService}
       */
      setEmptyValuesOf(dataType, emptyValues) {
        if (!Object.values(DataType2).includes(dataType))
          throw new import_js_format5.Errorf(
            'The argument "dataType" of the EmptyValuesService.setEmptyValuesOf must be one of data types: %l, but %v given.',
            Object.values(DataType2),
            dataType
          );
        if (!Array.isArray(emptyValues))
          throw new import_js_format5.Errorf(
            'The argument "emptyValues" of the EmptyValuesService.setEmptyValuesOf must be an Array, but %v given.',
            emptyValues
          );
        this._emptyValuesMap.set(dataType, emptyValues);
        return this;
      }
      /**
       * Is empty.
       *
       * @param {*} value
       * @returns {boolean}
       */
      isEmpty(value) {
        const dataType = getDataTypeOf(value);
        return this._emptyValuesMap.get(dataType).some((v) => isDeepEqual2(v, value));
      }
      /**
       * Is empty for type.
       *
       * @param {string} dataType
       * @param {*} value
       * @returns {boolean}
       */
      isEmptyByType(dataType, value) {
        if (!Object.values(DataType2).includes(dataType))
          throw new import_js_format5.Errorf(
            'The argument "dataType" of EmptyValuesService.isEmptyByType must be one of data types: %l, but %v given.',
            Object.values(DataType2),
            dataType
          );
        return this._emptyValuesMap.get(dataType).some((v) => isDeepEqual2(v, value));
      }
    };
  }
});

// node_modules/@e22m4u/js-empty-values/src/index.js
var init_src = __esm({
  "node_modules/@e22m4u/js-empty-values/src/index.js"() {
    init_empty_values_service();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/definition-registry.js
var import_js_service12, DefinitionRegistry;
var init_definition_registry = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/definition-registry.js"() {
    import_js_service12 = require("@e22m4u/js-service");
    init_utils();
    init_errors();
    init_model();
    init_definition();
    DefinitionRegistry = class extends import_js_service12.Service {
      static {
        __name(this, "DefinitionRegistry");
      }
      /**
       * Datasources.
       *
       * @type {object}
       */
      _datasources = {};
      /**
       * Models.
       *
       * @type {object}
       */
      _models = {};
      /**
       * Add datasource.
       *
       * @param {object} datasourceDef
       */
      addDatasource(datasourceDef) {
        this.getService(DatasourceDefinitionValidator).validate(datasourceDef);
        const name = datasourceDef.name;
        if (name in this._datasources)
          throw new InvalidArgumentError(
            "The datasource %v is already defined.",
            name
          );
        this._datasources[name] = datasourceDef;
      }
      /**
       * Has datasource.
       *
       * @param {string} name
       * @returns {boolean}
       */
      hasDatasource(name) {
        return Boolean(this._datasources[name]);
      }
      /**
       * Get datasource.
       *
       * @param {string} name
       * @returns {object}
       */
      getDatasource(name) {
        const datasourceDef = this._datasources[name];
        if (!datasourceDef)
          throw new InvalidArgumentError("The datasource %v is not defined.", name);
        return datasourceDef;
      }
      /**
       * Add model.
       *
       * @param {object} modelDef
       */
      addModel(modelDef) {
        this.getService(ModelDefinitionValidator).validate(modelDef);
        const modelKey = modelNameToModelKey(modelDef.name);
        if (modelKey in this._models)
          throw new InvalidArgumentError(
            "The model %v is already defined.",
            modelDef.name
          );
        this._models[modelKey] = modelDef;
      }
      /**
       * Has model.
       *
       * @param {string} name
       * @returns {boolean}
       */
      hasModel(name) {
        const modelKey = modelNameToModelKey(name);
        return Boolean(this._models[modelKey]);
      }
      /**
       * Get model.
       *
       * @param {string} name
       * @returns {object}
       */
      getModel(name) {
        const modelKey = modelNameToModelKey(name);
        const modelDef = this._models[modelKey];
        if (!modelDef)
          throw new InvalidArgumentError("The model %v is not defined.", name);
        return modelDef;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-definition-utils.js
var import_js_service13, DEFAULT_PRIMARY_KEY_PROPERTY_NAME, ModelDefinitionUtils;
var init_model_definition_utils = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-definition-utils.js"() {
    import_js_service13 = require("@e22m4u/js-service");
    init_properties();
    init_utils();
    init_utils();
    init_src();
    init_errors();
    init_definition_registry();
    DEFAULT_PRIMARY_KEY_PROPERTY_NAME = "id";
    ModelDefinitionUtils = class extends import_js_service13.Service {
      static {
        __name(this, "ModelDefinitionUtils");
      }
      /**
       * Get primary key as property name.
       *
       * @param {string} modelName
       * @returns {string}
       */
      getPrimaryKeyAsPropertyName(modelName) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propNames = Object.keys(propDefs).filter((propName) => {
          const propDef = propDefs[propName];
          return propDef && typeof propDef === "object" && propDef.primaryKey;
        });
        if (propNames.length < 1) {
          const isDefaultPrimaryKeyAlreadyInUse = Object.keys(propDefs).includes(
            DEFAULT_PRIMARY_KEY_PROPERTY_NAME
          );
          if (isDefaultPrimaryKeyAlreadyInUse)
            throw new InvalidArgumentError(
              'The property name %v of the model %v is defined as a regular property. In this case, a primary key should be defined explicitly. Do use the option "primaryKey" to specify the primary key.',
              DEFAULT_PRIMARY_KEY_PROPERTY_NAME,
              modelName
            );
          return DEFAULT_PRIMARY_KEY_PROPERTY_NAME;
        }
        return propNames[0];
      }
      /**
       * Get primary key as column name.
       *
       * @param {string} modelName
       * @returns {string}
       */
      getPrimaryKeyAsColumnName(modelName) {
        const pkPropName = this.getPrimaryKeyAsPropertyName(modelName);
        let pkColName;
        try {
          pkColName = this.getColumnNameByPropertyName(modelName, pkPropName);
        } catch (error) {
          if (!(error instanceof InvalidArgumentError)) throw error;
        }
        if (pkColName === void 0) return pkPropName;
        return pkColName;
      }
      /**
       * Get table name by model name.
       *
       * @param {string} modelName
       * @returns {string}
       */
      getTableNameByModelName(modelName) {
        const modelDef = this.getService(DefinitionRegistry).getModel(modelName);
        return modelDef.tableName ?? modelName;
      }
      /**
       * Get column name by property name.
       *
       * @param {string} modelName
       * @param {string} propertyName
       * @returns {string}
       */
      getColumnNameByPropertyName(modelName, propertyName) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propDef = propDefs[propertyName];
        if (!propDef)
          throw new InvalidArgumentError(
            "The model %v does not have the property %v.",
            modelName,
            propertyName
          );
        if (propDef && typeof propDef === "object")
          return propDef.columnName ?? propertyName;
        return propertyName;
      }
      /**
       * Get default property value.
       *
       * @param {string} modelName
       * @param {string} propertyName
       * @returns {*}
       */
      getDefaultPropertyValue(modelName, propertyName) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propDef = propDefs[propertyName];
        if (!propDef)
          throw new InvalidArgumentError(
            "The model %v does not have the property %v.",
            modelName,
            propertyName
          );
        if (propDef && typeof propDef === "object")
          return propDef.default instanceof Function ? propDef.default() : propDef.default;
      }
      /**
       * Set default values for empty properties.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {boolean|undefined} onlyProvidedProperties
       * @returns {object}
       */
      setDefaultValuesToEmptyProperties(modelName, modelData, onlyProvidedProperties = false) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propNames = onlyProvidedProperties ? Object.keys(modelData) : Object.keys(propDefs);
        const extendedData = cloneDeep(modelData);
        const emptyValuesService = this.getService(EmptyValuesService);
        propNames.forEach((propName) => {
          const propDef = propDefs[propName];
          const propValue = extendedData[propName];
          const propType = propDef != null ? this.getDataTypeFromPropertyDefinition(propDef) : DataType.ANY;
          const isEmpty = emptyValuesService.isEmptyByType(propType, propValue);
          if (!isEmpty) return;
          if (propDef && typeof propDef === "object" && propDef.default !== void 0) {
            extendedData[propName] = this.getDefaultPropertyValue(
              modelName,
              propName
            );
          }
        });
        return extendedData;
      }
      /**
       * Convert property names to column names.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @returns {object}
       */
      convertPropertyNamesToColumnNames(modelName, modelData) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propNames = Object.keys(propDefs);
        const convertedData = cloneDeep(modelData);
        propNames.forEach((propName) => {
          if (!(propName in convertedData)) return;
          const colName = this.getColumnNameByPropertyName(modelName, propName);
          let propValue = convertedData[propName];
          const propDef = propDefs[propName];
          if (propValue !== null && typeof propValue === "object" && !Array.isArray(propValue) && propDef !== null && typeof propDef === "object" && propDef.type === DataType.OBJECT && propDef.model) {
            propValue = this.convertPropertyNamesToColumnNames(
              propDef.model,
              propValue
            );
          }
          if (Array.isArray(propValue) && propDef !== null && typeof propDef === "object" && propDef.type === DataType.ARRAY && propDef.itemModel) {
            propValue = propValue.map((el) => {
              return el !== null && typeof el === "object" && !Array.isArray(el) ? this.convertPropertyNamesToColumnNames(propDef.itemModel, el) : el;
            });
          }
          delete convertedData[propName];
          convertedData[colName] = propValue;
        });
        return convertedData;
      }
      /**
       * Convert column names to property names.
       *
       * @param {string} modelName
       * @param {object} tableData
       * @returns {object}
       */
      convertColumnNamesToPropertyNames(modelName, tableData) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propNames = Object.keys(propDefs);
        const convertedData = cloneDeep(tableData);
        propNames.forEach((propName) => {
          const colName = this.getColumnNameByPropertyName(modelName, propName);
          if (!(colName in convertedData)) return;
          let colValue = convertedData[colName];
          const propDef = propDefs[propName];
          if (colValue !== null && typeof colValue === "object" && !Array.isArray(colValue) && propDef !== null && typeof propDef === "object" && propDef.type === DataType.OBJECT && propDef.model) {
            colValue = this.convertColumnNamesToPropertyNames(
              propDef.model,
              colValue
            );
          }
          if (Array.isArray(colValue) && propDef !== null && typeof propDef === "object" && propDef.type === DataType.ARRAY && propDef.itemModel) {
            colValue = colValue.map((el) => {
              return el !== null && typeof el === "object" && !Array.isArray(el) ? this.convertColumnNamesToPropertyNames(propDef.itemModel, el) : el;
            });
          }
          delete convertedData[colName];
          convertedData[propName] = colValue;
        });
        return convertedData;
      }
      /**
       * Get data type by property name.
       *
       * @param {string} modelName
       * @param {string} propertyName
       * @returns {string}
       */
      getDataTypeByPropertyName(modelName, propertyName) {
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propDef = propDefs[propertyName];
        if (!propDef) {
          const pkPropName = this.getPrimaryKeyAsPropertyName(modelName);
          if (pkPropName === propertyName) return DataType.ANY;
          throw new InvalidArgumentError(
            "The model %v does not have the property %v.",
            modelName,
            propertyName
          );
        }
        if (typeof propDef === "string") return propDef;
        return propDef.type;
      }
      /**
       * Get data type from property definition.
       *
       * @param {object} propDef
       * @returns {string}
       */
      getDataTypeFromPropertyDefinition(propDef) {
        if ((!propDef || typeof propDef !== "object") && !Object.values(DataType).includes(propDef)) {
          throw new InvalidArgumentError(
            'The argument "propDef" of the ModelDefinitionUtils.getDataTypeFromPropertyDefinition should be an Object or the DataType enum, but %v was given.',
            propDef
          );
        }
        if (typeof propDef === "string") return propDef;
        const dataType = propDef.type;
        if (!Object.values(DataType).includes(dataType))
          throw new InvalidArgumentError(
            'The given Object to the ModelDefinitionUtils.getDataTypeFromPropertyDefinition should have the "type" property with one of values: %l, but %v was given.',
            Object.values(DataType),
            propDef.type
          );
        return dataType;
      }
      /**
       * Get own properties definition of primary keys.
       *
       * @param {string} modelName
       * @returns {object}
       */
      getOwnPropertiesDefinitionOfPrimaryKeys(modelName) {
        const modelDef = this.getService(DefinitionRegistry).getModel(modelName);
        const propDefs = modelDef.properties ?? {};
        const pkPropNames = Object.keys(propDefs).filter((propName) => {
          const propDef = propDefs[propName];
          return typeof propDef === "object" && propDef.primaryKey;
        });
        return pkPropNames.reduce((a, k) => ({ ...a, [k]: propDefs[k] }), {});
      }
      /**
       * Get own properties definition without primary keys.
       *
       * @param {string} modelName
       * @returns {object}
       */
      getOwnPropertiesDefinitionWithoutPrimaryKeys(modelName) {
        const modelDef = this.getService(DefinitionRegistry).getModel(modelName);
        const propDefs = modelDef.properties ?? {};
        return Object.keys(propDefs).reduce((result, propName) => {
          const propDef = propDefs[propName];
          if (typeof propDef === "object" && propDef.primaryKey) return result;
          return { ...result, [propName]: propDef };
        }, {});
      }
      /**
       * Get properties definition in base model hierarchy.
       *
       * @param {string} modelName
       * @returns {object}
       */
      getPropertiesDefinitionInBaseModelHierarchy(modelName) {
        let pkPropDefs = {};
        let regularPropDefs = {};
        const recursion = /* @__PURE__ */ __name((currModelName, prevModelName = void 0) => {
          if (currModelName === prevModelName)
            throw new InvalidArgumentError(
              "The model %v has a circular inheritance.",
              currModelName
            );
          if (Object.keys(pkPropDefs).length === 0)
            pkPropDefs = this.getOwnPropertiesDefinitionOfPrimaryKeys(currModelName);
          regularPropDefs = {
            ...this.getOwnPropertiesDefinitionWithoutPrimaryKeys(currModelName),
            ...regularPropDefs
          };
          const modelDef = this.getService(DefinitionRegistry).getModel(currModelName);
          if (modelDef.base) recursion(modelDef.base, currModelName);
        }, "recursion");
        recursion(modelName);
        return { ...pkPropDefs, ...regularPropDefs };
      }
      /**
       * Get own relations definition.
       *
       * @param {string} modelName
       * @returns {object}
       */
      getOwnRelationsDefinition(modelName) {
        const modelDef = this.getService(DefinitionRegistry).getModel(modelName);
        return modelDef.relations ?? {};
      }
      /**
       * Get relations definition in base model hierarchy.
       *
       * @param {string} modelName
       * @returns {object}
       */
      getRelationsDefinitionInBaseModelHierarchy(modelName) {
        let result = {};
        const recursion = /* @__PURE__ */ __name((currModelName, prevModelName = void 0) => {
          if (currModelName === prevModelName)
            throw new InvalidArgumentError(
              "The model %v has a circular inheritance.",
              currModelName
            );
          const modelDef = this.getService(DefinitionRegistry).getModel(currModelName);
          const ownRelDefs = modelDef.relations ?? {};
          result = { ...ownRelDefs, ...result };
          if (modelDef.base) recursion(modelDef.base, currModelName);
        }, "recursion");
        recursion(modelName);
        return result;
      }
      /**
       * Get relation definition by name.
       *
       * @param {string} modelName
       * @param {string} relationName
       * @returns {object}
       */
      getRelationDefinitionByName(modelName, relationName) {
        const relDefs = this.getRelationsDefinitionInBaseModelHierarchy(modelName);
        const relNames = Object.keys(relDefs);
        let foundDef;
        for (const relName of relNames) {
          if (relName === relationName) {
            foundDef = relDefs[relName];
            break;
          }
        }
        if (!foundDef)
          throw new InvalidArgumentError(
            "The model %v does not have relation name %v.",
            modelName,
            relationName
          );
        return foundDef;
      }
      /**
       * Exclude object keys by relation names.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @returns {object}
       */
      excludeObjectKeysByRelationNames(modelName, modelData) {
        if (!modelData || typeof modelData !== "object" || Array.isArray(modelData))
          throw new InvalidArgumentError(
            "The second argument of ModelDefinitionUtils.excludeObjectKeysByRelationNames should be an Object, but %v was given.",
            modelData
          );
        const relDefs = this.getRelationsDefinitionInBaseModelHierarchy(modelName);
        const relNames = Object.keys(relDefs);
        return excludeObjectKeys(modelData, relNames);
      }
      /**
       * Get model name of property value if defined.
       *
       * @param {string} modelName
       * @param {string} propertyName
       * @returns {string|undefined}
       */
      getModelNameOfPropertyValueIfDefined(modelName, propertyName) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            'Parameter "modelName" of ModelDefinitionUtils.getModelNameOfPropertyValueIfDefined requires a non-empty String, but %v was given.',
            modelName
          );
        if (!propertyName || typeof propertyName !== "string")
          throw new InvalidArgumentError(
            'Parameter "propertyName" of ModelDefinitionUtils.getModelNameOfPropertyValueIfDefined requires a non-empty String, but %v was given.',
            propertyName
          );
        const propDefs = this.getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propDef = propDefs[propertyName];
        if (!propDef) return void 0;
        if (propDef && typeof propDef === "object") {
          if (propDef.type === DataType.OBJECT) return propDef.model || void 0;
          if (propDef.type === DataType.ARRAY)
            return propDef.itemModel || void 0;
        }
        return void 0;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/property-uniqueness-validator.js
var import_js_service14, PropertyUniquenessValidator;
var init_property_uniqueness_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/property-uniqueness-validator.js"() {
    init_data_type();
    import_js_service14 = require("@e22m4u/js-service");
    init_utils();
    init_src();
    init_property_uniqueness();
    init_errors();
    init_model_definition_utils();
    PropertyUniquenessValidator = class extends import_js_service14.Service {
      static {
        __name(this, "PropertyUniquenessValidator");
      }
      /**
       * Validate.
       *
       * @param {Function} countMethod
       * @param {string} methodName
       * @param {string} modelName
       * @param {object} modelData
       * @param {*} modelId
       * @returns {Promise<undefined>}
       */
      async validate(countMethod, methodName, modelName, modelData, modelId = void 0) {
        if (typeof countMethod !== "function")
          throw new InvalidArgumentError(
            'The parameter "countMethod" of the PropertyUniquenessValidator must be a Function, but %v was given.',
            countMethod
          );
        if (!methodName || typeof methodName !== "string")
          throw new InvalidArgumentError(
            'The parameter "methodName" of the PropertyUniquenessValidator must be a non-empty String, but %v was given.',
            methodName
          );
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            'The parameter "modelName" of the PropertyUniquenessValidator must be a non-empty String, but %v was given.',
            modelName
          );
        if (!isPlainObject(modelData))
          throw new InvalidArgumentError(
            "The data of the model %v should be an Object, but %v was given.",
            modelName,
            modelData
          );
        const propDefs = this.getService(
          ModelDefinitionUtils
        ).getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const isPartial = methodName === "patch" || methodName === "patchById";
        const propNames = Object.keys(isPartial ? modelData : propDefs);
        const idProp = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        const createError2 = /* @__PURE__ */ __name((propName, propValue) => new InvalidArgumentError(
          "An existing document of the model %v already has the property %v with the value %v and should be unique.",
          modelName,
          propName,
          propValue
        ), "createError");
        let willBeReplaced = void 0;
        const emptyValuesService = this.getService(EmptyValuesService);
        for (const propName of propNames) {
          const propDef = propDefs[propName];
          if (!propDef || typeof propDef === "string" || !propDef.unique || propDef.unique === PropertyUniqueness.NON_UNIQUE) {
            continue;
          }
          const propValue = modelData[propName];
          if (propDef.unique === PropertyUniqueness.SPARSE) {
            const propType = propDef.type || DataType.ANY;
            const isEmpty = emptyValuesService.isEmptyByType(propType, propValue);
            if (isEmpty) continue;
          }
          if (methodName === "create") {
            const count = await countMethod({ [propName]: propValue });
            if (count > 0) throw createError2(propName, propValue);
          } else if (methodName === "replaceById") {
            const count = await countMethod({
              [idProp]: { neq: modelId },
              [propName]: propValue
            });
            if (count > 0) throw createError2(propName, propValue);
          } else if (methodName === "replaceOrCreate") {
            const idFromData = modelData[idProp];
            if (willBeReplaced == null && idFromData != null) {
              const count = await countMethod({ [idProp]: idFromData });
              willBeReplaced = count > 0;
            }
            if (willBeReplaced) {
              const count = await countMethod({
                [idProp]: { neq: idFromData },
                [propName]: propValue
              });
              if (count > 0) throw createError2(propName, propValue);
            } else {
              const count = await countMethod({ [propName]: propValue });
              if (count > 0) throw createError2(propName, propValue);
            }
          } else if (methodName === "patch") {
            const count = await countMethod({ [propName]: propValue });
            if (count > 0) throw createError2(propName, propValue);
          } else if (methodName === "patchById") {
            const count = await countMethod({
              [idProp]: { neq: modelId },
              [propName]: propValue
            });
            if (count > 0) throw createError2(propName, propValue);
          } else {
            throw new InvalidArgumentError(
              "The PropertyUniquenessValidator does not support the adapter method %v.",
              methodName
            );
          }
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/primary-keys-definition-validator.js
var import_js_service15, PrimaryKeysDefinitionValidator;
var init_primary_keys_definition_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/primary-keys-definition-validator.js"() {
    import_js_service15 = require("@e22m4u/js-service");
    init_errors();
    init_model_definition_utils();
    PrimaryKeysDefinitionValidator = class extends import_js_service15.Service {
      static {
        __name(this, "PrimaryKeysDefinitionValidator");
      }
      /**
       * Validate.
       *
       * @param {string} modelName
       * @param {object} propDefs
       */
      validate(modelName, propDefs) {
        const propNames = Object.keys(propDefs).filter((propName) => {
          const propDef = propDefs[propName];
          return propDef && typeof propDef === "object" && propDef.primaryKey;
        });
        if (propNames.length < 1) {
          const isDefaultPrimaryKeyAlreadyInUse = Object.keys(propDefs).includes(DEFAULT_PRIMARY_KEY_PROPERTY_NAME);
          if (isDefaultPrimaryKeyAlreadyInUse)
            throw new InvalidArgumentError(
              'The property name %v of the model %v is defined as a regular property. In this case, a primary key should be defined explicitly. Do use the option "primaryKey" to specify the primary key.',
              DEFAULT_PRIMARY_KEY_PROPERTY_NAME,
              modelName
            );
          return;
        }
        if (propNames.length > 1)
          throw new InvalidArgumentError(
            "The model definition %v should not have multiple primary keys, but %v keys given.",
            modelName,
            propNames.length
          );
        const pkPropName = propNames[0];
        const pkPropDef = propDefs[pkPropName];
        if (pkPropDef && typeof pkPropDef === "object" && pkPropDef.default !== void 0) {
          throw new InvalidArgumentError(
            "Do not specify a default value for the primary key %v of the model %v.",
            pkPropName,
            modelName
          );
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/properties-definition-validator.js
var import_js_service16, PropertiesDefinitionValidator;
var init_properties_definition_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/properties-definition-validator.js"() {
    import_js_service16 = require("@e22m4u/js-service");
    init_data_type();
    init_utils();
    init_property_uniqueness();
    init_errors();
    init_property_validator2();
    init_property_transformer2();
    init_primary_keys_definition_validator();
    PropertiesDefinitionValidator = class extends import_js_service16.Service {
      static {
        __name(this, "PropertiesDefinitionValidator");
      }
      /**
       * Validate.
       *
       * @param {string} modelName
       * @param {object} propDefs
       */
      validate(modelName, propDefs) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The first argument of PropertiesDefinitionValidator.validate should be a non-empty String, but %v was given.",
            modelName
          );
        if (!propDefs || typeof propDefs !== "object" || Array.isArray(propDefs)) {
          throw new InvalidArgumentError(
            'The provided option "properties" of the model %v should be an Object, but %v was given.',
            modelName,
            propDefs
          );
        }
        const propNames = Object.keys(propDefs);
        propNames.forEach((propName) => {
          const propDef = propDefs[propName];
          this._validateProperty(modelName, propName, propDef);
        });
        this.getService(PrimaryKeysDefinitionValidator).validate(
          modelName,
          propDefs
        );
      }
      /**
       * Validate property.
       *
       * @param {string} modelName
       * @param {string} propName
       * @param {object} propDef
       */
      _validateProperty(modelName, propName, propDef) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The first argument of PropertiesDefinitionValidator._validateProperty should be a non-empty String, but %v was given.",
            modelName
          );
        if (!propName || typeof propName !== "string")
          throw new InvalidArgumentError(
            "The property name of the model %v should be a non-empty String, but %v was given.",
            modelName,
            propName
          );
        if (!propDef)
          throw new InvalidArgumentError(
            "The property %v of the model %v should have a property definition, but %v was given.",
            propName,
            modelName,
            propDef
          );
        if (typeof propDef === "string") {
          if (!Object.values(DataType).includes(propDef))
            throw new InvalidArgumentError(
              "In case of a short property definition, the property %v of the model %v should have one of data types: %l, but %v was given.",
              propName,
              modelName,
              Object.values(DataType),
              propDef
            );
          return;
        }
        if (!propDef || typeof propDef !== "object" || Array.isArray(propDef)) {
          throw new InvalidArgumentError(
            "In case of a full property definition, the property %v of the model %v should be an Object, but %v was given.",
            propName,
            modelName,
            propDef
          );
        }
        if (!propDef.type || !Object.values(DataType).includes(propDef.type))
          throw new InvalidArgumentError(
            'The property %v of the model %v requires the option "type" to have one of data types: %l, but %v was given.',
            propName,
            modelName,
            Object.values(DataType),
            propDef.type
          );
        if (propDef.itemType && !Object.values(DataType).includes(propDef.itemType)) {
          throw new InvalidArgumentError(
            'The provided option "itemType" of the property %v in the model %v should have one of data types: %l, but %v was given.',
            propName,
            modelName,
            Object.values(DataType),
            propDef.itemType
          );
        }
        if (propDef.itemModel && typeof propDef.itemModel !== "string") {
          throw new InvalidArgumentError(
            'The provided option "itemModel" of the property %v in the model %v should be a String, but %v was given.',
            propName,
            modelName,
            propDef.itemModel
          );
        }
        if (propDef.model && typeof propDef.model !== "string")
          throw new InvalidArgumentError(
            'The provided option "model" of the property %v in the model %v should be a String, but %v was given.',
            propName,
            modelName,
            propDef.model
          );
        if (propDef.primaryKey && typeof propDef.primaryKey !== "boolean")
          throw new InvalidArgumentError(
            'The provided option "primaryKey" of the property %v in the model %v should be a Boolean, but %v was given.',
            propName,
            modelName,
            propDef.primaryKey
          );
        if (propDef.columnName && typeof propDef.columnName !== "string")
          throw new InvalidArgumentError(
            'The provided option "columnName" of the property %v in the model %v should be a String, but %v was given.',
            propName,
            modelName,
            propDef.columnName
          );
        if (propDef.columnType && typeof propDef.columnType !== "string")
          throw new InvalidArgumentError(
            'The provided option "columnType" of the property %v in the model %v should be a String, but %v was given.',
            propName,
            modelName,
            propDef.columnType
          );
        if (propDef.required && typeof propDef.required !== "boolean")
          throw new InvalidArgumentError(
            'The provided option "required" of the property %v in the model %v should be a Boolean, but %v was given.',
            propName,
            modelName,
            propDef.required
          );
        if (propDef.required && propDef.default !== void 0)
          throw new InvalidArgumentError(
            'The property %v of the model %v is a required property, so it should not have the option "default" to be provided.',
            propName,
            modelName
          );
        if (propDef.primaryKey && propDef.required)
          throw new InvalidArgumentError(
            'The property %v of the model %v is a primary key, so it should not have the option "required" to be provided.',
            propName,
            modelName
          );
        if (propDef.primaryKey && propDef.default !== void 0)
          throw new InvalidArgumentError(
            'The property %v of the model %v is a primary key, so it should not have the option "default" to be provided.',
            propName,
            modelName
          );
        if (propDef.itemType && propDef.type !== DataType.ARRAY)
          throw new InvalidArgumentError(
            'The property %v of the model %v has a non-array type, so it should not have the option "itemType" to be provided.',
            propName,
            modelName,
            propDef.type
          );
        if (propDef.itemModel && propDef.type !== DataType.ARRAY)
          throw new InvalidArgumentError(
            'The option "itemModel" is not supported for %s property type, so the property %v of the model %v should not have the option "itemModel" to be provided.',
            capitalize(propDef.type),
            propName,
            modelName
          );
        if (propDef.itemModel && propDef.itemType !== DataType.OBJECT) {
          if (propDef.itemType) {
            throw new InvalidArgumentError(
              'The provided option "itemModel" requires the option "itemType" to be explicitly set to Object, but the property %v of the model %v has specified item type as %s.',
              propName,
              modelName,
              capitalize(propDef.itemType)
            );
          } else {
            throw new InvalidArgumentError(
              'The provided option "itemModel" requires the option "itemType" to be explicitly set to Object, but the property %v of the model %v does not have specified item type.',
              propName,
              modelName
            );
          }
        }
        if (propDef.model && propDef.type !== DataType.OBJECT)
          throw new InvalidArgumentError(
            'The option "model" is not supported for %s property type, so the property %v of the model %v should not have the option "model" to be provided.',
            capitalize(propDef.type),
            propName,
            modelName
          );
        if (propDef.validate != null) {
          const propertyValidatorRegistry = this.getService(
            PropertyValidatorRegistry
          );
          if (propDef.validate && typeof propDef.validate === "string") {
            if (!propertyValidatorRegistry.hasValidator(propDef.validate))
              throw new InvalidArgumentError(
                "The property validator %v is not found.",
                propDef.validate
              );
          } else if (propDef.validate && typeof propDef.validate === "function") {
          } else if (Array.isArray(propDef.validate)) {
            for (const validatorOrName of propDef.validate) {
              if (validatorOrName && typeof validatorOrName === "string") {
                if (!propertyValidatorRegistry.hasValidator(validatorOrName))
                  throw new InvalidArgumentError(
                    "The property validator %v is not found.",
                    validatorOrName
                  );
              } else if (validatorOrName && typeof validatorOrName === "function") {
              } else {
                throw new InvalidArgumentError(
                  'The provided option "validate" for the property %v in the model %v has an Array value that should contain validator names or validator functions, but %v was given.',
                  propName,
                  modelName,
                  validatorOrName
                );
              }
            }
          } else if (typeof propDef.validate === "object") {
            Object.keys(propDef.validate).forEach((validatorName) => {
              if (!propertyValidatorRegistry.hasValidator(validatorName))
                throw new InvalidArgumentError(
                  "The property validator %v is not found.",
                  validatorName
                );
            });
          } else {
            throw new InvalidArgumentError(
              'The provided option "validate" for the property %v in the model %v should be either a validator name, a validator function, an array of validator names or functions, or an object mapping validator names to their arguments, but %v was given.',
              propName,
              modelName,
              propDef.validate
            );
          }
        }
        if (propDef.transform != null) {
          const propertyTransformerRegistry = this.getService(
            PropertyTransformerRegistry
          );
          if (propDef.transform && typeof propDef.transform === "string") {
            if (!propertyTransformerRegistry.hasTransformer(propDef.transform))
              throw new InvalidArgumentError(
                "The property transformer %v is not found.",
                propDef.transform
              );
          } else if (propDef.transform && typeof propDef.transform === "function") {
          } else if (Array.isArray(propDef.transform)) {
            for (const transformerOrName of propDef.transform) {
              if (transformerOrName && typeof transformerOrName === "string") {
                if (!propertyTransformerRegistry.hasTransformer(transformerOrName))
                  throw new InvalidArgumentError(
                    "The property transformer %v is not found.",
                    transformerOrName
                  );
              } else if (transformerOrName && typeof transformerOrName === "function") {
              } else {
                throw new InvalidArgumentError(
                  'The provided option "transform" for the property %v in the model %v has an Array value that should contain transformer names or transformer functions, but %v was given.',
                  propName,
                  modelName,
                  transformerOrName
                );
              }
            }
          } else if (typeof propDef.transform === "object") {
            Object.keys(propDef.transform).forEach((transformerName) => {
              if (!propertyTransformerRegistry.hasTransformer(transformerName))
                throw new InvalidArgumentError(
                  "The property transformer %v is not found.",
                  transformerName
                );
            });
          } else {
            throw new InvalidArgumentError(
              'The provided option "transform" for the property %v in the model %v should be either a transformer name, a transformer function, an array of transformer names or functions, or an object mapping transformer names to their arguments, but %v was given.',
              propName,
              modelName,
              propDef.transform
            );
          }
        }
        if (propDef.unique) {
          if (typeof propDef.unique !== "boolean" && !Object.values(PropertyUniqueness).includes(propDef.unique)) {
            throw new InvalidArgumentError(
              'The provided option "unique" of the property %v in the model %v should be a Boolean or one of values: %l, but %v was given.',
              propName,
              modelName,
              Object.values(PropertyUniqueness),
              propDef.unique
            );
          }
        }
        if (propDef.unique && propDef.primaryKey)
          throw new InvalidArgumentError(
            'The property %v of the model %v is a primary key, so it should not have the option "unique" to be provided.',
            propName,
            modelName
          );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/properties/index.js
var init_properties = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/properties/index.js"() {
    init_data_type();
    init_property_definition();
    init_property_uniqueness();
    init_property_validator2();
    init_property_transformer2();
    init_property_uniqueness_validator();
    init_properties_definition_validator();
    init_primary_keys_definition_validator();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-definition.js
var init_model_definition = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-definition.js"() {
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-data-validator.js
var import_js_service17, ModelDataValidator;
var init_model_data_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-data-validator.js"() {
    import_js_service17 = require("@e22m4u/js-service");
    init_properties();
    init_utils();
    init_utils();
    init_src();
    init_errors();
    init_properties();
    init_model_definition_utils();
    ModelDataValidator = class extends import_js_service17.Service {
      static {
        __name(this, "ModelDataValidator");
      }
      /**
       * Validate.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {boolean} isPartial
       * @returns {undefined}
       */
      validate(modelName, modelData, isPartial = false) {
        if (!isPlainObject(modelData))
          throw new InvalidArgumentError(
            "The data of the model %v should be an Object, but %v was given.",
            modelName,
            modelData
          );
        const propDefs = this.getService(
          ModelDefinitionUtils
        ).getPropertiesDefinitionInBaseModelHierarchy(modelName);
        const propNames = Object.keys(isPartial ? modelData : propDefs);
        propNames.forEach((propName) => {
          const propDef = propDefs[propName];
          if (!propDef) return;
          this._validatePropertyValue(
            modelName,
            propName,
            propDef,
            modelData[propName]
          );
        });
      }
      /**
       * Validate property value.
       *
       * @param {string} modelName
       * @param {string} propName
       * @param {string|object} propDef
       * @param {*} propValue
       * @returns {undefined}
       */
      _validatePropertyValue(modelName, propName, propDef, propValue) {
        const propType = this.getService(ModelDefinitionUtils).getDataTypeFromPropertyDefinition(
          propDef
        );
        const isEmpty = this.getService(EmptyValuesService).isEmptyByType(
          propType,
          propValue
        );
        if (isEmpty) {
          const isRequired = typeof propDef === "string" ? false : Boolean(propDef.required);
          if (!isRequired) return;
          throw new InvalidArgumentError(
            "The property %v of the model %v is required, but %v was given.",
            propName,
            modelName,
            propValue
          );
        }
        this._validateValueByPropertyType(modelName, propName, propDef, propValue);
        this._validateValueByPropertyValidators(
          modelName,
          propName,
          propDef,
          propValue
        );
      }
      /**
       * Validate value by property type.
       *
       * @param {string} modelName
       * @param {string} propName
       * @param {string|object} propDef
       * @param {*} propValue
       * @param {boolean} isArrayValue
       * @returns {undefined}
       */
      _validateValueByPropertyType(modelName, propName, propDef, propValue, isArrayValue = false) {
        let expectingType;
        if (isArrayValue) {
          if (typeof propDef === "object") {
            expectingType = propDef.itemType ?? DataType.ANY;
          } else {
            expectingType = DataType.ANY;
          }
        } else {
          expectingType = typeof propDef !== "string" ? propDef.type : propDef;
        }
        const createError2 = /* @__PURE__ */ __name((expected) => {
          const pattern = isArrayValue ? "The array property %v of the model %v must have %s element, but %s was given." : "The property %v of the model %v must have %s, but %s was given.";
          const ctorName = getCtorName(propValue);
          const givenStr = ctorName ?? typeof propValue;
          return new InvalidArgumentError(
            pattern,
            propName,
            modelName,
            expected,
            givenStr
          );
        }, "createError");
        switch (expectingType) {
          // STRING
          case DataType.STRING:
            if (typeof propValue !== "string") throw createError2("a String");
            break;
          // NUMBER
          case DataType.NUMBER:
            if (typeof propValue !== "number") throw createError2("a Number");
            break;
          // BOOLEAN
          case DataType.BOOLEAN:
            if (typeof propValue !== "boolean") throw createError2("a Boolean");
            break;
          // ARRAY
          case DataType.ARRAY:
            if (!Array.isArray(propValue)) throw createError2("an Array");
            propValue.forEach(
              (value) => this._validateValueByPropertyType(
                modelName,
                propName,
                propDef,
                value,
                true
              )
            );
            break;
          // OBJECT
          case DataType.OBJECT: {
            if (!isPlainObject(propValue)) throw createError2("an Object");
            if (typeof propDef === "object") {
              const modelOptionField = isArrayValue ? "itemModel" : "model";
              const modelOptionValue = propDef[modelOptionField];
              if (modelOptionValue) this.validate(modelOptionValue, propValue);
            }
            break;
          }
        }
      }
      /**
       * Validate value by property validators.
       *
       * @param {string} modelName
       * @param {string} propName
       * @param {string|object} propDef
       * @param {*} propValue
       * @returns {undefined}
       */
      _validateValueByPropertyValidators(modelName, propName, propDef, propValue) {
        if (typeof propDef === "string" || propDef.validate == null) return;
        const validateDef = propDef.validate;
        const validatorRegistry = this.getService(PropertyValidatorRegistry);
        const createError2 = /* @__PURE__ */ __name((validatorName) => {
          if (validatorName) {
            return new InvalidArgumentError(
              "The property %v of the model %v has the invalid value %v that caught by the property validator %v.",
              propName,
              modelName,
              propValue,
              validatorName
            );
          } else {
            return new InvalidArgumentError(
              "The property %v of the model %v has the invalid value %v that caught by a property validator.",
              propName,
              modelName,
              propValue
            );
          }
        }, "createError");
        const validateBy = /* @__PURE__ */ __name((validatorOrName, validatorOptions = void 0) => {
          let validatorName, validatorFn;
          if (typeof validatorOrName === "string") {
            validatorName = validatorOrName;
            validatorFn = validatorRegistry.getValidator(validatorName);
          } else if (typeof validatorOrName === "function") {
            validatorName = validatorOrName.name && validatorOrName.name !== "validate" ? validatorOrName.name : void 0;
            validatorFn = validatorOrName;
          } else {
            throw new InvalidArgumentError(
              "Validator must be a non-empty String or a Function, but %v was given.",
              validatorOrName
            );
          }
          const context = { validatorName, modelName, propName };
          const valid = validatorFn(propValue, validatorOptions, context);
          if (valid instanceof Promise) {
            if (validatorName) {
              throw new InvalidArgumentError(
                "Asynchronous property validators are not supported, but the property %v of the model %v has the property validator %v that returns a Promise.",
                propName,
                modelName,
                validatorName
              );
            } else {
              throw new InvalidArgumentError(
                "Asynchronous property validators are not supported, but the property %v of the model %v has a property validator that returns a Promise.",
                propName,
                modelName
              );
            }
          } else if (valid !== true) {
            throw createError2(validatorName);
          }
        }, "validateBy");
        if (validateDef && typeof validateDef === "string") {
          validateBy(validateDef);
        } else if (validateDef && typeof validateDef === "function") {
          validateBy(validateDef);
        } else if (Array.isArray(validateDef)) {
          validateDef.forEach((validatorOrName) => {
            if (!validatorOrName || typeof validatorOrName !== "string" && typeof validatorOrName !== "function") {
              throw new InvalidArgumentError(
                'The provided option "validate" for the property %v in the model %v has an Array value that should contain validator names or validator functions, but %v was given.',
                propName,
                modelName,
                validatorOrName
              );
            }
            validateBy(validatorOrName);
          });
        } else if (validateDef !== null && typeof validateDef === "object") {
          Object.keys(validateDef).forEach((validatorName) => {
            const validatorOptions = validateDef[validatorName];
            validateBy(validatorName, validatorOptions);
          });
        } else {
          throw new InvalidArgumentError(
            'The provided option "validate" for the property %v in the model %v should be either a validator name, a validator function, an array of validator names or functions, or an object mapping validator names to their arguments, but %v was given.',
            propName,
            modelName,
            validateDef
          );
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-data-sanitizer.js
var import_js_service18, ModelDataSanitizer;
var init_model_data_sanitizer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-data-sanitizer.js"() {
    import_js_service18 = require("@e22m4u/js-service");
    init_errors();
    init_model_definition_utils();
    ModelDataSanitizer = class extends import_js_service18.Service {
      static {
        __name(this, "ModelDataSanitizer");
      }
      /**
       * Validate.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @returns {object}
       */
      sanitize(modelName, modelData) {
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The first argument of ModelDataSanitizer.sanitize should be a string, but %v was given.",
            modelName
          );
        if (!modelData || typeof modelData !== "object")
          throw new InvalidArgumentError(
            "The second argument of ModelDataSanitizer.sanitize should be an Object, but %v was given.",
            modelData
          );
        return this.getService(
          ModelDefinitionUtils
        ).excludeObjectKeysByRelationNames(modelName, modelData);
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-data-transformer.js
var import_js_service19, ModelDataTransformer;
var init_model_data_transformer = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-data-transformer.js"() {
    import_js_service19 = require("@e22m4u/js-service");
    init_utils();
    init_utils();
    init_utils();
    init_src();
    init_errors();
    init_model_definition_utils();
    init_properties();
    ModelDataTransformer = class extends import_js_service19.Service {
      static {
        __name(this, "ModelDataTransformer");
      }
      /**
       * Transform.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {boolean} isPartial
       * @returns {object|Promise<object>}
       */
      transform(modelName, modelData, isPartial = false) {
        if (!isPlainObject(modelData))
          throw new InvalidArgumentError(
            "The data of the model %v should be an Object, but %v was given.",
            modelName,
            modelData
          );
        const emptyValuesService = this.getService(EmptyValuesService);
        const modelDefinitionUtils = this.getService(ModelDefinitionUtils);
        const propDefs = modelDefinitionUtils.getPropertiesDefinitionInBaseModelHierarchy(
          modelName
        );
        const propNames = Object.keys(isPartial ? modelData : propDefs);
        const transformedData = cloneDeep(modelData);
        return propNames.reduce((transformedDataOrPromise, propName) => {
          const propDef = propDefs[propName];
          if (!propDef) return transformedDataOrPromise;
          const propType = modelDefinitionUtils.getDataTypeFromPropertyDefinition(propDef);
          const propValue = modelData[propName];
          const isEmpty = emptyValuesService.isEmptyByType(propType, propValue);
          if (isEmpty) return transformedDataOrPromise;
          const newPropValueOrPromise = this._transformPropertyValue(
            modelName,
            propName,
            propDef,
            propValue
          );
          return transformPromise(newPropValueOrPromise, (newPropValue) => {
            return transformPromise(transformedDataOrPromise, (resolvedData) => {
              if (newPropValue !== propValue) resolvedData[propName] = newPropValue;
              return resolvedData;
            });
          });
        }, transformedData);
      }
      /**
       * Transform property value.
       *
       * @param {string} modelName
       * @param {string} propName
       * @param {string|object} propDef
       * @param {*} propValue
       * @returns {*|Promise<*>}
       */
      _transformPropertyValue(modelName, propName, propDef, propValue) {
        if (typeof propDef === "string" || propDef.transform == null)
          return propValue;
        const transformDef = propDef.transform;
        const transformerRegistry = this.getService(PropertyTransformerRegistry);
        const transformFn = /* @__PURE__ */ __name((value, transformerOrName, transformerOptions = void 0) => {
          let transformerName, transformerFn;
          if (typeof transformerOrName === "string") {
            transformerName = transformerOrName;
            transformerFn = transformerRegistry.getTransformer(transformerName);
          } else if (typeof transformerOrName === "function") {
            transformerName = transformerOrName.name && transformerOrName.name !== "transform" ? transformerOrName.name : void 0;
            transformerFn = transformerOrName;
          } else {
            throw new InvalidArgumentError(
              "Transformer must be a non-empty String or a Function, but %v was given.",
              transformerOrName
            );
          }
          const context = { transformerName, modelName, propName };
          return transformerFn(value, transformerOptions, context);
        }, "transformFn");
        if (transformDef && typeof transformDef === "string") {
          return transformFn(propValue, transformDef);
        } else if (transformDef && typeof transformDef === "function") {
          return transformFn(propValue, transformDef);
        } else if (Array.isArray(transformDef)) {
          return transformDef.reduce((valueOrPromise, transformerOrName) => {
            if (!transformerOrName || typeof transformerOrName !== "string" && typeof transformerOrName !== "function") {
              throw new InvalidArgumentError(
                'The provided option "transform" for the property %v in the model %v has an Array value that should contain transformer names or transformer functions, but %v was given.',
                propName,
                modelName,
                transformerOrName
              );
            }
            return transformPromise(valueOrPromise, (value) => {
              return transformFn(value, transformerOrName);
            });
          }, propValue);
        } else if (transformDef !== null && typeof transformDef === "object") {
          return Object.keys(transformDef).reduce(
            (valueOrPromise, transformerName) => {
              const transformerOptions = transformDef[transformerName];
              return transformPromise(valueOrPromise, (value) => {
                return transformFn(value, transformerName, transformerOptions);
              });
            },
            propValue
          );
        } else {
          throw new InvalidArgumentError(
            'The provided option "transform" for the property %v in the model %v should be either a transformer name, a transformer function, an array of transformer names or functions, or an object mapping transformer names to their arguments, but %v was given.',
            propName,
            modelName,
            transformDef
          );
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/model-definition-validator.js
var import_js_service20, ModelDefinitionValidator;
var init_model_definition_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/model-definition-validator.js"() {
    import_js_service20 = require("@e22m4u/js-service");
    init_errors();
    init_relations();
    init_properties();
    ModelDefinitionValidator = class extends import_js_service20.Service {
      static {
        __name(this, "ModelDefinitionValidator");
      }
      /**
       * Validate.
       *
       * @param {object} modelDef
       */
      validate(modelDef) {
        if (!modelDef || typeof modelDef !== "object" || Array.isArray(modelDef))
          throw new InvalidArgumentError(
            "The model definition should be an Object, but %v was given.",
            modelDef
          );
        if (!modelDef.name || typeof modelDef.name !== "string")
          throw new InvalidArgumentError(
            'The model definition requires the option "name" as a non-empty String, but %v was given.',
            modelDef.name
          );
        if (modelDef.datasource && typeof modelDef.datasource !== "string")
          throw new InvalidArgumentError(
            'The provided option "datasource" of the model %v should be a String, but %v was given.',
            modelDef.name,
            modelDef.datasource
          );
        if (modelDef.base && typeof modelDef.base !== "string")
          throw new InvalidArgumentError(
            'The provided option "base" of the model %v should be a String, but %v was given.',
            modelDef.name,
            modelDef.base
          );
        if (modelDef.tableName && typeof modelDef.tableName !== "string")
          throw new InvalidArgumentError(
            'The provided option "tableName" of the model %v should be a String, but %v was given.',
            modelDef.name,
            modelDef.tableName
          );
        if (modelDef.properties) {
          if (typeof modelDef.properties !== "object" || Array.isArray(modelDef.properties)) {
            throw new InvalidArgumentError(
              'The provided option "properties" of the model %v should be an Object, but %v was given.',
              modelDef.name,
              modelDef.properties
            );
          }
          this.getService(PropertiesDefinitionValidator).validate(
            modelDef.name,
            modelDef.properties
          );
        }
        if (modelDef.relations) {
          if (typeof modelDef.relations !== "object" || Array.isArray(modelDef.relations)) {
            throw new InvalidArgumentError(
              'The provided option "relations" of the model %v should be an Object, but %v was given.',
              modelDef.name,
              modelDef.relations
            );
          }
          this.getService(RelationsDefinitionValidator).validate(
            modelDef.name,
            modelDef.relations
          );
        }
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/model/index.js
var init_model = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/model/index.js"() {
    init_relations();
    init_properties();
    init_model_definition();
    init_model_data_validator();
    init_model_data_sanitizer();
    init_model_data_transformer();
    init_model_definition_utils();
    init_model_definition_validator();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/datasource/datasource-definition-validator.js
var import_js_service21, DatasourceDefinitionValidator;
var init_datasource_definition_validator = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/datasource/datasource-definition-validator.js"() {
    import_js_service21 = require("@e22m4u/js-service");
    init_errors();
    DatasourceDefinitionValidator = class extends import_js_service21.Service {
      static {
        __name(this, "DatasourceDefinitionValidator");
      }
      /**
       * Validate.
       *
       * @param {object} datasourceDef
       */
      validate(datasourceDef) {
        if (!datasourceDef || typeof datasourceDef !== "object")
          throw new InvalidArgumentError(
            "The datasource definition should be an Object, but %v was given.",
            datasourceDef
          );
        if (!datasourceDef.name || typeof datasourceDef.name !== "string")
          throw new InvalidArgumentError(
            'The datasource definition requires the option "name" as a non-empty String, but %v was given.',
            datasourceDef.name
          );
        if (!datasourceDef.adapter || typeof datasourceDef.adapter !== "string")
          throw new InvalidArgumentError(
            'The datasource %v requires the option "adapter" as a non-empty String, but %v was given.',
            datasourceDef.name,
            datasourceDef.adapter
          );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/definition/datasource/index.js
var init_datasource = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/datasource/index.js"() {
    init_datasource_definition_validator();
  }
});

// node_modules/@e22m4u/js-repository/src/definition/index.js
var init_definition = __esm({
  "node_modules/@e22m4u/js-repository/src/definition/index.js"() {
    init_model();
    init_datasource();
    init_definition_registry();
  }
});

// node_modules/@e22m4u/js-repository/src/filter/fields-clause-tool.js
var import_js_service22, FieldsClauseTool;
var init_fields_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/fields-clause-tool.js"() {
    import_js_service22 = require("@e22m4u/js-service");
    init_utils();
    init_errors();
    init_definition();
    FieldsClauseTool = class extends import_js_service22.Service {
      static {
        __name(this, "FieldsClauseTool");
      }
      /**
       * Filter.
       *
       * @param {object|object[]} input
       * @param {string} modelName
       * @param {string|string[]|undefined} clause
       * @returns {object|object[]}
       */
      filter(input, modelName, clause) {
        const isArray = Array.isArray(input);
        let entities = isArray ? input : [input];
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              "The first argument of FieldsClauseTool.filter should be an Object or an Array of Object, but %v was given.",
              entity
            );
        });
        if (!modelName || typeof modelName !== "string")
          throw new InvalidArgumentError(
            "The second argument of FieldsClauseTool.filter should be a non-empty String, but %v was given.",
            modelName
          );
        if (clause == null) return input;
        const fields = Array.isArray(clause) ? clause.slice() : [clause];
        if (!fields.length) return input;
        fields.forEach((field) => {
          if (!field || typeof field !== "string")
            throw new InvalidArgumentError(
              'The provided option "fields" should be a non-empty String or an Array of non-empty String, but %v was given.',
              field
            );
        });
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        if (fields.indexOf(pkPropName) === -1) fields.push(pkPropName);
        entities = entities.map((entity) => selectObjectKeys(entity, fields));
        return isArray ? entities : entities[0];
      }
      /**
       * Validate fields clause.
       *
       * @param {string|string[]|undefined} clause
       */
      static validateFieldsClause(clause) {
        if (clause == null) return;
        const fields = Array.isArray(clause) ? clause : [clause];
        if (!fields.length) return;
        fields.forEach((field) => {
          if (!field || typeof field !== "string")
            throw new InvalidArgumentError(
              'The provided option "fields" should be a non-empty String or an Array of non-empty String, but %v was given.',
              field
            );
        });
      }
      /**
       * Normalize fields clause.
       *
       * @param {string|string[]|undefined} clause
       * @returns {string[]|undefined}
       */
      static normalizeFieldsClause(clause) {
        if (clause == null) return;
        const fields = Array.isArray(clause) ? clause : [clause];
        if (!fields.length) return;
        fields.forEach((field) => {
          if (!field || typeof field !== "string")
            throw new InvalidArgumentError(
              'The provided option "fields" should be a non-empty String or an Array of non-empty String, but %v was given.',
              field
            );
        });
        return fields;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/inclusion-decorator.js
var import_js_service23, InclusionDecorator;
var init_inclusion_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/inclusion-decorator.js"() {
    init_adapter();
    import_js_service23 = require("@e22m4u/js-service");
    init_filter();
    init_errors();
    InclusionDecorator = class extends import_js_service23.Service {
      static {
        __name(this, "InclusionDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of InclusionDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const tool = adapter.getService(IncludeClauseTool);
        const includeTo = /* @__PURE__ */ __name((...args) => tool.includeTo(...args), "includeTo");
        const create = adapter.create;
        adapter.create = async function(modelName, modelData, filter) {
          const retvalData = await create.call(this, modelName, modelData, filter);
          if (filter && typeof filter === "object" && filter.include)
            await includeTo([retvalData], modelName, filter.include);
          return retvalData;
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = async function(modelName, id, modelData, filter) {
          const retvalData = await replaceById.call(
            this,
            modelName,
            id,
            modelData,
            filter
          );
          if (filter && typeof filter === "object" && filter.include)
            await includeTo([retvalData], modelName, filter.include);
          return retvalData;
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = async function(modelName, modelData, filter) {
          const retvalData = await replaceOrCreate.call(
            this,
            modelName,
            modelData,
            filter
          );
          if (filter && typeof filter === "object" && filter.include)
            await includeTo([retvalData], modelName, filter.include);
          return retvalData;
        };
        const patchById = adapter.patchById;
        adapter.patchById = async function(modelName, id, modelData, filter) {
          const retvalData = await patchById.call(
            this,
            modelName,
            id,
            modelData,
            filter
          );
          if (filter && typeof filter === "object" && filter.include)
            await includeTo([retvalData], modelName, filter.include);
          return retvalData;
        };
        const find = adapter.find;
        adapter.find = async function(modelName, filter) {
          const modelItems = await find.call(this, modelName, filter);
          if (filter && typeof filter === "object" && filter.include)
            await includeTo(modelItems, modelName, filter.include);
          return modelItems;
        };
        const findById = adapter.findById;
        adapter.findById = async function(modelName, id, filter) {
          const retvalData = await findById.call(this, modelName, id, filter);
          if (filter && typeof filter === "object" && filter.include)
            await includeTo([retvalData], modelName, filter.include);
          return retvalData;
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/default-values-decorator.js
var import_js_service24, DefaultValuesDecorator;
var init_default_values_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/default-values-decorator.js"() {
    init_adapter();
    import_js_service24 = require("@e22m4u/js-service");
    init_errors();
    init_definition();
    DefaultValuesDecorator = class extends import_js_service24.Service {
      static {
        __name(this, "DefaultValuesDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of DefaultValuesDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const utils = adapter.getService(ModelDefinitionUtils);
        const setDefaults = /* @__PURE__ */ __name((...args) => utils.setDefaultValuesToEmptyProperties(...args), "setDefaults");
        const create = adapter.create;
        adapter.create = function(modelName, modelData, filter) {
          modelData = setDefaults(modelName, modelData);
          return create.call(this, modelName, modelData, filter);
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = function(modelName, id, modelData, filter) {
          modelData = setDefaults(modelName, modelData);
          return replaceById.call(this, modelName, id, modelData, filter);
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = function(modelName, modelData, filter) {
          modelData = setDefaults(modelName, modelData);
          return replaceOrCreate.call(this, modelName, modelData, filter);
        };
        const patch = adapter.patch;
        adapter.patch = function(modelName, modelData, where) {
          modelData = setDefaults(modelName, modelData, true);
          return patch.call(this, modelName, modelData, where);
        };
        const patchById = adapter.patchById;
        adapter.patchById = function(modelName, id, modelData, filter) {
          modelData = setDefaults(modelName, modelData, true);
          return patchById.call(this, modelName, id, modelData, filter);
        };
        const find = adapter.find;
        adapter.find = async function(modelName, filter) {
          const modelItems = await find.call(this, modelName, filter);
          return modelItems.map((modelItem) => setDefaults(modelName, modelItem));
        };
        const findById = adapter.findById;
        adapter.findById = async function(modelName, id, filter) {
          const retvalData = await findById.call(this, modelName, id, filter);
          return setDefaults(modelName, retvalData);
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/data-sanitizing-decorator.js
var import_js_service25, DataSanitizingDecorator;
var init_data_sanitizing_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/data-sanitizing-decorator.js"() {
    init_adapter();
    import_js_service25 = require("@e22m4u/js-service");
    init_errors();
    init_definition();
    DataSanitizingDecorator = class extends import_js_service25.Service {
      static {
        __name(this, "DataSanitizingDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of DataSanitizingDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const sanitizer = adapter.getService(ModelDataSanitizer);
        const sanitize = /* @__PURE__ */ __name((...args) => sanitizer.sanitize(...args), "sanitize");
        const create = adapter.create;
        adapter.create = async function(modelName, modelData, filter) {
          modelData = sanitize(modelName, modelData);
          return create.call(this, modelName, modelData, filter);
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = async function(modelName, id, modelData, filter) {
          modelData = sanitize(modelName, modelData);
          return replaceById.call(this, modelName, id, modelData, filter);
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = async function(modelName, modelData, filter) {
          modelData = sanitize(modelName, modelData);
          return replaceOrCreate.call(this, modelName, modelData, filter);
        };
        const patch = adapter.patch;
        adapter.patch = async function(modelName, modelData, where) {
          modelData = sanitize(modelName, modelData);
          return patch.call(this, modelName, modelData, where);
        };
        const patchById = adapter.patchById;
        adapter.patchById = async function(modelName, id, modelData, filter) {
          modelData = sanitize(modelName, modelData);
          return patchById.call(this, modelName, id, modelData, filter);
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/data-validation-decorator.js
var import_js_service26, DataValidationDecorator;
var init_data_validation_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/data-validation-decorator.js"() {
    init_adapter();
    import_js_service26 = require("@e22m4u/js-service");
    init_errors();
    init_definition();
    DataValidationDecorator = class extends import_js_service26.Service {
      static {
        __name(this, "DataValidationDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of DataValidationDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const validator = this.getService(ModelDataValidator);
        const create = adapter.create;
        adapter.create = function(modelName, modelData, filter) {
          validator.validate(modelName, modelData);
          return create.call(this, modelName, modelData, filter);
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = function(modelName, id, modelData, filter) {
          validator.validate(modelName, modelData);
          return replaceById.call(this, modelName, id, modelData, filter);
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = function(modelName, modelData, filter) {
          validator.validate(modelName, modelData);
          return replaceOrCreate.call(this, modelName, modelData, filter);
        };
        const patch = adapter.patch;
        adapter.patch = function(modelName, modelData, where) {
          validator.validate(modelName, modelData, true);
          return patch.call(this, modelName, modelData, where);
        };
        const patchById = adapter.patchById;
        adapter.patchById = function(modelName, id, modelData, filter) {
          validator.validate(modelName, modelData, true);
          return patchById.call(this, modelName, id, modelData, filter);
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/fields-filtering-decorator.js
var import_js_service27, FieldsFilteringDecorator;
var init_fields_filtering_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/fields-filtering-decorator.js"() {
    init_adapter();
    import_js_service27 = require("@e22m4u/js-service");
    init_filter();
    init_errors();
    FieldsFilteringDecorator = class extends import_js_service27.Service {
      static {
        __name(this, "FieldsFilteringDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of FieldsFilteringDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const tool = adapter.getService(FieldsClauseTool);
        const selectFields = /* @__PURE__ */ __name((...args) => tool.filter(...args), "selectFields");
        const create = adapter.create;
        adapter.create = async function(modelName, modelData, filter) {
          let result = await create.call(this, modelName, modelData, filter);
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = async function(modelName, id, modelData, filter) {
          let result = await replaceById.call(
            this,
            modelName,
            id,
            modelData,
            filter
          );
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = async function(modelName, modelData, filter) {
          let result = await replaceOrCreate.call(
            this,
            modelName,
            modelData,
            filter
          );
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
        const patchById = adapter.patchById;
        adapter.patchById = async function(modelName, id, modelData, filter) {
          let result = await patchById.call(this, modelName, id, modelData, filter);
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
        const find = adapter.find;
        adapter.find = async function(modelName, filter) {
          let result = await find.call(this, modelName, filter);
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
        const findById = adapter.findById;
        adapter.findById = async function(modelName, id, filter) {
          let result = await findById.call(this, modelName, id, filter);
          if (filter && typeof filter === "object" && filter.fields)
            result = selectFields(result, modelName, filter.fields);
          return result;
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/data-transformation-decorator.js
var import_js_service28, DataTransformationDecorator;
var init_data_transformation_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/data-transformation-decorator.js"() {
    init_adapter();
    import_js_service28 = require("@e22m4u/js-service");
    init_errors();
    init_definition();
    DataTransformationDecorator = class extends import_js_service28.Service {
      static {
        __name(this, "DataTransformationDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of DataTransformerDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const transformer = this.getService(ModelDataTransformer);
        const create = adapter.create;
        adapter.create = async function(modelName, modelData, filter) {
          modelData = await transformer.transform(modelName, modelData);
          return create.call(this, modelName, modelData, filter);
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = async function(modelName, id, modelData, filter) {
          modelData = await transformer.transform(modelName, modelData);
          return replaceById.call(this, modelName, id, modelData, filter);
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = async function(modelName, modelData, filter) {
          modelData = await transformer.transform(modelName, modelData);
          return replaceOrCreate.call(this, modelName, modelData, filter);
        };
        const patch = adapter.patch;
        adapter.patch = async function(modelName, modelData, where) {
          modelData = await transformer.transform(modelName, modelData, true);
          return patch.call(this, modelName, modelData, where);
        };
        const patchById = adapter.patchById;
        adapter.patchById = async function(modelName, id, modelData, filter) {
          modelData = await transformer.transform(modelName, modelData, true);
          return patchById.call(this, modelName, id, modelData, filter);
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/property-uniqueness-decorator.js
var import_js_service29, PropertyUniquenessDecorator;
var init_property_uniqueness_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/property-uniqueness-decorator.js"() {
    init_adapter();
    import_js_service29 = require("@e22m4u/js-service");
    init_errors();
    init_definition();
    PropertyUniquenessDecorator = class extends import_js_service29.Service {
      static {
        __name(this, "PropertyUniquenessDecorator");
      }
      /**
       * Decorate.
       *
       * @param {Adapter} adapter
       */
      decorate(adapter) {
        if (!adapter || !(adapter instanceof Adapter))
          throw new InvalidArgumentError(
            "The first argument of PropertyUniquenessDecorator.decorate should be an Adapter instance, but %v was given.",
            adapter
          );
        const validator = this.getService(PropertyUniquenessValidator);
        const create = adapter.create;
        adapter.create = async function(modelName, modelData, filter) {
          const countMethod = adapter.count.bind(adapter, modelName);
          await validator.validate(countMethod, "create", modelName, modelData);
          return create.call(this, modelName, modelData, filter);
        };
        const replaceById = adapter.replaceById;
        adapter.replaceById = async function(modelName, id, modelData, filter) {
          const countMethod = adapter.count.bind(adapter, modelName);
          await validator.validate(
            countMethod,
            "replaceById",
            modelName,
            modelData,
            id
          );
          return replaceById.call(this, modelName, id, modelData, filter);
        };
        const replaceOrCreate = adapter.replaceOrCreate;
        adapter.replaceOrCreate = async function(modelName, modelData, filter) {
          const countMethod = adapter.count.bind(adapter, modelName);
          await validator.validate(
            countMethod,
            "replaceOrCreate",
            modelName,
            modelData
          );
          return replaceOrCreate.call(this, modelName, modelData, filter);
        };
        const patch = adapter.patch;
        adapter.patch = async function(modelName, modelData, where) {
          const countMethod = adapter.count.bind(adapter, modelName);
          await validator.validate(countMethod, "patch", modelName, modelData);
          return patch.call(this, modelName, modelData, where);
        };
        const patchById = adapter.patchById;
        adapter.patchById = async function(modelName, id, modelData, filter) {
          const countMethod = adapter.count.bind(adapter, modelName);
          await validator.validate(
            countMethod,
            "patchById",
            modelName,
            modelData,
            id
          );
          return patchById.call(this, modelName, id, modelData, filter);
        };
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/decorator/index.js
var init_decorator = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/decorator/index.js"() {
    init_inclusion_decorator();
    init_default_values_decorator();
    init_data_sanitizing_decorator();
    init_data_validation_decorator();
    init_fields_filtering_decorator();
    init_data_transformation_decorator();
    init_property_uniqueness_decorator();
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/adapter.js
var import_js_service30, ADAPTER_CLASS_NAME, Adapter;
var init_adapter = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/adapter.js"() {
    import_js_service30 = require("@e22m4u/js-service");
    init_errors();
    init_decorator();
    init_decorator();
    init_decorator();
    init_decorator();
    init_decorator();
    init_decorator();
    init_decorator();
    ADAPTER_CLASS_NAME = "Adapter";
    Adapter = class _Adapter extends import_js_service30.Service {
      static {
        __name(this, "Adapter");
      }
      /**
       * Kind.
       *
       * @type {string}
       */
      static kinds = [...import_js_service30.Service.kinds, ADAPTER_CLASS_NAME];
      /**
       * Settings.
       *
       * @type {object|undefined}
       */
      _settings;
      /**
       * Settings.
       *
       * @returns {object|undefined}
       */
      get settings() {
        return this._settings;
      }
      /**
       * Constructor.
       *
       * @param {object|undefined} container
       * @param {object|undefined} settings
       */
      constructor(container = void 0, settings = void 0) {
        super(container);
        this._settings = settings;
        if (this.constructor !== _Adapter) {
          this.getService(DataSanitizingDecorator).decorate(this);
          this.getService(DefaultValuesDecorator).decorate(this);
          this.getService(DataTransformationDecorator).decorate(this);
          this.getService(DataValidationDecorator).decorate(this);
          this.getService(PropertyUniquenessDecorator).decorate(this);
          this.getService(FieldsFilteringDecorator).decorate(this);
          this.getService(InclusionDecorator).decorate(this);
        }
      }
      /**
       * Create.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      create(modelName, modelData, filter = void 0) {
        throw new NotImplementedError(
          "%s.create is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Replace by id.
       *
       * @param {string} modelName
       * @param {number|string} id
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      replaceById(modelName, id, modelData, filter = void 0) {
        throw new NotImplementedError(
          "%s.replaceById is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Replace or create.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      replaceOrCreate(modelName, modelData, filter = void 0) {
        throw new NotImplementedError(
          "%s.replaceOrCreate is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Patch.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      patch(modelName, modelData, where = void 0) {
        throw new NotImplementedError(
          "%s.patch is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Patch by id.
       *
       * @param {string} modelName
       * @param {number|string} id
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      patchById(modelName, id, modelData, filter = void 0) {
        throw new NotImplementedError(
          "%s.patchById is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Find.
       *
       * @param {string} modelName
       * @param {object|undefined} filter
       * @returns {Promise<object[]>}
       */
      find(modelName, filter = void 0) {
        throw new NotImplementedError(
          "%s.find is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Find by id.
       *
       * @param {string} modelName
       * @param {number|string} id
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      findById(modelName, id, filter = void 0) {
        throw new NotImplementedError(
          "%s.findById is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Delete.
       *
       * @param {string} modelName
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      delete(modelName, where = void 0) {
        throw new NotImplementedError(
          "%s.delete is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Delete by id.
       *
       * @param {string} modelName
       * @param {number|string} id
       * @returns {Promise<boolean>}
       */
      deleteById(modelName, id) {
        throw new NotImplementedError(
          "%s.deleteById is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Exists.
       *
       * @param {string} modelName
       * @param {number|string} id
       * @returns {Promise<boolean>}
       */
      exists(modelName, id) {
        throw new NotImplementedError(
          "%s.exists is not implemented.",
          this.constructor.name
        );
      }
      /**
       * Count.
       *
       * @param {string} modelName
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      count(modelName, where = void 0) {
        throw new NotImplementedError(
          "%s.count is not implemented.",
          this.constructor.name
        );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/builtin/memory-adapter.js
var memory_adapter_exports = {};
__export(memory_adapter_exports, {
  MemoryAdapter: () => MemoryAdapter
});
var MemoryAdapter;
var init_memory_adapter = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/builtin/memory-adapter.js"() {
    init_adapter();
    init_utils();
    init_utils();
    init_definition();
    init_filter();
    init_filter();
    init_filter();
    init_errors();
    init_definition();
    MemoryAdapter = class extends Adapter {
      static {
        __name(this, "MemoryAdapter");
      }
      /**
       * Tables.
       *
       * @type {Map<string, Map<number, Record<string, any>>>}
       */
      _tables = /* @__PURE__ */ new Map();
      /**
       * Last ids.
       *
       * @type {Map<string, number>}
       */
      _lastIds = /* @__PURE__ */ new Map();
      /**
       * Get table or create.
       *
       * @param {string} modelName
       * @returns {Map<number, object>}
       */
      _getTableOrCreate(modelName) {
        const tableName = this.getService(ModelDefinitionUtils).getTableNameByModelName(modelName);
        let table = this._tables.get(tableName);
        if (table) return table;
        table = /* @__PURE__ */ new Map();
        this._tables.set(tableName, table);
        return table;
      }
      /**
       * Gen next id value.
       *
       * @param {string} modelName
       * @param {string} propName
       * @returns {number}
       */
      _genNextIdValue(modelName, propName) {
        const propType = this.getService(
          ModelDefinitionUtils
        ).getDataTypeByPropertyName(modelName, propName);
        if (propType !== DataType.ANY && propType !== DataType.NUMBER)
          throw new InvalidArgumentError(
            "The memory adapter able to generate only Number identifiers, but the primary key %v of the model %v is defined as %s. Do provide your own value for the %v property, or change the type in the primary key definition to a Number that will be generated automatically.",
            propName,
            modelName,
            capitalize(propType),
            propName
          );
        const tableName = this.getService(ModelDefinitionUtils).getTableNameByModelName(modelName);
        const lastId = this._lastIds.get(tableName) ?? 0;
        const nextId = lastId + 1;
        this._lastIds.set(tableName, nextId);
        const table = this._getTableOrCreate(modelName);
        const existedIds = Array.from(table.keys());
        if (existedIds.includes(nextId))
          return this._genNextIdValue(modelName, propName);
        return nextId;
      }
      /**
       * Create
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      // eslint-disable-next-line no-unused-vars
      async create(modelName, modelData, filter = void 0) {
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        let idValue = modelData[pkPropName];
        if (idValue == null || idValue === "" || idValue === 0) {
          idValue = this._genNextIdValue(modelName, pkPropName);
        }
        const table = this._getTableOrCreate(modelName);
        if (table.has(idValue))
          throw new InvalidArgumentError(
            "The value %v of the primary key %v already exists in the model %v.",
            idValue,
            pkPropName,
            modelName
          );
        modelData = cloneDeep(modelData);
        modelData[pkPropName] = idValue;
        const tableData = this.getService(
          ModelDefinitionUtils
        ).convertPropertyNamesToColumnNames(modelName, modelData);
        table.set(idValue, tableData);
        return this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, tableData);
      }
      /**
       * Replace by id.
       *
       * @param {string} modelName
       * @param {string|number} id
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      // eslint-disable-next-line no-unused-vars
      async replaceById(modelName, id, modelData, filter = void 0) {
        const table = this._getTableOrCreate(modelName);
        const isExists = table.has(id);
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        if (!isExists)
          throw new InvalidArgumentError(
            "The value %v of the primary key %v does not exist in the model %v.",
            id,
            pkPropName,
            modelName
          );
        modelData = cloneDeep(modelData);
        modelData[pkPropName] = id;
        const tableData = this.getService(
          ModelDefinitionUtils
        ).convertPropertyNamesToColumnNames(modelName, modelData);
        table.set(id, tableData);
        return this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, tableData);
      }
      /**
       * Replace or create.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      // eslint-disable-next-line no-unused-vars
      async replaceOrCreate(modelName, modelData, filter = void 0) {
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        let idValue = modelData[pkPropName];
        if (idValue == null || idValue === "" || idValue === 0) {
          idValue = this._genNextIdValue(modelName, pkPropName);
        }
        const table = this._getTableOrCreate(modelName);
        modelData = cloneDeep(modelData);
        modelData[pkPropName] = idValue;
        const tableData = this.getService(
          ModelDefinitionUtils
        ).convertPropertyNamesToColumnNames(modelName, modelData);
        table.set(idValue, tableData);
        return this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, tableData);
      }
      /**
       * Patch.
       *
       * @param {string} modelName
       * @param {object} modelData
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async patch(modelName, modelData, where = void 0) {
        const table = this._getTableOrCreate(modelName);
        const tableItems = Array.from(table.values());
        if (!tableItems.length) return 0;
        let modelItems = tableItems.map(
          (tableItem) => this.getService(ModelDefinitionUtils).convertColumnNamesToPropertyNames(
            modelName,
            tableItem
          )
        );
        if (where && typeof where === "object")
          modelItems = this.getService(WhereClauseTool).filter(modelItems, where);
        const size = modelItems.length;
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        modelData = cloneDeep(modelData);
        delete modelData[pkPropName];
        modelItems.forEach((existingModelData) => {
          const mergedModelData = Object.assign({}, existingModelData, modelData);
          const mergedTableData = this.getService(
            ModelDefinitionUtils
          ).convertPropertyNamesToColumnNames(modelName, mergedModelData);
          const idValue = existingModelData[pkPropName];
          table.set(idValue, mergedTableData);
        });
        return size;
      }
      /**
       * Patch by id.
       *
       * @param {string} modelName
       * @param {string|number} id
       * @param {object} modelData
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      // eslint-disable-next-line no-unused-vars
      async patchById(modelName, id, modelData, filter = void 0) {
        const table = this._getTableOrCreate(modelName);
        const existingTableData = table.get(id);
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        if (existingTableData == null)
          throw new InvalidArgumentError(
            "The value %v of the primary key %v does not exist in the model %v.",
            id,
            pkPropName,
            modelName
          );
        modelData = cloneDeep(modelData);
        delete modelData[pkPropName];
        const existingModelData = this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, existingTableData);
        const mergedModelData = Object.assign({}, existingModelData, modelData);
        const mergedTableData = this.getService(
          ModelDefinitionUtils
        ).convertPropertyNamesToColumnNames(modelName, mergedModelData);
        table.set(id, mergedTableData);
        return this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, mergedTableData);
      }
      /**
       * Find.
       *
       * @param {string} modelName
       * @param {object|undefined} filter
       * @returns {Promise<object[]>}
       */
      async find(modelName, filter = void 0) {
        const table = this._getTableOrCreate(modelName);
        const tableItems = Array.from(table.values());
        let modelItems = tableItems.map(
          (tableItem) => this.getService(ModelDefinitionUtils).convertColumnNamesToPropertyNames(
            modelName,
            tableItem
          )
        );
        if (filter && typeof filter === "object") {
          if (filter.where)
            modelItems = this.getService(WhereClauseTool).filter(
              modelItems,
              filter.where
            );
          if (filter.skip || filter.limit)
            modelItems = this.getService(SliceClauseTool).slice(
              modelItems,
              filter.skip,
              filter.limit
            );
          if (filter.order)
            this.getService(OrderClauseTool).sort(modelItems, filter.order);
        }
        return modelItems;
      }
      /**
       * Find by id.
       *
       * @param {string} modelName
       * @param {string|number} id
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      // eslint-disable-next-line no-unused-vars
      async findById(modelName, id, filter = void 0) {
        const table = this._getTableOrCreate(modelName);
        const tableData = table.get(id);
        const pkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        if (!tableData)
          throw new InvalidArgumentError(
            "The value %v of the primary key %v does not exist in the model %v.",
            id,
            pkPropName,
            modelName
          );
        return this.getService(
          ModelDefinitionUtils
        ).convertColumnNamesToPropertyNames(modelName, tableData);
      }
      /**
       * Delete.
       *
       * @param {string} modelName
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async delete(modelName, where = void 0) {
        const table = this._getTableOrCreate(modelName);
        const tableItems = Array.from(table.values());
        if (!tableItems.length) return 0;
        let modelItems = tableItems.map(
          (tableItem) => this.getService(ModelDefinitionUtils).convertColumnNamesToPropertyNames(
            modelName,
            tableItem
          )
        );
        if (where && typeof where === "object")
          modelItems = this.getService(WhereClauseTool).filter(modelItems, where);
        const size = modelItems.length;
        const idPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          modelName
        );
        modelItems.forEach((modelData) => {
          const idValue = modelData[idPropName];
          table.delete(idValue);
        });
        return size;
      }
      /**
       * Delete by id.
       *
       * @param {string} modelName
       * @param {string|number} id
       * @returns {Promise<boolean>}
       */
      async deleteById(modelName, id) {
        const table = this._getTableOrCreate(modelName);
        const isExists = table.has(id);
        table.delete(id);
        return isExists;
      }
      /**
       * Exists.
       *
       * @param {string} modelName
       * @param {string|number} id
       * @returns {Promise<boolean>}
       */
      async exists(modelName, id) {
        const table = this._getTableOrCreate(modelName);
        return table.has(id);
      }
      /**
       * Count.
       *
       * @param {string} modelName
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async count(modelName, where = void 0) {
        const table = this._getTableOrCreate(modelName);
        const tableItems = Array.from(table.values());
        let modelItems = tableItems.map(
          (tableItem) => this.getService(ModelDefinitionUtils).convertColumnNamesToPropertyNames(
            modelName,
            tableItem
          )
        );
        if (where && typeof where === "object")
          modelItems = this.getService(WhereClauseTool).filter(modelItems, where);
        return modelItems.length;
      }
    };
  }
});

// import("./builtin/**/*-adapter.js") in node_modules/@e22m4u/js-repository/src/adapter/adapter-loader.js
var globImport_builtin_adapter_js;
var init_ = __esm({
  'import("./builtin/**/*-adapter.js") in node_modules/@e22m4u/js-repository/src/adapter/adapter-loader.js'() {
    globImport_builtin_adapter_js = __glob({
      "./builtin/memory-adapter.js": () => Promise.resolve().then(() => (init_memory_adapter(), memory_adapter_exports))
    });
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/adapter-loader.js
function findAdapterCtorInModule(module2) {
  let adapterCtor;
  if (!module2 || typeof module2 !== "object" || Array.isArray(module2)) return;
  for (const ctor of Object.values(module2)) {
    if (typeof ctor === "function" && Array.isArray(ctor.kinds) && Adapter.kinds.includes(ADAPTER_CLASS_NAME)) {
      adapterCtor = ctor;
      break;
    }
  }
  return adapterCtor;
}
var import_js_service31, AdapterLoader;
var init_adapter_loader = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/adapter-loader.js"() {
    init_adapter();
    import_js_service31 = require("@e22m4u/js-service");
    init_adapter();
    init_errors();
    init_();
    AdapterLoader = class extends import_js_service31.Service {
      static {
        __name(this, "AdapterLoader");
      }
      /**
       * Load by name.
       *
       * @param {string} adapterName
       * @param {object|undefined} settings
       * @returns {Promise<Adapter>}
       */
      async loadByName(adapterName, settings = void 0) {
        if (!adapterName || typeof adapterName !== "string")
          throw new InvalidArgumentError(
            "The adapter name should be a non-empty String, but %v was given.",
            adapterName
          );
        let adapterCtor;
        try {
          const module2 = await globImport_builtin_adapter_js(`./builtin/${adapterName}-adapter.js`);
          adapterCtor = findAdapterCtorInModule(module2);
        } catch (e) {
        }
        if (!adapterCtor)
          try {
            const module2 = await import(`@e22m4u/js-repository-${adapterName}-adapter`);
            adapterCtor = findAdapterCtorInModule(module2);
          } catch (e) {
          }
        if (!adapterCtor)
          throw new InvalidArgumentError(
            "The adapter %v is not found.",
            adapterName
          );
        return new adapterCtor(this.container, settings);
      }
    };
    __name(findAdapterCtorInModule, "findAdapterCtorInModule");
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/adapter-registry.js
var import_js_service32, AdapterRegistry;
var init_adapter_registry = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/adapter-registry.js"() {
    init_adapter();
    import_js_service32 = require("@e22m4u/js-service");
    init_adapter_loader();
    init_definition();
    AdapterRegistry = class extends import_js_service32.Service {
      static {
        __name(this, "AdapterRegistry");
      }
      /**
       * Adapters.
       *
       * @type {object}
       */
      _adapters = {};
      /**
       * Get adapter.
       *
       * @param {string} datasourceName
       * @returns {Promise<Adapter>}
       */
      async getAdapter(datasourceName) {
        let adapter = this._adapters[datasourceName];
        if (adapter) return adapter;
        const datasource = this.getService(DefinitionRegistry).getDatasource(datasourceName);
        const adapterName = datasource.adapter;
        adapter = await this.getService(AdapterLoader).loadByName(
          adapterName,
          datasource
        );
        this._adapters[datasourceName] = adapter;
        return adapter;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/adapter/index.js
var init_adapter2 = __esm({
  "node_modules/@e22m4u/js-repository/src/adapter/index.js"() {
    init_adapter();
    init_adapter_loader();
    init_adapter_registry();
  }
});

// node_modules/@e22m4u/js-repository/src/repository/repository.js
var import_js_service33, Repository;
var init_repository = __esm({
  "node_modules/@e22m4u/js-repository/src/repository/repository.js"() {
    import_js_service33 = require("@e22m4u/js-service");
    init_adapter2();
    init_adapter2();
    init_errors();
    init_definition();
    Repository = class extends import_js_service33.Service {
      static {
        __name(this, "Repository");
      }
      /**
       * Model name.
       *
       * @type {string}
       */
      _modelName;
      /**
       * Model name.
       *
       * @returns {string}
       */
      get modelName() {
        return this._modelName;
      }
      /**
       * Datasource name.
       *
       * @type {string}
       */
      _datasourceName;
      /**
       * Datasource name.
       *
       * @returns {string}
       */
      get datasourceName() {
        return this._datasourceName;
      }
      /**
       * Constructor.
       *
       * @typedef {import('@e22m4u/js-service').ServiceContainer} ServiceContainer
       * @param {ServiceContainer} container
       * @param {string} modelName
       */
      constructor(container, modelName) {
        super(container);
        this._modelName = modelName;
        const modelDef = this.getService(DefinitionRegistry).getModel(modelName);
        const datasourceName = modelDef.datasource;
        if (!datasourceName)
          throw new InvalidArgumentError(
            "The model %v does not have a specified datasource.",
            modelName
          );
        this._datasourceName = datasourceName;
      }
      /**
       * Get adapter.
       *
       * @returns {Adapter}
       */
      async getAdapter() {
        return this.getService(AdapterRegistry).getAdapter(this.datasourceName);
      }
      /**
       * Create.
       *
       * @param {object} data
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      async create(data, filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.create(this.modelName, data, filter);
      }
      /**
       * Replace by id.
       *
       * @param {number|string} id
       * @param {object} data
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      async replaceById(id, data, filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.replaceById(this.modelName, id, data, filter);
      }
      /**
       * Replace or create.
       *
       * @param {object} data
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      async replaceOrCreate(data, filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.replaceOrCreate(this.modelName, data, filter);
      }
      /**
       * Patch.
       *
       * @param {object} data
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async patch(data, where = void 0) {
        const adapter = await this.getAdapter();
        return adapter.patch(this.modelName, data, where);
      }
      /**
       * Patch by id.
       *
       * @param {number|string} id
       * @param {object} data
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      async patchById(id, data, filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.patchById(this.modelName, id, data, filter);
      }
      /**
       * Find.
       *
       * @param {object|undefined} filter
       * @returns {Promise<object[]>}
       */
      async find(filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.find(this.modelName, filter);
      }
      /**
       * Find one.
       *
       * @param {object|undefined} filter
       * @returns {Promise<object|undefined>}
       */
      async findOne(filter = void 0) {
        const adapter = await this.getAdapter();
        filter = filter ?? {};
        filter.limit = 1;
        const result = await adapter.find(this.modelName, filter);
        return result.length ? result[0] : void 0;
      }
      /**
       * Find by id.
       *
       * @param {number|string} id
       * @param {object|undefined} filter
       * @returns {Promise<object>}
       */
      async findById(id, filter = void 0) {
        const adapter = await this.getAdapter();
        return adapter.findById(this.modelName, id, filter);
      }
      /**
       * Delete.
       *
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async delete(where = void 0) {
        const adapter = await this.getAdapter();
        return adapter.delete(this.modelName, where);
      }
      /**
       * Delete by id.
       *
       * @param {number|string} id
       * @returns {Promise<boolean>}
       */
      async deleteById(id) {
        const adapter = await this.getAdapter();
        return adapter.deleteById(this.modelName, id);
      }
      /**
       * Exists.
       *
       * @param {number|string} id
       * @returns {Promise<boolean>}
       */
      async exists(id) {
        const adapter = await this.getAdapter();
        return adapter.exists(this.modelName, id);
      }
      /**
       * Count.
       *
       * @param {object|undefined} where
       * @returns {Promise<number>}
       */
      async count(where = void 0) {
        const adapter = await this.getAdapter();
        return adapter.count(this.modelName, where);
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/repository/repository-registry.js
var import_js_service34, RepositoryRegistry;
var init_repository_registry = __esm({
  "node_modules/@e22m4u/js-repository/src/repository/repository-registry.js"() {
    import_js_service34 = require("@e22m4u/js-service");
    init_repository();
    init_utils();
    init_errors();
    RepositoryRegistry = class extends import_js_service34.Service {
      static {
        __name(this, "RepositoryRegistry");
      }
      /**
       * Repositories.
       *
       * @type {object}
       */
      _repositories = {};
      /**
       * Repository ctor.
       *
       * @type {typeof Repository}
       * @private
       */
      _repositoryCtor = Repository;
      /**
       * Set repository ctor.
       *
       * @param {typeof Repository} ctor
       */
      setRepositoryCtor(ctor) {
        if (!ctor || typeof ctor !== "function" || !(ctor.prototype instanceof Repository)) {
          throw new InvalidArgumentError(
            "The first argument of RepositoryRegistry.setRepositoryCtor must inherit from Repository class, but %v was given.",
            ctor
          );
        }
        this._repositoryCtor = ctor;
      }
      /**
       * Get repository.
       *
       * @param {string} modelName
       * @returns {Repository}
       */
      getRepository(modelName) {
        const modelKey = modelNameToModelKey(modelName);
        let repository = this._repositories[modelKey];
        if (repository) return repository;
        repository = new this._repositoryCtor(this.container, modelName);
        this._repositories[modelKey] = repository;
        return repository;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/repository/index.js
var init_repository2 = __esm({
  "node_modules/@e22m4u/js-repository/src/repository/index.js"() {
    init_repository();
    init_repository_registry();
  }
});

// node_modules/@e22m4u/js-repository/src/relations/has-one-resolver.js
var import_js_service35, HasOneResolver;
var init_has_one_resolver = __esm({
  "node_modules/@e22m4u/js-repository/src/relations/has-one-resolver.js"() {
    import_js_service35 = require("@e22m4u/js-service");
    init_utils();
    init_definition();
    init_errors();
    init_repository2();
    init_definition();
    HasOneResolver = class extends import_js_service35.Service {
      static {
        __name(this, "HasOneResolver");
      }
      /**
       * Include to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} foreignKey
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includeTo(entities, sourceName, targetName, relationName, foreignKey, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasOneResolver.includeTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasOneResolver.includeTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasOneResolver.includeTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasOneResolver.includeTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (!foreignKey || typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The parameter "foreignKey" of HasOneResolver.includeTo requires a non-empty String, but %v was given.',
            foreignKey
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasOneResolver.includeTo should be an Object, but %v was given.',
            scope
          );
        const sourcePkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          sourceName
        );
        const sourceIds = [];
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of HasOneResolver.includeTo requires an Array of Object, but %v was given.',
              entity
            );
          const sourceId = entity[sourcePkPropName];
          if (sourceIds.includes(sourceId)) return;
          sourceIds.push(sourceId);
        });
        const promises = [];
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        scope = scope ? cloneDeep(scope) : {};
        const targetBySourceId = /* @__PURE__ */ new Map();
        sourceIds.forEach((sourceId) => {
          const filter = cloneDeep(scope);
          filter.where = {
            and: [{ [foreignKey]: sourceId }, ...scope.where ? [scope.where] : []]
          };
          filter.limit = 1;
          promises.push(
            targetRepository.find(filter).then((result) => {
              if (result.length) targetBySourceId.set(sourceId, result[0]);
            })
          );
        });
        await Promise.all(promises);
        Array.from(targetBySourceId.keys()).forEach((sourceId) => {
          const sources = entities.filter((v) => v[sourcePkPropName] === sourceId);
          sources.forEach((v) => v[relationName] = targetBySourceId.get(sourceId));
        });
      }
      /**
       * Include polymorphic to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} foreignKey
       * @param {string} discriminator
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includePolymorphicTo(entities, sourceName, targetName, relationName, foreignKey, discriminator, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasOneResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasOneResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasOneResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasOneResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (!foreignKey || typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The parameter "foreignKey" of HasOneResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            foreignKey
          );
        if (!discriminator || typeof discriminator !== "string")
          throw new InvalidArgumentError(
            'The parameter "discriminator" of HasOneResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            discriminator
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasOneResolver.includePolymorphicTo should be an Object, but %v was given.',
            scope
          );
        const sourcePkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          sourceName
        );
        const sourceIds = [];
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of HasOneResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
              entity
            );
          const sourceId = entity[sourcePkPropName];
          if (sourceIds.includes(sourceId)) return;
          sourceIds.push(sourceId);
        });
        const promises = [];
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        scope = scope ? cloneDeep(scope) : {};
        const targetBySourceId = /* @__PURE__ */ new Map();
        sourceIds.forEach((sourceId) => {
          const filter = cloneDeep(scope);
          filter.where = {
            and: [
              { [foreignKey]: sourceId, [discriminator]: sourceName },
              ...scope.where ? [scope.where] : []
            ]
          };
          filter.limit = 1;
          promises.push(
            targetRepository.find(filter).then((result) => {
              if (result.length) targetBySourceId.set(sourceId, result[0]);
            })
          );
        });
        await Promise.all(promises);
        Array.from(targetBySourceId.keys()).forEach((sourceId) => {
          const sources = entities.filter((v) => v[sourcePkPropName] === sourceId);
          sources.forEach((v) => v[relationName] = targetBySourceId.get(sourceId));
        });
      }
      /**
       * Include polymorphic by relation name.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} targetRelationName
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includePolymorphicByRelationName(entities, sourceName, targetName, relationName, targetRelationName, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasOneResolver.includePolymorphicByRelationName requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasOneResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasOneResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasOneResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            relationName
          );
        if (!targetRelationName || typeof targetRelationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetRelationName" of HasOneResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            targetRelationName
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasOneResolver.includePolymorphicByRelationName should be an Object, but %v was given.',
            scope
          );
        const targetRelationDef = this.getService(
          ModelDefinitionUtils
        ).getRelationDefinitionByName(targetName, targetRelationName);
        if (targetRelationDef.type !== RelationType.BELONGS_TO)
          throw new InvalidArgumentError(
            'The relation %v of the model %v is a polymorphic "hasOne" relation, so it requires the target relation %v to be a polymorphic "belongsTo", but %v type was given.',
            relationName,
            sourceName,
            targetRelationName,
            targetRelationDef.type
          );
        if (!targetRelationDef.polymorphic)
          throw new InvalidArgumentError(
            'The relation %v of the model %v is a polymorphic "hasOne" relation, so it requires the target relation %v to be a polymorphic too.',
            relationName,
            sourceName,
            targetRelationName
          );
        const foreignKey = targetRelationDef.foreignKey || `${targetRelationName}Id`;
        const discriminator = targetRelationDef.discriminator || `${targetRelationName}Type`;
        return this.includePolymorphicTo(
          entities,
          sourceName,
          targetName,
          relationName,
          foreignKey,
          discriminator,
          scope
        );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/relations/has-many-resolver.js
var import_js_service36, HasManyResolver;
var init_has_many_resolver = __esm({
  "node_modules/@e22m4u/js-repository/src/relations/has-many-resolver.js"() {
    import_js_service36 = require("@e22m4u/js-service");
    init_utils();
    init_definition();
    init_errors();
    init_repository2();
    init_definition();
    HasManyResolver = class extends import_js_service36.Service {
      static {
        __name(this, "HasManyResolver");
      }
      /**
       * Include to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} foreignKey
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includeTo(entities, sourceName, targetName, relationName, foreignKey, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasManyResolver.includeTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasManyResolver.includeTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasManyResolver.includeTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasManyResolver.includeTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (!foreignKey || typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The parameter "foreignKey" of HasManyResolver.includeTo requires a non-empty String, but %v was given.',
            foreignKey
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasManyResolver.includeTo should be an Object, but %v was given.',
            scope
          );
        const sourcePkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          sourceName
        );
        const sourceIds = [];
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of HasManyResolver.includeTo requires an Array of Object, but %v was given.',
              entity
            );
          const sourceId = entity[sourcePkPropName];
          if (sourceIds.includes(sourceId)) return;
          sourceIds.push(sourceId);
        });
        const promises = [];
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        scope = scope ? cloneDeep(scope) : {};
        const targetsBySourceId = /* @__PURE__ */ new Map();
        sourceIds.forEach((sourceId) => {
          const filter = cloneDeep(scope);
          filter.where = {
            and: [{ [foreignKey]: sourceId }, ...scope.where ? [scope.where] : []]
          };
          promises.push(
            targetRepository.find(filter).then((result) => {
              if (result.length) {
                let targets = targetsBySourceId.get(sourceId) ?? [];
                targets = [...targets, ...result];
                targetsBySourceId.set(sourceId, targets);
              }
            })
          );
        });
        await Promise.all(promises);
        entities.forEach((entity) => {
          const sourceId = entity[sourcePkPropName];
          entity[relationName] = targetsBySourceId.get(sourceId) ?? [];
        });
      }
      /**
       * Include polymorphic to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} foreignKey
       * @param {string} discriminator
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includePolymorphicTo(entities, sourceName, targetName, relationName, foreignKey, discriminator, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasManyResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasManyResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasManyResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasManyResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (!foreignKey || typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The parameter "foreignKey" of HasManyResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            foreignKey
          );
        if (!discriminator || typeof discriminator !== "string")
          throw new InvalidArgumentError(
            'The parameter "discriminator" of HasManyResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            discriminator
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasManyResolver.includePolymorphicTo should be an Object, but %v was given.',
            scope
          );
        const sourcePkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          sourceName
        );
        const sourceIds = [];
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of HasManyResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
              entity
            );
          const sourceId = entity[sourcePkPropName];
          if (sourceIds.includes(sourceId)) return;
          sourceIds.push(sourceId);
        });
        const promises = [];
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        scope = scope ? cloneDeep(scope) : {};
        const targetsBySourceId = /* @__PURE__ */ new Map();
        sourceIds.forEach((sourceId) => {
          const filter = cloneDeep(scope);
          filter.where = {
            and: [
              { [foreignKey]: sourceId, [discriminator]: sourceName },
              ...scope.where ? [scope.where] : []
            ]
          };
          promises.push(
            targetRepository.find(filter).then((result) => {
              if (result.length) {
                let targets = targetsBySourceId.get(sourceId) ?? [];
                targets = [...targets, ...result];
                targetsBySourceId.set(sourceId, targets);
              }
            })
          );
        });
        await Promise.all(promises);
        entities.forEach((entity) => {
          const sourceId = entity[sourcePkPropName];
          entity[relationName] = targetsBySourceId.get(sourceId) ?? [];
        });
      }
      /**
       * Include polymorphic by relation name.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string} targetRelationName
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includePolymorphicByRelationName(entities, sourceName, targetName, relationName, targetRelationName, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of HasManyResolver.includePolymorphicByRelationName requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of HasManyResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of HasManyResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of HasManyResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            relationName
          );
        if (!targetRelationName || typeof targetRelationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetRelationName" of HasManyResolver.includePolymorphicByRelationName requires a non-empty String, but %v was given.',
            targetRelationName
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of HasManyResolver.includePolymorphicByRelationName should be an Object, but %v was given.',
            scope
          );
        const targetRelationDef = this.getService(
          ModelDefinitionUtils
        ).getRelationDefinitionByName(targetName, targetRelationName);
        if (targetRelationDef.type !== RelationType.BELONGS_TO)
          throw new InvalidArgumentError(
            'The relation %v of the model %v is a polymorphic "hasMany" relation, so it requires the target relation %v to be a polymorphic "belongsTo", but %v type was given.',
            relationName,
            sourceName,
            targetRelationName,
            targetRelationDef.type
          );
        if (!targetRelationDef.polymorphic)
          throw new InvalidArgumentError(
            'The relation %v of the model %v is a polymorphic "hasMany" relation, so it requires the target relation %v to be a polymorphic too.',
            relationName,
            sourceName,
            targetRelationName
          );
        const foreignKey = targetRelationDef.foreignKey || `${targetRelationName}Id`;
        const discriminator = targetRelationDef.discriminator || `${targetRelationName}Type`;
        return this.includePolymorphicTo(
          entities,
          sourceName,
          targetName,
          relationName,
          foreignKey,
          discriminator,
          scope
        );
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/relations/belongs-to-resolver.js
var import_js_service37, BelongsToResolver;
var init_belongs_to_resolver = __esm({
  "node_modules/@e22m4u/js-repository/src/relations/belongs-to-resolver.js"() {
    import_js_service37 = require("@e22m4u/js-service");
    init_utils();
    init_utils();
    init_errors();
    init_repository2();
    init_definition();
    BelongsToResolver = class extends import_js_service37.Service {
      static {
        __name(this, "BelongsToResolver");
      }
      /**
       * Include to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string|undefined} foreignKey
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includeTo(entities, sourceName, targetName, relationName, foreignKey = void 0, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of BelongsToResolver.includeTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of BelongsToResolver.includeTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of BelongsToResolver.includeTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of BelongsToResolver.includeTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (foreignKey && typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The provided parameter "foreignKey" of BelongsToResolver.includeTo should be a String, but %v was given.',
            foreignKey
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of BelongsToResolver.includeTo should be an Object, but %v was given.',
            scope
          );
        if (foreignKey == null) foreignKey = `${relationName}Id`;
        const targetIds = entities.reduce((acc, entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of BelongsToResolver.includeTo requires an Array of Object, but %v was given.',
              entity
            );
          const targetId = entity[foreignKey];
          return targetId != null ? [...acc, targetId] : acc;
        }, []);
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        const targetPkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          targetName
        );
        scope = scope ? cloneDeep(scope) : {};
        const filter = cloneDeep(scope);
        filter.where = {
          and: [
            { [targetPkPropName]: { inq: targetIds } },
            ...scope.where ? [scope.where] : []
          ]
        };
        const targets = await targetRepository.find(filter);
        entities.forEach((entity) => {
          const target = targets.find(
            (e) => e[targetPkPropName] === entity[foreignKey]
          );
          if (target) entity[relationName] = target;
        });
      }
      /**
       * Include polymorphic to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} relationName
       * @param {string|undefined} foreignKey
       * @param {string|undefined} discriminator
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includePolymorphicTo(entities, sourceName, relationName, foreignKey = void 0, discriminator = void 0, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of BelongsToResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of BelongsToResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of BelongsToResolver.includePolymorphicTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (foreignKey && typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The provided parameter "foreignKey" of BelongsToResolver.includePolymorphicTo should be a String, but %v was given.',
            foreignKey
          );
        if (discriminator && typeof discriminator !== "string")
          throw new InvalidArgumentError(
            'The provided parameter "discriminator" of BelongsToResolver.includePolymorphicTo should be a String, but %v was given.',
            discriminator
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of BelongsToResolver.includePolymorphicTo should be an Object, but %v was given.',
            scope
          );
        if (foreignKey == null) {
          const singularRelationName = singularize(relationName);
          foreignKey = `${singularRelationName}Id`;
        }
        if (discriminator == null) {
          const singularRelationName = singularize(relationName);
          discriminator = `${singularRelationName}Type`;
        }
        const targetIdsByTargetName = {};
        entities.forEach((entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of BelongsToResolver.includePolymorphicTo requires an Array of Object, but %v was given.',
              entity
            );
          const targetId = entity[foreignKey];
          const targetName = entity[discriminator];
          if (targetId == null || targetName == null) return;
          if (targetIdsByTargetName[targetName] == null)
            targetIdsByTargetName[targetName] = [];
          if (!targetIdsByTargetName[targetName].includes(targetId))
            targetIdsByTargetName[targetName].push(targetId);
        });
        const promises = [];
        const targetNames = Object.keys(targetIdsByTargetName);
        scope = scope ? cloneDeep(scope) : {};
        const targetEntitiesByTargetNames = {};
        targetNames.forEach((targetName) => {
          let targetRepository;
          try {
            targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
          } catch (error) {
            if (error instanceof InvalidArgumentError) {
              if (error.message === `The model "${targetName}" is not defined.` || error.message === `The model "${targetName}" does not have a specified datasource.`) {
                return;
              }
            } else {
              throw error;
            }
          }
          const targetPkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
            targetName
          );
          const targetFilter = cloneDeep(scope);
          const targetIds = targetIdsByTargetName[targetName];
          targetFilter.where = {
            and: [
              { [targetPkPropName]: { inq: targetIds } },
              ...scope.where ? [scope.where] : []
            ]
          };
          const promise = targetRepository.find(targetFilter).then((result) => {
            targetEntitiesByTargetNames[targetName] = [
              ...targetEntitiesByTargetNames[targetName] ?? [],
              ...result
            ];
          });
          promises.push(promise);
        });
        await Promise.all(promises);
        entities.forEach((entity) => {
          const targetId = entity[foreignKey];
          const targetName = entity[discriminator];
          if (targetId == null || targetName == null || targetEntitiesByTargetNames[targetName] == null) {
            return;
          }
          const targetEntities = targetEntitiesByTargetNames[targetName] ?? [];
          const targetPkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
            targetName
          );
          const target = targetEntities.find((e) => e[targetPkPropName] === targetId);
          if (target) entity[relationName] = target;
        });
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/relations/references-many-resolver.js
var import_js_service38, ReferencesManyResolver;
var init_references_many_resolver = __esm({
  "node_modules/@e22m4u/js-repository/src/relations/references-many-resolver.js"() {
    import_js_service38 = require("@e22m4u/js-service");
    init_utils();
    init_utils();
    init_errors();
    init_repository2();
    init_definition();
    ReferencesManyResolver = class extends import_js_service38.Service {
      static {
        __name(this, "ReferencesManyResolver");
      }
      /**
       * Include to.
       *
       * @param {object[]} entities
       * @param {string} sourceName
       * @param {string} targetName
       * @param {string} relationName
       * @param {string|undefined} foreignKey
       * @param {object|undefined} scope
       * @returns {Promise<void>}
       */
      async includeTo(entities, sourceName, targetName, relationName, foreignKey = void 0, scope = void 0) {
        if (!entities || !Array.isArray(entities))
          throw new InvalidArgumentError(
            'The parameter "entities" of ReferencesManyResolver.includeTo requires an Array of Object, but %v was given.',
            entities
          );
        if (!sourceName || typeof sourceName !== "string")
          throw new InvalidArgumentError(
            'The parameter "sourceName" of ReferencesManyResolver.includeTo requires a non-empty String, but %v was given.',
            sourceName
          );
        if (!targetName || typeof targetName !== "string")
          throw new InvalidArgumentError(
            'The parameter "targetName" of ReferencesManyResolver.includeTo requires a non-empty String, but %v was given.',
            targetName
          );
        if (!relationName || typeof relationName !== "string")
          throw new InvalidArgumentError(
            'The parameter "relationName" of ReferencesManyResolver.includeTo requires a non-empty String, but %v was given.',
            relationName
          );
        if (foreignKey && typeof foreignKey !== "string")
          throw new InvalidArgumentError(
            'The provided parameter "foreignKey" of ReferencesManyResolver.includeTo should be a String, but %v was given.',
            foreignKey
          );
        if (scope && (typeof scope !== "object" || Array.isArray(scope)))
          throw new InvalidArgumentError(
            'The provided parameter "scope" of ReferencesManyResolver.includeTo should be an Object, but %v was given.',
            scope
          );
        if (foreignKey == null) {
          const singularRelationName = singularize(relationName);
          foreignKey = `${singularRelationName}Ids`;
        }
        const targetIds = entities.reduce((acc, entity) => {
          if (!entity || typeof entity !== "object" || Array.isArray(entity))
            throw new InvalidArgumentError(
              'The parameter "entities" of ReferencesManyResolver.includeTo requires an Array of Object, but %v was given.',
              entity
            );
          const ids = entity[foreignKey];
          if (Array.isArray(ids))
            ids.forEach((id) => {
              if (id == null || acc.includes(id)) return;
              acc.push(id);
            });
          return acc;
        }, []);
        const targetRepository = this.getService(RepositoryRegistry).getRepository(targetName);
        const targetPkPropName = this.getService(ModelDefinitionUtils).getPrimaryKeyAsPropertyName(
          targetName
        );
        scope = scope ? cloneDeep(scope) : {};
        const filter = cloneDeep(scope);
        filter.where = {
          and: [
            { [targetPkPropName]: { inq: targetIds } },
            ...scope.where ? [scope.where] : []
          ]
        };
        const targets = await targetRepository.find(filter);
        entities.forEach((entity) => {
          const ids = entity[foreignKey];
          entity[relationName] = [];
          if (Array.isArray(ids))
            targets.forEach((target) => {
              const targetId = target[targetPkPropName];
              if (ids.includes(targetId)) entity[relationName].push(target);
            });
        });
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/relations/index.js
var init_relations2 = __esm({
  "node_modules/@e22m4u/js-repository/src/relations/index.js"() {
    init_has_one_resolver();
    init_has_many_resolver();
    init_belongs_to_resolver();
    init_references_many_resolver();
  }
});

// node_modules/@e22m4u/js-repository/src/filter/include-clause-tool.js
var import_js_service39, IncludeClauseTool;
var init_include_clause_tool = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/include-clause-tool.js"() {
    import_js_service39 = require("@e22m4u/js-service");
    init_definition();
    init_relations2();
    init_relations2();
    init_where_clause_tool();
    init_order_clause_tool();
    init_slice_clause_tool();
    init_errors();
    init_relations2();
    init_fields_clause_tool();
    init_definition();
    init_relations2();
    IncludeClauseTool = class _IncludeClauseTool extends import_js_service39.Service {
      static {
        __name(this, "IncludeClauseTool");
      }
      /**
       * Include to.
       *
       * @param {object[]} entities
       * @param {string} modelName
       * @param {IncludeClause|undefined} clause
       * @returns {Promise<void>}
       */
      async includeTo(entities, modelName, clause) {
        clause = _IncludeClauseTool.normalizeIncludeClause(clause);
        const promises = [];
        clause.forEach((inclusion) => {
          const relDef = this.getService(
            ModelDefinitionUtils
          ).getRelationDefinitionByName(modelName, inclusion.relation);
          switch (relDef.type) {
            // BELONGS_TO
            case RelationType.BELONGS_TO:
              if (relDef.polymorphic) {
                promises.push(
                  this.getService(BelongsToResolver).includePolymorphicTo(
                    entities,
                    modelName,
                    inclusion.relation,
                    relDef.foreignKey,
                    relDef.discriminator,
                    inclusion.scope
                  )
                );
              } else {
                promises.push(
                  this.getService(BelongsToResolver).includeTo(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.foreignKey,
                    inclusion.scope
                  )
                );
              }
              break;
            // HAS_ONE
            case RelationType.HAS_ONE:
              if (relDef.polymorphic && typeof relDef.polymorphic === "string") {
                promises.push(
                  this.getService(HasOneResolver).includePolymorphicByRelationName(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.polymorphic,
                    inclusion.scope
                  )
                );
              } else if (relDef.polymorphic) {
                promises.push(
                  this.getService(HasOneResolver).includePolymorphicTo(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.foreignKey,
                    relDef.discriminator,
                    inclusion.scope
                  )
                );
              } else {
                promises.push(
                  this.getService(HasOneResolver).includeTo(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.foreignKey,
                    inclusion.scope
                  )
                );
              }
              break;
            // HAS_MANY
            case RelationType.HAS_MANY:
              if (relDef.polymorphic && typeof relDef.polymorphic === "string") {
                promises.push(
                  this.getService(HasManyResolver).includePolymorphicByRelationName(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.polymorphic,
                    inclusion.scope
                  )
                );
              } else if (relDef.polymorphic) {
                promises.push(
                  this.getService(HasManyResolver).includePolymorphicTo(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.foreignKey,
                    relDef.discriminator,
                    inclusion.scope
                  )
                );
              } else {
                promises.push(
                  this.getService(HasManyResolver).includeTo(
                    entities,
                    modelName,
                    relDef.model,
                    inclusion.relation,
                    relDef.foreignKey,
                    inclusion.scope
                  )
                );
              }
              break;
            case RelationType.REFERENCES_MANY:
              promises.push(
                this.getService(ReferencesManyResolver).includeTo(
                  entities,
                  modelName,
                  relDef.model,
                  inclusion.relation,
                  relDef.foreignKey,
                  inclusion.scope
                )
              );
              break;
            default:
              throw new InvalidArgumentError(
                "The relation type %v does not have an inclusion resolver.",
                relDef.type
              );
          }
        });
        await Promise.all(promises);
      }
      /**
       * Validate include clause.
       *
       * @param {IncludeClause|undefined} clause
       */
      static validateIncludeClause(clause) {
        if (clause == null) {
        } else if (clause && typeof clause === "string") {
        } else if (Array.isArray(clause)) {
          const relNames = [];
          clause.flat(Infinity).forEach((el) => {
            this.validateIncludeClause(el);
            if (typeof el === "string") {
              relNames.push(el);
            } else if (typeof el === "object") {
              Object.keys(el).forEach((key) => {
                if (Object.prototype.hasOwnProperty.call(el, key))
                  relNames.push(key);
              });
            }
          });
          const duplicateNames = relNames.filter(
            (name, i) => relNames.indexOf(name) !== i
          );
          if (duplicateNames.length)
            throw new InvalidArgumentError(
              'The provided option "include" has duplicates of %v.',
              duplicateNames[0]
            );
        } else if (typeof clause === "object") {
          if ("relation" in clause) {
            if (!clause.relation || typeof clause.relation !== "string")
              throw new InvalidArgumentError(
                'The provided option "relation" should be a non-empty String, but %v was given.',
                clause.relation
              );
            if ("scope" in clause && clause) this.validateScopeClause(clause.scope);
          } else {
            Object.keys(clause).forEach((key) => {
              if (!Object.prototype.hasOwnProperty.call(clause, key)) return;
              this.validateIncludeClause(key);
              this.validateIncludeClause(clause[key]);
            });
          }
        } else {
          throw new InvalidArgumentError(
            'The provided option "include" should have a non-empty String, an Object or an Array, but %v was given.',
            clause
          );
        }
      }
      /**
       * Validate scope clause.
       *
       * @param {object|undefined} clause
       */
      static validateScopeClause(clause) {
        if (clause == null) return;
        if (typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            'The provided option "scope" should be an Object, but %v was given.',
            clause
          );
        if (clause.where != null) {
          WhereClauseTool.validateWhereClause(clause.where);
        }
        if (clause.order != null) {
          OrderClauseTool.validateOrderClause(clause.order);
        }
        if (clause.skip != null) {
          SliceClauseTool.validateSkipClause(clause.skip);
        }
        if (clause.limit != null) {
          SliceClauseTool.validateLimitClause(clause.limit);
        }
        if (clause.fields != null) {
          FieldsClauseTool.validateFieldsClause(clause.fields);
        }
        if (clause.include != null) {
          _IncludeClauseTool.validateIncludeClause(clause.include);
        }
      }
      /**
       * Normalize include clause.
       *
       * @param {IncludeClause|undefined} clause
       * @returns {object[]}
       */
      static normalizeIncludeClause(clause) {
        let result = [];
        if (clause == null) {
          return result;
        } else if (clause && typeof clause === "string") {
          result.push({ relation: clause });
        } else if (Array.isArray(clause)) {
          clause.flat(Infinity).forEach((el) => {
            el = this.normalizeIncludeClause(el);
            result = [...result, ...el];
          });
          const relNames = result.map((v) => v.relation);
          const duplicateNames = relNames.filter(
            (name, i) => relNames.indexOf(name) !== i
          );
          if (duplicateNames.length)
            throw new InvalidArgumentError(
              'The provided option "include" has duplicates of %v.',
              duplicateNames[0]
            );
        } else if (typeof clause === "object") {
          if ("relation" in clause) {
            if (!clause.relation || typeof clause.relation !== "string")
              throw new InvalidArgumentError(
                'The provided option "relation" should be a non-empty String, but %v was given.',
                clause.relation
              );
            const normalized = { relation: clause.relation };
            const scope = this.normalizeScopeClause(clause.scope);
            if (scope) normalized.scope = scope;
            result.push(normalized);
          } else {
            Object.keys(clause).forEach((key) => {
              if (!Object.prototype.hasOwnProperty.call(clause, key)) return;
              this.validateIncludeClause(key);
              const normalized = { relation: key };
              const include = this.normalizeIncludeClause(clause[key]);
              if (include.length) normalized.scope = { include };
              result.push(normalized);
            });
          }
        } else {
          throw new InvalidArgumentError(
            'The provided option "include" should have a non-empty String, an Object or an Array, but %v was given.',
            clause
          );
        }
        return result;
      }
      /**
       * Normalize scope clause.
       *
       * @param {object|undefined} clause
       * @returns {object|undefined}
       */
      static normalizeScopeClause(clause) {
        if (clause == null) return;
        if (typeof clause !== "object" || Array.isArray(clause))
          throw new InvalidArgumentError(
            'The provided option "scope" should be an Object, but %v was given.',
            clause
          );
        const result = {};
        if (clause.where != null) {
          WhereClauseTool.validateWhereClause(clause.where);
          result.where = clause.where;
        }
        if (clause.order != null) {
          OrderClauseTool.validateOrderClause(clause.order);
          result.order = clause.order;
        }
        if (clause.skip != null) {
          SliceClauseTool.validateSkipClause(clause.skip);
          result.skip = clause.skip;
        }
        if (clause.limit != null) {
          SliceClauseTool.validateLimitClause(clause.limit);
          result.limit = clause.limit;
        }
        if (clause.fields != null) {
          FieldsClauseTool.validateFieldsClause(clause.fields);
          result.fields = clause.fields;
        }
        if (clause.include != null) {
          result.include = this.normalizeIncludeClause(clause.include);
        }
        if (Object.keys(result).length) return result;
        return void 0;
      }
    };
  }
});

// node_modules/@e22m4u/js-repository/src/filter/index.js
var init_filter = __esm({
  "node_modules/@e22m4u/js-repository/src/filter/index.js"() {
    init_slice_clause_tool();
    init_order_clause_tool();
    init_where_clause_tool();
    init_fields_clause_tool();
    init_include_clause_tool();
    init_operator_clause_tool();
  }
});

// node_modules/reflect-metadata/Reflect.js
var require_Reflect = __commonJS({
  "node_modules/reflect-metadata/Reflect.js"() {
    var Reflect2;
    (function(Reflect3) {
      (function(factory) {
        var root = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
        var exporter = makeExporter(Reflect3);
        if (typeof root.Reflect !== "undefined") {
          exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter, root);
        if (typeof root.Reflect === "undefined") {
          root.Reflect = Reflect3;
        }
        function makeExporter(target, previous) {
          return function(key, value) {
            Object.defineProperty(target, key, { configurable: true, writable: true, value });
            if (previous)
              previous(key, value);
          };
        }
        __name(makeExporter, "makeExporter");
        function functionThis() {
          try {
            return Function("return this;")();
          } catch (_) {
          }
        }
        __name(functionThis, "functionThis");
        function indirectEvalThis() {
          try {
            return (void 0, eval)("(function() { return this; })()");
          } catch (_) {
          }
        }
        __name(indirectEvalThis, "indirectEvalThis");
        function sloppyModeThis() {
          return functionThis() || indirectEvalThis();
        }
        __name(sloppyModeThis, "sloppyModeThis");
      })(function(exporter, root) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function";
        var supportsProto = { __proto__: [] } instanceof Array;
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
          // create an object in dictionary mode (a.k.a. "slow" mode in v8)
          create: supportsCreate ? function() {
            return MakeDictionary(/* @__PURE__ */ Object.create(null));
          } : supportsProto ? function() {
            return MakeDictionary({ __proto__: null });
          } : function() {
            return MakeDictionary({});
          },
          has: downLevel ? function(map, key) {
            return hasOwn.call(map, key);
          } : function(map, key) {
            return key in map;
          },
          get: downLevel ? function(map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0;
          } : function(map, key) {
            return map[key];
          }
        };
        var functionPrototype = Object.getPrototypeOf(Function);
        var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        var registrySymbol = supportsSymbol ? Symbol.for("@reflect-metadata:registry") : void 0;
        var metadataRegistry = GetOrCreateMetadataRegistry();
        var metadataProvider = CreateMetadataProvider(metadataRegistry);
        function decorate(decorators, target, propertyKey, attributes) {
          if (!IsUndefined(propertyKey)) {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsObject(target))
              throw new TypeError();
            if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
              throw new TypeError();
            if (IsNull(attributes))
              attributes = void 0;
            propertyKey = ToPropertyKey(propertyKey);
            return DecorateProperty(decorators, target, propertyKey, attributes);
          } else {
            if (!IsArray(decorators))
              throw new TypeError();
            if (!IsConstructor(target))
              throw new TypeError();
            return DecorateConstructor(decorators, target);
          }
        }
        __name(decorate, "decorate");
        exporter("decorate", decorate);
        function metadata(metadataKey, metadataValue) {
          function decorator(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
              throw new TypeError();
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          __name(decorator, "decorator");
          return decorator;
        }
        __name(metadata, "metadata");
        exporter("metadata", metadata);
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        __name(defineMetadata, "defineMetadata");
        exporter("defineMetadata", defineMetadata);
        function hasMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        __name(hasMetadata, "hasMetadata");
        exporter("hasMetadata", hasMetadata);
        function hasOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        __name(hasOwnMetadata, "hasOwnMetadata");
        exporter("hasOwnMetadata", hasOwnMetadata);
        function getMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        __name(getMetadata, "getMetadata");
        exporter("getMetadata", getMetadata);
        function getOwnMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        __name(getOwnMetadata, "getOwnMetadata");
        exporter("getOwnMetadata", getOwnMetadata);
        function getMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryMetadataKeys(target, propertyKey);
        }
        __name(getMetadataKeys, "getMetadataKeys");
        exporter("getMetadataKeys", getMetadataKeys);
        function getOwnMetadataKeys(target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        __name(getOwnMetadataKeys, "getOwnMetadataKeys");
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        function deleteMetadata(metadataKey, target, propertyKey) {
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          if (!IsObject(target))
            throw new TypeError();
          if (!IsUndefined(propertyKey))
            propertyKey = ToPropertyKey(propertyKey);
          var provider = GetMetadataProvider(
            target,
            propertyKey,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
        }
        __name(deleteMetadata, "deleteMetadata");
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsConstructor(decorated))
                throw new TypeError();
              target = decorated;
            }
          }
          return target;
        }
        __name(DecorateConstructor, "DecorateConstructor");
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
          for (var i = decorators.length - 1; i >= 0; --i) {
            var decorator = decorators[i];
            var decorated = decorator(target, propertyKey, descriptor);
            if (!IsUndefined(decorated) && !IsNull(decorated)) {
              if (!IsObject(decorated))
                throw new TypeError();
              descriptor = decorated;
            }
          }
          return descriptor;
        }
        __name(DecorateProperty, "DecorateProperty");
        function OrdinaryHasMetadata(MetadataKey2, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey2, O, P);
          if (hasOwn2)
            return true;
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryHasMetadata(MetadataKey2, parent, P);
          return false;
        }
        __name(OrdinaryHasMetadata, "OrdinaryHasMetadata");
        function OrdinaryHasOwnMetadata(MetadataKey2, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return false;
          return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey2, O, P));
        }
        __name(OrdinaryHasOwnMetadata, "OrdinaryHasOwnMetadata");
        function OrdinaryGetMetadata(MetadataKey2, O, P) {
          var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey2, O, P);
          if (hasOwn2)
            return OrdinaryGetOwnMetadata(MetadataKey2, O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (!IsNull(parent))
            return OrdinaryGetMetadata(MetadataKey2, parent, P);
          return void 0;
        }
        __name(OrdinaryGetMetadata, "OrdinaryGetMetadata");
        function OrdinaryGetOwnMetadata(MetadataKey2, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            false
          );
          if (IsUndefined(provider))
            return;
          return provider.OrdinaryGetOwnMetadata(MetadataKey2, O, P);
        }
        __name(OrdinaryGetOwnMetadata, "OrdinaryGetOwnMetadata");
        function OrdinaryDefineOwnMetadata(MetadataKey2, MetadataValue, O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*Create*/
            true
          );
          provider.OrdinaryDefineOwnMetadata(MetadataKey2, MetadataValue, O, P);
        }
        __name(OrdinaryDefineOwnMetadata, "OrdinaryDefineOwnMetadata");
        function OrdinaryMetadataKeys(O, P) {
          var ownKeys = OrdinaryOwnMetadataKeys(O, P);
          var parent = OrdinaryGetPrototypeOf(O);
          if (parent === null)
            return ownKeys;
          var parentKeys = OrdinaryMetadataKeys(parent, P);
          if (parentKeys.length <= 0)
            return ownKeys;
          if (ownKeys.length <= 0)
            return parentKeys;
          var set = new _Set();
          var keys = [];
          for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
            var key = ownKeys_1[_i];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
            var key = parentKeys_1[_a];
            var hasKey = set.has(key);
            if (!hasKey) {
              set.add(key);
              keys.push(key);
            }
          }
          return keys;
        }
        __name(OrdinaryMetadataKeys, "OrdinaryMetadataKeys");
        function OrdinaryOwnMetadataKeys(O, P) {
          var provider = GetMetadataProvider(
            O,
            P,
            /*create*/
            false
          );
          if (!provider) {
            return [];
          }
          return provider.OrdinaryOwnMetadataKeys(O, P);
        }
        __name(OrdinaryOwnMetadataKeys, "OrdinaryOwnMetadataKeys");
        function Type(x) {
          if (x === null)
            return 1;
          switch (typeof x) {
            case "undefined":
              return 0;
            case "boolean":
              return 2;
            case "string":
              return 3;
            case "symbol":
              return 4;
            case "number":
              return 5;
            case "object":
              return x === null ? 1 : 6;
            default:
              return 6;
          }
        }
        __name(Type, "Type");
        function IsUndefined(x) {
          return x === void 0;
        }
        __name(IsUndefined, "IsUndefined");
        function IsNull(x) {
          return x === null;
        }
        __name(IsNull, "IsNull");
        function IsSymbol(x) {
          return typeof x === "symbol";
        }
        __name(IsSymbol, "IsSymbol");
        function IsObject(x) {
          return typeof x === "object" ? x !== null : typeof x === "function";
        }
        __name(IsObject, "IsObject");
        function ToPrimitive(input, PreferredType) {
          switch (Type(input)) {
            case 0:
              return input;
            case 1:
              return input;
            case 2:
              return input;
            case 3:
              return input;
            case 4:
              return input;
            case 5:
              return input;
          }
          var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
          var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
          if (exoticToPrim !== void 0) {
            var result = exoticToPrim.call(input, hint);
            if (IsObject(result))
              throw new TypeError();
            return result;
          }
          return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        __name(ToPrimitive, "ToPrimitive");
        function OrdinaryToPrimitive(O, hint) {
          if (hint === "string") {
            var toString_1 = O.toString;
            if (IsCallable(toString_1)) {
              var result = toString_1.call(O);
              if (!IsObject(result))
                return result;
            }
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
          } else {
            var valueOf = O.valueOf;
            if (IsCallable(valueOf)) {
              var result = valueOf.call(O);
              if (!IsObject(result))
                return result;
            }
            var toString_2 = O.toString;
            if (IsCallable(toString_2)) {
              var result = toString_2.call(O);
              if (!IsObject(result))
                return result;
            }
          }
          throw new TypeError();
        }
        __name(OrdinaryToPrimitive, "OrdinaryToPrimitive");
        function ToBoolean(argument) {
          return !!argument;
        }
        __name(ToBoolean, "ToBoolean");
        function ToString(argument) {
          return "" + argument;
        }
        __name(ToString, "ToString");
        function ToPropertyKey(argument) {
          var key = ToPrimitive(
            argument,
            3
            /* String */
          );
          if (IsSymbol(key))
            return key;
          return ToString(key);
        }
        __name(ToPropertyKey, "ToPropertyKey");
        function IsArray(argument) {
          return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
        }
        __name(IsArray, "IsArray");
        function IsCallable(argument) {
          return typeof argument === "function";
        }
        __name(IsCallable, "IsCallable");
        function IsConstructor(argument) {
          return typeof argument === "function";
        }
        __name(IsConstructor, "IsConstructor");
        function IsPropertyKey(argument) {
          switch (Type(argument)) {
            case 3:
              return true;
            case 4:
              return true;
            default:
              return false;
          }
        }
        __name(IsPropertyKey, "IsPropertyKey");
        function SameValueZero(x, y) {
          return x === y || x !== x && y !== y;
        }
        __name(SameValueZero, "SameValueZero");
        function GetMethod(V, P) {
          var func = V[P];
          if (func === void 0 || func === null)
            return void 0;
          if (!IsCallable(func))
            throw new TypeError();
          return func;
        }
        __name(GetMethod, "GetMethod");
        function GetIterator(obj) {
          var method = GetMethod(obj, iteratorSymbol);
          if (!IsCallable(method))
            throw new TypeError();
          var iterator = method.call(obj);
          if (!IsObject(iterator))
            throw new TypeError();
          return iterator;
        }
        __name(GetIterator, "GetIterator");
        function IteratorValue(iterResult) {
          return iterResult.value;
        }
        __name(IteratorValue, "IteratorValue");
        function IteratorStep(iterator) {
          var result = iterator.next();
          return result.done ? false : result;
        }
        __name(IteratorStep, "IteratorStep");
        function IteratorClose(iterator) {
          var f = iterator["return"];
          if (f)
            f.call(iterator);
        }
        __name(IteratorClose, "IteratorClose");
        function OrdinaryGetPrototypeOf(O) {
          var proto = Object.getPrototypeOf(O);
          if (typeof O !== "function" || O === functionPrototype)
            return proto;
          if (proto !== functionPrototype)
            return proto;
          var prototype = O.prototype;
          var prototypeProto = prototype && Object.getPrototypeOf(prototype);
          if (prototypeProto == null || prototypeProto === Object.prototype)
            return proto;
          var constructor = prototypeProto.constructor;
          if (typeof constructor !== "function")
            return proto;
          if (constructor === O)
            return proto;
          return constructor;
        }
        __name(OrdinaryGetPrototypeOf, "OrdinaryGetPrototypeOf");
        function CreateMetadataRegistry() {
          var fallback;
          if (!IsUndefined(registrySymbol) && typeof root.Reflect !== "undefined" && !(registrySymbol in root.Reflect) && typeof root.Reflect.defineMetadata === "function") {
            fallback = CreateFallbackProvider(root.Reflect);
          }
          var first;
          var second;
          var rest;
          var targetProviderMap = new _WeakMap();
          var registry = {
            registerProvider,
            getProvider,
            setProvider
          };
          return registry;
          function registerProvider(provider) {
            if (!Object.isExtensible(registry)) {
              throw new Error("Cannot add provider to a frozen registry.");
            }
            switch (true) {
              case fallback === provider:
                break;
              case IsUndefined(first):
                first = provider;
                break;
              case first === provider:
                break;
              case IsUndefined(second):
                second = provider;
                break;
              case second === provider:
                break;
              default:
                if (rest === void 0)
                  rest = new _Set();
                rest.add(provider);
                break;
            }
          }
          __name(registerProvider, "registerProvider");
          function getProviderNoCache(O, P) {
            if (!IsUndefined(first)) {
              if (first.isProviderFor(O, P))
                return first;
              if (!IsUndefined(second)) {
                if (second.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(rest)) {
                  var iterator = GetIterator(rest);
                  while (true) {
                    var next = IteratorStep(iterator);
                    if (!next) {
                      return void 0;
                    }
                    var provider = IteratorValue(next);
                    if (provider.isProviderFor(O, P)) {
                      IteratorClose(iterator);
                      return provider;
                    }
                  }
                }
              }
            }
            if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
              return fallback;
            }
            return void 0;
          }
          __name(getProviderNoCache, "getProviderNoCache");
          function getProvider(O, P) {
            var providerMap = targetProviderMap.get(O);
            var provider;
            if (!IsUndefined(providerMap)) {
              provider = providerMap.get(P);
            }
            if (!IsUndefined(provider)) {
              return provider;
            }
            provider = getProviderNoCache(O, P);
            if (!IsUndefined(provider)) {
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return provider;
          }
          __name(getProvider, "getProvider");
          function hasProvider(provider) {
            if (IsUndefined(provider))
              throw new TypeError();
            return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
          }
          __name(hasProvider, "hasProvider");
          function setProvider(O, P, provider) {
            if (!hasProvider(provider)) {
              throw new Error("Metadata provider not registered.");
            }
            var existingProvider = getProvider(O, P);
            if (existingProvider !== provider) {
              if (!IsUndefined(existingProvider)) {
                return false;
              }
              var providerMap = targetProviderMap.get(O);
              if (IsUndefined(providerMap)) {
                providerMap = new _Map();
                targetProviderMap.set(O, providerMap);
              }
              providerMap.set(P, provider);
            }
            return true;
          }
          __name(setProvider, "setProvider");
        }
        __name(CreateMetadataRegistry, "CreateMetadataRegistry");
        function GetOrCreateMetadataRegistry() {
          var metadataRegistry2;
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            metadataRegistry2 = root.Reflect[registrySymbol];
          }
          if (IsUndefined(metadataRegistry2)) {
            metadataRegistry2 = CreateMetadataRegistry();
          }
          if (!IsUndefined(registrySymbol) && IsObject(root.Reflect) && Object.isExtensible(root.Reflect)) {
            Object.defineProperty(root.Reflect, registrySymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: metadataRegistry2
            });
          }
          return metadataRegistry2;
        }
        __name(GetOrCreateMetadataRegistry, "GetOrCreateMetadataRegistry");
        function CreateMetadataProvider(registry) {
          var metadata2 = new _WeakMap();
          var provider = {
            isProviderFor: /* @__PURE__ */ __name(function(O, P) {
              var targetMetadata = metadata2.get(O);
              if (IsUndefined(targetMetadata))
                return false;
              return targetMetadata.has(P);
            }, "isProviderFor"),
            OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
            OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
            OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
            OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
            OrdinaryDeleteMetadata
          };
          metadataRegistry.registerProvider(provider);
          return provider;
          function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = metadata2.get(O);
            var createdTargetMetadata = false;
            if (IsUndefined(targetMetadata)) {
              if (!Create)
                return void 0;
              targetMetadata = new _Map();
              metadata2.set(O, targetMetadata);
              createdTargetMetadata = true;
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
              if (!Create)
                return void 0;
              metadataMap = new _Map();
              targetMetadata.set(P, metadataMap);
              if (!registry.setProvider(O, P, provider)) {
                targetMetadata.delete(P);
                if (createdTargetMetadata) {
                  metadata2.delete(O);
                }
                throw new Error("Wrong provider for target.");
              }
            }
            return metadataMap;
          }
          __name(GetOrCreateMetadataMap, "GetOrCreateMetadataMap");
          function OrdinaryHasOwnMetadata2(MetadataKey2, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            return ToBoolean(metadataMap.has(MetadataKey2));
          }
          __name(OrdinaryHasOwnMetadata2, "OrdinaryHasOwnMetadata");
          function OrdinaryGetOwnMetadata2(MetadataKey2, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return void 0;
            return metadataMap.get(MetadataKey2);
          }
          __name(OrdinaryGetOwnMetadata2, "OrdinaryGetOwnMetadata");
          function OrdinaryDefineOwnMetadata2(MetadataKey2, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              true
            );
            metadataMap.set(MetadataKey2, MetadataValue);
          }
          __name(OrdinaryDefineOwnMetadata2, "OrdinaryDefineOwnMetadata");
          function OrdinaryOwnMetadataKeys2(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
              var next = IteratorStep(iterator);
              if (!next) {
                keys.length = k;
                return keys;
              }
              var nextValue = IteratorValue(next);
              try {
                keys[k] = nextValue;
              } catch (e) {
                try {
                  IteratorClose(iterator);
                } finally {
                  throw e;
                }
              }
              k++;
            }
          }
          __name(OrdinaryOwnMetadataKeys2, "OrdinaryOwnMetadataKeys");
          function OrdinaryDeleteMetadata(MetadataKey2, O, P) {
            var metadataMap = GetOrCreateMetadataMap(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(metadataMap))
              return false;
            if (!metadataMap.delete(MetadataKey2))
              return false;
            if (metadataMap.size === 0) {
              var targetMetadata = metadata2.get(O);
              if (!IsUndefined(targetMetadata)) {
                targetMetadata.delete(P);
                if (targetMetadata.size === 0) {
                  metadata2.delete(targetMetadata);
                }
              }
            }
            return true;
          }
          __name(OrdinaryDeleteMetadata, "OrdinaryDeleteMetadata");
        }
        __name(CreateMetadataProvider, "CreateMetadataProvider");
        function CreateFallbackProvider(reflect) {
          var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
          var metadataOwner = new _WeakMap();
          var provider = {
            isProviderFor: /* @__PURE__ */ __name(function(O, P) {
              var metadataPropertySet = metadataOwner.get(O);
              if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                return true;
              }
              if (getOwnMetadataKeys2(O, P).length) {
                if (IsUndefined(metadataPropertySet)) {
                  metadataPropertySet = new _Set();
                  metadataOwner.set(O, metadataPropertySet);
                }
                metadataPropertySet.add(P);
                return true;
              }
              return false;
            }, "isProviderFor"),
            OrdinaryDefineOwnMetadata: defineMetadata2,
            OrdinaryHasOwnMetadata: hasOwnMetadata2,
            OrdinaryGetOwnMetadata: getOwnMetadata2,
            OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
            OrdinaryDeleteMetadata: deleteMetadata2
          };
          return provider;
        }
        __name(CreateFallbackProvider, "CreateFallbackProvider");
        function GetMetadataProvider(O, P, Create) {
          var registeredProvider = metadataRegistry.getProvider(O, P);
          if (!IsUndefined(registeredProvider)) {
            return registeredProvider;
          }
          if (Create) {
            if (metadataRegistry.setProvider(O, P, metadataProvider)) {
              return metadataProvider;
            }
            throw new Error("Illegal state.");
          }
          return void 0;
        }
        __name(GetMetadataProvider, "GetMetadataProvider");
        function CreateMapPolyfill() {
          var cacheSentinel = {};
          var arraySentinel = [];
          var MapIterator = (
            /** @class */
            (function() {
              function MapIterator2(keys, values, selector) {
                this._index = 0;
                this._keys = keys;
                this._values = values;
                this._selector = selector;
              }
              __name(MapIterator2, "MapIterator");
              MapIterator2.prototype["@@iterator"] = function() {
                return this;
              };
              MapIterator2.prototype[iteratorSymbol] = function() {
                return this;
              };
              MapIterator2.prototype.next = function() {
                var index = this._index;
                if (index >= 0 && index < this._keys.length) {
                  var result = this._selector(this._keys[index], this._values[index]);
                  if (index + 1 >= this._keys.length) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  } else {
                    this._index++;
                  }
                  return { value: result, done: false };
                }
                return { value: void 0, done: true };
              };
              MapIterator2.prototype.throw = function(error) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                throw error;
              };
              MapIterator2.prototype.return = function(value) {
                if (this._index >= 0) {
                  this._index = -1;
                  this._keys = arraySentinel;
                  this._values = arraySentinel;
                }
                return { value, done: true };
              };
              return MapIterator2;
            })()
          );
          var Map2 = (
            /** @class */
            (function() {
              function Map3() {
                this._keys = [];
                this._values = [];
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              }
              __name(Map3, "Map");
              Object.defineProperty(Map3.prototype, "size", {
                get: /* @__PURE__ */ __name(function() {
                  return this._keys.length;
                }, "get"),
                enumerable: true,
                configurable: true
              });
              Map3.prototype.has = function(key) {
                return this._find(
                  key,
                  /*insert*/
                  false
                ) >= 0;
              };
              Map3.prototype.get = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                return index >= 0 ? this._values[index] : void 0;
              };
              Map3.prototype.set = function(key, value) {
                var index = this._find(
                  key,
                  /*insert*/
                  true
                );
                this._values[index] = value;
                return this;
              };
              Map3.prototype.delete = function(key) {
                var index = this._find(
                  key,
                  /*insert*/
                  false
                );
                if (index >= 0) {
                  var size = this._keys.length;
                  for (var i = index + 1; i < size; i++) {
                    this._keys[i - 1] = this._keys[i];
                    this._values[i - 1] = this._values[i];
                  }
                  this._keys.length--;
                  this._values.length--;
                  if (SameValueZero(key, this._cacheKey)) {
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                  }
                  return true;
                }
                return false;
              };
              Map3.prototype.clear = function() {
                this._keys.length = 0;
                this._values.length = 0;
                this._cacheKey = cacheSentinel;
                this._cacheIndex = -2;
              };
              Map3.prototype.keys = function() {
                return new MapIterator(this._keys, this._values, getKey);
              };
              Map3.prototype.values = function() {
                return new MapIterator(this._keys, this._values, getValue);
              };
              Map3.prototype.entries = function() {
                return new MapIterator(this._keys, this._values, getEntry);
              };
              Map3.prototype["@@iterator"] = function() {
                return this.entries();
              };
              Map3.prototype[iteratorSymbol] = function() {
                return this.entries();
              };
              Map3.prototype._find = function(key, insert) {
                if (!SameValueZero(this._cacheKey, key)) {
                  this._cacheIndex = -1;
                  for (var i = 0; i < this._keys.length; i++) {
                    if (SameValueZero(this._keys[i], key)) {
                      this._cacheIndex = i;
                      break;
                    }
                  }
                }
                if (this._cacheIndex < 0 && insert) {
                  this._cacheIndex = this._keys.length;
                  this._keys.push(key);
                  this._values.push(void 0);
                }
                return this._cacheIndex;
              };
              return Map3;
            })()
          );
          return Map2;
          function getKey(key, _) {
            return key;
          }
          __name(getKey, "getKey");
          function getValue(_, value) {
            return value;
          }
          __name(getValue, "getValue");
          function getEntry(key, value) {
            return [key, value];
          }
          __name(getEntry, "getEntry");
        }
        __name(CreateMapPolyfill, "CreateMapPolyfill");
        function CreateSetPolyfill() {
          var Set2 = (
            /** @class */
            (function() {
              function Set3() {
                this._map = new _Map();
              }
              __name(Set3, "Set");
              Object.defineProperty(Set3.prototype, "size", {
                get: /* @__PURE__ */ __name(function() {
                  return this._map.size;
                }, "get"),
                enumerable: true,
                configurable: true
              });
              Set3.prototype.has = function(value) {
                return this._map.has(value);
              };
              Set3.prototype.add = function(value) {
                return this._map.set(value, value), this;
              };
              Set3.prototype.delete = function(value) {
                return this._map.delete(value);
              };
              Set3.prototype.clear = function() {
                this._map.clear();
              };
              Set3.prototype.keys = function() {
                return this._map.keys();
              };
              Set3.prototype.values = function() {
                return this._map.keys();
              };
              Set3.prototype.entries = function() {
                return this._map.entries();
              };
              Set3.prototype["@@iterator"] = function() {
                return this.keys();
              };
              Set3.prototype[iteratorSymbol] = function() {
                return this.keys();
              };
              return Set3;
            })()
          );
          return Set2;
        }
        __name(CreateSetPolyfill, "CreateSetPolyfill");
        function CreateWeakMapPolyfill() {
          var UUID_SIZE = 16;
          var keys = HashMap.create();
          var rootKey = CreateUniqueKey();
          return (
            /** @class */
            (function() {
              function WeakMap2() {
                this._key = CreateUniqueKey();
              }
              __name(WeakMap2, "WeakMap");
              WeakMap2.prototype.has = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.has(table, this._key) : false;
              };
              WeakMap2.prototype.get = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? HashMap.get(table, this._key) : void 0;
              };
              WeakMap2.prototype.set = function(target, value) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  true
                );
                table[this._key] = value;
                return this;
              };
              WeakMap2.prototype.delete = function(target) {
                var table = GetOrCreateWeakMapTable(
                  target,
                  /*create*/
                  false
                );
                return table !== void 0 ? delete table[this._key] : false;
              };
              WeakMap2.prototype.clear = function() {
                this._key = CreateUniqueKey();
              };
              return WeakMap2;
            })()
          );
          function CreateUniqueKey() {
            var key;
            do
              key = "@@WeakMap@@" + CreateUUID();
            while (HashMap.has(keys, key));
            keys[key] = true;
            return key;
          }
          __name(CreateUniqueKey, "CreateUniqueKey");
          function GetOrCreateWeakMapTable(target, create) {
            if (!hasOwn.call(target, rootKey)) {
              if (!create)
                return void 0;
              Object.defineProperty(target, rootKey, { value: HashMap.create() });
            }
            return target[rootKey];
          }
          __name(GetOrCreateWeakMapTable, "GetOrCreateWeakMapTable");
          function FillRandomBytes(buffer, size) {
            for (var i = 0; i < size; ++i)
              buffer[i] = Math.random() * 255 | 0;
            return buffer;
          }
          __name(FillRandomBytes, "FillRandomBytes");
          function GenRandomBytes(size) {
            if (typeof Uint8Array === "function") {
              var array = new Uint8Array(size);
              if (typeof crypto !== "undefined") {
                crypto.getRandomValues(array);
              } else if (typeof msCrypto !== "undefined") {
                msCrypto.getRandomValues(array);
              } else {
                FillRandomBytes(array, size);
              }
              return array;
            }
            return FillRandomBytes(new Array(size), size);
          }
          __name(GenRandomBytes, "GenRandomBytes");
          function CreateUUID() {
            var data = GenRandomBytes(UUID_SIZE);
            data[6] = data[6] & 79 | 64;
            data[8] = data[8] & 191 | 128;
            var result = "";
            for (var offset = 0; offset < UUID_SIZE; ++offset) {
              var byte = data[offset];
              if (offset === 4 || offset === 6 || offset === 8)
                result += "-";
              if (byte < 16)
                result += "0";
              result += byte.toString(16).toLowerCase();
            }
            return result;
          }
          __name(CreateUUID, "CreateUUID");
        }
        __name(CreateWeakMapPolyfill, "CreateWeakMapPolyfill");
        function MakeDictionary(obj) {
          obj.__ = void 0;
          delete obj.__;
          return obj;
        }
        __name(MakeDictionary, "MakeDictionary");
      });
    })(Reflect2 || (Reflect2 = {}));
  }
});

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  AccessGuard: () => AccessGuard,
  AccessRule: () => AccessRule,
  AccessTokenModel: () => AccessTokenModel,
  AuthLocalizer: () => AuthLocalizer,
  AuthService: () => AuthService,
  AuthServiceOptions: () => AuthServiceOptions,
  AuthSession: () => AuthSession,
  BaseAccessTokenModel: () => BaseAccessTokenModel,
  BaseRoleModel: () => BaseRoleModel,
  BaseUserModel: () => BaseUserModel,
  EMAIL_FORMAT_REGEX: () => EMAIL_FORMAT_REGEX,
  JWT_ISSUE_RESULT_SCHEMA: () => JWT_ISSUE_RESULT_SCHEMA,
  LOGOUT_RESULT_SCHEMA: () => LOGOUT_RESULT_SCHEMA,
  RoleModel: () => RoleModel,
  UserDataService: () => UserDataService,
  UserModel: () => UserModel
});
module.exports = __toCommonJS(index_exports);

// dist/esm/access-guard.js
var import_http_errors2 = __toESM(require("http-errors"), 1);

// dist/esm/utils/create-error.js
var import_js_format = require("@e22m4u/js-format");
function createError(ctor, code, message, details, ...args) {
  const msg = (0, import_js_format.format)(message, ...args);
  const error = new ctor(msg);
  Object.assign(error, { code, details });
  return error;
}
__name(createError, "createError");

// dist/esm/utils/parse-url-query.js
function parseUrlQuery(urlString) {
  if (!urlString) {
    return {};
  }
  const url = new URL(urlString, "http://localhost");
  return Object.fromEntries(url.searchParams.entries());
}
__name(parseUrlQuery, "parseUrlQuery");

// dist/esm/utils/remove-empty-keys.js
function removeEmptyKeys(plainObject, removeWhen = (v) => v == null) {
  return Object.fromEntries(Object.entries(plainObject).filter(([, value]) => !removeWhen(value)));
}
__name(removeEmptyKeys, "removeEmptyKeys");

// dist/esm/utils/parse-cookie-header.js
function parseCookieHeader(cookieHeader) {
  if (!cookieHeader) {
    return {};
  }
  return cookieHeader.split(";").reduce((acc, cookie) => {
    const eqIndex = cookie.indexOf("=");
    if (eqIndex === -1) {
      return acc;
    }
    const key = cookie.substring(0, eqIndex).trim();
    let value = cookie.substring(eqIndex + 1).trim();
    if (!key) {
      return acc;
    }
    try {
      value = decodeURIComponent(value);
    } catch {
    }
    acc[key] = value;
    return acc;
  }, {});
}
__name(parseCookieHeader, "parseCookieHeader");

// dist/esm/auth-session.js
var import_http_errors = __toESM(require("http-errors"), 1);

// dist/esm/auth-localizer.js
var import_ts_localizer = require("@e22m4u/ts-localizer");

// dist/esm/locales/en.json
var en_default = {
  "userDataService.validateUsername.invalidFormatError": "Username can only contain Latin letters (a-z) and numbers (0-9)",
  "userDataService.validateUsername.minLengthError": "Username must be at least %d characters long",
  "userDataService.validateUsername.maxLengthError": "Username must not exceed %d characters",
  "userDataService.validateUsername.startLetterError": "Username must start with a Latin letter",
  "userDataService.validateEmail.invalidFormatError": "Invalid email address format",
  "userDataService.validatePhone.invalidFormatError": "Invalid phone number format",
  "userDataService.validatePassword.invalidFormatError": "Password must contain at least one letter and number",
  "userDataService.validatePassword.minLengthError": "Password must be at least %d characters long",
  "userDataService.validatePassword.maxLengthError": "Password must not exceed %d characters",
  "authService.findUserBeforeLogin.notFoundError": "Invalid login or password",
  "authService.ensureUserDoesNotExist.duplicateError": "A user with these credentials already exists",
  "authService.updateUser.userNotFoundError": "User is not found",
  "authService.verifyPassword.invalidPasswordError": "Invalid login or password",
  "accessGuard.requireRole.authenticationRequired": "Authentication is required",
  "accessGuard.requireRole.roleNotAllowed": "You do not have permissions to perform this action",
  "authSession.getUser.authenticationRequired": "Authentication is required",
  "authSession.getAccessTokenId.authenticationRequired": "Authentication is required"
};

// dist/esm/locales/ru.json
var ru_default = {
  "userDataService.validateUsername.invalidFormatError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u0438\u0435 \u0431\u0443\u043A\u0432\u044B (a-z) \u0438 \u0446\u0438\u0444\u0440\u044B (0-9)",
  "userDataService.validateUsername.minLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "userDataService.validateUsername.maxLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "userDataService.validateUsername.startLetterError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u043E\u0439 \u0431\u0443\u043A\u0432\u044B",
  "userDataService.validateEmail.invalidFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0430\u0434\u0440\u0435\u0441\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "userDataService.validatePhone.invalidFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043D\u043E\u043C\u0435\u0440\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "userDataService.validatePassword.invalidFormatError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u043E\u0434\u043D\u0443 \u0431\u0443\u043A\u0432\u0443 \u0438 \u0446\u0438\u0444\u0440\u0443",
  "userDataService.validatePassword.minLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "userDataService.validatePassword.maxLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "authService.findUserBeforeLogin.notFoundError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "authService.ensureUserDoesNotExist.duplicateError": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",
  "authService.updateUser.userNotFoundError": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D",
  "authService.verifyPassword.invalidPasswordError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "accessGuard.requireRole.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "accessGuard.requireRole.roleNotAllowed": "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  "authSession.getUser.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "authSession.getAccessTokenId.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
};

// dist/esm/auth-localizer.js
var AuthLocalizer = class extends import_ts_localizer.Localizer {
  static {
    __name(this, "AuthLocalizer");
  }
  constructor(container, options) {
    super(container, {
      dictionaries: { en: en_default, ru: ru_default },
      ...options
    });
  }
};

// dist/esm/auth-session.js
var import_js_service = require("@e22m4u/js-service");
var AuthSession = class extends import_js_service.DebuggableService {
  static {
    __name(this, "AuthSession");
  }
  /**
   * Http request.
   */
  httpRequest;
  /**
   * Access token.
   */
  accessToken;
  /**
   * User.
   */
  user;
  /**
   * Is logged in.
   */
  get isLoggedIn() {
    return Boolean(this.accessToken) && Boolean(this.user);
  }
  /**
   * Constructor.
   *
   * @param user
   */
  constructor(container, httpRequest, accessToken, user) {
    super(container);
    this.httpRequest = httpRequest;
    this.accessToken = accessToken;
    this.user = user;
  }
  /**
   * Get request method.
   */
  getRequestMethod() {
    return this.httpRequest.method || "";
  }
  /**
   * Get request pathname.
   */
  getRequestPathname() {
    return (this.httpRequest.url || "").replace(/(#.*)|(\?.*)/, "");
  }
  /**
   * Get user.
   */
  getUser() {
    if (!this.user) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors.default.Unauthorized, "AUTHENTICATION_REQUIRED", localizer.t("authSession.getUser.authenticationRequired"));
    }
    return this.user;
  }
  /**
   * User id.
   */
  getUserId() {
    return this.getUser().id;
  }
  /**
   * Get user roles.
   */
  getUserRoles() {
    return this.getUser().roles || [];
  }
  /**
   * Get role names.
   */
  getRoleNames() {
    return this.getUserRoles().map((v) => v.name).filter((v) => typeof v === "string");
  }
  /**
   * Get access token.
   */
  getAccessToken() {
    if (!this.accessToken) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors.default.Unauthorized, "AUTHENTICATION_REQUIRED", localizer.t("authSession.getAccessTokenId.authenticationRequired"));
    }
    return this.accessToken;
  }
  /**
   * Access token id.
   */
  getAccessTokenId() {
    return this.getAccessToken().id;
  }
};

// dist/esm/access-guard.js
var import_js_service2 = require("@e22m4u/js-service");
var AccessRule = {
  AUTHENTICATED: "$authenticated"
};
var AccessGuard = class extends import_js_service2.DebuggableService {
  static {
    __name(this, "AccessGuard");
  }
  /**
   * Require role.
   */
  requireRole(roleName) {
    const debug = this.getDebuggerFor(this.requireRole);
    const session = this.getRegisteredService(AuthSession);
    const method = session.getRequestMethod();
    const pathname = session.getRequestPathname();
    debug("Role checking for %s %v.", method, pathname);
    const localizer = this.getService(AuthLocalizer);
    if (!session.isLoggedIn)
      throw createError(import_http_errors2.default.Unauthorized, "AUTHORIZATION_REQUIRED", localizer.t("accessGuard.requireRole.authenticationRequired"));
    debug("User id was %v.", session.getUserId());
    const roleNames = [roleName].flat().filter(Boolean);
    if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
      debug("No required role given.");
      return;
    } else if (roleNames.length === 1) {
      debug("Required role was %v.", roleNames[0]);
    } else if (roleNames.length > 1) {
      debug("Required roles was %l.", roleNames);
    }
    const userRoles = session.getRoleNames();
    const isAllowed = userRoles.some((v) => roleNames.includes(v));
    if (!isAllowed)
      throw createError(import_http_errors2.default.Forbidden, "ROLE_NOT_ALLOWED", localizer.t("accessGuard.requireRole.roleNotAllowed"));
    debug("Access allowed.");
  }
};

// dist/esm/auth-service.js
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_uuid = require("uuid");
var import_http_errors3 = __toESM(require("http-errors"), 1);

// dist/esm/debuggable-service.js
var import_js_service3 = require("@e22m4u/js-service");
var MODULE_DEBUGGER_NAMESPACE = "tsRepositoryAuthService";
var DebuggableService3 = class extends import_js_service3.DebuggableService {
  static {
    __name(this, "DebuggableService");
  }
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container, {
      namespace: MODULE_DEBUGGER_NAMESPACE,
      noEnvironmentNamespace: true
    });
  }
};

// node_modules/@e22m4u/js-repository/src/index.js
init_utils();
init_errors();
init_filter();
init_adapter2();

// node_modules/@e22m4u/js-repository/src/database-schema.js
var import_js_service40 = require("@e22m4u/js-service");
init_repository2();
init_definition();
init_repository2();
var DatabaseSchema = class extends import_js_service40.Service {
  static {
    __name(this, "DatabaseSchema");
  }
  /**
   * Define datasource.
   *
   * @param {object} datasourceDef
   * @returns {this}
   */
  defineDatasource(datasourceDef) {
    this.getService(DefinitionRegistry).addDatasource(datasourceDef);
    return this;
  }
  /**
   * Define model.
   *
   * @param {object} modelDef
   * @returns {this}
   */
  defineModel(modelDef) {
    this.getService(DefinitionRegistry).addModel(modelDef);
    return this;
  }
  /**
   * Get repository.
   *
   * @param {string} modelName
   * @returns {Repository}
   */
  getRepository(modelName) {
    return this.getService(RepositoryRegistry).getRepository(modelName);
  }
};

// node_modules/@e22m4u/js-repository/src/index.js
init_relations2();
init_definition();
init_repository2();

// dist/esm/models/role-model.js
var import_ts_repository = require("@e22m4u/ts-repository");
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BaseRoleModel = class BaseRoleModel2 {
  static {
    __name(this, "BaseRoleModel");
  }
  id;
  name;
  createdAt;
};
__decorate([
  (0, import_ts_repository.property)({
    type: import_ts_repository.DataType.ANY,
    primaryKey: true
  }),
  __metadata("design:type", Object)
], BaseRoleModel.prototype, "id", void 0);
__decorate([
  (0, import_ts_repository.property)({
    type: import_ts_repository.DataType.STRING,
    required: true,
    unique: import_ts_repository.PropertyUniqueness.STRICT
  }),
  __metadata("design:type", String)
], BaseRoleModel.prototype, "name", void 0);
__decorate([
  (0, import_ts_repository.property)({
    type: import_ts_repository.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata("design:type", String)
], BaseRoleModel.prototype, "createdAt", void 0);
BaseRoleModel = __decorate([
  (0, import_ts_repository.model)()
], BaseRoleModel);
var RoleModel = class RoleModel2 extends BaseRoleModel {
  static {
    __name(this, "RoleModel");
  }
};
RoleModel = __decorate([
  (0, import_ts_repository.model)()
], RoleModel);

// dist/esm/models/user-model.js
var import_ts_projection = require("@e22m4u/ts-projection");
var import_ts_repository2 = require("@e22m4u/ts-repository");
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BaseUserModel = class BaseUserModel2 {
  static {
    __name(this, "BaseUserModel");
  }
  id;
  password;
  createdAt;
  updatedAt;
  roleIds;
  roles;
};
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.ANY,
    primaryKey: true
  }),
  __metadata2("design:type", Object)
], BaseUserModel.prototype, "id", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.STRING,
    default: ""
  }),
  (0, import_ts_projection.noOutput)(),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "password", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  (0, import_ts_projection.noInput)(),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "createdAt", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "updatedAt", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.ARRAY,
    itemType: import_ts_repository2.DataType.ANY,
    default: /* @__PURE__ */ __name(() => [], "default")
  }),
  __metadata2("design:type", Array)
], BaseUserModel.prototype, "roleIds", void 0);
__decorate2([
  (0, import_ts_repository2.relation)({
    type: import_ts_repository2.RelationType.REFERENCES_MANY,
    model: RoleModel.name,
    foreignKey: "roleIds"
  }),
  __metadata2("design:type", Array)
], BaseUserModel.prototype, "roles", void 0);
BaseUserModel = __decorate2([
  (0, import_ts_repository2.model)()
], BaseUserModel);
var UserModel = class UserModel2 extends BaseUserModel {
  static {
    __name(this, "UserModel");
  }
};
UserModel = __decorate2([
  (0, import_ts_repository2.model)()
], UserModel);

// dist/esm/models/access-token-model.js
var import_ts_repository3 = require("@e22m4u/ts-repository");
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata3 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BaseAccessTokenModel = class BaseAccessTokenModel2 {
  static {
    __name(this, "BaseAccessTokenModel");
  }
  id;
  createdAt;
  ownerId;
  owner;
};
__decorate3([
  (0, import_ts_repository3.property)({
    type: import_ts_repository3.DataType.ANY,
    primaryKey: true
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "id", void 0);
__decorate3([
  (0, import_ts_repository3.property)({
    type: import_ts_repository3.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata3("design:type", String)
], BaseAccessTokenModel.prototype, "createdAt", void 0);
__decorate3([
  (0, import_ts_repository3.property)({
    type: import_ts_repository3.DataType.ANY,
    required: true
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "ownerId", void 0);
__decorate3([
  (0, import_ts_repository3.relation)({
    type: import_ts_repository3.RelationType.BELONGS_TO,
    model: UserModel.name,
    foreignKey: "ownerId"
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "owner", void 0);
BaseAccessTokenModel = __decorate3([
  (0, import_ts_repository3.model)()
], BaseAccessTokenModel);
var AccessTokenModel = class AccessTokenModel2 extends BaseAccessTokenModel {
  static {
    __name(this, "AccessTokenModel");
  }
};
AccessTokenModel = __decorate3([
  (0, import_ts_repository3.model)()
], AccessTokenModel);

// dist/esm/auth-service.js
var { JsonWebTokenError, TokenExpiredError } = import_jsonwebtoken.default;
var AuthServiceOptions = class {
  static {
    __name(this, "AuthServiceOptions");
  }
  passwordHashRounds = 12;
  jwtSecret = "REPLACE_ME!";
  jwtTtl = 14 * 86400;
  // 14 days
  jwtHeaderName = "authorization";
  jwtCookieName = "accessToken";
  jwtQueryParam = "accessToken";
  sessionUserInclusion = "roles";
  /**
   * Constructor.
   *
   * @param options
   */
  constructor(options) {
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      Object.assign(this, filteredOptions);
    }
  }
};
var AuthService = class extends DebuggableService3 {
  static {
    __name(this, "AuthService");
  }
  /**
   * Options.
   */
  options;
  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(container, options) {
    super(container);
    this.options = this.getService(AuthServiceOptions);
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      Object.assign(this.options, filteredOptions);
    }
    if (process.env.NODE_ENV === "production" && this.options.jwtSecret === "REPLACE_ME!") {
      throw new Error("JWT secret is not set for the production environment!");
    }
  }
  /**
   * Create access token.
   *
   * @param user
   */
  async createAccessToken(ownerId, patch) {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug("Creating access token.");
    debug("Owner id was %v.", ownerId);
    const data = {
      id: (0, import_uuid.v7)(),
      ownerId,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...patch
    };
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.create(data);
    debug("Access token created and saved to database.");
    return res;
  }
  /**
   * Remove access token by id.
   *
   * @param tokenId
   */
  async removeAccessTokenById(accessTokenId) {
    const debug = this.getDebuggerFor(this.removeAccessTokenById);
    debug("Removing access token by id.");
    debug("Token id was %v.", accessTokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug("Access token removed from database.");
    } else {
      debug("Access token not found.");
    }
    return res;
  }
  /**
   * Issue JSON Web Token.
   *
   * @param accessToken
   */
  issueJwt(accessToken) {
    const debug = this.getDebuggerFor(this.issueJwt);
    debug("Issuing JWT.");
    debug("Token id was %v.", accessToken.id);
    debug("Owner id was %v.", accessToken.ownerId);
    const payload = { uid: accessToken.ownerId, tid: accessToken.id };
    const expiresAtInSec = Math.floor(Date.now() / 1e3) + this.options.jwtTtl;
    const expiresAt = new Date(expiresAtInSec * 1e3).toISOString();
    debug("Expiration date was %v.", expiresAt);
    return new Promise((res, rej) => {
      import_jsonwebtoken.default.sign(payload, this.options.jwtSecret, { algorithm: "HS256", expiresIn: this.options.jwtTtl }, (err, token) => {
        if (err || !token) {
          console.error(err);
          return rej(createError(import_http_errors3.default.InternalServerError, "ACCESS_TOKEN_ENCODING_ERROR", "Unable to encode JSON web token (JWT)", payload));
        }
        debug("Token was %v.", token);
        debug("Token created.");
        res({ token, expiresAt });
      });
    });
  }
  /**
   * Decode Jwt.
   *
   * @param jwToken
   */
  async decodeJwt(jwToken) {
    const debug = this.getDebuggerFor(this.decodeJwt);
    debug("Decoding JWT.");
    let error;
    let payload;
    try {
      payload = await new Promise((res, rej) => {
        import_jsonwebtoken.default.verify(jwToken, this.options.jwtSecret, (err, decoded) => {
          if (err)
            return rej(err);
          res(decoded);
        });
      });
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw createError(import_http_errors3.default.Unauthorized, "JWT_EXPIRED", "JWT is expired", { token: jwToken, reason: err.message });
      }
      if (err instanceof JsonWebTokenError) {
        throw createError(import_http_errors3.default.Unauthorized, "INVALID_JWT_SIGNATURE", "JWT signature is invalid", { token: jwToken, reason: err.message });
      }
      error = err;
    }
    if (error || !payload || typeof payload !== "object" || !("uid" in payload) || !("tid" in payload) || !payload.uid || !payload.tid) {
      console.error(error);
      throw createError(import_http_errors3.default.Unauthorized, "INVALID_JWT_PAYLOAD", "JWT payload is invalid", { token: jwToken, payload });
    }
    debug.inspect("Payload:", payload);
    debug("JWT decoded successfully.");
    return payload;
  }
  /**
   * Find access token by id.
   *
   * @param jwToken
   * @param include
   */
  async findAccessTokenById(tokenId, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenById);
    debug("Finding access token by id.");
    debug("Token id was %v.", tokenId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const accessToken = await rep.findOne({ where: { id: tokenId }, include });
    if (!accessToken) {
      throw createError(import_http_errors3.default.Unauthorized, "ACCESS_TOKEN_NOT_FOUND", "Access token is not found in the database", { tokenId });
    }
    debug("Access token found.");
    return accessToken;
  }
  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password) {
    if (!password)
      return "";
    try {
      return import_bcrypt.default.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      const reason = error && typeof error === "object" && "message" in error && error.message;
      if (!reason) {
        console.error(error);
      }
      throw createError(import_http_errors3.default.InternalServerError, "PASSWORD_HASHING_ERROR", "Unable to hash the given password", { reason });
    }
  }
  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(password, hash, silent = false) {
    const debug = this.getDebuggerFor(this.verifyPassword);
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = "authService.verifyPassword";
    debug("Verifying password");
    if (!password && !hash) {
      debug("No password or hash specified.");
      return true;
    }
    if (typeof password !== "string" || typeof hash !== "string") {
      throw createError(import_http_errors3.default.Unauthorized, "INVALID_PASSWORD", localizer.t(`${errorKeyPrefix}.invalidPasswordError`));
    }
    let isValid = false;
    try {
      isValid = await import_bcrypt.default.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors3.default.Unauthorized, "INVALID_PASSWORD", "Unable to verify the given password");
    }
    if (!isValid) {
      if (silent)
        return false;
      throw createError(import_http_errors3.default.Unauthorized, "INVALID_PASSWORD", localizer.t(`${errorKeyPrefix}.invalidPasswordError`));
    }
    debug("Password verified.");
    return true;
  }
  /**
   * Find user before login.
   *
   * @param where
   */
  async findUserBeforeLogin(where) {
    const localizer = this.getService(AuthLocalizer);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const user = await userRep.findOne({ where });
    if (!user) {
      throw createError(import_http_errors3.default.Unauthorized, "USER_NOT_FOUND", localizer.t(`authService.findUserBeforeLogin.notFoundError`));
    }
    return user;
  }
  /**
   * Find user before login.
   *
   * @param where
   */
  async ensureUserDoesNotExist(where, excludeUserId) {
    const localizer = this.getService(AuthLocalizer);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const user = await userRep.findOne({ where });
    if (user && user.id !== excludeUserId) {
      throw createError(import_http_errors3.default.Conflict, "DUPLICATE_USER", localizer.t(`authService.ensureUserDoesNotExist.duplicateError`));
    }
    return user;
  }
  /**
   * Create user.
   *
   * @param ctx
   * @param data
   * @param filter
   */
  async createUser(inputData, filter) {
    const debug = this.getDebuggerFor(this.createUser);
    debug("Creating user.");
    inputData = { ...inputData };
    if (inputData.password) {
      inputData.password = await this.hashPassword(inputData.password || "");
      debug("Password hashed.");
    }
    inputData.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const res = await userRep.create(inputData, filter);
    debug("User created.");
    debug("User id was %v.", res.id);
    return res;
  }
  /**
   * Update user.
   *
   * @param ctx
   * @param userId
   * @param data
   * @param filter
   */
  async updateUser(userId, inputData, filter) {
    const debug = this.getDebuggerFor(this.updateUser);
    debug("Updating user.");
    debug("User id was %v.", userId);
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = "authService.updateUser";
    const dbs = this.getRegisteredService(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    inputData = { ...inputData };
    delete inputData.id;
    const existingUser = await userRep.findOne({ where: { id: userId } });
    if (!existingUser)
      throw createError(import_http_errors3.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.userNotFoundError`));
    if (inputData.password) {
      inputData.password = await this.hashPassword(inputData.password || "");
      debug("Password hashed.");
    }
    delete inputData.createdAt;
    inputData.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const res = await userRep.patchById(userId, inputData, filter);
    debug("User updated.");
    return res;
  }
  /**
   * Find access token by http request.
   *
   * @param ctx
   * @param include
   */
  async findAccessTokenByHttpRequest(req, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenByHttpRequest);
    debug("Finding access token by http request.");
    const cookies = parseCookieHeader(req.headers["cookie"]);
    const query = parseUrlQuery(req.url);
    let jwToken = req.headers[this.options.jwtHeaderName] || cookies[this.options.jwtCookieName] || query[this.options.jwtQueryParam];
    if (typeof jwToken === "string") {
      jwToken = jwToken.replace("Bearer ", "");
    }
    if (!jwToken || typeof jwToken !== "string") {
      debug("Access token not found in the client request.");
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (accessToken.ownerId !== payload.uid)
      throw createError(import_http_errors3.default.BadRequest, "INVALID_ACCESS_TOKEN_OWNER", "JWT does not match its access token owner", payload);
    debug("Access token found.");
    debug("Token id was %v.", accessToken.id);
    debug("Owner id was %v.", accessToken.ownerId);
    return accessToken;
  }
  /**
   * Find access token owner.
   *
   * @param accessToken
   */
  async findAccessTokenOwner(accessToken, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenOwner);
    debug("Finding access token owner.");
    if (!accessToken.ownerId) {
      throw createError(import_http_errors3.default.InternalServerError, "ACCESS_TOKEN_OWNER_NOT_FOUND", "Access token does not have an owner", { accessTokenId: accessToken.id });
    }
    debug("Owner id was %v.", accessToken.ownerId);
    const dbs = this.getRegisteredService(DatabaseSchema);
    const rep = dbs.getRepository(UserModel.name);
    const owner = await rep.findOne({
      where: { id: accessToken.ownerId },
      include
    });
    if (!owner) {
      throw createError(import_http_errors3.default.InternalServerError, "ACCESS_TOKEN_OWNER_NOT_FOUND", "Access token owner is not found in the database", { accessTokenId: accessToken.id, ownerId: accessToken.ownerId });
    }
    debug("Owner found successfully.");
    return owner;
  }
  /**
   * Create auth session.
   *
   * @param ctx
   */
  async createAuthSession(req) {
    const accessToken = await this.findAccessTokenByHttpRequest(req);
    if (accessToken) {
      const user = await this.findAccessTokenOwner(accessToken, this.options.sessionUserInclusion);
      return new AuthSession(this.container, req, accessToken, user);
    } else {
      return new AuthSession(this.container, req);
    }
  }
};

// node_modules/@e22m4u/ts-data-schema/dist/esm/data-schema.js
var DataType6 = {
  ANY: "any",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  ARRAY: "array",
  OBJECT: "object"
};

// node_modules/@e22m4u/ts-data-schema/dist/esm/errors/type-cast-error.js
var import_js_format8 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-data-schema/dist/esm/utils/get-data-schema-from-class.js
var import_js_format7 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-reflector/dist/esm/reflector.js
var import_reflect_metadata = __toESM(require_Reflect(), 1);
var Reflector = class {
  static {
    __name(this, "Reflector");
  }
  /**
   * Define metadata.
   *
   * @param key
   * @param metadata
   * @param target
   * @param propertyName
   */
  static defineMetadata(key, metadata, target, propertyName) {
    if (propertyName)
      return Reflect.defineMetadata(key, metadata, target, propertyName);
    return Reflect.defineMetadata(key, metadata, target);
  }
  /**
   * Has metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static hasMetadata(key, target, propertyName) {
    return propertyName ? Reflect.hasMetadata(key, target, propertyName) : Reflect.hasMetadata(key, target);
  }
  /**
   * Has own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static hasOwnMetadata(key, target, propertyName) {
    return propertyName ? Reflect.hasOwnMetadata(key, target, propertyName) : Reflect.hasOwnMetadata(key, target);
  }
  /**
   * Get metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getMetadata(key, target, propertyName) {
    return propertyName ? Reflect.getMetadata(key, target, propertyName) : Reflect.getMetadata(key, target);
  }
  /**
   * Get own metadata.
   *
   * @param key
   * @param target
   * @param propertyName
   */
  static getOwnMetadata(key, target, propertyName) {
    return propertyName ? Reflect.getOwnMetadata(key, target, propertyName) : Reflect.getOwnMetadata(key, target);
  }
};

// node_modules/@e22m4u/ts-reflector/dist/esm/utils/get-decorator-target-type.js
var DecoratorTargetType;
(function(DecoratorTargetType2) {
  DecoratorTargetType2["CONSTRUCTOR"] = "constructor";
  DecoratorTargetType2["INSTANCE"] = "instance";
  DecoratorTargetType2["STATIC_METHOD"] = "staticMethod";
  DecoratorTargetType2["INSTANCE_METHOD"] = "instanceMethod";
  DecoratorTargetType2["STATIC_PROPERTY"] = "staticProperty";
  DecoratorTargetType2["INSTANCE_PROPERTY"] = "instanceProperty";
  DecoratorTargetType2["CONSTRUCTOR_PARAMETER"] = "constructorParameter";
  DecoratorTargetType2["STATIC_METHOD_PARAMETER"] = "staticMethodParameter";
  DecoratorTargetType2["INSTANCE_METHOD_PARAMETER"] = "instanceMethodParameter";
})(DecoratorTargetType || (DecoratorTargetType = {}));
function getDecoratorTargetType(target, propertyKey, descriptorOrIndex) {
  const isCtor = typeof target === "function";
  const isParameter = typeof descriptorOrIndex === "number";
  const isProperty = propertyKey != null && descriptorOrIndex == null;
  const isMethod = propertyKey != null && descriptorOrIndex != null;
  const D = DecoratorTargetType;
  if (isCtor) {
    if (isParameter)
      return propertyKey ? D.STATIC_METHOD_PARAMETER : D.CONSTRUCTOR_PARAMETER;
    if (isProperty)
      return D.STATIC_PROPERTY;
    if (isMethod)
      return D.STATIC_METHOD;
    return D.CONSTRUCTOR;
  } else {
    if (isParameter)
      return D.INSTANCE_METHOD_PARAMETER;
    if (isProperty)
      return D.INSTANCE_PROPERTY;
    if (isMethod)
      return D.INSTANCE_METHOD;
    return D.INSTANCE;
  }
}
__name(getDecoratorTargetType, "getDecoratorTargetType");

// node_modules/@e22m4u/ts-reflector/dist/esm/metadata-key.js
var MetadataKey = class {
  static {
    __name(this, "MetadataKey");
  }
  name;
  /**
   * Fix generic type validation.
   *
   * Example:
   *
   * ```ts
   * class Foo<T> {}
   * class Bar<T> {}
   *
   * class Baz {
   *     static method<T>(
   *         foo: Foo<T>,
   *         bar: Bar<T>,
   *     ) {}
   * }
   *
   * Baz.method(
   *     new Foo<string>(),
   *     new Bar<number>(), // No error because T is not used.
   * );
   * ```
   */
  _fixUnusedGeneric;
  /**
   * Fix structural typing.
   */
  _fixStructuralTyping = "metadataKey";
  /**
   * Constructor.
   *
   * @param name
   */
  constructor(name) {
    this.name = name;
  }
  /**
   * To string.
   */
  toString() {
    return this.name ? this.constructor.name + `(${this.name})` : this.constructor.name;
  }
};

// node_modules/@e22m4u/ts-data-schema/dist/esm/decorators/data-schema-metadata.js
var DATA_SCHEMA_CLASS_METADATA_KEY = new MetadataKey("dataSchemaClassMetadataKey");
var DATA_SCHEMA_PROPERTIES_METADATA_KEY = new MetadataKey("dataSchemaPropertiesMetadataKey");

// node_modules/@e22m4u/ts-data-schema/dist/esm/decorators/data-schema-reflector.js
var DataSchemaReflector = class {
  static {
    __name(this, "DataSchemaReflector");
  }
  /**
   * Set metadata.
   *
   * @param metadata
   * @param target
   * @param propertyKey
   */
  static setMetadata(metadata, target, propertyKey) {
    if (propertyKey == null) {
      Reflector.defineMetadata(DATA_SCHEMA_CLASS_METADATA_KEY, metadata, target);
    } else {
      const oldMap = Reflector.getOwnMetadata(DATA_SCHEMA_PROPERTIES_METADATA_KEY, target);
      const newMap = new Map(oldMap);
      newMap.set(propertyKey, metadata);
      Reflector.defineMetadata(DATA_SCHEMA_PROPERTIES_METADATA_KEY, newMap, target);
    }
  }
  /**
   * Get class metadata.
   *
   * @param target
   */
  static getClassMetadata(target) {
    return Reflector.getOwnMetadata(DATA_SCHEMA_CLASS_METADATA_KEY, target);
  }
  /**
   * Get properties metadata.
   *
   * @param target
   */
  static getPropertiesMetadata(target) {
    const metadata = Reflector.getOwnMetadata(DATA_SCHEMA_PROPERTIES_METADATA_KEY, target);
    return metadata ?? /* @__PURE__ */ new Map();
  }
};

// node_modules/@e22m4u/ts-data-schema/dist/esm/decorators/data-schema-decorators.js
var import_js_format6 = require("@e22m4u/js-format");
var DECORATOR_PROPERTY_TARGET_ERROR_MESSAGE = "@%s decorator is only supported on an instance property.";
var REDUNDANT_TYPE_OPTION_ERROR_MESSAGE = 'The option "type" is not supported in the @%s decorator.';
function dsProperty(schema) {
  return function(target, propertyKey, descriptor) {
    const decoratorType = getDecoratorTargetType(target, propertyKey, descriptor);
    if (decoratorType !== DecoratorTargetType.INSTANCE_PROPERTY)
      throw new DecoratorTargetError(DECORATOR_PROPERTY_TARGET_ERROR_MESSAGE, "dsProperty");
    DataSchemaReflector.setMetadata(schema, target.constructor, propertyKey);
  };
}
__name(dsProperty, "dsProperty");
function checkDataSchemaDoesNotHaveSpecifiedTypeOption(decoratorName, schema) {
  if (schema && typeof schema === "object" && !Array.isArray(schema) && schema.type) {
    throw new import_js_format6.Errorf(REDUNDANT_TYPE_OPTION_ERROR_MESSAGE, decoratorName);
  }
}
__name(checkDataSchemaDoesNotHaveSpecifiedTypeOption, "checkDataSchemaDoesNotHaveSpecifiedTypeOption");
function wrapDataSchemaPropertyDecoratorToReplaceErrorMessage(decoratorName, schema) {
  const dec = dsProperty(schema);
  return function(target, propertyKey, descriptor) {
    try {
      return dec(target, propertyKey, descriptor);
    } catch (error) {
      if (error instanceof DecoratorTargetError)
        throw new DecoratorTargetError(DECORATOR_PROPERTY_TARGET_ERROR_MESSAGE, decoratorName);
      throw error;
    }
  };
}
__name(wrapDataSchemaPropertyDecoratorToReplaceErrorMessage, "wrapDataSchemaPropertyDecoratorToReplaceErrorMessage");
function createDataSchemaPropertyDecoratorWithDataType(decoratorName, dataType) {
  return function(schema) {
    checkDataSchemaDoesNotHaveSpecifiedTypeOption(decoratorName, schema);
    return wrapDataSchemaPropertyDecoratorToReplaceErrorMessage(decoratorName, {
      ...schema,
      type: dataType
    });
  };
}
__name(createDataSchemaPropertyDecoratorWithDataType, "createDataSchemaPropertyDecoratorWithDataType");
var dsAny = createDataSchemaPropertyDecoratorWithDataType("dsAny", DataType6.ANY);
var dsString = createDataSchemaPropertyDecoratorWithDataType("dsString", DataType6.STRING);
var dsNumber = createDataSchemaPropertyDecoratorWithDataType("dsNumber", DataType6.NUMBER);
var dsBoolean = createDataSchemaPropertyDecoratorWithDataType("dsBoolean", DataType6.BOOLEAN);

// node_modules/@e22m4u/ts-data-schema/dist/esm/errors/validation-error.js
var import_js_format9 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-data-schema/dist/esm/errors/decorator-target-error.js
var import_js_format10 = require("@e22m4u/js-format");
var DecoratorTargetError = class extends import_js_format10.Errorf {
  static {
    __name(this, "DecoratorTargetError");
  }
};

// node_modules/@e22m4u/ts-data-schema/dist/esm/data-validator.js
var import_js_format11 = require("@e22m4u/js-format");
var import_js_format12 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/array-type-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/is-required-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/number-type-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/object-type-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/string-type-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/validators/boolean-type-validator.js
init_src();

// node_modules/@e22m4u/ts-data-schema/dist/esm/debuggable-service.js
var import_js_service41 = require("@e22m4u/js-service");

// node_modules/@e22m4u/ts-data-schema/dist/esm/data-type-caster.js
var import_js_format13 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-data-schema/dist/esm/default-values-applier.js
init_src();

// dist/esm/schemas/logout-result-schema.js
var LOGOUT_RESULT_SCHEMA = {
  type: DataType6.OBJECT,
  properties: {
    success: {
      type: DataType6.BOOLEAN
    }
  }
};

// dist/esm/schemas/jwt-issue-result-schema.js
var JWT_ISSUE_RESULT_SCHEMA = {
  type: DataType6.OBJECT,
  properties: {
    token: {
      type: DataType6.STRING
    },
    expiresAt: {
      type: DataType6.STRING
    },
    user: {
      type: DataType6.OBJECT
    }
  }
};

// dist/esm/user-data-service.js
var import_http_errors4 = __toESM(require("http-errors"), 1);
var import_js_service42 = require("@e22m4u/js-service");
var import_libphonenumber_js = require("libphonenumber-js");
var EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var UserDataService = class extends import_js_service42.Service {
  static {
    __name(this, "UserDataService");
  }
  /**
   * Validate username.
   *
   * @param value
   * @param options
   */
  validateUsername(value, options) {
    const minUsernameLength = options?.minLength || 4;
    const maxUsernameLength = options?.maxLength || 30;
    if (typeof value !== "string") {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("userDataService.validateUsername.invalidFormatError"), { username: value });
    }
    if (value.length < minUsernameLength) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("userDataService.validateUsername.minLengthError"), { username: value }, minUsernameLength);
    }
    if (value.length > maxUsernameLength) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("userDataService.validateUsername.maxLengthError"), { username: value }, maxUsernameLength);
    }
    if (!/^[a-zA-Z]/.test(value)) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("userDataService.validateUsername.startLetterError"), { username: value });
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("userDataService.validateUsername.invalidFormatError"), { username: value });
    }
  }
  /**
   * Validate email.
   *
   * @param value
   */
  validateEmail(value) {
    if (!value || typeof value !== "string" || !EMAIL_FORMAT_REGEX.test(value)) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_EMAIL_FORMAT", localizer.t("userDataService.validateEmail.invalidFormatError"), { email: value });
    }
  }
  /**
   * Validate phone.
   *
   * @param value
   * @param country
   */
  validatePhone(value, country) {
    if (!value || typeof value !== "string" || !(0, import_libphonenumber_js.isValidPhoneNumber)(value, country)) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_PHONE_FORMAT", localizer.t("userDataService.validatePhone.invalidFormatError"), { phone: value });
    }
  }
  /**
   * Validate password.
   *
   * @param value
   * @param options
   */
  validatePassword(value, options) {
    const minPasswordLength = options?.minLength || 8;
    const maxPasswordLength = options?.maxLength || 80;
    if (typeof value !== "string") {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("userDataService.validatePassword.invalidFormatError"), { password: value });
    }
    if (value.length < minPasswordLength) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("userDataService.validatePassword.minLengthError"), { password: value }, minPasswordLength);
    }
    if (value.length > maxPasswordLength) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("userDataService.validatePassword.maxLengthError"), { password: value }, maxPasswordLength);
    }
    if (!new RegExp("\\p{L}", "u").test(value) || !new RegExp("\\p{N}", "u").test(value)) {
      const localizer = this.getService(AuthLocalizer);
      throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("userDataService.validatePassword.invalidFormatError"), { password: value });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessGuard,
  AccessRule,
  AccessTokenModel,
  AuthLocalizer,
  AuthService,
  AuthServiceOptions,
  AuthSession,
  BaseAccessTokenModel,
  BaseRoleModel,
  BaseUserModel,
  EMAIL_FORMAT_REGEX,
  JWT_ISSUE_RESULT_SCHEMA,
  LOGOUT_RESULT_SCHEMA,
  RoleModel,
  UserDataService,
  UserModel
});
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)
*/

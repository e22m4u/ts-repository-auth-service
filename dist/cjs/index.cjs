"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
          for (var _a7 = 0, parentKeys_1 = parentKeys; _a7 < parentKeys_1.length; _a7++) {
            var key = parentKeys_1[_a7];
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
  ACCESS_TOKEN_MODEL_DEF: () => ACCESS_TOKEN_MODEL_DEF,
  AccessRule: () => AccessRule,
  AccessTokenModel: () => AccessTokenModel,
  AuthLocalizer: () => AuthLocalizer,
  AuthService: () => AuthService,
  AuthServiceOptions: () => AuthServiceOptions,
  AuthSession: () => AuthSession,
  BaseAccessTokenModel: () => BaseAccessTokenModel,
  BaseRoleModel: () => BaseRoleModel,
  BaseUserModel: () => BaseUserModel,
  CASE_INSENSITIVE_LOGIN_IDS: () => CASE_INSENSITIVE_LOGIN_IDS,
  JWT_ISSUE_RESULT_SCHEMA: () => JWT_ISSUE_RESULT_SCHEMA,
  LOGIN_ID_NAMES: () => LOGIN_ID_NAMES,
  ROLE_MODEL_DEF: () => ROLE_MODEL_DEF,
  RoleGuard: () => RoleGuard,
  RoleModel: () => RoleModel,
  USER_LOOKUP_SCHEMA: () => USER_LOOKUP_SCHEMA,
  USER_LOOKUP_WITH_PASSWORD_SCHEMA: () => USER_LOOKUP_WITH_PASSWORD_SCHEMA,
  USER_MODE_DEF: () => USER_MODE_DEF,
  UserModel: () => UserModel
});
module.exports = __toCommonJS(index_exports);

// dist/esm/role-guard.js
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
    } catch (e) {
      console.error(`Failed to decode cookie value: "${value}"`, e);
    }
    acc[key] = value;
    return acc;
  }, {});
}
__name(parseCookieHeader, "parseCookieHeader");

// dist/esm/auth-session.js
var import_http_errors = __toESM(require("http-errors"), 1);

// dist/esm/auth-localizer.js
var import_js_localizer = require("@e22m4u/js-localizer");

// dist/esm/locales/en.json
var en_default = {
  "validators.dataFormatValidator.invalidUsernameFormatError": "Username can only contain Latin letters (a-z) and numbers (0-9)",
  "validators.dataFormatValidator.minUsernameLengthError": "Username must be at least %d characters long",
  "validators.dataFormatValidator.maxUsernameLengthError": "Username must not exceed %d characters",
  "validators.dataFormatValidator.usernameStartLetterError": "Username must start with a Latin letter",
  "validators.dataFormatValidator.invalidEmailFormatError": "Invalid email address format",
  "validators.dataFormatValidator.invalidPhoneFormatError": "Invalid phone number format",
  "validators.dataFormatValidator.invalidPasswordFormatError": "Password must contain at least one letter and one number",
  "validators.dataFormatValidator.minPasswordLengthError": "Password must be at least %d characters long",
  "validators.dataFormatValidator.maxPasswordLengthError": "Password must not exceed %d characters",
  "authService.validateLoginId.duplicateUsernameError": "Username is already taken",
  "authService.validateLoginId.duplicateEmailError": "Email address is already in use",
  "authService.validateLoginId.duplicatePhoneError": "Phone number is already in use",
  "authService.requireAnyLoginId.identifierRequiredError": "A username, email address or phone number is required",
  "authService.requireAnyLoginId.usernameRequiredError": "Please enter username",
  "authService.requireAnyLoginId.emailRequiredError": "Please enter email",
  "authService.requireAnyLoginId.phoneRequiredError": "Please enter phone",
  "authService.updateUser.userNotFoundError": "User not found",
  "authService.findUserByLoginIds.loginFailedError": "Invalid login or password",
  "authService.verifyPassword.invalidPasswordError": "Invalid login or password",
  "roleGuard.requireRole.authenticationRequired": "Authentication is required",
  "roleGuard.requireRole.roleNotAllowed": "You do not have permissions to perform this action",
  "authSession.getUser.authenticationRequired": "Authentication is required",
  "authSession.getAccessTokenId.authenticationRequired": "Authentication is required"
};

// dist/esm/locales/ru.json
var ru_default = {
  "validators.dataFormatValidator.invalidUsernameFormatError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u0438\u0435 \u0431\u0443\u043A\u0432\u044B (a-z) \u0438 \u0446\u0438\u0444\u0440\u044B (0-9)",
  "validators.dataFormatValidator.minUsernameLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.maxUsernameLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.usernameStartLetterError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u043E\u0439 \u0431\u0443\u043A\u0432\u044B",
  "validators.dataFormatValidator.invalidEmailFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0430\u0434\u0440\u0435\u0441\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "validators.dataFormatValidator.invalidPhoneFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043D\u043E\u043C\u0435\u0440\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "validators.dataFormatValidator.invalidPasswordFormatError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u043E\u0434\u043D\u0443 \u0431\u0443\u043A\u0432\u0443 \u0438 \u043E\u0434\u043D\u0443 \u0446\u0438\u0444\u0440\u0443",
  "validators.dataFormatValidator.minPasswordLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.maxPasswordLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "authService.validateLoginId.duplicateUsernameError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E",
  "authService.validateLoginId.duplicateEmailError": "\u0410\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authService.validateLoginId.duplicatePhoneError": "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authService.requireAnyLoginId.identifierRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authService.requireAnyLoginId.usernameRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
  "authService.requireAnyLoginId.emailRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "authService.requireAnyLoginId.phoneRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authService.updateUser.userNotFoundError": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D",
  "authService.findUserByLoginIds.loginFailedError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "authService.verifyPassword.invalidPasswordError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "roleGuard.requireRole.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "roleGuard.requireRole.roleNotAllowed": "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  "authSession.getUser.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "authSession.getAccessTokenId.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
};

// dist/esm/auth-localizer.js
var _AuthLocalizer = class _AuthLocalizer extends import_js_localizer.Localizer {
  constructor(container, options) {
    super(container, {
      dictionaries: { en: en_default, ru: ru_default },
      ...options
    });
  }
};
__name(_AuthLocalizer, "AuthLocalizer");
var AuthLocalizer = _AuthLocalizer;

// dist/esm/auth-session.js
var import_js_service = require("@e22m4u/js-service");
var _AuthSession = class _AuthSession extends import_js_service.DebuggableService {
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
__name(_AuthSession, "AuthSession");
var AuthSession = _AuthSession;

// dist/esm/role-guard.js
var import_js_service2 = require("@e22m4u/js-service");
var AccessRule = {
  AUTHENTICATED: "$authenticated"
};
var _RoleGuard = class _RoleGuard extends import_js_service2.DebuggableService {
  /**
   * Require role.
   */
  requireRole(roleName) {
    const debug = this.getDebuggerFor(this.requireRole);
    const session = this.getRegisteredService(AuthSession);
    const method = session.getRequestMethod();
    const pathname = session.getRequestPathname();
    debug("Role checking for %s %v.", method, pathname);
    const localizer = this.getRegisteredService(AuthLocalizer);
    if (!session.isLoggedIn)
      throw createError(import_http_errors2.default.Unauthorized, "AUTHORIZATION_REQUIRED", localizer.t("roleGuard.requireRole.authenticationRequired"));
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
      throw createError(import_http_errors2.default.Forbidden, "ROLE_NOT_ALLOWED", localizer.t("roleGuard.roleNotAllowed"));
    debug("Access allowed.");
  }
};
__name(_RoleGuard, "RoleGuard");
var RoleGuard = _RoleGuard;

// dist/esm/auth-service.js
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_uuid = require("uuid");
var import_http_errors7 = __toESM(require("http-errors"), 1);

// dist/esm/debuggable-service.js
var import_js_service3 = require("@e22m4u/js-service");
var MODULE_DEBUGGER_NAMESPACE = "jsRepositoryAuthService";
var _DebuggableService = class _DebuggableService extends import_js_service3.DebuggableService {
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
__name(_DebuggableService, "DebuggableService");
var DebuggableService3 = _DebuggableService;

// dist/esm/auth-service.js
var import_js_repository = require("@e22m4u/js-repository");

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
var _a;
var BaseRoleModel = (_a = class {
  id;
  name;
  createdAt;
}, __name(_a, "BaseRoleModel"), _a);
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
var _a2;
var RoleModel = (_a2 = class extends BaseRoleModel {
}, __name(_a2, "RoleModel"), _a2);
RoleModel = __decorate([
  (0, import_ts_repository.model)()
], RoleModel);
var ROLE_MODEL_DEF = (0, import_ts_repository.getModelDefinitionFromClass)(RoleModel);

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
var _a3;
var BaseUserModel = (_a3 = class {
  id;
  username;
  email;
  phone;
  password;
  createdAt;
  updatedAt;
  roleIds;
  roles;
}, __name(_a3, "BaseUserModel"), _a3);
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
    unique: import_ts_repository2.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "username", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.STRING,
    unique: import_ts_repository2.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "email", void 0);
__decorate2([
  (0, import_ts_repository2.property)({
    type: import_ts_repository2.DataType.STRING,
    unique: import_ts_repository2.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "phone", void 0);
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
var _a4;
var UserModel = (_a4 = class extends BaseUserModel {
}, __name(_a4, "UserModel"), _a4);
UserModel = __decorate2([
  (0, import_ts_repository2.model)()
], UserModel);
var USER_MODE_DEF = (0, import_ts_repository2.getModelDefinitionFromClass)(UserModel);

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
var _a5;
var BaseAccessTokenModel = (_a5 = class {
  id;
  userAgent;
  createdAt;
  ownerId;
  owner;
}, __name(_a5, "BaseAccessTokenModel"), _a5);
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
    default: ""
  }),
  __metadata3("design:type", String)
], BaseAccessTokenModel.prototype, "userAgent", void 0);
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
var _a6;
var AccessTokenModel = (_a6 = class extends BaseAccessTokenModel {
}, __name(_a6, "AccessTokenModel"), _a6);
AccessTokenModel = __decorate3([
  (0, import_ts_repository3.model)()
], AccessTokenModel);
var ACCESS_TOKEN_MODEL_DEF = (0, import_ts_repository3.getModelDefinitionFromClass)(AccessTokenModel);

// dist/esm/validators/email-format-validator.js
var import_http_errors3 = __toESM(require("http-errors"), 1);
var EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !EMAIL_FORMAT_REGEX.test(value))
    throw createError(import_http_errors3.default.BadRequest, "INVALID_EMAIL_FORMAT", localizer.t("validators.dataFormatValidator.invalidEmailFormatError"), { email: value });
}, "emailFormatValidator");

// dist/esm/validators/phone-format-validator.js
var import_http_errors4 = __toESM(require("http-errors"), 1);
var PHONE_FORMAT_REGEX = /^[+]?[0-9]{0,3}\W*[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
var phoneFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !PHONE_FORMAT_REGEX.test(value))
    throw createError(import_http_errors4.default.BadRequest, "INVALID_PHONE_FORMAT", localizer.t("validators.dataFormatValidator.invalidPhoneFormatError"), { phone: value });
}, "phoneFormatValidator");

// dist/esm/validators/username-format-validator.js
var import_http_errors5 = __toESM(require("http-errors"), 1);
var MIN_USERNAME_LENGTH = 4;
var MAX_USERNAME_LENGTH = 30;
var usernameFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors5.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
  if (value.length < MIN_USERNAME_LENGTH)
    throw createError(import_http_errors5.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.minUsernameLengthError"), { username: value }, MIN_USERNAME_LENGTH);
  if (value.length > MAX_USERNAME_LENGTH)
    throw createError(import_http_errors5.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.maxUsernameLengthError"), { username: value }, MAX_USERNAME_LENGTH);
  if (!/^[a-zA-Z]/.test(value))
    throw createError(import_http_errors5.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.usernameStartLetterError"), { username: value });
  if (!/^[a-zA-Z0-9]+$/.test(value))
    throw createError(import_http_errors5.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
}, "usernameFormatValidator");

// dist/esm/validators/password-format-validator.js
var import_http_errors6 = __toESM(require("http-errors"), 1);
var MIN_PASSWORD_LENGTH = 8;
var MAX_PASSWORD_LENGTH = 80;
var passwordFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors6.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
  if (value.length < MIN_PASSWORD_LENGTH)
    throw createError(import_http_errors6.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.minPasswordLengthError"), { password: value }, MIN_PASSWORD_LENGTH);
  if (value.length > MAX_PASSWORD_LENGTH)
    throw createError(import_http_errors6.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.maxPasswordLengthError"), { password: value }, MAX_PASSWORD_LENGTH);
  if (!new RegExp("\\p{L}", "u").test(value) || !new RegExp("\\p{N}", "u").test(value))
    throw createError(import_http_errors6.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
}, "passwordFormatValidator");

// dist/esm/auth-service.js
var { JsonWebTokenError, TokenExpiredError } = import_jsonwebtoken.default;
var LOGIN_ID_NAMES = ["username", "email", "phone"];
var CASE_INSENSITIVE_LOGIN_IDS = [
  "username",
  "email",
  "phone"
];
var _AuthServiceOptions = class _AuthServiceOptions {
  passwordHashRounds = 12;
  usernameFormatValidator = usernameFormatValidator;
  emailFormatValidator = emailFormatValidator;
  phoneFormatValidator = phoneFormatValidator;
  passwordFormatValidator = passwordFormatValidator;
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
__name(_AuthServiceOptions, "AuthServiceOptions");
var AuthServiceOptions = _AuthServiceOptions;
var _AuthService = class _AuthService extends DebuggableService3 {
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
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
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
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
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
          return rej(createError(import_http_errors7.default.InternalServerError, "TOKEN_ENCODING_FAILED", "Unable to encode JSON web token", payload));
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
      if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
        throw createError(
          import_http_errors7.default.Unauthorized,
          "TOKEN_VERIFYING_FAILED",
          err.message,
          // Можно использовать сообщение из ошибки
          { token: jwToken }
        );
      }
      error = err;
    }
    if (error || !payload || typeof payload !== "object" || !("uid" in payload) || !("tid" in payload) || !payload.uid || !payload.tid) {
      console.error(error);
      throw createError(import_http_errors7.default.InternalServerError, "TOKEN_VERIFYING_FAILED", "Unable to verify JSON web token", { token: jwToken, payload });
    }
    debug.inspect("Payload:", payload);
    debug("Token decoded successfully.");
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
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const accessToken = await rep.findOne({ where: { id: tokenId }, include });
    if (!accessToken)
      throw createError(import_http_errors7.default.InternalServerError, "ACCESS_TOKEN_NOT_FOUND", "Access token is not found in the database", { tokenId });
    debug("Owner id was %v.", accessToken.ownerId);
    if (!accessToken.ownerId)
      throw createError(import_http_errors7.default.Unauthorized, "ACCESS_TOKEN_OWNER_NOT_FOUND", "Access token has no owner", { tokenId });
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
      console.error(error);
      throw createError(import_http_errors7.default.InternalServerError, "PASSWORD_HASHING_ERROR", "Unable to hash the given password");
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
    let isValid = false;
    try {
      isValid = await import_bcrypt.default.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors7.default.InternalServerError, "PASSWORD_VERIFYING_ERROR", "Unable to verify the given password");
    }
    if (!isValid) {
      if (silent)
        return false;
      throw createError(import_http_errors7.default.BadRequest, "PASSWORD_VERIFYING_ERROR", localizer.t(`${errorKeyPrefix}.invalidPasswordError`));
    }
    debug("Password verified.");
    return true;
  }
  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds(inputData, include, silent = false) {
    const debug = this.getDebuggerFor(this.findUserByLoginIds);
    debug("Finding user by login identifiers.");
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = "authService.findUserByLoginIds";
    const where = {};
    let hasAnyLoginId = false;
    LOGIN_ID_NAMES.forEach((name) => {
      if (inputData[name] && String(inputData[name]).trim()) {
        debug("Given %s was %v.", name, inputData[name]);
        hasAnyLoginId = true;
        const idValue = String(inputData[name]).trim();
        const idRegex = `^${idValue}$`;
        const isCaseInsensitive = CASE_INSENSITIVE_LOGIN_IDS.includes(name);
        where[name] = isCaseInsensitive ? { regexp: idRegex, flags: "i" } : idValue;
      }
    });
    if (!hasAnyLoginId) {
      if (silent)
        return;
      this.requireAnyLoginId(inputData);
    }
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const user = await userRep.findOne({ where, include });
    if (!user) {
      debug("User not found.");
      if (silent)
        return;
      throw createError(import_http_errors7.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.loginFailedError`));
    }
    debug("User found with id %v.", user.id);
    return user;
  }
  /**
   * Validate login id.
   *
   * @param idName
   * @param idValue
   * @param ownerId
   */
  async validateLoginId(idName, idValue, ownerId) {
    const debug = this.getDebuggerFor(this.validateLoginId);
    debug("Validating login identifier in the user data input.");
    const localizer = this.getService(AuthLocalizer);
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix = "authService.validateLoginId";
    debug("Given id name was %v.", idName);
    debug("Given id value was %v.", idValue);
    if (idValue) {
      const validator = this.options[`${idName}FormatValidator`];
      validator(idValue, localizer);
      debug("Value format validated.");
      debug("Checking identifier duplicates.");
      const duplicate = await this.findUserByLoginIds({ [idName]: idValue }, void 0, true);
      if (duplicate && duplicate.id !== ownerId) {
        const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
        throw createError(import_http_errors7.default.BadRequest, "DUPLICATE_LOGIN_IDENTIFIER", localizer.t(errorKey));
      }
      debug("No duplicates found.");
    }
    debug("Identifier validated.");
  }
  /**
   * Require any login id.
   *
   * @param inputData
   * @param partial
   */
  requireAnyLoginId(data, partial = false) {
    const debug = this.getDebuggerFor(this.requireAnyLoginId);
    debug("Require any login identifier.");
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = "authService.requireAnyLoginId";
    if (partial) {
      debug("Partial mode was enabled.");
    }
    const loginIds = partial ? LOGIN_ID_NAMES.filter((idName) => idName in data) : LOGIN_ID_NAMES;
    if (partial && !loginIds.length) {
      debug("No login identifier was given.");
      return;
    }
    debug("Looking for any value in %l.", loginIds);
    if (loginIds.every((idName) => !data[idName])) {
      debug("No login identifier was given.");
      const idFields = LOGIN_ID_NAMES.filter((id) => id in data);
      const singleIdField = idFields.length === 1 ? idFields[0] : void 0;
      if (singleIdField && data[singleIdField] === "")
        throw createError(import_http_errors7.default.BadRequest, singleIdField.toUpperCase() + "_REQUIRED", localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`));
      throw createError(import_http_errors7.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.identifierRequiredError`));
    }
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
    const localizer = this.getService(AuthLocalizer);
    inputData = { ...inputData };
    LOGIN_ID_NAMES.forEach((idName) => {
      if (typeof inputData[idName] === "string")
        inputData[idName] = inputData[idName].trim();
    });
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName]);
    }
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || "");
      debug("Password hashed.");
    }
    inputData.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
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
    inputData = { ...inputData };
    const localizer = this.getService(AuthLocalizer);
    const errorKeyPrefix = "authService.updateUser";
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const existingUser = await userRep.findOne({ where: { id: userId } });
    if (!existingUser)
      throw createError(import_http_errors7.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.userNotFoundError`));
    LOGIN_ID_NAMES.forEach((idName) => {
      if (typeof inputData[idName] === "string")
        inputData[idName] = inputData[idName].trim();
    });
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName], existingUser.id);
    }
    LOGIN_ID_NAMES.forEach((idName) => {
      if (inputData[idName] == null)
        delete inputData[idName];
    });
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
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
      debug("JWT not found.");
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (accessToken.ownerId !== payload.uid)
      throw createError(import_http_errors7.default.BadRequest, "INVALID_ACCESS_TOKEN_OWNER", "Your access token not match its owner", payload);
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
    if (!accessToken.ownerId)
      throw createError(import_http_errors7.default.BadRequest, "NO_ACCESS_TOKEN_OWNER", "Your access token does not have an owner", accessToken);
    const dbs = this.getRegisteredService(import_js_repository.DatabaseSchema);
    const rep = dbs.getRepository(UserModel.name);
    const owner = await rep.findOne({
      where: { id: accessToken.ownerId },
      include
    });
    if (!owner)
      throw createError(import_http_errors7.default.BadRequest, "NO_ACCESS_TOKEN_OWNER", "Your access token does not have an owner", accessToken);
    debug("Owner found with id %v.", owner.id);
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
__name(_AuthService, "AuthService");
var AuthService = _AuthService;

// node_modules/@e22m4u/js-data-schema/dist/esm/data-schema.js
var DataType4 = {
  ANY: "any",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  ARRAY: "array",
  OBJECT: "object"
};

// node_modules/@e22m4u/js-data-schema/dist/esm/errors/type-cast-error.js
var import_js_format4 = require("@e22m4u/js-format");

// node_modules/@e22m4u/js-data-schema/dist/esm/utils/get-data-schema-from-class.js
var import_js_format3 = require("@e22m4u/js-format");

// node_modules/@e22m4u/ts-reflector/dist/esm/reflector.js
var import_reflect_metadata = __toESM(require_Reflect(), 1);
var _Reflector = class _Reflector {
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
__name(_Reflector, "Reflector");
var Reflector = _Reflector;

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
var _MetadataKey = class _MetadataKey {
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
__name(_MetadataKey, "MetadataKey");
var MetadataKey = _MetadataKey;

// node_modules/@e22m4u/js-data-schema/dist/esm/decorators/data-schema-metadata.js
var DATA_SCHEMA_CLASS_METADATA_KEY = new MetadataKey("dataSchemaClassMetadataKey");
var DATA_SCHEMA_PROPERTIES_METADATA_KEY = new MetadataKey("dataSchemaPropertiesMetadataKey");

// node_modules/@e22m4u/js-data-schema/dist/esm/decorators/data-schema-reflector.js
var _DataSchemaReflector = class _DataSchemaReflector {
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
    return metadata != null ? metadata : /* @__PURE__ */ new Map();
  }
};
__name(_DataSchemaReflector, "DataSchemaReflector");
var DataSchemaReflector = _DataSchemaReflector;

// node_modules/@e22m4u/js-data-schema/dist/esm/decorators/data-schema-decorators.js
var import_js_format2 = require("@e22m4u/js-format");
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
    throw new import_js_format2.Errorf(REDUNDANT_TYPE_OPTION_ERROR_MESSAGE, decoratorName);
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
var dsAny = createDataSchemaPropertyDecoratorWithDataType("dsAny", DataType4.ANY);
var dsString = createDataSchemaPropertyDecoratorWithDataType("dsString", DataType4.STRING);
var dsNumber = createDataSchemaPropertyDecoratorWithDataType("dsNumber", DataType4.NUMBER);
var dsBoolean = createDataSchemaPropertyDecoratorWithDataType("dsBoolean", DataType4.BOOLEAN);

// node_modules/@e22m4u/js-data-schema/dist/esm/errors/validation-error.js
var import_js_format5 = require("@e22m4u/js-format");

// node_modules/@e22m4u/js-data-schema/dist/esm/errors/decorator-target-error.js
var import_js_format6 = require("@e22m4u/js-format");
var _DecoratorTargetError = class _DecoratorTargetError extends import_js_format6.Errorf {
};
__name(_DecoratorTargetError, "DecoratorTargetError");
var DecoratorTargetError = _DecoratorTargetError;

// node_modules/@e22m4u/js-data-schema/dist/esm/data-validator.js
var import_js_format8 = require("@e22m4u/js-format");
var import_js_format9 = require("@e22m4u/js-format");

// node_modules/@e22m4u/js-empty-values/src/empty-values-service.js
var import_js_format7 = require("@e22m4u/js-format");
var import_js_service4 = require("@e22m4u/js-service");

// node_modules/@e22m4u/js-data-schema/dist/esm/debuggable-service.js
var import_js_service5 = require("@e22m4u/js-service");

// node_modules/@e22m4u/js-data-schema/dist/esm/data-type-caster.js
var import_js_format10 = require("@e22m4u/js-format");

// dist/esm/schemas/user-lookup-schema.js
var USER_LOOKUP_SCHEMA = {
  type: DataType4.OBJECT,
  properties: {
    username: {
      type: DataType4.STRING
    },
    email: {
      type: DataType4.STRING
    },
    phone: {
      type: DataType4.STRING
    }
  },
  required: true
};

// dist/esm/schemas/jwt-issue-result-schema.js
var JWT_ISSUE_RESULT_SCHEMA = {
  type: DataType4.OBJECT,
  properties: {
    token: {
      type: DataType4.STRING
    },
    expiresAt: {
      type: DataType4.STRING
    }
  }
};

// dist/esm/schemas/user-lookup-with-password-schema.js
var USER_LOOKUP_WITH_PASSWORD_SCHEMA = {
  type: DataType4.OBJECT,
  properties: {
    username: {
      type: DataType4.STRING
    },
    email: {
      type: DataType4.STRING
    },
    phone: {
      type: DataType4.STRING
    },
    password: {
      type: DataType4.STRING
    }
  },
  required: true
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACCESS_TOKEN_MODEL_DEF,
  AccessRule,
  AccessTokenModel,
  AuthLocalizer,
  AuthService,
  AuthServiceOptions,
  AuthSession,
  BaseAccessTokenModel,
  BaseRoleModel,
  BaseUserModel,
  CASE_INSENSITIVE_LOGIN_IDS,
  JWT_ISSUE_RESULT_SCHEMA,
  LOGIN_ID_NAMES,
  ROLE_MODEL_DEF,
  RoleGuard,
  RoleModel,
  USER_LOOKUP_SCHEMA,
  USER_LOOKUP_WITH_PASSWORD_SCHEMA,
  USER_MODE_DEF,
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

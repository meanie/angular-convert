/**
 * @meanie/angular-convert * https://github.com/meanie/angular-convert
 *
 * Copyright (c) 2017 Adam Reis <adam@reis.nz>
 * License: MIT
 */
(function (window, angular, undefined) {
  'use strict';

  /**
   * Module definition and dependencies
   */

  angular.module('Convert.Service', ['Convert.StringConverter.Service', 'Convert.ObjectConverter.Service', 'Convert.QueryStringConverter.Service'])

  /**
   * Factory definition
   */
  .factory('$convert', ['$stringConverter', '$objectConverter', '$queryStringConverter', function ($stringConverter, $objectConverter, $queryStringConverter) {
    return {
      string: $stringConverter,
      object: $objectConverter,
      queryString: $queryStringConverter
    };
  }]);
})(window, window.angular);
(function (window, angular, undefined) {
  'use strict';

  /**
   * Module definition and dependencies
   */

  angular.module('Convert.ObjectConverter.Service', ['Convert.StringConverter.Service'])

  /**
   * Factory definition
   */
  .factory('$objectConverter', ['$stringConverter', function ($stringConverter) {

    /**
     * Helper to convert object keys using a specified string converter
     */
    function convertObjectKeys(obj, converter) {

      //Must have object
      if (!angular.isObject(obj)) {
        throw new TypeError('Not an object');
      }

      //Validate case
      if (typeof $stringConverter[converter] === 'undefined') {
        throw new Error('Invalid converter: ' + converter);
      }

      //Initialize object
      var newObj = {};

      //Loop keys
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var newKey = $stringConverter[converter](key);
          newObj[newKey] = angular.copy(obj[key]);
        }
      }

      //Return object
      return newObj;
    }

    /**
     * Object converter
     */
    return {

      /**
       * Convert object keys to snake case
       */
      keysToSnakeCase: function keysToSnakeCase(obj) {
        return convertObjectKeys(obj, 'toSnakeCase');
      },


      /**
       * Convert object keys to snake case
       */
      keysToCamelCase: function keysToCamelCase(obj) {
        return convertObjectKeys(obj, 'toCamelCase');
      }
    };
  }]);
})(window, window.angular);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window, angular, undefined) {
  'use strict';
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

  /**
   * Specifications
   */

  describe('ObjectConverter', function () {

    //Load module and service
    beforeEach(module('Convert.ObjectConverter.Service'));

    //Inject storage
    var Convert = void 0;
    beforeEach(inject(function (_$objectConverter_) {
      Convert = _$objectConverter_;
    }));

    /**
     * Camel case conversion
     */
    describe('keysToCamelCase', function () {
      it('should return an object when passed an object', function () {
        var src = {};
        var res = Convert.keysToCamelCase(src);
        expect(typeof res === 'undefined' ? 'undefined' : _typeof(res)).toBe('object');
        expect(res).not.toBeNull();
      });
      it('should return an object with the same properties', function () {
        var src = { a: 1, b: 2, c: 3 };
        var res = Convert.keysToCamelCase(src);
        expect(res.a).toBeDefined();
        expect(res.b).toBeDefined();
        expect(res.c).toBeDefined();
      });
      it('should return an object with the same property values', function () {
        var src = { a: 1, b: 2, c: 3 };
        var res = Convert.keysToCamelCase(src);
        expect(res.a).toBe(src.a);
        expect(res.b).toBe(src.b);
        expect(res.c).toBe(src.c);
      });
      it('should not camel case simple keys', function () {
        var src = { simple: 1 };
        var res = Convert.keysToCamelCase(src);
        expect(res.simple).toBeDefined();
      });
      it('should camel case snake cased keys', function () {
        var src = { snake_cased: 1, more_snake_cased: 2 };
        var res = Convert.keysToCamelCase(src);
        expect(res.snakeCased).toBeDefined();
        expect(res.moreSnakeCased).toBeDefined();
      });
      it('should not preserve the original keys', function () {
        var src = { snake_cased: 1, more_snake_cased: 2 };
        var res = Convert.keysToCamelCase(src);
        expect(res.snake_cased).not.toBeDefined();
        expect(res.more_snake_cased).not.toBeDefined();
      });
      it('should throw a type error on invalid input', function () {
        expect(Convert.keysToCamelCase).toThrowError(TypeError);
        expect(function () {
          Convert.keysToCamelCase(null);
        }).toThrowError(TypeError);
        expect(function () {
          Convert.keysToCamelCase(1);
        }).toThrowError(TypeError);
        expect(function () {
          Convert.keysToCamelCase('a');
        }).toThrowError(TypeError);
      });
    });

    /**
     * Snake case conversion
     */
    describe('keysToSnakeCase', function () {
      it('should return an object when passed an object', function () {
        var src = {};
        var res = Convert.keysToSnakeCase(src);
        expect(typeof res === 'undefined' ? 'undefined' : _typeof(res)).toBe('object');
        expect(res).not.toBeNull();
      });
      it('should return an object with the same properties', function () {
        var src = { a: 1, b: 2, c: 3 };
        var res = Convert.keysToSnakeCase(src);
        expect(res.a).toBeDefined();
        expect(res.b).toBeDefined();
        expect(res.c).toBeDefined();
      });
      it('should return an object with the same property values', function () {
        var src = { a: 1, b: 2, c: 3 };
        var res = Convert.keysToSnakeCase(src);
        expect(res.a).toBe(src.a);
        expect(res.b).toBe(src.b);
        expect(res.c).toBe(src.c);
      });
      it('should not snake case simple keys', function () {
        var src = { simple: 1 };
        var res = Convert.keysToSnakeCase(src);
        expect(res.simple).toBeDefined();
      });
      it('should snake case camel cased keys', function () {
        var src = { camelCased: 1, moreCamelCased: 2 };
        var res = Convert.keysToSnakeCase(src);
        expect(res.camel_cased).toBeDefined();
        expect(res.more_camel_cased).toBeDefined();
      });
      it('should not preserve the original keys', function () {
        var src = { camelCased: 1, moreCamelCased: 2 };
        var res = Convert.keysToSnakeCase(src);
        expect(res.camelCased).not.toBeDefined();
        expect(res.moreCamelCased).not.toBeDefined();
      });
      it('should throw a type error on invalid input', function () {
        expect(Convert.keysToSnakeCase).toThrowError(TypeError);
        expect(function () {
          Convert.keysToSnakeCase(null);
        }).toThrowError(TypeError);
        expect(function () {
          Convert.keysToSnakeCase(1);
        }).toThrowError(TypeError);
        expect(function () {
          Convert.keysToSnakeCase('a');
        }).toThrowError(TypeError);
      });
    });
  });
})(window, window.angular);
(function (window, angular, undefined) {
  'use strict';

  /**
   * Module definition and dependencies
   */

  angular.module('Convert.QueryStringConverter.Service', ['Convert.StringConverter.Service'])

  /**
   * Factory definition
   */
  .factory('$queryStringConverter', ['$stringConverter', function ($stringConverter) {

    /**
     * Tries to decode an URI component without throwing an exception
     */
    function tryDecodeURIComponent(str) {
      try {
        return decodeURIComponent(str);
      } catch (e) {
        //Fall through
      }
    }

    /**
     * Tries to encode an URI component without throwing an exception
     */
    function tryEncodeURIComponent(str, pctEncodeSpaces) {
      try {
        return encodeURIComponent(str).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
      } catch (e) {
        //Fall through
      }
    }

    /**
     * Converts a string to a specific case
     */
    function convertToCase(str, convertCase) {
      switch (convertCase) {
        case 'snake':
          return $stringConverter.toSnakeCase(str);
        case 'camel':
          return $stringConverter.toCamelCase(str);
      }
      return str;
    }

    /**
     * Query string converter
     */
    return {

      /**
       * Parses an escaped url query string into key-value pairs
       */
      toObject: function toObject(s, convertCase) {
        var obj = {};
        var kv = void 0,
            key = void 0,
            val = void 0;
        angular.forEach((s || '').split('&'), function (s) {
          if (!s) {
            return;
          }

          //Split key/value and decode key
          kv = s.replace(/\+/g, '%20').split('=');
          key = tryDecodeURIComponent(kv[0]);

          //If not defined, exit
          if (!angular.isDefined(key)) {
            return;
          }

          //Convert case and get value
          key = convertToCase(key, convertCase);
          val = angular.isDefined(kv[1]) ? tryDecodeURIComponent(kv[1]) : true;

          //Set property
          if (!hasOwnProperty.call(obj, key)) {
            obj[key] = val;
          } else if (angular.isArray(obj[key])) {
            obj[key].push(val);
          } else {
            obj[key] = [obj[key], val];
          }
        });
        return obj;
      },


      /**
       * Convert key-value pairs object to a parametrized query string
       */
      fromObject: function fromObject(obj, convertCase) {

        //No obj?
        if (!obj || !angular.isObject(obj)) {
          return '';
        }

        //Initialize parts array
        var parts = [];

        //Loop the parameters
        angular.forEach(obj, function (value, key) {

          //Skip null/undefined values
          if (value === null || angular.isUndefined(value)) {
            return;
          }

          //Convert to array
          if (!angular.isArray(value)) {
            value = [value];
          }

          //Loop values
          angular.forEach(value, function (v) {

            //Handle objects
            if (angular.isObject(v)) {
              if (angular.isDate(v)) {
                v = v.toISOString();
              } else {
                v = angular.toJson(v);
              }
            }

            //Convert case?
            switch (convertCase) {
              case 'snake':
                key = $stringConverter.toSnakeCase(key);
                break;
              case 'camel':
                key = $stringConverter.toCamelCase(key);
                break;
            }

            //Push to parts
            parts.push(tryEncodeURIComponent(key) + '=' + tryEncodeURIComponent(v));
          });
        });

        //Any parts?
        if (parts.length > 0) {
          return parts.join('&');
        }

        //No parts
        return '';
      }
    };
  }]);
})(window, window.angular);
(function (window, angular, undefined) {
  'use strict';

  /**
   * Module definition and dependencies
   */

  angular.module('Convert.StringConverter.Service', [])

  /**
   * Factory definition
   */
  .factory('$stringConverter', ['$window', function ($window) {
    return {

      /**
       * Convert string to snake case
       */
      toSnakeCase: function toSnakeCase(str) {
        if (typeof str === 'number') {
          return String(str);
        } else if (typeof str !== 'string') {
          return '';
        }
        if ((str = String(str).trim()) === '') {
          return '';
        }
        return str.replace(/(\s*\-*\b\w|[A-Z])/g, function ($1) {
          $1 = $1.trim().toLowerCase().replace('-', '');
          return ($1[0] === '_' ? '' : '_') + $1;
        }).slice(1);
      },


      /**
       * Convert string to camel case
       */
      toCamelCase: function toCamelCase(str, ucfirst) {
        if (typeof str === 'number') {
          return String(str);
        } else if (typeof str !== 'string') {
          return '';
        }
        if ((str = String(str).trim()) === '') {
          return '';
        }
        return str.replace(/_+|\-+/g, ' ').replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
          if (Number(match) === 0) {
            return '';
          }
          return index === 0 && !ucfirst ? match.toLowerCase() : match.toUpperCase();
        });
      },


      /**
       * Dasherize a string
       */
      toDasherized: function toDasherized(str) {
        if (typeof str === 'number') {
          return String(str);
        } else if (typeof str !== 'string') {
          return '';
        }
        if ((str = String(str).trim()) === '') {
          return '';
        }
        str = str.replace(/\s\(/, '-(');
        return str.replace(/(\s*\-*\b\w|[A-Z]|_[a-z])/g, function ($1) {
          $1 = $1.replace('_', '-').trim().toLowerCase();
          return ($1[0] === '-' ? '' : '-') + $1;
        }).slice(1).replace(/\(-/, '(');
      },


      /**
       * Make the first letter of a string uppercase
       */
      toUcFirst: function toUcFirst(str) {
        if (typeof str !== 'string' && typeof str !== 'number') {
          return '';
        }
        str = String(str).trim();
        if (str === '') {
          return '';
        }
        return str[0].toUpperCase() + str.substr(1);
      },


      /**
       * Base 64 decode URL string
       */
      fromBase64: function fromBase64(str) {
        var o = str.replace('-', '+').replace('_', '/');
        switch (o.length % 4) {
          case 0:
            break;
          case 2:
            o += '==';
            break;
          case 3:
            o += '=';
            break;
          default:
            throw 'Illegal base64 url string';
        }
        try {
          return decodeURIComponent($window.atob(o));
        } catch (e) {
          //Fall through
        }
      }
    };
  }]);
})(window, window.angular);
(function (window, angular, undefined) {
  'use strict';

  /**
   * Specifications
   */

  describe('StringConverter', function () {

    //Load module and service
    beforeEach(module('Convert.StringConverter.Service'));

    //Inject storage
    var Convert = void 0;
    beforeEach(inject(function (_$stringConverter_) {
      Convert = _$stringConverter_;
    }));

    /**
     * Camel case conversion
     */
    describe('toCamelCase', function () {

      //Tests
      describe('camel casing', function () {
        it('should camel case an already camel cased string', function () {
          expect(Convert.toCamelCase('camelCase')).toBe('camelCase');
        });
        it('should camel case a snake cased string', function () {
          expect(Convert.toCamelCase('camel_case')).toBe('camelCase');
        });
        it('should camel case a dasherized string', function () {
          expect(Convert.toCamelCase('camel-case')).toBe('camelCase');
        });
        it('should camel case a string with spaces', function () {
          expect(Convert.toCamelCase('camel case')).toBe('camelCase');
        });
        it('should camel case a string with multiple spaces', function () {
          expect(Convert.toCamelCase('camel   case')).toBe('camelCase');
          expect(Convert.toCamelCase('camel   ca se')).toBe('camelCaSe');
        });
        it('should camel case a mixed string', function () {
          expect(Convert.toCamelCase('CamelCase With snake_case _and  dash-erized -andCamel')).toBe('camelCaseWithSnakeCaseAndDashErizedAndCamel');
          expect(Convert.toCamelCase('camel_case With  vari-ety andCamel')).toBe('camelCaseWithVariEtyAndCamel');
        });
        it('should lowercase single letters', function () {
          expect(Convert.toCamelCase('A')).toBe('a');
          expect(Convert.toCamelCase('F')).toBe('f');
          expect(Convert.toCamelCase('Z')).toBe('z');
        });
        it('should trim and camel case with leading/trailing spaces', function () {
          expect(Convert.toCamelCase(' test_me ')).toBe('testMe');
          expect(Convert.toCamelCase('  test_me')).toBe('testMe');
          expect(Convert.toCamelCase('test_me  ')).toBe('testMe');
          expect(Convert.toCamelCase('  test_me  ')).toBe('testMe');
        });
        it('should capitalize the first letter as well when requested', function () {
          expect(Convert.toCamelCase('camelCase', true)).toBe('CamelCase');
          expect(Convert.toCamelCase('camel-case', true)).toBe('CamelCase');
          expect(Convert.toCamelCase('camel_case', true)).toBe('CamelCase');
        });
      });

      //Numbers
      describe('numbers', function () {
        it('should accept numbers and return them as a string', function () {
          expect(Convert.toCamelCase(123)).toBe('123');
          expect(Convert.toCamelCase(1.23)).toBe('1.23');
          expect(Convert.toCamelCase(0)).toBe('0');
          expect(Convert.toCamelCase(-123)).toBe('-123');
        });
      });

      //Invalid input
      describe('invalid input', function () {
        it('should return an empty string for empty strings', function () {
          expect(Convert.toCamelCase('')).toBe('');
        });
        it('should return an empty string for booleans', function () {
          expect(Convert.toCamelCase(true)).toBe('');
          expect(Convert.toCamelCase(false)).toBe('');
        });
        it('should return an empty string for null', function () {
          expect(Convert.toCamelCase(null)).toBe('');
        });
        it('should return an empty string for undefined', function () {
          expect(Convert.toCamelCase(null)).toBe('');
        });
        it('should return an empty string for objects', function () {
          expect(Convert.toCamelCase({})).toBe('');
        });
        it('should return an empty string for arrays', function () {
          expect(Convert.toCamelCase([])).toBe('');
        });
      });
    });

    /**
     * Snake case conversion
     */
    describe('toSnakeCase', function () {

      //Tests
      describe('snake casing', function () {
        it('should snake case an already snake cased string', function () {
          expect(Convert.toSnakeCase('snake_case')).toBe('snake_case');
        });
        it('should snake case a camel cased string', function () {
          expect(Convert.toSnakeCase('snakeCase')).toBe('snake_case');
          expect(Convert.toSnakeCase('SnakeCase')).toBe('snake_case');
          expect(Convert.toSnakeCase('SnAkeCASe')).toBe('sn_ake_c_a_se');
        });
        it('should snake case a dasherized string', function () {
          expect(Convert.toSnakeCase('snake-case')).toBe('snake_case');
          expect(Convert.toSnakeCase('Snake-Case')).toBe('snake_case');
        });
        it('should snake case a string with spaces', function () {
          expect(Convert.toSnakeCase('Snake Case')).toBe('snake_case');
        });
        it('should snake case a string with multiple spaces', function () {
          expect(Convert.toSnakeCase('Snake   Case')).toBe('snake_case');
          expect(Convert.toSnakeCase('Snake   Ca se')).toBe('snake_ca_se');
        });
        it('should snake case a mixed string', function () {
          expect(Convert.toSnakeCase('Snake-Case mixEd Stri_ng te-st')).toBe('snake_case_mix_ed_stri_ng_te_st');
          expect(Convert.toSnakeCase('CamelCase With snake_case _and  dash-erized -andCamel')).toBe('camel_case_with_snake_case_and_dash_erized_and_camel');
        });
        it('should lowercase single letters', function () {
          expect(Convert.toSnakeCase('A')).toBe('a');
          expect(Convert.toSnakeCase('F')).toBe('f');
          expect(Convert.toSnakeCase('Z')).toBe('z');
        });
        it('should trim and snake case with leading/trailing spaces', function () {
          expect(Convert.toSnakeCase(' TestMe ')).toBe('test_me');
          expect(Convert.toSnakeCase('  TestMe')).toBe('test_me');
          expect(Convert.toSnakeCase('TestMe  ')).toBe('test_me');
          expect(Convert.toSnakeCase('  TestMe  ')).toBe('test_me');
        });
      });

      //Numbers
      describe('numbers', function () {
        it('should accept numbers and return them as a string', function () {
          expect(Convert.toSnakeCase(123)).toBe('123');
          expect(Convert.toSnakeCase(1.23)).toBe('1.23');
          expect(Convert.toSnakeCase(0)).toBe('0');
          expect(Convert.toSnakeCase(-123)).toBe('-123');
        });
      });

      //Invalid input
      describe('invalid input', function () {
        it('should return an empty string for empty strings', function () {
          expect(Convert.toSnakeCase('')).toBe('');
        });
        it('should return an empty string for booleans', function () {
          expect(Convert.toSnakeCase(true)).toBe('');
          expect(Convert.toSnakeCase(false)).toBe('');
        });
        it('should return an empty string for null', function () {
          expect(Convert.toSnakeCase(null)).toBe('');
        });
        it('should return an empty string for undefined', function () {
          expect(Convert.toSnakeCase(null)).toBe('');
        });
        it('should return an empty string for objects', function () {
          expect(Convert.toSnakeCase({})).toBe('');
        });
        it('should return an empty string for arrays', function () {
          expect(Convert.toSnakeCase([])).toBe('');
        });
      });
    });

    /**
     * Dasherize conversion
     */
    describe('toDasherized', function () {

      //Tests
      describe('dasherizing', function () {
        it('should dasherize an already dasherized string', function () {
          expect(Convert.toDasherized('dash-erized')).toBe('dash-erized');
        });
        it('should dasherize a snake cased string', function () {
          expect(Convert.toDasherized('dash_erized')).toBe('dash-erized');
        });
        it('should dasherize a camel cased string', function () {
          expect(Convert.toDasherized('dashErized')).toBe('dash-erized');
          expect(Convert.toDasherized('DashErized')).toBe('dash-erized');
        });
        it('should dasherize a string with spaces', function () {
          expect(Convert.toDasherized('dash erized')).toBe('dash-erized');
        });
        it('should dasherize a string with multiple spaces', function () {
          expect(Convert.toDasherized('dash   erized')).toBe('dash-erized');
          expect(Convert.toDasherized('dash   eri zed')).toBe('dash-eri-zed');
        });
        it('should dasherize a mixed string', function () {
          expect(Convert.toDasherized('CamelCase With snake_case _and  dash-erized -andCamel')).toBe('camel-case-with-snake-case-and-dash-erized-and-camel');
        });
        it('should lowercase single letters', function () {
          expect(Convert.toDasherized('A')).toBe('a');
          expect(Convert.toDasherized('F')).toBe('f');
          expect(Convert.toDasherized('Z')).toBe('z');
        });
        it('should trim and dasherize with leading/trailing spaces', function () {
          expect(Convert.toDasherized(' test_me ')).toBe('test-me');
          expect(Convert.toDasherized('  test_me')).toBe('test-me');
          expect(Convert.toDasherized('test_me  ')).toBe('test-me');
          expect(Convert.toDasherized('  test_me  ')).toBe('test-me');
        });
        it('should dasherize a string with brackets', function () {
          expect(Convert.toDasherized('dash (erized)')).toBe('dash-(erized)');
          expect(Convert.toDasherized('dash (erized) more')).toBe('dash-(erized)-more');
        });
      });

      //Numbers
      describe('numbers', function () {
        it('should accept numbers and return them as a string', function () {
          expect(Convert.toDasherized(123)).toBe('123');
          expect(Convert.toDasherized(1.23)).toBe('1.23');
          expect(Convert.toDasherized(0)).toBe('0');
          expect(Convert.toDasherized(-123)).toBe('-123');
        });
      });

      //Invalid input
      describe('invalid input', function () {
        it('should return an empty string for empty strings', function () {
          expect(Convert.toDasherized('')).toBe('');
        });
        it('should return an empty string for booleans', function () {
          expect(Convert.toDasherized(true)).toBe('');
          expect(Convert.toDasherized(false)).toBe('');
        });
        it('should return an empty string for null', function () {
          expect(Convert.toDasherized(null)).toBe('');
        });
        it('should return an empty string for undefined', function () {
          expect(Convert.toDasherized(null)).toBe('');
        });
        it('should return an empty string for objects', function () {
          expect(Convert.toDasherized({})).toBe('');
        });
        it('should return an empty string for arrays', function () {
          expect(Convert.toDasherized([])).toBe('');
        });
      });
    });

    /**
     * Ucfirst conversion
     */
    describe('toUcFirst', function () {

      //Tests
      describe('capitalization', function () {
        it('should capitalize the first letter of a string', function () {
          expect(Convert.toUcFirst('test')).toBe('Test');
          expect(Convert.toUcFirst('test with spaces')).toBe('Test with spaces');
        });
        it('should capitalize single letters', function () {
          expect(Convert.toUcFirst('a')).toBe('A');
          expect(Convert.toUcFirst('f')).toBe('F');
          expect(Convert.toUcFirst('z')).toBe('Z');
        });
        it('should leave capitalization of the rest of the string intact', function () {
          expect(Convert.toUcFirst('tEsT')).toBe('TEsT');
        });
        it('should trim and capitalize with leading and trailing spaces', function () {
          expect(Convert.toUcFirst(' test ')).toBe('Test');
          expect(Convert.toUcFirst('  test')).toBe('Test');
          expect(Convert.toUcFirst('test  ')).toBe('Test');
          expect(Convert.toUcFirst('  test  ')).toBe('Test');
        });
      });

      //Numbers
      describe('numbers', function () {
        it('should accept numbers and return them as a string', function () {
          expect(Convert.toUcFirst(123)).toBe('123');
          expect(Convert.toUcFirst(1.23)).toBe('1.23');
          expect(Convert.toUcFirst(0)).toBe('0');
          expect(Convert.toUcFirst(-123)).toBe('-123');
        });
      });

      //Invalid input
      describe('invalid input', function () {
        it('should return an empty string for empty strings', function () {
          expect(Convert.toUcFirst('')).toBe('');
        });
        it('should return an empty string for booleans', function () {
          expect(Convert.toUcFirst(true)).toBe('');
          expect(Convert.toUcFirst(false)).toBe('');
        });
        it('should return an empty string for null', function () {
          expect(Convert.toUcFirst(null)).toBe('');
        });
        it('should return an empty string for undefined', function () {
          expect(Convert.toUcFirst(null)).toBe('');
        });
        it('should return an empty string for objects', function () {
          expect(Convert.toUcFirst({})).toBe('');
        });
        it('should return an empty string for arrays', function () {
          expect(Convert.toUcFirst([])).toBe('');
        });
      });
    });
  });
})(window, window.angular);
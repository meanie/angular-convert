/**
 * meanie-angular-convert - v0.4.1 - 17-6-2015
 * https://github.com/meanie/angular-convert
 *
 * Copyright (c) 2015 Adam Buczynski <me@adambuczynski.com>
 * License: MIT
 */
(function (window, angular, undefined) {'use strict';

/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.Service', [
  'Utility.Convert.StringConverter.Service',
  'Utility.Convert.ObjectConverter.Service',
  'Utility.Convert.QueryStringConverter.Service'
])

/**
 * Factory definition
 */
.factory('$convert', ['$stringConverter', '$objectConverter', '$queryStringConverter', function($stringConverter, $objectConverter, $queryStringConverter) {
  return {
    string: $stringConverter,
    object: $objectConverter,
    queryString: $queryStringConverter
  };
}]);

})(window, window.angular);

(function (window, angular, undefined) {'use strict';

/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.ObjectConverter.Service', [
  'Utility.Convert.StringConverter.Service'
])

/**
 * Factory definition
 */
.factory('$objectConverter', ['$stringConverter', function($stringConverter) {

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
    keysToSnakeCase: function(obj) {
      return convertObjectKeys(obj, 'toSnakeCase');
    },

    /**
     * Convert object keys to snake case
     */
    keysToCamelCase: function(obj) {
      return convertObjectKeys(obj, 'toCamelCase');
    }
  };
}]);

})(window, window.angular);

(function (window, angular, undefined) {'use strict';

/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.QueryStringConverter.Service', [
  'Utility.Convert.StringConverter.Service'
])

/**
 * Factory definition
 */
.factory('$queryStringConverter', ['$stringConverter', function($stringConverter) {

  /**
   * Tries to decode an URI component without throwing an exception
   */
  function tryDecodeURIComponent(str) {
    try {
      return decodeURIComponent(str);
    } catch (e) {}
  }

  /**
   * Tries to encode an URI component without throwing an exception
   */
  function tryEncodeURIComponent(str, pctEncodeSpaces) {
    try {
      return encodeURIComponent(str)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
    } catch (e) {}
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
    toObject: function(s, convertCase) {
      var obj = {};
      var kv, key, val;
      angular.forEach((s || '').split('&'), function(s) {
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
        }
        else if (angular.isArray(obj[key])) {
          obj[key].push(val);
        }
        else {
          obj[key] = [obj[key], val];
        }
      });
      return obj;
    },

    /**
     * Convert key-value pairs object to a parametrized query string
     */
    fromObject: function(obj, convertCase) {

      //No obj?
      if (!obj || !angular.isObject(obj)) {
        return '';
      }

      //Initialize parts array
      var parts = [];

      //Loop the parameters
      angular.forEach(obj, function(value, key) {

        //Skip null/undefined values
        if (value === null || angular.isUndefined(value)) {
          return;
        }

        //Convert to array
        if (!angular.isArray(value)) {
          value = [value];
        }

        //Loop values
        angular.forEach(value, function(v) {

          //Handle objects
          if (angular.isObject(v)) {
            if (angular.isDate(v)) {
              v = v.toISOString();
            }
            else {
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

(function (window, angular, undefined) {'use strict';

/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.StringConverter.Service', [])

/**
 * Factory definition
 */
.factory('$stringConverter', ['$window', function($window) {
  return {

    /**
     * Convert string to snake case
     */
    toSnakeCase: function(str) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str.replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
        $1 = $1.trim().toLowerCase().replace('-', '');
        return ($1[0] === '_' ? '' : '_') + $1;
      }).slice(1);
    },

    /**
     * Convert string to camel case
     */
    toCamelCase: function(str, ucfirst) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str
        .replace(/_+|\-+/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) {
            return '';
          }
          return (index === 0 && !ucfirst) ? match.toLowerCase() : match.toUpperCase();
        });
    },

    /**
     * Dasherize a string
     */
    toDasherized: function(str) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str.replace(/(\s*\-*\b\w|[A-Z]|_[a-z])/g, function($1) {
        $1 = $1.replace('_', '-').trim().toLowerCase();
        return ($1[0] === '-' ? '' : '-') + $1;
      }).slice(1);
    },

    /**
     * Make the first letter of a string uppercase
     */
    toUcfirst: function(str) {
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
    fromBase64: function(str) {
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
      }
      catch (e) {}
    }
  };
}]);

})(window, window.angular);

/**
 * Module definition and dependencies
 */
angular.module('Convert.QueryStringConverter.Service', [
  'Convert.StringConverter.Service'
])

/**
 * Factory definition
 */
.factory('$queryStringConverter', function($stringConverter) {

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
});


/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.QueryString.Service', [
  'Utility.Convert.String.Service'
])

/**
 * Factory definition
 */
.factory('QueryStringConverter', function(StringConverter) {

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
      return encodeURIComponent(str).
        replace(/%40/g, '@').
        replace(/%3A/g, ':').
        replace(/%24/g, '$').
        replace(/%2C/g, ',').
        replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
    } catch (e) {}
  }

  /**
   * Query string conversions
   */
  var QueryStringConverter = {

    /**
     * Parses an escaped url query string into key-value pairs
     */
    toObject: function(s, convertCase) {
      var obj = {};
      var kv, key;
      angular.forEach((s || '').split('&'), function(s) {
        if (s) {
          kv = s.replace(/\+/g, '%20').split('=');
          key = tryDecodeURIComponent(kv[0]);
          if (angular.isDefined(key)) {

            //Convert case?
            switch (convertCase) {
              case 'snake':
                key = StringConverter.toSnakeCase(key);
                break;
              case 'camel':
                key = StringConverter.toCamelCase(key);
                break;
            }

            //Get value
            var val = angular.isDefined(kv[1]) ? tryDecodeURIComponent(kv[1]) : true;

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
          }
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
              key = StringConverter.toSnakeCase(key);
              break;
            case 'camel':
              key = StringConverter.toCamelCase(key);
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

  //Return
  return QueryStringConverter;
});

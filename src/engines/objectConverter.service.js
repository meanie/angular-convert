
/**
 * Module definition and dependencies
 */
angular.module('Utility.Convert.ObjectConverter.Service', [
  'Utility.Convert.StringConverter.Service'
])

/**
 * Factory definition
 */
.factory('$objectConverter', function($stringConverter) {

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
});
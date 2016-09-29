
/**
 * Module definition and dependencies
 */
angular.module('Convert.ObjectConverter.Service', [
  'Convert.StringConverter.Service',
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
    let newObj = {};

    //Loop keys
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let newKey = $stringConverter[converter](key);
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
    keysToSnakeCase(obj) {
      return convertObjectKeys(obj, 'toSnakeCase');
    },

    /**
     * Convert object keys to snake case
     */
    keysToCamelCase(obj) {
      return convertObjectKeys(obj, 'toCamelCase');
    },
  };
});

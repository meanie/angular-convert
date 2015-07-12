
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
.factory('$convert', function($stringConverter, $objectConverter, $queryStringConverter) {
  return {
    string: $stringConverter,
    object: $objectConverter,
    queryString: $queryStringConverter
  };
});

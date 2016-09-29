
/**
 * Module definition and dependencies
 */
angular.module('Convert.Service', [
  'Convert.StringConverter.Service',
  'Convert.ObjectConverter.Service',
  'Convert.QueryStringConverter.Service',
])

/**
 * Factory definition
 */
.factory('$convert', function(
  $stringConverter, $objectConverter, $queryStringConverter
) {
  return {
    string: $stringConverter,
    object: $objectConverter,
    queryString: $queryStringConverter,
  };
});

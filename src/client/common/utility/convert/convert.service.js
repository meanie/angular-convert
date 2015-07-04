
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
.factory('Convert', function(StringConverter, ObjectConverter, QueryStringConverter) {
  return {
    string: StringConverter,
    object: ObjectConverter,
    queryString: QueryStringConverter
  };
});

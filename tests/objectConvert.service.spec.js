/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

/**
 * Specifications
 */
describe('ObjectConverter', function() {

  //Load module and service
  beforeEach(module('Utility.Convert.ObjectConverter.Service'));

  //Inject storage
  var Convert;
  beforeEach(inject(function(_$objectConverter_) {
    Convert = _$objectConverter_;
  }));

  /**
   * Camel case conversion
   */
  describe('keysToCamelCase', function() {
    it('should return an object when passed an object', function() {
      var src = {};
      var res = Convert.keysToCamelCase(src);
      expect(typeof res).toBe('object');
      expect(res).not.toBeNull();
    });
    it('should return an object with the same properties', function() {
      var src = {a: 1, b: 2, c: 3};
      var res = Convert.keysToCamelCase(src);
      expect(res.a).toBeDefined();
      expect(res.b).toBeDefined();
      expect(res.c).toBeDefined();
    });
    it('should return an object with the same property values', function() {
      var src = {a: 1, b: 2, c: 3};
      var res = Convert.keysToCamelCase(src);
      expect(res.a).toBe(src.a);
      expect(res.b).toBe(src.b);
      expect(res.c).toBe(src.c);
    });
    it('should not camel case simple keys', function() {
      var src = {simple: 1};
      var res = Convert.keysToCamelCase(src);
      expect(res.simple).toBeDefined();
    });
    it('should camel case snake cased keys', function() {
      var src = {snake_cased: 1, more_snake_cased: 2};
      var res = Convert.keysToCamelCase(src);
      expect(res.snakeCased).toBeDefined();
      expect(res.moreSnakeCased).toBeDefined();
    });
    it('should not preserve the original keys', function() {
      var src = {snake_cased: 1, more_snake_cased: 2};
      var res = Convert.keysToCamelCase(src);
      expect(res.snake_cased).not.toBeDefined();
      expect(res.more_snake_cased).not.toBeDefined();
    });
    it('should throw a type error on invalid input', function() {
      expect(Convert.keysToCamelCase).toThrowError(TypeError);
      expect(function() {
        Convert.keysToCamelCase(null);
      }).toThrowError(TypeError);
      expect(function() {
        Convert.keysToCamelCase(1);
      }).toThrowError(TypeError);
      expect(function() {
        Convert.keysToCamelCase('a');
      }).toThrowError(TypeError);
    });
  });

  /**
   * Snake case conversion
   */
  describe('keysToSnakeCase', function() {
    it('should return an object when passed an object', function() {
      var src = {};
      var res = Convert.keysToSnakeCase(src);
      expect(typeof res).toBe('object');
      expect(res).not.toBeNull();
    });
    it('should return an object with the same properties', function() {
      var src = {a: 1, b: 2, c: 3};
      var res = Convert.keysToSnakeCase(src);
      expect(res.a).toBeDefined();
      expect(res.b).toBeDefined();
      expect(res.c).toBeDefined();
    });
    it('should return an object with the same property values', function() {
      var src = {a: 1, b: 2, c: 3};
      var res = Convert.keysToSnakeCase(src);
      expect(res.a).toBe(src.a);
      expect(res.b).toBe(src.b);
      expect(res.c).toBe(src.c);
    });
    it('should not snake case simple keys', function() {
      var src = {simple: 1};
      var res = Convert.keysToSnakeCase(src);
      expect(res.simple).toBeDefined();
    });
    it('should snake case camel cased keys', function() {
      var src = {camelCased: 1, moreCamelCased: 2};
      var res = Convert.keysToSnakeCase(src);
      expect(res.camel_cased).toBeDefined();
      expect(res.more_camel_cased).toBeDefined();
    });
    it('should not preserve the original keys', function() {
      var src = {camelCased: 1, moreCamelCased: 2};
      var res = Convert.keysToSnakeCase(src);
      expect(res.camelCased).not.toBeDefined();
      expect(res.moreCamelCased).not.toBeDefined();
    });
    it('should throw a type error on invalid input', function() {
      expect(Convert.keysToSnakeCase).toThrowError(TypeError);
      expect(function() {
        Convert.keysToSnakeCase(null);
      }).toThrowError(TypeError);
      expect(function() {
        Convert.keysToSnakeCase(1);
      }).toThrowError(TypeError);
      expect(function() {
        Convert.keysToSnakeCase('a');
      }).toThrowError(TypeError);
    });
  });
});

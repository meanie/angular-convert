/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

/**
 * Specifications
 */
describe('ObjectConverter', () => {

  //Load module and service
  beforeEach(module('Convert.ObjectConverter.Service'));

  //Inject storage
  let Convert;
  beforeEach(inject((_$objectConverter_) => {
    Convert = _$objectConverter_;
  }));

  /**
   * Camel case conversion
   */
  describe('keysToCamelCase', () => {
    it('should return an object when passed an object', () => {
      let src = {};
      let res = Convert.keysToCamelCase(src);
      expect(typeof res).toBe('object');
      expect(res).not.toBeNull();
    });
    it('should return an object with the same properties', () => {
      let src = {a: 1, b: 2, c: 3};
      let res = Convert.keysToCamelCase(src);
      expect(res.a).toBeDefined();
      expect(res.b).toBeDefined();
      expect(res.c).toBeDefined();
    });
    it('should return an object with the same property values', () => {
      let src = {a: 1, b: 2, c: 3};
      let res = Convert.keysToCamelCase(src);
      expect(res.a).toBe(src.a);
      expect(res.b).toBe(src.b);
      expect(res.c).toBe(src.c);
    });
    it('should not camel case simple keys', () => {
      let src = {simple: 1};
      let res = Convert.keysToCamelCase(src);
      expect(res.simple).toBeDefined();
    });
    it('should camel case snake cased keys', () => {
      let src = {snake_cased: 1, more_snake_cased: 2};
      let res = Convert.keysToCamelCase(src);
      expect(res.snakeCased).toBeDefined();
      expect(res.moreSnakeCased).toBeDefined();
    });
    it('should not preserve the original keys', () => {
      let src = {snake_cased: 1, more_snake_cased: 2};
      let res = Convert.keysToCamelCase(src);
      expect(res.snake_cased).not.toBeDefined();
      expect(res.more_snake_cased).not.toBeDefined();
    });
    it('should throw a type error on invalid input', () => {
      expect(Convert.keysToCamelCase).toThrowError(TypeError);
      expect(() => {
        Convert.keysToCamelCase(null);
      }).toThrowError(TypeError);
      expect(() => {
        Convert.keysToCamelCase(1);
      }).toThrowError(TypeError);
      expect(() => {
        Convert.keysToCamelCase('a');
      }).toThrowError(TypeError);
    });
  });

  /**
   * Snake case conversion
   */
  describe('keysToSnakeCase', () => {
    it('should return an object when passed an object', () => {
      let src = {};
      let res = Convert.keysToSnakeCase(src);
      expect(typeof res).toBe('object');
      expect(res).not.toBeNull();
    });
    it('should return an object with the same properties', () => {
      let src = {a: 1, b: 2, c: 3};
      let res = Convert.keysToSnakeCase(src);
      expect(res.a).toBeDefined();
      expect(res.b).toBeDefined();
      expect(res.c).toBeDefined();
    });
    it('should return an object with the same property values', () => {
      let src = {a: 1, b: 2, c: 3};
      let res = Convert.keysToSnakeCase(src);
      expect(res.a).toBe(src.a);
      expect(res.b).toBe(src.b);
      expect(res.c).toBe(src.c);
    });
    it('should not snake case simple keys', () => {
      let src = {simple: 1};
      let res = Convert.keysToSnakeCase(src);
      expect(res.simple).toBeDefined();
    });
    it('should snake case camel cased keys', () => {
      let src = {camelCased: 1, moreCamelCased: 2};
      let res = Convert.keysToSnakeCase(src);
      expect(res.camel_cased).toBeDefined();
      expect(res.more_camel_cased).toBeDefined();
    });
    it('should not preserve the original keys', () => {
      let src = {camelCased: 1, moreCamelCased: 2};
      let res = Convert.keysToSnakeCase(src);
      expect(res.camelCased).not.toBeDefined();
      expect(res.moreCamelCased).not.toBeDefined();
    });
    it('should throw a type error on invalid input', () => {
      expect(Convert.keysToSnakeCase).toThrowError(TypeError);
      expect(() => {
        Convert.keysToSnakeCase(null);
      }).toThrowError(TypeError);
      expect(() => {
        Convert.keysToSnakeCase(1);
      }).toThrowError(TypeError);
      expect(() => {
        Convert.keysToSnakeCase('a');
      }).toThrowError(TypeError);
    });
  });
});

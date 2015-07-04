
/**
 * Specifications
 */
describe('StringConvert', function() {

  //Load module and service
  beforeEach(module('Utility.Convert.StringConvert.Service'));

  //Inject storage
  var Convert;
  beforeEach(inject(function(_StringConvert_) {
    Convert = _StringConvert_;
  }));

  /**
   * Camel case conversion
   */
  describe('toCamelCase', function() {

    //Tests
    describe('camel casing', function() {
      it('should camel case an already camel cased string', function() {
        expect(Convert.toCamelCase('camelCase')).toBe('camelCase');
      });
      it('should camel case a snake cased string', function() {
        expect(Convert.toCamelCase('camel_case')).toBe('camelCase');
      });
      it('should camel case a dasherized string', function() {
        expect(Convert.toCamelCase('camel-case')).toBe('camelCase');
      });
      it('should camel case a string with spaces', function() {
        expect(Convert.toCamelCase('camel case')).toBe('camelCase');
      });
      it('should camel case a string with multiple spaces', function() {
        expect(Convert.toCamelCase('camel   case')).toBe('camelCase');
        expect(Convert.toCamelCase('camel   ca se')).toBe('camelCaSe');
      });
      it('should camel case a mixed string', function() {
        expect(Convert.toCamelCase('CamelCase With snake_case _and  dash-erized -andCamel'))
          .toBe('camelCaseWithSnakeCaseAndDashErizedAndCamel');
        expect(Convert.toCamelCase('camel_case With  vari-ety andCamel')).toBe('camelCaseWithVariEtyAndCamel');
      });
      it('should lowercase single letters', function() {
        expect(Convert.toCamelCase('A')).toBe('a');
        expect(Convert.toCamelCase('F')).toBe('f');
        expect(Convert.toCamelCase('Z')).toBe('z');
      });
      it('should trim and camel case properly with leading/trailing spaces', function() {
        expect(Convert.toCamelCase(' test_me ')).toBe('testMe');
        expect(Convert.toCamelCase('  test_me')).toBe('testMe');
        expect(Convert.toCamelCase('test_me  ')).toBe('testMe');
        expect(Convert.toCamelCase('  test_me  ')).toBe('testMe');
      });
      it('should capitalize the first letter as well when requested', function() {
        expect(Convert.toCamelCase('camelCase', true)).toBe('CamelCase');
        expect(Convert.toCamelCase('camel-case', true)).toBe('CamelCase');
        expect(Convert.toCamelCase('camel_case', true)).toBe('CamelCase');
      });
    });

    //Numbers
    describe('numbers', function() {
      it('should accept numbers and return them as a string', function() {
        expect(Convert.toCamelCase(123)).toBe('123');
        expect(Convert.toCamelCase(1.23)).toBe('1.23');
        expect(Convert.toCamelCase(0)).toBe('0');
        expect(Convert.toCamelCase(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', function() {
      it('should return an empty string for empty strings', function() {
        expect(Convert.toCamelCase('')).toBe('');
      });
      it('should return an empty string for booleans', function() {
        expect(Convert.toCamelCase(true)).toBe('');
        expect(Convert.toCamelCase(false)).toBe('');
      });
      it('should return an empty string for null', function() {
        expect(Convert.toCamelCase(null)).toBe('');
      });
      it('should return an empty string for undefined', function() {
        expect(Convert.toCamelCase(null)).toBe('');
      });
      it('should return an empty string for objects', function() {
        expect(Convert.toCamelCase({})).toBe('');
      });
      it('should return an empty string for arrays', function() {
        expect(Convert.toCamelCase([])).toBe('');
      });
    });
  });
});

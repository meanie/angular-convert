
/**
 * Specifications
 */
describe('StringConverter', function() {

  //Load module and service
  beforeEach(module('Convert.StringConverter.Service'));

  //Inject storage
  var Convert;
  beforeEach(inject(function(_$stringConverter_) {
    Convert = _$stringConverter_;
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
        expect(Convert.toCamelCase('camel_case With  vari-ety andCamel'))
          .toBe('camelCaseWithVariEtyAndCamel');
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

  /**
   * Snake case conversion
   */
  describe('toSnakeCase', function() {

    //Tests
    describe('snake casing', function() {
      it('should snake case an already snake cased string', function() {
        expect(Convert.toSnakeCase('snake_case')).toBe('snake_case');
      });
      it('should snake case a camel cased string', function() {
        expect(Convert.toSnakeCase('snakeCase')).toBe('snake_case');
        expect(Convert.toSnakeCase('SnakeCase')).toBe('snake_case');
        expect(Convert.toSnakeCase('SnAkeCASe')).toBe('sn_ake_c_a_se');
      });
      it('should snake case a dasherized string', function() {
        expect(Convert.toSnakeCase('snake-case')).toBe('snake_case');
        expect(Convert.toSnakeCase('Snake-Case')).toBe('snake_case');
      });
      it('should snake case a string with spaces', function() {
        expect(Convert.toSnakeCase('Snake Case')).toBe('snake_case');
      });
      it('should snake case a string with multiple spaces', function() {
        expect(Convert.toSnakeCase('Snake   Case')).toBe('snake_case');
        expect(Convert.toSnakeCase('Snake   Ca se')).toBe('snake_ca_se');
      });
      it('should snake case a mixed string', function() {
        expect(Convert.toSnakeCase('Snake-Case mixEd Stri_ng te-st'))
          .toBe('snake_case_mix_ed_stri_ng_te_st');
        expect(Convert.toSnakeCase('CamelCase With snake_case _and  dash-erized -andCamel'))
          .toBe('camel_case_with_snake_case_and_dash_erized_and_camel');
      });
      it('should lowercase single letters', function() {
        expect(Convert.toSnakeCase('A')).toBe('a');
        expect(Convert.toSnakeCase('F')).toBe('f');
        expect(Convert.toSnakeCase('Z')).toBe('z');
      });
      it('should trim and snake case properly with leading/trailing spaces', function() {
        expect(Convert.toSnakeCase(' TestMe ')).toBe('test_me');
        expect(Convert.toSnakeCase('  TestMe')).toBe('test_me');
        expect(Convert.toSnakeCase('TestMe  ')).toBe('test_me');
        expect(Convert.toSnakeCase('  TestMe  ')).toBe('test_me');
      });
    });

    //Numbers
    describe('numbers', function() {
      it('should accept numbers and return them as a string', function() {
        expect(Convert.toSnakeCase(123)).toBe('123');
        expect(Convert.toSnakeCase(1.23)).toBe('1.23');
        expect(Convert.toSnakeCase(0)).toBe('0');
        expect(Convert.toSnakeCase(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', function() {
      it('should return an empty string for empty strings', function() {
        expect(Convert.toSnakeCase('')).toBe('');
      });
      it('should return an empty string for booleans', function() {
        expect(Convert.toSnakeCase(true)).toBe('');
        expect(Convert.toSnakeCase(false)).toBe('');
      });
      it('should return an empty string for null', function() {
        expect(Convert.toSnakeCase(null)).toBe('');
      });
      it('should return an empty string for undefined', function() {
        expect(Convert.toSnakeCase(null)).toBe('');
      });
      it('should return an empty string for objects', function() {
        expect(Convert.toSnakeCase({})).toBe('');
      });
      it('should return an empty string for arrays', function() {
        expect(Convert.toSnakeCase([])).toBe('');
      });
    });
  });

  /**
   * Dasherize conversion
   */
  describe('toDasherized', function() {

    //Tests
    describe('dasherizing', function() {
      it('should dasherize an already dasherized string', function() {
        expect(Convert.toDasherized('dash-erized')).toBe('dash-erized');
      });
      it('should dasherize a snake cased string', function() {
        expect(Convert.toDasherized('dash_erized')).toBe('dash-erized');
      });
      it('should dasherize a camel cased string', function() {
        expect(Convert.toDasherized('dashErized')).toBe('dash-erized');
        expect(Convert.toDasherized('DashErized')).toBe('dash-erized');
      });
      it('should dasherize a string with spaces', function() {
        expect(Convert.toDasherized('dash erized')).toBe('dash-erized');
      });
      it('should dasherize a string with multiple spaces', function() {
        expect(Convert.toDasherized('dash   erized')).toBe('dash-erized');
        expect(Convert.toDasherized('dash   eri zed')).toBe('dash-eri-zed');
      });
      it('should dasherize a mixed string', function() {
        expect(Convert.toDasherized('CamelCase With snake_case _and  dash-erized -andCamel'))
          .toBe('camel-case-with-snake-case-and-dash-erized-and-camel');
      });
      it('should lowercase single letters', function() {
        expect(Convert.toDasherized('A')).toBe('a');
        expect(Convert.toDasherized('F')).toBe('f');
        expect(Convert.toDasherized('Z')).toBe('z');
      });
      it('should trim and dasherize properly with leading/trailing spaces', function() {
        expect(Convert.toDasherized(' test_me ')).toBe('test-me');
        expect(Convert.toDasherized('  test_me')).toBe('test-me');
        expect(Convert.toDasherized('test_me  ')).toBe('test-me');
        expect(Convert.toDasherized('  test_me  ')).toBe('test-me');
      });
    });

    //Numbers
    describe('numbers', function() {
      it('should accept numbers and return them as a string', function() {
        expect(Convert.toDasherized(123)).toBe('123');
        expect(Convert.toDasherized(1.23)).toBe('1.23');
        expect(Convert.toDasherized(0)).toBe('0');
        expect(Convert.toDasherized(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', function() {
      it('should return an empty string for empty strings', function() {
        expect(Convert.toDasherized('')).toBe('');
      });
      it('should return an empty string for booleans', function() {
        expect(Convert.toDasherized(true)).toBe('');
        expect(Convert.toDasherized(false)).toBe('');
      });
      it('should return an empty string for null', function() {
        expect(Convert.toDasherized(null)).toBe('');
      });
      it('should return an empty string for undefined', function() {
        expect(Convert.toDasherized(null)).toBe('');
      });
      it('should return an empty string for objects', function() {
        expect(Convert.toDasherized({})).toBe('');
      });
      it('should return an empty string for arrays', function() {
        expect(Convert.toDasherized([])).toBe('');
      });
    });
  });

  /**
   * Ucfirst conversion
   */
  describe('toUcFirst', function() {

    //Tests
    describe('capitalization', function() {
      it('should capitalize the first letter of a string', function() {
        expect(Convert.toUcFirst('test')).toBe('Test');
        expect(Convert.toUcFirst('test with spaces')).toBe('Test with spaces');
      });
      it('should capitalize single letters', function() {
        expect(Convert.toUcFirst('a')).toBe('A');
        expect(Convert.toUcFirst('f')).toBe('F');
        expect(Convert.toUcFirst('z')).toBe('Z');
      });
      it('should leave capitalization of the rest of the string intact', function() {
        expect(Convert.toUcFirst('tEsT')).toBe('TEsT');
      });
      it('should trim and capitalize properly with leading and trailing spaces', function() {
        expect(Convert.toUcFirst(' test ')).toBe('Test');
        expect(Convert.toUcFirst('  test')).toBe('Test');
        expect(Convert.toUcFirst('test  ')).toBe('Test');
        expect(Convert.toUcFirst('  test  ')).toBe('Test');
      });
    });

    //Numbers
    describe('numbers', function() {
      it('should accept numbers and return them as a string', function() {
        expect(Convert.toUcFirst(123)).toBe('123');
        expect(Convert.toUcFirst(1.23)).toBe('1.23');
        expect(Convert.toUcFirst(0)).toBe('0');
        expect(Convert.toUcFirst(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', function() {
      it('should return an empty string for empty strings', function() {
        expect(Convert.toUcFirst('')).toBe('');
      });
      it('should return an empty string for booleans', function() {
        expect(Convert.toUcFirst(true)).toBe('');
        expect(Convert.toUcFirst(false)).toBe('');
      });
      it('should return an empty string for null', function() {
        expect(Convert.toUcFirst(null)).toBe('');
      });
      it('should return an empty string for undefined', function() {
        expect(Convert.toUcFirst(null)).toBe('');
      });
      it('should return an empty string for objects', function() {
        expect(Convert.toUcFirst({})).toBe('');
      });
      it('should return an empty string for arrays', function() {
        expect(Convert.toUcFirst([])).toBe('');
      });
    });
  });
});

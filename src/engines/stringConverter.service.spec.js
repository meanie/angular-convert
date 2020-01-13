
/**
 * Specifications
 */
describe('StringConverter', () => {

  //Load module and service
  beforeEach(module('Convert.StringConverter.Service'));

  //Inject storage
  let Convert;
  beforeEach(inject((_$stringConverter_) => {
    Convert = _$stringConverter_;
  }));

  /**
   * Camel case conversion
   */
  describe('toCamelCase', () => {

    //Tests
    describe('camel casing', () => {
      it('should camel case an already camel cased string', () => {
        expect(Convert.toCamelCase('camelCase')).toBe('camelCase');
      });
      it('should camel case a snake cased string', () => {
        expect(Convert.toCamelCase('camel_case')).toBe('camelCase');
      });
      it('should camel case a dasherized string', () => {
        expect(Convert.toCamelCase('camel-case')).toBe('camelCase');
      });
      it('should camel case a string with spaces', () => {
        expect(Convert.toCamelCase('camel case')).toBe('camelCase');
      });
      it('should camel case a string with multiple spaces', () => {
        expect(Convert.toCamelCase('camel   case')).toBe('camelCase');
        expect(Convert.toCamelCase('camel   ca se')).toBe('camelCaSe');
      });
      it('should camel case a mixed string', () => {
        expect(Convert.toCamelCase(
          'CamelCase With snake_case _and  dash-erized -andCamel'
        ))
          .toBe('camelCaseWithSnakeCaseAndDashErizedAndCamel');
        expect(Convert.toCamelCase('camel_case With  vari-ety andCamel'))
          .toBe('camelCaseWithVariEtyAndCamel');
      });
      it('should lowercase single letters', () => {
        expect(Convert.toCamelCase('A')).toBe('a');
        expect(Convert.toCamelCase('F')).toBe('f');
        expect(Convert.toCamelCase('Z')).toBe('z');
      });
      it('should trim and camel case with leading/trailing spaces', () => {
        expect(Convert.toCamelCase(' test_me ')).toBe('testMe');
        expect(Convert.toCamelCase('  test_me')).toBe('testMe');
        expect(Convert.toCamelCase('test_me  ')).toBe('testMe');
        expect(Convert.toCamelCase('  test_me  ')).toBe('testMe');
      });
      it('should capitalize the first letter as well when requested', () => {
        expect(Convert.toCamelCase('camelCase', true)).toBe('CamelCase');
        expect(Convert.toCamelCase('camel-case', true)).toBe('CamelCase');
        expect(Convert.toCamelCase('camel_case', true)).toBe('CamelCase');
      });
    });

    //Numbers
    describe('numbers', () => {
      it('should accept numbers and return them as a string', () => {
        expect(Convert.toCamelCase(123)).toBe('123');
        expect(Convert.toCamelCase(1.23)).toBe('1.23');
        expect(Convert.toCamelCase(0)).toBe('0');
        expect(Convert.toCamelCase(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', () => {
      it('should return an empty string for empty strings', () => {
        expect(Convert.toCamelCase('')).toBe('');
      });
      it('should return an empty string for booleans', () => {
        expect(Convert.toCamelCase(true)).toBe('');
        expect(Convert.toCamelCase(false)).toBe('');
      });
      it('should return an empty string for null', () => {
        expect(Convert.toCamelCase(null)).toBe('');
      });
      it('should return an empty string for undefined', () => {
        expect(Convert.toCamelCase(null)).toBe('');
      });
      it('should return an empty string for objects', () => {
        expect(Convert.toCamelCase({})).toBe('');
      });
      it('should return an empty string for arrays', () => {
        expect(Convert.toCamelCase([])).toBe('');
      });
    });
  });

  /**
   * Proper case conversion
   */
  describe('toProperCase', () => {

    //Tests
    describe('proper casing', () => {
      it('should proper case lowercase names', () => {
        expect(Convert.toProperCase('adam')).toBe('Adam');
        expect(Convert.toProperCase('adam reis')).toBe('Adam Reis');
      });
      it('should proper case uppercase names', () => {
        expect(Convert.toProperCase('ADAM')).toBe('Adam');
        expect(Convert.toProperCase('ADAM REIS')).toBe('Adam Reis');
      });
      it('should proper case an already proper cased string', () => {
        expect(Convert.toProperCase('Adam')).toBe('Adam');
        expect(Convert.toProperCase('Adam Reis')).toBe('Adam Reis');
      });
      it('should proper case a dasherized string', () => {
        expect(Convert.toProperCase('Adam-reis')).toBe('Adam-Reis');
        expect(Convert.toProperCase('adam-reis')).toBe('Adam-Reis');
      });
      it('should lowercase single letters', () => {
        expect(Convert.toProperCase('A')).toBe('A');
        expect(Convert.toProperCase('f')).toBe('F');
      });
      it('should trim and proper case with leading/trailing spaces', () => {
        expect(Convert.toProperCase(' adam reis ')).toBe('Adam Reis');
      });
      it('should handle special characters', () => {
        expect(Convert.toProperCase('hawke\'s bay')).toBe('Hawke\'s Bay');
        expect(Convert.toProperCase('HAWKE\'S BAY')).toBe('Hawke\'s Bay');
      });
      it('should handle special characters with capitals', () => {
        expect(Convert.toProperCase('O\'Sullivan')).toBe('O\'Sullivan');
        expect(Convert.toProperCase('o\'sullivan')).toBe('O\'Sullivan');
      });
    });

    //Numbers
    describe('numbers', () => {
      it('should accept numbers and return them as a string', () => {
        expect(Convert.toProperCase(123)).toBe('123');
        expect(Convert.toProperCase(1.23)).toBe('1.23');
        expect(Convert.toProperCase(0)).toBe('0');
        expect(Convert.toProperCase(-123)).toBe('-123');
        expect(Convert.toProperCase('adam 123')).toBe('Adam 123');
      });
    });

    //Invalid input
    describe('invalid input', () => {
      it('should return an empty string for empty strings', () => {
        expect(Convert.toProperCase('')).toBe('');
      });
      it('should return an empty string for booleans', () => {
        expect(Convert.toProperCase(true)).toBe('');
        expect(Convert.toProperCase(false)).toBe('');
      });
      it('should return an empty string for null', () => {
        expect(Convert.toProperCase(null)).toBe('');
      });
      it('should return an empty string for undefined', () => {
        expect(Convert.toProperCase(null)).toBe('');
      });
      it('should return an empty string for objects', () => {
        expect(Convert.toProperCase({})).toBe('');
      });
      it('should return an empty string for arrays', () => {
        expect(Convert.toProperCase([])).toBe('');
      });
    });
  });

  /**
   * Snake case conversion
   */
  describe('toSnakeCase', () => {

    //Tests
    describe('snake casing', () => {
      it('should snake case an already snake cased string', () => {
        expect(Convert.toSnakeCase('snake_case')).toBe('snake_case');
      });
      it('should snake case a camel cased string', () => {
        expect(Convert.toSnakeCase('snakeCase')).toBe('snake_case');
        expect(Convert.toSnakeCase('SnakeCase')).toBe('snake_case');
        expect(Convert.toSnakeCase('SnAkeCASe')).toBe('sn_ake_c_a_se');
      });
      it('should snake case a dasherized string', () => {
        expect(Convert.toSnakeCase('snake-case')).toBe('snake_case');
        expect(Convert.toSnakeCase('Snake-Case')).toBe('snake_case');
      });
      it('should snake case a string with spaces', () => {
        expect(Convert.toSnakeCase('Snake Case')).toBe('snake_case');
      });
      it('should snake case a string with multiple spaces', () => {
        expect(Convert.toSnakeCase('Snake   Case')).toBe('snake_case');
        expect(Convert.toSnakeCase('Snake   Ca se')).toBe('snake_ca_se');
      });
      it('should snake case a mixed string', () => {
        expect(Convert.toSnakeCase('Snake-Case mixEd Stri_ng te-st'))
          .toBe('snake_case_mix_ed_stri_ng_te_st');
        expect(Convert.toSnakeCase(
          'CamelCase With snake_case _and  dash-erized -andCamel'
        ))
          .toBe('camel_case_with_snake_case_and_dash_erized_and_camel');
      });
      it('should lowercase single letters', () => {
        expect(Convert.toSnakeCase('A')).toBe('a');
        expect(Convert.toSnakeCase('F')).toBe('f');
        expect(Convert.toSnakeCase('Z')).toBe('z');
      });
      it('should trim and snake case with leading/trailing spaces', () => {
        expect(Convert.toSnakeCase(' TestMe ')).toBe('test_me');
        expect(Convert.toSnakeCase('  TestMe')).toBe('test_me');
        expect(Convert.toSnakeCase('TestMe  ')).toBe('test_me');
        expect(Convert.toSnakeCase('  TestMe  ')).toBe('test_me');
      });
    });

    //Numbers
    describe('numbers', () => {
      it('should accept numbers and return them as a string', () => {
        expect(Convert.toSnakeCase(123)).toBe('123');
        expect(Convert.toSnakeCase(1.23)).toBe('1.23');
        expect(Convert.toSnakeCase(0)).toBe('0');
        expect(Convert.toSnakeCase(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', () => {
      it('should return an empty string for empty strings', () => {
        expect(Convert.toSnakeCase('')).toBe('');
      });
      it('should return an empty string for booleans', () => {
        expect(Convert.toSnakeCase(true)).toBe('');
        expect(Convert.toSnakeCase(false)).toBe('');
      });
      it('should return an empty string for null', () => {
        expect(Convert.toSnakeCase(null)).toBe('');
      });
      it('should return an empty string for undefined', () => {
        expect(Convert.toSnakeCase(null)).toBe('');
      });
      it('should return an empty string for objects', () => {
        expect(Convert.toSnakeCase({})).toBe('');
      });
      it('should return an empty string for arrays', () => {
        expect(Convert.toSnakeCase([])).toBe('');
      });
    });
  });

  /**
   * Dasherize conversion
   */
  describe('toDasherized', () => {

    //Tests
    describe('dasherizing', () => {
      it('should dasherize an already dasherized string', () => {
        expect(Convert.toDasherized('dash-erized')).toBe('dash-erized');
      });
      it('should dasherize a snake cased string', () => {
        expect(Convert.toDasherized('dash_erized')).toBe('dash-erized');
      });
      it('should dasherize a camel cased string', () => {
        expect(Convert.toDasherized('dashErized')).toBe('dash-erized');
        expect(Convert.toDasherized('DashErized')).toBe('dash-erized');
      });
      it('should dasherize a string with spaces', () => {
        expect(Convert.toDasherized('dash erized')).toBe('dash-erized');
      });
      it('should dasherize a string with multiple spaces', () => {
        expect(Convert.toDasherized('dash   erized')).toBe('dash-erized');
        expect(Convert.toDasherized('dash   eri zed')).toBe('dash-eri-zed');
      });
      it('should dasherize a mixed string', () => {
        expect(Convert.toDasherized(
          'CamelCase With snake_case _and  dash-erized -andCamel'
        ))
          .toBe('camel-case-with-snake-case-and-dash-erized-and-camel');
      });
      it('should lowercase single letters', () => {
        expect(Convert.toDasherized('A')).toBe('a');
        expect(Convert.toDasherized('F')).toBe('f');
        expect(Convert.toDasherized('Z')).toBe('z');
      });
      it('should trim and dasherize with leading/trailing spaces', () => {
        expect(Convert.toDasherized(' test_me ')).toBe('test-me');
        expect(Convert.toDasherized('  test_me')).toBe('test-me');
        expect(Convert.toDasherized('test_me  ')).toBe('test-me');
        expect(Convert.toDasherized('  test_me  ')).toBe('test-me');
      });
      it('should dasherize a string with brackets', () => {
        expect(Convert.toDasherized('dash (erized)')).toBe('dash-(erized)');
        expect(Convert.toDasherized('dash (erized) more'))
          .toBe('dash-(erized)-more');
      });
    });

    //Numbers
    describe('numbers', () => {
      it('should accept numbers and return them as a string', () => {
        expect(Convert.toDasherized(123)).toBe('123');
        expect(Convert.toDasherized(1.23)).toBe('1.23');
        expect(Convert.toDasherized(0)).toBe('0');
        expect(Convert.toDasherized(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', () => {
      it('should return an empty string for empty strings', () => {
        expect(Convert.toDasherized('')).toBe('');
      });
      it('should return an empty string for booleans', () => {
        expect(Convert.toDasherized(true)).toBe('');
        expect(Convert.toDasherized(false)).toBe('');
      });
      it('should return an empty string for null', () => {
        expect(Convert.toDasherized(null)).toBe('');
      });
      it('should return an empty string for undefined', () => {
        expect(Convert.toDasherized(null)).toBe('');
      });
      it('should return an empty string for objects', () => {
        expect(Convert.toDasherized({})).toBe('');
      });
      it('should return an empty string for arrays', () => {
        expect(Convert.toDasherized([])).toBe('');
      });
    });
  });

  /**
   * Ucfirst conversion
   */
  describe('toUcFirst', () => {

    //Tests
    describe('capitalization', () => {
      it('should capitalize the first letter of a string', () => {
        expect(Convert.toUcFirst('test')).toBe('Test');
        expect(Convert.toUcFirst('test with spaces')).toBe('Test with spaces');
      });
      it('should capitalize single letters', () => {
        expect(Convert.toUcFirst('a')).toBe('A');
        expect(Convert.toUcFirst('f')).toBe('F');
        expect(Convert.toUcFirst('z')).toBe('Z');
      });
      it('should leave capitalization of the rest of the string intact', () => {
        expect(Convert.toUcFirst('tEsT')).toBe('TEsT');
      });
      it('should trim and capitalize with leading and trailing spaces', () => {
        expect(Convert.toUcFirst(' test ')).toBe('Test');
        expect(Convert.toUcFirst('  test')).toBe('Test');
        expect(Convert.toUcFirst('test  ')).toBe('Test');
        expect(Convert.toUcFirst('  test  ')).toBe('Test');
      });
    });

    //Numbers
    describe('numbers', () => {
      it('should accept numbers and return them as a string', () => {
        expect(Convert.toUcFirst(123)).toBe('123');
        expect(Convert.toUcFirst(1.23)).toBe('1.23');
        expect(Convert.toUcFirst(0)).toBe('0');
        expect(Convert.toUcFirst(-123)).toBe('-123');
      });
    });

    //Invalid input
    describe('invalid input', () => {
      it('should return an empty string for empty strings', () => {
        expect(Convert.toUcFirst('')).toBe('');
      });
      it('should return an empty string for booleans', () => {
        expect(Convert.toUcFirst(true)).toBe('');
        expect(Convert.toUcFirst(false)).toBe('');
      });
      it('should return an empty string for null', () => {
        expect(Convert.toUcFirst(null)).toBe('');
      });
      it('should return an empty string for undefined', () => {
        expect(Convert.toUcFirst(null)).toBe('');
      });
      it('should return an empty string for objects', () => {
        expect(Convert.toUcFirst({})).toBe('');
      });
      it('should return an empty string for arrays', () => {
        expect(Convert.toUcFirst([])).toBe('');
      });
    });
  });
});

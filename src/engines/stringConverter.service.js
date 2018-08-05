
/**
 * Module definition and dependencies
 */
angular.module('Convert.StringConverter.Service', [])

/**
 * Factory definition
 */
.factory('$stringConverter', function($window) {
  return {

    /**
     * Convert string to snake case
     */
    toSnakeCase(str) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str.replace(/(\s*-*\b\w|[A-Z])/g, ($1) => {
        $1 = $1.trim().toLowerCase().replace('-', '');
        return ($1[0] === '_' ? '' : '_') + $1;
      }).slice(1);
    },

    /**
     * Convert string to camel case
     */
    toCamelCase(str, ucfirst) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str
        .replace(/_+|-+/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
          if (Number(match) === 0) {
            return '';
          }
          return (index === 0 && !ucfirst) ?
            match.toLowerCase() : match.toUpperCase();
        });
    },

    /**
     * Convert string to proper case
     */
    toProperCase(str) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      return str
        .replace(/\w*/g, (match) => {
          return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
        });
    },

    /**
     * Dasherize a string
     */
    toDasherized(str) {
      if (typeof str === 'number') {
        return String(str);
      }
      else if (typeof str !== 'string') {
        return '';
      }
      if ((str = String(str).trim()) === '') {
        return '';
      }
      str = str.replace(/\s\(/, '-(');
      return str.replace(/(\s*-*\b\w|[A-Z]|_[a-z])/g, ($1) => {
        $1 = $1.replace('_', '-').trim().toLowerCase();
        return ($1[0] === '-' ? '' : '-') + $1;
      }).slice(1).replace(/\(-/, '(');
    },

    /**
     * Make the first letter of a string uppercase
     */
    toUcFirst(str) {
      if (typeof str !== 'string' && typeof str !== 'number') {
        return '';
      }
      str = String(str).trim();
      if (str === '') {
        return '';
      }
      return str[0].toUpperCase() + str.substr(1);
    },

    /**
     * Base 64 decode URL string
     */
    fromBase64(str) {
      let o = str.replace('-', '+').replace('_', '/');
      switch (o.length % 4) {
        case 0:
          break;
        case 2:
          o += '==';
          break;
        case 3:
          o += '=';
          break;
        default:
          throw 'Illegal base64 url string';
      }
      try {
        return decodeURIComponent($window.atob(o));
      }
      catch (e) {
        //Fall through
      }
    },
  };
});

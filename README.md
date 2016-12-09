# meanie-angular-convert

[![npm version](https://img.shields.io/npm/v/meanie-angular-convert.svg)](https://www.npmjs.com/package/meanie-angular-convert)
[![node dependencies](https://david-dm.org/meanie/angular-convert.svg)](https://david-dm.org/meanie/angular-convert)
[![github issues](https://img.shields.io/github/issues/meanie/angular-convert.svg)](https://github.com/meanie/angular-convert/issues)
[![codacy](https://img.shields.io/codacy/bfb2443861974cd1a48cc49e5c350155.svg)](https://www.codacy.com/app/meanie/angular-convert)
[![Join the chat at https://gitter.im/meanie/meanie](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/meanie/meanie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An Angular service with various conversion helpers

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `npm`:

```shell
npm install meanie-angular-convert --save
```

Include the script `node_modules/meanie-angular-convert/release/meanie-angular-convert.js` in your build process, or add it via a `<script>` tag to your `index.html`:

```html
<script src="node_modules/meanie-angular-convert/release/meanie-angular-convert.js"></script>
```

Add `Convert.Service` as a dependency for your app.

## Usage

```js
angular.module('App.MyModule').controller('MyController', function($convert) {

  //Convert strings
  var str = $convert.string.toCamelCase('snake_case'); //snakeCase
  var str = $convert.string.toSnakeCase('camelCase'); //camel_case
  var str = $convert.string.toDasherized('snake_and_camelCase'); //snake-and-camel-case
  var str = $convert.string.toUcfirst('lowercase'); //Lowercase

  //Convert object keys
  var obj = $convert.object.keysToCamelCase({snake_case: 1}); //{snakeCase: 1}
  var obj = $convert.object.keysToSnakeCase({camelCase: 1}); //{camel_case: 1}

  //Convert query strings
  var str = $convert.queryString.fromObject({a: 1, b: 2}); //a=1&b=2
  var obj = $convert.queryString.toObject('a=1&b=2'); //{a: 1, b: 2}
});
```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [meanie-angular-convert issue tracker](https://github.com/meanie/angular-convert/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits

* Meanie logo designed by [Quan-Lin Sim](mailto:quan.lin.sim+meanie@gmail.com)

## License

(MIT License)

Copyright 2015-2017, [Adam Reis](http://adam.reis.nz)

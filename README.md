# Meanie - Angular Convert

[![npm version](https://img.shields.io/npm/v/meanie-angular-convert.svg)](https://www.npmjs.com/package/meanie-angular-convert)
[![node dependencies](https://david-dm.org/meanie/angular-convert.svg)](https://david-dm.org/meanie/angular-convert)
[![github issues](https://img.shields.io/github/issues/meanie/angular-convert.svg)](https://github.com/meanie/angular-convert/issues)
[![codacy](https://img.shields.io/codacy/bfb2443861974cd1a48cc49e5c350155.svg)](https://www.codacy.com/app/meanie/angular-convert)
[![Join the chat at https://gitter.im/meanie/meanie](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/meanie/meanie?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An Angular service for [Meanie](https://github.com/meanie/meanie) projects to convert strings, objects and query strings.

## Installation
Install using the [Meanie CLI](https://www.npmjs.com/package/meanie):
```shell
meanie install angular-convert
```

## Usage
Include the service as a dependency and inject it into your modules:
```js
angular.module('App.MyModule', [
  'Utility.Convert.Service'
]).controller('MyController', function($convert) {
  //Use the $convert service
})
```
Use it in your modules:
```js
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
```

## Issues & feature requests
Please report any bugs, issues, suggestions and feature requests in the appropriate issue tracker:
* [Module issue tracker](https://github.com/meanie/angular-convert/issues)
* [Meanie Boilerplate issue tracker](https://github.com/meanie/boilerplate/issues)
* [Meanie CLI issue tracker](https://github.com/meanie/meanie/issues)

## Contributing
If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## License
(MIT License)

Copyright 2015, [Adam Buczynski](http://adambuczynski.com)

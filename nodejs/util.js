var util = require('util');

console.log(util.isArray([1, 2, 3]));
console.log(util.isRegExp(/^hello$/ig));
console.log(util.isDate(new Date()));

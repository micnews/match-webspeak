'use strict';

var charSets = require('./character-sets');
var abbreviations = require('./abbreviations');

function regexpify (string) {
  charSets.forEach(function (chars) {
    var toReplace = new RegExp('\\' + chars.join('|\\'), 'i');
    var replaceWith = '(\\' + chars.join('|\\') + ')?';
    string = string.split(toReplace).join(replaceWith);
  });
  abbreviations.forEach(function (words) {
    var toReplace = new RegExp(words[0], 'i');
    var replaceWith = '(' + words.join('|') + ')';
    string = string.split(toReplace).join(replaceWith);
  });
  return string;
}

module.exports = function (toTest, response) {
  if (!Array.isArray(toTest)) toTest = [toTest];
  var newString = [];
  toTest.forEach(function (option) {
    newString.push('^' + regexpify(option) + '$');
  });
  newString = newString.join('|');
  console.log(newString);
  return new RegExp(newString, 'i').test(response);
};

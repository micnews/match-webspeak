'use strict';

var charsEnd = ['?', '!', '.'];
var charsApostrophe = ['\''];
var charsDivide = ['-', ' '];
var charSets = [charsEnd, charsApostrophe, charsDivide];

function regexpify (string) {
  charSets.forEach(function (chars) {
    var toReplace = new RegExp('\\' + chars.join('|\\'));
    var replaceWith = '(\\' + chars.join('|\\') + ')?';
    string = string.split(toReplace).join(replaceWith);
  });
  return string;
}

module.exports = function (toTest, response) {
  var newString = [];
  if (Array.isArray(toTest)) {
    toTest.forEach(function (option) {
      newString.push('^' + regexpify(option) + '$');
    });
    newString = newString.join('|');
  } else {
    newString.push('^' + regexpify(toTest) + '$');
  }
  return new RegExp(newString, 'i').test(response);
};

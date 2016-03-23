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

module.exports = function (string, response, splitter) {
  var newString = [];
  if (splitter) {
    string.split(splitter).forEach(function (option) {
      newString.push('^' + regexpify(option) + '$');
    });
    newString = newString.join('|');
  } else {
    newString.push('^' + regexpify(string) + '$');
  }
  return new RegExp(newString, 'i').test(response);
};

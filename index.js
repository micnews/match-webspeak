'use strict';

module.exports = function (string, response, splitter) {
  var charsEnd = ['?', '!', '.'];
  var charsApostrophe = ['\''];
  var charsDivide = ['-', ' '];
  var charSets = [charsEnd, charsApostrophe, charsDivide];
  var newString = [];
  if (splitter) {
    string.split(splitter).forEach(function (option) {
      charSets.forEach(function (chars) {
        var toReplace = new RegExp('\\' + chars.join('|\\'));
        var replaceWith = '(\\' + chars.join('|\\') + ')?';
        option = option.split(toReplace).join(replaceWith);
      });
      newString.push('^' + option + '$');
    });
    return new RegExp(newString.join('|'), 'i');
  } else {
    charSets.forEach(function (chars) {
      var toReplace = new RegExp('\\' + chars.join('|\\'));
      var replaceWith = '(\\' + chars.join('|\\') + ')?';
      string = string.split(toReplace).join(replaceWith);
    });
    newString.push('^' + string + '$');
    return new RegExp(newString, 'i').test(response);
  }
};

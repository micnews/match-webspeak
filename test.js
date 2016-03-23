'use strict';

var test = require('tape');
var ok = require('assert').ok;
var match = require('./index');

function testString () {
  ok(arguments.length === 4 || arguments.length === 5, 'you need more/fewer arguments');
  var string = arguments[0];
  var reply = arguments[1];
  var splitter;
  var result;
  var name;
  if (arguments.length === 4) {
    result = arguments[2];
    name = arguments[3];
  } else if (arguments.length === 5) {
    splitter = arguments[2];
    result = arguments[3];
    name = arguments[4];
  }
  name = name || string + ' vs ' + reply + ' should be ' + result;
  test(name, function (t) {
    var expected = result;
    var actual = match(string, reply, splitter);
    t.equal(actual, expected);
    t.end();
  });
}

testString('True!', 'True!', true, 'matches exactly');
testString('True!', 'true!', true, 'is not case sensitive');
testString('True!', 'True', true, 'does not require punctuation');
testString('True!', 'True.', true, 'accepts choices of punctuation (endings)');
testString('True ', 'True-', true, 'accepts choices of punctuation (division)');
testString('That\'s mine!', 'Thats mine!', true, 'accepts lack of apostrophes');
testString('True!', 'Truth!', false, 'does not accept different characters');
testString('True!', 'Trueish!', false, 'does not accept more characters');
testString('True!', 'Tru!', false, 'does not accept fewer characters');

testString('True! | Sure!', 'True!', ' | ', true, 'accepts one response from options');

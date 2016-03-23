'use strict';

var test = require('tape');
var ok = require('assert').ok;
var match = require('./index');

function testString (toTest, reply, result, name) {
  ok(arguments.length === 4, 'you need more/fewer arguments');
  name = name || toTest + ' vs ' + reply + ' should be ' + result;
  test(name, function (t) {
    var expected = result;
    var actual = match(toTest, reply);
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

testString(['True!', 'Sure!'], 'True!', true, 'accepts one response from options');

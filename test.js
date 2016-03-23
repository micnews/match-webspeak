'use strict';

var test = require('tape');
var match = require('./index');

function testString (string, reply, result, name) {
  name = name || string + ' vs ' + reply + ' should be ' + result;
  test(name, function (t) {
    var expected = result;
    var actual = match(string, reply);
    t.equal(actual, expected);
    t.end();
  });
}

testString('True!', 'True!', true, 'matches exactly');
testString('True!', 'true!', true, 'is not case sensitive');
testString('True!', 'True', true, 'does not require punctuation');
testString('True!', 'True.', true, 'accepts choices of punctuation (endings)');
testString('True ', 'True-', true, 'accepts choices of punctuation (division)');
testString('True!', 'Truth!', false, 'does not accept different characters');
testString('True!', 'Trueish!', false, 'does not accept more characters');
testString('True!', 'Tru!', false, 'does not accept fewer characters');

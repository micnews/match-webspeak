'use strict';

var test = require('tape');
var ok = require('assert').ok;
var match = require('./index');

function testString (toTest, replies, result, name) {
  ok(arguments.length === 4, 'you need more/fewer arguments');
  name = name || toTest + ' vs ' + replies + ' should be ' + result;
  if (!Array.isArray(replies)) replies = [replies];
  test(name, function (t) {
    replies.forEach(function (reply) {
      var message = '"' + toTest + '" should ' + (result ? '' : 'not ') + 'match "' + reply + '"';
      result ? t.true(match(toTest, reply), message) : t.false(match(toTest, reply), message);
    });
    t.end();
  });
}

testString('True!', 'True!', true, 'matches exactly');
testString('True!', 'true!', true, 'is not case sensitive');
testString('True!', 'Truth!', false, 'does not accept different characters');
testString('True!', 'Trueish!', false, 'does not accept more characters');
testString('True!', 'Tru!', false, 'does not accept fewer characters');

testString('True!', 'True', true, 'does not require punctuation');
testString('True!', 'True.', true, 'accepts choices of punctuation (endings)');
testString('True ', 'True-', true, 'accepts choices of punctuation (division)');
testString('That\'s mine!', 'Thats mine!', true, 'accepts lack of apostrophes');
testString('That\'s mine!', 'Thats-mine?', true, 'accepts multiple punctiation changes at the same time');

testString('You are okay people.', ['U are okay people.', 'u are okay people.'], true, 'accepts abreviations of "You"');
testString('You are okay people.', 'You r okay people.', true, 'accepts abreviations of "Are"');
testString('You are okay people.', ['You are OK people.', 'You are ok people.', 'You are K people.', 'You are k people.'], true, 'accepts abreviations of "Okay"');
testString('You are okay people.', ['You are okay PPL.', 'You are okay ppl.'], true, 'accepts abreviations of "People"');
testString('You are okay people.', 'u r ok ppl', true, 'accepts multiple abreviations at the same time');
testString('Cake.', 'CaOKAYe.', false, 'does not accept abbreviation matches in the middle of words');

testString(['True!', 'Sure!'], 'True!', true, 'accepts one response from options');
testString(['True!', 'Sure!'], 'No!', false, 'rejects response if not in options');

testString('Oh really?', 'Oh really now?', false, 'can differentiate between "Oh really?" and "Oh really now?"');
testString('Oh really now?', 'Oh really?', false, 'can differentiate between "Oh really now?" and "Oh really?"');

# match-webspeak

Tests properly formatted text against webspeak responses from users.

## Installation

```sh
npm install match-webspeak --save
```

## Usage

```js
var match = require('match-webspeak');

if (match(string, response)) {
  //only do the thing if your punctuated string matches the user's response
}

if (match(array, response)) {
  //only do the thing if one of your punctuated options matches the user's response
}
```

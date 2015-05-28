// Configuration loader for toml.
//
// Edit config.toml to change the configuration.
'use strict';

var fs = require('fs');
var path = require('path');
var toml = require('toml');

try {
  var fileContents = fs.readFileSync(path.join(__dirname, 'config.toml'), {encoding: 'utf-8'});
} catch (e) {
  console.error('Failed to load config.toml file', e);
}

try {
  module.exports = toml.parse(fileContents);
} catch (e) {
  console.error('Failed to parse config.toml file', e);
}

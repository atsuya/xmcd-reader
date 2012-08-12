var underscore = require('underscore');

function Xmcd(lines) {
  this.lines = underscore.extend({}, lines);
}

module.exports = Xmcd;

var underscore = require('underscore');

function Xmcd(lines) {
  this.lines = underscore.extend({}, lines);
}

Xmcd.prototype.artist = function() {
  var target = this.findLines(new RegExp('DTITLE'));
  var values = this.splitArtistAndTitle(target['DTITLE'][0]);
  return values.artist;
};

Xmcd.prototype.findLines = function(regex) {
  var self = this
    , target = [];
  underscore.each(self.lines, function(value, key) {
    if (regex.test(key)) {
      target[key] = self.lines[key];
    }
  });

  return target;
};

Xmcd.prototype.splitArtistAndTitle = function(text) {
  var values = text.split(' / ');
  return { artist: values[0], title: values[1] };
};

module.exports = Xmcd;

var underscore = require('underscore');

var Track = require('./track');

function Xmcd(lines) {
  this.lines = underscore.extend({}, lines);
}

Xmcd.prototype.artist = function() {
  if (!this._artist) {
    var dtitle = this.getDtitle();
    var values = this.splitArtistAndTitle(dtitle);
    this._artist = values.artist;
  }

  return this._artist;
};

Xmcd.prototype.discTitle = function() {
  if (!this._discTitle) {
    var dtitle = this.getDtitle();
    var values = this.splitArtistAndTitle(dtitle);
    this._discTitle = values.title;
  }

  return this._discTitle;
};

Xmcd.prototype.getDtitle = function() {
  var target = this.findLines(new RegExp('DTITLE'));
  return target['DTITLE'][0];
};

Xmcd.prototype.year = function() {
  if (!this._year) {
    var target = this.findLines(new RegExp('DYEAR'));
    this._year = parseInt(target['DYEAR'][0], 10);
  }

  return this._year;
};

Xmcd.prototype.genre = function() {
  if (!this._genre) {
    var target = this.findLines(new RegExp('DGENRE'));
    this._genre = target['DGENRE'][0];
  }

  return this._genre;
};

Xmcd.prototype.tracks = function() {
  if (!this._tracks) {
    this._tracks = this.getTracks();
  }

  return this._tracks;
};

Xmcd.prototype.getTracks = function() {
  var titles = this.getTrackTitles()
    , extendedData = this.getTrackExtendedData();

  var tracks = underscore.map(underscore.range(underscore.size(titles)), function(index) {
    var track = new Track();
    track.number(index);
    track.title(titles[index.toString()]);
    track.extendedData(extendedData[index.toString()]);
    return track;
  });

  return tracks;
};

Xmcd.prototype.getTrackTitles = function() {
  var tracks = {}
    , titles = this.findLines(new RegExp('TITLE\\d+'))
    , numberRegex = new RegExp('TITLE(\\d+)');

  underscore.each(titles, function(value, key) {
    var number = numberRegex.exec(key)[1];
    tracks[number] = value[0];
  });

  return tracks;
};

Xmcd.prototype.getTrackExtendedData = function() {
  var tracks = {}
    , extendedData = this.findLines(new RegExp('EXTT\\d+'))
    , numberRegex = new RegExp('EXTT(\\d+)');

  underscore.each(extendedData, function(value, key) {
    var number = numberRegex.exec(key)[1];
    tracks[number] = value.join('');
  });

  return tracks;
};

Xmcd.prototype.findLines = function(regex) {
  var self = this
    , target = {};
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

Xmcd.prototype.extendedData = function() {
  if (!this._extendedData) {
    var target = this.findLines(new RegExp('EXTD'));
    this._extendedData = target['EXTD'].join('');
  }

  return this._extendedData;
};

Xmcd.prototype.playOrder = function() {
  if (!this._playOrder) {
    var target = this.findLines(new RegExp('PLAYORDER'));
    var playOrder = target['PLAYORDER'][0].trim();
    if (playOrder !== '') {
      var list = playOrder.split(',');
      playOrder = underscore.map(list, function(element) {
        return parseInt(element, 10);
      });
    }
    this._playOrder = playOrder;
  }

  return this._playOrder;
};

Xmcd.prototype.revision = function() {
  if (!this._revision) {
    var target = this.findLines(new RegExp('#'));

    var regex = new RegExp('^Revision:\\s*(\\d+)')
      , revision = null;
    target['#'].forEach(function(line) {
      var cleanedLine = line.trim();
      if (revision === null && cleanedLine.length > 0) {
        var match = regex.exec(cleanedLine);
        if (match !== null) {
          revision = parseInt(match[1], 10);
        }
      }
    });
    this._revision = revision;
  }

  return this._revision;
};

module.exports = Xmcd;

var fs = require('fs')
  , wrench = require('wrench');

var Xmcd = require('./xmcd');

function XmcdReader() {
  this.lines = {};
}

XmcdReader.prototype.parse = function(path, callback) {
  var self = this;
  fs.exists(path, function(exists) {
    if (!exists) {
      return callback(new Error('File does not exist: ' + path));
    } else {
      self._parse(path, callback);
    }
  });
};

XmcdReader.prototype._parse = function(path, callback) {
  this.clearLines();

  var reader = new wrench.LineReader(path)
    , xmcdHeaderChecked = false;

  while(reader.hasNextLine()) {
    var line = reader.getNextLine().trim();
    if (!xmcdHeaderChecked) {
      if (line !== '# xmcd') {
        return callback(new Error('File does not start with xmcd header'));
      }

      xmcdHeaderChecked = true;
    } else {
      var name
        , value;

      if (line.charAt(0) === '#') {
        name = '#';
        value = line.split('#')[1];
      } else {
        var values = line.split('=');
        name = values[0];
        value = values[1];
      }
      this.addLine(name, value);
    }
  }

  return callback(null, new Xmcd(this.lines));
};

XmcdReader.prototype.clearLines = function() {
  this.lines = {};
};

XmcdReader.prototype.addLine = function(name, value) {
  if (!this.lines.hasOwnProperty(name)) {
    this.lines[name] = [];
  }
  this.lines[name].push(value);
};

module.exports = XmcdReader;

function Track() {
}

Track.prototype.number = function(number) {
  if (arguments.length === 1) {
    this._number = number;
  } else {
    return this._number;
  }
};

Track.prototype.title = function(title) {
  if (arguments.length === 1) {
    this._title = title;
  } else {
    return this._title;
  }
};

Track.prototype.extendedData = function(extendedData) {
  if (arguments.length === 1) {
    this._extendedData = extendedData;
  } else {
    return this._extendedData;
  }
};

module.exports = Track;

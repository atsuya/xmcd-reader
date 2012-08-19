xmcd-reader
===========

[![Build
Status](https://secure.travis-ci.org/atsuya/xmcd-reader.png)](http://travis-ci.org/atsuya/xmcd-reader)

XMCD format file reader for node.


install
========
```
$ npm install xmcd-reader
```


examples
========
```
var XmcdReader = require('../lib/xmcd-reader');

var xmcdReader = new XmcdReader();
xmcdReader.parse('test/fixtures/example', function(error, xmcd) {
  console.log('Disc:');
  console.log('\tArtist: %s', xmcd.artist());
  console.log('\tTitle: %s', xmcd.discTitle());

  console.log('Tracks:');
  xmcd.tracks().forEach(function(track) {
    console.log('\t%d: %s', track.number(), track.title());
  });
});
```


Methods
=======

XmcdReader
----------

### Constructor

Creates a new instance of XmcdReader.

### #parse(pathToTheXmcdFile, callback)

Parses an xmcd file. ``callback`` takes ``error`` and ``xmcd`` parameters,
which is an Error object and Xmcd object respectively.

Xmcd
----

### #artist()

Returns a disc artist.

### #discTitle()

Returns a disc title.

### #year()

Returns a year.

### #genre()

Returns a genre.

### #tracks()

Returns a list of tracks. An element of the list is ``Track`` object.

### #extendedData()

Returns a disc extended data.

### #playOrder()

Returns a play order.

### #revision()

Returns a revision.

Track
-----

### #number()

Returns a track number.

### #title()

Returns a track title.

### #extendedData()

Returns a track extended data.


License
========

MIT

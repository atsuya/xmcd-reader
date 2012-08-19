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

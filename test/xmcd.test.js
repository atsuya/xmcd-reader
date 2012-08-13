var path = require('path');

var helper = require('./support/helper')
  , XmcdReader = require('../lib/xmcd-reader');

describe('Xmcd', function() {
  var reader
    , xmcd;

  before(function(done) {
    reader = new XmcdReader();
    reader.parse('test/fixtures/example', function(error, data) {
      if (error) {
        throw error;
      }
      xmcd = data;
      done();
    });
  });

  describe('#artist', function() {
    it('returns an artist', function(done) {
      xmcd.artist().should.eql('Unko Man');
      done();
    });
  });

  describe('#discTitle', function() {
    it('returns a disc title', function(done) {
      xmcd.discTitle().should.eql('うんこの唄');
      done();
    });
  });

  describe('#year', function() {
    it('returns a year', function(done) {
      xmcd.year().should.eql(2012);
      done();
    });
  });

  describe('#genre', function() {
    it('returns a genre', function(done) {
      xmcd.genre().should.eql('Pop');
      done();
    });
  });

  describe('#tracks', function() {
    it('returns tracks', function(done) {
      var tracks = xmcd.tracks();

      tracks[0].title().should.eql('まじうま');
      tracks[1].title().should.eql('レア');
      tracks[2].title().should.eql("That's Mine");
      tracks[3].title().should.eql("That's Yours");
      tracks[4].title().should.eql('さようなら');
      tracks[5].title().should.eql('また逢えたね');
      tracks[6].title().should.eql('食し方');
      tracks[7].title().should.eql('煮物');
      tracks[8].title().should.eql('揚げ物');
      tracks[9].title().should.eql('ムニエル');
      tracks[10].title().should.eql('和え物');
      tracks[11].title().should.eql('感染');

      tracks[0].extendedData().should.eql('');
      tracks[1].extendedData().should.eql('');
      tracks[2].extendedData().should.eql('');
      tracks[3].extendedData().should.eql('');
      tracks[4].extendedData().should.eql('');
      tracks[5].extendedData().should.eql('複数の行にまたがる情報です');
      tracks[6].extendedData().should.eql('');
      tracks[7].extendedData().should.eql('');
      tracks[8].extendedData().should.eql('');
      tracks[9].extendedData().should.eql('特別な情報');
      tracks[10].extendedData().should.eql('');
      tracks[11].extendedData().should.eql('');

      done();
    });
  });

  describe('#extendedData', function() {
    it('returns an extended data', function(done) {
      xmcd.extendedData().should.eql('extended dataのテスト');
      done();
    });
  });

  describe('#playOrder', function() {
    it('returns a play order', function(done) {
      xmcd.playOrder().should.eql('');
    });
  });

  describe('#revision', function() {
    it('returns a revision', function(done) {
      xmcd.revision().should.eql(1);
    });
  });
});

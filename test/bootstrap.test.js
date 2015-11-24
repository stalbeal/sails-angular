var Sails = require('sails'),
  sails;

before(function(done) {
  this.timeout(50000);

  Sails.lift({
  }, function(err, server) {
    sails = server;
    if (err) return done(err);    
    done(err, sails);
  });
});

after(function(done) {
  Sails.lower(done);
});
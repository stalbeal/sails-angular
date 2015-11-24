describe('User', function() {

  describe('#find()', function() {
      it('should check find function', 
        function(done) {
          User.find()
          .then(function(results) {
            console.log('Se encontraron ' 
            +results.length+' registros');
            done();
          })
          .catch(done);
      });
  });

});
var request = require('supertest');

describe('UserController', function() {

describe('#post', function() {
    it('post should response status 201', function(done) {
        request(sails.hooks.http.app)
            .post('/user/post')
            .send({
                fullName: 'test',
                email: 'testt@test.com',
                mobile: '5',
                username: 'testtt',
                password: 'testte1',
                passwordConfirmation: 'testte1'
            })
            .expect(201)
			.end(function (err, res) {
            	if (err) return done(err);            	
            	var json = JSON.stringify(eval("(" +res.text+ ")"));
            	console.log('La respuesta del servidor es: '+json);
                done();
            });
    })
    }),
	describe('#put', function() {
    it('put should response status 200', function(done) {

        request(sails.hooks.http.app)
            .post('/user/put')
            .send({
            	id:'562ed6cd536ace110fdc05cf',
                fullName: 'UpdateTest',
                email: 'UpdateTest@test.com',
                mobile: '5',
                username: 'UpdateTest',
                password: 'UpdateTest',
                passwordConfirmation: 'UpdateTest'
            })
            .expect(200)
			.end(function (err, res) {
            	if (err) return done(err);            	
            	var json = JSON.stringify(eval("(" +res.text+ ")"));
            	console.log('La respuesta del servidor es: '+json);
                done();
            });
        })
    }),
    describe('#get', function() {
    it('get should response status 200', function(done) {

        request(sails.hooks.http.app)
            .post('/user/get')
            .send({
                id:'562ed6cd536ace110fdc05cf'
            })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);              
                var json = JSON.stringify(eval("(" +res.text+ ")"));
                console.log('La respuesta del servidor es: '+json);
                done();
            });
        })
    }),
    describe('#getAll', function() {
    it('getAll should response status 200', function(done) {

        request(sails.hooks.http.app)
            .post('/user/getAll')
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);              
                var json = JSON.stringify(eval("(" +res.text+ ")"));
                console.log('La respuesta del servidor es: '+json);
                done();
            });
        })
    })

});
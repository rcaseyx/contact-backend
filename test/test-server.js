const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');
const {PORT} = require('../config');

chai.use(chaiHttp);

describe('Contact API', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {
        it('Should return 200', function() {
            return chai.request(app)
              .get('/contact')
              .then(function(res) {
                  expect(res).to.have.status(200);
              });
        });
    });
});

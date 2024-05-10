const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // Make sure this exports an Express app instance
chai.use(chaiHttp);
chai.should();

describe('GET /', () => {
    let server;

    // Start the server before running any tests
    before(done => {
        server = app.listen(3000, done); // Start your server on a free port (avoid hardcoding if possible in real scenarios)
    });

    // Stop the server after all tests are done
    after(done => {
        server.close(done);
    });

    it('should return Hello World', done => {
        chai.request(server) // Use the server instance instead of 'app'
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('Hello World!');
                done();
            });
    });
});

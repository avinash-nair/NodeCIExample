const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');  // Adjust path as necessary

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', function () {
  let server;

  beforeEach(function (done) {
    const port = process.env.TEST_PORT || 3000; // Use a different port for testing if specified
    server = app.listen(port, done);
  });

  afterEach(function (done) {
    server.close(done);
  });

  it('should return Hello World', function (done) {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello World!');
          done();
        });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');  // Ensure this path correctly points to your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', function () {
  let server;
  let port = process.env.TEST_PORT || 3000; // Use the environment variable or default to 3000

  beforeEach(function (done) {
    server = app.listen(port, done);
  });

  afterEach(function (done) {
    // Check if the server is running before trying to close it
    if (server.listening) {
      server.close(done);
    } else {
      done(); // If the server is not running, just complete the hook without doing anything
    }
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

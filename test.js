const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
chai.use(chaiHttp);
chai.should();

describe('GET /', () => {
    it('should return Hello World', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('Hello World!');
                done();
            });
    });
});

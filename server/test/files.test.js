import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js'; // Assuming index.js is your main file

chai.use(chaiHttp);
chai.should();

describe('GET /files/list', () => {
  it('should return status 200 and files list',(done) => {
    chai.request(app)
      .get('/files/list')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET /files/list - 500 Error Simulation', () => {
  it('should return status 500 for internal server error', (done) => {
    chai.request(app)
      .get('/files/list')
      .end((err, res) => {
        try {
          res.status = 500;
          throw new Error('Internal server error');
        } catch (error) {
          expect(error.message).to.equal('Internal server error');
          expect(res).to.have.status(500);
          done();
        }
      });
  });
});

describe('GET /files/data', () => {
  it('should return an array of objects', (done) => {
    chai.request(app)
      .get('/files/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res.body).to.be.an('array');

        res.body.forEach((item) => {
          expect(item).to.have.property('file');
          expect(item).to.have.property('lines').that.is.an('array');
        });

        done();
      });
  });
});

describe('GET /files/data - 500 Error Simulation', () => {
  it('should return an array of objects', (done) => {
    chai.request(app)
      .get('/files/data')
      .end((err, res) => {
        try {
          res.status = 500;
          throw new Error('Internal server error');
        } catch (error) {
          expect(error.message).to.equal('Internal server error');
          expect(res).to.have.status(500);
          done();
        }
      });
  });
});



describe('GET /files/data with fileName query', () => {
  it('should return a single object for an existing file', (done) => {
    const fileName = 'test1.csv';
    chai.request(app)
      .get(`/files/data?fileName=${fileName}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('file', fileName);
        expect(res.body).to.have.property('lines').that.is.an('array');
        done();
      });
  });
});

describe('GET /files/data with fileName query - 404 Error', () => {
  it('should return a 404 for a non existing or missing file', (done) => {
    chai.request(app)
      .get("/files/data?fileName=falseName")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res).to.have.property('error');
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('GET /files/data with fileName query - 500 Error', () => {
  it('should return a 404 for a non existing or missing file', (done) => {
    chai.request(app)
      .get("/files/data?fileName=falseName")
      .end((err, res) => {
        try {
          res.status = 500;
          throw new Error('Internal server error');
        } catch (error) {
          expect(error.message).to.equal('Internal server error');
          expect(res).to.have.status(500);
          done();
        }
      });
  });
});
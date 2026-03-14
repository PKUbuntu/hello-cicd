const { createServer } = require('./index');

describe('Hello World Server', () => {
  let server;

  beforeEach(() => {
    server = createServer();
  });

  afterEach((done) => {
    server.close(done);
  });

  test('GET / should return Hello World', (done) => {
    server.listen(0, () => {
      const { port } = server.address();
      
      const req = require('http').request({
        hostname: 'localhost',
        port,
        path: '/',
        method: 'GET'
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          expect(res.statusCode).toBe(200);
          const body = JSON.parse(data);
          expect(body.message).toBe('Hello World');
          expect(body).toHaveProperty('version');
          expect(body).toHaveProperty('timestamp');
          done();
        });
      });
      req.end();
    });
  });

  test('GET /health should return ok', (done) => {
    server.listen(0, () => {
      const { port } = server.address();
      
      const req = require('http').request({
        hostname: 'localhost',
        port,
        path: '/health',
        method: 'GET'
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          expect(res.statusCode).toBe(200);
          const body = JSON.parse(data);
          expect(body.status).toBe('ok');
          done();
        });
      });
      req.end();
    });
  });

  test('GET /unknown should return 404', (done) => {
    server.listen(0, () => {
      const { port } = server.address();
      
      const req = require('http').request({
        hostname: 'localhost',
        port,
        path: '/unknown',
        method: 'GET'
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          expect(res.statusCode).toBe(404);
          const body = JSON.parse(data);
          expect(body.error).toBe('Not Found');
          done();
        });
      });
      req.end();
    });
  });
});
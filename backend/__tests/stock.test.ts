import request from 'supertest';
import app from '../src/app';

describe('Stock API Test', () => {
  test('GET /stock/all should return 200', done => {
    request(app).get('/stock/all').expect(200, done);
  });
});

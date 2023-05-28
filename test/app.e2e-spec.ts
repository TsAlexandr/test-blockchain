import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestsApp } from './test-config/testing-app';

describe('e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getTestsApp();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Balances', () => {
    it('/get balance with web3', async () => {
      return request(app.getHttpServer())
        .get('/balance')
        .query({
          network: 'WEB3',
          address: '0x61Dd481A114A2E761c554B641742C973867899D3',
        })
        .expect(200);
    });
    it('/get balance with ether', async () => {
      return request(app.getHttpServer())
        .get('/balance')
        .query({
          network: 'ethers',
          address: '0x61Dd481A114A2E761c554B641742C973867899D3',
        })
        .expect(200);
    });
    it('/get balance without query params', async () => {
      return request(app.getHttpServer()).get('/balance').expect(400);
    });
    it('/get balance with incorrect network', async () => {
      return request(app.getHttpServer())
        .get('/balance')
        .query({
          network: 'bla-bla',
          address: '0x61Dd481A114A2E761c554B641742C973867899D3',
        })
        .expect(400);
    });
    it('/get balance with incorrect address', async () => {
      return request(app.getHttpServer())
        .get('/balance')
        .query({
          network: 'ether',
          address: 8111427615546417429738678993,
        })
        .expect(400);
    });
  });
});

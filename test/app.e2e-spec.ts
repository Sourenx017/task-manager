import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Iniciar sesión y obtener token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'adminPassword123' });
    authToken = loginResponse.body.access_token;
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Implementar autorización',
        teamId: '507f1f77bcf86cd799439011',
      })
      .expect(201);
  });
});

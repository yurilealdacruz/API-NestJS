import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { authRegisterDTO } from '../src/testing/auth.register.dto.mock';
import { Role } from '../src/enums/role.enum';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar um novo Usuário: ', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTO);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('Realizar o Login: ', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTO.email,
        password: authRegisterDTO.password,
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Obter Dados do Usuário Logado: : ', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `barrer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);
  });

  it('Registrar um novo Usuário como Administrador: ', async () => {
    console.log('authRegisterDTO:', {
      ...authRegisterDTO,
      role: Role.Admin,
      email: 'teste@testet.com',
    });

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...authRegisterDTO,
        role: Role.Admin,
        email: 'teste@testet.com',
      });

    console.log('Response:', response.body);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');

    accessToken = response.body.accessToken;
  });

  it('Validar se o usuário ainda é user: ', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `barrer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.User);

    userId = response.body.id;
  });

  it('Tentar vizualizar todo os usuários:  ', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `barrer ${accessToken}`)
      .send();

    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Alterando de forma manual o usuário para Admin: ', async () => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(`
      UPDATE users SET role = ${Role.Admin} WHERE id = ${userId};
    `);

    const rows = await queryRunner.query(
      `SELECT * FROM users WHERE id = ${userId};`,
    );
    console.log('Updated User:', rows);

    ds.destroy();

    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.Admin);
  });

  it('Tentar vizualizar todos os usuário (COM ACESSO DE ADMIN):  ', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `barrer ${accessToken}`)
      .send();

    console.log('Users:', response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});

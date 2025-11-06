import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import app from './testCreatedServer.js';

describe('API Express + Supertest', () => {

  it('Test pino logger /contacts doit retourner hello world', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('hello world');
  });
  
  it('GET /contacts doit retourner un tableau', async () => {
    const res = await request(app).get('/contacts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /contacts/:id doit retourner un contact spécifique', async () => {
    const res = await request(app).get('/contacts/1');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id', 1);
  });

  it('POST /contacts doit ajouter un nouveau contact', async () => {
    const body = {
      nom: 'Shanks Leox',
      telephone: '+33 6 55 66 77 88'
    };

    const res = await request(app)
      .post('/contacts')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);

    const createdContact = res.body.at(-1);
    expect(createdContact.nom).toBe(body.nom);

    const res2 = await request(app).get(`/contacts/${createdContact.id}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body[0].nom).toBe(body.nom);
  });

  it('DELETE /contacts/:id doit supprimer le contact', async () => {
    const res = await request(app).delete(`/contacts/6`);
    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/contacts/6`);
    expect(res2.statusCode).toBe(404);
  });
});

afterAll(() => {
  console.log('✅ Tests terminés.');
});
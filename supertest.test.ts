import { describe, it, expect } from 'vitest';
import request from 'supertest';
import server from './testCreatedServer';


describe('API en vanilla Node + Supertest', () => {
  it('GET /hello doit retourner un message', async () => {
    const res = await request(server).get('/contacts');
    expect(res.statusCode).toBe(200);
  });

  it('GET by ID', async () => {
    const res = await request(server).get('/contacts/1');
    expect(res.statusCode).toBe(200);
  });

  it('POST /echo doit renvoyer le JSON envoyé', async () => {
    const body = {
    "nom": "Shanks Leox",
    "telephone": "+33 6 55 66 77 88"
  };
    const res = await request(server)
      .post('/contacts')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    const res2 = await request(server).get('/contacts/6');
    expect(res2.statusCode).toBe(200);
    //expect(res.body).toEqual({ youSent: body });
  });

  it('DELETE /contacts/:id doit supprimer le contact', async () => {
    const res = await request(server).delete('/contacts/6');
    expect(res.statusCode).toBe(204);
    const res2 = await request(server).get('/contacts/6');
    expect(res2.statusCode).toBe(404);
});

});

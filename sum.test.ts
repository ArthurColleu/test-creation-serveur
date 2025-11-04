function sum(a: number, b: number) {
  return a + b;
}

import { expect, test } from "vitest";

test("Récupérer quoi ? feur XD", async () => {
  const reponse = await fetch("http://localhost:8000/contacts");
  expect(reponse.status).toBe(200);
  expect(await reponse.json()).toEqual([
    {
      id: 1,
      nom: "Alice Dupont",
      telephone: "+33 6 12 34 56 78",
    },
    {
      id: 2,
      nom: "Bruno Martin",
      telephone: "+33 7 98 76 54 32",
    },
    {
      id: 3,
      nom: "Claire Bernard",
      telephone: "+33 6 23 45 67 89",
    },
    {
      id: 4,
      nom: "David Moreau",
      telephone: "+33 7 11 22 33 44",
    },
    {
      id: 5,
      nom: "Emma Leroy",
      telephone: "+33 6 55 66 77 88",
    },
  ]);
});

test("Récuperer l'id 1", async () => {
  const reponse = await fetch("http://localhost:8000/contacts/1");
  expect(await reponse.json()).toEqual({
    id: 1,
    nom: "Alice Dupont",
    telephone: "+33 6 12 34 56 78",
  });
  expect(reponse.status).toBe(200);
});
test("DELETE id:1", async () => {
  // Créer un utilisateur id:6
  const response = await fetch("http://localhost:8000/contacts");
  expect(response.status).toBe(201);
  expect(await response.json()).toEqual([
    {
      id: 1,
      nom: "Alice Dupont",
      telephone: "+33 6 12 34 56 78",
    },
    {
      id: 2,
      nom: "Bruno Martin",
      telephone: "+33 7 98 76 54 32",
    },
    {
      id: 3,
      nom: "Claire Bernard",
      telephone: "+33 6 23 45 67 89",
    },
    {
      id: 4,
      nom: "David Moreau",
      telephone: "+33 7 11 22 33 44",
    },
    {
      id: 5,
      nom: "Emma Leroy",
      telephone: "+33 6 55 66 77 88",
    },
    {
      id: 6,
      nom: "Jean Jean",
      telephone: "+33 7 85 23 69 58",
    },
  ]);

  //Supprimer id:6
  const reponse = await fetch("http://localhost:8000/contacts/6");
  expect(reponse.status).toBe(204);
  expect(await reponse.json()).toEqual([
    {
      id: 1,
      nom: "Alice Dupont",
      telephone: "+33 6 12 34 56 78",
    },
    {
      id: 2,
      nom: "Bruno Martin",
      telephone: "+33 7 98 76 54 32",
    },
    {
      id: 3,
      nom: "Claire Bernard",
      telephone: "+33 6 23 45 67 89",
    },
    {
      id: 4,
      nom: "David Moreau",
      telephone: "+33 7 11 22 33 44",
    },
    {
      id: 5,
      nom: "Emma Leroy",
      telephone: "+33 6 55 66 77 88",
    },
  ]);
});
test("PUT", async () => {
  const reponse = await fetch("http://localhost:8000/contacts/1");
  expect(reponse.status).toContain([204, 201]);
  expect(await reponse.json()).toEqual({
    id: 1,
    nom: "Jean Du Jardin",
    telephone: "+33 6 12 34 56 78",
  });
});

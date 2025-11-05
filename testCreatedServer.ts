import express from 'express';
import fs from 'fs';
import contacts from './contacts.json';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/contacts', (req, res) => {
  res.status(200).json(contacts);
});

app.get('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(200).json([contact]);
});

app.post('/contacts', (req, res) => {

  const newContact = req.body;

  if (!newContact || !newContact.nom) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  newContact.id = contacts.length + 1;
  app.get('/contacts', (req, res) => {
    const idExists = contacts.some(c => c.id === newContact.id);
    if (idExists) {
      return res.status(409).json({ error: 'Conflict: ID already exists' });
    }
    res.status(200).json(contacts);
  });


  contacts.push(newContact);

  fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));

  res.status(201).json(contacts);
});

app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = contacts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  contacts.splice(index, 1);
  fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));

  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}
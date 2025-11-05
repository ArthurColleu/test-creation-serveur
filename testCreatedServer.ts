import http from 'http';
import contacts from './contacts.json';
import writeDataToFile from 'util';
import fs from 'fs';

const server = http.createServer((req, res) => {
    // Définir le header de réponse
    res.setHeader('Content-Type', 'application/json');

    // Redirection de /contacts/ vers /contacts
    if(req.url === '/contacts/'){
        res.writeHead(301, { 'Location': '/contacts' });
        res.end();
        return;
    }
    // Route pour ajouter un nouveau contact
    if (req.url === '/contacts') {
        // Route pour tous les contacts
        if ( req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify(contacts));
            return;
        } else if (req.method === 'POST') {
            //Récupére le body de la requête contenant le nouveau contact
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const newContact = JSON.parse(body);
                newContact.id = contacts.length + 1;
                contacts.push(newContact);
                fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2));
                res.writeHead(201);
                res.end(JSON.stringify(contacts));
            });
            return;
        } else {
            res.writeHead(405);
            res.end(JSON.stringify({ error: 'Method Not Allowed' }));
            return;
        }
    }
    
    
    // Route pour un contact spécifique : /contacts/1 par exemple
    const contactIdMatch = req.url ? req.url.match(/^\/contacts\/(\d+)$/) : null;

    if (contactIdMatch) {
        const id = parseInt(contactIdMatch[1], 10);
        const contact = contacts.find(c => c.id === id);

        if (contact) {
            res.writeHead(200);
            res.end(JSON.stringify(contact));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Contact not found' }));
        }
        return;
    }

    // Si aucune route ne correspond
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(8000);

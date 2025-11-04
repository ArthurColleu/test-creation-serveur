import http from 'http';
import contacts from './contacts.json';
import writeDataToFile from 'util';

const server = http.createServer((req, res) => {
    // Définir le header de réponse
    res.setHeader('Content-Type', 'application/json');

    // Route pour tous les contacts
    if (req.url === '/contacts' || req.url === '/') {
        res.writeHead(200);
        res.end(JSON.stringify(contacts));
        return;
    }
    // Redirection de /contacts/ vers /contacts
    if(req.url === '/contacts/'){
        res.writeHead(301, { 'Location': '/contacts' });
        res.end();
        return;
    }
    // Route pour ajouter un nouveau contact
    
    
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

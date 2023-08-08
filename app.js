const path = require('node:path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const notes = require('./assets/data.js');

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  // console.log(id);
  // console.log(notes);
  const note = notes.module.find(note => note.id === id);
  // console.log(note);
  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const notesDelete = notes.module.filter(note => note.id !== id)
  // console.log(notesDelete);
  // response.json(notesDelete);

  response.status(204).end()
});

app.post('/api/notes', (request, response) => {
  const note = request.body
  
  const maxId = notes.module.length > 0
  ? Math.max(...notes.module.map(n => n.id)) 
  : 0
  
  note.id = maxId + 1;

  const notesPost = notes.module.concat(note)
  // console.log(note)
  
  // response.send('Got a POST request');
  response.json(notesPost)
});

const HOST = "localhost";
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  // console.log(__dirname + "/public");
  // console.log(path.join(__dirname, "public"));
});
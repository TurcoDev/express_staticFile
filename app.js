const path = require('node:path');
const express = require('express');
const app = express();
const notes = require('./assets/data.js');

app.use(express.static(path.join(__dirname, "public")));

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

const HOST = "localhost";
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  // console.log(__dirname + "/public");
  // console.log(path.join(__dirname, "public"));
});
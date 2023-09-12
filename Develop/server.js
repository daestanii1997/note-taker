const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index.js');
const db = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// should read db and return notes as json
app.get('/api/notes', (req, res) =>
    res.json(db)
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    // should receive new note to save on req body add to db file and return new note to client.
    // give each note a unique id when its saved(look at npm packages to automatically do this)
    
    const { noteTitle, noteText } = req.body;

    if (noteTitle && noteText) {
        const newNote = {
            noteTitle,
            noteText,
        };
        // read file then...
        // convert response to json format to add to db file
        db.push(newNote)
        // then convert back
        // writefile
        const response = {
            status: 'success',
            body: newNote,
          };
    }

    console.log(response);
    res.status(201).json(response);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

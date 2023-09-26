const express = require("express");
const path = require("path");
const fs = require("fs");

const noteRecord = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});


app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a review`);
  // should receive new note to save on req body add to db file and return new note to client.
  // give each note a unique id when its saved(look at npm packages to automatically do this)
  
  const { title, text } = req.body;
  
  // console.log(noteTitle);
  console.log(title, text);
  
  if (title && text) {
    const newNote = {
      title,
      text,
      //   note_id: uuid(),
    };
    
    // read file then...
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        // return;
      } else {
        
        // convert response to json format to add to db file
        const parsedNotes = JSON.parse(data);
        
        parsedNotes.push(newNote);
        
        // then convert back
        // writefile
        fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("note updated!");
          }
        });
      }
    });
    
    const response = {
      status: "success",
      body: newNote,
    };
    
    console.log(response);
    res.status(201).json(noteRecord);
    
  } else {
    res.status(500).json("Error in posting review");
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);

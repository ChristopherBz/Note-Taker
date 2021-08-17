// Dependencies
const notesRouter = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile} = require("../helpers/fsUtils.js"); //Get helper functions from helpers/fsUtils.js to access file system

 
// GET Route for notes from json file
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
    .catch((err) => console.error(err))
});

//Post Route to append to notes.html
notesRouter.post('/', (req, res) => {
    const {title, text} = req.body;
    
    if(title && text){
        const newNote = {
            id: uuidv4(),
            title,
            text,
            status: "success"
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added`)
        
    } else {
        res.error("Error")
    }
});

// Delete Route note using id
notesRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const updatedNotes = json.filter((note) => note.id !== id);
        writeToFile('./db/db.json', updatedNotes);
        res.json(`Item ${id} deleted`);
    });
}); 

module.exports = notesRouter;
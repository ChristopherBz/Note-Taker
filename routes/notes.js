// Dependencies
const notesRouter = require("express").Router();
const { v4: uuidv4 } = require('uuid'); //To generate a unique note id
const {
    readFromFile,
    readAndAppend,
    writeToFile
} = require("../helpers/fsUtils.js"); //Get helper functions from helpers/fsUtils.js to access file system

 
// GET Route for retrieving all the notes from json file
notesRouter.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data))
    })
    .catch((err) => console.error(err))
});

//Post Route to add note to json file and append to notes.html
notesRouter.post('/', (req, res) => {
    // console.log(req.body)
    const {title, text} = req.body;
    
    if(title && text){
        const newNote = {
            id: uuidv4(),
            title,
            text,
            status: "success"
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Note has been added succesfully!`)
        
    } else {
        res.error("Error")
    }
});

// Delete Route for note with specific id
notesRouter.delete('/:id', (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    
    //Read file and get notes from json file
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const updatedNotes = json.filter((note) => note.id !== id);
        // Save that array to the filesystem
        writeToFile('./db/db.json', updatedNotes);
        // Respond to the DELETE request
        res.json(`Item ${id} has been deleted 🗑️`);
        console.log(`Note with the id of ${id} has been deleted!🗑️`)
    });
}); 

module.exports = notesRouter;
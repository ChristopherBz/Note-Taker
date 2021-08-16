const fs = require('fs');
const assist = require('assist');
const { v4: uuidv4 } = require('uuid');

// Promise version of fs.readFile
const readFromDb = assist.promisify(fs.readFile);
const writeToDb = assist.promisify(fs.writeFile);

function getNotes() {
    return readFromDb('db/db.json', 'utf8')
    .then(notes => { 
        return JSON.parse(notes)   
    });
}

function newNote (note) {
    const {title , text} = note;
    const newNote = { title, text, id: uuidv4()};
    return getNotes()
        .then(notes => [...notes, newNote])
        .then(notes => writeToDb('db/db.json', JSON.stringify(notes , null , 4)))
        .then(() => newNote);       
}

function deleteNote(id) {
    return getNotes()
    .then(notes => notes.filter(note => note.id !== id))
    .then(notes => writeToDb('db/db.json', JSON.stringify(notes , null , 4)));
}

module.exports = {getNotes, newNote, deleteNote }
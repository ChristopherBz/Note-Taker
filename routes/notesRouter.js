// Dependencies
const notes = require('express').Router();
const fs = require('fs');
const assist = require('../helpers/assist');

// GET
notes.get('/notes', (req, res)=> {
  assist.getNotes()
    .then(notes => res.json(notes))    
})   

// POST 
notes.post('/notes', (req, res) => {
  assist.newNote(req.body)
      .then((note) => res.json(note))      
});

// DELETE 
notes.delete('/notes/:id',  (req, res) => {
  assist.deleteNote(req.params.id)
      .then(() => res.json({ ok: true }))
});

module.exports = notes;
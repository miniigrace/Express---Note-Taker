const router = require('express').Router();
const path = require("path");
const fs = require('fs')

function getNote(){

const rawdata = fs.readFileSync(path.join(__dirname, "../db/db.json"));
const parsed = JSON.parse(rawdata);
return parsed
}

router.get('/notes', (req, res)=>{ 

res.json(getNote())

})

function addNote(newNote){
const {title, text} = newNote;
const id = Math.random().toString()
const note = {title, text, id};
const rawdata = fs.readFileSync(path.join(__dirname, "../db/db.json"));
const parsed = JSON.parse(rawdata);
parsed.push(note);
fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(parsed, null, 4));
return note
}

function deleteNote(id){
//const {title, text} = newNote;
//const id = Math.random()
//const note = {title, text, id};
const rawdata = fs.readFileSync(path.join(__dirname, "../db/db.json"));
let parsed = JSON.parse(rawdata);
let newParsed = parsed.filter(note => note.id !== id );
fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(newParsed, null, 4));

}

router.post('/notes', (req, res)=>{ 

res.json(addNote(req.body))

})

router.delete('/notes/:id', (req, res)=>{ 

res.json(deleteNote(req.params.id))

})

module.exports = router
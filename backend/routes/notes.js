const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middlewares/fetchuser')

// ROUTE 1: get all notes...
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.id })
        res.json(notes)

    } catch (err) {
        // console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

//ROUTE 2: create new note...
router.post("/addnote", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const note = new Notes({ user: req.id, title, description, tag })
        const savedNote = await note.save()
        res.status(200).json(savedNote)

    } catch (err) {
        // console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 3: update note...
router.put("/updatenote/:id", fetchuser , async(req, res) => {
    try {
        const {title, description, tag} = req.body
        const note = await Notes.findById(req.params.id)
        if(!note){
            res.status(404).send("Note not found")
        }

        if(note.user.toString() !== req.id){
            res.status(400).send("You can only update your own note")
        }

        // const newNotes = await Notes.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        const newNotes = await Notes.findByIdAndUpdate(req.params.id, {$set: {title, description, tag}}, {new: true})
        res.status(200).send(newNotes)

    } catch (err) {
        // console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 4: delete note...
router.delete("/deletenote/:id", fetchuser, async(req, res) =>{
    try {
        const note = await Notes.findById(req.params.id)
        if(!note){
            res.status(404).send("note not found")
        }
        
        if(note.user.toString() !== req.id){
            res.status(401).send("You can only delete your own notes")
        }
        const delNote = await Notes.findByIdAndDelete(req.params.id)
        res.status(200).send({message: "Note has been succesfully deleted", delNote})
        
    } catch (err) {
        // console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router

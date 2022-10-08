const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const { getByTitle } = require('@testing-library/react');


// Route 1 : Fetching notes from database

router.get('/fetchAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": "API Internal Error" })
    }
})

// Route 2 : Adding Notes from database but in this only login person can see there data , no one else can see there data

router.post('/addnote', fetchuser,
    [body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body
        try {
            const addNote = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await addNote.save();
            res.send(saveNote)
        } catch (error) {
            return res.status(400).json({ errors: errors.array() });
        }

    })


// Route-3: Udating an existing note in database

router.put('/updateNote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {


        //Creating a new note object

        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and updating it

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send({ note })
    } catch (error) {
        res.status(500).json({ "error": "API Internal Error" })

    }
})

// Route-4: Deleting an existing note in database by using api

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {

        // Find the note to be updated and updating it

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // Finding the correct login user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.send({ "Success": "Note has been deleted" })

    } catch (error) {
        res.status(500).json({ "error": "API Internal Error" })
    }
})
module.exports = router
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { validationResult } = require("express-validator");
const Note = require("../models/Notes");
const { body } = require("express-validator");

//ROUTE 1: Get All the notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try{
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Add the notes to the database: POST "api/notes/addnotes". Login required
//In this after the fetch user we will make an array and init we will check our requirments
router.post("/addnotes", fetchuser,[
    body("title", "Enter the title having the length more than 3").isLength({min:3}),
    body("description","Enter the description having the length more than 5").isLength({min: 5}),
  ], async (req, res) => {
    try{
    const {title, description, tag}=req.body;
    //If there is an error than show bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors : errors.array()})
    }
    const note=new Note({
        title, description, tag, user: req.user.id
    })
    const savedNote=await note.save();
    res.json(savedNote);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

//ROUTE 3: Update an exisiting note using : PUT "api/auth/updatenote". Login required
    router.put("/updatenote/:id", fetchuser, async (req, res)=>{
        const {title, description, tag}=req.body;
        //Create the new note object
        const newNote ={};
        if(title){newNote.title =title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag}
        //Find the note to be updated anf find it
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note=await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});
    }) 
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router
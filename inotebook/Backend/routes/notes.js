const express = require("express");
const router = express.Router();
const fetchuser = require("../MiddleWare/fetchuser");
const Note = require("../Models/Note");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

// Route 1 : Get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route 2 : Add a new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("tag", "Enter a valid tag").isLength({min:3}),
    body("description", "Enter a valid discriptioon").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Adding data to notes :
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Updating the note 

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a new note object
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
          return res.status(404).send("Note not found!");
      }

      // Checking if the user owns the note
      if (note.user.toString() !== req.user.id) {
          return res.status(403).send("Not allowed");
      }

      // Update the note
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

      res.json(note);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});

//Route 4 : Deleting a note

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  try {
      // Find the note to be updated and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
          return res.status(404).send("Note not found!");
      }

      // Checking if the user owns the note
      if (note.user.toString() !== req.user.id) {
          return res.status(403).send("Not allowed");
      }

      // Delete the note
      note = await Note.findByIdAndDelete(req.params.id);

      res.json({"Success": "Note has been deleted"});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

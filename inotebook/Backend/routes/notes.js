const express = require("express");
const router = express.Router();
const fetchuser = require("../MiddleWare/fetchuser");
const Note = require("../Models/Note");
const { body, validationResult } = require("express-validator");

//Get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Add a new note
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

module.exports = router;

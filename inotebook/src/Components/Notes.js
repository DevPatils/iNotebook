import React from 'react'
import { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
const Notes = () => {
    const context = useContext(NoteContext);
    const { note, setNotes } = context;
  return (
    <div className="row my-3">
    <h2>Your Notes</h2>
    {note.map((note) => (
      <Noteitem note={note}></Noteitem>
    ))}
  </div>
  )
}

export default Notes

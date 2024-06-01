import React from 'react'
import { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, addnote } = context;
  return (
    <>
    <AddNote />
    <div className="row my-3">
    
    <h2>Your Notes</h2>
    {notes.map((note) => (
      <Noteitem note={note}></Noteitem>
    ))}
  </div>
  </>
  )
}

export default Notes

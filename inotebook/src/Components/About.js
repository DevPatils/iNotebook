import React from 'react'
import  { useState } from 'react';
import { useContext } from 'react'
import noteContext from '../Context/notes/NoteContext'
import NoteContext from '../Context/notes/NoteContext';

const About = () => {
  const {note}  = useContext(NoteContext);
  
  return (
    <div>
      <h1>This is about and the name is {note.name}</h1>
    </div>
  );
}

export default About;

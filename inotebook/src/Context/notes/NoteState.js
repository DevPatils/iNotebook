import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // const s1 = { name: 'Dev Patil', description: 'SDE at Microsoft' };
    

    const notesinitial = [
        {
          "_id": "664ed6695e486637d1427b7f",
          "user": "664ec833470ee6c0b61c05f2",
          "title": "My Title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2024-05-23T05:38:49.108Z",
          "__v": 0
        },
        {
          "_id": "664ee25eaa8e8653bcb6e154",
          "user": "664ec833470ee6c0b61c05f2",
          "title": "MY Tweet",
          "description": "Updates in my project",
          "tag": "personal project",
          "date": "2024-05-23T06:29:50.716Z",
          "__v": 0
        },
        {
          "_id": "66502344d83d4d52867f40cb",
          "user": "664ec833470ee6c0b61c05f2",
          "title": "MY Tweet",
          "description": "Updates in my project",
          "tag": "personal project",
          "date": "2024-05-24T05:19:00.691Z",
          "__v": 0
        }
      ]

      const [notes, setNote] = useState(notesinitial);

      const addNote = (title, description, tag) => {
        console.log('Adding a note')
        //TODO: API Call
        const note=
            {
                "_id": "66502344d83d4d52867f40cb",
                "user": "664ec833470ee6c0b61c05f2",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2024-05-24T05:19:00.691Z",
                "__v": 0
              }
        
        setNote(notes.concat(note))
      }
      const deleteNote = (id) => {
        console.log('deleting a note'+id)
        const newnotes = notes.filter((note)=>{return note._id!==id})
        setNote(newnotes)
      }
      const editNote = (id, title, description, tag) => {

      }

    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;


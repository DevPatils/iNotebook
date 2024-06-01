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

      const [note, setNote] = useState(notesinitial);

    return (
        <NoteContext.Provider value={{note,setNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;


import React from "react";
import NoteContext from '../Context/notes/NoteContext';
import { useContext } from 'react';

const Noteitem = (props) => {
  const { note } = props;
  
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      {/* {note.title} {note.description} */}
      <div class="card my-3">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description}</p>
            <i class="far fa-trash-alt mx-2" onClick={()=>{
              deleteNote(note._id);
            }}></i>
            <i class="fa-solid fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

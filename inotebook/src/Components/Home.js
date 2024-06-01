import React from "react";
import { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = () => {

  return (
    <>
      <Notes />
    </>
  );
};

export default Home;

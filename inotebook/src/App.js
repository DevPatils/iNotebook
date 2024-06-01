import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="you are in iNotebook"></Alert>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

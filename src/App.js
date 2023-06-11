
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState';
import LogIn from './components/LogIn';
import SignIn from './components/SignIn'


function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;

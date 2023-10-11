import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <BrowserRouter>
      <NoteState>
        < Navbar />
        <div className="container">
          <Routes>
            < Route path='/' element={< Home />} />
            < Route path='/about' element={< About />} />
          </Routes>
        </div>
      </NoteState>

    </BrowserRouter>
  );
}

export default App;
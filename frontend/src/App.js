import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import AlertState from './context/alert/AlertState';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from './components/Alert';

function App() {

  return (
    <BrowserRouter>
    <AlertState>
      <NoteState>
        < Navbar />
        < Alert />
        <div className="container">
          <Routes>
            < Route path='/' element={< Home />} />
            < Route path='/about' element={< About />} />
            < Route path='/login' element={< Login />} />
            < Route path='/signup' element={< Signup />} />
          </Routes>
        </div>
      </NoteState>
      </AlertState>
    </BrowserRouter>
  );
}

export default App;

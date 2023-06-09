import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import { Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
          <div className="containter dark">
            <div className='app'>

            <Header />
            <Routes>
                <Route path="/" element={<NotesListPage/>} />
                <Route path = "/note/:id" element={<NotePage/>}/>
            </Routes>
          </div>
          </div>
            
    </Router>

  );
}

export default App;

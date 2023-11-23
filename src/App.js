import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main'
import Difficulty from './components/Difficulty'
import Gameplay from './components/Gameplay'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/difficulty" element={<Difficulty />} />
        <Route path="/gameplay" element={<Gameplay />} />
      </Routes>
    </Router>
  );
}

export default App;

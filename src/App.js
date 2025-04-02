import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Landing from './pages/Landing';
import Register from './pages/Register';
import Track from './pages/Track';

// Components
import AppNavbar from './components/AppNavbar';


function App() {
  return (
    <Router>
      <AppNavbar/>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={<Track />} />
      </Routes>
    </Router>
  );
}

export default App;

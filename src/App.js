import './App.css';

// Pages
import Landing from './pages/Landing';

// Components
import AppNavbar from './components/AppNavbar';

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <Landing/>
    </div>
  );
}

export default App;

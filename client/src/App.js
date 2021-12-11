import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const initialState = false;
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return !isAuthenticated ? (
    <div>
      <Router>
        <Login
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Router>
    </div>
  ) : (
    <div>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Login
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Dashboard
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Router>
    </div>
  );
}

export default App;

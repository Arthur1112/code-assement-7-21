import { useState } from 'react';
import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Navbar } from './components/Navbar';

const App = () => {
  const [currentAdmin, setCurrentAdmin] = useState('');
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentUser={currentAdmin}
              setCurrentUser={() => setCurrentAdmin()}
            />
          }
        />
        <Route
          path="/adminLogin"
          element={
            <LoginForm
              currentUser={currentAdmin}
              setCurrentUser={() => setCurrentAdmin()}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

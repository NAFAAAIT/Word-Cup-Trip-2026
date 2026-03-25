import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import Stadiums from './pages/Stadiums';
import Transport from './pages/Transport';
import Emergency from './pages/Emergency';
import MyTrip from './pages/MyTrip';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/stadiums" element={<Stadiums />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/trip" element={<MyTrip />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

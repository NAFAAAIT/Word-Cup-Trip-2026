import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import Stadiums from './pages/Stadiums';
import Transport from './pages/Transport';
import Emergency from './pages/Emergency';
import Matches from './pages/Matches';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/stadiums" element={<Stadiums />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

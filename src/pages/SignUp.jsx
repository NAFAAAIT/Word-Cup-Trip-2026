import React from 'react';
import { Link } from 'react-router-dom';
import { FaFutbol, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Auth.css';

function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // frontend only
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card card glass-panel">
        <div className="text-center mb-8 gap-2 flex flex-col items-center">
          <FaFutbol className="text-4xl text-primary-accent mb-2" />
          <h2 className="text-2xl font-bold">Join the Journey</h2>
          <p className="text-secondary text-sm">Create an account to save hotels and stadiums</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Full Name" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="Email Address" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Password" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Confirm Password" className="input-field pl-10" required />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6 text-lg py-3">Create Account</button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary border-t border-color pt-6">
          Already have an account? <Link to="/login" className="text-primary-accent font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

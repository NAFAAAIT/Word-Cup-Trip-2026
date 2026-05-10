import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFutbol, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fullName = e.target.querySelector('input[name="fullName"]').value.trim();
    const email = e.target.querySelector('input[type="email"]').value.trim();
    const password = e.target.querySelector('input[name="password"]').value;
    const confirm = e.target.querySelector('input[name="confirm"]').value;

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await register(fullName, email, password);
      login(res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card card glass-panel">
        <div className="text-center mb-8 gap-2 flex flex-col items-center">
          <FaFutbol className="text-4xl text-primary-accent mb-2" />
          <h2 className="text-2xl font-bold">Join the Journey</h2>
          <p className="text-secondary text-sm">Create your free World Cup Trip account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" name="fullName" placeholder="Full Name" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="Email Address" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" name="password" placeholder="Password (min. 6 characters)" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" name="confirm" placeholder="Confirm Password" className="input-field pl-10" required />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6 text-lg py-3" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary border-t border-color pt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-accent font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

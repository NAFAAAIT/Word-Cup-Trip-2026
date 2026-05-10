import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFutbol, FaEnvelope, FaLock } from 'react-icons/fa';
import { login as apiLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    try {
      const res = await apiLogin(email, password);
      login(res.user);
      if (res.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card card glass-panel">
        <div className="text-center mb-8 gap-2 flex flex-col items-center">
          <FaFutbol className="text-4xl text-primary-accent mb-2" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-secondary text-sm">Sign in to your World Cup Trip account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="Email Address" className="input-field pl-10" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="Password" className="input-field pl-10" required />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-secondary hover:text-white">
              <input type="checkbox" className="custom-checkbox" /> Remember me
            </label>
            <a href="#" className="text-primary-accent hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6 text-lg py-3" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-secondary border-t border-color pt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-accent font-bold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

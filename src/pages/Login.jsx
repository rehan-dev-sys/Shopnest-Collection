import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';
  const infoMessage = location.state?.message || '';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email.trim() === '' || form.password === '') {
      setError('Please enter email and password');
      return;
    }

    const result = login(form.email, form.password);
    if (result.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="page auth-page">
      <form className="form-box auth-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {infoMessage && <p className="info-msg">{infoMessage}</p>}

        <label>Email</label>
        <input type="text" name="email" value={form.email} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-large">Login</button>

        <p className="auth-link">
          New customer?{' '}
          <Link to="/register" state={location.state}>Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
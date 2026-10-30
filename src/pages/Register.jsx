import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setServerError('');

    if (Object.keys(newErrors).length === 0) {
      const result = register(form.name.trim(), form.email, form.password);
      if (result.success) {
        alert('Registration successful! Please login.');
        navigate('/login', { state: location.state });
      } else {
        setServerError(result.message);
      }
    }
  };

  return (
    <div className="page auth-page">
      <form className="form-box auth-box" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <label>Full Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email</label>
        <input type="text" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit" className="btn btn-large">Register</button>

        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/login" state={location.state}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
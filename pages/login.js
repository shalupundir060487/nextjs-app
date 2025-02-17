import { useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import AuthLayout from '../components/AuthLayout';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store JWT token in localStorage
      localStorage.setItem('token', data.token);

      // Decode token to check role and redirect
      const decodedToken = jwt.decode(data.token);
      if (decodedToken.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/profile');
      }
    } else {
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

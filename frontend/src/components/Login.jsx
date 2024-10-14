import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Importar o CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);  // Armazena o token no localStorage
        alert('Login bem-sucedido!');
        navigate('/dashboard');  // Redireciona para a página de dashboard
      } catch (err) {
        console.error('Erro no login:', err.response.data);
        alert('Erro no login: ' + err.response.data.msg);
      }
    };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Finance App</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
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
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot password?</a>
          <a href="#" className="sign-up">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;




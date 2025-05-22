
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = { swapna: 'swapna123', sourav: 'sourav123' };

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (users[username] === password) {
      setUser(username);
      localStorage.setItem('grievanceUser', username);
      navigate(`/${username}`);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Royal Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Enter Palace</button>
    </div>
  );
}

export default Login;

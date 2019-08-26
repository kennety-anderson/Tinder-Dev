import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import api from '../../services/api';
import './Login.css';
import axios from 'axios'


function Login({ history }) {

  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(username)
    const { data } = await axios.post('http://localhost:3333/devs', {
      username,
    });
    console.log(data)
    const { _id } = data;
    
    history.push(`/dev/${_id}`)
  }

  return(
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="tindev" />
        <input
          placeholder="digite seu usuario no github"
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
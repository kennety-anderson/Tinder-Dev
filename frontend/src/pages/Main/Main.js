import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import logo from '../../assets/images/logo.svg';
import like from '../../assets/images/like.svg';
import './Main.css';
import api from '../../services/api';
import unlike from '../../assets/images/unlike.svg';
import itsamatch from '../../assets/images/itsamatch.png';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(false)

  useEffect(() => {
    async function loadUsers() {
      const { data } = await api.get('/devs', {
        headers: { 
          user: match.params.id
        }
      })
      setUsers(data)
    }
    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      setMatchDev(dev)
      
    });
    
  }, [match.params.id])

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    })
  }
  
  async function handleUnlike(id) {
    await api.post(`/devs/${id}/unlikes`, null, {
      headers: { user: match.params.id }
    })
    setUsers(users.filter(user => user._id !== id))
  }
  return (
    <div className="main-container">
      <img src={logo} alt="Tindev" />
      { users.length ?

      <ul>
        {users.map(user =>(

          <li key={user._id}>
            <img src={user.avatar} alt={user.name}/>
            <footer>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </footer>
            <div className="buttons">
              <button type="button" onClick={() => handleUnlike(user._id)}>
                <img src={unlike} alt="Dislike" alt=""/>
              </button>
              <button type="button" onClick={() => handleLike(user._id)}>
                <img src={like} alt="Like" alt=""/>
              </button>
            </div>

          </li>
        ))}
       
      </ul> : <div><span className="empty">Acabou :( </span></div>
      }
      {matchDev && (
        <div className="match-container">
          <img className="avatar" src={matchDev.avatar} alt=""/>
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button onClick={() => setMatchDev(false)}>FECHAR</button>
        </div>
      )}
    </div>
  );
}
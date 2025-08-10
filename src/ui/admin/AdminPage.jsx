import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from '../start-page/LogoutButton';
import { OneUser } from './OneUser';


function AdminIsNotAuthorized () {
  return <h1>Авторизуйтесь, пожалуйста!</h1>
}

function AdminIsAuthorized ({name, login}) {
  const [viewUsers, setViewUsers] = useState([]);
  const [lastUsersUpload, setLastUsersUpload] = useState(new Date());
  const navigate = useNavigate();

  function sendFetchToGetUsers () {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}users/`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(data => {
      console.log("Пользователи успешно загружены ", data);
      setViewUsers(data);
    })
  }

  useEffect(() => {
    sendFetchToGetUsers();
  }, [])

  useEffect(() => {
    sendFetchToGetUsers();
  }, [lastUsersUpload])

  const uploadUsers = () => {
    setLastUsersUpload(new Date());
  }

  return (
    <div className="container">
      <LogoutButton login={login} />
      <h2>Здравствуйте, {name}</h2>
      <button onClick={uploadUsers}>Обновить список пользователей</button>
      <ul>
        {viewUsers.map(elem => {
          return <OneUser elem={elem} navigate={navigate} setLastUsersUpload={setLastUsersUpload} />
        })}
      </ul>
    </div>
  )
}

export function AdminPage () {
  const location = useLocation();
  const { name, login } = location.state || {};

  return (
    location.state 
      ? <AdminIsAuthorized name={name} login={login} /> 
      : <AdminIsNotAuthorized />
  )
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { OneUser } from "./OneUser";


function AdminIsNotAuthorized () {
  return <h1>Не удалось получить список пользователей. Права администратора не подтверждены.</h1>
}

function AdminIsAuthorized ({state}) {
  const [viewUsers, setViewUsers] = useState([]);
  const [lastUsersUpload, setLastUsersUpload] = useState(new Date());
  const navigate = useNavigate();
  const { admin } = state;

  function sendFetchToGetUsers (admin) {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_users/`, { 
      method: 'POST',
      credentials: 'include', 
      mode: 'cors',
      body: JSON.stringify({request_from_admin: admin}),
      headers: { 
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return false
      }
    }).then(data => {
      console.log(data);
      console.log("Пользователи успешно загружены ");
      if (!data) data = [];
      setViewUsers(data);
    })
  }

  useEffect(() => {
    sendFetchToGetUsers(admin);
  }, []);

  useEffect(() => {
    sendFetchToGetUsers(admin);
  }, [lastUsersUpload]);

  const uploadUsers = () => {
    setLastUsersUpload(new Date());
  };

  return (
    <div className="admin-content">
      <button onClick={uploadUsers}>Обновить список пользователей</button>
      <ul>
        {viewUsers.map(elem => {
          return <OneUser adminState={state} elem={elem} navigate={navigate} setLastUsersUpload={setLastUsersUpload} />
        })}
      </ul>
    </div>
  )
}

export function UsersListForAdmin (state) {
  const { admin } = state || {};
  return (
    <>
      {admin 
        ? <AdminIsAuthorized state={state} /> 
        : <AdminIsNotAuthorized />}
    </>
  )
}

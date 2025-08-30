import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


function UserIsNotAuthorized () {
  return <h1>Не удалось авторизоваться. Попробуйте пройти авторизацию снова, пожалуйста.</h1>
}

export function MyCloud () {
  const [sessionUser, setSessionUser] = useState(null);

  function sendFetchToGetExistUser () {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_mycloud_user/`, { 
      method: 'GET',
      credentials: 'include', 
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      if (response.status_code === 200) {
        return response.json()
      } else {
        return false
      }
    }).then(data => {
      if (data) {
        setSessionUser(data);
      }
    })
  }

  useEffect(() => {
    sendFetchToGetExistUser();
  }, []);

  return (
    <div className="container">
      {sessionUser !== null 
        ? sessionUser["admin"] === true 
          ? <Navigate to="/mycloud/admin" state={sessionUser} replace={false} /> 
          : <Navigate to="/mycloud/my-files" state={sessionUser} replace={false} /> 
        : <UserIsNotAuthorized />}
    </div>
  )
}

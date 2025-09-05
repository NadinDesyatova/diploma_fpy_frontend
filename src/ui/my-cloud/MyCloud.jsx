import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserIsNotAuthorized } from "../user-auth-error/UserIsNotAuthorize";

function RequestSending() {
  return <div>...Отправляется запрос. Подождите, пожалуйста, немного.</div>
}

export function MyCloud () {
  const [sessionUser, setSessionUser] = useState({});

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
      if (response.status === 200) {
        return response.json();
      } else {
        setSessionUser(null);
        return false;
      }
    }).then(data => {
      if (data) {
        console.log(data)
        setSessionUser(data.user);
      }
    })
  }

  useEffect(() => {
    sendFetchToGetExistUser();
  }, []);

  return (
    <div className="container">
      {sessionUser !== null 
        ? sessionUser.id 
          ? sessionUser["admin"] === true 
            ? <Navigate to="/mycloud/admin" state={sessionUser} replace={false} /> 
            : <Navigate to="/mycloud/my-files" state={sessionUser} replace={false} /> 
          : <RequestSending />
        : <UserIsNotAuthorized />}
    </div>
  )
}

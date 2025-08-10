import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ViewFilesStorage } from './ViewFilesStorage';
import { sortByDate } from '../../common/sortingDate';
import LogoutButton from '../start-page/LogoutButton';
import { Navigate } from "react-router-dom";


function FilesWelcomeForAdmin ({state}) {
  return <Navigate to='/admin' state={state} replace={true} />;
}

function FilesWelcomeForSimpleUsers ({id, name, login}) {
  const [viewFiles, setViewFiles] = useState([]);
  const [lastFileUpload, setLastFileUpload] = useState(new Date());

  function sendFetchToGetUserFiles (id) {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_user_files/${id}/`)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json()
      } else {
        return false
      }
    })
    .then(data => {
      if (data) {
        setViewFiles(sortByDate(data));
      }
    })
  }

  useEffect(() => {
    sendFetchToGetUserFiles(id);
  }, []);
  
  useEffect(() => {
    sendFetchToGetUserFiles(id);
  }, [lastFileUpload]);
    
  return (
    <div className='container'>
      <LogoutButton login={login} />
      <h1>Добро пожаловать, {name}!</h1>
      <ViewFilesStorage id={id} viewFiles={viewFiles} setLastFileUpload={setLastFileUpload} />
    </div>
  );
}

export function FilesWelcome () {
  
  const location = useLocation();

  console.log(location.state);
  
  const { id, name, admin, login } = location.state || {};

  console.log([id, name, login])

  return <>
    {admin
      ? <FilesWelcomeForAdmin state={location.state}/> 
      : <FilesWelcomeForSimpleUsers id={id} name={name} login={login} />
    }
  </>
}

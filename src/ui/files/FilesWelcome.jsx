
import { useLocation } from 'react-router-dom';
import { ViewFilesStorage } from './ViewFilesStorage';
import LogoutButton from '../start-page/LogoutButton';
import { Navigate } from "react-router-dom";


function FilesWelcomeForAdmin ({state}) {
  return <Navigate to='/admin' state={state} replace={true} />;
}

function FilesWelcomeForSimpleUsers ({id, name, login}) {

    
  return (
    <div className='container'>
      <LogoutButton login={login} />
      <h1>Добро пожаловать, {name}!</h1>
      <ViewFilesStorage id={id} />
    </div>
  );
}

export function FilesWelcome () {
  
  const location = useLocation();

  console.log(location.state);
  
  const { id, name, admin, login } = location.state || {};

  return (
    <>
      {admin
        ? <FilesWelcomeForAdmin state={location.state} /> 
        : <FilesWelcomeForSimpleUsers id={id} name={name} login={login} />}
    </>
  )
}

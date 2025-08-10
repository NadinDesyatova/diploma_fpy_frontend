import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ViewFilesStorage } from '../files/ViewFilesStorage';
import { sortByDate } from '../../common/sortingDate';

export function UserFilesForAdmin () {

  const location = useLocation();
  const { id, name } = location.state || {};
  const [viewFiles, setViewFiles] = useState([]);
  const navigate = useNavigate();
  const [lastFileUpload, setLastFileUpload] = useState(new Date());

  function sendFetchToGetUserFiles (id) {
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_user_files/${id}/`)
    .then(response => {
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
  }, [])
  
  useEffect(() => {
    sendFetchToGetUserFiles(id);
  }, [lastFileUpload])
    
  const backButton = () => {
    navigate(-1)
  };

  return (
    <div className='container'>
      <button onClick={backButton}>Назад</button>
      <h2>Файлы пользователя {name}</h2>
      <ViewFilesStorage id={id} viewFiles={viewFiles} setLastFileUpload={setLastFileUpload} />
    </div>
  );
}

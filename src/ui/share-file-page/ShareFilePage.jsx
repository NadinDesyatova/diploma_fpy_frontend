import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DownloadShareFile from './DownloadShareFile';

export function ShareFilePage () {
  const { fileLink } = useParams();
  const [fileData, setFileData] = useState('');
  console.log(fileLink);

  useEffect(() => {
    if (fileLink !== undefined) {
      const url = `${import.meta.env.VITE_APP_BASE_USL_API}retrieve_by_link/?link=${fileLink}`;
      console.log(url);
      
      fetch(url, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ответ от сервера не получен');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setFileData(data);
        })
    }
  }, [fileLink]);
  

  return (
    <div className='container'>
      <h1>С Вами поделились файлом: {fileData.file_name}</h1>
      <DownloadShareFile fileId={fileData.id} userId={fileData.user_id} fileName={fileData.file_name} />
    </div>
  );
};

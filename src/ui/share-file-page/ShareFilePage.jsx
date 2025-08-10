import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DownloadButton from '../files/DownloadButton';

export function ShareFilePage () {
  const { fileLink } = useParams();
  const [fileData, setFileData] = useState('');
  console.log(fileLink)

  useEffect(() => {
    if (fileLink !== undefined) {
      const url = `${import.meta.env.VITE_APP_BASE_USL_API}files/?link=${fileLink}`;
      console.log(url);
      
      fetch(url)
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
  }, [fileLink])
  

  return (
    <div className='container'>
      <h1>С Вами поделились файлом</h1>
      {fileData.file_name}
      <DownloadButton fileId={fileData.id} />
    </div>
  );
};

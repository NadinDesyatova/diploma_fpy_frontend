import UploadFile from './UploadFile';
import { OneFile } from './OneFile';

export function ViewFilesStorage ({id, viewFiles, setLastFileUpload}) {

  return (
    <div className='container'>
      <button className='button-update-files' onClick={() => {setLastFileUpload(new Date())}}>Обновить список файлов</button>
      <UploadFile userId={id} setLastFileUpload={setLastFileUpload}/>
      <ul>
        {viewFiles.map(elem => {
          const fileLink = 
            elem.file_link 
              ? `${import.meta.env.VITE_APP_BASE_URL_WEBSITE}share/${elem.file_link}` 
              : ''
          return <OneFile elem={elem} fileLink={fileLink} setLastFileUpload={setLastFileUpload} />
        })}
      </ul>
    </div>
  );
}

import { useState } from 'react';
import DownloadButton from './DownloadButton';
import { formatDate } from '../../common/formatDate';


export function OneFile ({userId, isUserFilesForAdmin, fileLink, elem, setLastFileUpload}) {
  const [currentFileLink, setCurrentFileLink] = useState(fileLink);
  
  const onGetLink = (fileId) => {
    console.log("Получение ссылки на файл");
    
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_link_for_file/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({file_id: fileId})
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.log(`Возникла ошибка, код ошибки: ${String(response.status)}`);
      }
    }).then(data => {
      if (data.status_code === 200) {
        setCurrentFileLink(`${import.meta.env.VITE_APP_BASE_URL_WEBSITE}share/${data.file_link}`);
        
        console.log(data);
      } else {
        setCurrentFileLink(data.error_message);
      }      
    });
  }

  const onDelete = (id) => {
    console.log("Удаление файла");
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}files/${id}/`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(resp => { 
      if (resp.status == 204) {
        return {status: "deleted"};
      } else {
        return "Error";
      }
    }).then(response => {
      setLastFileUpload(new Date());
      console.log(response);
    });
  }
  
  const renameButton = (elemId) => {
    const newName = prompt("Введите новое имя файла с расширением: ");

    try {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}files/${elemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          file_name: newName
        })
      }).then(resp => {return resp.json()})
        .then(data => {
          console.log(data);
          setLastFileUpload(new Date());
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
  }

  return ( 
    <li className="one-file" id={elem.id} key={elem.id}>
      <h3>{elem.file_name}</h3>
      <span>{`${parseFloat(parseInt(elem.file_size) / 1000000)} MB`}</span>
      <span>{formatDate(elem.date)}</span>
      <div className="buttons-block">
        <button onClick={() => {renameButton(elem.id)}}>Переименовать</button>
        <DownloadButton userId={userId} isUserFilesForAdmin={isUserFilesForAdmin} fileData={elem} setLastFileUpload={setLastFileUpload} />
      </div> 
      <span>Последняя дата скачивания: {elem.last_upload_date !== null ? formatDate(elem.last_upload_date) : ""}</span><br />
      <div>Комментарий к файлу: {elem.comment}</div>
      <span>Ссылка на файл (если ссылка не отображается, нажмите на кнопку "Поделиться файлом"): </span>
      <a href={currentFileLink}>{currentFileLink ? "Действующая ссылка" : ""}</a>
      <div className="buttons-block">
        <button onClick={() => onGetLink(elem.id)}>Поделиться файлом</button>
        <button onClick={() => onDelete(elem.id)}>Удалить файл</button>
      </div>      
    </li>
  );
};

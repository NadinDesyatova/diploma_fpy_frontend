import DownloadButton from './DownloadButton';
import { formatDate } from '../../common/formatDate';


export function OneFile ({elem, fileLink, setLastFileUpload}) {
  const onGetLink = (id) => {
    console.log("Получение ссылки на файл");
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}get_link_for_file/${id}/`)
      .then(response => {
        setLastFileUpload(new Date());
        console.log(response);
    });
  }

  const onDelete = (id) => {
    console.log("Удаление файла");
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}files/${id}/`, {
      method: 'DELETE'
    }).then(response => {
        setLastFileUpload(new Date());
        console.log(response);
    });
  }
  
  const renameButton = (elem) => {
    const newName = prompt("Введите новое имя файла: ");

    try {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}files/${elem.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_name: newName
        })
      }).then(resp => {return resp.json()})
        .then(data => {
          console.log(data)
          setLastFileUpload(new Date())
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
  }

  return ( 
    <li className="one-file" id={elem.id} key={elem.id}>
      <span>{elem.file_name}</span>
      <span>{`${parseFloat(parseInt(elem.file_size) / 1000000)} MB`}</span>
      <span>{formatDate(elem.date)}</span><br />
      <button onClick={() => {renameButton(elem)}}>Переименовать</button><br />
      <DownloadButton fileId={elem.id} setLastFileUpload={setLastFileUpload} />
      <span>Последняя дата скачивания: {formatDate(elem.last_upload_date)}</span><br />
      <div>Комментарий к файлу: {elem.comment}</div>
      <span>Чтобы получить ссылку на файл, нажмите на кнопку "Поделиться файлом": </span>
      <a href={fileLink}>{fileLink}</a>
      <button onClick={() => onGetLink(elem.id)}>Поделиться файлом</button><br />
      <button onClick={() => onDelete(elem.id)}>Удалить файл</button><br />
    </li>
  );
};

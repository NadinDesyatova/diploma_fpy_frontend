import { useState } from 'react';


function UploadFile ({ userId, setLastFileUpload}) {

  const [inputContent, setInputContent] = useState({
    'new_file': null,
    'file_name': '',
    'file_size': '',
    'comment': ''
  })
  
  const [resultMsg, setResultMsg] = useState('')
  const serverUrl = `${import.meta.env.VITE_APP_BASE_USL_API}files/`;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputContent((prev) => ({
      ...prev, 
      [name]: name === 'new_file' ? value.files[0] : value
    }));
  };

  const uploadHandler = async () => {
    if (inputContent.new_file === null) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    const formData = new FormData();

    for (const [name, value] of Object.entries(inputContent)) {
      formData.append(name, value) 
    };

    formData.append('file_size', inputContent.new_file.size);
  
    formData.append('user_id', userId)

    try {
      console.log('Происходит отправка файла на сервер');
      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setResultMsg('Файл успешно загружен:', result);
        setTimeout(() => {setLastFileUpload(new Date())}, 100)
      } else {
        setResultMsg('Ошибка при загрузке файла:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  return (
    <div className="upload-form">
      <h2>Добавить новый файл</h2>
      <div className="input-block">
        <input type="file" name="new_file" onChange={onChangeHandler} placeholder="Загрузка файла" className="input-form" required />
        <input type="text" name="file_name" onChange={onChangeHandler} placeholder="Имя файла" className="input-form" required />
        <input type="textarea" name="comment" onChange={onChangeHandler} placeholder="Комментарий" className="input-form" required />
        <div className="result-msg">{resultMsg}</div>
      </div>
      <div className="buttons-block">
        <button onClick={uploadHandler} className="button-form submit">Загрузить</button>
      </div>
    </div>
  );
};

export default UploadFile;

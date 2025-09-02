function DownloadShareFile ({ fileId, userId, fileName }) {
  
  const handleDownload = (fileId, userId, fileName) => {
    console.log("Загрузка файла");
    
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}download_file/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId, 
        file_id: fileId,
        is_user_files_for_admin: false
      })
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.append(a); 
        a.click();    
        a.remove();      
      });
  };

  return (
    <button onClick={() => handleDownload(fileId, userId, fileName)}>
      Скачать файл
    </button>
  );
};

export default DownloadShareFile;
function DownloadShareFile ({ fileId }) {
  const handleDownload = (fileId) => {
    console.log("Загрузка файла");
    
    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}download_file/`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        user_id: "", 
        file_id: fileId,
        share_file: true,
        is_user_files_for_admin: false
      })
    }).then(response => {
      console.log(response);
    });
  };

  return (
    <button onClick={() => handleDownload(fileId)}>
      Скачать файл
    </button>
  );
};

export default DownloadShareFile;
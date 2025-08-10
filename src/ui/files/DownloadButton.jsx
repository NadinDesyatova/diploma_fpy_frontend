function DownloadButton ({ fileId, setLastFileUpload }) {
  const handleDownload = () => {
    const fileUrl =`${import.meta.env.VITE_APP_BASE_USL_API}download_file/${fileId}/`;

    const link = document.createElement('a');
    link.href = fileUrl;

    document.body.appendChild(link);
        
    link.click();
        
    document.body.removeChild(link);

    setLastFileUpload(new Date());
  };

  return (
    <button onClick={handleDownload}>
      Скачать файл
    </button>
  );
};

export default DownloadButton;

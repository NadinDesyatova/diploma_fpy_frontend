import { useLocation, useNavigate } from 'react-router-dom';
import { ViewFilesStorage } from '../files/ViewFilesStorage';

export function UserFilesForAdmin () {
  const location = useLocation();
  const { id, name } = location.state || {};
  const navigate = useNavigate();
    
  const backButton = () => {
    navigate(-1)
  };

  return (
    <div className='container'>
      <button onClick={backButton}>Назад</button>
      <h2>Файлы пользователя {name}</h2>
      <ViewFilesStorage id={id} />
    </div>
  );
}

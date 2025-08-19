import { useNavigate } from 'react-router-dom';


function LogoutButton ({ login }) {
  const navigate = useNavigate()
    const handleLogout = async () => {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}logout/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({login: login}),
      }).then(resp => {
        if (resp.status == 204) {
          return {status: "deleted"};
        } else {
            return "Error";
          }
      }).then(data => {
        if (data.status == "deleted") {
          localStorage.clear();
          navigate("/", { replace: false });
        } else {
          alert("Возникла техническая ошибка, попробуйте зайти на сайт позже");
        }
      })
    };

  return (
    <button onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;

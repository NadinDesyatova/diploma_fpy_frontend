export function OneUser ({elem, navigate, setLastUsersUpload}) {

  const goToUserFiles = (user) => {
    navigate('/user_files', { state: user });
  };

  const changeAdminRights = (user) => {
    const isAdmin = Boolean(!user.admin);
    try {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          admin: isAdmin
        })
      }).then(resp => {return resp.json()})
        .then(data => {
          console.log(data);
          setLastUsersUpload(new Date());
        });
    } catch (error) {
        console.error('Ошибка:', error);
    };
  };

  const deleteUser = (user) => {
    const checkOfDeletion = confirm(`Вы уверены что хотите удалить пользователя ${user.name}?`)
    if (checkOfDeletion) {
      try {
        fetch(`${import.meta.env.VITE_APP_BASE_USL_API}users/${user.id}/`, {
          method: 'DELETE'
        }).then(resp => {return resp.json()})
          .then(data => {
            console.log(data);
            setLastUsersUpload(new Date());
          });
      } catch (error) {
        console.error('Ошибка:', error);
      };
    }
  };

  return (
    <li className="one-user" key={elem.id}>
      <div>id: {elem.id}</div>
      <div>name: {elem.name}</div>
      <div>email: {elem.email}</div>
      <div>isAdmin: {elem.admin}</div>
      <button onClick={() => {changeAdminRights(elem)}}>Изменить права</button>
      <div>files number: {elem.files.length}</div>
      <div>files storage size: {`${elem.files_storage_size / 1000000} MB`}</div>
      <button onClick={() => {goToUserFiles(elem)}}>Перейти в файловое хранилище</button>
      <button onClick={() => {deleteUser(elem)}}>Удалить пользователя</button>
    </li>
  )
}

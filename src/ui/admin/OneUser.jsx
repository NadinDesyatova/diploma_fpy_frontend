export function OneUser ({adminState, elem, navigate, setLastUsersUpload}) {

  const goToUserFiles = (userId, userName, adminState) => {
    const pathToUserFiles = `/mycloud/admin/user/${userId}/files`;
    navigate(pathToUserFiles, { state: {
      userId,
      userName,
      adminState
    }});
  };

  const changeAdminRights = (user, requestFromAdmin) => {
    const newAdminRights = Boolean(!user.admin);
    try {
      fetch(`${import.meta.env.VITE_APP_BASE_USL_API}users/${user.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          new_admin_rights: newAdminRights,
          request_from_admin: requestFromAdmin
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
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors'
        }).then(resp => { 
          if (resp.status == 204) {
            return {status: "deleted"};
          } else {
            return "Error";
          }
        }).then(data => {
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
      <div>isAdmin: {String(elem.admin)}</div>
      <button onClick={() => {changeAdminRights(elem, adminState["admin"])}}>Изменить права</button>
      <div>files storage size: {`${elem.files_storage_size / 1000000} MB`}</div>
      <div className="buttons-block">
        <button onClick={() => {goToUserFiles(elem.id, elem.name, adminState)}}>Перейти в файловое хранилище</button>
        <button onClick={() => {deleteUser(elem)}}>Удалить пользователя</button>
      </div>      
    </li>
  )
}

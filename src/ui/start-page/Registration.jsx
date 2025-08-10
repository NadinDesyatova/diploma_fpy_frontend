import { useState } from "react";

export function Registration ({ SetViewPage }) {

  const [inputInfo, setInputInfo] = useState({
    name: '',
    login: '',
    password: '',
    email: ''
  });

  const inputRequirements = {
    login: {
      regex: "^[a-zA-Z]{1}[a-zA-Z0-9]{3,20}$",
      titleText: "Enter only Latin letters and numbers, the first character is a letter, the length is from 4 to 20 characters."
    },
    password: {
      regex: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$",
      titleText: "Enter at least 6 characters: at least one uppercase letter, one digit and one special character."
    },
    email: {
      regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      titleText: "Enter the correct email address"
    }
  };

  const [resultMsg, setResultMsg] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target
    setInputInfo((prev) => ({
      ...prev, 
      [name]: value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);

    fetch(`${import.meta.env.VITE_APP_BASE_USL_API}users/`, {
      method: "POST",
      body: JSON.stringify(inputInfo),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data);
      if (data.id) {
        setResultMsg("Успешно создан аккаунт. Сейчас вы будете перенаправлены на страницу входа.")
        setTimeout(() => {SetViewPage("Authorization")}, 2000);
      } else {
        console.log(data.login[0]);
        setResultMsg("Данный логин уже используется");
      }
    }).catch(data => 
      console.log(data)
    )
  };

  return (
    <div className="container-form">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Регистрация</h2>
        <div className="input-block">
          <input type="text" name="name" onChange={onChange} placeholder="Имя" className="input-form" required />
          <input type="text" name="login" onChange={onChange} placeholder="Логин" title={inputRequirements.login.titleText} className="input-form" required pattern={inputRequirements.login.regex} />
          <input type="password" name="password" onChange={onChange} placeholder="Пароль" title={inputRequirements.password.titleText} className="input-form" required pattern={inputRequirements.password.regex} />
          <input type="email" name="email" onChange={onChange} placeholder="email" title={inputRequirements.email.titleText} className="input-form" required pattern={inputRequirements.email.login} />
          <div className="result-msg">{resultMsg}</div>
        </div>
        <div className="buttons-block">
          <button type="submit" className="button-form submit">Зарегестрироваться</button>
          <button onClick={() => {SetViewPage("Authorization")}} className="button-form">Войти</button>
        </div>
      </form>
    </div>
  );
}

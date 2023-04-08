import { userLogin, userRegistration } from "../userApi.js";


export function renderLoginComponent({appEl, setToken, renderApp} ) {
    

    const appHtml = `  
    <!-- Форма входа  -->
   <div class="add-form-authorization">
    <h3 class="form-text">Форма авторизации</h3>
    <input id="login-input" type="text" class="add-form-login" placeholder="Введите логин" />
    <input id="password-input" type="password" class="add-form-password" placeholder="Введите пароль" />
        <div class="add-form-row">
      <button class="add-form-button" id="login-button">Войти</button>
      <button class="add-form-button" id="toggle-button">Зарегистрироваться</button>
          </div>`
    appEl.innerHTML = appHtml;
    document.getElementById('login-button').addEventListener('click', () => {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;
        if (!login) {
            alert("Введите login");
            return;
        }
        if (!password) {
            alert("Введите password");
            return;
        }
        userLogin(login, password)
            .then((user) => {
                setToken(`Bearer ${user.user.token}`);
                renderApp();

            }).catch(error => {
                alert(error.message);
            });
    });
    document.getElementById('toggle-button').addEventListener('click', () => {

        const appHtml = `<!-- Форма регистрации -->
       <div class="add-form-registration">
        <h3 class="form-text">Регистрация</h3>
        <input id="name-input-registration" type="text" class="registration-name" placeholder="Введите Имя" />
        <input id="login-input-registration" type="text" class="registration-login" placeholder="Введите логин" />
        <input id="password-input-registration" type="password" class="registration-password" placeholder="Введите пароль" />
      
        <div class="add-form-row">
          <button class="add-form-button" id="registration-button">Зарегистрироваться</button>
          <button class="add-form-button" id="exit-button">К входу</button>
         </div>`
        appEl.innerHTML = appHtml;
        document.getElementById('registration-button').addEventListener('click', () => {
            const login = document.getElementById("login-input-registration").value;
            const password = document.getElementById("password-input-registration").value;
            const name = document.getElementById('name-input-registration').value;
            if (!login) {
                alert("Введите login");
                return;
            }
            if (!password) {
                alert("Введите password");
                return;
            }
            if (!name) {
                alert("Введите name");
                return;
            }
            userRegistration({
                login,
                name,
                password,
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                renderApp();
            })
        });

        const exit = document.getElementById('exit-button');
        exit.addEventListener('click', () => {
            const appHtml = `  
    <!-- Форма входа  -->
   <div class="add-form-authorization">
    <h3 class="form-text">Форма авторизации</h3>
    <input id="login-input" type="text" class="add-form-login" placeholder="Введите логин" />
    <input id="password-input" type="password" class="add-form-password" placeholder="Введите пароль" />
        <div class="add-form-row">
      <button class="add-form-button" id="login-button">Войти</button>
      <button class="add-form-button" id="toggle-button">Зарегистрироваться</button>
          </div>`
            appEl.innerHTML = appHtml;
            renderApp();

        })
    })

}
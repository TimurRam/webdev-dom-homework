import { userLogin, userRegistration } from '../userApi.js'

export function renderLoginComponent ({ appEl, setToken, renderApp, comments, setUserName }) {
  let isLoginMode = true
  let formMode = true

  const renderForm = () => {
    const commentHtml = comments
      .map((comment, index) => {
        return `<li class="comment" id = "comment-list" data-index="${index}">
            <div class="comment-header">
              <div data-index="${index}">${comment.name}</div>
              <div>${comment.date} </div>
            </div>
            <div class="comment-body">
            
                <div class="comment-text"data-index = "${index}">
                ${comment.text} 
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
              <button id="delete-button" class = "delete-button" data-id ="${
                comment.id
              }">Удалить</button>
                <span class="likes-counter">${comment.likeCount}</span>
                <button data-index="${index}" class="${
          comment.liked
            ? 'like-button -loading-like -active-like'
            : 'like-button'
        }"></button>
                
              </div>
            </div>
          </li>`
      })
      .join('')

    const appHtml = `<div class="container">
        <ul class="comments" id="list" data>
        ${commentHtml}
          <!-- Рендеринг в JS -->
    </ul>  
    <section id="loaderComments" class="loader -display-none">
    <h4 class="loader-text" id="loaderText">Комментарии загружаются...</h4>
    <div class="loader__gif">
        <img src="./img/Spinner-1s-100px.svg" alt="loader">
    </div>
    </section>
    <!-- Форма входа  -->
<div class="add-form-authorization -display none">
    <h3 class="form-text">Форма ${
      isLoginMode ? 'Авторизации' : 'Регистрации'
    } </h3>
    ${
      isLoginMode
        ? ''
        : `<input id="name-input-registration" type="text" class="registration-name" placeholder="Введите Имя" />`
    }
    
    <input id="login-input" type="text" class="add-form-login" placeholder="Введите логин" />
    <input id="password-input" type="password" class="add-form-password" placeholder="Введите пароль" />
        <div class="add-form-row">
    <button class="add-form-button" id="login-button">${
      isLoginMode ? 'Войти' : 'Зарегестрироваться'
    } </button>
    <button class="add-form-button" id="toggle-button">Перейти  ${
      isLoginMode ? 'к регистрации' : 'ко входу'
    } </button>
        </div>`
    appEl.innerHTML = appHtml

    document.getElementById('login-button').addEventListener('click', () => {
      if (isLoginMode) {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value
        if (!login) {
          alert('Введите login')
          return
        }
        if (!password) {
          alert('Введите password')
          return
        }
        userLogin(login, password)
          .then(user => {
            console.log(user);
            setToken(`Bearer ${user.user.token}`)
            setUserName(`${user.user.name}`)
            localStorage.setItem("login",login);
            localStorage.setItem("password",password);
            localStorage.setItem("name",user.user.name);
            renderApp()
          })
          .catch(error => {
            alert(error.message)
          })
      } else {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value
        const name = document.getElementById('name-input-registration').value
        if (!login) {
          alert('Введите login')
          return
        }
        if (!password) {
          alert('Введите password')
          return
        }
        if (!name) {
          alert('Введите name')
          return
        }
        userRegistration({
          login,
          name,
          password
        })
          .then(user => {
            setToken(`Bearer ${user.user.token}`)
            renderApp()
          })
          .catch(error => {
            alert(error.message)
          })
      }
    })
    document.getElementById('toggle-button').addEventListener('click', () => {
      isLoginMode = !isLoginMode
      renderForm()
    })
  }
  renderForm()
}

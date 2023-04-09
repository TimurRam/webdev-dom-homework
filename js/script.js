import {
  deleteComments,
  getComments,
  postComments,
  repeatPostApp
} from './api.js'
import { renderLoginComponent } from './components/login-component.js'

// const likeButtons = document.querySelectorAll(".like-button");
const buttonElement = document.getElementById('add-button')
const nameElement = document.getElementById('name-input')
// const commentsElement = document.getElementById("comments-input");
// const listElement = document.getElementById("list");
const commentListElement = document.getElementById('comment-list')
export const mainForm = document.querySelector('.add-form')
// const loaderText = document.getElementById("loaderText");
// const loaderCommentsElement = document.getElementById("loaderComments");
// console.log(loaderCommentsElement);
let token = '';
let comments = [];

fetchGetAndRenderComments()
let userName = "";
console.log(userName);

// GET запрос
export function fetchGetAndRenderComments () {
  return getComments().then(responseData => {
    const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: '2-digit'
    }
    const appComments = responseData.comments.map(comment => {
      return {
        id: comment.id,
        name: comment.author.name,
        date: new Date(comment.date)
          .toLocaleDateString('ru-RU', options)
          .replace(',', ' '),
        text: comment.text,
        likeCount: comment.likes,
        liked: false
      }
    })
    comments = appComments

    // loaderCommentsElement.classList.add('-display-none');
    renderApp()
    // }).catch((error) => {
    //   alert('Проверьте подключение к интернету');
    //   console.warn(error);
    // })
  })
}

// // Кнопка лайка
function ButtonTouch () {
  const likeButtons = document.querySelectorAll('.like-button')
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      const index = likeButton.dataset.index

      if (comments[index].liked === false) {
        comments[index].liked = true
        comments[index].likeCount += 1
      } else {
        comments[index].liked = false
        comments[index].likeCount -= 1
      }
      delay(2000).then(() => {
        renderApp()
      })
    })
  }
}
function delay (interval = 300) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, interval)
  })
}
// Цитирует выбранный комментарий
function initTouchComment () {
  const touchComments = document.querySelectorAll('.comment-text')
  const commentsElement = document.getElementById('comments-input')

  for (const comment of touchComments) {
    comment.addEventListener('click', () => {
      const index = comment.dataset.index
      commentsElement.value = `${comments[index].text}<\n>${comments[index].name}<\n`
    })
  }
}

// Удаление последнего комментария
function buttonDelete () {
  const buttonDeleteElements = document.querySelectorAll('.delete-button')
  for (const deleteButton of buttonDeleteElements) {
    const id = deleteButton.dataset.id
    deleteButton.addEventListener('click', () => {
      deleteButton.textContent = 'Удаляется...'
      return deleteComments({ token, id })
        .then(responseData => {
          comments = responseData
        })
        .then(() => {
          fetchGetAndRenderComments()
        })
    })
  }
}

// Повторный POST запрос при ошибке 500
function repeatedRequestComment () {
  mainForm.classList.add('-display-none')
  loaderCommentsElement.classList.remove('-display-none')
  // Передаем комментарий
  return repeatPostApp({
    token,
    text: commentsElement.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  })
    .then(responseData => {
      comments = responseData
    })
    .then(() => {
      return fetchGetAndRenderComments()
    })
    .then(data => {
      mainForm.classList.remove('-display-none')
      loaderCommentsElement.classList.add('-display-none')

      nameElement.value = ''
      commentsElement.value = ''
      buttonElement.disabled = true
    })
    .catch(error => {
      if (error.message === 'Слишком коротко') {
        alert('name и text должены содержать хотя бы 3 символа')
        mainForm.classList.remove('-display-none')
        loaderCommentsElement.classList.add('-display-none')
      }
      if (error.message === 'Сервер сломался') {
        repeatedRequestComment()
        console.warn(error)
      }
    })
}

function addComments () {
  const buttonElement = document.getElementById('add-button')
  const nameElement = document.getElementById('name-input')
  const commentsElement = document.getElementById('comments-input')
  const mainForm = document.querySelector('.add-form')
  const loaderCommentsElement = document.getElementById('loaderComments')
  buttonElement.disabled = true

  document.querySelectorAll('#name-input,#comments-input').forEach(element => {
    element.addEventListener('input', () => {
      if ( commentsElement.value === '') {
        buttonElement.disabled = true
      } else {
        buttonElement.disabled = false
      }
    })
  })

  mainForm.addEventListener('keyup', e => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      buttonElement.click()
    }
  })
  buttonElement.addEventListener('click', () => {
      commentsElement.classList.remove('error')

     if (commentsElement.value === '') {
      commentsElement.classList.add('error')
      return
    }
    mainForm.classList.add('-display-none')
    loaderCommentsElement.classList.remove('-display-none')

    // Передаем комментарий
    return postComments({
      token,
      text: commentsElement.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
    })
      .then(responseData => {
        comments = responseData
      })
      .then(() => {
        return fetchGetAndRenderComments()
      })
      .then(() => {
        mainForm.classList.remove('-display-none')
        loaderCommentsElement.classList.add('-display-none')

        nameElement.value = ''
        commentsElement.value = ''
        buttonElement.disabled = true
      })
      .catch(error => {
        if (error.message === 'Слишком коротко') {
          alert('name и text должены содержать хотя бы 3 символа')
          mainForm.classList.remove('-display-none')
          loaderCommentsElement.classList.add('-display-none')
        } else if (error.message === 'Сервер сломался') {
          console.warn(error)
          repeatedRequestComment()
        }
      })
  })
}

function renderApp () {
  const appEl = document.getElementById('app')

  if (!token) {
    renderLoginComponent({
      comments,
      appEl,
      setToken: newToken => {
        token = newToken
      },
      setUserName: newName =>{
        userName = newName
      },
      
      renderApp
    })

    return
  }

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
        comment.liked ? 'like-button -loading-like -active-like' : 'like-button'
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
    <div class="add-form">
      <input id="name-input" type="text" class="add-form-name" placeholder="${userName}"   />
      <textarea id="comments-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
       <button class="add-form-button" id="add-button">Написать</button>
       <button id="exit" class = "exit-button">Выйти</button>
      </div>
    </div>`
  appEl.innerHTML = appHtml
  document.getElementById('name-input').setAttribute('disabled', 'disabled');
 

   document.getElementById('exit').addEventListener('click', ()=>{
    token = !token;
    
    renderApp()
  });
  
// console.log(userName);
  ButtonTouch()
  initTouchComment()
  buttonDelete()
  addComments()
}

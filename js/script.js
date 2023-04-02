import {comments, addComments, fetchGetAndRenderComments} from "./requests.js"
import {ButtonTouch} from "./likes.js"

export const likeButtons = document.querySelectorAll(".like-button");
export const buttonElement = document.getElementById("add-button");
export const nameElement = document.getElementById("name-input");
export const commentsElement = document.getElementById("comments-input");
export const listElement = document.getElementById("list");
const commentListElement = document.getElementById("comment-list");
export const mainForm = document.querySelector(".add-form");
const loaderText = document.getElementById("loaderText");
export const loaderCommentsElement = document.getElementById("loaderComments");
buttonElement.disabled = true

// GET запрос 
// const fetchGetAndRenderComments = () => {
//   return fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
//     method: "GET"
//   }).then((response) => {
//     if (response.status === 200) {
//       return response.json();
//     } else {
//       throw new Error("Что то пошло не так")
//     }
//   }).then((responseData) => {
//     const options = {
//       year: '2-digit',
//       month: 'numeric',
//       day: 'numeric',
//       timezone: 'UTC',
//       hour: 'numeric',
//       minute: '2-digit'
//     };
//     const appComments = responseData.comments.map((comment) => {
//       return {
//         name: comment.author.name,
//         date: new Date(comment.date).toLocaleDateString("ru-RU", options).replace(',', ' '),
//         text: comment.text,
//         likeCount: comment.likes,
//         liked: false,
//       };
//     });
//     comments = appComments;
//     loaderCommentsElement.classList.add('-display-none')
//     renderComments();
//   }).catch((error) => {
//     alert('Проверьте подключение к интернету');
//     console.warn(error);
//   })
// }
// let comments = [];



// Выключение кнопки написать
const buttonBlock = () => {
  document.querySelectorAll("#name-input,#comments-input").forEach(element => {
    element.addEventListener('input', () => {
      if (nameElement.value === '' || commentsElement.value === '') {
        buttonElement.disabled = true;
      } else {
        buttonElement.disabled = false;
      }
    });
  });
}
// // Кнопка лайка
// const ButtonTouch = () => {
//   const likeButtons = document.querySelectorAll(".like-button");
//   for (const likeButton of likeButtons) {
//     likeButton.addEventListener("click", () => {
//       console.log(11);
//       const index = likeButton.dataset.index;

//       if (comments[index].liked === false) {
//         comments[index].liked = true;
//         comments[index].likeCount += 1;

//       } else {
//         comments[index].liked = false;
//         comments[index].likeCount -= 1;
//       }
//       delay(2000).then(() => {
//         renderComments();

//       })
//     })
//   };
// }
// function delay(interval = 300) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, interval);
//   });
// }
// Цитирует выбранный комментарий
const initTouchComment = () => {
  const touchComments = listElement.querySelectorAll(".comment-text");
  for (const comment of touchComments) {
    comment.addEventListener("click", () => {
      const index = comment.dataset.index;
      commentsElement.value = `>${comments[index].text}<\n>${comments[index].name}<,\n`
      renderComments();
    });
  }
}

// Удаление последнего комментария
const buttonDelete = () => {
  const buttonDeleteElement = document.getElementById("add-button-delete");
  buttonDeleteElement.addEventListener('click', () => {
    comments.pop();
    renderComments();
  });
};
buttonDelete();

// Повторный POST запрос при ошибке 500
// function repeatedRequestComment() {
//   mainForm.classList.add('-display-none');
//   loaderCommentsElement.classList.remove('-display-none');
//   // Передаем комментарий
//   fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
//     method: "POST",
//     body: JSON.stringify({
//       name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//       date: new Date,
//       text: commentsElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//       likeCount: 0,
//       liked: false,
//       forceError: true,
//     })
//   }).then((response) => {
//     if (response.status === 201) {
//       return response.json();
//     } else if (response.status === 400) {
//       throw new Error("Слишком коротко")
//     } else {
//       throw new Error("Сервер сломался")
//     }
//   }).then((responseData) => {
//     comments = responseData;
//   }).then(() => {
//     return fetchGetAndRenderComments();

//   }).then((data) => {
//     mainForm.classList.remove('-display-none');
//     loaderCommentsElement.classList.add('-display-none');

//     nameElement.value = '';
//     commentsElement.value = '';
//     buttonElement.disabled = true;
//   }).catch((error) => {
//     if (error.message === 'Слишком коротко') {
//       alert("name и text должены содержать хотя бы 3 символа");
//       mainForm.classList.remove('-display-none');
//       loaderCommentsElement.classList.add('-display-none');

//     } if (error.message === 'Сервер сломался') {
//       repeatedRequestComment();
//       console.warn(error);
//     }


//   });
//   renderComments();
// };



// const addComments = () => {
//   buttonElement.addEventListener("click", () => {

//     nameElement.classList.remove("error");
//     commentsElement.classList.remove("error");

//     nameElement.classList.remove("error");
//     commentsElement.classList.remove("error");

//     if (nameElement.value === '') {
//       nameElement.classList.add("error");
//       return

//     } else if (commentsElement.value === '') {
//       commentsElement.classList.add("error");
//       return
//     }
//     mainForm.classList.add('-display-none');
//     loaderCommentsElement.classList.remove('-display-none');

//     // Передаем комментарий
//     fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
//       method: "POST",
//       body: JSON.stringify({
//         name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//         date: new Date,
//         text: commentsElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
//         likeCount: 0,
//         liked: false,
//         forceError: true,
//       })
//     }).then((response) => {
//       if (response.status === 201) {
//         return response.json();
//       } else if (response.status === 400) {
//         throw new Error("Слишком коротко")
//       } else {
//         throw new Error("Сервер сломался")
//       }
//     }).then((responseData) => {
//       comments = responseData;
//     }).then(() => {
//       return fetchGetAndRenderComments();

//     }).then((data) => {
//       mainForm.classList.remove('-display-none');
//       loaderCommentsElement.classList.add('-display-none');

//       nameElement.value = '';
//       commentsElement.value = '';
//       buttonElement.disabled = true;
//     }).catch((error) => {
//       if (error.message === 'Слишком коротко') {
//         alert("name и text должены содержать хотя бы 3 символа");
//         mainForm.classList.remove('-display-none');
//         loaderCommentsElement.classList.add('-display-none');

//       } else if (error.message === 'Сервер сломался') {
//         console.warn(error);
//         repeatedRequestComment();
//       }


//     });
//     renderComments();
//   })
// };




// Пока не разобрался... 
// const editButtonTouch = () =>{

//   const editButtons = document.querySelectorAll(".edit-button");
//   for(editButton of editButtons){

//     editButton.addEventListener("click", () =>{
//       const index = editButton.dataset.index;
//       if(comments[index].isEdit === false){
//         comments[index].isEdit = true;

//       }else{
//         comments[index].isEdit = false;
//       }
//     });

//   }
// };



export const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" id = "comment-list" data-index="${index}">
    <div class="comment-header">
      <div data-index="${index}">${comment.name}</div>
      <div>${comment.date} </div>
    </div>
    <div class="comment-body">
    ${comment.isEdit
        ? `<textarea class="area-text">${comment.text}</textarea>`
        : `<div class="comment-text"data-index = "${index}">`}
        ${comment.text} 
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
      <button class = "edit-button" data-index ="${index}">Редактировать</button>
        <span class="likes-counter">${comment.likeCount}</span>
        <button data-index="${index}" class="${comment.liked ? 'like-button -loading-like -active-like' : 'like-button'}"></button>
        
      </div>
    </div>
  </li>`
  })
    .join('');
  listElement.innerHTML = commentsHtml
  ButtonTouch();
  initTouchComment();
  buttonBlock();
};
addComments();
fetchGetAndRenderComments();
renderComments();

mainForm.addEventListener("keyup", (e) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    buttonElement.click();

  }
});


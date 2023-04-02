import {buttonElement} from "./script.js"
import { loaderCommentsElement } from "./script.js";
import {listElement} from "./script.js";
import { nameElement } from "./script.js";
import { commentsElement } from "./script.js";
import {mainForm} from "./script.js"
import { renderComments } from "./script.js";
export let comments = [];

  export function repeatedRequestComment() {
    mainForm.classList.add('-display-none');
    loaderCommentsElement.classList.remove('-display-none');
    // Передаем комментарий
    fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: new Date,
        text: commentsElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likeCount: 0,
        liked: false,
        forceError: true,
      })
    }).then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Слишком коротко")
      } else {
        throw new Error("Сервер сломался")
      }
    }).then((responseData) => {
      comments = responseData;
    }).then(() => {
      return fetchGetAndRenderComments();
  
    }).then((data) => {
      mainForm.classList.remove('-display-none');
      loaderCommentsElement.classList.add('-display-none');
  
      nameElement.value = '';
      commentsElement.value = '';
      buttonElement.disabled = true;
    }).catch((error) => {
      if (error.message === 'Слишком коротко') {
        alert("name и text должены содержать хотя бы 3 символа");
        mainForm.classList.remove('-display-none');
        loaderCommentsElement.classList.add('-display-none');
  
      } if (error.message === 'Сервер сломался') {
        repeatedRequestComment();
        console.warn(error);
      }
  
  
    });
    renderComments();
  };

export const fetchGetAndRenderComments = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
        method: "GET"
    }).then((response) => {
        if (response.status === 200) {
            return response.json();}
        // } else {
        //     throw new Error("Что то пошло не так")
        // }
    }).then((responseData) => {
        const options = {
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: '2-digit'
        };
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleDateString("ru-RU", options).replace(',', ' '),
                text: comment.text,
                likeCount: comment.likes,
                liked: false,
            };
        });
        comments = appComments;
        loaderCommentsElement.classList.add('-display-none')
        renderComments();
    }).catch((error) => {
        // alert('Проверьте подключение к интернету');
        console.warn(error);
    })
}

export const addComments = () => {
    buttonElement.addEventListener("click", () => {

        nameElement.classList.remove("error");
        commentsElement.classList.remove("error");

        nameElement.classList.remove("error");
        commentsElement.classList.remove("error");

        if (nameElement.value === '') {
            nameElement.classList.add("error");
            return

        } else if (commentsElement.value === '') {
            commentsElement.classList.add("error");
            return
        }
        mainForm.classList.add('-display-none');
        loaderCommentsElement.classList.remove('-display-none');

        // Передаем комментарий
        fetch("https://webdev-hw-api.vercel.app/api/v1/timur-ramazanov/comments", {
            method: "POST",
            body: JSON.stringify({
                name: nameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
                date: new Date,
                text: commentsElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
                likeCount: 0,
                liked: false,
                forceError: true,
            })
        }).then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error("Слишком коротко")
            } else {
                throw new Error("Сервер сломался")
            }
        }).then((responseData) => {
            comments = responseData;
        }).then(() => {
            return fetchGetAndRenderComments();

        }).then((data) => {
            mainForm.classList.remove('-display-none');
            loaderCommentsElement.classList.add('-display-none');

            nameElement.value = '';
            commentsElement.value = '';
            buttonElement.disabled = true;
        }).catch((error) => {
            if (error.message === 'Слишком коротко') {
                alert("name и text должены содержать хотя бы 3 символа");
                mainForm.classList.remove('-display-none');
                loaderCommentsElement.classList.add('-display-none');

            } else if (error.message === 'Сервер сломался') {
                console.warn(error);
                repeatedRequestComment();
            }


        });
        renderComments();
    })
};
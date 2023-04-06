import { renderComments } from "./script.js";
import { comments } from "./requests.js";
// Кнопка лайка
export const ButtonTouch = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      console.log(11);
      const index = likeButton.dataset.index;

      if (comments[index].liked === false) {
        comments[index].liked = true;
        comments[index].likeCount += 1;

      } else {
        comments[index].liked = false;
        comments[index].likeCount -= 1;
      }
      delay(2000).then(() => {
        renderComments();

      })
    })
  };
}
export const delay = (interval = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}



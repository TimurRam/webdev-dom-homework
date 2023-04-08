export function getComments() {
    return fetch("https://webdev-hw-api.vercel.app/api/v2/timur-ramazanov/comments", {
        method: "GET",
        
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Что то пошло не так")
        }
    })
} 

export function deleteComments ({token, id}) {
    return fetch("https://webdev-hw-api.vercel.app/api/v2/timur-ramazanov/comments/" + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        return response.json();
      })
}

export function postComments ({token, name, text}){
    return fetch("https://webdev-hw-api.vercel.app/api/v2/timur-ramazanov/comments", {
        method: "POST",
        body: JSON.stringify({
          name,
          date: new Date,
          text,
          likeCount: 0,
          liked: false,
          forceError: true,
        }),
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Слишком коротко")
        } else {
          throw new Error("Сервер сломался")
        }
      })
}

export function repeatPostApp ({token, text, name}){
    fetch("https://webdev-hw-api.vercel.app/api/v2/timur-ramazanov/comments", {
        method: "POST",
        body: JSON.stringify({
          name,
          date: new Date,
          text,
          likeCount: 0,
          liked: false,
          forceError: true,
        }),
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Слишком коротко")
        } else {
          throw new Error("Сервер сломался")
        }
      })
}

export function likeComments(id, token) {
    return fetch("https://webdev-hw-api.vercel.app/api/v2/timur-ramazanov/comments/" + id + "/toggle-like", {
        method: "POST",
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json();
})
}


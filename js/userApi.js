export function userLogin (login, password) {
  return fetch('https://webdev-hw-api.vercel.app/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      login: login,
      password: password
    })
  }).then(response => {
    switch (response.status) {
      case 400:
        throw new Error('Не верный логин или пароль')
      case 201:
        return response.json()
    }
  })
}

export function userRegistration ({ login, password, name }) {
  return fetch('https://webdev-hw-api.vercel.app/api/user', {
    method: 'POST',
    body: JSON.stringify({
      login: login,
      name: name,
      password: password
    })
  }).then(response => {
    switch (response.status) {
      case 400:
        throw new Error('Пользователь с таким логином уже существует')
      case 201:
        return response.json()
    }
  })
}

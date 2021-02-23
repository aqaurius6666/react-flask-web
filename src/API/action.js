
const BASE_URL = "https://it-must-be-ok.herokuapp.com/"
export const api_register = (username, password, cb) => {
    const url = BASE_URL + "api/accounts"
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then((data) => cb(data))
        .catch(msg => console.log(msg))
}

export const api_login = (username, password, cb) => {
    const url = BASE_URL + "api/authentication"
    return fetch(url, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "Application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then(data => {
            storeLogin(data)
            cb(data)
        })
        .catch(error => console.log(error))

}
export const storeLogin = ({ token, user }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", user)
    localStorage.setItem("isLogin", true)
}
export const api_get_user = (cb) => {
    const url = BASE_URL + "api/authentication"
    cb(localStorage.getItem("user"))
    fetch(url, {
        method: "GET",
        headers: { ...authHeader() },
    })
    .then(handleResponse)
    .then(data => {
        storeLogin(data)
        cb(data)
    })
    .catch(() => {
        cb({user : null})
        logout()
    })
}
export const api_get_student = (cb) => {
    const url = BASE_URL + "api/student"
    fetch(url, {
        method: "GET",
        headers: { ...authHeader() },
    })
    .then(handleResponse)
    .then(data => {
        cb(data)
    })
        
}
export const api_update_passowrd = (old_password, password, cb) => {
    const url = BASE_URL + "api/account"
    fetch(url, {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "Application/json" },
        body: JSON.stringify({ old_password, password })
    })
        .then(handleResponse)
        .then(data => cb(data.message))
        .catch(error => cb(error))
}
export const api_update_student = (student, cb) => {
    const url = BASE_URL + "api/student"
    fetch(url, {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "Application/json" },
        body: JSON.stringify(student)
    })
        .then(handleResponse)
        .then(data => cb(data.message))
        .catch(error => cb(error))
}
export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("isLogin")
}
const handleResponse = (res) => {
    return new Promise((resolve, reject) => {
        if (!res.ok) {
            reject(`${res.status} ${res.statusText}`)
        } else {
            resolve(res.json())
        }
    })
}

export const authHeader = () => {
    return {
        "x-access-token": localStorage.getItem("token")
    }
}

export const initialUser = () => {
    return localStorage.getItem("user")
}

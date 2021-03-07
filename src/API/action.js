import { useContext } from "react"
import userContext from "../Components/userContext"

export const api_register = (username, password, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/accounts"
    fetch(url, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then((data) => cb(data.message))
        .catch(msg => console.log(msg))
}

export const api_login = (username, password, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/authentication"
    return fetch(url, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then(data => {
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", data.user)
            cb(data.message, data.user)
        })
        .catch(error => console.log(error))

}

export const api_get_user = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/authentication"
    cb(localStorage.getItem("user"))
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => {
            localStorage.setItem("user", data.user)
            cb(data.user)
        })
        .catch(msg => {
            console.log(msg)
            cb(undefined)
            localStorage.removeItem("user")
        })
}
export const api_get_student = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/student"
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => cb(data.student))
        .catch(msg => {
            console.log(msg)
            cb(undefined)
        })
}
export const api_get_score = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/scores"
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => cb(data.score))
        .catch(msg => {
            console.log(msg)
            cb(undefined)
        })
}

export const api_update_passowrd = (old_password, password, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/account"
    fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ old_password, password })
    })
        .then(handleResponse)
        .then(data => cb(data.message))
        .catch(error => cb(error))
}

export const api_update_student = (student, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/student"
    fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(student)
    })
        .then(handleResponse)
        .then(data => cb(data.message))
        .catch(error => cb(error))
}
export const logout = (cb) => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    cb()
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
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "Application/json"
    }
}

export const initialUser = () => {
    return localStorage.getItem("user")
}
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
            cb(data.message, data.user)
        })
        .catch(error => console.log(error))

}

export const api_get_user = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/authentication"
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => cb(data.user))
        .catch(msg => { console.log(msg)
                        cb(undefined)            
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
        .catch(msg => { console.log(msg)
                        cb(undefined)            
            })
}
export const api_update_student = (student) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/student"
    fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(student)
    })
}
export const logout = (cb) => {
    localStorage.removeItem("token")
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

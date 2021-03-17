import {BehaviorSubject} from 'rxjs'
import { BASE_URL } from '../config';
import authenticationService from './authenticationService';
import handleResponse from './handleResponse';
export const currentUserSubject = new BehaviorSubject(localStorage.getItem('user'))

const userService = {
    getUser,
    updateUser,
    currentUserValue,
    getUserValueById
}; export default userService;

function currentUserValue() {
    return JSON.parse(currentUserSubject.value)
}
function getUserValueById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        },
    };
    return fetch(`${BASE_URL}/api/user/${id}`, requestOptions)
        .then(handleResponse)
        .then((data) => {
            return data.user
        });
}

function updateUser(student) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        },
        body: JSON.stringify(student)
    };
    return fetch(`${BASE_URL}/api/student`, requestOptions)
        .then(handleResponse)
        .then(({message}) => {
            console.log(message)
        });
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        }
    };

    return fetch(`${BASE_URL}/api/user`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const { user } = data
            const strUser = JSON.stringify(user)
            localStorage.setItem('user', strUser)
            currentUserSubject.next(strUser)
            return user
        });
}

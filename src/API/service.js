import handleResponse from './handleResponse';
import authenticationService from './authenticationService'
export function getAllStudent() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        }
    };
    return fetch(`https://it-must-be-ok.herokuapp.com/api/students`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}

export function getAllTeacher() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        }
    };
    return fetch(`https://it-must-be-ok.herokuapp.com/api/teachers`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}

export function getStudentByName(name) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        }
    };
    let urlName = name.replace(/\s/g, '+')
    return fetch(`https://it-must-be-ok.herokuapp.com/api/users?name=${urlName}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}
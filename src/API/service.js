import { BehaviorSubject } from 'rxjs'
import history from '../history'

const currentAccountSubject = new BehaviorSubject(localStorage.getItem('account'))
const currentTokenSubject = new BehaviorSubject(localStorage.getItem('token'))
const currentUserSubject = new BehaviorSubject(localStorage.getItem('user'))

export const authenticationService = {
    login,
    logout,
    check_auth,
    register,
    currentAccount: currentAccountSubject.asObservable(),
    currentAccountValue,
    currentTokenValue
    
};
function currentAccountValue() {return JSON.parse(currentAccountSubject.value)}
function currentTokenValue() {
    return currentTokenSubject.value }

export const userService = {
    getUser,
    updateUser,
    currentUserValue
}
export const courseService = {
    getCourses,
    registerCourse,
    getStudentCourse,
}
function getCourses() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/courses`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        });
}
function getStudentCourse() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/student/scores`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}
function registerCourse(array) {
    console.log(JSON.stringify({...array, is_list:true}))
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        },
        body: JSON.stringify({...array, is_list:true})
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/student/scores`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        });
}
function register({username, password, role}) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, role})
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/accounts`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        });
}
function currentUserValue() {
    return JSON.parse(currentUserSubject.value)
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
    return fetch(`https://it-must-be-ok.herokuapp.com/api/student`, requestOptions)
        .then(handleResponse)
        .then(({message}) => {
            console.log(message)
        });
}
function check_auth() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': authenticationService.currentTokenValue()
        }
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/authentication`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const { token } = data
            localStorage.setItem('token', token)
            currentTokenSubject.next(token)
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

    return fetch(`https://it-must-be-ok.herokuapp.com/api/user`, requestOptions)
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
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/authentication`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const { account, token } = data
            const strAccount = JSON.stringify(account)
            localStorage.setItem('account', strAccount)
            currentAccountSubject.next(strAccount)
            localStorage.setItem('token', token)
            currentTokenSubject.next(token)
            return account
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('account')
    currentAccountSubject.complete()
    //currentAccountSubject.next(null)
    localStorage.removeItem('token')
    currentTokenSubject.complete()
    //currentTokenSubject.next(null)
    localStorage.removeItem('user')
    //currentUserSubject.next(null)
    currentUserSubject.complete()
    history.push('/login')

}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
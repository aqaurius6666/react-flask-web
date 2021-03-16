import { BehaviorSubject } from 'rxjs'
import {currentUserSubject} from './userService'
import history from '../history'
import handleResponse from './handleResponse';
const currentAccountSubject = new BehaviorSubject(localStorage.getItem('account'))
const currentTokenSubject = new BehaviorSubject(localStorage.getItem('token'))

const authenticationService = {
    login,
    logout,
    check_auth,
    register,
    currentAccount: currentAccountSubject.asObservable(),
    currentAccountValue,
    currentTokenValue,
    getId
    
}; export default authenticationService;

function currentAccountValue() {return JSON.parse(currentAccountSubject.value)}
function getId() {return JSON.parse(currentAccountSubject.value).id}
function currentTokenValue() {return currentTokenSubject.value }

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
            const { token } = data
            localStorage.setItem('token', token)
            currentTokenSubject.next(token)
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

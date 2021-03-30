import { BASE_URL } from "../config";
import authenticationService from "./authenticationService";
import handleResponse from "./handleResponse";

const courseService = {
    getCourses,
    registerCourse,
    getStudentCourse,
    getStudentCourseById,
    deleteCourse,
    getCourseTeaching,
    getStudentInCourse,
    updateScore,
}; export default courseService;

function getStudentInCourse(cid) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };
    
    return fetch(`${BASE_URL}/api/students?course=${cid}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        });
}
function updateScore(cid, array) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        },
        body: {
            'cid' : cid,
            'array' : array
        }
    };
    
    return fetch(`${BASE_URL}/api/teacher/score`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        });
}

function getCourses() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };
    
    return fetch(`${BASE_URL}/api/courses`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        });
}
function getCourseTeaching() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };
    
    return fetch(`${BASE_URL}/api/teacher/courses`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}

function getStudentCourseById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };

    return fetch(`${BASE_URL}/api/student/${id}/scores`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
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

    return fetch(`${BASE_URL}/api/student/scores`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return(data)
        });
}



function registerCourse(array) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        },
        body: JSON.stringify({...array, is_list:true})
    };
    return fetch(`${BASE_URL}/api/student/scores`, requestOptions)
        .then(handleResponse)
        .then(data => {
            console.log(data)
        });
}

function deleteCourse(cid) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };

    return fetch(`${BASE_URL}/api/student/scores/${cid}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data
        });
}
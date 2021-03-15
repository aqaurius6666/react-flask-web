import authenticationService from "./authenticationService";
import handleResponse from "./handleResponse";

const courseService = {
    getCourses,
    registerCourse,
    getStudentCourseById
}; export default courseService;

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

function getStudentCourseById(id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token' : authenticationService.currentTokenValue()
        }
    };

    return fetch(`https://it-must-be-ok.herokuapp.com/api/student/${id}/scores`, requestOptions)
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

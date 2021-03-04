import React, { useState } from 'react'
import history from '../history'
import { Link } from "react-router-dom";
import { authenticationService } from '../API/service';



export const Register = () => {
    return (
        <>
            <RegisterForm />
        </>
    )
}
export const RegisterForm = () => {

    const [form, setForm] = useState({
        "username": "",
        "password": "",
        "password2": "",
        "role": ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        if (validate_form()) {
            authenticationService.register(form)
            history.push('/login')
        } else {
            console.log("password not match")
        }
    }
    const validate_form = () => {
        return form.password == form.password2
    }
    return (
        <div className="login-container">
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username"
                            onChange={(e) => setForm({ ...form, username: e.target.value })} />
                        <input type="password" placeholder="Password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })} />
                        <input type="password" placeholder="Conf. Password"
                            onChange={(e) => setForm({ ...form, password2: e.target.value })} />
                        <label>Role: </label>
                        <select name="role" onChange={(e) => setForm({...form, role: e.target.value})}>
                            <option value="Student" selected >Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>
                        <button>create</button>
                        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
                <div className="login-padding">

                </div>
            </div>
        </div >
    )
}
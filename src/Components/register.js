import React, { useState } from 'react'
import history from '../history'
import { Link } from "react-router-dom";
import authenticationService from '../API/authenticationService';
import Loading from './loading';

export const Register = () => {
    const [loading, setLoading] = useState(false)
    return (
        <>
            <RegisterForm loading={loading} setLoading={setLoading}/>
        </>
    )
}
export const RegisterForm = (props) => {
    
    const [form, setForm] = useState({
        "username": "",
        "password": "",
        "password2": "",
        "role": "Student"
    })
    const {loading, setLoading} = props
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (validate_form()) {
            authenticationService.register(form).then(() => {
                setLoading(false)
                history.push('/login')
            }).catch(() => {
                setLoading(false)
            })
        } else {
            alert("Password not match")
        }
    }
    const validate_form = () => {
        return form.password === form.password2
    }
    if (loading) return <Loading/>
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
                            <option value="Student">Student</option>
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
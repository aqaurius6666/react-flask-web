
import { useContext, useEffect, useState } from "react"
import { api_get_student, api_update_student } from "../API/action"
import { ChangePassword } from "./change_password"
import userContext from "./userContext"

export const ChangeInfo = (props) => {
    const [form, setForm] = useState(undefined)
    useEffect(() => {
        api_get_student((data) => setForm(data))
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault()
        api_update_student(form, (msg) =>console.log(msg))

    }
    if (form) {
        return (
            <>
            <label>Info: </label>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label>Name: </label>
                    <input value={form.name ? form.name : ""} onChange={(e) => setForm({ ...form, name: e.target.value })}></input>
                </div>

                <div>
                    <label>Date of birth: </label>
                    <input value={form.dob ? form.dob : ""} placeholder="dd/mm/yyyy"onChange={(e) => setForm({...form, dob: e.target.value})}></input>
                </div>
                <div>
                    <label>House ID: </label>
                    <input value={form.hid ? form.hid : ""} onChange={(e) => setForm({ ...form, hid: e.target.value })}></input>
                </div>

                    <button>Update</button>
                </form>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}
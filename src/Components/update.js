import { useContext, useEffect, useState } from "react"
import { api_get_student, api_update_student } from "../API/action"
import userContext from "./userContext"

export const Update = (props) => {
    const [form, setForm] = useState(undefined)
    const {user} = useContext(userContext)
    useEffect(() => {
        api_get_student((data) => setForm(data))
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault()
        api_update_student(form)

    }
    if (!user) {
        return <div>You are not log in!</div>
    }
    if (form) {
        return (
            <form onSubmit={onSubmitForm}>
                <div>
                    <label>Name: </label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}></input>
                </div>

                <div>
                    <label>Date of birth: </label>
                    <input value={form.dob} placeholder="dd/mm/yyyy"onChange={(e) => setForm({...form, dob: e.target.value})}></input>
                </div>
                <div>
                    <label>House ID: </label>
                    <input value={form.hid} onChange={(e) => setForm({ ...form, hid: e.target.value })}></input>
                </div>

                <button>Update</button>
            </form>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}
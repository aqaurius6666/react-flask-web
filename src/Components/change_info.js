
import { useEffect, useState } from "react"
import { api_get_student, api_update_student } from "../API/action"


export const ChangeInfo = (props) => {
    const [form, setForm] = useState(undefined)
    useEffect(() => {
        api_get_student((data) => setForm(data))
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault()
        api_update_student(form, (msg) => console.log(msg))
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
                        <input value={form.dob ? form.dob : ""} placeholder="dd/mm/yyyy" onChange={(e) => setForm({ ...form, dob: e.target.value })}></input>
                    </div>
                    <div>
                        <label>House: </label>
                        <select name="hid" >
                            <option value="1000">Gryffindor</option>
                            <option value="1001">Slytherin</option>
                            <option value="1002">Ravenclaw</option>
                            <option value="1003">Hufflepuff</option>
                        </select>
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
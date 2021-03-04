import React from "react"
import { userService } from "../API/service"

export const ChangeInfo = (props) => {
    const { setForm, form } = props
    const onSubmitForm = (e) => {
        e.preventDefault()
        userService.updateUser(form)
    }
    return (
        <>
            <h1>Info: </h1>
            <form className="form-group" onSubmit={onSubmitForm}>
                <div>
                    <label>Hobby: </label>
                    <input value={form.hobby ? form.hobby : ""}
                        onChange={(e) => setForm({ ...form, hobby: e.target.value })} />
                </div>

                <div>
                    <label>Date of birth: </label>
                    <input value={form.dob ? form.dob : ""} placeholder="dd/mm/yyyy"
                        onChange={(e) => setForm({ ...form, dob: e.target.value })} />
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
                <button className="btn btn-success">Update</button>
            </form>
        </>
    )
}

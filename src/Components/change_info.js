import React from "react"
import userService from "../API/userService"
import {NavLink} from "react-bootstrap";

export const ChangeInfo = (props) => {
    const { setForm, form } = props
    const onSubmitForm = (e) => {
        e.preventDefault()
        userService.updateUser(form)
    }
    return (
        <div className="col-7 body_font mb-5">
            <h1><i className="fa fa-wrench" aria-hidden="true"/> Information</h1>
            <form className="form-group" onSubmit={onSubmitForm}>
                <div>
                    <label>Hobby: </label>
                    <input className="form-control" type="text" value={form.hobby ? form.hobby : ""}
                        onChange={(e) => setForm({ ...form, hobby: e.target.value })} />
                </div>
                <div>
                    <label>Date of birth: </label>
                    <input className="form-control" type='date' value={form.dob ? form.dob : ""} placeholder="dd/mm/yyyy"
                        onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                </div>
                <div>
                    <label>House: </label>
                    <select className="form-control" name="hid" >
                        <option value="1000">Gryffindor</option>
                        <option value="1001">Slytherin</option>
                        <option value="1002">Ravenclaw</option>
                        <option value="1003">Hufflepuff</option>
                    </select>
                </div>
                <button className="btn btn-success mt-3">Update</button>
            </form>
        </div>
    )
}

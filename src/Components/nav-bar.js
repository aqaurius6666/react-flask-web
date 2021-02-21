import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../API/action';
import userContext from './userContext';

const NavBar = (props) => {
    const {user, setUser} = useContext(userContext)
    let button;

    const handleLogOut =(e) => {
        logout(() => setUser(undefined))
    }
    
    if (user) {
        return (
            <>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/info">Info</NavLink>
            <NavLink exact to="/update">Update</NavLink>

            <NavLink exact to="/login" onClick={handleLogOut}>Log out</NavLink>
            <NavLink exact to="/register" onClick={handleLogOut}>Register</NavLink>
            </>
        )
    } else {
        return(
            <>
            <NavLink exact to="/login" onClick={handleLogOut}>Log in</NavLink>
            <NavLink exact to="/register" onClick={handleLogOut}>Register</NavLink>
            </>
        )
    }
}; export default NavBar
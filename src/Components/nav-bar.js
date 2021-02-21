import React, { useContext } from 'react'
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { logout } from '../API/action';
import userContext from './userContext';
import logo from '../logo.svg'

const NavBar = (props) => {
    const {user, setUser} = useContext(userContext)
    let button;

    const handleLogOut =(e) => {
        logout(() => setUser(undefined))
    }
    
    if (user) {
        return (
            <>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top" expand="lg">
                    <a className="navbar-brand" href="/"><img src={logo} height="80" width="auto"></img></a>
                    <Navbar.Brand href="/">HỌC VIỆN PHÁP THUẬT HOGWART</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-link-bar" exact to="/">Home</NavLink>
                            <NavLink className="nav-link-bar" exact to="/info">Info</NavLink>
                            <NavLink className="nav-link-bar" exact to="/update">Update</NavLink>
                            <NavLink className="nav-link-bar" exact to="/login" onClick={handleLogOut}>Log out</NavLink>
                            <NavLink className="nav-link-bar" exact to="/register" onClick={handleLogOut}>Register</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
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
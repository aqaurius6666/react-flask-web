import React, {useEffect, useState} from 'react'
import {Nav, Navbar, NavLink} from "react-bootstrap";
import authenticationService from '../API/authenticationService';
import logo1 from "../img/hogwart.svg";
import userService from "../API/userService";
import Dropdown from "react-bootstrap/Dropdown";

const NavBar = () => {
    // const [authUser, setAuthUser] = useState(null)
    const account = authenticationService.currentAccountValue()
    // useEffect(() => {
    //     if (account) userService.getUserValueById(account.id).then(data => {
    //         setAuthUser(data)
    //     })
    // },[account])

    const handleLogOut =() => {
        authenticationService.logout()
    }

    if (account) {
        return (
            <>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top white_black_chi"
                        expand="lg">
                    <div className="ml-5 d-none d-xl-block"> </div>
                    <a className="navbar-brand" href="/">
                        <img src={logo1} height="40vw" width="auto" alt="logo1"/></a>
                    <Navbar.Brand href="/">HOGWARTS ACADEMY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarcollapse">
                        <Nav className="mr-auto row">
                            <NavLink href="/"><i className="fa fa-home" aria-hidden="true" /> Home</NavLink>
                            <NavLink href="/about"><i className="fa fa-info-circle" aria-hidden="true" />  About</NavLink>
                            <NavLink href="/info"><i className="fa fa-user" aria-hidden="true" /> Personal Info</NavLink>
                            <NavLink href="/courses"><i className="fa fa-book" aria-hidden="true" /> Courses</NavLink>
                            <NavLink href="/update"><i className="fa fa-wrench" aria-hidden="true"/> Update</NavLink>
                            <NavLink href="/analysis"><i className="fa fa-stack-overflow" aria-hidden="true"/> Analysis</NavLink>

                            <div className="login-nav-margin d-none d-xl-block"> </div>
                            <NavLink id="login-nav-link" href="/login" onClick={handleLogOut}>
                                <i className="fa fa-sign-out" aria-hidden="true" />Log out
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    } else {
        return(
            <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top white_black_chi"
                    expand="lg">
                <div className="navbar-padding d-none d-xl-block"> </div>
                <a className="navbar-brand" href="/">
                    <img src={logo1} height="40" width="auto" alt="logo1"/></a>
                <Navbar.Brand href="#">HOGWARTS ACADEMY</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto row">
                        <div className="login-nav-margin d-none d-xl-block"> </div>
                        <div className="login-nav-margin d-none d-xl-block"> </div>
                        <div className="login-nav-margin d-none d-xl-block"> </div>
                        <NavLink href="/login" onClick={handleLogOut}>
                            <i className="fa fa-sign-in" aria-hidden="true" />Log in
                        </NavLink>
                        <NavLink href="/register" onClick={handleLogOut}>
                            <i className="fa fa-user-plus" aria-hidden="true" /> Register</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}; export default NavBar
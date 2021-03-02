import React from 'react'
import {Nav, Navbar} from "react-bootstrap";
import { authenticationService } from '../API/authentication';
import logo1 from "../img/hogwart.svg";

const NavBar = () => {
    const account = authenticationService.currentAccountValue()

    const handleLogOut =() => {
        authenticationService.logout()
    }
    
    if (account) {
        return (
            <>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top white_black_chi"
                        expand="lg">
                        <div className="navbar-padding d-none d-xl-block"> </div>
                        <a className="navbar-brand" href="/">
                            <img src={logo1} height="40vw" width="auto" alt="logo1"/></a>
                        <Navbar.Brand href="/">HOGWARTS ACADEMY</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="navbarcollapse">
                            <Nav className="mr-auto row">
                                <Nav.Link href="/"><i className="fa fa-home" aria-hidden="true" /> Home</Nav.Link>
                                <Nav.Link href="/about"><i className="fa fa-info-circle" aria-hidden="true" />  About</Nav.Link>
                                <Nav.Link href="/info"><i className="fa fa-user" aria-hidden="true" /> Personal Info</Nav.Link>
                                <Nav.Link href="/courses"><i className="fa fa-book" aria-hidden="true" /> Courses</Nav.Link>
                                <Nav.Link href="/update"><i className="fa fa-wrench" aria-hidden="true"/> Update</Nav.Link>
                                <div className="login-nav-margin d-none d-xl-block"> </div>
                                <Nav.Link id="login-nav-link" href="/login" onClick={handleLogOut}>
                                    <i className="fa fa-sign-out" aria-hidden="true" />Log out
                                </Nav.Link>
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
                        <Nav.Link href="/login" onClick={handleLogOut}>
                            <i className="fa fa-sign-in" aria-hidden="true" /> Log in</Nav.Link>
                        <Nav.Link href="/register" onClick={handleLogOut}>
                            <i className="fa fa-user-plus" aria-hidden="true" /> Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}; export default NavBar
import React, { useContext } from 'react'
import {Nav, Navbar} from "react-bootstrap";
import { logout } from '../API/action';
import logo1 from "../img/hogwart.svg";
import accountContext from './accountContext';

const NavBar = () => {
    const {account, setAccout} = useContext(accountContext)

    const handleLogOut =() => {
        logout(() => setAccout(undefined))
    }
    
    if (account) {
        return (
            <>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top white_black_chi"
                        expand="lg">
                    <a className="navbar-brand" href="/">
                        <img src={logo1} height="40" width="auto" alt="logo1"/></a>
                    <Navbar.Brand href="/">HOGWARTS ACADEMY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarcollapse">
                        <Nav className="mr-auto row">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/info">Info</Nav.Link>
                            <Nav.Link href="/update">Update</Nav.Link>
                            <Nav.Link href="/login" onClick={handleLogOut}>Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    } else {
        return(
            <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top white_black_chi"
                    expand="lg">
                <a className="navbar-brand" href="/">
                    <img src={logo1} height="40" width="auto" alt="logo1"/></a>
                <Navbar.Brand href="#">HOGWARTS ACADEMY</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto row">
                        <Nav.Link href="/login" onClick={handleLogOut}>Log in</Nav.Link>
                        <Nav.Link href="/register" onClick={handleLogOut}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}; export default NavBar
import {Jumbotron} from "react-bootstrap";
import React from "react";
import witch from '../img/witch.svg'
import hat from '../img/hat.svg'
import logo from "../img/hogwarts_sm_logo.svg"

const Header = () => {
    return (
        <Jumbotron className="headerComponent">
            <div className="row container">
                <div className="col-12 col-md-6">
                    <h2 className='white_black_chi'>WELCOME TO HOGWARTS
                        <img src={hat} alt="logo" width="10%" height="auto"/></h2>
                    <blockquote className='signature'>
                        “ Welcome to Hogwarts. I hope you have a great time here. ”
                    </blockquote>
                    <p className='signature'>
                        - Albus Dumbledore -
                    </p>
                </div>
                <div className="d-none d-sm-block col-md-6">
                    <img src={witch} alt="logo" width="60%" height="auto"/>
                    <img src={logo} alt="loading" width="40%" height="auto" />
                </div>
            </div>
        </Jumbotron>
    )
}

export default Header;
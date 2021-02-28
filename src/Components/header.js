import {Jumbotron} from "react-bootstrap";
import React from "react";
import fh from '../img/cat.gif'
import hat from '../img/hat.svg'
import giphy from "../img/giphy.gif"

const Header = () => {
    return (
        <Jumbotron className="headerComponent">
            <div className="row container">
                <div className="d-none d-sm-block col-md-1"> </div>
                <div className="col-12 col-md-6">
                    <h2 className='white_black_chi'>WELCOME TO HOGWARTS
                    <img className="d-inline d-sm-none" src={giphy} alt="logo" width="20%" height="auto"/>
                        <img src={hat} alt="logo" width="10%" height="auto"/></h2>
                    <blockquote className='signature'>
                        “ Welcome to Hogwarts. I hope you have a great time here. ”
                    </blockquote>
                    <p className='signature'>
                        - Albus Dumbledore -
                    </p>
                </div>
                <div className="d-none d-sm-block col-md-5">
                    <img src={giphy} alt="logo" width="50%" height="auto"/>
                    <img src={fh} alt="fh" width="30%" height="auto" />
                </div>
            </div>
        </Jumbotron>
    )
}

export default Header;
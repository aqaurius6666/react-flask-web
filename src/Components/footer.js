import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../img/hogwarts_sm_logo.svg'

function Footer() {
    return(
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-1 col-sm-3">
                        <h6>Links</h6>
                        <ul>
                            <li><Link className="footer_link" to='/'>Home</Link></li>
                            <li><Link className="footer_link" to='/about'>About</Link></li>
                            <li><Link className="footer_link" to='/info'>Info</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-3">
                        <h6>Our Address</h6>
                        <address>
                            <p className="small">Hogwarts Academy, London, England<br />
                            <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a className="footer_link" href="mailto:hogwarts@wizard.net">
                            hogwarts@wizard.net</a></p>
                        </address>
                    </div>
                    <div className="col-12 col-sm-5">
                        <p><img className="d-none d-sm-inline" height="100px" width="auto" src={logo} alt="logo" />
                        <strong>HOGWARTS ACADEMY</strong></p>
                    </div>
                </div>
                <hr className="hr"/>
                <div className="row">
                    <div className="col-auto">
                        <p className="small">© Copyright 2021 Tra-Thuan-Vu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
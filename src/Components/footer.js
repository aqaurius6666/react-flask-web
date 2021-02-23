import React from 'react';
import {Link} from 'react-router-dom'

function Footer() {
    return(
        <div className="footer">
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/info'>Info</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                            Hogwarts Academy, London, England<br />
                            <i className="fa fa-phone fa-lg"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax fa-lg"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:hogwarts@wizard.net">
                            hogwarts@wizard.net</a>
                        </address>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2021 Tra-Thuan-Vu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
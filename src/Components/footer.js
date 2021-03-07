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
                            <li><a className="footer_link" to='/'>Home</a></li>
                            <li><a className="footer_link" to='/about'>About</a></li>
                            <li><a className="footer_link" to='/info'>Info</a></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-3">
                        <h6>Our Address</h6>
                        <address>
                            <p className="small">Hogwarts Academy, London, England<br />
                            <i className="fa fa-phone fa-lg" />: +852 1234 5678<br />
                            <i className="fa fa-fax fa-lg" />: +852 8765 4321<br />
                            <i className="fa fa-envelope fa-lg" />: <a className="footer_link" href="mailto:hogwarts@wizard.net">
                            hogwarts@wizard.net</a></p>
                        </address>
                    </div>
                    <div className="col-12 col-sm-5 d-none d-sm-inline">
                        <p><img height="100px" width="auto" src={logo} alt="logo" />
                        <strong>HOGWARTS ACADEMY</strong></p>
                    </div>
                </div>
                <hr className="hr"/>
                <div className="row">
                    <div className="social-media-link col-5 col-md-6">
                        <a className="btn btn-social-icon btn-pinterest"
                           href="https://www.pinterest.com/harrypotterfilm/_created/">
                            <i className="fa fa-pinterest" />
                        </a>
                        <a className="btn btn-social-icon btn-facebook"
                           href="https://www.facebook.com/hogwarts">
                            <i className="fa fa-facebook" />
                        </a>
                        <a className="btn btn-social-icon btn-google"
                           href="https://www.youtube.com/user/HarryPotter">
                            <i className="fa fa-youtube" />
                        </a>
                        <a className="btn btn-social-icon btn-linkedin"
                           href="https://www.linkedin.com/company/hogwarts-testing/">
                            <i className="fa fa-linkedin" />
                        </a>
                        <a className="btn btn-social-icon btn-twitter"
                           href="https://twitter.com/hogwartslegacy">
                            <i className="fa fa-twitter" />
                        </a>
                        <a className="btn btn-social-icon btn-instagram"
                           href="https://www.instagram.com/hogwartsofficial_/">
                            <i className="fa fa-instagram" />
                        </a>
                    </div>
                    <div className="col-7 col-md-6 copyright">
                        <p className="small fa fa-copyright">Copyright 2021 Team:Thuan-Tra-Vu</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
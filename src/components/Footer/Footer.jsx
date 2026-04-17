import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

<li><Link to="/menu">Menu</Link></li>

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>FoodHub is your go-to platform for ordering delicious meals from a wide variety of cuisines. We aim to deliver fresh, tasty, and affordable food right to your doorstep.</p>
                    <div className="footer-social-icons">
                        <a href="https://app.netlify.com/teams/vandna75" target="_blank">
                            <img src={assets.netlify_icon} alt="" />
                        </a>
                        <a href="https://github.com/vandna75" target="_blank">
                            <img src={assets.github_icon} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/in/vandna-kumari" target="_blank">
                            <img src={assets.linkedin_icon} alt="" />
                        </a>
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>

                <div className="footer-content-right">
                    <h2>Contact Us</h2>
                    <ul>
                        <li>
                            <a href="tel:+917544082302">
                                Phone: +91 7544082302
                            </a>
                        </li>
                        <li>
                        <a href="https://wa.me/917544082302" target="_blank">
                            Chat on WhatsApp
                        </a>
                        </li>
                        <li>
                            <a href="mailto:vandnakumari83269@gmail.com">
                                Email: vandnakumari83269@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 © FoodHub.com - All Right Reserved.</p>
        </div>
    )
}

export default Footer

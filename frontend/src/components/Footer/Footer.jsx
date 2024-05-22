import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets'; // Import assets properly

const Footer = () => {
  return (

    
    <div className='footer' id='footer'>
        
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Indulge in a diverse menu of delightful dishes made with premium ingredients, perfect for satisfying your cravings and enhancing your dining pleasure, one mouthful at a time.</p>
          <div className="footer-social-icons">
          <a href="https://www.facebook.com">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
            
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul> {/* Change <li> to <ul> */}
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right"> {/* Correct class name */}
          <h2>GET IN TOUCH</h2>
          <ul> {/* Add <ul> for list items */}
            <li>+91-96-454-8390</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> {/* Correct class name */}
        copyright 2024 @ Tomato.com
      </p>
    </div>
  );
}

export default Footer;

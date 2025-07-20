import React from 'react'
import { FaFacebook, FaInstagram , FaYoutube} from 'react-icons/fa'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-top">
          <h2>Need Update On Latest Offers?</h2>
          <p>Do not miss out! Join our newsletter for the latest insights.</p>
          <div className="input-footer">
            <input type="email" placeholder='Enter Your email'/>
            <button>Join Now!</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-left">
        <h2>DoorStep</h2>
        <div className="social">
        <FaFacebook className='social-icon'/>
        <FaInstagram className='social-icon'/>
        <FaYoutube className='social-icon'/>
        </div>
          </div>
          <div  className="footer-right">
            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>About Us</li>
              <li>Privacy policy</li>
            </ul>
          </div>
        </div>
        <p className="copy">© 2025 DoorStep. All rights are Reserved</p>
      </div>
    </div>
  )
}

export default Footer
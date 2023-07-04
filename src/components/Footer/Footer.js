import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <div className='footer'>
      <div className='sb__footer section__padding'>
        
        <hr />
        <div className='sb__footer-below'>
          <div className='sb__footer-copyright'>
            <p>@{new Date().getFullYear()} KLoc Technologies Pvt Ltd - All right reserved.</p>
          </div>
          <div className='sb__footer-below-links'>
            <a href='/terms'>
              <div>
                <p>terms & Conditions</p>
              </div>
            </a>
            <a href='/terms'>
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href='/terms'>
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href='/terms'>
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
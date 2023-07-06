import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const iconStyle = {
  fontSize: "28px", // Adjust the size as per your preference
};
function Footer() {
  return (
    <div className='footer'>
      <div className='sb__footer section__padding'>
        <div className='sb__footer-links'>
          <div className='sb__footer-links_div'>
            <h4>Suit #402,Brigade Irv center,</h4>
            <h4>Nallurhalli Road, Whitefield </h4>
            <h4>Bangalore - 560066</h4>
            <a href='https://info@kloctechnologies.com'>
              info@kloctechnologies.com
            </a>
            <br />
            <h4>mobile : +91 09663897463</h4>
          </div>
          {/* <div className='sb__footer-links_div'>
            <h4>Resources</h4>
            <a href='/employer'>
              <p>Resources center</p>
            </a>
            <a href='/employer'>
              <p>testimonials</p>
            </a>
            <a href='/employer'>
              <p>STV</p>
            </a>
          </div> */}
          {/* <div className='sb__footer-links_div'>
            <h4>Company</h4>
            <a href='/employer'>
              <p>About</p>
            </a>
            <a href='/employer'>
              <p>Press</p>
            </a>
            <a href='/employer'>
              <p>Career</p>
            </a>
            <a href='/employer'>
              <p>Contact</p>
            </a>
          </div> */}
          <div className='sb__footer-links_div'>
            <h4>Follow Us</h4>
            <div className='social-media'>
              <p>
                <FaFacebook style={iconStyle} />
              </p>
              <p>
                <a href='https://www.instagram.com/klocsutra/'>
                  <FaInstagram style={iconStyle} />
                </a>
              </p>
              <p>
                <a href='https://www.linkedin.com/company/kloc-technologies/'>
                  <FaLinkedin style={iconStyle} />
                </a>
              </p>
              <p>
                <a href='https://twitter.com/klocsutra'>
                  <FaTwitter style={iconStyle} />
                </a>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className='sb__footer-below'>
          <div className='sb__footer-copyright'>
            <p>
              @{new Date().getFullYear()} Kloctechnologies Pvt Ltd. All right
              reserved.
            </p>
          </div>
          <div className='sb__footer-below-links'>
            <a href='https://kloctechnologies.com/terms-conditions'>
              <div>
                <p>terms & Conditions</p>
              </div>
            </a>
            <a href='https://kloctechnologies.com/privacy-policy'>
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href='https://kloctechnologies.com/about/'>
              <div>
                <p>About</p>
              </div>
            </a>
            <a href='https://kloctechnologies.com/contact/'>
              <div>
                <p>Contact</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
// Home component is about showing home page 
// import react, react-icons, reactjs-popup, react-router-dom, and Footer component and css files like index.css and reactjs-popup/dist/index.css to render Home component
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'
import "./index.css";

function Home() {
  // navigate variable is used to navigating to different routes
  const navigate = useNavigate();
  return (
    <div >
      <div className="home-container">
      <div className='headerContainer'>
        <div className='headerLogoContainer'>
          <img
            src='https://res.cloudinary.com/de5cu0mab/image/upload/v1688968121/kloc-white-logo_ct8uhz.png'
            alt='logo'
            style={{ height: "120px", width: "120px",marginTop:'10px'}}
          />
        </div>
        <div className='desktopHeaderNavbarContainer'>
           {/* clicking Home text, it'll navigates to home route */}
          <p onClick={() => navigate("/")} className='headerDesktopNavbarLink'>
            Home
          </p>
           {/* clicking Student text, it'll navigates to Student route */}
          <p
            onClick={() => navigate("/studentLogin")}
            className='headerDesktopNavbarLink'
          >
            Student
          </p>
           {/* clicking Admin text, it'll navigates to adminLogin route */}
          <p
            onClick={() => navigate("/adminLogin")}
            className='headerDesktopNavbarLink'
          >
            Admin
          </p>
        </div>
        <div className='admin-mobile-header-navbar-container'>
          <Popup
            contentStyle={{ width: "60%", backgroundColor: "white",textAlign:'center'}}
            trigger={
              <button className='admin-hamburger-btn'>
                <GiHamburgerMenu />
              </button>
            }
            position='bottom right'
          >
            <ul className='admin-mobile-hamburger-menu'>
              {/* clicking Home text, it'll navigates to home route */}
              <li onClick={() => navigate("/")} className='headerNavbarLink'>
                Home
              </li>
              {/* clicking Student text, it'll navigates to Student route */}
              <li
                onClick={() => navigate("/studentLogin")}
                className='headerNavbarLink'
              >
                Student
              </li>
              {/* clicking Admin text, it'll navigates to adminLogin route */}
              <li
                onClick={() => navigate("/adminLogin")}
                className='headerNavbarLink'
              >
                Admin
              </li>
            </ul>
          </Popup>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:'200px',
          fontSize:'40px',
          fontWeight:'bold',
          textAlign:'center'
        }}
      >
        Welcome to Assessments Made Simple
        <br />
        KLoc Technologies Pvt Ltd
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

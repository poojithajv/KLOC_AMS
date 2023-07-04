import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'
import "./index.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div >
      <div className="home-container">
      <div className='headerContainer'>
        <div className='headerLogoContainer'>
          <img
            src='https://res.cloudinary.com/de5cu0mab/image/upload/v1688216997/KLoc_Square_Logo_-_400x400_ciw1ej.jpg'
            alt='logo'
            style={{ height: "50px", width: "70px", borderRadius: "10px" }}
          />
        </div>
        <div className='desktopHeaderNavbarContainer'>
          <p onClick={() => navigate("/")} className='headerDesktopNavbarLink'>
            Home
          </p>
          <p
            onClick={() => navigate("/studentLogin")}
            className='headerDesktopNavbarLink'
          >
            Student
          </p>
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
              <li onClick={() => navigate("/")} className='headerNavbarLink'>
                Home
              </li>
              <li
                onClick={() => navigate("/studentLogin")}
                className='headerNavbarLink'
              >
                Student
              </li>
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

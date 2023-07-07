// this component is about to display not found component when admin accessed wrong path
// import react, gapi-script, react-router-dom and css files like index.css and reactjs-popup/dist/index.css to render NotFound component
import React, {useState} from 'react' 
import gapi from "gapi-script";
import {useNavigate,useLocation} from 'react-router-dom'
import "reactjs-popup/dist/index.css";
import "./index.css";

const NotFound = () => {
  // navigate variable is used to navigating to different routes
  const navigate = useNavigate();
  return (
    <div>
    <div className='not-found-container'>
      <img
        className='not-found-img'
        src='https://res.cloudinary.com/dahw90b2z/image/upload/v1649202458/erroring_1_wmrpgf.png'
        alt='page not found'
      />
      <h1 className='no-found-heading'>Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <p onClick={()=>navigate('/')}>Please go back to homepage</p>
    </div>
    </div>
  );
};

export default NotFound;

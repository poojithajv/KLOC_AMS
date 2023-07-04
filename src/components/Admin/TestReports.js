// import all required packages like react, react-icons, reactjs-popup, @mui/material, react-router-dom, js-cookie to render the TestReports component
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import gapi from "gapi-script";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import Navbar from "./Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from '../Footer/Footer'
import "./AdminLogin.css";

const TestReports = () => {
  // location varaiable to get location of the testReports route and state
  const location = useLocation();
  const [data, setData] = useState(location.state);
  // navigate variable used to naviagating to different routes
  const navigate = useNavigate();
  // created testDetails array that consists of all tests objects with keys name, id, url and data responses object
  const testDetails = [
    {
      name: "QA Test",
      id: "fresher_qa_test",
      url: "https://www.fitaacademy.in/includes/assets/img/blog/software-testing.jpg",
      data: data?.datat?.qaData || [],
    },
    {
      name: "Full Stack Developer Test",
      id: "fullstack_developer_test",
      url: "https://assets.website-files.com/6239c24c282f5581285fbbb3/6357613e0b897b701b563c7a_full%20stack%20developer%20assessment%20test.jpg",
      data: data?.datat?.fullStackData || [],
    },
    {
      name: "Python Test",
      id: "fresher_python_test",
      url: "https://st3.myideasoft.com/idea/ct/82/myassets/blogs/python-ne-icin-kullanilir.jpg",
      data: data?.datat?.pythonData || [],
    },
    {
      name: "Java Test",
      id: "fresher_java_test",
      url: "https://i0.wp.com/www.techbooky.com/wp-content/uploads/2019/10/java-logo.png",
      data: data?.datat?.javaData || [],
    },
    {
      name: "Freshers Test",
      id: "fresher_test",
      url: "https://img.freepik.com/premium-vector/man-with-laptop-studying-working-concept_113065-167.jpg",
      data: data?.datat?.fresherData || [],
    },
    {
      name: "Frontend Fresher Test",
      id: "frontend_fresher_test",
      url: "https://staticlearn.shine.com/l/m/images/blog/Front--end-developer.png",
      data: data?.datat?.frontEndFresherData || [],
    },
    {
      name: "Shopify Developer Test",
      id: "shopify_developer_test",
      url: "https://colorlib.com/wp/wp-content/uploads/sites/2/free-shopify-themes.jpg",
      data: data?.datat?.shopifyData || [],
    },
    {
      name: "MERN Developer Junior Test",
      id: "mern_developer_junior",
      url: "https://www.technology4u.in/wp-content/uploads/2021/07/epv55hgtsfi8csprpj9u.jpg",
      data: data?.datat?.mernDeveloperJuniorData || [],
    },
    {
      name: "MERN Developer Intermediate Test",
      id: "mern_developer_intermediate",
      url: "https://www.bigscal.com/wp-content/uploads/2022/09/Features-of-Mern-stack-development-services-You-Should-Know.png",
      data: data?.datat?.mernDeveloperIntermediateData || [],
    },
    {
      name: "Freshers Junior Test",
      id: "freshers_junior_test",
      url: "https://play-lh.googleusercontent.com/8HEJdrLd48HwrAzlRva8xjG1wxCuu0VUd9ML6ySw76q-lBD0AeWofbNZqYPrjWSCgf8=w240-h480-rw",
      data: data?.datat?.freshersJuniorData || [],
    },
  ];

  // after component rendering, the below effect will run only once with empty dependency array
  useEffect(() => {
    // token varaible to get token value
    const token = Cookies.get("token");
    // if token is undefined, notFound Component will be navigated
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <div>
    <div>
      {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
      <div className='admin-header-container'>
        <div className='admin-header-logo-container'>
          {/* logo */}
          <img
            src='https://res.cloudinary.com/de5cu0mab/image/upload/v1688216997/KLoc_Square_Logo_-_400x400_ciw1ej.jpg'
            alt='logo'
            style={{ height: "50px", width: "70px", borderRadius: "10px" }}
            onClick={() => navigate("/")}
          />
        </div>
        <div className='admin-desktop-header-navbar-container'>
          {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
          <p
            onClick={() => navigate("/dashboard", { state: data })}
            className='admin-desktop-header-navbar-link'
          >
            Dashboard
          </p>
          {/* when clicking this Assessments text, it'll navigates to send assessments route */}
          <p
            onClick={() => navigate("/sendAssessments", { state: data })}
            className='admin-desktop-header-navbar-link'
          >
            Assessments
          </p>
          {/* when clicking this Test Reports text, it'll navigates to test reports route */}
          <p
            onClick={() => navigate("/testReports", { state: data })}
            className='admin-desktop-header-navbar-link'
          >
            Test Reports
          </p>
          {/* when clicking this student reports text, it'll navigates to student reports route */}
          <p
            onClick={() => navigate("/studentReports", { state: data })}
            className='admin-desktop-header-navbar-link'
          >
            Student Reports
          </p>
          {/* when clicking this Sign Out text, it'll navigates to admin login route and again admin can access all routes */}
          <p
            className='admin-desktop-header-navbar-link'
            onClick={() => navigate("/adminLogin")}
          >
            Admin
          </p>
        </div>
        {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
        <div className='admin-mobile-header-navbar-container'>
          <Popup
            contentStyle={{ width: '70%',backgroundColor:"white",textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'content',alignItems:'center' }}
            trigger={
              <button className='admin-hamburger-btn'>
                <GiHamburgerMenu />
              </button>
            }
            position='bottom right'
          >
            <ul className='admin-mobile-hamburger-menu'>
              {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
              <li
                onClick={() => navigate("/dashboard", { state: data })}
                className='admin-header-navbar-link'
              >
                Dashboard
              </li>
              {/* when clicking this Assessments text, it'll navigates to send assessments route */}
              <li
                onClick={() => navigate("/sendAssessments", { state: data })}
                className='admin-header-navbar-link'
              >
                Assessments
              </li>
              {/* when clicking this Test Reports text, it'll navigates to test reports route */}
              <li
                onClick={() => navigate("/testReports", { state: data })}
                className='admin-header-navbar-link'
              >
                Test Reports
              </li>
              {/* when clicking this student reports text, it'll navigates to student reports route */}
              <li
                onClick={() => navigate("/studentReports", { state: data })}
                className='admin-header-navbar-link'
              >
                Student Reports
              </li>
              {/* when clicking this Sign Out text, it'll navigates to admin login route and again admin can access all routes */}
              <li
                onClick={() => navigate("/adminLogin")}
                className='admin-header-navbar-link'
              >
                Admin
              </li>
            </ul>
          </Popup>
        </div>
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>Test Reports</h1>
        {/* all tests cards */}
        <div className='test-container'>
          {testDetails.map((each, index) => {
            return (
              <Card sx={{ width: 345, margin: "20px" }} key={index}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='140'
                    image={each.url}
                    alt='green iguana'
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {each.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  sx={{ margin: "20px" }}
                  variant='contained'
                  // clicking view button it'll navigates to respective test tabulation routes
                  onClick={() =>
                    navigate(`/testReports/${each.id}`, { state: each.data })
                  }
                >
                  View
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default TestReports;

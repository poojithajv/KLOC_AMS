// MernDeveloperJuniorTabulation component is about displaying data responses if freshers junior test in table
// import Footer component, react, react-router-dom packages, gapi-script, react-icons, reactjs-popup, @mui/x-data-grid packages and css files like index.css file and reactjs-popup/dist/index.css file to render MernDeveloperJuniorTabulation component
import { useState} from "react"
import { GiHamburgerMenu } from "react-icons/gi";
import gapi from "gapi-script";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {useNavigate,useLocation} from 'react-router-dom'
import { DataGrid } from "@mui/x-data-grid";
import Footer from '../../Footer/Footer'
import './table.css'

function MernDeveloperJuniorTest() {
  // location varaiable to get location of the testReports route and state
  const location=useLocation()
  // useState of data to store Mern Developer Junior test data responses
  const [data, setData] = useState(
    location.state.map((item, index) => ({ ...item, id: index + 1 }))
  );
  // navigate variable used to naviagating to different routes
  const navigate=useNavigate()

  // table data
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Timestamp",
      headerName: "Completed On",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Name",
      headerName: "Name",
      width: 220,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Email_Address",
      headerName: "Email Address",
      width: 220,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Phone_Number",
      headerName: "Phone Number",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "total_score",
      headerName: "Total Score",
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "aptitude_score",
      headerName: "Aptitude Score",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "technical_score",
      headerName: "Technical Score",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "View Score",
      headerName: "View Score",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => navigate("/studentChart", { state: params.row })}
          style={{width:'60px',padding:'5px'}}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="test-footer-container">
        <div className="test-reports-container">
          {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
          <div className='admin-header-container'>
            <div className='admin-header-logo-container'>
              {/* logo */}
              <img src="https://res.cloudinary.com/de5cu0mab/image/upload/v1688968121/kloc-white-logo_ct8uhz.png" 
                alt="logo" style={{ height: "120px", width: "120px",marginTop:'10px'}} onClick={()=>navigate('/')}/>
            </div>
            <div className='admin-desktop-header-navbar-container'>
              {/* when clicking this Home text, it'll navigates to home route */}
              <p
                onClick={() => navigate("/")}
                className="admin-desktop-header-navbar-link"
              >
                Home
              </p>
              {/* when clicking this Admin text, it'll navigates to admin login route and again admin can access all routes */}
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
                  {/* when clicking this Home text, it'll navigates to home route */}
                  <li
                    onClick={() => navigate("/")}
                    className="admin-header-navbar-link"
                  >
                    Home
                  </li>
                  {/* when clicking this Admin text, it'll navigates to admin login route and again admin can access all routes */}
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
          <h1 style={{textAlign:'center'}}>MERN Developer Junior Test Tabulation Data</h1>
          {/* desktop table container with table of Mern Developer Junior test data respones */}
          <div className='desktop-table'>
            {data.length > 0 ? (
              <div
                style={{
                  minHeight: 100,
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 15, 20]}
                />
              </div>
            ) : (
              "No Data Found"
            )}
          </div>
          {/* mobile table container with table of Mern Developer Junior test data responses */}
          <div className='mobile-table'>
            {data.length >0  ? (
              data.map((item,index)=>
                <div className='table-data-cont'>
                  <div className='table-data'>
                    <p className='th'>Id</p>
                    <p className='td'>{index+1}</p>
                  </div>
                  <div className='table-data'>
                    <p>Completed On</p>
                    <p className='td'>{item.Timestamp}</p>
                  </div>
                  <div className='table-data'>
                    <p>Name</p>
                    <p className='td'>{item.Name}</p>
                  </div>
                  <div className='table-data'>
                    <p>Email Address</p>
                    <p className='td'>{item.Email_Address}</p>
                  </div>
                  <div className='table-data'>
                    <p>Phone Number</p>
                    <p className='td'>{item.Phone_Number}</p>
                  </div>
                  <div className='table-data'>
                    <p>Email Address</p>
                    <p className='td'>{item.Email_Address}</p>
                  </div>
                  <div className='table-data'>
                    <p>Total Score</p>
                    <p className='td'>{item.Score}</p>
                  </div>
                  <div className='table-data'>
                    <p>{item.aptitude_score !==undefined ? 'Aptitude Score' : 'Java Score'}</p>
                    <p className='td'>{item.aptitude_score !==undefined ? item.aptitude_score : item.fullstack_java_score}</p>
                  </div>
                  <div className='table-data'>
                    <p>{item.technical_score !==undefined ? "Technical Score" : "React Score"}</p>
                    <p className='td'>{item.technical_score !==undefined ? item.technical_score : (item.reasoning_score!==undefined ? item.reasoning_score : item.fullstack_react_score )}</p>
                  </div>
                  <div className='table-data'>
                    <p>Test Type</p>
                    <p className='td'>{item.testType}</p>
                  </div>
                  {/* clicking view button it'll navigates to studentChart route */}
                  <div className='view-button'>
                    <button className='btn' onClick={()=>navigate('/studentChart',{state:item})}>View Score</button>
                  </div>
            </div>
            )) : 'No Data Found'}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MernDeveloperJuniorTest
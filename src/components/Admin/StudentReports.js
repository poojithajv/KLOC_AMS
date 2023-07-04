// import all required packages like react, react-icons, reactjs-popup, js-cookie, react-router-dom and css file StudentReports.css for styling
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import "./index.css";

function StudentReports() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(location.state);
  let data1 = data?.allData?.flat() || [];

  let data2 = data1.map((item, index) => ({ ...item, id: index + 1 }));
  const [filterData, setFilterData] = useState(data2);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  const handleButtonClick = (item) => {
    navigate("/studentChart", { state: item });
    //console.log(`Button clicked for row with ID: ${id}`);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 20,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Timestamp",
      headerName: "Completed On",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "Name",
      headerName: "Name",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div style={{ whiteSpace: "wrap", lineHeight: "1" }}>
          {params.value}
        </div>
      ),
    },
    {
      field: "Email_Address",
      headerName: "Email Address",
      width: 160,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            wordWrap: "break-word",
            whiteSpace: "wrap",
            width: 140,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "Phone_Number",
      headerName: "Phone Number",
      width: 120,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      sortable: false,
    },
    {
      field: "Score",
      headerName: "Total Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "aptitude_score",
      headerName: "Aptitude Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "technical_score",
      headerName: "Technical Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "fullstack_java_score",
      headerName: "Java Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "fullstack_react_score",
      headerName: "React Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "reasoning_score",
      headerName: "Reasoning Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "testType",
      headerName: "Test Type",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "wrap",
            lineHeight: "1",
            wordWrap: "break-word",
            width: 100,
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "View",
      headerName: "View Score",
      width: 100,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      sortable:false,
      renderCell: (params) => (
        <button
          onClick={() => navigate("/studentChart", { state: params.row })}
          style={{ padding: "3px", width: "60px" }}
        >
          View
        </button>
      ),
    },
  ];

  const scoreColumns = [
    "aptitude_score",
    "technical_score",
    "fullstack_java_score",
    "fullstack_react_score",
    "reasoning_score",
  ];

  scoreColumns.forEach((column) => {
    const columnIndex = columns.findIndex((col) => col.field === column);
    if (columnIndex !== -1) {
      columns[columnIndex].renderCell = (params) => {
        const fieldValue = params.value || "NA";
        return <span>{fieldValue}</span>;
      };
    }
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if ((e.target.value = "" || e.key === "Backspace" || e.keyCode === 8)) {
      setFilterData(data2);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setSearch(e.target.value);
      setFilterData(data2);
    }
  };

  const handleFilter = () => {
    const filtered = data2.filter((item) => {
      const itemDate = new Date(item.Timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Added one day to the end date
      return itemDate >= start && itemDate <= end;
    });
    setFilterData(filtered);
  };

  const searchData = filterData.filter((i) =>
    i.Email_Address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const token = Cookies.get("token");
    // if token is not in system it will redirects to notFound route
    if (!token) {
      navigate("/unauthorized");
    }
    setFilterData(searchData);
    //console.log("triggered");
  }, [search]);
  return (
    <div className='student-reports-container'>
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
        <h1 style={{ marginBottom: "15px", textAlign: "center" }}>
          Student Data
        </h1>
        <div className='input-label-container'>
          <label htmlFor='search'>Search by Student Email :</label>
          <input
            id='search'
            value={search}
            type='text'
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            style={{
              marginLeft: "25px",
            }}
            className='input-search input'
          />
        </div>
        <div className='date-filter'>
          <div className='display-between'>
            Start Date:{"   "}
            <input
              type='date'
              value={startDate}
              className='date-input'
              style={{width:'130px',marginLeft:'5px'}}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='display-between'>
            End Date:{" "}
            <input
              type='date'
              value={endDate}
              className='date-input'
              style={{width:'130px',marginLeft:'5px'}}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            style={{ padding: "2px", width: "60px" }}
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className='d-none d-lg-block'>
          {filterData.length > 0 ? (
            <div style={{ minHeight: 100, width: "95%", margin: "auto" }}>
              <DataGrid
                rows={filterData}
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
        {/* mobile table container with all tests data responses cards */}
        <div className='d-lg-none mobile-table-container'>
          {filterData.length > 0
            ? filterData.map((item, index) => (
                <div className='table-data-container'>
                  <div className='table-data'>
                    <p className='th'>Id</p>
                    <p className='td'>{index + 1}</p>
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
                    <p>
                      {item.aptitude_score !== undefined
                        ? "Aptitude Score"
                        : "Java Score"}
                    </p>
                    <p className='td'>
                      {item.aptitude_score !== undefined
                        ? item.aptitude_score
                        : item.fullstack_java_score}
                    </p>
                  </div>
                  <div className='table-data'>
                    <p>
                      {item.technical_score !== undefined
                        ? "Technical Score"
                        : "React Score"}
                    </p>
                    <p className='td'>
                      {item.technical_score !== undefined
                        ? item.technical_score
                        : item.reasoning_score !== undefined
                        ? item.reasoning_score
                        : item.fullstack_react_score}
                    </p>
                  </div>
                  <div className='table-data'>
                    <p>Test Type</p>
                    <p className='td'>{item.testType}</p>
                  </div>
                  <div className='view-button'>
                    <button
                      className='btn'
                      onClick={() => navigate("/studentChart", { state: item })}
                    >
                      View Score
                    </button>
                  </div>
                </div>
              ))
            : "No Data Found"}
        </div>
      </div>
    </div>
  );
}

export default StudentReports;
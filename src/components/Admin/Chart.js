// this component about score card design,downloading score card,sending scores to candidate through emails including cc
// import packages like react-icons, gapi-script, reactjs-popup, react, jspdf, @emailjs/browser, react-bootstrap, react-to-print, react-router-dom, recharts
// and component like Footer and css files like index.css and  reactjs-popup/dist/index.css files to render Chart component
import { GiHamburgerMenu } from "react-icons/gi";
import gapi from "gapi-script";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Footer from '../Footer/Footer'
import "./index.css";

function Chart() {
  // useRef hook 
  const detailsPdf = useRef();
  // location to store the location of chart
  const location = useLocation();
  // usestate of data to produce chart
  const [data, setData] = useState(location.state);
  // mailId usestate to store mailId to sent mails
  const [mailId, setMailId] = useState(null);
  // isOpen usestate to store boolean value of isOpen to show modal
  const [isOpen, setIsOpen] = useState(false);
  // navigate is used to navigating to different routes
  const navigate = useNavigate();
  // colors used to produce piechart
  const COLORS = ["#111359","#afd25f"];
  let pieData;
  //  this condition is validating aptitude score and technical score,
  //  if it is aptitude score and technical score taking
  //   this data and designing piechat which is candidate
  //   who wrote the test which has apitude and technical are sections of that respective test
  if (data.aptitude_score !== undefined && data.reasoning_score === undefined) {
    pieData = [
      {
        name: "Aptitude",
        value: data.aptitude_score,
      },
      {
        name: "Technical",
        value: data.technical_score,
      },
    ];
    //  this condition is  validating aptitude score and reasoing score,
    //  if it is aptitude score and reasoning score taking
    //   this data and designing piechat which is candidate
    //   who wrote the test which has apitude and reasoning are sections of that respective test
  } else if (
    data.aptitude_score !== undefined &&
    data.reasoning_score !== undefined
  ) {
    pieData = [
      {
        name: "Aptitude",
        value: data.aptitude_score,
      },
      {
        name: "Reasoning",
        value: data.reasoning_score,
      },
    ];
    //  this condition is  validating java score and React score,
    //  if it is java score and React score taking
    //   this data and designing pieChat which is candidate
    //   who wrote the test which has Java and React are sections of that respective test
  } else {
    pieData = [
      {
        name: "Java",
        value: data.fullstack_java_score,
      },
      {
        name: "React",
        value: data.fullstack_react_score,
      },
    ];
  }

  // this function regarding to generate the pdf which includes student details along with scores piechat when clicking on the download button in the component
  const generatePdf = useReactToPrint({
    content: () => detailsPdf.current,
    documentTitle: data.Email_Address.slice(0, data.Email_Address.indexOf("@")),
    onAfterPrint: () => alert("pdf downloaded"),
  });
  // this handle Submit function regarding to sending email to candidates.  this function  includes whatever the detail sending  candidate through email,
  // store those details in the variable name message
  const handleSubmit = (item) => {
    var document = new jsPDF("landscape", "px", "a4", false);
    document.rect(60, 60, 600, 400, "D");
    document.setLineWidth(2);
    document.setDrawColor(255, 0, 0);
    document.setFillColor(0, 255, 0);
    document.text(
      60,
      60,
      "TestCompleted: " +
        data.Timestamp +
        "\n" +
        "\n" +
        "Email: " +
        data.Email_Address +
        "\n" +
        "\n" +
        "Score: " +
        data.Score +
        "\n" +
        "\n" +
        data.aptitude_score !==
        undefined
        ? "Aptitude Score : "
        : "Java Score: " + data.aptitude_score !== undefined
        ? data.aptitude_score
        : data.fullstack_java_score + "\n" + "\n" + data.technical_score !==
          undefined
        ? "Technical Score : "
        : "React Score: " + data.technical_score !== undefined
        ? data.technical_score
        : data.reasoning_score !== undefined
        ? data.reasoning_score
        : data.fullstack_react_score
    );
    data.new_Mail = item;

    const pdfContent = document.output("datauristring");
    // this message variable includes data which sending to candidate through mail
    let message = `Hello ${data.Email_Address} \n \n Here Your result Details \n \n ${pdfContent}`;
    data.section1_score =
      data.aptitude_score !== undefined
        ? data.aptitude_score
        : data.fullstack_java_score;
    data.section2_score =
      data.technical_score !== undefined
        ? data.technical_score
        : data.reasoning_score !== undefined
        ? data.reasoning_score
        : data.fullstack_react_score;

    data.type1 =
      data.aptitude_score !== undefined ? "Aptitude Score" : "Java Score";
    data.type2 =
      data.technical_score !== undefined
        ? "Technical Score"
        : data.reasoning_score !== undefined
        ? "Reasoning Score"
        : "React Score";

    emailjs
      .send(
        "service_52vbgo4",
        "template_ibuby0d",
        {
          ...data,
          message: message,
        },
        "SzLGLBrz5rRn3ETlY"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${data.Email_Address}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  // this function is to toggle boolean value of isOpen variable to show modal
  const sendMail = (data) => {
    setIsOpen(!isOpen);
  };
  // this function is to toggle boolean value of isOpen variable to close modal
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="chart-container">
        {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
        <div className="admin-header-container">
          <div className="admin-header-logo-container">
            {/* logo */}
            <img src="https://res.cloudinary.com/de5cu0mab/image/upload/v1688968121/kloc-white-logo_ct8uhz.png" 
                alt="logo" style={{ height: "120px", width: "120px",marginTop:'10px'}} onClick={()=>navigate('/')}/>
          </div>
          <div className="admin-desktop-header-navbar-container">
            {/* when clicking this Home text, it'll navigates to home route */}
            <p
              onClick={() => navigate("/")}
              className="admin-desktop-header-navbar-link"
            >
              Home
            </p>
            {/* when clicking this Admin text, it'll navigates to admin login route and again admin can access all routes */}
            <p
              className="admin-desktop-header-navbar-link"
              onClick={() => navigate("/adminLogin")}
            >
              Admin
            </p>
          </div>
          {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Admin */}
          <div className="admin-mobile-header-navbar-container">
            <Popup
              contentStyle={{ width: '70%',backgroundColor:"white",textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'content',alignItems:'center' }}
              trigger={
                <button className="admin-hamburger-btn">
                  <GiHamburgerMenu />
                </button>
              }
              position="bottom right"
            >
              <ul className="admin-mobile-hamburger-menu">
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
                  className="admin-header-navbar-link"
                >
                  Admin
                </li>
              </ul>
            </Popup>
          </div>
        </div>
        {/* Showing student details and piechart */}
        <div ref={detailsPdf} className="charts">
          <div className="details">
            <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
              Student Details:
            </h1>
            <p>Name : {data.Name}</p>
            <p>Email : {data.Email_Address}</p>
            <p>Score : {data.Score}</p>
            <p>
              {data.aptitude_score !== undefined
                ? `Aptitude Score : ${data.aptitude_score}`
                : `Java Score : ${data.fullstack_java_score}`}
            </p>
            <p>
              {data.technical_score !== undefined
                ? `Technical Score :  ${data.technical_score}`
                : data.reasoning_score !== undefined
                ? `Reasoning Score : ${data.reasoning_score}`
                : `React Score : ${data.fullstack_react_score}`}
            </p>
          </div>
          <div>
            <PieChart width={250} height={300} className="piechart">
              <Pie
                data={pieData}
                color="#000000"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        {/* showing download, send email buttons */}
        <div className="button-container">
          {/* download button to download the score card */}
          <button
            type="button"
            style={{
              backgroundColor: "#111359",
              color: "white",
              padding: "10px",
              border: "none",
              fontSize: "15px",
              marginRight: "20px",
            }}
            onClick={generatePdf}
          >
            Download
          </button>
          {/* send email button to send score via email */}
          <button
            style={{
              backgroundColor: "darkgrey",
              color: "black",
              padding: "10px",
              border: "none",
              fontSize: "15px",
              marginRight: "20px",
            }}
            onClick={() => sendMail(data)}
            className="send"
          >
            Send Email
          </button>
        </div>
        {/* modal to add cc mail ids to send scores via emails */}
        <Modal show={isOpen} onRequestClose={handleClose} className="modal">
          <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title>Email Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Student Mail ID: </Form.Label>
              <Form.Control type="text" value={data.Email_Address} />
            </Form.Group>
            <Form.Group>
              <Form.Label>CC Mail ID's: </Form.Label>
              <Form.Control
                type="text"
                value={mailId}
                onChange={(e) => setMailId(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button
            style={{backgroundColor:"#111359",marginTop:"-7px",color:'white',padding:'3px'}}
              variant="primary"
              type="submit"
              
              onClick={() => {
                handleSubmit(mailId);
                setIsOpen(!isOpen);
              }}
            >
              Send Email
            </button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default Chart;
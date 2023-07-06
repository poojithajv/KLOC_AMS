// import all required packages like react, unique-random, @emailjs-browser, js-cookie, react-router-dom, @mui-material, reactjs-popup, react-icons and components like EachCandidateInputField, index.css components to render the SendAssessments component
import React, { useState, useEffect } from "react";
import EachCandidateInputField from "./EachCandidateInputField";
import uniqueRandom from "unique-random";
import emailjs from "@emailjs/browser";
import "./index.css";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "@mui/material";
import Footer from '../Footer/Footer'
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Assessment = () => {
  const [activeTest, setActiveTest] = useState("");
  const [studentCount, setStudentCount] = useState(1);
  const [proceeding, setProceeding] = useState(false);
  const [proceedingStatus, setProceedingStatus] = useState(false);
  const [candidateFields, setCandidateFields] = useState([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [finalData, setFinalData] = useState(location.state);
  const tests = [
    "Freshers Junior Test",
    "Fresher Test",
    "Freshers QA Test",
    "Full Stack Developer Test",
    "Freshers Python Test",
    "Freshers Java Test",
    "Frontend Freshers Test",
    "Shopify Developer Test",
    "MERN Developer Junior Test",
    "MERN Developer Intermediate Test",
  ];
  const isEmptyField = candidateFields.some((each) =>
    Object.values(each).some((value) => value === "")
  );
  //this method is for opening for dialog Box onClicking sending Assessment button
  const handleClickOpen = () => {
    //if input fields are not empty dialogBox will open for confirmation
    if (!isEmptyField) {
      setOpen(true);
    }
    // if any of input fields are empty
    if (isEmptyField) {
      alert("Please fill in all the candidate details");
      return;
    }
  };
  // this handleClose method is for closing of dialog box
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  useEffect(() => {
    //cookies token is for validation of admin
    const token = Cookies.get("token");
    if (!token) {
      navigate("/unauthorized");
    }

    setStudentCount(1);
    setProceeding(false);
  }, [activeTest]);

  const handleInputChange = (index, values) => {
    //prevCandidateFields are the values from  candidateField state

    setCandidateFields((prevCandidateFields) => {
      const updatedFields = [...prevCandidateFields];
      // based on index of EachCandidateInputField value updatedFields will be updated
      updatedFields[index] = { ...updatedFields[index], ...values };
      //updatedFields will be set in to candidateField though setCandidateFields stateMethod
      return updatedFields;
    });
  };
  const onClickProceed = () => {
    if (activeTest === "") {
      alert("Select Test");
    } else {
      setProceeding(true);
      setProceedingStatus(true);
      // creates empty objects based on the length which is studentCount
      setCandidateFields(Array.from({ length: studentCount }, () => ({})));
    }
  };
  const sendingMailThroughEmailJs = (student) => {
    console.log(student);
    //EmailJS is the service provider to send emails through js(visit:https://www.emailjs.com)
    emailjs
      .send(
        "service_okvqzif",
        "template_3ujjkix",
        {
          to_name: student.name,
          from_name: "kloc",
          message:  student.uniqueId,
          to_email: student.email,
        },
        "MkG09aTM7gyK7zTog"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert(`Email sent to ${student.email}`);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  const updateStudentThroughSheetDb = (student) => {
    // sheetDb provides the service for updating the google sheet (restricted mode) https://sheetdb.io/

    console.log(activeTest);
    const random = uniqueRandom(10000, 100000);
    const sentDate = new Date(); // Current date and time
    const endDate = new Date(student.endDate); // Convert endDate to a Date object
    const details = {
      name: student.name,
      email: student.email,
      test: activeTest,
      phoneNo: student.phone,
      sentDate: sentDate,
      endDate: endDate,
      uniqueId: "kloc" + random(),
      isCompleted: "incomplete",
    };
    sendingMailThroughEmailJs(details);
    console.log(details, "gh");
    fetch("https://sheetdb.io/api/v1/qeetqgie30fhh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer n95196updlz3oo643ihw1vmttqaq81atj4mfk7qq",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    const millisecondsDiff = Math.abs(sentDate.getTime() - endDate.getTime());
    setTimeout(() => {
      const key = "AIzaSyAz1z7QqYvovxmnO-lvzoORcMC1UZzXNRE";
      console.log(details.uniqueId);
      fetch(
        `https://script.google.com/macros/s/AKfycbwYjd68zDra8M_URGyixHK87--R17dEEX4e5vMbyK3FWjQ48hWlaKg3Vzl9f3Foua7-3g/exec?key=${key}&uniqueId=${details.uniqueId}`
      );
    }, millisecondsDiff);
  };
  const onClickSendAssessment = () => {
    //console.log("triggered");

    candidateFields.forEach((each) => {
      updateStudentThroughSheetDb(each);
    });
    handleClose();
    setProceeding(false);
    setProceedingStatus(false);
  };

  return (
    <div className="send-assessment-main-container">
      <div className='assessment-container'>
        <div className='each-assessment-container'>
          <div className="test-assessment-heading-container">
          <h1 className="test-heading">Name of the Test</h1>
          {/* <h1 className="test-heading1">Number of the Tests</h1> */}
          </div>
          {tests.map((each, index) => (
            <div key={index} className='input-container'>
              <div className='assessmentContainerCheckboxContainer'>
                <input
                  type='radio'
                  name='test'
                  id={index}
                  onChange={(e) => setActiveTest(e.target.value)}
                  value={each}
                  className='assessmentContainerCheckbox'
                />
                <label
                  htmlFor={index}
                  className='assessmentContainerCheckboxLabel'
                >
                  {each}
                </label>
              </div>
              
              <input
                disabled={activeTest !== each}
                type='number'
                className='assessmentContainerInput'
                id={index}
                onChange={(e) => setStudentCount(e.target.value)}
                value={activeTest === each ? studentCount : ""}
              />
            </div>
          ))}
        </div>
        <button
          variant='contained'
          className='assessment-button m-3'
          onClick={onClickProceed}
        >
          Proceed
        </button>
      </div>
      <div className='each-input-student-details-container'>
        {/* studentCount times adding EachCandidateInputField */}
        {/* if proceeding is true then only EachCandidateInputField and sendAssessments button shows in the page */}
        {proceeding &&
          Array.from({ length: studentCount }, (_, index) => (
            <EachCandidateInputField
              key={index}
              index={index} // Passing the index as a prop
              onInputChange={(values) => handleInputChange(index, values)}
            />
          ))}
        {proceeding && (
          <div className='text-center'>
            <button
              onClick={handleClickOpen}
              className='send-assessment-button'
            >
              SEND ASSESSMENT
            </button>
            {/* dialog box from material ui */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {"Are You Sure You Want To Send?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Let's Check onces before sending the assessment !
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={onClickSendAssessment} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};
export default Assessment;

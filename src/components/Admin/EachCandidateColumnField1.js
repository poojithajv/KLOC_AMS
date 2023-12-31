// this component is about displaying input fields of student to send email in mobile view
// import react and index.css file to render EachCandidateColumnField1 component
import React, { useState, useEffect } from "react";
import "./index.css";
function EachCandidateColumnField1({ onInputChange}) {
    // inputValues usestate to store name,email,phone and endDate of test of students
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        phone:"",
        endDate: "",
      });
      // below function add's the value with respective field of the candidate
      //it puts previous values the same and add's only active field value
      const handleInputChange = (field, value) => {
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [field]: value,
        }));
      };
    
      useEffect(() => {
        onInputChange(inputValues); // Notify the parent component about the input values
      }, [inputValues]); //  dependency array to run the function when the inputValues changes
      //console.log(inputValues);
    
  return (
    <div className="mobile-candidate-field">
        <div className="mobile-subcontainer1" >
            <div className="mobile-subcontainer2">
                <label htmlFor='outlined-basic-1' className="label-assessment-custom" >
                    Name:
                    </label>
                <input
                id="outlined-basic-1"
                placeholder="Name"
                variant="outlined"
                className="mobile-custom-input-field"
                value={inputValues.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                />
            </div>
            <div className="mobile-subcontainer2">
                <label htmlFor='outlined-basic-1' className="label-assessment-custom">
                    Email:
                    </label>
                <input
                id="outlined-basic-2"
                placeholder="Email"
                variant="outlined"
                className="mobile-custom-input-field"
                value={inputValues.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                />
            </div>
        </div>
        <div className="mobile-subcontainer1">
            <div className="mobile-subcontainer2">
                <label htmlFor='outlined-basic-1' className="label-assessment-custom">
                    Phone:
                </label>   
                <input
                id="outlined-basic-3"
                placeholder="Phone"
                variant="outlined"
                className="mobile-custom-input-field"
                value={inputValues.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                />
            </div>
            <div className="mobile-subcontainer2">
                <label htmlFor='outlined-basic-1' className="label-assessment-custom">
                    Test End Date:
                </label>
                <input
                id="outlined-basic-4"
                placeholder="Date"
                type="date"
                variant="outlined"
                className="mobile-custom-input-field"
                value={inputValues.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
                />
            </div>
        </div>
       <hr className="horizontal-line-mobile"/> 
    </div>
  )
}

export default EachCandidateColumnField1
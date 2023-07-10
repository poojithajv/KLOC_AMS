// this component is about displaying input fields of student to send email in desktop view
// import react and index.css file to render EachCandidateInputField component
import React, { useState, useEffect } from "react";
import "./index.css";
const EachCandidateInputField = ({ onInputChange }) => {
  const [NumberError,setNumberError]=useState(false)
  // inputValues usestate to store name,email,phone and endDate of test of students
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
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
  const validatePhoneNumber = (phoneNumber) => {
    if(phoneNumber.trim(" ").indexOf("+")===-1){
      const regex = /^0[-\s.][6789]{1}[0-9]{9}$|(^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[6-9]{1}[0-9]{3}[-\s\.]?[0-9]{3,6}$)|(^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[6-9]{1}[0-9]{2}[-\s\.]?[0-9]{4,7}$)/im;
      if(phoneNumber.trim(" ")[0] === "0"){
        if(regex.test(phoneNumber.trim(" "))){
          setNumberError(false)
        }
        else{
          setNumberError(true)
        }
      }
      else{
      if(phoneNumber.trim(" ").length < 10 || phoneNumber.trim(" ").length > 10){
        
        setNumberError(true)
      }
      else{
        const regex = /[6-9]{1}[0-9]{9}/im
        if(regex.test(phoneNumber.trim(" "))){
        setNumberError(false)
      }
      else{
        setNumberError(true)
      }
      }
    }
    }
    else{
      let index = phoneNumber.trim(" ").indexOf(" ")
      if(index !== -1){
      phoneNumber = phoneNumber.trim(" ").slice(index+1)
      let length = phoneNumber.length 
      if(length < 10 || length > 10){
        setNumberError(true)
      }
      else{
      // const regex = /(^[\+]?[(]?[0-9]{1}[)]?[-\s]?[6789]{1}[0-9]{3}[-\s\.]?[0-9]{3,6}$)|(^[\+]?[(]?[0-9]{2}[)]?[-\s]?[6789]{1}[0-9]{3}[-\s\.]?[0-9]{3,6}$)|(^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[6789]{1}[0-9]{3}[-\s\.]?[0-9]{3,6}$)/im;
      const regex = /[6789]{1}[0-9]{3}[.\s-]?[0-9]{6}/g
      if(regex.test(phoneNumber.trim(" "))){
        setNumberError(false)
      }
      else{
        setNumberError(true)
      }
      }
      }
      else{
        let index = phoneNumber.trim(" ").indexOf("-")
        phoneNumber = phoneNumber.trim(" ").slice(index+1)
        let length = phoneNumber.length
        if(length < 10 || length > 10){
          setNumberError(true)
        }
        else{
        const regex = /([6789]{1}[0-9]{3}[=\s.]?[0-9]{6})/g;
        if(regex.test(phoneNumber)){
          setNumberError(false)
        }
        else{
          setNumberError(true)
        }
        }
      }
    }
  }
  console.log(NumberError)

  useEffect(() => {
    onInputChange(inputValues); // Notify the parent component about the input values
  }, [inputValues]); //  dependency array to run the function when the inputValues changes
  //console.log(inputValues);

  return (
    <div className="bg-each-candidate-field">
        <div className="each-candidate-subContainer2">
        <input
          id="outlined-basic-1"
          placeholder="Name"
          variant="outlined"
          className="custom-input-field"
          value={inputValues.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        <input
          id="outlined-basic-2"
          placeholder="Email"
          variant="outlined"
          className="custom-input-field"
          value={inputValues.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
        <input
          id="outlined-basic-3"
          placeholder="Phone"
          variant="outlined"
          className="custom-input-field"
          value={inputValues.phone}
          onBlur={(e)=>validatePhoneNumber(e.target.value)}
          onKeyDown={(e)=>validatePhoneNumber(e.target.value)}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        <input
          id="outlined-basic-4"
          placeholder="Date"
          type="date"
          variant="outlined"
          className="custom-input-field"
          value={inputValues.endDate}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          required
        />
        </div>
       <hr className="horizontal-line"/> 
    </div>
  );
};
export default EachCandidateInputField;

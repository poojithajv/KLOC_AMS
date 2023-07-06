// import all required packages like react,react-icons,reactjs-popup,js-cookie,uuid,react-router-dom and components like index.css to render AdminLogin component
import React, { useEffect, useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer'
import Dashboard from './Dashboard'
import SendAssessments from './SendAssessments'
import TestReports from './TestReports'
import StudentReports from "./StudentReports";
import './AdminLogin.css'
// scopes variable is a google api to get access of google spreadsheets
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const AdminLogin = () => {
  // usestates to store data responses for all tests 
  const [isDashboard,setIsDashboard]=useState(false)
  const [isAssessment,setIsAssessment]=useState(false)
  const [isTestReports,setIsTestReports]=useState(false)
  const [isStudentReports,setIsStudentReports]=useState(false)
  const [fresherData,setFresherData]=useState([])
  const [pythonData,setPythonData]=useState([])
  const [fullStackData,setFullStackData]=useState([])
  const [shopifyData,setShopifyData]=useState([])
  const [mernDeveloperIntermediateData,setMernDeveloperIntermediateData]=useState([])
  const [frontEndFresherData,setfrontEndFresherData]=useState([])
  const [javaData,setJavaData]=useState([])
  const [mernDeveloperJuniorData,setMernDeveloperJuniorData]=useState([])
  const [qaData,setQAData]=useState([])
  const [freshersJuniorData,setFreshersJuniorData]=useState([])
  // usestate to store user email of client
  const [userEmail, setUserEmail] = useState("");
  // usestate to store boolean value of signedIn status of client
  const [isSignedIn, setIsSignedIn] = useState(false);
  // navigate varaible used to navigating to different paths
  const navigate=useNavigate()


  useEffect(() => {
    //  after component rendering the below logic will execute
    // creates script element and appends to html head 
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_SCRIPT_SRC;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    };

    // to initialize the google api
    const initializeGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    // to initialize the google api client using apikey, client id, scopes and discoveryDocs from google cloudspace
    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          console.log("Google API client initialized");
          // auth instance variable used to get signed in 
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          // execute request functions to get google sheet data responses for different tests
          executeRequestFreshersTest();
          executeRequestPythonTest();
          executeRequestShopifyTest();
          executeRequestFrontEndFresherTest();
          executeRequestFullStackTest();
          executeRequestMernDeveloperIntermediateTest();
          executeRequestJavaTest()
          executeRequestMernDeveloperJuniorTest()
          executeRequestQATest()
          executeRequestFreshersJuniorTest()
          // get user email function
          getUserEmail();
        })
        // throws error if any error occurs while initializing google api client 
        .catch((error) => {
          console.error("Error initializing Google API client", error);
        });
    };

    // update signin status function 
    const updateSignInStatus = (isUserSignedIn) => {
      setIsSignedIn(isUserSignedIn);
      // if user is signedIn, getUserEmail function will render else userEmail variable will be set to empty
      if (isUserSignedIn) {
        getUserEmail();
      } else {
        setUserEmail("");
      }
    };

  // Executes request to get google sheet responses data for freshers test using spreadsheet id and name
    const executeRequestFreshersTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing freshers test responses data in setFresherData function
          setFresherData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for python test using spreadsheet id and name
    const executeRequestPythonTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_PYTHON_TEST_SHEET_ID,
          range: process.env.REACT_APP_PYTHON_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing python test responses data in setPythonData function
          setPythonData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for shopify test using spreadsheet id and name
    const executeRequestShopifyTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHOPIFY_TEST_SHEET_ID,
          range: process.env.REACT_APP_SHOPIFY_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing shopify test responses data in setShopifyData function
          setShopifyData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for front end fresher test using spreadsheet id and name
    const executeRequestFrontEndFresherTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRONTEND_FRESHER_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing front end fresher test responses data in setfrontEndFresherData function
          setfrontEndFresherData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for full stack test using spreadsheet id and name
    const executeRequestFullStackTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FULL_STACK_TEST_SHEET_ID,
          range: process.env.REACT_APP_FULL_STACK_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing full stack test responses data in setFullStackData function
          setFullStackData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for mern developer intermediate test using spreadsheet id and name
    const executeRequestMernDeveloperIntermediateTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_ID,
          range: process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing mern developer intermediate test responses data in setMernDeveloperIntermediateData function
          setMernDeveloperIntermediateData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for java test using spreadsheet id and name
    const executeRequestJavaTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_JAVA_TEST_SHEET_ID,
          range: process.env.REACT_APP_JAVA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing java test responses data in setJavaData function
          setJavaData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for mern developer junior test using spreadsheet id and name
    const executeRequestMernDeveloperJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing mern developer junior test responses data in setMernDeveloperJuniorData function
          setMernDeveloperJuniorData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for qa test using spreadsheet id and name
    const executeRequestQATest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_QA_TEST_SHEET_ID,
          range: process.env.REACT_APP_QA_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing qa test responses data in setQAData function
          setQAData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // Executes request to get google sheet responses data for freshers junior test using spreadsheet id and name
    const executeRequestFreshersJuniorTest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_ID,
          range: process.env.REACT_APP_FRESHERS_JUNIOR_TEST_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          // headers variable refers to row that consists of column names of respones
          const headers = values[0];
          // jsonData refers to array of data responses from the google spreadsheet
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          // storing freshers junior test responses data in setFreshersJuniorData function
          setFreshersJuniorData(jsonData);
        })
        // throws error if any error occurs while executing request to get data
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    // getUserEmail function
    const getUserEmail = () => {
      // authInstance varaiable to get authorization instance of admin 
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        const currentUser = authInstance.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const email = basicProfile.getEmail();
        // if email from the auth instance equals to the provided email then a unique loginid token will be created
        if (email === "klocprojectone@gmail.com") {
          const loginId = uuidv4();
          // Cookies.set method is used to set cookies for the login id token and expiration validity of 30 days
          Cookies.set("token", loginId, { expires: 30 });
          // if email does not exists, notFound component will render
        } else {
          navigate("/unauthorized");
        }
        // userEmail value is set to the email
        setUserEmail(email);
      }
    };

    loadGoogleAPI();
  }, []);

  // fetchFresherData function used to calculate aptitude and technical scores of fresher test and will be added to fresherData responses
  const fetchFresherData=()=>{
    fresherData.map((item,index)=>{
    let aptitude_score  = 0 
    let technical_score = 0 
    // aptitude & technical questions and answers of fresher test were obtained from .env file
    const aptitude  = JSON.parse(process.env.REACT_APP_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS) 
    const technical = JSON.parse(process.env.REACT_APP_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS)
    Object.keys(item).map((_,i) =>{
     if(i>5 && i<26){
      // if index is in range of 6-26 then the below if condition executes
        if((i-5) in aptitude){
          // if index exists in aptitude object then the below if condition executes
             if(item[_]===aptitude[i-5]){
              // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                 aptitude_score+=1
             }
        }
     }else if(i>25 && i<56){
      // if index is in range of 26-56 then the below if condition executes
        if((i-25) in technical){
          // if index exists in technical object then the below if condition executes
             if(item[_]===technical[i-25]){
              // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                 technical_score +=1
             }
        }
     }
    })
    // aptitude_score value is added to key aptitude_score in item object of fresherData array
     item.aptitude_score = aptitude_score
     // technical_score value is added to key technical_score in item object of fresherData array
     item.technical_score =  technical_score
     // total_score value is added to key total_score in item object of fresherData array
     item.total_score =  aptitude_score + technical_score
     // Freshers Test value is added to key testType in item object of fresherData array
     item.testType='Freshers Test'
   })
  }

  // after component rendering, fetchFresherData function logic will execute
  useEffect(()=>{
    fetchFresherData()
    // fresherData dependency is used so that any changes in fresherData variable occurs, this effect will rerun
  },[fresherData])

  // fetchPythonData function used to calculate aptitude and technical scores of python test and will be added to pythonData responses
  const fetchPythonData=()=>{
    pythonData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of python test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_PYTHON_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_PYTHON_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
              // if index is in range of 6-31 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
              // if index is in range of 31-56 then the below if condition executes
                if ((i-30) in technical){       
                  // if index exists in technical object then the below if condition executes   
                    if (item[score]===technical[i-30]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of pythonData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of pythonData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of pythonData array
        item.total_score=item.aptitude_score+item.technical_score
        // Python Test value is added to key testType in item object of pythonData array
        item.testType='Python Test'
    })
  }
  // after component rendering, fetchPythonData function logic will execute
  useEffect(()=>{
    fetchPythonData()
    // pythonData dependency is used so that any changes in pythonData variable occurs, this effect will rerun
  },[pythonData])

  // fetchShopifyData function used to calculate aptitude and technical scores of shopify test and will be added to shopifyData responses
  const fetchShopifyData=()=>{
    shopifyData.map((item,index)=>{
      let aptitude_score  = 0 
      let technical_score = 0 
      // aptitude & technical questions and answers of shopify test were obtained from .env file
      const aptitude  = JSON.parse(process.env.REACT_APP_SHOPIFY_APTITUDE_QUESTIONS_ANSWERS) 
      const technical = JSON.parse(process.env.REACT_APP_SHOPIFY_TECHNICAL_QUESTIONS_ANSWERS)
      Object.keys(item).map((_,i) =>{
      if(i>5 && i<16){
        // if index is in range of 6-16 then the below if condition executes
          if((i-5) in aptitude){
            // if index exists in aptitude object then the below if condition executes
              if(item[_]===aptitude[i-5]){
                 // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                  aptitude_score+=1
              }
          }
      }else if(i>15 && i<46){
        // if index is in range of 16-46 then the below if condition executes
          if((i-15) in technical){
            // if index exists in technical object then the below if condition executes  
              if(item[_]===technical[i-15]){ 
                // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                  technical_score +=1
              }
          }
      }    
      })
      // aptitude_score value is added to key aptitude_score in item object of shopifyData array
      item.aptitude_score = aptitude_score
      // technical_score value is added to key technical_score in item object of shopifyData array
      item.technical_score =  technical_score
      // total_score value is added to key total_score in item object of shopifyData array
      item.total_score =  aptitude_score + technical_score
      // Shopify Test value is added to key testType in item object of shopifyData array
      item.testType='Shopify Test'
  })
  }
 // after component rendering, fetchShopifyData function logic will execute
  useEffect(()=>{
    fetchShopifyData()
    // shopifyData dependency is used so that any changes in shopifyData variable occurs, this effect will rerun
  },[shopifyData])

  // fetchFrontEndFresherData function used to calculate aptitude and technical scores of front end fresher test and will be added to frontEndFresherData responses
  const fetchFrontEndFresherData=()=>{
    frontEndFresherData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of front end fresher test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_FRONTEND_FRESHER_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_FRONTEND_FRESHER_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // if index is in range of 6-16 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
              // if index is in range of 16-56 then the below if condition executes
                if ((i-15) in technical){          
                  // if index exists in technical object then the below if condition executes  
                    if (item[score]===technical[i-15]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of frontEndFresherData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of frontEndFresherData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of frontEndFresherData array
        item.total_score =  aptitude_score + technical_score
        // Front End Fresher Test value is added to key testType in item object of frontEndFresherData array
        item.testType='Front End Fresher Test'
    })
  }
 // after component rendering, fetchFrontEndFresherData function logic will execute
  useEffect(()=>{
    fetchFrontEndFresherData()
    // frontEndFresherData dependency is used so that any changes in frontEndFresherData variable occurs, this effect will rerun
  },[frontEndFresherData])

  // fetchFullStackData function used to calculate java and react scores of full stack test and will be added to fullStackData responses
const fetchFullStackData=()=>{
  fullStackData.map((item,index)=>{
    let fullstack_java_score = 0 
    let fullstack_react_score  = 0
    // java & react questions and answers of full stack test were obtained from .env file
    const fullstack_java = JSON.parse(process.env.REACT_APP_FULLSTACK_JAVA_QUESTIONS_ANSWERS)
    const fullstack_react = JSON.parse(process.env.REACT_APP_FULLSTACK_REACT_QUESTIONS_ANSWERS)
    Object.keys(item).map((_,i)=>{
        if(i>5 && i<31){
          // if index is in range of 6-31 then the below if condition executes
          if ((i-5) in fullstack_react){
            // if index exists in fullstack_react object then the below if condition executes
            if(item[_]===fullstack_react[i-5]){
              // if the value that is stored in item equals to key that is in fullstack_react object then the below if condition executes and caculates fullstack_react score
              fullstack_react_score +=1
            }
          }
        }else if(i>30 && i<57){
          // if index is in range of 31-57 then the below if condition executes
            if([i-30] in fullstack_java){
              // if index exists in fullstack_java object then the below if condition executes
                if(item[_]===fullstack_java[i-30]){
                  // if the value that is stored in item equals to key that is in fullstack_java object then the below if condition executes and caculates fullstack_java score
                    fullstack_java_score +=1
                }
            }
        }
    })
    // fullstack_java_score value is added to key fullstack_java_score in item object of fullStackData array
    item.fullstack_java_score = fullstack_java_score
    // fullstack_react_score value is added to key fullstack_react_score in item object of fullStackData array
    item.fullstack_react_score  = fullstack_react_score
    // total_score value is added to key total_score in item object of fullStackData array
    item.total_score = fullstack_java_score+fullstack_react_score
    // Full Stack Test value is added to key testType in item object of fullStackData array
    item.testType='Full Stack Test'
})
}
// after component rendering, fetchFullStackData function logic will execute
useEffect(()=>{
  fetchFullStackData()
  // fullStackData dependency is used so that any changes in fullStackData variable occurs, this effect will rerun
},[fullStackData])

// fetchMernDeveloperIntermediateData function used to calculate aptitude and technical scores of mern developer intermediate test and will be added to mernDeveloperIntermediateData responses
  const fetchMernDeveloperIntermediateData=()=>{
    mernDeveloperIntermediateData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of mern developer intermediate test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // if index is in range of 6-31 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
              // if index is in range of 16-56 then the below if condition executes
                if ((i-15) in technical){           
                  // if index exists in technical object then the below if condition executes 
                    if (item[score]===technical[i-15]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of mernDeveloperIntermediateData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of mernDeveloperIntermediateData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of mernDeveloperIntermediateData array
        item.total_score =  aptitude_score + technical_score
        // MERN Developer Intermediate Test value is added to key testType in item object of mernDeveloperIntermediateData array
        item.testType='MERN Developer Intermediate Test'
    })
  }
// after component rendering, fetchMernDeveloperIntermediateData function logic will execute
  useEffect(()=>{
    fetchMernDeveloperIntermediateData()
    // mernDeveloperIntermediateData dependency is used so that any changes in mernDeveloperIntermediateData variable occurs, this effect will rerun
  },[mernDeveloperIntermediateData])

  // fetchJavaData function used to calculate aptitude and technical scores of java test and will be added to javaData responses
  const fetchJavaData=()=>{
    javaData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of java test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_JAVA_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_JAVA_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
              // if index is in range of 6-31 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
              // if index is in range of 31-56 then the below if condition executes
                if ((i-30) in technical){   
                  // if index exists in technical object then the below if condition executes          
                    if (item[score]===technical[i-30]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of fetchJavaData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of fetchJavaData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of fetchJavaData array
        item.total_score =  aptitude_score + technical_score
        // Java Test value is added to key testType in item object of fetchJavaData array
        item.testType='Java Test'
    })
  }
  // after component rendering, fetchJavaData function logic will execute
  useEffect(()=>{
    fetchJavaData()
    // javaData dependency is used so that any changes in javaData variable occurs, this effect will rerun
  },[javaData])

  // fetchMernDeveloperJuniorData function used to calculate aptitude and technical scores of mern developer junior test and will be added to mernDeveloperJuniorData responses
  const fetchMernDeveloperJuniorData=()=>{
    mernDeveloperJuniorData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of mern developer junior test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // if index is in range of 6-16 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
              // if index is in range of 16-56 then the below if condition executes
                if ((i-15) in technical){           
                  // if index exists in technical object then the below if condition executes  
                    if (item[score]===technical[i-15]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of fetchMernDeveloperJuniorData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of fetchMernDeveloperJuniorData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of fetchMernDeveloperJuniorData array
        item.total_score =  aptitude_score + technical_score
        // MERN Developer Junior Test value is added to key testType in item object of fetchMernDeveloperJuniorData array
        item.testType='MERN Developer Junior Test'
    })
  }
 // after component rendering, fetchMernDeveloperJuniorData function logic will execute
  useEffect(()=>{
    fetchMernDeveloperJuniorData()
    // mernDeveloperJuniorData dependency is used so that any changes in mernDeveloperJuniorData variable occurs, this effect will rerun
  },[mernDeveloperJuniorData])

  // fetchQAData function used to calculate aptitude and technical scores of qa test and will be added to qaData responses
  const fetchQAData=()=>{
    qaData.map((item,index)=>{
      let aptitude_score=0
      let technical_score=0
      // aptitude & technical questions and answers of qa test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_QA_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let technical=JSON.parse(process.env.REACT_APP_QA_TEST_TECHNICAL_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<16){
              // if index is in range of 6-16 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>15 && i<56){
              // if index is in range of 16-56 then the below if condition executes
                if ((i-15) in technical){           
                  // if index exists in technical object then the below if condition executes  
                    if (item[score]===technical[i-15]){
                      // if the value that is stored in item equals to key that is in technical object then the below if condition executes and caculates technical score
                        technical_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of fetchQAData array
        item.aptitude_score=aptitude_score
        // technical_score value is added to key technical_score in item object of fetchQAData array
        item.technical_score=technical_score
        // total_score value is added to key total_score in item object of fetchQAData array
        item.total_score =  aptitude_score + technical_score
        // QA Test value is added to key testType in item object of fetchQAData array
        item.testType='QA Test'
    })
  }
 // after component rendering, fetchQAData function logic will execute
  useEffect(()=>{
    fetchQAData()
    // qaData dependency is used so that any changes in qaData variable occurs, this effect will rerun
  },[qaData])

  // fetchFreshersJuniorData function used to calculate aptitude and reasoning scores of freshers junior test and will be added to mernDeveloperIntermediateData responses
  const fetchFreshersJuniorData=()=>{
    freshersJuniorData.map((item,index)=>{
      let aptitude_score=0
      let reasoning_score=0
      // aptitude & reasoning questions and answers of freshers junior test were obtained from .env file
      let aptitude=JSON.parse(process.env.REACT_APP_FRESHERS_JUNIOR_TEST_APTITUDE_QUESTIONS_ANSWERS)
      let reasoning=JSON.parse(process.env.REACT_APP_FRESHERS_JUNIOR_TEST_REASONING_QUESTIONS_ANSWERS)
        Object.keys(item).map((score,i)=>{
            if (i>5 && i<31){
              // if index is in range of 6-31 then the below if condition executes
                if ((i-5) in aptitude){
                  // if index exists in aptitude object then the below if condition executes
                    if (item[score]===aptitude[i-5]){
                      // if the value that is stored in item equals to key that is in aptitude object then the below if condition executes and caculates aptitude score
                        aptitude_score+=1
                    }
                }
            }else if(i>30 && i<56){
              // if index is in range of 31-56 then the below if condition executes
                if ((i-30) in reasoning){          
                  // if index exists in reasoning object then the below if condition executes
                    if (item[score]===reasoning[i-30]){
                      // if the value that is stored in item equals to key that is in reasoning object then the below if condition executes and caculates reasoning score
                        reasoning_score+=1
                    }
                }
            }
        })
        // aptitude_score value is added to key aptitude_score in item object of fetchFreshersJuniorData array
        item.aptitude_score=aptitude_score
        // reasoning_score value is added to key reasoning_score in item object of fetchFreshersJuniorData array
        item.reasoning_score=reasoning_score
        // total_score value is added to key total_score in item object of fetchFreshersJuniorData array
        item.total_score =  aptitude_score + reasoning_score
        // Freshers Junior Test value is added to key testType in item object of fetchFreshersJuniorData array
        item.testType='Freshers Junior Test'
    })
  }
  // after component rendering, fetchFreshersJuniorData function logic will execute
  useEffect(()=>{
    fetchFreshersJuniorData()
    // freshersJuniorData dependency is used so that any changes in freshersJuniorData variable occurs, this effect will rerun
  },[freshersJuniorData])

  // creates allData array and pushes all tests data arrays to it
  let allData=[]
  allData.push(fresherData)
  allData.push(pythonData)
  allData.push(shopifyData)
  allData.push(frontEndFresherData)
  allData.push(mernDeveloperIntermediateData)
  allData.push(fullStackData)
  allData.push(javaData)
  allData.push(mernDeveloperJuniorData)
  allData.push(qaData)
  allData.push(freshersJuniorData)

  // handleSignIn function to handle different errors during sign in 
  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
      } else {
        console.error("Error signing in with Google", error);
        // Handle other sign-in errors
      }
    });
  };

  // handleSignOut function used to signout of admin google account
  const handleSignOut = () => {
    Cookies.remove("token");
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  // creates datat object consists of all tests data arrays
  const datat={
    fresherData,
    pythonData,
    mernDeveloperIntermediateData,
    shopifyData,
    frontEndFresherData,
    fullStackData,
    javaData,
    mernDeveloperJuniorData,
    qaData,
    freshersJuniorData
  }

  // creates finalData object and adds allData array and datat object
  let finalData={
    allData,datat
  }
  const handleDashboard=()=>{
    setIsDashboard(true)
    setIsAssessment(false)
    setIsTestReports(false)
    setIsStudentReports(false)
  }
  const handleAssessment=()=>{
    setIsDashboard(false)
    setIsAssessment(true)
    setIsTestReports(false)
    setIsStudentReports(false)
  }
  const handleTestReports=()=>{
    setIsDashboard(false)
    setIsAssessment(false)
    setIsTestReports(true)
    setIsStudentReports(false)
  }
  const handleStudentReports=()=>{
    setIsDashboard(false)
    setIsAssessment(false)
    setIsTestReports(false)
    setIsStudentReports(true)
  }

  return (
    <div>
      <div className="admin-login-container">
          {isSignedIn ? (
            // if admin has signedIn, the below code will render
            <div className="admin-header-container">
            {/* header for desktop  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Sign Out */}
              <div className="admin-header-logo-container">
                    {/* logo */}
                <img src="https://res.cloudinary.com/de5cu0mab/image/upload/v1688216997/KLoc_Square_Logo_-_400x400_ciw1ej.jpg" alt="logo" style={{height:'70px', width:'70px', borderRadius:'35px',padding:'8px'}} onClick={()=>navigate('/')}/>
              </div>
              <div className="admin-desktop-header-navbar-container">
                  {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
                <p onClick={()=>handleDashboard()} className="admin-desktop-header-navbar-link">Dashboard</p>
                {/* when clicking this Assessments text, it'll navigates to send assessments route */}
                <p onClick={()=>handleAssessment()} className="admin-desktop-header-navbar-link">Assessments</p>
                {/* when clicking this Test Reports text, it'll navigates to test reports route */}
                <p onClick={()=>handleTestReports()} className="admin-desktop-header-navbar-link">Test Reports</p>
                {/* when clicking this student reports text, it'll navigates to student reports route */}
                <p onClick={()=>handleStudentReports()} className="admin-desktop-header-navbar-link">Student Reports</p>
                {/* when clicking this Sign Out text, it'll navigates to admin login route and agains admin needs to sign in to access all routes */}
                <p className="admin-desktop-header-navbar-link" onClick={handleSignOut}>Sign Out</p>
              </div>
              {/* nav header for mobile  with Logo and components Dashboard, Assessments, Test Reports, Student Reports and Sign Out */}
              <div className="admin-mobile-header-navbar-container">
                <Popup contentStyle={{ width: '70%',backgroundColor:"white",textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'content',alignItems:'center' }} trigger={<button  className="admin-hamburger-btn"><GiHamburgerMenu /></button>} position="bottom right" >
                  <ul className="admin-mobile-hamburger-menu">
                    {/* when clicking this Dashboard text, it'll navigates to dashboard route */}
                    <li onClick={()=>handleDashboard()} className='admin-header-navbar-link'>Dashboard</li>
                    {/* when clicking this Assessments text, it'll navigates to send assessments route */}
                    <li onClick={()=>handleAssessment()} className='admin-header-navbar-link'>Assessments</li>
                    {/* when clicking this Test Reports text, it'll navigates to test reports route */}
                    <li onClick={()=>handleTestReports()} className='admin-header-navbar-link'>Test Reports</li>
                    {/* when clicking this student reports text, it'll navigates to student reports route */}
                    <li onClick={()=>handleStudentReports()} className='admin-header-navbar-link'>Student Reports</li>
                    {/* when clicking this Sign Out text, it'll navigates to admin login route and agains admin needs to sign in to access all routes */}
                    <li onClick={handleSignOut} className='admin-header-navbar-link'>Sign Out</li>
                  </ul>
              </Popup>
              </div>
            </div>
          ) : (
            // if admin hasn't signedIn, the below code will render
            <div className='display-column'>
              <h2>Login With Google</h2>
              {/* if admin clicks this button, he can sign in into his account and get access for all routes */}
              <button onClick={handleSignIn} className='google-signin-button'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google Logo'
                />
                Sign In with Google
              </button>
            </div>
          )}
        {isDashboard && (
          <Dashboard data={finalData}/>
        )}
        {isAssessment && (
          <SendAssessments data={finalData}/>
        )}
        {isTestReports && (
          <TestReports datat={finalData} />
        )}
        {isStudentReports && (
          <StudentReports datat={finalData} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
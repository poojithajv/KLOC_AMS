// this component about  metrics for every test
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Chart } from "react-google-charts";
import gapi from "gapi-script";
import Cookies from "js-cookie";
import { GiHamburgerMenu } from "react-icons/gi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

const Dashboard = (props) => {
  const {data}=props
  const location = useLocation();
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState(data || []);
  let data1 = finalData?.allData?.flat() || [];
  let data2 = data1.map((item, index) => ({ ...item, id: index + 1 }));
  const [filterData, setFilterData] = useState(data2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    const handleFilter = () => {
      const filtered =data2.filter((item) => {
        const itemDate = new Date(item.Timestamp);
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1); // Added one day to the end date
        return itemDate >= start && itemDate <= end;
  
      });
  
     setFilterData(filtered)
   
    };

 
  const fresher = filterData?.length ? filterData.filter(item => item.testType==="Freshers Test") : []
  const freshersJunior = filterData?.length ? filterData.filter(item => item.testType==="Freshers Junior Test") : []
  const python = filterData?.length ? filterData.filter(item => item.testType==="Python Test") : []
  const frontendfresher = filterData?.length ? filterData.filter(item => item.testType==="Front End Fresher Test") : []
  console.log(frontendfresher)
  const qa = filterData?.length ? filterData.filter(item => item.testType==="QA Test") : []
  const merndeveloperintermediate = filterData?.length ? filterData.filter(item => item.testType==="MERN Developer Intermediate Test") : []
  const merndeveloperjunior = filterData?.length ? filterData.filter(item => item.testType==="MERN Developer Junior Test") : []
  const shopify = filterData?.length ? filterData.filter(item => item.testType==="Shopify Test") : []
  const fullStack = filterData?.length ? filterData.filter(item => item.testType==="Full Stack Test") : []
  const java = filterData?.length ? filterData.filter(item => item.testType==="Java Test") : []
  const pieData = [
    ["Language", "Speakers (in millions)"],
    ["Fresher_Junior_Test", freshersJunior?.length ?  freshersJunior?.length : 0],
    ["Freshers_Test", fresher?.length ? fresher?.length : 0],
    ["Python_Test",python?.length ?  python?.length : 0],
    ["Front_End_Fresher_Test", frontendfresher?.length ?frontendfresher?.length : 0],
    ["QA_Test",qa?.length ?qa?.length : 0],
    ["Full_Stack_Test",fullStack?.length ?fullStack?.length : 0],
    ["Java_Test", java?.length ? java?.length : 0],
    ["Mern_Developer_Intermediate_Test", merndeveloperintermediate?.length ?  merndeveloperintermediate?.length : 0],
    ["Mern_Developer_Junior_Test",merndeveloperjunior?.length ?  merndeveloperjunior?.length : 0],
    ["Shopify_Test",shopify?.length ?  shopify?.length : 0],
  ];

  let freshers_aptitude_score = 0;
  let freshers_technical_score = 0;
  let freshers_aptitude_percentage = 0;
  let freshers_technical_percentage = 0;

  fresher?.map((item, index) => {
    freshers_aptitude_score += item.aptitude_score;
    freshers_technical_score += item.technical_score;
  });

  freshers_aptitude_percentage =
    (freshers_aptitude_score /
      fresher?.length /
      process.env.REACT_APP_FRESHER_TEST_APTITUDE_QUESTIONS) *
    100;
  freshers_technical_percentage =
    (freshers_technical_score /
      (fresher?.length *
        process.env.REACT_APP_FRESHER_TEST_TECHNICAL_QUESTIONS)) *
    100;

  let python_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Pythontest
  let python_technical_score = 0; // this variable stores the data ,Technicalscore who took freshertest
  let python_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took Pythontest
  let python_technical_percentage = 0; //this variable stores the data , percentage of Technical score who took Pythontest

  // this calculation for correct responses by the candidate in Python test
  python?.map((item, index) => {
    python_aptitude_score += item.aptitude_score;
    python_technical_score += item.technical_score;
  });
  python_aptitude_percentage =
    (python_aptitude_score /
  python?.length /
      process.env.REACT_APP_PYTHON_TEST_APTITUDE_QUESTIONS) *
    100;
  python_technical_percentage =
    (python_technical_score /
     python?.length /
      process.env.REACT_APP_PYTHON_TEST_TECHNICAL_QUESTIONS) *
    100;

  let shopify_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Shopifytest
  let shopify_technical_score = 0; // this variable stores the data ,Technicalscore who took Shopifytest
  let shopify_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took Shopifytest
  let shopify_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Pythontest
  // this calculation for correct reponses by the candidate in Python test
  shopify?.map((item, index) => {
    shopify_aptitude_score += item.aptitude_score;
    shopify_technical_score += item.technical_score;
  });
  shopify_aptitude_percentage =
    (shopify_aptitude_score /
      shopify?.length /
      process.env.REACT_APP_SHOPIFY_TEST_APTITUDE_QUESTIONS) *
    100;
  shopify_technical_percentage =
    (shopify_technical_score /
     shopify?.length /
      process.env.REACT_APP_SHOPIFY_TEST_TECHNICAL_QUESTIONS) *
    100;

  let fullStack_java_score = 0; // this variable stores the data ,javascore who took Fullstacktest
  let fullStack_react_score = 0; // this variable stores the data ,Reactscore who took Fullstacktest
  let fullStack_java_percentage = 0; //this variable stores the data , percentage of java score who took Fullstacktest
  let fullStack_react_percentage = 0; //this variable stores the data , percentage of  React score who took Fullstacktest

  // this calculation for correct reponses by the candidate in FullStack test
  fullStack?.map((item, index) => {
    fullStack_java_score += item.fullstack_java_score;
    fullStack_react_score += item.fullstack_react_score;
  });
  fullStack_java_percentage =
    (fullStack_java_score /
      fullStack?.length /
      process.env.REACT_APP_FULL_STACK_TEST_JAVA_QUESTIONS) *
    100;
  fullStack_react_percentage =
    (fullStack_react_score /
      fullStack?.length /
      process.env.REACT_APP_FULL_STACK_TEST_REACT_QUESTIONS) *
    100;

  let java_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Javatest

  let java_technical_score = 0; // this variable stores the data ,Technicalscore who took Javatest

  let java_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took javatest

  let java_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Javatest

  java?.map((item, index) => {
    java_aptitude_score += item.aptitude_score;
    java_technical_score += item.technical_score;
  });
  java_aptitude_percentage =
    (java_aptitude_score /
     java?.length /
      process.env.REACT_APP_JAVA_TEST_APTITUDE_QUESTIONS) *
    100;
  java_technical_percentage =
    (java_technical_score /
     java?.length /
      process.env.REACT_APP_JAVA_TEST_TECHNICAL_QUESTIONS) *
    100;

  // this variable stores the data ,aptitudescore who took QAtest
  let Qa_aptitude_score = 0;
  // this variable stores the data ,Technicalscore who took QAtest
  let Qa_technical_score = 0;
  //this variable stores the data , percentage of apitude score who took QAtest
  let Qa_aptitude_percentage = 0;
  //this variable stores the data , percentage of Technicalscore who took QAtest
  let Qa_technical_percentage = 0;

  // this calculation for correct reponses by the candidate in QA test
  qa?.map((item, index) => {
    Qa_aptitude_score += item.aptitude_score;
    Qa_technical_score += item.technical_score;
  });
  Qa_aptitude_percentage =
    (Qa_aptitude_score /
     qa?.length /
      process.env.REACT_APP_QA_TEST_APTITUDE_QUESTIONS) *
    100;
  Qa_technical_percentage =
    (Qa_technical_score /
      qa?.length /
      process.env.REACT_APP_QA_TEST_TECHNICAL_QUESTIONS) *
    100;

  let frontendfresher_aptitude_score = 0; // this variable stores the data ,aptitudescore who took Froentendfreshertest
  let frontendfresher_technical_score = 0; // this variable stores the data ,Technicalscore who took Froentendfreshertest
  let frontendfresher_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took  Froentendfreshertest
  let frontendfresher_technical_percentage = 0; //this variable stores the data , percentage of Technicalscore who took Froentendfreshertest

  // this calculation for correct reponses by the candidate in Froentendfresher test
  frontendfresher?.map((item, index) => {
    frontendfresher_aptitude_score += item.aptitude_score;
    frontendfresher_technical_score += item.technical_score;
  });
  frontendfresher_aptitude_percentage =
    (frontendfresher_aptitude_score /
    frontendfresher?.length /
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_APTITUDE_QUESTIONS) *
    100;
  frontendfresher_technical_percentage =
    (frontendfresher_technical_score /
    frontendfresher?.length /
      process.env.REACT_APP_FRONTEND_FRESHER_TEST_TECHNICAL_QUESTIONS) *
    100;

  let freshersJunior_aptitude_score = 0; // this variable stores the data ,aptitudescore who took freshersJuniortest
  let freshersJunior_reasoning_score = 0; // this variable stores the data ,reasoning_score who took freshersJuniortest
  let freshersJunior_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took freshersJuniortest

  let freshersJunior_reasoning_percentage = 0; //this variable stores the data , percentage of Reasoning who took freshersJuniortest

  // this calculation for correct reponses by the candidate in FresherJunior test
  freshersJunior?.map((item, index) => {
    freshersJunior_aptitude_score += item.aptitude_score;
    freshersJunior_reasoning_score += item.reasoning_score;
  });
  freshersJunior_aptitude_percentage =
    (freshersJunior_aptitude_score /
     freshersJunior?.length /
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_APTITUDE_QUESTIONS) *
    100;
  freshersJunior_reasoning_percentage =
    (freshersJunior_reasoning_score /
      freshersJunior?.length /
      process.env.REACT_APP_FRESHERS_JUNIOR_TEST_REASONING_QUESTIONS) *
    100;

  let merndeveloperintermediate_aptitude_score = 0; //this variable stores the data ,aptitudescore who took  merndeveloperintermediate
  let merndeveloperintermediate_technical_score = 0; // this variable stores the data ,reasoning_score who took  merndeveloperintermediate
  let merndeveloperintermediate_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took  merndeveloperintermediate
  let merndeveloperintermediate_technical_percentage = 0; // this variable stores the data , percentage of Reasoning who took merndeveloperintermediate
  // this calculation for correct reponses by the candidate in mernDeveloperIntermediate
 merndeveloperintermediate?.map((item, index) => {
    merndeveloperintermediate_aptitude_score += item.aptitude_score;
    merndeveloperintermediate_technical_score += item.technical_score;
  });
  merndeveloperintermediate_aptitude_percentage =
    (merndeveloperintermediate_aptitude_score /
     merndeveloperintermediate?.length /
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_APTITUDE_QUESTIONS) *
    100;
  merndeveloperintermediate_technical_percentage =
    (merndeveloperintermediate_technical_score /
      merndeveloperintermediate?.length /
      process.env
        .REACT_APP_MERN_DEVELOPER_INTERMEDIATE_TEST_TECHNICAL_QUESTIONS) *
    100;

  let merndeveloperjunior_aptitude_score = 0; //this variable stores the data ,aptitudescore who took  merndeveloperjunior
  let merndeveloperjunior_technical_score = 0; // this variable stores the data ,reasoning_score who took  merndeveloperjunior
  let merndeveloperjunior_aptitude_percentage = 0; //this variable stores the data , percentage of apitude score who took merndeveloperjunior
  let merndeveloperjunior_technical_percentage = 0; // this variable stores the data , percentage of Reasoning who took merndeveloperjunior

  // this calculation for correct reponses by the candidate in mernDeveloperJunior
 merndeveloperjunior?.map((item, index) => {
    merndeveloperjunior_aptitude_score += item.aptitude_score;
    merndeveloperjunior_technical_score += item.technical_score;
  });
  merndeveloperjunior_aptitude_percentage =
    (merndeveloperjunior_aptitude_score /
     merndeveloperjunior?.length /
      process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_APTITUDE_QUESTIONS) *
    100;
  merndeveloperjunior_technical_percentage =
    (merndeveloperjunior_technical_score /
     merndeveloperjunior?.length /
      process.env.REACT_APP_MERN_DEVELOPER_JUNIOR_TEST_TECHNICAL_QUESTIONS) *
    100;

  //this data for designing the piechart of fresherTest
  const fresherPieData = [
    ["Language", "Speakers (in millions)"],
    ["FreshersAptitude", freshers_aptitude_percentage],
    ["FreshersTechnical", freshers_technical_percentage],
  ];

  //this data for designing the piechart of PythonTest
  const pythonPieData = [
    ["Language", "Speakers (in millions)"],
    ["PythonAptitude", python_aptitude_percentage],
    ["PythonTechnical", python_technical_percentage],
  ];

  //this data for designing the piechart of  shopifyTest
  const shopifyPieData = [
    ["Language", "Speakers (in millions)"],
    ["ShopifyAptitude", shopify_aptitude_percentage],
    ["ShopifyTechnical", shopify_technical_percentage],
  ];

  //this data for designing the piechart of fullstackTest
  const fullStackPieData = [
    ["Language", "Speakers (in millions)"],
    ["FullStackJava", fullStack_java_percentage],
    ["FullStackReact", fullStack_react_percentage],
  ];
  //this data for designing the piechart of  javaTest
  const javaPieData = [
    ["Language", "Speakers (in millions)"],
    ["JavaAptitude", java_aptitude_percentage],
    ["JavaTechnical", java_technical_percentage],
  ];

  //this data for designing the piechart of  QaTest
  const qaPieData = [
    ["Language", "Speakers (in millions)"],
    ["QAAptitude", Qa_aptitude_percentage],
    ["QATechnical", Qa_technical_percentage],
  ];
  //this data for designing the piechart of  frontendfresherTest
  const frontendfresherPieData = [
    ["Language", "Speakers (in millions)"],
    ["FrontEndFresherAptitude", frontendfresher_aptitude_percentage],
    ["FrontEndFresherTechnical", frontendfresher_technical_percentage],
  ];
  console.log(frontendfresherPieData)
  //this data for designing the piechart of   freshersJuniorTest
  const freshersJuniorPieData = [
    ["Language", "Speakers (in millions)"],
    ["FreshersJuniorAptitude", freshersJunior_aptitude_percentage],
    ["FreshersJuniorReasoning", freshersJunior_reasoning_percentage],
  ];
  //this data for designing the piechart of  merndeveloperintermediateTest
  const merndeveloperintermediatePieData = [
    ["Language", "Speakers (in millions)"],
    [
      "MERNDeveloperIntermediateAptitude",
      merndeveloperintermediate_aptitude_percentage,
    ],
    [
      "MERNDeveloperIntermediateTechnical",
      merndeveloperintermediate_technical_percentage,
    ],
  ];
  //this data for designing the piechart of   merndeveloperJuniorTest
  const merndeveloperJuniorPieData = [
    ["Language", "Speakers (in millions)"],
    ["MERNDeveloperJuniorAptitude", merndeveloperjunior_aptitude_percentage],
    ["MERNDeveloeprJuniorTechnical", merndeveloperjunior_technical_percentage],
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, []);

  const options = {
    legend: "none",
    title: "All Tests Metrics",
    pieStartAngle: 100,
  };

  const fresheroptions = {
    legend: "none",
    title: "Freshers Test Metric",
    pieStartAngle: 100,
  };

  const pythontestoptions = {
    legend: "none",
    title: "Python Test Metric",
    pieStartAngle: 100,
  };

  const fullstactoptions = {
    legend: "none",
    title: "Full Stack Test Metric",
    pieStartAngle: 100,
  };

  const javaoptions = {
    legend: "none",
    title: "Java Test Metric",
    pieStartAngle: 100,
  };

  const qaoptions = {
    legend: "none",
    title: "QA Test Metric",
    pieStartAngle: 100,
  };

  const froentendFresheroprions = {
    legend: "none",
    title: "Front End Fresher Test Metric",
    pieStartAngle: 100,
  };

  const fresherjunioroptions = {
    legend: "none",
    title: "Freshers Junior Test Metric",
    pieStartAngle: 100,
  };

  const merndeveloperjunioroptions = {
    legend: "none",
    title: "MERN Developer Junior Test Metric",
    pieStartAngle: 100,
  };

  const mernintermediateoprions = {
    legend: "none",
    title: "MERN Developer Intermediate Test Metric",
    pieStartAngle: 100,
  };

  const shopifyoptions = {
    legend: "none",
    title: "Shopify Test Metric",
    pieStartAngle: 100,
  };

  return (
    <div>
    <div className='dashboard-container'>
      <div >
        <h1 className="ams-heading">
          AMS METRICS
        </h1>
        <div className='date-filter'>
          <div className='display-between'>
            Start Date:{"   "}
            <input
              type='date'
              value={startDate}
              className='date-input'
              style={{marginLeft:'5px'}}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className='display-between'>
            End Date:{" "}
            <input
              type='date'
              value={endDate}
              className='date-input'
              style={{marginLeft:'5px'}}
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
        <h2 className="allmetricsHeading">
          Below Metric is about number of tests taken by student for each test
          in percentage
        </h2>  
        <div style={{ textAlign: "center" }}>
          <button className="totaltestconductedbutton">
            Total Tests Conducted:
            {fresher.length +
              fullStack.length +
              python.length +
              freshersJunior.length +
              frontendfresher.length +
              qa.length +
              java.length +
              shopify.length +
              merndeveloperintermediate.length +
              merndeveloperjunior.length}
          </button>
        </div>
        <div className="test-chart">
          <Chart
            className="allstremsPiechart"
            chartType="PieChart"
            data={pieData}
            options={{
              colors: [
                "#0e3ab3",
                "#f05232",
                "#e89510",
                "#2b8a3c",
                "#963596",
                "#5c9ed1",
                "#e62e81",
                "#62b027",
                "#b02709",
                "#102061",
              ],
              title: "All Test Metrics",
              legend: "none",
            }}
          ></Chart>
        </div>
        <div className="piechart-details">
          <div className="test-legend">
            <button className="color"></button>
            <span className="test">Python Test</span>
          </div>
          <div className="test-legend">
            <button
              style={{ backgroundColor: "#e62e81" }}
              className="color"
            ></button>
            <span className="test">Java Test</span>
          </div>
          <div className="test-legend">
            <button
              style={{ backgroundColor: "#5c9ed1" }}
              className="color"
            ></button>
            <span className="test">FullStack Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#963596" }}
            ></button>
            <span className="test">QA Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#2b8a3c" }}
            ></button>
            <span className="test">Frontend Fresher Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#0e3ab3" }}
            ></button>
            <span className="test">Freshers Junior Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#f05232" }}
            ></button>
            <span className="test">Freshers Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#62b027" }}
            ></button>
            <span className="test">MERN Developer Intermediate Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#b02709" }}
            ></button>
            <span className="test">MERN Developer Junior Test</span>
          </div>
          <div className="test-legend">
            <button
              className="color"
              style={{ backgroundColor: "#102061" }}
            ></button>
            <span className="test">Shopify Developer Test</span>
          </div>
        </div>
      </div>
      <h3 className="allmetricsHeading">
        Below Metrics are about percentage of each section which are correctly
        answered by students of different tests
      </h3>
      <div className="dashboard_chart_container">
          {fresher.length ? (
            <div>
            <Chart width={250} height={250}
            className="testwisePiechart"
            chartType="PieChart"
            data={fresherPieData}
            options={{
              title: `Fresher Test Metrics: ${fresher.length===1 ? '1 test' : `${fresher.length} tests`}`,
              colors: ["#111359", "#afd25f"],
              legend: "none",
            }}
          />
          <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
        </div>
        </div>
          ): null}
          {python.length ? (
            <div>
            <Chart width={250} height={250}
            className="testwisePiechart"
            chartType="PieChart"
            data={pythonPieData}
            options={{
              title: `Python Test Metrics: ${python.length===1 ? '1 test' : `${python.length} tests`}`,
              colors: ["#111359", "#afd25f"],
              legend: "none",
            }}
          />
          <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>  
          ) : null}
        {fullStack.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={fullStackPieData}
          options={{
            title: `FullStack Test Metrics: ${fullStack.length===1 ? '1 test' : `${fullStack.length} tests`}`,
            colors: ["#0e3ab3", "#b02709"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#0e3ab3" }}
          ></button>
          <span className="test-name">Java</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#b02709" }}
          ></button>
          <span className="test-name">React</span>
        </div>
      </div>
      </div>
        ): null}
        {java.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={javaPieData}
          options={{
            title: `Java Test Metrics: ${java.length===1 ? '1 test' : `${java.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null}
        {qa.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={qaPieData}
          options={{
            title: `QA Test Metrics: ${qa.length===1 ? '1 test' : `${qa.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null} 
        {frontendfresher.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={frontendfresherPieData}
          options={{
            title: `Front End Fresher Test Metrics: ${frontendfresher.length===1 ? '1 test' : `${frontendfresher.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
          />
          <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null}
        
        {freshersJunior.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={freshersJuniorPieData}
          options={{
            title: `Freshers Junior Test Metrics: ${freshersJunior.length===1 ? '1 test' : `${freshersJunior.length} tests`}`,
            colors: ["#111359", "#f553e5"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#f553e5" }}
          ></button>
          <span className="test-name">Reasoning</span>
        </div>
      </div>
      </div>
        ) : null}
        {merndeveloperjunior.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={merndeveloperJuniorPieData}
          options={{
            title: `MERN Developer Junior Test Metrics: ${merndeveloperjunior.length===1 ? '1 test' : `${merndeveloperjunior.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null}
        
        {merndeveloperintermediate.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={merndeveloperintermediatePieData}
          options={{
            title: `MERN Developer Intermediate Test Metrics: ${merndeveloperintermediate.length===1 ? '1 test' : `${merndeveloperintermediate.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null}
        
        {shopify.length ? (
          <div>
          <Chart width={250} height={250}
          className="testwisePiechart"
          chartType="PieChart"
          data={shopifyPieData}
          options={{
            title: `Shopify Test Metrics: ${shopify.length===1 ? '1 test' : `${shopify.length} tests`}`,
            colors: ["#111359", "#afd25f"],
            legend: "none",
          }}
        />
        <div className="piechart-container">
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#111359" }}
          ></button>
          <span className="test-name">Aptitude</span>
        </div>
        <div className="legend">
          <button
            className="color-name"
            style={{ backgroundColor: "#afd25f" }}
          ></button>
          <span className="test-name">Technical</span>
        </div>
      </div>
      </div>
        ) : null}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

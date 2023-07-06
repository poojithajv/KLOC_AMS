// import all required packages, components here to render this app component
import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
// import TestReports from "./components/Admin/TestReports";
// import SendAssessments from "./components/Admin/SendAssessments";
// import Dashboard from "./components/Admin/Dashboard";
import StudentLogin from "./components/Student/StudentLogin";
import Home from "./components/Home/Home";
import ShopifyTabulation from "./components/Admin/Tests/ShopifyTabulation";
import FreshersTabulation from "./components/Admin/Tests/FreshersTabulation";
import FullStackTabulation from "./components/Admin/Tests/FullStackTabulation";
import PythonTabulation from "./components/Admin/Tests/PythonTabulation";
import JavaTabulation from "./components/Admin/Tests/JavaTabulation";
import FrontEndFresherTabulation from "./components/Admin/Tests/FrontEndFresherTabulation";
import MernDeveloperJuniorTabulation from "./components/Admin/Tests/MernDeveloperJuniorTabulation";
import MernDeveloperIntermediateTabulation from "./components/Admin/Tests/MernDeveloperIntermediateTabulation";
import QATabulation from "./components/Admin/Tests/QATabulation";
import FreshersJuniorTabulation from "./components/Admin/Tests/FreshersJuniorTabulation";
import NotFound from "./components/Admin/NotFound";
import StudentReports from "./components/Admin/StudentReports";
import Chart from "./components/Admin/Chart";
import AllTests from "./components/Student/StudentTest";
import AdminUnauthorized from "./components/Admin/AdminUnauthorized";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home component */}
        <Route path="/" element={<Home />} />

        {/* admin components */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        {/* <Route path="/testReports" element={<TestReports />} />
        <Route path="/studentReports" element={<StudentReports />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendAssessments" element={<SendAssessments />} /> */}
        {/* test tabulation components*/}
        <Route
          path="testReports/freshers_junior_test"
          element={<FreshersJuniorTabulation />}
        />
        <Route
          path="testReports/fresher_test"
          element={<FreshersTabulation />}
        />
        <Route path="testReports/fresher_qa_test" element={<QATabulation />} />
        <Route
          path="testReports/fullstack_developer_test"
          element={<FullStackTabulation />}
        />
        <Route
          path="testReports/fresher_python_test"
          element={<PythonTabulation />}
        />
        <Route
          path="testReports/fresher_java_test"
          element={<JavaTabulation />}
        />
        <Route
          path="testReports/frontend_fresher_test"
          element={<FrontEndFresherTabulation />}
        />
        <Route
          path="testReports/shopify_developer_test"
          element={<ShopifyTabulation />}
        />
        <Route
          path="testReports/mern_developer_junior"
          element={<MernDeveloperJuniorTabulation />}
        />
        <Route
          path="testReports/mern_developer_intermediate"
          element={<MernDeveloperIntermediateTabulation />}
        />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/unauthorized" element={<AdminUnauthorized/>}/>
        {/* PieChart component */}
        <Route path="/studentChart" element={<Chart />} />

        {/* student components */}
        <Route path="/studentLogin" element={<StudentLogin />} />
        {/* test component */}
        <Route path="/test/:testName" element={<AllTests />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

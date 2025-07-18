// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import AllStudent from "./Pages/Student/AllStudent"
import CheckBox from "./Pages/Student/checkBox";
import Form from "./Pages/Form/Form.tsx"
// import { DatePicker } from 'antd';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Signup />}></Route>
        <Route path="/login" element = {<Login />} ></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/allstudent" element={<AllStudent/>}></Route>
        <Route path="/try" element={<CheckBox/>}> </Route>
        <Route path="/form" element={<Form/>}> </Route>
      </Routes>
    </>
  );
}

export default App;

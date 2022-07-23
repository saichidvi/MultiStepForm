import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Home/Home.js"
import Register from "./register/register.js";
import Login from "./login/login.js";
import Bioform from "./bio-form/bioform.js"
import EduForm from "./educationform/educationform.js";
import Display from "./display/display.js"
import Error from "./Error/Error.js";


const Setup = () => {
    return(
       <Router>
       <Routes>
        <Route exact path="/MultiForm" element={<Home></Home>}></Route>
        <Route exact path="/register" element={<Register></Register>}></Route>
        <Route exact path="/login" element={<Login></Login>}></Route>
        <Route exact path="/bioform/:id" element={<Bioform></Bioform>}></Route>
        <Route exact path="/eduform/:id"  element={<EduForm></EduForm>}></Route>
        <Route exact path="/display/:id" element={<Display></Display>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
       </Routes>
       </Router>
    );
};

export default Setup;
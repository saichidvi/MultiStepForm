import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";


const Home = () => {
    return(
        <div className="textBox">
            <p className="elements">Welcome to Form Building Site.</p>
            <p className="elements">Buil your form right now !</p>
            <Link to="/register" style={{textDecoration:"none"}}><button style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}>Register</button></Link>
            <Link to="/login" style={{textDecoration:"none"}}> <button style={{width : "40%"}}>Login</button></Link>
        </div>
    );
};


export default Home;
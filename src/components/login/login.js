import React from "react";
import { useState } from "react";
import useFetch from "../../hooks/hook";
import { useNavigate ,Link} from "react-router-dom";
import "./login.css";
import Model from "./model.js";
import {actions} from "../../context/context.js";
import { useDispatch } from "react-redux";

const Login  = () => {
    
    const url = "http://localhost:5000/user"
    const {hookData} = useFetch(url);
    const dispatch = useDispatch();

    const [data,setData] = useState({
        username : "username",
        password : "password"
    });
    const [showModel,setShowModel] = useState(false);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    const func1 = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData({...data,[name] :value});
    };

    const func2 = (e) => {
        e.preventDefault();
        if(data.username && data.password){
            const val = hookData.find((item) =>  item.username === data.username);
            if(val) {
                if(val.password === data.password){
                    console.log("User Verified");
                    dispatch(actions.setPeopleLogin(val));
                    navigate(`/bioform/${val._id}`);
                }
                else{
                    setMessage("Please Enter the Corerct Password");
                    setShowModel(true);
                }
            }
            else{
                setMessage("Invalid User Name or User not found");
                setShowModel(true);
            }
        }
    };

    return(
        <div>
        <div className="form-wrap">
        <form>
            <h1>Login </h1>
            <input type="text" name="username" placeholder={data.username} value={data.username} onChange={func1}></input>
            <input type="password" name="password" placeholder={data.password} onChange={func1}></input>
            <Link to="/" style={{textDecoration:"none"}}><button type="button" style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}>Back</button></Link>
            <button type="button" onClick={func2}  style={{width : "40%"}} >Login</button>
            {showModel && <Model message={message}></Model>}
        </form>
        </div>
        </div>
    )
};

export default Login;
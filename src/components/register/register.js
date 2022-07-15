import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import Model from "./model";
import { useDispatch } from "react-redux";
import {actions} from "../context/context.js";
import { useNavigate ,Link} from "react-router-dom";


const Register = () => {

    const [data,setData] = useState({
        name  :'names',
        username : 'username',
        email : 'email',
        password : 'password',
        confirmPassword : 'confirmPassword',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModel,setShowModel] = useState(false);
    const [modelMessage,setModelMessage] = useState("");

    const func1 = (e) => {
        e.preventDefault();
        const  name = e.target.name;
        const value = e.target.value;
        setData({...data,[name] : value});
    };

    const func2 =async (e) => {
        e.preventDefault();
        if(data.name && data.username && data.email && data.password && data.confirmPassword){
            if(data.password === data.confirmPassword){
                const response = await axios.post("http://localhost:5000/user",data);
                dispatch(actions.setPeople({...data,id : response.data._id}));
                navigate('/login');
            }
            else {
                setModelMessage("Password not matching ..")
                setShowModel(true);
            }
        }
        else {
            setModelMessage("Please enter all the feild");
            setShowModel(true);
        }
        setData({
            name  :'names',
            username : 'username',
            email : 'email',
            password : 'password',
            confirmPassword : 'confirmPassword', 
        });
    }


    return(
        <div>
        <div className="form-wrap">
        <form>
            <h1>Sign Up</h1>
            <input type="text" placeholder={data.name} name="name" value={data.name} onChange={func1}></input>
            <input type="text" placeholder={data.username} name="username" value={data.username} onChange={func1}></input>
            <input type="email" placeholder={data.email} name="email" value={data.email} onChange={func1}></input>
            <input type="password" placeholder={data.password} name="password" onChange={func1} ></input>
            <input type="password" placeholder={data.confirmPassword} name="confirmPassword" onChange={func1}></input>
            <Link to="/" style={{textDecoration:"none"}}><button type="button" style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}>Back</button></Link>
            <button type="button" onClick={func2} style={{width : "40%"}}>Sign Up</button>
            {showModel && <Model message={modelMessage}></Model>}
        </form>    
        </div>
        </div>
        
    );
};



export default Register;

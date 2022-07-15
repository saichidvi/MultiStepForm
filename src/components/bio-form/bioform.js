import React from "react";
import { useState } from "react";
import {actions} from "../../context/context.js";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import useFetch from "../../hooks/hook.js";
import Model from "./model.js";


const Bioform = () => {

    const [data,setData] = useState({
        fatherName : "FatherName",
        mobileNumber : "MobileNumber",
        city : "City"
    });
    const {hookData} = useFetch('http://localhost:5000/user');
    const [showModel,setShowModel] = useState(false);
    const [message,setMessage] = useState("");
     
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const func1 = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData({...data,[name] : value});
    }

    const func2 = async (e) => {
        e.preventDefault();
        if(data.fatherName && data.mobileNumber && data.city){
            const val = hookData.find((item) => item._id === params.id);
            if(val){
            const obj = {...data,id : params.id}
            dispatch(actions.setBioDetails(obj));
            await axios.post("http://localhost:5000/bioDetails",obj);
            navigate(`/eduform/${params.id}`);
            }
            else{
                setMessage("You are not a valid user please register to proceed");
                setShowModel(true);
            }
        }
        else {
            setMessage("Please fill all the feilds");
            setShowModel(true);
        }
    }
    return(
        <div>
        <div className="form-wrap">
        <form>
            <h1>Personal Details </h1>
            <input type="text" name="fatherName"  value={data.fatherName} onChange={func1}></input>
            <input type="text" name="mobileNumber"  value={data.mobileNumber} onChange={func1}></input>
            <input type="text" name="city" placeholder={data.city} value={data.city} onChange={func1}></input>
            <Link to="/login" style={{textDecoration:"none"}}><button type="button" style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}>Back</button></Link>
            <button type="button" onClick={func2} style={{width : "40%"}}>Next</button> 
            {showModel && <Model message={message}></Model>}
        </form>
        </div>
        </div>
    );
};


export default Bioform;
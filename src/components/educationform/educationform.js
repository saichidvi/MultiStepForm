import React from "react";
import { useState } from "react";
import {actions} from "../../context/context.js";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/hook.js";
import { useParams,useNavigate,Link} from "react-router-dom";
import axios from "axios";
import Model from "./model.js";

const EduForm = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const {hookData} = useFetch('http://localhost:5000/user');
    const [data,setData] = useState({
        schoolName : "SchoolName",
        schoolPercentage : "SchoolPercentage Eg:98%",
        collegeName : "CollegeName",
        collegePercentage : "CollegePercentage Eg:97%"
    });
    const [showModel,setShowModel] = useState(false);
    const [message,setMessage] = useState("");

    const func1 = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setData({...data,[name] : value});
    };

    const func2 =async (e) => {
        e.preventDefault();
        if(data.schoolName && data.schoolPercentage && data.collegeName && data.collegePercentage){
            const val = hookData.find((item) => item._id === params.id);
            if(val){
                dispatch(actions.setEduDetails({...data,id : val._id}));
                const resp = await axios.post("http://localhost:5000/eduDetails",{...data,id : val._id});
                console.log(resp);
                navigate(`/display/${params.id}`);
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
        setData({
            schoolName : "SchoolName",
        schoolPercentage : "SchoolPercentage Eg:98%",
        collegeName : "CollegeName",
        collegePercentage : "CollegePercentage Eg:97%"
        })
    }
    return(
        <div>
            <div className="form-wrap">
        <form>
            <h1>Educational Details </h1>
            <input type="text" name="schoolName" placeholder={data.schoolName} value={data.schoolName} onChange={func1}></input>
            <input type="text" name="schoolPercentage" placeholder={data.schoolPercentage} value={data.schoolPercentage} onChange={func1}></input>
            <input type="text" name="collegeName" placeholder={data.collegeName} value={data.collegeName} onChange={func1}></input>
            <input type="text" name="collegePercentage" placeholder={data.collegePercentage} value={data.collegePercentage} onChange={func1}></input>
            <Link to={`/bioform/${params.id}`} style={{textDecoration:"none"}}><button type="button" style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}>Back</button></Link>
            <button type="button" onClick={func2} style={{width : "40%"}}>Next</button> 
            {showModel && <Model message={message}></Model>}
        </form>
        </div>
        </div>
    );
};


export default EduForm;
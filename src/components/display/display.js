import React from "react";
import { useSelector } from "react-redux";
import { useState  } from "react";
import { useParams,Link } from "react-router-dom";
import "./display.css";
import Model from "./model.js";
import useFetch from "../../hooks/hook";
import useFetch1 from "./customhook";
const Display = () => {
    
    const params = useParams();
    const [showModel,setShowModel] = useState(false);
    const [message,setMessage] = useState("");
    const url = `http://localhost:5000/user`
    const {hookData} = useFetch(url);
    const {customhookData} = useFetch1(`http://localhost:5000/getAllDetails/${params.id}`);

    const data = useSelector((state) => state);

    const [mainData,setMainData] = useState({
        peopleData : {},
        bioData :{},
        eduData : {}
    });
        

       const display = (e) => {
        const val = hookData.find((item) => item._id === params.id);
        if(val){
          const peopleData = data.people.find((item) => item.id === params.id);
          const bioData = data.bioDetails.find((item) => item.id === params.id);
          const eduData = data.eduDetails.find((item) => item.id === params.id);
            if(peopleData && bioData && eduData){
                console.log("not Used database");
             setMainData({peopleData,bioData,eduData});
              }
            else{
                console.log("Used database");
                setMainData({...customhookData});
            }
        }
        else{
            setMessage("You are not a valid user please register to proceed");
            setShowModel(true);
        }
       }

    return(
        <div className="mainDiv">
         <div className="form-wrap">
        <form>
            <h1>Your Details </h1>
            <input type="text" name="fatherName"   placeholder={`name                     :      ${mainData.peopleData.name}`} ></input>
            <input type="text" name="mobileNumber" placeholder={`userName              :   ${mainData.peopleData.username}`} ></input>
            <input type="text" name="mobileNumber" placeholder={`emailId                   :   ${mainData.peopleData.email}`} ></input>
            <input type="text" name="mobileNumber" placeholder={`fatherName            :   ${mainData.bioData.fatherName}`} ></input>
            <input type="text" name="mobileNumber" placeholder={`mobileNumber        :   ${mainData.bioData.mobileNumber}`}></input>
            <input type="text" name="mobileNumber" placeholder={`city                          :   ${mainData.bioData.city}`}></input>
            <input type="text" name="mobileNumber" placeholder={`shcoolName            :   ${mainData.eduData.schoolName}`}></input>
            <input type="text" name="mobileNumber" placeholder={`schoolPercentage   :   ${mainData.eduData.schoolPercentage}`}></input>
            <input type="text" name="mobileNumber" placeholder={`collegeName           :   ${mainData.eduData.collegeName}`}></input>
            <input type="text" name="mobileNumber" placeholder={`collegePercentage  :   ${mainData.eduData.collegePercentage}`}></input>
            <Link to="/" style={{textDecoration:"none"}}><button type="button" style={{width : "40%",marginLeft:"15px",marginRight:"20px"}}  >Home</button> </Link> 
            <button type="button" onClick={display} style={{width : "40%"}} >Display Data</button> 
            {showModel && <Model message={message}></Model>}
        </form>
        </div>
        </div>
    );
};

export default Display;
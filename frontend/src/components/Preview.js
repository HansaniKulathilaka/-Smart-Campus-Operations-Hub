import { useState, useRef ,useEffect } from "react";
//import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import Nav from "./Nav";


export default function Preview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const cardRef = useRef();

   const [inputs,setInputs] = useState(state ||{
          Name: "",
             Description: "",
             Year: "",
             Semester: "",
             Module: "",
             Date: ""
  
      });
  if (!state) return <p>No preview data available.</p>;

  const { Name,Description,Year,Semester,Module,Date: sessionDate } = state || {};

  //const history = useNavigate();
  /*localStorage.setItem(
  "editState",
  JSON.stringify({ Name,Description,Year,Semester,Module,Date: inputs })
);*/
     
  

  const handleEdit = () => navigate(-1/*"/Questions"*/, { state: {
      Name,Description,Year,Semester,Module,Date: inputs   
    }}/*{ state: { answers: inputs } }*/);
  const handleConfirm = (e) => {
   /*const handleSubmit =(e) =>{*/
      
        e.preventDefault();
        console.log(inputs);
       
        sendRequest().then(() => navigate('/AddSession'));
    /*}*/

    /*console.log("Final Data Submitted:", state);
    alert("Pain report submitted successfully!");
    navigate("/thank-you");*/
  };

    const sendRequest = async () => {

        /*if (!inputs.Name || !inputs.Description || !inputs.Year || !inputs.Semester || !inputs.Module || !inputs.Date) {
    alert("Please fill all fields");
    return;
  }*/
        try {
            await axios.post("http://localhost:8080/session/add", {
                Name: inputs.Name,
                Description: inputs.Description,
                Year: inputs.Year,
                Semester: inputs.Semester,
                Module: inputs.Module,
                Date: inputs.Date
                //Date: new Date(inputs.Date)
            });
        } catch (error) {
            console.error("Error occurred while adding stock:", error);
            alert("Failed to add records. Please try again.");
        }
    };

const containerStyle = {
   backgroundColor: "#e6f2ff",
      //backgroundImage: "url('https://wallpaperaccess.com/full/960592.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  lineHeight: "1.6",
  textAlign: "left",
  fontSize: "20px",
  animation: "card-entrance 0.8s var(--ease-out-quart) forwards",
  position: "relative",
   boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
   gap:"20px"
};



  return (
    
    
     <div >
      <Nav />
    <div style={{ fontFamily: "Segoe UI", backgroundColor: "#e6f2ff", minHeight: "100vh" }}>
      

     
      <div
        style={{
          maxWidth: "700px",
          margin: "80px auto",
          background: "white",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize:"20px" }}><b>🩺 Review Your Details</b></h2>



                <div
          //key={index}
          //ref={cardRef}
          //className="card"
          style={cardStyle}
         
        >
       
        <p><b>Session name:</b> {Name}</p>
        </div>
        
        <div style={cardStyle}>
        <p><b>Description:</b> {Description}</p>
        </div>
        <div style={cardStyle}>
        <p><b>Year:</b> {Year}</p>
        </div>
        <div style={cardStyle}>
        <p><b>Semester:</b> {Semester}</p>
        </div>
        <div style={cardStyle}>
        <p><b>Module:</b> {Module}</p>
        </div>
        <div style={cardStyle}>
        <p><b>Date:</b> {sessionDate}</p>
        </div>

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            onClick={handleEdit}
            style={{
              backgroundColor: "#aaa",
              color: "white",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              borderRadius: "6px",
            }}
          >
            Edit
          </button>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Confirm & Submit
          </button>
       
      </div>
</div>
      </div>
    </div>
  );
}


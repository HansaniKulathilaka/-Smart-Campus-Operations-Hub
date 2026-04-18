import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import axios from "axios";
import { useNavigate,Link ,useLocation} from "react-router-dom";
import { motion } from 'framer-motion';



const containerStyle = {
        //backgroundImage: "url('https://images.freecreatives.com/wp-content/uploads/2016/04/Best-Website-New-Wallpaper.jpg')", // Background image URL
       backgroundColor: "#e6f2ff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: "0",
        padding: "0",
        //height: "100vh",
        //display: "flex",
        minHeight: "100vh",  
    display: "block",
        justifyContent: "center",
        alignItems: "center",
        fontSize: '30px',
        //fontWeight: 'bold'
    };

    const buttonStyle = {
      padding: '10px 20px',
      backgroundColor: '#100c35ff',
      color: 'white',
      border: 'bold',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '20px',
      fontWeight: 'bold',
      gap:'20px'
    };
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  //gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  //gridTemplateColumns: "1fr 1fr", // 2 columns
  gap: "20px",
  width: "90%",
   margin:"30px"

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
   gap:"20px",
   overflow: "hidden",
};

function SessionDashboard(){
  const navigate = useNavigate();
  const cardRef = React.createRef();
  const [newdata, setnewdata] = useState([]);
const location = useLocation();
const [filteredData, setFilteredData] = useState([]);
const ComponentsRef = useRef();
const [noResults, setNoResults] = useState(false);
const [user, setUser] = useState({
    username: "",
    gender: "",
    age: "",
    photo: "", 
    role:""
  });

const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({ ...prev, photo: reader.result }));
        localStorage.setItem("photo", reader.result); // save for now in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/session');
            setnewdata(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setnewdata([]);
            setFilteredData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.key]); // Re-fetch when location changes (after updates)

    const deleteHandler = async (_id) => {
        try {
            await axios.delete(`http://localhost:8080/session/delete/${_id}`);
            alert("Deleted successfully!");
            fetchData(); 
        } catch (error) {
            console.error("Error deleting stock:", error);
            alert("Failed to delete records. Please try again.");
        }
    };

    const [viewedRecords, setViewedRecords] = useState(() => {
  return JSON.parse(localStorage.getItem("viewedRecords")) || [];
}); 

    const handleUserClick = ( itemId) => {
  
  const updatedViewed = [...new Set([...viewedRecords, itemId])];
  setViewedRecords(updatedViewed);
  localStorage.setItem("viewedRecords", JSON.stringify(updatedViewed));

  
  navigate(`/ViewSession/${itemId}`);
};
  
    return(
        <div>
            <Nav/>
     <div style={containerStyle}>
        <div style={{ display: "flex", height: "100vh", width:"100%" }}>
      <div
        style={{
          width: "400px",
          background: "#b9ddeeff",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Sidebar</h2>
        
                               
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", /*marginBottom: "20px",*/ marginTop:"36px", marginRight:"500px"}}>
    <button style={buttonStyle}
    onClick={() => {
    navigate("/AddSession");
    
  }}  >
    Add new session
  </button>
  </div>
      </div>

      {/* Main Content */}
      
      <div
        style={{
          flex: 1,
          backgroundColor: "#e6f2ff",
          padding: "40px",
        }}
      >
        <h1>Session Dashboard</h1>
        
        {/*<div
          //key={index}
          //ref={cardRef}
          //className="card"
          style={cardStyle}
         
        >*/}

          
          {noResults ? (
                <div>
                    <p>No records Found</p>
                </div>
            ) : (
                <div ref={ComponentsRef} /*style={containerStyle}*/>
                    <div style={gridContainer}>

                    {newdata && newdata.length > 0 ? (
                        newdata.map((data) => (
                            <div key={data._id} style={cardStyle}>


                                
            <div style={{ position: "relative", display: "inline-block",width: "100%" }}>
       <div style={{ marginBottom: "15px" }}>
  <img
    src={
      user.photo ||
      "https://img.freepik.com/free-vector/flat-back-school-pattern-collection_23-2149040892.jpg?semt=ais_hybrid"
    }
    alt="Profile"
    style={{
      width: "100%",          // full width inside card
      height: "150px",        // rectangle height
      objectFit: "cover",     // crop nicely
      borderRadius: "10px" ,
      opacity: 0.65,   
    }}
  />
</div>
        <br />
        <input type="file" accept="image/*" onChange={handlePhotoChange}  id="fileInput" style={{ display: "none" }} />
         <label
    htmlFor="fileInput"
    style={{
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#a8c42bff",
      color: "white",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      cursor: "pointer",
      border: "2px solid white",
    }}
  >
    +
  </label>
      </div>


                                <div /*style={containerStyle1}*/>
                                    <h1>Description:{data.Description}</h1>
                                    <h1>name: {data.Name}</h1>
                                    <h1>Year: {data.Year}</h1>
                                    <h1>Semester: {data.Semester}</h1>
                                    <h1>Module: {data.Module}</h1>
                                    <h1>Date: {data.Date}</h1>
                                    {/*<Link to={`/Update/${data._id}`}><button style={buttonStyle}>Update</button></Link>*/}
                                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <button onClick={() => deleteHandler(data._id)} style={buttonStyle}>Delete</button>
                                    <button style={buttonStyle}
                                    onClick={() => handleUserClick(data._id)}  >
                                         View
                                    </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No records available</p>
                    )}</div>
                    
                    <br></br>
                
                </div>
                
            )}
       {/* </div>*/}
       
      </div>
            </div>
        </div>
        </div>
    )
}

export default SessionDashboard
import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import axios from "axios";
import { useNavigate,Link ,useLocation,useParams} from "react-router-dom";



const containerStyle = {
        //backgroundImage: "url('https://images.freecreatives.com/wp-content/uploads/2016/04/Best-Website-New-Wallpaper.jpg')", // Background image URL
       backgroundColor: "#e6f2ff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: "0",
        padding: "0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: '30px',
        //fontWeight: 'bold'
    };

    const buttonStyle = {
      padding: '10px',
      backgroundColor: '#100c35ff',
      color: 'white',
      border: 'bold',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '20px',
      fontWeight: 'bold'
    };
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "1fr ", // 2 columns
  gap: "20px",
  width: "50%",
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
   gap:"20px"
};

const formStyle = {
        backgroundColor: "rgba(231, 240, 241, 0.8)", // Semi-transparent background for form
        padding: "30px",
        width: "600px",
        borderRadius: "10px",
        fontSize:"20px",
        marginLeft: "60px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        float: "right",
        justifyContent:"center",
        transition: "transform 0.3s ease, border-color 0.3s ease"
    };

function AdminPage(){
  const navigate = useNavigate();
  const cardRef = React.createRef();
  const [newdata, setnewdata] = useState([]);
const location = useLocation();
const [filteredData, setFilteredData] = useState([]);
const ComponentsRef = useRef();
const [noResults, setNoResults] = useState(false);
const [inputs,setInputs] = useState({Reminder: "" });
const [selectedSessions, setSelectedSessions] = useState([]);
const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }; 

    const { itemId } = useParams();

const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/user2/`);

            console.log("API response:", response.data);

       setFilteredData(response.data); 
  } catch (error) {
    console.error("Error fetching data:", error);
    setFilteredData([]);
  }
    };

    useEffect(() => {
  fetchData();
}, []); 

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


  
    return(
        <div>
            <Nav/>
     <div style={containerStyle}>
        <div style={{ display: "flex", minHeight: "100vh", width:"100%" }}>
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
        <h1>User Details</h1>
       
          
          {noResults ? (
                <div>
                    <p>No records Found</p>
                </div>
            ) : (
                <div ref={ComponentsRef} /*style={containerStyle}*/>
                     <div style={gridContainer}>

                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((data) => (
                            <div key={data._id} style={cardStyle}>
                
                                <div /*style={containerStyle1}*/>
                                
                                    <h1>User Name: {data.UserName}</h1>
                                  
                                    <h1>Email: {data.Email}</h1>
                                   
                                    <h1>Role: {data.Role}</h1>
                                    <div style={{alignItems:"right"}}>
                                 <button onClick={() => deleteHandler(data._id)} style={buttonStyle}>Remove User</button>
                                 </div>
                                    {/*<Link to={`/Update/${data._id}`}><button style={buttonStyle}>Update</button></Link>*/}
                                 
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No records available</p>
                    )}
                     </div>
                    <br></br>
                </div>
                
            )}

           
       
       
        </div>

     
     
            </div>
        </div>
        </div>
    )
}

export default AdminPage
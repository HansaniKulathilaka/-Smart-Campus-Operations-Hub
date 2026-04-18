import React, { useState, useEffect, useRef } from 'react';
import Nav from './Nav';
import axios from "axios";
import { useNavigate,Link ,useLocation,useParams} from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


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
      padding: '10px 15px',
        backgroundColor: '#100c35ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width:"400px",
    };
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // 2 columns
  gap: "20px",
  width: "100%",
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
        //width: "600px",
        borderRadius: "10px",
        fontSize:"20px",
        marginLeft: "60px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        //float: "right",
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        transition: "transform 0.3s ease, border-color 0.3s ease"
    };

function SessionDashboard(){
  const navigate = useNavigate();
  const cardRef = React.createRef();
  const [newdata, setnewdata] = useState([]);
const location = useLocation();
const [filteredData, setFilteredData] = useState([]);
const ComponentsRef = useRef();
const [noResults, setNoResults] = useState(false);
const [inputs,setInputs] = useState({Reminder: "" });
const [user, setUser] = useState({
    username: "",
    gender: "",
    age: "",
    photo: "", 
    role:""
  });

const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }; 

    const { itemId } = useParams();

const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/session/get/${itemId}`);

            console.log("API response:", response.data);

            
        /*const session = response.data;

        const selectedRecord = session.find(
          (item) => String(item._id) === String(id)
        );
            setnewdata(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setnewdata([]);
            setFilteredData([]);
        }*/
       setFilteredData([response.data.data]); // only one record
  } catch (error) {
    console.error("Error fetching data:", error);
    setFilteredData([]);
  }
    };

    useEffect(() => {
  if (itemId) {
    fetchData();
  }
}, [itemId]); 

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

    const handleReminderSubmit = async (e,session) => {
  e.preventDefault();

   if (filteredData.length === 0) {
    alert("No record selected.");
    return;
  }
 const currentRecord = filteredData[0];
  //console.log("Patient ID:", currentRecord.UserId?._id);
//console.log("Doctor ID:", localStorage.getItem("doctorId"));
console.log("Message:", inputs.Reminder);

 
   if (!inputs.Reminder || inputs.Reminder.trim() === "") {
    alert("Cannot send reminder. Enter the  message.");
    return;
  }

  try {

    console.log({
      sessionId: currentRecord._id,
      Name: currentRecord.Name,
      dateHappened: new Date(),
      message: inputs.Reminder,
      
    });
    await axios.put(
      `http://localhost:8080/session/addReminder/${currentRecord._id}`,
      {
        
        sessionId: currentRecord._id,
        Name: currentRecord.Name,
        dateHappened: new Date().toISOString(),
        message: inputs.Reminder,
        
      },
      /*{ withCredentials: true }*/
    );

    setFilteredData(prev =>
      prev.map(item =>
        item._id === currentRecord._id
          ? { ...item, current: { ...item.current, Reminder: { message: inputs.Reminder } } }
          : item
      )
    );
    setInputs(prev => ({ ...prev, Reminder: "" }));
    alert("Reminder added successfully!");
  } catch (error) {
    console.error("Error occurred while adding Reminder:", error);
    alert("Failed to add Reminder. Please try again.");
  }
};
  
const attendance = filteredData[0]?.attendance || [];

const participating = attendance.filter(
  s => s.status === "Participating"
).length;

const notParticipating = attendance.filter(
  s => s.status === "Not participating"
).length;

const maybe = attendance.filter(
  s => s.status === "May be"
).length;

const pieData = [
  { name: "Participating", value: participating },
  { name: "Not Participating", value: notParticipating },
  { name: "May be", value: maybe }
];

const COLORS = ["#4CAF50", "#F44336", "#FFC107"]; 
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
          flex: 2,
          backgroundColor: "#e6f2ff",
          padding: "40px",
        }}
      >
        <h1>View Session</h1>
        <div style={gridContainer}>

       {/* <div
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

               
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((data) => (
                            <div key={data._id} style={cardStyle}>
                                <div /*style={containerStyle1}*/>
                                    <div>
           <img
    src={
      user.photo ||
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/04/colortheory.jpg"
    }
    alt="Profile"
    style={{
      width: "100%",          // full width inside card
      height: "150px",        // rectangle height
      objectFit: "cover",     // crop nicely
      borderRadius: "10px" ,
      opacity: 0.55,   
    }}
  />
         </div><br></br>
                                <div style={cardStyle}>
                                    <p><b>Description: </b>  {data.Description}</p>
                                    </div>
                                    <br></br>
                                    <div style={cardStyle}>
                                    <p>name: {data.Name}</p>
                                    </div>
                                    <br></br>
                                    <div style={cardStyle}>
                                    <p>Year: {data.Year}</p>
                                    </div>
                                    <br></br>
                                    <div style={cardStyle}>
                                    <p>Semester: {data.Semester}</p>
                                    </div>
                                    <br></br>
                                    <div style={cardStyle}>
                                    <p>Module: {data.Module}</p>
                                    </div>
                                    <br></br>
                                    <div style={cardStyle}>
                                    <p>Date: {data.Date}</p>
                                    </div>
                                    <br></br>
                                    <Link to={`/UpdateSession/${data._id}`}><button style={buttonStyle}>Update</button></Link>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No records available</p>
                    )}
                    
                    <br></br>
                </div>
            )}
       {/*</div>*/}
        </div>
 
      </div>

      <div
        style={{
          flex: 0.5,
          backgroundColor: "#bddaf7",
          //width: "400px",
          padding: "40px",
        }}
      >
        <form style={formStyle} onSubmit={handleReminderSubmit}>
  <p>Add Reminders for your session</p><br></br>
   <label>
          <input type="text" name="Reminder" value={inputs.Reminder || "" }/* checked={inputs.Reminder === "weekly"} */ onChange={handleChange}  />
          
          </label><br></br>
          
           <br></br>
  <br />
  
          <button
            onClick={handleReminderSubmit}
            style={{
              backgroundColor: "blue",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Submit
          </button>
        </form>
  
        <div style={{ marginTop: "40px", background: "white", padding: "20px", borderRadius: "10px" }}>
  <h2>Attendance Overview</h2>

  {attendance.length === 0 ? (
    <p style={{fontSize:"20px"}}>No attendance data available</p>
  ) : (
    <PieChart width={400} height={300}>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        dataKey="value"
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]}/>
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )}
</div>

</div>
            </div>

            
        </div>
        
        </div>
    )
}

export default SessionDashboard
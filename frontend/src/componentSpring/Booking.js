import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import springApi from './springApi';
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Nav1 from './Nav1';
import UpdateBooking from './UpdateBooking';
//import '../css/print.css';
//import Nav from './Nav';
//const URL = "http://localhost:8080/stock";

function Display() {
    const [newdata, setnewdata] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const ComponentsRef = useRef();

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [authError, setAuthError] = useState("");

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Report",
        onBeforeGetContent: () =>
            new Promise((resolve) => {
                setTimeout(resolve, 500);
                resolve();
            }),
        onAfterPrint: () => alert("Report successfully download"),
    })

    const fetchData = async () => {
        try {
            /*const response = await axios.get('http://localhost:8080/notification', {
                withCredentials: true,
            });*/
            setAuthError("");
            const jwt = localStorage.getItem("token") || localStorage.getItem("access_token");
            if (!jwt) {
                setAuthError("Login required. JWT token not found.");
                setnewdata([]);
                setFilteredData([]);
                setNoResults(true);
                return [];
            }
            const response = await axios.get('http://localhost:8080/booking', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
           console.log("API response:", response.data);
            const data = Array.isArray(response.data) ? response.data : [];
            setnewdata(data);
            setFilteredData(data);
            if (!Array.isArray(response.data)) {
                setAuthError("Backend returned unexpected response. Your JWT may be invalid/expired.");
            }
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            setnewdata([]);
            setFilteredData([]);
            setAuthError("Failed to fetch data (unauthorized or server error).");
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.key]); // Re-fetch when location changes (after updates)

    const deleteHandler = async (id) => {
        try {
            await springApi.delete(`/booking/delete/${id}`);
            alert("Deleted successfully!");
            fetchData(); // Refresh data after delete
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Failed to delete data. Please try again.");
        }
    };

    const handleSearch = async () => {
        const data = await fetchData();
        const q = searchQuery.toLowerCase();
        const filtered = data.filter((data) =>
            Object.values(data).some((val) =>
                String(val).toLowerCase().includes(q)
            )
        );
        setnewdata(filtered);
        setNoResults(filtered.length === 0);
    };

    
    const containerStyle = {
        backgroundColor: "rgba(219, 244, 252, 0.96)",
        //backgroundImage: "url('https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')", // Background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
    const containerStyle1 = {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for form
        margin: "20px",
        padding: "20px",
        width: "300px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: '30px',
        fontWeight: 'bold'
    };

    const buttonStyle = {
        
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
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
    return (
        <div>
           {/* <Nav1/>*/}
            {authError ? (
                <div>
                    <p>{authError}</p>
                </div>
            ) : null}
            {noResults ? (
                <div>
                    <p>No Data Found</p>
                </div>
            ) : (
                <div ref={ComponentsRef} style={containerStyle}>
                    <div style={gridContainer}>
                    {newdata && newdata.length > 0 ? (
                        newdata.map((Item) => (
                            <div key={Item.id ?? Item._id}>
                                <div style={cardStyle}>
                                    
                                    <h1>Description: {Item.description}</h1>
                                    <h1>Date: {Item.date}</h1>
                                    <h1>Time: {Item.time}</h1>
                                    <h1>Attendance: {Item.attendence}</h1>
                                    <h1>Purpose: {Item.purpose}</h1>
                                     Status:{" "}
                        <span style={{
                                color:
                                Item.status === "APPROVED" ? "green" :
                                Item.status === "REJECTED" ? "red" : "orange",
                                fontWeight: "bold"
                                    }}>
                                    {Item.status || "PENDING"}
                                </span>
                                {Item.status === "REJECTED" && (
    <p style={{ color: "red" }}>
        Reason: {Item.reason}
    </p>
)}
<br></br>
                                    <Link to={`/UpdateBooking/${Item.id}`}><button style={buttonStyle}>Update</button></Link>
                                    <button onClick={() => deleteHandler(Item.id)} style={buttonStyle}>Delete</button>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                    </div>
                    
                    <br></br>
                </div>
            )}
            
            <div>
                <Link to={"/"}><button type="submit">Search</button></Link>
            </div>
        </div>
    )
}

export default Display
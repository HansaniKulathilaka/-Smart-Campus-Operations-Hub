import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import springApi from './springApi';
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Nav1 from './Nav1';
//import '../css/print.css';
//import Nav from './Nav';
//const URL = "http://localhost:8080/stock";

function Display() {
    const [newstock, setnewstock] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const ComponentsRef = useRef();

    const [filteredStock, setFilteredStock] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [authError, setAuthError] = useState("");

    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        documentTitle: "Stock Report",
        onBeforeGetContent: () =>
            new Promise((resolve) => {
                setTimeout(resolve, 500);
                resolve();
            }),
        onAfterPrint: () => alert("Report successfully download"),
    })

    const fetchStockData = async () => {
        try {
            /*const response = await axios.get('http://localhost:8080/notification', {
                withCredentials: true,
            });*/
            setAuthError("");
            const jwt = localStorage.getItem("token") || localStorage.getItem("access_token");
            if (!jwt) {
                setAuthError("Login required. JWT token not found.");
                setnewstock([]);
                setFilteredStock([]);
                setNoResults(true);
                return [];
            }
            const response = await axios.get('http://localhost:8080/notification', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
           console.log("API response:", response.data);
            const data = Array.isArray(response.data) ? response.data : [];
            setnewstock(data);
            setFilteredStock(data);
            if (!Array.isArray(response.data)) {
                setAuthError("Backend returned unexpected response. Your JWT may be invalid/expired.");
            }
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            setnewstock([]);
            setFilteredStock([]);
            setAuthError("Failed to fetch data (unauthorized or server error).");
            return [];
        }
    };

    useEffect(() => {
        fetchStockData();
    }, [location.key]); // Re-fetch when location changes (after updates)

    const deleteHandler = async (id) => {
        try {
            await springApi.delete(`/notification/delete/${id}`);
            alert("Deleted successfully!");
            fetchStockData(); // Refresh data after delete
        } catch (error) {
            console.error("Error deleting stock:", error);
            alert("Failed to delete stock. Please try again.");
        }
    };

    const handleSearch = async () => {
        const data = await fetchStockData();
        const q = searchQuery.toLowerCase();
        const filtered = data.filter((stock) =>
            Object.values(stock).some((val) =>
                String(val).toLowerCase().includes(q)
            )
        );
        setnewstock(filtered);
        setNoResults(filtered.length === 0);
    };

    
    const containerStyle = {
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
    return (
        <div>
            <Nav1/>
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
                    {newstock && newstock.length > 0 ? (
                        newstock.map((stockItem) => (
                            <div key={stockItem.id ?? stockItem._id}>
                                <div style={containerStyle1}>
                                    
                                    <h1>name: {stockItem.name}</h1>
                                    
                                    <Link to={`/UpdateSpring/${stockItem.id}`}><button style={buttonStyle}>Update</button></Link>
                                    <button onClick={() => deleteHandler(stockItem.id)} style={buttonStyle}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                    
                    <br></br>
                </div>
            )}
            <div>
                <Link to={"/Search"}><button type="submit">Search</button></Link>
            </div>
        </div>
    )
}

export default Display
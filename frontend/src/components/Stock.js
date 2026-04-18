import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Nav from './Nav';
//import '../css/print.css';
//import Nav from './Nav';
//const URL = "http://localhost:8080/stock";

function Stock() {
    const [newstock, setnewstock] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const ComponentsRef = useRef();

    const [filteredStock, setFilteredStock] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

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
            const response = await axios.get('http://localhost:8080/stock');
            setnewstock(response.data);
            setFilteredStock(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setnewstock([]);
            setFilteredStock([]);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, [location.key]); // Re-fetch when location changes (after updates)

    const deleteHandler = async (_id) => {
        try {
            await axios.delete(`http://localhost:8080/stock/delete/${_id}`);
            alert("Deleted successfully!");
            fetchStockData(); // Refresh data after delete
        } catch (error) {
            console.error("Error deleting stock:", error);
            alert("Failed to delete stock. Please try again.");
        }
    };

    const handleSearch = async () => {
        const data = await fetchStockData();
        const filtered = data.filter((stock) =>
            Object.values(stock).some((val) =>
                val.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        setnewstock(filtered);
        setNoResults(filtered.length === 0);
    };

    /*const handleSearch = () =>{
        fetchHandler().then((data)=>{
            const filteredStock = data.users.filter((stock)=>
            Object.values(stock).some((field)=>
                field.toString().toLowerCase().includes(searchQuery.toLowerCase())
            ))
            setnewstock(filteredStock);
            setNoResults(filteredStock.length === 0);
        })
    }*/
    const containerStyle = {
        backgroundImage: "url('https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')", // Background image URL
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
            <Nav/>
            {noResults ? (
                <div>
                    <p>No Stock Found</p>
                </div>
            ) : (
                <div ref={ComponentsRef} style={containerStyle}>
                    {newstock && newstock.length > 0 ? (
                        newstock.map((stockItem) => (
                            <div key={stockItem._id}>
                                <div style={containerStyle1}>
                                    <h1>id: {stockItem.ID}</h1>
                                    <h1>name: {stockItem.Name}</h1>
                                    <h1>category: {stockItem.Category}</h1>
                                    <h1>quantity: {stockItem.Quantity}</h1>
                                    <h1>status: {stockItem.Status}</h1>
                                    <Link to={`/Update/${stockItem._id}`}><button style={buttonStyle}>Update</button></Link>
                                    <button onClick={() => deleteHandler(stockItem._id)} style={buttonStyle}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No stocks available</p>
                    )}
                    <h1>Stock</h1>
                    <br></br>
                </div>
            )}
            <div>
                <Link to={"/Search"}><button type="submit">Search</button></Link>
            </div>
        </div>
    )
}

export default Stock
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Nav from './Nav';

function Search() {
    const [newstock, setNewStock] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStock, setFilteredStock] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stock');
                setNewStock(response.data);
                setFilteredStock(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setNewStock([]);
                setFilteredStock([]);
            }
        };
        fetchHandler();
    }, []);

    if (!newstock) {
        return <h2>Loading stock details...</h2>;
    }

    const handleSearch = async () => {
        const filtered = newstock.filter((stock) =>
            stock.Name && stock.Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredStock(filtered);
        setNoResults(filtered.length === 0);
    };

    const containerStyle = {
        backgroundImage: "url('https://www.hudalighting.com/wp-content/uploads/2020/06/hilton-hotel-ksa-huda-lighting-03.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        minHeight: "100vh",
        paddingTop: "80px", // Add padding to account for Nav bar
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    const containerStyle1 = {
        backgroundColor: "rgba(34, 235, 16, 0.58)",
        padding: "20px",
        width: "300px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px 0" ,// Add margin between stock items
        fontSize: '30px',
        fontWeight: 'bold'
    };

    const searchContainerStyle = {
        width: "100%",
        maxWidth: "1200px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "20px"
    };

    const searchBoxStyle = {
        width: "100%",
        maxWidth: "500px",
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        justifyContent: "center"
    };

    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "70%",
        fontSize: "16px"
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold"
    };

    return (
        <div>
            <Nav />
            <div style={containerStyle}>
                <div style={searchBoxStyle}>
                    <input
                        style={inputStyle}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        name="Search"
                        placeholder="Search stock details"
                        value={searchQuery}
                    />
                    <button
                        style={buttonStyle}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                {noResults ? (
                    <div style={containerStyle1}>
                        <p>No Stock Found</p>
                    </div>
                ) : (
                    <div style={searchContainerStyle}>
                        {filteredStock.length > 0 ? (
                            filteredStock.map((stockItem) => (
                                <div key={stockItem._id}>
                                    <div style={containerStyle1}>
                                        <h1>id: {stockItem.ID}</h1>
                                        <h1>name: {stockItem.Name}</h1>
                                        <h1>category: {stockItem.Category}</h1>
                                        <h1>quantity: {stockItem.Quantity}</h1>
                                        <h1>status: {stockItem.Status}</h1>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={containerStyle1}>
                                <p>No stocks available</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
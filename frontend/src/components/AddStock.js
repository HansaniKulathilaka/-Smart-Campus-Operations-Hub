import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Nav from './Nav';

function AddStock(){
    
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        ID:"",
        Name: "",
        Category: "",
        Quantity: "",
        Status: ""

    });
    

    const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit =(e) =>{
        e.preventDefault();
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(String(inputs.Name).trim())) {
            alert("Stock Name can only contain letters and spaces.");
            return;
        }
        
       
        console.log(inputs);
        //navigate after submit
        sendRequest().then(() => history('/Stock'));
    }

    
    const sendRequest = async () => {
        try {
            await axios.post("http://localhost:8080/stock/add", {
                ID: Number(inputs.ID),
                Name: inputs.Name,
                Category: inputs.Category,
                Quantity: Number(inputs.Quantity),
                Status: inputs.Status,
            });
        } catch (error) {
            console.error("Error occurred while adding stock:", error);
            alert("Failed to add stock. Please try again.");
        }
    };

    const navigate = useNavigate();
    const containerStyle = {
        backgroundImage: "url('https://thumbs.dreamstime.com/z/d-rendering-silver-stars-hotel-sign-white-facade-77987116.jpg')", // Background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: '30px',
        fontWeight: 'bold'
    };
    const formStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for form
        padding: "20px",
        width: "500px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
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
    return(
        <div>
            <Nav/>
        <div style={containerStyle}>
           
            <form onSubmit={handleSubmit} style={formStyle}>
            <label><h1>Id</h1></label>
            <input type = "number" name = "ID" onChange = {handleChange} value={inputs.ID || "" }required></input><br></br>
            <label><h1>Name</h1></label>
            <input type = "text" name = "Name" onChange = {handleChange} value={inputs.Name || ""} required></input>
            <br></br><br></br>

           <label><h1>Category</h1></label>
            <input type = "text" name = "Category" onChange = {handleChange} value={inputs.Category || ""} required></input>
            <br></br><br></br>
            <label><h1>Quantity</h1></label>
            <input type = "number" name = "Quantity" onChange = {handleChange} value={inputs.Quantity || "" }required></input><br></br>
            <label><h1>Status</h1></label>
            <input type = "text" name = "Status" onChange = {handleChange} value={inputs.Status || ""} required></input>
            <br></br><br></br>


            <button type = "submit"  style={buttonStyle}>Submit</button>
            </form>

        </div>
        </div>
    )
}

export default AddStock
import React, { useState } from 'react'
import Nav from './Nav';
import Update from './Update';
import Search from './Search';
import Print from './Print';
import { useNavigate ,Link} from 'react-router-dom';
import axios from "axios";
//hansani
//H@nsani2001

function Login(){
const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        UserName:"",
        Password: ""
    });
    

    const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/User/login", {
                UserName: inputs.UserName,
                Password: inputs.Password,
            });

           
            if (response.data === 'You are logged in'){
                alert("Login Success");
                navigate("/Stock")
            }else{
                    alert("Login error")
                }
            
        }catch(err){
            alert("error" + err.message);
        }
    }

    
   /* const sendRequest = async () => {
        try {
            await axios.post("http://localhost:8080/User/login", {
                UserName: inputs.UserName,
                Password: inputs.Password,
            });
        } catch (error) {
            console.error("Error occurred while adding stock:", error);
            alert("Failed to add stock. Please try again.");
        }
    };*/

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
    const containerStyle = {
        backgroundImage: "url('https://cdn.precioyviajes.com/04/11/61/04116108_gp.jpg')", // Background image URL
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
    const formStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for form
        padding: "20px",
        width: "500px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: '30px',
        fontWeight: 'bold'
    };
    const inputStyle = {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px'
        /*width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px'*/
       
    };

    return(
        <div style={containerStyle}>
           
            
            <form onSubmit={handleSubmit} style={formStyle}>
            <Link to={"/Register"}><button style={buttonStyle}>Register</button></Link>
            <label><h1>User Name</h1></label>
            <input style={inputStyle} type = "text" name = "UserName" onChange = {handleChange} value={inputs.UserName || ""  }required></input><br></br>
            <label><h1>Password</h1></label>
            <input style={inputStyle} type = "password" name = "Password"  onChange = {handleChange} value={inputs.Password || ""} required></input>
            <br></br><br></br>
            <button type = "submit" style={buttonStyle}>Submit</button>
            </form>
            
        </div>
    )
}

export default Login
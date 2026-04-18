import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav1 from '../componentSpring/Nav1';
import springApi from './springApi';

function AddStock(){
    
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        
        name: ""

    });
    

    const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        
    };

    /*const handleImgChange = (e) => {
       if(e.target.name === 'img'){
            setInputs({...inputs,img: e.target.files[0]})
        }else{
            setInputs({...inputs,[e.target.name]: e.target.value})
        } 
    };*/

    const handleSubmit =(e) =>{
        e.preventDefault();
        const nameRegex = /^[A-Za-z\s]+$/;
        /*const formData = new formData();
        formData.append("file",inputs.img);
        let imgName = "";
        try{
            const response = await axios.post("http://localhost:8080/notification/img", formData,{
                headers:{
                    'Content-Type' :'multipart/form-data'
                },
                
            });
            imgName = Response.data;
        }
        catch(error){
            alert("error in image uploading")
            return;
        }*/

        if (!nameRegex.test(String(inputs.name).trim())) {
            alert("given name can only contain letters and spaces.");
            return;
        }
        

       
        console.log(inputs);
        //navigate after submit
        sendRequest().then(() => history('/Display'));
    }

    
    const sendRequest = async () => {
        try {
            await springApi.post('/notification', { name: inputs.name });
            alert("Data added successfully!");
        } catch (error) {
            console.error("Error occurred while adding data:", error);
            alert("Failed to add data. Please try again.");
        }
    };

    const navigate = useNavigate();
    const containerStyle = {
        //backgroundImage: "url('https://thumbs.dreamstime.com/z/d-rendering-silver-stars-hotel-sign-white-facade-77987116.jpg')", // Background image URL
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
            <Nav1/>
        <div style={containerStyle}>
           
            <form onSubmit={handleSubmit} style={formStyle}>
            
            <label><h1>Name</h1></label>
            <input type = "text" name = "name" onChange = {handleChange} value={inputs.name || ""} required></input>
            <br></br><br></br>

           {/*<label><h1>Image</h1></label>
            <input type = "file" name = "img"  accept="img/*" onChange = {handleChange}  value={inputs.img || ""} required></input>
            <br></br><br></br>
           */}


            <button type = "submit"  style={buttonStyle}>Submit</button>
            </form>

        </div>
        </div>
    )
}

export default AddStock
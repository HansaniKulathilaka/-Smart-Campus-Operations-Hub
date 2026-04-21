import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav1 from '../componentSpring/Nav1';
import springApi from './springApi';

function AddStock(){
    
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        category: "",
        description: "",
        resource: "",

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
        //const nameRegex = /^[A-Za-z\s]+$/;

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

        /*if (!nameRegex.test(String(inputs.name).trim())) {
            alert("given name can only contain letters and spaces.");
            return;
        }*/
        

       
        console.log(inputs);
        //navigate after submit
        sendRequest().then(() => history('/Display'));
    }

    
    const sendRequest = async () => {
        try {
            await springApi.post('/incident', { category: inputs.category,description: inputs.description,resource: inputs.resource, });
            alert("Data added successfully!");
        } catch (error) {
            console.error("Error occurred while adding data:", error);
            alert("Failed to add data. Please try again.");
        }
    };

    const navigate = useNavigate();
    const containerStyle = {
        //backgroundImage: "url('https://thumbs.dreamstime.com/z/d-rendering-silver-stars-hotel-sign-white-facade-77987116.jpg')", // Background image URL
        backgroundColor:"rgba(219, 244, 252, 0.96)",
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
    const inputStyle = {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "70%",
        fontSize: "16px"
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
          {/*  <Nav1/>
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
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end",  marginTop:"36px", marginRight:"500px"}}>
    
  </div>
      </div>

      
      
      <div
        style={{
          flex: 1,
          backgroundColor: "rgba(219, 244, 252, 0.96)",
          //padding: "40px",
          marginLeft:"400px",
          marginTop:"100px"
          
        }}
      >*/}
           
            <form onSubmit={handleSubmit} style={formStyle}>
            <p style={{fontSize:"30px", fontWeight:"bold", marginLeft:"0px",color:"green"}}><center>Report Incidents</center></p>
                 <br></br>
            <label><h1>Title</h1></label>
            <input type = "text" name = "description" onChange = {handleChange} value={inputs.description || ""} style={{ ...inputStyle, width: "100%" }} required></input>
            <br></br><br></br>
             <label><h1>Category</h1></label>
            <select
         name="category"
        value={inputs.category}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        >
          <option value="">Select value</option>
        <option value="Equipment broken">Equipment broken</option>
  <option value="Electrical Issues">Electrical Issues</option>
  <option value="Projectors not working">Projectors not working</option>
  <option value="Sound System Issues">Sound System Issues</option>
        </select>
            <br></br><br></br>
             <label><h1>Resource</h1></label>
            <select
         name="resource"
        value={inputs.resource}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        >
          <option value="">Select value</option>
        <option value="Projector">Projector</option>
  <option value="Furniture">Furniture</option>
  <option value="Sound systems">Sound systems</option>
  <option value="AC Systems">AC Systems</option>
  <option value="Electric equipment">Electric equipment</option>
        </select>
            <br></br><br></br>

           {/*<label><h1>Image</h1></label>
            <input type = "file" name = "img"  accept="img/*" onChange = {handleChange}  value={inputs.img || ""} required></input>
            <br></br><br></br>
           */}


            <button type = "submit"  style={buttonStyle}>Submit</button>
            </form>

           {/* </div>
            </div>

        </div>*/}
        </div>
    )
}

export default AddStock
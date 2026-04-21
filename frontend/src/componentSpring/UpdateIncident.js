import React, { useEffect, useState } from 'react'
import springApi from './springApi';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import Nav1 from './Nav1';

function UpdateIncident() {
    const [inputs, setInputs] = useState({  status: '' ,reason:'',comments:''});
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
        console.log("Stock item id:", id);
        const fetchHandler = async () => {
            try {
                /*const response = await axios.get(`http://localhost:8080/notification/${id}`, {
                    withCredentials: true,
                });*/
                const response = await springApi.get(`/incident/${id}`);
                console.log("Fetched data:", response.data);
                
                // Check if the response has a data property
                if (response.data && response.data.data) {
                    setInputs(response.data.data);
                } else {
                    setInputs(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Data not found!");
                //navigate("/Display");
            }
        };
        fetchHandler();
    }, [id, navigate]);

    const sendRequest = async () => {
        const formData = new FormData();
    formData.append("details", JSON.stringify({ status: inputs.status,reason: inputs.reason ,comments: inputs.comments }));
        try {
            console.log("Sending update request with data:", inputs);
            
           /* const response = await axios.put(`http://localhost:8080/notification/update/${id}`, {
                
                Name: inputs.name,
                
            });*/
            const response = await springApi.put(
                `/incident/update/${id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            
            console.log("Update response:", response);
            
            if (response.status === 200) {
                alert('record updated successfully');
                navigate('/Display', { replace: true }); // Use replace to force a refresh
            }
        } catch (error) {
            console.error("Error occurred while updating data:", error);
            alert("Failed to update data. Please try again.");
        }
    };

    /*const updateStatus = async (id, status) => {
    try {
        let reason = "";

        if (status === "REJECTED") {
            reason = prompt("Enter rejection reason:");
        }

        const formData = new FormData();
        formData.append(
            "details",
            JSON.stringify({
                status: status,
                reason: reason
            })
        );

        await axios.put(`http://localhost:8080/booking/update/${id}`, formData);

        alert(`Booking ${status}`);
        //fetchData(); // refresh list
    } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status");
    }
};*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to:`, value);
        
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputs.status) {
        alert("Please select ongoing status");
        return;
    }

    if (inputs.status === "REJECTED" && !inputs.reason) {
        alert("Please enter a reason before submitting");
        return;
    }
        console.log("Form submitted with data:", inputs);
        sendRequest();
    };

    const containerStyle = {
        backgroundColor: "rgba(219, 244, 252, 0.96)",
        //backgroundImage: "url('https://static1.bigstockphoto.com/2/5/5/large1500/552076.jpg')", // Background image URL
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
        width: "700px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize:"24px"
    };
    const buttonStyle = {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        margin:"10px"
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
    return (
        <div>
        <Nav1/>
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
        <h2>...Change Incident Status !!!</h2>
        <div style={{ width: "80%", display: "flex", justifyContent: "flex-end", /*marginBottom: "20px",*/ marginTop:"36px", marginRight:"500px"}}>
    
  </div>
      </div>

      {/* Main Content */}
      
      <div
        style={{
          flex: 1,
          backgroundColor: "#e6f2ff",
          padding: "40px",
          marginLeft:"300px",
          marginTop:"200px"
        }}
      >
             
            <form onSubmit={handleSubmit} style={formStyle}>
                <h1>Update Data</h1>
                
                <button 
    type="button"
    onClick={() => setInputs(prev => ({ ...prev, status: "IN_PROGRESS", reason: "" }))}
    style={{...buttonStyle, backgroundColor: "yellow"}}
>
    IN PROGRESS
</button>
<button 
    type="button"
    onClick={() => setInputs(prev => ({ ...prev, status: "RESOLVED", reason: "" }))}
    style={{...buttonStyle, backgroundColor: "lightgreen"}}
>
    RESOLVED
</button>

<button 
    type="button"
    onClick={() => setInputs(prev => ({ ...prev, status: "REJECTED" }))}
    style={{...buttonStyle, backgroundColor: "salmon"}}
>
    REJECTED
</button>
<br></br><br></br>
<label><h1>Resolution</h1></label>
        <input 
            type="text" 
            name="resolution" 
            onChange={handleChange} 
            value={inputs.resolution || ""} 
            style={{...inputStyle, width: "80%"}}
            required
        />
<br></br><br></br>
 <label><h1>Give Comments</h1></label>
        <input 
            type="text" 
            name="comments" 
            onChange={handleChange} 
            value={inputs.comments || ""} 
            style={{...inputStyle, width: "80%"}}
            required
        />


               {/* <label><h1>Give Reason</h1></label>
                <input type="text" name="reason" onChange={handleChange} value={inputs.reason || ""} required></input>
                <br></br>
               
                
                <br></br><br></br>*/}
                {inputs.status === "REJECTED" && (
    <>
        <label><h1>Give Reason</h1></label>
        <input 
            type="text" 
            name="reason" 
            onChange={handleChange} 
            value={inputs.reason || ""} 
            style={inputStyle}
            required
        />
    </>
)}

<br></br><br></br>
                <button type="submit" style={buttonStyle}>Submit</button>
            </form>

            </div>
            </div>
            
        </div>
        </div>
    )
}

export default UpdateIncident
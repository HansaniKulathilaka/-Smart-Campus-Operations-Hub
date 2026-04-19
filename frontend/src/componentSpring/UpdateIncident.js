import React, { useEffect, useState } from 'react'
import springApi from './springApi';
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";


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
    return (
        <div style={containerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h1>Update Data</h1>
                
                <button 
    type="button"
    onClick={() => setInputs(prev => ({ ...prev, status: "IN_PROGRESS", reason: "" }))}
    style={{...buttonStyle, backgroundColor: "lightorange"}}
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
    Reject
</button>

<label><h1>Resolution</h1></label>
        <input 
            type="text" 
            name="resolution" 
            onChange={handleChange} 
            value={inputs.resolution || ""} 
            required
        />

 <label><h1>Give Comments</h1></label>
        <input 
            type="text" 
            name="comments" 
            onChange={handleChange} 
            value={inputs.comments || ""} 
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
            required
        />
    </>
)}
                <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}

export default UpdateIncident
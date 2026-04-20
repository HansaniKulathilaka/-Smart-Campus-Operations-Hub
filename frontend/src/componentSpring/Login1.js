import React from 'react';
import Nav1 from './Nav1';

function Login1() {
  const handleLogin = () => {
  //window.location.href = "http://localhost:8080/oauth2/authorization/google";
  window.location.href =
"http://localhost:8080/oauth2/authorization/google?prompt=select_account";
};

const handleChange = (e) => {
        /*setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));*/
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
  return (
    <div>
         <Nav1/>
       <div style={containerStyle}>
      <h1>Login Page</h1>
      <br></br>
      <button onClick={handleLogin}  style={buttonStyle}>
  Login with Google
</button>

 <div>
                
           <h1 style={{fontSize:'40px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#f10e0eff",margin: "100px"}}><b>Welcome!<br></br> to SLIIT Connect</b></h1>
            
            
            <br></br><br></br>
           </div>
            
           <div  >
            <form /*onSubmit={handleSubmit}*/ style={formStyle}>
           {/* <Link to={"/Register2"}><button style={buttonStyle}>Register</button></Link>*/}
            <label><h1>User Role</h1></label>
        <select
         name="Role"
       // value={inputs.Role}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        >
        <option value="Admin">Admin</option>
        <option value="SLIIT Student">SLIIT Student</option>
        <option value="Event organizer">Event organizer</option>
        </select>
        <br/><br/><br></br>
            <label><h1>User Name</h1></label>
            <input style={inputStyle} type = "text" name = "UserName" onChange = {handleChange} /*value={inputs.UserName || ""  }*/required></input><br></br>
            <label><h1>Password</h1></label>
            <input style={inputStyle} type = "password" name = "Password"  onChange = {handleChange} /*value={inputs.Password || ""} */required></input>
            <br></br><br></br>
            <button type = "submit" style={buttonStyle}>Login</button>
            </form>
            </div>
            </div>
    </div>
  );
}

export default Login1;
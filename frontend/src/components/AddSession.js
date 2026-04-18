import { useState, useEffect } from "react";
import Nav from './Nav';
import { useNavigate } from "react-router-dom";

const containerStyle = {
        //backgroundImage: "url('https://images.freecreatives.com/wp-content/uploads/2016/04/Best-Website-New-Wallpaper.jpg')", // Background image URL
       backgroundColor: "#e6f2ff",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: "0",
        padding: "0",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: '30px',
        //fontWeight: 'bold'
    };

    const formStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for form
        padding: "30px",
        width: "800px",
        //height:"100%",
        borderRadius: "10px",
        marginLeft: "60px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        //float: "right",
        justifyContent:"center",
        transition: "transform 0.3s ease, border-color 0.3s ease",
       

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
        backgroundColor: '#100c35ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width:"400px",
        
    };

function AddSession(){
  const [year, setYear] = useState("");
const [semester, setSemester] = useState("");
const [modules, setModules] = useState([]);
    const navigate = useNavigate();
     const [currentStep, setCurrentStep] = useState(0);
     const totalSteps = 4;

   const [inputs,setInputs] = useState({
             Name: "",
             Description: "",
             Year: "",
             Semester: "",
             Module: "",
             Date: ""
     
         });

    const [user, setUser] = useState({
        username: "",
        gender: "",
        age: "",
        photo: "", 
        role:""
      });
         
const handleChange = (e) => {
        setInputs((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };  

     const modulesData = [
  { id: 1, name: "Programming Fundamentals", year: 1, semester: 1 },
  { id: 2, name: "Mathematics", year: 1, semester: 1 },
  { id: 3, name: "Data Structures", year: 1, semester: 2 },
  { id: 4, name: "Web Development", year: 1, semester: 2 },
  { id: 5, name: "Database Systems", year: 2, semester: 1 }
];

const locationData = {
  "Main Building - A Block": ["A501", "A502", "A503"],
  "Main Building - B Block": ["B101", "B102", "B103"],
  "New Building - G Block": ["C201", "C202"],
  "New Building - F Block": ["C201", "C202"],
   "Other": ["Main Aditorium", "Mini Auditorium"],
  
};


     useEffect(() => {
  setModules([]);

  if (year && semester) {
    const filteredModules = modulesData.filter(
      (m) =>
        m.year === Number(year) &&
        m.semester === Number(semester)
    );

    setModules(filteredModules);
  }
}, [year, semester]);




/*const savedState = JSON.parse(localStorage.getItem("editState") || "{}");
  const defaultInputs = {
    Name: "",
             Description: "",
             Year: "",
             Semester: "",
             Module: "",
             Date: ""
  };*/


      useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentStep]);
  const handlePreview = () => {
    navigate("/Preview", {
      /*state: {
        Name,
        Description,
        Year,
        Semester,
        Module,
        Date
        //inputs
      }*/state: inputs,
    });
  };
    return(
        <div>
            <Nav/>
     <div style={containerStyle}>
        <div style={{ display: "flex", height: "100vh", width:"100%" }}>
      <div
        style={{
          width: "400px",
          background: "#b9ddeeff",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Sidebar</h2>
      </div>

      {/* Main Content */}
      
      <div
        style={{
          flex: 1,
          backgroundColor: "#e6f2ff",
          padding: "40px",
           display: "flex",
    flexDirection: "column",
    //justifyContent: "center",   
    alignItems: "center",
    marginTop:"40px"
          
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Session</h1>
       
        
         <form style={formStyle}  /*onSubmit={handleSubmit}*/>
         <div>
           <img
    src={
      user.photo ||
      "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/04/colortheory.jpg"
    }
    alt="Profile"
    style={{
      width: "100%",          // full width inside card
      height: "150px",        // rectangle height
      objectFit: "cover",     // crop nicely
      borderRadius: "10px" ,
      opacity: 0.55,   
    }}
  />
         </div><br></br>
        {currentStep === 0 && (
          <div>
             <label><h1> Session name</h1></label>
      <ul>
       
          <li >
          <br></br>
            
          <input type = "text" name = "Name" style={inputStyle} placeholder ="enter you answer"   onChange={handleChange} value={inputs.Name || "" }></input><br></br>
          </li>
       
      </ul><br></br>
      <label><h1>Add Description</h1></label>
      <textarea type = "text" name = "Description" style={inputStyle} placeholder ="enter you answer" onChange={handleChange} value={inputs.Description || "" }></textarea><br></br>
          
      </div>
        )}
        {currentStep === 1 && (
          <div>
           <label><h1> Select the category</h1></label>
                      <label>
       <input
             type="radio"
             name="Category"
               value="online"
              checked={inputs.Category === "online"}
              onChange={handleChange}
            />
            Online
              </label>

        <br />

                <label>


              <input
                type="radio"
               name="Category"
               value="physical"
               checked={inputs.Category === "physical"}
              onChange={handleChange}
             />
             Physical
            </label>
           <br></br><br></br>

           {inputs.Category === "online" && (
            <div>
           <label><h2>Meeting Link</h2></label>
            <input
             type="text"
              name="Link"
              placeholder="Enter meeting link"
              value={inputs.Link || ""}
            onChange={handleChange}
            style={{ ...inputStyle, width: "100%" }}
          />
          </div>
                )}

          {inputs.Category === "physical" && (
               <div>
          <label><h2>Location</h2></label>

              <select
         name="Location"
        value={inputs.Location || ""}
        /*onChange={handleChange}*/
        //onChange={(e) => { handleChange(e); location(e.target.value)}}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        >
         <option value="">Select Location</option>
  {Object.keys(locationData).map((location) => (
    <option key={location} value={location}>
      {location} Location
    </option>
  ))}
        </select>

        {inputs.Location && (
      <>
        <label><h2>Select hall</h2></label>
        <select
          name="hall"
          value={inputs.Hall}
          onChange={handleChange}
          style={{ ...inputStyle, width: "100%" }}
        >
          <option value="">Select Hall</option>
          {locationData[inputs.Location].map((hall) => (
            <option key={hall} value={hall}>
              {hall}
            </option>
          ))}
        </select>
      </>
    )}

          </div>
          )}

           
           </div>
        )}
{currentStep === 2 && (
          <div>
             <label><h1> Year</h1></label>
         <select
         name="Year"
        value={inputs.Year}
        /*onChange={handleChange}*/
        onChange={(e) =>{ handleChange(e); setYear(e.target.value)}}
        style={{ ...inputStyle, width: "100%" }}
        >
          <option value="">Select Year</option>
        <option value="1">Year 1</option>
  <option value="2">Year 2</option>
  <option value="3">Year 3</option>
        </select>
         <label><h1> Semester</h1></label>
         <select
         name="Semester"
        value={inputs.Semester}
        /*onChange={handleChange}*/
        onChange={(e) => { handleChange(e); setSemester(e.target.value)}}
        style={{ ...inputStyle, width: "100%" }}
        >
          <option value="">Select Semester</option>
         <option value="1">Semester 1</option>
  <option value="2">Semester 2</option>
        </select>

        <label><h1> Module name</h1></label>
         <select
         name="Module"
        value={inputs.Module}
        onChange={handleChange}
        style={{ ...inputStyle, width: "100%" }}
        >
        <option value="">Select Module</option>
  {modules.map((module) => (
    <option key={module.name} value={module.name}>
      {module.name}
    </option>
  ))}
        </select>
    </div>
      )}
{currentStep === 3 && (
    <div>
      <label>Date scheduled</label><br></br>
        <input type="date" name = "Date" style={inputStyle} onChange = {handleChange} value={inputs.Date || "" }/><br></br><br></br>
<br></br>

    <label>Time scheduled</label>
<input
  type="time"
  name="Time"
  placeholder="hh:mm AM/PM"
  value={inputs.Time || ""}
  onChange={handleChange}
  style={{ ...inputStyle, width: "100%" }}
/>
</div>
  )}
  <br></br>
  
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap:"20px" }}>
    <button
      type="button"
      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
      disabled={currentStep === 0}
      style={buttonStyle}
    >
      Previous
    </button>

    {currentStep < totalSteps - 1 && (
  <button
    type="button"
    onClick={() => setCurrentStep(prev => prev + 1)}
    style={buttonStyle}
  >
    Next
  </button>
 
)}


{currentStep === totalSteps - 1 && (
  <button
    type="button"
    onClick={handlePreview}
    style={{
      width: "50%",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "6px",
      fontSize:"16px"
    }}
  >
    Preview All Details →
  </button>
)}

   
 </div>
         
      </form>
      
     
      
      </div>
            </div>
        </div>
        </div>
    )
}

export default AddSession
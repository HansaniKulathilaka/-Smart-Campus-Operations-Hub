import React, { useEffect, useState } from 'react'
import axios from "axios";
//import { useParams } from 'react-router-dom'; 
import Stock from './Stock'
//const URL = "http://localhost:8080/stock";



function DisplayDetails() {
    //const { Id } = useParams(); 
    const [newstock, setnewstock] = useState([]);

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get('http://localhost:8080/stock');
                setnewstock(response.data);  
            } catch (error) {
                console.error("Error fetching data:", error); 
                setnewstock([]) ; 
            }
        };
        fetchHandler();
        }, []); 
     

    {/*useEffect(() => {
        fetchHandler().then((data) => setnewstock(data.newstock){
            
            console.log("Fetched data:", data); 
            if (Array.isArray(data)) { 
                setnewstock(data);
            } else {
                setnewstock([data]); 
            }
        });
    }, []); */}
    return (
        <div>
            <h1>Display</h1>
            {newstock && newstock.length > 0 ? (
                newstock.map((stockItem) => (
                    <div key={stockItem._id}>
                        <Stock newstock={stockItem} />
                    </div>
                ))
            ) : (
                <p>No stocks available</p> 
            )}
        </div>
    );
}


export default DisplayDetails
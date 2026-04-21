import React from "react";
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/Login1"); 
    };
    const navStyle = {
        backgroundColor: '#4f46e5',
        padding: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    const ulStyle = {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        gap: '2rem'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontWeight: '600',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        transition: 'all 0.3s ease'
    };

    const linkHoverStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fbbf24'
    };

    return (
        <div>
            <nav style={navStyle}>
                <ul style={ulStyle}>
                    <li>
                        
                        <Link 
                            to="/Display" 
                            style={linkStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Dashboard
                        </Link>
                        
                        <Link 
                            to="/Login1" 
                            style={linkStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Login
                        </Link>
                        <Link 
                            to="/AddBooking" 
                            style={linkStyle}
                            onMouseEnter={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            Actions
                        </Link>
                        
                        
                    </li>

                    <li>
                    <button
                        onClick={handleLogout}
                        style={{
                            ...linkStyle,
                            backgroundColor: "red",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Logout
                    </button>
                </li>
                    
                    
                   
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
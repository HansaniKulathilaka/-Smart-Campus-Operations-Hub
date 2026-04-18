import React, { useState, useEffect, useRef } from 'react';
import EmptyState from './EmptyState';
import { Calendar } from 'lucide-react';
import { useNavigate,Link ,useLocation} from "react-router-dom";

const Sessions = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get role from localStorage
        const role = localStorage.getItem('role');

        if (role === 'Event organizer') {
            navigate('/SessionDashboard');
        } else if (role === 'SLIIT Student') {
            navigate('/StudentDashboard');
        } else if (role === 'Admin') {
            navigate('/AdminPage');
        }
        // If no role found, stay on this page or redirect to login
    }, [navigate]);
    return (
        <div className="page-content">
            <EmptyState
                title="Sessions are coming soon!"
                description="Manage your study sessions and appointments in one place. Feature launching soon!"
                icon={Calendar}
            />
        </div>
    );
};

export default Sessions;

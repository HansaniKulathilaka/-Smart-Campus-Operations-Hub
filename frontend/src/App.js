import logo from './logo.svg';
import './App.css';
import Stock from './components/Stock';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddStock from './components/AddStock';
import Update from './components/Update';
import Home from './components/Home';
import Nav from './components/Nav';
import Nav1 from './componentSpring/Nav1';
import DisplayDetails from './components/DisplayDetails';
import Reports from './components/Reports';
import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import Upload from './components/Upload';
import SessionDashboard from './components/SessionDashboard';
import StudentDashboard from './components/StudentDashboard';
import AddSession from './components/AddSession';
import Preview from './components/Preview';
import ViewSession from './components/ViewSession';
import ViewSession2 from './components/ViewSession2';
import Login2 from './components/Login2';
import Register2 from './components/Register2';
import Profile from './components/Profile';
import UpdateSession from './components/UpdateSession';
import AdminPage from './components/AdminPage';
import Auth from './components/Auth';
import Chats from './components/Chats';
import EmptyState from './components/EmptyState';
import Groups from './components/Groups';
import Dashboard from './components/Dashboard';
import GroupDetails from './components/GroupDetails';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Sessions from './components/Sessions';
import AddData from './componentSpring/AddData';
import Display from './componentSpring/Display';
import UpdateSpring from './componentSpring/UpdateSpring';
import Login1 from './componentSpring/Login1';
import OAuthCallback from './componentSpring/OAuthCallback';
import AddBooking from './componentSpring/AddBooking';
import AddIncident from './componentSpring/AddIncident';
import Booking from './componentSpring/Booking';
import UpdateBooking from './componentSpring/UpdateBooking';
import UpdateIncident from './componentSpring/UpdateIncident';


function App() {
  
  return (
    //<Router>
    <div className="App">
      {/*<Nav/>*/}
      
      
      {/*<Stock/>*/}
      
      
        <Routes>
        <Route path = "/" element ={< Login1/>}/>
        <Route path = "/Main" element ={<Home />}/>
        <Route path = "/Login" element ={<Login />}/>
        <Route path = "/Stock" element ={<Stock />}/>
        <Route path = "/Register" element ={<Register />}/>
        <Route path = "/AddStock" element ={<AddStock/>}/>
        <Route path = "/Search" element ={<Search />}/>
        <Route path = "/Update/:id" element ={<Update/>}/>
        <Route path = "/Reports" element ={<Reports/>}/>
        <Route path = "/Upload" element ={<Upload/>}/>
        <Route path = "/SessionDashboard" element ={<SessionDashboard/>}/>
        <Route path = "/StudentDashboard" element ={<StudentDashboard/>}/>
        <Route path = "/AddSession" element ={<AddSession/>}/>
         <Route path = "/Preview" element ={<Preview/>}/>
          <Route path = "/ViewSession/:itemId" element ={<ViewSession/>}/>
          <Route path = "/ViewSession2/:itemId" element ={<ViewSession2/>}/>
          <Route path = "/UpdateSession/:id" element ={<UpdateSession/>}/>
          <Route path = "/Login2" element ={<Login2/>}/>
          <Route path = "/Register2" element ={<Register2/>}/>
          <Route path = "/Profile" element ={<Profile/>}/>
          <Route path = "/AdminPage" element ={<AdminPage/>}/>
          <Route path = "/Auth" element ={<Auth/>}/>
          <Route path = "/Chats" element ={<Chats/>}/>
          <Route path = "/EmptyState" element ={<EmptyState/>}/>
          <Route path = "/Groups" element ={<Groups/>}/>
          <Route path = "/Dashboard" element ={<Dashboard/>}/>
          <Route path = "/GroupDetails" element ={<GroupDetails/>}/>
          <Route path = "/Sidebar" element ={<Sidebar/>}/>
          <Route path = "/Topbar" element ={<Topbar/>}/>
          <Route path = "/Sessions" element ={<Sessions/>}/>
           <Route path = "/AddData" element ={<AddData/>}/>
           <Route path = "/Display" element ={<Display/>}/>
            <Route path = "/UpdateSpring/:id" element ={<UpdateSpring/>}/>
            <Route path = "/Login1" element ={<Login1/>}/>
            <Route path = "/oauth/callback" element ={<OAuthCallback/>}/>
             <Route path = "/AddBooking" element ={<AddBooking/>}/>
              <Route path = "/AddIncident" element ={<AddIncident/>}/>
             <Route path = "/Booking" element ={<Booking/>}/>
             <Route path = "/UpdateBooking/:id" element ={<UpdateBooking/>}/>
             <Route path = "/UpdateIncident/:id" element ={<UpdateIncident/>}/>
           
          
        </Routes>
      
    </div>
    //</Router>
  );
}

export default App;
 
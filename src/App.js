import React from 'react';
import'./index.css';
import {Route, Routes} from "react-router-dom";
import Entry from './components/Entry';
import NotFound from './components/NotFound';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import SectionHook from './components/SectionHook';
import Protected from "./components/Protected";
import Divided from './components/Divided';
import AddStudent from './components/AddStudent';
import Report from './components/Report';
import LineChart from './components/LineChart';
import Barchar from './components/Barchar';
import Realchart from './components/Realchart';
import Payments from './components/Payments';
import AddPayment from './components/AddPayment';
import RealChart1 from './components/RealChart1';
import RealChart2 from './components/RealChart2';
import RealChart3 from './components/RealChart3';
function App() {
  
  
   
  return (
    <div className="App">
     <Routes>
      
      <Route path="/" element={<Entry/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/hook-data" element={<SectionHook/>}/>
      <Route path="divided" element={<Divided/>}/>
      <Route path="payments" element={<Payments/>}/>
      <Route path="/addStudent" element={<AddStudent/>}/>
      <Route path="/addPayment" element={<AddPayment/>}/>
      <Route path="/report/:id" element={<Report/>}/>
      <Route path="/chart" element={<LineChart/>}/>
      <Route path="/barchart" element={<Barchar/>}/>
      <Route path="/real" element={<Realchart/>}/>
      <Route path="/real1" element={<RealChart1/>}/>
      <Route path="/real2" element={<RealChart2/>}/>
      <Route path="/real3" element={<RealChart3/>}/>
      

     </Routes>
      

      
     
     </div>
  );
}

export default App;


/*
        <Route path='/dashboard'
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard logOut = {logOut}/>
            </Protected>
          }
        />
        */
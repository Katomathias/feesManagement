import React from 'react';
import'./index.css';
import About from './components/About';
import {Route, Routes} from "react-router-dom";
import Entry from './components/Entry';
import NotFound from './components/NotFound';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import SectionHook from './components/SectionHook';
import Protected from "./components/Protected";

function App() {
  
  
   
  return (
    <div className="App">
     <Routes>
      <Route path="/about" element={<About/>}/>
      <Route path="/" element={<Entry/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/hook-data" element={<SectionHook/>}/>
     </Routes>
      <About/>

      
     
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
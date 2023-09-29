import React from 'react'
import cover from './images/cover2.jpg'
import { Link } from 'react-router-dom'

function Notifications(){
  const flexed={
    display:"flex",
    alignitems:"center",
    gap:20,
    
    
}
  return(
    <div className='child'>
      <div style={flexed} className='child'>
      <img src={cover}/>
      <span>Posted by Mathias on  <small> 25th June 2022</small></span>
      <hr/>
      </div>
      <p>his content below is about the application fgh j k g g hj gf gdgy e </p>
      <Link>Read more...</Link>
     
    </div>
  )
}

function Entry() {
  return (
    <div className='parent'>
    <div className='header'>
      <img src={cover}/>  
      <div>
      <h1>School Fees <span className="em">Management System</span></h1>
      <p>This content below is about the application </p>
      <Link to="/login">Login now</Link>
      </div>
      </div>
      
      <div className='notifications'>
      <h2>Notifications</h2>
      <div className='not'>
      <Notifications/>
      <Notifications/>
      <Notifications/>
      </div>
      
      </div>
    
    </div>
  )
}

export default Entry
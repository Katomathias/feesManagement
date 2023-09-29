import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import icon from './images/icon.jpg';



function RegisterPage() {
const[errors, setErrors]=useState(false);
const err_msg="Please supply all fields";
const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  try {
      const response = await fetch('http://127.0.0.1:8000/register', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          navigate('/login'); // Redirect to login 
      } else {
          const errorData = await response.json();
          setErrors(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
  }
};
  const flexed={
    display:"flex",
    justifyContent:"center",
    gap:10,
    padding:15
}
  return (
   
    <div className='LoginPage'>
    
    <form onSubmit={handleRegister}> 
    <h1>USER REGISTRATION</h1>
    <img src={icon}/>
    <hr/>
    {errors && <p style={{color:"red"}}>{err_msg}</p>}
    <div className='grouped'>
    <input type='text' placeholder='firstname' name='fname' />
    <input type='text' placeholder='lastname' name='lname' />
    </div>
    <input type='text' placeholder='username' name='uname' />
    <input type='email' placeholder='email' name='email' />
    <div className='grouped'>
    <select name="Gender">
      <option value='Male'>Male</option>
      <option value='Female'>Female</option>
    </select>
    <input type='text' placeholder='Nationality' name='nationality' />
    </div>
    <input type='text' placeholder='student number' name='stnumber' />
    <input type='file' name='pp' accept='image/*'/>

    <div className='grouped'>
    <input type='password' placeholder='set password' name='password' /> 
    <input type='password' placeholder='verify password' name='vpassword' />
    </div>
   
    <button>Register</button>
    <p style={{textAlign: 'center'}}>Forgot your Password? Click <Link>Here</Link></p>
    <div style={flexed} className='div-new'>
                <p>Already registered?  <Link to={'/login'}> Login </Link></p>
                    
                </div>
                <hr/>
                <div style={flexed} className='links'>
                    <Link>Terms & conditions</Link>
                    <Link>Privacy Policy </Link>
                    <Link>Security</Link>
                </div>
    </form>
    </div>
  )
}

export default RegisterPage
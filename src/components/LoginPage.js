import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import icon from './images/icon.jpg';


function LoginPage() {
    const navigate = useNavigate();
    const[uname,setUname ]=useState("");
    const[pword,setPword ]=useState("");
    const[errors,setErrors ]=useState(false);
    const err_msg ="Please suppply both a username and password";
    const handleLogin = (e) => {
        e.preventDefault();
        if(uname.length === 0 || pword.length === 0){
            setErrors(true);
            return
        }
        setErrors(false);
        let formData = new FormData();
        formData.append("username",uname);
        formData.append("password",pword);
        const requestOptions = {
            method: 'POST',
            cors:"cors",
            credentials: "omit",
            body: formData
        };
        fetch(`http://127.0.0.1:8000/login`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem('token', data.token);
         //   logIn();
            navigate("/dashboard");
            //form.reset();
        })
        .catch((err) => console.log(err));
    }
    
    const flexed={
        display:"flex",
        justifyContent:"center",
        gap:10,
        padding:15
    }


  return (
    <div className='LoginPage'>
         
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}> 
                <img src={icon}/>
                {errors && <p style={{color:"red"}}>{err_msg}</p>}
                <h1>Sign in into fees management</h1>
                <div >
                <label>Account Username</label>
                <input type='text' placeholder='username' name='uname' onChange={(e)=>setUname(e.target.value)} />
                <label>Account Password</label>
                <input type='password' placeholder='password' name='pword'onChange={(e)=>setPword(e.target.value)} />
                <button><Link to='/dashboard'>Login</Link></button>
                </div>
            <div className='FormInputs'>
            <Link style={{color:"red"}}>Forgot your Password?</Link>
            </div>
                <div style={flexed} className="div-new">
                    <p>New to Fees Management?  <Link to={'/register'}> Create an Account</Link></p>
                    
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

export default LoginPage
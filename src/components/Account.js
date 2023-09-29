import React,{useState,useEffect, useRef} from 'react'
import icon from './images/icon.jpg';
import useFetch from './useFetch';

function Account() {
  const [dataUpdate, setDataUpdate] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(true);
  const [errorUdate, setErrorUpdate] = useState(null);

  const [contact, setContact] = useState()
  const [address, setAddress] = useState()
  const [refresh, setRefresh] = useState(false)
  



  const [url, setUrl] = useState("http://127.0.0.1:8000/user-profile/1");
  const [data, setData] = useState()
    function handleUserInfo(e){
        e.preventDefault();
        let formData = new FormData(document.querySelector("#profile"));
        //for the post update button
            fetch("http://127.0.0.1:8000/user-profile/1",{
              method:"POST",
              body: formData
            })
            .then(res => {
              if(!res.ok){
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then(data =>{
              setDataUpdate(data);
              setLoadingUpdate(false);
              setErrorUpdate(null); 
              setRefresh(!refresh);
            })
            .catch(err =>{
              setErrorUpdate(err.message);
              setLoadingUpdate(false);
            })
         
    }
    useEffect(()=>{
      fetch(url)
      .then(res => {
          if(!res.ok){
              throw Error(res.statusText);
          }
          return res.json();
      })
      .then(data =>{
          setData(data);
          setContact(data['contact'])
          setAddress(data['address'])
      })
      .catch(err =>{
          console.log(err.message);
      })
    },[refresh])
  return (
    <div className="userProfile">
      
      <div className="acc2">
      {data && 
        <form onSubmit={handleUserInfo} id='profile'>
            <div>
              <label>Name</label>
              <input type='text' name='name' readOnly value={data['full_name']} placeholder='fullname' />
              <label>Email</label>
              <input type='email' name='email' readOnly value={data['email']} placeholder='user email' />
              <label>Gender</label>
              {data['gender'] === 'MALE' ?
                <>
                  <input type='radio' name='gender' readOnly value={'MALE'} checked /> <span>Male</span>
                </>:
                <>
                  <input type='radio' name='gender' readOnly value={'FEMALE'} checked  /> <span>Female</span>
                </>
              } 
              <label>Date of Birth</label>
              <input type='date' value={data['dob']} name='date'/>
            </div>
            <div>
              <label>Address</label>
              <textarea placeholder='user address' onChange={(e)=>setAddress(e.target.value)} value={address} name='address'></textarea>
              <label>Contact</label>
              <input type='tel' name='tel' onChange={(e)=>setContact(e.target.value)} value={contact} placeholder='phone number'/>
              {loadingUpdate && <button>Update User Info</button>}
              {!loadingUpdate && <button>Updating information ...</button>}
            </div>
        </form>
        }
        {/*
        </div>
        <div className="acc2">
        <div className='change'>
        <img src={icon}/> <br/>
        <button>Change Image</button><br/><br/>
        <button>Change Password</button>
        </div>
        */}
        

        </div>
        

    </div>
  )
}

export default Account
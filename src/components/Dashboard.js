import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import icon from './images/icon.jpg';
import Payments from './Payments';
import Students from './Students';
import useFetch from './useFetch';
import Account from './Account';


const InitialComponent = () => {
    const{data:payments, loading, error}=useFetch("http://localhost:8000/payments");
    const{data:stats, loading:loadstats, error:errorStats}=useFetch("http://localhost:8000/stat");
    return(
        <>
            <div className='quickStats'>
                <div>
                <i class="fa-solid fa-users fa-2x"></i>
                {stats && <span>{stats.user_count}</span>}
                    <p>User count</p>
                </div>
                <div>
                <i class="fa-solid fa-graduation-cap fa-2x"></i>
                {stats && <span>{stats.students_count}</span>}
                <p>Students count</p>  
                </div>
                
                <div>
                <i class="fa-sharp fa-solid fa-coins fa-2x"></i>
                {stats && <span>{stats.amount_collected}</span>}
                <p>Amount count</p>  
                </div>
            </div>
            <div className='payments'>
                <h1>Recent Payments</h1>
                <table>
                    <tr>
                        <th>#</th>
                        <th>Name of Student</th>
                        <th>Amount Paid (UGX)</th>
                        <th>Date</th>
                    </tr>
                    {error && <p>{error}</p>}
                    {loading && <p>Loading data ....</p>}
                    {payments && 
                        <>
                        {payments.map(payment => {
                        
                        return(
                            
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{payment.name}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.date}</td>
                            </tr>
                   
                        )
                        })}
                        </>
                            }                   
                </table>
            </div>
        </>
    )
}

function Dashboard() {
    const [current, setCurrent] = useState("initial");
    useEffect(()=>{
        console.log(current);
    })
    
  return (
    <div className='dashboard'>
        
        <div className='div'>

        <div>

        <img src={icon}/>
        <hr/>
        <figcaption>Mathias Kato</figcaption>
        <small>created on 25th/june/2022</small>
                <Link className='active' onClick={() => setCurrent("initial")}>Home</Link>
                <Link onClick={() => setCurrent("payments")}>Payments</Link>
                <Link onClick={() => setCurrent("students")}>Students</Link>
                <Link onClick={() => setCurrent("account")}>My Account</Link>
                <Link to='/'>Logout</Link> 
        </div>
           
        </div>
        <div className='div'>
            <div className='system_name'>
        
            <p>School Fees Management Online System</p>
            </div>
            <div className='sticky'>
                {current === 'initial' && <InitialComponent />}
                {current === 'payments' && <Payments />}
                {current === 'students' && <Students />}
                {current === 'account' && <Account />}
            </div>
        </div>
        </div>
  )
}

export default Dashboard
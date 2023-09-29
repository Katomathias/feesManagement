import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import icon from './images/icon.jpg';
import Payments from './Payments';
import Students from './Students';
import useFetch from './useFetch';
import Account from './Account';
import RealChart1 from './RealChart1';
import RealChart2 from './RealChart2';


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

            <div className='chart1'>
            <RealChart2/>
             <RealChart1/>
               
            </div>
            <div className='payments'>
              
                <h1>Recent Payments</h1>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name of Student</th>
                        <th>Amount Paid (UGX)</th>
                        <th>Date</th>
                    </tr>
                    </thead>
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
                            <tfoot>
                              <tr>
                                <td colspan="4">C/O Management</td>
                                </tr>  
                             </tfoot>                  
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
            <div className='logo'></div>

        <div>
        <img src={icon}/>
        <hr/>
        <figcaption>Mathias Kato</figcaption>
        <small>created on 25th/june/2022</small> 
        
                <Link className='active' onClick={() => setCurrent("initial")}><i class="fa-solid fa-house"><span>   Home</span> </i></Link>
                <Link onClick={() => setCurrent("payments")}><i class="fa-solid fa-money-bill"><span>   Payments</span> </i></Link>
                <Link onClick={() => setCurrent("students")}><i class="fa-solid fa-school"><span>   Students</span> </i></Link>
                <Link onClick={() => setCurrent("account")}><i class="fa-solid fa-file-invoice-dollar"><span>   My Account</span> </i></Link>
                <Link className='logout' to='/'><i class="fa-solid fa-right-from-bracket"><span>   Logout</span> </i></Link> 
        </div>
           
        </div>
        <div className='div'>
            <div className='system_name'>
        <br/>
            <p><marquee>School Fees Management Online System</marquee></p>
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
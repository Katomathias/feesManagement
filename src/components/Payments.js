import React,{useState} from 'react'
import useFetch from './useFetch';

function Payments() {
    const[url, setUrl]=useState("http://localhost:8000/payments");
    const{data:payments, loading, error}=useFetch(url);
    /* line 6 can as well be  minusus the states be written as
    const{data:payments, loading, error}=useFetch("http://localhost:8000/payments")
    */
    const handlePayments = (e) => {
        const student_name = e.target.student.value;
        e.preventDefault();
        setUrl(`http://127.0.0.1:8000/payments?name=${student_name}`);
    }

    const handleDate = (e) => {
        e.preventDefault();
        const start_date = e.target.start_date.value;
        const end_date = e.target.end_date.value;
        setUrl(`http://127.0.0.1:8000/payments?start-date=${start_date}&end-date=${end_date}`);
    }

    const handleSearchChange = (e) =>{
        if(e.length === 0){
            setUrl("http://127.0.0.1:8000/payments");
        }
    }
  return (
    <div>
        <div className='filter'>
            <form onSubmit={handlePayments}>
            <input type='text' onChange={(e) => handleSearchChange(e.target.value)} name ="student" list='students' placeholder='student name'/>
                <datalist id='students'>
                {payments && 
                    <>
                        {payments.map(payment => {
                            return(
                            <option key={payment.id}>{payment.name}</option>
                            )
                        })}
                    </>
                }
                </datalist>
                <button>get details</button>
            </form>
            <form onSubmit={handleDate}>
                <div>
                    <label>start date</label>
                    <input type='date' name ="start_date"/>
                </div>
                <div>
                    <label>end date</label>
                    <input type='date' name ="end_date"/>
                </div>
                <button>filter</button>
            </form>
        </div>
        <div className='payments_effected'>
            <h1>Available Payments</h1>
            <table>
                <tr>
                    <th>#</th>
                    <th>Name of student</th>
                    <th>Amount Paid (Ugx)</th>
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
    </div>
  )
}

export default Payments
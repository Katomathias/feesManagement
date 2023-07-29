import React,{useState} from 'react'
import useFetch from './useFetch';

function Students() {
    const[url, setUrl]=useState("http://localhost:8000/students");
    const{data:Students, loading, error}=useFetch(url);
    const handleSearch=(e)=>{
        e.preventDefault();
        const student_name = e.target.student.value;
        e.preventDefault();
        setUrl(`http://127.0.0.1:8000/students?search=${student_name}`);
    }
    const handleSearchChange = (e) =>{
        if(e.length === 0){
            setUrl("http://127.0.0.1:8000/students");
        }
    }
  return (
    <div>
    <div className='filter'>
        <form onSubmit={handleSearch}>
            <div>
            <input type='text' onChange={(e)=>handleSearchChange(e.target.value)} name ="student" placeholder='student name'/>
            <button>Search details</button>
            </div>
        </form>
        
    </div>
    <div className='payments_effected'>
        <h1>Available Students</h1>
        <table>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Student No</th>
                <th>Nationality</th>
                <th>Date-of Birth</th>
                <th>Gender</th>
                
            </tr>
            {error && <p>{error}</p>}
                    {loading && <p>Loading data ....</p>}
                    {Students && 
                        <>
                        {Students.map(student => {
                        
                        return(
                            
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.student_number}</td>
                                <td>{student.nationality}</td>
                                <td>{student.dob}</td>
                                <td>{student.gender}</td>
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

export default Students
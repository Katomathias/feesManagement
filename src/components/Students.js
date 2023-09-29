import React,{useState} from 'react'
import useFetch from './useFetch';
import { Link } from 'react-router-dom';

function Students() {
    const[url, setUrl]=useState("http://localhost:8000/students");
    const{data:Students, loading, error}=useFetch(url);
    const [student,setStudent]= useState([]);
    const [name, setName]= useState('');
    const [student_number, setStudent_Number]= useState('');
    const [nationality, setNationality]= useState('');
    const [gender, setGender]= useState('');
    
    
   const handleAddStudent = (event) =>{
        event.preventDefault();
        fetch('http://127.0.0.1:8000/student',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, student_number:student_number, nationality:nationality, gender:gender})
        })
        .then(response => response.json())
        .then(data=> {
            if (data.success){
                setStudent([...student,{name: name, student_number:student_number, nationality:nationality, gender:gender}]);
                setName('');
                setStudent_Number('');
                setNationality('');
                setGender('');


            }
        });
    }; 
   
    const handleDeleteStudent = (id)=> {
        fetch(`http://127.0.0.1:8000/student/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success){
                setStudent(Students.filter(payment => payment.id !==id));
            }
        });
    };
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
                <button className='add'><Link to="/addStudent">Add-Student</Link></button>
            </div>
            <div>
            <input type='text' onChange={(e)=>handleSearchChange(e.target.value)} name ="student" placeholder='student name'/>
            <button>Search details</button>
            </div>
           
            
        </form>
        
    </div>
    <div className='payments_effected'>

             
        <h1>Available Students</h1>
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Student No</th>
                <th>Nationality</th>
                <th>Date-of Birth</th>
                <th>Gender</th>
                <th>Action</th>
                
            </tr>
            </thead>
            
            {error && <p>{error}</p>}
                    {loading && <p>Loading data ....</p>}
                    {Students && 
                        <>
                        {Students.map(student => {
                        
                        return(
                            <tbody>
                                <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.student_number}</td>
                                <td>{student.nationality}</td>
                                <td>{student.dob}</td>
                                <td>{student.gender}</td>
                                <td><button onClick={()=> handleDeleteStudent(student.id)}>Delete</button></td>
                            </tr>
                            </tbody> 
                        )
                        })}
                        </>
                            }   
            
            <tfoot>
                              <tr>
                                <td colspan="7">C/O Management</td>
                                </tr>  
                             </tfoot>   
        </table>
         <div className='filter_students'>
            <div className="userProfile">
              <h2>Add Student</h2>
              <form onSubmit={handleAddStudent}>
                <div>
                    <label>Name:</label>
                    <input type='text' value={name} onChange={(e)=> setName(e.target.value)}/>
                </div>
                <div>
                    <label>Student_number:</label>
                    <input type='text' value={student_number} onChange={(e)=> setStudent_Number(e.target.value)}/>
                </div>
                <div>
                    <label>Nationality:</label>
                    <input type='text' value={nationality} onChange={(e)=> setNationality(e.target.value)}/>
                </div>
                <div>
                    <label>Gender:</label>
                    <input type='text' value={gender} onChange={(e)=> setGender(e.target.value)}/>
                </div>
                <button type='submit'>Add</button>

              </form>
              </div>
              </div>
        
    </div>
</div>

  )
}

export default Students
import React,{useState} from 'react'

function AddStudent() {
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
  return (
    <div className='addStudent'>
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
  )
}

export default AddStudent
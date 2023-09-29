
import React, {useState, useEffect,useRef} from 'react'
import useFetch from './useFetch'
// open a new cmd terminal and point to the project and type the code
// npx json-server --watch data/db.json --port 8000
function SectionHook() {
    const{data:blogs, loading, error}=useFetch("http://localhost:8000/blogs");

    const count = useRef(0);
    const inputRef =useRef();
    const[name, setName]=useState('');
    function focusElement(){
        inputRef.current.focus();
    }
    useEffect(()=>{
        count.current= count.current +1;
    },[name])
    const Blog = (data) => {
        return(
          <div key={data['data'].id}>
            <h3>Author: {data['data'].author}</h3>
            <p>Title: {data['data'].title}</p>
          </div>
        )
      }
  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading data ....</p>}
      {blogs && 
        <>
        {blogs.map(blog => {
          console.log(blog);
          return(
            <Blog data = {blog}/>
          )
        })}
        </>
      }
    <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} />
      <p>Hello{name}</p>
      <input type='password' placeholder='Enter Password' ref={inputRef} />
      <p>Component rendered: {count.current} times!</p>
      <button onClick={focusElement}>focus element</button>

    </div>
  )
}

export default SectionHook
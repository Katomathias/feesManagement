import React, {useEffect, useState} from 'react'

function Section() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const Blog = (data) => {
    return(
      <div key={data['data'].id}>
        <h3>Author: {data['data'].author}</h3>
        <p>Title: {data['data'].title}</p>
      </div>
    )
  }

  useEffect(()=>{
    setTimeout(function(){
      fetch("http://127.0.0.1:8000/blogs")
      .then(res => {
        if(!res.ok){
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(data =>{
        setData(data);
        setLoading(false);
        setError(null); 
      })
      .catch(err =>{
        setError(err.message);
        setLoading(false);
      })
    },500);
  },[])

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Loading data ....</p>}
      {data && 
        <>
        {data.map(blog => {
          console.log(blog);
          return(
            <Blog data = {blog}/>
          )
        })}
        </>
      }
    </div>
  )
}

export default Section

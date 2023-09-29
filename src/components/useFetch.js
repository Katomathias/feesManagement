import React, {useState, useEffect} from 'react'

const useFetch=(url) =>{
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
        setLoading(false);
        setError(null); 
      })
      .catch(err =>{
        setError(err.message);
        setLoading(false);
      })
    
  },[url])


  return {data,loading, error, refresh ,setRefresh}
    
  
}

export default useFetch
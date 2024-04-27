import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

const useFetch = (url) => {
  const [data, setData]= useState([])
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      try{
        const res= await axios({
          method: 'get',
          url: url,
          withCredentials:true,
          
      })
        setData(res.data)
      }catch(err){
          setError(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const refreshData = async () => {
    setLoading(true)
    
    try{
      const res= await axios({
        method: 'get',
        url: url,
        withCredentials:true,
        
    })
      setData(res.data)
    }catch(err){
        setError(err)
    }
    setLoading(false)
  }

  return {data, loading, error, refreshData}

}

export default useFetch
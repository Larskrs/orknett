import { useState, useEffect } from "react";
import axios from "axios";

const useGlobalFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(query).toString();
  
  const options = {
    method: "GET",
    url: `${endpoint}`,
  };

  console.log(`Using ${options.method} ${options.url}	`)



  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data);
      setIsLoading(false);
      
    } catch (error) {
      setError(error);
      console.error(options.url)
      console.error(error)      
    } finally {
      setIsLoading(false);
      console.log(data)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useGlobalFetch;
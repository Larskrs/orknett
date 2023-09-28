import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const urlParams = new URLSearchParams(query).toString();
  const baseUrl = (process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "http://aktuelt.tv"
    : "http://localhost"
  )
  
  const options = {
    method: "GET",
    url: `${baseUrl}/api/v1/${endpoint}`,
    headers: {

    },
    params: {},
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

export default useFetch;
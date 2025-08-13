import axios, {AxiosRequestConfig} from "axios";
import {useState} from "react";

export const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, options: AxiosRequestConfig) => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      const response = await axios(url, options);
      console.log("response", response);
      setData(response.data);
    } catch (err) {
      setError(String(err));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, error, fetchData};
};

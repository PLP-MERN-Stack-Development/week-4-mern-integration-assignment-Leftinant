import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
console.log("BaseURL:", baseURL);

export default function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}${endpoint}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}

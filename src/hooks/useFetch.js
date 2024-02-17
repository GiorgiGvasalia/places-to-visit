import { useEffect, useState } from "react";

// custom hook for fetching data
export function useFetch(fetchFn, initialValue) {
  const [dataIsFetching, setDataIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setDataIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed fetching user data." });
      }
      setDataIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    dataIsFetching,
    error,
    fetchedData,
    setFetchedData,
  };
}

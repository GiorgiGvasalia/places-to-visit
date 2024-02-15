import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [dataIsFetching, setDataIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  const fetchPlaces = async () => {
    setDataIsFetching(true);
    try {
      const response = await fetch("http://localhost:3000/placessss");
      const resData = await response.json();

      if (!response.ok) {
        throw new Error("Failed fetching data...");
      }

      setAvailablePlaces(resData.places);
    } catch (error) {
      setError({
        message: error.message || "Could not fetch data, try again later",
      });
    }
    setDataIsFetching(false);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An Error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      loadingText="Fetching data..."
      isLoading={dataIsFetching}
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js"; // data fetching function

export default function AvailablePlaces({ onSelectPlace }) {
  const [dataIsFetching, setDataIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  const fetchPlaces = async () => {
    setDataIsFetching(true);
    try {
      const places = await fetchAvailablePlaces();

      navigator.geolocation.getCurrentPosition((position) => {
       
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
        setDataIsFetching(false);
      });
    } catch (error) {
      setError({
        message: error.message || "Could not fetch data, try again later",
      });
      setDataIsFetching(false);
    }
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

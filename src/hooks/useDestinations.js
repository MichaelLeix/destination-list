
import { useState, useEffect } from "react";
import FIREBASE_URL from "../firebase";

function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET: Fetch destinations from Firebase
  async function fetchDestinations() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${FIREBASE_URL}/destinations.json`
      );

      if (!response.ok) {
        throw new Error("Could not load destinations.");
      }

      const data = await response.json();

      const loadedDestinations = data
        ? Object.entries(data).map(([id, item]) => ({
            id,
            ...item
          }))
        : [];

      setDestinations(loadedDestinations);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // POST: Add a new destination to Firebase
  async function addDestination(destination) {
    try {
      setError("");

      const response = await fetch(
        `${FIREBASE_URL}/destinations.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(destination)
        }
      );

      if (!response.ok) {
        throw new Error("Could not add destination.");
      }

      const data = await response.json();

      const newDestination = {
        id: data.name,
        ...destination
      };

      setDestinations((previous) => [
        ...previous,
        newDestination
      ]);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // Fetch data when the application loads
  useEffect(() => {
    fetchDestinations();
  }, []);

  return {
    destinations,
    loading,
    error,
    addDestination
  };
}

export default useDestinations;

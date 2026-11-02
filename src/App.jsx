
import { useState } from "react";
import useDestinations from "./hooks/useDestinations";
import DestinationForm from "./components/DestinationForm";
import DestinationList from "./components/DestinationList";
import "./App.css";

function App() {
  const {
    destinations,
    loading,
    error,
    addDestination
  } = useDestinations();

  const [search, setSearch] = useState("");

  // CUSTOM FEATURE: Search destinations
  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Travel Destination Tracker</h1>
        <p>Explore and keep track of places you want to visit.</p>
      </header>

      <main>
        <DestinationForm onAddDestination={addDestination} />

        <section className="destinations-section">
          <h2>All Destinations</h2>

          <p className="custom-label">
            CUSTOM FEATURE: Search Destinations
          </p>

          <input
            className="search-input"
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {loading && <p>Loading destinations...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && (
            <DestinationList
              destinations={filteredDestinations}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

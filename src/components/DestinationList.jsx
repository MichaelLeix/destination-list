
function DestinationList({ destinations }) {
  if (destinations.length === 0) {
    return <p>No destinations found.</p>;
  }

  return (
    <div className="destination-grid">
      {destinations.map((destination) => (
        <div className="destination-card" key={destination.id}>
          <img
            src={destination.image}
            alt={destination.name}
          />

          <div className="card-content">
            <h3>{destination.name}</h3>

            <p>
              <strong>Location:</strong> {destination.location}
            </p>

            <p>{destination.description}</p>

            <span className="category">
              {destination.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DestinationList;

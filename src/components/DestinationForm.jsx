
import { useState } from "react";

function DestinationForm({ onAddDestination }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    category: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const { name, location, description, image, category } =
      formData;

    if (
      !name.trim() ||
      !location.trim() ||
      !description.trim() ||
      !image.trim() ||
      !category.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const imageURL = new URL(image);

      if (
        imageURL.protocol !== "https:" &&
        imageURL.protocol !== "http:"
      ) {
        throw new Error("Invalid image URL");
      }
    } catch {
      setError("Please enter a valid image URL.");
      return;
    }

    const added = await onAddDestination(formData);

    if (added) {
      setFormData({
        name: "",
        location: "",
        description: "",
        image: "",
        category: ""
      });

      setSuccess("Destination added successfully!");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="form-container">
      <h2>Add a Destination</h2>

      <form onSubmit={handleSubmit}>
        <label>Destination Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: Paris"
        />

        <label>Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Example: France"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe this destination..."
        />

        <label>Image URL</label>
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Beach">Beach</option>
          <option value="Nature">Nature</option>
          <option value="City">City</option>
          <option value="Culture">Culture</option>
          <option value="Adventure">Adventure</option>
        </select>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
}

export default DestinationForm;

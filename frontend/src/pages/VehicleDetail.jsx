import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseAuth from "../contexts/UseAuth";
import UseCart from "../contexts/UseCart"
function VehicleDetail() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [postingReview, setPostingReview] = useState(false);
  const [customizationOptions, setCustomizationOptions] = useState([]);
const [selectedOptions, setSelectedOptions] = useState([]);
const { addToCart } = UseCart();

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/customizations`)
    .then((res) => res.json())
    .then((data) => setCustomizationOptions(data))
    .catch((err) => {
      console.error("Failed to fetch customization options:", err);
    });
}, []);


  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch vehicle:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
      });
  }, [id]);

  function toggleOption(optionId) {
  setSelectedOptions((prev) =>
    prev.includes(optionId)
      ? prev.filter((id) => id !== optionId)
      : [...prev, optionId]
  );
}



  async function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim()) return;
    if (!user) {
      alert("please log in to write review");
      return;
    }
    setPostingReview(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            rating: rating,
            review_text: reviewText.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post review");
      }

      const newReview = await response.json();
      setReviews((prev) => [...prev, newReview]);
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error posting review:", error);
      alert("Failed to post review, please try again.");
    } finally {
      setPostingReview(false);
    }
  }

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!vehicle) return <p className="text-center mt-4">Vehicle not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{vehicle.name}</h1>
      <img
        src={vehicle.image_url}
        className="w-full max-w-md rounded shadow mb-4"
        alt=""
      />
      <p>
        <strong>Price:</strong> ${vehicle.price}
      </p>
      <p>
        <strong>Mileage:</strong> {vehicle.mileage} km
      </p>
      <p>
        <strong>Accident History:</strong>{" "}
        {vehicle.accident_history ? "Yes" : "No"}
      </p>
      <p>
        <strong>Report:</strong>{" "}
        {vehicle.history_report || "No report available"}
      </p>


      <hr className="my-6" />

      <h2 className="text-xl font-semibold mt-6 mb-2">Customize Vehicle</h2>
{customizationOptions.length === 0 ? (
  <p>No customization options available.</p>
) : (
  <ul className="mb-4">
    {customizationOptions.map((opt) => (
      <li key={opt.id} className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id={`custom-${opt.id}`}
          checked={selectedOptions.includes(opt.id)}
          onChange={() => toggleOption(opt.id)}
        />
        <label htmlFor={`custom-${opt.id}`}>
          {opt.option_name} (+${opt.additional_cost})
        </label>
      </li>
    ))}
  </ul>
)}
<button
  onClick={() => {
    if (!user) {
      alert("Please log in to add to cart.");
      return;
    }
    addToCart(vehicle.id, user.id, selectedOptions);
  }}
  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mb-6"
>
  Add to Cart
</button>



      <h2 className="text-xl font-semibold mb-2">Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="mb-4">
          {reviews.map((r) => (
            <li key={r.id} className="mb-3 p-3 border rounded">
              <strong>Rating: {r.rating} / 5</strong>
              <p>{r.review_text}</p>
              <small>{new Date(r.created_at).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleReviewSubmit} className="mb-6">
        <label className="block mb-1 font-semibold">
          Your Rating:{" "}
          <select
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="ml-2 border rounded p-1"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2 font-semibold m-4">
          Your Review:{" "}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            rows={4}
            className="w-full border rounded p-2 mt-1"
          />
        </label>

        <button
          type="submit"
          disabled={postingReview}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {postingReview ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default VehicleDetail;

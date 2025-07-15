import { useEffect, useState } from "react";

function CompareCars() {
  const [cars, setCars] = useState([]);
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`);
        if (!res.ok) {
          alert("failed to fetch data");
          return;
        }
        const data = await res.json();
        console.log(data);

        setCars(data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchCars();
  }, []);
  const handleCompare = () => {
    if (car1 && car2 && car1 !== car2) {
      setShowComparison(true);
    } else {
      alert("Please select two different cars to compare.");
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Compare Vehicles</h2>

      <div className="mb-4 flex gap-4">
        <select
          onChange={(e) =>
            setCar1(cars.find((c) => c.id === parseInt(e.target.value)))
          }
          defaultValue=""
          className="border p-2"
        >
          <option value="" disabled>
            Select Car 1
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name} - ${car.price}
            </option>
          ))}
        </select>

        <select
          onChange={(e) =>
            setCar2(cars.find((c) => c.id === parseInt(e.target.value)))
          }
          defaultValue=""
          className="border p-2"
        >
          <option value="" disabled>
            Select Car 2
          </option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name} - ${car.price}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Compare
        </button>
      </div>

      {showComparison && car1 && car2 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{car1.name}</h3>
            <p>Brand: {car1.brand}</p>
            <p>Model: {car1.model}</p>
            <p>Price: ${car1.price}</p>
            <p>Mileage: {car1.mileage}</p>
            <p>Year: {car1.model_year}</p>
            <p>Shape: {car1.vehicle_type}</p>
            <p>Description: {car1.description}</p>
            <p>Accident History: {car1.accident_history ? "Yes" : "No"}</p>
          </div>

          <div className="border p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold">{car2.name}</h3>
            <p>Brand: {car2.brand}</p>
            <p>Model: {car2.model}</p>
            <p>Price: ${car2.price}</p>
            <p>Mileage: {car2.mileage}</p>
            <p>Year: {car2.model_year}</p>
            <p>Description: {car2.description}</p>
            <p>Accident History: {car2.has_accident ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareCars;

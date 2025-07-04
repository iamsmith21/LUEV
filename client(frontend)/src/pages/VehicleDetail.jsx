import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function VehicleDetail(){
    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setVehicle(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Failed to fetch vehicle:", err)
            setLoading(false);
        });


    }, [id]);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (!vehicle) return <p className="text-center mt-4">Vehicle not found</p>;

    return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{vehicle.name}</h1>
      <img src={vehicle.image_url} className="w-full max-w-md rounded shadow mb-4"/>
      <p><strong>Price:</strong> ${vehicle.price}</p>
      <p><strong>Mileage:</strong> {vehicle.mileage} km</p>
      <p><strong>Accident History:</strong> {vehicle.accident_history ? "Yes" : "No"}</p>
      <p><strong>Report:</strong> {vehicle.history_report || "No report available"}</p>
      
    </div>
  );

}

export default VehicleDetail;
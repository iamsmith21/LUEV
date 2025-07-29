import { useEffect, useState } from "react"
function SalesReport() {

  const [sales,setSales]=useState([])
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchSales=async()=>{
      try {
        const res=await fetch(`${import.meta.env.VITE_API_URL}/sales`)
        if(!res.ok){
            throw new Error("Failed to fetch sales data");
        }
        const data = await res.json();
        setSales(data);
      } catch (error) {
        console.error(error);  
        setError("Error fetching sales report");
      }
    }

    fetchSales()
  },[])
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sales Report</h2>
      {error && <p className="text-red-600">{error}</p>}
      {sales.length === 0 ? (
        <p>No sales found.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Price (each)</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border px-4 py-2">{sale.order_id}</td>
                <td className="border px-4 py-2">{sale.vehicle_name}</td>
                <td className="border px-4 py-2">{sale.quantity}</td>
                <td className="border px-4 py-2">
                  ${sale.price_at_purchase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SalesReport
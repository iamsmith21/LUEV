import { useEffect, useState } from "react";

function UsageReport() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usage`);
        if (!response.ok) {
          throw new Error("Failed to fetch usage data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching usage report");
      }
    };

    fetchUsage();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Usage Report</h2>
      {error && <p className="text-red-600">{error}</p>}
      {users.length === 0 ? (
        <p>No usage data available.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.firstname}</td>
                <td className="border px-4 py-2">{user.lastname}</td>
                <td className="border px-4 py-2">{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsageReport;

import UseCart from "../contexts/UseCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = UseCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    province: "",
    postal: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
    holderName: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cartItems = cart.map((item) => ({
        vehicle_id: item.vehicle_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customizations: item.customization_ids || [],
        customization_cost: item.customization_cost || 0,
      }));

      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postal: formData.postal,
        cardNumber: formData.cardNumber,
        cartItems,
        totalPrice,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-out`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place order");
      }
      clearCart();
      alert("Order placed successfully! ");
      navigate("/");
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex h-auto items-start m-4 relative">
      <div className="p-4 m-2">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 p-4 shadow-sm border rounded">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label htmlFor="firstName" className="block font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full py-2 px-3 border rounded bg-white"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="street" className="block font-medium mb-1">
                  Street Name
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Enter your street"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter your city"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="province" className="block font-medium mb-1">
                  Province
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  placeholder="Enter your province"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.province}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="postal" className="block font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal"
                  name="postal"
                  placeholder="Enter your postal code"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.postal}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-4 p-4 shadow-sm border rounded mt-5">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              <div>
                <label htmlFor="card-number" className="block font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="4413 3244 2444 4525"
                  className="w-full py-2 px-3 border rounded"
                  onChange={handleChange}
                  value={formData.cardNumber}
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="786"
                  className="w-full py-2 px-3 border rounded"
                  onChange={handleChange}
                  value={formData.cvv}
                  required
                />
              </div>
              <div>
                <label htmlFor="expiry" className="block font-medium mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM / YY"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="holder-name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="holderName"
                  name="holderName"
                  placeholder="Enter card holder Name"
                  className="w-full py-2 px-3 border rounded"
                  value={formData.holderName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="absolute right-25 top-40 border py-1 px-4 fs-5 m-4 rounded bg-green-700 hover:bg-green-600 text-white"
          >
            Place Order
          </button>
        </form>
      </div>
      <div className="p-4 ml-auto mr-20 mt-10 fs-2 text-center border rounded">
        <p className="font-bold">Total Price</p>
        <p className="h-32">$ {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
export default Checkout;

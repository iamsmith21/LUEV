import { useState } from "react";
import { useCart } from "../Components/CartOperations";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [shippingInfo, setSI] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [paymentInfo, setPI] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e, whichPart) => {
    const { name, value } = e.target;

    // Restrict to digits only for cardNumber and cvv
    const numericFields = ["cardNumber", "cvv", "expiry"];
    const cleanedValue = numericFields.includes(name)
      ? value.replace(/\D/g, "")
      : value;

    if (whichPart === "shipping") {
      setSI((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    } else if (whichPart === "payment") {
      setPI((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
            e.preventDefault();
    
            const orderPayload = {
                shippingInfo,
                paymentInfo,
                items: cartItems,
            };
            
    
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ order: orderPayload }),
                });
    
                if (res.ok) {
                    alert("Order Placed and Stored Successfully!");
                    navigate("/order-confirmation");
                } else {
                    alert("Failed to Save Order");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred!");
            }
    };

  const total = cartItems
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sans text-gray-900">
      <h1 className="text-4xl font-extrabold mb-10 tracking-wide">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
            {/* Shipping Info */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 tracking-wide">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "name", placeholder: "Full Name", pattern: ".+" },
                  { name: "address", placeholder: "Address", pattern: ".+" },
                  { name: "city", placeholder: "City", pattern: ".+" },
                  { name: "province", placeholder: "Province", pattern: ".+" },
                  {
                    name: "postalCode",
                    placeholder: "Postal Code",
                    pattern: "[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d",
                    title: "Postal code format: A1A 1A1",
                  },
                ].map(({ name, placeholder, pattern, title }) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    required
                    pattern={pattern}
                    title={title}
                    value={shippingInfo[name]}
                    onChange={(e) => handleInputChange(e, "shipping")}
                    className="border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                ))}
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-xl font-semibold mb-2 tracking-wide">
                Payment Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: "cardName",
                    placeholder: "Name on Card",
                    pattern: ".+",
                    title: "Please enter the name on your card",
                    maxLength: 50,
                  },
                  {
                    name: "cardNumber",
                    placeholder: "Card Number",
                    pattern: "\\d{16}",
                    title: "Card number must be exactly 16 digits",
                    maxLength: 16,
                  },
                  {
                    name: "expiry",
                    placeholder: "MM/YY",
                    pattern: "^(0[1-9]|1[0-2])\\/\\d{2}$",
                    title: "Expiry date must be in MM/YY format",
                    maxLength: 5,
                  },
                  {
                    name: "cvv",
                    placeholder: "CVV",
                    pattern: "\\d{3,4}",
                    title: "CVV must be 3 or 4 digits",
                    maxLength: 4,
                  },
                ].map(({ name, placeholder, pattern, title, maxLength }) => (
                  <input
                    key={name}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    required
                    pattern={pattern}
                    title={title}
                    maxLength={maxLength}
                    value={paymentInfo[name]}
                    onChange={(e) => handleInputChange(e, "payment")}
                    className="border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                ))}
              </div>
            </section>

            {/* Order Summary */}
            <div className="flex justify-between items-center border-t pt-6">
              <span className="text-xl font-semibold tracking-wide">Total:</span>
              <span className="text-2xl font-extrabold">${total}</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white py-4 rounded-lg font-semibold tracking-wide shadow-lg transition"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;

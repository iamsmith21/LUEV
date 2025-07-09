import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Confirmed!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. We've received your order and it is being
        processed. A confirmation email will be sent to you shortly.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
        alt="Order Confirmed"
        className="w-32 mx-auto mb-6"
      />

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderConfirmation;
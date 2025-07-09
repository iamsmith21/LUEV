import { useCart } from "../Components/CartOperations";
import { Link } from "react-router-dom";


function Cart(){
    const {cartItems, removeItemFromCart} = useCart();

    return(
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

       {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((car) => (
            <div key={car.id} className="border p-4 rounded mb-4 shadow">
              <img
                src={car.image_url}
                alt={car.name}
                className="h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-gray-600">{car.model_year} · {car.brand}</p>
              <p className="mt-2">Price: <strong>${parseFloat(car.price).toFixed(2)}</strong></p>

              <button
                onClick={() => removeItemFromCart(car.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove from Cart
              </button>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-semibold">
            Total: ${cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)}
          </div>



          {/* Proceed to Checkout Button */}
          <div className="text-right mt-4">
            <Link
              to="/checkout"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>



        </>
      )}
    </div>
    )
}

export default Cart;
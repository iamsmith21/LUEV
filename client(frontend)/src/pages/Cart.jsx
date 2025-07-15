import UseCart from "../contexts/UseCart";
import { Link } from "react-router-dom";
function Cart() {
  const { cart, loading, error, updateQuantity, removeItem,totalPrice } = UseCart();

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cart.length === 0)
    return <p className="m-5 text-center">Your cart is empty</p>;



  return (
    <div className="flex m-4">
      <div>
        {cart.map((item) => (
          <div key={item.id} className="mx-12 my-2 p-2">
            <div className="flex gap-2">
              <div>
                <img src={item.image_url} alt="" className="h-32 w-32 object-cover rounded-md shadow hover:scale-105 transition duration-200 ease-in-out"
/>
              </div>
              <div className="m-2 flex gap-3 items-center">
              <p className="font-bold">{item.model_year} {item.name} | {item.vehicle_type} </p>
              <button
                className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg"
                onClick={() =>
                  updateQuantity(
                    item.vehicle_id,
                    Math.max(1, item.quantity - 1)
                  )
                }
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                className="text-green-700 border !rounded-full w-5 h-5 flex items-center justify-center !text-lg"
                onClick={() =>
                  updateQuantity(item.vehicle_id, item.quantity + 1)
                }
              >
                +
              </button>

              <button
                className="bg-red-500 px-2 text-white rounded shadow-sm hover:bg-red-600"
                onClick={() => removeItem(item.vehicle_id)}
              >
                remove
              </button>
              <p className="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {item.customization_cost!=0? (<span className="font-bold">(+${item.customization_cost})</span>) :(<></>)}
            </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 ml-auto mr-20 mt-5 flex h-64 items-center justify-center flex-col fs-2 text-center border rounded">
        <p className="font-bold">Total Price</p>
        <p>$ {totalPrice.toFixed(2)}</p>
       <Link to="/check-out"> <button className="border py-1 px-4 fs-5 m-4 rounded bg-green-700 hover:bg-green-600 text-white">Check out</button></Link>
      </div>
    </div>
  );
}
export default Cart;



import { useContext } from "react"
import CartContext from "./CartContext"
function UseCart() {
    const context=useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used within an CartProvider");
    }
    return context
}

export default UseCart
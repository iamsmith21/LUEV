const db = require("../db/query");
exports.checkout = async (req, res) => {
  const {
    firstName,
    lastName,
    street,
    city,
    province,
    postal,
    cardNumber,
    cartItems,
    totalPrice,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !street ||
    !city ||
    !province ||
    !postal ||
    !cardNumber ||
    !Array.isArray(cartItems) ||
    cartItems.length === 0 ||
    !totalPrice
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const cardLast4 = cardNumber.slice(-4);
  const userId = req.user.id;
  try {
    const addOrder = await db.addOrder({
      userId,
      firstName,
      lastName,
      street,
      city,
      province,
      postal,
      cardLast4,
      cartItems,
      totalPrice,
    });
    res.status(201).json({ message: "Order placed successfully", addOrder });
  } catch (error) {
    console.error("Checkout error:", error);

    res.status(500).json({ error: "Internal server error" });
  }
};

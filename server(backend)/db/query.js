const pool = require("./pool");

async function registerUser(email, password, firstName, lastName, mobile) {
  await pool.query(
    "INSERT INTO users(email,password,firstname,lastname,mobile) VALUES($1,$2,$3,$4,$5)",
    [email, password, firstName, lastName, mobile]
  );
}

async function getUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email= $1", [
    email,
  ]);
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function getVehicleById(id) {
  const { rows } = await pool.query("SELECT * FROM vehicles WHERE id = $1", [
    id,
  ]);
  console.log("Vehicle row:", rows[0]);
  return rows[0];
}

async function getVehicles({
  price,
  mileage,
  brands = [],
  shape = [],
  modelYears = [],
  accidentHistory = [],
  hot_deal = false,
} = {}) {
  const normalizedAccidentHistory = accidentHistory
    .map((s) => {
      const lower = s.toLowerCase().trim();
      if (lower === "with accidents") return true;
      if (lower === "without accidents") return false;

      return null;
    })
    .filter((v) => v !== null);

  let query = `SELECT * FROM vehicles`;
  const queryParts = [];
  const values = [];

  if (brands.length > 0) {
    values.push(brands);
    queryParts.push(`brand = ANY($${values.length})`);
  }

  if (shape.length > 0) {
    values.push(shape);
    queryParts.push(`vehicle_type = ANY($${values.length})`);
  }

  if (modelYears.length > 0) {
    values.push(modelYears);
    queryParts.push(`model_year = ANY($${values.length})`);
  }

  if (normalizedAccidentHistory.length > 0) {
    values.push(normalizedAccidentHistory);
    queryParts.push(`accident_history = ANY($${values.length})`);
  }

  if (hot_deal) {
    values.push(true);
    queryParts.push(`is_hot_deal = $${values.length}`);
  }

  if (queryParts.length > 0) {
    query += ` WHERE ${queryParts.join(" AND ")}`;
  }

  const orderClause = [];
  if (price) {
    orderClause.push(`price ${price.toUpperCase()}`);
  }
  if (mileage) {
    orderClause.push(`mileage ${mileage.toUpperCase()}`);
  }

  if (orderClause.length > 0) {
    query += ` ORDER BY ${orderClause.join(", ")}`;
  }

  const { rows } = await pool.query(query, values);
  return rows;
}

async function getDistinct() {
  try {
    const brands = await pool.query(
      "SELECT DISTINCT brand FROM vehicles ORDER BY brand"
    );
    const modelYears = await pool.query(
      "SELECT DISTINCT model_year FROM vehicles ORDER BY model_year DESC"
    );
    const shape = await pool.query(
      "SELECT DISTINCT vehicle_type FROM vehicles ORDER BY vehicle_type"
    );
    return {
      brands: brands.rows.map((item) => item.brand),
      modelYears: modelYears.rows.map((item) => item.model_year),
      shape: shape.rows.map((item) => item.vehicle_type),
      accidentHistory: ["With Accidents", "Without Accidents"],
    };
  } catch (err) {
    console.error("Error in getDistinct:", err);
  }
}

async function getCartID(user_id) {
  try {
    const { rows } = await pool.query(`SELECT * FROM carts WHERE user_id=$1`, [
      user_id,
    ]);
    if (rows.length > 0) {
      return rows[0].id;
    }
    const newCart = await pool.query(`INSERT INTO carts(user_id) VALUES($1)`, [
      user_id,
    ]);
    return newCart.rows[0].id;
  } catch (error) {
    console.error(error);
  }
}

async function insertCartItems(cart_id, vehicle_id) {
  try {
    const result = await pool.query(
      `INSERT INTO cart_items (cart_id, vehicle_id, quantity) VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, vehicle_id) DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity RETURNING id`,
      [cart_id, vehicle_id, 1]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error("insertCartItems error:", error);
    throw error;
  }
}

async function getCartItems(cart_id) {
  try {
    const { rows } = await pool.query(
      `
SELECT 
  ci.id AS id,
  ci.vehicle_id,
  ci.quantity,
  v.name,
  v.price,
  v.image_url,
  v.model_year,
  v.vehicle_type,
  COALESCE(SUM(co.additional_cost), 0) AS customization_cost,
  COALESCE(array_agg(co.id) FILTER (WHERE co.id IS NOT NULL), '{}') AS customization_ids
FROM cart_items ci
JOIN vehicles v ON ci.vehicle_id = v.id
LEFT JOIN cart_item_customizations cic ON ci.id = cic.cart_item_id
LEFT JOIN customization_options co ON cic.customization_option_id = co.id
WHERE ci.cart_id = $1
GROUP BY ci.id, v.id
      `,
      [cart_id]
    );
    return rows.map((row) => ({
      ...row,
      price: parseFloat(row.price),
      customization_cost: parseFloat(row.customization_cost),
    }));
  } catch (error) {
    console.error("getCartItems error", error);
    throw error;
  }
}

async function updateQuantity(cart_id, vehicle_id, quantity) {
  try {
    const result = await pool.query(
      `UPDATE cart_items SET quantity=$1 WHERE cart_id=$2 AND vehicle_id=$3`,
      [quantity, cart_id, vehicle_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function removeItemFromCart(cart_id, vehicle_id) {
  return await pool.query(
    `DELETE FROM cart_items WHERE cart_id = $1 AND vehicle_id = $2`,
    [cart_id, vehicle_id]
  );
}

async function addOrder({
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
}) {
  try {
    // Insert into orders
    const orderResult = await pool.query(
      `INSERT INTO orders (
    user_id, first_name, last_name, street, city, province, postal_code, card_last_4, total_amount
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id`,
      [
        userId,
        firstName,
        lastName,
        street,
        city,
        province,
        postal,
        cardLast4,
        totalPrice,
      ]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of cartItems) {
      const {
        vehicle_id,
        name,
        price,
        quantity,
        customization_ids = [],
        customization_cost,
      } = item;

      const total = parseFloat(price) + parseFloat(customization_cost);

      const orderItemResult = await pool.query(
        `INSERT INTO order_items (
          order_id, vehicle_id, vehicle_name, price_at_purchase, quantity
        ) VALUES ($1, $2, $3, $4, $5)
        RETURNING id`,
        [orderId, vehicle_id, name, total, quantity]
      );

      const orderItemId = orderItemResult.rows[0].id;

      console.log("item",item);

      for (const customizationId of customization_ids) {
        await pool.query(
          `INSERT INTO selected_customizations (
            order_item_id, customization_option_id
          ) VALUES ($1, $2)`,
          [orderItemId, customizationId]
        );
      }
    }
    const cartId = await getCartID(userId);

    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
    return orderId;
  } catch (err) {
    console.error("Checkout error:", err);
  }
}

async function insertReview({ user_id, vehicleId, rating, review_text }) {
  try {
    const result = await pool.query(
      `INSERT INTO vehicle_reviews (user_id, vehicle_id, rating, review_text)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, vehicle_id) DO UPDATE
       SET rating = $3, review_text = $4
       RETURNING *`,
      [user_id, vehicleId, rating, review_text]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error posting review:", error);
  }
}

async function getReview({ vehicleId }) {
  const result = await pool.query(
    `SELECT r.*, u.firstName, u.lastName
       FROM vehicle_reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.vehicle_id = $1
       ORDER BY r.created_at DESC`,
    [vehicleId]
  );

  return result.rows;
}

async function getCustomizationOptions() {
  const result = await pool.query(
    "SELECT * FROM customization_options ORDER BY id"
  );
  return result.rows;
}

async function insertCartItemCustomization(
  cart_item_id,
  customization_option_id
) {
  try {
    await pool.query(
      `INSERT INTO cart_item_customizations (cart_item_id, customization_option_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [cart_item_id, customization_option_id]
    );
  } catch (error) {
    console.error("insertCartItemCustomization error:", error);
    throw error;
  }
}

async function getSales() {
  try {
    const result=await pool.query(`SELECT * FROM order_items`)
    return result.rows
  } catch (error) {
    console.error(error);
    throw error
  }
}


async function getUsage() {
  try {
    const result=await pool.query(`SELECT * FROM users`)
    return result.rows
  } catch (error) {
    console.error(error);
    throw error
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  getVehicles,
  getDistinct,
  getVehicleById,
  getCartID,
  insertCartItems,
  getCartItems,
  updateQuantity,
  removeItemFromCart,
  addOrder,
  insertReview,
  getReview,
  getCustomizationOptions,
  insertCartItemCustomization,
  getSales,
  getUsage
};

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
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
  return rows[0];
}

async function getVehicles({price,mileage, accident_history}={}) {
  let query="SELECT * FROM vehicles"
  const whereClause = [];
  const values = [];

  if( accident_history === "true" || accident_history === "false"){
    whereClause.push(`accident_history = $${values.length + 1}`);
    values.push(accident_history === "true"); //conv. to boolean
  }

  if(whereClause.length){
    query += ` WHERE ${whereClause.join(" AND ")}`;
  }

  const orderClause=[]
  if(price){
    orderClause.push(`price ${price.toUpperCase()}`) //price ASC or price DESC
  }
    if(mileage){
    orderClause.push(`mileage ${mileage.toUpperCase()}`) //mileage ASC or mileage DESC
  }

  if(orderClause.length){
    query+=` ORDER BY ${orderClause.join(", ")}` // full stmt: SELECT * FROM vehicles ORDER BY price ASC, mileage DESC;

  }

  const {rows}=await pool.query(query, values)
  return rows;
}


async function getVehicleById(id){
  const {rows} = await pool.query("SELECT * FROM vehicles WHERE id = $1", [id]);
  console.log("Vehicle row:", rows[0]);
  return rows[0];
}



async function getDistinct() {
  try {
    const brands= await pool.query("SELECT DISTINCT brand FROM vehicles ORDER BY brand")
    const model_years= await pool.query("SELECT DISTINCT model_year FROM vehicles ORDER BY model_year DESC")
    const shape = await pool.query("SELECT DISTINCT vehicle_type FROM vehicles ORDER BY vehicle_type")
    return {
      brands: brands.rows.map(item=>item.brand),
      model_years: model_years.rows.map(item=>item.model_year),
      shape: shape.rows.map(item=>item.vehicle_type),
      accidentHistory: [true,false]
    };
  } catch (err) {
    console.error("Error in getDistinct:", err);
  }
}

async function saveOrder(order) {
  const {
    shippingInfo,
    paymentInfo,
    items
  } = order;

  const query = `
    INSERT INTO orders (
      customer_name, address, city, province, postal_code,
      card_name, card_last4, total_amount, items
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    shippingInfo.name,
    shippingInfo.address,
    shippingInfo.city,
    shippingInfo.province,
    shippingInfo.postalCode,
    paymentInfo.cardName,
    paymentInfo.cardNumber.slice(-4),
    items.reduce((sum, item) => sum + parseFloat(item.price), 0),
    JSON.stringify(items)
  ];

  await pool.query(query, values);
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  getVehicles,
  getDistinct,
  getVehicleById,
  saveOrder
};

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

async function getVehicles({price,mileage}={}) {
  let query="SELECT * FROM vehicles"
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

  const {rows}=await pool.query(query)
  return rows;
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

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  getVehicles,
  getDistinct
};

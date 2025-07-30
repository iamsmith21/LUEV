const pool = require('../db/pool');

exports.getCarByName = async (name) => {
  const result = await pool.query("SELECT * FROM vehicles WHERE LOWER(name) = LOWER($1)", [name]);
  if (result.rows.length === 0) return `No car found named ${name}.`;
  const car = result.rows[0];
  return `The ${car.name} (${car.brand} ${car.model} ${car.model_year}) has a mileage of ${car.mileage} km and costs $${car.price}.`;
};


exports.compareEVs = async (car1, car2) => {
  const [res1, res2] = await Promise.all([
    pool.query("SELECT * FROM vehicles WHERE LOWER(name) = LOWER($1)", [car1]),
    pool.query("SELECT * FROM vehicles WHERE LOWER(name) = LOWER($1)", [car2]),
  ]);
  if (res1.rows.length === 0 || res2.rows.length === 0)
    return `Comparison failed: check car names.`;

  const c1 = res1.rows[0];
  const c2 = res2.rows[0];

  return `Comparison:\n${c1.name} - ${c1.range} km, $${c1.price}\n${c2.name} - ${c2.range} km, $${c2.price}`;
};

// exports.searchByFeature = async (feature) => {
//   const result = await pool.query("SELECT * FROM vehicles WHERE features ILIKE $1", [`%${feature}%`]);
//   if (result.rows.length === 0) return `No cars found with feature "${feature}".`;
//   return `Cars with "${feature}":\n` + result.rows.map(c => c.name).join(', ');
// };
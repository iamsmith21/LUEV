const { Client } = require("pg");
require("dotenv").config();
const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(55) NOT NULL,
    lastName VARCHAR(55) NOT NULL,
    mobile VARCHAR(15) NOT NULL
);`


const vehicleTable=`CREATE TABLE IF NOT EXISTS vehicles(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    model_year INTEGER NOT NULL,
    vehicle_type VARCHAR(20) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    mileage INT NOT NULL,
    is_used BOOLEAN NOT NULL,
    description TEXT,
    exterior_color VARCHAR(30),
    interior_color VARCHAR(30),
    interior_material VARCHAR(30),
    accident_history BOOLEAN NOT NULL,
    history_report TEXT,
    image_url TEXT,
    quantity INT NOT NULL CHECK (quantity >= 0)
);`

const dummyDataVehicles=`INSERT INTO vehicles (
  name, brand, model, model_year, vehicle_type, price, mileage, is_used,
  description, exterior_color, interior_color, interior_material,
  accident_history, history_report, image_url, quantity
) VALUES
('Kia EV6', 'Kia', 'EV6', 2023, 'SUV', 30465.14, 8963, TRUE,
 'The Kia EV6 offers cutting-edge electric performance with sleek SUV styling and advanced safety features.',
 'Beige', 'Red', 'Fabric', TRUE,
 'Minor rear bumper damage reported, repaired professionally. No impact on vehicle performance.',
 'https://images.pexels.com/photos/13061032/pexels-photo-13061032.jpeg', 4),

('Lucid Air', 'Lucid', 'Air', 2022, 'Sedan', 103591.82, 19302, TRUE,
 'Lucid Air delivers luxury and long-range electric driving with a spacious interior and impressive tech.',
 'Green', 'Silver', 'Leather', TRUE,
 'Vehicle was involved in a minor fender bender; all repairs completed with OEM parts.',
 'https://images.pexels.com/photos/18948374/pexels-photo-18948374.jpeg', 4),

('Tesla Model S', 'Tesla', 'Model S', 2023, 'Sedan', 48788.77, 4293, TRUE,
 'Tesla Model S is a premium electric sedan known for its incredible acceleration and cutting-edge autopilot.',
 'Beige', 'Blue', 'Synthetic', TRUE,
 'Previous owner reported a glass scratch on windshield, replaced under warranty.',
 'https://images.pexels.com/photos/28123191/pexels-photo-28123191.jpeg', 6),

('Hyundai Kona Electric', 'Hyundai', 'Kona Electric', 2020, 'SUV', 93792.91, 18332, TRUE,
 'The Kona Electric combines compact SUV versatility with zero emissions and strong battery life.',
 'Grey', 'Beige', 'Leather', TRUE,
 'Vehicle history includes a minor paint scratch on the rear door, professionally buffed.',
 'https://images.pexels.com/photos/28500051/pexels-photo-28500051.jpeg', 6),

('Honda e', 'Honda', 'e', 2020, 'Coupe', 95298.10, 8653, TRUE,
 'Honda e is a compact electric vehicle with a retro-modern design and urban-friendly features.',
 'Silver', 'Beige', 'Synthetic', TRUE,
 'Reported accident on left side; repairs completed without structural damage.',
 'https://images.pexels.com/photos/32125148/pexels-photo-32125148.jpeg', 2),

('Tesla Model X', 'Tesla', 'Model X', 2021, 'SUV', 61467.73, 8832, TRUE,
 'Tesla Model X offers electric performance combined with spacious SUV utility and falcon-wing doors.',
 'Black', 'Green', 'Leather', TRUE,
 'Experienced minor front bumper scrape, replaced bumper assembly.',
 'https://images.pexels.com/photos/28772164/pexels-photo-28772164.jpeg', 9),

('Tesla Model Y', 'Tesla', 'Model Y', 2021, 'Coupe', 89952.64, 13386, TRUE,
 'Model Y is a versatile electric SUV with ample space and advanced driver-assistance systems.',
 'Blue', 'Red', 'Fabric', TRUE,
 'No accident but minor windshield chip repaired under warranty.',
 'https://images.pexels.com/photos/30306584/pexels-photo-30306584.jpeg', 5),

('Mazda MX-30', 'Mazda', 'MX-30', 2024, 'SUV', 61504.37, 7107, TRUE,
 'Mazda MX-30 blends distinctive styling with an electric powertrain and eco-friendly interior materials.',
 'Black', 'Beige', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/18126154/pexels-photo-18126154.jpeg', 10),

('Porsche Taycan', 'Porsche', 'Taycan', 2022, 'Sedan', 112571.05, 9998, TRUE,
 'Porsche Taycan delivers electric sports car performance with luxury and cutting-edge technology.',
 'Beige', 'Beige', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/32104580/pexels-photo-32104580.jpeg', 6),

('Chevrolet Silverado EV', 'Chevrolet', 'Silverado EV', 2023, 'Pickup', 40479.73, 11655, TRUE,
 'Chevrolet Silverado EV offers a rugged electric pickup with strong towing and hauling capability.',
 'Red', 'Red', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/9115472/pexels-photo-9115472.jpeg', 8),

('BMW i3', 'BMW', 'i3', 2020, 'Hatchback', 89795.21, 12641, TRUE,
 'BMW i3 is a compact electric hatchback focused on urban mobility with premium features.',
 'Silver', 'Red', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/17000828/pexels-photo-17000828.jpeg', 6),

('Tesla Model 3', 'Tesla', 'Model 3', 2022, 'Sedan', 29214.79, 18064, TRUE,
 'Tesla Model 3 is a popular affordable electric sedan with long-range and autopilot capabilities.',
 'Silver', 'Green', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/12554289/pexels-photo-12554289.jpeg', 7),

('Nissan Leaf', 'Nissan', 'Leaf', 2022, 'Sedan', 106642.55, 14037, TRUE,
 'Nissan Leaf is one of the best-selling electric vehicles, known for reliability and efficiency.',
 'Red', 'White', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/29248663/pexels-photo-29248663.jpeg', 5),

('Volkswagen ID.4', 'Volkswagen', 'ID.4', 2022, 'SUV', 144257.29, 18874, TRUE,
 'Volkswagen ID.4 is a well-rounded electric SUV offering comfort, range, and advanced safety.',
 'Black', 'Black', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/5822365/pexels-photo-5822365.jpeg', 10),

('Polestar 2', 'Polestar', '2', 2023, 'Sedan', 41440.23, 16180, TRUE,
 'Polestar 2 blends Scandinavian design with powerful electric performance and tech.',
 'Silver', 'Blue', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/15691825/pexels-photo-15691825.jpeg', 5),

('Jaguar I-PACE', 'Jaguar', 'I-PACE', 2024, 'SUV', 109220.30, 3260, TRUE,
 'Jaguar I-PACE is a luxury electric SUV with sporty handling and a refined interior.',
 'Green', 'Red', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/189454/pexels-photo-189454.jpeg', 1),

('Ford F-150 Lightning', 'Ford', 'F-150 Lightning', 2022, 'Pickup', 107810.13, 17081, TRUE,
 'Ford F-150 Lightning is an electric pickup combining power with familiar rugged design.',
 'Beige', 'Blue', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/2791685/pexels-photo-2791685.jpeg', 1),

('Chrysler Pacifica Hybrid', 'Chrysler', 'Pacifica Hybrid', 2023, 'Minivan', 110329.34, 11379, TRUE,
 'Chrysler Pacifica Hybrid is a family-friendly plug-in hybrid minivan with great utility.',
 'Black', 'White', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/13784417/pexels-photo-13784417.jpeg', 10),

('BMW i4 M50', 'BMW', 'i4 M50', 2023, 'Sedan', 116573.00, 15820, TRUE,
 'BMW i4 M50 offers sporty performance in a luxury electric sedan package.',
 'Beige', 'Blue', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/93615/pexels-photo-93615.jpeg', 9),

('Audi e-tron', 'Audi', 'e-tron', 2021, 'SUV', 77280.94, 17471, TRUE,
 'Audi e-tron is a premium electric SUV with high-quality interiors and smooth drive.',
 'Red', 'Red', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg', 10);

`

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    await client.query(usersTable);
    await client.query(vehicleTable);
    await client.query(dummyDataVehicles);
    console.log("tables created successfully");
  } catch (error) {
    console.log("error",error);
  } finally {
    await client.end();
  }
}

main();

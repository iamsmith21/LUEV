const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../db/query");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  const { message } = req.body;

  try {
    const carName = await extractCarName(message);

    if (carName) {
      const car = await db.getVehicleByName(carName);
      if (car) {
        const response = `The ${car.name} is a ${car.model_year} ${car.brand} ${car.model}. It has a mileage of ${car.mileage} km and is priced at $${car.price}.`;
        return res.json({ reply: response });
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = await response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get a response" });
  }
};

async function extractCarName(message) {
  const carKeywords = [
    "Tesla", "Lucid", "Kia", "Hyundai", "Honda", "Mazda", "Porsche",
    "Chevrolet", "BMW", "Nissan", "Volkswagen", "Polestar", "Jaguar",
    "Ford", "Chrysler", "Audi",
  ];
  
  for (const keyword of carKeywords) {
    if (message.toLowerCase().includes(keyword.toLowerCase())) {
      return keyword;
    }
  }
  
  return null;
}
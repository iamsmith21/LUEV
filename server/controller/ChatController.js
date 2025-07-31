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
        const response = `The ${car.name} is a ${car.model_year} ${car.brand} ${car.model}. It has a mileage of ${car.mileage} km and is priced at $${car.price}. You can find more details on its product page.`;
        return res.json({ reply: response });
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      You are a helpful chatbot for LUEV, an online electric vehicle store.
      Your role is to assist users with inquiries related to our services ONLY.

      Our services include:
      - Providing information about the electric vehicles we sell (e.g., Tesla, Lucid, Kia, etc.).
      - Explaining our car financing options and how the loan calculator works.
      - Answering questions about our company, LUEV.
      - Assisting with our contact information and operating hours.

      Instructions:
      - ONLY answer questions related to the topics listed above.
      - If a user asks a question outside of these topics (e.g., about the weather, movies, booking flights, or general knowledge), you MUST politely decline and state that you can only help with inquiries about LUEV's electric vehicles and services.
      - Do not invent information. If you don't know the answer, say that you can't provide that specific detail.

      User's question: "${message}"
    `;

    const result = await model.generateContent(prompt);
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
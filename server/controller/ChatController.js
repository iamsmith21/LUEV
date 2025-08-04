const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../db/query");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});

exports.chat = async (req, res) => {
  const { message, history } = req.body;

  try {
    const user_que = await analyzeUserIntent(message, history);
    if (user_que.intent === "get_specific_attribute" && user_que.car_name){
        const car = await db.getVehicleByName(user_que.car_name);

        if (car && user_que.attribute){
            const attr = car[user_que.attribute.toLowerCase()];

            if (attr !== undefined){
                const reply = `The ${user_que.attribute} of the ${car.name} is ${formatAttribute(user_que.attribute, attr)}.`;
          return res.json({ reply });
            } else {
                const reply = `I don't have information about the "${user_que.attribute}" for the ${car.name}. I can help with details like price, mileage, and description.`;
          return res.json({ reply });
            }
        }
    }

    if (user_que.intent === "get_general_info" && user_que.car_name){
        const car = await db.getVehicleByName(user_que.car_name);

        if (car){
            const response = `The ${car.name} is a ${car.model_year} ${car.brand} ${car.model}. It has a mileage of ${car.mileage} km and is priced at $${car.price}. What other details would you like to know?`;
            return res.json({ reply: response });
        }
    }

    const convReply = await getConversationalReply(message, history);
    return res.json({reply: convReply});
  } catch (error) {
    console.error("Chat error: ", error);
    res.status(500).json({error: "Failed to get a response"});
  }
};

async function analyzeUserIntent(message, history) {
    const vehicleNames = getVehicleNames();

    const prompt = `
    You are an NLU (Natural Language Understanding) engine for a car dealership chatbot.
    Your task is to analyze the user's message and extract their intent and relevant entities.

    Available vehicle names: ${vehicleNames.join(', ')}.
    Available attributes: name, brand, model, model_year, price, mileage, description, accident_history.

    Analyze the following user message: "${message}"
    Consider the conversation history for context: ${JSON.stringify(history.slice(-3))}

    Return a JSON object with the following structure:
    {
      "intent": "...", // "get_specific_attribute", "get_general_info", or "other"
      "car_name": "...", // The full name of the vehicle, or null
      "attribute": "..." // The specific attribute requested (e.g., "price"), or null
    }

    Examples:
    - User message: "what is the price of the Tesla Model Y" -> {"intent": "get_specific_attribute", "car_name": "Tesla Model Y", "attribute": "price"}
    - User message: "tell me about the lucid air" -> {"intent": "get_general_info", "car_name": "Lucid Air", "attribute": null}
    - User message: "mileage on the Honda e" -> {"intent": "get_specific_attribute", "car_name": "Honda e", "attribute": "mileage"}
    - User message: "How does financing work?" -> {"intent": "other", "car_name": null, "attribute": null}
  `;

    try {
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    console.error("Error parsing Gemini analysis:", e);
    return { intent: "other", car_name: null, attribute: null }; // we will add this for the fallback
  }
}

async function getConversationalReply(message, history) {
    const tailoredPrompt = `
      You are LUEV's friendly chatbot. Your goal is to provide helpful responses based ONLY on information about LUEV.
      **About LUEV:** Our mission is to make electric vehicles accessible and enjoyable for everyone.
      **Services:** We sell new and used EVs, and we offer financing options, including a car loan calculator.
      **Contact:** Monday–Friday, 9 AM–6 PM (EST) at contact@luev.com or 1 (924) 834-061.
      **Instructions:** ONLY answer questions related to LUEV. If asked about anything else, politely state, "I can only assist with questions about LUEV's vehicles and services."

      The user's conversation history is: ${JSON.stringify(history)}
      The user's latest message is: "${message}"
    `;
    const result = await model.generateContent(tailoredPrompt);
    const response = await result.response;
    return response.text();
}

function formatAttribute(attribute, value) {
  switch (attribute.toLowerCase()) {
    case 'price':
      return `$${Number(value).toFixed(2)}`;
    case 'mileage':
      return `${value} km`;
    case 'accident_history':
        return value ? 'Yes, it has been in an accident.' : 'No, it has a clean history.';
    default:
      return value;
  }
}

function getVehicleNames() {
  return [
    'Lucid Air', 'Hyundai Kona Electric', 'Honda e', 'Kia EV6', 'Tesla Model Y',
    'Nissan Leaf', 'Tesla Model S', 'Polestar 2', 'Jaguar I-PACE', 'Ford F-150 Lightning',
    'Tesla Model X', 'Chrysler Pacifica Hybrid', 'BMW i4 M50', 'Chevrolet Silverado EV',
    'BMW i3', 'Lucid Gravity', 'Mazda CX-30 EV', 'Audi e-tron', 'Nissan Ariya',
    'Polestar 3', 'Audi Q5 e', 'Porsche Macan EV', 'Volkswagen e-Golf', 'BMW iX3',
    'BMW iX', 'Chevrolet Bolt EV', 'Honda Insight', 'Ford Mustang Mach-E', 'Audi Q3 e',
    'Tesla Cybertruck', 'Hyundai Ioniq 5', 'Mazda MX-5 EV', 'BMW X1 EV',
    'Chevrolet Equinox EV', 'Polestar 1', 'Ford Mustang EV', 'Volkswagen ID. Buzz',
    'Audi A6 e-tron', 'Tesla Roadster', 'Honda Clarity EV'
  ];
}

const db = require("../db/query");

exports.getCustomizationOptions = async (req, res) => {
  try {
    const result = await db.getCustomizationOptions()
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching customization options:", err);
    res.status(500).json({ error: "Failed to fetch customization options" });
  }
};


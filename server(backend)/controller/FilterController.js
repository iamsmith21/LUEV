const db = require("../db/query");
exports.filterGet= async (req, res) => {
  try {
    const filteredData = await db.getDistinct();
    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
}

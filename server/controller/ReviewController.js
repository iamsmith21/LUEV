const db = require("../db/query");
exports.reviewPost = async (req, res) => {
      const { vehicleId } = req.params;
     const user_id=req.user.id
  const { rating, review_text } = req.body;
  try {
    const result = await db.insertReview({
      user_id,
      vehicleId,
      rating,
      review_text,
    });
    res.status(201).json(result || []);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ error: "Server error." });
  }
};

exports.reviewGet = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const result = await db.getReview({vehicleId})
    res.status(200).json(result || []);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Server error." });
  }
};

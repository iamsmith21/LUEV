const db = require("../db/query");
exports.CarsGet=async (req, res) => {
  try {
    const {
      price,
      mileage,
      brands,
      shape,
      modelYears,
      accidentHistory,
      hot_deal,
    } = req.query;

    const parsedFilters = {
      price,
      mileage,
      brands: brands ? brands.split(",") : [],
      shape: shape ? shape.split(",") : [],
      modelYears: modelYears ? modelYears.split(",") : [],
      accidentHistory: accidentHistory ? accidentHistory.split(",") : [],
      hot_deal: hot_deal === "true",
    };

    const data = await db.getVehicles({ ...parsedFilters });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
}

exports.CarGet=async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await db.getVehicleById(id);
    if (!vehicle)
      return res
        .status(404)
        .json({ message: "Not Found / Not in the Database" });
    res.status(200).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Falied to fetch vehicle!" });
  }
}
const db = require("../db/query");

exports.sales=async(req,res)=>{
try {
    const result=await db.getSales()
  res.status(200).json(result)
} catch (error) {
  console.error(error);
    res.json(500).json("ERROR fetching sales report")
}
}

exports.usage=async(req,res)=>{
  try {
    const result=await db.getUsage()
    res.status(200).json(result)
  } catch (error) {
      console.error(error);
    res.json(500).json("ERROR fetching usage report")
  }
}
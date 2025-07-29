const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function testDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const res = await client.query("SELECT NOW()");
    console.log("Connected successfully:", res.rows[0]);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.end();
  }
}

testDB();


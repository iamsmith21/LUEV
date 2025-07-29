require('dotenv').config();
const pool = require('./db/pool');

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected! Server time:', res.rows[0]);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    pool.end();
  }
})();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors(), bodyParser.json());

app.post('/submit', (req, res) => {
  console.log('Booking submitted:', req.body);
  res.json({status:'OK'});
});

app.listen(3000, () => console.log('Backend running on port 3000'));
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Example route
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Database error');
  }
});

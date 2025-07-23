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

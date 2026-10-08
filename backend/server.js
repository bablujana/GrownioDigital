require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  // TODO: Save email to database
  console.log('New subscription:', email);
  res.json({ success: true, message: 'Thanks for subscribing!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

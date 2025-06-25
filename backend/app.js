const express = require('express');
const app = express();
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Leave Management Backend Running');
});

module.exports = app;

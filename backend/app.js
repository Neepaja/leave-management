const express = require('express');
const leaveRoutes = require('./routes/leave.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/leave', leaveRoutes);
app.get('/', (req, res) => {
  res.send('Leave Management Backend Running');
});

module.exports = app;

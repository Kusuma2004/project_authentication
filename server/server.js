// server/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const userRoutes = require('./routes/user');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(express.json()); // to parse JSON bodies

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));


app.use('/api/auth', userRoutes);

module.exports = app;
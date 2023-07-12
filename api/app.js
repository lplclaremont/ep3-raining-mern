require('dotenv').config();

const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

app.use(express.json())

app.use(cors());

// Middleware function to set environment variable in res.locals
app.use((req, res, next) => {
  res.locals.apiKey = process.env.OPENWEATHER_API_KEY;
  res.locals.emailAccount = process.env.EMAIL_ACCOUNT;
  res.locals.emailPass = process.env.EMAIL_PASS;
  next();
});

// Routes
const weatherRouter = require("./routes/weather");
app.use("/weather", weatherRouter);

const emailRouter = require("./routes/email");
app.use("/email", emailRouter);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

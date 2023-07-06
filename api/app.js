require('dotenv').config();

const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req,res) => {
//     res.send('Hello world!');
// });

// Middleware function to set environment variable in res.locals
app.use((req, res, next) => {
  res.locals.apiKey = process.env.OPENWEATHER_API_KEY;
  next();
});

const weatherRouter = require("./routes/weather");
app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// module.exports = app;

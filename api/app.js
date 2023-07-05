const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req,res) => {
//     res.send('Hello world!');
// });

const weatherRouter = require("./routes/weather");

app.use("/weather", weatherRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// module.exports = app;

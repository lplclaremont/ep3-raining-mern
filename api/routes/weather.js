const express = require("express");
const router = express.Router();

const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.getWeather);

module.exports = router;

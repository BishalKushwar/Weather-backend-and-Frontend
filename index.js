const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for your React frontend's URLs
app.use(cors({
  origin: ['http://localhost:5173', 'https://weather.bishalmajhi1.com.np'],
  // Multiple origins should be in an array
}));

// Handle the /weather route to return weather data in JSON format
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.API_KEY;  // Use the API key from .env

  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(APIUrl);
    const weather = response.data;
    res.json(weather);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: "City not found" });
    } else {
      res.status(500).json({ message: "Error, Please try again" });
    }
  }
});

// Start the server
const port = process.env.PORT || 3000;  // Fallback port if not specified in .env
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
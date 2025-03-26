const axios = require("axios");
const { apiKey, city } = require("../config/config");

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${apiKey}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao consumir a API da OpenWeatherMap:", error);
    return null;
  }
};

const weatherDataController = async (req, res) => {
  const weatherData = await getWeatherData();
  if (weatherData) {
    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
    });
  } else {
    res.status(500).json({ error: "Erro ao obter dados climáticos" });
  }
};

module.exports = {
  weatherDataController,
  getWeatherData,
};

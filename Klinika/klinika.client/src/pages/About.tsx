import { useEffect, useState } from "react";

export default function About() {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    async function populateWeatherData() {
      try {
        const response = await fetch("http://localhost:7045/weatherforecast");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForecasts(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    populateWeatherData();
  }, []);

  console.log(forecasts);

  return (
    <div>
      <h2>Weather Forecasts</h2>
      <ul>
        {forecasts.map((forecast) => (
          <li key={forecast.date}>
            {forecast.date}: {forecast.temperatureC}°C ({forecast.summary})
          </li>
        ))}
      </ul>
    </div>
  );
}

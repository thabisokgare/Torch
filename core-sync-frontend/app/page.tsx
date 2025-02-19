"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";

// Define the type for the weather data
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function Home() {
  // Define the type for the weather state
  const [weather, setWeather] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/WeatherForecast")
      .then((res) => res.json())
      .then((data: WeatherForecast[]) => {
        console.log("Fetched data:", data); // Debugging: Log the fetched data
        setWeather(data);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">CoreSync Weather Forecast</h1>
      {weather.length === 0 ? (
        <p className="text-lg">No weather data available.</p>
      ) : (
        <div className="space-y-2">
          {weather.map((item, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-lg">📅 Date: {item.date}</p>
              <p>🌡️ Temperature: {item.temperatureC}°C / {item.temperatureF}°F</p>
              <p>🌤️ Summary: {item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
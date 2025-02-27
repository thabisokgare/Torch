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
  const [weather, setWeather] = useState<WeatherForecast[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in local storage");
      return;
    }

    fetch("https://localhost:5010/WeatherForecast", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: WeatherForecast[]) => {
        setWeather(data);
      })
      .catch((err) => {
        console.error("Failed to fetch weather data:", err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <h1 className="text-4xl font-bold text-primary mb-6">CoreSync Weather Forecast</h1>
      
      {weather.length === 0 ? (
        <p className="text-lg text-gray-400">No weather data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weather.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 shadow-lg rounded-2xl border border-gray-700 hover:shadow-primary transition-all"
            >
              <p className="text-lg font-semibold">📅 {item.date}</p>
              <p className="text-xl font-bold text-yellow-400">
                🌡️ {item.temperatureC}°C / {item.temperatureF}°F
              </p>
              <p className="text-gray-300 text-sm">🌤️ {item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

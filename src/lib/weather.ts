export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export const SINDH_CITIES: WeatherLocation[] = [
  { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
  { name: "Hyderabad", latitude: 25.3964, longitude: 68.3774 },
  { name: "Sukkur", latitude: 27.7052, longitude: 68.9088 },
  { name: "Larkana", latitude: 27.5602, longitude: 68.2236 },
  { name: "Nawabshah", latitude: 26.2488, longitude: 68.4095 },
  { name: "Mirpur Khas", latitude: 25.5308, longitude: 69.0146 },
  { name: "Dadu", latitude: 26.7322, longitude: 67.7764 },
  { name: "Khairpur", latitude: 27.5296, longitude: 68.7581 },
  { name: "Thatta", latitude: 24.7474, longitude: 67.9236 },
  { name: "Badin", latitude: 24.6561, longitude: 68.8378 },
  { name: "Jacobabad", latitude: 28.2828, longitude: 68.4378 },
  { name: "Shikarpur", latitude: 27.9544, longitude: 68.6339 },
];

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainMm: number;
  weatherCode: number;
  windSpeed: number;
  condition: string;
  isDay: boolean;
}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  rainMm: number;
  weatherCode: number;
  condition: string;
  rainProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  fetchedAt: number;
  locationName: string;
}

const WEATHER_CODE_MAP: Record<number, string> = {
  0: "weather.clear",
  1: "weather.mainlyClear",
  2: "weather.partlyCloudy",
  3: "weather.overcast",
  45: "weather.fog",
  48: "weather.fog",
  51: "weather.drizzle",
  53: "weather.drizzle",
  55: "weather.drizzle",
  56: "weather.drizzle",
  57: "weather.drizzle",
  61: "weather.rain",
  63: "weather.rain",
  65: "weather.heavyRain",
  66: "weather.rain",
  67: "weather.heavyRain",
  71: "weather.snow",
  73: "weather.snow",
  75: "weather.snow",
  77: "weather.snow",
  80: "weather.rain",
  81: "weather.rain",
  82: "weather.heavyRain",
  85: "weather.snow",
  86: "weather.snow",
  95: "weather.thunderstorm",
  96: "weather.thunderstorm",
  99: "weather.thunderstorm",
};

export function getConditionKey(code: number): string {
  return WEATHER_CODE_MAP[code] ?? "weather.partlyCloudy";
}

export async function fetchWeather(
  location: WeatherLocation,
  signal?: AbortSignal
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
    ].join(","),
    timezone: "Asia/Karachi",
    forecast_days: "3",
    wind_speed_unit: "kmh",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Weather API returned ${res.status}`);
  }

  const data = await res.json();

  const current: CurrentWeather = {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: Math.round(data.current.relative_humidity_2m),
    rainMm: Math.round(data.current.precipitation * 10) / 10,
    weatherCode: data.current.weather_code,
    windSpeed: Math.round(data.current.wind_speed_10m),
    condition: getConditionKey(data.current.weather_code),
    isDay: data.current.is_day === 1,
  };

  const forecast: ForecastDay[] = data.daily.time.map(
    (date: string, i: number) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[i]),
      minTemp: Math.round(data.daily.temperature_2m_min[i]),
      rainMm: Math.round(data.daily.precipitation_sum[i] * 10) / 10,
      weatherCode: data.daily.weather_code[i],
      condition: getConditionKey(data.daily.weather_code[i]),
      rainProbability: data.daily.precipitation_probability_max[i] ?? 0,
    })
  );

  return {
    current,
    forecast,
    fetchedAt: Date.now(),
    locationName: location.name,
  };
}

export async function reverseGeocode(
  lat: number,
  lon: number
): Promise<WeatherLocation> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`,
    { headers: { "Accept-Language": "en" } }
  );

  if (!res.ok) throw new Error("Geocoding failed");

  const data = await res.json();
  const address = data.address || {};
  const name =
    address.city ||
    address.town ||
    address.village ||
    address.county ||
    address.state ||
    "My Location";

  return { name, latitude: lat, longitude: lon };
}

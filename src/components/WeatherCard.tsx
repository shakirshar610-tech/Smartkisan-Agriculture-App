import { useState, useEffect, useCallback, useRef } from "react";
import {
  CloudSun,
  Cloud,
  CloudRain,
  Sun,
  CloudFog,
  CloudLightning,
  Snowflake,
  Droplets,
  Wind,
  Thermometer,
  MapPin,
  Navigation,
  RefreshCw,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import {
  SINDH_CITIES,
  fetchWeather,
  reverseGeocode,
  type WeatherData,
  type WeatherLocation,
} from "@/lib/weather";

const WEATHER_ICONS: Record<string, typeof Sun> = {
  "weather.clear": Sun,
  "weather.mainlyClear": Sun,
  "weather.partlyCloudy": CloudSun,
  "weather.overcast": Cloud,
  "weather.fog": CloudFog,
  "weather.drizzle": CloudRain,
  "weather.rain": CloudRain,
  "weather.heavyRain": CloudRain,
  "weather.thunderstorm": CloudLightning,
  "weather.snow": Snowflake,
};

const CACHE_KEY = "smartkisan_weather_cache";
const CACHE_LOCATION_KEY = "smartkisan_weather_location";
const CACHE_CUSTOM_LOCATION_KEY = "smartkisan_weather_custom_location";
const REFRESH_INTERVAL = 10 * 60 * 1000;

interface CachedWeather {
  data: WeatherData;
  timestamp: number;
}

function loadCachedWeather(): CachedWeather | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedWeather;
    if (!parsed.data || !parsed.timestamp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveCachedWeather(data: WeatherData) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // ignore storage errors
  }
}

function loadSavedLocation(): string {
  try {
    return localStorage.getItem(CACHE_LOCATION_KEY) || "Hyderabad";
  } catch {
    return "Hyderabad";
  }
}

function saveLocation(name: string) {
  try {
    localStorage.setItem(CACHE_LOCATION_KEY, name);
  } catch {
    // ignore storage errors
  }
}

function loadCustomLocation(): WeatherLocation | null {
  try {
    const raw = localStorage.getItem(CACHE_CUSTOM_LOCATION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WeatherLocation;
  } catch {
    return null;
  }
}

function saveCustomLocation(loc: WeatherLocation | null) {
  try {
    if (loc) {
      localStorage.setItem(CACHE_CUSTOM_LOCATION_KEY, JSON.stringify(loc));
    } else {
      localStorage.removeItem(CACHE_CUSTOM_LOCATION_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function formatForecastDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function WeatherCard() {
  const { t } = useLang();
  const [selectedLocationName, setSelectedLocationName] = useState(
    loadSavedLocation
  );
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [customLocation, setCustomLocation] =
    useState<WeatherLocation | null>(loadCustomLocation);
  const abortRef = useRef<AbortController | null>(null);

  const currentLocation: WeatherLocation | null =
    customLocation ||
    SINDH_CITIES.find((c) => c.name === selectedLocationName) ||
    SINDH_CITIES[1];

  const doFetch = useCallback(
    async (location: WeatherLocation, showLoading = true) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (showLoading) setLoading(true);
      setError(null);

      try {
        const data = await fetchWeather(location, controller.signal);
        if (controller.signal.aborted) return;

        setWeather(data);
        setIsStale(false);
        saveCachedWeather(data);
      } catch (err) {
        if (controller.signal.aborted) return;

        const cached = loadCachedWeather();
        if (cached) {
          setWeather(cached.data);
          setIsStale(true);
          setError(t("weather.error"));
        } else {
          setWeather(null);
          setError(t("weather.error"));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setGeoLoading(false);
        }
      }
    },
    [t]
  );

  useEffect(() => {
    if (currentLocation) {
      doFetch(currentLocation);
    }
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [selectedLocationName, customLocation, doFetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLocation) {
        doFetch(currentLocation, false);
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [selectedLocationName, customLocation, doFetch]);

  function handleLocationChange(value: string) {
    setCustomLocation(null);
    saveCustomLocation(null);
    setSelectedLocationName(value);
    saveLocation(value);
  }

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setError(t("weather.error"));
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const loc = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
          setCustomLocation(loc);
          saveCustomLocation(loc);
          setSelectedLocationName(loc.name);
          saveLocation(loc.name);
        } catch {
          const fallback: WeatherLocation = {
            name: "My Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCustomLocation(fallback);
          saveCustomLocation(fallback);
          setSelectedLocationName("My Location");
        }
      },
      () => {
        setGeoLoading(false);
        setError(t("weather.error"));
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }

  function handleRefresh() {
    if (currentLocation) {
      doFetch(currentLocation);
    }
  }

  function getWeatherIcon(conditionKey: string): typeof Sun {
    return WEATHER_ICONS[conditionKey] || CloudSun;
  }

  const locationName = weather?.locationName || currentLocation?.name || "";
  const isCached = isStale && weather !== null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-brand-500" />
          <h2 className="text-base font-semibold text-gray-900">
            {t("home.weatherTitle")}
          </h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-medium hover:bg-brand-100 transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          {t("weather.refresh")}
        </button>
      </div>

      {/* Location selector */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={selectedLocationName}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent appearance-none bg-white"
          >
            {SINDH_CITIES.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
            {customLocation &&
              !SINDH_CITIES.some((c) => c.name === customLocation.name) && (
                <option value={customLocation.name}>
                  {customLocation.name}
                </option>
              )}
          </select>
        </div>
        <button
          onClick={handleUseMyLocation}
          disabled={geoLoading}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Navigation className="w-4 h-4" />
          {geoLoading ? "..." : t("weather.useMyLocation")}
        </button>
      </div>

      {/* Loading state */}
      {loading && !weather && (
        <div className="flex items-center justify-center py-10">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-brand-400 animate-spin" />
            <p className="text-sm text-gray-500">{t("weather.loading")}</p>
          </div>
        </div>
      )}

      {/* Error state (no cached data) */}
      {error && !weather && !loading && (
        <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
          <AlertCircle className="w-8 h-8 text-amber-500" />
          <p className="text-sm text-gray-600">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
          >
            {t("weather.refresh")}
          </button>
        </div>
      )}

      {/* Weather data */}
      {weather && (
        <>
          {/* Stale/cached banner */}
          {isCached && (
            <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg bg-amber-50 border border-amber-200">
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                {t("weather.cached")} — {formatTime(weather.fetchedAt)}
              </p>
            </div>
          )}

          {/* Main temperature display */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                {(() => {
                  const Icon = getWeatherIcon(weather.current.condition);
                  return <Icon className="w-8 h-8 text-amber-500" />;
                })()}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900">
                {weather.current.temperature}°C
              </p>
              <p className="text-sm text-gray-600">
                {t(weather.current.condition)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("weather.feelsLike")}: {weather.current.feelsLike}°C
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {locationName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("weather.lastUpdated")}: {formatTime(weather.fetchedAt)}
              </p>
            </div>
          </div>

          {/* Mobile location + update time */}
          <div className="flex items-center justify-between mb-3 sm:hidden">
            <p className="text-sm font-medium text-gray-700">{locationName}</p>
            <p className="text-xs text-gray-400">
              {formatTime(weather.fetchedAt)}
            </p>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50">
              <Thermometer className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">
                  {t("weather.temperature")}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {weather.current.temperature}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50">
              <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">
                  {t("weather.humidity")}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {weather.current.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50">
              <CloudRain className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">
                  {t("weather.rainfall")}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {weather.current.rainMm > 0
                    ? `${weather.current.rainMm} ${t("weather.mm")}`
                    : t("weather.noRain")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50">
              <Wind className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">
                  {t("weather.windSpeed")}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {weather.current.windSpeed} {t("weather.kmh")}
                </p>
              </div>
            </div>
          </div>

          {/* Forecast */}
          {weather.forecast.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {t("weather.forecast")}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {weather.forecast.map((day, idx) => {
                  const Icon = getWeatherIcon(day.condition);
                  return (
                    <div
                      key={day.date}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-gray-50 text-center"
                    >
                      <p className="text-xs font-medium text-gray-600">
                        {idx === 0
                          ? t("weather.today")
                          : formatForecastDate(day.date)}
                      </p>
                      <Icon className="w-6 h-6 text-brand-500" />
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-900">
                          {day.maxTemp}°
                        </span>
                        <span className="text-xs text-gray-400">
                          {day.minTemp}°
                        </span>
                      </div>
                      <p className="text-xs text-blue-500">
                        {day.rainProbability}%
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {t("weather.rainfall")} ({t("weather.today")}):{" "}
                {weather.forecast[0].rainMm > 0
                  ? `${weather.forecast[0].rainMm} ${t("weather.mm")}`
                  : t("weather.noRain")}
              </p>
            </div>
          )}

          {/* Error with cached data */}
          {isCached && error && (
            <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">{error}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

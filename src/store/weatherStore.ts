import { create } from 'zustand';

interface WeatherState {
  data: { message: string; weather: any };
  dataForecast: { message: string; forecast: any };
  loading: boolean;
  weatherError: string | null;
  forecastError: string | null;
  setData: (data: { message: string; weather: any }) => void;
  setDataForecast: (dataForecast: { message: string; forecast: any }) => void;
  setLoading: (loading: boolean) => void;
  setWeatherError: (error: string | null) => void;
  setForecastError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  data: { message: '', weather: null },
  dataForecast: { message: '', forecast: null },
  loading: false,
  weatherError: null,
  forecastError: null,
  setData: (data) => set({ data }),
  setDataForecast: (dataForecast) => set({ dataForecast }),
  setLoading: (loading) => set({ loading }),
  setWeatherError: (error) => set({ weatherError: error }),
  setForecastError: (error) => set({ forecastError: error }),
}));

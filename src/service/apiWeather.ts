const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = async (
  city: string
): Promise<{ message: string; data: any; success: boolean }> => {
  try {
    const response = await fetch(
      `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      return {
        success: false,
        message: 'Something went wrong',
        data: null,
      };
    }

    const weatherData = await response.json();
    return {
      success: true,
      message: 'Success get data weather',
      data: weatherData,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching data',
      data: null,
    };
  }
};

export const fetchWeatherForecast = async (
  city: string
): Promise<{ message: string; data: any; success: boolean }> => {
  try {
    const response = await fetch(
      `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      return {
        success: false,
        message: 'Something went wrong',
        data: null,
      };
    }

    const weatherData = await response.json();
    return {
      success: true,
      message: 'Success get data weather forecast',
      data: weatherData,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching data',
      data: null,
    };
  }
};

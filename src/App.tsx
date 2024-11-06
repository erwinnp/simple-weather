import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ForecastWeatherCard } from './components/ForecastWeatherCard';
import { Loader } from './components/Loader';
import { WeatherCard } from './components/WeatherCard';
import { searchInputSchema } from './form-schema';
import { fetchWeather, fetchWeatherForecast } from './service/apiWeather';
import { useWeatherStore } from './store/weatherStore';

export default function Home() {
  const {
    setData,
    setDataForecast,
    loading,
    setLoading,
    setWeatherError,
    setForecastError,
    weatherError,
    forecastError,
  } = useWeatherStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof searchInputSchema>>({
    resolver: zodResolver(searchInputSchema),
  });

  const filterTodayForecast = (data: any) => {
    const today = new Date().toISOString().split('T')[0];
    return data.list.filter((item: any) => item.dt_txt.startsWith(today));
  };

  const submitForm = async (values: { city: string }) => {
    setLoading(true);
    setWeatherError(null);
    setForecastError(null);

    try {
      const responseWeather = await fetchWeather(values.city);
      if (!responseWeather.success) {
        setWeatherError(responseWeather.message);
        setData({ message: '', weather: null });
        return;
      }

      setData({ message: '', weather: responseWeather.data });
      setWeatherError(null);

      const responseForecast = await fetchWeatherForecast(values.city);
      if (!responseForecast.success) {
        setForecastError(responseForecast.message);
        setDataForecast({ message: '', forecast: null });
        return;
      }

      const todayForecast = filterTodayForecast(responseForecast.data);
      setDataForecast({ message: '', forecast: todayForecast });
      setForecastError(null);
    } catch (error) {
      setWeatherError('An unexpected error occurred. Please try again.');
      setForecastError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-zinc-900 min-h-screen flex items-center w-full'>
      <section className='max-w-screen-sm w-full mx-auto text-white flex flex-col gap-6'>
        <form
          onSubmit={handleSubmit(submitForm)}
          className='w-full flex flex-col gap-2'
        >
          <div className='w-full flex gap-4'>
            <input
              type='text'
              {...register('city')}
              className='flex-1 bg-zinc-800 w-full rounded-md py-3 px-6 outline-none text-xl'
              placeholder='Enter city'
            />
            <button className='py-3 bg-emerald-600 px-8 rounded-md transition hover:bg-emerald-800 text-xl'>
              Check weather
            </button>
          </div>

          {errors?.city && (
            <span className='text-rose-600'>{errors.city.message}</span>
          )}
        </form>

        {loading ? (
          <Loader />
        ) : (
          <div className='flex flex-col gap-6'>
            {weatherError && <p className='text-rose-600'>{weatherError}</p>}{' '}
            <WeatherCard />
            {forecastError && (
              <p className='text-rose-600'>{forecastError}</p>
            )}{' '}
            <ForecastWeatherCard />
          </div>
        )}
      </section>
    </main>
  );
}

import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useWeatherStore } from '../store/weatherStore';
import { iconByCondition } from '../utils/iconByCondition';

export function WeatherCard() {
  const { data } = useWeatherStore();

  return data.weather ? (
    <div className='h-96 p-4 bg-zinc-800 rounded-md flex flex-col items-center justify-center gap-2'>
      <div className='flex gap-2 items-center'>
        <HiOutlineLocationMarker className='w-6 h-6 text-zinc-50' />
        <p className='text-lg'>{data.weather.name}</p>
      </div>
      <img
        src={iconByCondition(data.weather.weather[0].id)}
        alt='weather-icon'
      />
      <p className='text-6xl font-semibold'>
        {Math.floor(data.weather.main.temp)} °C
      </p>
      <p className='text-xl'>{data.weather.weather[0].description}</p>
    </div>
  ) : null;
}

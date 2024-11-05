import { useWeatherStore } from '../store/weatherStore';
import { iconByCondition } from '../utils/iconByCondition';

export function ForecastWeatherCard() {
  const { dataForecast } = useWeatherStore();

  return (
    <div className='grid grid-cols-4 gap-4'>
      {dataForecast.forecast?.map((item: any, index: number) => (
        <div
          key={index}
          className='bg-zinc-800 p-4 rounded-md flex justify-center items-center flex-col gap-2'
        >
          <p>
            {new Date(item.dt * 1000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <img
            src={iconByCondition(item.weather[0].id)}
            alt='forecast-icon'
            className='w-10 h-10'
          />
          <p className='text-2xl font-semibold'>
            {Math.floor(item.main.temp)}°C
          </p>
          <p>{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

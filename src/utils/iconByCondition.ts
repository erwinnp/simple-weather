import AtmosphereIcon from '../assets/icons/atmosphere.svg';
import ClearIcon from '../assets/icons/clear.svg';
import CloudsIcon from '../assets/icons/clouds.svg';
import DrizzleIcon from '../assets/icons/drizzle.svg';
import RainIcon from '../assets/icons/rain.svg';
import SnowIcon from '../assets/icons/snow.svg';
import ThunderstormIcon from '../assets/icons/thunderstorm.svg';

export function iconByCondition(conditionCode: number) {
  if (conditionCode >= 200 && conditionCode <= 232) return ThunderstormIcon;
  if (conditionCode >= 300 && conditionCode <= 321) return DrizzleIcon;
  if (conditionCode >= 500 && conditionCode <= 531) return RainIcon;
  if (conditionCode >= 600 && conditionCode <= 622) return SnowIcon;
  if (conditionCode >= 701 && conditionCode <= 781) return AtmosphereIcon;
  if (conditionCode === 800) return ClearIcon;
  if (conditionCode >= 801 && conditionCode <= 804) return CloudsIcon;
  return CloudsIcon;
}
